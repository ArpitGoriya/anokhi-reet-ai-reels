// Caption chunks: [id, Roman Hinglish caption (*gold* words), number of script.txt words it covers]
// tools/caption_timing.py fills STARTS / VOICE_END / DURATION from the voice (re-run after every voice take).
const CHUNKS = [
  ['c1', '*Rental dukaan* hai?', 3],
  ['c2', 'Toh ek *sawaal…*', 3],
  ['c3', 'aapke *customer kahan* hain?', 4],
  ['c4', 'Dukaan mein *maal bhara* hai…', 5],
  ['c5', 'par customer ka *wait karte-karte*', 5],
  ['c6', '*din nikal* jaata hai.', 4],
  ['c7', '*Pamphlet, status,* sab try kar liya.', 6],
  ['c8', 'Par *sach* yeh hai…', 4],
  ['c9', 'aaj customer', 2],
  ['c9b', '*dukaan-dukaan* nahi ghoomta.', 3],
  ['c10', 'Woh *phone pe outfit* dhoondhta hai.', 6],
  ['c11', 'Aur woh customer…', 3],
  ['c12', '*Anokhi Reet* pe hai.', 4],
  ['c13', '*Customer humare paas* hai.', 4],
  ['c14', 'Aapko bas *apni dukaan list* karni hai.', 7],
  ['c15', 'Listing seedha *WhatsApp* se.', 4],
  ['c16', 'Aur setup? *Bilkul aasaan.*', 4],
  ['c17', 'Customer dhoondhna *humara kaam.*', 4],
  ['c18', 'Outfit dena *aapka.*', 3],
  ['c19', 'Agar aapko bhi apni', 4],
  ['c19b', '*shop online list* karni hai…', 5],
  ['c19c', 'toh *comment* karo *LIST.*', 4],
];

// Chunk start times (s): tools/caption_timing.py (faster-whisper, 69 of 91 words matched), voice female-customer-kahan-take3.mp3; c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22 nudged by hand to the pauses.
const STARTS = [
  0.19, 1.60, 2.75, 4.20, 5.68, 6.98, 8.40, 10.65, 11.92, 12.65, 14.20, 15.95, 17.25, 18.40, 19.85, 22.03, 23.90, 25.65, 27.50, 28.90, 29.84, 31.42];
// When each script word of a chunk is spoken (drives the word-by-word highlight).
const WORDS = [
  [0.27, 0.68, 1.04],
  [1.68, 1.73, 1.99],
  [2.83, 3.2, 3.62, 3.86],
  [4.28, 4.77, 4.93, 5.25, 5.55],
  [5.76, 5.86, 6.28, 6.4, 6.63],
  [7.06, 7.36, 7.6, 7.9],
  [8.48, 9.26, 9.72, 9.88, 10.12, 10.3],
  [10.73, 11.04, 11.87, 11.87],
  [11.95, 12.3],
  [12.7, 13.2, 13.65],
  [14.25, 14.5, 14.8, 15.0, 15.3, 15.6],
  [15.99, 15.99, 16.08],
  [17.33, 18.05, 18.27, 18.35],
  [18.48, 19.2, 19.58, 19.8],
  [19.93, 20.65, 20.81, 21.03, 21.37, 21.61, 21.87],
  [22.11, 22.55, 22.97, 23.39],
  [23.98, 24.35, 25.07, 25.6],
  [25.73, 26.34, 26.83, 26.95],
  [27.58, 28.04, 28.74],
  [28.98, 29.03, 29.58, 29.7],
  [29.92, 30.22, 30.64, 30.86, 31.1],
  [31.5, 31.64, 32.0, 32.2]];
const VOICE_END = 32.52, DURATION = 34.04;
