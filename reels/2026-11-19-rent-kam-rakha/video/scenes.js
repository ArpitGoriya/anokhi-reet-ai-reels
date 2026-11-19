// ===== Rent kam rakha… phir bhi customer nahi? (Dukaan ka Funda: price signals quality) =====
// Rekhaben (cheap, empty shop) vs Jignaben across the street (fair rent, busy). Story numbers are labelled "Udaharan".
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const chatter = (x, y, at) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-bob="5"><rect x="-44" y="-28" width="88" height="56" rx="28" fill="#fff" stroke="${OL}" stroke-width="4"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.brown}">…</text></g></g>`;

// ================= S1 hook: cheapest shop, empty; across the street, busy =================
addScene(0, 'c3', {
  svg: twoShopsBG('s1') + bust('s1r', RK, 270, FLOOR - 10, .62) + bust('s1j', JG, 810, FLOOR - 10, .62) + twoShopsFront('s1') + clockSVG('s1-clk', 400, 962, 40) +
    stand('s1c1', CWs, 690, 990, .48) + stand('s1c2', W1s, 940, 990, .48) + chatter(640, 760, '-1') + chatter(980, 740, 'c1+0.6') + chatter(800, 700, 'c2'),
  html: `<div class="title" style="top:352px;font-size:72px" data-t="-1">Sabse <span class="g">SASTA…</span><br>phir bhi <span class="g">KHAALI?</span> 🤔</div>`,
  cam: [1, 1.04], fy: 900,
  upd(t) {
    clockTick('s1-clk', t * 4, 30);
    life('s1r', t, { pivot: 0, mouth: 'sad', brows: 'worry', look: [.8, 0], tilt: -6, L: CLASP, R: CLASP, nod: 6 });
    life('s1j', t, { pivot: 0, mouth: 'big', brows: 'up', look: [-.4, .2], R: [80, -40], hR: 'open', seed: 3 });
    life('s1c1', t, { mouth: 'talk', look: [.6, -.2], seed: 4 }); life('s1c2', t, { mouth: 'big', look: [-.6, -.2], seed: 5 });
  }
});

// ================= S2a: "kam rent yaani zyada customer" — her plan =================
addScene('c3', 'c5', {
  svg: shopBG('s2', { sign: 'REKHA RENTALS' }) + [110, 434, 650, 974].map((x, i) => priceTag('s2t' + i, 'SALE ₹800', x, 760, '-1', { fs: 26, fill: '#D9363E', color: '#fff' })).join('') +
    bust('s2r', RK, 540, FLOOR + 280, 1.2) + counterSVG(FLOOR + 130),
  html: `<div class="bubble" style="left:540px;top:600px" data-t="c3+0.4">💭 ₹800 = <span class="hl">bheed!</span> 😄</div>` +
    pillH(540, 352, 'c4', 'Kam rent = <span class="hl">zyada customer?</span>'),
  cam: [1, 1.05], fy: 820,
  upd(t) {
    life('s2r', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.2, -.6], R: [lerp(9, 150, P(t, T('c3') + .2, .4, E.io)), 20], hR: 'point', L: CLASP, tilt: 4, y: hop(t, T('c4') + .2, 12) });
  }
});

