// ===== 50 dikhaye… 0 bike. 3 dikhaye… booking! (Dukaan ka Funda: too many choices) =====
// Open loops: "Kaise?", the jam, "24 ya 6?" (1 s pause in the voice), the held-back "12", the app named only at the end.
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const SH = SHITAL, KH = KHUSHI;
const LOOKS = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E'], ['#4F86C6', '#3A6AA3'], ['#F6A98E', '#E08A6F']];
const lk = i => { const [c, d] = LOOKS[i % LOOKS.length]; return { c, d, b: C.gold, dupatta: C.goldTan }; };
// a heap of lehengas (n), centred on x, bottom at y; each `${id}-h${k}` can pop in
const heap = (id, x, y, n, sc = .42, w = 420) => [...Array(n)].map((_, k) => { const r = (k / 6) | 0, c = k % 6, hx = x - w / 2 + 40 + c * (w - 80) / 5 + (r % 2) * 30, hy = y - 60 - r * 70;
  return `<g transform="translate(${hx},${hy}) rotate(${((k * 41) % 30) - 15})"><g id="${id}-h${k}">${lehengaHangerSVG('', lk(k), sc)}</g></g>`; }).join('');
const UDA = (x = 540, y = 440, at = '-1') => pillH(x, y, at, 'Udaharan 📝', 'gold');
const SHOP = { sign: 'SHITAL RENTALS' };

// ================= S1 hook: split — 50 shown, 0 sold | 3 shown, booked =================
addScene(0, 'c5', {
  svg: splitSVG('s1',
    shopBG('s1L', { noSign: true }) + heap('s1hp', 270, 1180, 30, .4, 460) + bust('s1sL', SH, 270, FLOOR - 60, .62) + `<g id="s1kw">${stand('s1k', KH, 0, 0, .55)}</g>`,
    shopBG('s1R', { noSign: true }) + [0, 1, 2].map(i => `<g transform="translate(${680 + i * 110},640)">${lehengaHangerSVG('', lk(i + 1), .55)}</g>`).join('') +
      bust('s1sR', SH, 900, FLOOR + 60, .7) + bust('s1c', dress(CUSTOMER_W, {}), 680, FLOOR + 60, .7) + counterSVG(FLOOR + 90)),
  html: `<div class="title" style="top:352px;font-size:62px" data-t="-1">50 dikhaye → <span class="g">0</span> 😩<br>3 dikhaye → ✅ <span class="g">??</span></div>` +
    `<div class="bubble" style="left:790px;top:620px;font-size:34px" data-t="c3">"<span class="hl">Yahi final!</span>" 😍</div>` +
    `<div class="pill" style="left:900px;top:1060px;font-size:30px;padding:6px 16px;background:${C.gold}" data-t="c4">KA-CHING 💰</div>`,
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const g = glide(t, T('c2') - .2, 1.4, 380, -160); tf($('s1kw'), g[0], 1000 + g[1], 1); PL['s1k'].x = g[0];
    life('s1k', t, { mouth: 'flat', brows: 'worry', look: [-.8, 0], seed: 3 });
    life('s1sL', t, { pivot: 0, mouth: 'sad', brows: 'worry', look: [-.6, .2], sweat: .7, L: [9, -14], R: [9, -14] });
    life('s1sR', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.6, 0], R: [9, -14], L: [100, -40], hL: 'open', seed: 4 });
    life('s1c', t, { pivot: 0, mouth: t > T('c3') ? 'big' : 'smile', brows: 'up', look: [.6, -.2], R: t > T('c3') ? [140, -50] : [9, -14], hR: 'open', y: hop(t, T('c3') + .1, 12), seed: 5 });
  }
});

