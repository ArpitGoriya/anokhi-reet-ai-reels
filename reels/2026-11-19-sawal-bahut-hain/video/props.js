// ===== Sawal bahut hain: reel-only drawings =====
const HB = HARESH, NH = NEHA;
const SHOP = { sign: 'HARESH RENTALS' };
// the five doubts over Hareshbhai's head in the counter shot: [text, x, y]
const QB = [['Kharcha?', 220, 480], ['Price?', 600, 455], ['Computer?', 240, 610], ['Customer?', 650, 575], ['Pasand na aaya?', 600, 705]];
const HEAD = [330, 740]; // top of Hareshbhai's head in the counter shot

// a tail vector from a bubble at (x, y) towards a head at (hx, hy), len px long
function tailTo(x, y, hx, hy, len = 120) { const dx = hx - x, dy = hy - y, d = Math.hypot(dx, dy) || 1; return [dx / d * len, dy / d * len]; }
// a bubble placed at (x, y) that pops in at `at`
function qAt(id, text, x, y, at, o = {}) { return `<g transform="translate(${x},${y})"><g data-t="${at}">${qBubbleSVG(id, text, o)}</g></g>`; }

// a small phone held in a hand: app header + one outfit (`${id}-o`, can be hidden until it's found)
function miniAppPhone(id, look = { c: C.lehenga, d: C.lehengaDark, dupatta: '#E8C25E' }, sc = 1) {
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="${C.cream}"/><rect x="-42" y="-80" width="84" height="30" rx="10" fill="url(#mar)"/><circle cx="-26" cy="-65" r="8" fill="${C.cream}"/>` +
    `<g id="${id}-o"><g transform="translate(0,6)">${lehengaHangerSVG('', look, .2)}</g></g></g></g>`;
}

// The counter shot: Hareshbhai behind his counter (arms crossed), Neha beside him with the app, doubts over his head.
// show = which of QB to draw, at = when each pops in (default: already there)
function counterShot(sid, show = [0, 1, 2, 3, 4], at = {}) {
  return shopBG(sid, SHOP) + `<rect width="${W}" height="${H}" fill="${C.cream}" opacity=".35"/>` + bust(`${sid}h`, HB, 330, FLOOR + 80, 1.05) + bust(`${sid}n`, NH, 840, FLOOR + 95, .95) +
    miniAppPhone(`${sid}ph`, undefined, 1.05) + counterSVG() +
    show.map(i => { const [tx, x, y] = QB[i]; return qAt(`${sid}q${i}`, tx, x, y, at[i] || '-1', { fs: 44, tail: tailTo(x, y, HEAD[0], HEAD[1]) }); }).join('');
}
// every frame: h / n = life() options for Hareshbhai / Neha, pops = {i: pop time}
function counterUpd(sid, t, show, h = {}, n = {}, pops = {}) {
  life(`${sid}h`, t, Object.assign({ pivot: 0, mouth: 'flat', brows: 'worry', L: ARMS_X, R: ARMS_X, seed: 1 }, h));
  const N = life(`${sid}n`, t, Object.assign({ pivot: 0, mouth: 'smile', look: [-.6, 0], L: [62, -34], hL: 'fist', seed: 4 }, n));
  const p = toScene(`${sid}n`, N.hl); tf($(`${sid}ph`), p[0] - 10, p[1] - 70, 1, -8 + noise(t, 3) * 2);
  show.forEach(i => bubblePop(`${sid}q${i}`, t, pops[i] === undefined ? null : T(pops[i])));
}
// a small counter only in the middle of the frame (from Season ka sapna)
function counterMid(x0 = 300, x1 = 780, y = 1010) {
  return `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${FLOOR + 60 - y}" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${x0 - 16}" y="${y - 16}" width="${x1 - x0 + 32}" height="28" rx="6" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M${x0},${y + 90} H${x1}" stroke="#86593A" stroke-width="5" opacity=".6"/>`;
}
