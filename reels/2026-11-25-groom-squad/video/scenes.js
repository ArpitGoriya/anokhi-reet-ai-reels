// ===== Dulhe ke 7 dost, 7 alag sherwani (comic-book; Mama ji and Fua ji do the maths) =====
// Open loops: "asli kahani end mein" (seven sherwanis on rent) and "asli twist abhi baaki" (the groom's own sherwani earns).
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const UDA = (x = 540, y = 450, at = '-1', out = '') => pillH(x, y, at, 'Udaharan 📝', 'gold', out);
const feet = sc => FLOOR + 40 - 372 * sc;
const burst = (x, y, at, txt, fill, r = 120, fs = 50, rot = -8, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>${burstSVG(txt, fill, r, fs)}</g></g>`;
const bub = (x, y, w, at, out, html, fs = 36) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const xMark = (x, y, at, r = 40) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="pop">${crossSVG(r)}</g></g>`;
const SQ = GROOM_SQUAD;
const SQX = [90, 240, 390, 540, 690, 840, 990];

// ================= S1 hook: seven friends, seven sherwanis — FASHION SHOW?! =================
addScene(0, 'c3', {
  svg: weddingHallBG('s1') + SQ.map((f, i) => `<g id="s1w${i}">${stand('s1f' + i, f.look, 0, 0, .5)}</g>`).join('') + burst(540, 610, 'c2', 'FASHION SHOW?!', '#F7D23A', 150, 46, -6),
  html: `<div class="title" style="top:410px;font-size:70px" data-t="-1">7 DOST · 7 ALAG<br><span class="g">SHERWANI</span> 🤵🤵🤵</div>`,
  cam: [1, 1.05], fy: 900,
  upd(t) {
    SQ.forEach((f, i) => {
      const x = SQX[i] + Math.sin(t * .8) * 6, y = feet(.5) + (i % 2 ? 20 : 0) - Math.abs(Math.sin(t * 3 + i)) * 10;
      tf($('s1w' + i), x, y, 1); PL['s1f' + i].x = x; PL['s1f' + i].y = y;
      life('s1f' + i, t, { mouth: 'grin', brows: 'sure', look: [0, 0], tilt: (i % 2 ? 4 : -4), R: i === 3 ? [9, -14] : [20, -20], L: [20, -20], seed: i + 1 });
    });
  }
});

// ================= S2 the groom on the ghodi: "lakhon uda diye?" — the real story is at the end =================
addScene('c3', 'c6', {
  svg: weddingHallBG('s2') + `<g transform="translate(540,1220) scale(1.7)">${ghodiSVG(AARAV)}</g>` +
    `<g transform="translate(860,560)"><g data-t="c4" data-k="pop" data-bob="8"><text text-anchor="middle" font-size="96">💸</text></g></g>`,
  html: pillH(540, 352, 'c3', 'Sabne socha… <span class="hl">lakhon uda diye</span> 💸', '', 'c5-0.05') + pillH(540, 352, 'c5', 'Asli kahani <span class="hl">end mein</span> 👀'),
  cam: [1, 1.05], fy: 800,
  upd(t) { life('ghodi-groom', t, { pivot: 0, mouth: 'grin', brows: 'sure', look: [0, 0], tilt: 4, wink: t > T('c5') + .4 && t < T('c5') + .9, R: t > T('c5') ? WAVE(t, T('c5')) : [9, -14], hR: 'open', seed: 3 }); }
});

// ================= S3 the uncles: 7 × ₹40,000 = ₹2,80,000?! (Udaharan) =================
addScene('c6', 'c10', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s3p', 40, 420, 1000, 880, '#F7D23A', bust('s3m', MAMAJI, 300, 1400, 1.0) + bust('s3f', FUAJI, 780, 1400, 1.0)) +
    `<g id="s3calc"><g transform="scale(.42)">${calculatorSVG('s3c', '0')}</g></g>` + burst(800, 560, 'c8+0.2', 'GASP! 😱', '#fff', 100, 40, 10),
  html: bub(330, 560, 480, 'c6', 'c8-0.05', '"Ek sherwani <span class="hl">₹40,000</span> ki… saat dost…"', 34) +
    bub(720, 600, 520, 'c8', '', '"<span class="hl">₹2 lakh 80 hazaar!</span> Ladka pagal ho gaya hai!"', 34) +
    pillH(540, 352, 'c8', '7 × ₹40,000 = <span class="hl">₹2,80,000?!</span> 😱') + UDA(540, 1250, 'c8+0.3'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    const k = P(t, T('c6') + .6, 1.4, E.lin); $('s3c-scr').textContent = (Math.round(280000 * k / 40000) * 40000).toLocaleString('en-IN');
    life('s3m', t, { pivot: 0, mouth: t < T('c8') ? talkMouth(t, true) : 'o', brows: 'up', look: [.3, -.4], R: [130, -50], hR: Math.floor(t * 2) % 2 ? 'point' : 'two', L: [9, -14], seed: 1 });
    const A = life('s3f', t, { pivot: 0, mouth: t > T('c8') ? talkMouth(t, true) : 'flat', brows: t > T('c8') ? 'up' : 'norm', look: [-.3, .5], sweat: t > T('c8') ? .9 : 0, R: [100, -95], hR: 'fist', L: [9, -14], y: hop(t, T('c8') + .2, 20), seed: 2 });
    atHand('s3calc', 's3f', A.hr, 0, -90, 0);
  }
});

