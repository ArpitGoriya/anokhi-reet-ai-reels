// ===== Darzi ne kaha: "Kal pakka!" (comic panels + a ticking clock; Prachi narrates) =====
// Open loops: "darzi ka twist end mein" (paid off by the tiny blouse) and "darzi abhi baaki tha". App hidden until the end.
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const feet = sc => FLOOR + 40 - 372 * sc;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const burst = (x, y, at, txt, fill, r = 120, fs = 50, rot = -8, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>${burstSVG(txt, fill, r, fs)}</g></g>`;
const bub = (x, y, w, at, out, html, fs = 38) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const tick = (id, t, sp = 1) => { tf($(id + '-m'), 0, 0, 1, t * 360 * sp); tf($(id + '-h'), 0, 0, 1, t * 30 * sp); };
const PM = PRACHI.morning, PL_ = PRACHI.lehenga, PH = PRACHI.home;
const SAY = (x, y, w, txt, fs = 40) => `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="-58" width="${w}" height="116" rx="40" fill="#fff" stroke="#1A1A1A" stroke-width="6"/><path d="M${-w / 2 + 40},40 L${-w / 2 - 10},80 L${-w / 2 + 90},50" fill="#fff" stroke="#1A1A1A" stroke-width="6" stroke-linejoin="round"/><rect x="${-w / 2 + 30}" y="30" width="80" height="24" fill="#fff"/>` +
  `<text y="${fs * .36}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="#1A1A1A">${txt}</text></g>`;

// ================= S1 hook: 6 hours to the wedding — the darzi's phone is off =================
addScene(0, 'c4', {
  svg: homeBG('s1', { noClock: true, noShelf: true }) + `<g transform="translate(800,760)">${countdownClockSVG('s1c', '6 GHANTE BAAKI', 130)}</g>` +
    stand('s1p', PM, 340, feet(.7), .7) + `<g id="s1ph">${phoneBackSVG(.9)}</g>` +
    `<g transform="translate(540,1215)"><g data-t="c3" data-k="pop"><rect x="-380" y="-50" width="760" height="100" rx="24" fill="#fff" stroke="${OL}" stroke-width="5"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="${C.text}">📵 Darzi Rameshbhai: <tspan fill="#D9363E">switched off ❌</tspan></text></g></g>`,
  html: `<div class="title" style="top:420px;font-size:64px" data-t="-1">Shaadi: <span class="g">6 ghante</span> baad ⏰<br>Darzi: phone <span class="g">BAND</span> 📵</div>`,
  cam: [1, 1.04], fy: 900,
  upd(t) {
    tick('s1c', t, 1.4); tf($('s1c'), Math.sin(t * 30) * (t % 1 < .25 ? 4 : 0), 0, 1);
    const A = life('s1p', t, { mouth: t > T('c3') ? 'shock' : 'worry', brows: 'worry', look: [.8, -.2], sweat: .9, tilt: -6, R: [110, 70], hR: 'fist', L: t > T('c3') ? [60, -100] : [9, -14], hL: 'open', y: t > T('c3') ? hop(t, T('c3'), 20) : 0, seed: 2 });
    atHand('s1ph', 's1p', A.hr, 10, -10, 8);
  }
});

// ================= S2 the promise: Prachi pulls her hair — BOING! — the darzi's twist comes at the end =================
addScene('c4', 'c6', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s2p', 40, 420, 1000, 880, '#F4A0B8', bust('s2pr', PM, 540, 1380, 1.05)) +
    burst(830, 600, 'c4+0.3', 'BOING!', '#F7D23A', 120, 50, 10),
  html: pillH(540, 352, 'c4', 'Darzi ka twist <span class="hl">end mein</span> 😂'),
  noWm: true, cam: [1, 1.04], fy: 860,
  upd(t) { life('s2pr', t, { pivot: 0, mouth: t > T('c5') ? 'grin' : 'worry', brows: 'worry', look: [0, 0], tilt: Math.sin(t * 6) * 6, L: [165, -70], R: [165, -70], hL: 'open', hR: 'open', seed: 2 }); }
});