// ================= S2b: customers read the tag, whisper, walk across the street =================
addScene('c5', 'c7', {
  svg: twoShopsBG('s3') + bust('s3r', RK, 270, FLOOR - 10, .62) + bust('s3j', JG, 810, FLOOR - 10, .62) + twoShopsFront('s3') +
    `<g id="s3a">${stand('s3c1', CWs, 0, 0, .5)}</g><g id="s3b">${stand('s3c2', W1s, 0, 0, .5)}</g>`,
  html: `<div class="bubble" style="left:330px;top:600px;width:600px" data-t="c6-0.05" data-out="c7-0.3">"Itna <span class="hl">sasta?</span> Kuch toh gadbad hogi…" 😬</div>` +
    pillH(540, 352, 'c5+0.1', 'Customer <span class="hl">ruke</span>… 👀', '', 'c6+1.5') + pillH(540, 352, 'c6+1.55', 'Aur <span class="hl">chale gaye</span>… 😬'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const go = T('c6') + 1.6, a = glide(t, go, 1.0, 180, 700), b = glide(t, go + .15, 1.0, 360, 900);
    tf($('s3a'), a[0], 990 + a[1], 1); tf($('s3b'), b[0], 990 + b[1], 1);
    const wh = t > T('c6') - .1 && t < go;
    life('s3c1', t, { mouth: wh ? talkMouth(t, true) : 'flat', brows: wh ? 'worry' : 'norm', look: t < go ? [-.5, .3] : [.8, 0], tilt: wh ? 8 : 0, R: wh ? [70, -150] : [9, -14], hR: 'open', seed: 4 });
    life('s3c2', t, { mouth: wh ? 'o' : 'flat', brows: 'up', look: t < go ? [-.6, 0] : [.8, 0], tilt: wh ? -8 : 0, seed: 5 });
    const drop = t > go + .3;
    life('s3r', t, { pivot: 0, mouth: drop ? 'sad' : 'big', brows: drop ? 'worry' : 'up', look: [.7, 0], L: CLASP, R: CLASP, sweat: drop ? .8 : 0 });
    life('s3j', t, { pivot: 0, mouth: t > go + .9 ? 'big' : 'smile', brows: 'up', look: [-.6, 0], R: t > go + .9 ? WAVE(t, go + .9) : [9, -14], hR: 'open', seed: 3 });
  }
});

// ================= S3: the numbers (Udaharan) — same bookings, ₹12,000 ka fark =================
const card = (id, x, name, col) => `<g transform="translate(${x},640)"><rect x="-235" y="-170" width="470" height="340" rx="24" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
  `<rect x="-235" y="-170" width="470" height="76" rx="24" fill="${col}"/><rect x="-235" y="-120" width="470" height="26" fill="${col}"/>` +
  `<text y="-118" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="#fff">${name}</text>` +
  `<text id="${id}-a" y="-10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="50" fill="${C.text}"></text>` +
  `<text id="${id}-b" y="100" text-anchor="middle" font-family="Inter" font-weight="900" font-size="76" fill="${C.red}"></text></g>`;
const rs = n => '₹' + n.toLocaleString('en-IN');
addScene('c7', 'c11', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s4ro', 540, 760, .08, C.goldTan) + card('s4L', 280, 'Rekhaben', '#5B8A3A') + card('s4R', 800, 'Jignaben', '#3A4E8C') +
    bust('s4r', RK, 280, FLOOR + 200, .82) + bust('s4j', JG, 800, FLOOR + 200, .82) + counterSVG(FLOOR + 110) +
    `<g id="s4st">${stampSVG('−₹12,000', 84)}</g>`,
  html: pillH(540, 352, 'c7+0.1', 'Same mehnat, <span class="hl">same bookings</span>', '', 'c10-0.05') + pillH(540, 352, 'c10', '<span class="hl">₹12,000</span> ka fark 💸') +
    pillH(540, 440, 'c7+0.3', 'Udaharan 📝', 'gold'),
  cam: [1, 1.03], fy: 800,
  upd(t) {
    const fill = (id, rate, t0) => { const k = P(t, T(t0), .9, E.out); $(id + '-a').textContent = t > T(t0) - .3 ? `${rs(rate)} × 10` : ''; $(id + '-b').textContent = t > T(t0) ? '= ' + rs(Math.round(rate * 10 * k / 100) * 100) : ''; };
    fill('s4L', 800, 'c8'); fill('s4R', 2000, 'c9');
    stampIn($('s4st'), t, T('c10') + .2, 540, 880, -6);
    const hit = t > T('c10') + .2;
    life('s4r', t, { pivot: 0, mouth: hit ? 'o' : 'flat', brows: 'worry', sweat: hit ? 1 : 0, look: [.2, -.7], L: CLASP, R: CLASP });
    life('s4j', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [-.2, -.7], L: CLASP, R: CLASP, seed: 3 });
  }
});

