// ===== Dukaan-dukaan ki bhaag-daud (version 2): Purani Komal (left, the bazaar) vs Smart Komal (right, her sofa) =====
// Split screen with a moving divider (splitDynSVG / splitAt). Left side drawn around x = 270, right around x = 810.
// The app's name stays hidden ("? ? ?") until the reveal at c20.
const HOT = { mouth: 'worry', brows: 'worry', sweat: 1 };
const walkBob = t => -Math.abs(Math.sin(t * 9)) * 10;
// the left world: bazaar + Purani Komal standing (scene ids prefixed by p)
const leftWorld = (p, o = {}) => bazaarBG(p + 'bz', { noSun: o.noSun }) + (o.auto ? `<g id="${p}au">${autoSVG()}<g transform="translate(-60,-320)"><text font-family="Inter" font-weight="900" font-size="54" fill="${C.red}" stroke="#fff" stroke-width="10" paint-order="stroke">BEEP! BEEP!</text></g></g>` : '') +
  `<g id="${p}kw">${stand(p + 'k', KP, 270, 1000, .62)}</g>` + handBag(p + 'bag') + (o.card ? handCard(p + 'cd') : '');
// the right world: home, sofa, Smart Komal sitting
const rightWorld = (p, o = {}) => homeBG(p + 'hm', { noWindow: true, noShelf: true, noPlant: true, noClock: true }) + `<circle cx="810" cy="900" r="360" fill="url(#glow)" opacity=".7"/>` +
  sofaBackSVG(810, FLOOR + 110, 520) + bust(p + 'k', KS, 810, FLOOR + 110, .82) + sofaFrontSVG(810, FLOOR + 110, 520) +
  (o.card ? handCard(p + 'cd') : '') + (o.chai ? `<g id="${p}ch"><g transform="scale(.8)">${chaiSVG()}</g></g>` : '') + (o.phone ? handPhone(p + 'ph', BLUE, 1.0) : '');
const homeQuiet = id => homeBG(id, { noWindow: true, noShelf: true, noPlant: true, noClock: true });

// ================= S1 hook: ek hi Komal, ek hi reception — 4 ghante vs 15 minute — fark kya tha? =================
addScene(0, 'c5', {
  svg: splitDynSVG('s1', leftWorld('s1L', { card: true, noSun: true }), rightWorld('s1R', { card: true })),
  html: `<div class="title" style="top:410px;font-size:96px" data-t="-1" data-out="c4-0.1">Ek hi Komal…<br><span class="g">4 ghante</span> vs <span class="g">15 min</span></div>` +
    `<div class="title" style="top:410px;font-size:104px" data-t="c4">Fark kya tha? 🤔</div>` +
    pillH(270, 600, '-1', 'Purani <span class="hl">Komal</span>') + pillH(810, 600, '-1', 'Smart <span class="hl">Komal</span>', 'gold') +
    pillH(270, 1250, 'c2b+0.2', '⏱️ 4 ghante', 'big') + pillH(760, 1250, 'c3+0.9', '⏱️ 15 min', 'gold big'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    splitAt('s1', 540); bazaarScroll('s1Lbz', 0, t);
    const ask = t > T('c4');
    const A = life('s1Lk', t, Object.assign({}, HOT, { sweat: t > T('c2') ? 1 : .4, look: ask ? [0, 0] : [.3, .4], brows: ask ? 'up' : 'worry', R: [24, -112], hR: 'fist', L: [9, -14] }));
    atHand('s1Lcd', 's1Lk', A.hr, 0, -50, -6); atHand('s1Lbag', 's1Lk', A.hl, 0, -10);
    const B = life('s1Rk', t, { pivot: 0, mouth: t > T('c3') ? 'grin' : 'smile', brows: ask ? 'up' : 'norm', look: ask ? [0, 0] : [-.2, .4], R: [24, -112], hR: 'fist', L: CLASP, tilt: ask ? 6 : 0, seed: 3 });
    atHand('s1Rcd', 's1Rk', B.hr, 0, -50, 6);
  }
});