// ================= S3 flashback: three panels at the tailor's — "Kal pakka!" × 3 =================
const KP = [['15 DIN PEHLE', 'Kal pakka!', 'c6', 400, '#8FD3E8'], ['7 DIN PEHLE', 'Bas kal pakka, beta!', 'c7', 710, '#B8E08F'], ['1 DIN PEHLE', 'Kal subah pakka! 😌', 'c8', 1020, '#F7D23A']];
addScene('c6', 'c9', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` +
    KP.map(([chip, say, at, y, bg], i) => `<g data-t="${at}" data-k="pop">${comicPanel('s3p' + i, 40, y, 1000, 280, bg, bust('s3r' + i, RAMESH, 200, y + 380, .58))}` +
      `<g transform="translate(870,${y + 42})"><rect x="-140" y="-26" width="280" height="52" rx="12" fill="#fff" stroke="#1A1A1A" stroke-width="5"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${C.red}">${chip}</text></g>` +
      SAY(640, y + 160, i === 0 ? 360 : 500, `"${say}"`, 40) +
      `<g transform="translate(${960 - i * 20},${y + 220}) rotate(10)"><g data-t="${at}+0.5" data-k="pop">${burstSVG('DING!', '#fff', 56 + i * 16, 26 + i * 6)}</g></g></g>`).join(''),
  html: pillH(540, 352, 'c8+0.4', '"Kal pakka" <span class="hl">× 3</span> 🙄'),
  noWm: true, cam: [1, 1.02], fy: 860,
  upd(t) { KP.forEach(([, , at], i) => life('s3r' + i, t, { pivot: 0, mouth: t > T(at) && t < T(at) + 1.2 ? talkMouth(t, true) : 'grin', brows: 'up', look: [.6, 0], tilt: 4 + i * 2, R: [70 + i * 20, -60], hR: i === 2 ? 'open' : 'thumb', L: [9, -14], seed: i + 1 })); }
});

// ================= S4 the shop: shutter down — "Shaadi mein gaye hain." — Mummy calls =================
addScene('c9', 'c13', {
  svg: tailorShopFrontSVG('s4') + `<g transform="translate(630,800)"><g data-t="c10+0.2" data-k="drop" data-swing="6">${handBoardSVG()}</g></g>` +
    `<g id="s4w">${stand('s4p', PM, 0, 0, .74)}</g><g id="s4ph">${phoneBackSVG(.85)}</g>`,
  html: pillH(540, 352, 'c11', 'Darzi khud <span class="hl">SHAADI</span> mein 😭') +
    bub(600, 1090, 600, 'c12', '', '📱 Mummy: "<span class="hl">Prachi!</span> Photographer aa gaya hai!"', 36),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const g = glide(t, T('c9') - .1, 1.0, -120, 170, 16), y0 = feet(.74);
    tf($('s4w'), g[0], y0 + g[1], 1); PL['s4p'].x = g[0]; PL['s4p'].y = y0 + g[1];
    const call = t > T('c12');
    const A = life('s4p', t, { mouth: t > T('c11') ? 'shock' : 'o', brows: 'worry', look: call ? [.4, -.3] : [.9, -.4], sweat: t > T('c11') ? .9 : 0, R: call ? [110, 70] : [40, -20], hR: 'fist', L: [9, -14], seed: 2 });
    atHand('s4ph', 's4p', A.hr, 10, -10, 8); op($('s4ph'), call ? 1 : 0); if (call) tf($('s4ph').firstChild, Math.sin(t * 40) * 4, 0, 1);
  }
});

// ================= S5 the steps: 3 hours left… then an idea 💡 =================
addScene('c13', 'c16', {
  svg: tailorShopFrontSVG('s5') + `<g transform="translate(540,800)">${handBoardSVG()}</g>` + `<rect width="${W}" height="${H}" fill="#1A1A1A" opacity=".18"/>` +
    bust('s5p', PM, 400, FLOOR + 120, .8) + `<rect x="200" y="${FLOOR + 20}" width="420" height="70" fill="#BDB7AD" stroke="${OL}" stroke-width="4"/><rect x="160" y="${FLOOR + 80}" width="500" height="70" fill="#B0AAA0" stroke="${OL}" stroke-width="4"/>` +
    `<g transform="translate(830,1000)">${countdownClockSVG('s5c', '3 GHANTE', 110)}</g>` + `<g transform="translate(400,560)"><g data-t="c15+0.5" data-k="pop">${ideaBulbSVG()}</g></g>`,
  html: pillH(540, 352, 'c13', '3 ghante mein <span class="hl">naya outfit?</span> 🤔'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    tick('s5c', t, 2.2);
    const idea = t > T('c15') + .5;
    life('s5p', t, { pivot: 0, mouth: idea ? 'big' : 'sad', brows: idea ? 'up' : 'worry', look: idea ? [0, -.8] : [0, .5], tilt: idea ? 0 : -8, R: idea ? [120, -60] : CLASP, hR: idea ? 'point' : 'fist', L: CLASP, y: idea ? hop(t, T('c15') + .5, 16) : 0, seed: 2 });
  }
});

