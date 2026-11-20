// ===== Nisha Part 2: ek season ka hisaab (same look as Part 1, reels/2026-11-18-nisha-almari) =====
// Characters: NISHA, her husband (PATI in a purple kurta, as Part 1). Story numbers are Nisha's ("Udaharan").
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const HUSB = dress(PATI, { top: '#7A4FA0', topD: '#5D3A7E' });
const COV = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E']];
const openDoors = (id, k) => { tf($(`${id}-dL`), 0, 0, lerp(1, .13, k), 0, -150, 0, 1); tf($(`${id}-dR`), 0, 0, lerp(1, .13, k), 0, 150, 0, 1); };
const HOME = { noWindow: true, noShelf: true, noClock: true };
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const P2 = (out = '') => pillH(540, 352, '-1', 'Part <span class="hl">2</span> 👀', 'big', out);

// ================= S1: Part 2 — "Yaad hai Nisha?" at her almirah, coin jar beside her =================
addScene(0, 'c3', {
  svg: homeBG('n1', HOME) + `<circle cx="600" cy="860" r="460" fill="url(#glow)"/>` + almirahSVG('a1', 760, FLOOR + 62, 1.0) +
    at(250, 990, coinJarSVG('n1-j', 8, ''), .8) + stand('ni1', NISHA, 500, 960, .78),
  html: P2() + `<div class="pill" style="left:190px;top:440px;font-size:30px;padding:8px 22px">Ek kahani</div>` +
    pillH(540, 560, 'c2+0.1', '₹2.5 lakh… kamaai <span class="hl">₹0?</span>'),
  init() { $('a1-inside').innerHTML = almirahFill(12); for (let i = 0; i < 8; i++) op($(`n1-j-k${i}`), i < 2 ? 1 : 0); },
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const w = clamp((t - .3) / .35);
    life('ni1', t, { mouth: 'grin', brows: 'up', tilt: 4, look: [0, 0], R: [lerp(9, WAVE(t, .3)[0], E.io(w)), lerp(-14, WAVE(t, .3)[1], E.io(w))], hR: w > .5 ? 'open' : 'fist', L: [9, -14] });
  }
});

// ================= S2: flashback (sepia) — the husband: "Bech de." =================
addScene('c3', 'c5', {
  svg: homeBG('n2', HOME) + almirahSVG('a2', 270, FLOOR + 62, .95) + bust('hu2', HUSB, 620, FLOOR + 20, 1.0) + bust('ni2', NISHA, 910, FLOOR + 50, .78) + counterSVG(FLOOR + 40) +
    `<rect width="${W}" height="${H}" fill="#C9A77A" opacity=".35"/><rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="#8C6A44" stroke-width="14" opacity=".5"/>`,
  html: P2() + `<div class="bubble" style="left:600px;top:560px;width:380px" data-t="c4-0.05">"<span class="hl">Bech de.</span>"</div>`,
  init() { $('a2-inside').innerHTML = almirahFill(12); tf($('a2-dL'), 0, 0, .13, 0, -150, 0, 1); tf($('a2-dR'), 0, 0, .13, 0, 150, 0, 1); },
  cam: [1, 1.03], fy: 860,
  upd(t) {
    life('hu2', t, { pivot: 0, seed: 7, look: [-0.8, 0], mouth: t > T('c4') ? 'talk' : 'flat', brows: 'sure', tilt: -3, L: t > T('c3') + .4 ? [72, 2] : [9, -14], hL: 'point' });
    life('ni2', t, { pivot: 0, look: [-0.8, -0.2], mouth: 'o', brows: 'worry', tilt: 4 });
  }
});

