// ===== Sabse mehenga lehenga kabhi rent nahi hota… phir bhi rakho! (Dukaan ka Funda: the decoy effect) =====
// Bhaveshbhai keeps a premium ₹6,000 lehenga that rarely rents; next to it the ₹2,500 one looks like the best value.
// Story numbers are labelled "Udaharan"; the study numbers carry their source (Dan Ariely, Predictably Irrational, 2008).
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const SIGN = { sign: 'BHAVESH RENTALS' };

// ================= S1 hook: the dusty ₹6,000 lehenga — "ise hata do!" / "ye hi toh kamaal karta hai" =================
addScene(0, 'c3', {
  svg: shopBG('s1', SIGN) + quiet(.3) + `<circle cx="540" cy="820" r="380" fill="url(#glow)" opacity=".7"/>` +
    displayStand('s1l', PREM, 540, 760, 1.15, '₹6,000') + `<g transform="translate(470,930)">${dustPuffsSVG('s1d', 8, 230, 300)}</g>` +
    `<g transform="translate(330,640) rotate(-90)">${cobwebSVG(.6)}</g>` +
    bust('s1c', CH, 200, FLOOR + 90, .8) + bust('s1b', BV, 880, FLOOR + 90, .8) + counterSVG(FLOOR + 130) +
    `<g transform="translate(860,1300) scale(.62)">${ledgerSVG()}` +
    `<text x="-115" y="70" text-anchor="middle" font-family="Inter" font-weight="900" font-size="50" fill="${C.red}" transform="rotate(5 -115 70)">RENT</text>` +
    `<text x="115" y="70" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="${C.emeraldDark}" transform="rotate(-5 115 70)">RETURN</text></g>`,
  html: `<div class="title" style="top:392px;font-size:64px" data-t="-1">Kabhi rent nahi hota…<br>phir bhi <span class="g">KAMAATA</span> hai? 🤯</div>` +
    `<div class="bubble" style="left:260px;top:610px;width:400px;font-size:34px" data-t="0.3" data-out="c2-0.1">"Bhaveshbhai, ise <span class="hl">hata do</span>, koi <span class="hl">rent pe</span> leta hi nahi!" 😩</div>` +
    `<div class="bubble" style="left:800px;top:610px;width:380px;font-size:34px" data-t="c2">"Nahi Chintu, ye hi toh <span class="hl">kamaal</span> karta hai." 😏</div>`,
  cam: [1, 1.04], fy: 880, capY: 1520,
  upd(t) {
    const ch = t < T('c2');
    life('s1c', t, { pivot: 0, mouth: ch ? talkMouth(t, true) : 'o', brows: ch ? 'worry' : 'up', look: ch ? [.6, -.2] : [.8, 0], R: [120, -40], hR: 'point', L: [9, -14], tilt: ch ? 6 : 0 });
    life('s1b', t, { pivot: 0, mouth: ch ? 'smile' : talkMouth(t, true), brows: ch ? 'norm' : 'sure', look: [-.7, 0], tilt: ch ? 0 : -4,
      L: ch ? [9, -14] : [100 + Math.sin(t * 9) * 12, -150], hL: 'point', R: [9, -14], seed: 3 });
  }
});

