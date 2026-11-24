// ===== Rental dukaan hai? Customer kahan hain? (Riya from Team Anokhi Reet talks to shop owners) =====
// Short reel: quick cuts, one line per shot. The app's name is shown first at "Anokhi Reet pe hai".
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const flash = id => `<rect id="${id}" width="${W}" height="${H}" fill="#fff" opacity="0"/>`;
const sparks = (pts, at) => pts.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="${at}+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(28, C.gold)}</g></g>`).join('');
const DESK = counterSVG(FLOOR + 170, '#5D0000'); // the presenter's desk (hides her waist)
const riya = (id, x = 540, sc = 1.45) => bust(id, RIYA, x, FLOOR + 260, sc);
const xMark = (x, y, at, r = 70) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="pop">${crossSVG(r)}</g></g>`;

// ================= S1 hook: Riya leans in — "Rental dukaan hai? Customer kahan hain?" =================
addScene(0, 'c4', {
  svg: studioBG('s1') + riya('s1r') + DESK,
  html: `<div class="title" style="top:440px;font-size:76px" data-t="-1">Rental dukaan hai?<br><span class="g">Customer kahan hain?</span> 🤔</div>` +
    pillH(540, 650, 'c1+0.4', 'Team Anokhi Reet 👋', 'gold', 'c3'),
  cam: (t, lt) => 1 + .14 * E.io(clamp((t - T('c2')) / 1.6)), fy: 1000,
  upd(t) {
    tf($('s1-ring'), 540, 760, 1, t * 6);
    const ask = t > T('c3');
    life('s1r', t, { pivot: 0, speak: true, brows: ask ? 'up' : 'norm', look: [0, 0], tilt: ask ? 8 : 3, nod: ask ? 6 : 0,
      R: t < T('c2') ? WAVE(t, 0) : [9, -14], hR: 'open', L: ask ? [70, -120] : [9, -14], hL: 'open', seed: 3 });
  }
});

// ================= S2a the shop: full of outfits, the day passes waiting =================
addScene('c4', 'c7', {
  svg: rentalShopBG('s2', { noMirror: true }) + dayNightWindowSVG('s2w', 540, 560) + bust('s2m', MAHESH, 540, FLOOR + 190, .95) + counterSVG(FLOOR + 150) +
    clockSVG('s2c', 840, 1270, 50),
  html: pillH(540, 352, 'c4', 'Maal hai ✅', '', 'c5-0.05') + pillH(540, 352, 'c5', 'Customer ka <span class="hl">wait</span> ⏳'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const k = P(t, T('c5') - .2, 2.6, E.io); dayNight('s2w', k);
    tf($('s2c-m'), 0, 0, 1, t * 400); tf($('s2c-h'), 0, 0, 1, t * 34);
    const yawn = t > T('c6') + .2;
    life('s2m', t, { pivot: 0, mouth: yawn ? 'o' : (t > T('c5') ? 'flat' : 'smile'), brows: yawn ? 'worry' : 'norm', closed: yawn && t < T('c6') + 1,
      look: t > T('c5') ? [.9, 0] : [-.5, -.3], tilt: yawn ? -10 : 0,
      L: t < T('c5') ? [100, -40] : [9, -14], hL: 'open', R: yawn ? [40, -150] : [9, -14], hR: 'fist', seed: 2 });
  }
});

// ================= S2b pamphlets, status — tried it all =================
addScene('c7', 'c8', {
  svg: rentalShopBG('s2b', { noMirror: true }) + dayNightWindowSVG('s2bw', 540, 560) + bust('s2bm', MAHESH, 540, FLOOR + 190, .95) + counterSVG(FLOOR + 150) +
    `<g transform="translate(220,1020) scale(.8)"><g data-t="c7+0.1" data-k="drop">${pamphletSVG()}</g></g>` + xMark(220, 1020, 'c7+0.6') +
    `<g transform="translate(860,980) scale(.8)"><g data-t="c7+0.5" data-k="drop">${statusPhoneSVG()}</g></g>` + xMark(860, 980, 'c7+1.1'),
  html: pillH(540, 352, 'c7', 'Pamphlet ❌ · Status ❌'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    dayNight('s2bw', 1);
    const shrug = t > T('c7') + 1.2;
    life('s2bm', t, { pivot: 0, mouth: shrug ? 'sad' : 'worry', brows: 'worry', look: t > T('c7') + .6 ? [.8, .3] : [-.8, .3], y: shrug ? hop(t, T('c7') + 1.2, -14) : 0,
      L: shrug ? [70, -110] : [9, -14], R: shrug ? [70, -110] : [9, -14], hL: 'open', hR: 'open', seed: 2 });
  }
});

// ================= S3a the truth: Riya holds up her phone =================
addScene('c8', 'c9', {
  svg: studioBG('s3a') + riya('s3ar') + `<g id="s3aph">${phoneBackSVG(1.4)}</g>` + DESK,
  html: pillH(540, 352, 'c8', 'Sach yeh hai… 📱'),
  cam: [1.06, 1.1], fy: 1000,
  upd(t) {
    tf($('s3a-ring'), 540, 760, 1, t * 6);
    const A = life('s3ar', t, { pivot: 0, speak: true, brows: 'sure', look: [.5, -.2], tilt: 4, R: [120, -80], hR: 'fist', L: [9, -14], seed: 3 });
    atHand('s3aph', 's3ar', A.hr, -10, -150, 6);
  }
});

// ================= S3b the customer: Khushi on the sofa, scrolling outfits (no more shop-to-shop) =================
addScene('c9', 'c11', {
  svg: homeBG('s3', { noClock: true }) + sofaSVG(540, 1150) + bust('s3k', KHUSHI, 540, 1260, .95) +
    `<rect x="190" y="1230" width="700" height="44" rx="12" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/><rect x="220" y="1272" width="640" height="130" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<g id="s3ph"><g transform="scale(.42)">${phoneSVG('s3p', 0, 0, 560, 1000, arFeedScreen('s3f'))}</g></g>` +
    `<g transform="translate(620,520)"><g data-t="c9+0.1" data-k="pop" data-out="c10">${crossThoughtSVG('s3x', 'Dukaan-dukaan ghoomna? 🚶‍♀️', 560)}</g></g>`,
  html: pillH(540, 352, 'c10', 'Customer <span class="hl">phone pe</span> dhoondh raha hai 📱'),
  cam: [1, 1.05], fy: 950,
  upd(t) {
    op($('s3x-x'), t > T('c9') + 1.1 ? 1 : 0);
    tf($('s3f-feed'), 0, -((t * 260) % 1200));
    const A = life('s3k', t, { pivot: 0, mouth: t > T('c10') ? 'grin' : 'smile', brows: 'up', look: [.6, .5], tilt: 5, R: [100, -95], hR: 'fist', L: [9, -14], seed: 4 });
    atHand('s3ph', 's3k', A.hr, 20, -130, 8);
  }
});

// ================= S4a "screen recording": the app scrolls shops and outfits; the name appears =================
addScene('c11', 'c13', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + `<circle cx="540" cy="800" r="560" fill="url(#glow)"/>` +
    `<g transform="translate(540,800) scale(1.05)">${phoneSVG('s4p', 0, 0, 560, 1000, arFeedScreen('s4f'))}</g>` + flash('s4fl') +
    sparks([[160, 520], [930, 600], [150, 1120], [940, 1180]], 'c12'),
  html: '',
  cam: [1, 1.03], fy: 800,
  upd(t) {
    tf($('s4f-feed'), 0, -((t * 220) % 1200));
    const r = t > T('c12'); op($('s4f-q'), r ? 0 : 1); op($('s4f-real'), r ? 1 : 0);
    const f = P(t, T('c12'), .15); op($('s4fl'), f > 0 && f < 1 ? .7 * (1 - f) : 0);
  }
});

// ================= S4b "Customer humare paas hai" (points at herself) — "aapko" (points at you) =================
addScene('c13', 'c15', {
  svg: studioBG('s4b') + [[250, 620], [830, 600], [200, 880], [880, 860], [540, 560]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c13+${(.2 + i * .12).toFixed(2)}" data-k="pop" data-bob="7" data-ph="${i}"><g transform="scale(.9)">${personIcon([C.pink, C.teal, C.marigold, '#7A4FA0', C.emerald][i])}</g></g></g>`).join('') +
    riya('s4br') + DESK,
  html: pillH(540, 352, 'c13', 'Customer <span class="hl">humare paas</span> hai 🤝') + pillH(540, 460, 'c14', '👉 Aap bas <span class="hl">dukaan list</span> karo', 'gold'),
  cam: [1, 1.05], fy: 1000,
  upd(t) {
    tf($('s4b-ring'), 540, 760, 1, t * 6);
    const you = t > T('c14');
    life('s4br', t, { pivot: 0, speak: true, brows: 'sure', look: you ? [0, 0] : [-.2, .1], tilt: you ? 0 : -4,
      L: you ? [9, -14] : [30, -140], hL: 'point', R: you ? [90, -10] : [9, -14], hR: 'point', y: hop(t, T('c14'), 10), seed: 3 });
  }
});

