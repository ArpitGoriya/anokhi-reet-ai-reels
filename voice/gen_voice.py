"""Make an Anokhi Reet voice-over with Gemini TTS (free tier, Google AI Studio key).
Copied from the Instagram Accounts project, where both voices were tuned and approved.
Output: .wav, or .mp3 if the output name ends in .mp3.

Usage (approved reel voices, no other options needed):
  .venv/Scripts/python.exe voice/gen_voice.py <script.txt> <out.wav>
  = male: voice Sadachbia, preset "calm", speed 1.15 (owner-approved 2026-11-12).
  .venv/Scripts/python.exe voice/gen_voice.py <script.txt> <out.wav> --persona female
  = female: voice Vindemiatrix, preset "sweet", speed 1.15 (owner-approved 2026-11-13).
  Female scripts need female Hindi grammar (e.g. "वाली हूँ", "दूँगी").
Models: tries 3.1 Flash TTS, then 3.8 Flash TTS when 3.1's daily free quota is used up
         (--allow-backup adds 2.5 Flash TTS last; --model NAME forces one model).
Options: --voice NAME, --persona male|female, --preset calm|sweet|upbeat|balanced|excited,
         --style "custom note",
         --speed 1.0 (as generated), --model gemini-3.1-flash-tts-preview

Reads GEMINI_API_KEY from the environment or from .env in the repo root
(never printed). Output: 24 kHz mono 16-bit WAV.
Male voices worth trying for a young, energetic reel voice:
Puck (upbeat), Fenrir (excitable), Sadachbia (lively), Achird (friendly),
Zubenelgenubi (casual), Orus (firm), Charon (informative).
Female voices (use --persona female): Leda (youthful), Aoede (breezy), Achernar (soft),
Vindemiatrix (gentle), Sulafat (warm), Despina (smooth), Laomedeia (upbeat), Autonoe (bright).
"""
import argparse
import os
import pathlib
import re
import time
import wave

ROOT = pathlib.Path(__file__).resolve().parents[1]

_PERSONA = {
    "male": "a young Indian man, about 22,",
    "female": "a young Indian woman, about 22,",
}
_BASE = (
    "Read the script below aloud as {who} who makes popular Instagram reels. "
    "Natural Hinglish: Hindi words in a North Indian accent, English words said the way young Indians say them. "
    "Do not read these instructions aloud; read only the script."
)

# Delivery presets. APPROVED REEL VOICE (owner, 2026-11-12): Sadachbia + "calm" + speed 1.15
# (sample "K", voice/samples/male-voice.mp3). Other presets kept for experiments.
# "{who}" is filled from --persona (male/female).
PRESETS = {
    "calm": _BASE + " Delivery: warm, confident and conversational, like explaining something useful to a friend. "
                    "Moderate energy, relaxed and smiling. Not excited, never shouting. Normal pace with short natural pauses.",
    "sweet": _BASE + " Delivery: sweet, warm and friendly, with a soft smile in the voice, like a kind friend sharing a "
                     "useful secret. Gentle but confident and clear, light and pleasant, never childish, breathy or dramatic. "
                     "Moderate energy, normal pace with short natural pauses.",
    "upbeat": _BASE + " Delivery: confident and upbeat with medium-high energy, like a creator who knows the topic well "
                      "and enjoys sharing it. Clearly enthusiastic but not over-excited, keep the pitch natural and steady. "
                      "Quick pace with short, snappy pauses; keep it moving.",
    "balanced": _BASE + " Delivery: crisp, clear and confident with steady energy. Friendly and engaging, but controlled: "
                        "lift the energy only on the key words, keep the rest calm and even. Moderately fast pace with short pauses.",
    "excited": (
        "Read the script below aloud as {who} who makes viral Instagram reels. "
        "High energy, punchy and crisp, friendly and excited, like telling a friend something amazing. "
        "Fast pace with short, snappy pauses. Natural Hinglish: Hindi words in a North Indian accent, "
        "English words pronounced the way young Indians say them. "
        "Do not read these instructions aloud; read only the script."
    ),
}
DEFAULT_VOICE = "Sadachbia"
# APPROVED FEMALE VOICE (owner, 2026-11-13): Vindemiatrix + "sweet" + speed 1.15 (sample "D",
# voice/samples/female-voice.mp3). `--persona female` picks these automatically.
FEMALE_VOICE = "Vindemiatrix"
FEMALE_PRESET = "sweet"


def api_key():
    k = os.environ.get("GEMINI_API_KEY", "").strip()
    if not k and (ROOT / ".env").exists():
        for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
            if line.startswith("GEMINI_API_KEY="):
                k = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not k:
        raise SystemExit("No Gemini key found. Double-click '1 Setup.bat' and paste your key when it asks.")
    return k