// ================= S2 flashback: only ₹1,000 and ₹2,500 — everyone picks ₹1,000 =================
addScene('c3', 'c6', {
  svg: shopBG('s2', SIGN) + `<rect width="${W}" height="${H}" fill="#C9A77A" opacity=".28"/>` +
    displayStand('s2a', BASIC, 330, 640, .9, '₹1,000') + displayStand('s2b', MID, 760, 640, .9, '₹2,500') +
    [0, 1, 2].map(i => checkBadge(250 + i * 90, 560, `c5+${(.1 + i * .45).toFixed(2)}`, 34)).join('') +
    `<g transform="translate(760,560)"><g data-t="c5+1.5">${crossSVG(40)}</g></g>` +
    [[CWs, 'c4+0.1'], [GUEST_W1, 'c5'], [GUEST_W2, 'c5+0.5']].map(([o, at], i) => `<g data-t="${at}">${bust('s2c' + i, o, 150 + i * 200, FLOOR + 110, .7)}</g>`).join('') +
    counterSVG(FLOOR + 140),
  html: pillH(540, 352, 'c3+0.05', '<span class="hl">Pehle…</span> sirf 2 option ⏪', '', 'c5-0.05') +
    pillH(540, 352, 'c5', '₹1,000 ✅✅✅ · ₹2,500 ❌') + UDA(540, 440, 'c3+0.3'),
  cam: [1, 1.04], fy: 860, capY: 1250,
  upd(t) {
    [0, 1, 2].forEach(i => life('s2c' + i, t, { pivot: 0, mouth: 'smile', brows: 'up', look: [-.3, -.5], R: [150, -40], hR: 'point', L: [9, -14], seed: i + 2 }));
  }
});

// ================= S3 the numbers (Udaharan): 10 × ₹1,000 = ₹10,000 … aadhe ₹2,500 lete toh ₹17,500 =================
addScene('c6', 'c9', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s3ro', 540, 760, .08, C.goldTan) +
    `<g transform="translate(300,760)">${calculatorSVG('s3calc', '0')}</g>` +
    bust('s3b', BV, 760, FLOOR + 140, .9) + counterSVG(FLOOR + 150),
  html: `<div class="bubble" style="left:700px;top:640px;width:460px;font-size:38px" data-t="c7+0.2">💭 5 × ₹1,000 + 5 × ₹2,500<br>= <span class="hl">₹17,500!</span></div>` +
    pillH(540, 352, 'c6', '10 booking × ₹1,000 = <span class="hl">₹10,000</span>', '', 'c8-0.05') + pillH(540, 352, 'c8', '₹10,000 vs <span class="hl">₹17,500</span> 🤔') +
    UDA(540, 440, 'c6+0.3'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const k = P(t, T('c6') + .4, .9, E.out);
    $('s3calc-scr').textContent = t < T('c6') + .3 ? '10×1,000' : (t < T('c8') + .2 ? Math.round(k * 10000).toLocaleString('en-IN') : '17,500');
    const wow = t > T('c8');
    life('s3b', t, { pivot: 0, mouth: wow ? 'o' : 'flat', brows: wow ? 'up' : 'norm', look: wow ? [0, -.6] : [-.7, .2], eyes: wow ? 'wide' : undefined,
      R: t > T('c7') && !wow ? THINK : [9, -14], hR: 'fist', L: [9, -14], y: hop(t, T('c8') + .1, 14) });
  }
});

// ================= S4 mirror twist: the café — Medium ₹200, Large ₹220 → "Large hi le leta hoon!" =================
addScene('c9', 'c13', {
  svg: wallSVG('#E9D3B8', '#D9BE9C') + `<g transform="translate(540,640) scale(.95)">${cafeMenuSVG([['Small', '₹120', 'S'], ['Medium', '₹200', 'M'], ['Large', '₹220', 'L']], 820, '(Udaharan)')}</g>` +
    `<g id="s4hl" opacity="0"><rect x="560" y="390" width="270" height="480" rx="20" fill="none" stroke="${C.gold}" stroke-width="10"/></g>` +
    bust('s4b', BV, 360, FLOOR + 140, .9) + counterSVG(FLOOR + 150, '#6B4A33') + `<g id="s4cup">${coffeeCupSVG('L')}</g>`,
  html: pillH(540, 352, 'c9+0.05', 'Usi din… <span class="hl">coffee</span> ☕', '', 'c12-0.05') + pillH(540, 352, 'c12', 'Bhaveshbhai ne bhi <span class="hl">Large</span> liya ☕😄') +
    `<div class="bubble" style="left:720px;top:1010px" data-t="c11" data-out="c12+0.6">💭 "Bas <span class="hl">₹20</span> zyada?" 🤔</div>`,
  cam: [1, 1.03], fy: 820,
  upd(t) {
    op($('s4hl'), t > T('c12') ? P(t, T('c12'), .3) * (.7 + Math.sin(t * 6) * .3) : 0);
    const think = t > T('c11') && t < T('c12'), got = t > T('c12') + .9;
    const A = life('s4b', t, { pivot: 0, mouth: got ? 'grin' : (think ? 'flat' : 'smile'), brows: think ? 'worry' : 'up', look: got ? [0, 0] : (think ? [.5, -.8] : [.3, -.7]),
      R: got ? [60, -100] : (t > T('c12') ? [150, -40] : (think ? THINK : [9, -14])), hR: got ? 'fist' : (t > T('c12') ? 'point' : 'fist'), L: [9, -14], y: hop(t, T('c12') + .1, 12) });
    if (got) atHand('s4cup', 's4b', A.hr, 0, 40, 0, .9); else tf($('s4cup'), -400, 0, 1);
  }
});

