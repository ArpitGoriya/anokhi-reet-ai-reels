// ===== Last minute invitation: Aarti's 48 hours, timed to the voice (see captions.js) =====
const AS = AARTI.sangeet, AO = AARTI.office, AH = dress(AARTI.home, { skirt: { c: '#4A5A6A', d: '#3A4858', b: C.goldTan, w: 170 } });
const DH = DIMPLE.home, DS = DIMPLE.sangeet;
const F1 = SAREE(GUEST_W1, '#7A4FA0', '#5D3A7E'), F2 = SAREE(CUSTOMER_W, '#F4B9C8', C.pinkDark), F3 = SAREE(GUEST_W2, '#E07B39', '#B95F25');
// countdown: 48 h on Thursday night → 24 h at Friday lunch → 0 at the sangeet
const HRS = t => KF(t, [[T('c8'), 48], [T('c14'), 47.95], [T('c18'), 47.3], [T('c29e'), 46.9], [T('c30') - .01, 46.9], [T('c30'), 24], [T('c44'), 23.4], [T('c44') + 1.3, 0]], E.lin);
const DANCE = (t, k = 1) => ({ L: [lerp(9, 150 + wave(t, .9) * 18, k), lerp(-14, -20 + wave(t, .9, .3) * 30, k)], R: [lerp(9, 150 - wave(t, .9) * 18, k), lerp(-14, -20 - wave(t, .9, .3) * 30, k)], hL: 'open', hR: 'open' });
const EAR = [123, 95], HEAD = [165, 40], HOLD = [6, -112], SHOW = [128, -36];

// ================= S1 cold open: the star of the sangeet =================
addScene(0, 'c4', {
  svg: weddingBG() + stand('f1a', F1, 150, 990, .6) + stand('f1b', F2, 930, 990, .6) + `<g id="s1-a">${stand('a1', AS, 0, 0, .9)}</g>`,
  html: `<div class="title" style="top:410px" data-t="-1" data-out="c3-0.1">2 din pehle:<br>outfit <span class="g">NAHI</span> 😱</div>` +
    pillH(540, 420, 'c3', 'Aaj: <span class="hl">sangeet ki star</span> ⭐'),
  cam: [1, 1.05], fy: 900,
  upd(t) {
    tf($('s1-a'), 540 + Math.sin(t * 2.2) * 30, 930 + hop(t, Math.floor(t / .9) * .9, 14, .4), 1, Math.sin(t * 2.2) * 3);
    life('a1', t, Object.assign({ mouth: 'grin', brows: 'up', seed: 1 }, DANCE(t)));
    life('f1a', t, { mouth: 'o', brows: 'up', look: [.8, 0], L: CLASP, R: CLASP, seed: 2 });
    life('f1b', t, { mouth: 'o', brows: 'up', look: [-.8, 0], L: [70, -6], hL: 'point', seed: 3 });
  }
});

// ================= S1b: "Aarti! Ye outfit?" … "Kaise?" =================
addScene('c4', 'c7', {
  svg: weddingBG() + bust('f1c', CUSTOMER_W, 300, FLOOR + 150, 1.0) + bust('a1b', NOSKIRT(AS), 780, FLOOR + 150, 1.0) + counterSVG(FLOOR + 60, '#A1272C'),
  html: `<div class="bubble" style="left:540px;top:440px;width:860px" data-t="c4+0.05" data-out="c6-0.1">"Aarti! <span class="hl">Ye outfit?</span> Tu toh keh rahi thi kuch nahi hai!"</div>` +
    `<div class="title" style="top:430px" data-t="c6">Par <span class="g">KAISE?</span> 🤔</div>`,
  cam: [1, 1.05], fy: 880,
  upd(t) {
    life('f1c', t, { mouth: t < T('c6') ? 'talk' : 'o', brows: 'up', look: [.8, 0], L: [9, -14], R: [70, -6], hR: 'point', seed: 4 });
    const wink = t > T('c6') + .2 && t < T('c6') + .7;
    life('a1b', t, { mouth: 'shy', brows: 'sure', look: [-.4, 0], tilt: -4, wink, L: CLASP, R: CLASP, seed: 5 });
  }
});

