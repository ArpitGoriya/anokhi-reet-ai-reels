---
name: make-reel
description: Make an Anokhi Reet Instagram reel (9:16 video) as a flat 2D cartoon animation drawn in code, with our AI voice-over, word-by-word captions and the brand, rendered to MP4 on the computer. Use when the person asks for a reel, video, short, story, animation or "video banao", or wants to continue or change a reel.
---

# Make a reel (2D animation)

The person is usually not technical: short, plain messages, one question at a time with 2-3 options.
**Show everything in the chat** (brief, script + storyboard table, caption, feedback, checklist), not only in
`REEL.md`. **Commit and push on your own** after each milestone (step 8), saying "Saved to GitHub". The goal is a
reel as good as our best one or better, so agree everything before the slow steps and check before every video.

`PY` = `.venv/Scripts/python.exe` (Windows) or `.venv/bin/python` (Mac/Linux).

## 0. Ready?

- `git pull` (newest rules, library and other people's reels).
- `PY tools/setup_helper.py check` must say ALL SET (else the `set-me-up` skill).
- Read once per chat: [`animation/GUIDE.md`](../../../animation/GUIDE.md) (style, motion, story shape, commands),
  [`animation/cast/CAST.md`](../../../animation/cast/CAST.md), [`animation/CHANGELOG.md`](../../../animation/CHANGELOG.md)
  ("Next improvements"), [`brand/BRAND.md`](../../../brand/BRAND.md). Glance at earlier reels' "Lessons".

## 1. Brief (ask, don't guess)

Ask only what's missing: what it's about (a story, a tip, an idea, an app feature), who it's for, the one message,
the voice (male / female), length (story reels 60-100 s, short ones 15-30 s), music (none by default), which
characters (someone from the cast, or new), and any special wishes.

Create `reels/<YYYY-MM-DD>-<short-name>/REEL.md` from [`reels/_template/REEL.md`](../../../reels/_template/REEL.md)
and copy [`animation/starter/video/`](../../../animation/starter/video/) to the reel's `video/` folder.

## 2. Script + storyboard (one approval)

The voice drives the timing, so write them together, in one table, and show it:

| # | Voice line (caption) | On screen (scene, characters and what they do) | Label / title |

- Hook in the first line **and** the first frame (a big outlined title over the strongest picture). Follow card at the end.
- Script rules from the `make-voice` skill (Devanagari Hindi, English words in Latin, female grammar for the female
  voice, numbers as words). About 3 words a second after the 1.15 speed-up: 30 s ≈ 90 words, 90 s ≈ 270.
- Captions are Roman Hinglish (what's said), 3-7 words each, keywords in `*gold*`.
- Plan **this reel's own scenes**: GUIDE.md section 4 (reuse the style and cast, never an old scene list; vary
  the shots; at least two new things for the library).
- Brand "Never say" list applies to our words; a character's own story numbers are fine.
- Save in `REEL.md` and `script.txt` (the exact voice text). **Get a clear yes before going on.**

## 3. Voice-over first

- `make-voice` skill with `script.txt` → `output/<persona>-<reel-name>-take1.mp3`; ask them to listen. Fix spellings
  and redo until they like it (each take uses 1 of the day's 10 per model).
- Put the file name in `video/reel.json` (`{"voice": "output/<file>.mp3"}`).
- Write `CHUNKS` in `video/captions.js` (caption text + how many script words each covers), then
  `PY tools/caption_timing.py reels/<reel>`. **Re-run it after every new take.**

## 4. Build the animation

- Write `video/scenes.js` (and `props.js` for reel-only drawings) with the engine (GUIDE.md section 6): one
  `addScene` per beat, times as caption refs (`'c5+0.3'`), every character alive with `life()` and acting its line.
- Apply **every item under "Teammate changes" in `REEL.md`**: they override the defaults for this reel.
- Look often: `PY tools/render_reel.py reels/<reel> --sheet` (12 moments + layout check) and `--at 3,14.5,40` for
  exact moments. Read the pictures yourself and fix what's off; fix everything the layout check reports.
- Then a draft: `--draft` (half size, 15 fps). Watch the timings against the captions; fix and re-check.

## 5. Show it

- Make the final: `PY tools/render_reel.py reels/<reel>` → `output/<reel>.mp4`; cover: `--cover` (if `cover.js`).
- Send the video file in the chat, with the post caption in the chat (hook line, 2-4 lines of value, one action,
  3-5 hashtags). Say plainly where the file is (`output/` folder).

## 6. Feedback rounds

Each round: write it in `REEL.md` (Feedback rounds; anything that should stick goes under "Teammate changes"), fix,
check (`--sheet` / `--at`), render again, send. Never undo an earlier teammate change unless they say so.

## 7. Final checklist (GUIDE.md section 7, before saying it's done)

- [ ] Hook in the first frame; one idea; follow card at the end.
- [ ] Captions in sync with this voice take; layout check clean.
- [ ] Every character alive and acting; something changes every 1-2 s.
- [ ] Only brand colours, fonts, logos; no "Never say" claims in our words.
- [ ] Every "Teammate changes" item applied.
- [ ] Two new things added to the library and noted in `animation/CHANGELOG.md`; new characters in `cast.js` + `CAST.md`.
- [ ] Caption ready.

## 8. Save (automatic)

Without asking, after each milestone (brief, script approved, voice approved, each feedback round, final, lessons):
`git pull --rebase`, commit the reel's folder and any `animation/` changes (text files; the `.gitignore` keeps audio
and video out), push, and say "Saved to GitHub" in one line. At the end, fill "Lessons" in `REEL.md` and push again.
Finished videos stay in `output/` on their computer; they share them however they like.

Shared defaults (`brand/`, the voices, the look in GUIDE.md section 1, these skills) change only with the owner's OK.
Library additions (new sets, props, characters, engine features) are welcome; keep old reels rendering.
If a teammate wants a change for all reels, note it as "Suggested default" in `REEL.md` and tell them the owner decides.
