// ===== ₹2.5 lakh ki almari (Nisha): 16 scenes, timed to the voice (see captions.js) =====
// Characters: NISHA (new), her husband (PATI in a new shirt). Props: coveredLehengaSVG, lockSVG, plainBookSVG, pocketSVG (new).
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const HUSB = dress(PATI, { top: '#7A4FA0', topD: '#5D3A7E' });
const NL = dress(NISHA, { top: C.lehenga, topD: C.lehengaDark, pallu: '#E8C25E', necklace: true, gajra: true, skirt: { c: C.lehenga, d: C.lehengaDark, b: C.gold } });
const COV = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E']];
// the almirah's inside: n covered lehengas side by side
const almariFull = (n = 3) => [...Array(n)].map((_, i) => at(-100 + i * 100, -420, coveredLehengaSVG(...COV[i % COV.length], .42))).join('');
const openDoors = (id, k) => { tf($(`${id}-dL`), 0, 0, lerp(1, .13, k), 0, -150, 0, 1); tf($(`${id}-dR`), 0, 0, lerp(1, .13, k), 0, 150, 0, 1); };

// ================= S1: hook — ₹2.5 lakh in the almirah, income zero =================
addScene(0, 'c3', {
  svg: homeBG('n1', { noWindow: true, noShelf: true, noClock: true }) + `<circle cx="540" cy="860" r="460" fill="url(#glow)"/>` + almirahSVG('a1', 540, FLOOR + 62, 1.25) +
    `<g transform="translate(860,1000)"><g data-t="c2+0.2" data-swing="10">${coinSVG(0, 0, 60)}<text y="110" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="${C.red}">₹0</text></g></g>`,
  html: `<div class="title" style="top:430px">₹2.5 lakh…<br>kamaai <span class="g">₹0</span></div>` + `<div class="pill" style="left:190px;top:300px;font-size:30px;padding:8px 22px">Ek kahani</div>`,
  init() { $('a1-inside').innerHTML = almariFull(3); },
  cam: [1, 1.05], fy: 900,
  upd(t) { openDoors('a1', E.io(clamp((t - .2) / .7))); }
});

// ================= S2: meet Nisha, Surat =================
addScene('c3', 'c4', {
  svg: homeBG('n2') + stand('ni2', NISHA, 540, 950, .92),
  html: pillH(540, 352, 'c3+0.1', '<span class="hl">Surat</span> ki homemaker'),
  upd(t) { clockTick('n2-clk', t, 40); const w = clamp((t - T('c3') - .1) / .35); life('ni2', t, { mouth: 'big', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c3'))[0], E.io(w)), lerp(-14, WAVE(t, T('c3'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist' }); }
});

// ================= S3: every wedding a new outfit — worn once, photo, locked away =================
addScene('c4', 'c7', {
  svg: homeBG('n3', { noWindow: true, noShelf: true, noClock: true }) + almirahSVG('a3', 800, FLOOR + 62, .95) +
    `<g transform="translate(290,640)"><g data-t="c4+0.1"><rect x="-200" y="-240" width="400" height="480" rx="16" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><rect x="-176" y="-216" width="352" height="432" fill="#F7DCC8"/>` +
    `${at(-176, -216, torSVG(0, 352))}<g transform="translate(0,-60) scale(.42)">${person('ni3p', NL)}</g><rect id="n3-flash" x="-176" y="-216" width="352" height="432" fill="#fff" opacity="0"/></g></g>` +
    `<g id="n3-fly">${lehengaHangerSVG('n3-lh', { c: C.lehenga, d: C.lehengaDark }, .6)}</g>` +
    `<g transform="translate(800,${FLOOR - 230})"><g data-t="c6+0.6">${lockSVG()}</g></g>`,
  html: pillH(540, 352, 'c6', 'Ek baar pehna, <span class="hl">phir band</span> 🔒', 'big'),
  init() { face('ni3p', 1, { mouth: 'grin', brows: 'up' }); arm('ni3p', 'L', 12, -96, 'fist'); arm('ni3p', 'R', 12, -96, 'fist'); $('a3-inside').innerHTML = almariFull(2); },
  upd(t) {
    op($('n3-flash'), t > T('c5') + .3 && t < T('c5') + .45 ? .9 : 0);
    const k = E.io(clamp((t - T('c6') + .2) / .7));
    tf($('n3-fly'), lerp(290, 800, k), lerp(620, FLOOR - 400, k) - Math.sin(k * Math.PI) * 160, 1, Math.sin(k * Math.PI) * 10); op($('n3-fly'), t > T('c5') + .8 && k < 1 ? 1 : 0);
    openDoors('a3', 1 - E.io(clamp((t - T('c6') - .5) / .4)) * (t > T('c4') + .2 ? 1 : 0));
  }
});

