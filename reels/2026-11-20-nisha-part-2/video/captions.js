// Caption chunks: [id, Roman Hinglish caption (*gold* words), number of script.txt words it covers]
// tools/caption_timing.py fills STARTS / VOICE_END / DURATION from the voice (re-run after every voice take).
const CHUNKS = [
  ['c1', 'Yaad hai *Nisha?*', 3],
  ['c2', '*₹2.5 lakh* ke lehenge, *kamaai zero?*', 6],
  ['c3', 'Aur pati ne bola tha…', 5],
  ['c4', '*"Bech de."*', 2],
  ['c5', 'Toh *ek season baad*', 4],
  ['c6', 'hisaab dekhte hain.', 3],
  ['c7', '*12 mein se 7* lehenge *book* hue…', 7],
  ['c8', '*14 bookings,* ₹2,200 average.', 5],
  ['c9', 'Total *₹30,800.*', 5],
  ['c10', 'Jo poore 12 lehenge *bechke* milta…', 6],
  ['c11', 'utna *ek season ke rent* mein aa gaya.', 8],
  ['c12', 'Aur lehenge? Abhi bhi *almari mein.*', 6],
  ['c13', 'Pati ne poocha, *"Ye… sab rent se?"*', 7],
  ['c14', 'Nisha boli, *"Haan.* Tumne toh bola tha *bech de."*', 9],
  ['c15', 'Aur ab pati bole…', 4],
  ['c16', '*"Achha sun…* meri *sherwani* bhi', 5],
  ['c17', '*rent pe* daal de na."', 5],
  ['c18', 'Outfit *bechne* se *ek baar* paisa milta hai.', 8],
  ['c19', 'Rent pe dene se *har season* kamaai ka mauka.', 9],
  ['c20', 'Aapka lehenga bhi *kamaa sakta* hai.', 6],
  ['c21', 'Agar aapko bhi apne *outfits rent* par dene hain…', 9],
  ['c22', 'toh *comment* karo *RENT.*', 4],
];

// Chunk start times (s): tools/caption_timing.py (faster-whisper, 80 of 116 words matched), voice female-nisha-part-2-take3.mp3 (take 2 + the new CTA line joined at 36.5 s; c21-c22 set from the line's own word times); c3, c5, c9 nudged by hand to the pauses.
const STARTS = [
  0.23, 1.23, 3.45, 4.38, 5.45, 6.56, 7.74, 9.77, 11.80, 13.61, 15.80, 17.89, 20.00, 22.56, 25.43, 26.60, 28.46, 29.80, 32.13, 35.02, 36.80, 39.12];
// When each script word of a chunk is spoken (drives the word-by-word highlight).
const WORDS = [
  [0.31, 0.36, 0.7],
  [1.31, 1.36, 1.75, 1.92, 2.62, 2.96],
  [3.53, 4.01, 4.27, 4.33, 4.33],
  [4.46, 4.82],
  [5.53, 5.87, 6.41, 6.51],
  [6.64, 7.02, 7.14],
  [7.82, 7.87, 8.3, 8.46, 8.68, 9.08, 9.34],
  [9.85, 10.18, 10.63, 10.89, 11.06],
  [11.88, 12.25, 12.97, 13.09, 13.4],
  [13.69, 13.74, 14.04, 14.39, 14.93, 15.34],
  [15.88, 15.93, 16.48, 16.76, 16.88, 17.16, 17.28, 17.36],
  [17.97, 18.02, 18.5, 18.84, 19.14, 19.5],
  [20.08, 20.13, 20.44, 21.01, 21.36, 21.78, 22.06],
  [22.64, 22.98, 23.49, 24.1, 24.15, 24.46, 24.64, 24.8, 25.06],
  [25.51, 25.88, 26.16, 26.42],
  [26.68, 27.07, 27.78, 27.83, 28.41],
  [28.54, 28.76, 28.86, 28.98, 29.14],
  [29.88, 30.28, 30.64, 30.86, 31.12, 31.32, 31.56, 31.82],
  [32.21, 32.54, 32.66, 32.88, 33.1, 33.34, 33.82, 33.94, 34.24],
  [35.1, 35.36, 35.64, 35.76, 36.12, 36.36],
  [36.82, 37.09, 37.37, 37.49, 37.73, 38.15, 38.41, 38.55, 38.81],
  [39.17, 39.29, 39.65, 39.87]];
const VOICE_END = 40.5, DURATION = 42.0;
