# 2D animation: what got better, and what to improve next

Every reel adds at least one improvement to the engine or library and writes it here (newest first).
See [GUIDE.md](GUIDE.md) section 8.

## 2026-11-28: high-quality render (`--hq`)

- `PY tools/render_reel.py reels/<reel> --hq` → `output/<reel>-HQ.mp4`: lossless PNG frames (no JPEG step, so outlines
  and flat colours stay crisp, no banding), x264 `-crf 12 -preset slow -tune animation`, same 1080x1920 30 fps and
  -14 LUFS voice, colours converted and tagged as HD (bt709, TV range). Slower (several minutes per minute of video) and a bigger file; use it for the version you post.
  The normal render is unchanged.

## 2026-11-28: thought cloud, labelled jars, fixed counter, Priya (Lehenga aaya… phir almirah mein)

- **New props:** `thoughtCloudSVG(w, h)`, `labelJarSVG(id, label, col, n)`.
- **Fixed on-screen counter** pattern (a box that stays for the whole reel and updates): add a scene FIRST with
  `addScene(0, 9999, {html, upd})` so every later scene is still the "current" one.
- **New cast:** Priya (`PRIYA.home`, `.lehenga`).

## 2026-11-28: room door, pressure cooker, newspaper bundle, Shreya and Sudha (Beta, inki bhi photo achhi kheechna)

- **New props:** `roomDoorSVG(id, x, y, w, h)` + `doorOpen(id, k)` (a room door seen from inside that swings open onto
  a dark hallway), `pressureCookerSVG()` and `newspaperBundleSVG()` (the "sab bech do" pile).
- First pink end card: a light-pink gradient with the maroon lockup (`AnokhiReet_logo_maroon.svg`) and red rosettes.
- **New cast:** Shreya (`SHREYA`, pink suit, ponytail) and her Mummy, Sudha (`SUDHA`, orange saree, bun).

## 2026-11-27: wedding arch stage, camera, scissors crop, comment box typing, Kabir and friends (Repeat wala ladka)

