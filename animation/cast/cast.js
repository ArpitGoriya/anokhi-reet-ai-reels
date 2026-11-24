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

// Pankaj bhai (40s): rental shop owner, hardworking and hopeful. Indigo kurta, moustache. (Season ka sapna, 2026-11-17)
const PANKAJ = { male: true, mustache: true, wide: true, top: '#3D5A80', topD: '#2E4663', skin: '#B07150', skin2: '#9A6143', embroidery: true };
// A young customer (20s), ponytail, pink kurti; holds her phone up to show the outfit she wants.
const CUSTOMER_W = { hairStyle: 'pony', top: '#D9577A', topD: '#B33F60', skin: '#C98B62', earrings: true, bangles: false };

// Aarti (20s): young working woman, Ahmedabad. Office kurti, home tee, and the yellow chaniya choli at the sangeet.
const AARTI = {
  office: { hairStyle: 'long', top: '#4F6D9A', topD: '#3B5478', skin: '#C98B62', skin2: '#B9784F', bangles: false, skirt: { c: '#3B5478', d: '#2E4663', b: C.goldTan, w: 190 } },
  home: { hairStyle: 'pony', top: '#9CC5B0', topD: '#7FA893', skin: '#C98B62', skin2: '#B9784F', bangles: false, earrings: false },
  sangeet: { hairStyle: 'long', top: C.marigold2, topD: '#D9A52E', pallu: '#E26A8A', border: C.red, embroidery: true, necklace: true, skin: '#C98B62', skin2: '#B9784F', skirt: { c: C.marigold2, d: '#D9A52E', b: C.red } },
};
// Dimple (20s): Aarti's best friend; calm, always has a plan. Short hair, round glasses, emerald top.
const DIMPLE = {
  home: { hairStyle: 'short', glasses: true, top: C.emerald, topD: C.emeraldDark, skin: '#D19A72', skin2: '#BD8660', bindi: false, bangles: false, skirt: { c: '#2B3A4F', d: '#1E2A3A', b: C.goldTan, w: 170 } },
  sangeet: { hairStyle: 'short', glasses: true, top: C.pink, topD: C.pinkDark, pallu: '#F4B9C8', border: C.gold, necklace: true, skin: '#D19A72', skin2: '#BD8660', skirt: { c: C.pink, d: C.pinkDark, b: C.gold } },
};
// Hetalben (50s): friendly rental shop owner near Aarti's office, Ahmedabad. Not the cast's Hetal ben from Surat.
const HETALBEN = { hairStyle: 'bun', top: '#7A1F3D', topD: '#5C1730', pallu: '#E8C25E', border: C.gold, sindoor: true, necklace: true, wide: true, skin: '#B97A55', skin2: '#A66A47', skirt: { c: '#7A1F3D', d: '#5C1730', b: C.gold, w: 215 } };

// helpers
const NOSKIRT = o => Object.assign({}, o, { skirt: null, pants: null });    // waist-up version of a look
const dress = (look, change) => Object.assign({}, look, change);             // same person, new outfit or detail

// Kavita (30s): owns a lehenga rental shop. Busy, soft-hearted, said yes to every bargain until she learned. (Kavita reel)
const KAVITA = {
  shop: { top: C.marigold, topD: '#C9821E', pallu: C.red, border: C.gold, hairStyle: 'braid', skin: '#A86B48', skin2: '#93593A', necklace: true, skirt: { c: C.red, d: C.redDark, b: C.gold, w: 210 } },
  night: { top: '#8C6BA8', topD: '#6E5089', pallu: '#B8A0CC', border: C.goldTan, hairStyle: 'braid', skin: '#A86B48', skin2: '#93593A', glasses: true, skirt: { c: '#6E5089', d: '#54396B', b: C.goldTan, w: 210 } },
  mall: { top: C.teal, topD: C.tealDark, pallu: '#F2C14E', border: C.gold, hairStyle: 'braid', skin: '#A86B48', skin2: '#93593A', skirt: { c: C.tealDark, d: '#174A47', b: C.gold, w: 210 } },
};

