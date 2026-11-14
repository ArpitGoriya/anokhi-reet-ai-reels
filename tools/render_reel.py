"""Render a 2D reel to MP4 (and check it), with Edge/Chrome and ffmpeg. Free, runs on the computer.

Usage:
  PY tools/render_reel.py reels/<reel> --sheet           12 moments in one picture + layout check (fast, use often)
  PY tools/render_reel.py reels/<reel> --at 3.2,14,40    those moments, full size, in one picture
  PY tools/render_reel.py reels/<reel> --draft           quick video: half size, 15 fps (to judge timing and motion)
  PY tools/render_reel.py reels/<reel>                   final video: 1080x1920, 30 fps, voice levelled to -14 LUFS
  PY tools/render_reel.py reels/<reel> --cover           the cover picture (needs video/cover.js)
Options: --out FILE, --fps N, --voice output/<file>.mp3 (else reel.json's voice), --no-voice
Files land in output/ (named after the reel). The layout check also runs before every video.
"""
import argparse
import base64
import json
import pathlib
import subprocess
import sys
import time

import imageio_ffmpeg

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import build_reel  # noqa: E402

ROOT = build_reel.ROOT
OUT = ROOT / "output"

CHECK_JS = r"""(() => {
  const out = [];
  const els = document.querySelectorAll('#ui .pill, #ui .title, #ui .bubble, #ui .follow, #ui .chalk, #cap');
  for (const el of els) {
    if (!el.textContent.trim()) continue;
    if (el.id !== 'cap' && el.offsetParent === null) continue;
    let o = 1, p = el; while (p && p.nodeType === 1) { o *= +getComputedStyle(p).opacity; p = p.parentElement; }
    if (o < .5) continue;
    // the box of the visible text and pill itself, not its full-width container
    let r = el.getBoundingClientRect();
    if (el.id === 'cap' || el.classList.contains('title') || el.classList.contains('chalk')) {
      const rg = document.createRange(); rg.selectNodeContents(el); r = rg.getBoundingClientRect();
    }
    if (!r.width) continue;
    let fs = 0; el.querySelectorAll('*').forEach(c => { if ([...c.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) fs = Math.max(fs, parseFloat(getComputedStyle(c).fontSize)); });
    if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) fs = Math.max(fs, parseFloat(getComputedStyle(el).fontSize));
    const name = (el.id ? '#' + el.id : '.' + el.className.split(' ')[0]) + ' "' + el.textContent.trim().replace(/\s+/g, ' ').slice(0, 28) + '"';
    if (r.left < 16 || r.right > 1064) out.push(name + ' runs off the side');
    if (r.top < 250) out.push(name + ' is in the top 250 px (Instagram header)');
    if (r.bottom > 1570) out.push(name + ' is in the bottom 350 px (caption and buttons)');
    if (r.right > 960 && r.bottom > 1100) out.push(name + ' is under the right-side buttons');
    if (fs && fs < 30) out.push(name + ' text is under 30 px (too small on a phone)');
  }
  return out;
})()"""


def launch(p):
    """Edge or Chrome already on the computer, else Playwright's own Chromium (playwright install chromium)."""
    for ch in ("msedge", "chrome", None):
        try:
            return p.chromium.launch(channel=ch) if ch else p.chromium.launch()
        except Exception:
            continue
    raise SystemExit("No browser found. Install Google Chrome, or run: PY -m playwright install chromium")


class Stage:
    def __init__(self, browser, url, scale=1.0):
        self.page = browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=scale)
        self.page.goto(url + "?t=0")
        self.page.evaluate("document.fonts.ready.then(() => true)")
        self.cdp = self.page.context.new_cdp_session(self.page)
        self.duration = self.page.evaluate("window.__dur || 0")

    def seek(self, t):
        self.page.evaluate(f"window.__seek({t:.4f})")

    def shot(self, fmt="jpeg", quality=92):
        prm = {"format": fmt, "optimizeForSpeed": True}
        if fmt == "jpeg":
            prm["quality"] = quality
        return base64.b64decode(self.cdp.send("Page.captureScreenshot", prm)["data"])

    def check(self, step=0.5):
        issues = {}
        t = 0.0
        while t < self.duration:
            self.seek(t)
            for msg in self.page.evaluate(CHECK_JS):
                issues.setdefault(msg, []).append(round(t, 1))
            t += step
        return issues


def report(issues):
    if not issues:
        print("Layout check: nothing to fix.")
        return
    print("Layout check (fix these unless on purpose):")
    for msg, ts in issues.items():
        span = f"{ts[0]}-{ts[-1]} s" if len(ts) > 1 else f"{ts[0]} s"
        print(f"  - {span}: {msg}")


