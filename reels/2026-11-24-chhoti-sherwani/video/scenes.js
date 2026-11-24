// ===== ₹6,000 ki sherwani… 6 mahine mein chhoti (Riddhi's outgrown kids' outfits → on rent for Krupa) =====
// Open loop: another mother with the same problem; the app is named only at "Krupa ne Anokhi Reet pe dekha".
const quiet = (o = .45, col = C.cream) => `<rect width="${W}" height="${H}" fill="${col}" opacity="${o}"/>`;
const UDA = (x = 540, y = 440, at = '-1', out = '') => pillH(x, y, at, 'Udaharan 📝', 'gold', out);
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const feet = sc => FLOOR + 40 - 372 * sc; // y for stand() so the feet touch the floor
const SHER = () => kidOutfitSVG('sherwani'); // Riddhi's cream sherwani (the one Vihaan outgrew, Krupa's son's size)
const OUTFITS = [['sherwani', '#F2E2C4', '#D9C39A'], ['kurta', '#F2A33A', '#D9862A'], ['bandhgala', '#2F5D8A', '#22466A'], ['jodhpuri', '#7A1B2A', '#5E1420']];
const flash = id => `<rect id="${id}" width="${W}" height="${H}" fill="#fff" opacity="0"/>`;
const sparks = (pts, at) => pts.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="${at}+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(28, C.gold)}</g></g>`).join('');
// the reel's phone screens (phoneSVG(…, 560, 1000)): a search with no luck, and Riddhi's listing (header: hidden name or the app)
const searchScreen = () => `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#F6F4F1"/>` +
  `<rect x="-230" y="-420" width="460" height="84" rx="42" fill="#fff" stroke="#D8D2CA" stroke-width="4"/><text x="-200" y="-366" font-family="Inter" font-weight="700" font-size="30" fill="${C.text}">kids sherwani on rent 🔍</text>` +
  [0, 1, 2].map(i => `<rect x="-230" y="${-290 + i * 150}" width="460" height="124" rx="18" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-210" y="${-272 + i * 150}" width="88" height="88" rx="12" fill="#ECE6DE"/><rect x="-100" y="${-258 + i * 150}" width="${230 - i * 40}" height="18" rx="9" fill="#ECE6DE"/><rect x="-100" y="${-222 + i * 150}" width="${150 - i * 20}" height="18" rx="9" fill="#ECE6DE"/>`).join('') +
  `<text y="240" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="#7A6E62">Kahin nahi mila 😕</text>`;
const listingScreen = (real, listed) => `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + (real ? arHeader() : arMysteryHeader()) +
  `<rect x="-230" y="-360" width="460" height="560" rx="24" fill="#fff" stroke="${C.goldTan}" stroke-width="4"/><circle cx="0" cy="-90" r="190" fill="url(#glow)"/><g transform="translate(0,-70) scale(1.5)">${SHER()}</g>` +
  `<text x="-200" y="250" font-family="Inter" font-weight="900" font-size="38" fill="${C.text}">Kids sherwani</text><g transform="translate(-130,270)">${ageTagSVG('Age 4–5')}</g>` +
  `<g transform="translate(130,320)"><rect x="-90" y="-36" width="180" height="72" rx="36" fill="${C.red}" stroke="${OL}" stroke-width="3"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.cream}">Rent</text></g>` +
  (listed ? `<g transform="translate(0,430)"><rect x="-150" y="-34" width="300" height="68" rx="34" fill="#E3F3EA" stroke="#1F7A4D" stroke-width="4"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="#1F7A4D">Listed ✓</text></g>` : '');

