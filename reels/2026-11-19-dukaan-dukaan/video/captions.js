// Caption chunks: [id, Roman Hinglish caption (*gold* words), number of script.txt words it covers]
// tools/caption_timing.py fills STARTS / VOICE_END / DURATION from the voice (re-run after every voice take).
const CHUNKS = [
  ['c1', 'Ek outfit ke liye *das dukaan?*', 6],
  ['c2', 'Purani Komal: *dhoop, traffic*,', 4],
  ['c3', 'aur har dukaan pe wahi sawal…', 6],
  ['c4', '*"Price kitna hai?"*', 3],
  ['c5', 'Smart Komal: *sofa, chai*, aur *phone.*', 6],
  ['c6', 'Smart Komal ne *Anokhi Reet* pe outfits dekhe', 8],
  ['c7', 'aur kaha, *"Wow, itne saare options!"*', 6],
  ['c8', 'Phir usne *city, occasion* aur *budget* choose kiya.', 8],
  ['c9', '*Photos* dekhe, *rent price* dekha, compare kiya…', 7],
  ['c10', 'sab *ghar baithe.*', 3],
  ['c11', 'Phir *seedha ek dukaan* gayi,', 5],
  ['c12', 'jo outfit chahiye tha *wahi liya.*', 6],
  ['c13', '*Bas.*', 1],
  ['c14', 'Aur *Purani Komal?*', 3],
  ['c15', 'Abhi bhi *dukaan number 10* pe…', 6],
  ['c16', 'Toh aap *kaunsi Komal* ho?', 5],
  ['c17', 'Pehle *phone pe dekho*,', 4],
  ['c18', 'phir *seedha dukaan* jao.', 4],
  ['c19', '*Download* karo *Anokhi Reet!*', 4],
];

// Chunk start times (s): tools/caption_timing.py (c6, c17, c18 nudged to the voice's pauses by hand) (faster-whisper, 88 of 95 words matched), voice female-dukaan-dukaan-take2.mp3.
const STARTS = [
  0.00, 2.25, 4.40, 6.00, 7.49, 10.60, 13.04, 15.91, 18.85, 21.42, 22.47, 23.80, 25.58, 26.38, 27.63, 29.58,
  30.92, 32.10, 33.24];
// When each script word of a chunk is spoken (drives the word-by-word highlight).
const WORDS = [
  [0.0, 0.44, 0.78, 0.94, 1.08, 1.42],
  [2.33, 2.7, 3.02, 4.02],
  [4.48, 4.74, 4.94, 5.24, 5.38, 5.7],
  [6.08, 6.66, 6.98],
  [7.57, 7.98, 8.32, 9.5, 10.02, 10.07],
  [10.66, 11.2, 11.54, 11.72, 12.16, 12.28, 12.42, 12.82],
  [13.12, 13.42, 13.94, 14.68, 15.04, 15.3],
  [15.99, 16.04, 16.5, 17.06, 17.48, 17.88, 18.08, 18.4],
  [18.93, 19.34, 19.72, 19.9, 20.24, 20.5, 20.92],
  [21.5, 21.7, 22.0],
  [22.55, 22.86, 23.16, 23.24, 23.54],
  [23.88, 24.04, 24.38, 24.62, 24.78, 25.16],
  [25.66],
  [26.46, 26.51, 27.06],
  [27.71, 28.02, 28.16, 28.5, 28.76, 29.06],
  [29.66, 29.71, 29.76, 30.25, 30.56],
  [30.97, 31.2, 31.45, 31.76],
  [32.16, 32.32, 32.6, 32.88],
  [33.32, 33.76, 33.88, 34.43]];
const VOICE_END = 34.81, DURATION = 36.27;
