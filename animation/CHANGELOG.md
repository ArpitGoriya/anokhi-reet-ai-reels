# 2D animation: what got better, and what to improve next

Every reel adds at least one improvement to the engine or library and writes it here (newest first).
See [GUIDE.md](GUIDE.md) section 8.

## 2026-11-17: Last minute invitation (dhruvifewtone-wq)

- **New set: street** (`streetBG(id, {sign, dress})`): office building on the main road, a side lane beside it, and a
  small rental shop just round the corner (awning, sign board, an outfit in the window), footpath and road.
- **Big sofa a character sits in** (`sofaBackSVG` before the bust, `sofaFrontSVG` after, same x and waist y):
  backrest to the shoulders, seat cushion and armrests over the lap. The old `sofaSVG` was too small to sit in.
- **Countdown timer** (`timerHTML(id, at)` + `timerSet(id, hours)`, CSS `.pill.timer`): small, top-left, HH:MM:SS.
- **Rewind / fast-forward streaks** (`streaksSVG` + `streaks(id, t, t0, d, dir)`).
- **Split-screen video call** (`callPanelSVG(id, y, h, name, inner, bg)` + `callEndSVG`).
- **Expressions:** `wink: true` in `life()`/`face()` (right eye shut), mouth `'shock'` (jaw drop).
- **Props:** `phoneBackSVG` (screen hidden from the viewer), `arOutfitScreen({chips, look, title, shop})` (app
  screen: chips, one outfit card from a shop, Book button → "Booked ✓").
- **New cast:** `AARTI` (.office/.home/.sangeet), `DIMPLE` (.home/.sangeet), `HETALBEN` (rental shop owner,
  Ahmedabad; not Surat's Hetal ben).
- Caption timing again needed hand-fixing after 23 s (93 of 230 words matched). The matcher re-anchoring is now
  the top "Next improvement".

## 2026-11-17: Season ka sapna (dhruvifewtone-wq)

- **New set: rental shop** (`rentalShopBG` in `sets.js`): racks of lehengas and sherwanis (`rackSVG`, each hanger
  `<rack>-i<n>` can be "rented out"), mirror, optional sign and clock. New prop `sherwaniHangerSVG`.
- **Dream look** (`dreamSVG` + `dreamUpd`): soft gold glow, cream wavy edges that ripple, drifting sparkles; and a
  **glass shatter** wake-up (`shardsSVG` + `shatter`). A ripple-into-dream transition with an SVG displacement filter
  (see the reel's S2).
- **Walking in** (`glide` in `sets.js`): a character glides in with a step bob (from "Next improvements").
- **Props** (`props.js`): `registerSVG` + `registerFill` (a booking register that fills row by row), `bulbSVG`
  (idea), `buzzSVG` (phone ringing), `sparkleSVG`, and **Anokhi Reet app screens in the flat style**:
  `arPostScreen(line1, line2)` and `arBrowseScreen()` (City / Occasion / Budget chips, outfit cards).
- **New cast:** `PANKAJ` (Pankaj bhai, rental shop owner) and `CUSTOMER_W` (young customer with a ponytail).
- **Thinking pose:** hand on chin = `R: [-73, -110]`, `hR: 'fist'` with `look: [.5, -.8]`.
- Caption timing: whisper's script matcher lost its place after 31 s on this take (only 59 of 145 words matched);
  the last 12 captions were set by hand from whisper's own word times. Worth making the matcher re-anchor.

## 2026-11-17: rental shop, mall and Kavita (Kavita aur Bargain)

- **New sets** in `engine/sets.js`: `shopBG(id, {night, noRail, noSign, sign, lamp})`, a lehenga rental shop with a
  sign board and two rails of lehengas (each hanger has an id, so lehengas can go out on rent); `mallBG(id)`, a
  bright mall clothes shop with a kurti rack.
- **New props** in `engine/props.js`: `kurtiSVG`, `gallaSVG` (cash box with an opening drawer), `calculatorSVG`
  (screen text you can change), `ledgerSVG` (open account book), `jewelBoxSVG` (lid opens), `chocolateSVG`, `toffeeSVG`, `noteSVG`,
  `personIcon` (small customers for counts like "8 out of 10"), `ideaBulbSVG` (big bulb with rays), `shutterSVG` (rolls up), `dryCleanIcon`,
  `needleIcon`.
- **New poses**: `THINK` (hand under the chin) and `IDEA` (finger up) for `life(..., {R: THINK})`.
- **Crowd that changes sides**: a row of `personIcon`s walks from one side to the other (the chocolate/toffee
  experiment). Kavita walks into the mall with `glide`.
- Two rental shop sets now exist: `rentalShopBG` (racks, mirror) and `shopBG` (sign board, two lehenga rails).
  Pick the one that fits; both are kept.
- **New cast**: Kavita (`KAVITA.shop`, `.night`, `.mall`).

## 2026-11-14 (later): captions in sync with the voice

- Owner: the voice runs ahead of the picture. Caption times inside long sentences were estimated and ran late
  (fixed below). **Still open:** the owner sees the whole video behind the voice, not only the captions, although
  a file check showed cuts on the right frame and the audio unshifted. Paused by the owner (2026-11-14); look into
  it if it shows up again (check on a phone, and with real word times).
- `tools/caption_timing.py` now uses **faster-whisper** to hear when every word is said (falls back to pauses if
  it isn't installed or memory is short) and writes `WORDS`, so the word-by-word highlight follows the voice.
  Captions appear 0.08 s before the word.
- Not yet re-checked by ear on a rendered reel.

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
- **New sets:** street and market, kitchen, office, college, garba ground, auto-rickshaw, Anokhi Reet
  app screens drawn in the flat style.
- **New cast:** see `cast/CAST.md` ideas.
- **Shot variety:** close-up face shots, over-the-shoulder, top-down table, split screen helpers.
- **Optional music:** a quiet track under the voice (free, owner-approved), mixed by `render_reel.py`.
- **Faster renders:** render several frames in parallel pages.
