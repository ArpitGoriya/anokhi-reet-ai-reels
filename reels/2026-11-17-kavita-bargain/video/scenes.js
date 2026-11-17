// ===== Kavita aur Bargain (Episode 2): 22 scenes, timed to the voice (see captions.js) =====
// Characters: animation/cast/cast.js (KAVITA is new). Sets/props: shopBG, mallBG, gallaSVG, calculatorSVG, ...
const KS = KAVITA.shop, KN = KAVITA.night, KM = KAVITA.mall, AUNTY = GUEST_W2, AUNTY_F = dress(GUEST_W2, { skirt: { c: '#E07B39', d: '#B95F25', b: C.gold, w: 210 } }), GIRL = dress(GUEST_W1, { hairStyle: 'pony' });
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;

// ================= S1: hook — the shop is full, the galla is empty =================
addScene(0, 'c4', {
  svg: shopBG('s1', { noSign: true }) + `<circle cx="540" cy="900" r="420" fill="url(#glow)" opacity=".6"/>` +
    [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<g transform="translate(${i < 4 ? 110 + i * 108 : 650 + (i - 4) * 108},700)"><g data-t="c2+${(.1 + i * .17).toFixed(2)}" data-k="drop" data-d=".3" data-out="c3+0.2"><rect x="-52" y="-22" width="104" height="44" rx="22" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#fff">RENTED</text></g></g>`).join('') +
    bust('k1', KS, 700, FLOOR + 10, 1.05) + counterSVG() + at(300, FLOOR + 60, gallaSVG('g1'), 1.05),
  html: `<div class="title" style="top:430px">Shop <span class="g">FULL…</span><br>galla <span class="g">KHAALI?</span></div>`,
  cam: [1, 1.04], fy: 900,
  init() { $('g1-in').innerHTML = `<path d="M-90,-40 q20,-12 40,0 M30,-30 q20,-12 40,0" stroke="#6B5235" stroke-width="5" fill="none" stroke-linecap="round"/>`; },
  upd(t) {
    for (let i = 0; i < 8; i++) { const k = E.io(clamp((t - T('c2') - .25 - i * .17) / .45)); tf($('s1-h' + i), (i < 4 ? 110 + i * 108 : 650 + (i - 4) * 108), 560 - k * 40, 1); op($('s1-h' + i), 1 - k); }
    const open = E.back(clamp((t - T('c3') + .15) / .45));
    tf($('g1-dr'), 0, open * 78, 1 + open * .06);
    const sad = t > T('c3') + .1;
    life('k1', t, { pivot: 0, look: sad ? [-0.8, 0.8] : [-0.6, 0], mouth: sad ? 'sad' : 'big', brows: sad ? 'worry' : 'up', tilt: sad ? -6 : 3, nod: sad ? 8 : 0, L: sad ? [40, -40] : [9, -14], hL: sad ? 'open' : 'fist', R: sad ? [20, -90] : [9, -14] });
  }
});

// ================= S2: every customer's first line =================
addScene('c4', 'c8', {
  svg: shopBG('s2', { noSign: true }) + bust('a2', AUNTY, 300, FLOOR + 10, 1.0) + bust('k2', KS, 790, FLOOR + 10, 1.0) + counterSVG() +
    at(300, FLOOR + 40, lehengaHangerSVG('s2-lh', { c: C.pink, d: C.pinkDark, dupatta: '#F4B9C8' }, .55)),
  html: pillH(540, 352, 'c4+0.1', 'Har customer ka <span class="hl">pehla dialogue</span>', '', 'c6-0.1') +
    `<div class="bubble" style="left:440px;top:470px;width:780px" data-t="c6" data-out="c7-0.05">"Didi, rent <span class="hl">thoda kam</span> karo na…"</div>` +
    `<div class="bubble" style="left:440px;top:470px;width:780px" data-t="c7">"Shaadi ka <span class="hl">kharcha bahut</span> hai!"</div>`,
  upd(t) {
    const asking = t > T('c6') - .1;
    life('a2', t, { pivot: 0, seed: 2, look: [0.8, 0], speak: t > T('c6') && t < T('c8') - .1, mouth: 'smile', brows: asking ? 'worry' : 'norm', tilt: asking ? 7 : 2, L: asking ? CLASP : [9, -14], R: asking ? CLASP : [9, -14] });
    const worry = t > T('c7');
    life('k2', t, { pivot: 0, seed: 1, look: [-0.8, 0], mouth: worry ? 'worry' : 'smile', brows: worry ? 'worry' : 'norm', tilt: worry ? -6 : -2, R: worry ? THINK : [9, -14] });
  }
});

// ================= S3: and Kavita gives in, every time =================
addScene('c8', 'c9', {
  svg: shopBG('s3', { noSign: true, noRail: true }) +
    [[170, 560], [170, 800], [170, 1040]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c8+${(.1 + i * .3).toFixed(1)}">${personIcon(['#7A4FA0', C.pink, C.teal][i])}<g transform="translate(120,-60)"><rect x="-70" y="-30" width="160" height="56" rx="26" fill="#fff" stroke="${OL}" stroke-width="4"/><text x="10" y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${C.red}">Kam karo!</text></g></g></g>`).join('') +
    bust('k3', KS, 640, FLOOR + 10, 1.05) + counterSVG() +
    `<g transform="translate(900,620)"><g data-t="c8" data-out="c8+0.7" data-swing="8">${priceTagSVG('s3-t1', '₹2,000', 0, 0, { fs: 36 })}</g><g data-t="c8+0.75" data-swing="12">${priceTagSVG('s3-t2', '₹1,500', 0, 0, { fs: 36, color: C.emerald })}</g></g>`,
  html: pillH(540, 352, 'c8+0.1', 'Har <span class="hl">baar</span> haan', 'gold'),
  upd(t) { life('k3', t, { pivot: 0, look: [-0.7, 0], mouth: 'shy', brows: 'worry', sweat: clamp((t - T('c8') - .6) / .3), nod: Math.max(0, Math.sin((t - T('c8')) * 9)) * 10, tilt: 3, L: CLASP, R: CLASP }); }
});

// ================= S4: one night, the month's accounts =================
addScene('c9', 'c11', {
  svg: shopBG('s4', { night: true, noRail: true, lamp: true, lampX: 860, noSign: true }) + clockSVG('s4-clk', 200, 560) +
    bust('k4', KN, 560, FLOOR + 10, 1.05) + counterSVG() + at(360, FLOOR + 40, ledgerSVG(), .8, -4) + at(830, FLOOR + 60, calculatorSVG('s4-calc', '…'), .5, 8),
  html: pillH(540, 420, 'c9+0.2', 'Ek raat: <span class="hl">mahine ka hisaab</span>'),
  cam: [1, 1.05], fy: 1000,
  upd(t) { clockTick('s4-clk', t, 130); life('k4', t, { pivot: 0, look: [-0.3, 0.9], nod: 12, mouth: 'flat', brows: 'sure', tilt: -3, L: [24, -40], R: [30, -50], hL: 'point' }); $('s4-calc-scr').textContent = t > T('c10') ? ((t * 7 | 0) % 2 ? '8' : '10') : '0'; }
});

// ================= S5: 8 out of 10 bargained =================
const ICON5 = [...Array(10)].map((_, i) => [180 + (i % 5) * 180, 560 + ((i / 5) | 0) * 210]);
addScene('c11', 'c13', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('s5-r', 540, 700, .07, C.goldTan) +
    ICON5.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c11+${(i * .06).toFixed(2)}">${personIcon(C.goldTan)}<g id="s5-bad${i}" opacity="0">${personIcon(C.red)}<g transform="translate(40,-46)"><circle r="24" fill="${C.red}" stroke="${OL}" stroke-width="3"/><path d="M-11,0 H11" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g></g></g></g>`).join('') +
    `<rect x="0" y="${FLOOR - 40}" width="${W}" height="${H}" fill="#F3E3C0"/>` + bust('k5', KN, 540, FLOOR + 60, .8),
  html: pillH(540, 352, 'c11+0.3', '<span class="hl">10</span> mein se <span class="hl">8</span> ne bargain kiya', 'big'),
  upd(t) {
    for (let i = 0; i < 10; i++) { const bad = i !== 3 && i !== 8; op($('s5-bad' + i), bad ? E.out(clamp((t - T('c11') - .9 - i * .12) / .2)) : 0); }
    life('k5', t, { pivot: 0, look: [0, -0.8], mouth: t > T('c12') ? 'o' : 'flat', brows: t > T('c12') ? 'worry' : 'norm', tilt: -4 });
  }
});

// ================= S6: ₹2,000 → ₹1,500, costs stay the same =================
addScene('c13', 'c17', {
  svg: `<rect width="${W}" height="${H}" fill="#E5CDAE"/><circle cx="540" cy="760" r="460" fill="url(#glow)"/>` +
    at(540, 760, calculatorSVG('s6-calc', '2000'), 1.15) +
    `<g transform="translate(260,1110)"><g data-t="c15+0.1" data-k="drop">${at(0, 0, dryCleanIcon(), .8)}</g></g>` +
    `<g transform="translate(800,1110)"><g data-t="c15+0.8" data-k="drop">${at(0, 0, needleIcon(), .8)}</g></g>`,
  html: pillH(540, 352, 'c13', 'Rent: <span class="hl">₹2,000</span>', 'big', 'c14') +
    pillH(540, 352, 'c14+0.35', 'Bargain ke baad: <span class="hl">₹1,500</span>', 'big', 'c16-0.05') +
    pillH(540, 352, 'c16', 'Kharcha: <span class="hl">wahi ka wahi</span>', 'big') +
    pillH(830, 560, 'c14+0.5', '− ₹500', 'maroon') +
    pillH(260, 1235, 'c15+0.3', 'Dry cleaning') + pillH(800, 1235, 'c15+1.0', 'Repair'),
  cam: [1, 1.04], fy: 800,
  upd(t) { const k = clamp((t - T('c14') - .3) / .6); $('s6-calc-scr').textContent = k <= 0 ? '2000' : String(Math.round(lerp(2000, 1500, E.out(k)))); }
});

// ================= S7: 30 bookings, ₹12,000 gone =================
const NOTES7 = [[-120, 0], [-40, 0], [40, 0], [120, 0], [-80, 0], [80, 0], [0, 0], [-150, 0]];
addScene('c17', 'c20', {
  svg: shopBG('s7', { noSign: true }) + bust('k7', KS, 540, FLOOR + 30, 1.0) + counterSVG() + at(540, FLOOR + 70, gallaSVG('g7'), 1.1) +
    NOTES7.map((_, i) => `<g id="s7-n${i}" opacity="0">${noteSVG()}</g>`).join(''),
  html: pillH(540, 352, 'c17', '<span class="hl">30</span> bookings', 'big') +
    `<div class="title" style="top:478px;font-size:96px" data-t="c18"><span class="g" id="s7-cnt">₹0</span></div>` +
    `<div class="title" style="top:580px;font-size:66px" data-t="c19+0.1">haath se <span class="g">GAYE!</span></div>`,
  init() { tf($('g7-dr'), 0, 78, 1.06); },
  upd(t) {
    const k = clamp((t - T('c18')) / .9);
    $('s7-cnt').textContent = '₹' + (Math.round(lerp(0, 12000, E.out(k)) / 100) * 100).toLocaleString('en-IN');
    for (let i = 0; i < NOTES7.length; i++) {
      const t0 = T('c18') + .1 + i * .16, q = clamp((t - t0) / 1.1);
      const x = 540 + NOTES7[i][0] * .4 + (i % 2 ? 1 : -1) * q * (240 + i * 30), y = FLOOR + 40 - q * 520 - Math.sin(q * Math.PI) * 120;
      tf($('s7-n' + i), x, y, .9, (i % 2 ? 1 : -1) * q * 200); op($('s7-n' + i), q > 0 && q < 1 ? 1 : 0);
    }
    const shock = t > T('c18') + .3;
    life('k7', t, { pivot: 0, look: [0, 0.8], mouth: shock ? 'o' : 'flat', brows: 'worry', sweat: shock ? 1 : 0, tilt: shock ? 0 : -4, L: shock ? [40, -150] : [9, -14], R: shock ? [40, -150] : [9, -14], hL: 'open', hR: 'open' });
  }
});

// ================= S8: the same week, the mall: fixed price, no bargain =================
addScene('c20', 'c24', {
  svg: mallBG('s8') + [1, 3, 5].map((i, j) => `<g transform="translate(${130 + i * 137 + 50},640)"><g data-t="c21+${(.15 + j * .2).toFixed(2)}" data-swing="10">${priceTagSVG('s8-t' + j, 'FIXED', 0, 0, { fs: 26 })}</g></g>`).join('') +
    wrap('s8-kw', stand('k8', KM, 540, 960, .9)),
  html: pillH(540, 352, 'c20+0.1', 'Usi hafte, <span class="hl">mall</span> mein', '', 'c22-0.35') +
    pillH(540, 352, 'c22', 'Bargain? <span class="hl">Ek baar bhi nahi</span>', 'big'),
  upd(t) {
    const [gx, gy] = glide(t, T('c20'), .9, 560, 0);
    tf($('s8-kw'), gx, gy, 1);
    const happy = t > T('c22');
    life('k8', t, { look: t > T('c21') && !happy ? [-0.6, -0.4] : [0, 0], mouth: happy ? 'grin' : 'smile', brows: 'up', tilt: happy ? 4 : 0, nod: happy ? Math.max(0, Math.sin((t - T('c22')) * 7)) * 8 : 0, L: happy ? CLASP : [9, -14], R: happy ? CLASP : [9, -14] });
  }
});

// ================= S9a: "Buy 2 Get 1 Free" =================
addScene('c24', 'c26', {
  svg: mallBG('s9') + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` +
    `<g transform="translate(540,470)"><g data-t="c24-0.05" data-swing="7"><path d="M-160,-110 L0,-200 L160,-110" fill="none" stroke="${OL}" stroke-width="5"/>` +
    `<rect x="-380" y="-110" width="760" height="230" rx="28" fill="url(#mar)" stroke="${OL}" stroke-width="${OW}"/><rect x="-360" y="-90" width="720" height="190" rx="18" fill="none" stroke="${C.gold}" stroke-width="5"/>` +
    `<text y="-6" text-anchor="middle" font-family="Inter" font-weight="900" font-size="74" fill="#FFF2DF">BUY 2 GET 1</text><text y="82" text-anchor="middle" font-family="Inter" font-weight="900" font-size="82" fill="${C.gold}" letter-spacing="6">FREE</text></g></g>` +
    [[C.pink, C.pinkDark], [C.teal, C.tealDark], [C.marigold, '#C9821E']].map(([c, d], i) => `<g transform="translate(${250 + i * 290},780)"><g data-t="c25+${(.1 + i * .3).toFixed(1)}" data-k="drop">${kurtiSVG(c, d, .95)}<g transform="translate(0,330)"><circle r="44" fill="${i === 2 ? C.gold : '#fff'}" stroke="${OL}" stroke-width="${OW}"/><text y="${i === 2 ? 10 : 16}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${i === 2 ? 26 : 46}" fill="${C.red}">${i === 2 ? 'FREE' : i + 1}</text></g></g></g>`).join(''),
  cam: [1, 1.05], fy: 800
});

// ================= S9b: three kurtis, very happy =================
addScene('c26', 'c27', {
  svg: mallBG('s9b') + stand('k9', KM, 540, 960, .9) + [0, 1, 2].map(i => `<g id="s9-b${i}">${at(0, 0, bagSVG(), .42)}</g>`).join(''),
  html: pillH(540, 352, 'c26', '3 kurtis, <span class="hl">bahut khush</span>', 'big'),
  upd(t) {
    const { hl, hr } = life('k9', t, { mouth: 'grin', brows: 'up', tilt: 5, y: hop(t, T('c26') + .1, 26) + hop(t, T('c26') + .7, 18), L: [34, -10], R: [34, -10] });
    const pl = toScene('k9', hl), pr = toScene('k9', hr);
    tf($('s9-b0'), pl[0] - 10, pl[1] + 90, 1, -6); tf($('s9-b1'), pr[0] + 10, pr[1] + 90, 1, 6); tf($('s9-b2'), pr[0] + 70, pr[1] + 110, .9, 10);
  }
});

// ================= S10: the penny drops — not a lower price, the feeling of winning =================
addScene('c27', 'c30', {
  svg: `<rect width="${W}" height="${H}" fill="${C.wall}"/>` + rosettes('s10-r', 540, 760, .1, C.goldTan) +
    `<g transform="translate(860,760)"><g data-t="c28-0.1">${at(0, 0, ideaBulbSVG(), .7)}</g></g>` +
    bust('k10', KM, 470, FLOOR + 10, 1.1) + counterSVG(FLOOR, C.woodLight),
  html: `<div class="title" style="top:392px" data-t="c28">Kam daam <span class="g">nahi…</span></div>` +
    `<div class="title" style="top:500px" data-t="c29"><span class="g">JEET</span> ki feeling!</div>`,
  upd(t) {
    const idea = t > T('c28') - .1;
    life('k10', t, { pivot: 0, look: idea ? [0.5, -0.6] : [-0.4, -0.7], mouth: idea ? 'big' : 'flat', brows: idea ? 'up' : 'sure', tilt: idea ? 4 : -6, R: idea ? IDEA : THINK, hR: idea ? 'point' : 'fist', y: hop(t, T('c28') - .1, 14) });
    tf($('s10-r'), 540, 760, 1, t * 5);
  }
});

// ================= S11: 2007, economist Dan Ariely's experiment (title card) =================
addScene('c30', 'c33', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s11-r', 540, 820, .14, C.gold) +
    `<g transform="translate(540,780)"><g data-t="c30+0.05">${calendarSVG('s11-cal', 'SAAL', '2007')}</g></g>`,
  html: pillH(540, 1040, 'c31', 'Economist <span class="hl">Dan Ariely</span>', 'big') + pillH(540, 1160, 'c32+0.1', 'Ek <span class="hl">experiment</span>', 'gold'),
  tin: .3, trans: 'zoom', cam: [1, 1.05], fy: 820,
  upd(t) { tf($('s11-r'), 540, 820, 1, -t * 6); }
});

// ================= S12 + S13: the chocolate and the toffee =================
// a table with a fancy chocolate (left) and a toffee (right), and 8 people who choose
const TBL = `<rect width="${W}" height="${H}" fill="#F3E3C0"/><rect x="0" y="0" width="${W}" height="${FLOOR - 120}" fill="${C.cream}"/>` +
  `<rect x="60" y="900" width="${W - 120}" height="44" rx="12" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/><rect x="100" y="944" width="${W - 200}" height="80" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
  `<path d="M140,1024 V1120 M${W - 140},1024 V1120" stroke="${OL}" stroke-width="16"/>`;
const PPL = [C.pink, C.teal, C.marigold, '#7A4FA0', C.emerald, '#C0262D', C.goldTan, '#2F5D57'];
const pplSVG = p => PPL.map((c, i) => `<g id="${p}-p${i}">${personIcon(c)}</g>`).join('');
// where person i stands: side -1 = chocolate (left), 1 = toffee (right), 0 = waiting in the middle
function pplPos(i, side, n) { if (!side) return [540 + (i - 3.5) * 92, 1200]; const x0 = side < 0 ? 300 : 780; return [x0 + ((n % 3) - 1) * 100, 1130 + ((n / 3) | 0) * 105]; }
function movePpl(p, t, t0, sidesA, sidesB) {
  const cnt = { A: { '-1': 0, '1': 0, '0': 0 }, B: { '-1': 0, '1': 0, '0': 0 } };
  for (let i = 0; i < 8; i++) {
    const a = pplPos(i, sidesA[i], cnt.A[sidesA[i]]++), b = pplPos(i, sidesB[i], cnt.B[sidesB[i]]++);
    const k = E.io(clamp((t - t0 - i * .07) / .7)), hopY = k > 0 && k < 1 ? -Math.abs(Math.sin(k * Math.PI * 3)) * 16 : 0;
    tf($(`${p}-p${i}`), lerp(a[0], b[0], k), lerp(a[1], b[1], k) + hopY, .95);
  }
}
const MID = [0, 0, 0, 0, 0, 0, 0, 0], CHOC = [-1, -1, 1, -1, -1, -1, 1, -1], FREE = [1, 1, -1, 1, 1, 1, -1, 1];
addScene('c33', 'c38', {
  svg: TBL + `<circle cx="300" cy="780" r="240" fill="url(#glow)"/>` + at(300, 800, chocolateSVG(), 1.1) + at(780, 860, toffeeSVG(C.pink), 1.1) +
    priceTag('s12-t1', 'Mehengi', 300, 520, 'c33+0.2', { fs: 32 }) + priceTag('s12-t2', 'Sasti', 780, 600, 'c34+0.2', { fs: 32 }) + pplSVG('s12'),
  html: pillH(540, 352, 'c35+0.2', 'Zyaadatar: <span class="hl">chocolate</span>', 'big', 'c36-0.1') +
    pillH(540, 352, 'c36', 'Dono ka daam: <span class="hl">−1 cent</span>', 'big') +
    pillH(300, 780, 'c37+0.3', '−1¢', 'maroon') + pillH(780, 780, 'c37+0.5', '−1¢', 'maroon'),
  upd(t) { movePpl('s12', t, T('c35'), MID, CHOC); }
});
addScene('c38', 'c42', {
  svg: TBL + `<circle cx="780" cy="820" r="280" fill="url(#glow)"/>` + at(300, 800, chocolateSVG(), 1.1) + at(780, 860, toffeeSVG(C.pink), 1.1) +
    priceTag('s13-t1', 'Mehengi', 300, 520, -1, { fs: 32 }) +
    `<g transform="translate(780,640)"><g data-t="c38+0.35" data-d=".5"><g transform="rotate(-10)"><rect x="-150" y="-62" width="300" height="124" rx="22" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/><rect x="-136" y="-48" width="272" height="96" rx="14" fill="none" stroke="${C.red}" stroke-width="5" stroke-dasharray="10 8"/><text y="26" text-anchor="middle" font-family="Inter" font-weight="900" font-size="76" fill="${C.red}" letter-spacing="4">FREE</text></g></g></g>` +
    pplSVG('s13'),
  html: `<div class="title" style="top:400px" data-t="c38+0.3" data-out="c40">Toffee <span class="g">FREE!</span></div>` +
    pillH(540, 352, 'c41', 'Sab <span class="hl">free toffee</span> ki taraf!', 'big'),
  cam: [1, 1.05], fx: 700, fy: 900,
  upd(t) { movePpl('s13', t, T('c39') + .1, CHOC, FREE); }
});

// ================= S14: the difference was the same, only one word changed =================
addScene('c42', 'c45', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s14-r', 540, 800, .12, C.gold) +
    `<g transform="translate(270,800)"><g data-t="c42+0.1"><rect x="-190" y="-150" width="380" height="300" rx="34" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text y="36" text-anchor="middle" font-family="Inter" font-weight="900" font-size="104" fill="${C.brown}">1 ¢</text><text y="110" text-anchor="middle" font-family="Inter" font-weight="700" font-size="34" fill="${C.brown}">fark wahi</text></g></g>` +
    `<g transform="translate(540,800)"><g data-t="c43+0.2"><path d="M-40,0 H30 M10,-26 L40,0 L10,26" fill="none" stroke="${C.gold}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></g></g>` +
    `<g transform="translate(810,800)"><g id="s14-free" data-t="c44-0.1" data-d=".5"><circle r="250" fill="url(#glow)"/><rect x="-190" y="-150" width="380" height="300" rx="34" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/><text y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="108" fill="${C.red}">FREE</text></g></g>`,
  html: `<div class="title" style="top:430px" data-t="c43">Bas <span class="g">ek shabd</span> badla…</div>`,
  cam: [1, 1.06], fx: 700, fy: 800
});

// ================= S15: the next morning, three things =================
addScene('c45', 'c47', {
  svg: shopBG('s15') + `<g transform="translate(0,190)">${shutterSVG('s15', W, FLOOR - 190)}</g>` +
    [0, 1, 2].map(i => `<g transform="translate(220,${600 + i * 240})"><g data-t="c46+${(.15 + i * .2).toFixed(2)}">${at(0, 0, stepCard(i + 1), .9)}</g></g>`).join('') +
    stand('k15', KS, 680, 960, .9),
  html: `<div class="title" style="top:392px" data-t="c46"><span class="g">3</span> kaam</div>`,
  upd(t) {
    const k = E.io(clamp((t - T('c45') - .1) / 1.1));
    tf($('s15-sh'), 0, 0, 1, 0, 0, 0, Math.max(.02, 1 - k));
    const up = k > 0 && k < 1;
    life('k15', t, { mouth: up ? 'o' : 'smile', brows: 'sure', tilt: up ? 0 : 3, look: up ? [0, -1] : [-0.5, 0], L: up ? [160, 10] : [9, -14], R: up ? [160, 10] : [30, -110], hL: up ? 'open' : 'fist', hR: up ? 'open' : 'fist', y: hop(t, T('c46'), 16) });
  }
});

// ================= S16: step 1 — fixed rent, listed on Anokhi Reet =================
const listRow = (y, c, d) => `<g transform="translate(0,${y})"><rect x="-168" y="-90" width="336" height="180" rx="20" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
  `<rect x="-152" y="-76" width="120" height="152" rx="14" fill="#F2EEE9"/><g transform="translate(-92,-6) scale(.3)">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan })}</g>` +
  `<text x="-14" y="-34" font-family="Inter" font-weight="700" font-size="24" fill="#655C57">Fixed rent</text><text x="-14" y="10" font-family="Inter" font-weight="900" font-size="38" fill="#141110">₹2,000</text>` +
  `<rect x="-14" y="30" width="150" height="44" rx="22" fill="url(#mar)"/><text x="61" y="60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#FFF2DF">Book</text></g>`;
addScene('c47', 'c51', {
  svg: shopBG('s16', { noSign: true }) +
    phoneSVG('s16-ph', 740, 820, 400, 760,
      `<path d="M-184,-334 Q-184,-364 -154,-364 L154,-364 Q184,-364 184,-334 L184,-250 L-184,-250 Z" fill="url(#mar)"/>` +
      `<text x="0" y="-292" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#FFF2DF">Anokhi Reet</text><text x="0" y="-262" text-anchor="middle" font-family="Inter" font-weight="500" font-size="20" fill="${C.beige}">Kavita Rentals</text>` +
      [[-120, C.lehenga, C.lehengaDark], [80, C.emerald, C.emeraldDark], [280, C.pink, C.pinkDark]].map(([y, c, d], i) => `<g data-t="c48+${(.2 + i * .25).toFixed(2)}" data-k="rise">${listRow(y, c, d)}</g>`).join('')) +
    wrap('s16-kg', bust('k16', KS, 270, FLOOR + 10, .95)) + wrap('s16-cg', bust('c16', GIRL, 270, FLOOR + 10, .95)) + counterSVG(),
  html: stepPill(1, 'Fixed rent', 'c47') + pillH(740, 1236, 'c49+0.4', 'Listed ✓', 'green big'),
  upd(t) {
    const sw = clamp((t - T('c50') + .1) / .3);
    op($('s16-kg'), 1 - sw); op($('s16-cg'), sw); tf($('s16-cg'), 0, (1 - E.out(sw)) * 60, 1);
    life('k16', t, { pivot: 0, look: [0.8, 0], mouth: 'smile', brows: 'sure', tilt: 3, R: t > T('c48') ? [70, 4] : [9, -14], hR: 'point' });
    life('c16', t, { pivot: 0, seed: 6, look: [0.8, -0.2], mouth: 'big', brows: 'up', tilt: 4, nod: Math.max(0, Math.sin((t - T('c50')) * 6)) * 6 });
  }
});

