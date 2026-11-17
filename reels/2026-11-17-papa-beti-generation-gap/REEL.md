# Reel: Papa aur beti (generation gap)

- **Date started:** 2026-11-17
- **Made by:** teammate (script) + Claude
- **Status:** video 1 rendered (2026-11-17); sent to the teammate

## Brief

- **About:** A story reel. A father who has run a rental shop since 1998 waits outside for customers; his daughter
  "opens the shop on the phone". Both are right: he built trust face to face over years, she knows new customers
  find shops on the phone. One night he sees his shop live online and a new booking arrives. Same goal: see the
  shop grow.
- **For:** Rental shop, boutique and designer studio owners (and their families).
- **One message:** Father's trust + daughter's reach. Put your shop online on Anokhi Reet.
- **Voice:** male
- **Characters:** new: **Papa** (shop owner, 50s-60s, "Since 1998") and **beti** (daughter, 20s); an old customer
  (cast `GUEST_M`), young customers (`CUSTOMER_W`).
- **Length:** about 55 s (173 words)
- **Music:** none
- **Special wishes:** Split-screen hook; "Since 1998" board; calendar 1998 → 2026; "New booking 🎉" notification.

## Teammate changes (override the brand defaults for this reel only)

Everything here is applied in every round and never silently reverted.

- **Length about 55 s** (the plan said 40 s; all lines kept). (round 0)
- **Last line** turned from Roman Hinglish into Devanagari with correct grammar: "आपकी भी rental shop, boutique या
  designer studio है, तो आज ही उसे Anokhi Reet पर online लाइए... जैसे उस बेटी ने किया।" (round 0)
- **Softened** "नया customer एक click पर मिलता है" to "नया customer एक click की दूरी पर है" (brand: no guarantees). (round 0)
- **Post caption:** kept the teammate's text; hashtags cut to 5 (brand rule) and the cut-off "#Ahm…" removed. (round 0)

## Script and storyboard (approved: yes)

Voice script: [`script.txt`](script.txt) (Devanagari, male voice).

| # | Voice line (caption) | On screen | Label / title |
|---|---|---|---|
| 1 | Ek pita customer ke intezaar mein din bhar rental dukaan ke bahar khada rehta hai... | **Split screen.** Left: Papa outside his shop on the street, looking left and right, people pass by. Right: beti at home, phone up, taking photos of lehengas | Title: "Papa: *DUKAAN* ke bahar… Beti: *PHONE* pe" |
| 2 | aur uski beti customer ko dukaan tak laane ke liye phone pe dukaan khol deti hai. | Right side: her phone screen fills with the shop's lehengas; a shutter on the phone rolls up | — |
| 3 | Pita sochta hai, "Jo customer dukaan pe aaya, wahi asli customer hai. | Inside the shop, "Since 1998" board; Papa shakes hands with an old customer (uncle), both smiling | Pill: "Since 1998" |
| 4 | Bharosa aamne-saamne banta hai." | Close-up of the handshake, a small gold heart | Bubble |
| 5 | Beti sochti hai, "Papa, jo customer dukaan tak pahunch hi nahi paaya... uska kya?" | Beti's phone: young women searching "lehenga on rent"; a map with other shops' pins, Papa's shop missing (a dashed empty spot with "?") | Bubble |
| 6 | Dono apni jagah galat nahi hain. | Papa and beti on two sides of one lehenga rack, looking at each other | Title: "Dono *SAHI*" |
| 7 | Bas fark itna hai ki pita ne woh daur dekha hai jahan dukaan ki pehchaan uska *board* tha... | Calendar pages flip from 1998; the old painted shop board | Pill: "1998: board" |
| 8 | aur beti ne woh daur dekha hai jahan pehchaan *phone ki screen* pe banti hai. | Pages flip on to 2026; a phone screen with the shop page | Pill: "2026: screen" |
| 9 | Pita ne customer ka bharosa *saal dekar* kamaaya... | Papa with grey hair over the years; a row of happy old customers | — |
| 10 | aur beti jaanti hai ki naya customer *ek click* ki doori pe hai. | Beti taps her phone; a finger tap ripple, a new customer pops up | — |
| 11 | Shaayad isi ka naam *generation gap* hai. | Night. Papa with glasses looks into beti's phone; his shop is live on Anokhi Reet | — |
| 12 | Soch alag hai, lekin dono ki manzil ek hi hai... apni dukaan ko aage badhte dekhna. | Notification "New booking 🎉" pops; Papa smiles, beti hugs him | Toast: "New booking" |
| 13 | Pita ka bharosa, beti ki pahunch. | The old shop board and the phone with the shop's Anokhi Reet page side by side | Title: "Pita ka *BHAROSA*, beti ki *PAHUNCH*" |
| 14 | Aapki bhi rental shop, boutique ya designer studio hai, toh aaj hi use Anokhi Reet pe online laaiye... jaise us beti ne kiya. | Papa and beti together wave; Anokhi Reet follow card | End card |

## Voice-over

- Take 1: `output/male-papa-beti-take1.mp3` (52.2 s) — approved: yes (2026-11-17)
- Captions timed with `tools/caption_timing.py` (redo after every new take)

## Feedback rounds

1. (round 0) Kept at ~55 s; male voice; last line in Devanagari; "एक click की दूरी पर"; hashtags cut to 5.
2. Video 1: 11 scenes, `output/2026-11-17-papa-beti-generation-gap.mp4` (53 s).

## Caption

```
पापा कहते हैं, "भरोसा आमने-सामने बनता है" 🙏
बेटी कहती है, "customer अब phone पर ढूँढता है" 📱
दोनों सही हैं ❤️
आपके घर में ये बहस कौन जीतता है? Comment में बताओ 👇
👉 anokhireet.in
#AnokhiReet #GenerationGap #RentalShop #BoutiqueOwners #SmallBusiness
```

## Added to the library (at least two per reel)

- Sets: `shopFrontBG` (a shop seen from the street, with road and passers-by), `oldBoardSVG` (painted shop board
  with "Since ..."), `splitSVG` (split screen helper).
- New cast: Papa (`PAPA.shop` / `.young` / `.night`) and beti (`BETI`).

## Suggested default (for the owner)

- Teammate asked to use the voice from the DukaanDidi Instagram page. Not possible: it is another creator's voice
  (no copying or imitating a real person's voice). If the owner wants, a *new* voice with a similar chatty, warm
  "didi" style could be tried as an experiment (CLAUDE.md: new voices only with the owner's OK).

## Lessons

- Whisper lost its place after 25 s on this male take (66 of 173 words); c18-c35 were timed from the voice's
  pauses and the words it did hear. Third reel today with this: worth making the matcher re-anchor (owner).
- The narrator is male, so Papa and beti don't lip-sync; their lines are thought bubbles.