// ================= S2: lehenga after lehenga — "sochke batati hoon" =================
addScene('c5', 'c8', {
  svg: shopBG('s2', SHOP) + heap('s2hp', 560, FLOOR + 60, 24, .38, 520) + bust('s2k', KH, 200, FLOOR + 110, .8) + bust('s2s', SH, 880, FLOOR + 110, .8) + counterSVG(FLOOR + 130) +
    `<g id="s2dz">${dizzySVG(56)}</g>`,
  html: pillH(540, 352, 'c5', 'Zyada options = <span class="hl">zyada booking?</span>', '', 'c7-0.05') + pillH(540, 352, 'c7', '"Sochke <span class="hl">batati hoon…</span>" 🤯') +
    `<div class="bubble" style="left:330px;top:600px;width:460px;font-size:34px" data-t="c7+0.2">"Ye bhi accha… wo bhi accha… <span class="hl">sochke batati hoon.</span>"</div>`,
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const n = 4 + clamp((t - T('c5')) / (T('c8') - T('c5') - .5)) * 20;
    for (let k = 0; k < 24; k++) op($(`s2hp-h${k}`), k < n ? 1 : 0);
    const conf = clamp((t - T('c6')) / 1.5);
    tf($('s2dz'), 200, 740, .6 + conf * .5, t * 220); op($('s2dz'), conf);
    life('s2k', t, { pivot: 0, mouth: t > T('c7') + .2 ? talkMouth(t, true) : 'flat', brows: 'worry', look: [Math.sin(t * 3) * .8, -.2], tilt: Math.sin(t * 3) * 6, seed: 3 });
    life('s2s', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.7, 0], L: [100 + Math.sin(t * 6) * 30, -40], hL: 'open', R: [9, -14] });
  }
});

// ================= S3 the numbers (Udaharan): 20 customers → 4 bookings; 1 hour each =================
addScene('c8', 'c12', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s3ro', 540, 760, .08, C.goldTan) + `<g transform="translate(540,720)">${tallyBoardSVG('s3tb')}</g>` +
    clockSVG('s3clk', 820, 990, 60) + bust('s3s', SH, 300, FLOOR + 150, .85) + counterSVG(FLOOR + 160),
  html: pillH(540, 352, 'c8', '20 aaye → <span class="hl">sirf 4</span> 📉', '', 'c11-0.05') + pillH(540, 352, 'c11', 'Galti <span class="hl">kahaan</span> thi? 🤔') +
    UDA(540, 440, 'c8+0.3') + pillH(680, 1130, 'c8+0.6', '1 ghanta / customer ⏱️'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    $('s3tb-l0').textContent = 'Is hafte'; $('s3tb-l1').textContent = t > T('c8') + .3 ? '20 customer' : '';
    $('s3tb-l2').textContent = t > T('c9') ? '↓' : ''; $('s3tb-l3').textContent = t > T('c9') + .3 ? '4 booking' : '';
    clockTick('s3clk', t * 6, 0);
    const q = t > T('c11');
    life('s3s', t, { pivot: 0, mouth: q ? 'worry' : 'flat', brows: 'worry', look: q ? [0, 0] : [.5, -.6], R: q ? THINK : [9, -14], hR: 'point', L: [9, -14], tilt: q ? -6 : 0 });
  }
});

// ================= S4 open loop: jam + lehenga = ?? =================
addScene('c12', 'c14', {
  svg: wallSVG('#FBE7D3', '#F5DCC2') + `<circle cx="540" cy="820" r="460" fill="url(#glow)"/>` +
    `<g id="s4jar">${jamJarSVG('#C8283A', 1.5)}</g>` + `<g transform="translate(780,640)"><g data-t="c12+0.2" data-k="pop">${lehengaHangerSVG('', lk(0), .95)}</g></g>` +
    `<g transform="translate(540,820)"><g data-t="c13+0.2" data-k="pop"><text text-anchor="middle" y="60" font-family="Inter" font-weight="900" font-size="200" fill="${C.red}">?</text></g></g>`,
  html: pillH(540, 352, 'c12', '<span class="hl">Jam</span> 🍓 + <span class="hl">Lehenga</span> 👗 = ??', 'big'),
  cam: [1, 1.04], fy: 820,
  upd(t) { const k = P(t, T('c13') - .1, .6, E.back); tf($('s4jar'), lerp(-200, 290, k), 1040, 1, lerp(-360, 0, k)); }
});