// ================= S17: step 2 — no discount; a matching jewellery set, free =================
addScene('c51', 'c55', {
  svg: shopBG('s17', { noSign: true, noRail: true }) +
    `<g transform="translate(300,600)"><g data-t="c51+0.1" data-swing="8">${priceTagSVG('s17-d', 'DISCOUNT', 0, 0, { fs: 40 })}</g></g>` +
    `<g transform="translate(300,674)"><path id="s17-x1" d="M-190,-60 L170,60" stroke="${C.red}" stroke-width="14" stroke-linecap="round" opacity=".85" stroke-dasharray="390" stroke-dashoffset="390"/><path id="s17-x2" d="M170,-60 L-190,60" stroke="${C.red}" stroke-width="14" stroke-linecap="round" opacity=".85" stroke-dasharray="390" stroke-dashoffset="390"/></g>` +
    `<circle cx="760" cy="900" r="330" fill="url(#glow)"/>` + at(760, 720, lehengaHangerSVG('s17-lh', {}, 1.05)) +
    `<g transform="translate(460,1090)"><g data-t="c52+0.2">${jewelBoxSVG('s17-jb')}</g></g>`,
  html: stepPill(2, 'Discount band', 'c51') + pillH(540, 470, 'c53+0.2', 'Jewellery set <span class="hl">FREE</span>', 'gold big') +
    pillH(540, 1240, 'c54+0.1', 'Shop mein <span class="hl">pehle se</span>'),
  upd(t) {
    const a = E.io(clamp((t - T('c51') - .5) / .3)), b = E.io(clamp((t - T('c51') - .75) / .3));
    $('s17-x1').setAttribute('stroke-dashoffset', (390 * (1 - a)).toFixed(0)); $('s17-x2').setAttribute('stroke-dashoffset', (390 * (1 - b)).toFixed(0));
    { const lk = E.back(clamp((t - T('c53')) / .5)); tf($('s17-jb-lid'), 0, -46 * lk, 1, -7 * lk, -120, -60); }
  }
});