// ================= S2 left widens: dhoop, traffic, shop after shop, "Price kitna hai?" =================
addScene('c5', 'c8', {
  svg: splitDynSVG('s2', leftWorld('s2L', { auto: true }), rightWorld('s2R', { chai: true })),
  html: pillH(395, 352, 'c5+0.2', 'Dhoop ☀️ <span class="hl">Traffic</span> 🚗') +
    `<div class="pill big" id="s2cnt" style="left:395px;top:470px" data-t="c5+0.4">Dukaan: 1</div>` +
    `<div class="bubble" style="left:470px;top:640px" data-t="c7-0.05">"Price <span class="hl">kitna hai?</span>"</div>`,
  cam: [1, 1.03], fy: 900,
  upd(t) {
    splitAt('s2', KF(t, [[T('c5'), 540], [T('c5') + .6, 790]]));
    const stop = T('c7') - .25, walking = t < stop;
    bazaarScroll('s2Lbz', (Math.min(t, stop) - T('c5')) * 330, t);
    tf($('s2Lkw'), 0, walking ? walkBob(t) : 0, 1);
    const asks = !walking;
    const A = life('s2Lk', t, Object.assign({}, HOT, { mouth: asks ? talkMouth(t, true) : 'worry', look: asks ? [.7, -.2] : [.4, 0], tilt: walking ? Math.sin(t * 9) * 2 : 4,
      R: asks ? [96, -30] : [9 + Math.sin(t * 9) * 12, -14], hR: asks ? 'open' : 'fist', L: [9 - Math.sin(t * 9) * 12, -14] }));
    atHand('s2Lbag', 's2Lk', A.hl, 0, -10, Math.sin(t * 9) * 8);
    const n = t < T('c6') ? 1 : t < T('c6') + .9 ? 4 : t < T('c7') + .4 ? 7 : 10;
    const el = $('s2cnt'); if (el && el.dataset.n !== String(n)) { el.dataset.n = n; el.innerHTML = `Dukaan: <span class="hl">${n}</span>`; }
    const au = T('c5') + .3, ax = KF(t, [[au, 760], [au + 2.4, -260]], E.lin);
    tf($('s2Lau'), ax, FLOOR + 170 + Math.abs(Math.sin(t * 14)) * 4, .62); op($('s2Lau'), t > au && t < au + 2.5 ? 1 : 0);
    const B = life('s2Rk', t, { pivot: 0, mouth: 'smile', closed: true, look: [0, .3], tilt: -6, lean: -2, L: [40, -120], hL: 'fist', R: CLASP, seed: 3 });
    atHand('s2Rch', 's2Rk', B.hl, 0, -40);
  }
});

// ================= S3 right widens: sofa, chai aur phone =================
addScene('c8', 'c9', {
  svg: splitDynSVG('s3', leftWorld('s3L'), rightWorld('s3R', { chai: true, phone: true })),
  html: pillH(685, 352, 'c8+0.95', 'Sofa 🛋️') + pillH(685, 452, 'c8+1.6', 'Chai ☕', 'gold') + pillH(685, 552, 'c8+2.2', '<span class="hl">Phone</span> 📱'),
  cam: [1, 1.03], fy: 900,
  upd(t) {
    splitAt('s3', KF(t, [[T('c8'), 790], [T('c8') + .6, 290]]));
    bazaarScroll('s3Lbz', 1900 + (t - T('c8')) * 330, t);
    tf($('s3Lkw'), 0, walkBob(t), 1);
    const A = life('s3Lk', t, Object.assign({}, HOT, { look: [.4, 0], R: [9 + Math.sin(t * 9) * 12, -14], L: [9 - Math.sin(t * 9) * 12, -14] }));
    atHand('s3Lbag', 's3Lk', A.hl, 0, -10);
    const sip = P(t, T('c8') + 1.4, .4, E.io) * (1 - P(t, T('c8') + 2.0, .3, E.io)), ph = P(t, T('c8') + 2.1, .35, E.io);
    const B = life('s3Rk', t, { pivot: 0, mouth: sip > .5 ? 'o' : 'big', brows: 'up', closed: sip > .5, look: ph > .5 ? [0, .7] : [-.2, 0], tilt: -4, lean: -2,
      L: [lerp(30, 40, sip), lerp(-100, -150, sip)], hL: 'fist', R: [lerp(14, 30, ph), lerp(-20, -118, ph)], hR: 'fist', seed: 3 });
    atHand('s3Rch', 's3Rk', B.hl, 0, -40); atHand('s3Rph', 's3Rk', B.hr, -10, -70, -6); op($('s3Rph'), P(t, T('c8') + 2.0, .2));
  }
});