// ================= S4: Sunday — Rekhaben skips the cheapest thali herself =================
addScene('c11', 'c14', {
  svg: restaurantRowBG('s5') + `<g id="s5m">${bust('s5r', RK, 330, FLOOR + 40, .8)}${bust('s5p', PATI, 500, FLOOR + 40, .8)}</g>` + hedgeSVG(-20, W + 20, 1110),
  html: pillH(540, 352, 'c11+0.05', 'Usi <span class="hl">Sunday</span>… 🍽️', '', 'c13+0.45') +
    `<div class="bubble" style="left:400px;top:740px" data-t="c13-0.05" data-out="c13+1.0">"Pata nahi <span class="hl">kaisi hogi…</span>" 🤨</div>` +
    pillH(540, 352, 'c13+0.5', 'Rekhaben bhi <span class="hl">wahi customer</span> nikli 😄'),
  cam: [1, 1.04], fy: 900, capY: 1290,
  upd(t) {
    const go = T('c13') + .9, mv = glide(t, go, .9, 0, 400);
    tf($('s5m'), mv[0], mv[1], 1); PL['s5r'].x = 330 + mv[0]; PL['s5p'].x = 500 + mv[0];
    const look = t > T('c12') + 1;
    life('s5r', t, { pivot: 0, mouth: t > go ? 'grin' : (look ? 'worry' : 'smile'), brows: look && t < go ? 'worry' : 'up', look: look && t < go ? [-.8, .2] : [.6, 0], tilt: look ? -6 : 0,
      R: t > go - .3 ? [90, -20] : (look ? THINK : [9, -14]), hR: t > go - .3 ? 'open' : 'fist', L: [9, -14] });
    life('s5p', t, { pivot: 0, mouth: t > go ? 'big' : 'smile', brows: 'norm', look: [-.6, 0], seed: 6 });
  }
});

// ================= S5a: the study — 2008, same drink, different price tags =================
addScene('c14', 'c16', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s6ro', 540, 800, .14, C.gold) +
    `<g transform="translate(540,640) scale(.9)"><g data-t="c14+0.1" data-k="drop">${calendarSVG('s6cal', 'SAAL', '2008')}</g></g>` +
    `<rect x="120" y="1060" width="840" height="30" rx="10" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<g transform="translate(360,1060)"><g data-t="c15+0.2" data-k="rise">${drinkGlassSVG('₹')}</g></g><g transform="translate(720,1060)"><g data-t="c15+0.5" data-k="rise">${drinkGlassSVG('₹₹₹')}</g></g>`,
  html: pillH(540, 352, 'c14+0.3', 'Ek <span class="hl">research</span> 🔬', '', 'c15-0.05') + pillH(540, 352, 'c15', 'Same drink, <span class="hl">alag price tag</span> 🏷️'),
  noWm: false, cam: [1, 1.04], fy: 820,
  upd(t) { tf($('s6ro'), 540, 800, 1, t * 5); }
});

// ================= S5b: most people rated the "mehenga" one better — and their brains agreed =================
addScene('c16', 'c19', {
  svg: wallSVG(C.cream, '#F5E6C8') + `<rect x="80" y="1060" width="920" height="30" rx="10" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<g transform="translate(320,1060)">${drinkGlassSVG('₹')}</g><g transform="translate(760,1060)">${drinkGlassSVG('₹₹₹')}</g>` +
    [0, 1].map(i => `<g transform="translate(${280 + i * 120},720)"><g data-t="c17+${(.3 + i * .2).toFixed(1)}">${starSVG(34)}</g></g>`).join('') +
    [0, 1, 2, 3, 4].map(i => `<g transform="translate(${600 + i * 80},720)"><g data-t="c17+${(.5 + i * .18).toFixed(2)}">${starSVG(34)}</g></g>`).join('') +
    `<g transform="translate(320,500) scale(.8)"><g data-t="c18">${brainSVG('s7b0')}</g></g><g transform="translate(760,500) scale(1)"><g data-t="c18+0.2">${brainSVG('s7b1')}</g></g>` +
    `<text x="540" y="1160" text-anchor="middle" font-family="Inter" font-weight="700" font-size="40" fill="${C.brown}">Plassmann et al., 2008</text>`,
  html: pillH(540, 352, 'c16+0.1', 'Same cheez, <span class="hl">alag price</span>', '', 'c17-0.05') + pillH(540, 352, 'c17', 'Mehenga tag = <span class="hl">"behtar"</span> 🧠'),
  cam: [1, 1.04], fy: 820, capY: 1290,
  upd(t) { op($('s7b1-glow'), P(t, T('c18') + .9, .5) * (0.85 + Math.sin(t * 4) * .15)); tf($('s7b1-glow'), 0, 0, 1 + P(t, T('c18') + .9, .5) * .3); }
});