// ================= S2a: rewind 48 hours =================
addScene('c7', 'c8', {
  svg: `<g id="s2-g">${weddingBG()}${stand('a2', AS, 540, 930, .9)}</g>` + streaksSVG('rw2'),
  html: `<div class="title" style="top:430px" data-t="c7">⏪ <span class="g">48 ghante</span> pehle…</div>`,
  cam: [1, 1.08], fy: 900,
  upd(t, lt, s) {
    streaks('rw2', t, s.a, s.b - s.a, -1);
    tf($('s2-g'), Math.sin(t * 40) * 14, 0, 1);
    life('a2', t, Object.assign({ mouth: 'grin', seed: 1 }, DANCE(-t * 3)));
  }
});

// ================= S2b: Thursday night, 10 pm, relaxing on the sofa =================
addScene('c8', 'c10', {
  svg: homeBG('s3', { night: true, noShelf: true, noPlant: true, noWindow: true, lamp: true, lampX: 880, clockX: 880 }) + bust('a3', NOSKIRT(AH), 520, FLOOR + 60, 1.1) + sofaSVG(540, FLOOR + 170),
  html: timerHTML('tm3', 'c8') + pillH(540, 420, 'c8+0.15', '<span class="hl">Thursday raat</span>, 10 baje 🌙'),
  cam: [1, 1.04], fy: 900,
  upd(t) { timerSet('tm3', HRS(t)); clockTick('s3-clk', (t - T('c8')) * .3, 600); life('a3', t, { pivot: 0, mouth: 'smile', closed: false, tilt: -8, lean: -3, L: CLASP, R: CLASP, look: [.3, -.4] }); }
});

// ================= S2c: the phone buzzes — "Saturday ko sangeet hai, aana zaroor!" =================
addScene('c10', 'c12', {
  svg: homeBG('s4', { night: true, noShelf: true, noPlant: true, noClock: true }) + `<rect width="${W}" height="${H}" fill="#1E1715" opacity=".35"/>` +
    `<g id="s4-ph">${phoneSVG('ph4', 0, 0, 520, 960, lockScreen('c11-0.1'))}</g><g id="s4-bz" transform="translate(540,840)">${buzzSVG(290, 300)}</g>`,
  html: timerHTML('tm4'),
  cam: [1, 1.04], fy: 840,
  upd(t) {
    timerSet('tm4', HRS(t));
    const ring = t < T('c11') + .4;
    tf($('s4-ph'), 540 + (ring ? Math.sin(t * 70) * 6 : 0), 840, 1, ring ? Math.sin(t * 55) * 2 : 0);
    op($('s4-bz'), ring && Math.sin(t * 14) > -.3 ? 1 : 0);
  }
});

// ================= S2d: sangeet the day after tomorrow… outfit? Not yet =================
addScene('c12', 'c14', {
  svg: homeBG('s5', { night: true, noShelf: true, noPlant: true, noWindow: true, lamp: true, lampX: 880, clockX: 880 }) + bust('a5', NOSKIRT(AH), 540, FLOOR + 60, 1.15) + sofaSVG(540, FLOOR + 170) +
    `<g transform="translate(330,640)"><g data-t="c12+0.2" data-swing="8">${calendarSVG('s5-cal', 'SATURDAY', '💃')}</g></g>`,
  html: timerHTML('tm5') + pillH(540, 420, 'c13', 'Outfit? <span class="hl">Abhi tak nahi</span> 😱'),
  cam: [1, 1.06], fy: 860,
  upd(t) {
    timerSet('tm5', HRS(t)); clockTick('s5-clk', (t - T('c8')) * .3, 600);
    const shock = t > T('c13');
    life('a5', t, { pivot: 0, mouth: shock ? 'worry' : 'o', brows: shock ? 'worry' : 'up', sweat: shock ? clamp((t - T('c13')) / .3) : 0, look: [-.6, -.3], L: shock ? HEAD : CLASP, R: shock ? HEAD : CLASP, hL: 'open', hR: 'open' });
  }
});

