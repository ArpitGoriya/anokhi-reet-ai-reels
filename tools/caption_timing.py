"""Time a 2D reel's captions to its voice-over and write the times into video/captions.js.

Usage:  PY tools/caption_timing.py reels/<reel> [--voice output/<file>.mp3] [--dry] [--model-dir DIR]

How: CHUNKS in captions.js say how many words of script.txt each caption covers. The tool finds when every script
word is actually spoken and writes STARTS (when each caption appears) and WORDS (when each of its words is said, so
the word-by-word highlight follows the voice).
- With faster-whisper installed (uv pip install faster-whisper; the free "small" model, ~460 MB, downloads once):
  whisper hears the voice, its words are matched to the script, and the times come from what it heard. Exact.
  Put the model somewhere else with --model-dir or the WHISPER_DIR environment variable.
- Without it: the script's commas and full stops are matched to the pauses in the audio, and words in between get
  an even share of the time. Good, but can drift up to half a second inside long sentences.
Either way, word starts right after a pause snap to the exact moment the voice comes back.
Run it after every new voice take; check with render_reel.py --sheet.
"""
import argparse
import difflib
import json
import os
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import voice_timing  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[1]
BREAK = re.compile(r"[,.।?!…\"”:;]$|\.\.\.$")
LEAD = 0.08  # captions appear this much before the word is heard (feels in sync on a phone)


def weight(w):
    return len(re.sub(r"[^\wऀ-ॿ]", "", w)) + 1.5


def norm(w):
    w = re.sub(r"[^\wऀ-ॿ]", "", w.lower())
    return w.replace("़", "")  # nukta: ज़ / ज count as the same


def spread(words, wts, i0, i1, t0, t1, spoken, out):
    """Give words [i0, i1) times between t0 and t1 by their length, skipping pauses inside."""
    parts = [(max(a, t0), min(b, t1)) for a, b in spoken if b > t0 and a < t1] or [(t0, max(t1, t0 + .01))]
    total = sum(b - a for a, b in parts)
    wsum = sum(wts[i0:i1]) or 1e-6
    acc = 0.0
    for k in range(i0, i1):
        left = acc / wsum * total
        for a, b in parts:
            if left <= b - a:
                out[k] = a + left
                break
            left -= b - a
        else:
            out[k] = parts[-1][1]
        acc += wts[k]


# ---------- with whisper ----------
def whisper_words(voice, model_dir=None):
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return None
    root = model_dir or os.environ.get("WHISPER_DIR")
    for size in ("small", "base"):  # base needs far less memory; fine for timing
        try:
            try:
                model = WhisperModel(size, device="cpu", compute_type="int8", cpu_threads=2, download_root=root,
                                     local_files_only=True)
            except Exception:
                model = WhisperModel(size, device="cpu", compute_type="int8", cpu_threads=2, download_root=root)
            segs, _ = model.transcribe(str(voice), language="hi", word_timestamps=True, vad_filter=False,
                                       condition_on_previous_text=False, beam_size=1)
            out = [(w.word.strip(), w.start, w.end) for s in segs for w in s.words if w.word.strip()]
            print(f"Whisper ({size}) heard {len(out)} words.")
            return out
        except RuntimeError as e:
            if "memory" not in str(e).lower():
                raise
            print(f"Not enough free memory for whisper {size}; trying a smaller model.")
    return None


