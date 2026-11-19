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
// ---------- rental shop (Season ka sapna, 2026-11-17) ----------
// sherwani on a hanger (long coat, buttons, stole)
function sherwaniHangerSVG(id, col = '#E8D3A5', colD = '#C9AE6A', sc = 1) {
  return `<g id="${id}"><g transform="scale(${sc})">` +
    `<path d="M0,-80 Q0,-100 14,-98 Q26,-94 20,-82" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M-80,-40 L0,-80 L80,-40" fill="none" stroke="${C.woodDark}" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M-76,-42 Q-40,-56 -22,-54 L0,-30 L22,-54 Q40,-56 76,-42 L86,260 Q0,276 -86,260 Z" fill="${col}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M0,-30 V266" stroke="${colD}" stroke-width="6"/>` + [0, 1, 2, 3, 4].map(i => `<circle cx="10" cy="${10 + i * 44}" r="6" fill="${C.gold}" stroke="${OL}" stroke-width="2.5"/>`).join('') +
    `<path d="M-22,-54 L0,-30 L22,-54" fill="none" stroke="${colD}" stroke-width="8"/>` +
    `<path d="M-60,-46 Q-90,80 -70,250 L-44,250 Q-60,90 -34,-50 Z" fill="${C.red}" stroke="${OL}" stroke-width="4" opacity=".95"/>` +
    `</g></g>`;
}
// clothes rack: a rail with hangers; items = [{k: 'l'|'s', c, d}], each hanger gets id `${id}-i${n}` (hide one to "rent it out")
function rackSVG(id, x, y, items, w = 420) {
  let s = `<g id="${id}" transform="translate(${x},${y})">`;
  s += `<path d="M${-w / 2},0 H${w / 2}" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M${-w / 2},0 H${w / 2}" stroke="${C.goldTan}" stroke-width="8" stroke-linecap="round"/>`;
  s += `<path d="M${-w / 2 + 10},0 V470 M${w / 2 - 10},0 V470" stroke="${OL}" stroke-width="10"/>`;
  const n = items.length, step = (w - 60) / Math.max(1, n - 1);
  items.forEach((it, i) => {
    const hx = -w / 2 + 30 + i * step;
    const g = it.k === 's' ? sherwaniHangerSVG(`${id}-in${i}`, it.c, it.d, .62) : lehengaHangerSVG(`${id}-in${i}`, { c: it.c, d: it.d, dupatta: it.p }, .55);
    s += `<g id="${id}-i${i}" transform="translate(${hx},${56})">${g}</g>`;
  });
  return s + `</g>`;
}
// a rental shop: warm wall, two full racks, a mirror, optional sign board (o.sign text), clock (o.clock)
const RACK_A = [{ k: 'l', c: '#C0262D', d: '#97151B', p: '#F2A08F' }, { k: 's', c: '#E8D3A5', d: '#C9AE6A' }, { k: 'l', c: C.emerald, d: C.emeraldDark, p: '#A6D3B0' }, { k: 'l', c: C.pink, d: C.pinkDark, p: '#F4B9C8' }];
const RACK_B = [{ k: 's', c: '#7A4FA0', d: '#5D3A7E' }, { k: 'l', c: C.marigold, d: '#C77F22', p: '#F7C548' }, { k: 's', c: C.teal, d: C.tealDark }, { k: 'l', c: C.lehenga, d: C.lehengaDark, p: '#E8C25E' }];
function rentalShopBG(id, o = {}) {
  let s = wallSVG('#F3DCC0', '#EACBA8');
  if (o.sign) s += `<g transform="translate(540,${o.signY || 300})"><rect x="-300" y="-46" width="600" height="92" rx="16" fill="url(#mar)" stroke="${OL}" stroke-width="${OW}"/><text x="0" y="16" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="${C.cream}" letter-spacing="3">${o.sign}</text></g>`;
  if (!o.noMirror) s += `<g transform="translate(540,${o.mirrorY || 700})"><ellipse rx="92" ry="140" fill="${C.goldTan}" stroke="${OL}" stroke-width="${OW}"/><ellipse rx="70" ry="116" fill="${C.sky}" stroke="${OL}" stroke-width="4"/><path d="M-30,-60 L10,-90 M-36,-20 L24,-70" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/></g>`;
  s += rackSVG(id + '-rA', o.rackAX || 240, o.rackY || 520, o.rackA || RACK_A);
  s += rackSVG(id + '-rB', o.rackBX || 840, o.rackY || 520, o.rackB || RACK_B);
  if (o.clock) s += clockSVG(id + '-clk', o.clockX || 540, o.clockY || 470, 58);
  s += floorSVG('#A47648');
  return s;
}
// ---------- dream look (soft glow, wavy edges, sparkles) + glass shatter (Season ka sapna) ----------
// dreamSVG(id) once in a scene's svg (last, on top); dreamUpd(id, t, k) every frame (k = 0..1 how dreamy).
function sparkleSVG(r = 22, col = '#FFFFFF') { return `<path d="M0,${-r} Q${r * .18},${-r * .18} ${r},0 Q${r * .18},${r * .18} 0,${r} Q${-r * .18},${r * .18} ${-r},0 Q${-r * .18},${-r * .18} 0,${-r} Z" fill="${col}" stroke="${OL}" stroke-width="3"/>`; }
function dreamSVG(id) {
  const sp = [[120, 420], [960, 520], [90, 980], [990, 1080], [180, 1560], [900, 1620], [540, 330], [300, 760], [780, 860]];
  return `<g id="${id}" pointer-events="none"><rect width="${W}" height="${H}" fill="${C.gold}" opacity=".07"/><circle cx="540" cy="900" r="900" fill="url(#glow)" opacity=".55"/>` +
    `<path id="${id}-e" fill="${C.cream}" fill-rule="evenodd" opacity=".9"/><path id="${id}-l" fill="none" stroke="${C.goldTan}" stroke-width="7"/>` +
    sp.map(([x, y], i) => `<g transform="translate(${x},${y})"><g class="twinkle" data-i="${i}"><g id="${id}-s${i}">${sparkleSVG(i % 3 ? 16 : 26, i % 2 ? C.gold : '#FFFFFF')}</g></g></g>`).join('') + `</g>`;
}
function dreamEdge(t, inset, amp) {
  const pts = [], x0 = inset, y0 = inset, x1 = W - inset, y1 = H - inset, per = 2 * ((x1 - x0) + (y1 - y0));
  for (let d = 0; d < per; d += 24) {
    let x, y, nx, ny;
    if (d < x1 - x0) { x = x0 + d; y = y0; nx = 0; ny = 1; }
    else if (d < (x1 - x0) + (y1 - y0)) { x = x1; y = y0 + d - (x1 - x0); nx = -1; ny = 0; }
    else if (d < 2 * (x1 - x0) + (y1 - y0)) { x = x1 - (d - (x1 - x0) - (y1 - y0)); y = y1; nx = 0; ny = -1; }
    else { x = x0; y = y1 - (d - 2 * (x1 - x0) - (y1 - y0)); nx = 1; ny = 0; }
    const o = amp * (Math.sin(d / 46 + t * 2.2) * .7 + Math.sin(d / 23 - t * 3.1) * .3);
    pts.push(`${(x + nx * o).toFixed(1)},${(y + ny * o).toFixed(1)}`);
  }
  return 'M' + pts.join(' L') + ' Z';
}
function dreamUpd(id, t, k = 1) {
  const g = $(id); if (!g) return;
  op(g, k);
  const inner = dreamEdge(t, lerp(-40, 64, k), 26);
  $(id + '-e').setAttribute('d', `M-60,-60 H${W + 60} V${H + 60} H-60 Z ` + inner);
  $(id + '-l').setAttribute('d', inner);
  for (let i = 0; i < 9; i++) { const el = $(`${id}-s${i}`); if (el) tf(el, 0, Math.sin(t * 1.6 + i) * 10, .8 + .25 * Math.sin(t * 3 + i * 1.3), t * 20 + i * 15); }
}
// glass shards over the whole frame: shardsSVG(id) on top; shatter(id, t, t0) cracks at t0-0.3, breaks and falls at t0
function shardsSVG(id) {
  const pts = [[0, 0], [360, 0], [720, 0], [1080, 0], [1080, 640], [1080, 1280], [1080, 1920], [720, 1920], [360, 1920], [0, 1920], [0, 1280], [0, 640]];
  const cx = 600, cy = 980; let s = `<g id="${id}" pointer-events="none" opacity="0">`;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], m = [(a[0] + b[0]) / 2 + (i % 2 ? 60 : -40), (a[1] + b[1]) / 2 + (i % 3 ? -50 : 40)];
    for (const [p, q] of [[a, m], [m, b]]) {
      const n = s.split('<g id="' + id + '-k').length - 1;
      s += `<g id="${id}-k${n}" data-c="${((p[0] + q[0] + cx) / 3).toFixed(0)},${((p[1] + q[1] + cy) / 3).toFixed(0)}"><path d="M${cx},${cy} L${p[0]},${p[1]} L${q[0]},${q[1]} Z" fill="${C.cream}" fill-opacity=".35" stroke="#FFFFFF" stroke-width="7" stroke-linejoin="round"/></g>`;
    }
  }
  return s + `</g>`;
}
function shatter(id, t, t0) {
  const g = $(id); if (!g) return;
  const crack = clamp((t - t0 + .3) / .12), k = Math.max(0, t - t0);
  op(g, crack * (1 - clamp(k / .9)));
  [...g.children].forEach((el, i) => {
    const [x, y] = el.dataset.c.split(',').map(Number), dx = (x - 600) * .9, dy = (y - 980) * .6;
    tf(el, dx * k, dy * k + 900 * k * k, 1 - .3 * clamp(k), (i % 2 ? 1 : -1) * k * 40, x, y);
  });
}
// a character walking in: wrap stand() in <g id="mv">, then tf($('mv'), ...glide(t, t0, d, x0, x1)) — glide with a step bob
function glide(t, t0, d, x0, x1, bob = 14) { const k = clamp((t - t0) / d), walking = k > 0 && k < 1; return [lerp(x0, x1, E.io(k)), walking ? -Math.abs(Math.sin((t - t0) * 9)) * bob : 0]; }

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

