// ===== Dukaan-dukaan ki bhaag-daud: Purani Komal (left, the bazaar) vs Smart Komal (right, her sofa) =====
// Split screen with a moving divider (splitDynSVG / splitAt). Left side drawn around x = 270, right around x = 810.
const HOT = { mouth: 'worry', brows: 'worry', sweat: 1 };
const walkBob = t => -Math.abs(Math.sin(t * 9)) * 10;
// the left world: bazaar + Purani Komal standing (scene ids prefixed by p)
const leftWorld = (p, o = {}) => bazaarBG(p + 'bz') + (o.auto ? `<g id="${p}au">${autoSVG()}<g transform="translate(-60,-320)"><text font-family="Inter" font-weight="900" font-size="54" fill="${C.red}" stroke="#fff" stroke-width="10" paint-order="stroke">BEEP! BEEP!</text></g></g>` : '') +
  `<g id="${p}kw">${stand(p + 'k', KP, 270, 1000, .62)}</g>` + handBag(p + 'bag') + (o.card ? handCard(p + 'cd') : '');
// the right world: home, sofa, Smart Komal sitting
const rightWorld = (p, o = {}) => homeBG(p + 'hm', { noWindow: true, noShelf: true, noPlant: true, noClock: true }) + `<circle cx="810" cy="900" r="360" fill="url(#glow)" opacity=".7"/>` +
  sofaBackSVG(810, FLOOR + 110, 520) + bust(p + 'k', KS, 810, FLOOR + 110, .82) + sofaFrontSVG(810, FLOOR + 110, 520) +
  (o.card ? handCard(p + 'cd') : '') + (o.chai ? `<g id="${p}ch"><g transform="scale(.8)">${chaiSVG()}</g></g>` : '') + (o.phone ? handPhone(p + 'ph', BLUE, 1.0) : '');

// ================= S1 hook: two Komals, the same wedding card =================
addScene(0, 'c2', {
  svg: splitDynSVG('s1', leftWorld('s1L', { card: true }), rightWorld('s1R', { card: true })),
  html: `<div class="title" style="top:330px;font-size:76px" data-t="-1">Ek outfit, <span class="g">das dukaan?</span> 🥵</div>` +
    pillH(270, 520, 'c1+0.3', 'Purani <span class="hl">Komal</span>') + pillH(810, 520, 'c1+0.5', 'Smart <span class="hl">Komal</span>', 'gold'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    splitAt('s1', 540); bazaarScroll('s1Lbz', 0, t);
    const A = life('s1Lk', t, Object.assign({}, HOT, { sweat: .6, look: [.3, .4], R: [24, -112], hR: 'fist', L: [9, -14] }));
    atHand('s1Lcd', 's1Lk', A.hr, 0, -50, -6); atHand('s1Lbag', 's1Lk', A.hl, 0, -10);
    const B = life('s1Rk', t, { pivot: 0, mouth: 'smile', brows: 'norm', look: [-.2, .4], R: [24, -112], hR: 'fist', L: CLASP, seed: 3 });
    atHand('s1Rcd', 's1Rk', B.hr, 0, -50, 6);
  }
});

// ================= S2 left widens: dhoop, traffic, shop after shop, "Price kitna hai?" =================
addScene('c2', 'c5', {
  svg: splitDynSVG('s2', leftWorld('s2L', { auto: true }), rightWorld('s2R', { chai: true })),
  html: pillH(395, 352, 'c2+0.2', 'Dhoop ☀️ <span class="hl">Traffic</span> 🚗') +
    `<div class="pill big" id="s2cnt" style="left:395px;top:470px" data-t="c2+0.4">Dukaan: 1</div>` +
    `<div class="bubble" style="left:470px;top:640px" data-t="c4-0.05">"Price <span class="hl">kitna hai?</span>"</div>`,
  cam: [1, 1.03], fy: 900,
  upd(t) {
    const x = KF(t, [[T('c2'), 540], [T('c2') + .6, 790]]); splitAt('s2', x);
    const stop = T('c4') - .25, walking = t < stop;
    const dist = (Math.min(t, stop) - T('c2')) * 330;
    bazaarScroll('s2Lbz', dist, t);
    tf($('s2Lkw'), 0, walking ? walkBob(t) : 0, 1);
    const asks = !walking;
    const A = life('s2Lk', t, Object.assign({}, HOT, { mouth: asks ? talkMouth(t, true) : 'worry', look: asks ? [.7, -.2] : [.4, 0], tilt: walking ? Math.sin(t * 9) * 2 : 4,
      R: asks ? [96, -30] : [9 + Math.sin(t * 9) * 12, -14], hR: asks ? 'open' : 'fist', L: [9 - Math.sin(t * 9) * 12, -14] }));
    atHand('s2Lbag', 's2Lk', A.hl, 0, -10, Math.sin(t * 9) * 8);
    const n = t < T('c3') ? 1 : t < T('c3') + .9 ? 4 : t < T('c4') + .5 ? 7 : 10;
    const el = $('s2cnt'); if (el && el.dataset.n !== String(n)) { el.dataset.n = n; el.innerHTML = `Dukaan: <span class="hl">${n}</span>`; }
    const au = T('c2') + .3, ax = KF(t, [[au, 760], [au + 2.4, -260]], E.lin);
    tf($('s2Lau'), ax, FLOOR + 170 + Math.abs(Math.sin(t * 14)) * 4, .62); op($('s2Lau'), t > au && t < au + 2.5 ? 1 : 0);
    const B = life('s2Rk', t, { pivot: 0, mouth: 'smile', closed: true, look: [0, .3], tilt: -6, lean: -2, L: [40, -120], hL: 'fist', R: CLASP, seed: 3 });
    atHand('s2Rch', 's2Rk', B.hl, 0, -40);
  }
});

