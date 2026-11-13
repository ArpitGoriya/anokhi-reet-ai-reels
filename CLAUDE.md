# Anokhi Reet AI Reels: rules for Claude

The people here make voice-overs (and later reels) for Anokhi Reet, an ethnic-wear rental and shopping app.
Most are **not technical**. Speak plainly, say what you're doing in one sentence, and never show them stack
traces, git or JSON unless they ask.

## Common requests

- **"Set me up"**, "it's not working", or right after cloning: follow the `set-me-up` skill
  (`.claude/skills/set-me-up/SKILL.md`). Works on Windows and Mac. The person pastes the key into `.env` in the
  editor the skill opens; never ask for the key in chat, and never read or print `.env`
  (`tools/setup_helper.py check` reports only present/works).
- **Voice-over requests**: follow the `make-voice` skill. You cannot hear audio: they judge how it sounds.
- **Script writing**: Hindi in Devanagari, English words in Latin letters, numbers as words, `...` for pauses.
  **Female voice = female Hindi grammar** ("दिखाने वाली हूँ", "भेज दूँगी").

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
