"""Setup helper Claude runs for "set me up". Never prints the key.

  python tools/setup_helper.py check        -> one line per item: OK / MISSING (+ what to do)
  python tools/setup_helper.py open-key     -> makes .env if missing and opens it in Notepad (Windows),
                                               TextEdit (Mac) or the default editor (Linux)
  python tools/setup_helper.py open-output  -> opens the output folder (finished voice-overs)

Run with the folder's own Python: .venv/Scripts/python.exe (Windows) or .venv/bin/python (Mac/Linux).
"""
import os
import pathlib
import platform
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
ENV = ROOT / ".env"
TEMPLATE = "# Paste your Gemini key right after the = sign (no spaces, no quotes), then save and close.\nGEMINI_API_KEY=\n"


def read_key():
    if not ENV.exists():
        return ""
    for line in ENV.read_text(encoding="utf-8-sig", errors="ignore").splitlines():
        if line.strip().startswith("GEMINI_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def open_path(path, editor=False):
    system = platform.system()
    if system == "Windows":
        if editor:
            subprocess.Popen(["notepad.exe", str(path)])
        else:
            os.startfile(str(path))  # noqa: S606 (opens Explorer)
    elif system == "Darwin":
        subprocess.Popen(["open", "-e", str(path)] if editor else ["open", str(path)])
    else:
        subprocess.Popen(["xdg-open", str(path)])


def check_video():
    """Videos are rendered with Edge/Chrome (or Playwright's own Chromium) through the playwright package."""
    try:
        from playwright.sync_api import sync_playwright
    except Exception:
        print("video renderer: MISSING - install playwright")
        return False
    with sync_playwright() as p:
        for ch in ("msedge", "chrome", None):
            try:
                b = p.chromium.launch(channel=ch) if ch else p.chromium.launch()
                b.close()
                print(f"video renderer: OK ({ch or 'chromium'})")
                return True
            except Exception:
                continue
    print("video renderer: MISSING - no browser; run: PY -m playwright install chromium")
    return False


def check_extras():
    """Nice to have, not needed for voice-overs: exact caption timing, and a name on GitHub saves."""
    try:
        import faster_whisper  # noqa: F401
        print("caption sync (faster-whisper): OK")
    except Exception:
        print("caption sync (faster-whisper): not installed - optional, captions are timed a little less exactly")
    try:
        name = subprocess.run(["git", "config", "user.name"], cwd=ROOT, capture_output=True, text=True).stdout.strip()
        mail = subprocess.run(["git", "config", "user.email"], cwd=ROOT, capture_output=True, text=True).stdout.strip()
        print("name on GitHub saves: " + ("OK" if name and mail else "MISSING - run: tools/github_login.py identity <github-username> "<name>""))
    except Exception:
        print("name on GitHub saves: MISSING - git is not installed")


def check():
    ok = True
    py_ok = sys.prefix != sys.base_prefix and pathlib.Path(sys.prefix).resolve() == (ROOT / ".venv").resolve()
    print(f"python environment (.venv): {'OK' if py_ok else 'MISSING - run this with the .venv Python after setup'}")
    ok &= py_ok
    try:
        import google.genai  # noqa: F401
        import imageio_ffmpeg
        imageio_ffmpeg.get_ffmpeg_exe()
        print("voice packages: OK")
    except Exception:
        print("voice packages: MISSING - install google-genai and imageio-ffmpeg")
        ok = False
    ok &= check_video()
    check_extras()
    key = read_key()
    if not ENV.exists():
        print("key file (.env): MISSING - run open-key")
        return False
    if not key:
        print("Gemini key: MISSING - .env has no key yet; ask the person to paste it and save")
        return False
    print("Gemini key: present")
    try:
        from google import genai
        client = genai.Client(api_key=key, http_options={"api_version": "v1beta"})
        names = [m.name for m in client.models.list()]  # free call, does not use the voice quota
        tts = any("tts" in n for n in names)
        print(f"Gemini key works: {'OK' if tts else 'key works, but no voice models found'}")
        ok &= tts
    except Exception as e:
        msg = str(e)
        reason = "the key is wrong or was copied incompletely" if ("API_KEY_INVALID" in msg or "400" in msg or "403" in msg) \
            else "could not reach Google (internet?)"
        print(f"Gemini key works: NO - {reason}")
        ok = False
    print("ALL SET" if ok else "NOT READY")
    return ok


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    if cmd == "check":
        sys.exit(0 if check() else 1)
    elif cmd == "open-key":
        if not ENV.exists() or not ENV.read_text(encoding="utf-8-sig", errors="ignore").strip():
            ENV.write_text(TEMPLATE, encoding="utf-8")
        open_path(ENV, editor=True)
        print("Opened the key file.")
    elif cmd == "open-output":
        (ROOT / "output").mkdir(exist_ok=True)
        open_path(ROOT / "output")
        print("Opened the output folder.")
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