// ================= S3 right widens: sofa, chai aur phone =================
addScene('c5', 'c6', {
  svg: splitDynSVG('s3', leftWorld('s3L'), rightWorld('s3R', { chai: true, phone: true })),
  html: pillH(685, 352, 'c5+0.75', 'Sofa 🛋️') + pillH(685, 452, 'c5+1.9', 'Chai ☕', 'gold') + pillH(685, 552, 'c5+2.45', '<span class="hl">Phone</span> 📱'),
  cam: [1, 1.03], fy: 900,
  upd(t) {
    splitAt('s3', KF(t, [[T('c5'), 790], [T('c5') + .6, 290]]));
    bazaarScroll('s3Lbz', 1900 + (t - T('c5')) * 330, t);
    tf($('s3Lkw'), 0, walkBob(t), 1);
    const A = life('s3Lk', t, Object.assign({}, HOT, { look: [.4, 0], R: [9 + Math.sin(t * 9) * 12, -14], L: [9 - Math.sin(t * 9) * 12, -14] }));
    atHand('s3Lbag', 's3Lk', A.hl, 0, -10);
    const sip = P(t, T('c5') + 1.7, .4, E.io) * (1 - P(t, T('c5') + 2.3, .3, E.io)), ph = P(t, T('c5') + 2.4, .35, E.io);
    const B = life('s3Rk', t, { pivot: 0, mouth: sip > .5 ? 'o' : 'big', brows: 'up', closed: sip > .5, look: ph > .5 ? [0, .7] : [-.2, 0], tilt: -4, lean: -2,
      L: [lerp(30, 40, sip), lerp(-100, -150, sip)], hL: 'fist', R: [lerp(14, 30, ph), lerp(-20, -118, ph)], hR: 'fist', seed: 3 });
    atHand('s3Rch', 's3Rk', B.hl, 0, -40); atHand('s3Rph', 's3Rk', B.hr, -10, -70, -6); op($('s3Rph'), P(t, T('c5') + 2.3, .2));
  }
});

// ================= S4a: Smart Komal opens Anokhi Reet on the sofa =================
addScene('c6', 'c7', {
  svg: homeBG('s4', { noWindow: true, noShelf: true, noPlant: true, noClock: true }) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + sofaBackSVG(540, FLOOR + 260, 980) +
    bust('s4k', KS, 540, FLOOR + 260, 1.2) + sofaFrontSVG(540, FLOOR + 260, 980) + `<g id="s4ph">${phoneBackSVG(1.15)}</g>`,
  html: pillH(540, 352, 'c6+0.5', '<span class="hl">Anokhi Reet</span> pe outfits 👗'),
  cam: [1, 1.06], fy: 900,
  upd(t) {
    const B = life('s4k', t, { pivot: 0, mouth: 'smile', brows: 'norm', look: [0, .8], R: [30, -118], L: [30, -118], hR: 'fist', hL: 'fist', tilt: -3 });
    const p = toScene('s4k', B.hr), q = toScene('s4k', B.hl); tf($('s4ph'), (p[0] + q[0]) / 2, (p[1] + q[1]) / 2 - 90, 1, 0);
  }
});

