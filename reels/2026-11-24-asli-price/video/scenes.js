// ===== Sabne socha ₹50,000 ka hai… (asli price: ₹3,500 on rent) =====
// Open loops: "kitne ka hai?", the "₹ ??" tag (price at the end), the app hidden (phone from the back) until "App ka naam tha…".
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const IW = ISHITA.wedding, IH = ISHITA.home;
const C1 = dress(KHUSHI, {}), C2 = dress(GUEST_W1, {}), BH = dress(GUEST_W2, {});
const UDA = (x = 540, y = 440, at = '-1') => pillH(x, y, at, 'Udaharan 📝', 'gold');
const fx = (x, y, at_, txt, r = -8, out = '') => `<div class="pill" style="left:${x}px;top:${y}px;font-size:34px;padding:6px 18px;transform:translate(-50%,-50%) rotate(${r}deg);background:${C.gold}" data-t="${at_}"${out ? ` data-out="${out}"` : ''}>${txt}</div>`;
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const BLUR = `<filter id="blurTag"><feGaussianBlur stdDeviation="6"/></filter>`;
// the lehenga's tag: `${id}-q` (blurred "₹ ??") and `${id}-a` ("₹3,500 RENT"); flip it by scaling x
const tagSVG = id => `<g id="${id}"><path d="M0,-60 L0,-10" stroke="${OL}" stroke-width="4"/><g id="${id}-card"><rect x="-150" y="-10" width="300" height="120" rx="18" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><circle cx="0" cy="12" r="9" fill="${C.cream}" stroke="${OL}" stroke-width="3"/>` +
  `<g id="${id}-q"><text y="88" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="${C.red}" filter="url(#blurTag)">₹ ??</text></g>` +
  `<g id="${id}-a" opacity="0"><text y="74" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="${C.red}">₹3,500</text><text y="104" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="#1F7A4D" letter-spacing="4">RENT</text></g></g></g>`;
const flash = id => `<rect id="${id}" width="${W}" height="${H}" fill="#fff" opacity="0"/>`;

