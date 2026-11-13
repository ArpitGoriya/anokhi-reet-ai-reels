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

- **Reels are made with Claude + Marketing Studio** (real app screens by recording or screenshots), voice-over
  first, every scene timed to its voice line (Marketing Studio's `inbox` gives the line timings).
- **Brand copied into this repo** (`brand/`): Marketing Studio's Anokhi Reet brand (colours, gradients, fonts,
  logos, patterns, rules, never-say) + the website's free-tools design system ("Anokhi Reet Tools"). Updates happen
  here; this copy wins over the originals for reels (owner).
- **Fonts: Inter for everything, Arya only for Hindi** (Marketing Studio / website). The older video studio's
  Playfair Display headlines are not used.
- **AI voices are allowed in these reels** (the older `anokhireet-videos` studio's "no AI voices" rule stays there).
- **Teammates' changes override the defaults for their own reel**, recorded in the reel's `REEL.md`; logo rules,
  never-say list and voices stay. Changes for everyone go to the owner.