// ================= S5 how easy: Riya counts on her fingers — 1 WhatsApp, 2 easy setup =================
addScene('c15', 'c17', {
  svg: studioBG('s5') + riya('s5r') + DESK +
    `<g transform="translate(850,820)"><g data-t="c15" data-k="pop" data-out="c16-0.05"><circle r="60" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/><text y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="80" fill="${C.redDark}">1</text></g></g>` +
    `<g transform="translate(850,820)"><g data-t="c16" data-k="pop"><circle r="60" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/><text y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="80" fill="${C.redDark}">2</text></g></g>`,
  html: pillH(540, 470, 'c15+0.2', '✅ <span class="hl">WhatsApp</span> se shuru', 'big') + pillH(540, 600, 'c16+0.4', '✅ <span class="hl">Aasaan</span> setup', 'big'),
  cam: [1, 1.04], fy: 1000,
  upd(t) {
    tf($('s5-ring'), 540, 760, 1, t * 6);
    const two = t > T('c16');
    life('s5r', t, { pivot: 0, speak: true, brows: 'up', look: [.6, -.3], tilt: 5, R: [160, -10], hR: two ? 'two' : 'point', L: [9, -14], y: hop(t, two ? T('c16') : T('c15'), 10), seed: 3 });
  }
});

// ================= S6 end card: "Customer dhoondhna humara kaam. Outfit dena aapka." — Comment SHOP =================
addScene('c17', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s6ro', 540, 760, .16, C.gold) + bust('s6r', RIYA, 540, FLOOR + 400, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s6lk" style="position:absolute;left:290px;top:200px;width:500px" src="">` +
    `<div class="title" style="top:600px;font-size:62px" data-t="c17">Customer dhoondhna =<br><span class="g">humara kaam</span> 🙌</div>` +
    pillH(540, 770, 'c18', 'Outfit dena = <span class="hl">aapka</span> 👗') + pillH(540, 885, 'c19', 'Shop online list karni hai? 📲') + pillH(540, 995, 'c19c', 'Comment <span class="hl">LIST</span> 👇', 'big') + pillH(540, 1100, 'c19c+0.4', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { $('s6lk').src = SEAL().replace('seal-on-maroon.svg', 'Anokhireet_shop_logo.svg'); },
  upd(t) {
    tf($('s6ro'), 540, 760, 1, t * 5);
    const down = t > T('c19c');
    life('s6r', t, { pivot: 0, mouth: t > T('c19c') + 1.2 ? 'grin' : talkMouth(t, true), brows: 'up', look: down ? [.2, .6] : [0, 0], tilt: 4,
      R: down ? [25, -5] : (t > T('c18') ? [100, -60] : [9, -14]), hR: down ? 'point' : 'open', L: [9, -14], seed: 3 });
  }
});