// ================= S5 mirror twist: 40 minutes scrolling films, asleep =================
addScene('c14', 'c19', {
  svg: homeBG('s5', { night: true, noShelf: true, noWindow: true, noClock: true }) + clockSVG('s5clk', 860, 520, 64) + sofaBackSVG(540, FLOOR - 60, 900) +
    bust('s5s', SH, 330, FLOOR + 40, .9) + sofaFrontSVG(540, FLOOR + 40, 900) +
    `<g id="s5ph"><g transform="scale(.62)">${phoneSVG('s5p', 0, 0, 560, 1000, filmGridScreen('s5f'))}</g></g>` +
    `<g transform="translate(450,640)"><g data-t="c16+0.9" data-out="c17" data-bob="6"><text font-family="Inter" font-weight="900" font-size="64" fill="#7A4FA0">Zzz</text></g></g>`,
  html: pillH(540, 352, 'c14', 'Usi <span class="hl">raat</span>… 🌙', '', 'c15-0.05') + pillH(540, 352, 'c15', '<span class="hl">40 minute</span> scroll… 📱', '', 'c17-0.05') +
    pillH(540, 352, 'c17', 'Shital bhi <span class="hl">wahi customer</span> 😄'),
  cam: [1, 1.03], fy: 880,
  upd(t) {
    tf($('s5f-sc'), 0, -(((t - T('c14')) * 420) % 1200));
    const sl = P(t, T('c16') + .4, .6);
    op($('s5f-off'), sl * .95);
    tf($('s5ph'), 760, 860, 1, -6);
    const jump = P(t, T('c15'), 1.4, E.io); clockTick('s5clk', 0, jump * 40);
    const asleep = t > T('c16') + .7, yawn = t > T('c16') && !asleep;
    life('s5s', t, { pivot: 0, mouth: yawn ? 'big' : (asleep ? 'flat' : 'flat'), closed: asleep || yawn, brows: asleep ? 'norm' : 'worry', look: asleep ? [0, 0] : [.8, .3], tilt: asleep ? -14 : 0,
      R: [120, -70], hR: 'fist', L: yawn ? [140, -150] : [9, -14], hL: 'open' });
    if (t > T('c17')) { life('s5s', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], tilt: 4, R: IDEA, hR: 'point', L: [9, -14] }); op($('s5f-off'), 0); }
  }
});

// ================= S6a the study: Year 2000 — 24 jams vs 6 jams; the crowd at 24 =================
const jars = (x0, y0, n, cols, w) => [...Array(n)].map((_, i) => { const c = i % cols, r = (i / cols) | 0; return `<g transform="translate(${x0 + c * w},${y0 - r * 64})">${jamJarSVG(['#C8283A', '#E8962E', '#6B2A7A', '#3A8C4E', '#D9576E', '#8C5A2A'][i % 6], .36)}</g>`; }).join('');
const table = (x, w) => `<rect x="${x - w / 2}" y="1000" width="${w}" height="26" rx="8" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/><path d="M${x - w / 2 + 30},1026 V1180 M${x + w / 2 - 30},1026 V1180" stroke="${C.woodDark}" stroke-width="16"/>`;
addScene('c19', 'c23', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s6ro', 540, 800, .12, C.gold) +
    `<g transform="translate(540,600) scale(.8)"><g data-t="c19+0.1" data-k="drop" data-out="c20-0.1">${calendarSVG('s6cal', 'YEAR', '2000')}</g></g>` +
    `<g data-t="c20" data-k="rise">${table(300, 440)}${jars(130, 996, 24, 6, 68)}</g>` +
    `<g data-t="c21" data-k="rise">${table(800, 300)}${jars(700, 996, 6, 3, 100)}</g>` +
    `<g id="s6crowd">${[0, 1, 2, 3].map(i => bust('s6p' + i, [GUEST_W1, GUEST_M, CUSTOMER_W, GUEST_W2][i], 0, 0, .42)).join('')}</g>`,
  html: pillH(300, 1230, 'c20+0.3', '24 jam') + pillH(800, 1230, 'c21+0.2', '6 jam') + pillH(540, 352, 'c22', 'Bheed <span class="hl">24 wale</span> pe 👥'),
  cam: [1, 1.02], fy: 820, capY: 1330,
  upd(t) {
    tf($('s6ro'), 540, 800, 1, t * 5);
    [0, 1, 2, 3].forEach(i => { const k = P(t, T('c22') + i * .15, .6, E.out); const x = lerp(-120, 180 + i * 100, k); tf($('s6p' + i), x, 690 + (i % 2) * 20, 1); PL['s6p' + i].x = x; PL['s6p' + i].y = 690; life('s6p' + i, t, { pivot: 0, mouth: 'o', brows: 'up', look: [.3, .5], seed: i }); });
  }
});

