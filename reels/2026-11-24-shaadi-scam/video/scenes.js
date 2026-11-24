// ===== Shaadi season ka sabse bada scam 🚨 (a playful crime show: Inspector Bindiya "investigates" Hetal's almari) =====
// Open loop: "sabooth aapke ghar mein hai" (paid off in the almari). The app is named only at the end.
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const UDA = (x = 540, y = 450, at = '-1', out = '') => pillH(x, y, at, 'Udaharan 📝', 'gold', out);
const feet = sc => FLOOR + 40 - 372 * sc;
const DARK = (o = .55) => `<rect width="${W}" height="${H}" fill="#120A08" opacity="${o}"/>`;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const bang = (x, y, at, txt, col = '#D9363E', r = -8, fs = 96, out = '') => `<g transform="translate(${x},${y}) rotate(${r})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="${col}" stroke="${OL}" stroke-width="5" paint-order="stroke">${txt}</text></g></g>`;
const bub = (x, y, w, at, out, html, fs = 36) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const insp = (id, x = 820, sc = 1.15) => bust(id, BINDIYA, x, 1940, sc); // waist below the frame
const HN = HETAL.home;

// ================= S1 hook: BREAKING — the biggest scam of the wedding season =================
addScene(0, 'c4', {
  svg: `<rect width="${W}" height="${H}" fill="#140A0A"/>` + sirenLightsSVG('s1l') +
    `<rect x="0" y="300" width="${W}" height="110" fill="#D9363E" stroke="${OL}" stroke-width="5"/><text x="540" y="378" text-anchor="middle" font-family="Inter" font-weight="900" font-size="66" fill="#fff" letter-spacing="8">BREAKING 🚨</text>` +
    `<g id="s1iw" opacity="0">${insp('s1i', 540, 1.35)}</g>`,
  html: `<div class="title" style="top:760px;font-size:80px" data-t="-1">🚨 SHAADI SEASON KA<br><span class="g">SABSE BADA SCAM</span> 🚨</div>` + pillH(540, 1000, 'c3+0.3', 'Aap bhi? 😳', 'gold'),
  noWm: true, cam: [1, 1.05], fy: 800,
  upd(t) {
    sirenUpd('s1l', t);
    const k = P(t, T('c3') - .1, .5); op($('s1iw'), k); tf($('s1iw'), 0, (1 - k) * 200, 1);
    life('s1i', t, { pivot: 0, mouth: 'flat', brows: 'angry', look: [0, 0], R: t > T('c3') + .3 ? [100, -20] : [9, -14], hR: 'point', L: [9, -14], seed: 1 });
  }
});

// ================= S2 the case file slams down: CONFIDENTIAL — the proof is in your home =================
addScene('c4', 'c7', {
  svg: `<rect width="${W}" height="${H}" fill="#5A3A24"/>` + [...Array(8)].map((_, i) => `<path d="M0,${200 + i * 230} H${W}" stroke="#4A2E1C" stroke-width="6"/>`).join('') +
    `<circle cx="540" cy="860" r="560" fill="url(#glow)" opacity=".5"/>` +
    `<g transform="translate(540,880) scale(1.4)"><g data-t="c4" data-k="drop">${caseFileSVG('CASE NO. 2026')}</g></g>` +
    `<g transform="translate(560,1010)"><g data-t="c4+0.6" data-k="pop">${rubberStampSVG('CONFIDENTIAL', '#D9363E', 62)}</g></g>` + bang(820, 600, 'c4+0.05', 'SLAM!', C.gold, 10, 70),
  html: pillH(540, 352, 'c4', 'Kya aap bhi <span class="hl">victim</span> ho? 🕵️‍♀️', '', 'c5-0.05') + pillH(540, 352, 'c5', '<span class="hl">End tak</span> dekho 👀', '', 'c6-0.05') +
    `<div class="title" style="top:420px;font-size:68px" data-t="c6">Sabooth aapke <span class="g">GHAR</span> mein hai 👀</div>`,
  cam: [1, 1.05], fy: 900
});