// ================= S4 the taunt: "Shaadi ke baad ghar kaise chalega?" — "Mama ji, guess karo…" =================
addScene('c10', 'c14', {
  svg: weddingHallBG('s4') + stand('s4m', MAMAJI, 300, feet(.72), .72) + stand('s4a', AARAV, 780, feet(.72), .72) +
    `<g transform="translate(780,${feet(.72) - 240})"><path d="M-120,0 Q0,90 120,0" fill="none" stroke="${C.marigold}" stroke-width="22" stroke-dasharray="2 16" stroke-linecap="round"/></g>`,
  html: bub(320, 520, 520, 'c10', 'c12-0.05', '"Beta, dosto pe <span class="hl">itna paisa?</span> Shaadi ke baad ghar kaise chalega?"', 32) +
    bub(760, 520, 480, 'c12', '', '"Mama ji, <span class="hl">guess karo</span> kitna kharcha hua?" 😄', 32) + pillH(540, 352, 'c12', 'Asli kharcha? <span class="hl">₹ ???</span>'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const m = t < T('c12');
    life('s4m', t, { mouth: m ? talkMouth(t, true) : 'flat', brows: m ? 'angry' : 'up', look: [.9, 0], R: m ? [90, -30] : [9, -14], hR: 'point', L: [9, -14], seed: 1 });
    life('s4a', t, { mouth: m ? 'smile' : talkMouth(t, true), brows: 'sure', look: [-.9, 0], tilt: m ? 0 : 6, R: [9, -14], L: m ? [9, -14] : [100, -60], hL: 'open', seed: 3 });
  }
});

// ================= S5 the guesses: ₹2 lakh? ₹3 lakh?! Loan liya hai kya? =================
addScene('c14', 'c16', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s5p', 40, 420, 1000, 880, '#8FD3E8', bust('s5a', AARAV, 780, 1400, 1.0)) +
    xMark(450, 560, 'c14+0.7') + xMark(450, 760, 'c15+0.6') + xMark(470, 960, 'c15+1.3'),
  html: bub(250, 560, 320, 'c14', '', '"<span class="hl">₹2 lakh?</span>"', 36) + bub(250, 760, 320, 'c15', '', '"<span class="hl">₹3 lakh?!</span>"', 36) + bub(260, 960, 400, 'c15+0.7', '', '"Loan liya hai kya? 😅"', 34) +
    pillH(540, 352, 'c14', 'Aapka <span class="hl">guess?</span> 👇'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) { life('s5a', t, { pivot: 0, mouth: 'grin', brows: 'sure', look: [-.6, 0], tilt: Math.sin(t * 8) * 9, R: [9, -14], L: [9, -14], seed: 3 }); }
});