// ================= S3: one season later — calendar pages flip, wedding dates circled =================
const MONTHS = [['NOV', [9, 14, 22, 27]], ['DEC', [4, 8, 12, 19, 25]], ['JAN', [17, 23, 28]], ['FEB', [6, 11, 20]]];
addScene('c5', 'c7', {
  svg: homeBG('n3', HOME) + quiet(.3) + `<circle cx="540" cy="840" r="440" fill="url(#glow)"/>` +
    MONTHS.map(([m, d], i) => `<g id="n3m${i}">${monthPageSVG(m, d)}</g>`).reverse().join(''),
  html: pillH(540, 352, 'c5', 'Ek <span class="hl">season</span> baad 📅', 'big'),
  cam: [1, 1.03], fy: 840,
  upd(t) {
    MONTHS.forEach((_, i) => {
      const t0 = T('c5') + .35 + i * .5, k = i === MONTHS.length - 1 ? 0 : clamp((t - t0) / .3);
      tf($('n3m' + i), 540, 840 - k * 260, 1, k * -12, 0, 0, 1 - k); op($('n3m' + i), 1 - k);
    });
  }
});

// ================= S4: 12 lehengas on a rail — 7 light up, "Booked ✓" =================
const BOOKED = [0, 2, 3, 5, 7, 8, 10];
addScene('c7', 'c8', {
  svg: `<rect width="${W}" height="${H}" fill="#4E3A1E"/><rect x="40" y="430" width="${W - 80}" height="${FLOOR - 280}" rx="16" fill="#5A4426" stroke="${OL}" stroke-width="${OW}"/>` +
    [0, 1].map(r => `<path d="M60,${480 + r * 400} H${W - 60}" stroke="${C.goldTan}" stroke-width="12"/>`).join('') +
    [...Array(12)].map((_, i) => { const x = 130 + (i % 6) * 164, y = 510 + (i / 6 | 0) * 400, b = BOOKED.indexOf(i);
      return (b >= 0 ? `<circle id="n4g${i}" cx="${x}" cy="${y + 90}" r="120" fill="url(#glow)" opacity="0"/>` : '') +
        `<g transform="translate(${x},${y})">${coveredLehengaSVG(...COV[i % 6], .46)}</g>` +
        (b >= 0 ? `<g transform="translate(${x},${y + 170})"><g data-t="c7+${(.3 + b * .22).toFixed(2)}">${bookedTagSVG()}</g></g>` : ''); }).join(''),
  html: pillH(540, 352, 'c7', '12 mein se <span class="hl">7</span> lehenge book hue ✅'),
  cam: [1.04, 1], fy: 760,
  upd(t) { BOOKED.forEach((i, b) => op($('n4g' + i), P(t, T('c7') + .3 + b * .22, .25))); }
});

// ================= S5: the ledger — 14 bookings × ₹2,200 = ₹30,800 (Udaharan) =================
addScene('c8', 'c10', {
  svg: homeBG('n5', Object.assign({ night: true, noPlant: true }, HOME)) + at(540, 860, ledgerSVG(), 2.0, -3) +
    `<g transform="translate(540,860) rotate(-3)"><g data-t="c8+0.2" data-k="fade"><text x="-430" y="-10" font-family="Inter" font-weight="800" font-size="40" fill="#3B2418">14 bookings</text>` +
    `<text x="-430" y="50" font-family="Inter" font-weight="800" font-size="40" fill="#3B2418">× ₹2,200 avg</text><text x="-430" y="104" font-family="Inter" font-weight="700" font-size="28" fill="#7A5C2E">(₹2,000–2,500 / rental)</text></g>` +
    `<g data-t="c9+0.3" data-k="pop"><rect x="30" y="-20" width="380" height="110" rx="20" fill="${C.gold}" opacity=".85"/><text x="220" y="58" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="${C.red}">₹30,800</text></g></g>`,
  html: pillH(540, 352, 'c8', '<span class="hl">Udaharan</span> 📝', 'big'),
  cam: [1, 1.05], fy: 860
});