// ================= S3a: Friday is full of office =================
addScene('c14', 'c16', {
  svg: `<rect width="${W}" height="${H}" fill="${C.wall}"/>` + rosettes('s6-r', 540, 860, .1, C.goldTan) + `<g transform="translate(540,900)">${dayCardSVG('day6')}</g>` +
    `<g transform="translate(900,440)"><g data-t="c15+0.1" data-swing="12">${clockSVG('s6-clk', 0, 0, 70)}</g></g>`,
  html: timerHTML('tm6') + pillH(540, 420, 'c15+0.15', '<span class="hl">Time nahi</span> ⏰'),
  cam: [1, 1.05], fy: 900,
  upd(t) { timerSet('tm6', HRS(t)); tf($('s6-r'), 540, 860, 1, t * 6); clockTick('s6-clk', t * 12, 0); }
});

// ================= S3b: the cupboard — everything already worn =================
addScene('c16', 'c18', {
  svg: homeBG('s7', { night: true, noShelf: true, noClock: true, noWindow: true, lamp: true, lampX: 560 }) + almirahSVG('a7', 760, FLOOR + 62, 1) + stand('a7p', AH, 290, 940, .92) +
    [[680, 560, -8], [840, 600, 6], [760, 760, -4]].map(([x, y, r], i) => `<g transform="translate(${x},${y}) rotate(${r})"><g data-t="c16+${(.6 + i * .35).toFixed(2)}">${priceTagSVG('s7-t' + i, 'pehna tha…', 0, 0, { fs: 30 })}</g></g>`).join(''),
  html: timerHTML('tm7') + pillH(540, 420, 'c17', '<span class="hl">Outfit nahi</span> 👗'),
  cam: [1, 1.04], fy: 900,
  init() {
    const ins = [[C.pink, C.pinkDark], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E']].map(([c, d], i) => `<g transform="translate(${-90 + i * 90},-330)">${lehengaHangerSVG('s7-in' + i, { c, d }, .5)}</g>`).join('');
    $('a7-inside').innerHTML = ins;
  },
  upd(t) {
    timerSet('tm7', HRS(t));
    const open = E.io(clamp((t - T('c16') - .1) / .5));
    tf($('a7-dL'), 0, 0, lerp(1, .13, open), 0, -150, 0, 1); tf($('a7-dR'), 0, 0, lerp(1, .13, open), 0, 150, 0, 1);
    const panic = t > T('c17');
    life('a7p', t, { mouth: panic ? 'worry' : 'flat', brows: 'worry', look: [.8, -.2], sweat: panic ? 1 : 0, L: panic ? HEAD : [9, -14], R: panic ? HEAD : [40, -30], hL: 'open', hR: 'open', y: hop(t, T('c17'), 12) });
  }
});

// ================= S4a: Aarti calls her best friend Dimple =================
addScene('c18', 'c20', {
  svg: homeBG('s8', { night: true, noShelf: true, noPlant: true, noWindow: true, lamp: true, lampX: 880, clockX: 880 }) + bust('a8', NOSKIRT(AH), 540, FLOOR + 60, 1.15) + sofaSVG(540, FLOOR + 170) + `<g id="s8-ph">${phoneBackSVG(.8)}</g>`,
  html: timerHTML('tm8') + pillH(540, 420, 'c19', '📞 Calling <span class="hl">Dimple</span>…'),
  cam: [1, 1.05], fy: 860,
  upd(t) {
    timerSet('tm8', HRS(t)); clockTick('s8-clk', (t - T('c8')) * .3, 600);
    const { hr } = life('a8', t, { pivot: 0, mouth: 'worry', brows: 'worry', sweat: .8, look: [.5, 0], R: EAR, hR: 'fist', L: CLASP });
    const p = toScene('a8', hr); tf($('s8-ph'), p[0] - 10, p[1] - 30, 1, -20);
  }
});

// ================= S4b: split-screen video call — "area, budget, colour?" =================
const CALL = (id, aOpts, dOpts) => callPanelSVG(id + 'a', 340, 500, 'Aarti', homeBG(id + 'h', { night: true, noShelf: true, noPlant: true, noClock: true, noWindow: true }) + bust(id + 'A', NOSKIRT(AH), 540, 1010, .85), '#E5CDAE') +
  callPanelSVG(id + 'd', 870, 560, 'Dimple', `<rect x="0" y="870" width="${W}" height="560" fill="#F3E3C0"/>` + windowSVG(760, 920, 200, 230, { curtain: C.emerald }) + bust(id + 'D', NOSKIRT(DH), 520, 1540, .88) + `<g id="${id}-mug">${mugSVG()}</g>`, '#F3E3C0');
addScene('c20', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="#1E1715"/>` + CALL('v9'),
  html: timerHTML('tm9') +
    `<div class="bubble" style="left:540px;top:930px;width:860px" data-t="c21-0.05" data-out="c23-0.1">"Bas <span class="hl">3 cheezein</span> bata… area, budget, colour?"</div>` +
    `<div class="bubble" style="left:540px;top:420px;width:760px" data-t="c23+0.05">"Ahmedabad… <span class="hl">2,000 tak</span>… yellow?"</div>`,
  cam: [1, 1.02],
  upd(t) {
    timerSet('tm9', HRS(t));
    const ans = t > T('c23');
    life('v9A', t, { pivot: 0, mouth: ans ? talkMouth(t, true) : 'worry', brows: 'worry', sweat: .7, look: [0, .3], L: CLASP, R: ans ? [60, -60] : CLASP, hR: 'open' });
    const { hr } = life('v9D', t, { pivot: 0, mouth: t > T('c21') && t < T('c23') ? talkMouth(t, true) : 'smile', brows: 'sure', look: [0, -.2], L: CLASP, R: [40, -110], hR: 'fist', seed: 3 });
    const p = toScene('v9D', hr); tf($('v9-mug'), p[0] + 10, p[1] - 30, .9);
  }
});

// ================= S4c: Dimple taps her phone (screen hidden) — "Ho gaya." =================
addScene('c25', 'c29', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/>` + windowSVG(760, 420, 210, 250, { curtain: C.emerald }) + plantSVG(120, FLOOR + 40, 1.1) +
    bust('d10', NOSKIRT(DH), 540, FLOOR + 160, 1.2) + counterSVG(FLOOR + 40, C.woodLight) + `<g id="d10-ph">${phoneBackSVG(1.15)}</g>` +
    [0, 1, 2].map(i => `<g transform="translate(${470 + i * 70},${900 - i * 30})"><g data-t="c25+${(.3 + i * .35).toFixed(2)}" data-out="c25+${(.6 + i * .35).toFixed(2)}">${tapMark()}</g></g>`).join(''),
  html: timerHTML('tm10') + `<div class="bubble" style="left:540px;top:440px;width:880px" data-t="c27-0.05">"<span class="hl">Ho gaya.</span> Kal lunch break mein 15 minute nikaal."</div>`,
  cam: [1, 1.06], fy: 900,
  upd(t) {
    timerSet('tm10', HRS(t));
    const done = t > T('c26');
    const { hl, hr } = life('d10', t, { pivot: 0, nod: done ? 0 : 6, look: done ? [0, 0] : [0, .7], mouth: done ? 'grin' : 'flat', brows: done ? 'sure' : 'norm', L: HOLD, R: HOLD, hL: 'fist', hR: 'fist', seed: 3 });
    const p = toScene('d10', [(hl[0] + hr[0]) / 2, (hl[1] + hr[1]) / 2 - 40]); tf($('d10-ph'), p[0], p[1], 1);
  }
});