// ================= S4a: "Usne phone pe outfits dekhe" — which app? not yet =================
addScene('c9', 'c10', {
  svg: homeQuiet('s4') + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + sofaBackSVG(540, FLOOR + 260, 980) +
    bust('s4k', KS, 540, FLOOR + 260, 1.2) + sofaFrontSVG(540, FLOOR + 260, 980) + `<g id="s4ph">${phoneBackSVG(1.15)}</g>`,
  html: pillH(540, 352, 'c9+0.2', '<span class="hl">Phone</span> pe outfits 👗') + pillH(540, 452, 'c9+0.8', 'App ka naam? <span class="hl">End mein</span> 🤫'),
  cam: [1, 1.06], fy: 900,
  upd(t) {
    const B = life('s4k', t, { pivot: 0, mouth: 'smile', brows: 'norm', look: [0, .8], R: [30, -118], L: [30, -118], hR: 'fist', hL: 'fist', tilt: -3 });
    const p = toScene('s4k', B.hr), q = toScene('s4k', B.hl); tf($('s4ph'), (p[0] + q[0]) / 2, (p[1] + q[1]) / 2 - 90, 1, 0);
  }
});

// ================= S4b: "Wow, itne saare options!" — outfits fan out of the phone =================
addScene('c10', 'c11', {
  svg: homeQuiet('s5') + `<circle cx="540" cy="820" r="520" fill="url(#glow)"/>` + sofaBackSVG(540, FLOOR + 300, 980) +
    bust('s5k', KS, 540, FLOOR + 300, 1.3) + sofaFrontSVG(540, FLOOR + 300, 980) + `<g id="s5ph">${phoneBackSVG(1.2)}</g>` +
    [[150, 560], [330, 470], [750, 470], [930, 560], [150, 820], [930, 820]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c10+${(.75 + i * .12).toFixed(2)}" data-bob="6" data-ph="${i}"><rect x="-74" y="-100" width="148" height="200" rx="14" fill="#fff" stroke="${OL}" stroke-width="4"/><rect x="-62" y="-88" width="124" height="150" rx="10" fill="${C.cream}"/><g transform="translate(0,-40)">${lehengaHangerSVG('', { c: SHOP_LEH[i][0], d: SHOP_LEH[i][1], dupatta: C.goldTan }, .26)}</g><rect x="-56" y="72" width="80" height="14" rx="7" fill="#E6E0D9"/></g></g>`).join(''),
  html: `<div class="bubble" style="left:540px;top:380px" data-t="c10+0.25">"Wow, itne saare <span class="hl">options!</span>" 😍</div>`,
  cam: [1, 1.05], fy: 820,
  upd(t) {
    const B = life('s5k', t, { pivot: 0, mouth: t < T('c10') + .9 ? 'o' : 'big', brows: 'up', look: [0, -.4], R: [30, -118], L: [30, -118], y: hop(t, T('c10') + .2, 14) });
    const p = toScene('s5k', B.hr), q = toScene('s5k', B.hl); tf($('s5ph'), (p[0] + q[0]) / 2, (p[1] + q[1]) / 2 - 90, 1, 0);
  }
});

// ================= S4c: the app (name hidden) — city, occasion, budget; photos, rent, compare; the blue one =================
addScene('c11', 'c13', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s6r', 540, 860, .1, C.goldTan) + `<circle cx="540" cy="860" r="480" fill="url(#glow)"/>` +
    `<g transform="translate(540,880) scale(.95)">${phoneSVG('s6p', 0, 0, 560, 1000, browseScreen('s6b', true))}</g>`,
  html: pillH(540, 352, 'c11+0.3', 'City • Occasion • <span class="hl">Budget</span>', '', 'c12-0.05') +
    pillH(540, 352, 'c12', 'Photos 📸 <span class="hl">Rent price</span> 💰'),
  cam: [1, 1.04], fy: 880,
  upd(t) {
    tf($('s6r'), 540, 860, 1, t * 5);
    [.6, 1.2, 1.95].forEach((d, i) => chipOn('s6b', i, P(t, T('c11') + d, .2)));
    [0, 1, 2, 3].forEach(i => {
      const k = pop(t, T('c11') + .7 + i * .15), bnc = 1 + Math.sin(clamp((t - T('c12') - i * .08) / .3) * Math.PI) * .06;
      const cmp = (i === 1 || i === 2) ? Math.max(0, Math.sin(clamp((t - T('c12') - 1.3) / .9) * Math.PI * 2 + (i === 2 ? Math.PI : 0))) * .07 : 0;
      tf($(`s6b-k${i}`), 0, 0, k.s * bnc * (1 + cmp)); op($(`s6b-k${i}`), k.o);
      op($(`s6b-r${i}`), P(t, T('c12') + .75 + i * .1, .2));
    });
    op($('s6b-sel'), P(t, T('c12') + 2.2, .25));
  }
});