// ================= S1 hook: Vihaan in the outgrown sherwani, Riddhi stares =================
addScene(0, 'c3', {
  svg: homeBG('s1', { noShelf: true, noClock: true, plantX: 1000 }) + stand('s1r', RIDDHI, 250, feet(.8), .8) + stand('s1v', VIHAAN.tight, 720, feet(.56), .56) +
    [0, 1, 2].map(i => `<circle id="s1b${i}" r="9" fill="${C.gold}" stroke="${OL}" stroke-width="3" opacity="0"/>`).join(''),
  html: `<div class="title" style="top:400px;font-size:70px" data-t="-1">₹6,000 ki sherwani…<br>6 mahine mein <span class="g">chhoti</span> 🫠</div>` + UDA(540, 548) +
    pillH(720, 640, 'c2', '₹6,000 · <span class="hl">1 baar</span> · Chhoti 😩'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const up = t > T('c2') + .2, tb = T('c2') + .7;
    life('s1v', t, { mouth: up ? (t > tb ? 'worry' : 'grin') : 'smile', brows: t > tb ? 'worry' : 'up', look: t > tb ? [0, .8] : [0, 0], sweat: t > tb ? .9 : 0,
      L: up ? [165, -8] : [70, -10], R: up ? [165, -8] : [70, -10], hL: 'open', hR: 'open', y: hop(t, T('c2') + .2, 30), seed: 4 });
    for (let i = 0; i < 3; i++) { // buttons pop off the tight sherwani
      const k = clamp((t - tb - i * .08) / .7), p0 = toScene('s1v', [0, -200 + i * 46]);
      const el = $('s1b' + i); op(el, k > 0 && k < 1 ? 1 : 0);
      tf(el, p0[0] + (i - 1) * 160 * k, p0[1] - 140 * k + 260 * k * k, 1, 0);
    }
    life('s1r', t, { mouth: t > T('c2') ? 'o' : 'smile', brows: 'up', look: [.8, .2], R: t > tb ? CLASP : [9, -14], L: t > tb ? CLASP : [9, -14], tilt: t > tb ? 6 : 0, seed: 1 });
  }
});

// ================= S2 the drawer: four outfits, four weddings, all too small =================
addScene('c3', 'c7', {
  svg: homeBG('s2', { noWindow: true, noClock: true, shelfX: 760 }) + stand('s2r', RIDDHI, 830, feet(.8), .8) + `<g transform="translate(420,1230)">${dresserSVG('s2d')}</g>` +
    `<g id="s2hold" opacity="0"><g transform="scale(.9)">${SHER()}</g></g>`,
  html: pillH(540, 352, 'c3+0.3', 'Riddhi ka <span class="hl">drawer</span> 🗄️', '', 'c4-0.05') + pillH(540, 352, 'c4', '<span class="hl">4 outfits</span> 📦', '', 'c5-0.05') +
    pillH(540, 352, 'c5', '4 outfits · <span class="hl">4 shaadi</span> 💍', '', 'c6-0.05') + pillH(540, 352, 'c6', '<span class="hl">Sab chhote</span> 😩'),
  cam: [1, 1.06], fx: 520, fy: 950,
  init(s) {
    $('s2d-in').innerHTML = OUTFITS.map(([k, c, d], i) => `<g transform="translate(${-180 + i * 120},-292)"><g data-t="c4+${(i * .22).toFixed(2)}" data-k="drop"><g transform="scale(.5)">${kidOutfitSVG(k, c, d)}</g>` +
      `<g transform="translate(0,-96)"><circle r="22" fill="${C.red}" stroke="${OL}" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="#fff">${i + 1}</text></g></g></g>`).join('');
    s.popsS = [...s.g.querySelectorAll('[data-t]')];
  },
  upd(t) {
    dresserOpen('s2d', P(t, T('c3') + .3, .5));
    const hold = t > T('c6');
    const A = life('s2r', t, { mouth: hold ? 'sad' : (t > T('c4') ? 'flat' : 'smile'), brows: hold ? 'worry' : 'norm', look: hold ? [-.4, 0] : [-.7, .7], tilt: hold ? -6 : -3,
      R: [9, -14], L: hold ? [120, -70] : (t > T('c4') ? [70, -30] : [40, -20]), hL: hold ? 'fist' : 'point', seed: 1 });
    op($('s2hold'), hold ? 1 : 0); if (hold) atHand('s2hold', 's2r', A.hl, 0, 90, 0, 1 + .04 * Math.sin(t * 3));
  }
});