// ================= S18: step 3 — "Rent toh fixed hai… par jewellery meri taraf se" =================
addScene('c55', 'c59', {
  svg: shopBG('s18', { noSign: true }) + bust('a18', AUNTY, 290, FLOOR + 10, 1.0) + bust('k18', KS, 790, FLOOR + 10, 1.0) + counterSVG() +
    wrap('s18-jbw', jewelBoxSVG('s18-jb')),
  html: stepPill(3, 'Muskurao', 'c55') +
    `<div class="bubble" style="left:330px;top:500px;width:470px" data-t="c55+0.2" data-out="c57-0.05">"Didi, <span class="hl">thoda kam?</span>"</div>` +
    `<div class="bubble" style="left:640px;top:500px;width:700px" data-t="c57" data-out="c58-0.05">"Rent toh <span class="hl">fixed</span> hai…"</div>` +
    `<div class="bubble" style="left:600px;top:500px;width:760px" data-t="c58">"…par jewellery <span class="hl">meri taraf se!</span>"</div>`,
  upd(t) {
    const give = E.io(clamp((t - T('c58') - .2) / .8));
    tf($('s18-jbw'), lerp(640, 450, give), FLOOR + 30 - Math.sin(give * Math.PI) * 40, .8);
    { const lk = E.back(clamp((t - T('c58') - .9) / .5)); tf($('s18-jb-lid'), 0, -46 * lk, 1, -7 * lk, -120, -60); }
    const happy = give > .9;
    life('a18', t, { pivot: 0, seed: 2, look: happy ? [0.6, 0.6] : [0.8, 0], speak: t > T('c55') + .1 && t < T('c56'), mouth: happy ? 'grin' : 'smile', brows: happy ? 'up' : 'worry', tilt: happy ? 5 : 7, L: CLASP, R: happy ? [9, -14] : CLASP, blush: happy ? .7 : 0 });
    const talk = t > T('c57') && t < T('c59') - .1;
    life('k18', t, { pivot: 0, seed: 1, look: [-0.8, 0], speak: talk, mouth: 'smile', brows: 'up', tilt: 4, L: give > 0 && give < 1 ? [50, -40] : [9, -14], hL: 'open' });
  }
});