// ================= S6b the guess (1 s pause) and the reveal: 3% vs 30% =================
addScene('c23', 'c26', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s7ro', 540, 800, .12, C.gold) +
    `<rect x="120" y="1180" width="840" height="10" rx="5" fill="${C.cream}"/>` + `<g transform="translate(320,1180)">${barSVG('s7b0', C.cream, 180)}</g><g transform="translate(760,1180)">${barSVG('s7b1', C.gold, 180)}</g>`,
  html: `<div class="title" style="top:640px;font-size:96px" data-t="c23+0.4" data-out="c24">Guess karo 👇<br><span class="g">24</span> ya <span class="g">6</span>?</div>` +
    pillH(320, 1240, 'c24', '24 options 😐') + pillH(760, 1240, 'c25', '6 options 🎉', 'gold') + pillH(540, 352, 'c23', 'Zyada kahaan <span class="hl">bika?</span> 🤔', '', 'c24-0.05') +
    pillH(540, 352, 'c24', '24 → <span class="hl">3%</span> · 6 → <span class="hl">30%</span>') +
    `<div style="position:absolute;left:540px;top:450px;transform:translate(-50%,-50%);font-weight:700;font-size:30px;color:#FFF2DF;white-space:nowrap" data-t="c24">Iyengar &amp; Lepper (2000)</div>`,
  cam: [1, 1.02], fy: 820, capY: 1330,
  upd(t) {
    tf($('s7ro'), 540, 800, 1, t * 5);
    const a = P(t, T('c24') + .1, .6, E.out), b = P(t, T('c25') + .1, .8, E.out), H1 = 14;
    barSet('s7b0', 3 * H1 * a + (a > 0 ? 8 : 0), a > 0 ? Math.round(3 * a) + '%' : '');
    barSet('s7b1', 30 * H1 * b, b > 0 ? Math.round(30 * b) + '%' : '');
  }
});

// ================= S7 STEP 1: ask first — occasion, budget, colour =================
addScene('c26', 'c30', {
  svg: shopBG('s8', SHOP) + quiet(.45) + bust('s8k', KH, 240, FLOOR + 140, .85) + bust('s8s', SH, 840, FLOOR + 140, .85) + counterSVG(FLOOR + 150) +
    [['🎉', 'Occasion'], ['💰', 'Budget'], ['🎨', 'Colour']].map(([e, w], i) => `<g transform="translate(${260 + i * 280},640)"><g data-t="c29+${(i * .35).toFixed(2)}" data-k="pop"><circle r="100" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text y="30" text-anchor="middle" font-size="90">${e}</text><text y="150" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="${C.text}">${w}</text></g></g>`).join(''),
  html: pillH(540, 352, 'c26', 'Shital ke <span class="hl">3 kaam</span> 💡', '', 'c27-0.05') + pillH(540, 352, 'c27', '<span class="hl">Teesra</span> sabse important ⭐', '', 'c28-0.05') +
    stepPill(1, 'Pehle <span class="hl">poocho</span> ✅', 'c28'),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const ask = t > T('c28');
    life('s8s', t, { pivot: 0, mouth: ask ? talkMouth(t, true) : 'grin', brows: 'up', look: [-.7, 0], L: ask ? [100, -40] : IDEA, hL: ask ? 'open' : 'point', R: [9, -14] });
    life('s8k', t, { pivot: 0, mouth: ask ? 'smile' : 'flat', brows: 'up', look: [.7, 0], seed: 3 });
  }
});