// ================= S3 the crime board: card → shopping → ₹40,000 → 1 din → ??? (a habit, not a fraud) =================
const CARDS = [['💌 Card', 300, 560, 'c8'], ['🛍️ Shopping', 760, 640, 'c9'], ['₹40,000', 330, 860, 'c10'], ['1 DIN 📅', 760, 960, 'c11'], ['???', 420, 1130, 'c11+0.7']];
addScene('c7', 'c12', {
  svg: `<rect width="${W}" height="${H}" fill="#2A1C18"/>` + crimeBoardSVG(540, 860, 960, 840) +
    CARDS.slice(1).map(([, x, y, at], i) => { const [, x0, y0] = CARDS[i]; return `<path id="s3s${i}" d="M${x0},${y0 - 50} Q${(x0 + x) / 2},${(y0 + y) / 2 + 60} ${x},${y - 50}" fill="none" stroke="#D9363E" stroke-width="7" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`; }).join('') +
    CARDS.map(([txt, x, y, at]) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="drop">${boardCardSVG(txt, txt.length > 8 ? 40 : 48, txt.length > 8 ? 290 : 250)}</g></g>`).join('') +
    insp('s3i', 900, 1.05),
  html: pillH(540, 352, 'c7', 'Scam = <span class="hl">aadat</span>, fraud nahi 😉'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    CARDS.slice(1).forEach(([, , , at], i) => $('s3s' + i).setAttribute('stroke-dashoffset', (1 - P(t, T(at) - .15, .45)).toFixed(3)));
    const cur = CARDS.reduce((a, c, i) => t > T(c[3]) ? i : a, 0);
    life('s3i', t, { pivot: 0, speak: true, brows: 'sure', look: [-.9, -.4], L: [110 + cur * 4, -20], hL: 'point', R: [9, -14], tilt: -4, seed: 1 });
  }
});

// ================= S4 interrogation: Hetal, the lamp, the questions =================
addScene('c12', 'c19', {
  svg: `<rect width="${W}" height="${H}" fill="#2E3438"/><rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#23282B"/>` + `<g transform="translate(540,0)">${hangingLampSVG('s4lamp', 380)}</g>` +
    bust('s4h', HN, 320, FLOOR + 230, .95) + bust('s4i', BINDIYA, 780, FLOOR + 230, .95) +
    `<rect x="40" y="1300" width="1000" height="640" rx="14" fill="#4A3A2E" stroke="${OL}" stroke-width="${OW}"/><rect x="40" y="1290" width="1000" height="34" rx="10" fill="#5E4A3A" stroke="${OL}" stroke-width="${OW}"/>` +
    bang(540, 860, 'c18+0.7', 'DUN!', '#D9363E', -6, 110),
  html: bub(700, 640, 520, 'c12', 'c15-0.05', '"Hetal ji, aapne pichhli shaadi mein <span class="hl">kya pehna</span> tha?"') +
    bub(380, 660, 480, 'c15', 'c17-0.05', '"Ek <span class="hl">naya lehenga…</span> ₹40,000 ka."') +
    bub(700, 640, 520, 'c17', 'c18-0.05', '"Aur uske baad <span class="hl">kitni baar</span> pehna?"') +
    bub(380, 660, 480, 'c18', '', '"…<span class="hl">Ek baar bhi nahi.</span>" 😶') +
    pillH(540, 352, 'c15', '₹40,000 · Pehna: <span class="hl">1 baar</span>', '', 'c18-0.05') + pillH(540, 352, 'c18', 'Uske baad: <span class="hl">0</span> 😶') + UDA(540, 450, 'c16'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    tf($('s4lamp'), 0, 0, 1, Math.sin(t * 1.6) * 6);
    const ask = (t > T('c12') && t < T('c15')) || (t > T('c17') && t < T('c18')), ans = !ask && t > T('c15');
    life('s4i', t, { pivot: 0, mouth: ask ? talkMouth(t, true) : 'flat', brows: 'angry', look: [-.9, 0], lean: ask ? -6 : -2, L: ask ? [90, -40] : [9, -14], hL: 'point', R: [9, -14], seed: 1 });
    const down = t > T('c18');
    life('s4h', t, { pivot: 0, mouth: ans ? talkMouth(t, true) : 'worry', brows: 'worry', look: down ? [0, .9] : [.9, 0], sweat: .9, tilt: down ? 8 : 0, R: CLASP, L: CLASP, seed: 2 });
  }
});

// ================= S5 "Mujhe sabooth chahiye. Chalo aapke ghar." — torch on, off she goes =================
addScene('c19', 'c21', {
  svg: `<rect width="${W}" height="${H}" fill="#2E3438"/><rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#23282B"/>` +
    `<rect x="820" y="560" width="220" height="${FLOOR - 560}" fill="#4A3A2E" stroke="${OL}" stroke-width="${OW}"/><circle cx="850" cy="900" r="12" fill="${C.gold}"/>` +
    `<g id="s5beam" opacity="0">${torchBeamSVG(900)}</g>` + `<g id="s5w">${stand('s5i', BINDIYA, 0, 0, .8)}</g><g id="s5t">${torchSVG()}</g>` +
    [0, 1, 2, 3].map(i => `<g transform="translate(${470 + i * 120},${FLOOR + 90 + (i % 2) * 40})"><g data-t="c20+${(.2 + i * .2).toFixed(1)}" data-k="fade"><ellipse rx="26" ry="14" fill="#5A6066"/></g></g>`).join(''),
  html: pillH(540, 352, 'c19', 'Sabooth <span class="hl">dhoondhne</span> chalo 🔦'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const g = glide(t, T('c20'), 1.3, 380, 760, 12), y0 = feet(.8);
    tf($('s5w'), g[0], y0 + g[1], 1); PL['s5i'].x = g[0]; PL['s5i'].y = y0 + g[1];
    const A = life('s5i', t, { mouth: 'smile', brows: 'sure', look: [.9, 0], R: [80, 10], hR: 'fist', L: [9, -14], seed: 1 });
    atHand('s5t', 's5i', A.hr, 0, 0, -10); const on = t > T('c19') + .5; op($('s5beam'), on ? 1 : 0);
    const p = toScene('s5i', A.hr); tf($('s5beam'), p[0], p[1], 1, -10);
  }
});

// ================= S6 the evidence: the torch finds the almari — ₹83,000, each worn once (Udaharan) =================
const EV = [['₹40,000 · 1 baar', C.lehenga, C.lehengaDark], ['₹25,000 · 1 baar', C.emerald, C.emeraldDark], ['₹18,000 · 1 baar', C.pink, C.pinkDark]];
addScene('c21', 'c25', {
  svg: homeBG('s6', { night: true, noShelf: true, noClock: true, noPlant: true }) + DARK(.6) +
    `<g transform="translate(-60,1000)">${torchBeamSVG(780)}</g>` + almirahSVG('s6a', 600, FLOOR + 20, 1.35) +
    EV.map(([txt], i) => `<g transform="translate(${230 + i * 310},610)"><g id="s6e${i}" opacity="0"><g transform="scale(.95)">${evidenceTagSVG(txt)}</g></g></g>`).join(''),
  html: pillH(540, 352, 'c21', 'Ye raha <span class="hl">sabooth</span> 🔦', '', 'c23-0.05') + pillH(540, 352, 'c23', 'SCAM = Ek din ke liye <span class="hl">mehenga outfit</span> 🚨') +
    pillH(540, 1260, 'c24', '₹83,000 · almari mein <span class="hl">BAND</span> 🔒') + UDA(860, 450, 'c22'),
  cam: [1, 1.05], fy: 900, capY: 1420,
  init() {
    $('s6a-inside').innerHTML = EV.map(([txt, c, d], i) => `<g transform="translate(${-100 + i * 100},-330)"><g transform="scale(.5)">${coveredLehengaSVG(c, d)}</g></g>`).join('');
  },
  upd(t) {
    const k = P(t, T('c21') + .2, .7, E.io);
    $('s6a-dL').setAttribute('transform', `translate(-150,0) scale(${(1 - k * .92).toFixed(3)},1) translate(150,0)`);
    $('s6a-dR').setAttribute('transform', `translate(150,0) scale(${(1 - k * .92).toFixed(3)},1) translate(-150,0)`);
    EV.forEach((_, i) => { const p = pop(t, T('c22') + i * .45); op($('s6e' + i), p.o); tf($('s6e' + i), 0, 0, p.s, Math.sin(t * 2 + i) * 6); });
  }
});

// ================= S7 the realisation: "Scammer… main khud thi?!" — "Har saal. Har ghar mein." =================
addScene('c25', 'c28', {
  svg: homeBG('s7', { noShelf: true, noClock: true, noPlant: true }) + almirahSVG('s7a', 330, FLOOR + 20, 1) +
    stand('s7h', HN, 590, feet(.7), .7) + insp('s7i', 900, 1.0) + bang(210, 560, 'c26+0.5', 'SCRRATCH!', C.gold, -12, 60),
  html: bub(560, 480, 640, 'c25', 'c27-0.05', '"Matlab… scam karne wali <span class="hl">koi aur nahi…</span> main khud thi?!" 😱', 38) +
    bub(700, 480, 460, 'c27', '', '"Har saal. <span class="hl">Har ghar mein.</span>"') + pillH(540, 352, 'c26', '"Scammer… <span class="hl">main khud thi?!</span>" 😱'),
  cam: [1, 1.05], fy: 900,
  init() { $('s7a-inside').innerHTML = EV.map(([, c, d], i) => `<g transform="translate(${-100 + i * 100},-330) scale(.5)">${coveredLehengaSVG(c, d)}</g>`).join(''); $('s7a-dL').setAttribute('transform', 'translate(-150,0) scale(.08,1) translate(150,0)'); $('s7a-dR').setAttribute('transform', 'translate(150,0) scale(.08,1) translate(-150,0)'); },
  upd(t) {
    const sh = t > T('c26');
    life('s7h', t, { mouth: sh ? 'shock' : talkMouth(t, t < T('c27')), brows: 'up', look: [-.9, -.1], L: sh ? [150, -40] : [9, -14], R: sh ? [150, -40] : [60, -60], hL: 'open', hR: 'open', y: sh ? hop(t, T('c26'), 20) : 0, seed: 2 });
    life('s7i', t, { pivot: 0, mouth: t > T('c27') ? talkMouth(t, true) : 'flat', brows: 'sure', look: [-.8, 0], nod: t > T('c27') ? Math.abs(Math.sin(t * 4)) * 10 : 0, seed: 1 });
  }
});

// ================= S8 the solution file: rent the next outfit; put the almari outfits on rent =================
addScene('c28', 'c34', {
  svg: `<rect width="${W}" height="${H}" fill="#5A3A24"/><circle cx="540" cy="900" r="620" fill="url(#glow)" opacity=".5"/>` +
    `<rect x="40" y="480" width="1000" height="860" rx="20" fill="#EDC97A" stroke="${OL}" stroke-width="${OW}"/><path d="M540,490 V1330" stroke="#B58F48" stroke-width="6" stroke-dasharray="14 10"/>` +
    `<g transform="translate(540,560)"><g data-t="c28+0.2" data-k="pop">${rubberStampSVG('SOLUTION ✅', '#1F7A4D', 54)}</g></g>` +
    `<g data-t="c29" data-k="fade"><rect x="70" y="650" width="440" height="660" rx="16" fill="#FFF8EC" stroke="${OL}" stroke-width="4"/>${stand('s8h', HETAL.pink, 290, 1074, .5)}` +
    `<g transform="translate(410,1000)"><g data-t="c29+0.4" data-swing="12">${priceTagSVG('s8t', 'RENT', 0, 0, { fs: 30, color: '#1F7A4D' })}</g></g></g>` +
    `<g data-t="c30" data-k="fade"><rect x="570" y="650" width="440" height="660" rx="16" fill="#FFF8EC" stroke="${OL}" stroke-width="4"/>${almirahSVG('s8a', 700, 1260, .62)}` +
    `<g id="s8out"><g transform="translate(700,980) scale(.36)">${coveredLehengaSVG(C.emerald, C.emeraldDark)}</g></g><g transform="translate(900,1150) scale(.55)">${coinJarSVG('s8j', 8)}</g></g>`,
  html: pillH(540, 352, 'c28', 'Case solve: <span class="hl">2 tareeke</span> ✌️', '', 'c29-0.05') + pillH(540, 352, 'c29', '✅ Naya outfit <span class="hl">RENT karo</span>') +
    pillH(540, 440, 'c30', '✅ Purane <span class="hl">RENT pe do</span> 💰', 'gold'),
  cam: [1, 1.03], fy: 900,
  init() { $('s8a-inside').innerHTML = EV.slice(1).map(([, c, d], i) => `<g transform="translate(${-60 + i * 120},-330) scale(.5)">${coveredLehengaSVG(c, d)}</g>`).join(''); $('s8a-dL').setAttribute('transform', 'translate(-150,0) scale(.08,1) translate(150,0)'); $('s8a-dR').setAttribute('transform', 'translate(150,0) scale(.08,1) translate(-150,0)'); },
  upd(t) {
    life('s8h', t, { mouth: 'grin', brows: 'up', look: [.5, -.2], tilt: 4, R: [9, -14], L: [100, -40], hL: 'open', sway: 2, seed: 2 });
    const k = P(t, T('c31'), 1.0, E.io); tf($('s8out'), k * 160, -k * 40, 1); op($('s8out'), 1 - clamp((k - .7) / .3));
    jarFill('s8j', 8, t, T('c33b'), 1.4);
  }
});

// ================= S9 CASE CLOSED: the stamp; Hetal salutes, the inspector tips her hat =================
addScene('c34', 'c35', {
  svg: `<rect width="${W}" height="${H}" fill="#5A3A24"/><circle cx="540" cy="820" r="560" fill="url(#glow)" opacity=".6"/>` +
    `<g transform="translate(540,760) scale(1.3)">${caseFileSVG('CASE NO. 2026')}</g>` + `<g id="s9st">${rubberStampSVG('CASE CLOSED ✅', '#D9363E', 66)}</g>` + flash('s9fl', '#FFF2B0') +
    bust('s9h', HN, 250, 1940, 1.0) + insp('s9i', 830, 1.0),
  html: '',
  cam: [1, 1.04], fy: 900,
  upd(t) {
    stampIn($('s9st'), t, T('c34') + .15, 540, 780, -10);
    const f = P(t, T('c34') + .37, .15); op($('s9fl'), f > 0 && f < 1 ? .5 * (1 - f) : 0);
    life('s9h', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.6, -.3], tilt: 6, R: [165, -120], hR: 'open', L: [9, -14], seed: 2 });
    life('s9i', t, { pivot: 0, mouth: talkMouth(t, t < T('c34') + .8), brows: 'sure', look: [-.4, 0], tilt: -4, L: [9, -14], R: [9, -14], seed: 1 });
    tf($('s9i-hat'), 0, -Math.max(0, Math.sin(P(t, T('c34') + .5, .7, E.lin) * Math.PI)) * 40, 1, -Math.max(0, Math.sin(P(t, T('c34') + .5, .7, E.lin) * Math.PI)) * 12, 0, -470);
  }
});

