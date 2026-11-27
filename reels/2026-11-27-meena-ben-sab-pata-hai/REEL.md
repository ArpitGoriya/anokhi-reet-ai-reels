# Reel: Sab pehle se PATA hai (Meena ben ki rental shop)

- **Date started:** 2026-11-27
- **Made by:** teammate (script, from `Anokhireet_Rental_Shop_Reel_Script.pdf`) + Claude
- **Status:** script approved; voice take 1 waiting for a listen

## Brief

- **About:** Meena ben's bookings drop from 60 to 25 a month although customers love her collection. Her notebook
  shows people leave on their 3rd-4th visit; a customer says "sab pehle se pata hai". Hedonic adaptation: even the
  most beautiful thing gets boring if you see it again and again. She makes a rotating display (a new collection
  in front every week) and reaches new customers through Anokhi Reet; in 2 months bookings go back to 62.
- **For:** Rental shop and boutique owners.
- **One message:** A rental business starts with the collection, but runs on NEW customers.
- **Voice:** female (same as Meena's first reel)
- **Characters:** reuse **Meena** (`MEENA.shop`, `.night` with glasses); customers (`CUSTOMER_W`, `GUEST_W1`), a
  girl at a mirror (`BRIDE`-like look).
- **Length:** about 58 s (180 words; the PDF planned ~64 s)
- **Music:** none
- **Special wishes (from the PDF):** caption chunks of 2-4 words; something new on screen every 1.5-2 s; purple
  "PSYCHOLOGY" screen; Save icon at the end.

## Teammate changes (override the brand defaults for this reel only)

Everything here is applied in every round and never silently reverted.

- **Short captions:** 2-4 words per chunk (default 3-7). (PDF)
- **Purple "PSYCHOLOGY" card** for hedonic adaptation (brand grounds are cream and maroon; the teammate asked for
  purple). (PDF)
- **Story numbers kept** (60 → 41 → 25 → 34 → 62 bookings, 10 customers, 120 group members): Meena ben's made-up
  story (PDF note), not Anokhi Reet results. A small "Ek kahani" tag shows at the start. (round 0)
- **Brand name** written "Anokhi Reet" (the PDF says "Anokhireet"). (round 0)
- **End card:** our usual Anokhi Reet follow card (no @handle), plus a Save icon. (round 0)
- **Post caption hashtags** cut to 5 (brand rule; the PDF has 8). (round 0)

## Script and storyboard (approved: yes)

Voice script: [`script.txt`](script.txt) (Devanagari, female voice).

| # | Voice line (caption) | On screen | Label / title |
|---|---|---|---|
| 1 | Pehle *60 bookings...* ab sirf *25.* | Meena ben at her counter, hand on her cheek; two full racks; a card "Bookings har mahine" | Title: "Pehle *60*… ab sirf *25*" |
| 2 | Season ke teesre mahine tak... sirf 25. | The card counts down 60 → 41 → 25; racks stay full | Pill: "Bookings: 60 → 25" |
| 3 | Meena ben ka collection... ekdum *designer* jaisa. | Two customers in the trial room, smiling, thumbs up | — |
| 4 | Sab taareef karte. Phir bhi chupchaap... *kahin aur.* | Chat group "Meena Rentals · 120 members": "Lehenga mast tha ben!", then "Is baar kahin aur se le rahi hu" | Title: "*KAHIN AUR.*" |
| 5 | Meena ben ne har customer ka hisaab notebook mein likha. | Meena ben in glasses with a notebook "Customer kab gaya?", columns Visit 1-4 | — |
| 6 | Zyaadatar log chhod rahe the... *teesri-chauthi* visit pe. | Red X marks pile up under Visit 3 and 4; she circles them | Pill: "*Teesri-chauthi* visit" |
| 7 | 10 customers se poocha... toh ek boli, | Split-screen phone call: Meena ben and a regular customer | Pill: "10 customers se poocha" |
| 8 | "Ben, kapde mast hain... par aapki dukaan mein kya hai, *sab pehle se pata* hai." | Three cards slide in: "Navratri: Maroon lehenga, Peach choli" ×3, each stamped SAME | Stamps: "SAME · SAME · SAME" |
| 9 | Psychology mein ise kehte hain *hedonic adaptation.* | Purple "PSYCHOLOGY" card | Title: "*HEDONIC ADAPTATION*" |
| 10 | Sabse sundar cheez bhi baar-baar dikhe... toh *boring* lagne lagti hai. | A lehenga with a face ring going happy → okay → bored across Din 1 / Din 2 / Din 5 | Pill: "Roz ki cheez = boring cheez" |
| 11 | Naya lehenga bhi... pehle function mein *wow*... teesre function tak, "*phir se yahi?*" | A girl at her mirror: "Function 1: WOW", then "Function 3: phir se yahi?" | Pills |
| 12 | Meena ben ne apne racks ka *rotating* display banaya. Har hafte, naya collection aage. | A board: Hafta 1 Bridal · Hafta 2 Pastel · Hafta 3 Bandhani · Hafta 4 Indo-western, ROTATING stamp; racks swap | Title: "*ROTATING* collection" |
| 13 | Aur Anokhi Reet ki madad se... *naye customers* tak pahunchi. | Her phone opens Anokhi Reet; map pins light up around Ahmedabad | Pill: "Anokhi Reet · Naye customers" |
| 14 | Woh customers, jinhone ye dukaan kabhi dekhi hi nahi thi. App pe dekhte, book karte, shop pe aake *try* karte. | One books online, a "Try at shop" tag pops up; she walks in and tries | Tag: "Try at shop" |
| 15 | Do mahine mein... 25 se wapas *62* bookings. | Stat card "2 mahine" counts 25 → 34 → 62 ↑ in green; racks half empty | Title: "2 mahine: *62* ↑" |
| 16 | Rental business, collection se aata hai... *naye customers* se chalta hai. | Meena ben smiling at a busy counter | Title: the line |
| 17 | Rental shop ya boutique chalate ho? *Save* kar lo... aur naye customers tak pahuncho, Anokhi Reet ke saath. | Meena ben waves; Save bookmark icon; Anokhi Reet follow card | End card |

## Voice-over

- Take 1: `output/female-meena-ben-take1.mp3` (64.9 s) — approved: pending
- Captions timed with `tools/caption_timing.py` (redo after every new take)

## Feedback rounds

1. (round 0) Converted the PDF script to Devanagari; female voice; Anokhi Reet follow card; 2-4 word captions.

## Caption

```
Collection sundar hai, phir bhi customers kahin aur ja rahe hain? 🤔
Problem kapde nahi… SAME kapde hain.
Meena ben ne 25 bookings se 62 tak kaise pahunchaya, poora dekho.
Rental shops, boutiques aur designers: Anokhi Reet ke saath naye customers tak pahuncho. App link in bio.
#AnokhiReet #RentalShop #LehengaOnRent #BoutiqueOwner #HedonicAdaptation
```

## Added to the library (at least two per reel)

- (planned) Notebook with visit columns and X marks; emoji mood ring; SAME stamp; weekly rotation board; trial room.

## Suggested default (for the owner)

-

## Lessons

-