// ================= S6a her phone from the back: area, wedding, budget (the app stays hidden) =================
addScene('c16', 'c19', {
  svg: homeBG('s6', { noShelf: true, noClock: true }) + `<circle cx="540" cy="860" r="420" fill="url(#glow)"/>` + bust('s6p', PM, 540, 1940, 1.3) + `<g id="s6ph">${phoneBackSVG(1.5)}</g>`,
  html: pillH(220, 640, 'c16+0.3', '📍 Area', 'gold') + pillH(220, 770, 'c17', '🎉 Wedding', 'gold') + pillH(860, 700, 'c17+0.6', '💰 Budget', 'gold') +
    pillH(540, 352, 'c16', '📍 Area → 👗 <span class="hl">Pasand</span>'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const A = life('s6p', t, { pivot: 0, mouth: t > T('c18') ? 'grin' : 'smile', brows: 'up', look: [0, .5], R: [100, -90], hR: 'fist', L: [9, -14], seed: 2 });
    atHand('s6ph', 's6p', A.hr, -20, -130, 0);
  }
});

// ================= S6b the trial at a nearby shop: the peach lehenga fits — 1 ghante mein READY ✅ =================
addScene('c19', 'c21', {
  svg: rentalShopBG('s6b', { mirrorY: 760 }) + stand('s6bp', PL_, 760, feet(.78), .78) + bust('s6bo', SHITAL, 200, FLOOR + 160, .7) + counterSVG(FLOOR + 180) +
    `<g transform="translate(240,560)"><g data-t="c20" data-k="pop">${countdownClockSVG('s6bc', '1 GHANTA ✅', 90)}</g></g>` +
    `<g transform="translate(540,500)"><g data-t="c19+0.2" data-k="pop" data-bob="8">${mapPinSVG(C.red, 40)}<text x="0" y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.text}">Paas ki dukaan</text></g></g>`,
  html: pillH(540, 352, 'c19', '👗 Pasand → <span class="hl">✅ Trial</span>', '', 'c20-0.05') + pillH(540, 352, 'c20', '1 ghante mein <span class="hl">READY!</span> 🎉'),
  cam: [1, 1.03], fy: 880,
  upd(t) {
    tick('s6bc', t, .6);
    life('s6bp', t, { mouth: 'grin', brows: 'up', look: [-.9, 0], tilt: -4, R: [9, -14], L: [100, -40], hL: 'open', sway: 3, y: hop(t, T('c20'), 14), seed: 2 });
    life('s6bo', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [.9, 0], L: [9, -14], R: [9, -14], seed: 3 });
  }
});

// ================= S7 the wedding: the emergency outfit beats the planned one =================
addScene('c21', 'c25', {
  svg: weddingHallBG('s7') + stand('s7b', BRIDE, 700, feet(.72), .72) + stand('s7p', PL_, 380, feet(.74), .74) + flash('s7fl') +
    burst(880, 560, 'c21+0.4', 'CLICK! 📸', '#fff', 100, 38, 10) + bust('s7m', MAUSI, 880, 1940, .9),
  html: bub(560, 560, 640, 'c23', '', '"Prachi, ye toh <span class="hl">plan wale se bhi</span> accha hai!" 😍', 36) + pillH(540, 352, 'c21', 'Emergency outfit <span class="hl">&gt;</span> Plan wala 😍'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const f = P(t, T('c21') + .4, .12); op($('s7fl'), f > 0 && f < 1 ? .8 * (1 - f) : 0);
    life('s7p', t, { mouth: 'grin', brows: 'up', look: [.3, -.1], tilt: 5, R: [9, -14], L: [9, -14], blush: t > T('c23') ? .7 : 0, sway: 2, seed: 2 });
    life('s7b', t, { mouth: 'smile', brows: 'up', look: [-.6, 0], tilt: -3, R: [9, -14], L: [9, -14], seed: 5 });
    life('s7m', t, { pivot: 0, mouth: t > T('c23') ? talkMouth(t, true) : 'o', brows: 'up', look: [-.9, -.3], R: [9, -14], L: t > T('c23') ? [110, -60] : [9, -14], hL: 'open', seed: 1 });
  }
});

// ================= S8 after the wedding: relaxed… but the darzi is still to come =================
addScene('c25', 'c27', {
  svg: homeBG('s8', { night: true, lamp: true, noShelf: true, noClock: true }) + sofaSVG(540, 1150) + bust('s8p', PH, 540, 1260, .92) +
    `<rect x="190" y="1230" width="700" height="44" rx="12" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/><rect x="220" y="1272" width="640" height="130" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>`,
  html: pillH(540, 352, 'c26', 'Darzi <span class="hl">abhi baaki</span> hai 👀'),
  cam: [1, 1.04], fy: 950,
  upd(t) { const s = t > T('c26') + .3; life('s8p', t, { pivot: 0, mouth: s ? 'o' : 'smile', brows: s ? 'up' : 'norm', closed: !s, look: s ? [.9, 0] : [0, 0], tilt: s ? 6 : -4, R: [160, -150], L: [160, -150], hR: 'open', hL: 'open', seed: 2 }); }
});

