---
name: set-me-up
description: Set up this folder on a new Windows or Mac computer so the person can make Anokhi Reet voice-overs and 2D animated reels. Use when they say "set me up", "setup", "install", "it's not working", or have just cloned the repo.
---

# Set me up

The person is usually not technical. Do every step yourself, say in one short line what you're doing, and never
show errors raw: explain them plainly. Never read, print or ask for the key in chat; the key goes only into `.env`
through the editor the person types into.

Check the OS first (Windows or Mac) and use the matching commands. Paths below:
`PY` = `.venv/Scripts/python.exe` on Windows, `.venv/bin/python` on Mac/Linux.

## Steps

1. **Latest version:** `git pull` (skip if this is a fresh clone).
2. **uv** (installs Python for this folder only; nothing system-wide):
   - Check: `uv --version` (also try `~/.local/bin/uv`, Windows `%USERPROFILE%\.local\bin\uv.exe`).
   - If missing, Windows: `powershell -NoProfile -ExecutionPolicy Bypass -c "irm https://astral.sh/uv/install.ps1 | iex"`
   - If missing, Mac: `curl -LsSf https://astral.sh/uv/install.sh | sh`
   - Then use the full path `~/.local/bin/uv` (the current shell may not see it yet).
3. **Python + packages:** `uv venv --python 3.11 .venv` (skip if `.venv` exists), then
   `uv pip install --python PY google-genai imageio-ffmpeg playwright faster-whisper`.
   Videos are rendered with Edge (always on Windows) or Google Chrome. Mac without Chrome: run
   `PY -m playwright install chromium` once (a free browser just for rendering, about 150 MB).
   `faster-whisper` keeps captions in sync with the voice; its free model (about 460 MB) downloads by itself the
   first time captions are timed. If the computer is short of disk space, skip it: timing still works, a little
   less exactly.
4. **Check:** `PY tools/setup_helper.py check`. If the only thing missing is the key, go on.
5. **Key:** tell them, in this order, in one short message:
   1. Open <https://aistudio.google.com/apikey>, sign in with Google, click **Create API key**, copy it.
   2. "I'm opening a small file now. Paste the key right after `GEMINI_API_KEY=`, then **save** (Ctrl+S on
      Windows, Cmd+S on Mac) and close it. Tell me when it's done."
   Then run `PY tools/setup_helper.py open-key` (Notepad on Windows, TextEdit on Mac). Wait for them.
6. **Check again:** `PY tools/setup_helper.py check`.
   - `ALL SET` → tell them they're ready and how to use it: "Just tell me what to say and male or female,
     for example: make a female voice-over: …". Offer to make a short test voice-over (uses 1 of their 10 a day).
   - Key missing → the file probably wasn't saved: open it again (step 5) and ask them to press save.
   - Key doesn't work → it was copied incompletely, or with spaces: open it again and ask them to paste it fresh.
   - Mac TextEdit: if the key line looks odd, it may have saved as rich text; ask them to use Format → Make Plain
     Text, then save.
7. **Videos:** the check's `video renderer` line must say OK. If it says MISSING, do what it says (install
   `playwright`, or `PY -m playwright install chromium`), then check again. Then say videos are ready too.
8. **Saving to GitHub.** Voice-overs and reels work without this; it's only for saving their work to GitHub. Do it
   with `PY tools/github_login.py` (the person never types a password or token into the chat, only into GitHub's
   own window or page):
   1. `check` → `OK`: done, say "Saving to GitHub works".
   2. `NO NAME` → ask in one message: "Do you have a GitHub account? If not, make a free one at
      <https://github.com/signup> (any email works). Then tell me your GitHub **username** and your name as it
      should show on your work." Then `identity <username> "<name>"` (it uses GitHub's private no-reply email, so
      their real email never appears in this public repo). Tell them: "Send your GitHub username to the owner
      (ArpitGoriya) so you can be added." Then `check` again.
   3. `NOT SIGNED IN` → `login`, then tell them plainly what it printed:
      - Windows (`WINDOW:`): "A **Connect to GitHub** window is opening (look behind other windows too): click
        **Sign in with your browser**, sign in, then **Authorize**. Tell me when it's done."
      - Mac (`CODE:`): "A GitHub page opened. Type this code: **XXXX-XXXX**, click **Continue**, then
        **Authorize**. Tell me when it's done." (If no page opened, give them <https://github.com/login/device>.)
      Then `check` again.
   4. `NO ACCESS` → `invite` (opens the invitation page): "Click **Accept invitation**." No invitation there means
      the owner hasn't added them yet: they send their username to the owner; everything else keeps working and
      their work is saved on their computer until then. After accepting, `check` again.
   5. `OFFLINE` → GitHub didn't answer: try again later.
9. Never commit `.env`. Nothing to push after setup.