// ================= S6: "teen kaam" — STEP 1: sahi rent, listed with clear photos =================
addScene('c19', 'c22', {
  svg: shopBG('s8', { sign: 'REKHA RENTALS' }) + quiet(.55) + `<circle cx="760" cy="820" r="420" fill="url(#glow)" opacity=".8"/>` +
    bust('s8r', RK, 300, FLOOR + 260, 1.1) + counterSVG(FLOOR + 140) +
    `<g id="s8ph"><g transform="scale(.66)">${phoneSVG('s8p', 0, 0, 560, 1000, listingScreen('c21+1.3'))}</g></g>`,
  html: pillH(540, 352, 'c19+0.1', 'Rekhaben ke <span class="hl">3 kaam</span> 💡', '', 'c20-0.05') + stepPill(1, 'Sahi rent + <span class="hl">list</span> ✅', 'c20'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const up = P(t, T('c20') - .2, .5, E.out);
    tf($('s8ph'), 760, lerp(1300, 820, up), 1, lerp(8, 0, up)); op($('s8ph'), up);
    life('s8r', t, { pivot: 0, mouth: 'grin', brows: t < T('c20') ? 'sure' : 'up', look: t < T('c20') ? [0, 0] : [.8, -.2], tilt: 4,
      R: t < T('c20') ? IDEA : [100, -30], hR: t < T('c20') ? 'point' : 'point', L: [9, -14], y: hop(t, T('c21') + 1.35, 12) });
  }
});

// ================= S7: STEP 2 — quality dikhao: kapda, kaam, saaf-safai =================
addScene('c22', 'c24', {
  svg: wallSVG(C.cream, '#F5E6C8') + rosettes('s9ro', 540, 860, .1, C.goldTan) + `<circle cx="540" cy="820" r="460" fill="url(#glow)"/>` +
    `<g transform="translate(540,760)"><g data-t="c22+0.1">${lehengaHangerSVG('s9l', BRIDAL, 1.3)}</g></g>` +
    [[250, 640, 'c23', fabricInner()], [830, 640, 'c23+0.5', embroideryInner()], [540, 1030, 'c23+1.0', dryCleanInner()]].map(([x, y, at, inner]) => `<g transform="translate(${x},${y})"><g data-t="${at}">${zoomCircle(inner, 160)}</g></g>`).join('') +
    [[380, 560], [700, 900], [460, 980]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c22+${(.4 + i * .25).toFixed(2)}" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join(''),
  html: stepPill(2, 'Quality <span class="hl">dikhao</span> ✨', 'c22'),
  cam: [1, 1.05], fy: 820,
  upd(t) { tf($('s9ro'), 540, 860, 1, t * 5); }
});

// ================= S8: STEP 3 — the "SALE ₹800" board comes down, "Premium Collection" goes up =================
addScene('c24', 'c25', {
  svg: shopFrontBG('s10', { sign: 'REKHA RENTALS', since: 'Lehenga on rent' }) + `<rect x="-10" y="${FLOOR + 240}" width="${W + 20}" height="50" fill="#6E6A64"/>` +
    bust('s10r', RK, 540, FLOOR + 140, 1.0) + counterMid(300, 780, 1150) +
    `<g id="s10s">${shopBoardSVG('SALE ₹800', 'sale', 460)}</g><g id="s10p">${shopBoardSVG('PREMIUM COLLECTION', 'premium', 640)}</g>`,
  html: stepPill(3, '"Sasta" nahi, <span class="hl">"Premium"</span> ✅', 'c24'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const off = P(t, T('c24') + .7, .5, E.in), on = P(t, T('c24') + 1.15, .45, E.back);
    tf($('s10s'), 540 - off * 120, 720 + off * 700, 1, -off * 40); op($('s10s'), 1 - P(t, T('c24') + 1.0, .2));
    tf($('s10p'), 540, lerp(200, 720, on), 1, 0); op($('s10p'), t > T('c24') + 1.15 ? 1 : 0);
    life('s10r', t, { pivot: 0, mouth: on > .5 ? 'grin' : 'big', brows: 'up', look: [0, -.8], R: [lerp(9, 160, P(t, T('c24') + .2, .4, E.io)), 30], hR: 'open', L: on > .5 ? [160, 30] : [9, -14], hL: 'open', y: hop(t, T('c24') + 1.6, 12) });
  }
});

// ================= S9: result — customers come with her listing on their phones, the cash drawer fills =================
addScene('c25', 'c27', {
  svg: rentalShopBG('s11', { noMirror: true }) + `<g transform="translate(540,455) scale(.85)">${shopBoardSVG('PREMIUM COLLECTION', 'premium', 640)}</g>` +
    `<g id="s11ca">${bust('s11c1', CUSTOMER_W, 0, FLOOR + 110, .85)}</g><g id="s11cb">${bust('s11c2', GUEST_W1, 0, FLOOR + 110, .85)}</g>` +
    bust('s11r', RK, 820, FLOOR + 110, .95) + counterSVG() + miniPhone('s11ph1', BRIDAL, 1.2) + miniPhone('s11ph2', { c: C.emerald, d: C.emeraldDark, dupatta: '#A6D3B0' }, 1.2) +
    `<g transform="translate(820,${FLOOR + 90})">${gallaSVG('s11g')}</g>` +
    [0, 1, 2].map(i => `<g transform="translate(${760 + i * 60},${FLOOR + 40})"><g data-t="c26+${(.25 + i * .15).toFixed(2)}" data-k="drop"><g transform="scale(.45) rotate(${-10 + i * 10})">${noteSVG()}</g></g></g>`).join(''),
  html: pillH(540, 352, 'c25+0.1', 'Zyada <span class="hl">customer</span> 🛍️', '', 'c26-0.05') + pillH(540, 352, 'c26', '+ <span class="hl">poora rent</span> 💰'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const a = KF(t, [[T('c25'), -150], [T('c25') + .6, 200]]), b = KF(t, [[T('c25') + .15, -150], [T('c25') + .75, 440]]);
    tf($('s11ca'), a, 0, 1); tf($('s11cb'), b, 0, 1); PL['s11c1'].x = a; PL['s11c2'].x = b;
    const A = life('s11c1', t, { pivot: 0, mouth: 'big', brows: 'up', look: [.7, 0], R: [110, -50], hR: 'fist', seed: 2 });
    const B = life('s11c2', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [.7, 0], R: [110, -50], hR: 'fist', seed: 5 });
    atHand('s11ph1', 's11c1', A.hr, 0, -80, 6); atHand('s11ph2', 's11c2', B.hr, 0, -80, 6);
    tf($('s11g-dr'), 0, P(t, T('c26'), .35, E.back) * 40, 1);
    life('s11r', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.7, 0], L: [100, -40], hL: 'open', y: hop(t, T('c26') + .1, 12), seed: 7 });
  }
});