- **New props:** `archStageBG(id, {x, w, top, wall})` (peach wedding stage: double marigold toran, a red-and-gold arch
  with marigold strings, a red carpet), `cameraSVG()` (a photographer's DSLR), `scissorsSVG(id)` + `scissorsSnip(id, t)`
  (snipping scissors, used to crop someone out of a group photo), `commentBoxSVG(id, w)` + `commentType(id, t, t0, word)`
  (an Instagram-style comment box that types a word, then "Post" turns blue).
- Reel helper `banner()` (a tilted ribbon banner, red or gold) and a dashed cross-out line drawn with `stroke-dashoffset`.
- **New cast:** Kabir (`KABIR.maroon`, `.blue`, `.home`), his friends `KABIR_DOST` (Sahil, Manav, Jigar), Tanvi (`TANVI`,
  pink suit) and a `PHOTOGRAPHER`.

## 2026-11-27: app walkthrough kit (Meena Rentals walkthrough)

- **For feature walkthrough reels:** `bokehBG(id)` + `bokehUpd(id, t)` (dark maroon-brown ground, drifting gold bokeh),
  `uiCard(w, h)` (cream card, soft maroon shadow), `outfitTile(c, d, s)`, `sizeChips(id)` + `chipOn(id, size, on)`,
  `availCal(id, booked)` (dates `${id}-d<n>`), `rangeSlider(id, w)` + `rangeSet(id, w, a, b)`, `doorstepSVG()`.
- Section tags: a green `.pill` with the number in a dark-green highlight (see the reel's `tag()` helper).
- Per-reel caption colours (karaoke grey → white): a `<style>` tag in a scene's html.

## 2026-11-27: beard, shirt collar, styled hair, mangalsutra, hoops, a two-voice reel, Kinjal and Nirav (Pati-patni)

- **Engine:** look options `beard` (a short trimmed beard), `collar` (a shirt collar with buttons), `hairStyle: 'quiff'`
  for men (styled hair), `mangalsutra`, `hoops` (hoop earrings).
- **Two voices in one reel:** record each character's lines in one go per voice (female, male), cut at the pauses and
  join them in script order (see the reel's `voice-parts.txt`); set the caption times by hand, since the automatic
  timing gets confused by two voices.
- **New cast:** Kinjal (`KINJAL.home`, `.yellow`, `.purple`, `.red`) and Nirav (`NIRAV.home`, `.sherwani`).

## 2026-11-26: Instagram-style post, floating hearts, photo booth, sunglasses, Ishani, Nidhi and Badi Mummy (Viral cousin)

- **New props:** `instaPostSVG(id, x, y, w, inner, likes, handle)` (a social post card: header, a clipped square photo,
  icons and a like count `${id}-likes`), `floatHeartsSVG(id, n, x, y)` + `floatHearts(id, n, t, t0)` (hearts drifting
  up), `photoBoothBG(id)` (a floral booth with "#ShaadiVibes" and a ring light).
- **Engine:** look options `shades` (sunglasses), `drape: { c, b }` (a saree's long pallu to the floor, for `stand()`), and
  `pants.flare` + `pants.print` (a flared, printed sharara).
- **New cast:** Ishani (`ISHANI.pastel`, `.mint`, `.gown`, `.saree`, `.home`), Nidhi (`NIDHI`), Badi Mummy (`BADI_MUMMY`).

## 2026-11-26: groom's safa, ledger card, Aarav, his squad of seven, Mama ji and Fua ji (Dulhe ke 7 dost)

- **Engine:** look option `safa` (a groom's turban with a gold band and kalgi).
- **New props:** `ledgerCardSVG(rows, total, w)` (a comic ledger: rows of label + value, an optional bold total).
- **New cast:** Aarav the groom (`AARAV`), his seven friends (`GROOM_SQUAD`, `{ name, look }` in seven sherwani colours),
  Mama ji (`MAMAJI`) and Fua ji (`FUAJI`). `ghodiSVG(AARAV)` puts the groom on the ghodi (animate `ghodi-groom`).

## 2026-11-26: group chat, polaroid, to-do list, mehendi cone, Jhalak, Maya and six bridesmaids (Dulhan ka dress code)

- **New props:** `groupChatScreen(title, sub, msgs)` (a chat-app group for `phoneSVG`; each bubble pops at its own time,
  `me` bubbles are green, `typing` bubbles come and go), `polaroidSVG(w, h, caption)` (a photo frame with a hole for the
  picture), `todoListSVG(title, lines)`, `mehendiConeSVG()`.
- **New cast:** Jhalak (`JHALAK.prep`, `.bride`), Maya (`MAYA.home`, `.haldi`, `.mehendi`, `.sangeet`, `.shaadi`) and
  six bridesmaids (`BRIDESMAIDS`, an array of `{ name, look }` in pink).
- A freeze-frame: keep calling `life()` with a fixed time after the flash, then show a polaroid frame and zoom out with
  `cam: (t, lt) => …`.

## 2026-11-24: countdown clock, tailor's shop front, handwritten board, towel wrap, measuring tape, Prachi and Rameshbhai (Kal pakka)

- **New props:** `countdownClockSVG(id, label, r)` (a big alarm clock with a red label plate; turn `${id}-m` / `${id}-h`),
  `tailorShopFrontSVG(id, name)` (a tailor's shop with its shutter down and steps), `handBoardSVG(lines)` (a taped,
  handwritten cardboard sign).
- **Engine:** look options `towel` (a towel wrapped round the hair) and `tape` (a tailor's measuring tape round the neck).
- **New cast:** Prachi (`PRACHI.morning`, `.lehenga`, `.home`) and Rameshbhai the darzi (`RAMESH`).

## 2026-11-24: comic-book kit, chai tapri, booking calendar, Jay, Harsh and Mitesh (Har shaadi mein nayi sherwani)

- **New props:** `comicPanel(id, x, y, w, h, bg, inner)` (a comic panel with halftone dots; its contents are clipped,
  so a bust can sit with its waist below the panel edge), `burstSVG(text, fill)` (spiky "WOW!" / "KA-CHING!" bursts),
  `chaiTapriBG(id)` (a roadside chai stall at night), `bookingCalendarSVG(id, month, n)` (ticks `${id}-t0..` to pop in).
- **New cast:** Jay (`JAY.maroon`, `.ivory`, `.bandhgala`, `.jodhpuri`, `.casual`), Harsh (`HARSH`), Mitesh (`MITESH`).
  Grown-up sherwanis use the kids' options: `buttons`, `sleeveTo`, `pants.hem`.
- First reel with the approved male voice in this 2D series.

## 2026-11-24: crime-show kit, fedora and lapels, Inspector Bindiya (Shaadi season ka sabse bada scam)

- **New props:** `sirenLightsSVG(id)` + `sirenUpd(id, t)` (red and blue alert beams), `caseFileSVG(label)`,
  `rubberStampSVG(text, col)` (a slanted stamp mark, e.g. CONFIDENTIAL, SOLUTION, CASE CLOSED), `crimeBoardSVG(x, y)`
  + `boardCardSVG(text)` (cork board with pinned cards; red strings drawn with `pathLength="1"`), `evidenceTagSVG(text)`,
  `hangingLampSVG(id)` (an interrogation lamp with a light cone), `torchSVG()` + `torchBeamSVG(len)`.
- **Engine:** look options `hat` (a fedora; lift `${id}-hat` to tip it) and `lapels` (a coat's lapels and belt).
- **New cast:** Inspector Bindiya (`BINDIYA`). Hetal ben (`HETAL.home`, `.pink`) back from the first reel.
- Tip: a bust whose waist is below the frame (`bust(…, y ≈ 1940)`) needs no table in front.

## 2026-11-24: presenter studio, day-to-night window, pamphlets, status phone, scrolling app feed, Riya (Customer kahan hain?)

- **New props:** `studioBG(id)` (a presenter studio: beige backdrop with gold rings `${id}-ring`, ring light, plant),
  `dayNightWindowSVG(id, x, y)` + `dayNight(id, k)` (the sky goes from noon to night), `pamphletSVG()` (a stack of
  shop flyers), `statusPhoneSVG()` (a chat "status" with very few views), `arFeedScreen(id)` (the app scrolling
  through shops and outfits: scroll `${id}-feed`, swap `${id}-q` for `${id}-real` to reveal the name).
- **Engine:** a two-finger hand `hR: 'two'` (counting "2").
- **New cast:** Riya (`RIYA`), a presenter from the Anokhi Reet team. For a talking-to-camera presenter: `bust(…, 1.45)`
  at `FLOOR + 260` behind a desk (`counterSVG(FLOOR + 170)`), so the waist is hidden.

## 2026-11-24: the first kids, long sleeves, chest of drawers, kids' outfits, age tag, two houses at night (₹6,000 ki sherwani)

- **Engine fix:** a scene's `cam` option (the slow push-in, or a zoom) was being overwritten by its camera group, so
  no scene zoomed (the browser got `scale(NaN)`). Now kept as `s.zoom`; every scene pushes in gently again, and `cam`
  can also be a function `(t, lt) => zoom` (used to zoom into a window).
- **Engine:** look options `sleeveTo` (long sleeves: 0 = to the elbow, 1 = to the wrist), `buttons: true` (gold
  buttons down a sherwani or bandhgala), and `pants.hem` (how long the kurta/sherwani hangs; small = outgrown).
- **New props:** `kidOutfitSVG(kind, c, d)` (sherwani, kurta, bandhgala or jodhpuri laid flat), `dresserSVG(id)` +
  `dresserOpen(id, k)` (a chest of drawers whose top drawer slides out; fill `${id}-in`), `ageTagSVG(text)`,
  `nightHousesSVG(id)` (two houses at night with lit windows `${id}-wL` / `${id}-wR`).
- **New cast:** Riddhi (`RIDDHI`), Krupa (`KRUPA`), and the first kids: Vihaan (`VIHAAN.tight`, `.home`) and Krupa's
  son (`KRUPA_BETA.vest`, `.sherwani`). Kids: `stand(…, .5)` next to adults at `.8`.

## 2026-11-24: wedding hall, banquet chair, round table, bank screen, invite card, Ishita (Asli price)

- **New props:** `weddingHallBG(id)` (marigold drapes, fairy lights, flower arch), `chairBackSVG`/`chairFrontSVG` (a
  banquet chair a bust sits in), `roundTableSVG(x, y, w, cloth)`, `bankScreen(balance)` (a plain made-up bank app),
  `inviteCardSVG()`.
- **New cast:** Ishita (`ISHITA.wedding`, `ISHITA.home`). Mausi reuses the cast's `MAUSI`.

## 2026-11-23: toran, BUSY stamp, wedding cake, magnifier, rupee note, ghodi (Shaadi season 2026)

- **New props:** `toranSVG(w, y)` (marigold and mango-leaf toran), `busyStampSVG(text)`, `weddingCakeSVG(id, labels, tiny)`
  (three labelled tiers and a tiny slice `${id}-tiny`), `magnifierSVG(r)`, `rupeeNoteSVG()`, `ghodiSVG(groom)` (a
  wedding horse with a small groom).
- Note: html elements with `data-t` are centred on their left/top (use the centre point, e.g. `left:540px`).

## 2026-11-23: half-closed shutter, crossed-out thought, Maheshbhai and Kiranben (Do dukaan, do kahaniyan)

- **New props:** `halfShutterSVG(cx, w, y0, h)` (a shutter pulled half down over a shop opening, e.g. on `twoShopsBG`),
  `crossThoughtSVG(id, text, w)` (a thought cloud with a guess; fade in `${id}-x` to cross it out).
- **New cast:** Maheshbhai (`MAHESH`), Kiranben (`KIRAN`).
- **Engine:** `pants: { c, d }` on a man's look draws kurta-pajama legs and shoes for `stand()` (men had no lower body);
  `NOSKIRT` drops it for busts.

## 2026-11-23: notification banner, link message, sigh cloud, camera flash, Meenaben (Ek link, poori dukaan)

- **New props:** `notifSVG(name, text)` (phone notification banner), `linkMsgSVG(id, shop, lines)` (chat message with a
  shop link preview; hidden app name with `${id}-real` to flip in), `sighCloudSVG`, `flashSVG` (camera flash burst).
- `waChatScreen(ats, name)`: new `name` for the chat title ("? ? ?" keeps the app a secret).
- **New cast:** Meenaben (`MEENABEN`).

## 2026-11-20: jam jar, film grid, tally board, dizzy swirl, Shital and Khushi (3 options)

- **New props:** `jamJarSVG`, `filmGridScreen`, `tallyBoardSVG`, `dizzySVG`.
- **New cast:** Shital (`SHITAL`), Khushi (`KHUSHI`).

## 2026-11-20: bed, clothes pile, crammed almirah, hidden-name app screen, Kavya and Mummy (Cupboard full)

- **New props:** `bedSVG`, `foldedClothSVG`, `clothesStackSVG`, `stuffedInside`, `arMysteryHeader`, `arPickScreen`,
  `chipOnAR` (the last three generalise Dukaan-dukaan's reel-only mystery screen).
- **New cast:** Kavya (`KAVYA`), Mummy (`MUMMY`).

## 2026-11-20: calendar page, Booked tag, full almirah (Nisha Part 2)

- **New props:** `monthPageSVG(month, circled)`, `bookedTagSVG()`, `almirahFill(n)`.

## 2026-11-19: café, study bars, dust, Bhaveshbhai and Chintu (Mehenga lehenga)

- **New props:** `coffeeCupSVG(k)`, `cafeMenuSVG(items, w, note)`, `planCardSVG(id, title, price, col)`,
  `barSVG(id, col)` + `barSet(id, h, label)` (bars that grow and change for study results), `dustPuffsSVG(id, n, w, h)`,
  `ribbonSVG(text)`.
- **New cast:** Bhaveshbhai (`BHAVESH`), Chintu (`CHINTU`).

## 2026-11-19: extra caption chunks (Dukaan-dukaan video 3)

- A caption chunk can be added between two others without renumbering: name it `c2b` (a-d after the number).
  `T('c2b+0.2')` and `tools/caption_timing.py` both accept it; `c8e` still means "end of c8".

## 2026-11-27: trial room, visit notebook, mood faces, rotation board, Save icon (Sab pehle se PATA hai)

- **New set:** `trialRoomBG(id)` (two curtained trial cubicles with a mirror between).
- **New props:** `notebookVisitsSVG(id, rows, marks)` (customer visit notebook; X marks `${id}-x<r>-<c>` start hidden),
  `moodFaceSVG('happy'|'okay'|'bored')`, `rotationBoardSVG(id, [[label, colour], ...])` (weekly collection board,
  rows `${id}-r<i>`), `saveIconSVG()` (Instagram-style save bookmark for "Save karo" end cards).
- Meena (`MEENA`) reused for a second reel; she's becoming a recurring rental-shop character.

## 2026-11-18: covered lehengas, lock, plain book, pocket, Nisha (₹2.5 lakh ki almari)

- **New props:** `coveredLehengaSVG(c, d, sc)` (lehenga in a clear plastic cover with a zip line), `lockSVG()`,
  `plainBookSVG(lines)` (a plain hardback with only a title, for "a line from a book" beats, never real cover art),
  `pocketSVG(col)` (coins dropping in = asset, flying out = expense).
- **New cast:** Nisha (`NISHA`), homemaker.
- Reused: `almirahSVG` doors, `coinJarSVG`/`jarFill`, `splitSVG`, `ledgerSVG`, `toastSVG`, `IDEA`/`THINK`.

## 2026-11-18: coin jar, map spotlight, Anokhi Didi (Lehenga 2X)

- **New props:** `coinJarSVG(id, n, label)` + `jarFill(id, n, t, t0, d)` (coins drop into a jar up to a dashed target
  line, e.g. "paid back" / "2X"); `mapSpotSVG(id)` + `mapSpot(id, x, y, r)` (grey veil over `cityMapSVG` with a lit
  circle around one shop; grow it and fade the veil to "show the whole city").
- **New cast:** Anokhi Didi (`DIDI`), an on-screen presenter who talks to camera with lip sync (owner to confirm).

## 2026-11-17: shop front, split screen, Papa and beti (Papa aur beti)

- **New sets** in `engine/sets.js`: `shopFrontBG(id, {cx, sign, since})` (a shop seen from the street: building,
  open shutter, lehengas inside, painted board, footpath, road), `oldBoardSVG(name, since)`, and
  `splitSVG(id, left, right)` (split screen; each side drawn in full-frame coordinates and clipped).
- **New cast:** Papa (`PAPA.shop`, `.young`, `.night`) and beti (`BETI`).
- Caption timing: whisper lost its place after 25 s on the male take; the rest was set from pauses (see the reel).

## 2026-11-17: hotel room, city map, chat screen, Meena (Meena ki dukaan)

- **New set** `hotelRoomBG(id, {night})`: an empty hotel room (bed, window, numbered door), for "an empty room
  tonight is income lost forever".
- **New props** in `engine/props.js`: `cityMapSVG(id, areas)` (flat city map with river, parks, roads, area names)
  + `mapPinSVG(col)`; `chatScreen(id, n)` (a generic chat with photo messages `${id}-m${i}`, for phoneSVG);
  `chaiSVG()`; `toastSVG(text)` (a booking notification); `cobwebSVG()` for stock that hasn't moved.
- **Reused** the teammates' `rentalShopBG`, `glide`, `arHeader` (app screens) and Kavita's `shopBG`, `ledgerSVG`,
  `personIcon`, `calendarSVG` flying pages: the library is paying off.
- **New cast:** Meena (`MEENA.shop`, `.night`) and her husband (`PATI`).

## 2026-11-18: Ek lehenge ka hisaab (dhruvifewtone-wq)

- **New set: chalkboard** (`chalkboardBG(id, {x0, y0, x1, y1})`): a big green board on a shop wall, wood frame,
  chalk tray, faint smudges.
- **Hand-drawn chalk** (`chalkSVG(d, {ct, cd, col, w})` + `chalkAuto(s, t)`): SVG paths draw themselves at a caption
  time; ready shapes in `CHALK` (lehenga, phone, person, coin, box, ring, underline), moved with `chalkAt(d, x, y, sc)`;
  `chalkDust(x, y, at)` for a tap. Chalk words: `.chalk nc` + `data-k="write"`. Keep the camera still
  (`cam: [1, 1], noSettle: true`) so HTML chalk and SVG chalk stay lined up.
- **New cast:** `HEMABEN` (rental shop owner, glasses, marigold kurta, maroon dupatta) talking to camera with lip sync.
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

## 2026-11-19: two shops, restaurant row, study props (Rent kam rakha, Dukaan ka Funda)

- **Sets** in `engine/sets.js`: `twoShopsBG(id, {left, right})` + `twoShopsFront(id)`: two rental shops side by side
  (sign, lehenga rail, a tag under each lehenga `${id}-L-t0..3` / `-R-t0..3`, low counters in front);
  `restaurantRowBG(id, {cheap})`: an empty cheap restaurant with a "Thali ₹49" board beside a full one.
- **Props** in `engine/props.js`: `drinkGlassSVG(tag)` (plain glass of a red drink with a price tag, no bottle: fine for
  Gujarat audiences), `brainSVG(id)` (with `${id}-glow`), `shopBoardSVG(text, 'sale' | 'premium')`, `starSVG(r)`.
- **New cast**: Rekhaben and Jignaben.

## 2026-11-19: bazaar street, moving split screen, Komal (Dukaan-dukaan ki bhaag-daud)

- **Bazaar street** in `engine/sets.js`: `bazaarBG(id, {n})` (hot sky, sun, a row of shops "DUKAAN 1..n", heat haze,
  footpath and road) and `bazaarScroll(id, x, t)` to slide the shops past a walker who stays in place (walking feel).
- **Moving split screen**: `splitDynSVG(id, left, right)` + `splitAt(id, x)`: the divider can move to widen one side;
  each side stays centred in its half.
- **Props**: `sunSVG(r)`, `autoSVG()` (auto-rickshaw), `tumbleweedSVG(r)` in `engine/props.js`.
- **New cast**: Komal, two looks (`KOMAL.purani`, `KOMAL.smart`) for "old way vs smart way" comparisons.

## 2026-11-19: question bubbles, stamp and app screens (Sawal bahut hain)

- **Question bubbles** in `engine/props.js`: `qBubbleSVG(id, text, {fs, tail})` (white pill, marigold "?" disc, tail
  dots towards the head) and `bubblePop(id, t, tPop)` (wobble, swell, burst into confetti with a gold ring).
- **Stamp**: `stampSVG(text)` + `stampIn(el, t, t0, x, y)` slams a gold word down. `computerSVG()`, `crossSVG(r)`.
- **Flat app screens** for `phoneSVG(…, 560, 1000, inner)`: `arPlansScreen(id)` (plan cards, no prices),
  `waChatScreen(ats)` (WhatsApp-style chat, generic colours, no logo), `arShopScreen(name, liveAt)` (shop page + Live badge).
- **Three-way split**: `split3SVG(id, a, b, c)` in `engine/sets.js`.
- **New poses**: `ARMS_X` (arms crossed), and a `thumb` hand (thumbs up: raise the forearm, e.g. `R: [80, 100]`).
- **New cast**: Hareshbhai and Neha.
- Lesson: with `bust()` behind `counterSVG()`, keep the waist about FLOOR + 80-100 (scale ~1) so shoulders and arms
  show above the counter; at FLOOR + 190 or lower the arms are hidden.

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
