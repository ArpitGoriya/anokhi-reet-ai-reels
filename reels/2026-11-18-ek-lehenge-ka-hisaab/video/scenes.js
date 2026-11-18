// ===== Ek lehenge ka hisaab: Hemaben works it out on her chalkboard (see captions.js) =====
// Chalk text is HTML (.chalk, written in with data-k="write"); chalk drawings are SVG (chalkSVG + chalkAuto).
// Board scenes keep the camera still (cam [1,1], noSettle) so HTML chalk and SVG chalk stay lined up.
const HB = HEMABEN, HBB = NOSKIRT(HEMABEN);
const CW = (x, y, at, html, fs = 60, cls = '', d = .55) => `<div class="chalk nc ${cls}" style="left:${x}px;top:${y}px;font-size:${fs}px" data-t="${at}" data-k="write" data-d="${d}">${html}</div>`;
const UDA = (at = '-1') => CW(110, 340, at, '<span style="border:4px solid #F4EFE3;border-radius:10px;padding:2px 14px">Udaharan ke liye 📝</span>', 34, '', .5);
const STILL = { cam: [1, 1], noSettle: true };
// chalk stick in a hand: put `${id}` at the hand each frame
const stick = id => `<g id="${id}"><rect x="-8" y="-30" width="16" height="44" rx="6" fill="${CHALK_W}" stroke="${OL}" stroke-width="3"/></g>`;
const toHand = (id, who, h, dy = -10) => { const p = toScene(who, h); tf($(id), p[0], p[1] + dy, 1, -20); };

// ================= S1 hook: "Ek lehenga aapko season mein kitna kamaake de sakta hai?" =================
addScene(0, 'c4', Object.assign({
  svg: chalkboardBG('b1') + chalkSVG(chalkAt(CHALK.lehenga, 300, 760, 1.5), { ct: -1 }) + stand('h1', HB, 820, 880, .8) + stick('h1-ch') +
    chalkDust(560, 820, 'c3+0.1') + chalkDust(560, 820, 'c3+0.45'),
  html: `<div class="title" style="top:410px" data-t="-1" data-out="c3-0.1">Ek lehenga =<br><span class="g">kitni kamaai?</span> 🧮</div>` +
    CW(420, 640, '-1', '₹ ?', 150, 'g', .01) + pillH(540, 420, 'c3', 'Chalo <span class="hl">hisaab</span> lagate hain 🧮'),
  upd(t, lt, s) {
    chalkAuto(s, t);
    const tap = t > T('c3') && t < T('c4') - .3, k = tap ? Math.max(0, Math.sin((t - T('c3')) * 18)) : 0;
    const { hl } = life('h1', t, { mouth: t > T('c3') ? 'grin' : 'big', brows: 'up', look: tap ? [-.8, 0] : [0, 0], L: tap ? [78 + k * 6, -8 - k * 10] : [40, -60], hL: 'fist', R: [9, -14], speak: true, seed: 1 });
    toHand('h1-ch', 'h1', hl);
  }
}, STILL));

// ================= S2: "Ye sirf ek udaharan hai… meri dukaan ka" =================
addScene('c4', 'c8', Object.assign({
  svg: chalkboardBG('b2') + bust('h2', HBB, 850, FLOOR + 70, .9) + stick('h2-ch') + counterSVG(FLOOR + 60),
  html: UDA('c4+0.1') + CW(110, 520, 'c6', 'Apne numbers', 64) + CW(110, 620, 'c7', 'khud <span style="color:#F8D36A">badal lena</span> ✏️', 64),
  upd(t, lt, s) {
    const toBox = t < T('c6'), toYou = t > T('c6') && t < T('c7') + .6;
    const { hl } = life('h2', t, { pivot: 0, speak: true, brows: 'sure', look: toBox ? [-.9, -.6] : [0, 0], L: toBox ? [110, 20] : [9, -14], hL: toBox ? 'point' : 'fist', R: toYou ? [70, -6] : CLASP, hR: toYou ? 'point' : 'fist', seed: 2 });
    toHand('h2-ch', 'h2', hl);
  }
}, STILL));