// ===== Rental shop and mall (from the Kavita reel, 2026-11-17) =====
// shopBG(id, {night, noRail, noSign, sign, lamp}): a lehenga rental shop: sign board, two rails of lehengas
// (hanger groups `${id}-h0..7`), floor. mallBG(id): a bright mall clothes shop with a kurti rack (`${id}-k0..6`).
const SHOP_LEH = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E'], ['#C0262D', '#97151B'], [C.marigold2, '#D9A52E']];
function shopBG(id, o = {}) {
  let s = wallSVG(o.night ? '#E2C6A6' : '#F7E1C6', o.night ? '#D3B48F' : '#EFD2B0');
  if (o.night) s += `<circle cx="${o.lampX || 860}" cy="560" r="440" fill="url(#glow)" opacity=".9"/>`;
  if (!o.noSign) s += `<g transform="translate(540,250)"><rect x="-300" y="-58" width="600" height="116" rx="20" fill="url(#mar)" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-282" y="-40" width="564" height="80" rx="12" fill="none" stroke="${C.gold}" stroke-width="4"/>` +
    `<text x="0" y="18" text-anchor="middle" font-family="Inter" font-weight="900" font-size="50" fill="${C.gold}" letter-spacing="3">${o.sign || 'KAVITA RENTALS'}</text></g>`;
  if (!o.noRail) for (const [rx, k0] of [[40, 0], [580, 4]]) {
    s += `<rect x="${rx}" y="470" width="460" height="14" rx="7" fill="${C.goldTan}" stroke="${OL}" stroke-width="4"/>`;
    s += `<path d="M${rx + 20},484 V${FLOOR} M${rx + 440},484 V${FLOOR}" stroke="${OL}" stroke-width="10"/><path d="M${rx + 20},484 V${FLOOR} M${rx + 440},484 V${FLOOR}" stroke="${C.goldTan}" stroke-width="5"/>`;
    for (let k = 0; k < 4; k++) { const [c, d] = SHOP_LEH[k0 + k]; s += `<g id="${id}-h${k0 + k}" transform="translate(${rx + 70 + k * 108},560)">${lehengaHangerSVG(`${id}-l${k0 + k}`, { c, d, b: C.gold, dupatta: C.goldTan }, .55)}</g>`; }
  }
  if (o.lamp) s += lampSVG(o.lampX || 860, 150);
  s += floorSVG(o.night ? '#8E6640' : '#A47648');
  return s;
}
function mallBG(id) {
  let s = `<rect width="${W}" height="${H}" fill="#FBF6EE"/><rect x="0" y="${FLOOR - 220}" width="${W}" height="220" fill="#F2EADF"/>`;
  for (let x = 120; x < W; x += 280) s += `<path d="M${x - 40},0 L${x + 40},0 L${x + 24},60 L${x - 24},60 Z" fill="#E6E0D9" stroke="${OL}" stroke-width="4"/><circle cx="${x}" cy="66" r="12" fill="${C.gold}" stroke="${OL}" stroke-width="3"/>`;
  s += `<rect x="60" y="520" width="${W - 120}" height="14" rx="7" fill="#C9C2B8" stroke="${OL}" stroke-width="4"/>`;
  const kc = [[C.pink, C.pinkDark], [C.teal, C.tealDark], [C.marigold, '#C9821E'], ['#7A4FA0', '#5D3A7E'], [C.emerald, C.emeraldDark], ['#C0262D', '#97151B'], [C.marigold2, '#D9A52E']];
  kc.forEach(([c, d], i) => { s += `<g id="${id}-k${i}" transform="translate(${130 + i * 137},540)">${kurtiSVG(c, d, .62)}</g>`; });
  s += `<rect x="0" y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#E8DFD2"/>`;
  for (let x = 0; x < W; x += 180) s += `<path d="M${x},${FLOOR} V${H}" stroke="#D8CDBE" stroke-width="4"/>`;
  return s + `<rect x="-10" y="${FLOOR - 12}" width="${W + 20}" height="16" fill="#C9C2B8" stroke="${OL}" stroke-width="4"/>`;
}
// ===== Street, countdown timer, rewind streaks, video call (Last minute invitation, 2026-11-17) =====
// streetBG(id, {sign, dress}): office building on the main road (left), a side lane beside it, and a small rental
// shop just round the corner (right) with an awning, sign board and an outfit in the window. Footpath + road.
function streetBG(id, o = {}) {
  let s = `<rect width="${W}" height="${H}" fill="${C.sky}"/>`;
  s += `<path d="M60,120 q30,-30 70,-10 q30,-20 60,6 q20,4 14,22 h-150 z" fill="#fff" opacity=".9"/><path d="M760,200 q30,-26 66,-8 q26,-16 52,6 q18,6 10,20 h-136 z" fill="#fff" opacity=".9"/>`;
  // office building
  s += `<rect x="-20" y="250" width="560" height="${FLOOR - 250}" fill="#C9D3DE" stroke="${OL}" stroke-width="${OW}"/>`;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) s += `<rect x="${30 + c * 125}" y="${300 + r * 118}" width="95" height="82" rx="6" fill="#8FB3CF" stroke="${OL}" stroke-width="4"/><path d="M${44 + c * 125},${314 + r * 118} l26,0 l-20,30" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>`;
  s += `<rect x="150" y="${FLOOR - 190}" width="240" height="190" fill="#5D6F86" stroke="${OL}" stroke-width="${OW}"/><path d="M270,${FLOOR - 190} V${FLOOR}" stroke="${OL}" stroke-width="4"/>`;
  s += `<rect x="130" y="${FLOOR - 250}" width="280" height="50" rx="10" fill="#fff" stroke="${OL}" stroke-width="4"/><text x="270" y="${FLOOR - 214}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#3F4B5C" letter-spacing="3">OFFICE</text>`;
  // side lane between the buildings
  s += `<path d="M540,${FLOOR} L600,640 L680,640 L740,${FLOOR} Z" fill="#D8CDBE" stroke="${OL}" stroke-width="4"/><path d="M640,700 V${FLOOR - 40}" stroke="#fff" stroke-width="6" stroke-dasharray="26 22"/>`;
  s += `<rect x="560" y="560" width="160" height="90" fill="#E6D6BF" stroke="${OL}" stroke-width="4"/>`;
  // small rental shop round the corner
  s += `<rect x="720" y="560" width="380" height="${FLOOR - 560}" fill="#F7E1C6" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<rect x="740" y="600" width="340" height="86" rx="12" fill="url(#mar)" stroke="${OL}" stroke-width="${OW}"/><text x="910" y="656" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${o.signFs || 32}" fill="${C.gold}" letter-spacing="2">${o.sign || 'RENTALS'}</text>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${720 + i * 64},700 h64 l-6,70 q-26,24 -52,0 z" fill="${i % 2 ? C.cream : C.red}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  s += `<rect x="760" y="800" width="190" height="${FLOOR - 840}" rx="8" fill="#FFF8EC" stroke="${OL}" stroke-width="${OW}"/><g transform="translate(855,880)">${lehengaHangerSVG(id + '-win', o.dress || { c: C.marigold2, d: '#D9A52E', b: C.red, dupatta: '#E26A8A' }, .62)}</g>`;
  s += `<rect x="975" y="840" width="105" height="${FLOOR - 840}" fill="#8C5A32" stroke="${OL}" stroke-width="${OW}"/><circle cx="995" cy="${FLOOR - 170}" r="8" fill="${C.gold}"/>`;
  // footpath and road
  s += `<rect x="-10" y="${FLOOR}" width="${W + 20}" height="90" fill="#CFC6B8" stroke="${OL}" stroke-width="4"/>`;
  for (let x = 0; x < W; x += 120) s += `<path d="M${x},${FLOOR} V${FLOOR + 90}" stroke="#B8AE9E" stroke-width="4"/>`;
  s += `<rect x="-10" y="${FLOOR + 90}" width="${W + 20}" height="${H - FLOOR - 90}" fill="#6E6A64"/><path d="M0,${FLOOR + 330} H${W}" stroke="#F2EADF" stroke-width="12" stroke-dasharray="70 50"/>`;
  return s;
}
// countdown timer pill (top-left, small): timerHTML(id, at) in a scene's html; timerSet(id, hours) every frame
function timerHTML(id, at = '-1') { return `<div class="pill timer" id="${id}" style="left:200px;top:300px" data-t="${at}">⏱️ 48:00:00</div>`; }
function timerSet(id, hours) {
  const el = $(id); if (!el) return;
  const s = Math.max(0, Math.round(hours * 3600)), p = n => String(n).padStart(2, '0');
  el.textContent = `⏱️ ${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
}
// rewind / fast-forward streaks over the frame: streaksSVG(id) on top, streaks(id, t, t0, d, dir) (dir -1 = rewind)
function streaksSVG(id) {
  let s = `<g id="${id}" pointer-events="none" opacity="0"><rect width="${W}" height="${H}" fill="${C.maroonDeep || '#2b0001'}" opacity=".25"/>`;
  for (let i = 0; i < 22; i++) s += `<rect class="sk" x="0" y="${60 + i * 86 + (i % 3) * 20}" width="${220 + (i * 137) % 420}" height="${6 + (i % 4) * 4}" rx="6" fill="#FFFFFF" opacity="${.35 + (i % 3) * .2}"/>`;
  return s + `</g>`;
}
function streaks(id, t, t0, d, dir = -1) {
  const g = $(id); if (!g) return;
  const k = (t - t0) / d; op(g, k > 0 && k < 1 ? Math.sin(k * Math.PI) * 1.4 : 0);
  [...g.querySelectorAll('.sk')].forEach((el, i) => { const x = ((t * 2600 * (1 + (i % 5) * .2) + i * 300) % (W + 700)) - 600; el.setAttribute('x', (dir < 0 ? W - x : x).toFixed(0)); });
}
// one panel of a split-screen video call: callPanelSVG(id, y, h, name, inner, bg) — inner is drawn in scene
// coordinates and clipped to the panel; a name tag sits bottom-left. callEndSVG(x, y) = the red end-call button.
function callPanelSVG(id, y, h, name, inner, bg = C.wall) {
  return `<clipPath id="${id}-cp"><rect x="40" y="${y}" width="${W - 80}" height="${h}" rx="34"/></clipPath>` +
    `<g clip-path="url(#${id}-cp)"><rect x="40" y="${y}" width="${W - 80}" height="${h}" fill="${bg}"/>${inner}</g>` +
    `<rect x="40" y="${y}" width="${W - 80}" height="${h}" rx="34" fill="none" stroke="${OL}" stroke-width="${OW + 2}"/>` +
    `<g transform="translate(70,${y + h - 70})"><rect width="${name.length * 22 + 50}" height="50" rx="25" fill="#000" opacity=".55"/><text x="25" y="34" font-family="Inter" font-weight="800" font-size="30" fill="#fff">${name}</text></g>`;
}
function callEndSVG(x, y) { return `<g transform="translate(${x},${y})"><circle r="44" fill="#D9363E" stroke="${OL}" stroke-width="${OW}"/><path d="M-24,4 Q0,-16 24,4 L18,14 L8,8 L8,0 Q0,-4 -8,0 L-8,8 L-18,14 Z" fill="#fff"/></g>`; }

