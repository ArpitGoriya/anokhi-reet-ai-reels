// ===== Dukaan ka SECRET (Jigneshbhai): 22 scenes + corner tags; brand hidden until the reveal (c53) =====
// Teammate (PDF): "Rental Shop · Ek kahani" tag top-left; a SECRET lock badge top-right that cracks open into "Anokhi Reet";
// sepia flashback until "1 mahine baad"; chalkboard ending. Male narrator: nobody lip-syncs.
// New: JIGNESH, COLLEGE_GIRL, SHOWROOM_SETH (cast); SEPIA_DEF, tearBoardSVG, showroomBG, gujaratMapSVG, chalkboardSVG (props).
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const sepia = inner => SEPIA_DEF + `<g filter="url(#sepia)">${inner}</g>`;
const CUST = dress(CUSTOMER_W, { top: '#F4B183', topD: '#E0915F', skirt: { c: '#F4B183', d: '#E0915F', b: C.gold, w: 200 } }); // the "peach wali" girl
const CUST2 = dress(GUEST_W1, { skirt: { c: '#7A4FA0', d: '#5D3A7E', b: C.gold, w: 205 } });
const PILE = [C.lehenga, C.pink, C.emerald, C.marigold, C.teal, '#7A4FA0', '#C0262D', C.marigold2, '#F4B183', C.pink];
const pileSVG = (p, n = 10) => [...Array(n)].map((_, i) => `<g id="${p}${i}" transform="translate(${(i % 2) * 16},${-i * 30})"><rect x="-150" y="-18" width="300" height="36" rx="12" fill="${PILE[i % PILE.length]}" stroke="${OL}" stroke-width="4"/><path d="M-130,4 H130" stroke="${C.gold}" stroke-width="5"/></g>`).join('');
const phoneGlow = `<circle r="120" fill="url(#glow)"/>` + phoneBackSVG(.7);
const SHOT = `<rect x="-40" y="-70" width="80" height="140" rx="14" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-32" y="-60" width="64" height="120" rx="8" fill="#FFF2DF"/><g transform="translate(0,4) scale(.16)">${lehengaHangerSVG('', { c: '#F4B183', d: '#E0915F' })}</g>`;

// ================= corner tags: "Rental Shop · Ek kahani" (left) + the SECRET lock badge (right) for the whole reel =================
addScene(0, 9999, {
  html: `<div id="tagL" style="position:absolute;left:34px;top:200px;background:#fff;border:3px solid rgba(59,36,24,.35);border-radius:999px;padding:6px 18px;font-weight:700;font-size:26px;color:#3B2418">🏬 Rental Shop · <span style="color:#7A5C2E;font-weight:600">Ek kahani</span></div>` +
    `<div id="lockB" style="position:absolute;right:30px;top:196px;display:flex;align-items:center;gap:10px;background:#2b0001;border:3px solid #F8D36A;border-radius:999px;padding:8px 20px 8px 14px;font-weight:900;font-size:28px;color:#F8D36A;letter-spacing:2px"><span id="lockI">🔒</span><span id="lockT">SECRET</span></div>` +
    `<div id="brandB" style="position:absolute;right:30px;top:196px;display:none;align-items:center;gap:10px;background:rgba(255,255,255,.95);border:3px solid #F8D36A;border-radius:999px;padding:6px 18px 6px 6px;font-weight:800;font-size:28px;color:#890304"><img src="${SEAL()}" style="width:46px;height:46px;border-radius:50%">🔓 Anokhi Reet</div>`,
  upd(t) {
    const r0 = T('c53'), crack = r0 + .7, show = t < T('c63') + .2;
    $('tagL').style.display = show ? '' : 'none';
    const lk = $('lockB'), br = $('brandB');
    lk.style.display = show && t < crack ? 'flex' : 'none'; br.style.display = show && t >= crack ? 'flex' : 'none';
    const sh = t > r0 && t < crack ? Math.sin(t * 60) * 6 : 0; lk.style.transform = `translateX(${sh.toFixed(1)}px) scale(${t > r0 && t < crack ? 1.15 : 1})`;
    const pk = clamp((t - crack) / .35); br.style.transform = `scale(${lerp(1.4, 1, E.back(pk)).toFixed(3)})`;
  }
});

