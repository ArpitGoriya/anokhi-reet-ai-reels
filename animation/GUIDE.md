# 2D animation guide (Anokhi Reet reels)

Our reels are **flat 2D cartoon animation drawn in code** (SVG + a little HTML), timed to our AI voice, rendered to
MP4 on the computer for free. The first one, Deep's "Hetal ben's lehenga" (`reels/2026-11-13-hetal-lehenga-sunk-cost`),
set the look. This guide keeps that **art style** and the **quality bar**, so every reel feels like the same channel,
while each reel gets **its own story, scenes and character animation**. Hetal's reel is an example, not a template.

Read this before planning a 2D reel. Then: [`animation/cast/CAST.md`](cast/CAST.md) (who we can reuse),
[`animation/CHANGELOG.md`](CHANGELOG.md) (what the engine can do now, and what to improve next).

## 1. The look (keep it: this is the channel's style)

- **Flat shapes, one outline.** Everything has a dark brown outline `#3B2418` (`OL`), 5 px (`OW`) on characters and
  big props, 3-4 px on small details. Round joins. No gradients on objects, no glossy highlights, no 3D.
- **Light only where it means something:** a soft gold `url(#glow)` behind the hero object, a ground shadow ellipse
  (opacity .16) under standing people, a 6-10 px flat brown drop under pills and bubbles. Nothing else.
- **Colours:** the brand palette (`brand/BRAND.md`) for brand moments (maroon `url(#mar)` title cards, gold, cream),
  plus the warm story palette in `C` (`animation/engine/lib.js`): cream and beige walls, wood browns, jewel-tone
  clothes (maroon, teal, pink, emerald, marigold). New colours: add them to `C` with a name, don't scatter hex codes.
- **Characters:** big round head on a simple torso, dot eyes with a white highlight, simple brows, blush, small
  mouth; Indian skin tones (vary them between characters); real Indian clothes and jewellery (saree pallu, dupatta,
  lehenga skirt, kurta, bindi, bangles, gajra). Friendly, never mocking. Built with `person()`: see section 6.
- **Text:** Inter only (Arya for Devanagari on screen). Captions: big white words with a thick maroon-deep outline,
  keywords in gold, appearing word by word. Labels: white pills with a brown border (`.pill`), `hl` for a gold
  highlight. Titles: very big outlined words on the key moments (`.title`). Speech: white bubbles (`.bubble`).
- **Brand:** the small "Anokhi Reet" seal pill at the top right, the follow card at the end. Never-say list from
  `BRAND.md` applies to everything **we** say. Numbers that belong to a character's story (her ₹38,000 lehenga) are
  allowed as story numbers (Deep, 2026-11-13); they're never Anokhi Reet prices, savings claims or user counts.

## 2. Motion (what makes it feel like real animation)

- **Nothing is ever frozen.** Every character on screen gets `life()` every frame: blinks, breathes, sways a little.
  Props with `class="sway"` move like leaves; fairy lights twinkle.
- **Something changes every 1-2 seconds**: a pop, a gesture, a new prop, a counter, a camera push. Hold a big reveal
  for 0.3-0.6 s before the next thing.
- **Easing, never linear** (except counters): `E.out` for things arriving, `E.io` for moves, `E.back`/`pop()` for
  pops with a little overshoot. Things that fall `drop` and bounce; tags `swing`; coins `bob`.
- **Anticipation and follow-through:** a small `hop()` before joy, a lean before a point, a swing that settles.
- **Acting matches the words.** Wave on "ye hain…", point on "ye toh…", clasp hands when happy, `sweat` and `blush`
  when caught out, `brows: 'worry'` when unsure, `look` at the thing being talked about (the phone, the other
  person, up when thinking). Characters who say a quoted line get `speak: true` (lip sync from the real voice).
- **Camera:** each scene pushes in slowly (default 1 → 1.035). One stronger zoom per scene at most, to show a detail
  (`cam: [1, 1.2], fx, fy`). No shake, no spins.
- **Cuts land on caption chunks** (`T('c12')`). Hard cuts are the default. Soft transitions (`tin: .3`,
  `trans: 'fade' | 'zoom' | 'slide' | 'rise' | 'iris'`) only into big moments: the idea's title card, the moral.
