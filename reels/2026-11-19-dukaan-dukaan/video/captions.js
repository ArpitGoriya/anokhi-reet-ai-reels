// Caption chunks: [id, Roman Hinglish caption (*gold* words), number of script.txt words it covers]
// tools/caption_timing.py fills STARTS / VOICE_END / DURATION from the voice (re-run after every voice take).
// Version 2 (script with the mystery hook), voice take 3.
const CHUNKS = [
  ['c1', 'Ek hi *Komal…* ek hi *reception.*', 6],
  ['c2', 'Ek baar *4 ghante* lage…', 5],
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

// Chunk start times (s): tools/caption_timing.py (faster-whisper, 110 of 114 words matched), voice female-dukaan-dukaan-take3.mp3; c9, c14, c16-c18, c22, c23 nudged by hand to the pauses.
const STARTS = [
  0.17, 2.45, 4.25, 6.34, 7.22, 9.84, 11.63, 12.84, 15.68, 17.42, 19.99, 22.45, 24.94, 25.95, 27.32, 29.30, 30.02, 31.30, 33.12, 34.32, 36.36, 37.62, 39.05, 40.27];
// When each script word of a chunk is spoken (drives the word-by-word highlight).
const WORDS = [
  [0.25, 0.3, 0.6, 1.34, 1.39, 1.66],
  [2.53, 2.58, 2.98, 3.42, 3.74],
  [4.33, 4.38, 4.68, 4.94, 5.42, 5.72],
  [6.42, 6.47, 6.86],
  [7.3, 7.86, 8.53, 9.18],
  [9.92, 10.0, 10.28, 10.56, 10.72, 11.02],
  [11.71, 11.76, 12.32],
  [12.92, 13.38, 14.03, 14.72, 15.16, 15.21],
  [15.72, 16.18, 16.42, 16.58, 16.98],
  [17.5, 17.66, 17.94, 18.44, 19.04, 19.16],
  [20.07, 20.12, 20.6, 21.24, 21.46, 21.72, 22.0],
  [22.53, 22.9, 23.14, 23.56, 23.86, 23.98, 24.5],
  [25.02, 25.36, 25.58],
  [25.99, 26.0, 26.88, 26.96, 27.24],
  [27.4, 27.8, 28.1, 28.38, 28.56, 28.84],
  [29.34],
  [30.06, 30.28, 30.72],
  [31.34, 31.37, 31.82, 32.12, 32.36, 32.56],
  [33.2, 33.25, 33.7, 33.84],
  [34.4, 34.45, 35.02, 35.92],
  [36.44, 36.72, 36.96, 37.14],
  [37.66, 37.8, 38.26, 38.54],
  [39.09, 39.3, 39.68, 39.84],
  [40.35, 40.4, 41.0, 41.26, 41.6, 41.65]];
const VOICE_END = 42.11, DURATION = 43.61;