// ================= S1: hook — the customer ignores the racks: "Bhaiya, woh peach wali" =================
addScene(0, 'c6', {
  svg: rentalShopBG('s1', { mirrorY: 720 }) + wrap('s1-w', stand('cu1', CUST, 0, 960, .86)) + bust('ji1', JIGNESH, 820, FLOOR + 40, .92) + counterSVG(FLOOR + 40, C.wood),
  html: `<div class="title" style="top:440px">Customer <span class="g">rack hi nahi</span> dekhta?!</div>` +
    `<div class="bubble" style="left:330px;top:660px;width:460px" data-t="c4">"Bhaiya, woh <span class="hl">peach wali</span>!"</div>`,
  upd(t) {
    const [gx, gy] = glide(t, .1, 1.3, -260, 360); tf($('s1-w'), gx, gy, 1);
    const pt = t > T('c4') - .2;
    life('cu1', t, { seed: 3, look: pt ? [0.9, -0.3] : [0.6, 0], mouth: pt ? 'big' : 'smile', brows: 'up', tilt: 3, R: pt ? [80, 0] : [9, -14], hR: 'point' });
    life('ji1', t, { pivot: 0, look: [-0.8, 0], mouth: t > T('c5') ? 'grin' : 'smile', brows: 'up', tilt: -3, L: CLASP, R: CLASP });
  }
});

// ================= S2: the secret — told at the END =================
addScene('c6', 'c8', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s2-r', 540, 900, .14, C.gold) + wrap('s2-l', at(0, 0, lockSVG(), 3)),
  html: `<div class="title" style="top:1180px;font-size:84px" data-t="c7">Secret <span class="g">END</span> mein</div>`, capY: 1400,
  tin: .25, trans: 'zoom',
  upd(t) {
    tf($('s2-r'), 540, 900, 1, t * 6);
    const z = pop(t, T('c6'), .4), mv = E.io(clamp((t - T('c7') - .4) / .6));
    tf($('s2-l'), lerp(540, 980, mv), lerp(880, 230, mv), z.s * lerp(1, .25, mv), Math.sin(t * 7) * 3 * (1 - mv)); op($('s2-l'), z.o * (1 - clamp((mv - .8) / .2)));
  }
});

// ================= S3: Surat — Jigneshbhai's tiny 10x12 rental shop =================
addScene('c8', 'c11', {
  svg: shopFrontBG('s3', { sign: 'JALARAM RENTAL', since: 'Surat' }) + bust('ji3', JIGNESH, 540, FLOOR + 30, .8) + counterSVG(FLOOR + 10, '#8C6239'),
  html: pillH(540, 340, 'c8+0.2', '<span class="hl">Surat</span> · Jigneshbhai', '', 'c9') + pillH(540, 340, 'c9', '<span class="hl">10x12</span> ki dukaan', 'big'),
  cam: [1.05, 1], fy: 700,
  upd(t) { life('ji3', t, { pivot: 0, look: [0, 0], mouth: 'smile', brows: 'norm', tilt: 3, L: CLASP, R: CLASP }); }
});

// ================= S4: FLASHBACK (sepia) — 1 hour, 40 lehengas opened =================
addScene('c11', 'c15', {
  svg: sepia(rentalShopBG('s4', { noMirror: true }) + clockSVG('s4-clk', 540, 470, 60) + bust('cu4', CUST2, 260, FLOOR + 40, .9) + bust('ji4', JIGNESH, 830, FLOOR + 40, .9) + counterSVG(FLOOR + 40) +
    `<g transform="translate(560,${FLOOR + 30})">${pileSVG('s4-p', 10)}</g>`),
  html: pillH(540, 340, 'c11', '1 saal pehle…', 'big', 'c14-0.05') + pillH(540, 340, 'c14', '<span class="hl">40</span> lehenge khule', 'big'),
  init() { for (let i = 0; i < 10; i++) op($('s4-p' + i), 0); },
  upd(t) {
    const spin = clamp((t - T('c13')) / 1.4); tf($('s4-clk-m'), 0, 0, 1, spin * 720); tf($('s4-clk-h'), 0, 0, 1, 40 + spin * 30);
    for (let i = 0; i < 10; i++) op($('s4-p' + i), t > T('c13') + i * .25 ? 1 : 0);
    life('cu4', t, { pivot: 0, seed: 2, look: [0.8, 0.3], mouth: 'flat', brows: 'norm', tilt: 4, R: [50, -40], hR: 'point' });
    life('ji4', t, { pivot: 0, look: [-0.8, 0], mouth: 'worry', brows: 'worry', tilt: -4, sweat: clamp((t - T('c14')) / .4), L: [40, -60], hL: 'open' });
  }
});

