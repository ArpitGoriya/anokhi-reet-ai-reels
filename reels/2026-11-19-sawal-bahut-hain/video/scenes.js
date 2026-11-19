// ===== Sawal bahut hain? Hareshbhai's doubts pop one by one, timed to the voice (see captions.js) =====
// Device: the counter shot (props.js) shows the doubts over his head; each question gets its own close shots, then pops.
const CW = dress(CUSTOMER_W, { skirt: { c: C.pinkDark, d: '#8E2E4A', b: C.gold, w: 190 } });
const W2 = dress(GUEST_W2, { skirt: { c: '#E07B39', d: '#B95F25', b: C.gold, w: 195 } });
const W1 = dress(GUEST_W1, { skirt: { c: '#7A4FA0', d: '#5D3A7E', b: C.gold, w: 195 } });
const quiet = (o = .55) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;

// ================= S1 hook: doubts pile up over Hareshbhai's head =================
addScene(0, 'c4', {
  svg: counterShot('s1', [0, 1, 2, 3, 4], { 2: 'c2', 3: 'c3', 4: 'c3+0.35' }),
  html: `<div class="title" style="top:335px" data-t="-1">Sawal bahut hain? 🤔</div>` +
    pillH(820, 760, 'c1+0.7', 'Neha · <span class="hl">Anokhi Reet</span>', '', 'c3-0.1'),
  cam: [1, 1.05], fy: 800, capY: 1300,
  upd(t) {
    const up = t > T('c3');
    counterUpd('s1', t, [0, 1, 2, 3, 4],
      { brows: up ? 'worry' : 'sure', look: up ? [0, -.9] : [.7, .1], tilt: up ? -4 : 3, mouth: up ? 'worry' : 'flat' },
      { mouth: t < T('c2') ? 'big' : 'smile', brows: 'up' });
  }
});

// ================= S2a Q1: "Kitna kharcha hoga?" =================
addScene('c4', 'c5', {
  svg: shopBG('s2', { noSign: true }) + quiet(.35) + bust('s2h', HB, 540, FLOOR + 330, 1.3) + counterSVG(FLOOR + 150) +
    qAt('s2q', 'Kitna kharcha hoga?', 540, 600, 'c4+0.05', { fs: 56, tail: [-30, 150] }),
  html: pillH(540, 352, 'c4+0.1', 'Pehla <span class="hl">sawal</span> 1/5'),
  cam: [1, 1.08], fy: 760,
  upd(t) {
    const th = P(t, T('c4') + .3, .4, E.io);
    life('s2h', t, { pivot: 0, mouth: 'worry', brows: 'worry', look: [0, -.7], R: [lerp(6, THINK[0], th), lerp(-128, THINK[1], th)], L: ARMS_X, tilt: -5 });
    bubblePop('s2q', t);
  }
});

// ================= S2b answer: plans are clear in the app =================
addScene('c5', 'c7+0.6', {
  svg: shopBG('s3', { noSign: true }) + quiet() + `<circle cx="680" cy="820" r="420" fill="url(#glow)"/>` +
    bust('s3n', NH, 250, FLOOR + 250, 1.0) + `<g transform="translate(680,820) scale(.78)">${phoneSVG('s3p', 0, 0, 560, 1000, arPlansScreen('s3pl'))}</g>`,
  html: pillH(540, 352, 'c5+0.15', 'Shuru karna <span class="hl">aasaan</span> ✅', '', 'c6-0.05') +
    pillH(540, 352, 'c6', 'Plans <span class="hl">app pe saaf</span> ✅', '', 'c7-0.05') +
    pillH(540, 352, 'c7', 'Apni shop ke <span class="hl">hisaab</span> se ✅'),
  cam: [1, 1.04], fy: 820,
  upd(t) {
    const pt = P(t, T('c6') - .1, .4, E.io);
    life('s3n', t, { pivot: 0, mouth: 'big', brows: 'up', look: [.8, 0], R: [lerp(40, 98, pt), lerp(-60, -30, pt)], hR: pt > .5 ? 'point' : 'open', L: [9, -14], y: hop(t, T('c5') + .05, 12) });
    op($('s3pl-on'), P(t, T('c7') + .1, .25));
    [0, 1, 2].forEach(i => { const k = pop(t, T('c6') + i * .18); tf($(`s3pl-k${i}`), 0, [-140, 60, 260][i], k.s); op($(`s3pl-k${i}`), k.o); });
  }
});