// ================= S6: the twist — "Bikega: ₹30,000" struck out, "Rent: ₹30,800 ✓" =================
addScene('c10', 'c12', {
  svg: homeBG('n6', Object.assign({ night: true, noPlant: true }, HOME)) + at(540, 860, ledgerSVG(), 2.0, -3) +
    `<g transform="translate(540,860) rotate(-3)"><text x="-430" y="-10" font-family="Inter" font-weight="800" font-size="40" fill="#3B2418">Maal: ₹2,50,000</text><text x="-430" y="40" font-family="Inter" font-weight="700" font-size="30" fill="#7A5C2E">12 lehenge bechke…</text><text x="-430" y="100" font-family="Inter" font-weight="900" font-size="44" fill="#3B2418">Bikega: ₹30,000</text>` +
    `<path id="n6-x" d="M-440,86 L-80,62" stroke="#D9363E" stroke-width="12" stroke-linecap="round"/>` +
    `<g data-t="c11+0.2" data-k="pop"><text x="40" y="0" font-family="Inter" font-weight="800" font-size="46" fill="#1F7A4D">Rent:</text><text x="40" y="70" font-family="Inter" font-weight="900" font-size="60" fill="#1F7A4D">₹30,800 ✓</text><text x="40" y="118" font-family="Inter" font-weight="700" font-size="30" fill="#1F7A4D">sirf 1 season</text></g></g>`,
  html: pillH(540, 352, 'c10', '<span class="hl">Twist</span> 🤯', 'big') + pillH(540, 440, 'c10+0.2', 'Udaharan 📝', 'gold'),
  cam: [1, 1.05], fy: 860,
  upd(t) { const k = P(t, T('c10') + 1.2, .35, E.io); const x = $('n6-x'); x.setAttribute('stroke-dasharray', '380'); x.setAttribute('stroke-dashoffset', (380 * (1 - k)).toFixed(0)); }
});

// ================= S7: the almirah opens — all 12 still inside =================
addScene('c12', 'c13', {
  svg: homeBG('n7', HOME) + `<circle cx="540" cy="860" r="460" fill="url(#glow)"/>` + almirahSVG('a7', 540, FLOOR + 62, 1.25) +
    [[300, 600], [790, 700], [330, 950]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c12+${(.8 + i * .2).toFixed(1)}" data-bob="6" data-ph="${i}">${sparkleSVG(28, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c12', 'Lehenge abhi bhi <span class="hl">apne</span> 💛', 'big') + pillH(540, 1180, 'c12+0.9', '12 / 12 ✅', 'gold'),
  init() { $('a7-inside').innerHTML = almirahFill(12); },
  cam: [1, 1.05], fy: 900,
  upd(t) { openDoors('a7', E.io(clamp((t - T('c12') - .3) / .6))); }
});

// ================= S8: the husband walks in, sees the full jar — "Ye… sab rent se?" / "Haan." =================
addScene('c13', 'c15', {
  svg: homeBG('n8', HOME) + at(540, 960, coinJarSVG('n8-j', 16, ''), .85) + `<g id="n8hm">${bust('hu8', HUSB, 0, FLOOR + 30, .9)}</g>` + bust('ni8', NISHA, 860, FLOOR + 50, .85) + counterSVG(FLOOR + 50),
  html: `<div class="bubble" style="left:280px;top:600px;width:380px" data-t="c13+0.5" data-out="c14-0.1">"Ye… <span class="hl">sab rent se?</span>" 😳</div>` +
    `<div class="bubble" style="left:720px;top:600px;width:420px" data-t="c14">"Haan. Tumne toh bola tha <span class="hl">bech de.</span>" 😏</div>`,
  init() { for (let i = 0; i < 16; i++) op($(`n8-j-k${i}`), 1); },
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const g = glide(t, T('c13') - .1, .7, -220, 220); tf($('n8hm'), g[0], g[1], 1); PL['hu8'].x = g[0];
    const froze = t > T('c13') + .6;
    life('hu8', t, { pivot: 0, seed: 7, look: froze ? [.6, .5] : [.8, 0], mouth: froze ? 'o' : 'flat', brows: froze ? 'up' : 'norm', tilt: froze ? -4 : 0, L: [9, -14], R: [9, -14], sway: froze ? 0 : undefined });
    life('ni8', t, { pivot: 0, look: [-0.8, 0], mouth: t > T('c14') ? talkMouth(t, true) : 'grin', brows: 'sure', tilt: 5, L: ARMS_X, R: ARMS_X });
  }
});