// ================= S5a the study: Dan Ariely's book; three magazine plans; "sirf print" nobody takes =================
const CARDX = [230, 540, 850];
const PLANS = [['Online', '$59', '#3A6E8C'], ['Print', '$125', '#8C5A3A'], ['Print +|Online', '$125', '#7A1B2A']];
addScene('c13', 'c16', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s5ro', 540, 800, .12, C.gold) +
    `<g id="s5bk"><g transform="translate(540,760) scale(.9)"><g data-t="c13+0.1" data-k="drop">${plainBookSVG(['Predictably', 'Irrational'])}</g></g></g>` +
    PLANS.map(([a, p, col], i) => `<g transform="translate(${CARDX[i]},760)"><g data-t="c14+${(.2 + i * .25).toFixed(2)}" data-k="rise">${planCardSVG('s5p' + i, a, p, col)}</g></g>`).join('') +
    `<g transform="translate(540,960)"><g data-t="c15+0.3">${ribbonSVG('Koi nahi leta 😴', 30)}</g></g>`,
  html: `<div class="title" style="top:352px;font-size:62px" data-t="c13">Professor <span class="g">Dan Ariely</span></div>` +
    `<div style="position:absolute;left:540px;top:470px;transform:translate(-50%,-50%);font-weight:700;font-size:34px;color:#FFF2DF;white-space:nowrap" data-t="c13+0.3">Predictably Irrational (2008)</div>`,
  cam: [1, 1.03], fy: 820,
  upd(t) { tf($('s5ro'), 540, 800, 1, t * 5); op($('s5bk'), 1 - P(t, T('c14'), .3)); }
});

// ================= S5b the bars: 84% took the big plan; remove "Print" → most switch to the cheap one =================
addScene('c16', 'c20', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s6ro', 540, 800, .12, C.gold) +
    PLANS.map(([a, p, col], i) => `<g id="s6c${i}" transform="translate(${CARDX[i]},620) scale(.8)">${planCardSVG('s6p' + i, a, p, col)}</g>`).join('') +
    `<rect x="90" y="1180" width="900" height="10" rx="5" fill="${C.cream}"/>` +
    CARDX.map((x, i) => `<g transform="translate(${x},1180)">${barSVG('s6b' + i, [C.cream, C.goldTan, C.gold][i])}</g>`).join('') +
    `<g transform="translate(540,620)"><g data-t="c18+0.5">${crossSVG(110)}</g></g>`,
  html: pillH(540, 352, 'c16', '<span class="hl">84%</span> ne bada plan liya 🧠', '', 'c18-0.05') + pillH(540, 352, 'c18', 'Print hataya… <span class="hl">68%</span> sasta plan 📉', '', 'c19+1.2') +
    pillH(540, 352, 'c19+1.25', 'Ek <span class="hl">"bekaar"</span> option = sabse bada fayda 🧠') +
    `<div style="position:absolute;left:540px;top:1240px;transform:translate(-50%,-50%);font-weight:700;font-size:28px;color:#FFF2DF;white-space:nowrap">Dan Ariely, Predictably Irrational (2008)</div>`,
  cam: [1, 1.02], fy: 820, capY: 1330,
  upd(t) {
    tf($('s6ro'), 540, 800, 1, t * 5);
    const up = P(t, T('c16') + .3, 1.0, E.out), sw = P(t, T('c18') + .8, 1.0, E.io), H1 = 380 / 84;
    const v = [lerp(16, 68, sw) * up, lerp(0, 0, sw) * up, lerp(84, 32, sw) * up];
    v.forEach((x, i) => barSet('s6b' + i, x * H1, (i === 1 && sw > .3) ? '' : Math.round(x) + '%'));
    op($('s6c1'), 1 - P(t, T('c18') + .5, .4)); op($('s6b1'), 1 - P(t, T('c18') + .5, .4));
  }
});