// a big sofa a waist-up character sits IN: sofaBackSVG before bust(), sofaFrontSVG after it (same x, y = the
// character's waist y). The backrest rises to the shoulders, the seat cushion and armrests cover the lap.
function sofaBackSVG(x, y, w = 860, col = C.red) {
  return `<g transform="translate(${x},${y})"><path d="M${-w / 2},40 L${-w / 2},-300 Q${-w / 2},-370 ${-w / 2 + 70},-370 L${w / 2 - 70},-370 Q${w / 2},-370 ${w / 2},-300 L${w / 2},40 Z" fill="${col}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-10,-350 V20 M${-w / 4},-350 Q${-w / 4 - 10},-160 ${-w / 4},20 M${w / 4},-350 Q${w / 4 + 10},-160 ${w / 4},20" stroke="#6E0E11" stroke-width="5" fill="none" opacity=".55"/></g>`;
}
function sofaFrontSVG(x, y, w = 860, col = C.red) {
  const a = 120;
  return `<g transform="translate(${x},${y})"><rect x="${-w / 2 + 40}" y="-40" width="${w - 80}" height="150" rx="40" fill="#A31D1D" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M0,-30 V100" stroke="#6E0E11" stroke-width="5" opacity=".6"/>` +
    `<rect x="${-w / 2 + 30}" y="90" width="${w - 60}" height="150" rx="20" fill="${col}" stroke="${OL}" stroke-width="${OW}"/>` +
    [-1, 1].map(sd => `<rect x="${sd < 0 ? -w / 2 - 40 : w / 2 - a + 40}" y="-170" width="${a}" height="410" rx="50" fill="#A31D1D" stroke="${OL}" stroke-width="${OW}"/><path d="M${sd * (w / 2 - 20)},-120 V200" stroke="#6E0E11" stroke-width="5" opacity=".5"/>`).join('') +
    [-1, 1].map(sd => `<rect x="${sd * (w / 2 - 40) - 14}" y="240" width="28" height="44" rx="6" fill="${C.woodDark}" stroke="${OL}" stroke-width="4"/>`).join('') + `</g>`;
}