// ================= S10: takeaway — sasta nahi, sahi rent; "aapka rent kitna?" =================
addScene('c27', 'c29', {
  svg: shopBG('s12', { noSign: true }) + quiet(.35) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + bust('s12r', RK, 540, FLOOR + 320, 1.25) + counterSVG(FLOOR + 160),
  html: `<div class="title" style="top:390px;font-size:86px" data-t="c27">Sasta nahi,<br><span class="g">SAHI</span> rent ✅</div>` +
    pillH(540, 600, 'c28+0.2', 'Aapka <span class="hl">rent kitna?</span> 🤔'),
  cam: [1, 1.05], fy: 860,
  upd(t) {
    const ask = t > T('c28');
    life('s12r', t, { pivot: 0, mouth: ask ? 'big' : 'grin', brows: ask ? 'up' : 'sure', tilt: ask ? 6 : 0, look: [0, 0], R: ask ? [128, -26] : IDEA, hR: ask ? 'open' : 'point', L: [9, -14] });
  }
});

// ================= S11 end card: comment your rent; "ONLINE" =================
addScene('c29', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s13r', 540, 760, .16, C.gold) + bust('s13k', RK, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s13wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:520px;font-size:84px">Aapka rent kitna?<br><span class="g">Comment karo</span> 👇</div>` +
    pillH(540, 740, 'c30+0.2', 'Shop online? <span class="hl">"ONLINE"</span> likho 💬', 'big') +
    pillH(540, 860, 'c30+0.5', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const im = $('s13wm'); if (im) im.src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s13r'), 540, 760, 1, t * 5);
    const w = clamp((t - T('c29') - .2) / .35);
    life('s13k', t, { pivot: 0, mouth: 'grin', brows: 'up', R: [lerp(9, WAVE(t, T('c29'))[0], E.io(w)), lerp(-14, WAVE(t, T('c29'))[1], E.io(w))], hR: 'open', L: [9, -14], tilt: 4 });
  }
});