// ================= S6 STEP 1: a premium piece; all three listed together on Anokhi Reet =================
addScene('c20', 'c24', {
  svg: shopBG('s7', SIGN) + quiet(.55) + `<circle cx="720" cy="820" r="420" fill="url(#glow)" opacity=".8"/>` +
    bust('s7b', BV, 260, FLOOR + 240, 1.0) + counterSVG(FLOOR + 140) +
    `<g id="s7ph"><g transform="scale(.7)">${phoneSVG('s7p', 0, 0, 560, 1000, threeListScreen('c23+0.6'))}</g></g>`,
  html: pillH(540, 352, 'c20+0.05', 'Bhaveshbhai ke <span class="hl">3 kaam</span> 💡', '', 'c21-0.05') + stepPill(1, '3 levels, <span class="hl">saath mein list</span> ✅', 'c21'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const up = P(t, T('c21') + .3, .5, E.out);
    tf($('s7ph'), 720, lerp(1350, 830, up), 1, lerp(8, 0, up)); op($('s7ph'), up);
    life('s7b', t, { pivot: 0, mouth: 'grin', brows: t < T('c21') ? 'sure' : 'up', look: t < T('c21') ? [0, 0] : [.8, -.2], tilt: 4,
      R: t < T('c21') ? IDEA : [100, -30], hR: 'point', L: [9, -14], y: hop(t, T('c23') + .65, 12) });
  }
});

// ================= S7 STEP 2: the middle one gets the best photos and a "Most loved ❤️" label =================
addScene('c24', 'c26', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s8ro', 540, 860, .1, C.goldTan) + `<circle cx="680" cy="800" r="420" fill="url(#glow)"/>` +
    displayStand('s8l', MID, 700, 600, 1.1, '₹2,500') + `<g transform="translate(700,520)"><g data-t="c25+0.2" data-k="drop">${ribbonSVG('Most loved ❤️', 34)}</g></g>` +
    [[560, 640], [840, 760], [620, 900], [860, 560]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c25+${(.4 + i * .2).toFixed(2)}" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join('') +
    `<rect id="s8fl" width="${W}" height="${H}" fill="#fff" opacity="0"/>` +
    bust('s8c', CH, 230, FLOOR + 160, .95) + `<g id="s8ph"><g transform="rotate(-90) scale(.55)">${phoneBackSVG(1)}</g></g>` + counterSVG(FLOOR + 170),
  html: stepPill(2, 'Beech wala <span class="hl">chamkao</span> ⭐', 'c24'),
  cam: [1, 1.04], fy: 820,
  upd(t) {
    const f1 = P(t, T('c24') + .5, .05) - P(t, T('c24') + .6, .25), f2 = P(t, T('c24') + 1.3, .05) - P(t, T('c24') + 1.4, .25);
    op($('s8fl'), Math.max(f1, f2) * .8);
    const A = life('s8c', t, { pivot: 0, mouth: t > T('c25') ? 'grin' : 'flat', brows: 'up', look: [.8, -.2], R: [110, -60], hR: 'fist', L: [9, -14], tilt: -4, seed: 4 });
    atHand('s8ph', 's8c', A.hr, 10, -40, 0);
  }
});