// ================= S4b: "Wow, itne saare options!" — outfits fan out of the phone =================
addScene('c7', 'c8', {
  svg: homeBG('s5', { noWindow: true, noShelf: true, noPlant: true, noClock: true }) + `<circle cx="540" cy="820" r="520" fill="url(#glow)"/>` + sofaBackSVG(540, FLOOR + 300, 980) +
    bust('s5k', KS, 540, FLOOR + 300, 1.3) + sofaFrontSVG(540, FLOOR + 300, 980) + `<g id="s5ph">${phoneBackSVG(1.2)}</g>` +
    [[150, 560], [330, 470], [750, 470], [930, 560], [150, 820], [930, 820]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c7+${(.75 + i * .12).toFixed(2)}" data-bob="6" data-ph="${i}"><rect x="-74" y="-100" width="148" height="200" rx="14" fill="#fff" stroke="${OL}" stroke-width="4"/><rect x="-62" y="-88" width="124" height="150" rx="10" fill="${C.cream}"/><g transform="translate(0,-40)">${lehengaHangerSVG('', { c: SHOP_LEH[i][0], d: SHOP_LEH[i][1], dupatta: C.goldTan }, .26)}</g><rect x="-56" y="72" width="80" height="14" rx="7" fill="#E6E0D9"/></g></g>`).join(''),
  html: `<div class="bubble" style="left:540px;top:380px" data-t="c7+0.25">"Wow, itne saare <span class="hl">options!</span>" 😍</div>`,
  cam: [1, 1.05], fy: 820,
  upd(t) {
    const B = life('s5k', t, { pivot: 0, mouth: t < T('c7') + .9 ? 'o' : 'big', brows: 'up', look: [0, -.4], R: [30, -118], L: [30, -118], y: hop(t, T('c7') + .2, 14) });
    const p = toScene('s5k', B.hr), q = toScene('s5k', B.hl); tf($('s5ph'), (p[0] + q[0]) / 2, (p[1] + q[1]) / 2 - 90, 1, 0);
  }
});

// ================= S4c: the app — city, occasion, budget; photos, rent, compare; the blue one =================
addScene('c8', 'c10', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s6r', 540, 860, .1, C.goldTan) + `<circle cx="540" cy="860" r="480" fill="url(#glow)"/>` +
    `<g transform="translate(540,880) scale(.95)">${phoneSVG('s6p', 0, 0, 560, 1000, browseScreen('s6b'))}</g>`,
  html: pillH(540, 352, 'c8+0.3', 'City • Occasion • <span class="hl">Budget</span>', '', 'c9-0.05') +
    pillH(540, 352, 'c9', 'Photos 📸 <span class="hl">Rent price</span> 💰'),
  cam: [1, 1.04], fy: 880,
  upd(t) {
    tf($('s6r'), 540, 860, 1, t * 5);
    [.55, 1.1, 1.95].forEach((d, i) => chipOn('s6b', i, P(t, T('c8') + d, .2)));
    [0, 1, 2, 3].forEach(i => {
      const k = pop(t, T('c8') + .7 + i * .15), bnc = 1 + Math.sin(clamp((t - T('c9') - i * .08) / .3) * Math.PI) * .06, cmp = (i === 1 || i === 2) ? Math.max(0, Math.sin(clamp((t - T('c9') - 1.3) / .9) * Math.PI * 2 + (i === 2 ? Math.PI : 0))) * .07 : 0;
      tf($(`s6b-k${i}`), 0, 0, k.s * bnc * (1 + cmp)); op($(`s6b-k${i}`), k.o);
      op($(`s6b-r${i}`), P(t, T('c9') + .75 + i * .1, .2));
    });
    op($('s6b-sel'), P(t, T('c9') + 2.2, .25));
  }
});

// ================= S4d: sab ghar baithe =================
addScene('c10', 'c11', {
  svg: homeBG('s7', { noWindow: true, noShelf: true, noPlant: true, noClock: true }) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + sofaBackSVG(540, FLOOR + 260, 980) +
    bust('s7k', KS, 540, FLOOR + 260, 1.2) + sofaFrontSVG(540, FLOOR + 260, 980) + handPhone('s7ph', BLUE, 1.6) + checkBadge(700, 760, 'c10+0.3', 44),
  html: pillH(540, 352, 'c10+0.05', 'Sab <span class="hl">ghar baithe</span> 🏠'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const B = life('s7k', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.3, -.2], R: [70, -80], hR: 'fist', L: CLASP, tilt: 5, y: hop(t, T('c10') + .1, 12) });
    atHand('s7ph', 's7k', B.hr, 10, -100, 6);
  }
});