// ================= S3: one lehenga = ₹2,000 rent; +1 extra rental a month from online =================
addScene('c8', 'c15', Object.assign({
  svg: chalkboardBG('b3') + chalkSVG(chalkAt(CHALK.lehenga, 240, 560, 1.1), { ct: 'c8+0.1', cd: .9 }) +
    chalkSVG(chalkAt(CHALK.phone, 210, 830, .8), { ct: 'c10+0.1', cd: .6 }) +
    [0, 1, 2].map(i => `<g id="s3-p${i}">${chalkSVG(CHALK.person, { ct: `c11+${(.2 + i * .3).toFixed(1)}`, cd: .3, w: 6 })}</g>`).join('') +
    chalkSVG(chalkAt(CHALK.coin, 880, 560, 1), { ct: 'c14+0.1', cd: .5, col: C.gold }) +
    bust('h3', HBB, 900, FLOOR + 70, .86) + stick('h3-ch') + counterSVG(FLOOR + 60),
  html: UDA() + CW(390, 470, 'c8+0.6', '1 lehenga', 60) + CW(390, 560, 'c9', '= <span style="color:#F8D36A">₹2,000</span> rent', 60) +
    CW(330, 720, 'c11+0.2', '+1 extra rental / mahina', 50) + CW(330, 790, 'c12', '(online se) 📱', 44) +
    CW(310, 870, 'c14', '= <span style="color:#F8D36A">+₹2,000 / mahina</span>', 48),
  upd(t, lt, s) {
    chalkAuto(s, t);
    [0, 1, 2].forEach(i => { const k = E.io(clamp((t - T('c11') - .2 - i * .3) / 1.4)); tf($('s3-p' + i), lerp(210, 250 + i * 40, k) + (i - 1) * 30, lerp(790, 690, k), .8); op($('s3-p' + i), k > 0 ? 1 : 0); });
    const writing = t < T('c10') + .8;
    const { hl } = life('h3', t, { pivot: 0, speak: true, brows: t > T('c14') ? 'up' : 'sure', look: writing ? [-.9, -.3] : [0, 0], L: writing ? [100, 10] : [9, -14], hL: 'fist', R: t > T('c14') ? CLASP : [9, -14], seed: 3 });
    toHand('h3-ch', 'h3', hl);
  }
}, STILL));