// ================= S4: 12 lehengas in plastic covers =================
addScene('c7', 'c8', {
  svg: `<rect width="${W}" height="${H}" fill="#4E3A1E"/><rect x="40" y="410" width="${W - 80}" height="${FLOOR - 300}" rx="16" fill="#5A4426" stroke="${OL}" stroke-width="${OW}"/>` +
    [0, 1].map(r => `<path d="M60,${450 + r * 420} H${W - 60}" stroke="${C.goldTan}" stroke-width="12"/>`).join('') +
    [...Array(12)].map((_, i) => `<g transform="translate(${130 + (i % 6) * 164},${480 + (i / 6 | 0) * 420})"><g data-t="c7+${(i * .1).toFixed(1)}" data-k="drop" data-d=".3">${coveredLehengaSVG(...COV[i % 6], .5)}</g></g>`).join(''),
  html: pillH(540, 345, 'c7+0.2', '<span class="hl">12</span> lehenge, plastic cover mein', 'big'),
  cam: [1.06, 1], fy: 700
});

// ================= S5: the husband — "Bech de" =================
addScene('c8', 'c10', {
  svg: homeBG('n5', { noWindow: true, noShelf: true, noClock: true }) + almirahSVG('a5', 270, FLOOR + 62, .95) + bust('hu5', HUSB, 620, FLOOR + 20, 1.0) + bust('ni5', NISHA, 910, FLOOR + 50, .78) + counterSVG(FLOOR + 40),
  html: `<div class="bubble" style="left:600px;top:500px;width:380px" data-t="c9-0.05">"<span class="hl">Bech de.</span>"</div>`,
  init() { $('a5-inside').innerHTML = almariFull(3); tf($('a5-dL'), 0, 0, .13, 0, -150, 0, 1); tf($('a5-dR'), 0, 0, .13, 0, 150, 0, 1); },
  upd(t) {
    life('hu5', t, { pivot: 0, seed: 7, look: [-0.8, 0], mouth: t > T('c9') ? 'talk' : 'flat', brows: 'sure', tilt: -3, L: t > T('c8') + .5 ? [72, 2] : [9, -14], hL: 'point' });
    life('ni5', t, { pivot: 0, look: [-0.8, -0.2], mouth: 'o', brows: 'worry', tilt: 4 });
  }
});

// ================= S6: online — a ₹25,000 lehenga, offer ₹3,000 =================
addScene('c10', 'c13', {
  svg: homeBG('n6', { noWindow: true, noShelf: true, noClock: true }) + bust('ni6', NISHA, 270, FLOOR + 30, .95) + counterSVG() +
    at(730, 820, phoneSVG('n6-ph', 0, 0, 560, 1000,
      `<rect x="-264" y="-468" width="528" height="84" fill="${C.tealDark}"/><text x="-230" y="-414" font-family="Inter" font-weight="800" font-size="32" fill="#fff">Sell</text>` +
      `<rect x="-240" y="-360" width="480" height="420" rx="18" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><g transform="translate(0,-210) scale(.55)">${lehengaHangerSVG('', { c: C.lehenga, d: C.lehengaDark })}</g>` +
      `<text x="-220" y="10" font-family="Inter" font-weight="900" font-size="40" fill="#141110">₹25,000</text>` +
      `<g data-t="c11+0.3" data-k="slideL"><rect x="-240" y="110" width="400" height="90" rx="24" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><text x="-216" y="168" font-family="Inter" font-weight="700" font-size="30" fill="#141110">Offer dun?</text></g>` +
      `<g data-t="c12" data-k="slideL"><rect x="-240" y="230" width="400" height="100" rx="24" fill="#FBE7E7" stroke="#B23B3B" stroke-width="4"/><text x="-216" y="296" font-family="Inter" font-weight="900" font-size="44" fill="#B23B3B">₹3,000</text></g>`), .78),
  html: pillH(540, 352, 'c12', '₹25,000 → <span class="hl">₹3,000</span> 😳', 'big'),
  upd(t) { const sh = t > T('c12'); life('ni6', t, { pivot: 0, look: [0.8, 0.1], mouth: sh ? 'o' : 'smile', brows: sh ? 'worry' : 'up', sweat: sh ? 1 : 0, tilt: sh ? -6 : 3, R: [70, 4], hR: 'point', y: sh ? -6 : 0 }); }
});

