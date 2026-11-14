# 2D animation: what got better, and what to improve next

Every reel adds at least one improvement to the engine or library and writes it here (newest first).
See [GUIDE.md](GUIDE.md) section 8.

## 2026-11-14: shared library and our own renderer (owner + Claude)

- The engine from Deep's reel became a **shared library** in `animation/`: `engine/` (rig, timing, scenes, captions,
  sets, props, page), `cast/` (reusable characters + sheet), `starter/` (copy to start a reel).
- **Rendering on the computer** with Edge/Chrome + ffmpeg: `tools/render_reel.py` (`--sheet`, `--at`, `--draft`,
  final MP4, `--cover`) with a **layout check** (safe zones, right-side buttons, text size).
- **Caption timing from the voice**: `tools/caption_timing.py` anchors the script's breaks to the real pauses.
- **Lip sync**: `life(id, t, {speak: true})` (and `talkMouth`) open the mouth with the real voice's loudness.
- **Eyes**: `look: [x, y]` in `life()`/`face()` so characters look at each other, the phone, the board.
- **Transitions**: `tin` + `trans` (`fade`, `zoom`, `slide`, `rise`, `iris`) for big moments; hard cuts stay default.
- **Captions** kept clear of Instagram's right-side buttons (narrower column) and with real gaps between words.
- **Men no longer get a hair bun** by default (`hairStyle` defaults to a short crop for `male`).

## 2026-11-13: first 2D reel (Deep)

- Flat outlined cartoon style, character rig (`person`, `arm`, `face` with blink, breath and sway), rooms, props,
  word-by-word captions with gold keywords, label pills, titles, speech bubbles, follow card, reel cover.

## Next improvements (pick at least one per reel)

- **Walking / entering:** characters walk in and out (legs for full figures, or a glide with a step bob).
- **Head turns:** a three-quarter view (face features shifted, one ear) to turn towards another character.
- **More expressions:** laugh (eyes closed, big mouth), cry, angry, thinking (hand on chin), shock (jaw drop).
- **Cloth follow-through:** dupatta and pallu swing a little after a move.
- **Hands holding things:** a helper that keeps a prop in a hand while the arm moves (phone, bag, plate, card).
- **New sets:** rental shop, street and market, kitchen, office, college, garba ground, auto-rickshaw, Anokhi Reet
  app screens drawn in the flat style.
- **New cast:** see `cast/CAST.md` ideas.
- **Shot variety:** close-up face shots, over-the-shoulder, top-down table, split screen helpers.
- **Optional music:** a quiet track under the voice (free, owner-approved), mixed by `render_reel.py`.
- **Faster renders:** render several frames in parallel pages.