// ================= S1 hook: "lehenga kitne ka hai?" — Mausi in shock =================
addScene(0, 'c4', {
  svg: weddingHallBG('s1') + chairBackSVG(540, FLOOR + 80) + bust('s1m', MAUSI, 540, FLOOR + 80, .95) + chairFrontSVG(540, FLOOR + 80) +
    [['?', 260, 700], ['₹', 820, 660], ['?', 840, 900], ['₹', 230, 940]].map(([c, x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c3+${(.1 + i * .12).toFixed(2)}" data-k="pop" data-bob="10" data-ph="${i}"><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="90" fill="${i % 2 ? '#1F7A4D' : C.red}" stroke="${OL}" stroke-width="3">${c}</text></g></g>`).join(''),
  html: `<div class="title" style="top:400px;font-size:66px" data-t="-1">Asli price sunke<br>Mausi <span class="g">chaunk gayi</span> 😳</div>` + pillH(540, 600, 'c2', '"Lehenga <span class="hl">kitne ka</span> hai?" 🤔', '', 'c3'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const shock = t > T('c3') + .4;
    life('s1m', t, { pivot: 0, mouth: shock ? 'big' : 'smile', brows: shock ? 'up' : 'norm', look: shock ? [0, -.3] : [.5, -.2], tilt: shock ? -8 : 0,
      R: shock ? CLASP : [9, -14], hR: 'open', L: shock ? [120, -60] : [9, -14], hL: 'open', y: shock ? hop(t, T('c3') + .4, -30) : 0, seed: 1 });
  }
});

// ================= S2 the entry: Ishita walks in, the hall stops =================
addScene('c4', 'c6', {
  svg: weddingHallBG('s2') + flash('s2fl') + `<g id="s2iw">${stand('s2i', IW, 0, 0, .78)}</g>` +
    bust('s2g1', C1, 130, FLOOR + 230, .66) + bust('s2g2', GUEST_M, 950, FLOOR + 230, .66) +
    [[380, 620], [720, 640], [360, 960], [740, 990]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c5+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(30, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c4', '<span class="hl">Entry</span> 🔥') + fx(860, 640, 'c5+0.2', '📸 CLICK!', 8, 'c6'),
  cam: [1, 1.05], fy: 900,
  upd(t) {
    const g = glide(t, T('c4'), 2.2, 250, 540, 6), y0 = FLOOR + 40 - 372 * .78;
    tf($('s2iw'), g[0], y0 + g[1], 1); PL['s2i'].x = g[0]; PL['s2i'].y = y0;
    life('s2i', t, { mouth: 'smile', brows: 'sure', look: [0, 0], tilt: 3, R: [9, -14], L: [9, -14], sway: 2, seed: 2 });
    const f = P(t, T('c5') + .2, .1); op($('s2fl'), f > 0 && f < 1 ? .8 * (1 - f) : 0);
    life('s2g1', t, { pivot: 0, mouth: t > T('c5') ? 'o' : 'smile', brows: 'up', look: [.9, -.1], tilt: t > T('c5') ? 8 : 0, seed: 3 });
    life('s2g2', t, { pivot: 0, mouth: t > T('c5') ? 'o' : 'smile', brows: 'up', look: [-.9, -.1], tilt: t > T('c5') ? -8 : 0, seed: 4 });
  }
});

// ================= S3 the guesses: ₹40,000? ₹60,000? ₹50,000? =================
addScene('c6', 'c11', {
  svg: weddingHallBG('s3') + quiet(.25) + bust('s3a', C1, 220, FLOOR + 90, .7) + bust('s3b', C2, 540, FLOOR + 60, .7) + bust('s3c', BH, 860, FLOOR + 90, .7) + roundTableSVG(540, FLOOR + 110, 960, '#7A1B2A'),
  html: pillH(220, 352, 'c6+0.3', '₹40,000?') + pillH(540, 352, 'c8', '₹60,000?') + pillH(860, 352, 'c10', '₹50,000?') + pillH(540, 440, 'c10+0.5', 'Kitne ka? 🤔', 'gold') +
    `<div class="bubble" style="left:300px;top:620px;width:400px;font-size:34px" data-t="c6" data-out="c7-0.05">"Pakka <span class="hl">₹40,000</span> ka hoga."</div>` +
    `<div class="bubble" style="left:540px;top:600px;width:460px;font-size:34px" data-t="c7" data-out="c9-0.05">"Pagal hai? Designer hai, <span class="hl">₹60,000</span> se kam nahi."</div>` +
    `<div class="bubble" style="left:740px;top:600px;width:480px;font-size:33px" data-t="c9">"Pakka Ahmedabad se liya hoga, <span class="hl">₹50,000</span> toh hoga hi."</div>`,
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const a = t > T('c6') && t < T('c7'), b = t > T('c7') && t < T('c9'), c = t > T('c9');
    life('s3a', t, { pivot: 0, mouth: a ? talkMouth(t, true) : 'smile', brows: 'up', look: b ? [.8, 0] : (c ? [.9, 0] : [0, 0]), R: a ? [120, -60] : [9, -14], hR: 'point', L: [9, -14], seed: 1 });
    life('s3b', t, { pivot: 0, mouth: b ? talkMouth(t, true) : 'smile', brows: b ? 'sure' : 'up', look: a ? [-.8, 0] : (c ? [.8, 0] : [0, 0]), R: b ? [130, -40] : [9, -14], hR: 'open', L: b ? [130, -40] : [9, -14], hL: 'open', seed: 2 });
    life('s3c', t, { pivot: 0, mouth: c ? talkMouth(t, true) : 'smile', brows: c ? 'sure' : 'up', look: c ? [-.3, 0] : [-.8, 0], L: c ? [110, -70] : [9, -14], hL: 'point', R: [9, -14], seed: 3 });
  }
});

// ================= S4 freeze: the "₹ ??" tag — comment your guess first =================
addScene('c11', 'c14', {
  svg: `<defs>${BLUR}</defs>` + weddingHallBG('s4') + `<rect width="${W}" height="${H}" fill="#3B2A22" opacity=".35"/>` + flash('s4fl') +
    `<circle cx="540" cy="900" r="420" fill="url(#glow)" opacity=".7"/>` + stand('s4i', IW, 470, FLOOR + 40 - 372 * .95, .95) + `<g id="s4tagw">${tagSVG('s4t')}</g>`,
  html: pillH(540, 352, 'c11', 'Price <span class="hl">end mein</span>… ⏳', '', 'c12-0.05') + `<div class="title" style="top:420px;font-size:74px" data-t="c12">Aapka <span class="g">guess?</span> 👇</div>`,
  cam: [1, 1.03], fy: 900,
  upd(t) {
    const f = P(t, T('c11'), .15); op($('s4fl'), f < 1 ? .9 * (1 - f) : 0);
    tf($('s4tagw'), 730, 900, 1, Math.sin(t * 2.4) * 8);
    life('s4i', t, { mouth: 'smile', brows: 'sure', look: [.3, 0], tilt: 3, R: [9, -14], L: [9, -14], seed: 2 });
  }
});

// ================= S5 flashback: a week earlier, ₹8,000 in the account (Udaharan) =================
addScene('c14', 'c18', {
  svg: homeBG('s5', { noShelf: true, noClock: true }) + `<rect width="${W}" height="${H}" fill="#C9A77A" opacity=".22"/>` + bedSVG(360, FLOOR - 60, 620) +
    bust('s5i', IH, 320, FLOOR - 20, .78) + `<g id="s5ph"><g transform="scale(.62)">${phoneSVG('s5p', 0, 0, 560, 1000, bankScreen('₹8,000'))}</g></g>` +
    `<g transform="translate(860,1060)"><g data-t="c16" data-k="pop">${inviteCardSVG()}</g></g>`,
  html: pillH(540, 352, 'c14', '<span class="hl">Ek hafte pehle…</span> ⏪', '', 'c15-0.05') + pillH(540, 352, 'c15', 'Budget: <span class="hl">₹8,000</span> 😬', '', 'c16-0.05') +
    pillH(540, 352, 'c16', 'Look <span class="hl">jo yaad rahe</span> ✨') + UDA(540, 440, 'c15'),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    tf($('s5ph'), 760, 700, 1, 4);
    const sigh = t > T('c15') + .3 && t < T('c16');
    life('s5i', t, { pivot: 0, mouth: sigh ? 'worry' : (t > T('c16') ? 'flat' : 'o'), brows: 'worry', look: t > T('c16') ? [.9, .4] : [.8, -.3], tilt: sigh ? -6 : 0, R: [9, -14], L: [9, -14], seed: 2 });
  }
});

// ================= S6a phone from the back: city, occasion, budget (the app stays hidden) =================
addScene('c18', 'c21', {
  svg: homeBG('s6', { noShelf: true, noClock: true }) + quiet(.35) + `<circle cx="540" cy="860" r="420" fill="url(#glow)"/>` + bust('s6i', IH, 540, FLOOR + 230, 1.05) + `<g id="s6ph">${phoneBackSVG(1.5)}</g>`,
  html: pillH(220, 640, 'c18+0.3', '📍 City', 'gold') + pillH(220, 760, 'c18+1.1', '🎉 Occasion', 'gold') + pillH(860, 700, 'c20', '💰 Budget', 'gold') +
    pillH(540, 352, 'c18', 'Apne <span class="hl">sheher ki dukaano</span> ke outfits 📱'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const A = life('s6i', t, { pivot: 0, mouth: t > T('c20') ? 'grin' : 'smile', brows: 'up', look: [0, .5], R: [100, -90], hR: 'fist', L: [9, -14], seed: 2 });
    atHand('s6ph', 's6i', A.hr, -20, -120, 0);
  }
});

// ================= S6b the trial in a nearby shop: smile in the mirror — Dekha → Trial → Final =================
addScene('c21', 'c22', {
  svg: rentalShopBG('s6b', { mirrorY: 760 }) + stand('s6bi', IW, 760, FLOOR + 40 - 372 * .8, .8) + bust('s6bo', SHITAL, 200, FLOOR + 160, .7) + counterSVG(FLOOR + 180),
  html: pillH(540, 352, 'c21', 'Dekha → <span class="hl">Trial kiya</span> → Final ✅'),
  cam: [1, 1.03], fy: 880,
  upd(t) {
    life('s6bi', t, { mouth: 'grin', brows: 'up', look: [-.9, 0], tilt: -4, R: [9, -14], L: [100, -40], hL: 'open', sway: 3, seed: 2 });
    life('s6bo', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [.9, 0], L: [9, -14], R: [9, -14], seed: 3 });
  }
});

// ================= S7 the reveal: the tag flips — ₹3,500 RENT (Udaharan); Mausi again =================
addScene('c22', 'c24', {
  svg: `<defs>${BLUR}</defs>` + weddingHallBG('s7') + stand('s7i', IW, 330, FLOOR + 40 - 372 * .8, .8) + `<g id="s7tagw">${tagSVG('s7t')}</g>` +
    chairBackSVG(820, FLOOR + 130, '#C0262D') + bust('s7m', MAUSI, 820, FLOOR + 130, .72) + chairFrontSVG(820, FLOOR + 130),
  html: `<div class="title" style="top:420px;font-size:80px" data-t="c23"><span class="g">₹3,500</span> RENT 😳💸</div>` + UDA(540, 560, 'c23+0.2') + pillH(540, 352, 'c22', '<span class="hl">Asli price?</span> 🥁', '', 'c23-0.05'),
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const k = clamp((t - T('c23') + .3) / .6), sx = Math.cos(k * Math.PI);
    tf($('s7tagw'), 540, 900, 1, Math.sin(t * 2.4) * 6); tf($('s7t-card'), 0, 0, 1, 0, 0, 50, 1);
    $('s7t-card').setAttribute('transform', `scale(${Math.abs(sx).toFixed(3)},1)`);
    op($('s7t-q'), k < .5 ? 1 : 0); op($('s7t-a'), k >= .5 ? 1 : 0);
    life('s7i', t, { mouth: t > T('c23') ? 'grin' : 'smile', brows: 'sure', look: [.6, 0], tilt: 4, wink: t > T('c23') + .6 && t < T('c23') + 1.1, R: [9, -14], L: [9, -14], seed: 2 });
    const shock = t > T('c23') + .2;
    life('s7m', t, { pivot: 0, mouth: shock ? 'big' : 'o', brows: 'up', look: [-.6, -.2], tilt: shock ? -14 : 0, R: shock ? CLASP : [9, -14], hR: 'open', L: [9, -14], y: shock ? hop(t, T('c23') + .2, -26) : 0, seed: 1 });
  }
});

// ================= S8 the app: "App ka naam tha… Anokhi Reet!" — Ishita winks, the phone turns around =================
addScene('c24', 'c26', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s8ro', 540, 820, .14, C.gold) + `<circle cx="540" cy="820" r="440" fill="url(#glow)" opacity=".6"/>` +
    bust('s8i', IW, 300, FLOOR + 200, .9) + `<g id="s8back">${phoneBackSVG(2.2)}</g>` +
    `<g id="s8front"><g transform="scale(.5)">${phoneSVG('s8p', 0, 0, 560, 1000, arHeader() + `<rect x="-236" y="-370" width="472" height="560" rx="20" fill="${C.cream}"/><g transform="translate(0,-130)">${lehengaHangerSVG('', { c: '#7A1B2A', d: '#5E1420', dupatta: C.gold }, .8)}</g>` +
      `<g transform="translate(0,300)"><rect x="-150" y="-36" width="300" height="72" rx="36" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.red}">Rent</text></g>`)}</g></g>` +
    [[740, 560], [960, 820], [700, 1120]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c25+${(i * .1).toFixed(1)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(32, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c24', 'App ka naam tha… 🥁', '', 'c25-0.05') + pillH(540, 352, 'c25', '<span class="hl">Anokhi Reet</span> ✨', 'big'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    tf($('s8ro'), 540, 820, 1, t * 5);
    const k = clamp((t - T('c25') + .25) / .5), sx = Math.cos(k * Math.PI);
    $('s8back').setAttribute('transform', `translate(760,840) scale(${k < .5 ? Math.abs(sx).toFixed(3) : 0},1)`);
    $('s8front').setAttribute('transform', `translate(760,840) scale(${k >= .5 ? Math.abs(sx).toFixed(3) : 0},1)`);
    life('s8i', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.6, -.1], tilt: 4, wink: t > T('c24') + .3 && t < T('c24') + .9, R: [150, -60], hR: 'open', L: [9, -14], seed: 2 });
  }
});

// ================= S9 end card: your guess? — Comment RENT =================
addScene('c26', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s9r', 540, 760, .16, C.gold) + bust('s9i', IW, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s9wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:500px;font-size:72px">Aapka guess?<br><span class="g">Comment karo</span> 👇</div>` +
    pillH(540, 720, 'c27', 'Rent pe chahiye? Comment <span class="hl">RENT</span> 👇') + pillH(540, 840, 'c26+0.5', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { $('s9wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s9r'), 540, 760, 1, t * 5); life('s9i', t, { pivot: 0, mouth: t > T('c28') ? 'grin' : talkMouth(t, true), brows: 'up', look: [0, 0], R: t > T('c28') ? WAVE(t, T('c28')) : [9, -14], hR: 'open', L: [9, -14], tilt: 4, seed: 2 }); }
});