// ================= S7: the maths — over ₹2 lakh loss =================
addScene('c13', 'c15', {
  svg: homeBG('n7', { night: true, noWindow: true, noShelf: true, noClock: true, noPlant: true }) + at(540, 860, ledgerSVG(), 2.0, -3) +
    `<g transform="translate(540,860) rotate(-3)"><g data-t="c13+0.2" data-k="fade"><text x="-430" y="-10" font-family="Inter" font-weight="800" font-size="40" fill="#3B2418">Maal: ₹2,50,000</text></g>` +
    `<g data-t="c13+1.0" data-k="fade"><text x="-430" y="60" font-family="Inter" font-weight="800" font-size="40" fill="#3B2418">Bikega: ₹30,000</text></g>` +
    `<g data-t="c14+0.4" data-k="fade"><text x="40" y="40" font-family="Inter" font-weight="900" font-size="52" fill="${C.red}">Loss:</text><text x="40" y="110" font-family="Inter" font-weight="900" font-size="52" fill="${C.red}">₹2,20,000</text></g></g>`,
  html: `<div class="title" style="top:470px" data-t="c14">₹2 lakh+ <span class="g">LOSS</span></div>`,
  cam: [1, 1.06], fy: 860
});

// ================= S8: Rich Dad Poor Dad — a line remembered =================
addScene('c15', 'c17', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('n8-r', 540, 860, .14, C.gold) +
    `<g transform="translate(470,900)"><g data-t="c15+0.1">${plainBookSVG(['RICH DAD', 'POOR DAD'])}</g></g>` + `<g transform="translate(790,640)"><g data-t="c16+0.1">${at(0, 0, ideaBulbSVG(), .7)}</g></g>`,
  html: pillH(540, 1230, 'c16', 'Ek <span class="hl">line</span> yaad aayi', 'gold'),
  tin: .3, trans: 'zoom',
  upd(t) { tf($('n8-r'), 540, 860, 1, t * 6); }
});

// ================= S9: asset puts money in your pocket, expense takes it out =================
addScene('c17', 'c19', {
  svg: splitSVG('n9', `<rect width="540" height="${H}" fill="#E3F3EA"/>` + at(270, 960, pocketSVG()) + [0, 1, 2].map(i => wrap('n9-a' + i, coinSVG(0, 0, 36))).join(''),
    `<rect x="540" width="540" height="${H}" fill="#FBE7E7"/>` + at(810, 960, pocketSVG()) + [0, 1, 2].map(i => wrap('n9-b' + i, coinSVG(0, 0, 36))).join('')),
  html: pillH(270, 560, 'c17+0.2', '<span class="hl">Asset</span>', 'green big') + pillH(810, 560, 'c18', '<span class="hl">Kharcha</span>', 'maroon big') +
    `<div class="title" style="top:390px;font-size:60px">Paisa <span class="g">andar</span> vs <span class="g">bahar</span></div>`,
  upd(t) {
    for (let i = 0; i < 3; i++) {
      const a = ((t - T('c17') - i * .45) % 1.35) / 1.1; tf($('n9-a' + i), 270 + (i - 1) * 50, lerp(640, 900, E.in(clamp(a))), 1); op($('n9-a' + i), t > T('c17') && a > 0 && a < 1 ? 1 : 0);
      const b = ((t - T('c18') - i * .45) % 1.35) / 1.1; tf($('n9-b' + i), 810 + (i - 1) * 50 + E.out(clamp(b)) * (i - 1) * 120, lerp(900, 640, E.out(clamp(b))), 1); op($('n9-b' + i), t > T('c18') && b > 0 && b < 1 ? 1 : 0);
    }
  }
});