// ================= S2c pop: back at the counter, the first doubt bursts =================
addScene('c7+0.6', 'c8', {
  svg: counterShot('s4'),
  html: pillH(540, 352, '-1', 'Kharcha? <span class="hl">Clear</span> ✅'),
  cam: [1.02, 1.04], fy: 800,
  upd(t) {
    const ok = t > T('c7+0.75');
    counterUpd('s4', t, [0, 1, 2, 3, 4], { brows: ok ? 'up' : 'worry', look: [-.4, -.8], mouth: ok ? 'smile' : 'flat', nod: ok ? Math.sin((t - T('c7+0.75')) * 9) * 4 : 0 }, { mouth: 'big', brows: 'up' }, { 0: 'c7+0.75' });
  }
});

// ================= S3a Q2: "Rent price kaun tay karega?" =================
addScene('c8', 'c10', {
  svg: shopBG('s5', { noSign: true }) + quiet(.3) + bust('s5h', HB, 540, FLOOR + 300, 1.2) + counterSVG(FLOOR + 140) +
    qAt('s5q', 'Rent price kaun tay karega?', 540, 600, 'c9-0.1', { fs: 48, tail: [-20, 150] }),
  html: pillH(540, 352, 'c8+0.05', 'Doosra <span class="hl">sawal</span> 2/5'),
  cam: [1.05, 1], fy: 800,
  upd(t) {
    const sc = P(t, T('c9') - .3, .4, E.io);
    life('s5h', t, { pivot: 0, mouth: t > T('c9') ? 'o' : 'flat', brows: 'worry', look: [-.3, -.8], R: [lerp(6, 168, sc), lerp(-128, 40, sc)], hR: 'fist', L: ARMS_X, tilt: lerp(0, 7, sc) + Math.sin(t * 5) * sc * 2 });
    bubblePop('s5q', t);
  }
});

// ================= S3b answer: "Aap!" — Neha points at him, AAP stamps down, his own price tag swings in =================
addScene('c10', 'c12', {
  svg: shopBG('s6', SHOP) + quiet(.25) + bust('s6h', HB, 330, FLOOR + 80, 1.05) + bust('s6n', NH, 840, FLOOR + 95, .95) + counterSVG() +
    priceTag('s6tag', 'Aapka price', 540, 440, 'c11+0.1', { fs: 46 }) +
    qAt('s6q', 'Price?', 230, 650, '-1', { fs: 44, tail: tailTo(230, 650, 330, 740, 80) }) +
    `<g id="s6st">${stampSVG('AAP!')}</g>`,
  html: pillH(540, 352, 'c10+0.3', 'Price? <span class="hl">AAP</span> tay karo ✅'),
  cam: [1, 1.05], fy: 820,
  upd(t) {
    const st = T('c10') + .3, me = P(t, st + .35, .35, E.io), out = P(t, T('c11') - .15, .3);
    life('s6h', t, { pivot: 0, mouth: t < st + .3 ? 'flat' : (t < T('c11') ? 'o' : 'grin'), brows: t < st + .3 ? 'worry' : 'up', look: t < T('c11') ? [.6, 0] : [.4, -.7],
      L: [lerp(6, 40, me), lerp(-128, -150, me)], hL: me > .5 ? 'point' : 'fist', R: ARMS_X, y: hop(t, st + .3, 14) });
    life('s6n', t, { pivot: 0, mouth: 'big', brows: 'up', look: [-.8, 0], L: [96, -12], hL: 'point', lean: -3, seed: 4 });
    stampIn($('s6st'), t, st, 560, 650); op($('s6st'), t < st ? 0 : 1 - out);
    bubblePop('s6q', t, T('c11') + 1.0);
  }
});

