"""Build a 2D reel's pages from the shared engine + cast and the reel's own files.

Usage:  PY tools/build_reel.py reels/<reel>

Reads   reels/<reel>/video/captions.js, scenes.js (required), props.js, cover.js (optional), reel.json (optional:
        {"voice": "output/<file>.mp3"} for lip sync and the soundtrack).
Writes  reels/<reel>/video/preview.html  (open in a browser: plays; add ?t=12.5 to see one moment)
        reels/<reel>/video/cover.html    (when cover.js exists)
Both are regenerated every time; they're ignored by git.
"""
import json
import os
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
ENGINE = ROOT / "animation" / "engine"
CAST = ROOT / "animation" / "cast"
ENV_FPS = 30

# load order matters: engine, cast, reel captions, timeline (needs captions), reel props, reel scenes
ENGINE_FILES = ["lib.js", "main.js", "sets.js", "props.js"]

LOOP = """
build();
window.__dur = DURATION;
window.__seek = t => render(t);
const __q = new URLSearchParams(location.search).get('t');
if (__q !== null) { render(parseFloat(__q)); }
else {
  const __t0 = performance.now();
  (function loop() { render(((performance.now() - __t0) / 1000) % DURATION); requestAnimationFrame(loop); })();
}
"""


def read(p):
    return pathlib.Path(p).read_text(encoding="utf-8")


def voice_envelope(mp3):
    """Loudness of the voice, ENV_FPS values a second, 0..1 (for lip sync)."""
    import imageio_ffmpeg
    import array
    raw = subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-i", str(mp3), "-ac", "1", "-ar", "12000", "-f", "s16le", "-"],
        capture_output=True, check=True).stdout
    a = array.array("h", raw)
    step = 12000 // ENV_FPS
    vals = []
    for i in range(0, len(a), step):
        chunk = a[i:i + step]
        vals.append((sum(x * x for x in chunk) / max(1, len(chunk))) ** .5)
    top = sorted(vals)[int(len(vals) * .97)] or 1
    return [round(min(1.0, v / top), 2) for v in vals]


def reel_parts(video):
    cfg = json.loads(read(video / "reel.json")) if (video / "reel.json").exists() else {}
    env = []
    voice = cfg.get("voice")
    if voice and (ROOT / voice).exists():
        env = voice_envelope(ROOT / voice)
    head = f"const VOICE_ENV = {json.dumps(env)}, ENV_FPS = {ENV_FPS};\n"
    js = [head] + [read(ENGINE / f) for f in ENGINE_FILES] + [read(CAST / "cast.js"), read(video / "captions.js"),
                                                              read(ENGINE / "timeline.js")]
    if (video / "props.js").exists():
        js.append(read(video / "props.js"))
    js.append(read(video / "scenes.js"))
    return cfg, js, bool(env)


def page(video, title, js):
    brand = pathlib.Path(os.path.relpath(ROOT / "brand", video)).as_posix()
    css = read(ENGINE / "style.css")
    return (read(ENGINE / "page.html").replace("{{TITLE}}", title).replace("{{BRAND}}", brand)
            .replace("{{CSS}}", css).replace("{{JS}}", "\n".join(js)))


def build(reel):
    reel = pathlib.Path(reel).resolve()
    video = reel / "video"
    if not (video / "scenes.js").exists():
        raise SystemExit(f"No video/scenes.js in {reel}")
    cfg, js, lips = reel_parts(video)
    (video / "preview.html").write_text(page(video, reel.name, js + [LOOP]), encoding="utf-8")
    out = {"preview": video / "preview.html", "cover": None, "voice": cfg.get("voice"), "lipsync": lips}
    if (video / "cover.js").exists():
        (video / "cover.html").write_text(page(video, reel.name + " cover", js + [read(video / "cover.js")]),
                                          encoding="utf-8")
        out["cover"] = video / "cover.html"
    return out


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    r = build(sys.argv[1])
    print(f"Built {r['preview']}" + (f" and {r['cover']}" if r["cover"] else "") +
          (" (lip sync from the voice)" if r["lipsync"] else ""))