// ================= S3a the bills: ₹6,000 + ₹4,500 + ₹5,000 + ₹3,500 = ₹19,000 (Udaharan) =================
addScene('c7', 'c8', {
  svg: homeBG('s3', { noWindow: true, noShelf: true, noClock: true, noPlant: true }) + quiet(.55) +
    ['₹6,000', '+ ₹4,500', '+ ₹5,000', '+ ₹3,500'].map((x, i) => `<g transform="translate(270,${640 + i * 120})"><g data-t="c7+${(i * .18).toFixed(2)}" data-k="slideL"><rect x="-170" y="-46" width="340" height="92" rx="20" fill="#fff" stroke="${OL}" stroke-width="4"/><text y="16" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="${C.text}">${x}</text></g></g>`).join('') +
    `<g transform="translate(270,1110)"><g data-t="c7+0.8" data-k="pop"><path d="M-170,-50 H170" stroke="${OL}" stroke-width="6"/><text y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="50" fill="${C.red}">= ₹19,000</text></g></g>` +
    `<g transform="translate(760,880) scale(1.15)"><g id="s3cw">${calculatorSVG('s3c', '0')}</g></g>`,
  html: pillH(540, 352, 'c7', '<span class="hl">Total?</span> 🧮') + `<div class="title" style="top:480px;font-size:96px" data-t="c7+0.8"><span class="g">₹19,000</span></div>` + UDA(760, 1185, 'c7+1'),
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const k = P(t, T('c7') + .2, .9, E.lin), v = Math.round(19 * k * 1000 / 500) * 500;
    $('s3c-scr').textContent = v.toLocaleString('en-IN');
    tf($('s3cw'), 0, t > T('c7') + 1.1 ? hop(t, T('c7') + 1.1, 16) : 0, 1);
  }
});

// ================= S3b locked away: the drawer shuts, a padlock =================
addScene('c8', 'c9', {
  svg: homeBG('s3b', { noWindow: true, noClock: true }) + `<circle cx="540" cy="980" r="420" fill="url(#glow)" opacity=".6"/><g transform="translate(540,1230) scale(1.05)">${dresserSVG('s3d')}</g>` +
    `<g transform="translate(540,870)"><g data-t="c8+0.75" data-k="drop" data-swing="12">${lockSVG()}</g></g>`,
  html: pillH(540, 352, 'c8', '₹19,000… drawer mein <span class="hl">band</span> 🔒') + pillH(540, 470, 'c8+0.2', 'Ek-ek baar pehne 👕', 'gold'),
  cam: [1, 1.05], fy: 950,
  init() { $('s3d-in').innerHTML = OUTFITS.map(([k, c, d], i) => `<g transform="translate(${-180 + i * 120},-292) scale(.5)">${kidOutfitSVG(k, c, d)}</g>`).join(''); },
  upd(t) { dresserOpen('s3d', 1 - P(t, T('c8') + .25, .4, E.io)); }
});

// ================= S4a the same night: two houses, the second mother =================
addScene('c9', 'c11', {
  svg: nightHousesSVG('s4') + `<g id="s4sh" opacity="0"><circle cx="0" cy="-30" r="22" fill="#5A3A28"/><path d="M-30,30 Q-30,-6 0,-6 Q30,-6 30,30 Z" fill="#5A3A28"/></g>`,
  html: pillH(540, 352, 'c9', 'Usi shehar, <span class="hl">usi raat</span> 🌙', '', 'c10-0.05') + pillH(540, 352, 'c10', 'Ek aur maa… <span class="hl">pareshaan</span> 😰'),
  noWm: false, fx: 810, fy: 900,
  cam: (t, lt) => lerp(1, 1.55, E.io(clamp((t - T('c10')) / 1.4))),
  upd(t) { // Krupa's shadow paces behind the right window
    op($('s4sh'), t > T('c10') - .4 ? .85 : 0); tf($('s4sh'), 810 + Math.sin(t * 2.2) * 36, 925, 1);
  }
});