// ================= S6 twist 1: Kunal's phone — seven rentals, ₹1,500 each, ₹10,500 (Udaharan) =================
const rows = SQ.map((f, i) => `<g transform="translate(0,${-340 + i * 112})"><g data-t="c16+${(.15 + i * .14).toFixed(2)}" data-k="slideL"><rect x="-230" y="-48" width="460" height="96" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
  `<g transform="translate(-180,0) scale(.32)">${kidOutfitSVG('sherwani', f.look.top, '#1A1A1A')}</g><text x="-120" y="-6" font-family="Inter" font-weight="900" font-size="26" fill="${C.text}">${f.name} · Rent</text>` +
  `<text x="-120" y="28" font-family="Inter" font-weight="900" font-size="28" fill="${C.red}">₹1,500</text><circle cx="185" cy="0" r="26" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><path d="M173,0 L182,10 L198,-10" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g></g>`).join('');
addScene('c16', 'c20', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s6p', 40, 420, 1000, 880, '#B8E08F', bust('s6k', SQ[0].look, 280, 1400, 1.0)) +
    `<g id="s6ph"><g transform="scale(.62)">${phoneSVG('s6pp', 0, 0, 560, 1000, `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arMysteryHeader() + rows)}</g></g>` +
    burst(310, 600, 'c18', '₹10,500 TOTAL', '#F7D23A', 200, 38, -6) +
    `<g transform="translate(270,1180) rotate(-6)"><g data-t="c19" data-k="pop"><rect x="-210" y="-50" width="420" height="100" rx="16" fill="#fff" stroke="${OL}" stroke-width="5"/><text y="-8" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${C.text}">Ek khareedi sherwani</text><text y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="#D9363E">₹40,000</text><path d="M-190,0 L190,0" stroke="#D9363E" stroke-width="8"/></g></g>` +
    burst(820, 1220, 'c19+0.6', 'WHAT?!', '#fff', 90, 40, 10),
  html: pillH(540, 352, 'c18', '7 sherwani = <span class="hl">₹10,500</span> 😎') + UDA(870, 470, 'c17'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    const A = life('s6k', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'sure', look: [.4, 0], tilt: 4, R: [120, -90], hR: 'fist', L: [9, -14], seed: 1 });
    atHand('s6ph', 's6k', A.hr, 240, -200, 4);
  }
});

// ================= S7 "Par dulhe ki apni sherwani toh mehengi hogi!" — "Woh bhi dekhiye…" =================
addScene('c20', 'c24', {
  svg: weddingHallBG('s7') + stand('s7f', FUAJI, 300, feet(.72), .72) + stand('s7a', AARAV, 780, feet(.72), .72) + `<g id="s7ph">${phoneBackSVG(.8)}</g>`,
  html: bub(320, 520, 520, 'c20', 'c23-0.05', '"Theek hai dosto ka sasta… par dulhe ki <span class="hl">apni sherwani</span> toh mehengi hogi!"', 32) +
    bub(760, 540, 380, 'c23', '', '"Woh bhi <span class="hl">dekhiye…</span>" 😏', 34) + pillH(540, 352, 'c23+0.3', 'Asli <span class="hl">TWIST</span> abhi baaki hai 👀'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const f = t < T('c23');
    life('s7f', t, { mouth: f ? talkMouth(t, true) : 'flat', brows: 'angry', look: [.9, 0], L: [20, -120], R: [20, -120], seed: 2 });
    const A = life('s7a', t, { mouth: f ? 'smile' : 'grin', brows: 'sure', look: [-.9, 0], tilt: f ? 0 : 6, R: f ? [9, -14] : [110, -70], hR: 'fist', L: [9, -14], seed: 3 });
    atHand('s7ph', 's7a', A.hr, 0, -100, 6); op($('s7ph'), f ? 0 : 1);
  }
});

// ================= S8 twist 2: a new booking before the wedding even ends — the ledger (Udaharan) =================
addScene('c24', 'c28', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s8p', 40, 420, 1000, 880, '#F4A0B8', bust('s8a', AARAV, 820, 1420, .95)) +
    `<g transform="translate(470,600)"><g data-t="c24+0.2" data-k="drop">${notifSVG('Anokhi Reet', 'New booking ✓ Cream-gold sherwani · 2 Dec', 820)}</g></g>` +
    `<g id="s8led">${ledgerCardSVG([['Aarav ki sherwani', '₹55,000', C.text], ['Agli 3 bookings', '₹3,000 × 3 = ₹9,000', '#1F7A4D']], null, 900)}</g>` +
    burst(860, 760, 'c26+0.3', 'KA-CHING!', '#F7D23A', 110, 40, 10),
  html: pillH(540, 352, 'c25', 'Agli <span class="hl">BOOKING</span> aa gayi 😂') + UDA(540, 1250, 'c26+0.5'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    const k = P(t, T('c26'), .5); tf($('s8led'), 520, lerp(1700, 790, k), 1); op($('s8led'), clamp(k * 2));
    life('s8a', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'sure', look: [-.5, -.3], tilt: 5, R: [9, -14], L: [9, -14], seed: 3 });
  }
});

