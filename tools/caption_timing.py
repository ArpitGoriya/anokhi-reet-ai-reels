"""Time a 2D reel's caption chunks to its voice-over, and write the times into video/captions.js.

Usage:  PY tools/caption_timing.py reels/<reel> [--voice output/<file>.mp3] [--dry]

How: every chunk in CHUNKS says how many words of script.txt it covers. Each script word gets a share of the
spoken time by its length (the TTS speaks at an even pace), pauses in the audio are kept out of that clock, and a
chunk that starts after a comma or full stop is snapped to the end of the nearest pause. If faster-whisper is
installed (optional: uv pip install faster-whisper), its word times are used as the clock instead (more exact).
Run it after every new voice take; then check with render_reel.py --sheet.
"""
import argparse
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import voice_timing  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[1]
BREAK = re.compile(r"[,.।?!…\"”:;]$|\.\.\.$")


def weight(w):
    return len(re.sub(r"[^\wऀ-ॿ]", "", w)) + 1.5


def speech_clock(length, spoken, words):
    """Map a share of the spoken words (0..1) to a time, skipping the pauses."""
    total = sum(b - a for a, b in spoken)

    def at(frac):
        left = frac * total
        for a, b in spoken:
            if left <= b - a:
                return a + left
            left -= b - a
        return spoken[-1][1]
    return at


def whisper_clock(voice):
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return None
    model = WhisperModel("small", device="cpu", compute_type="int8")
    segs, _ = model.transcribe(str(voice), language="hi", word_timestamps=True)
    pts = [(w.start, w.end, weight(w.word)) for s in segs for w in s.words]
    if not pts:
        return None
    tot = sum(p[2] for p in pts)

    def at(frac):
        left = frac * tot
        for a, b, wt in pts:
            if left <= wt:
                return a + (b - a) * left / wt
            left -= wt
        return pts[-1][1]
    return at


ANCHORS = []


def chunk_first_words(counts):
    i, out = 0, []
    for n in counts:
        out.append(i)
        i += n
    return out


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
                mid = (pauses[j][0] + pauses[j][1]) / 2
                c = abs(est[i] - mid)
                if c < 3.0 and D[i][j] + c < D[i + 1][j + 1]:
                    D[i + 1][j + 1], bk[i + 1][j + 1] = D[i][j] + c, (i, j, (i, j))
    i, j, pairs = nb, npz, []
    while i or j:
        pi, pj, m = bk[i][j]
        if m:
            pairs.append(m)
        i, j = pi, pj
    return sorted(pairs)


def word_starts(words, wts, cum, tot, clock, spoken, pauses, how, chunk_starts=()):
    """Start time of every script word: breaks anchored to pauses, even pace in between (or whisper's clock)."""
    global ANCHORS
    if "whisper" in how:
        return [clock(cum[i] / tot) for i in range(len(words))]
    # punctuation breaks are strong anchors; other caption boundaries may take a pause if one is right there
    punct = {i for i in range(1, len(words)) if BREAK.search(words[i - 1])}
    brk = sorted(punct | {i for i in chunk_starts if i > 0})
    est = [clock(cum[i] / tot) for i in brk]
    pairs = align_breaks(est, pauses, [0.55 if i in punct else 0.3 for i in brk])
    ANCHORS = [(brk[a], pauses[b]) for a, b in pairs]
    # segments between anchors: words [w0, w1) spoken between t0 and t1
    marks = [(0, spoken[0][0], None)] + [(w, p[1], p[0]) for w, p in ANCHORS] + [(len(words), None, spoken[-1][1])]
    out = [0.0] * len(words)
    for (w0, t0, _), (w1, _, t1) in zip(marks, marks[1:]):
        parts = [(max(a, t0), min(b, t1)) for a, b in spoken if b > t0 and a < t1]
        total = sum(b - a for a, b in parts) or 1e-6
        wsum = sum(wts[w0:w1]) or 1e-6
        acc = 0.0
        for k in range(w0, w1):
            left = acc / wsum * total
            for a, b in parts:
                if left <= b - a:
                    out[k] = a + left
                    break
                left -= b - a
            else:
                out[k] = parts[-1][1] if parts else t0
            acc += wts[k]
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser()
    ap.add_argument("reel")
    ap.add_argument("--voice")
    ap.add_argument("--dry", action="store_true")
    a = ap.parse_args()
    reel = pathlib.Path(a.reel).resolve()
    cap = reel / "video" / "captions.js"
    src = cap.read_text(encoding="utf-8")
    cfg = json.loads((reel / "video" / "reel.json").read_text(encoding="utf-8")) if (reel / "video" / "reel.json").exists() else {}
    voice = ROOT / (a.voice or cfg.get("voice", ""))
    if not voice.is_file():
        raise SystemExit(f"Voice file not found: {voice}")

    counts = [int(n) for n in re.findall(r"\['c\d+',\s*'(?:[^'\\]|\\.)*',\s*(\d+)\]", src)]
    words = (reel / "script.txt").read_text(encoding="utf-8").split()
    if sum(counts) != len(words):
        raise SystemExit(f"CHUNKS cover {sum(counts)} words but script.txt has {len(words)}: fix the counts first.")

    length, spoken, pauses = voice_timing.timings(str(voice))
    clock = whisper_clock(voice)
    how = "faster-whisper word times"
    if clock is None:
        clock, how = speech_clock(length, spoken, words), "even pace between pauses"
    wts = [weight(w) for w in words]
    tot = sum(wts)
    cum = [0.0]
    for x in wts:
        cum.append(cum[-1] + x)

    starts = word_starts(words, wts, cum, tot, clock, spoken, pauses, how, chunk_first_words(counts))
    snapped = len(ANCHORS)
    starts = [round(max(0.0, starts[i] - 0.04), 2) for i in chunk_first_words(counts)]
    for k in range(1, len(starts)):  # keep order with a small minimum gap
        starts[k] = max(starts[k], round(starts[k - 1] + 0.25, 2))
    voice_end = round(spoken[-1][1], 2)
    duration = round(length + 1.2, 2)

    rows = ",".join(("\n  " if k % 16 == 0 else " ") + f"{s:.2f}" for k, s in enumerate(starts)).lstrip(" ")
    block = (f"// Chunk start times (s): tools/caption_timing.py ({how}), voice {voice.name}.\n"
             f"const STARTS = [{rows}];\nconst VOICE_END = {voice_end}, DURATION = {duration};")
    new = re.sub(r"// Chunk start times.*?const VOICE_END = [\d.]+, DURATION = [\d.]+;", lambda m: block, src, flags=re.S)
    if new == src and "const STARTS" not in src:
        new = src.rstrip() + "\n\n" + block + "\n"
    print(f"{len(starts)} chunks timed by {how}; {snapped} script breaks anchored to pauses. Voice {length} s, video {duration} s.")
    if a.dry:
        print(block)
    else:
        cap.write_text(new, encoding="utf-8", newline="\n") if sys.version_info >= (3, 10) else cap.write_text(new, encoding="utf-8")
        print(f"Wrote {cap}")


if __name__ == "__main__":
    main()
