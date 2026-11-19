# Reel: Dukaan-dukaan ki bhaag-daud

- **Date started:** 2026-11-19
- **Made by:** dhruvifewtone-wq
- **Status:** video sent

## Brief

- **About:** A split-screen comparison for customers: "Purani Komal" goes shop to shop in the sun; "Smart Komal"
  browses Anokhi Reet from her sofa, then goes straight to one shop. In the end Purani Komal switches too.
- **For:** Customers who rent outfits for weddings and functions (Gujarat).
- **One message:** Look on the phone first, then go straight to one shop. Download Anokhi Reet.
- **Voice:** female (Vindemiatrix), as the narrator.
- **Characters:** New: **Komal** (20s), shown as two versions of herself: Purani Komal (left) and Smart Komal
  (right). A shop owner in scene 5 (reuse `HETALBEN` from the cast).
- **Length:** about 45-50 s (the voice decides).
- **Music:** none (voice only).
- **Special wishes:** Split screen for most of the video; flat 2D, brand colours, yellow-box highlights on key
  words; emojis on screen as in the script. Call to action: Download Anokhi Reet.

## Teammate changes (override the brand defaults for this reel only)

- Key words on screen in yellow (gold) highlight boxes.
- On-screen text may use a few emojis (🥵 ☀️ 🚗 🛋️ ☕ 📸 💰 🏠 ✅ 😮‍💨 🤔 📱 👇), as in the teammate's script.
- Voice only: the script's sounds (horns, footsteps, calm music, taps, shop bell, pop, tumbleweed whistle, shimmer,
  jingle) are shown visually. No "whoosh" (brand rule: no swish or whoosh effects).
- Scene 3 uses the longer line with "Wow, itne saare options!" (teammate chose it, 2026-11-19).
- **No rupee amounts** on the drawn app screens (teammate chose it, 2026-11-19): outfit cards show a "Rent" label,
  not "₹1,800" (Never-say list: no prices in our words).

## Script and storyboard (approved: yes, 2026-11-19)

| # | Voice line (caption) | On screen (scene, characters and what they do) | Label / title |
|---|---|---|---|
| 1 | Ek outfit ke liye *das dukaan?* | **Hook from frame 1:** split screen. Left: Purani Komal on a hot street. Right: Smart Komal on her sofa. Both hold the same wedding card. Labels pop over each half: "Purani Komal" / "Smart Komal". | Big title from frame 1: **Ek outfit, das dukaan? 🥵** |
| 2 | Purani Komal: *dhoop, traffic*, / aur har dukaan pe wahi sawal… / *"Price kitna hai?"* | The left half widens. Komal walks from shop to shop under a blazing sun (heat waves), an auto goes past with "beep beep" marks. At a counter her bubble says "Price kitna hai?". A shop counter pill climbs 1 → 4 → 7 → 10; she sweats, her shopping bag stays empty. | Dhoop ☀️ Traffic 🚗 · Dukaan 1… 4… 7… 10 |
| 3 | Smart Komal: *sofa, chai*, aur *phone*. | The right half widens. Komal leans back on her sofa, sips chai (steam), scrolls her phone and smiles. | Sofa 🛋️ Chai ☕ 📱 |
| 4 | Smart Komal ne Anokhi Reet pe outfits dekhe / aur kaha, *"Wow, itne saare options!"* / Phir usne *city, occasion* aur *budget* choose kiya. / *Photos* dekhe, *rent price* dekha, compare kiya… / sab *ghar baithe*. | The phone fills the frame: the app's grid of outfits from different shops. Her "Wow!" bubble, eyes wide. Chips light up one by one: City · Reception · Budget. Cards pop with photos and a "Rent" label (no amounts); two cards slide side by side to compare; she taps a blue gown and it gets a tick. | Photos 📸 Rent price 💰 Ghar baithe 🏠 |
| 5 | Phir *seedha ek dukaan* gayi, / jo outfit chahiye tha *wahi liya*. *Bas.* | Smart Komal walks into one shop and holds up her phone with the blue gown: "Ye wala." The shop owner (Hetalben) smiles and hands her the same blue gown on a hanger. A green tick pops. | Sirf 1 dukaan ✅ |
| 6 | Aur Purani Komal? / Abhi bhi *dukaan number 10* pe… | Back on the left: Purani Komal sits on the step outside shop no. 10, fanning herself with the wedding card, empty bag beside her. A tumbleweed rolls past. | Dukaan no. 10… 😮‍💨 |
| 7 | Toh aap *kaunsi Komal* ho? | The split line fades and both halves merge. Smart Komal shows Purani Komal her phone; she smiles, a gold shimmer sweeps over her and she becomes Smart Komal too. | **Aap kaunsi Komal ho? 🤔** |
| 8 | Pehle *phone pe dekho*, / phir *seedha dukaan* jao. / *Download* karo Anokhi Reet! | Komal faces us holding her phone with the app, then the maroon end card: Anokhi Reet wordmark, "Download the app" with the official store badges, anokhireet.in. | Pehle phone, phir dukaan 📱 · Download Anokhi Reet 👇 |

Voice text: [`script.txt`](script.txt).

## Voice-over

- File: `output/female-dukaan-dukaan-take2.mp3` (on the maker's computer) — approved: yes, 2026-11-19
- Captions timed with `tools/caption_timing.py` (c6, c17, c18 nudged by hand to the voice's pauses).

## Video

- `output/2026-11-19-dukaan-dukaan.mp4` (36 s), video 1 sent 2026-11-19.

## Feedback rounds

1. Voice take 1: the last "Anokhi Reet" sounded different → written in Devanagari ("अनोखी रीत") with a short pause before it; take 2.

## Caption

```
Ek outfit ke liye das dukaan, dhoop aur traffic? 🥵

Anokhi Reet pe ghar baithe outfits, photos aur rent price dekho, compare karo, aur seedha ek dukaan jao 📱✅

Aap Purani Komal ho ya Smart Komal? Comment karo 👇

#LehengaOnRent #OutfitRental #GujaratiWedding #SmartShopping #AnokhiReet
```

## Added to the library (at least two per reel)

- `bazaarBG` + `bazaarScroll`: a hot market street with a long row of numbered shops that slides past a walker
  (sun, heat haze), and `splitDynSVG` + `splitAt`: a split screen whose divider moves (both in `engine/sets.js`).
- `sunSVG`, `autoSVG` (auto-rickshaw), `tumbleweedSVG` in `engine/props.js`.
- New cast: Komal (`KOMAL.purani` / `KOMAL.smart`).

## Suggested default (for the owner)

- (none yet)

## Lessons

- (after the reel)