// ================= S8 STEP 3: in the shop — all three together, premium first =================
addScene('c26', 'c28', {
  svg: shopBG('s9', SIGN) + quiet(.35) +
    displayStand('s9a', PREM, 230, 620, .75, '₹6,000') + displayStand('s9b', MID, 540, 620, .75, '₹2,500') + displayStand('s9c', BASIC, 850, 620, .75, '₹1,000') +
    `<circle id="s9g0" cx="230" cy="720" r="190" fill="url(#glow)" opacity="0"/><circle id="s9g1" cx="540" cy="720" r="190" fill="url(#glow)" opacity="0"/>` +
    bust('s9c', CWs, 260, FLOOR + 120, .8) + bust('s9b', BV, 820, FLOOR + 120, .8) + counterSVG(FLOOR + 140),
  html: stepPill(3, 'Pehle <span class="hl">premium</span>, phir beech wala 👗', 'c26'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const second = t > T('c27') + .2;
    op($('s9g0'), second ? 0 : P(t, T('c26') + .4, .3)); op($('s9g1'), second ? P(t, T('c27') + .2, .3) : 0);
    life('s9b', t, { pivot: 0, mouth: 'big', brows: 'up', look: second ? [-.4, -.5] : [-.8, -.5], L: second ? [150, -70] : [160, -100], hL: 'point', R: [9, -14] });
    life('s9c', t, { pivot: 0, mouth: second ? 'grin' : 'o', brows: 'up', look: second ? [.5, -.6] : [-.1, -.7], y: hop(t, T('c27') + .6, 12), seed: 2 });
  }
});

// ================= S9a result: "Ye best value hai!" — the cash drawer fills =================
addScene('c28', 'c29', {
  svg: shopBG('s10', SIGN) + quiet(.35) + displayStand('s10l', MID, 540, 600, .7, '₹2,500') +
    `<g transform="translate(540,520)">${ribbonSVG('Most loved ❤️', 26)}</g>` +
    bust('s10c1', CWs, 180, FLOOR + 110, .75) + bust('s10c2', GUEST_W1, 380, FLOOR + 110, .75) + bust('s10b', BV, 860, FLOOR + 110, .8) + counterSVG(FLOOR + 140) +
    `<g transform="translate(820,${FLOOR + 110})">${gallaSVG('s10g')}</g>` +
    [0, 1, 2].map(i => `<g transform="translate(${760 + i * 60},${FLOOR + 60})"><g data-t="c28+${(.9 + i * .15).toFixed(2)}" data-k="drop"><g transform="scale(.45) rotate(${-10 + i * 10})">${noteSVG()}</g></g></g>`).join(''),
  html: `<div class="bubble" style="left:330px;top:860px" data-t="c28+0.2">"Ye <span class="hl">best value</span> hai!" 😍</div>` + pillH(540, 352, 'c28', 'Beech wala = <span class="hl">best seller</span> 🎉'),
  cam: [1, 1.04], fy: 880,
  upd(t) {
    life('s10c1', t, { pivot: 0, mouth: 'big', brows: 'up', look: [.6, -.6], R: [150, -40], hR: 'point', seed: 2 });
    life('s10c2', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.4, -.6], R: [140, -50], hR: 'point', seed: 5 });
    tf($('s10g-dr'), 0, P(t, T('c28') + .8, .35, E.back) * 40, 1);
    life('s10b', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.7, 0], y: hop(t, T('c28') + .9, 12), seed: 7 });
  }
});