def sheet(browser, stage, times, out, cols=4, scale=0.36):
    """Put several moments into one labelled picture (rendered in the browser itself, no extra packages)."""
    imgs = []
    for t in times:
        stage.seek(t)
        imgs.append((t, base64.b64encode(stage.shot("jpeg", 85)).decode()))
    w, h = int(1080 * scale), int(1920 * scale)
    cells = "".join(f'<figure><img src="data:image/jpeg;base64,{b}" width="{w}" height="{h}"><figcaption>{t:.2f} s'
                    f'</figcaption></figure>' for t, b in imgs)
    html = (f'<body style="margin:0;background:#f4efe8;font:600 18px Inter,Arial;color:#3B2418">'
            f'<div style="display:grid;grid-template-columns:repeat({cols},{w}px);gap:14px;padding:14px">{cells}</div>'
            f'<style>figure{{margin:0}}img{{display:block;border-radius:6px}}figcaption{{padding:4px 2px}}</style>')
    pg = browser.new_page(viewport={"width": cols * (w + 14) + 14, "height": 400})
    pg.set_content(html)
    pg.screenshot(path=str(out), full_page=True)
    pg.close()
    return out


def encode(stage, out, fps, voice, scale):
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    dur = stage.duration
    n = int(round(dur * fps))
    cmd = [ff, "-y", "-v", "error", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", str(fps), "-i", "-"]
    if voice:
        cmd += ["-i", str(voice), "-map", "0:v", "-map", "1:a", "-af", "loudnorm=I=-14:TP=-1.5:LRA=11",
                "-c:a", "aac", "-b:a", "192k"]
    cmd += ["-c:v", "libx264", "-preset", "medium" if scale == 1 else "veryfast", "-crf", "18" if scale == 1 else "24",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-t", f"{dur:.3f}", str(out)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    t0 = time.time()
    for i in range(n):
        stage.seek(i / fps)
        proc.stdin.write(stage.shot("jpeg", 94 if scale == 1 else 85))
        if i % (fps * 10) == 0 and i:
            el = time.time() - t0
            print(f"  {i / n:.0%} ({i}/{n} frames, about {el / i * (n - i) / 60:.1f} min left)", flush=True)
    proc.stdin.close()
    if proc.wait():
        raise SystemExit("ffmpeg failed")
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("reel")
    ap.add_argument("--sheet", action="store_true")
    ap.add_argument("--at")
    ap.add_argument("--draft", action="store_true")
    ap.add_argument("--cover", action="store_true")
    ap.add_argument("--out")
    ap.add_argument("--fps", type=int)
    ap.add_argument("--voice")
    ap.add_argument("--no-voice", action="store_true")
    a = ap.parse_args()

    built = build_reel.build(a.reel)
    name = pathlib.Path(a.reel).resolve().name
    OUT.mkdir(exist_ok=True)
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = launch(p)
        if a.cover:
            if not built["cover"]:
                raise SystemExit("This reel has no video/cover.js")
            pg = browser.new_page(viewport={"width": 1080, "height": 1920})
            pg.goto(built["cover"].as_uri())
            pg.evaluate("document.fonts.ready.then(() => true)")
            out = pathlib.Path(a.out) if a.out else OUT / f"{name}-cover.png"
            pg.screenshot(path=str(out))
            print(f"Cover: {out}")
            return
        if a.sheet or a.at:
            stage = Stage(browser, built["preview"].as_uri())
            if a.at and "," not in a.at:  # one moment: a plain full-size picture
                stage.seek(float(a.at))
                out = pathlib.Path(a.out) if a.out else OUT / f"{name}-{a.at}s.png"
                out.write_bytes(stage.shot("png"))
                print(f"Picture: {out}")
                return
            if a.at:
                times = [float(x) for x in a.at.split(",")]
                out = sheet(browser, stage, times, pathlib.Path(a.out) if a.out else OUT / f"{name}-moments.png",
                            cols=min(4, len(times)), scale=0.5)
            else:
                d = stage.duration
                times = [round(0.4 + i * (d - 0.8) / 11, 2) for i in range(12)]
                out = sheet(browser, stage, times, pathlib.Path(a.out) if a.out else OUT / f"{name}-sheet.png")
            print(f"Picture: {out}")
            report(stage.check())
            return
        scale = 0.5 if a.draft else 1.0
        fps = a.fps or (15 if a.draft else 30)
        stage = Stage(browser, built["preview"].as_uri(), scale)
        report(stage.check())
        voice = None
        if not a.no_voice:
            v = a.voice or built["voice"]
            if v and (ROOT / v).exists():
                voice = ROOT / v
            elif v:
                print(f"Voice file {v} isn't on this computer: the video will be silent.")
        out = pathlib.Path(a.out) if a.out else OUT / f"{name}{'-draft' if a.draft else ''}.mp4"
        print(f"Rendering {stage.duration:.1f} s at {fps} fps{' (draft)' if a.draft else ''}...", flush=True)
        encode(stage, out, fps, voice, scale)
        print(f"Video: {out}")


if __name__ == "__main__":
    main()