// ================= S4b Krupa's room: a wedding next week; her son jumps on the bed =================
addScene('c11', 'c14', {
  svg: homeBG('s4b', { night: true, lamp: true, lampX: 900, noShelf: true, noClock: true, noPlant: true }) + `<g transform="translate(530,580) scale(.8)">${calendarSVG('s4cal', 'SHAADI', '7 din')}</g>` +
    bedSVG(760, FLOOR - 60, 520, '#4F86C6') + `<g id="s4kw">${stand('s4k', KRUPA_BETA.vest, 0, 0, .5)}</g>` + stand('s4c', KRUPA, 280, feet(.8), .8) +
    `<g id="s4tag">${priceTagSVG('s4t', '₹6,000', 0, 0, { fs: 34 })}</g>`,
  html: pillH(540, 352, 'c11', 'Doosri maa… <span class="hl">wahi problem</span> 😰') + UDA(820, 450, 'c12') +
    `<div class="bubble" style="left:500px;top:1090px;width:500px;font-size:38px" data-t="c11+0.1" data-out="c12-0.05">"Shaadi <span class="hl">agle hafte</span> hai…"</div>` +
    `<div class="bubble" style="left:500px;top:1090px;width:500px;font-size:38px" data-t="c12" data-out="c13-0.05">"Aur iske liye <span class="hl">₹6,000</span> ki sherwani?"</div>` +
    `<div class="bubble" style="left:500px;top:1090px;width:500px;font-size:38px" data-t="c13">"<span class="hl">Do mahine</span> mein chhoti ho jayegi!" 📏</div>`,
  cam: [1, 1.04], fy: 880,
  upd(t) {
    const j = -Math.abs(Math.sin(t * 4.2)) * 70, kx = 790, ky = FLOOR - 100 - 372 * .5;
    tf($('s4kw'), kx, ky + j, 1); PL['s4k'].x = kx; PL['s4k'].y = ky + j;
    life('s4k', t, { mouth: 'grin', brows: 'up', look: [-.3, -.2], L: [150, -20], R: [150, -20], hL: 'open', hR: 'open', seed: 6 });
    const A = life('s4c', t, { speak: true, brows: 'worry', look: t > T('c12') ? [.9, -.3] : [.7, .3], sweat: .9, tilt: t > T('c13') ? -6 : 0,
      R: [80, -40], hR: 'fist', L: t > T('c13') ? [130, -50] : [9, -14], hL: 'open', seed: 2 });
    atHand('s4tag', 's4c', A.hr, 10, -40, Math.sin(t * 3) * 8, 1);
  }
});

