---
name: make-reel
description: Make an Anokhi Reet Instagram reel (9:16 video) with real app screens from Marketing Studio, our AI voice-over timed to the scenes, and the brand from brand/BRAND.md. Use when the person asks for a reel, video, short, story or "video banao", or wants to continue or change a reel.
---

# Make a reel

The person is usually not technical: short, plain messages, one question at a time with 2-3 options.
**Show everything in the chat** (brief, script + storyboard table, caption, feedback, checklist), not only in
`REEL.md`. **Commit and push on your own** after each milestone (see step 8), saying "Saved to GitHub". The goal is a
**perfect** reel, so agree everything before the slow steps (capturing, rendering) and check before every export.

`PY` = `.venv/Scripts/python.exe` (Windows) or `.venv/bin/python` (Mac/Linux).

## 0. Ready?

- `git pull` (newest rules and other people's reels).
- Marketing Studio: call its `status` tool. If it isn't available, stop: "Video needs the Marketing Studio
  extension in the Claude app. Ask the owner (ArpitGoriya) to set it up for you." Voice-overs still work.
- `PY tools/setup_helper.py check` must say ALL SET (else the `set-me-up` skill).
- Read [`brand/BRAND.md`](../../../brand/BRAND.md) (**wins over Marketing Studio's brand tool** if they differ) and
  Marketing Studio's guide pages `reel` and `screens` (and `music` if music is wanted) once per chat.

## 1. Brief (ask, don't guess)

Ask only what's missing: what the reel is about (feature, page, tool, offer), who it's for, the one message, the
voice (male / female), screen **recording** (shows how something works) or **screenshots** (stills), length
(default 15-30 s), music (none / calm modern / warm Indian), and any special wishes.

Create `reels/<YYYY-MM-DD>-<short-name>/REEL.md` from [`reels/_template/REEL.md`](../../../reels/_template/REEL.md)
and fill in the brief. Glance at earlier reels' `REEL.md` ("Lessons") for anything relevant.

## 2. Script + storyboard (one approval)

The voice drives the timing, so write them together, in one table, and show it:

| # | Voice line (what's said) | On screen (page, state, real action) | Text on screen (3-7 words) |

- Hook in the first line and the first frame (result or promise, no logo intro). End card with one action.
- Script rules from the `make-voice` skill (Devanagari Hindi, English words in Latin, female grammar for the female
  voice, numbers as words). About 3 words a second after the 1.15 speed-up (the reference read 213 words in 65 s): 15 s ≈ 45 words, 30 s ≈ 90.
- Brand "Never say" list applies to voice and text.
- Save it in `REEL.md` (Script and storyboard) and `script.txt`. **Get a clear yes before going on.**

## 3. Voice-over first (cheap, then everything follows it)

- Make it with the `make-voice` skill into `output/` (name it after the reel), and ask them to listen. Fix and redo
  until they like it (each take uses 1 of the day's 10 per model).
- Copy the approved MP3 into Marketing Studio's **Inbox** (the folder `status` shows) and read it with the `inbox`
  tool: it gives when each line is spoken. Set every scene to start on its line; put the text on screen as it's said.

## 4. Screens (Marketing Studio)

- Find pages with `find_page` / `read_page` (text, no screenshots to explore). Logged-in pages: `logged_in: true`.
- **Recording** (how it works): `record` with `dry_run: true` first, fix every step that fails or "changes
  nothing", then a preview, then high. One recording can feed several scenes (`data-from` / `data-to`).
- **Screenshots**: one `capture` call with several `shots`; preview, then high for the ones used.
- Capture only what the approved storyboard needs. Never sign in to real accounts, fill real forms, or press buy,
  rent or contact buttons on the live site; use the demo login the tool provides.
- If a screen isn't what the storyboard expected, stop and say so before changing the plan.

## 5. Build

- Design in HTML/CSS, 1080×1920, with the values from `brand/tokens.css` and `brand:<name>` logos; follow every
  rule in `BRAND.md` (safe zones, phone 590 px wide, two grounds, Inter + Arya, calm motion, no dead air).
- The voice-over is the soundtrack; music (only if asked) sits quietly under it.
- Apply **every item under "Teammate changes" in `REEL.md`**: they override the defaults for this reel.
- `check` with the moments that matter (`at`: hook, each step, the result, end card). Look at every picture and fix
  what it reports. Compare with the storyboard. Check again until clean.

## 6. Preview, feedback, final

- `export` the preview **once**, with the post caption (hook line, 2-4 lines of value, one action, 3-5 hashtags).
- Each round of feedback: write it in `REEL.md` (Feedback rounds; anything that should stick goes under
  "Teammate changes"), fix, `check`, export again. Never undo an earlier teammate change unless they say so.
- When they're happy, they press **"HD version"** in the viewer for the final.

## 7. Final checklist (before saying it's done)

- [ ] Hook in the first frame; one idea; one clear action at the end.
- [ ] Voice and text in sync; no line cut off; no dead air (something changes every 1-3 s).
- [ ] Text 48-72 px bold, out of the safe zones (top 270, bottom 350-420, right 150 in the lower half).
- [ ] Real screens in a phone frame, big and whole; at most two gentle zooms.
- [ ] Only brand colours, fonts, logos and patterns; no "Never say" claims.
- [ ] Every "Teammate changes" item applied.
- [ ] Caption ready.

## 8. Save (automatic)

Without asking, after each milestone (brief, script approved, voice approved, each feedback round, final, lessons):
`git pull --rebase`, commit **only** that reel's folder (text files; the `.gitignore` keeps audio and video out),
push, and say "Saved to GitHub" in one line. At the end, fill "Lessons" in `REEL.md` and push again.
Finished videos stay in Marketing Studio's project folder and `output/` on their computer; share them however they like.

Shared defaults (`brand/`, the voices, these skills) change only with the owner's OK. If a teammate wants a change
for all reels, note it as "Suggested default" in `REEL.md` and tell them the owner decides.
