---
name: make-voice
description: Make an Anokhi Reet voice-over (MP3) with the approved male or female voice. Use when the person asks for a voice-over, voice, audio, narration or "bolo" of a script, or to make a script into audio.
---

# Make a voice-over

`PY` = `.venv/Scripts/python.exe` (Windows) or `.venv/bin/python` (Mac/Linux). If it is missing, run the
`set-me-up` skill first.

1. **Male or female?** Ask if they didn't say. Male = Sadachbia (warm, confident), female = Vindemiatrix (sweet).
2. **Script check** (fix it yourself, then show them the final text in one block):
   - Hindi in Devanagari, English words in Latin letters. If they wrote Hinglish in Roman letters, convert the
     Hindi parts to Devanagari.
   - **Female voice = female Hindi** ("दिखाने वाली हूँ", "भेज दूँगी", "मैं गई"); male = "वाला हूँ", "दूँगा".
   - Numbers as words ("पाँच सौ"), `...` for a pause. No prices or number claims unless they insist.
3. **Generate:** write the text (UTF-8) to `scripts/current-script.txt`, then run
   `PY voice/gen_voice.py scripts/current-script.txt output/<male|female>-<YYYY-MM-DD_HH-MM-SS>.mp3 --persona <male|female>`
4. **Hand over:** `PY tools/setup_helper.py open-output`, and tell them the file name. You can't hear audio:
   ask them to listen and say if anything sounds off (a word mispronounced → respell it, e.g. in Devanagari, and redo).
5. **Quota:** each key gets 10 per model per day; the tool moves from 3.1 to 3.8 by itself. If both are used up,
   say so and suggest trying later. Add `--allow-backup` (2.5, deeper and flatter) only if they say it's urgent.

Never change the voice settings in `voice/gen_voice.py`; they're owner-approved (see `docs/voices.md`).