// ================= S5 split screen: one has it, the other needs it — but they don't know =================
const DOTS = [...Array(13)].map((_, i) => { const k = i / 12; return [lerp(330, 760, k), 960 - Math.sin(k * Math.PI) * 300]; });
addScene('c14', 'c17', {
  svg: `<rect width="540" height="${H}" fill="${C.wall}"/><rect x="540" width="540" height="${H}" fill="#C9C3D9"/><rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#A47648"/>` +
    bust('s5r', RIDDHI, 250, 950, .62) + `<g transform="translate(270,1230) scale(.8)">${dresserSVG('s5d')}</g>` +
    stand('s5k', KRUPA, 830, feet(.7), .7) + `<g id="s5ph"><g transform="scale(.42)">${phoneSVG('s5p', 0, 0, 560, 1000, searchScreen())}</g></g>` +
    `<rect x="534" y="0" width="12" height="${H}" fill="${C.redDark}"/>` +
    DOTS.map(([x, y], i) => `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><g data-t="c14+${(.4 + i * .08).toFixed(2)}" data-k="pop" ${i >= 4 && i <= 8 ? 'data-out="c16+0.2"' : ''}><circle r="13" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g></g>`).join('') +
    `<g transform="translate(545,700)"><g data-t="c16+0.3" data-k="pop" data-swing="10"><circle r="74" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text y="34" text-anchor="middle" font-family="Inter" font-weight="900" font-size="100" fill="${C.red}">?</text></g></g>`,
  html: pillH(540, 352, 'c14', 'Ek ke paas hai… <span class="hl">doosre ko chahiye</span> 🤝', '', 'c16-0.05') + pillH(540, 352, 'c16', 'Par <span class="hl">pata hi nahi</span> tha 🤷‍♀️') +
    pillH(270, 470, 'c14+0.2', 'Riddhi 🗄️', 'gold') + pillH(810, 470, 'c14+0.2', 'Krupa 📱', 'gold'),
  cam: [1, 1.03], fy: 900,
  init() { $('s5d-in').innerHTML = `<circle cx="0" cy="-292" r="130" fill="url(#glow)"/><g transform="translate(0,-292) scale(.75)">${SHER()}</g><g transform="translate(90,-380)" class="sway">${ageTagSVG('Age 4–5')}</g>`; },
  upd(t) {
    dresserOpen('s5d', 1);
    life('s5r', t, { pivot: 0, mouth: 'smile', brows: 'norm', look: [0, .7], R: [9, -14], L: [9, -14], seed: 1 });
    const A = life('s5k', t, { mouth: t > T('c16') ? 'sad' : 'worry', brows: 'worry', look: [-.4, .5], sweat: .8, R: [9, -14], L: [100, -90], hL: 'fist', seed: 2 });
    atHand('s5ph', 's5k', A.hl, 10, -130, -4);
  }
});

// ================= S6 flashback: last year Riddhi was Krupa (rushing out of a shop with bags and a long bill) =================
addScene('c17', 'c19', {
  svg: rentalShopBG('s6', { sign: 'KIDS WEAR', noMirror: true }) + `<rect width="${W}" height="${H}" fill="#C9A77A" opacity=".3"/>` +
    `<g id="s6vw">${stand('s6v', VIHAAN.home, 0, 0, .46)}</g><g id="s6rw">${stand('s6r', RIDDHI, 0, 0, .8)}</g>` +
    `<g id="s6bR"><g transform="translate(0,70) scale(.36)">${bagSVG()}</g></g><g id="s6bL"><g transform="translate(0,70) scale(.36)">${bagSVG()}</g></g>` +
    `<g transform="translate(900,820)"><g data-t="c18" data-k="drop" data-swing="16"><rect x="-70" y="0" width="140" height="330" fill="#fff" stroke="${OL}" stroke-width="4"/>` +
    [...Array(7)].map((_, i) => `<rect x="-50" y="${24 + i * 36}" width="${70 + (i * 23) % 30}" height="12" rx="6" fill="#D8CDBE"/>`).join('') + `<text y="318" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.red}">₹₹₹</text></g></g>` +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#5A3A28" stroke-width="70" opacity=".35"/>`,
  html: pillH(540, 352, 'c17', 'Pichhle saal ⏪', 'gold', 'c18-0.05') + `<div class="title" style="top:430px;font-size:68px" data-t="c18">Pichhle saal <span class="g">Riddhi bhi</span><br>yahi thi 😅</div>`,
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const g = glide(t, T('c17') - .1, 2.2, 860, 430, 12), y0 = feet(.8);
    tf($('s6rw'), g[0], y0 + g[1], 1); PL['s6r'].x = g[0]; PL['s6r'].y = y0 + g[1];
    const g2 = glide(t, T('c17') - .1, 2.2, 1050, 680, 10), y1 = feet(.46);
    tf($('s6vw'), g2[0], y1 + g2[1], 1); PL['s6v'].x = g2[0]; PL['s6v'].y = y1 + g2[1];
    const A = life('s6r', t, { mouth: 'worry', brows: 'worry', look: [.6, 0], sweat: .9, tilt: -4, R: [30, -10], L: [20, -10], seed: 1 });
    life('s6v', t, { mouth: 'o', brows: 'up', look: [-.6, -.3], L: [60, -20], hL: 'open', seed: 5 });
    atHand('s6bR', 's6r', A.hr, 0, 0, Math.sin(t * 6) * 6); atHand('s6bL', 's6r', A.hl, 0, 0, Math.sin(t * 6 + 1) * 6);
  }
});