// ================= S10 the reveal + CTA: Anokhi Reet — download the app; rent outfits? Comment RENT =================
addScene('c35', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s10r', 540, 780, .16, C.gold) +
    insp('s10i', 300, 1.15) + `<g id="s10ph"><g transform="scale(.42)">${phoneSVG('s10p', 0, 0, 560, 1000, arFeedScreen('s10f'))}</g></g>`,
  html: `<img id="s10wm" style="position:absolute;left:290px;top:200px;width:500px" src="">` +
    `<div class="title" style="top:430px;font-size:60px" data-t="c35">Download the <span class="g">Anokhi Reet</span><br>app now 📲</div>` +
    `<img id="s10as" style="position:absolute;left:330px;top:600px;width:330px" data-t="c35+0.4" src=""><img id="s10gp" style="position:absolute;left:750px;top:600px;width:340px" data-t="c35+0.5" src="">` +
    pillH(540, 740, 'c36', 'Outfits <span class="hl">rent pe chahiye?</span>') + pillH(540, 850, 'c38', 'Comment <span class="hl">RENT</span> 👇', 'big') + pillH(540, 955, 'c38+0.4', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() {
    const b = SEAL(); $('s10wm').src = b.replace('seal-on-maroon.svg', 'logo-text.svg');
    $('s10as').src = b.replace('seal-on-maroon.svg', 'app-store-badge.svg'); $('s10gp').src = b.replace('seal-on-maroon.svg', 'google-play-badge.svg');
  },
  upd(t) {
    tf($('s10r'), 540, 780, 1, t * 5); tf($('s10f-real'), 0, 0, 1); op($('s10f-q'), 0); op($('s10f-real'), 1); tf($('s10f-feed'), 0, -((t * 200) % 1200));
    const A = life('s10i', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'up', look: [.6, -.3], tilt: 4, R: [130, -70], hR: 'fist', L: t > T('c38') ? [30, -10] : [9, -14], hL: 'point', seed: 1 });
    atHand('s10ph', 's10i', A.hr, 40, -170, 6);
  }
});