// Meena (30s-40s): runs a lehenga rental shop in Ahmedabad. Hardworking, tired of WhatsApp photos; learns to put her stock online. (Meena ki dukaan)
const MEENA = {
  shop: { top: C.emerald, topD: C.emeraldDark, pallu: C.pink, border: C.gold, hairStyle: 'bun', skin: '#C08460', skin2: '#A86E4E', sindoor: true, necklace: true, skirt: { c: C.pink, d: C.pinkDark, b: C.gold, w: 210 } },
  night: { top: '#E0A33A', topD: '#C08728', pallu: '#F2C14E', border: C.red, hairStyle: 'bun', skin: '#C08460', skin2: '#A86E4E', sindoor: true, skirt: { c: '#C08728', d: '#9A6A1E', b: C.red, w: 210 } },
};
// Meena's husband (40s): calm, asks the simple question that matters.
const PATI = { male: true, top: '#3D6B8C', topD: '#2E536D', skin: '#A86B48', skin2: '#93593A', hair: '#2A1A14' };

// Papa (50s-60s): has run his rental shop since 1998. Proud, warm, trusts face-to-face. Beti (20s): his daughter,
// puts the shop online. (Papa aur beti)
const PAPA = {
  shop: { male: true, mustache: true, hair: '#8F8A84', top: '#E8D3A5', topD: '#C9AE6A', skin: '#A86B48', skin2: '#93593A', embroidery: true },
  young: { male: true, mustache: true, hair: C.hair, top: '#E8D3A5', topD: '#C9AE6A', skin: '#A86B48', skin2: '#93593A', embroidery: true },
  night: { male: true, mustache: true, glasses: true, hair: '#8F8A84', top: '#5B8A3A', topD: '#476F2D', skin: '#A86B48', skin2: '#93593A' },
};
const BETI = { hairStyle: 'pony', top: C.teal, topD: C.tealDark, pallu: '#F2C14E', border: C.gold, skin: '#B9784F', skin2: '#A0663F', bangles: false, skirt: { c: C.tealDark, d: '#174A47', b: C.gold, w: 200 } };

// Anokhi Didi (30s): on-screen presenter who talks to camera ("Toh guys…"). Brand maroon kurta, gold dupatta.
// (Lehenga 2X, 2026-11-18; owner to confirm the name and look before she becomes the channel's face.)
const DIDI = { top: C.red, topD: C.redDark, pallu: C.gold, border: C.goldTan, hairStyle: 'long', skin: '#C98B62', skin2: '#B9784F', necklace: true, embroidery: true, skirt: { c: C.redDark, d: '#2b0001', b: C.gold, w: 210 } };

// Hemaben (40s): rental shop owner, confident and practical; works out the numbers on a chalkboard. Glasses,
// marigold kurta with maroon dupatta. (Ek lehenge ka hisaab, 2026-11-18)
const HEMABEN = { hairStyle: 'bun', glasses: true, top: C.marigold, topD: '#C9821E', pallu: C.red, border: C.gold, sindoor: true, necklace: true, skin: '#B07150', skin2: '#9A6143', skirt: { c: C.red, d: C.redDark, b: C.gold, w: 205 } };
// Hareshbhai (50s): careful, slightly doubtful rental shop owner; asks every question before he says yes. Glasses,
// moustache, rust kurta. Neha (20s): friendly Anokhi Reet team member who answers shop owners' questions. Ponytail,
// cream kurta, maroon dupatta. (Sawal bahut hain, 2026-11-19)
const HARESH = { male: true, mustache: true, glasses: true, wide: true, hair: '#4A3C34', top: '#B5532E', topD: '#8E3F22', skin: '#A8704C', skin2: '#93603F', embroidery: true };
const NEHA = { hairStyle: 'pony', top: '#F3E3C0', topD: '#E0C99A', pallu: C.red, border: C.gold, skin: '#C98B62', skin2: '#B9784F', bindi: false, bangles: false, skirt: { c: C.redDark, d: '#2b0001', b: C.gold, w: 195 } };
// Nisha (30s): a homemaker in Surat with 12 lehengas in her almirah; learns to rent them out. Blue kurta, braid. (Nisha's almirah)
const NISHA = { top: '#4F86C6', topD: '#3A6AA3', pallu: '#F2C14E', border: C.gold, hairStyle: 'braid', skin: '#D19A72', skin2: '#BD8460', sindoor: true, skirt: { c: '#3A6AA3', d: '#2C527F', b: C.gold, w: 205 } };

