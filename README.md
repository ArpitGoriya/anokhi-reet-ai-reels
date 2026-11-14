# Anokhi Reet AI Reels

Make Anokhi Reet reels: **2D cartoon animations** with our two AI voices, a **male** and a **female** voice. All
free, made by Claude on your computer. The voices sound like a young Indian creator and speak natural Hinglish.

> **Status:** voice-overs and 2D animated reels work. First reel: Hetal ben's lehenga (Deep).

## Listen to the voices

- Male: [`voice/samples/male-voice.mp3`](voice/samples/male-voice.mp3), warm, confident and friendly.
- Female: [`voice/samples/female-voice.mp3`](voice/samples/female-voice.mp3), sweet, warm and gentle.

## Before you start (once)

- A **GitHub account** with access to this private repo: send the owner (ArpitGoriya) your GitHub username.
- The **Claude desktop app**, signed in.
- A **Google account** (for the free voice key).
- About **2 GB free** on your computer (the tools, plus a free model that keeps captions in sync).

## First time on a computer (Windows or Mac, about 10 minutes)

You only talk to Claude; it does the installing.

1. Open the **Claude desktop app**, go to the **Code** tab and pick a folder to work in (not inside OneDrive or
   iCloud, for example `C:\Reels` or `~/Reels`).
2. Say: **"Clone https://github.com/ArpitGoriya/anokhi-reet-ai-reels and set me up."**
   (You need access to this private repo: the owner invites your GitHub account.)
3. Claude installs everything, then asks you to get a free Gemini key at <https://aistudio.google.com/apikey>
   (**Create API key**) and opens a small file in **Notepad** (Windows) or **TextEdit** (Mac).
   Paste the key after `GEMINI_API_KEY=`, **save** (Ctrl+S / Cmd+S), close it, and tell Claude "done".
4. Claude checks the key works, and asks your name and GitHub email once (so your saves show your name).
   If a GitHub window asks you to sign in, sign in. That's it.

The key stays only on your computer. **Never send it to anyone, and never paste it into the chat.**

## Making a voice-over

Tell Claude what to say and which voice, for example:

> make a female voice-over: नमस्ते दोस्तों! आज मैं आपको Anokhi Reet का नया lehenga collection दिखाने वाली हूँ...

Claude checks the script, makes the MP3 and opens the **`output`** folder. Listen and tell Claude if a word
sounds wrong; it will fix the spelling and redo it.

### Writing the script so it sounds right

- Write Hindi in **Hindi letters** (देवनागरी) and English words in **English letters**:
  `आज मैं आपको एक नया lehenga collection दिखाने वाला हूँ।`
- **Female voice: use female Hindi.** "दिखाने वाली हूँ", "भेज दूँगी", "मैं गई थी". The male voice uses "वाला हूँ",
  "भेज दूँगा".
- Use `...` for a short pause, `!` for energy, `?` for a question.
- Write numbers as words when they're spoken ("पाँच सौ", not "500").
- Examples: [`voice/examples/male-script.txt`](voice/examples/male-script.txt) and
  [`voice/examples/female-script.txt`](voice/examples/female-script.txt).

### Daily limit

The voices come from Google Gemini's free plan: **10 voice-overs per day on the main model, then 10 more on the
second model**. The tool switches between them by itself. If both are used up it says so; try again a few hours
later. Each person's own key has its own limit, so ask before making dozens of takes.

## Making reels

Tell Claude what you want, for example **"make a 60-second story reel about renting for a sangeet, female voice"**.
Claude:

1. asks a few questions (what, for whom, voice, length, which characters);
2. writes the **script and storyboard** together and waits for your OK;
3. makes the **voice-over first** for you to listen to;
4. draws and animates the reel in our **2D cartoon style** (our own characters like Hetal ben, or new ones),
   with word-by-word captions timed to the voice;
5. renders the **video** (MP4) on your computer and sends it with the post caption;
6. changes it until you're happy (your changes are written down and kept in every round).

Claude shows every script, storyboard and caption **right in the chat**, and saves your reel's notes to GitHub by itself as you go.

Each reel's notes live in `reels/<date>-<name>/REEL.md`; the finished video is in the **`output`** folder on your
computer. See the characters we can reuse in [`animation/cast/cast-sheet.png`](animation/cast/cast-sheet.png).

**Your changes win for your reel.** The brand rules in [`brand/BRAND.md`](brand/BRAND.md) are the starting point;
whatever you ask for your reel is kept (except the logo rules, the "never say" list and the voices). If you want
something changed for everyone, Claude notes it for the owner.

## What's inside

| Path | What it is |
|---|---|
| `.claude/skills/` | What Claude follows: `set-me-up`, `make-voice`, `make-reel` |
| `animation/` | The 2D animation library: style guide (`GUIDE.md`), engine, cast of characters, starter reel, changelog |
| `tools/` | Setup checks, video build and render, caption and voice timing (Claude runs them) |
| `brand/` | Brand guide (`BRAND.md`, incl. the Anokhi Reet Tools design system), colours (`tokens.css`), logos, patterns, fonts |
| `reels/` | One folder per reel with its brief, script, changes and lessons (`_template/` to start) |
| `voice/samples/` | The approved male and female voices |
| `voice/examples/` | Example scripts |
| `voice/gen_voice.py` | The voice tool (Claude runs it) |
| `docs/voices.md` | Exact voice settings, for other tools or AI agents |
| `DECISIONS.md` | Choices made and why |
| `output/` | Your finished voice-overs and videos (stay on your computer, not on GitHub) |

## What to say to Claude

| You want | Say |
|---|---|
| Set up or fix things | "set me up" / "it's not working" |
| A voice-over | "make a female voice-over: …your text…" |
| A reel | "make a 60-second story reel about …, male voice" |
| Change your reel | "in my reel, make the hook shorter / use Mausi / slower captions" |
| See the characters | "show me the cast" |
| Get the newest version | "update" (Claude runs git pull) |

Claude shows every script, storyboard and caption in the chat, and saves your reel's notes to GitHub by itself.
Your videos and voice-overs stay in the `output` folder on your computer.

## For the owner: adding a teammate

1. GitHub → this repo → **Settings → Collaborators → Add people** → their username, role **Write**.
2. Send them the "Before you start" and "First time" sections above.
3. Each person makes **their own** free Gemini key (never share keys).

## Something not working?

Say **"it's not working"** or **"set me up"** again to Claude. It re-checks everything and fixes what it can.
