# Anokhi Reet AI Reels

Make voice-overs for Anokhi Reet reels with our two AI voices, a **male** and a **female** voice. Both are free,
sound like a young Indian creator, and speak natural Hinglish.

> **Status:** making voice-overs works. Making the full reel (video) is the next step; see "Making reels" below.

## Listen to the voices

- Male: [`voice/samples/male-voice.mp3`](voice/samples/male-voice.mp3), warm, confident and friendly.
- Female: [`voice/samples/female-voice.mp3`](voice/samples/female-voice.mp3), sweet, warm and gentle.

## First time on a computer (Windows, about 5 minutes)

1. Get this folder on your computer (the owner shares the GitHub link; click **Code → Download ZIP** and unzip it,
   or ask Claude to clone it). Don't put it inside OneDrive.
2. Get a free Gemini key: open <https://aistudio.google.com/apikey>, sign in with Google and click
   **Create API key**. Copy it.
3. Double-click **`1 Setup.bat`**. It installs what's needed and asks for the key: paste it and press Enter.

The key is saved only on your computer. **Never send it to anyone or post it anywhere.**

## Making a voice-over

1. Double-click **`2 Make Voice.bat`**.
2. Type **1** for the male voice or **2** for the female voice.
3. Notepad opens: write or paste what the voice should say, then **save and close** Notepad.
4. Wait about a minute. The MP3 appears in the **`output`** folder, and the folder opens by itself.

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

## Using Claude instead

You can also open this folder in the Claude desktop app (**Code** tab) and just ask, for example:
"make a female voice-over of this: …" or "set me up". Claude follows [`CLAUDE.md`](CLAUDE.md).

## Making reels

The voices are ready. The reel-making part (video) comes next. Anokhi Reet already has a video studio
(the `anokhireet-videos` repo) that can take a voice-over file. Ask the owner before using AI voices in it:
that studio currently has a "no AI voices" rule.

## What's inside

| Path | What it is |
|---|---|
| `1 Setup.bat`, `2 Make Voice.bat` | The two buttons for everyday use |
| `voice/samples/` | The approved male and female voices |
| `voice/examples/` | Example scripts |
| `voice/gen_voice.py` | The voice tool (the buttons run it) |
| `docs/voices.md` | Exact voice settings, for other tools or AI agents |
| `DECISIONS.md` | Choices made and why |
| `output/` | Your finished voice-overs (stay on your computer, not on GitHub) |