// THINK: hand under the chin (life(..., {R: THINK, hR: 'fist'})); IDEA: one finger up beside the head ('point').
const THINK = [-22, -150];
const IDEA = [150, 30];
// ARMS_X: arms crossed over the chest, a doubtful "convince me" pose (life(..., {L: ARMS_X, R: ARMS_X})) (Sawal bahut hain)
const ARMS_X = [6, -128];
// split3SVG(id, a, b, c): three vertical panels (360 px each) with white dividers; each drawn in full-frame coordinates,
// so centre panel content on x = 180, 540 and 900 (Sawal bahut hain)
function split3SVG(id, a, b, c) {
  return [a, b, c].map((p, i) => `<clipPath id="${id}${i}"><rect x="${i * 360}" y="0" width="360" height="${H}"/></clipPath><g clip-path="url(#${id}${i})">${p}</g>`).join('') +
    [360, 720].map(x => `<rect x="${x - 7}" y="0" width="14" height="${H}" fill="#fff" stroke="${OL}" stroke-width="4"/>`).join('');
}

// ===== Papa aur beti (2026-11-17): shop front on the street, old shop board, split screen =====
// shopFrontBG(id, {cx, sign, since}): a shop seen from the street: sky, building, open shutter, lehengas inside,
// painted board with the shop name and "Since ...", footpath and road. cx = the shop's centre x.
function shopFrontBG(id, o = {}) {
  const cx = o.cx || 540;
  let s = `<rect width="${W}" height="${H}" fill="${C.sky}"/><circle cx="${cx + 300}" cy="230" r="60" fill="${C.gold}" opacity=".9"/>`;
  s += `<rect x="${cx - 470}" y="300" width="940" height="${FLOOR - 300}" fill="#E9CFA9" stroke="${OL}" stroke-width="${OW}"/>`;
  for (const wx of [cx - 380, cx + 260]) s += `<rect x="${wx}" y="350" width="120" height="110" rx="6" fill="#F6E7CF" stroke="${OL}" stroke-width="4"/><path d="M${wx + 60},350 V460 M${wx},405 H${wx + 120}" stroke="${OL}" stroke-width="4"/>`;
  s += `<g transform="translate(${cx},560)">${oldBoardSVG(o.sign || 'RENTAL HOUSE', o.since || 'Since 1998')}</g>`;
  s += `<rect x="${cx - 360}" y="660" width="720" height="${FLOOR - 660}" fill="#4E3A1E" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<rect x="${cx - 360}" y="660" width="720" height="60" fill="#A7A39C" stroke="${OL}" stroke-width="4"/>` + [0, 1].map(k => `<path d="M${cx - 360},${676 + k * 20} H${cx + 360}" stroke="#8C8880" stroke-width="4"/>`).join('');
  const cols = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark]];
  s += `<path d="M${cx - 300},760 H${cx + 300}" stroke="${C.goldTan}" stroke-width="10"/>` + cols.map(([c, d], i) => `<g transform="translate(${cx - 240 + i * 120},820)">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan }, .5)}</g>`).join('');
  s += `<rect x="0" y="${FLOOR}" width="${W}" height="90" fill="#CFC6B8" stroke="${OL}" stroke-width="4"/><rect x="0" y="${FLOOR + 90}" width="${W}" height="${H - FLOOR - 90}" fill="#6E6A64"/>`;
  for (let x = 20; x < W; x += 180) s += `<rect x="${x}" y="${FLOOR + 260}" width="100" height="16" rx="6" fill="#F4EFE3"/>`;
  return s;
}
// oldBoardSVG(name, since): a painted shop board, wood frame, centred on (0,0)
function oldBoardSVG(name = 'RENTAL HOUSE', since = 'Since 1998') {
  return `<rect x="-330" y="-80" width="660" height="160" rx="12" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/><rect x="-310" y="-62" width="620" height="124" rx="8" fill="${C.cream}"/>` +
    `<text y="4" text-anchor="middle" font-family="Inter" font-weight="900" font-size="58" fill="${C.red}" letter-spacing="3">${name}</text>` +
    `<text y="48" text-anchor="middle" font-family="Inter" font-weight="700" font-size="30" fill="${C.brown}" font-style="italic">${since}</text>`;
}
// splitSVG(left, right): two half-frame panels with a white divider (each side's content drawn in full-frame coordinates)
function splitSVG(id, left, right) {
  return `<clipPath id="${id}L"><rect x="0" y="0" width="540" height="${H}"/></clipPath><clipPath id="${id}R"><rect x="540" y="0" width="540" height="${H}"/></clipPath>` +
    `<g clip-path="url(#${id}L)">${left}</g><g clip-path="url(#${id}R)">${right}</g><rect x="533" y="0" width="14" height="${H}" fill="#fff" stroke="${OL}" stroke-width="4"/>`;
}

