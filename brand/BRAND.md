# Anokhi Reet brand for reels (including the Tools design system)

**This folder is the source of truth for reels.** It is a copy (2026-11-13) of the Anokhi Reet brand in Marketing
Studio (`brand.json`, logos, patterns, fonts) plus the free-tools design system from the website
(`anokhireet/apps/web/.agents/context/DESIGN_SYSTEM.md`, `app/theme.css`). Update it **here**. If Marketing Studio's
brand tool or the website says something different, **this file wins** for reels.

Only the owner (ArpitGoriya) changes these defaults. A teammate's request changes **their own reel only**
(see "Defaults vs. a teammate's changes" at the end).

Anokhi Reet is an ethnic-wear rental and shopping app in India: rent or buy outfits for weddings and festivals,
from local shops and vendors, by city. **Tagline:** दिल से जुड़ी एक अनोखी रीत (always in Arya, often in the gold
gradient).

## Colours

| Name | Hex | Use |
|---|---|---|
| red | `#890304` | The brand colour: headlines on cream, buttons, the wordmark |
| red-dark | `#4a0002` | Deep backgrounds, the maroon ground's darker end |
| maroon-deep | `#2b0001` | The darkest maroon, for depth |
| cream | `#FFF2DF` | The main light ground, and text on maroon |
| beige | `#E8E5C3` | Soft panels and borders |
| gold-tan | `#D6B97A` | Accents, small labels on maroon |
| gold | `#F8D36A` | Highlights inside gold gradients |
| brown-dark | `#7A5C2E` | Quiet text on cream |
| text | `#1A1A1A` | Body text |
| text-light | `#767676` | Secondary text |
| white | `#FFFFFF` | Cards on cream, like the app |

**Gradients:** maroon `linear-gradient(135deg, #9A0000 0%, #5D0000 100%)` (title and brand moments) ·
maroon-deeper `linear-gradient(180deg, #570000 0%, #3B0000 100%)` · cream `linear-gradient(135deg, #F5E6C8 0%, #E8D3A5 100%)` ·
gold (for gold text, `background-clip: text`) `linear-gradient(90deg, #A16F35 0%, #F8D36A 18%, #F8D36A 72%, #9A6A36 100%)` ·
tagline-gold `linear-gradient(90deg, #F8B97A 0%, #E0B073 25%, #B98A3F 38%, #EBB97A 56%, #BB897A 80%, #80533A 100%)`.

All as CSS variables: [`tokens.css`](tokens.css).

## Fonts

- **Inter** (`fonts/Inter-Variable.ttf`): the brand font for **everything**. Headlines SemiBold/Bold (600-700),
  body and captions Regular (400), labels and buttons Medium/SemiBold. Normal letter spacing; small uppercase
  labels may track out 0.05-0.08em.