// ================= S4: 15 outfits × ₹2,000 = ₹30,000 a month × 3 months = ₹90,000 =================
addScene('c15', 'c19', Object.assign({
  svg: chalkboardBG('b4') +
    [...Array(15)].map((_, i) => chalkSVG(chalkAt(CHALK.lehenga, 150 + (i % 5) * 190, 480 + Math.floor(i / 5) * 105, .38), { ct: `c15+${(.15 + i * .1).toFixed(2)}`, cd: .25, w: 5 })).join('') +
    chalkSVG(chalkAt(CHALK.ring(250, 70), 450, 1062, 1), { ct: 'c18+0.55', cd: .6, col: C.gold, w: 9 }) +
    [[230, 1000], [700, 1010], [460, 960]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c18+${(.9 + i * .1).toFixed(1)}" data-bob="6" data-ph="${i}">${sparkleSVG(22, C.gold)}</g></g>`).join(''),
  html: UDA() + CW(110, 800, 'c16', '₹2,000 × 15 = <span style="color:#F8D36A">₹30,000</span> / mahina', 52) +
    CW(110, 890, 'c17', '× 3 mahine (season) =', 52) + CW(260, 1000, 'c18', '₹90,000 ✨', 110, 'g', .5),
}, STILL, { upd(t, lt, s) { chalkAuto(s, t); } }));

// ================= S5: minus your own costs… the rest is yours =================
addScene('c19', 'c22', Object.assign({
  svg: chalkboardBG('b5') + chalkSVG(chalkAt(CHALK.underline(420), 330, 940, 1), { ct: 'c21+0.6', cd: .5, col: C.gold, w: 8 }) +
    chalkSVG(chalkAt(CHALK.coin, 640, 870, .9), { ct: 'c21+1.0', cd: .4, col: C.gold }) +
    bust('h5', HBB, 870, FLOOR + 70, .86) + stick('h5-ch') + counterSVG(FLOOR + 60),
  html: UDA() + CW(110, 470, '-1', '₹90,000', 80, 'g', .01) + CW(110, 600, 'c19+0.5', '− kharcha', 64) + CW(110, 690, 'c20+0.2', '(apni shop ka)', 46) +
    CW(110, 820, 'c21', '= <span style="color:#F8D36A">aapki kamaai</span> 💰', 64),
  upd(t, lt, s) {
    chalkAuto(s, t);
    const done = t > T('c21') + .6;
    const { hl } = life('h5', t, { pivot: 0, speak: true, brows: done ? 'up' : 'sure', look: done ? [0, 0] : [-.9, -.2], tilt: done ? 5 : 0, L: done ? [9, -14] : [100, 0], hL: 'fist', R: done ? CLASP : [9, -14], seed: 4 });
    toHand('h5-ch', 'h5', hl);
  }
}, STILL));

// ================= S6: how to start — WhatsApp, photos + rent price, shop live =================
addScene('c22', 'c27', Object.assign({
  svg: chalkboardBG('b6') + [0, 1, 2].map(i => chalkSVG(chalkAt(CHALK.box(64, 64), 150, 510 + i * 130, 1), { ct: ['c22+0.4', 'c23+0.2', 'c25+0.4'][i], cd: .3, col: i === 2 ? '#7FD3A0' : CHALK_W })).join('') +
    bust('h6', HBB, 800, FLOOR + 70, .9) + counterSVG(FLOOR + 60) +
    `<g id="s6-ph"><rect x="-56" y="-96" width="112" height="192" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-46" y="-84" width="92" height="168" rx="10" fill="#E3F3EA"/><circle cx="0" cy="-20" r="28" fill="${C.emerald}"/><path d="M-12,-22 l9,9 l16,-18" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="-34" y="26" width="68" height="12" rx="6" fill="#B9D9C6"/><rect x="-26" y="48" width="52" height="10" rx="5" fill="#B9D9C6"/></g>`,
  html: CW(110, 380, 'c22', 'Shuru kaise karein?', 56, 'g') +
    CW(130, 478, 'c22+0.4', '1&nbsp;&nbsp; 💬 WhatsApp pe message', 46) + CW(130, 608, 'c23+0.2', '2&nbsp;&nbsp; 📸 Photos + <span style="color:#F8D36A">rent price</span>', 46) +
    CW(130, 738, 'c25+0.4', '3&nbsp;&nbsp; ✅ Shop <span style="color:#7FD3A0">live</span>', 46) + pillH(400, 880, 'c26', 'Shuru karna <span class="hl">bilkul aasaan</span> ✅', 'gold'),
  upd(t, lt, s) {
    chalkAuto(s, t);
    const show = t > T('c23') - .2;
    const { hl, hr } = life('h6', t, { pivot: 0, speak: true, brows: 'sure', look: show ? [-.2, .2] : [-.8, -.3], L: show ? [6, -112] : [9, -14], R: show ? [6, -112] : [9, -14], hL: 'fist', hR: 'fist', seed: 5 });
    const p = toScene('h6', [(hl[0] + hr[0]) / 2, (hl[1] + hr[1]) / 2 - 30]); tf($('s6-ph'), p[0], p[1], 1); op($('s6-ph'), show ? 1 : 0);
  }
}, STILL));

// ================= S7: "Ab aapki baari" — she holds the chalk out to you =================
addScene('c27', 'c30', Object.assign({
  svg: chalkboardBG('b7') + chalkSVG(chalkAt(CHALK.ring(120, 120), 540, 640, 1), { ct: 'c28+0.2', cd: .6, col: C.gold, w: 9 }) +
    chalkSVG(chalkAt(CHALK.ring(80, 80), 540, 640, 1), { ct: 'c28+0.5', cd: .5, col: C.gold, w: 6 }) +
    bust('h7', HBB, 540, FLOOR + 190, 1.12) + counterSVG(FLOOR + 50) + stick('h7-ch'),
  html: CW(170, 360, 'c27+0.1', 'Apna <span style="color:#F8D36A">hisaab khud</span> lagao 🧮', 58) +
    `<div class="nc" style="position:absolute;left:495px;top:597px;font:900 64px Inter;color:#F8D36A" data-t="c28+0.8" data-k="fade">₹</div>`,
  upd(t, lt, s) {
    chalkAuto(s, t);
    const offer = E.out(clamp((t - T('c27') - .2) / .5));
    const { hr } = life('h7', t, { pivot: 0, speak: true, mouth: t > T('c30') - .3 ? 'grin' : undefined, brows: 'up', tilt: 4, R: [lerp(9, 92, offer), lerp(-14, -64, offer)], hR: 'fist', L: CLASP, seed: 6 });
    const p = toScene('h7', hr); tf($('h7-ch'), p[0] + 6, p[1] - 14, 1.6, -70 * offer);
  }
}, STILL));

// ================= S8: end card — Comment LIST =================
addScene('c30', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s8-r', 540, 760, .16, C.gold) + bust('h8', HBB, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s8-wm" style="position:absolute;left:240px;top:330px;width:600px" src="">` +
    `<div class="title" style="top:640px">Comment <span class="g">"LIST"</span> 👇</div>` + pillH(540, 800, 'c30+0.4', 'anokhireet.in', 'gold big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const im = $('s8-wm'); if (im) im.src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s8-r'), 540, 760, 1, t * 5); const w = clamp((t - T('c30') - .2) / .35); life('h8', t, { pivot: 0, speak: true, brows: 'up', R: [lerp(9, WAVE(t, T('c30'))[0], E.io(w)), lerp(-14, WAVE(t, T('c30'))[1], E.io(w))], hR: 'open', L: [9, -14], tilt: 4 }); }
});
