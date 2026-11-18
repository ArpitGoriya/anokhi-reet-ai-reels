# Reel: Lehenga 2X (Anokhi Didi)

- **Date started:** 2026-11-18
- **Made by:** teammate (script) + Claude
- **Status:** video 1 rendered (2026-11-18); sent to the teammate

## Brief

- **About:** A talking-presenter reel. **Anokhi Didi** shows a bridal lehenga a shop bought in 2023 for ₹25,000: at
  ₹2,500 rent it pays itself back in 10 rentals and doubles in 20. But it went out only 4 times a year, because only
  the street's customers could see it. The right platform (Anokhi Reet) shows it to the whole city.
- **For:** Rental shop, boutique and studio owners.
- **One message:** Your stock can earn more if the whole city can see it. List on Anokhi Reet.
- **Voice:** female (Anokhi Didi speaks to camera, lip-synced)
- **Characters:** new: **Anokhi Didi** (presenter, 30s); the shop owner and customers as small figures/icons.
- **Length:** about 50 s (158 words)
- **Music:** none
- **Special wishes:** "2X" pop in the hook; "₹25,000" price tag; calendar pages with "साल में सिर्फ 4 बार"; booking pins
  from different areas; Didi straight to camera at the end with the Anokhi Reet logo.

## Teammate changes (override the brand defaults for this reel only)

Everything here is applied in every round and never silently reverted.

- **Story numbers kept** (₹25,000 lehenga, ₹2,500 rent, 10 and 20 rentals, 4 times a year, "2X"): the shop's story
  numbers, not Anokhi Reet prices or earnings claims. (round 0)
- **Softened two lines** (brand "Never say": no guarantees):
  "एक बार trust किया ना, तो दूसरी बार आप ये नहीं पूछोगे कि customer कहाँ से आएगा" →
  "एक बार list करके देखो... फिर आपका lehenga सिर्फ़ गली नहीं, पूरा शहर देख सकता है";
  "उन्हें पूरे शहर के customers तक पहुँचाना, हमारा काम है" → "उन्हें पूरे शहर के customers को दिखाना, हमारा काम है". (round 0)
- **Length about 50 s** (the plan said ~38 s; all ideas kept). (round 0)

## Script and storyboard (approved: yes)

Voice script: [`script.txt`](script.txt) (Devanagari, female voice).

| # | Voice line (caption) | On screen | Label / title |
|---|---|---|---|
| 1 | Jitne mein ye lehenga khareeda tha... usse *doguna* kama sakta hai. | A glowing bridal lehenga on a hanger; a giant "2X" pops above it | Title: "*2X*" |
| 2 | Toh guys, ye hai ek *bridal lehenga.* | Anokhi Didi (new) walks in, waves, points at the lehenga | Pill: "Bridal lehenga" |
| 3 | Ye shop waale ne 2023 mein *₹25,000* mein khareeda tha. | A price tag "₹25,000" swings onto the lehenga; calendar "2023" | Tag: "₹25,000" |
| 4 | ₹2,500 rent pe 10 baar gaya, toh *poora paisa wapas.* | A counter 1 → 10 with coins filling a jar to a "₹25,000" line | Pill: "10 baar = paisa wapas" |
| 5 | 20 baar gaya, toh *seedha doguna.* | The counter runs on to 20; the jar overflows into a second jar | Title: "20 baar = *2X*" |
| 6 | Par hua kya? Poore saal mein ye lehenga sirf *4 baar* bahar nikla. | The same lehenga in a dusty shop corner, a cobweb; calendar pages flip; only 4 pages get a tick | Title: "Saal mein sirf *4 baar*" |
| 7 | Kyunki ise sirf *gali ke customers* dekh paate the. | A small street map: only the shop's own lane is lit, a few people there | Pill: "Sirf gali" |
| 8 | Baaki shehar ko pata hi nahi tha ki ye lehenga hai bhi. | The rest of the city map stays grey; people with "?" | — |
| 9 | Isiliye bolte hain, ek *sahi platform* hona bahut zaroori hai... jo hai *Anokhi Reet.* | Didi holds up a phone: the lehenga listed on Anokhi Reet | Pill: "Sahi platform" |
| 10 | Ek baar list karke dekho... phir aapka lehenga sirf gali nahi, *poora shehar* dekh sakta hai. | The city map lights up area by area; booking pins pop from different areas | Pill: "Poora shehar" |
| 11 | Aapko sirf apne outfits list karne hain. Unhe poore shehar ke customers ko dikhana, *hamaara kaam* hai. | Didi to camera, confident; step pills "Aap: list karo" / "Anokhi Reet: dikhana" | Pills |
| 12 | Bas *bharosa* rakhna padega, aur thoda sa *time* dena padega. | Didi with a warm smile, hand on heart; a small clock | — |
| 13 | Apni shop, boutique ya studio aaj hi Anokhi Reet pe list karo! | Didi waves; Anokhi Reet follow card | End card |

## Voice-over

- Take 1: `output/female-lehenga-2x-take1.mp3` (46.5 s) — approved: yes (2026-11-18)
- Captions timed with `tools/caption_timing.py` (redo after every new take)

## Feedback rounds

1. (round 0) Two guarantee lines softened; numbers as words; length about 50 s.
2. Video 1: 10 scenes, `output/2026-11-18-lehenga-2x.mp4` (48 s).

## Caption

```
Jitne mein lehenga khareeda tha… usse doguna kama sakta hai. 2X 👗
₹25,000 ka bridal lehenga, ₹2,500 rent: 10 baar = paisa wapas, 20 baar = doguna.
Par saal mein sirf 4 baar bahar nikla… kyunki sirf gali ke customers use dekh paate the.
Aap outfits list karo, poore shehar ko dikhana hamaara kaam hai.
👉 Apni shop, boutique ya studio aaj hi Anokhi Reet pe list karo.
#AnokhiReet #LehengaOnRent #RentalBusiness #BoutiqueBusiness #BusinessTips
```

## Added to the library (at least two per reel)

- Props: `coinJarSVG` + `jarFill` (a jar that fills coin by coin to a target line), `mapSpotSVG` + `mapSpot` (a grey
  veil over a city map with a lit circle that can grow).
- New cast: Anokhi Didi (`DIDI`), presenter who talks to camera with lip sync.

## Suggested default (for the owner)

- "Anokhi Didi" as a recurring on-screen presenter for Anokhi Reet (a brand character): owner to confirm the name
  and look before it's used as the channel's face.

## Lessons

- Whisper matched this take well (116 of 158 words); no hand timing needed.
- An even-odd "hole" bigger than its veil fills the outside: grow the hole a little, then fade the veil.
