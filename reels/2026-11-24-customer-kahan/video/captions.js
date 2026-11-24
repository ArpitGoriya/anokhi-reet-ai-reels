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
  ['c19', '*Comment* karo *SHOP.*', 3],
];

// Chunk start times (s): tools/caption_timing.py (faster-whisper, 69 of 81 words matched), voice female-customer-kahan-take2.mp3; c2, c3, c4, c7, c8, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19 nudged by hand to the pauses.
const STARTS = [
  0.19, 1.60, 2.75, 4.20, 5.68, 6.98, 8.40, 10.65, 11.92, 12.65, 14.20, 15.95, 17.25, 18.40, 19.85, 22.03, 23.90, 25.65, 27.50, 28.72];
// When each script word of a chunk is spoken (drives the word-by-word highlight).
const WORDS = [
  [0.27, 0.68, 1.04],
  [1.68, 1.73, 1.99],
  [2.83, 3.2, 3.62, 3.86],
  [4.28, 4.77, 4.93, 5.25, 5.55],
  [5.76, 5.88, 6.3, 6.42, 6.65],
  [7.06, 7.36, 7.6, 7.9],
  [8.48, 9.24, 9.56, 9.68, 9.97, 10.2],
  [10.73, 11.1, 11.36, 11.6],
  [12.0, 12.12],
  [12.7, 13.4, 13.6],
  [14.28, 14.6, 15.2, 15.34, 15.7, 15.9],
  [16.03, 16.55, 16.83],
  [17.33, 18.05, 18.27, 18.35],
  [18.48, 19.2, 19.58, 19.8],
  [19.93, 20.65, 20.81, 21.03, 21.37, 21.59, 21.87],
  [22.11, 22.55, 22.97, 23.39],
  [23.98, 24.35, 25.07, 25.6],
  [25.73, 26.34, 26.83, 27.17],
  [27.58, 28.32, 28.6],
  [28.8, 29.52, 29.76]];
const VOICE_END = 30.22, DURATION = 31.42;
