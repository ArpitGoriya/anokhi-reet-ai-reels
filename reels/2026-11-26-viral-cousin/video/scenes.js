// ===== Cousin har shaadi ki photo mein viral (comic + Instagram frames; Nidhi narrates, Ishani has the secret) =====
// Open loops: "sach end mein" (all looks on rent) and "asli twist abhi baaki" (her old outfits earn). App hidden till the end.
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const UDA = (x = 540, y = 450, at = '-1', out = '') => pillH(x, y, at, 'Udaharan 📝', 'gold', out);
const feet = sc => FLOOR + 40 - 372 * sc;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const burst = (x, y, at, txt, fill, r = 120, fs = 50, rot = -8, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>${burstSVG(txt, fill, r, fs)}</g></g>`;
const bub = (x, y, w, at, out, html, fs = 34) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const xMark = (x, y, at, r = 40) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="pop">${crossSVG(r)}</g></g>`;
const comment = (x, y, at, txt) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="slideR"><rect x="-230" y="-34" width="460" height="68" rx="34" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="-196" cy="0" r="20" fill="${C.marigold}"/><text x="-166" y="10" font-family="Inter" font-weight="700" font-size="26" fill="${C.text}">${txt}</text></g></g>`;

// ================= S1 hook: the photo booth — flash — it becomes a viral post =================
addScene(0, 'c4', {
  svg: photoBoothBG('s1') + stand('s1i', ISHANI.pastel, 540, feet(.74), .74) + flash('s1fl') +
    `<g id="s1fr" opacity="0"><path fill-rule="evenodd" d="M0,0 H${W} V${H} H0 Z M200,470 H880 V1150 H200 Z" fill="#1A1A1A" opacity=".8"/>` +
    `<rect x="200" y="380" width="680" height="890" rx="20" fill="none" stroke="#fff" stroke-width="8"/><rect x="200" y="380" width="680" height="90" fill="#fff"/><circle cx="250" cy="425" r="28" fill="${C.pink}" stroke="#F2A33A" stroke-width="5"/>` +
    `<text x="292" y="437" font-family="Inter" font-weight="800" font-size="32" fill="${C.text}">ishani.styles</text><rect x="200" y="1150" width="680" height="120" fill="#fff"/>` +
    `<text x="226" y="1200" font-size="40">🤍 💬 ➤</text><text id="s1lk" x="226" y="1252" font-family="Inter" font-weight="900" font-size="40" fill="${C.text}">❤️ 0</text></g>` +
    floatHeartsSVG('s1h', 10, 540, 1080),
  html: `<div class="title" style="top:322px;font-size:56px" data-t="-1">Har shaadi · Har photo <span class="g">VIRAL</span> 📸</div>`,
  noWm: true, cam: [1, 1.03], fy: 900,
  upd(t) {
    const f = P(t, .5, .15); op($('s1fl'), f > 0 && f < 1 ? .9 * (1 - f) : 0);
    op($('s1fr'), P(t, T('c2') - .2, .3));
    const n = P(t, T('c2'), 1.6, E.out); $('s1lk').textContent = '❤️ ' + (n < 1 ? Math.round(n * 2400).toLocaleString('en-IN') : '2.4K');
    floatHearts('s1h', 10, t, T('c2') + .2);
    life('s1i', t, { mouth: t > .6 ? 'grin' : 'smile', brows: 'up', look: [0, 0], tilt: 6, wink: t > 1.2 && t < 1.6, L: [40, -120], R: [150, -40], hR: 'open', sway: 2, seed: 2 });
  }
});

// ================= S2 the promise: Nidhi raises her eyebrows — the truth comes at the end =================
addScene('c4', 'c7', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s2p', 40, 420, 1000, 880, '#C9A6E8', bust('s2n', NIDHI, 540, 1380, 1.05)) +
    `<g transform="translate(860,600)"><g data-t="c5" data-k="pop" data-bob="8"><text text-anchor="middle" font-size="90">🎁</text></g></g>`,
  html: pillH(540, 352, 'c4', 'Family: "Brands <span class="hl">free</span> dete hain" 🤔', '', 'c6-0.05') + pillH(540, 352, 'c6', 'Sach <span class="hl">end mein</span> 🤫'),
  noWm: true, cam: [1, 1.05], fy: 860,
  upd(t) { life('s2n', t, { pivot: 0, mouth: t > T('c6') ? 'shy' : talkMouth(t, true), brows: 'up', look: [0, 0], tilt: t > T('c6') ? 8 : 3, R: [120, -150], hR: 'fist', L: [9, -14], seed: 2 }); }
});

// ================= S3 the feed: Mehendi · Sangeet · Shaadi · Reception — thousands of likes =================
const FEED = [['MEHENDI', ISHANI.mint, '❤️ 1.8K', 150, 400, 'c7'], ['SANGEET', ISHANI.gown, '❤️ 3.1K', 570, 400, 'c8'], ['SHAADI', ISHANI.pastel, '❤️ 2.4K', 150, 900, 'c9'], ['RECEPTION', ISHANI.saree, '❤️ 4.2K', 570, 900, 'c10']];
addScene('c7', 'c12', {
  svg: `<rect width="${W}" height="${H}" fill="#F4F1EC"/>` +
    FEED.map(([chip, look, lk, x, y, at], i) => `<g data-t="${at}" data-k="pop">${instaPostSVG('s3p' + i, x, y, 360, stand('s3i' + i, look, x + 180, y + 262, .36), lk)}` +
      `<g transform="translate(${x + 270},${y + 86})"><rect x="-88" y="-24" width="176" height="48" rx="12" fill="${C.redDark}"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="24" fill="#fff">${chip}</text></g></g>`).join('') +
    floatHeartsSVG('s3h', 10, 540, 1300),
  html: pillH(540, 352, 'c10+0.6', '4 shaadi · 4 <span class="hl">VIRAL</span> look 😳'),
  noWm: true, cam: [1, 1.02], fy: 860, capY: 1415,
  upd(t) { floatHearts('s3h', 10, t, T('c11')); FEED.forEach((_, i) => life('s3i' + i, t, { mouth: 'grin', brows: 'up', look: [i % 2 ? -.3 : .3, 0], tilt: i % 2 ? -6 : 6, wink: i === 3 && t > T('c11'), R: i === 1 ? [150, -40] : [9, -14], hR: 'open', L: i === 2 ? [40, -120] : [9, -14], sway: 2, seed: i + 2 })); }
});

// ================= S4 the family chat: "Brands paise dete honge!" "Sponsored hoga sab." — Nidhi whispers =================
addScene('c12', 'c16', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/><circle cx="420" cy="900" r="520" fill="url(#glow)"/>` +
    `<g transform="translate(420,900) scale(.82)">${phoneSVG('s4p', 0, 0, 560, 1000, groupChatScreen('Shah Parivaar 🏠', '24 members', [
      { who: 'Badi Mummy', col: '#7A3E6E', lines: ['Ishani ko brands paise dete', 'honge, influencer hai na! 🤑'], at: 'c12' },
      { who: 'Mama', col: C.teal, lines: ['Sponsored hoga sab 🙄'], at: 'c14' }], -300))}</g>` +
    bust('s4n', NIDHI, 880, 1940, 1.0),
  html: pillH(540, 352, 'c14', '"Sab <span class="hl">SPONSORED</span> hai!" 🙄') + bub(800, 1000, 380, 'c15', '', '🤫 Maine <span class="hl">seedha usi se</span> poochh liya…', 32),
  cam: [1, 1.03], fy: 900, capY: 1300,
  upd(t) { const w = t > T('c15'); life('s4n', t, { pivot: 0, mouth: w ? talkMouth(t, true) : 'flat', brows: w ? 'up' : 'norm', look: w ? [0, 0] : [-.9, 0], tilt: w ? -6 : 0, L: w ? [140, -150] : [9, -14], hL: 'open', R: [9, -14], seed: 2 }); }
});