// ================= S5: "Sochke batate hain" — 40 opened, 0 booking =================
addScene('c15', 'c17', {
  svg: sepia(rentalShopBG('s5', { noMirror: true }) + wrap('s5-w', stand('cu5', CUST2, 0, 960, .82)) + bust('ji5', JIGNESH, 830, FLOOR + 40, .9) + counterSVG(FLOOR + 40) + `<g transform="translate(560,${FLOOR + 30})">${pileSVG('s5-p', 10)}</g>`),
  html: `<div class="bubble" style="left:330px;top:500px" data-t="c16">"<span class="hl">Sochke batate</span> hain."</div>` + pillH(540, 340, 'c16+0.6', '40 khule · <span class="hl">0 booking</span>', 'big'),
  upd(t) {
    const [gx, gy] = glide(t, T('c16') + .3, 1.1, 300, -400); tf($('s5-w'), gx, gy, 1);
    life('cu5', t, { seed: 2, look: [-0.9, 0], mouth: 'smile', brows: 'norm', tilt: 3, L: [60, -40], hL: 'open' });
    life('ji5', t, { pivot: 0, look: [-0.8, 0.2], mouth: 'sad', brows: 'worry', tilt: -6 });
  }
});

// ================= S6: 15 came, 2 booked =================
addScene('c17', 'c19', {
  svg: sepia(`<rect width="${W}" height="${H}" fill="${C.cream}"/>` + [...Array(15)].map((_, i) => `<g transform="translate(${170 + (i % 5) * 185},${560 + ((i / 5) | 0) * 200})"><g data-t="c17+${(i * .05).toFixed(2)}">${personIcon(C.goldTan)}<g id="s6-ok${i}" opacity="0">${personIcon(C.emerald)}</g></g></g>`).join('')),
  html: pillH(540, 340, 'c17+0.2', '<span class="hl">15</span> aaye → <span class="hl">2</span> booked', 'big'),
  upd(t) { [3, 11].forEach(i => op($('s6-ok' + i), clamp((t - T('c18') - .3) / .3))); for (let i = 0; i < 15; i++) if (i !== 3 && i !== 11) op($('s6-ok' + i), 0); }
});

// ================= S7: the rest of the time — folding lehengas at night =================
addScene('c19', 'c21', {
  svg: sepia(shopBG('s7', { night: true, noRail: true, noSign: true, lamp: true, lampX: 540 }) + bust('ji7', JIGNESH, 540, FLOOR + 40, .95) + counterSVG(FLOOR + 40) + `<g transform="translate(250,${FLOOR + 30})">${pileSVG('s7-a', 8)}</g>` + `<g transform="translate(830,${FLOOR + 30})">${pileSVG('s7-b', 3)}</g>`),
  html: pillH(540, 340, 'c19+0.2', 'Baaki time: <span class="hl">fold</span> karna', 'big'),
  upd(t) { const f = Math.sin(t * 4); life('ji7', t, { pivot: 0, look: [f > 0 ? -0.6 : 0.6, 0.8], nod: 8, mouth: 'flat', brows: 'worry', tilt: f * 3, L: [40 + f * 15, -60], R: [40 - f * 15, -60], hL: 'open', hR: 'open' }); }
});