// ================= S5: one shop, straight in: "Ye wala." — done =================
addScene('c11', 'c14', {
  svg: rentalShopBG('s8', { sign: 'HETALBEN RENTALS', signY: 228, noMirror: true }) + bust('s8h', HETALBEN, 800, FLOOR + 90, 1.0) +
    `<g id="s8kw">${bust('s8k', KS, 0, FLOOR + 90, 1.0)}</g>` + `<g id="s8g">${lehengaHangerSVG('s8gown', BLUE, .7)}</g>` + counterSVG() + handPhone('s8ph', BLUE, 1.5) +
    checkBadge(540, 560, 'c13', 60),
  html: pillH(540, 352, 'c11+0.15', 'Sirf <span class="hl">1 dukaan</span> ✅') +
    `<div class="bubble" style="left:330px;top:600px" data-t="c11+0.7" data-out="c12+0.4">"Ye wala." 📱</div>`,
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const kx = KF(t, [[T('c11'), -120], [T('c11') + .7, 290]]);
    tf($('s8kw'), kx, t < T('c11') + .7 ? walkBob(t) : 0, 1); PL['s8k'].x = kx;
    const show = P(t, T('c11') + .5, .35, E.io);
    const A = life('s8k', t, { pivot: 0, mouth: t > T('c12') + .4 ? 'grin' : 'big', brows: 'up', look: [.7, -.1], R: [lerp(9, 100, show), lerp(-14, -60, show)], hR: 'fist', L: [9, -14] });
    atHand('s8ph', 's8k', A.hr, 10, -90, 8); op($('s8ph'), t > T('c11') + .4 ? 1 : 0);
    const give = P(t, T('c12'), .7, E.io);
    life('s8h', t, { pivot: 0, mouth: 'big', brows: 'up', look: [-.7, 0], L: [lerp(9, 110, give), lerp(-14, -40, give)], hL: 'open', nod: t > T('c11') + 1 && t < T('c12') ? Math.sin(t * 12) * 5 : 0, seed: 6 });
    tf($('s8g'), lerp(940, 560, give), 640 + Math.sin(t * 3) * 4, 1, Math.sin(t * 2) * 3 * (1 - give)); op($('s8g'), P(t, T('c12') - .2, .2));
  }
});

// ================= S6: Purani Komal at dukaan no. 10, tumbleweed rolls past =================
addScene('c14', 'c16', {
  svg: bazaarBG('s9bz') + `<rect x="-10" y="${FLOOR - 40}" width="${W + 20}" height="60" fill="#BDB3A3" stroke="${OL}" stroke-width="4"/>` +
    bust('s9k', KP, 540, FLOOR + 60, 1.0) + lapSVG(540, FLOOR + 60, KP.skirt, 1) +
    `<g transform="translate(820,${FLOOR + 40}) rotate(-14)">${handBag('s9bag', .36)}</g>` + handCard('s9cd', .5) +
    `<g id="s9tw">${tumbleweedSVG(70)}</g>`,
  html: pillH(540, 352, 'c14+0.1', 'Aur <span class="hl">Purani Komal?</span>', '', 'c15-0.05') + pillH(540, 352, 'c15', 'Dukaan <span class="hl">no. 10…</span> 😮‍💨'),
  cam: [1, 1.05], fy: 1000,
  upd(t) {
    bazaarScroll('s9bz', 9 * 300 + 150 - 540, t);
    const A = life('s9k', t, { pivot: 0, mouth: 'sad', brows: 'worry', sweat: 1, closed: Math.sin(t * 1.3) > .6, tilt: -8, nod: 8, look: [.5, .3],
      R: [120 + Math.sin(t * 16) * 14, -100 + Math.sin(t * 16) * 10], hR: 'fist', L: [20, -70] });
    atHand('s9cd', 's9k', A.hr, 0, -40, -30 + Math.sin(t * 16) * 12);
    const tw = P(t, T('c15') - .2, 2.2, E.lin);
    tf($('s9tw'), lerp(1220, -180, tw), FLOOR + 190 - Math.abs(Math.sin(tw * 9)) * 40, 1, -tw * 900);
  }
});