def times_from_whisper(words, wts, heard, spoken):
    a, b = [norm(w) for w in words], [norm(w[0]) for w in heard]
    pairs = []
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        pairs += [(blk.a + k, blk.b + k) for k in range(blk.size)]
    # gaps of the same size on both sides: the same words spelled differently (photo / फोटो): pair them 1:1
    extra, pi, pj = [], -1, -1
    for i, j in pairs + [(len(a), len(b))]:
        if i - pi == j - pj and i - pi > 1:
            extra += [(pi + k, pj + k) for k in range(1, i - pi)]
        pi, pj = i, j
    anchors = sorted(set(pairs + extra))
    out = [None] * len(words)
    for i, j in anchors:
        out[i] = heard[j][1]
    # unmatched words: spread between the neighbouring anchors
    known = [i for i in range(len(words)) if out[i] is not None]
    if not known:
        return None, 0
    edges = [(-1, spoken[0][0])] + [(i, out[i]) for i in known] + [(len(words), spoken[-1][1])]
    for (i0, t0), (i1, t1) in zip(edges, edges[1:]):
        if i1 - i0 > 1:
            tmp = out[:]
            s0 = i0 + 1
            # the unmatched run starts after the previous word, ends before the next anchor
            start = t0 if i0 < 0 else max(t0 + .12, t0)
            spread(words, wts, s0, i1, start, t1, spoken, tmp)
            for k in range(s0, i1):
                out[k] = tmp[k]
    return out, len(anchors)


# ---------- without whisper ----------
def align_breaks(est, pauses, skip):
    """Match script breaks (estimated times) to real pauses, in order (dynamic programming)."""
    SKIP_P = 0.35
    nb, npz = len(est), len(pauses)
    INF = 1e9
    D = [[INF] * (npz + 1) for _ in range(nb + 1)]
    bk = [[None] * (npz + 1) for _ in range(nb + 1)]
    D[0][0] = 0
    for i in range(nb + 1):
        for j in range(npz + 1):
            if D[i][j] >= INF:
                continue
            if i < nb and D[i][j] + skip[i] < D[i + 1][j]:
                D[i + 1][j], bk[i + 1][j] = D[i][j] + skip[i], (i, j, None)
            if j < npz and D[i][j] + SKIP_P < D[i][j + 1]:
                D[i][j + 1], bk[i][j + 1] = D[i][j] + SKIP_P, (i, j, None)
            if i < nb and j < npz:
                c = abs(est[i] - (pauses[j][0] + pauses[j][1]) / 2)
                if c < 3.0 and D[i][j] + c < D[i + 1][j + 1]:
                    D[i + 1][j + 1], bk[i + 1][j + 1] = D[i][j] + c, (i, j, (i, j))
    i, j, pairs = nb, npz, []
    while i or j:
        pi, pj, m = bk[i][j]
        if m:
            pairs.append(m)
        i, j = pi, pj
    return sorted(pairs)


def times_from_pauses(words, wts, spoken, pauses, chunk_starts):
    total = sum(b - a for a, b in spoken)
    tot = sum(wts)
    cum = [0.0]
    for x in wts:
        cum.append(cum[-1] + x)
    even = [None] * len(words)
    spread(words, wts, 0, len(words), spoken[0][0], spoken[-1][1], spoken, even)
    punct = {i for i in range(1, len(words)) if BREAK.search(words[i - 1])}
    brk = sorted(punct | {i for i in chunk_starts if i > 0})
    pairs = align_breaks([even[i] for i in brk], pauses, [0.55 if i in punct else 0.3 for i in brk])
    anchors = [(brk[a], pauses[b]) for a, b in pairs]
    marks = [(0, spoken[0][0], None)] + [(w, p[1], p[0]) for w, p in anchors] + [(len(words), None, spoken[-1][1])]
    out = [0.0] * len(words)
    for (w0, t0, _), (w1, _, t1) in zip(marks, marks[1:]):
        spread(words, wts, w0, w1, t0, t1, spoken, out)
    return out, len(anchors)