// ================= S8: a new AC showroom opens across the road; the shop stays empty =================
addScene('c21', 'c25', {
  svg: sepia(splitSVG('s8', shopFrontBG('s8a', { cx: 270, sign: 'JALARAM', since: 'Rental' }), `<rect x="540" width="540" height="${H}" fill="${C.sky}"/><rect x="540" y="${FLOOR}" width="540" height="90" fill="#CFC6B8"/><rect x="540" y="${FLOOR + 90}" width="540" height="${H}" fill="#6E6A64"/><g transform="translate(810,${FLOOR}) scale(.54) translate(-540,${-FLOOR})">${showroomBG('s8b')}</g>`) +
    [0, 1, 2, 3, 4].map(i => wrap('s8-p' + i, at(0, 0, personIcon([C.pink, C.teal, C.marigold, '#7A4FA0', C.emerald][i]), 1.1))).join('')),
  html: pillH(740, 1260, 'c22', '<span class="hl">AC SHOWROOM</span>', 'gold') + pillH(270, 1260, 'c24', 'Dukaan <span class="hl">khaali</span>', 'maroon'),
  upd(t) { for (let i = 0; i < 5; i++) { const k = clamp((t - T('c21') - .4 - i * .35) / 1.6); tf($('s8-p' + i), lerp(150, 860 + (i % 2) * 60, E.io(k)), 1180 - Math.abs(Math.sin(k * 14)) * 10, 1); op($('s8-p' + i), k > 0 ? 1 : 0); } }
});

// ================= S9: one night, under a dim bulb: "DUKAAN BECHNI HAI" =================
addScene('c25', 'c28', {
  svg: sepia(shopBG('s9', { night: true, noRail: true, noSign: true, lamp: true, lampX: 760 }) + `<rect width="${W}" height="${H}" fill="#1E1715" opacity=".35"/>` +
    bust('ji9', JIGNESH, 760, FLOOR + 40, .9) + counterSVG(FLOOR + 40) +
    `<g transform="translate(330,${FLOOR - 120}) rotate(-4)"><g data-t="c26">${tearBoardSVG('s9-b', ['', ''])}</g><g data-t="c26+0.3" data-k="write" data-d="1.2"><text y="-30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="72" fill="${C.redDark}" font-style="italic">DUKAAN</text><text y="56" text-anchor="middle" font-family="Inter" font-weight="900" font-size="72" fill="${C.redDark}" font-style="italic">BECHNI HAI</text></g></g>`),
  cam: [1, 1.08], fx: 440, fy: 1000,
  upd(t) { life('ji9', t, { pivot: 0, look: [-0.9, 0.6], nod: 10, mouth: 'sad', brows: 'worry', tilt: -6, L: [40, -40], hL: 'point' }); }
});

// ================= S10: the next day, a college girl: "Uncle, aapki dukaan phone pe kyun nahi dikhti?" =================
addScene('c28', 'c36', {
  svg: sepia(rentalShopBG('s10', { noMirror: true }) + bust('cg10', COLLEGE_GIRL, 280, FLOOR + 30, .95) + bust('ji10', JIGNESH, 800, FLOOR + 40, .92) + counterSVG(FLOOR + 40) + wrap('s10-ph', SHOT)),
  html: pillH(540, 340, 'c28', 'Agle din…', 'big', 'c32-0.05') +
    `<div class="bubble" style="left:540px;top:430px;width:820px" data-t="c32" data-out="c34-0.05">"Uncle, aapki dukaan <span class="hl">phone pe</span> kyun nahi dikhti?"</div>` +
    `<div class="bubble" style="left:540px;top:430px;width:820px" data-t="c34">"Main toh pehle <span class="hl">ghar se dekh ke</span> hi aati hoon."</div>`,
  upd(t) {
    const { hr } = life('cg10', t, { pivot: 0, seed: 4, look: [0.8, 0], mouth: t > T('c32') ? 'big' : 'smile', brows: 'up', tilt: 4, R: [40, -110], hR: 'fist' });
    const p = toScene('cg10', hr); tf($('s10-ph'), p[0], p[1] - 50, 1, 8);
    const hit = t > T('c33');
    life('ji10', t, { pivot: 0, look: hit ? [-0.6, -0.4] : [-0.8, 0], mouth: hit ? 'o' : 'smile', brows: hit ? 'up' : 'norm', tilt: hit ? 0 : -3, R: hit ? THINK : [9, -14], hR: 'fist' });
  }
});