// ================= S4d: "Kya ho gaya?!" — Dimple winks, call ends =================
addScene('c29', 'c30', {
  svg: `<rect width="${W}" height="${H}" fill="#1E1715"/>` + CALL('v11') + `<g id="v11-dark" opacity="0"><rect x="40" y="870" width="${W - 80}" height="560" rx="34" fill="#141110"/><text x="540" y="1110" text-anchor="middle" font-family="Inter" font-weight="800" font-size="44" fill="#fff">Call ended</text></g>` +
    `<g transform="translate(540,1230)"><g data-t="c29+0.6">${callEndSVG(0, 0)}</g></g>`,
  html: timerHTML('tm11') + `<div class="bubble" style="left:540px;top:420px;width:640px" data-t="c29">"Matlab? <span class="hl">Kya ho gaya?!</span>"</div>`,
  cam: [1, 1.02],
  upd(t) {
    timerSet('tm11', HRS(t));
    life('v11A', t, { pivot: 0, mouth: 'shock', brows: 'up', look: [0, .3], L: HEAD, R: HEAD, hL: 'open', hR: 'open' });
    const { hr } = life('v11D', t, { pivot: 0, mouth: 'grin', brows: 'sure', wink: t > T('c29') + .2, look: [0, -.2], L: CLASP, R: [40, -110], hR: 'fist', seed: 3 });
    const p = toScene('v11D', hr); tf($('v11-mug'), p[0] + 10, p[1] - 30, .9);
    op($('v11-dark'), clamp((t - T('c29') - .9) / .2));
  }
});