// ================= S8 STEP 2: only 3 options =================
addScene('c30', 'c31', {
  svg: shopBG('s9', SHOP) + quiet(.45) + `<path d="M160,470 H920" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M160,470 H920" stroke="${C.goldTan}" stroke-width="8" stroke-linecap="round"/>` +
    [0, 1, 2].map(i => `<g transform="translate(${300 + i * 240},560)"><g data-t="c30+${(.2 + i * .3).toFixed(1)}" data-k="drop">${lehengaHangerSVG('', lk([1, 7, 2][i]), .8)}</g></g>`).join('') +
    bust('s9s', SH, 540, FLOOR + 160, .85) + counterSVG(FLOOR + 160),
  html: stepPill(2, 'Sirf <span class="hl">3 options</span> 👗👗👗', 'c30'),
  cam: [1, 1.03], fy: 820,
  upd(t) { life('s9s', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, -.6], L: [140, -60], hL: 'open', R: [140, -60], hR: 'open' }); }
});

// ================= S9 STEP 3 (most important): suggest one — "faisla nahi, bharosa" =================
addScene('c31', 'c34', {
  svg: shopBG('s10', SHOP) + quiet(.45) + bust('s10k', KH, 240, FLOOR + 140, .85) + bust('s10s', SH, 820, FLOOR + 140, .85) + counterSVG(FLOOR + 150) +
    `<g id="s10l">${lehengaHangerSVG('', lk(7), .75)}</g>` +
    [[160, 700], [330, 640], [250, 560]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c32+${(.8 + i * .15).toFixed(2)}" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join(''),
  html: stepPill(3, 'Ek pe <span class="hl">salah</span> do 👍', 'c31') +
    `<div class="bubble" style="left:640px;top:580px;width:440px;font-size:34px" data-t="c32" data-out="c33-0.1">"Aapke function ke liye <span class="hl">ye sabse best</span> rahega."</div>` +
    pillH(540, 470, 'c33', 'Faisla nahi, <span class="hl">bharosa</span> 💡', 'gold'),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const A = life('s10s', t, { pivot: 0, mouth: t > T('c32') && t < T('c33') ? talkMouth(t, true) : 'grin', brows: 'sure', look: [-.7, 0], L: [155, -120], hL: 'fist', R: [9, -14] });
    const p = toScene('s10s', A.hl); tf($('s10l'), p[0], p[1] + 10, 1, 0);
    const lit = t > T('c32') + .7;
    life('s10k', t, { pivot: 0, mouth: lit ? 'grin' : 'flat', brows: 'up', look: [.7, -.2], y: hop(t, T('c32') + .8, 12), seed: 3 });
  }
});

