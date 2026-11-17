// ===== Cast sheet: every reusable character from animation/cast/cast.js, waist-up, with their names =====
const SHEET = [
  ['cs1', 'Hetal ben', 'home', HETAL.home], ['cs2', 'Hetal ben', 'lehenga', HETAL.lehenga], ['cs3', 'Mausi', '', MAUSI],
  ['cs4', 'Bride', '', BRIDE], ['cs5', 'Uncle', 'guest', GUEST_M], ['cs6', 'Auntie 1', 'guest', GUEST_W1],
  ['cs7', 'Auntie 2', 'guest', GUEST_W2], ['cs8', 'Researcher', 'lab coat', LAB_M], ['cs9', 'Researcher', 'lab coat', LAB_W], ['cs10', 'Kavita', 'shop', KAVITA.shop], ['cs11', 'Pankaj bhai', '', PANKAJ], ['cs12', 'Customer', '', CUSTOMER_W],
];
const XS = [150, 410, 670, 930], YS = [660, 1120, 1580];
addScene(0, 99, {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('cs-r', 540, 960, .07, C.goldTan) +
    SHEET.map(([id, , , look], i) => `<circle cx="${XS[i % 4]}" cy="${YS[(i / 4) | 0] - 150}" r="118" fill="${C.wallLow}"/>` + bust(id, look, XS[i % 4], YS[(i / 4) | 0], .5)).join(''),
  html: `<div class="title" style="top:150px;font-size:72px">Anokhi Reet <span class="g">cast</span></div>` +
    SHEET.map(([, name, note], i) => `<div class="pill" style="left:${XS[i % 4]}px;top:${YS[(i / 4) | 0] + 46}px;font-size:28px;padding:8px 20px">${name}${note ? `<br><span style="font-weight:500;color:#7A5C2E;font-size:22px">${note}</span>` : ''}</div>`).join(''),
  noWm: true, noCap: true, cam: [1, 1], noSettle: true,
  upd(t) { SHEET.forEach(([id], i) => life(id, 0.6, { pivot: 0, seed: i, mouth: 'smile', brows: 'norm', sway: 0, L: [9, -14], R: [9, -14] })); }
});