// ================= S9 two days later: the darzi at the door, proudly — the blouse is two sizes too small =================
addScene('c27', 'c29', {
  svg: homeBG('s9', { noWindow: true, noShelf: true, noClock: true }) + `<rect x="620" y="420" width="380" height="${FLOOR - 420}" fill="#F7EBD7" stroke="${OL}" stroke-width="${OW}"/><rect x="620" y="420" width="380" height="${FLOOR - 420}" fill="none" stroke="${C.woodDark}" stroke-width="22"/>` +
    stand('s9r', RAMESH, 810, feet(.72), .72) + stand('s9p', PH, 300, feet(.74), .74) + `<g id="s9bl"><g transform="scale(.42)">${blouseIcon()}</g></g>` +
    burst(300, 560, 'c28+0.6', 'FAIL 😂', '#F7D23A', 120, 48, -8),
  html: pillH(540, 352, 'c27', '<span class="hl">2 din BAAD</span> 🔔', 'gold', 'c28-0.05') + pillH(540, 352, 'c28', 'Shaadi ke 2 din BAAD… aur <span class="hl">size bhi galat</span> 😂') +
    bub(780, 560, 460, 'c27', 'c28+0.5', '"Beta, blouse ready hai! Bola tha na… <span class="hl">pakka!</span>"', 34),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const give = t > T('c28') + .3;
    const R = life('s9r', t, { mouth: t < T('c28') + .4 ? talkMouth(t, true) : 'grin', brows: 'up', look: [-.9, 0], tilt: 4, R: [9, -14], L: give ? [9, -14] : [110, -60], hL: 'fist', seed: 1 });
    const P_ = life('s9p', t, { mouth: give ? 'shock' : 'o', brows: 'up', look: give ? [0, .6] : [.9, -.1], R: give ? [70, -100] : [9, -14], L: give ? [70, -100] : [9, -14], hR: 'fist', hL: 'fist', seed: 2 });
    if (give) { const p = toScene('s9p', [0, -170]); tf($('s9bl'), p[0], p[1], 1); } else atHand('s9bl', 's9r', R.hl, 0, 30, 0);
  }
});

// ================= S10a the punchline: "kal pakka… kabhi pakka nahi hota" — backup: =================
addScene('c29', 'c32', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s10p', 40, 420, 1000, 880, '#F4A0B8', bust('s10pr', PH, 540, 1360, 1.0)) +
    `<g id="s10bl"><g transform="scale(.5)">${blouseIcon()}</g></g><g id="s10ph">${phoneBackSVG(1.1)}</g>`,
  html: pillH(540, 352, 'c29', 'Darzi ka "kal" <span class="hl">≠ pakka</span> 😂'),
  noWm: true, cam: [1, 1.04], fy: 860,
  upd(t) {
    const A = life('s10pr', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'up', look: [0, 0], tilt: 4, L: [120, -60], hL: 'fist', R: t > T('c31') ? [120, -70] : [9, -14], hR: 'fist', seed: 2 });
    atHand('s10bl', 's10pr', A.hl, -20, -60, -8); atHand('s10ph', 's10pr', A.hr, 20, -110, 6); op($('s10ph'), t > T('c31') ? 1 : 0);
  }
});

// ================= S10b the reveal + CTA: Anokhi Reet — Comment OUTFIT =================
addScene('c32', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s11r', 540, 800, .16, C.gold) + `<circle cx="540" cy="780" r="420" fill="url(#glow)" opacity=".5"/>` +
    bust('s11p', PL_, 300, 1940, 1.15) + `<g id="s11ph"><g transform="scale(.46)">${phoneSVG('s11pp', 0, 0, 560, 1000, arFeedScreen('s11f'))}</g></g>` +
    [[760, 560], [960, 900], [620, 1000]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c32+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(28, C.gold)}</g></g>`).join(''),
  html: `<img id="s11wm" style="position:absolute;left:310px;top:190px;width:460px" src="">` + pillH(540, 330, 'c32+0.3', 'anokhireet.in', 'gold') +
    pillH(540, 450, 'c32', '<span class="hl">Anokhi Reet</span> ✨', 'big') + pillH(540, 570, 'c33', 'Comment <span class="hl">OUTFIT</span> 👇', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 820, capY: 1000,
  init() { $('s11wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s11r'), 540, 800, 1, t * 5); op($('s11f-q'), 0); op($('s11f-real'), 1); tf($('s11f-feed'), 0, -((t * 200) % 1200));
    const A = life('s11p', t, { pivot: 0, mouth: t > T('c33') + 1 ? 'grin' : talkMouth(t, true), brows: 'up', look: [.6, -.3], tilt: 4, R: [130, -70], hR: 'fist', L: [9, -14], wink: t > T('c33') + 1 && t < T('c33') + 1.5, seed: 2 });
    atHand('s11ph', 's11p', A.hr, 50, -180, 6);
  }
});
