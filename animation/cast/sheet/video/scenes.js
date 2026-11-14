// ===== Cast sheet: every reusable character from animation/cast/cast.js, waist-up, with their names =====
const SHEET = [
  ['cs1', 'Hetal ben', 'home', HETAL.home], ['cs2', 'Hetal ben', 'lehenga', HETAL.lehenga], ['cs3', 'Mausi', '', MAUSI],
  ['cs4', 'Bride', '', BRIDE], ['cs5', 'Uncle', 'guest', GUEST_M], ['cs6', 'Auntie 1', 'guest', GUEST_W1],
  ['cs7', 'Auntie 2', 'guest', GUEST_W2], ['cs8', 'Researcher', 'lab coat', LAB_M], ['cs9', 'Researcher', 'lab coat', LAB_W],
];
const XS = [190, 540, 890], YS = [760, 1240, 1720];
addScene(0, 99, {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('cs-r', 540, 960, .07, C.goldTan) +
    SHEET.map(([id, , , look], i) => `<circle cx="${XS[i % 3]}" cy="${YS[(i / 3) | 0] - 190}" r="150" fill="${C.wallLow}"/>` + bust(id, look, XS[i % 3], YS[(i / 3) | 0], .62)).join(''),
  html: `<div class="title" style="top:150px;font-size:72px">Anokhi Reet <span class="g">cast</span></div>` +
    SHEET.map(([, name, note], i) => `<div class="pill" style="left:${XS[i % 3]}px;top:${YS[(i / 3) | 0] + 46}px;font-size:34px">${name}${note ? ` <span style="font-weight:500;color:#7A5C2E;font-size:26px">${note}</span>` : ''}</div>`).join(''),
  noWm: true, noCap: true, cam: [1, 1], noSettle: true,
  upd(t) { SHEET.forEach(([id], i) => life(id, 0.6, { pivot: 0, seed: i, mouth: 'smile', brows: 'norm', sway: 0, L: [9, -14], R: [9, -14] })); }
});