// ================= S9 the punchline: "Meri 2010 wali sherwani bhi daal de na?" — everyone laughs =================
addScene('c28', 'c30', {
  svg: weddingHallBG('s9') + SQ.slice(0, 3).map((f, i) => stand('s9q' + i, f.look, [90, 200, 990][i], feet(.5), .5)).join('') +
    stand('s9m', MAMAJI, 360, feet(.7), .7) + stand('s9f', FUAJI, 600, feet(.7), .7) + stand('s9a', AARAV, 830, feet(.66), .66) +
    `<g id="s9p1">${phoneBackSVG(.7)}</g><g id="s9p2">${phoneBackSVG(.7)}</g>` + burst(860, 560, 'c29+0.3', 'DING! 😂', '#fff', 100, 40, 10),
  html: bub(420, 520, 560, 'c28', '', '"Beta… meri <span class="hl">2010 wali sherwani</span> bhi daal de na?" 😅', 34) + pillH(540, 352, 'c28', 'Ab Mama ji bhi <span class="hl">list</span> karenge 😂'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const A = life('s9m', t, { mouth: talkMouth(t, true), brows: 'up', look: [.9, 0], tilt: 6, R: [70, -70], hR: 'fist', L: [9, -14], seed: 1 }); atHand('s9p1', 's9m', A.hr, 0, -40, 6);
    const B = life('s9f', t, { mouth: 'grin', brows: 'up', look: [.6, .3], R: [70, -70], hR: 'fist', L: [9, -14], seed: 2 }); atHand('s9p2', 's9f', B.hr, 0, -40, 6);
    const laugh = t > T('c29');
    life('s9a', t, { mouth: laugh ? 'big' : 'grin', brows: 'up', closed: laugh, look: [-.7, 0], tilt: laugh ? Math.sin(t * 10) * 5 : 0, R: [9, -14], L: [9, -14], seed: 3 });
    for (let i = 0; i < 3; i++) life('s9q' + i, t, { mouth: laugh ? 'big' : 'grin', brows: 'up', closed: laugh, look: [i < 2 ? .8 : -.8, 0], y: laugh ? hop(t, T('c29') + i * .1, 14) : 0, seed: i + 4 });
  }
});

// ================= S10 reveal + CTA: Anokhi Reet — rent for the whole squad, or put yours on rent; Comment SQUAD =================
const btn = (y, txt, at, fill) => `<g transform="translate(0,${y})"><g data-t="${at}" data-k="pop"><rect x="-220" y="-50" width="440" height="100" rx="50" fill="${fill}" stroke="${OL}" stroke-width="5"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="${fill === C.red ? C.cream : C.redDark}">${txt}</text></g></g>`;
addScene('c30', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s10r', 540, 760, .16, C.gold) + `<circle cx="540" cy="760" r="420" fill="url(#glow)" opacity=".5"/>` +
    `<g transform="translate(540,720) scale(.4)">${phoneSVG('s10p', 0, 0, 560, 1000, `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arHeader() +
      `<circle cx="0" cy="-170" r="170" fill="url(#glow)"/><g transform="translate(0,-150) scale(1.4)">${kidOutfitSVG('sherwani', '#F2E2C4', '#C9A24A')}</g>` +
      btn(160, 'Sherwani rent karo 🤵', 'c31', C.red) + btn(310, 'Apni rent pe do 💰', 'c33', C.gold))}</g>` +
    `<rect x="0" y="1700" width="${W}" height="${H - 1700}" fill="#5D0000"/>` + SQ.map((f, i) => stand('s10q' + i, f.look, 80 + i * 150, 1740 - 372 * .42, .42)).join(''),
  html: `<img id="s10wm" style="position:absolute;left:310px;top:250px;width:460px" src="">` + pillH(540, 380, 'c30+0.3', 'anokhireet.in', 'gold') +
    pillH(540, 1060, 'c34', 'Sherwani <span class="hl">rent pe chahiye?</span>') + pillH(540, 1160, 'c36', 'Comment <span class="hl">RENT</span> 👇', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 760, capY: 1260,
  init() { $('s10wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s10r'), 540, 760, 1, t * 5); SQ.forEach((_, i) => life('s10q' + i, t, { mouth: 'grin', brows: 'up', look: [0, 0], R: t > T('c36') && i % 2 ? WAVE(t, T('c36')) : [9, -14], hR: 'open', y: hop(t, T('c30') + i * .08, 12), seed: i + 1 })); }
});