# Free-tier model order (owner, 2026-11-13): each model has its own 10 requests/day.
# Use 3.1 first (approved voice); when its daily quota is used up, switch to 3.8.
# 2.5 sounds deeper and flatter: backup only, used with --allow-backup.
MODEL_CHAIN = ["gemini-3.1-flash-tts-preview", "gemini-3.8-flash-tts"]
BACKUP_MODELS = ["gemini-2.5-flash-preview-tts"]


class DailyQuotaExhausted(Exception):
    pass


def generate_any(text, voice, style, models):
    """Try each model in order; move on when one's daily free quota is used up."""
    for model in models:
        try:
            return generate(text, voice, style, model), model
        except DailyQuotaExhausted:
            print(f"{model}: daily free quota used up, trying the next model")
    raise SystemExit("All models are out of free quota right now (it frees up over the day; check aistudio.google.com/rate-limit). "
                     "Use --allow-backup to add the 2.5 model.")


def generate(text, voice, style, model, retries=6):
    from google import genai
    from google.genai import types
    client = genai.Client(api_key=api_key(), http_options={"api_version": "v1beta"})
    cfg = types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=types.SpeechConfig(voice_config=types.VoiceConfig(
            prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=voice))))
    prompt = f"{style}\n\nScript:\n{text}"
    for attempt in range(retries):
        try:
            r = client.models.generate_content(model=model, contents=prompt, config=cfg)
            return r.candidates[0].content.parts[0].inline_data.data
        except Exception as e:  # rate limits on the free tier
            msg = str(e)
            if ("429" in msg or "RESOURCE_EXHAUSTED" in msg) and re.search(r"per ?day", msg, re.I):
                raise DailyQuotaExhausted(model)
            if "429" in msg or "RESOURCE_EXHAUSTED" in msg or "503" in msg:
                m = re.search(r"retry in ([\d.]+)s", msg)
                wait = float(m.group(1)) + 2 if m else 30 * (attempt + 1)
                print(f"rate limited, waiting {wait:.0f}s")
                time.sleep(wait)
                continue
            raise
    raise RuntimeError("gave up after rate limits")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script")
    ap.add_argument("out")
    ap.add_argument("--voice", help="default: Sadachbia (male) or Vindemiatrix (female)")
    ap.add_argument("--preset", choices=sorted(PRESETS), help="default: calm (male) or sweet (female)")
    ap.add_argument("--persona", choices=sorted(_PERSONA), default="male")
    ap.add_argument("--style", help="custom director's note (overrides --preset)")
    ap.add_argument("--model", help="use only this model (default: MODEL_CHAIN, 3.1 then 3.8)")
    ap.add_argument("--allow-backup", action="store_true",
                    help="after the main models run out, also use the 2.5 backup model")
    ap.add_argument("--speed", type=float, default=1.15,
                    help="tempo change without pitch change; approved default 1.15 (15%% faster). 1.0 = as generated")
    a = ap.parse_args()
    female = a.persona == "female"
    a.voice = a.voice or (FEMALE_VOICE if female else DEFAULT_VOICE)
    a.preset = a.preset or (FEMALE_PRESET if female else "calm")
    text = pathlib.Path(a.script).read_text(encoding="utf-8-sig").strip()
    if not text:
        raise SystemExit("The script is empty: write what the voice should say, save, and close Notepad.")
    final_out = a.out
    if a.out.lower().endswith(".mp3"):
        a.out = a.out[:-4] + ".wav"
    t = time.time()
    models = [a.model] if a.model else MODEL_CHAIN + (BACKUP_MODELS if a.allow_backup else [])
    pcm, model = generate_any(text, a.voice, a.style or PRESETS[a.preset].format(who=_PERSONA[a.persona]), models)
    with wave.open(a.out, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(24000)
        w.writeframes(pcm)
    secs = len(pcm) / 2 / 24000
    if abs(a.speed - 1.0) > 1e-3:
        import shutil
        import subprocess
        import imageio_ffmpeg
        tmp = a.out + ".raw.wav"
        shutil.move(a.out, tmp)
        subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-i", tmp,
                        "-filter:a", f"atempo={a.speed}", a.out], check=True)
        os.remove(tmp)
        secs /= a.speed
    if final_out != a.out:
        import subprocess
        import imageio_ffmpeg
        subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-i", a.out,
                        "-b:a", "192k", final_out], check=True)
        os.remove(a.out)
    print(f"{a.voice} on {model}: {secs:.1f}s audio in {time.time()-t:.0f}s")


if __name__ == "__main__":
    main()