// ================= S9b: "aur wo mehenga lehenga? apna kaam kar raha hai" — Chintu salutes it =================
addScene('c29', 'c31', {
  svg: shopBG('s11', { noSign: true }) + quiet(.3) + `<circle cx="640" cy="820" r="380" fill="url(#glow)" opacity=".8"/>` +
    displayStand('s11l', PREM, 680, 660, 1.1, '₹6,000') + `<g transform="translate(610,880)">${dustPuffsSVG('s11d', 8, 220, 280)}</g>` +
    [[520, 560], [900, 940], [560, 960]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c30+${(.2 + i * .2).toFixed(1)}" data-bob="6" data-ph="${i}">${sparkleSVG(28, C.gold)}</g></g>`).join('') +
    bust('s11c', CH, 250, FLOOR + 120, .95) + counterSVG(FLOOR + 160),
  html: pillH(540, 352, 'c29', 'Aur wo <span class="hl">mehenga</span> lehenga? 👀', '', 'c30-0.05') + pillH(540, 352, 'c30', 'Apna <span class="hl">kaam</span> kar raha hai 🫡'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const sal = t > T('c30') - .1;
    life('s11c', t, { pivot: 0, mouth: sal ? 'grin' : 'flat', brows: sal ? 'sure' : 'up', look: sal ? [0, 0] : [.8, -.3], R: sal ? SALUTE : [9, -14], hR: 'open', L: [9, -14], y: hop(t, T('c30') - .1, 10), seed: 4 });
  }
});

// ================= S10 takeaway: "har option bikne ke liye nahi…" =================
addScene('c31', 'c33', {
  svg: shopBG('s12', { noSign: true }) + quiet(.35) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` +
    bust('s12c', CH, 250, FLOOR + 250, .9) + bust('s12b', BV, 640, FLOOR + 300, 1.2) + counterSVG(FLOOR + 170),
  html: `<div class="title" style="top:390px;font-size:76px" data-t="c31">Har option<br><span class="g">bikne</span> ke liye nahi 💡</div>` +
    pillH(540, 600, 'c32+0.2', 'Kuch <span class="hl">dikhane</span> ke liye bhi 😉'),
  cam: [1, 1.05], fy: 860,
  upd(t) {
    life('s12b', t, { pivot: 0, mouth: 'grin', brows: 'sure', look: [0, 0], R: t > T('c32') ? IDEA : [9, -14], hR: 'point', L: [9, -14], tilt: 4 });
    life('s12c', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [.6, -.2], seed: 4, y: hop(t, T('c32') + .4, 10) });
  }
});

// ================= S11 end card: "Aapka best seller kaunsa? Comment karo" =================
addScene('c33', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s13r', 540, 760, .16, C.gold) +
    bust('s13c', CH, 300, FLOOR + 330, .85) + bust('s13b', BV, 780, FLOOR + 330, .85) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s13wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:520px;font-size:84px">Aapka best seller<br><span class="g">kaunsa?</span> 👇</div>` +
    `<div style="position:absolute;left:540px;top:730px;transform:translate(-50%,-50%);font-weight:700;font-size:34px;color:#FFF2DF">Download the app</div>` +
    `<div style="position:absolute;left:540px;top:810px;transform:translate(-50%,-50%);display:flex;gap:24px" data-t="c33+0.3"><img id="s13as" style="height:92px" src=""><img id="s13gp" style="height:92px" src=""></div>` +
    pillH(540, 925, 'c33+0.45', 'anokhireet.in', 'gold') + pillH(540, 1040, 'c35', '<span class="hl">Comment</span> karo 💬', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const b = SEAL(); [['s13wm', 'logo-text.svg'], ['s13as', 'app-store-badge.svg'], ['s13gp', 'google-play-badge.svg']].forEach(([id, f]) => { const im = $(id); if (im) im.src = b.replace('seal-on-maroon.svg', f); }); },
  upd(t) {
    tf($('s13r'), 540, 760, 1, t * 5);
    life('s13b', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.3, 0], R: t > T('c33') + .3 ? WAVE(t, T('c33') + .3) : [9, -14], hR: 'open', L: [9, -14] });
    life('s13c', t, { pivot: 0, mouth: 'big', brows: 'up', look: [.3, 0], y: hop(t, T('c35'), 12), L: t > T('c35') ? WAVE(t, T('c35')) : [9, -14], hL: 'open', seed: 4 });
  }
});