// ================= S19: the customer is happy — she feels she won =================
addScene('c59', 'c61', {
  svg: shopBG('s19', { noSign: true }) + stand('a19', AUNTY_F, 540, 960, .9) + wrap('s19-jbw', jewelBoxSVG('s19-jb')) +
    [0, 1, 2].map(i => `<g transform="translate(${[210, 870, 170][i]},${[600, 560, 800][i]})"><g data-t="c59+${(.2 + i * .2).toFixed(1)}" data-bob="10" data-ph="${i}">${heartPath(0, 0, 2.2)}</g></g>`).join(''),
  html: pillH(540, 352, 'c60', 'Customer: <span class="hl">jeet gayi!</span>', 'big'),
  init() { tf($('s19-jb-lid'), 0, -46, 1, -7, -120, -60); },
  upd(t) {
    const { hl, hr } = life('a19', t, { mouth: 'grin', brows: 'up', tilt: 6, blush: .7, closed: t > T('c60') + .3 && t < T('c60') + .9, y: hop(t, T('c59') + .15, 24) + hop(t, T('c60') + .5, 18), L: CLASP, R: CLASP });
    const p = toScene('a19', [(hl[0] + hr[0]) / 2, (hl[1] + hr[1]) / 2]);
    tf($('s19-jbw'), p[0], p[1] + 40, .45);
  }
});