// Komal (20s): a young woman shopping for a reception outfit, shown as two versions of herself: Purani Komal goes
// shop to shop (marigold kurta), Smart Komal looks on Anokhi Reet first (pink kurta). (Dukaan-dukaan ki bhaag-daud, 2026-11-19)
const KOMAL = {
  purani: { hairStyle: 'long', top: C.marigold2, topD: '#D9A52E', pallu: '#E26A8A', border: C.red, skin: '#C98B62', skin2: '#B9784F', skirt: { c: '#D9A52E', d: '#B8862F', b: C.red, w: 190 } },
  smart: { hairStyle: 'long', top: C.pink, topD: C.pinkDark, pallu: '#F4B9C8', border: C.gold, necklace: true, skin: '#C98B62', skin2: '#B9784F', skirt: { c: C.pinkDark, d: '#8E2E4A', b: C.gold, w: 190 } },
};

// Rekhaben (40s): rental shop owner who priced everything cheap, then learned to set a fair rent. Green saree, yellow
// pallu. Jignaben (40s): her confident neighbour across the street. Deep blue saree, gold pallu. (Rent kam rakha, 2026-11-19)
const REKHA = { hairStyle: 'bun', top: '#5B8A3A', topD: '#476F2D', pallu: '#F2C14E', border: C.red, sindoor: true, skin: '#B9784F', skin2: '#A0663F', skirt: { c: '#476F2D', d: '#365622', b: C.gold, w: 205 } };
const JIGNA = { hairStyle: 'bun', top: '#3A4E8C', topD: '#2C3C6E', pallu: C.gold, border: C.red, sindoor: true, necklace: true, skin: '#C98B62', skin2: '#B9784F', skirt: { c: '#2C3C6E', d: '#1F2B52', b: C.gold, w: 205 } };

// Bhaveshbhai (40s-50s): calm, clever rental shop owner who keeps one premium lehenga that rarely rents, on purpose.
// Plum kurta with gold embroidery. Chintu (late teens): his quick, chatty helper. Orange tee. (Mehenga lehenga, 2026-11-19)
const BHAVESH = { male: true, mustache: true, wide: true, hair: '#3A2A22', top: '#7A3B6B', topD: '#5E2C52', skin: '#A8704C', skin2: '#93603F', embroidery: true };
const CHINTU = { male: true, hair: '#1E1410', top: '#E9772E', topD: '#C25E1E', skin: '#C98B62', skin2: '#B9784F' };

// Kavya (25-30): a young woman whose cupboard is full but has "nothing to wear"; finds a new look on Anokhi Reet. Lilac
// kurti. Mummy (50s): her mother, says the famous line. Orange saree, greying bun. (Cupboard full, 2026-11-20)
const KAVYA = { hairStyle: 'long', top: '#9B6FC4', topD: '#7D54A6', pallu: '#F2C14E', border: C.gold, skin: '#C98B62', skin2: '#B9784F', bindi: true, skirt: { c: '#7D54A6', d: '#5F3E82', b: C.gold, w: 190 } };
const MUMMY = { hairStyle: 'greybun', top: '#D96C3B', topD: '#B5532E', pallu: C.gold, border: C.red, sindoor: true, skin: '#B9784F', skin2: '#A0663F', skirt: { c: '#B5532E', d: '#8E3F22', b: C.gold, w: 205 } };