// ================= S4a Q3: "Mujhe computer nahi aata!" =================
addScene('c12', 'c13+0.6', {
  svg: shopBG('s7', { noSign: true }) + quiet(.35) + bust('s7h', HB, 400, FLOOR + 300, 1.15) + counterSVG(FLOOR + 140) +
    `<g transform="translate(840,900) scale(.8)"><g data-t="c12+0.7" data-swing="5">${computerSVG()}<g transform="translate(0,20)"><g data-t="c13+0.05">${crossSVG(130)}</g></g></g></g>` +
    qAt('s7q', 'Mujhe computer nahi aata!', 540, 600, 'c12+0.05', { fs: 46, tail: [-80, 140] }),
  html: pillH(540, 352, 'c12+0.05', 'Teesra <span class="hl">sawal</span> 3/5', '', 'c13') +
    pillH(540, 352, 'c13+0.05', 'Computer? <span class="hl">Nahi chahiye</span> ✅'),
  cam: [1, 1.05], fy: 800,
  upd(t) {
    const sh = P(t, T('c12') + .2, .35, E.io), ok = t > T('c13') + .1;
    life('s7h', t, { pivot: 0, mouth: ok ? 'big' : 'worry', brows: ok ? 'up' : 'worry', look: ok ? [.8, 0] : [0, -.2], tilt: ok ? 4 : Math.sin(t * 7) * 6 * sh,
      L: [lerp(6, 62, sh), lerp(-128, -70, sh)], R: [lerp(6, 62, sh), lerp(-128, -70, sh)], hL: 'open', hR: 'open' });
    bubblePop('s7q', t);
  }
});

// ================= S4b answer: just WhatsApp — three steps in the chat =================
addScene('c13+0.6', 'c16', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s8r', 540, 820, .1, C.goldTan) + `<circle cx="540" cy="820" r="460" fill="url(#glow)"/>` +
    `<g transform="translate(540,880) scale(.94)">${phoneSVG('s8p', 0, 0, 560, 1000, waChatScreen(['c14+0.1', 'c14+1.1', 'c15+0.1']))}</g>` +
    qAt('s8q', 'Computer?', 230, 470, '-1', { fs: 44, tail: [70, 90] }),
  html: pillH(540, 352, '-1', 'Bas <span class="hl">WhatsApp</span> 💬', '', 'c14-0.3') +
    stepPill(1, '💬 Message', 'c14').replace('data-t="c14"', 'data-t="c14" data-out="c14+1.05"') +
    stepPill(2, '📸 Photos + rent price', 'c14+1.1').replace('data-t="c14+1.1"', 'data-t="c14+1.1" data-out="c15-0.05"') +
    stepPill(3, '✅ Shop live', 'c15'),
  cam: [1, 1.05], fy: 820,
  upd(t) { tf($('s8r'), 540, 820, 1, t * 5); bubblePop('s8q', t, T('c15') + .7); }
});

// ================= S5a Q4: "Customer aayenge bhi?" — he looks down an empty street =================
addScene('c16', 'c17', {
  svg: shopFrontBG('s9', { sign: 'HARESH RENTALS', since: 'Lehenga • Sherwani on rent' }) + bust('s9h', HB, 540, FLOOR + 140, 1.0) + counterMid(300, 780, 1150) +
    qAt('s9q', 'Customer aayenge bhi?', 540, 400, 'c16+0.05', { fs: 48, tail: [0, 80] }),
  html: '',
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const sh = P(t, T('c16') + .2, .35, E.io);
    life('s9h', t, { pivot: 0, mouth: 'worry', brows: 'worry', look: [Math.sin((t - T('c16')) * 2.4), -.1], R: [lerp(9, 160, sh), lerp(-14, 30, sh)], hR: 'open', L: [9, -14] });
    bubblePop('s9q', t);
  }
});

// ================= S5b answer: renters search by city, occasion and budget (three-way split) =================
const S10 = [[CUSTOMER_W, '#F7DCC8', '📍 City', 'c18', { c: C.pink, d: C.pinkDark, dupatta: '#F4B9C8' }],
  [GUEST_W2, '#DCEFF5', '🎉 Occasion', 'c18+0.45', { c: C.emerald, d: C.emeraldDark, dupatta: '#A6D3B0' }],
  [GUEST_M, '#EED9E0', '₹ Budget', 'c18+0.9', { c: C.lehenga, d: C.lehengaDark, dupatta: '#E8C25E' }]];
