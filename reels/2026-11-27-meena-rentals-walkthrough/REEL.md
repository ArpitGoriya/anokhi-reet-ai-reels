# Reel: Poori rental shop, bas ek app pe (Meena Rentals walkthrough)

- **Date started:** 2026-11-27
- **Made by:** teammate (script, from `Anokhireet_Rental_Shop_Walkthrough_Script.pdf`) + Claude
- **Status:** video 1 rendered (2026-11-27); sent to the teammate

## Brief

- **About:** A feature walkthrough. Meena ben shows Meena Rentals on Anokhi Reet in 6 numbered sections: 01 Shop
  profile, 02 Nearby (customers find the shop on a map), 03 Budget filter, 04 Outfit detail (size, price,
  availability), 05 Booking (lands straight with the shop), 06 Try at shop or doorstep. Then: register, WhatsApp and
  "available hai kya?" calls, all in one place; and customers who never reached the shop.
- **For:** Rental shop and boutique owners.
- **One message:** Your whole rental shop, on one app.
- **Voice:** male (narrator; Meena ben doesn't lip-sync)
- **Characters:** reuse **Meena** (`MEENA.shop`); customers (`CUSTOMER_W`).
- **Length:** about 48-50 s (137 words; the PDF planned ~63 s)
- **Music:** none
- **Special wishes (from the PDF):** dark brown/maroon background with soft bokeh, cream UI cards, numbered green
  section tags (01-06); karaoke captions (grey line, each word turns white as spoken, keyword gold); end CTA
  "Comment karo SHOP" with anokhireet.in.

## Teammate changes (override the brand defaults for this reel only)

Everything here is applied in every round and never silently reverted.

- **Look:** dark maroon-brown background with soft bokeh for the app sections; cream app cards; green numbered tags
  01-06. Opening and closing in Meena's shop (cartoon style). (PDF)
- **Captions:** unspoken words grey (default is light beige), spoken words white, keyword gold. (PDF)
- **App cards drawn in our flat style**, not real screenshots (teammate's choice); they show only the PDF's confirmed
  features: shop listing, nearby, budget filter, size & availability, online booking, try at shop, doorstep. (round 0)
- **CTA kept:** "Comment karo SHOP" + anokhireet.in (teammate confirms someone replies to comments). (round 0)
- **Brand name** "Anokhi Reet"; post-caption hashtags cut to 5. (round 0)

## Script and storyboard (approved: yes)

Voice script: [`script.txt`](script.txt) (Devanagari, male voice).

| # | Section | Voice line (caption) | On screen |
|---|---|---|---|
| 1 | — | Poori rental shop ka business... bas ek *app* pe. | Meena ben at her counter; racks of lehengas and chaniya cholis; sign "MEENA RENTALS · Lehenga · Chaniya Choli · Sherwani". Title: "Poori shop… *ek app* pe" |
| 2 | — | Dekho, ye hai Meena Rentals... *Anokhi Reet* pe. | A phone slides up in front of her with the Anokhi Reet splash screen (seal + wordmark) |
| 3 | 01 SHOP | Sabse pehle, aapki *shop.* Naam, location, aur poora collection... ek nazar mein. | Dark bokeh. Shop profile card: "Meena Rentals · Navrangpura, Ahmedabad", "Try at shop available" badge; outfit grid fills one by one |
| 4 | 02 NEARBY | Customer ko lehenga chahiye? Woh *nearby* search karta hai... aur aapki shop seedha uske saamne. | Ahmedabad map with a customer pin; shop pins light up; "Meena Rentals" glows with "2.1 km door" |
| 5 | 03 BUDGET | Budget filter lagaya... toh sirf woh customers, jinke *budget* mein aapke kapde hain. | Budget slider moves to a range; matching outfits stay bright, the rest fade |
| 6 | 04 OUTFIT | Har outfit ki poori detail... *size,* price, aur kaunsi date pe available hai. | Outfit card: maroon lehenga, size chips S / M / L, rental price, calendar with booked dates greyed |
| 7 | 05 BOOKING | Customer ne date chuni... aur *booking* seedha aapke paas. Na phone, na register. | Customer taps a date and "Book"; on Meena's side a "New booking" card pops in (outfit, date, name) |
| 8 | 06 TRY AT SHOP | Customer shop pe aake *try* kar sakta hai... ya ghar baithe *doorstep* pe. | Split: a customer walks into the shop with a "Try at shop" tag / the same outfit on a doorstep delivery card |
| 9 | SAB EK JAGAH | Register, WhatsApp, aur "available hai kya?" wale calls... ab *sab ek jagah.* | Messy notebook, missed calls, chats ("Size kya hai?", "Available hai?") zoom out into a neat grid of Anokhi Reet cards |
| 10 | — | Aur woh customers bhi... jo aapki dukaan tak kabhi pahunche hi nahi the. | Meena ben smiling with her phone, the cards floating behind her |
| 11 | CTA | Aapki rental shop ya boutique ke liye bhi aisa platform chahiye? Comment karo *SHOP.* | Headline + green box "Comment karo SHOP", "anokhireet.in" below; Anokhi Reet follow card |

## Voice-over

- Take 1: `output/male-meena-rentals-walkthrough-take1.mp3` (41.4 s) — approved: yes (2026-11-27)
- Captions timed with `tools/caption_timing.py` (redo after every new take)

## Feedback rounds

1. (round 0) PDF converted to Devanagari; male voice; flat app cards; "Comment karo SHOP" kept.
2. Video 1: 11 scenes, `output/2026-11-27-meena-rentals-walkthrough.mp4` (44.6 s; end card held 2 s after the voice).

## Caption

```
Rental shop chalate ho? Register, WhatsApp aur "available hai kya?" calls ka jhanjhat khatam. 📲
Anokhi Reet pe customers aapki shop nearby dhoondhte hain, outfit dekhte hain, book karte hain aur shop pe aake try karte hain.
Comment karo SHOP aur hum details bhejenge. 👇
#AnokhiReet #RentalShop #LehengaOnRent #ChaniyaCholiOnRent #BoutiqueOwner
```

## Added to the library (at least two per reel)

- **App walkthrough kit** in `engine/props.js`: `bokehBG` + `bokehUpd` (dark maroon-brown ground with drifting gold
  bokeh), `uiCard` (cream app card with a soft maroon shadow), `outfitTile`, `sizeChips` + `chipOn`, `availCal`
  (month grid with booked dates greyed), `rangeSlider` + `rangeSet` (two-knob budget slider), `doorstepSVG`.
- Karaoke caption colours for one reel: a `<style>` tag in the scene html (`#cap .w.dim{color:...}`).

## Suggested default (for the owner)

-

## Lessons

- Whisper matched well (112 of 136 words); no hand timing.
- `DURATION` in captions.js was raised by hand to hold the end card 2 s; `caption_timing.py` resets it after a new take.