// ===== Chalkboard (Ek lehenge ka hisaab, 2026-11-18) =====
// chalkboardBG(id, {x0, y0, x1, y1}): a big green chalkboard on a shop wall, wood frame, chalk tray, faint smudges.
// Chalk drawings: chalkSVG(d, {w, col, ct, cd}) draws path d (in scene coordinates) by hand from time ct over cd s;
// call chalkAuto(s, t) in the scene's upd. CHALK has ready-made shapes (centred on 0,0): lehenga, phone, person,
// coin, box(w,h), ring(rx,ry), underline(w). Chalk words: <div class="chalk nc" data-t=".." data-k="write">.
const CHALK_W = '#F4EFE3';
function chalkboardBG(id, o = {}) {
  const x0 = o.x0 || 50, y0 = o.y0 || 300, x1 = o.x1 || 1030, y1 = o.y1 || 1150;
  let s = wallSVG('#F3DCC0', '#EACBA8');
  s += `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="22" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<rect x="${x0 + 24}" y="${y0 + 24}" width="${x1 - x0 - 48}" height="${y1 - y0 - 48}" rx="10" fill="#2F4A3A"/>`;
  [[x0 + 220, y0 + 260, 160, 60], [x1 - 260, y0 + 480, 200, 70], [x0 + 400, y1 - 180, 240, 50]].forEach(([x, y, rx, ry]) => { s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FFFFFF" opacity=".05"/>`; });
  s += `<rect x="${x0 + 10}" y="${y1 - 6}" width="${x1 - x0 - 20}" height="26" rx="8" fill="${C.wood}" stroke="${OL}" stroke-width="4"/>`;
  s += `<rect x="${x0 + 120}" y="${y1 - 16}" width="60" height="14" rx="6" fill="${CHALK_W}" stroke="${OL}" stroke-width="2"/><rect x="${x0 + 200}" y="${y1 - 16}" width="44" height="14" rx="6" fill="${C.gold}" stroke="${OL}" stroke-width="2"/>`;
  s += floorSVG('#A47648');
  return s;
}
function chalkSVG(d, o = {}) {
  return `<path d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="${o.col || CHALK_W}" stroke-width="${o.w || 7}" stroke-linecap="round" stroke-linejoin="round" opacity=".92" data-ct="${o.ct || 0}" data-cd="${o.cd || .6}"/>`;
}
function chalkAuto(s, t) {
  if (!s._ch) s._ch = [...s.g.querySelectorAll('[data-ct]')].map(el => [el, T(el.dataset.ct), +el.dataset.cd]);
  s._ch.forEach(([el, t0, d]) => el.setAttribute('stroke-dashoffset', (1 - E.io(clamp((t - t0) / d))).toFixed(3)));
}
// move a CHALK shape: chalkAt(shape, x, y, sc)
const chalkAt = (d, x, y, sc = 1) => d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (m, a, b) => `${(+a * sc + x).toFixed(1)},${(+b * sc + y).toFixed(1)}`).replace(/([hv])(-?\d+\.?\d*)/g, (m, c, v) => `${c}${(+v * sc).toFixed(1)}`);
const CHALK = {
  // lehenga = short choli with sleeves, a gap, waistband, flared pleated skirt with a border (no dupatta)
  lehenga: 'M-30,-104 Q0,-90 30,-104 L52,-96 L62,-70 L44,-64 L40,-56 L-40,-56 L-44,-64 L-62,-70 L-52,-96 Z M-38,-34 L38,-34 L40,-22 L-40,-22 Z M-40,-22 Q-92,44 -128,112 Q0,138 128,112 Q92,44 40,-22 M-18,-20 Q-38,44 -58,118 M0,-20 L0,124 M18,-20 Q38,44 58,118 M-114,92 Q0,118 114,92',
  phone: 'M-46,-84 L46,-84 Q60,-84 60,-70 L60,70 Q60,84 46,84 L-46,84 Q-60,84 -60,70 L-60,-70 Q-60,-84 -46,-84 Z M-16,64 L16,64',
  person: 'M-14,-32 Q-14,-46 0,-46 Q14,-46 14,-32 Q14,-18 0,-18 Q-14,-18 -14,-32 Z M-26,26 Q-26,-6 0,-6 Q26,-6 26,26',
  coin: 'M-40,0 Q-40,-40 0,-40 Q40,-40 40,0 Q40,40 0,40 Q-40,40 -40,0 Z M-12,-14 L14,-14 M-12,0 L14,0 M-4,-14 Q16,-14 10,6 L-10,24',
  box: (w, h) => `M${-w / 2},${-h / 2} L${w / 2},${-h / 2 + 4} L${w / 2 - 3},${h / 2} L${-w / 2 + 2},${h / 2 - 3} Z`,
  ring: (rx, ry) => `M${-rx},0 Q${-rx},${-ry} 0,${-ry} Q${rx},${-ry} ${rx},0 Q${rx},${ry} 0,${ry} Q${-rx * 1.1},${ry} ${-rx * 1.05},${-ry * .15}`,
  underline: w => `M${-w / 2},0 Q0,8 ${w / 2},-2 M${-w / 2 + 20},18 Q0,26 ${w / 2 - 10},16`,
};
// a puff of chalk dust at (x, y) from time `at`
function chalkDust(x, y, at) { return [[-20, -10, 12], [14, -18, 9], [6, 12, 10], [-8, 20, 7]].map(([dx, dy, r]) => `<g transform="translate(${x + dx},${y + dy})"><g data-t="${at}" data-k="fade" data-d=".15" data-out="${at}+0.5"><circle r="${r}" fill="#FFFFFF" opacity=".55"/></g></g>`).join(''); }
// ===== Dukaan-dukaan ki bhaag-daud (2026-11-19): hot bazaar street, moving split screen =====
// bazaarBG(id, {n, noSun, sunX, sunY}): a hot market street: warm sky, sun (`${id}-sun`), a long row of n small rental shops "DUKAAN 1..n"
// (`${id}-row`, 300 px each: slide it left with bazaarScroll(id, x) so a walker seems to pass them), heat haze
// (`${id}-haze`), footpath and road. Shop i is centred at x = 150 + i * 300 before scrolling.
function bazaarBG(id, o = {}) {
  const n = o.n || 12, sw = 300;
  let s = `<rect width="${W}" height="${H}" fill="#F7D9A6"/><rect y="420" width="${W}" height="200" fill="#F5CF92" opacity=".6"/>`;
  if (!o.noSun) s += `<g transform="translate(${o.sunX || 170},${o.sunY || 330})"><g id="${id}-sun">${sunSVG()}</g></g>`;
  s += `<g id="${id}-row">`;
  for (let i = 0; i < n; i++) {
    const [c1, d1] = SHOP_LEH[i % 8], [c2, d2] = SHOP_LEH[(i + 3) % 8];
    s += `<g transform="translate(${i * sw},0)"><rect x="6" y="560" width="${sw - 12}" height="${FLOOR - 560}" fill="${['#F3DCC0', '#EBD3B5', '#F7E1C6'][i % 3]}" stroke="${OL}" stroke-width="${OW}"/>` +
      `<rect x="28" y="586" width="${sw - 56}" height="84" rx="12" fill="url(#mar)" stroke="${OL}" stroke-width="4"/>` +
      `<text x="${sw / 2}" y="642" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="${C.gold}" letter-spacing="2">DUKAAN ${i + 1}</text>` +
      [0, 1, 2, 3, 4].map(k => `<path d="M${6 + k * 57.6},690 h57.6 l-5,56 q-23.8,20 -47.6,0 z" fill="${k % 2 ? C.cream : C.red}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`).join('') +
      `<rect x="40" y="790" width="${sw - 80}" height="${FLOOR - 790}" fill="#4E3A1E" stroke="${OL}" stroke-width="4"/><path d="M52,830 H${sw - 52}" stroke="${C.goldTan}" stroke-width="8"/>` +
      `<g transform="translate(108,890)">${lehengaHangerSVG('', { c: c1, d: d1, dupatta: C.goldTan }, .36)}</g><g transform="translate(196,890)">${lehengaHangerSVG('', { c: c2, d: d2, dupatta: C.goldTan }, .36)}</g></g>`;
  }
  s += `</g><g id="${id}-haze" opacity=".45">` + [0, 1, 2, 3].map(k => `<path d="M${90 + k * 270},${520 - (k % 2) * 30} q22,-20 0,-40 q-22,-20 0,-40 q22,-20 0,-40" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>`).join('') + `</g>`;
  s += `<rect x="-10" y="${FLOOR}" width="${W + 20}" height="90" fill="#CFC6B8" stroke="${OL}" stroke-width="4"/>`;
  for (let x = 0; x < W; x += 120) s += `<path d="M${x},${FLOOR} V${FLOOR + 90}" stroke="#B8AE9E" stroke-width="4"/>`;
  s += `<rect x="-10" y="${FLOOR + 90}" width="${W + 20}" height="${H - FLOOR - 90}" fill="#6E6A64"/><path d="M0,${FLOOR + 330} H${W}" stroke="#F2EADF" stroke-width="12" stroke-dasharray="70 50"/>`;
  return s;
}
// every frame: slide the shop row so x px have passed; sun turns slowly, heat haze shimmers
function bazaarScroll(id, x, t) {
  tf($(`${id}-row`), -x, 0, 1);
  tf($(`${id}-sun`), 0, 0, 1 + Math.sin(t * 3) * .03, t * 12);
  const hz = $(`${id}-haze`); if (hz) { hz.setAttribute('opacity', (.3 + .2 * Math.sin(t * 4)).toFixed(2)); tf(hz, Math.sin(t * 2.2) * 8, -((t * 30) % 40), 1); }
}
// splitDynSVG(id, left, right): a split screen whose divider can move. Draw each side in full-frame coordinates
// centred on x = 270 (left) and 810 (right); splitAt(id, x) puts the divider at x and keeps each side centred in its half.
function splitDynSVG(id, left, right) {
  return `<clipPath id="${id}L"><rect id="${id}Lr" x="0" y="0" width="540" height="${H}"/></clipPath><clipPath id="${id}R"><rect id="${id}Rr" x="540" y="0" width="540" height="${H}"/></clipPath>` +
    `<g clip-path="url(#${id}L)"><g id="${id}Lg">${left}</g></g><g clip-path="url(#${id}R)"><g id="${id}Rg">${right}</g></g>` +
    `<rect id="${id}D" x="533" y="0" width="14" height="${H}" fill="#fff" stroke="${OL}" stroke-width="4"/>`;
}
function splitAt(id, x) {
  const dx = (x - 540) / 2;
  $(`${id}Lr`).setAttribute('width', x.toFixed(1)); $(`${id}Rr`).setAttribute('x', x.toFixed(1)); $(`${id}Rr`).setAttribute('width', (W - x).toFixed(1));
  $(`${id}D`).setAttribute('x', (x - 7).toFixed(1));
  tf($(`${id}Lg`), dx, 0, 1); tf($(`${id}Rg`), dx, 0, 1);
}

// ===== Rent kam rakha (2026-11-19): two shops side by side, a restaurant row =====
// twoShopsBG(id, {left: {sign, tag, tagCol, tagTxt}, right: {...}}): a street with two small rental shop fronts next
// to each other (left centred on x = 270, right on x = 810): board, open front, a rail of lehengas with a hanging tag
// under each (`${id}-L-t0..3`, `${id}-R-t0..3`). Draw the shopkeepers' busts after it, then twoShopsFront(id) for
// the two low counters in front of them.
function twoShopsBG(id, o = {}) {
  const L = Object.assign({ sign: 'REKHA RENTALS', tag: 'SALE ₹800', tagCol: '#D9363E', tagTxt: '#FFFFFF' }, o.left || {});
  const R = Object.assign({ sign: 'JIGNA RENTALS', tag: '₹2,000', tagCol: '#FFFFFF', tagTxt: C.red }, o.right || {});
  let s = `<rect width="${W}" height="${H}" fill="${C.sky}"/><circle cx="930" cy="210" r="56" fill="${C.gold}" opacity=".9"/>`;
  [[270, L, 'L', '#F3DCC0'], [810, R, 'R', '#EBD3B5']].forEach(([cx, S, k, wall]) => {
    s += `<rect x="${cx - 255}" y="380" width="510" height="${FLOOR - 380}" fill="${wall}" stroke="${OL}" stroke-width="${OW}"/>`;
    s += `<rect x="${cx - 225}" y="420" width="450" height="96" rx="14" fill="url(#mar)" stroke="${OL}" stroke-width="${OW}"/><text x="${cx}" y="482" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${C.gold}" letter-spacing="2">${S.sign}</text>`;
    s += `<rect x="${cx - 220}" y="550" width="440" height="${FLOOR - 550}" fill="#4E3A1E" stroke="${OL}" stroke-width="4"/><path d="M${cx - 205},590 H${cx + 205}" stroke="${C.goldTan}" stroke-width="10"/>`;
    for (let i = 0; i < 4; i++) {
      const [c, d] = SHOP_LEH[(i + (k === 'R' ? 3 : 0)) % 8], x = cx - 165 + i * 110;
      s += `<g transform="translate(${x},650)">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan }, .38)}</g>`;
      s += `<g id="${id}-${k}-t${i}" transform="translate(${x},800)"><path d="M0,-28 V-6" stroke="${OL}" stroke-width="3"/><rect x="-50" y="-6" width="100" height="40" rx="8" fill="${S.tagCol}" stroke="${OL}" stroke-width="3"/><text y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${S.tag.length > 7 ? 17 : 22}" fill="${S.tagTxt}">${S.tag}</text></g>`;
    }
  });
  s += `<rect x="-10" y="${FLOOR}" width="${W + 20}" height="90" fill="#CFC6B8" stroke="${OL}" stroke-width="4"/><rect x="-10" y="${FLOOR + 90}" width="${W + 20}" height="${H - FLOOR - 90}" fill="#6E6A64"/>`;
  return s;
}
function twoShopsFront(id) {
  return [270, 810].map(cx => `<rect x="${cx - 200}" y="1020" width="400" height="${FLOOR - 1020}" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/><rect x="${cx - 214}" y="1006" width="428" height="26" rx="6" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>`).join('');
}
// restaurantRowBG(id, {cheap}): an evening street with two restaurant fronts: left "BHOJAN" with a standing board
// (cheap, e.g. "Thali ₹49") and empty tables; right "RASOI", full of people at tables.
function restaurantRowBG(id, o = {}) {
  let s = `<rect width="${W}" height="${H}" fill="#F2C9A0"/><rect y="0" width="${W}" height="380" fill="#E9A97E" opacity=".6"/>`;
  [[270, 'BHOJAN', false], [810, 'RASOI', true]].forEach(([cx, name, full]) => {
    s += `<rect x="${cx - 255}" y="380" width="510" height="${FLOOR - 380}" fill="${full ? '#F7E1C6' : '#E6D6BF'}" stroke="${OL}" stroke-width="${OW}"/>`;
    s += `<rect x="${cx - 200}" y="420" width="400" height="90" rx="14" fill="${full ? 'url(#mar)' : '#8C7B6A'}" stroke="${OL}" stroke-width="${OW}"/><text x="${cx}" y="480" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="${full ? C.gold : '#EDE4D8'}" letter-spacing="3">${name}</text>`;
    s += `<rect x="${cx - 215}" y="550" width="430" height="440" rx="8" fill="${full ? '#FFF2DF' : '#D8CCBC'}" stroke="${OL}" stroke-width="4"/>`;
    for (let i = 0; i < 2; i++) {
      const tx = cx - 100 + i * 200;
      s += `<rect x="${tx - 70}" y="880" width="140" height="20" rx="6" fill="${C.woodDark}" stroke="${OL}" stroke-width="3"/><path d="M${tx},900 V970" stroke="${OL}" stroke-width="8"/>`;
      if (full) s += [-1, 1].map(sd => `<g transform="translate(${tx + sd * 52},${830})">${personIcon(SHOP_LEH[(i * 2 + (sd > 0 ? 1 : 0)) % 8][0])}</g>`).join('') + `<ellipse cx="${tx}" cy="876" rx="30" ry="9" fill="#fff" stroke="${OL}" stroke-width="3"/>`;
    }
    if (full) s += fairyLightsSVG(560, 0).replace(/cx="(\d+(\.\d+)?)"/g, (m, x) => `cx="${(+x * 430 / W + cx - 215).toFixed(1)}"`);
  });
  if (o.cheap !== false) s += `<g transform="translate(140,1060)"><path d="M-70,-90 L70,-90 L90,110 M-70,-90 L-90,110" fill="none" stroke="${C.woodDark}" stroke-width="10"/><rect x="-80" y="-110" width="160" height="130" rx="10" fill="#2E3B2E" stroke="${OL}" stroke-width="${OW}"/>` +
    `<text y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#F4EFE3">Thali</text><text y="-8" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="${C.gold}">${o.cheap || '₹49'}</text></g>`;
  s += `<rect x="-10" y="${FLOOR}" width="${W + 20}" height="90" fill="#CFC6B8" stroke="${OL}" stroke-width="4"/><rect x="-10" y="${FLOOR + 90}" width="${W + 20}" height="${H - FLOOR - 90}" fill="#6E6A64"/>`;
  return s;
}