- **No swish/whoosh sound effects** (brand rule). Music only if asked, quiet under the voice.

## 3. Story shape (story reels, 60-100 s)

A shape that works, not a fixed list. Move, merge or drop beats to fit the story.

1. **Hook, 0-3 s:** the strongest image + an outlined title with the paradox or number ("₹38,000 ki lehenga, photo
   se GAAYAB!"). No logo intro.
2. **Meet the person:** name + city pill, one gesture that shows who they are.
3. **The problem in 3-5 quick beats**, each its own little scene.
4. **Name the idea** on a maroon title card (the concept the reel teaches).
5. **Proof:** a study, a number, an everyday comparison everyone knows.
6. **The fix in steps** (`STEP 1/2/3` pills), each shown, not told.
7. **Payoff:** the result in the character's life, then a warm emotional moment.
8. **The line to remember** (big title) → **follow card**.

Short reels (15-30 s): hook → one problem beat → the fix → result → follow card.

## 4. Make every reel its own (don't copy the last one)

- **Reuse the style and the toolkit; never reuse a scene list.** For each new reel, plan scenes from its own script.
- **Characters:** reuse a cast member when the story fits (a recurring cast builds familiarity: Hetal ben, Mausi), in
  a new situation and usually a new outfit (`dress(HETAL.home, {top: ..., pallu: ...})`). Otherwise make a new
  character with `person()` options (age, hair, glasses, skin, clothes, male/female). **Every character's acting is
  written for this reel**: their own gestures, looks and expressions per line, not copied from an old scene.
- **At least two new things per reel** in the library: a new set (shop, street, market, kitchen, office, garba
  ground, auto-rickshaw…), a new prop, a new expression or gesture, a new kind of shot. Put reusable drawings in
  `animation/engine/sets.js` or `props.js` (one-line comment each), reel-only ones in the reel's `video/props.js`.
- **Vary the shots:** wide room, waist-up close, face close-up, over-the-shoulder, a phone screen filling the frame,
  a split screen, a top-down table, a chart or map, a title card. Don't use the same layout three scenes in a row.
- **Vary the hook** between reels: a number, a question, a surprising picture, a quote, a before/after.

## 5. Making a reel (commands)

`PY` = `.venv/Scripts/python.exe` (Windows) or `.venv/bin/python` (Mac). Files of a reel: `reels/<date>-<name>/`
with `REEL.md`, `script.txt` (the voice text) and `video/`: `captions.js`, `scenes.js`, `reel.json`, optional
`props.js`, `cover.js`. Start from [`animation/starter/`](starter/) (copy it into the reel as `video/`).

1. **Script + storyboard** approved (the `make-reel` skill), then the voice: `make-voice` skill → `output/<file>.mp3`,
   put its name in `video/reel.json` (`{"voice": "output/<file>.mp3"}`).
2. **Captions:** write `CHUNKS` in `captions.js`: `['c1', 'Roman Hinglish caption with *gold* words', <how many
   words of script.txt it covers>]`, 3-7 words each, breaking where the voice pauses. Then
   `PY tools/caption_timing.py reels/<reel>` fills in the times. Redo this after **every** new voice take.
3. **Scenes:** `scenes.js`, one `addScene(from, to, {...})` per beat, times as caption refs (`'c5'`, `'c5+0.4'`,
   `'c7e'` = end of c7) so they follow the voice.
4. **Look often, it's fast:** `PY tools/render_reel.py reels/<reel> --sheet` (12 moments + the layout check) or
   `--at 3.2,14,40` (exact moments). Open `video/preview.html` in Chrome/Edge to watch it play (`?t=12` for one
   moment). Fix everything the layout check says.
5. **Draft video** to judge timing and motion: `--draft` (half size, 15 fps, a minute or two).
6. **Final:** `PY tools/render_reel.py reels/<reel>` → `output/<reel>.mp4` (1080x1920, 30 fps, voice at -14 LUFS).
   Cover: `--cover` (needs `video/cover.js`; keep its text inside the middle 1080x1350, the grid crop).

## 6. Engine cheat sheet

- **Scenes:** `addScene(a, b, { svg, html, init(s), upd(t, lt, s), cam: [z0, z1], fx, fy, capY, noCap, noWm,
  noSettle, tin, trans })`. `svg` is drawn once; `upd` moves things every frame (`t` = video time, `lt` = time in
  scene).
- **Pops without code:** any element with `data-t="c4+0.3"` appears then; `data-k` = `pop` (default) | `fade` |
  `rise` | `drop` | `slideL` | `slideR` | `write` (wipes in, for chalk/handwriting); `data-d` duration;
  `data-out` when to leave; `data-swing="10"` swings and settles; `data-bob="6"` floats.
- **Timing:** `T('c8+0.4')`, `P(t, t0, d, E.out)` progress 0-1, `KF(t, [[t0, v0], [t1, v1]])` keyframes,
  `pop(t, t0)`, `wave(t, f)`, `noise(t, seed)`, `hop(t, t0, h)`.
- **Characters:** `stand(id, LOOK, x, y, scale)` (full figure) or `bust(id, LOOK, x, y, scale)` (waist-up), then in
  `upd`: `life(id, t, { mouth, brows, look: [x, y], blush, sweat, closed, tilt, nod, lean, sway, y, speak,
  L: [shoulder°, elbow°], R: [...], hL, hR, pivot, seed })`.
  Mouths: `smile big grin o flat sad worry talk shy`. Brows: `norm up worry angry sure`. Hands: `open point fist`.
  Ready poses: `CLASP` (hands together), `WAVE(t, t0)`. `life()` returns hand positions; `toScene(id, hand)` turns
  them into scene points, to put a phone or plate in a hand.
- **Look options** for `person()`: `top topD sleeve pallu border embroidery necklace gajra sindoor bindi glasses
  earrings bangles mustache male wide apron skin skin2 hair hairStyle (bun greybun long braid pony short crop)
  skirt ({c, d, b, w, h} or null)`.
- **Sets:** `homeBG(id, {night, lamp, noWindow, noShelf, noClock, noPlant, ...})`, `weddingBG({wall, drape,
  carpet})`, `theatreBG()`, `wallSVG()`, `floorSVG()`, `counterSVG()` (a foreground table edge for waist-up shots),
  `rosettes()`.
- **Props:** `lehengaHangerSVG almirahSVG priceTag(SVG) cardSVG torSVG fairyLightsSVG phoneSVG sofaSVG windowSVG
  plantSVG lampSVG shelfSVG coinSVG clockSVG calendarSVG heartPath bagSVG checkBadge miniPhoto blouseIcon
  dupattaIcon ticketSVG seatSVG plateSVG stepCard jarSVG`.
- **HTML labels:** `pillH(x, y, at, html, 'gold|maroon|green|big', out)`, `stepPill(n, text, at)`,
  `<div class="bubble">`, `<div class="title">`, `<div class="chalk">`.

## 7. Quality bar (check before showing anyone)

- [ ] The first frame already shows the hook (title + picture), no blank or fade-from-nothing start.
- [ ] Every line of the voice has a matching picture; nothing on screen contradicts the words.
- [ ] Captions in sync (re-run `caption_timing.py` after every voice take) and readable; layout check clean.
- [ ] Every character alive (blinks, breath, sway) and acting the line; eyes look where it matters.
- [ ] Something changes every 1-2 s; no scene longer than ~6 s without a new beat.
- [ ] Clear, uncluttered frames: one focus per moment, the rest quiet.
- [ ] Brand: colours, fonts, seal pill, follow card; no never-say claims in our words.
- [ ] At least two new things added to the library (section 4), noted in `CHANGELOG.md`.
- [ ] Watched the draft video start to end once, with the voice, before the final.

## 8. Keep improving

After every reel: write its "Lessons" in `REEL.md`, add what got better in the engine or library to
[`CHANGELOG.md`](CHANGELOG.md), and move anything reusable out of the reel into `animation/`. Each new reel picks
**at least one item from "Next improvements"** in the changelog and does it. Changes to the shared style (colours,
caption look, outline weight) need the owner's OK, like `brand/`.
