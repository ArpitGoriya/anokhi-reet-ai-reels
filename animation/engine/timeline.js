// ===== Timeline: caption chunk times -> CT, and T('c8+0.4') time references =====
// Loaded after the reel's captions.js (CHUNKS, STARTS, VOICE_END, DURATION) and before its scenes.js.
const CT = {};
CHUNKS.forEach((c, i) => { const a = STARTS[i], b = i + 1 < STARTS.length ? STARTS[i + 1] : VOICE_END; CT[c[0]] = [a, b]; });
// time reference: 'c8' -> start of chunk 8, 'c8+0.4' -> 0.4 s later, 'c8e' -> end of chunk 8, number -> itself
function T(ref) {
  if (typeof ref === 'number') return ref;
  const m = /^(c\d+)(e?)([+-][\d.]+)?$/.exec(ref);
  if (!m) return parseFloat(ref);
  return CT[m[1]][m[2] ? 1 : 0] + (m[3] ? parseFloat(m[3]) : 0);
}