- **Arya** (`fonts/Arya-Regular.ttf`): **only** Hindi (Devanagari) text and the tagline.
- No other fonts. (The older video studio's Playfair Display headlines are **not** used here: owner, 2026-11-13.)

## Logos (`logos/`)

In Marketing Studio designs, refer to them as `brand:<name>`.

| Name | File | Use |
|---|---|---|
| wordmark | `logo-text.svg` | ANOKHI REET wordmark, beige, for maroon grounds; on cream `brand:wordmark?color=red` |
| seal | `logo-icon.svg` | Round seal, beige, for maroon grounds |
| seal-on-maroon | `seal-on-maroon.svg` | Seal on a maroon disc, any ground |
| app-icon | `app-icon.png` | The app icon |
| lockup-maroon | `AnokhiReet_logo_maroon.svg` | Seal + wordmark in maroon, for cream |
| shops | `shops.svg` | SHOPS logo (seal ring as the O), maroon gradient; on maroon `?color=beige` |
| vendors | `vendors.svg` | VENDORS logo, maroon gradient; on maroon `?color=beige` |
| pro-badge | `pro.svg` | Vendor PRO badge, any ground |
| lockup-shops / -dark | `Anokhireet_shop_logo.svg` / `_dark.svg` | Shop partner-programme lockup (maroon ground / cream ground) |
| lockup-vendors / -dark | `AnokhiReet_vendors_Trasparent_logo.svg` / `_dark.svg` | Vendor partner-programme lockup |
| vendors-tile | `AnokhiReet_vendors_logo.svg` | Square maroon tile with the gold VENDORS lockup |
| **lockup-tools** | `Tools_logo_golden.svg` | **ANOKHI REET TOOLS**: beige wordmark, gold TOOLS with the seal ring as the O, for maroon |
| **lockup-tools-dark** | `Tools_logo_maroon.svg` | The TOOLS lockup in maroon, for cream |
| **tools-tile** | `Tools_logo_with_BG.svg` | Square maroon tile with the gold TOOLS lockup, any ground |
| app-store / google-play | `app-store-badge.svg` / `google-play-badge.svg` | Official store badges, unaltered, with "Download the app" |

Logos are never stretched, outlined, recoloured outside the palette, or given effects.

## Patterns (`patterns/`)

mandala (`mandala.png`, large and faint behind brand moments, opacity 0.06-0.15) · mandala-tile
(`mandala-pattern.webp`) · ring (`ring.svg`, the seal's ring, rotating or rippling) · corner (`corner-pattern.png`) ·
floral-border (`floral-border.png`). Only our own circle family: mandala, seal ring, rosettes, bandhani dots.
Never other brands' motifs (no arches or jharokhas).

## Anokhi Reet Tools: the free-tools design system

For reels about the free tools (anokhireet.in/free-tools, e.g. the mehndi booking tracker). The reel frame still
follows the brand above; the tool screens themselves look like this, so rebuilt close-up pieces must too:

- **Flat:** depth from hairline borders and surface steps, never shadows or glows.
- **Rounded:** controls `12px`, cards `16px`, the hero card and sheet tops `24px`, pills fully round.
- **Black and white:** selected chips, the active tab and links are ink, never red.
- **One maroon moment** per screen: the tool gradient `linear-gradient(91.51deg, #9A0000 -0.55%, #5D0000 100.55%)`
  only on the primary button, the + button and the hero card.
- **Tool colours:** surface `#FAF7F3` (page) · raised `#FFFFFF` (cards, sheets) · sunken `#F2EEE9` (rows, tracks) ·
  line `#E6E0D9` (borders) · ink `#141110` (text, selected) · muted `#655C57` (labels) · beige `#E8E5C3` (labels on
  maroon) · cream `#FFF2DF` (highlight cards) · success `#1F7A4D` / soft `#E3F3EA` · warning `#94560F` / soft
  `#FCEFD2` · danger `#B23B3B` / soft `#FBE7E7`.
- **Pieces:** pill buttons (48px or 36px), 52px inputs, ₹ amounts grouped the Indian way (1,00,000), Chips, a
  Segmented pill switch, a black toast pill at the top, white sheets with 24px top corners, a "My Tools" pill.
- End tool reels with the **TOOLS lockup** (or tools-tile) rather than the plain wordmark.

## Video rules

- **Two grounds only:** warm cream for most scenes, the maroon gradient for title and brand moments. Colours only
  from the palette; shadows soft and maroon-tinted (e.g. `0 20px 60px rgba(74,0,2,0.18)`), never hard black.
- **Size:** 1080×1920 (9:16), 30 fps (60 only for fast scrolling). **Length:** 7-15 s for one idea, 15-30 s to show
  how something works. With a voice-over the length follows the voice.
- **Safe zones:** keep text and key details out of the **top 270 px**, the **bottom 350-420 px** and the **right
  150 px in the lower half**. The middle 1080×1350 is safest (also the grid cover).
- **The first second decides:** the hook (3-7 words) and the most telling visual in the very first frame. No logo
  intro, no fade from black.
- **Real app screens inside a phone frame** (rounded black bezel, maroon-tinted shadow), never floating cut-outs.
  The phone big and whole: about 590×1280 px, same size and place all video.
- **Record the real action** in order for "how it works". Zoom at most once or twice, gently (about 1.4×, 0.7-0.9 s,
  hold 1.5-2 s, back). Point with a soft highlight or fingertip, never a cartoon hand or outlined circle.
- **Calm motion:** eased moves (`cubic-bezier(.65,0,.35,1)`), 0.6-0.9 s, then a hold. No spinning, no 3D.
- **No dead air:** something new every second or so; text lands on the cut.
- **Text (most watch muted):** every key message on screen, 3-7 words a line, 48-72 px bold (never under 40), one or
  two lines at a time, outside the phone, never over the screen's own text.
- **Sound:** our AI voice-over (`voice/`) and/or quiet music under it. No swish, whoosh or riser effects.
- **End card (about 2 s):** one clear action and the wordmark (or TOOLS lockup); "Download the app" with the
  official badges when inviting downloads.
- **Captions (post text):** first line is the hook, 2-4 short lines of value, one call to action, 3-5 hashtags.

## Never say

No prices in our own words (real app screens may show them). No number claims like "2000+" or "1 lakh+". No
discount or percentage claims. No superlatives or guarantees.

## Defaults vs. a teammate's changes

1. These are the **defaults**. Every reel starts from them.
2. When a teammate asks for something different for their reel (a colour moment, a font size, longer length, no
   music, a different hook style), **their request wins for that reel**. Write it in the reel's `REEL.md` under
   "Teammate changes" so it's applied in every later round and never silently reverted.
3. Hard limits even then: never break the logo rules or the "Never say" list, never change the approved voices.
   If a request would, say so plainly and offer the closest option.
4. If a teammate wants a change for **all** reels, note it in `REEL.md` as "suggested default"; the owner decides and
   then updates this file.
