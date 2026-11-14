"""GitHub sign-in so a teammate's reels can be saved (pushed). Claude runs this; the person only signs in in their
own browser. Never ask for or handle a password or token in chat.

  PY tools/github_login.py check                      can this computer save to GitHub? prints one of:
                                                      OK / NOT SIGNED IN / NO ACCESS / NO NAME / OFFLINE
  PY tools/github_login.py identity <username> "<Name>" [--dry]
                                                      puts their name and GitHub's private no-reply email on
                                                      this folder's saves (the repo is public: no real email)
  PY tools/github_login.py invite                     opens the page where they accept the owner's invitation
  PY tools/github_login.py login                      starts the sign-in and returns at once:
       Windows: Git's own "Connect to GitHub" window opens (it can be behind other windows) -> Sign in with your
                browser -> sign in -> Authorize.
       Mac:     installs GitHub's own `gh` tool if needed (Homebrew, else the official release), prints
                CODE: XXXX-XXXX and opens github.com/login/device -> they type the code -> Continue -> Authorize.
       Then run `check` again.
"""
import io
import json
import os
import pathlib
import platform
import re
import shutil
import subprocess
import sys
import tarfile
import urllib.request
import webbrowser
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
LOG = ROOT / "output" / "github-login.log"
NOPROMPT = dict(os.environ, GIT_TERMINAL_PROMPT="0", GCM_INTERACTIVE="never")


def fetch(url, timeout=60):
    """Download with Python, else with the system's curl (uses the computer's own certificates)."""
    try:
        with urllib.request.urlopen(url, timeout=timeout) as f:
            return f.read()
    except Exception:
        curl = shutil.which("curl")
        if not curl:
            raise
        r = subprocess.run([curl, "-fsSL", "--max-time", str(timeout), url], capture_output=True, timeout=timeout + 10)
        if r.returncode:
            raise OSError(r.stderr.decode(errors="ignore")[:200])
        return r.stdout


def git(*args, env=None, timeout=90):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, env=env, timeout=timeout)


def repo_web():
    url = git("remote", "get-url", "origin").stdout.strip()
    return re.sub(r"\.git$", "", url.replace("git@github.com:", "https://github.com/"))


def find_gh():
    for p in (shutil.which("gh"), str(pathlib.Path.home() / ".local/bin/gh"), "/opt/homebrew/bin/gh",
              "/usr/local/bin/gh"):
        if p and pathlib.Path(p).exists():
            return p
    return None


def check():
    if not (git("config", "user.name").stdout.strip() and git("config", "user.email").stdout.strip()):
        print("NO NAME - run: identity <github-username> \"<their name>\"")
        return 2
    gh = find_gh()
    if gh and platform.system() != "Windows":  # make git use gh's sign-in if they signed in through gh
        if subprocess.run([gh, "auth", "status"], capture_output=True, text=True).returncode == 0:
            subprocess.run([gh, "auth", "setup-git"], capture_output=True, text=True)
    try:
        r = git("push", "--dry-run", "origin", "HEAD", env=NOPROMPT)
    except subprocess.TimeoutExpired:
        print("OFFLINE - GitHub didn't answer; check the internet and try again")
        return 3
    out = (r.stdout + r.stderr).lower()
    if r.returncode == 0:
        print("OK - this computer can save to GitHub")
        return 0
    if "403" in out or "permission to" in out or "denied to" in out:
        print("NO ACCESS - signed in, but this GitHub account can't save here yet: the owner must add it as a "
              "collaborator (Write) and the person must accept the invitation (run: invite)")
        return 4
    if any(s in out for s in ("authentication", "could not read username", "terminal prompts disabled", "401",
                              "logon failed", "no credential")):
        print("NOT SIGNED IN - run: login")
        return 5
    if any(s in out for s in ("could not resolve", "timed out", "unable to access", "connection")):
        print("OFFLINE - GitHub didn't answer; check the internet and try again")
        return 3
    print("NOT SIGNED IN - run: login (git said: " + (r.stderr.strip().splitlines() or ["?"])[-1][:120] + ")")
    return 5


def identity(username, name, dry=False):
    try:
        u = json.loads(fetch(f"https://api.github.com/users/{username}", 30))
    except Exception:
        raise SystemExit(f"No GitHub account called '{username}' (or GitHub didn't answer). Check the spelling.")
    email = f"{u['id']}+{u['login']}@users.noreply.github.com"
    if dry:
        print(f"Would set: {name} <{email}>")
        return
    git("config", "user.name", name)
    git("config", "user.email", email)
    print(f"Saves from this folder will show: {name} ({u['login']}), with GitHub's private no-reply email.")


