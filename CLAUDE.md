# Anokhi Reet AI Reels: rules for Claude

The people here make voice-overs (and later reels) for Anokhi Reet, an ethnic-wear rental and shopping app.
Most are **not technical**. Speak plainly, say what you're doing in one sentence, and never show them stack
traces, git or JSON unless they ask.

## Common requests

- **"Set me up"**: run `tools/setup.ps1` for them, or tell them to double-click `1 Setup.bat`. They paste their
  Gemini key into that window themselves: never ask them to paste a key into the chat, and never read or print
  `.env`.
- **"Make a male/female voice-over of …"**: write the text to `scripts/current-script.txt` (UTF-8), then run
  `.venv/Scripts/python.exe voice/gen_voice.py scripts/current-script.txt output/<male|female>-<date-time>.mp3 --persona <male|female>`.
  Tell them where the MP3 is. You cannot hear audio: they judge how it sounds.
- **Writing scripts**: Hindi in Devanagari, English words in Latin letters, numbers as words, `...` for pauses.
  **Female voice = female Hindi grammar** ("दिखाने वाली हूँ", "भेज दूँगी"). Check this before generating; a male
  verb in a female voice sounds wrong.
- **"Out of quota"**: each model allows 10 a day per key; the tool already switches 3.1 → 3.8. Use
  `--allow-backup` (2.5, deeper and flatter) only if they say it's really needed. Otherwise: try later.

## Rules

- **Never change the two voices** (voice names, persona, "Delivery" notes, speed 1.15, model order). They were
  approved by the owner (ArpitGoriya). Details and reasons: [docs/voices.md](docs/voices.md),
  [DECISIONS.md](DECISIONS.md). New feels or voices only as an experiment, with the owner's OK.
- **Never commit secrets** (`.env`, keys). Finished audio stays in `output/` (not on GitHub).
- **One Gemini key per person or project. Don't rotate several keys or accounts** to get past the free limits
  (against Google's terms; risks a ban).
- **Free tools only** for voice and video.
- The video studio (`anokhireet-videos`) has a "no AI voices" rule. Don't put these voices into it unless the
  owner has changed that rule.

## Keeping things in sync

Record new decisions in `DECISIONS.md`. Commit and push only when the person asks.
