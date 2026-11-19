// Caption chunks: [id, Roman Hinglish caption (*gold* words), number of script.txt words it covers]
// tools/caption_timing.py fills STARTS / VOICE_END / DURATION from the voice (re-run after every voice take).
// Version 3 (hook says "rent pe outfit dhoondhne mein"), voice take 4.
const CHUNKS = [
  ['c1', 'Ek hi *Komal…* ek hi *reception.*', 6],
  ['c2', 'Ek baar *rent pe outfit* dhoondhne mein', 7],
  ['c2b', '*4 ghante* lage…', 3],
  ['c3', 'aur ek baar sirf *15 minute.*', 6],
  ['c4', '*Fark kya tha?*', 3],
  ['c5', 'Purani Komal: *dhoop, traffic*,', 4],
  ['c6', 'aur har dukaan pe wahi sawal…', 6],
  ['c7', '*"Price kitna hai?"*', 3],
  ['c8', 'Smart Komal: *sofa, chai*, aur *phone.*', 6],
  ['c9', 'Usne *phone* pe outfits dekhe', 5],
  ['c10', 'aur kaha, *"Wow, itne saare options!"*', 6],
  ['c11', 'Phir *city, occasion* aur *budget* choose kiya.', 7],
  ['c12', '*Photos* dekhe, *rent price* dekha, compare kiya…', 7],
  ['c13', 'sab *ghar baithe.*', 3],
  ['c14', 'Phir *seedha ek dukaan* gayi,', 5],
  ['c15', 'jo outfit chahiye tha *wahi liya.*', 6],
  ['c16', '*Bas.*', 1],
  ['c17', 'Aur *Purani Komal?*', 3],
  ['c18', 'Abhi bhi *dukaan number 10* pe…', 6],
  ['c19', 'Toh *fark kya tha?*', 4],
  ['c20', 'Ek app… *Anokhi Reet!*', 4],
  ['c21', 'Pehle *phone pe dekho*,', 4],
  ['c22', 'phir *seedha dukaan* jao.', 4],
  ['c23', 'Aur comment mein batao…', 4],
  ['c24', 'aap *Purani Komal* ho, ya *Smart?*', 6],
];

// Chunk start times (s): tools/caption_timing.py (faster-whisper, 113 of 119 words matched), voice female-dukaan-dukaan-take4.mp3; c5, c12, c13, c16-c19, c22 nudged by hand to the pauses.
const STARTS = [
  0.21, 2.36, 4.10, 5.21, 7.19, 8.00, 10.30, 12.00, 12.72, 16.14, 17.60, 19.86, 22.30, 24.60, 25.44, 26.82, 28.75, 29.25, 30.45, 32.05, 33.15, 34.70, 35.75, 36.92, 38.04];
// When each script word of a chunk is spoken (drives the word-by-word highlight).
const WORDS = [
  [0.29, 0.34, 0.64, 1.4, 1.45, 1.74],
  [2.44, 2.8, 3.04, 3.26, 3.4, 3.7, 4.04],
  [4.18, 4.52, 4.82],
  [5.29, 5.34, 5.64, 5.9, 6.26, 6.6],
  [7.27, 7.32, 7.6],
  [8.08, 8.74, 9.36, 10.02],
  [10.38, 10.54, 10.76, 11.08, 11.22, 11.5],
  [12.08, 12.42, 12.67],
  [12.8, 13.18, 14.18, 14.91, 14.96, 15.44],
  [16.22, 16.48, 16.74, 16.9, 17.2],
  [17.68, 17.92, 18.04, 18.4, 18.83, 19.27],
  [19.94, 20.12, 20.7, 21.04, 21.26, 21.5, 21.78],
  [22.38, 23.0, 23.48, 23.58, 23.84, 24.3, 24.48],
  [24.68, 25.12, 25.3],
  [25.52, 25.94, 26.32, 26.42, 26.72],
  [26.9, 27.2, 27.44, 27.76, 27.92, 28.32],
  [28.83],
  [29.29, 29.86, 30.22],
  [30.53, 30.85, 31.23, 31.51, 31.73, 31.93],
  [32.13, 32.57, 32.87, 33.1],
  [33.23, 33.28, 33.92, 33.97],
  [34.78, 35.04, 35.26, 35.4],
  [35.83, 36.15, 36.47, 36.73],
  [37.0, 37.18, 37.5, 37.64],
  [38.12, 38.17, 38.6, 38.88, 39.12, 39.3]];
const VOICE_END = 39.6, DURATION = 41.11;