// ================= S5a: next day, lunch break — round the corner of the lane beside the office =================
addScene('c30', 'c33', {
  svg: streetBG('s12', { sign: 'HETALBEN RENTALS', signFs: 28 }) + `<g id="s12-d">${stand('d12', DH, 0, 0, .52)}</g><g id="s12-a">${stand('a12', AO, 0, 0, .52)}</g>`,
  html: timerHTML('tm12') + pillH(540, 420, 'c30+0.1', 'Agle din · <span class="hl">lunch break</span> 🍱'),
  cam: [1, 1.05], fy: 1000,
  upd(t) {
    timerSet('tm12', HRS(t));
    const [dx, dy] = glide(t, T('c30') + .3, 2.6, 300, 860), [ax, ay] = glide(t, T('c30') + .55, 2.6, 190, 700);
    tf($('s12-d'), dx, 1055 + dy, 1); tf($('s12-a'), ax, 1055 + ay, 1);
    life('d12', t, { mouth: 'smile', look: [.8, 0], R: [60, -10], hR: 'open', seed: 2 });
    life('a12', t, { mouth: 'flat', brows: 'worry', look: [.8, -.2], seed: 4 });
  }
});

// ================= S5b: "Ye dukaan yahan thi?!" =================
addScene('c33', 'c34', {
  svg: streetBG('s13', { sign: 'HETALBEN RENTALS', signFs: 28 }) + stand('a13', AO, 690, 1055, .52) + stand('d13', DH, 860, 1055, .52),
  html: timerHTML('tm13') + `<div class="bubble" style="left:540px;top:430px;width:640px" data-t="c33+0.4">"Ye dukaan <span class="hl">yahan thi?!</span>"</div>`,
  cam: [1.45, 1.55], fx: 820, fy: 820,
  upd(t) {
    timerSet('tm13', HRS(t));
    life('a13', t, { mouth: 'o', brows: 'up', look: [.6, -.9], tilt: 6, L: [30, -20], R: [30, -20], hL: 'open', hR: 'open' });
    life('d13', t, { mouth: 'grin', look: [-.8, 0], L: [70, -6], hL: 'point', seed: 3 });
  }
});

// ================= S5c: inside — Hetalben holds up the yellow chaniya choli =================
addScene('c34', 'c37', {
  svg: shopBG('s14', { noSign: true }) + bust('h14', NOSKIRT(HETALBEN), 330, FLOOR + 150, 1.0) + bust('a14', NOSKIRT(AO), 790, FLOOR + 150, 1.0) + counterSVG() +
    `<g id="s14-cc">${lehengaHangerSVG('s14-l', YELLOW, .9)}</g>`,
  html: timerHTML('tm14') + `<div class="bubble" style="left:540px;top:430px;width:800px" data-t="c36-0.05">"Aarti ji? Aapka outfit <span class="hl">ready hai!</span>"</div>`,
  cam: [1, 1.05], fy: 880,
  upd(t) {
    timerSet('tm14', HRS(t));
    const up = E.out(clamp((t - T('c35')) / .5));
    const { hr } = life('h14', t, { pivot: 0, mouth: t > T('c36') ? talkMouth(t, true) : 'big', brows: 'up', look: [.8, 0], L: CLASP, R: [lerp(9, 172, up), lerp(-14, 6, up)], hR: 'fist', seed: 6 });
    const p = toScene('h14', hr); tf($('s14-cc'), p[0], p[1] + 84, .85, Math.sin(t * 2) * 3); op($('s14-cc'), up);
    const shock = t > T('c36') + .5;
    life('a14', t, { pivot: 0, mouth: shock ? 'shock' : 'o', brows: 'up', look: [-.8, -.2], L: shock ? HEAD : [9, -14], R: shock ? HEAD : [9, -14], hL: 'open', hR: 'open', y: hop(t, T('c36') + .5, 16) });
  }
});