addScene('c17', 'c20', {
  svg: split3SVG('s10', ...S10.map(([who, bg, , , look], i) => { const cx = 180 + i * 360; return `<rect x="${cx - 180}" y="0" width="360" height="${H}" fill="${bg}"/>` + rosettes(`s10r${i}`, cx, 760, .12, C.goldTan) + bust(`s10p${i}`, who, cx, FLOOR + 200, .9) + miniAppPhone(`s10ph${i}`, look, 1.45); })),
  html: pillH(540, 352, 'c17+0.1', 'Renters <span class="hl">app pe</span> 📱') +
    S10.map(([, , chip, at], i) => pillH(180 + i * 360, 560, at, chip, 'gold')).join('') +
    pillH(540, 470, 'c19+0.1', 'Outfit <span class="hl">mil gaya!</span> 😍'),
  cam: [1, 1.03], fy: 900,
  upd(t) {
    S10.forEach(([, , , at], i) => {
      const found = t > T('c19') + i * .15, tap = t > T(at) && t < T(at) + .3;
      const A = life(`s10p${i}`, t, { pivot: 0, mouth: found ? 'big' : 'smile', brows: found ? 'up' : 'norm', look: [0, .5], R: [22, -112 + (tap ? 8 : 0)], hR: 'fist', L: [22, -112], hL: 'fist', seed: i * 3, y: found ? hop(t, T('c19') + i * .15, 12) : 0 });
      const p = toScene(`s10p${i}`, A.hr); tf($(`s10ph${i}`), 180 + i * 360, p[1] - 50, 1, noise(t, i) * 2);
      op($(`s10ph${i}-o`), P(t, T('c19') + i * .15, .3));
      tf($(`s10r${i}`), 180 + i * 360, 760, 1, t * 6);
    });
  }
});

// ================= S5c: renters walk into his shop; the fourth doubt pops =================
addScene('c20', 'c21', {
  svg: shopFrontBG('s11', { sign: 'HARESH RENTALS', since: 'Lehenga • Sherwani on rent' }) + bust('s11h', HB, 540, FLOOR + 140, 1.0) + counterMid(300, 780, 1150) +
    `<g id="s11a">${stand('s11w1', CW, 0, 0, .58)}</g><g id="s11b">${stand('s11w2', W2, 0, 0, .58)}</g>` +
    qAt('s11q', 'Customer?', 540, 440, '-1', { fs: 44, tail: [0, 50] }),
  html: pillH(540, 352, 'c20+0.15', 'Seedha <span class="hl">aapki shop</span> tak 🏪'),
  cam: [1.03, 1], fy: 900,
  upd(t) {
    const a = glide(t, T('c20'), 1.1, -160, 200), b = glide(t, T('c20') + .15, 1.1, 1240, 880);
    tf($('s11a'), a[0], 990 + a[1], 1); tf($('s11b'), b[0], 990 + b[1], 1);
    const here = t > T('c20') + .8;
    life('s11w1', t, { mouth: 'big', look: [.8, 0], R: here ? WAVE(t, T('c20') + .8) : [9, -14], hR: 'open', seed: 2 });
    life('s11w2', t, { mouth: 'big', look: [-.8, 0], L: here ? WAVE(t, T('c20') + .9) : [9, -14], hL: 'open', seed: 5 });
    life('s11h', t, { pivot: 0, mouth: here ? 'grin' : 'o', brows: 'up', look: [Math.sin(t * 3) * .6, 0], L: here ? WAVE(t, T('c20') + 1) : [9, -14], hL: 'open', y: hop(t, T('c20') + .9, 14) });
    bubblePop('s11q', t, T('c20') + 1.0);
  }
});

// ================= S6a Q5: "Pasand na aaya toh?" — the last doubt, big =================
addScene('c21', 'c22', {
  svg: shopBG('s12', SHOP) + `<rect width="${W}" height="${H}" fill="${C.cream}" opacity=".35"/>` + bust('s12h', HB, 330, FLOOR + 80, 1.05) + bust('s12n', NH, 840, FLOOR + 95, .95) + miniAppPhone('s12ph', undefined, 1.05) + counterSVG() +
    qAt('s12q4', 'Pasand na aaya toh?', 520, 560, 'c21+0.6', { fs: 54, tail: tailTo(520, 560, HEAD[0], HEAD[1], 150) }),
  html: pillH(540, 352, 'c21+0.05', 'Aakhri <span class="hl">sawal</span> 5/5'),
  cam: [1, 1.06], fy: 860,
  upd(t) { counterUpd('s12', t, [], { brows: 'worry', mouth: 'worry', look: [.2, -.9], lean: -3, tilt: -4 }, { mouth: 'smile', brows: 'up' }); bubblePop('s12q4', t); }
});