// Shital (late 20s): a young rental shop owner who learns that fewer, better options sell. Teal kurti, coral dupatta.
// Khushi (20s): a customer who can't decide when shown too much. Yellow top. (3 options, 2026-11-20)
const SHITAL = { hairStyle: 'braid', top: C.teal, topD: C.tealDark, pallu: '#F28C6B', border: C.gold, skin: '#C98B62', skin2: '#B9784F', earrings: true, skirt: { c: C.tealDark, d: '#174A47', b: C.gold, w: 195 } };
const KHUSHI = { hairStyle: 'pony', top: '#F2C14E', topD: '#D9A52E', pallu: '#E26A8A', border: C.red, skin: '#D19A72', skin2: '#BD8460', bangles: false, skirt: { c: '#D9A52E', d: '#B8862F', b: C.red, w: 190 } };
// Meenaben (40s): a busy rental shop owner who used to send 30 photos to every customer; now she sends one link.
// Plum kurta, marigold dupatta, bun with gajra. (Ek link, poori dukaan, 2026-11-23)
const MEENABEN = { hairStyle: 'bun', gajra: true, top: '#7A3E6E', topD: '#5E2D55', pallu: C.marigold, border: C.gold, skin: '#B97A55', skin2: '#A0663F', sindoor: true, earrings: true, necklace: true, skirt: { c: '#5E2D55', d: '#45203F', b: C.gold, w: 210 } };
// Maheshbhai (40s-50s): rental shop owner, not online; customers find him only by his board. Teal kurta, glasses.
// Kiranben (30s-40s): rental shop owner next door, listed on Anokhi Reet; calm, smiling. Marigold kurti, red dupatta.
// (Do dukaan, do kahaniyan, 2026-11-23)
const MAHESH = { male: true, mustache: true, glasses: true, hair: '#4A3A30', top: '#2F7A6B', topD: '#235C51', skin: '#A86B48', skin2: '#93593A', embroidery: true };
const KIRAN = { hairStyle: 'braid', top: C.marigold, topD: '#C9821E', pallu: '#C0262D', border: C.gold, skin: '#C08460', skin2: '#A86E4E', sindoor: true, earrings: true, skirt: { c: '#A3262A', d: '#7A1B2A', b: C.gold, w: 205 } };
// Ishita (20s): a wedding guest who rents a heavy maroon lehenga on a small budget; everyone guesses it cost a fortune.
// (Mausi is the cast's MAUSI.) (Asli price, 2026-11-24)
const ISHITA = {
  wedding: { hairStyle: 'long', top: '#7A1B2A', topD: '#5E1420', pallu: C.gold, border: C.gold, skin: '#C98B62', skin2: '#B9784F', earrings: true, necklace: true, bindi: true, skirt: { c: '#7A1B2A', d: '#5E1420', b: C.gold, w: 225 } },
  home: { hairStyle: 'pony', top: '#4F86C6', topD: '#3A6AA3', skin: '#C98B62', skin2: '#B9784F', earrings: true, bindi: true, skirt: { c: '#F2EADF', d: '#D8CDBE', b: '#D8CDBE', w: 170 } },
};
// Riddhi (30s): a mother whose son outgrows every wedding outfit after one wear; she lists them for rent from home.
// Krupa (30s): another mother in the same city, panicking before a wedding next week. (₹6,000 ki sherwani, 2026-11-24)
const RIDDHI = { hairStyle: 'bun', top: '#B83A6B', topD: '#922B53', pallu: '#F2B8C6', border: C.gold, sindoor: true, earrings: true, skin: '#C08460', skin2: '#A86E4E', skirt: { c: '#922B53', d: '#6E1F3E', b: C.gold, w: 200 } };
const KRUPA = { hairStyle: 'long', top: '#4E8F6A', topD: '#3A6E50', pallu: '#F2C14E', border: C.red, sindoor: true, earrings: true, skin: '#B07150', skin2: '#9A6143', skirt: { c: '#3A6E50', d: '#2B5440', b: C.gold, w: 195 } };
// The cast's first kids (use stand(…, .5) next to adults at .8): Vihaan (5), Riddhi's son, and Krupa's son (4).
// Kids are men's looks with no moustache: a sherwani = buttons + sleeveTo (long sleeves) + pants (hem = its length).
const VIHAAN = {
  tight: { male: true, top: '#F2E2C4', topD: '#D9C39A', buttons: true, sleeveTo: 0, skin: '#C98B62', skin2: '#B9784F', pants: { c: '#FFF8EC', hem: 55 } }, // the outgrown sherwani
  home: { male: true, top: '#F2A33A', topD: '#D9862A', skin: '#C98B62', skin2: '#B9784F', pants: { c: '#3E6FA8', d: '#2E5A8C', hem: 40 } },
};
const KRUPA_BETA = {
  vest: { male: true, top: '#FFFFFF', topD: '#E8E2D8', skin: '#B07150', skin2: '#9A6143', hair: '#3A2418', pants: { c: '#7FA893', d: '#5E8C74', hem: 30 } },
  sherwani: { male: true, top: '#F2E2C4', topD: '#D9C39A', buttons: true, sleeveTo: .95, skin: '#B07150', skin2: '#9A6143', hair: '#3A2418', pants: { c: '#FFF8EC', hem: 190 } }, // Riddhi's sherwani, his size
};
// Riya (20s): a friendly presenter from the Anokhi Reet team who talks straight to the camera (to shop owners).
// Brand-maroon kurti, gold dupatta, open long hair. (Rental dukaan hai? Customer kahan hain?, 2026-11-24)
const RIYA = { hairStyle: 'long', top: C.red, topD: C.redDark, pallu: C.gold, border: '#B8862F', earrings: true, skin: '#D19A72', skin2: '#BD8460', bangles: true, skirt: { c: C.redDark, d: C.maroonDeep, b: C.gold, w: 195 } };