// ================= S5d: "Inhe mera naam kaise pata?!" =================
addScene('c37', 'c39', {
  svg: shopBG('s15', { noSign: true }) + bust('a15', NOSKIRT(AO), 540, FLOOR + 200, 1.3) + counterSVG() +
    [[250, 860, -12], [830, 840, 14], [880, 1060, 6]].map(([x, y, r], i) => `<g transform="translate(${x},${y}) rotate(${r})"><g data-t="c38+${(i * .25).toFixed(2)}" data-bob="6" data-ph="${i}">${qMark()}</g></g>`).join(''),
  html: timerHTML('tm15') + pillH(540, 420, 'c37', 'Outfit <span class="hl">pehle se ready?!</span> 😲', '', 'c38-0.1') +
    `<div class="bubble" style="left:540px;top:430px;width:760px" data-t="c38">"Inhe mera <span class="hl">naam</span> kaise pata?!"</div>`,
  cam: [1, 1.07], fy: 820,
  upd(t) { timerSet('tm15', HRS(t)); life('a15', t, { pivot: 0, mouth: 'shock', brows: 'up', look: [Math.sin(t * 3) * .8, -.3], tilt: Math.sin(t * 2) * 5, L: [9, -14], R: THINK, hR: 'fist' }); }
});

// ================= S6a: Dimple laughs and turns her phone round — Anokhi Reet =================
addScene('c39', 'c41', {
  svg: shopBG('s16', { noSign: true }) + bust('a16', NOSKIRT(AO), 260, FLOOR + 180, .95) + bust('d16', NOSKIRT(DH), 720, FLOOR + 150, 1.05) + counterSVG() +
    `<g id="s16-ph"><g id="s16-back">${phoneBackSVG(1.1)}</g><g id="s16-front">${arMiniPhone('s16-ar', 1.3)}</g></g>` +
    [[600, 720], [850, 660], [700, 1020]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c40+${(i * .2).toFixed(2)}" data-bob="8" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join(''),
  html: timerHTML('tm16') + `<div class="title" style="top:430px" data-t="c40">Raaz = <span class="g">Anokhi Reet</span> ✨</div>`,
  cam: [1, 1.05], fy: 880,
  upd(t) {
    timerSet('tm16', HRS(t));
    const laugh = t < T('c39') + .9;
    const { hl, hr } = life('d16', t, { pivot: 0, closed: laugh, mouth: laugh ? 'grin' : 'big', brows: 'up', y: laugh ? Math.abs(Math.sin(t * 12)) * -6 : 0, L: HOLD, R: HOLD, hL: 'fist', hR: 'fist', seed: 3 });
    const p = toScene('d16', [(hl[0] + hr[0]) / 2, (hl[1] + hr[1]) / 2 + 40]);
    const k = clamp((t - T('c39') - .9) / .5), sx = Math.cos(k * Math.PI);
    tf($('s16-ph'), p[0], p[1], 1, 0, 0, 0); $('s16-ph').setAttribute('transform', `translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) scale(${Math.max(.05, Math.abs(sx)).toFixed(3)},1)`);
    op($('s16-back'), sx > 0 ? 1 : 0); op($('s16-front'), sx > 0 ? 0 : 1);
    life('a16', t, { pivot: 0, mouth: t > T('c40') ? 'shock' : 'o', brows: 'up', look: [.9, 0], L: [9, -14], R: [9, -14] });
  }
});

// ================= S6b: on the app — city, occasion, budget… booked =================
addScene('c41', 'c44', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('s17-r', 540, 860, .12, C.goldTan) + phoneSVG('ph17', 540, 860, 560, 1000, arOutfitScreen({ shop: 'Hetalben Rentals · office ke paas' })) +
    checkBadge(850, 1250, 'c43+0.45', 58),
  html: timerHTML('tm17'),
  cam: [1, 1.05], fy: 860,
  upd(t) {
    timerSet('tm17', HRS(t)); tf($('s17-r'), 540, 860, 1, t * 6);
    [.08, .92, 1.54].forEach((d, i) => { const k = clamp((t - T('c41') - d) / .2); op($(`arO-c${i}-on`), k); op($(`arO-c${i}-t`), k); });
    const pc = pop(t, T('c42') + .05, .45); $('arO-card').setAttribute('transform', `scale(${pc.s.toFixed(3)})`); op($('arO-card'), pc.o);
    const press = t > T('c43') + .1 && t < T('c43') + .3; $('arO-btn').setAttribute('transform', `translate(0,362) scale(${press ? .94 : 1}) translate(0,-362)`);
    op($('arO-done'), clamp((t - T('c43') - .3) / .2));
  }
});