// ================= S7a three jobs: photo, age + size, list (top-down on a cream sheet) =================
addScene('c19', 'c22', {
  svg: `<rect width="${W}" height="${H}" fill="#A47648"/><rect x="70" y="520" width="940" height="900" rx="26" fill="${C.cream}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<g transform="translate(330,960) scale(1.45)">${SHER()}</g><g transform="translate(750,960) scale(1.45)">${kidOutfitSVG('kurta', '#F2A33A', '#D9862A')}</g>` +
    `<g id="s7vf" opacity="0" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"><path d="M150,650 V600 H210 M450,600 H510 V650 M510,1270 V1320 H450 M210,1320 H150 V1270"/></g>` +
    `<g transform="translate(330,960)"><g data-t="c20+0.3" data-k="pop" data-out="c20+0.9">${flashSVG(110)}</g></g>` + flash('s7fl') +
    `<g transform="translate(400,690)"><g data-t="c21" data-k="drop" data-swing="10">${ageTagSVG('Age 4–5')}</g></g><g transform="translate(820,690)"><g data-t="c21+0.3" data-k="drop" data-swing="10">${ageTagSVG('Age 3–4')}</g></g>` +
    `<g transform="translate(540,1220)"><g data-t="c21+0.6" data-k="pop"><rect x="-200" y="-40" width="400" height="80" rx="40" fill="#fff" stroke="${OL}" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="${C.text}">📏 Size likha</text></g></g>`,
  html: pillH(540, 352, 'c19', 'Riddhi ke <span class="hl">teen kaam</span> ✌️☝️', '', 'c20-0.05') +
    pillH(540, 352, 'c20', '<span class="step">1</span> 📸 <span class="hl">Photo</span>', '', 'c21-0.05') + pillH(540, 352, 'c21', '<span class="step">2</span> 📏 <span class="hl">Age + size</span>'),
  cam: [1, 1.04], fy: 960,
  upd(t) {
    const vf = t > T('c20') - .1 && t < T('c21'); op($('s7vf'), vf ? 1 : 0);
    const f = P(t, T('c20') + .3, .12); op($('s7fl'), f > 0 && f < 1 ? .85 * (1 - f) : 0);
  }
});

// ================= S7b listed: Riddhi's phone shows her listing (the app's name still hidden) =================
addScene('c22', 'c23', {
  svg: homeBG('s7b', { noShelf: true, noClock: true }) + `<circle cx="540" cy="860" r="420" fill="url(#glow)" opacity=".8"/>` + bust('s7r', RIDDHI, 330, FLOOR + 230, 1.0) + counterSVG(FLOOR + 170) +
    `<g id="s7ph"><g transform="scale(.5)">${phoneSVG('s7p', 0, 0, 560, 1000, listingScreen(false, true))}</g></g>` + checkBadge(900, 600, 'c22+0.5', 50),
  html: pillH(540, 352, 'c22', '<span class="step">3</span> ✅ <span class="hl">Rent pe list</span>'),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const A = life('s7r', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.8, -.2], tilt: 4, R: [110, -80], hR: 'fist', L: [9, -14], y: hop(t, T('c22') + .4, 16), seed: 1 });
    atHand('s7ph', 's7r', A.hr, 70, -170, 6);
  }
});