// ================= S4d: sab ghar baithe =================
addScene('c13', 'c14', {
  svg: homeQuiet('s7') + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + sofaBackSVG(540, FLOOR + 260, 980) +
    bust('s7k', KS, 540, FLOOR + 260, 1.2) + sofaFrontSVG(540, FLOOR + 260, 980) + handPhone('s7ph', BLUE, 1.6) + checkBadge(700, 760, 'c13+0.3', 44),
  html: pillH(540, 352, 'c13+0.05', 'Sab <span class="hl">ghar baithe</span> 🏠'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const B = life('s7k', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.3, -.2], R: [70, -80], hR: 'fist', L: CLASP, tilt: 5, y: hop(t, T('c13') + .1, 12) });
    atHand('s7ph', 's7k', B.hr, 10, -100, 6);
  }
});

// ================= S5: one shop, straight in: "Ye wala." — done =================
addScene('c14', 'c17', {
  svg: rentalShopBG('s8', { sign: 'HETALBEN RENTALS', signY: 228, noMirror: true }) + bust('s8h', HETALBEN, 800, FLOOR + 90, 1.0) +
    `<g id="s8kw">${bust('s8k', KS, 0, FLOOR + 90, 1.0)}</g>` + `<g id="s8g">${lehengaHangerSVG('s8gown', BLUE, .7)}</g>` + counterSVG() + handPhone('s8ph', BLUE, 1.5) +
    checkBadge(540, 560, 'c16', 60),
  html: pillH(540, 352, 'c14+0.15', 'Sirf <span class="hl">1 dukaan</span> ✅') +
    `<div class="bubble" style="left:330px;top:600px" data-t="c14+0.7" data-out="c15+0.4">"Ye wala." 📱</div>`,
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const kx = KF(t, [[T('c14'), -120], [T('c14') + .7, 290]]);
    tf($('s8kw'), kx, t < T('c14') + .7 ? walkBob(t) : 0, 1); PL['s8k'].x = kx;
    const show = P(t, T('c14') + .5, .35, E.io);
    const A = life('s8k', t, { pivot: 0, mouth: t > T('c15') + .4 ? 'grin' : 'big', brows: 'up', look: [.7, -.1], R: [lerp(9, 100, show), lerp(-14, -60, show)], hR: 'fist', L: [9, -14] });
    atHand('s8ph', 's8k', A.hr, 10, -90, 8); op($('s8ph'), t > T('c14') + .4 ? 1 : 0);
    const give = P(t, T('c15'), .7, E.io);
    life('s8h', t, { pivot: 0, mouth: 'big', brows: 'up', look: [-.7, 0], L: [lerp(9, 110, give), lerp(-14, -40, give)], hL: 'open', nod: t > T('c14') + 1 && t < T('c15') ? Math.sin(t * 12) * 5 : 0, seed: 6 });
    tf($('s8g'), lerp(940, 560, give), 640 + Math.sin(t * 3) * 4, 1, Math.sin(t * 2) * 3 * (1 - give)); op($('s8g'), P(t, T('c15') - .2, .2));
  }
});

