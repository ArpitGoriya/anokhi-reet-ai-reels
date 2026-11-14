# Decisions

## 2026-11-13: project started

- **Reels for Anokhi Reet instead of FewTone** (owner). The FewTone reels idea (Instagram Accounts project) is on
  hold. This repo holds the voices and instructions so non-tech teammates can make voice-overs and, later, reels.
- **Male voice:** Gemini Sadachbia, "calm" delivery, speed 1.15. Approved by the owner 2026-11-12 (sample "K").
  Its first target was the ElevenLabs "Bunty" feel (punchy reel voice), measured but not copied.
- **Female voice:** Gemini Vindemiatrix, "sweet" delivery, speed 1.15. Approved by the owner 2026-11-13 (sample
  "D"; chosen over Leda, Aoede, Achernar, Laomedeia).
- **Models:** 3.1 Flash TTS first, then 3.8 Flash TTS (owner: both "good"). 2.5 Flash TTS only when really needed.
- **Topic line** in the voice prompt changed from "reels about AI and tech" to "reels" (Anokhi Reet is fashion,
  not tech). Voice and delivery unchanged.
- **Free only, no billing.** Paid Gemini (Tier 1) would cost about $0.015 per 30 s voice-over; not needed.
- **One key per person/project**, no key rotation to get around limits.
- **Rejected earlier** (don't re-propose): Kokoro Hindi voices (flat), Edge Madhur (announcer-like), Chatterbox's
  built-in voice (sounds mixed-gender), cloning a paid ElevenLabs Library voice.

- **Setup only through Claude** (owner): no .bat files. Teammates say "clone ... and set me up"; Claude installs everything (Windows or Mac), then opens `.env` in Notepad/TextEdit for them to paste their key. Skills: `set-me-up`, `make-voice`.

## 2026-11-13: reels

- **Voice-over first, every scene timed to its voice line.**
- **Brand copied into this repo** (`brand/`): the Anokhi Reet brand (colours, gradients, fonts,
  logos, patterns, rules, never-say) + the website's free-tools design system ("Anokhi Reet Tools"). Updates happen
  here; this copy wins over the originals for reels (owner).
- **Fonts: Inter for everything, Arya only for Hindi** (brand / website). The older video studio's
  Playfair Display headlines are not used.
- **AI voices are allowed in these reels** (the older `anokhireet-videos` studio's "no AI voices" rule stays there).
- **Teammates' changes override the defaults for their own reel**, recorded in the reel's `REEL.md`; logo rules,
  never-say list and voices stay. Changes for everyone go to the owner.
- **Show everything in the chat** (scripts, storyboards, captions, briefs), not only in files: teammates aren't
  technical (owner).
- **Claude commits and pushes on its own** at each milestone and at the end of a session, without asking (owner).
  Only text files; never keys, audio or video.

## 2026-11-14: 2D animation

- **Reels are flat 2D cartoon animations drawn in code** (owner, after Deep's "Hetal ben's lehenga" reel, which
  the owner liked). Keep its art style; make every reel's story, scenes and character acting its own; reuse
  characters from earlier reels when the story fits. Guide: `animation/GUIDE.md`.
- **Shared library** in `animation/` (engine, sets, props, cast, starter); each reel keeps only its own scenes and
  captions. Library additions are welcome; the look (GUIDE.md section 1) changes only with the owner's OK.
- **Videos are rendered on the computer** with Edge/Chrome + ffmpeg (`tools/render_reel.py`), free; captions are
  timed from the voice by `tools/caption_timing.py`; voice timings by `tools/voice_timing.py`.
- **Keep improving:** every reel adds at least one improvement to the library, logged in `animation/CHANGELOG.md`.
- **Story numbers** (a character's own prices in her story) are allowed in story reels; Anokhi Reet's own prices,
  savings and number claims stay on the never-say list (Deep, 2026-11-13; owner to confirm as a default).
- **Captions timed from what the voice really says** (faster-whisper, free, installed by setup), after the owner
  found the voice running ahead of the picture (2026-11-14).
- **Team readiness:** setup also sets each person's name for GitHub saves and checks push access; line endings are
  fixed by `.gitattributes` so Windows and Mac teammates don't clash.