// ================= S10 result (held back): 20 came → ? → 12 bookings =================
addScene('c34', 'c36', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s11ro', 540, 760, .08, C.goldTan) + `<g transform="translate(540,720)">${tallyBoardSVG('s11tb')}</g>` +
    bust('s11k', KH, 280, FLOOR + 150, .8) + bust('s11s', SH, 820, FLOOR + 150, .8) + counterSVG(FLOOR + 160),
  html: `<div class="bubble" style="left:300px;top:1000px;font-size:34px" data-t="c34+0.2" data-out="c35">"<span class="hl">Yahi final!</span>" 😍</div>` +
    UDA(540, 440, 'c34') + pillH(540, 352, 'c35+1.1', '4 → <span class="hl">12 booking</span> 🚀'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    $('s11tb-l0').textContent = 'Agle hafte'; $('s11tb-l1').textContent = '20 customer'; $('s11tb-l2').textContent = '↓';
    const t12 = T('c35') + 1.05, rolling = t > T('c35') + .1 && t < t12;
    $('s11tb-l3').textContent = t < T('c35') + .1 ? '? booking' : (rolling ? `${4 + ((t * 23) | 0) % 15} booking` : '12 booking 🎉');
    $('s11tb-l3').setAttribute('fill', t >= t12 ? '#1F7A4D' : C.text);
    life('s11s', t, { pivot: 0, mouth: t >= t12 ? 'big' : 'smile', brows: 'up', look: [-.3, -.7], y: hop(t, t12, 14), R: t >= t12 ? [150, -100] : [9, -14], hR: 'open', L: [9, -14] });
    life('s11k', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.3, -.6], seed: 3 });
  }
});

// ================= S11 the app reveal: customers come pre-filtered — "Anokhi Reet pe" =================
addScene('c36', 'c39', {
  svg: shopBG('s12', SHOP) + quiet(.5) + `<circle cx="540" cy="820" r="460" fill="url(#glow)" opacity=".8"/>` +
    `<g id="s12ph"><g transform="scale(.74)">${phoneSVG('s12p', 0, 0, 560, 1000, arPickScreen('s12a', { mystery: true, chips: ['Occasion', 'Budget', 'City'] }))}</g></g>` +
    [[260, 560], [820, 600], [240, 1060], [840, 1080]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c38+${(.1 + i * .07).toFixed(2)}">${sparkleSVG(30, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c36', 'Customer <span class="hl">pehle se chhaant</span> ke aaye ✨', '', 'c38-0.05') + pillH(540, 352, 'c38', '<span class="hl">Anokhi Reet</span> pe ✨', 'big'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    tf($('s12ph'), 540, 820 + Math.sin(t * 2) * 6, 1 + Math.sin(clamp((t - T('c38')) / .35) * Math.PI) * .05);
    [0, 1, 2].forEach(i => chipOnAR('s12a', i, P(t, T('c37') + i * .5, .2)));
    [0, 1, 2, 3].forEach(i => op($(`s12a-r${i}`), P(t, T('c37') + 1.2, .2)));
    op($('s12a-sel'), P(t, T('c37') + 1.6, .2)); op($('s12a-real'), P(t, T('c38'), .25));
  }
});

// ================= S12 takeaway: "Zyada nahi, SAHI options" =================
addScene('c39', 'c40', {
  svg: shopBG('s13', { noSign: true }) + quiet(.35) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + bust('s13s', SH, 540, FLOOR + 300, 1.2) + counterSVG(FLOOR + 170),
  html: `<div class="title" style="top:390px;font-size:80px" data-t="c39">Zyada nahi,<br><span class="g">SAHI</span> options ✅</div>`,
  cam: [1, 1.05], fy: 860,
  upd(t) { life('s13s', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'sure', look: [0, 0], tilt: 4, R: IDEA, hR: 'point', L: [9, -14] }); }
});

// ================= S13 end card: Comment SHOP =================
addScene('c40', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s14r', 540, 760, .16, C.gold) + bust('s14s', SH, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s14wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:520px;font-size:80px">Aise customer<br><span class="g">chahiye?</span> 🤔</div>` +
    pillH(540, 740, 'c41', 'Comment <span class="hl">SHOP</span> 👇', 'big') + pillH(540, 860, 'c40+0.5', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const im = $('s14wm'); if (im) im.src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s14r'), 540, 760, 1, t * 5); life('s14s', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], R: t > T('c41') ? WAVE(t, T('c41')) : [9, -14], hR: 'open', L: [9, -14], tilt: 4 }); }
});