// ================= S8a the reveal: Krupa finds it on Anokhi Reet (her phone turns around) =================
addScene('c23', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s8ro', 540, 860, .14, C.gold) + `<circle cx="540" cy="860" r="440" fill="url(#glow)" opacity=".6"/>` +
    bust('s8k', KRUPA, 300, FLOOR + 200, .9) + counterSVG(FLOOR + 150, '#5D0000') + `<g id="s8back">${phoneBackSVG(2.3)}</g>` +
    `<g id="s8front"><g transform="scale(.52)">${phoneSVG('s8p', 0, 0, 560, 1000, listingScreen(true, false))}</g></g>` + sparks([[960, 620], [980, 1120], [560, 600]], 'c23+0.5'),
  html: `<img id="s8wm" style="position:absolute;left:540px;top:400px;width:460px" data-t="c23+0.3" src="">` + pillH(540, 525, 'c24', 'Sherwani <span class="hl">rent kar li</span> ✅', 'big'),
  noWm: true, cam: [1, 1.03], fy: 860,
  init() { $('s8wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s8ro'), 540, 860, 1, t * 5);
    const k = clamp((t - T('c23') - .1) / .5), sx = Math.cos(k * Math.PI);
    $('s8back').setAttribute('transform', `translate(760,880) scale(${k < .5 ? Math.abs(sx).toFixed(3) : 0},1)`);
    $('s8front').setAttribute('transform', `translate(760,880) scale(${k >= .5 ? Math.abs(sx).toFixed(3) : 0},1)`);
    life('s8k', t, { pivot: 0, mouth: k >= .5 ? 'big' : 'o', brows: 'up', look: [.8, -.1], tilt: 4, R: [130, -70], hR: 'open', L: [9, -14], seed: 2 });
  }
});

// ================= S8b the wedding: Krupa's son in the sherwani, like a little raja =================
addScene('c25', 'c26', {
  svg: weddingHallBG('s8b') + stand('s8bm', MAUSI, 170, feet(.66), .66) + stand('s8bk', KRUPA, 900, feet(.7), .7) +
    `<circle cx="540" cy="900" r="300" fill="url(#glow)" opacity=".8"/>` + stand('s8bb', KRUPA_BETA.sherwani, 540, feet(.6), .6) + sparks([[360, 760], [720, 740], [380, 1060], [710, 1080]], 'c25+0.2') +
    `<g transform="translate(540,620)"><g data-t="c25+0.4" data-k="drop" data-bob="5"><text text-anchor="middle" font-size="110">👑</text></g></g>`,
  html: pillH(540, 352, 'c25', 'Beta <span class="hl">raja jaisa</span> 👑'),
  cam: [1, 1.05], fy: 900,
  upd(t) {
    life('s8bb', t, { mouth: 'grin', brows: 'sure', look: [0, -.2], tilt: -5, L: [40, -120], R: [40, -120], hL: 'fist', hR: 'fist', y: hop(t, T('c25') + .2, 18), seed: 7 });
    life('s8bk', t, { mouth: 'grin', brows: 'up', look: [-.9, .2], tilt: -6, R: CLASP, L: CLASP, seed: 2 });
    life('s8bm', t, { mouth: 'o', brows: 'up', look: [.9, .2], tilt: 6, seed: 1 });
  }
});