// ================= S9: he comes back with his sherwani — "meri sherwani bhi rent pe daal de na" =================
addScene('c15', 'c18', {
  svg: homeBG('n9', HOME) + at(620, 960, coinJarSVG('n9-j', 16, ''), .75) + `<g id="n9hm">${bust('hu9', HUSB, 0, FLOOR + 30, .9)}</g>` +
    `<g id="n9sh">${sherwaniHangerSVG('n9s', '#E8D3A5', '#C9AE6A', .8)}</g>` + bust('ni9', NISHA, 860, FLOOR + 50, .85) + counterSVG(FLOOR + 50),
  html: pillH(540, 352, 'c15', 'Ab pati bhi <span class="hl">rent</span> pe dega 😂', 'big') +
    `<div class="bubble" style="left:330px;top:580px;width:460px" data-t="c16">"Achha sun… meri <span class="hl">sherwani</span> bhi rent pe daal de na." 😅</div>`,
  init() { for (let i = 0; i < 16; i++) op($(`n9-j-k${i}`), 1); },
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const off = glide(t, T('c15') + .1, .6, 220, -260), back = glide(t, T('c16') - .7, .7, -260, 250);
    const x = t < T('c16') - .7 ? off[0] : back[0], y = t < T('c16') - .7 ? off[1] : back[1];
    tf($('n9hm'), x, y, 1); PL['hu9'].x = x;
    const has = t > T('c16') - .7;
    const A = life('hu9', t, { pivot: 0, seed: 7, look: has ? [.7, 0] : [-.8, 0], mouth: has ? 'smile' : 'flat', brows: has ? 'worry' : 'norm', tilt: has ? 6 : 0, R: has ? [165, -110] : [9, -14], hR: 'fist', L: [9, -14], blush: has ? .6 : 0 });
    if (has) { const p = toScene('hu9', A.hr); tf($('n9sh'), p[0] + 10, p[1] + 30, 1, 4); op($('n9sh'), 1); } else op($('n9sh'), 0);
    life('ni9', t, { pivot: 0, look: [-0.8, 0], mouth: has ? 'big' : 'grin', brows: 'up', tilt: 5, L: ARMS_X, R: ARMS_X, y: hop(t, T('c17') + .3, 12) });
  }
});

// ================= S10: Bechna = ek baar · Rent = har season mauka =================
addScene('c18', 'c20', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('n10-r', 540, 880, .12, C.goldTan) + `<rect x="0" y="${FLOOR + 80}" width="${W}" height="${H}" fill="#F3E3C0"/>` + stand('ni10', NISHA, 540, 1000, .82),
  html: pillH(540, 352, 'c18', 'Bechna = <span class="hl">ek baar</span>', 'big') + pillH(540, 450, 'c19', 'Rent = <span class="hl">har season mauka</span> 💰', 'big'),
  tin: .35, trans: 'fade', cam: [1, 1.04],
  upd(t) {
    tf($('n10-r'), 540, 880, 1, t * 5);
    const two = t > T('c19');
    life('ni10', t, { mouth: 'grin', brows: 'sure', tilt: 3, sway: 2, L: two ? [100, -60] : [9, -14], hL: 'open', R: two ? [9, -14] : [100, -60], hR: 'open' });
  }
});

// ================= S11: Comment RENT + Anokhi Reet · Following ✓ =================
addScene('c20', 9999, {
  svg: homeBG('n11', HOME) + rosettes('n11-r', 540, 780, .08, C.goldTan) + bust('ni11', NISHA, 540, FLOOR + 90, 1.1) + counterSVG(),
  html: `<div class="follow" style="left:540px;top:380px" data-t="c20+0.2"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="n11-b"><span id="n11-f">Follow</span></span></div>` +
    `<div class="pill big" style="left:540px;top:520px" data-t="c21">Comment <span class="hl">RENT</span> 👇</div>` +
    `<div class="title" style="top:650px;font-size:62px" data-t="c21+0.6">Rent. <span class="g">Earn.</span> Repeat.</div>`,
  noWm: true,
  upd(t) {
    tf($('n11-r'), 540, 780, 1, t * 5);
    const pt = t > T('c21');
    life('ni11', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, L: pt ? [40, -10] : [9, -14], hL: 'point', R: [9, -14], y: hop(t, T('c21'), 10) });
    const tp = T('c20') + 1.0, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('n11-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('n11-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