// ================= S20: Kavita is happy — the full ₹2,000 every booking =================
const COINS20 = [[-90, -40], [-40, -46], [10, -42], [60, -48], [100, -38], [-70, -70], [-15, -76], [40, -72], [90, -70]];
addScene('c61', 'c64', {
  svg: shopBG('s20', { noSign: true }) + bust('k20', KS, 540, FLOOR + 30, 1.0) + counterSVG() + at(540, FLOOR + 20, gallaSVG('g20'), 1.05),
  html: pillH(540, 352, 'c61', 'Kavita bhi <span class="hl">khush</span>') + pillH(540, 470, 'c63', 'Har booking: <span class="hl">poore ₹2,000</span>', 'gold big'),
  init() { tf($('g20-dr'), 0, 78, 1.06); $('g20-in').innerHTML = COINS20.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c62+${(.1 + i * .12).toFixed(2)}" data-k="drop" data-d=".35">${coinSVG(0, 0, 26)}</g></g>`).join(''); },
  upd(t) { life('k20', t, { pivot: 0, look: [0, 0.6], mouth: 'grin', brows: 'up', tilt: 4, y: hop(t, T('c61') + .15, 16) + hop(t, T('c63') + .2, 16), L: CLASP, R: CLASP, blush: .5 }); }
});
SC[SC.length - 1].init = (function (orig) { return function (s) { orig(s); s.popsS = [...s.g.querySelectorAll('[data-t]')]; }; })(SC[SC.length - 1].init);

// ================= S21: the moral =================
addScene('c64', 'c66', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('s21-r', 540, 880, .12, C.goldTan) + `<rect x="0" y="${FLOOR + 80}" width="${W}" height="${H}" fill="#F3E3C0"/>` +
    stand('k21', KS, 540, 1000, .82),
  html: `<div class="title" style="top:380px;font-size:62px" data-t="c64+0.05">Customer ko <span class="g">discount</span> nahi…</div>` +
    `<div class="title" style="top:500px;font-size:96px" data-t="c65"><span class="g">JEET</span> chahiye!</div>`,
  tin: .35, trans: 'fade', cam: [1, 1.04],
  upd(t) { tf($('s21-r'), 540, 880, 1, t * 5); const o = E.io(clamp((t - T('c65')) / .5)); life('k21', t, { mouth: 'grin', brows: 'sure', tilt: 3, sway: 2, L: [lerp(9, 30, o), lerp(-14, 60, o)], R: [lerp(9, 30, o), lerp(-14, 60, o)] }); }
});

// ================= S22: list your shop on Anokhi Reet + follow =================
addScene('c66', 9999, {
  svg: shopBG('s22', { sign: 'ANOKHI REET' }) + rosettes('s22-r', 540, 780, .08, C.goldTan) + bust('k22', KS, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: pillH(540, 380, 'c66+0.1', 'Apni <span class="hl">shop ya boutique</span>', '', 'c69') +
    pillH(540, 480, 'c67+0.1', '<span class="hl">Fixed price</span> ke saath', 'green', 'c69') +
    pillH(540, 580, 'c68+0.2', 'Anokhi Reet pe <span class="hl">list karo</span>', 'gold big', 'c69') +
    `<div class="follow" style="left:540px;top:500px" data-t="c69+0.1"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="s22-b"><span id="s22-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    tf($('s22-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c69') - .1) / .4);
    life('k22', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c69'))[0], E.io(w)), lerp(-14, WAVE(t, T('c69'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist', L: t > T('c66') && w < .5 ? [130, 10] : [9, -14], hL: 'point' });
    const tp = T('c70') + .6, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('s22-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('s22-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