// ================= S6b answer: start small with a few outfits, see for yourself; the last doubt pops =================
const S13L = [[C.marigold, '#C9821E', '#F7C548'], [C.lehenga, C.lehengaDark, '#E8C25E'], [C.teal, C.tealDark, '#9CC5B0']];
addScene('c22', 'c25', {
  svg: shopBG('s13', { noSign: true, noRail: true }) + quiet(.2) +
    `<rect x="360" y="470" width="420" height="14" rx="7" fill="${C.goldTan}" stroke="${OL}" stroke-width="4"/>` +
    S13L.map(([c, d, p], i) => `<g transform="translate(${450 + i * 120},520)"><g data-t="c22+${(.45 + i * .2).toFixed(2)}" data-k="drop" data-swing="8">${lehengaHangerSVG('', { c, d, dupatta: p }, .55)}</g></g>`).join('') +
    bust('s13h', HB, 250, FLOOR + 90, 1.0) + bust('s13n', NH, 840, FLOOR + 95, .95) + counterSVG() +
    qAt('s13q', 'Pasand?', 190, 660, '-1', { fs: 44, tail: [30, 70] }),
  html: pillH(540, 352, 'c22+0.1', 'Chhote se <span class="hl">shuru karo</span> ✅', '', 'c23-0.05') +
    pillH(540, 352, 'c23', 'Kuch outfits <span class="hl">list</span> karo 👗', '', 'c24-0.05') +
    pillH(540, 352, 'c24', '<span class="hl">Khud</span> dekho 👀'),
  cam: [1, 1.05], fy: 820,
  upd(t) {
    const th = P(t, T('c23') + .1, .4, E.io), rel = P(t, T('c24') + .4, .5, E.io);
    const Lh = rel > 0 ? [lerp(6, 9, rel), lerp(-128, -14, rel)] : ARMS_X;
    const Rh = rel > 0 ? [lerp(THINK[0], 9, rel), lerp(THINK[1], -14, rel)] : [lerp(6, THINK[0], th), lerp(-128, THINK[1], th)];
    life('s13h', t, { pivot: 0, mouth: rel > .3 ? 'smile' : (th > .5 ? 'flat' : 'worry'), brows: rel > .3 ? 'norm' : 'worry', closed: rel > .2 && rel < .95, look: [.6, -.4],
      nod: t > T('c24') && t < T('c24') + .6 ? Math.sin((t - T('c24')) * 14) * 6 : 0, L: Lh, R: Rh, y: rel * 8 });
    life('s13n', t, { pivot: 0, mouth: 'big', brows: 'up', look: [-.7, -.4], L: [lerp(9, 120, P(t, T('c22') + .2, .4, E.io)), -40], hL: 'open', seed: 4 });
    bubblePop('s13q', t, T('c24') + .25);
  }
});