def install_gh():
    if shutil.which("brew"):
        subprocess.run(["brew", "install", "gh"], check=False)
        return find_gh()
    system = platform.system()
    arch = "arm64" if platform.machine().lower() in ("arm64", "aarch64") else "amd64"
    assets = json.loads(fetch("https://api.github.com/repos/cli/cli/releases/latest"))["assets"]
    if system == "Darwin":
        pick = [a for a in assets if "macOS" in a["name"] and a["name"].endswith(".zip")
                and (arch in a["name"] or "universal" in a["name"])]
    else:
        pick = [a for a in assets if f"linux_{arch}" in a["name"] and a["name"].endswith(".tar.gz")]
    if not pick:
        raise SystemExit("Couldn't find GitHub's gh tool for this computer. Install it from https://cli.github.com")
    url = pick[0]["browser_download_url"]  # official GitHub release of GitHub's own CLI
    data = fetch(url, 300)
    dest = pathlib.Path.home() / ".local/bin"
    dest.mkdir(parents=True, exist_ok=True)
    if url.endswith(".zip"):
        z = zipfile.ZipFile(io.BytesIO(data))
        member = next(n for n in z.namelist() if n.endswith("/bin/gh"))
        (dest / "gh").write_bytes(z.read(member))
    else:
        t = tarfile.open(fileobj=io.BytesIO(data))
        member = next(m for m in t.getmembers() if m.name.endswith("/bin/gh"))
        (dest / "gh").write_bytes(t.extractfile(member).read())
    (dest / "gh").chmod(0o755)
    return str(dest / "gh")


def login():
    LOG.parent.mkdir(exist_ok=True)
    system = platform.system()
    if system == "Windows" and git("credential-manager", "--version").returncode == 0:
        # Git Credential Manager (part of Git for Windows) shows GitHub's sign-in window on the first push
        subprocess.Popen(["git", "push", "--dry-run", "origin", "HEAD"], cwd=ROOT, stdout=open(LOG, "w"),
                         stderr=subprocess.STDOUT, creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
        print("WINDOW: a 'Connect to GitHub' window is opening (it can be behind other windows). "
              "Click 'Sign in with your browser', sign in, then Authorize. Then run: check")
        return
    gh = find_gh() or install_gh()
    if not gh:
        raise SystemExit("Couldn't install GitHub's gh tool. Install it from https://cli.github.com, then try again.")
    log = open(LOG, "w")
    p = subprocess.Popen([gh, "auth", "login", "--hostname", "github.com", "--git-protocol", "https", "--web",
                          "--skip-ssh-key"], cwd=ROOT, stdin=subprocess.PIPE, stdout=log, stderr=subprocess.STDOUT,
                         start_new_session=True, text=True)
    try:
        p.stdin.write("\n")
        p.stdin.flush()
    except OSError:
        pass
    code = None
    for _ in range(60):
        try:
            p.wait(timeout=0.5)
        except subprocess.TimeoutExpired:
            pass
        m = re.search(r"\b([A-Z0-9]{4}-[A-Z0-9]{4})\b", LOG.read_text(errors="ignore"))
        if m:
            code = m.group(1)
            break
    if not code:
        raise SystemExit("GitHub didn't give a sign-in code. Check the internet and try again.")
    webbrowser.open("https://github.com/login/device")
    print(f"CODE: {code}  -> on the page that opened (github.com/login/device): type this code, Continue, "
          "Authorize. Then run: check")


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    a = sys.argv[1:]
    if not a or a[0] not in ("check", "identity", "invite", "login"):
        raise SystemExit(__doc__)
    if a[0] == "check":
        sys.exit(check())
    if a[0] == "identity":
        if len(a) < 3:
            raise SystemExit('Usage: identity <github-username> "<their name>" [--dry]')
        identity(a[1], a[2], "--dry" in a)
    if a[0] == "invite":
        url = repo_web() + "/invitations"
        webbrowser.open(url)
        print(f"Opened {url}: click 'Accept invitation'. (No invitation there? The owner hasn't added you yet.)")
    if a[0] == "login":
        login()


if __name__ == "__main__":
    main()