// ================= S6: Purani Komal at dukaan no. 10, tumbleweed rolls past =================
addScene('c17', 'c19', {
  svg: bazaarBG('s9bz') + `<rect x="-10" y="${FLOOR - 40}" width="${W + 20}" height="60" fill="#BDB3A3" stroke="${OL}" stroke-width="4"/>` +
    bust('s9k', KP, 540, FLOOR + 60, 1.0) + lapSVG(540, FLOOR + 60, KP.skirt, 1) +
    `<g transform="translate(820,${FLOOR + 40}) rotate(-14)">${handBag('s9bag', .36)}</g>` + handCard('s9cd', .5) +
    `<g id="s9tw">${tumbleweedSVG(70)}</g>`,
  html: pillH(540, 352, 'c17+0.1', 'Aur <span class="hl">Purani Komal?</span>', '', 'c18-0.05') + pillH(540, 352, 'c18', 'Dukaan <span class="hl">no. 10…</span> 😮‍💨'),
  cam: [1, 1.05], fy: 1000,
  upd(t) {
    bazaarScroll('s9bz', 9 * 300 + 150 - 540, t);
    const A = life('s9k', t, { pivot: 0, mouth: 'sad', brows: 'worry', sweat: 1, closed: Math.sin(t * 1.3) > .6, tilt: -8, nod: 8, look: [.5, .3],
      R: [120 + Math.sin(t * 16) * 14, -100 + Math.sin(t * 16) * 10], hR: 'fist', L: [20, -70] });
    atHand('s9cd', 's9k', A.hr, 0, -40, -30 + Math.sin(t * 16) * 12);
    const tw = P(t, T('c18') - .2, 2.2, E.lin);
    tf($('s9tw'), lerp(1220, -180, tw), FLOOR + 190 - Math.abs(Math.sin(tw * 9)) * 40, 1, -tw * 900);
  }
});

// ================= S7: "Toh fark kya tha? Ek app… Anokhi Reet!" — the reveal, then the switch =================
addScene('c19', 'c21+0.6', {
  svg: splitDynSVG('s10', bazaarBG('s10bz', { noSun: true }), homeQuiet('s10hm')) +
    `<rect id="s10m" width="${W}" height="${H}" fill="${C.cream}" opacity="0"/>` + rosettes('s10r', 540, 820, .12, C.goldTan) + `<circle id="s10gl" cx="540" cy="820" r="460" fill="url(#glow)" opacity="0"/>` +
    `<g id="s10a">${stand('s10p', KP, 250, 1000, .62)}</g><g id="s10b" opacity="0">${stand('s10q', KS, 250, 1000, .62)}</g>` +
    stand('s10s', KS, 830, 1000, .62) +
    `<g id="s10big"><g transform="scale(.56)">${phoneSVG('s10p2', 0, 0, 560, 1000, browseScreen('s10br', true))}</g></g>` +
    [[400, 560], [690, 540], [360, 900], [720, 940], [540, 470]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c20+${(.55 + i * .06).toFixed(2)}" data-out="c20+1.6">${sparkleSVG(30, C.gold)}</g></g>`).join('') +
    shimmerSVG('s10sh'),
  html: `<div class="title" style="top:360px;font-size:80px" data-t="c19" data-out="c20+0.3">Toh <span class="g">fark kya tha?</span> 🤔</div>` +
    `<div class="title" style="top:360px;font-size:80px" data-t="c20+0.6">Fark tha: <span class="g">Anokhi Reet</span></div>` +
    pillH(270, 1250, '-1', 'Purani Komal', '', 'c20+1.5') + pillH(270, 1250, 'c20+1.55', 'Ab <span class="hl">Smart</span> ✨', 'gold') + pillH(770, 1250, '-1', 'Smart <span class="hl">Komal</span>', 'gold'),
  cam: [1, 1.03], fy: 900, capY: 1330,
  upd(t) {
    splitAt('s10', 540); bazaarScroll('s10bz', 2310, t);
    const m = P(t, T('c19'), .4, E.io);
    op($('s10D'), 1 - m); op($('s10m'), m * .85);
    // the big phone rises between them; its header flips from "? ? ?" to Anokhi Reet on the name
    const up = P(t, T('c19') + .3, .5, E.out), rv = P(t, T('c20') + .55, .25, E.io), go = P(t, T('c20') + 1.05, .5, E.io);
    tf($('s10big'), lerp(540, 470, go), lerp(1200, 800, up) + Math.sin(t * 2) * 6, lerp(1, .8, go) * (1 + Math.sin(clamp((t - T('c20') - .55) / .35) * Math.PI) * .08), lerp(0, -8, go));
    op($('s10big'), up * (1 - P(t, T('c21') - .1, .3)));
    op($('s10br-real'), rv); op($('s10gl'), rv * .9);
    op($('s10br-sel'), 1); [0, 1, 2, 3].forEach(i => op($(`s10br-r${i}`), 1)); [0, 1, 2].forEach(i => chipOn('s10br', i, 1));
    // the switch: a gold shimmer sweeps over Purani Komal and she becomes Smart Komal
    const sw = clamp((t - T('c20') - 1.2) / .55);
    op($('s10sh'), sw > 0 && sw < 1 ? 1 : 0); tf($('s10sh'), lerp(60, 440, E.io(sw)), 900, 1);
    op($('s10a'), 1 - E.io(clamp((sw - .3) / .4))); op($('s10b'), E.io(clamp((sw - .3) / .4)));
    const seen = t > T('c20') + .6;
    life('s10p', t, Object.assign({}, HOT, { sweat: .6, look: seen ? [.7, -.2] : [.4, 0], mouth: seen ? 'o' : 'worry', brows: seen ? 'up' : 'worry' }));
    life('s10q', t, { mouth: 'grin', brows: 'up', look: [.5, 0], y: hop(t, T('c20') + 1.9, 14), R: WAVE(t, T('c20') + 1.9), hR: 'open', seed: 2 });
    life('s10s', t, { mouth: seen ? 'grin' : 'big', brows: 'up', look: [-.6, 0], L: [lerp(60, 110, go), lerp(-40, -60, go)], hL: 'open', y: hop(t, T('c20') + .6, 12), seed: 5 });
  }
});

// ================= S8a: Pehle phone pe dekho, phir seedha dukaan jao =================
addScene('c21+0.6', 'c23', {
  svg: homeQuiet('s11') + rosettes('s11r', 540, 800, .1, C.goldTan) + `<circle cx="540" cy="880" r="480" fill="url(#glow)"/>` +
    bust('s11k', KS, 540, FLOOR + 300, 1.25) + counterSVG(FLOOR + 150, C.woodLight) +
    `<g transform="translate(800,820) scale(.5)">${phoneSVG('s11p', 0, 0, 560, 1000, browseScreen('s11b'))}</g>`,
  html: pillH(540, 352, 'c21+0.65', 'Pehle <span class="hl">phone</span> 📱', '', 'c22-0.05') + pillH(540, 352, 'c22', 'Phir <span class="hl">seedha dukaan</span> 🏪'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    tf($('s11r'), 540, 800, 1, t * 5);
    op($('s11b-sel'), 1); [0, 1, 2, 3].forEach(i => op($(`s11b-r${i}`), 1)); [0, 1, 2].forEach(i => chipOn('s11b', i, 1));
    life('s11k', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, look: [t < T('c22') ? .6 : 0, -.2], R: [150, -30], hR: 'point', L: [9, -14] });
  }
});

