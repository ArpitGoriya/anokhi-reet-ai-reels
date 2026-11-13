# The two voices: exact settings

Both voices are **built-in Google Gemini voices plus fixed settings**, not clones and not files. Anyone (a person,
another tool or another AI agent) gets exactly the same voice by using these settings. `voice/gen_voice.py` has
them all built in.

## Shared settings

- **API:** Gemini API, version **v1beta** (the default version rejects `speechConfig`).
- **Models, in this order:** `gemini-3.1-flash-tts-preview` first. When its free daily quota is used up,
  `gemini-3.8-flash-tts` (same voice names, sounds slightly deeper). Backup only when really needed:
  `gemini-2.5-flash-preview-tts` (deeper and flatter; `--allow-backup`).
- **Output:** 24 kHz, mono, 16-bit PCM → WAV.
- **Speed:** after generating, speed up **1.15×** without changing pitch: `ffmpeg -i in.wav -filter:a atempo=1.15 out.wav`.
- **Prompt:** the director's note below, a blank line, `Script:`, a new line, then the text.
- **Script style:** Hindi in Devanagari, English words in Latin letters.
- **Free limits (per Google project, per model):** 10 requests a day, 3 a minute. Failed retries also count.

## Male voice: Sadachbia, "calm"

Reference: `voice/samples/male-voice.mp3` (pitch about 162 Hz, swing 14.2 semitones).

```text
Read the script below aloud as a young Indian man, about 22, who makes popular Instagram reels. Natural Hinglish: Hindi words in a North Indian accent, English words said the way young Indians say them. Do not read these instructions aloud; read only the script. Delivery: warm, confident and conversational, like explaining something useful to a friend. Moderate energy, relaxed and smiling. Not excited, never shouting. Normal pace with short natural pauses.
```

## Female voice: Vindemiatrix, "sweet"

Reference: `voice/samples/female-voice.mp3` (pitch about 204 Hz, swing 13.9 semitones).

```text
Read the script below aloud as a young Indian woman, about 22, who makes popular Instagram reels. Natural Hinglish: Hindi words in a North Indian accent, English words said the way young Indians say them. Do not read these instructions aloud; read only the script. Delivery: sweet, warm and friendly, with a soft smile in the voice, like a kind friend sharing a useful secret. Gentle but confident and clear, light and pleasant, never childish, breathy or dramatic. Moderate energy, normal pace with short natural pauses.
```

Female scripts need female Hindi grammar ("वाली हूँ", "दूँगी").

## Changing the feel

Keep the **voice name** and the **"young Indian man/woman, about 22"** part the same and the voice stays
recognisably ours. Change only the "Delivery:" sentence to change the energy. Use `--speed` for pace; prompts
asking for "fast pace" proved unreliable.

## Where the voices came from

Tuned and approved by the owner in the Instagram Accounts project: male on 2026-11-12 (out of about 15 candidates
across Edge, Chatterbox and Gemini), female on 2026-11-13 (out of 5 Gemini voices). The topic line was changed
from "reels about AI and tech" to "reels" for Anokhi Reet; the voice and delivery are unchanged.
