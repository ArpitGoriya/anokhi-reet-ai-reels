// ===== The Anokhi Reet cast: reusable characters and outfits =====
// Each entry is a look for person(id, look): stand(id, LOOK, x, y) / bust(id, LOOK, x, y), then life(id, t, {...}).
// Reuse a character by name; give them a new outfit with dress(LOOK, {...}). New characters go here after their
// first reel, with a line in animation/cast/CAST.md (who they are, where they appeared).
// Options a look understands: top, topD, sleeve, pallu, border, embroidery, necklace, gajra, sindoor, bindi,
// glasses, earrings, bangles, mustache, male, wide, apron, skin, skin2, hair, hairStyle (bun | greybun | long |
// braid | pony | short), skirt ({c, d, b, w, h} full lehenga skirt for standing figures, or null).

// Hetal ben (Surat, 40s): the lead of the first story reel. Warm, a little proud, learns fast.
const HETAL = {
  home: { top: C.teal, topD: C.tealDark, pallu: '#3A9089', border: C.gold, sindoor: true, skirt: { c: C.teal, d: C.tealDark, b: C.gold, w: 205 } },
  lehenga: { top: C.lehenga, topD: C.lehengaDark, pallu: '#E8C25E', border: '#B8862F', embroidery: true, necklace: true, gajra: true, sindoor: true, skirt: {} },
  pink: { top: C.pink, topD: C.pinkDark, pallu: '#F4B9C8', border: C.gold, necklace: true, gajra: true, sindoor: true, skirt: { c: C.pink, d: C.pinkDark, b: C.gold } },
  emerald: { top: C.emerald, topD: C.emeraldDark, pallu: '#A6D3B0', border: C.gold, necklace: true, sindoor: true, skirt: { c: C.emerald, d: C.emeraldDark, b: C.gold } },
};
// Mausi (60s): grey bun, round glasses, green saree. Notices everything, says it out loud.
const MAUSI = { hairStyle: 'greybun', glasses: true, top: '#5B8A3A', topD: '#476F2D', pallu: '#7FAE5A', border: C.gold, skin: '#B97A55', skin2: '#A66A47', wide: true, skirt: { c: '#5B8A3A', d: '#476F2D', b: C.gold, w: 215 } };
// A bride (20s), red lehenga, peach dupatta.
const BRIDE = { top: '#C0262D', topD: '#97151B', pallu: '#F2A08F', border: C.gold, necklace: true, gajra: true, skin: '#D19A72', skirt: { c: '#C0262D', d: '#97151B', b: C.gold } };
// Wedding guests / crowd extras: an uncle with a moustache, two aunties.
const GUEST_M = { male: true, top: '#E0A33A', topD: '#C08728', skin: '#B97A55', skin2: '#A66A47', mustache: true };
const GUEST_W1 = { top: '#7A4FA0', topD: '#5D3A7E', pallu: '#B28BD0', border: C.gold, hairStyle: 'long', skin: '#D19A72' };
const GUEST_W2 = { top: '#E07B39', topD: '#B95F25', pallu: '#F4B183', border: C.gold, skin: '#C08460' };
// Researchers in lab coats (for "a study found..." beats).
const LAB_M = { male: true, glasses: true, top: '#FFFFFF', topD: '#E8E2D8', skin: '#E2B08A', skin2: '#CF9A74', hair: '#6B4A2A' };
const LAB_W = { top: '#FFFFFF', topD: '#E8E2D8', skin: '#EBC09A', skin2: '#D9A982', hair: '#8A5A32', hairStyle: 'short', bindi: false, glasses: true, earrings: false, bangles: false };

// helpers
const NOSKIRT = o => Object.assign({}, o, { skirt: null });                 // waist-up version of a look
const dress = (look, change) => Object.assign({}, look, change);             // same person, new outfit or detail