// ================= S10: the problem wasn't the lehenga, it was the way of seeing it =================
addScene('c19', 'c21', {
  svg: homeBG('n10', { noWindow: true, noShelf: true, noClock: true }) + `<circle cx="300" cy="820" r="300" fill="url(#glow)"/>` + at(300, 760, lehengaHangerSVG('n10-lh', {}, 1.0)) +
    `<g transform="translate(880,600)"><g data-t="c20">${at(0, 0, ideaBulbSVG(), .55)}</g></g>` + bust('ni10', NISHA, 720, FLOOR + 20, 1.0) + counterSVG(),
  html: `<div class="title" style="top:410px" data-t="c20">Problem: <span class="g">nazariya</span></div>`,
  upd(t) { const idea = t > T('c20'); life('ni10', t, { pivot: 0, look: idea ? [-0.6, -0.5] : [-0.8, 0], mouth: idea ? 'big' : 'flat', brows: idea ? 'up' : 'sure', tilt: idea ? 5 : -5, R: idea ? IDEA : THINK, hR: idea ? 'point' : 'fist', y: hop(t, T('c20'), 14) }); }
});

// ================= S11: three things — 1: list them for rent instead of selling =================
const rentCard = (x, y, c, d, i) => `<g transform="translate(${x},${y})"><g data-t="c23+${(i * .2).toFixed(1)}" data-k="rise"><rect x="-112" y="-140" width="224" height="280" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-100" y="-128" width="200" height="180" rx="10" fill="${C.cream}"/><g transform="translate(0,-56) scale(.4)">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan })}</g><rect x="-96" y="80" width="120" height="36" rx="18" fill="#E3F3EA"/><text x="-36" y="106" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="#1F7A4D">Rent pe</text></g></g>`;
addScene('c21', 'c24', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><circle cx="540" cy="830" r="480" fill="url(#glow)"/>` +
    at(540, 830, phoneSVG('n11-ph', 0, 0, 560, 1000, arHeader() + rentCard(-125, -170, C.lehenga, C.lehengaDark, 0) + rentCard(125, -170, C.pink, C.pinkDark, 1) + rentCard(-125, 150, C.emerald, C.emeraldDark, 2) + rentCard(125, 150, C.teal, C.tealDark, 3) +
      `<g data-t="c22+0.2"><path d="M-200,380 H200" stroke="${C.red}" stroke-width="0"/><rect x="-170" y="340" width="340" height="70" rx="35" fill="#FBE7E7"/><text x="0" y="386" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#B23B3B" text-decoration="line-through">Bechna</text></g>`), .85),
  html: `<div class="title" style="top:410px" data-t="c21" data-out="c22-0.1"><span class="g">3</span> kaam</div>` + stepPill(1, 'Bechna nahi, <span class="hl">rent</span>', 'c22'),
  cam: [1, 1.03], fy: 830
});

// ================= S12: 2 — a price per rental; nearby people find and book =================
addScene('c24', 'c28', {
  svg: homeBG('n12', { noWindow: true, noShelf: true, noClock: true }) + `<circle cx="320" cy="820" r="300" fill="url(#glow)"/>` + at(320, 740, lehengaHangerSVG('n12-lh', { c: C.pink, d: C.pinkDark, dupatta: '#F4B9C8' }, 1.0)) +
    priceTag('n12-t', '₹2,000-2,500', 470, 560, 'c25', { fs: 32, swing: 10 }) + bust('ni12', NISHA, 800, FLOOR + 20, .95) + counterSVG() +
    `<g transform="translate(540,1040)"><g data-t="c26+0.6" data-k="rise">${toastSVG('New booking ✓', 460)}</g></g>` + `<g transform="translate(540,1150)"><g data-t="c27+0.2" data-k="rise">${toastSVG('New booking ✓', 460)}</g></g>`,
  html: stepPill(2, 'Price per <span class="hl">rental</span>', 'c24'),
  upd(t) { life('ni12', t, { pivot: 0, look: [-0.8, -0.2], mouth: t > T('c26') ? 'grin' : 'smile', brows: 'up', tilt: -3, L: t > T('c25') && t < T('c26') ? [72, 2] : CLASP, R: CLASP, hL: 'point' }); }
});