// ================= S7a: fast-forward to Saturday — 00:00:00, the star of the sangeet =================
addScene('c44', 'c46', {
  svg: weddingBG() + stand('f18a', F1, 150, 990, .6) + stand('f18b', F3, 930, 990, .6) + stand('d18', DS, 800, 1000, .58) + `<g id="s18-a">${stand('a18', AS, 0, 0, .9)}</g>` + streaksSVG('ff18') +
    `<g transform="translate(330,300)"><g data-t="c44+1.3">${sparkleSVG(30, C.gold)}</g></g>`,
  html: timerHTML('tm18') + pillH(540, 430, 'c45', '<span class="hl">Sangeet ki star</span> ⭐'),
  cam: [1, 1.05], fy: 900,
  upd(t, lt, s) {
    timerSet('tm18', HRS(t)); streaks('ff18', t, s.a, 1.0, 1);
    tf($('s18-a'), 500 + Math.sin(t * 2.2) * 30, 930 + hop(t, Math.floor(t / .9) * .9, 14, .4), 1, Math.sin(t * 2.2) * 3);
    life('a18', t, Object.assign({ mouth: 'grin', brows: 'up', seed: 1 }, DANCE(t)));
    life('d18', t, { mouth: 'grin', look: [-.7, 0], L: CLASP, R: CLASP, seed: 3 });
    life('f18a', t, { mouth: 'big', look: [.8, 0], L: CLASP, R: CLASP, seed: 2 });
    life('f18b', t, { mouth: 'big', look: [-.8, 0], L: CLASP, R: CLASP, seed: 4 });
  }
});

// ================= S7b: "Bata na, kahan se liya?!" — Anokhi Reet, and everyone takes out their phones =================
addScene('c46', 'c48', {
  svg: weddingBG() + bust('f19a', NOSKIRT(F1), 150, FLOOR + 110, .8) + bust('f19b', NOSKIRT(F3), 930, FLOOR + 110, .8) +
    bust('a19', NOSKIRT(AS), 390, FLOOR + 150, 1.0) + bust('d19', NOSKIRT(DS), 700, FLOOR + 150, 1.0) + counterSVG(FLOOR + 60, '#A1272C') +
    ['pa', 'pd', 'pf1', 'pf2'].map(k => arMiniPhone('s19-' + k, k.startsWith('pf') ? .8 : 1.05)).join(''),
  html: timerHTML('tm19') + `<div class="bubble" style="left:540px;top:430px;width:700px" data-t="c46" data-out="c47-0.1">"Bata na, <span class="hl">kahan se liya?!</span>"</div>` +
    `<div class="title" style="top:480px" data-t="c47">"Kahan se?" → <span class="g">Anokhi Reet</span> 📱</div>`,
  cam: [1, 1.05], fy: 880,
  upd(t) {
    timerSet('tm19', HRS(t));
    const up = E.out(clamp((t - T('c47')) / .4)), f = E.out(clamp((t - T('c47') - .7) / .4));
    const A = life('a19', t, { pivot: 0, mouth: 'grin', look: up > .5 ? [0, 0] : [.8, 0], L: [lerp(9, 6, up), lerp(-14, -112, up)], R: [lerp(9, 6, up), lerp(-14, -112, up)] });
    const D = life('d19', t, { pivot: 0, mouth: 'grin', look: up > .5 ? [0, 0] : [-.8, 0], L: [lerp(9, 6, up), lerp(-14, -112, up)], R: [lerp(9, 6, up), lerp(-14, -112, up)], wink: t > T('c47') + .5 && t < T('c47') + .9, seed: 3 });
    const F1b = life('f19a', t, { pivot: 0, mouth: t < T('c47') ? 'talk' : 'o', brows: 'up', look: [.8, 0], L: [9, -14], R: [lerp(9, 60, f), lerp(-14, -100, f)], hR: 'fist', seed: 2 });
    const F2b = life('f19b', t, { pivot: 0, mouth: t < T('c47') ? 'talk' : 'o', brows: 'up', look: [-.8, 0], R: [9, -14], L: [lerp(9, 60, f), lerp(-14, -100, f)], hL: 'fist', seed: 4 });
    const put = (id, who, h, k, dy) => { const p = toScene(who, h); tf($(id), p[0], p[1] - dy, 1); op($(id), k); };
    const mid = o => [(o.hl[0] + o.hr[0]) / 2, (o.hl[1] + o.hr[1]) / 2 + 30]; put('s19-pa', 'a19', mid(A), up, 0); put('s19-pd', 'd19', mid(D), up, 0); put('s19-pf1', 'f19a', F1b.hr, f, 40); put('s19-pf2', 'f19b', F2b.hl, f, 40);
  }
});

