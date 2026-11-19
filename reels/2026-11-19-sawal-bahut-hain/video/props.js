// ===== Sawal bahut hain: reel-only drawings =====
const HB = HARESH, NH = NEHA;
const SHOP = { sign: 'HARESH RENTALS' };
// the five doubts over Hareshbhai's head in the counter shot: [text, x, y]
const QB = [['Kharcha?', 220, 480], ['Price?', 600, 455], ['Computer?', 240, 610], ['Customer?', 650, 575], ['Pasand nahi aaya?', 600, 705]];
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
function counterShot(sid, show = [0, 1, 2, 3, 4], at = {}, o = {}) {
  return shopBG(sid, o.noSign ? { noSign: true } : SHOP) + `<rect width="${W}" height="${H}" fill="${C.cream}" opacity=".35"/>` + bust(`${sid}h`, HB, 330, FLOOR + 80, 1.05) + bust(`${sid}n`, NH, 840, FLOOR + 95, .95) +
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

// askChatScreen(ats): WhatsApp-style chat (generic, no logo): Hareshbhai asks "Kharcha kitna hoga?", Neha replies.
function askChatScreen(ats = ['-1', '-1']) {
  let s = `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#EFE7DA"/>` +
    `<path d="M-264,-442 Q-264,-484 -222,-484 L222,-484 Q264,-484 264,-442 L264,-360 L-264,-360 Z" fill="${C.tealDark}"/>` +
    `<circle cx="-196" cy="-410" r="32" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/><circle cx="-196" cy="-410" r="17" fill="none" stroke="${C.red}" stroke-width="4"/>` +
    `<text x="-148" y="-404" font-family="Inter" font-weight="800" font-size="34" fill="#fff">Anokhi Reet</text><text x="-148" y="-374" font-family="Inter" font-weight="600" font-size="22" fill="#CFE6E0">online</text>`;
  s += `<g transform="translate(70,-200)"><g data-t="${ats[0]}"><rect x="-180" y="-70" width="360" height="140" rx="22" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/>` +
    `<text x="-156" y="-14" font-family="Inter" font-weight="800" font-size="34" fill="#141110">Kharcha kitna</text><text x="-156" y="32" font-family="Inter" font-weight="800" font-size="34" fill="#141110">hoga? 🤔</text>` +
    `<path d="M120,48 l7,7 13,-13 M131,48 l7,7 13,-13" stroke="#3E9BD6" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>`;
  s += `<g transform="translate(-50,40)"><g data-t="${ats[1]}"><rect x="-200" y="-74" width="400" height="148" rx="22" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
    `<text x="-176" y="-18" font-family="Inter" font-weight="800" font-size="32" fill="#141110">Namaste! 🙏</text><text x="-176" y="26" font-family="Inter" font-weight="600" font-size="28" fill="#141110">Main samjha deti hoon</text>` +
    `<text x="-176" y="58" font-family="Inter" font-weight="700" font-size="22" fill="${C.emerald}">Neha · Anokhi Reet team</text></g></g>`;
  return s + `<rect x="-244" y="400" width="400" height="64" rx="32" fill="#fff"/><circle cx="210" cy="432" r="34" fill="${C.tealDark}"/><path d="M196,416 L230,432 L196,448 L202,432 Z" fill="#fff"/>`;
}