// ================= S11: that night he tears the board… and does ONE thing (phone glows, screen hidden) =================
addScene('c36', 'c39', {
  svg: sepia(shopBG('s11', { night: true, noRail: true, noSign: true, lamp: true, lampX: 540 }) + bust('ji11', JIGNESH, 540, FLOOR + 40, .95) + counterSVG(FLOOR + 40) +
    `<g transform="translate(540,640)">${tearBoardSVG('s11-b')}</g>` + wrap('s11-ph', phoneGlow)),
  html: `<div class="title" style="top:430px" data-t="c38">Us raat… <span class="g">EK KAAM</span> 🔒</div>`,
  upd(t) {
    const k = E.out(clamp((t - T('c37')) / .7));
    tf($('s11-b-L'), -k * 420, k * 300, 1, -k * 40); tf($('s11-b-R'), k * 420, k * 260, 1, k * 35); op($('s11-b-L'), 1 - clamp((k - .6) / .4)); op($('s11-b-R'), 1 - clamp((k - .6) / .4));
    const ph = clamp((t - T('c38')) / .4);
    const { hr } = life('ji11', t, { pivot: 0, look: ph > 0 ? [0.4, 0.6] : [0, -0.6], mouth: ph > 0 ? 'smile' : 'flat', brows: 'sure', tilt: 3, R: ph > 0 ? [40, -110] : [70, -40], hR: 'fist', L: ph > 0 ? [9, -14] : [70, -40] });
    const p = toScene('ji11', hr); tf($('s11-ph'), p[0], p[1] - 70, ph, 8); op($('s11-ph'), ph);
  }
});

// ================= S12: "1 MAHINE BAAD" — colour returns =================
addScene('c39', 'c40', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('s12-r', 540, 900, .14, C.goldTan) + `<g transform="translate(540,880)"><g data-t="c39">${at(0, 0, calendarSVG('s12-c', '1 MAHINA', 'BAAD'), 1.2)}</g></g>`,
  html: `<div class="title" style="top:480px;font-size:96px" data-t="c39"><span class="g">1 MAHINE</span> BAAD</div>`,
  tin: .3, trans: 'iris',
  upd(t) { tf($('s12-r'), 540, 900, 1, t * 6); }
});

// ================= S13: customers show a screenshot, straight to the trial room =================
addScene('c40', 'c43', {
  svg: trialRoomBG('s13') + wrap('s13-w1', stand('cu13a', CUST, 0, 960, .8)) + wrap('s13-w2', stand('cu13b', CUST2, 0, 960, .8)) + wrap('s13-p1', SHOT) + wrap('s13-p2', SHOT),
  html: pillH(540, 340, 'c41', '<span class="hl">Screenshot</span> → Trial room', 'big'),
  upd(t) {
    [['s13-w1', 'cu13a', 's13-p1', T('c40'), 270], ['s13-w2', 'cu13b', 's13-p2', T('c41') + .3, 810]].forEach(([w, c, p, t0, x1], i) => {
      const [gx, gy] = glide(t, t0, 1.2, -300, x1); tf($(w), gx, gy, 1);
      const { hr } = life(c, t, { seed: 2 + i, look: [0.6, -0.2], mouth: 'big', brows: 'up', tilt: 3, R: [40, -110], hR: 'fist' });
      const q = toScene(c, hr); tf($(p), q[0] + gx, q[1] + gy - 50, 1, 8);
    });
  }
});

// ================= S14: before / after — 15 → 2 ✗ · 8 → 6 ✓ =================
const BA = (x, top, a, b, ok, t0) => `<g transform="translate(${x},860)"><g data-t="${t0}"><rect x="-230" y="-260" width="460" height="520" rx="30" fill="${ok ? '#E3F3EA' : '#FBE7E7'}" stroke="${OL}" stroke-width="${OW}"/><text y="-170" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="${ok ? '#1F7A4D' : '#B23B3B'}">${top}</text><text y="10" text-anchor="middle" font-family="Inter" font-weight="900" font-size="120" fill="#141110">${a} → ${b}</text><text y="200" text-anchor="middle" font-family="Inter" font-weight="900" font-size="110" fill="${ok ? '#1F7A4D' : '#B23B3B'}">${ok ? '✓' : '✗'}</text></g></g>`;
addScene('c43', 'c45', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + BA(285, 'Pehle', 15, 2, false, 'c43') + BA(795, 'Ab', 8, 6, true, 'c44'),
  html: pillH(540, 340, 'c44+0.3', 'Booking: <span class="hl">8 mein se 6</span>', 'big')
});