// ================= S8c Riddhi's drawer starts earning: "Booking ✓" =================
addScene('c26', 'c28', {
  svg: homeBG('s8c', { noWindow: true, noClock: true, shelfX: 760 }) + stand('s8cr', RIDDHI, 810, feet(.8), .8) + `<g transform="translate(300,1230) scale(.8)">${dresserSVG('s8cd')}</g>` +
    `<g id="s8cph"><g transform="scale(.9)">${phoneBackSVG(1)}</g></g>` +
    `<g transform="translate(370,760)"><g data-t="c26+0.2" data-k="drop">${notifSVG('Anokhi Reet', 'Booking ✓ Sherwani (Age 4–5)', 660)}</g></g>`,
  html: pillH(540, 352, 'c27', 'Ek maa ki <span class="hl">kamaai</span> 💰') + pillH(540, 450, 'c27+0.35', 'Doosri maa ki <span class="hl">bachat</span> 🙌', 'gold'),
  cam: [1, 1.04], fy: 900,
  init() { $('s8cd-in').innerHTML = OUTFITS.slice(1).map(([k, c, d], i) => `<g transform="translate(${-60 + i * 120},-292) scale(.5)">${kidOutfitSVG(k, c, d)}</g>`).join('') + `<g transform="translate(-180,-292)"><rect x="-50" y="-60" width="100" height="120" rx="12" fill="none" stroke="${C.goldTan}" stroke-width="5" stroke-dasharray="10 8"/></g>`; },
  upd(t) {
    dresserOpen('s8cd', 1);
    const ping = t > T('c26') + .2;
    const A = life('s8cr', t, { mouth: ping ? 'grin' : 'smile', brows: 'up', look: ping ? [-.4, -.6] : [0, .5], tilt: ping ? 5 : 0, R: [100, -90], hR: 'fist', L: [9, -14], y: hop(t, T('c26') + .3, 14), seed: 1 });
    atHand('s8cph', 's8cr', A.hr, -10, -90, Math.sin(t * 20) * (t > T('c26') + .2 && t < T('c26') + .7 ? 6 : 0));
  }
});

// ================= S9a the ask: Riddhi holds up the tiny sherwani, Vihaan peeks =================
addScene('c28', 'c29', {
  svg: homeBG('s9', { noClock: true }) + stand('s9v', VIHAAN.home, 300, feet(.5), .5) + stand('s9r', RIDDHI, 500, feet(.8), .8) + `<g id="s9hold"><g transform="scale(1.05)">${SHER()}</g></g>`,
  html: pillH(540, 352, 'c28', 'Bachchon ke outfits <span class="hl">rent pe do</span> 👗'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const A = life('s9r', t, { speak: true, brows: 'up', look: [0, 0], tilt: 4, R: [120, -60], hR: 'fist', L: [9, -14], seed: 1 });
    atHand('s9hold', 's9r', A.hr, 10, 110, 0, 1);
    life('s9v', t, { mouth: 'grin', brows: 'up', look: [.5, -.3], tilt: 10 + Math.sin(t * 3) * 4, lean: 6, L: [9, -14], R: [9, -14], seed: 5 });
  }
});

// ================= S9b end card: Comment OUTFIT =================
addScene('c29', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s9r2', 540, 760, .16, C.gold) + bust('s9bv', VIHAAN.home, 230, FLOOR + 330, .62) + bust('s9br', RIDDHI, 560, FLOOR + 330, .9) +
    `<g id="s9bh"><g transform="scale(.9)">${SHER()}</g></g>` + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s9wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:520px;font-size:66px">Bachchon ke outfits<br><span class="g">rent pe dene hain?</span></div>` +
    pillH(540, 730, 'c30', 'Comment <span class="hl">OUTFIT</span> 👇', 'big') + pillH(540, 850, 'c29+0.5', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { $('s9wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s9r2'), 540, 760, 1, t * 5);
    const end = t > T('c30') + .6;
    const A = life('s9br', t, { pivot: 0, mouth: end ? 'grin' : talkMouth(t, true), brows: 'up', look: [0, 0], tilt: 4, R: [120, -60], hR: 'fist', L: [9, -14], seed: 1 });
    atHand('s9bh', 's9br', A.hr, 10, 100, 0, 1);
    life('s9bv', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.4, 0], tilt: 6, R: [9, -14], L: end ? WAVE(t, T('c30') + .6) : [9, -14], hL: 'open', seed: 5 });
  }
});