// ================= S8a: "Last minute invitation? Tension mat lo." =================
addScene('c48', 'c50', {
  svg: weddingBG() + bust('a20', NOSKIRT(AS), 370, FLOOR + 170, 1.05) + bust('d20', NOSKIRT(DS), 720, FLOOR + 170, 1.05) + counterSVG(FLOOR + 60, '#A1272C') +
    arMiniPhone('s20-pa', 1.05) + arMiniPhone('s20-pd', 1.05),
  html: `<div class="title" style="top:430px" data-t="c48+0.1">Last minute bhi,<br><span class="g">apna look</span> ✨</div>`,
  cam: [1, 1.05], fy: 880,
  upd(t) {
    const calm = t > T('c49');
    const A = life('a20', t, { pivot: 0, mouth: calm ? 'grin' : 'big', brows: 'up', L: HOLD, R: HOLD, wink: calm && t < T('c49') + .4 });
    const D = life('d20', t, { pivot: 0, mouth: 'grin', brows: 'sure', L: HOLD, R: HOLD, seed: 3 });
    let p = toScene('a20', [(A.hl[0] + A.hr[0]) / 2, (A.hl[1] + A.hr[1]) / 2 + 30]); tf($('s20-pa'), p[0], p[1], 1); p = toScene('d20', [(D.hl[0] + D.hr[0]) / 2, (D.hl[1] + D.hr[1]) / 2 + 30]); tf($('s20-pd'), p[0], p[1], 1);
  }
});

// ================= S8b: end card — Download Anokhi Reet =================
addScene('c50', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s21-r', 540, 760, .16, C.gold) +
    bust('a21', NOSKIRT(AS), 390, FLOOR + 330, .9) + bust('d21', NOSKIRT(DS), 690, FLOOR + 330, .9) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s21-wm" style="position:absolute;left:240px;top:320px;width:600px" src="">` +
    `<div class="title" style="top:600px">Download <span class="g">Anokhi Reet</span> 👇</div>` +
    `<div style="position:absolute;left:0;top:700px;width:1080px;display:flex;justify-content:center;gap:28px" data-t="c50+0.3" class="nc"><img id="s21-as" style="height:96px" src=""><img id="s21-gp" style="height:96px" src=""></div>` +
    pillH(540, 880, 'c50+0.5', 'anokhireet.in', 'gold big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() {
    const b = SEAL();
    $('s21-wm').src = b.replace('seal-on-maroon.svg', 'logo-text.svg');
    $('s21-as').src = b.replace('seal-on-maroon.svg', 'app-store-badge.svg');
    $('s21-gp').src = b.replace('seal-on-maroon.svg', 'google-play-badge.svg');
  },
  upd(t) {
    tf($('s21-r'), 540, 760, 1, t * 5);
    const w = clamp((t - T('c50') - .2) / .35);
    life('a21', t, { pivot: 0, mouth: 'grin', brows: 'up', R: [lerp(9, WAVE(t, T('c50'))[0], E.io(w)), lerp(-14, WAVE(t, T('c50'))[1], E.io(w))], hR: 'open', L: [9, -14], tilt: 4 });
    life('d21', t, { pivot: 0, mouth: 'grin', brows: 'up', L: [lerp(9, WAVE(t, T('c50') + .3)[0], E.io(w)), lerp(-14, WAVE(t, T('c50') + .3)[1], E.io(w))], hL: 'open', R: [9, -14], tilt: -4, seed: 3 });
  }
});