// ================= S15: the fold pile shrinks — 40 → 3 =================
addScene('c45', 'c47', {
  svg: rentalShopBG('s15', { noMirror: true }) + bust('ji15', JIGNESH, 800, FLOOR + 40, .9) + counterSVG(FLOOR + 40) + `<g transform="translate(330,${FLOOR + 30})">${pileSVG('s15-p', 10)}</g>`,
  html: pillH(540, 340, 'c45+0.2', 'Fold: <span class="hl" id="s15-n">40</span>', 'big'),
  upd(t) {
    const k = clamp((t - T('c46')) / .8); for (let i = 0; i < 10; i++) { const gone = i >= 3 && k > (9 - i) / 7; op($('s15-p' + i), gone ? 0 : 1); }
    $('s15-n').textContent = k > 0 ? `40 → ${Math.max(3, Math.round(lerp(40, 3, k)))}` : '40';
    life('ji15', t, { pivot: 0, look: [-0.8, 0.4], mouth: k > .5 ? 'grin' : 'smile', brows: 'up', tilt: 4, L: CLASP, R: CLASP });
  }
});

// ================= S16: calls from all over Gujarat — Vadodara, Navsari, Bharuch =================
const CITY = [['Vadodara', 90, -60], ['Bharuch', 60, 60], ['Surat', 40, 150], ['Navsari', 50, 230]];
addScene('c47', 'c49', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><g transform="translate(560,860) scale(1.1)">${gujaratMapSVG('s16-m', CITY)}` +
    `<circle cx="40" cy="150" r="70" fill="url(#glow)"/><g transform="translate(40,150)">${mapPinSVG(C.red, 30)}</g>` +
    [[90, -60], [60, 60], [50, 230]].map(([x, y], i) => `<path id="s16-l${i}" d="M${x},${y} L40,150" stroke="${C.red}" stroke-width="5" stroke-dasharray="10 8" opacity="0"/><g transform="translate(${x},${y})"><g data-t="c48+${(i * .3).toFixed(1)}" data-k="drop">${mapPinSVG(C.emerald, 24)}<g transform="translate(0,-90)">${at(0, 0, `<circle r="26" fill="#fff" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-size="28">📞</text>`)}</g></g></g>`).join('') + `</g>`,
  html: pillH(540, 340, 'c47+0.2', 'Calls <span class="hl">poore Gujarat</span> se', 'big'),
  upd(t) { for (let i = 0; i < 3; i++) { const q = clamp((t - T('c48') - .2 - i * .3) / .4); op($('s16-l' + i), q); $('s16-l' + i).setAttribute('stroke-dashoffset', (-t * 30).toFixed(0)); } }
});

// ================= S17: the showroom owner crosses the road: "Jigneshbhai, kiya kya??" — he just smiles =================
addScene('c49', 'c53', {
  svg: shopFrontBG('s17', { cx: 330, sign: 'JALARAM', since: 'Rental' }) + bust('ji17', JIGNESH, 330, FLOOR + 30, .8) + wrap('s17-sw', bust('sw17', SHOWROOM_SETH, 0, FLOOR + 30, .8)) + counterSVG(FLOOR + 10, '#9C928A'),
  html: `<div class="bubble" style="left:820px;top:600px;width:440px" data-t="c51">"Jigneshbhai, <span class="hl">kiya kya??</span>"</div>`,
  upd(t) {
    const [gx, gy] = glide(t, T('c49'), 1.4, 1300, 790); tf($('s17-sw'), gx, gy, 1);
    life('sw17', t, { pivot: 0, seed: 6, look: [-0.8, 0], mouth: t > T('c51') ? 'o' : 'flat', brows: t > T('c51') ? 'up' : 'sure', tilt: -4, L: t > T('c51') ? [60, -40] : [9, -14], hL: 'open' });
    const sm = t > T('c52');
    life('ji17', t, { pivot: 0, look: [0.8, 0], mouth: sm ? 'grin' : 'smile', brows: sm ? 'sure' : 'norm', tilt: sm ? 6 : 2, closed: sm && t < T('c52') + .5, L: CLASP, R: CLASP });
  }
});

// ================= S18: "Toh secret kya tha?" — the lock shakes and cracks open =================
addScene('c53', 'c54', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s18-r', 540, 900, .14, C.gold) + `<circle cx="540" cy="900" r="300" fill="url(#glow)" id="s18-g" opacity="0"/>` +
    `<g id="s18-a">${at(0, 0, lockSVG(), 3)}</g>`,
  html: `<div class="title" style="top:1200px;font-size:96px"><span class="g">SECRET?</span></div>`, capY: 1420,
  upd(t) {
    tf($('s18-r'), 540, 900, 1, t * 6);
    const crack = T('c53') + .7, sh = t < crack ? Math.sin(t * 60) * 10 : 0, k = E.out(clamp((t - crack) / .5));
    tf($('s18-a'), 540 + sh, 900 - k * 60, 1 + k * .15, sh * .3); op($('s18-g'), k);
  }
});

// ================= S19: he listed the shop on ANOKHI REET — the phone turns to camera =================
const tileRow = (y, i0) => [0, 1, 2].map(j => `<g transform="translate(${-160 + j * 160},${y})"><g data-t="c55+${(.2 + (i0 + j) * .12).toFixed(2)}">${outfitTile(...[[C.lehenga, C.lehengaDark], ['#F4B183', '#E0915F'], [C.emerald, C.emeraldDark], [C.pink, C.pinkDark], [C.teal, C.tealDark], [C.marigold, '#C9821E']][i0 + j], 140)}</g></g>`).join('');
addScene('c54', 'c56', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><circle cx="540" cy="860" r="520" fill="url(#glow)"/>` +
    wrap('s19-ph', phoneSVG('s19-p', 0, 0, 560, 1000, arHeader() +
      `<circle cx="-190" cy="-310" r="50" fill="url(#mar)"/><text x="-190" y="-298" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="#FFF2DF">JR</text>` +
      `<text x="-120" y="-318" font-family="Inter" font-weight="900" font-size="38" fill="#141110">Jalaram Rental</text><text x="-120" y="-278" font-family="Inter" font-weight="600" font-size="26" fill="#655C57">Surat · Lehenga · Chaniya choli</text>` +
      tileRow(-120, 0) + tileRow(50, 3) + `<rect x="-240" y="180" width="480" height="76" rx="38" fill="url(#mar)"/><text x="0" y="230" text-anchor="middle" font-family="Inter" font-weight="800" font-size="32" fill="#FFF2DF">Book karo</text>`)),
  html: pillH(540, 340, 'c55', '🔓 <span class="hl">ANOKHI REET</span>', 'gold big'),
  upd(t) { const k = E.out(clamp((t - T('c54')) / .6)); tf($('s19-ph'), 540, 880, .78, 0, 0, 0); $('s19-ph').setAttribute('transform', `translate(540,880) scale(${(.78 * Math.max(.02, k)).toFixed(3)},.78)`); }
});

