# Reel: Rent vs Buy calculator (test reel)

- **Date started:** 2026-11-13
- **Made by:** owner (ArpitGoriya), with Claude — first test of the make-reel flow
- **Status:** test done (round 1 preview); method retired, kept for its lessons

## Brief

- **About:** the free Rent vs Buy calculator (anokhireet.in/calculators/rent-vs-buy-calculator)
- **For:** people with a wedding coming up who'd otherwise buy an outfit worn once
- **One message:** see in seconds how much renting saves
- **Voice:** female (Vindemiatrix)
- **Screens:** recording of the price slider moving and the savings updating; public page, no login
- **Length:** about 16 s
- **Music:** none
- **Special wishes:** test of the whole flow

## Teammate changes (override the brand defaults for this reel only)

- Hook must not start with the calculator: open on eye-catching outfits (real lehenga photos from the app, or a stock clip if one is supplied). (owner, round 0)

## Script and storyboard (approved: owner, 2026-11-13)

| # | Voice line | On screen (page, state, real action) | Text on screen |
|---|---|---|---|
| 1 | शादी में सिर्फ़ एक बार पहनना है... तो पूरा lehenga खरीदना क्यों? | 3 real bridal lehenga photos from /products/bride-lehenga/, big photo cards on maroon, one per second (prices/codes cropped out) | Ek din ke liye pura kharcha? |
| 2 | Anokhi Reet का free Rent vs Buy calculator खोलो, और अपने lehenga की showroom price डालो। | Phone appears. Recording: price slider 25,000 → 60,000, savings update live | Price daalo |
| 3 | देखो... rent करके कितनी बचत होती है! | Gentle zoom on "Your Total Wedding Savings" | Dekho kitni bachat |
| 4 | Calculator बिल्कुल free है, anokhireet.in पर try करो! | End card on cream, TOOLS lockup | Try it free |

## Voice-over

- File: `output/rent-vs-buy-test-female.mp3` (15.7 s, Gemini 3.1, Vindemiatrix) — approved: pending (owner to listen)
- Final text (last line says "anokhireet dot in" so the site name is read out clearly):

```
शादी में सिर्फ़ एक बार पहनना है... तो पूरा lehenga खरीदना क्यों?
Anokhi Reet का free Rent vs Buy calculator खोलो, और अपने lehenga की showroom price डालो।
देखो... rent करके कितनी बचत होती है!
Calculator बिल्कुल free है... anokhireet dot in पर try करो!
```

- Spoken parts (`tools/voice_timing.py`): 0.26-2.12, 2.43-3.78, 4.11-9.21, 9.7-11.91, 12.18-15.44 s

## Build

- Footage: 3 real bridal lehenga photos from the product pages (AR-47L03 pink, AR-47L08 yellow, AR-VRS01 orange),
  photo cropped to remove the heart/share buttons; a screen recording of the calculator (price slider 25,000 →
  40,000 → 60,000, then scroll to the savings card).
- Layout: 1080x1920, 16.2 s; 0-3.9 s hook (maroon, 3 photo cards), 3.9-12.6 s phone (gentle zoom at 9.8 s),
  12.6-16.2 s end card (cream, TOOLS lockup, mandala at 10%).
- Preview made (half size); stays on the owner's computer. This test used a screen-capture method that is no
  longer used: reels are now 2D animation (see the `make-reel` skill).

## Feedback rounds

## Caption

```
Ek din ke liye pura lehenga kharidna? 🤔

Anokhi Reet ka free Rent vs Buy calculator kholo, apne outfit ki showroom price daalo, aur khud dekho rent karke kitni bachat hoti hai.

Try it free on anokhireet.in 👗

#AnokhiReet #LehengaOnRent #WeddingOutfit #BridalLehenga #RentDontBuy
```

## Suggested default (for the owner)

## Lessons

- Product detail pages give full-width photos (1179 px) that are much sharper than the product list.
- Animations that use `transform: none` override a centring `translateX(-50%)`: centre with `left` instead.
- Zoom with `transform-origin` at the top of the phone so the phone doesn't grow up into the text above it.
