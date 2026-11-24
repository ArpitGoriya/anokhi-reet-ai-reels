// ===== Har shaadi mein nayi sherwani… kaise?! (comic-book style; Harsh narrates, Jay has the secret) =====
// Open loops: "uska secret" (paid off at "chaaron rent pe") and "asli twist abhi baaki hai" (his own sherwani earns).
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const UDA = (x = 540, y = 450, at = '-1', out = '') => pillH(x, y, at, 'Udaharan 📝', 'gold', out);
const feet = sc => FLOOR + 40 - 372 * sc;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const burst = (x, y, at, txt, fill, r = 150, fs = 60, rot = -8, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>${burstSVG(txt, fill, r, fs)}</g></g>`;
const bub = (x, y, w, at, out, html, fs = 38) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const xMark = (x, y, at, r = 46) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="pop">${crossSVG(r)}</g></g>`;

// ================= S1 hook: Jay walks in, a new sherwani again — WOW! =================
addScene(0, 'c4', {
  svg: weddingHallBG('s1') + `<g id="s1jw">${stand('s1j', JAY.maroon, 0, 0, 1)}</g>` +
    stand('s1h', HARSH, 160, feet(.7), .7) + stand('s1m', MITESH, 920, feet(.7), .7) + burst(720, 600, 'c2', 'WOW!', '#F7D23A', 115, 64, 10),
  html: `<div class="title" style="top:430px;font-size:80px" data-t="-1">Har shaadi,<br><span class="g">NAYI sherwani</span> 🤵</div>`,
  cam: [1, 1.05], fy: 900,
  upd(t) {
    const k = lerp(.56, .7, E.out(clamp(t / 3.5))), y = FLOOR + 40 - 372 * k;
    tf($('s1jw'), 540, y + Math.sin(t * 2.2) * 4, k); PL['s1j'] = { x: 540, y, sc: k };
    life('s1j', t, { mouth: 'smile', brows: 'sure', look: [0, 0], tilt: 3, R: [9, -14], L: [9, -14], sway: 2, seed: 4 });
    const wow = t > T('c1') + .6;
    life('s1h', t, { mouth: wow ? 'shock' : 'smile', brows: 'up', look: [.9, 0], tilt: wow ? 8 : 0, seed: 1 });
    life('s1m', t, { mouth: wow ? 'shock' : 'smile', brows: 'up', look: [-.9, 0], tilt: wow ? -8 : 0, L: wow ? [60, -100] : [9, -14], hL: 'open', seed: 2 });
  }
});

// ================= S2 the whisper: "ameer hai?" — the secret comes at the end =================
addScene('c4', 'c7', {
  svg: weddingHallBG('s2') + `<rect width="${W}" height="${H}" fill="${C.cream}" opacity=".3"/>` + stand('s2j', JAY.maroon, 860, feet(.55), .55) +
    `<g transform="translate(860,560)"><g data-t="c4+0.3" data-k="pop" data-bob="10"><text text-anchor="middle" font-size="110">🤑</text></g></g>` +
    stand('s2h', HARSH, 250, feet(.8), .8) + stand('s2m', MITESH, 520, feet(.8), .8),
  html: pillH(540, 352, 'c4', 'Sab sochte the… <span class="hl">ameer</span> hai 🤑', '', 'c5-0.05') + pillH(540, 352, 'c5', 'Secret <span class="hl">end mein</span> 🤫'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    life('s2j', t, { mouth: 'smile', brows: 'sure', look: [-.5, 0], R: [9, -14], L: [9, -14], seed: 4 });
    life('s2h', t, { mouth: talkMouth(t, t < T('c5') + 1), brows: 'up', look: [.9, 0], lean: 6, R: [110, -150], hR: 'open', seed: 1 });
    life('s2m', t, { mouth: t > T('c6') ? 'grin' : 'o', brows: 'up', look: [-.7, 0], lean: -4, tilt: -6, seed: 2 });
  }
});

// ================= S3 the montage: Nov maroon · Dec ivory · Jan bandhgala · Feb jodhpuri =================
const MON = [['NOV', JAY.maroon, '#F7D23A', 40, 400, 'c7'], ['DEC', JAY.ivory, '#8FD3E8', 560, 400, 'c8'], ['JAN', JAY.bandhgala, '#F4A0B8', 40, 860, 'c9'], ['FEB', JAY.jodhpuri, '#B8E08F', 560, 860, 'c10']];
addScene('c7', 'c11', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` +
    MON.map(([m, look, bg, x, y, at], i) => `<g data-t="${at}" data-k="pop">${comicPanel('s3p' + i, x, y, 480, 430, bg, bust('s3j' + i, look, x + 240, y + 470, .62))}` +
      `<g transform="translate(${x + 70},${y + 50})"><rect x="-50" y="-30" width="100" height="60" rx="10" fill="#fff" stroke="#1A1A1A" stroke-width="5"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="${C.red}">${m}</text></g>` +
      `<g transform="translate(${x + 410},${y + 60})"><g data-t="${at}+0.05" data-k="pop" data-out="${at}+0.5">${flashSVG(60)}</g></g></g>`).join(''),
  html: pillH(540, 352, 'c10+0.4', '4 shaadi · 4 <span class="hl">NAYE look</span> 😳'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) { MON.forEach((_, i) => life('s3j' + i, t, { pivot: 0, mouth: 'grin', brows: 'sure', look: [i % 2 ? -.3 : .3, 0], tilt: i % 2 ? -5 : 5, wink: i === 3 && t > T('c10') + .5, R: [9, -14], L: [9, -14], seed: i + 3 })); }
});

// ================= S4 the chai tapri: "teri salary kitni hai?" — "Guess karo." — the guesses =================
addScene('c11', 'c17', {
  svg: chaiTapriBG('s4') + stand('s4h', HARSH, 170, feet(.74), .74) + stand('s4m', MITESH, 400, feet(.74), .74) + stand('s4j', JAY.casual, 780, feet(.74), .74) +
    `<g id="s4cup">${chaiSVG ? chaiSVG() : ''}</g>`,
  html: bub(380, 640, 560, 'c11', 'c14-0.05', '"Bhai sach bata… teri <span class="hl">salary</span> kitni hai? Har shaadi naya!"') +
    bub(780, 650, 360, 'c14', 'c15-0.05', '"<span class="hl">Guess</span> karo." ☕') +
    bub(220, 600, 300, 'c15', '', '"<span class="hl">₹2 lakh?</span>"') + bub(470, 760, 300, 'c16', '', '"<span class="hl">₹3 lakh?!</span>"') + bub(300, 920, 420, 'c16+0.6', '', '"Loan liya hai kya? 😅"', 34) +
    pillH(540, 352, 'c13', 'Jay ne kitne kharche? <span class="hl">₹ ???</span>', '', 'c15-0.05') + pillH(540, 352, 'c15', 'Aapka <span class="hl">guess?</span> 👇'),
  cam: [1, 1.04], fy: 900,
  init() { $('s4cup').innerHTML = `<g transform="scale(.55)">${chaiSVG()}</g>`; },
  upd(t) {
    const q = t < T('c14');
    life('s4m', t, { mouth: q ? talkMouth(t, true) : 'o', brows: q ? 'up' : 'up', look: [.9, 0], R: q ? [100, -60] : [9, -14], hR: 'point', L: [9, -14], seed: 2 });
    life('s4h', t, { mouth: t > T('c15') ? talkMouth(t, true) : 'smile', brows: 'up', look: [.9, 0], R: t > T('c15') ? [120, -40] : [9, -14], hR: 'open', seed: 1 });
    const no = t > T('c15') + .2;
    const A = life('s4j', t, { mouth: t > T('c14') && t < T('c15') ? talkMouth(t, true) : 'smile', brows: 'sure', look: [-.8, 0], closed: t > T('c11') + .5 && t < T('c13'),
      tilt: no ? Math.sin(t * 9) * 8 : 2, R: [9, -14], L: [100, -120], hL: 'fist', seed: 4 });
    atHand('s4cup', 's4j', A.hl, 0, -20, 0);
  }
});

// ================= S5 twist 1: the phone — four rentals, ₹1,500 each, ₹6,000 total (Udaharan) =================
const rows = [...Array(4)].map((_, i) => `<g transform="translate(0,${-230 + i * 150})"><g data-t="c17+${(.2 + i * .2).toFixed(1)}" data-k="slideL"><rect x="-230" y="-58" width="460" height="116" rx="18" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
  `<g transform="translate(-170,0) scale(.42)">${kidOutfitSVG('sherwani', ['#7A1B2A', '#F2E7D0', '#24242B', '#2F4F9A'][i], ['#5E1420', '#D9C9A6', '#16161A', '#233C78'][i])}</g>` +
  `<text x="-100" y="-8" font-family="Inter" font-weight="900" font-size="30" fill="${C.text}">${['NOV', 'DEC', 'JAN', 'FEB'][i]} · Rent</text><text x="-100" y="34" font-family="Inter" font-weight="900" font-size="34" fill="${C.red}">₹1,500</text>` +
  `<circle cx="180" cy="0" r="30" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><path d="M166,0 L176,11 L194,-11" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g></g>`).join('');
addScene('c17', 'c20', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s5p', 40, 420, 1000, 880, '#8FD3E8', bust('s5j', JAY.casual, 300, 1360, 1.0)) +
    `<g id="s5ph"><g transform="scale(.62)">${phoneSVG('s5pp', 0, 0, 560, 1000, `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arMysteryHeader() + rows)}</g></g>` +
    burst(300, 610, 'c19', '₹6,000 TOTAL', '#F7D23A', 175, 44, -6) + burst(560, 1180, 'c19+0.6', 'WHAT?!', '#fff', 100, 46, -12),
  html: pillH(540, 352, 'c19', '4 sherwani = sirf <span class="hl">₹6,000</span> · RENT PAR!') + UDA(820, 470, 'c18'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    const A = life('s5j', t, { pivot: 0, mouth: t > T('c19') ? 'grin' : talkMouth(t, true), brows: 'sure', look: [.3, 0], tilt: 4, R: [120, -90], hR: 'fist', L: [9, -14], seed: 4 });
    atHand('s5ph', 's5j', A.hr, 150, -160, 4);
  }
});

// ================= S6 "Par kharcha toh kharcha hai na?" — "Kharcha? Ruk…" =================
addScene('c20', 'c23', {
  svg: chaiTapriBG('s6') + stand('s6m', MITESH, 300, feet(.8), .8) + stand('s6j', JAY.casual, 760, feet(.8), .8),
  html: bub(330, 620, 520, 'c20', 'c22-0.05', '"Theek hai… kam hai. Par <span class="hl">kharcha toh kharcha</span> hai na?"') +
    bub(760, 640, 380, 'c22', '', '"Kharcha? <span class="hl">Ruk…</span>" ☝️') + pillH(540, 352, 'c22+0.3', 'Asli <span class="hl">TWIST</span> abhi baaki hai 👀'),
  cam: [1, 1.05], fy: 900,
  upd(t) {
    const j = t > T('c22');
    life('s6m', t, { mouth: j ? 'flat' : talkMouth(t, true), brows: j ? 'up' : 'norm', look: [.9, 0], L: j ? [9, -14] : [70, -110], R: j ? [9, -14] : [70, -110], hL: 'open', hR: 'open', seed: 2 });
    life('s6j', t, { mouth: j ? 'grin' : 'smile', brows: 'sure', look: [-.8, 0], tilt: j ? -6 : 0, R: j ? [150, -20] : [9, -14], hR: 'point', L: [9, -14], seed: 4 });
  }
});

// ================= S7a flashback: his own ₹50,000 wedding sherwani, locked in the almari — then out, photographed, listed =================
addScene('c23', 'c26', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s7p', 40, 420, 1000, 880, '#E8C98A', '', 'rgba(90,60,20,.16)') +
    almirahSVG('s7a', 540, 1260, 1.25) + `<g id="s7sh"><g transform="scale(1.6)">${kidOutfitSVG('sherwani', '#F2E2C4', '#C9A24A')}</g></g>` +
    `<g id="s7tag">${priceTagSVG('s7t', '₹50,000', 0, 0, { fs: 34 })}</g>` + `<g id="s7lk"><g transform="scale(1.1)">${lockSVG()}</g></g>` +
    `<g transform="translate(540,860)"><g data-t="c26-0.4" data-k="pop">${flashSVG(110)}</g></g>` + flash('s7fl'),
  html: pillH(540, 352, 'c23', 'Jay ki <span class="hl">shaadi wali</span> sherwani 🤵', '', 'c25-0.05') + pillH(540, 352, 'c25', 'Almari mein <span class="hl">band nahi…</span> 🔓') + pillH(820, 470, 'c24', 'Flashback ⏪', 'gold'),
  noWm: true, cam: [1, 1.04], fy: 900,
  init() { $('s7a-inside').innerHTML = ''; },
  upd(t) {
    const k = P(t, T('c25'), .6, E.io);
    $('s7a-dL').setAttribute('transform', `translate(-150,0) scale(${(1 - k * .92).toFixed(3)},1) translate(150,0)`);
    $('s7a-dR').setAttribute('transform', `translate(150,0) scale(${(1 - k * .92).toFixed(3)},1) translate(-150,0)`);
    const out = P(t, T('c25') + .5, .7, E.io);
    tf($('s7sh'), 540, lerp(880, 820, out), lerp(.7, 1, out)); op($('s7sh'), k > .3 ? 1 : 0);
    tf($('s7tag'), 700, lerp(760, 700, out), 1, Math.sin(t * 2.4) * 8); op($('s7tag'), k > .3 ? 1 : 0);
    const lk = P(t, T('c25'), .3); tf($('s7lk'), 540, 880 + lk * 260, 1, lk * 50); op($('s7lk'), 1 - lk);
    const f = P(t, T('c26') - .4, .12); op($('s7fl'), f > 0 && f < 1 ? .7 * (1 - f) : 0);
  }
});

// ================= S7b it goes on rent: bookings fill up — KA-CHING! — the ledger: profit (Udaharan) =================
addScene('c26', 'c29', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s8p', 40, 420, 1000, 880, '#B8E08F', '') +
    `<g transform="translate(540,760) scale(.8)">${bookingCalendarSVG('s8c', 'RENT PE 🤵', 9)}</g>` +
    burst(220, 560, 'c26+0.5', 'KA-CHING!', '#F7D23A', 120, 42, -10, 'c28') + burst(860, 1000, 'c27+0.3', 'KA-CHING!', '#F7D23A', 120, 42, 8, 'c28') +
    `<g id="s8led"><rect x="-430" y="-150" width="860" height="300" rx="24" fill="#FFF8EC" stroke="#1A1A1A" stroke-width="8"/>` +
    `<text x="-390" y="-70" font-family="Inter" font-weight="800" font-size="40" fill="${C.text}">Kharcha (rent liya)</text><text x="390" y="-70" text-anchor="end" font-family="Inter" font-weight="900" font-size="44" fill="#D9363E">₹6,000</text>` +
    `<text x="-390" y="0" font-family="Inter" font-weight="800" font-size="40" fill="${C.text}">Kamaai (rent pe diya)</text><text x="390" y="0" text-anchor="end" font-family="Inter" font-weight="900" font-size="44" fill="#1F7A4D">₹9,000</text>` +
    `<path d="M-390,40 H390" stroke="#1A1A1A" stroke-width="5"/><text x="-390" y="110" font-family="Inter" font-weight="900" font-size="48" fill="${C.text}">PROFIT 😎</text><text x="390" y="110" text-anchor="end" font-family="Inter" font-weight="900" font-size="54" fill="#1F7A4D">₹3,000 ✅</text></g>`,
  html: pillH(540, 352, 'c26', '<span class="hl">Rent pe</span> chalti hai 💰', '', 'c28-0.05') + pillH(540, 352, 'c28', 'Kharcha ₹6,000 · Kamaai ₹9,000 · <span class="hl">PROFIT</span> 😎') + UDA(820, 470, 'c27'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    for (let i = 0; i < 9; i++) { const p = pop(t, T('c26') + .3 + i * .28); op($('s8c-t' + i), p.o); tf($('s8c-t' + i), 0, 0, p.s); }
    const k = P(t, T('c27'), .5); tf($('s8led'), 540, lerp(1700, 1120, k), 1); op($('s8led'), clamp(k * 2));
  }
});

// ================= S8 the punchline: "Shaadi attend karke bhi… profit mein hoon" — "GURU!" =================
addScene('c29', 'c32', {
  svg: weddingHallBG('s9') + `<circle cx="540" cy="860" r="340" fill="url(#glow)" opacity=".8"/>` + stand('s9h', HARSH, 190, feet(.74), .74) + stand('s9m', MITESH, 890, feet(.74), .74) +
    stand('s9j', JAY.maroon, 540, feet(.72), .72) + burst(820, 600, 'c30+0.4', 'DING!', '#fff', 100, 46, 10) + burst(280, 620, 'c31', 'GURU! 🙇‍♂️', '#F7D23A', 150, 52, -8),
  html: pillH(540, 352, 'c29', 'Shaadi attend karke bhi <span class="hl">PROFIT</span> 😎'),
  cam: [1, 1.05], fy: 900,
  upd(t) {
    life('s9j', t, { mouth: t < T('c31') ? talkMouth(t, true) : 'grin', brows: 'sure', look: [0, 0], wink: t > T('c30') + .3 && t < T('c30') + .9, tilt: 4, R: [40, -120], L: [40, -120], hR: 'fist', hL: 'fist', seed: 4 });
    const bow = P(t, T('c31') - .1, .4, E.out) * 28;
    life('s9h', t, { mouth: t > T('c31') ? talkMouth(t, true) : 'o', brows: 'up', look: [.9, .4], lean: bow, L: CLASP, R: CLASP, seed: 1 });
    life('s9m', t, { mouth: t > T('c31') ? talkMouth(t, true) : 'o', brows: 'up', look: [-.9, .4], lean: -bow, L: CLASP, R: CLASP, seed: 2 });
  }
});

// ================= S9 reveal + CTA: Anokhi Reet — rent a sherwani, or put yours on rent; Comment OUTFIT =================
const btn = (y, txt, at, fill) => `<g transform="translate(0,${y})"><g data-t="${at}" data-k="pop"><rect x="-220" y="-50" width="440" height="100" rx="50" fill="${fill}" stroke="${OL}" stroke-width="5"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="${fill === C.red ? C.cream : C.redDark}">${txt}</text></g></g>`;
addScene('c32', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s10r', 540, 800, .16, C.gold) + `<circle cx="540" cy="800" r="440" fill="url(#glow)" opacity=".5"/>` +
    `<g transform="translate(540,790) scale(.62)">${phoneSVG('s10p', 0, 0, 560, 1000, `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arHeader() +
      `<circle cx="0" cy="-150" r="170" fill="url(#glow)"/><g transform="translate(0,-130) scale(1.5)">${kidOutfitSVG('sherwani', '#7A1B2A', '#5E1420')}</g>` +
      btn(160, 'Sherwani rent karo 🤵', 'c33', C.red) + btn(310, 'Apni rent pe do 💰', 'c34', C.gold))}</g>`,
  html: `<img id="s10wm" style="position:absolute;left:310px;top:170px;width:460px" src="">` + pillH(540, 300, 'c32+0.3', 'anokhireet.in', 'gold') +
    pillH(540, 1150, 'c35', 'Apni sherwani <span class="hl">rent pe deni hai?</span>') + pillH(540, 1255, 'c37', 'Comment <span class="hl">OUTFIT</span> 👇', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 800, capY: 1400,
  init() { $('s10wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s10r'), 540, 800, 1, t * 5); }
});