// ================= S20: photo, size, rent price — all on the app; choose at home, final at the shop =================
addScene('c56', 'c60', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` +
    [['📷', 'Photo'], ['📏', 'Size'], ['₹', 'Rent price']].map(([ic, l], i) => `<g transform="translate(${210 + i * 330},700)"><g data-t="c56+${(.2 + i * .45).toFixed(2)}"><circle r="110" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="80" fill="${C.red}">${ic}</text><text y="170" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="#141110">${l}</text><g transform="translate(80,-80)"><circle r="34" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><path d="M-14,0 l9,10 18,-18" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g></g>`).join('') +
    `<g transform="translate(300,1080)"><g data-t="c58">${at(0, 0, `<rect x="-200" y="-70" width="400" height="140" rx="24" fill="#fff" stroke="${OL}" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="#141110">🏠 Ghar se choose</text>`)}</g></g>` +
    `<g transform="translate(540,1080)"><g data-t="c59"><path d="M-40,0 H30 M10,-22 L40,0 L10,22" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>` +
    `<g transform="translate(790,1080)"><g data-t="c59+0.3">${at(0, 0, `<rect x="-200" y="-70" width="400" height="140" rx="24" fill="#E3F3EA" stroke="#1F7A4D" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="#1F7A4D">🏬 Dukaan pe final</text>`)}</g></g>`,
  html: pillH(540, 340, 'c57', 'Sab <span class="hl">app</span> pe', 'big')
});

// ================= S21: chalkboard — Dukaan: same ✓ Stock: same ✓ Rate: same ✓ =================
addScene('c60', 'c61', {
  svg: rentalShopBG('s21', { noMirror: true }) + at(540, 820, chalkboardSVG(820, 560)) +
    [['Dukaan', 'c60+0.1'], ['Stock', 'c60+0.8'], ['Rate', 'c60+1.5']].map(([w, tt], i) => `<g transform="translate(200,${670 + i * 140})"><g data-t="${tt}" data-k="write" data-d=".6"><text font-family="Inter" font-weight="800" font-size="64" fill="#F4EFE3">${w}: same</text><text x="500" font-family="Inter" font-weight="900" font-size="70" fill="${C.gold}">✓</text></g></g>`).join(''),
  cam: [1, 1.04], fy: 820
});

// ================= S22: now the shop opens on the phone too =================
addScene('c61', 'c63', {
  svg: rentalShopBG('s22', { noMirror: true }) + `<circle cx="540" cy="820" r="460" fill="url(#glow)" opacity=".6"/>` + bust('ji22', JIGNESH, 540, FLOOR + 30, 1.0) + counterSVG(FLOOR + 30) +
    [[150, 980, C.pink], [930, 980, C.teal], [140, 760, C.marigold], [940, 760, '#F4B183']].map(([x, y, c], i) => `<g transform="translate(${x},${y})"><g data-t="c61+${(i * .15).toFixed(2)}">${at(0, 0, personIcon(c), 1.2)}</g></g>`).join('') + wrap('s22-ph', phoneGlow),
  html: `<div class="title" style="top:430px;font-size:68px" data-t="c62">Ab dukaan <span class="g">phone mein bhi</span> khulti hai</div>`,
  tin: .3, trans: 'fade',
  upd(t) { const { hr } = life('ji22', t, { pivot: 0, look: [0, 0], mouth: 'grin', brows: 'up', tilt: 4, R: [40, -110], hR: 'fist', L: CLASP }); const p = toScene('ji22', hr); tf($('s22-ph'), p[0], p[1] - 70, 1, 8); }
});

// ================= S23: CTA — comment SECRET; the team calls; follow =================
addScene('c63', 9999, {
  svg: shopBG('s23', { sign: 'ANOKHI REET' }) + rosettes('s23-r', 540, 780, .08, C.goldTan) + bust('ji23', JIGNESH, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: pillH(540, 380, 'c63', 'Aapki dukaan ko bhi <span class="hl">ye secret?</span>', 'big', 'c65-0.05') +
    `<div class="pill big" style="left:540px;top:380px;background:#2b0001;color:#F8D36A;border-color:#F8D36A;font-size:58px" data-t="c65">Comment <span class="hl" style="color:#2b0001">SECRET</span> 👇</div>` +
    pillH(540, 490, 'c66', '📞 Team aapko <span class="hl">call</span> karegi', 'gold') +
    `<div class="follow" style="left:540px;top:610px" data-t="c67"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="s23-b"><span id="s23-f">Follow</span></span></div>`,
  upd(t) {
    tf($('s23-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c65')) / .4);
    life('ji23', t, { pivot: 0, mouth: 'grin', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c65'))[0], E.io(w)), lerp(-14, WAVE(t, T('c65'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist' });
    const tp = VOICE_END + .7, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('s23-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('s23-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});

// brand hidden: the usual seal pill stays off the whole reel (the corner badge above replaces it)
SC.forEach(s => { s.noWm = true; });
