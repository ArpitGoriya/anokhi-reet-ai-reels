# Anokhi Reet AI Reels

Make voice-overs for Anokhi Reet reels with our two AI voices, a **male** and a **female** voice. Both are free,
sound like a young Indian creator, and speak natural Hinglish.

> **Status:** making voice-overs works. Making the full reel (video) is the next step; see "Making reels" below.

## Listen to the voices

- Male: [`voice/samples/male-voice.mp3`](voice/samples/male-voice.mp3), warm, confident and friendly.
- Female: [`voice/samples/female-voice.mp3`](voice/samples/female-voice.mp3), sweet, warm and gentle.

## First time on a computer (Windows or Mac, about 5 minutes)

You only talk to Claude; it does the installing.

1. Open the **Claude desktop app**, go to the **Code** tab and pick a folder to work in (not inside OneDrive or
   iCloud, for example `C:\Reels` or `~/Reels`).
2. Say: **"Clone https://github.com/ArpitGoriya/anokhi-reet-ai-reels and set me up."**
   (You need access to this private repo: the owner invites your GitHub account.)
3. Claude installs everything, then asks you to get a free Gemini key at <https://aistudio.google.com/apikey>
   (**Create API key**) and opens a small file in **Notepad** (Windows) or **TextEdit** (Mac).
   Paste the key after `GEMINI_API_KEY=`, **save** (Ctrl+S / Cmd+S), close it, and tell Claude "done".
4. Claude checks the key works. That's it.

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

The voices are ready. The reel-making part (video) comes next. Anokhi Reet already has a video studio
(the `anokhireet-videos` repo) that can take a voice-over file. Ask the owner before using AI voices in it:
that studio currently has a "no AI voices" rule.

## What's inside

| Path | What it is |
|---|---|
| `.claude/skills/` | What Claude follows for "set me up" and "make a voice-over" |
| `tools/setup_helper.py` | Setup checks, opens the key file and the output folder |
| `voice/samples/` | The approved male and female voices |
| `voice/examples/` | Example scripts |
| `voice/gen_voice.py` | The voice tool (Claude runs it) |
| `docs/voices.md` | Exact voice settings, for other tools or AI agents |
| `DECISIONS.md` | Choices made and why |
| `output/` | Your finished voice-overs (stay on your computer, not on GitHub) |

## Something not working?

Say **"it's not working"** or **"set me up"** again to Claude. It re-checks everything and fixes what it can.