// ================= S7a: all doubts gone — arms open, thumbs up =================
addScene('c25', 'c26', {
  svg: shopBG('s14', { noSign: true }) + `<circle cx="540" cy="760" r="520" fill="url(#glow)"/>` + bust('s14h', HB, 540, FLOOR + 300, 1.2) + counterSVG(FLOOR + 140) +
    [[200, 560, 'c25+0.3'], [880, 600, 'c25+0.45'], [300, 820, 'c25+0.6'], [800, 880, 'c25+0.5']].map(([x, y, at]) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-bob="6">${sparkleSVG(30, C.gold)}</g></g>`).join(''),
  html: `<div class="title" style="top:430px" data-t="c25+0.05">Saare sawal <span class="g">khatam!</span> 🎉</div>`,
  cam: [1, 1.05], fy: 800,
  upd(t) {
    const u = P(t, T('c25') + .1, .45, E.io);
    life('s14h', t, { pivot: 0, mouth: u > .5 ? 'grin' : 'smile', brows: 'up', look: [0, 0], L: [lerp(6, 9, u), lerp(-128, -14, u)], R: [lerp(6, 80, u), lerp(-128, 100, u)], hR: u > .6 ? 'thumb' : 'fist', y: hop(t, T('c25') + .55, 18), tilt: 4 });
  }
});

// ================= S7b: he sends his photos, his shop goes live the same day =================
addScene('c26', 'c28', {
  svg: shopBG('s15', SHOP) + quiet(.45) + `<circle cx="720" cy="820" r="420" fill="url(#glow)"/>` + bust('s15h', HB, 260, FLOOR + 230, .95) +
    `<g transform="translate(720,820) scale(.72)">${phoneSVG('s15p', 0, 0, 560, 1000, arShopScreen('HARESH RENTALS', 'c27+0.5'))}</g>`,
  html: pillH(540, 352, 'c26+0.1', '<span class="hl">Usi din</span> shop list ✅', '', 'c27+0.45') +
    pillH(540, 352, 'c27+0.5', 'Sawal khatam, <span class="hl">shop online</span> 🎉'),
  cam: [1, 1.04], fy: 820,
  upd(t) {
    const pt = P(t, T('c26') + .2, .4, E.io), live = t > T('c27') + .5;
    life('s15h', t, { pivot: 0, mouth: live ? 'grin' : 'big', brows: 'up', look: [.8, 0], R: [lerp(9, 96, pt), lerp(-14, -26, pt)], hR: 'point', L: [9, -14], y: hop(t, T('c27') + .55, 16) });
  }
});

// ================= S8a CTA: "Aapke mann mein bhi koi sawal hai?" =================
addScene('c28', 'c31', {
  svg: shopBG('s16', { noSign: true }) + quiet(.3) + bust('s16h', HB, 520, FLOOR + 320, 1.25) + counterSVG(FLOOR + 160) +
    qAt('s16q', '', 840, 640, 'c28+0.7', { fs: 60, tail: [60, 130] }),
  html: pillH(540, 352, 'c29', 'Sawal? <span class="hl">Comment karo</span> 👇', '', 'c30-0.05') +
    pillH(540, 352, 'c30', '<span class="hl">"LIST"</span> likho 💬'),
  cam: [1, 1.05], fy: 800,
  upd(t) {
    const wv = t < T('c29'), dn = P(t, T('c29'), .35, E.io);
    life('s16h', t, { pivot: 0, mouth: wv ? 'big' : 'grin', brows: 'up', look: wv ? [0, 0] : [.3, .6], tilt: 4,
      R: wv ? WAVE(t, T('c28')) : [lerp(128, 30, dn), lerp(26, 0, dn)], hR: wv ? 'open' : 'point', L: [9, -14] });
    bubblePop('s16q', t);
  }
});

// ================= S8b end card =================
addScene('c31', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s17r', 540, 760, .16, C.gold) +
    bust('s17h', HB, 340, FLOOR + 330, .85) + bust('s17n', NH, 760, FLOOR + 340, .8) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s17wm" style="position:absolute;left:240px;top:330px;width:600px" src="">` +
    `<div class="title" style="top:640px;font-size:72px">Sawal? <span class="g">Comment karo</span> 👇</div>` +
    pillH(540, 790, 'c31+0.2', '<span class="hl">LIST</span> likho · anokhireet.in', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const im = $('s17wm'); if (im) im.src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s17r'), 540, 760, 1, t * 5);
    const w = clamp((t - T('c31') - .2) / .35);
    life('s17h', t, { pivot: 0, mouth: 'grin', brows: 'up', L: [lerp(9, WAVE(t, T('c31'))[0], E.io(w)), lerp(-14, WAVE(t, T('c31'))[1], E.io(w))], hL: 'open', R: [9, -14], tilt: 4 });
    life('s17n', t, { pivot: 0, mouth: 'big', brows: 'up', R: [lerp(9, WAVE(t, T('c31') + .3)[0], E.io(w)), lerp(-14, WAVE(t, T('c31') + .3)[1], E.io(w))], hR: 'open', L: [9, -14], seed: 4 });
  }
});