// ================= S7: the switch — both halves merge, Purani becomes Smart =================
addScene('c16', 'c17+0.3', {
  svg: splitDynSVG('s10', bazaarBG('s10bz'), homeBG('s10hm', { noWindow: true, noShelf: true, noPlant: true, noClock: true })) +
    `<rect id="s10m" width="${W}" height="${H}" fill="${C.cream}" opacity="0"/>` + rosettes('s10r', 540, 820, .12, C.goldTan) +
    `<g id="s10a">${stand('s10p', KP, 330, 1000, .62)}</g><g id="s10b" opacity="0">${stand('s10q', KS, 330, 1000, .62)}</g>` +
    stand('s10s', KS, 760, 1000, .62) + handPhone('s10ph', BLUE, 1.15) + shimmerSVG('s10sh'),
  html: `<div class="title" style="top:360px;font-size:70px" data-t="c16">Aap <span class="g">kaunsi Komal</span> ho? 🤔</div>` +
    pillH(330, 560, '-1', 'Purani Komal', '', 'c16+0.75') + pillH(330, 560, 'c16+0.8', 'Smart <span class="hl">Komal</span> ✨', 'gold') + pillH(760, 560, '-1', 'Smart <span class="hl">Komal</span>', 'gold'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    splitAt('s10', 540); bazaarScroll('s10bz', 2310, t);
    const m = P(t, T('c16'), .4, E.io);
    op($('s10D'), 1 - m); op($('s10m'), m * .85);
    const sw = clamp((t - T('c16') - .45) / .5);
    op($('s10sh'), sw > 0 && sw < 1 ? 1 : 0); tf($('s10sh'), lerp(160, 500, E.io(sw)), 900, 1);
    op($('s10a'), 1 - E.io(clamp((sw - .3) / .4))); op($('s10b'), E.io(clamp((sw - .3) / .4)));
    const look = t > T('c16') + .2;
    life('s10p', t, Object.assign({}, HOT, { sweat: .5, look: [.8, .2], mouth: look ? 'big' : 'worry', brows: look ? 'up' : 'worry' }));
    life('s10q', t, { mouth: 'grin', brows: 'up', look: [.5, 0], y: hop(t, T('c16') + 1, 14), R: WAVE(t, T('c16') + 1), hR: 'open', seed: 2 });
    const S = life('s10s', t, { mouth: 'big', brows: 'up', look: [-.8, 0], L: [100, -50], hL: 'fist', seed: 5 });
    atHand('s10ph', 's10s', S.hl, -10, -80, -10);
  }
});

// ================= S8a CTA: Pehle phone pe dekho, phir seedha dukaan jao =================
addScene('c17+0.3', 'c19', {
  svg: homeBG('s11', { noWindow: true, noShelf: true, noPlant: true, noClock: true }) + rosettes('s11r', 540, 800, .1, C.goldTan) + `<circle cx="540" cy="880" r="480" fill="url(#glow)"/>` +
    bust('s11k', KS, 540, FLOOR + 300, 1.25) + counterSVG(FLOOR + 150, C.woodLight) +
    `<g transform="translate(800,820) scale(.5)">${phoneSVG('s11p', 0, 0, 560, 1000, browseScreen('s11b'))}</g>`,
  html: pillH(540, 352, 'c17+0.35', 'Pehle <span class="hl">phone</span> 📱', '', 'c18-0.05') + pillH(540, 352, 'c18', 'Phir <span class="hl">seedha dukaan</span> 🏪'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    tf($('s11r'), 540, 800, 1, t * 5);
    op($('s11b-sel'), 1); [0, 1, 2, 3].forEach(i => op($(`s11b-r${i}`), 1)); [0, 1, 2].forEach(i => chipOn('s11b', i, 1));
    life('s11k', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, look: [t < T('c18') ? .6 : 0, -.2], R: [150, -30], hR: 'point', L: [9, -14] });
  }
});

// ================= S8b end card: Download Anokhi Reet =================
addScene('c19', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s12r', 540, 760, .16, C.gold) + bust('s12k', KS, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s12wm" style="position:absolute;left:240px;top:330px;width:600px" src="">` +
    `<div class="title" style="top:600px;font-size:76px">Download <span class="g">Anokhi Reet</span> 👇</div>` +
    `<div style="position:absolute;left:540px;top:760px;transform:translate(-50%,-50%);display:flex;gap:24px" data-t="c19+0.2"><img id="s12as" style="height:96px" src=""><img id="s12gp" style="height:96px" src=""></div>` +
    pillH(540, 880, 'c19+0.35', 'anokhireet.in', 'gold big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const b = SEAL(); [['s12wm', 'logo-text.svg'], ['s12as', 'app-store-badge.svg'], ['s12gp', 'google-play-badge.svg']].forEach(([id, f]) => { const im = $(id); if (im) im.src = b.replace('seal-on-maroon.svg', f); }); },
  upd(t) {
    tf($('s12r'), 540, 760, 1, t * 5);
    const w = clamp((t - T('c19') - .2) / .35);
    life('s12k', t, { pivot: 0, mouth: 'grin', brows: 'up', R: [lerp(9, WAVE(t, T('c19'))[0], E.io(w)), lerp(-14, WAVE(t, T('c19'))[1], E.io(w))], hR: 'open', L: [9, -14], tilt: 4 });
  }
});