// ================= S5 the sofa: "Kitna kharcha kiya?" — "Guess kar." — the guesses =================
addScene('c16', 'c19', {
  svg: homeBG('s5', { noClock: true }) + sofaSVG(540, 1150) + bust('s5n', NIDHI, 360, 1260, .9) + bust('s5i', ISHANI.home, 720, 1260, .9) +
    `<rect x="160" y="1230" width="760" height="44" rx="12" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/><rect x="190" y="1272" width="700" height="130" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
    xMark(400, 470, 'c17+0.8') + xMark(700, 520, 'c18') + xMark(560, 610, 'c18+0.6'),
  html: bub(300, 650, 420, 'c16', 'c17+0.3', '"Sach bata, <span class="hl">kitna kharcha</span> kiya in looks pe?"', 32) +
    bub(250, 470, 260, 'c17+0.3', '', '"<span class="hl">₹1 lakh?</span>"', 32) + bub(830, 520, 260, 'c17+0.8', '', '"<span class="hl">₹2 lakh?!</span>"', 32) + bub(560, 610, 460, 'c18', '', '"Brand ne diye honge <span class="hl">free!</span>"', 30) +
    bub(780, 760, 280, 'c18', '', '"<span class="hl">Guess kar.</span>" 😏', 32) + pillH(540, 352, 'c16', 'Ishani ne kitne kharche? <span class="hl">₹ ???</span>', '', 'c18-0.05') + pillH(540, 352, 'c18', 'Aapka <span class="hl">guess?</span> 👇'),
  cam: [1, 1.04], fy: 950,
  upd(t) {
    life('s5n', t, { pivot: 0, mouth: t < T('c17') + .3 ? talkMouth(t, true) : 'o', brows: 'up', look: [.8, 0], R: [100, -60], hR: 'open', seed: 2 });
    life('s5i', t, { pivot: 0, mouth: t > T('c18') ? talkMouth(t, true) : 'smile', brows: 'sure', look: [-.6, 0], tilt: t > T('c17') + .8 ? Math.sin(t * 8) * 8 : 3, R: [9, -14], L: [9, -14], seed: 3 });
  }
});

// ================= S6 twist 1: no brand — all four on rent, ₹1,200 each, ₹4,800 (Udaharan) =================
const RW = [['Mehendi', '#A8E0C8'], ['Sangeet', '#2E3A6E'], ['Shaadi', '#F4C6D6'], ['Reception', '#C8CCD4']].map(([n, c], i) => `<g transform="translate(0,${-250 + i * 150})"><g data-t="c20+${(i * .2).toFixed(1)}" data-k="slideL"><rect x="-230" y="-58" width="460" height="116" rx="18" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
  `<g transform="translate(-170,0)">${lehengaHangerSVG('', { c, d: c, dupatta: '#FFF0F5' }, .28)}</g><text x="-100" y="-8" font-family="Inter" font-weight="900" font-size="30" fill="${C.text}">${n} · Rent</text><text x="-100" y="34" font-family="Inter" font-weight="900" font-size="34" fill="${C.red}">₹1,200</text>` +
  `<circle cx="180" cy="0" r="30" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><path d="M166,0 L176,11 L194,-11" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g></g>`).join('');
addScene('c19', 'c23', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s6p', 40, 420, 1000, 880, '#8FD3E8', bust('s6i', ISHANI.home, 280, 1400, 1.0)) +
    `<g id="s6ph"><g transform="scale(.62)">${phoneSVG('s6pp', 0, 0, 560, 1000, `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arMysteryHeader() + RW)}</g></g>` +
    burst(300, 600, 'c22', '₹4,800 TOTAL', '#F7D23A', 190, 40, -6) + burst(840, 1210, 'c22+0.6', 'WHAT?!', '#fff', 90, 40, 10),
  html: pillH(540, 352, 'c19', 'Sponsored nahi… <span class="hl">RENT PAR!</span>', '', 'c22-0.05') + pillH(540, 352, 'c22', '4 look = <span class="hl">₹4,800</span> 😎') + UDA(870, 470, 'c21'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    const A = life('s6i', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'sure', look: [.4, 0], tilt: 4, R: [120, -90], hR: 'fist', L: [9, -14], seed: 3 });
    atHand('s6ph', 's6i', A.hr, 240, -200, 4);
  }
});

// ================= S7 the almari: "Ye almari bhar ke kapde kiske hain?" — "Aur bhi mazedaar…" =================
const ALM = [['#E26A8A', '#C24E70'], ['#F7C548', '#D9A52E'], [C.emerald, C.emeraldDark], ['#7A4FA0', '#5D3A7E'], [C.lehenga, C.lehengaDark]];
addScene('c23', 'c26', {
  svg: homeBG('s7', { noWindow: true, noShelf: true, noClock: true }) + almirahSVG('s7a', 540, FLOOR + 20, 1.05) + stand('s7n', NIDHI, 180, feet(.7), .7) + stand('s7i', ISHANI.home, 900, feet(.7), .7),
  html: bub(300, 520, 480, 'c23', 'c25-0.05', '"Toh ye <span class="hl">almari bhar ke kapde</span> kiske hain?"', 32) + bub(780, 520, 440, 'c25', '', '"Woh toh <span class="hl">aur bhi mazedaar</span> hai…" 😏', 32) +
    pillH(540, 352, 'c25+0.3', 'Asli <span class="hl">TWIST</span> abhi baaki hai 👀'),
  cam: [1, 1.04], fy: 900,
  init() {
    $('s7a-inside').innerHTML = ALM.map(([c, d], i) => `<g transform="translate(${-120 + i * 60},-330) scale(.42)">${lehengaHangerSVG('', { c, d, dupatta: '#FFE3CF' })}</g>`).join('');
    $('s7a-dL').setAttribute('transform', 'translate(-150,0) scale(.08,1) translate(150,0)'); $('s7a-dR').setAttribute('transform', 'translate(150,0) scale(.08,1) translate(-150,0)');
  },
  upd(t) {
    life('s7n', t, { mouth: t < T('c25') ? talkMouth(t, true) : 'o', brows: 'up', look: [.9, 0], R: [100, -20], hR: 'point', L: [9, -14], seed: 2 });
    life('s7i', t, { mouth: t > T('c25') ? talkMouth(t, true) : 'grin', brows: 'sure', look: [-.9, 0], tilt: -5, R: [9, -14], L: [40, -120], seed: 3 });
  }
});

// ================= S8a old posts: followers ask "Ye outfit kahan milega?" — her old outfits = their wishlist =================
addScene('c26', 'c28', {
  svg: `<rect width="${W}" height="${H}" fill="#F4F1EC"/>` + instaPostSVG('s8p', 210, 400, 660, stand('s8i', ISHANI.mint, 540, 850, .62), '❤️ 1.8K') +
    comment(520, 1030, 'c26+0.4', 'Ye outfit kahan milega? 😍') +
    `<g transform="translate(600,1140)"><g data-t="c26+1.2" data-k="slideR"><rect x="-330" y="-52" width="660" height="104" rx="30" fill="#FFF0F5" stroke="${C.pink}" stroke-width="4"/><circle cx="-294" cy="-16" r="20" fill="${C.pink}" stroke="#F2A33A" stroke-width="3"/>` +
    `<text x="-262" y="-10" font-family="Inter" font-weight="800" font-size="24" fill="${C.text}">↳ ishani.styles: <tspan fill="${C.red}">Anokhi Reet pe! 💖</tspan></text><text x="-262" y="30" font-family="Inter" font-weight="700" font-size="24" fill="${C.text}">App download karo aur outfit rent pe lo</text></g></g>` +
    comment(540, 1255, 'c27+0.4', 'Mujhe bhi chahiye! 🙋‍♀️'),
  html: pillH(540, 352, 'c26', 'Purane outfits = Followers ki <span class="hl">WISHLIST</span> 😍'),
  noWm: true, cam: [1, 1.03], fy: 860, capY: 1420,
  upd(t) { life('s8i', t, { mouth: 'grin', brows: 'up', look: [0, 0], tilt: 5, R: [150, -40], hR: 'open', L: [9, -14], sway: 2, seed: 3 }); }
});

// ================= S8b on rent: bookings fill up — KA-CHING! — the ledger: profit (Udaharan) =================
addScene('c28', 'c30', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s9p', 40, 420, 1000, 880, '#B8E08F', '') +
    `<g transform="translate(540,720) scale(.72)">${bookingCalendarSVG('s9c', 'RENT PE 👗', 9)}</g>` + burst(230, 540, 'c28+0.4', 'KA-CHING!', '#F7D23A', 110, 40, -10) +
    `<g id="s9led">${ledgerCardSVG([['Kharcha (rent liya)', '₹4,800', '#D9363E'], ['Kamaai (purane rent pe)', '₹8,000', '#1F7A4D']], ['PROFIT 😎', '₹3,200 ✅'], 900)}</g>`,
  html: pillH(540, 352, 'c28', 'Followers <span class="hl">rent pe</span> leti hain 💰') + UDA(860, 470, 'c29'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    for (let i = 0; i < 9; i++) { const p = pop(t, T('c28') + .2 + i * .14); op($('s9c-t' + i), p.o); tf($('s9c-t' + i), 0, 0, p.s); }
    const k = P(t, T('c29'), .5); tf($('s9led'), 540, lerp(1700, 1080, k), 1); op($('s9led'), clamp(k * 2));
  }
});

// ================= S9 the punchline: "Influencer bhi… aur investor bhi" — Badi Mummy wants in too =================
addScene('c30', 'c33', {
  svg: photoBoothBG('s10') + stand('s10i', dress(ISHANI.pastel, { shades: true }), 540, feet(.74), .74) + `<g id="s10ph">${phoneBackSVG(.9)}</g>` +
    `<g transform="translate(540,1290)"><g data-t="c32" data-k="drop">${notifSVG('Shah Parivaar 🏠', 'Badi Mummy: Beta, meri saree bhi daal de na 🙏', 900)}</g></g>` +
    burst(860, 560, 'c32+0.5', 'DING! 😂', '#fff', 90, 38, 10) + flash('s10fl'),
  html: pillH(540, 352, 'c30', 'Influencer bhi · <span class="hl">Investor bhi</span> 😎'),
  cam: [1, 1.04], fy: 900, capY: 1420,
  upd(t) {
    const f = P(t, T('c31'), .12); op($('s10fl'), f > 0 && f < 1 ? .7 * (1 - f) : 0);
    const A = life('s10i', t, { mouth: t > T('c32') ? 'big' : 'grin', brows: 'sure', look: [.3, -.2], tilt: 8, R: [150, -60], hR: 'fist', L: [40, -120], sway: 2, seed: 3 });
    atHand('s10ph', 's10i', A.hr, 0, -60, -10);
  }
});

// ================= S10 reveal + CTA: Anokhi Reet — rent a new look, or put old looks on rent; Comment OUTFIT =================
const btn = (y, txt, at, fill) => `<g transform="translate(0,${y})"><g data-t="${at}" data-k="pop"><rect x="-220" y="-50" width="440" height="100" rx="50" fill="${fill}" stroke="${OL}" stroke-width="5"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="${fill === C.red ? C.cream : C.redDark}">${txt}</text></g></g>`;
addScene('c33', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s11r', 540, 740, .16, C.gold) + `<circle cx="540" cy="740" r="420" fill="url(#glow)" opacity=".5"/>` +
    `<g transform="translate(540,720) scale(.4)">${phoneSVG('s11p', 0, 0, 560, 1000, `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arHeader() +
      `<circle cx="0" cy="-160" r="170" fill="url(#glow)"/><g transform="translate(0,-150)">${lehengaHangerSVG('', { c: '#F4C6D6', d: '#E3A3B8', dupatta: '#FFF0F5', b: '#E8C25E' }, .9)}</g>` +
      btn(160, 'Outfit rent karo 👗', 'c34', C.red) + btn(310, 'Apna rent pe do 💰', 'c35', C.gold))}</g>` + bust('s11i', dress(ISHANI.pastel, { shades: true }), 820, 1960, 1.0),
  html: `<img id="s11wm" style="position:absolute;left:310px;top:250px;width:460px" src="">` + pillH(540, 380, 'c33+0.3', 'anokhireet.in', 'gold') +
    pillH(540, 985, 'c36', 'Har function <span class="hl">naya look?</span>') + pillH(540, 1085, 'c39', 'Comment <span class="hl">OUTFIT</span> 👇', 'big') + pillH(540, 1185, 'c39+0.4', 'Stylish cousin ko tag karo 📸'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 740, capY: 1295,
  init() { $('s11wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s11r'), 540, 740, 1, t * 5); life('s11i', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.4, -.2], tilt: -6, R: [9, -14], L: t > T('c39') ? WAVE(t, T('c39')) : [9, -14], hL: 'open', seed: 3 }); }
});