// ================= S13: 3 — dry clean after every rental =================
addScene('c28', 'c30', {
  svg: `<rect width="${W}" height="${H}" fill="#E8F2F6"/><circle cx="540" cy="820" r="420" fill="url(#glow)"/>` + at(540, 780, lehengaHangerSVG('n13-lh', {}, 1.15)) +
    `<g transform="translate(250,1020)"><g data-t="c28+0.3">${at(0, 0, dryCleanIcon(), .9)}</g></g>` +
    [[380, 600], [720, 560], [760, 900], [330, 880], [560, 1060]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c29+${(i * .15).toFixed(2)}" data-bob="8" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join(''),
  html: stepPill(3, 'Har rental ke baad <span class="hl">dry clean</span>', 'c28') + pillH(640, 1160, 'c29+0.3', 'Naya jaisa ✓', 'green'),
  cam: [1, 1.05], fy: 820
});

// ================= S14: this season every lehenga earned back part of its cost — and the almirah stayed full =================
addScene('c30', 'c33', {
  svg: homeBG('n14', { noWindow: true, noShelf: true, noClock: true }) + at(280, 900, coinJarSVG('n14-j', 12, ''), 1.05) + almirahSVG('a14', 800, FLOOR + 62, .9) + bust('ni14', NISHA, 540, FLOOR + 80, .78) + counterSVG(FLOOR + 60),
  html: pillH(540, 352, 'c30+0.3', 'Har season <span class="hl">kamaai</span> 💰', 'big', 'c32-0.1') + pillH(540, 352, 'c32', 'Almari <span class="hl">khaali nahi</span>', 'big'),
  init() { $('a14-inside').innerHTML = almariFull(3); },
  upd(t) { jarFill('n14-j', 12, t, T('c31'), 1.4); openDoors('a14', E.io(clamp((t - T('c32')) / .5))); life('ni14', t, { pivot: 0, look: [t > T('c32') ? 0.8 : -0.8, -0.2], mouth: 'grin', brows: 'up', tilt: 4, L: CLASP, R: CLASP, blush: .4 }); }
});

// ================= S15: the line to remember =================
addScene('c33', 'c35', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('n15-r', 540, 880, .12, C.goldTan) + `<rect x="0" y="${FLOOR + 80}" width="${W}" height="${H}" fill="#F3E3C0"/>` + stand('ni15', NISHA, 540, 1000, .82),
  html: `<div class="title" style="top:380px;font-size:70px" data-t="c33">Outfit <span class="g">purana</span> nahi hota…</div>` +
    `<div class="title" style="top:500px;font-size:50px" data-t="c34">band almari mein <span class="g">bekaar</span> hota hai</div>`,
  tin: .35, trans: 'fade', cam: [1, 1.04],
  upd(t) { tf($('n15-r'), 540, 880, 1, t * 5); const o = E.io(clamp((t - T('c34')) / .5)); life('ni15', t, { mouth: 'grin', brows: 'sure', tilt: 3, sway: 2, L: [lerp(9, 62, o), lerp(-14, -36, o)], R: [lerp(9, 62, o), lerp(-14, -36, o)], hL: o > .5 ? 'open' : 'fist', hR: o > .5 ? 'open' : 'fist' }); }
});

// ================= S16: Comment RENT + follow — Rent. Earn. Repeat. =================
addScene('c35', 9999, {
  svg: homeBG('n16', { noWindow: true, noShelf: true, noClock: true }) + rosettes('n16-r', 540, 780, .08, C.goldTan) + bust('ni16', NISHA, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: `<div class="pill big" style="left:540px;top:380px" data-t="c36" data-out="c37+0.2">Comment <span class="hl">RENT</span> 👇</div>` +
    `<div class="follow" style="left:540px;top:380px" data-t="c37+0.3"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="n16-b"><span id="n16-f">Follow</span></span></div>` +
    `<div class="title" style="top:560px;font-size:66px" data-t="c38">Rent. <span class="g">Earn.</span> Repeat.</div>`,
  noWm: true,
  upd(t) {
    tf($('n16-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c37')) / .4);
    life('ni16', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c37'))[0], E.io(w)), lerp(-14, WAVE(t, T('c37'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist', L: t > T('c36') && t < T('c37') ? [130, 10] : [9, -14], hL: 'point' });
    const tp = T('c38') + .2, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('n16-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('n16-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
