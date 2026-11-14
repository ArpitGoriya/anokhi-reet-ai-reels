// ===== Shared sets, placement and small helpers (from the Hetal reel, 2026-11-13) =====
// Rooms are full-frame SVG strings: homeBG, weddingBG, theatreBG (+ floorSVG, rosettes).
// Placement: stand() = full figure with shadow, bust() = waist-up; then life() every frame.
const SEAL = () => { const i = document.querySelector('#wm img'); return i ? i.src : ''; };
function floorSVG(col = '#A47648') {
  let s = `<rect x="0" y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="${col}"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M0,${FLOOR + 70 + i * 110} H${W}" stroke="#946A40" stroke-width="4" opacity=".55"/>`;
  return s + `<rect x="-10" y="${FLOOR - 16}" width="${W + 20}" height="22" fill="${C.woodDark}" stroke="${OL}" stroke-width="4"/>`;
}
function clockSVG(id, x, y, r = 58) {
  let s = `<g transform="translate(${x},${y})"><circle r="${r}" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>`;
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<path d="M${Math.sin(a) * r * .78},${-Math.cos(a) * r * .78} L${Math.sin(a) * r * .9},${-Math.cos(a) * r * .9}" stroke="${OL}" stroke-width="4"/>`; }
  return s + `<path id="${id}-m" d="M0,0 V${-r * .7}" stroke="${OL}" stroke-width="6" stroke-linecap="round"/><path id="${id}-h" d="M0,0 V${-r * .45}" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><circle r="7" fill="${C.red}"/></g>`;
}
function clockTick(id, t, base = 0) { tf($(id + '-m'), 0, 0, 1, base * 6 + t * 24); tf($(id + '-h'), 0, 0, 1, base * .5 + t * 2); }
function homeBG(id, o = {}) {
  let s = wallSVG(o.night ? '#E5CDAE' : C.wall, o.night ? '#D7BB98' : C.wallLow);
  if (o.night) s += `<circle cx="${o.lampX || 880}" cy="560" r="420" fill="url(#glow)" opacity=".9"/>`;
  if (!o.noWindow) s += windowSVG(o.winX || 80, 420, 210, 250, { curtain: '#A3262A', night: o.night });
  if (!o.noShelf) s += shelfSVG(o.shelfX || 770, 600);
  if (!o.noClock) s += clockSVG(id + '-clk', o.clockX || 885, 455);
  if (o.lamp) s += lampSVG(o.lampX || 880, 170);
  s += floorSVG(o.night ? '#8E6640' : '#A47648');
  if (!o.noPlant) s += plantSVG(o.plantX || 990, FLOOR + 40, 1);
  return s;
}
function weddingBG(o = {}) {
  const wall = o.wall || '#F7DCC8';
  let s = `<rect x="0" y="0" width="${W}" height="${H}" fill="${wall}"/>`;
  s += `<rect x="0" y="${FLOOR - 300}" width="${W}" height="300" fill="${o.low || '#F2CDB5'}"/>`;
  // fabric drapes
  s += `<path d="M0,0 H${W} V150 Q${W * .75},330 ${W / 2},170 Q${W * .25},330 0,150 Z" fill="${o.drape || '#E59AA5'}" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<path d="M0,0 H${W} V90 Q${W * .75},250 ${W / 2},110 Q${W * .25},250 0,90 Z" fill="#FFF2DF" stroke="${OL}" stroke-width="${OW}"/>`;
  s += torSVG(40);
  s += fairyLightsSVG(o.lightsY || 470);
  for (const x of [56, W - 56]) {
    s += `<rect x="${x - 14}" y="${FLOOR - 470}" width="28" height="470" fill="${C.goldTan}" stroke="${OL}" stroke-width="4"/>`;
    for (let k = 0; k < 9; k++) s += `<circle cx="${x + (k % 2 ? 14 : -14)}" cy="${FLOOR - 450 + k * 52}" r="22" fill="${k % 2 ? C.marigold2 : C.marigold}" stroke="${OL}" stroke-width="3"/>`;
  }
  s += `<rect x="0" y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="${o.carpet || '#A1272C'}"/>`;
  s += `<path d="M0,${FLOOR + 26} H${W} M0,${FLOOR + 44} H${W}" stroke="${C.gold}" stroke-width="6"/>`;
  s += `<rect x="-10" y="${FLOOR - 14}" width="${W + 20}" height="18" fill="#7E1A1E" stroke="${OL}" stroke-width="4"/>`;
  return s;
}
function theatreBG() {
  let s = `<rect x="0" y="0" width="${W}" height="${H}" fill="#3B0000"/>`;
  s += `<rect x="170" y="280" width="740" height="${FLOOR - 280}" fill="#5A0B0E"/>`;
  s += `<path d="M540,240 L250,${FLOOR} L830,${FLOOR} Z" fill="#FFF2DF" opacity=".09"/>`;
  for (const sd of [-1, 1]) {
    const x0 = sd < 0 ? 0 : W, x1 = sd < 0 ? 270 : W - 270;
    s += `<path d="M${x0},200 L${x1},200 Q${x1 - sd * 40},${FLOOR * .6} ${x1 - sd * 90},${FLOOR} L${x0},${FLOOR} Z" fill="#A4161A" stroke="${OL}" stroke-width="${OW}"/>`;
    for (let k = 1; k < 5; k++) { const xx = lerp(x0, x1, k / 5); s += `<path d="M${xx},210 Q${xx - sd * 20},${FLOOR * .6} ${xx - sd * 50 * k / 5},${FLOOR - 4}" stroke="#7E0F13" stroke-width="7" fill="none"/>`; }
    s += `<path d="M${x1 - sd * 10},${FLOOR * .62} q${-sd * 40},20 ${-sd * 90},6" stroke="${C.gold}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  }
  s += `<rect x="-10" y="150" width="${W + 20}" height="90" fill="#A4161A" stroke="${OL}" stroke-width="${OW}"/>`;
  let sc = `M-10,240`; for (let x = 0; x <= W; x += 90) sc += ` Q${x + 45},300 ${x + 90},240`;
  s += `<path d="${sc} L${W + 10},150 L-10,150 Z" fill="#A4161A" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<path d="M-10,236 H${W + 10}" stroke="${C.gold}" stroke-width="10" stroke-dasharray="4 10"/>`;
  s += `<rect x="0" y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#6B4A2A"/><rect x="-10" y="${FLOOR - 16}" width="${W + 20}" height="22" fill="${C.goldTan}" stroke="${OL}" stroke-width="4"/>`;
  return s;
}
function rosettes(id, x, y, op_ = .14, col = C.gold) {
  let s = `<g id="${id}" transform="translate(${x},${y})" opacity="${op_}">`;
  s += `<circle r="430" fill="none" stroke="${col}" stroke-width="6" stroke-dasharray="2 18" stroke-linecap="round"/>`;
  s += `<circle r="360" fill="none" stroke="${col}" stroke-width="4"/>`;
  for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12; s += `<circle cx="${Math.cos(a) * 300}" cy="${Math.sin(a) * 300}" r="26" fill="none" stroke="${col}" stroke-width="4"/>`; }
  s += `<circle r="220" fill="none" stroke="${col}" stroke-width="4" stroke-dasharray="30 14"/>`;
  return s + `</g>`;
}
// wrappers that place a character; remember placement for hand maths
const PL = {};
function stand(id, o, x, y, sc = .95) { PL[id] = { x, y, sc }; return `<g transform="translate(${x},${y}) scale(${sc})"><ellipse cx="0" cy="372" rx="215" ry="22" fill="#3B2418" opacity=".16"/>${person(id, o)}</g>`; }
function bust(id, o, x, y, sc = 1.1) { PL[id] = { x, y, sc }; return `<g transform="translate(${x},${y}) scale(${sc})">${person(id, NOSKIRT(o))}</g>`; }
function toScene(id, p) { const q = PL[id]; return [q.x + p[0] * q.sc, q.y + p[1] * q.sc]; }
// life: face + arms + gentle sway/bounce for a character
function life(id, t, o = {}) {
  if (o.speak) o = Object.assign({}, o, { mouth: talkMouth(t, true) }); // this character says the current voice line
  face(id, t, o);
  const pv = o.pivot === undefined ? 360 : o.pivot;
  const sway = (o.sway === undefined ? 1.2 : o.sway) * noise(t * .7, (o.seed || 0) + 5);
  tf($(id), 0, o.y || 0, 1, sway + (o.lean || 0), 0, pv);
  const L = o.L || [9, -14], R = o.R || [9, -14];
  const hl = arm(id, 'L', L[0], L[1], o.hL || 'fist');
  const hr = arm(id, 'R', R[0], R[1], o.hR || 'fist');
  return { hl, hr };
}
const hop = (t, t0, h = 22, d = .42) => { const k = (t - t0) / d; return k > 0 && k < 1 ? -Math.sin(k * Math.PI) * h : 0; };
const WAVE = (t, t0, amp = 1) => [128 + wave(t, .5) * 3, 26 + wave(t - t0, 1.6) * 22 * amp];
const CLASP = [12, -96];
function priceTag(id, text, x, y, at, o = {}) { return `<g transform="translate(${x},${y})"><g data-t="${at}" data-swing="${o.swing || 10}">${priceTagSVG(id, text, 0, 0, o)}</g></g>`; }
function checkBadge(x, y, at, r = 46) { return `<g transform="translate(${x},${y})"><g data-t="${at}"><circle r="${r}" fill="${C.emerald}" stroke="${OL}" stroke-width="${OW}"/><path d="M${-r * .45},0 L${-r * .1},${r * .35} L${r * .5},${-r * .35}" fill="none" stroke="#fff" stroke-width="${r * .22}" stroke-linecap="round" stroke-linejoin="round"/></g></g>`; }
function pillH(x, y, at, html, cls = '', out = '') { return `<div class="pill ${cls}" style="left:${x}px;top:${y}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`; }
function stepPill(n, text, at) { return pillH(540, 352, at, `<span class="step">STEP ${n}</span>${text}`); }
// small "photo" thumbnail with tiny people (for the gallery)
function miniPhoto(x, y, w, h, seed, hetal) {
  const bgs = ['#F7DCC8', '#F3E3C0', '#F2CDB5', '#EED9E0', '#FBE7D3'];
  const cols = ['#E0A33A', '#7A4FA0', '#E07B39', '#2F7F7A', '#C0262D', '#5B8A3A', '#D9577A'];
  let s = `<g transform="translate(${x},${y})"><rect width="${w}" height="${h}" rx="10" fill="${bgs[seed % 5]}"/>`;
  for (let i = 0; i < 6; i++) s += `<circle cx="${8 + i * w / 5.5}" cy="8" r="6" fill="${i % 2 ? C.marigold : C.marigold2}"/>`;
  const n = 2 + seed % 3;
  for (let i = 0; i < n; i++) {
    const cx = w * (i + 1) / (n + 1), col = (hetal && i === n - 1) ? C.lehenga : cols[(seed + i * 3) % 7];
    s += `<path d="M${cx - 18},${h} Q${cx - 18},${h * .62} ${cx},${h * .6} Q${cx + 18},${h * .62} ${cx + 18},${h} Z" fill="${col}"/>`;
    s += `<circle cx="${cx}" cy="${h * .46}" r="12" fill="${['#C98B62', '#B97A55', '#D19A72'][(seed + i) % 3]}"/><path d="M${cx - 12},${h * .44} Q${cx},${h * .3} ${cx + 12},${h * .44}" fill="#2A1A14"/>`;
  }
  return s + `</g>`;
}
function calendarSVG(id, top, big) {
  return `<g id="${id}"><rect x="-130" y="-140" width="260" height="280" rx="18" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-130,-122 Q-130,-140 -112,-140 L112,-140 Q130,-140 130,-122 L130,-70 L-130,-70 Z" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<circle cx="-70" cy="-148" r="10" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="70" cy="-148" r="10" fill="#fff" stroke="${OL}" stroke-width="4"/>` +
    `<text x="0" y="-92" text-anchor="middle" font-family="Inter" font-weight="800" font-size="32" fill="#FFF2DF" letter-spacing="3">${top}</text>` +
    `<text x="0" y="62" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${big.length > 2 ? 92 : 150}" fill="${C.text}">${big}</text></g>`;
}
function heartPath(x, y, s = 1, col = '#D93A4A') { return `<path transform="translate(${x},${y}) scale(${s})" d="M0,10 C-26,-8 -18,-30 0,-18 C18,-30 26,-8 0,10 Z" fill="${col}" stroke="${OL}" stroke-width="3"/>`; }
function bagSVG() {
  return `<path d="M-60,-120 Q-60,-190 0,-190 Q60,-190 60,-120" fill="none" stroke="${OL}" stroke-width="14"/><path d="M-60,-120 Q-60,-190 0,-190 Q60,-190 60,-120" fill="none" stroke="${C.goldTan}" stroke-width="7"/>` +
    `<path d="M-130,-130 L130,-130 L150,150 L-150,150 Z" fill="${C.cream}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M-136,-70 L136,-70" stroke="${C.red}" stroke-width="12"/><circle cx="0" cy="40" r="46" fill="none" stroke="${C.red}" stroke-width="6"/><circle cx="0" cy="40" r="28" fill="none" stroke="${C.red}" stroke-width="4" stroke-dasharray="3 6"/>`;
}
