// Caption chunks: [id, Roman Hinglish caption (*gold* words), number of script.txt words it covers]
// tools/caption_timing.py fills STARTS / VOICE_END / DURATION from the voice (re-run after every voice take).
const CHUNKS = [
  ['c1', 'Ek *sawaal*:', 2],
  ['c2', 'shaadi ka outfit *kitni baar* pehnte ho?', 6],
  ['c3', 'Ye hain *Hetal ben*.', 4],
  ['c4', 'Follow karo *Anokhi Reet.*', 4],
];
// Chunk start times (s): placeholder until a voice exists.
const STARTS = [0.2, 1.6, 4.4, 6.6];
const VOICE_END = 8.6, DURATION = 9.6;