def chunk_first_words(counts):
    i, out = 0, []
    for n in counts:
        out.append(i)
        i += n
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser()
    ap.add_argument("reel")
    ap.add_argument("--voice")
    ap.add_argument("--dry", action="store_true")
    ap.add_argument("--model-dir")
    ap.add_argument("--no-whisper", action="store_true")
    a = ap.parse_args()
    reel = pathlib.Path(a.reel).resolve()
    cap = reel / "video" / "captions.js"
    src = cap.read_text(encoding="utf-8")
    cfgp = reel / "video" / "reel.json"
    cfg = json.loads(cfgp.read_text(encoding="utf-8")) if cfgp.exists() else {}
    voice = ROOT / (a.voice or cfg.get("voice", ""))
    if not voice.is_file():
        raise SystemExit(f"Voice file not found: {voice}")

    counts = [int(n) for n in re.findall(r"\['c\d+',\s*'(?:[^'\\]|\\.)*',\s*(\d+)\]", src)]
    words = (reel / "script.txt").read_text(encoding="utf-8").split()
    if sum(counts) != len(words):
        raise SystemExit(f"CHUNKS cover {sum(counts)} words but script.txt has {len(words)}: fix the counts first.")
    firsts = chunk_first_words(counts)

    length, spoken, pauses = voice_timing.timings(str(voice))
    wts = [weight(w) for w in words]
    heard = None if a.no_whisper else whisper_words(voice, a.model_dir)
    t = None
    if heard:
        t, n = times_from_whisper(words, wts, heard, spoken)
        how = f"faster-whisper, {n} of {len(words)} words matched"
    if t is None:
        t, n = times_from_pauses(words, wts, spoken, pauses, firsts)
        how = f"pauses, {n} breaks anchored (install faster-whisper for exact times)"
    # a word right after a pause starts exactly when the voice comes back
    for k in range(len(t)):
        near = [b for _, b in [(0, spoken[0][0])] + pauses if abs(b - t[k]) < 0.3]
        if near:
            t[k] = min(near, key=lambda b: abs(b - t[k]))
    for k in range(1, len(t)):
        t[k] = max(t[k], t[k - 1] + 0.05)

    starts = [round(max(0.0, t[i] - LEAD), 2) for i in firsts]
    for k in range(1, len(starts)):
        starts[k] = max(starts[k], round(starts[k - 1] + 0.25, 2))
    word_times = [[round(t[i + k], 2) for k in range(n)] for i, n in zip(firsts, counts)]
    voice_end = round(spoken[-1][1], 2)
    duration = round(length + 1.2, 2)

    old = re.search(r"const STARTS = \[([\d.,\s]+)\]", src)
    if old:
        prev = [float(x) for x in old.group(1).replace("\n", " ").split(",") if x.strip()]
        if len(prev) == len(starts):
            d = [s - p for s, p in zip(starts, prev)]
            worst = max(range(len(d)), key=lambda k: abs(d[k]))
            print(f"Change from the old times: average {sum(abs(x) for x in d) / len(d):.2f} s, "
                  f"largest {d[worst]:+.2f} s at caption c{worst + 1}.")

    rows = ",".join(("\n  " if k % 16 == 0 else " ") + f"{s:.2f}" for k, s in enumerate(starts)).lstrip(" ")
    wrows = ",\n  ".join(json.dumps(w) for w in word_times)
    block = (f"// Chunk start times (s): tools/caption_timing.py ({how}), voice {voice.name}.\n"
             f"const STARTS = [{rows}];\n"
             f"// When each script word of a chunk is spoken (drives the word-by-word highlight).\n"
             f"const WORDS = [\n  {wrows}];\n"
             f"const VOICE_END = {voice_end}, DURATION = {duration};")
    new, n = re.subn(r"// Chunk start times.*?const VOICE_END = [\d.]+, DURATION = [\d.]+;", lambda m: block, src,
                     flags=re.S)
    if not n:
        new = src.rstrip() + "\n\n" + block + "\n"
    print(f"{len(starts)} captions timed ({how}). Voice {length} s, video {duration} s.")
    if a.dry:
        print(block[:600])
    else:
        cap.write_text(new, encoding="utf-8")
        print(f"Wrote {cap}")


if __name__ == "__main__":
    main()