// ================= S8b end card: Purani ya Smart? Comment karo — and the app =================
addScene('c23', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s12r', 540, 760, .16, C.gold) +
    bust('s12p', KP, 300, FLOOR + 330, .85) + bust('s12k', KS, 780, FLOOR + 330, .85) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s12wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:520px;font-size:90px">Purani ya Smart?<br><span class="g">Comment karo</span> 👇</div>` +
    `<div style="position:absolute;left:540px;top:730px;transform:translate(-50%,-50%);font-weight:700;font-size:34px;color:#FFF2DF">Download the app</div>` +
    `<div style="position:absolute;left:540px;top:810px;transform:translate(-50%,-50%);display:flex;gap:24px" data-t="c23+0.3"><img id="s12as" style="height:92px" src=""><img id="s12gp" style="height:92px" src=""></div>` +
    pillH(540, 925, 'c23+0.45', 'anokhireet.in', 'gold') +
    pillH(300, 1060, 'c24+0.6', 'Purani 🥵') + pillH(780, 1060, 'c24+1.2', 'Smart 📱', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const b = SEAL(); [['s12wm', 'logo-text.svg'], ['s12as', 'app-store-badge.svg'], ['s12gp', 'google-play-badge.svg']].forEach(([id, f]) => { const im = $(id); if (im) im.src = b.replace('seal-on-maroon.svg', f); }); },
  upd(t) {
    tf($('s12r'), 540, 760, 1, t * 5);
    life('s12p', t, Object.assign({}, HOT, { pivot: 0, sweat: .6, mouth: 'smile', look: [.4, 0], y: hop(t, T('c24') + .6, 12), L: t > T('c24') + .6 ? WAVE(t, T('c24') + .6) : [9, -14], hL: 'open' }));
    life('s12k', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.4, 0], y: hop(t, T('c24') + 1.2, 12), R: t > T('c24') + 1.2 ? WAVE(t, T('c24') + 1.2) : [9, -14], hR: 'open', seed: 4 });
  }
});
