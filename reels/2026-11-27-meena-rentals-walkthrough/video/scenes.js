// ===== Poori rental shop, bas ek app pe (Meena Rentals walkthrough): 11 scenes, timed to the male voice =====
// Teammate look: dark maroon-brown bokeh with cream app cards and green numbered tags (01-06); karaoke captions (grey →
// white, keyword gold). Meena (MEENA.shop, reused) doesn't lip-sync (male narrator). Kit: bokehBG, uiCard, outfitTile,
// sizeChips, availCal, rangeSlider, doorstepSVG (engine/props.js).
const MS = MEENA.shop;
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const tag = (n, label, t0) => pillH(540, 352, t0, `${n ? `<span class="hl" style="background:#1F7A4D;color:#fff">${n}</span> ` : ''}${label}`, 'green big');
const KARAOKE = `<style>#cap .w.dim{color:#9C928A}#cap .w.g.dim{color:#9C8A5A}</style>`;
const OUT6 = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E']];
const txt = (x, y, s, fs = 30, col = '#141110', w = 800, anchor = 'start') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter" font-weight="${w}" font-size="${fs}" fill="${col}">${s}</text>`;

// ================= S1: the whole rental shop, on one app =================
addScene(0, 'c3', {
  svg: shopBG('w1', { sign: 'MEENA RENTALS' }) + bust('me1', MS, 540, FLOOR + 20, 1.05) + counterSVG(),
  html: KARAOKE + `<div class="pill" style="left:540px;top:345px;font-size:30px;padding:8px 22px">Lehenga · Chaniya Choli · Sherwani</div>` +
    `<div class="title" style="top:450px">Poori shop… <span class="g">ek app</span> pe</div>`,
  cam: [1, 1.04],
  upd(t) { life('me1', t, { pivot: 0, look: [0, 0], mouth: 'smile', brows: 'up', tilt: 3, L: CLASP, R: CLASP }); }
});

// ================= S2: "Dekho, ye hai Meena Rentals… Anokhi Reet pe" — phone slides up with the splash =================
addScene('c3', 'c5', {
  svg: shopBG('w2', { sign: 'MEENA RENTALS' }) + bust('me2', MS, 540, FLOOR + 20, 1.05) + counterSVG() +
    wrap('w2-ph', phoneSVG('w2-p', 0, 0, 440, 860,
      `<rect x="-204" y="-414" width="408" height="828" rx="42" fill="url(#mar)"/><circle cy="-60" r="150" fill="url(#glow)"/>` +
      `<image href="${SEAL()}" x="-80" y="-140" width="160" height="160"/>` + txt(0, 80, 'Anokhi Reet', 54, '#FFF2DF', 900, 'middle') +
      `<text x="0" y="130" text-anchor="middle" font-family="Arya" font-size="30" fill="${C.gold}">दिल से जुड़ी एक अनोखी रीत</text>` +
      `<g transform="translate(0,260)"><rect x="-160" y="-34" width="320" height="68" rx="34" fill="${C.gold}"/>${txt(0, 12, 'Meena Rentals', 30, C.redDark, 900, 'middle')}</g>`)),
  upd(t) {
    const k = E.out(clamp((t - T('c3')) / .6)); tf($('w2-ph'), 540, lerp(2300, 900, k), 1, (1 - k) * 8);
    life('me2', t, { pivot: 0, look: [0, 0.6], mouth: 'grin', brows: 'up', tilt: 3, L: CLASP, R: CLASP });
  }
});

// ================= S3: 01 SHOP — name, location, whole collection at a glance =================
addScene('c5', 'c8', {
  svg: bokehBG('w3') + `<g transform="translate(540,860)">${uiCard(820, 900)}` +
    `<circle cx="-300" cy="-340" r="56" fill="url(#mar)"/>${txt(-300, -326, 'MR', 40, '#FFF2DF', 900, 'middle')}${txt(-220, -350, 'Meena Rentals', 44)}${txt(-220, -306, 'Navrangpura, Ahmedabad', 30, '#655C57', 600)}` +
    `<g transform="translate(-150,-220)"><g data-t="c6+0.2"><rect x="-210" y="-30" width="420" height="60" rx="30" fill="#E3F3EA" stroke="#1F7A4D" stroke-width="3"/>${txt(0, 10, '✓ Try at shop available', 28, '#1F7A4D', 800, 'middle')}</g></g>` +
    OUT6.map(([c, d], i) => `<g transform="translate(${-240 + (i % 3) * 240},${-10 + ((i / 3) | 0) * 250})"><g data-t="c6+${(.4 + i * .18).toFixed(2)}">${outfitTile(c, d, 210)}</g></g>`).join('') + `</g>`,
  html: KARAOKE + tag('01', 'SHOP', 'c5'),
  tin: .25, trans: 'rise',
  upd(t) { bokehUpd('w3', t); }
});

// ================= S4: 02 NEARBY — the customer searches nearby, your shop shows up =================
const NEAR = [[-250, -380], [220, -300], [-300, 250], [260, 300]], MR = [80, -40];
addScene('c8', 'c11', {
  svg: bokehBG('w4') + `<g transform="translate(540,905) scale(.9)">${uiCard(860, 1000, '#F4EDE1')}<g transform="scale(.82)">${cityMapSVG('w4-map', [['Navrangpura', -250, -470], ['Satellite', 270, -400], ['Maninagar', 250, 470], ['Bopal', -320, 420]])}` +
    `<circle cx="-120" cy="140" r="80" fill="#3E9BD6" opacity=".2"/><circle cx="-120" cy="140" r="22" fill="#3E9BD6" stroke="#fff" stroke-width="6"/>` +
    NEAR.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c9+${(.2 + i * .2).toFixed(1)}" data-k="drop">${mapPinSVG('#9C928A', 30)}</g></g>`).join('') +
    `<path id="w4-line" d="M-120,140 L${MR[0]},${MR[1]}" stroke="${C.red}" stroke-width="7" stroke-dasharray="14 10" opacity="0"/>` +
    `<circle cx="${MR[0]}" cy="${MR[1] - 40}" r="130" fill="url(#glow)"/><g transform="translate(${MR[0]},${MR[1]})"><g data-t="c10" data-k="drop">${mapPinSVG(C.red, 46)}<g transform="translate(0,-160)"><rect x="-170" y="-34" width="340" height="68" rx="34" fill="url(#mar)" stroke="${OL}" stroke-width="3"/>${txt(0, 11, 'Meena Rentals', 30, '#FFF2DF', 800, 'middle')}</g></g></g></g></g>`,
  html: KARAOKE + tag('02', 'NEARBY', 'c8') + pillH(640, 1240, 'c10+0.5', '📍 <span class="hl">2.1 km</span> door', 'big'),
  upd(t) { bokehUpd('w4', t); op($('w4-line'), clamp((t - T('c10') - .3) / .3)); $('w4-line').setAttribute('stroke-dashoffset', (-t * 30).toFixed(0)); }
});

// ================= S5: 03 BUDGET — only customers whose budget fits your clothes =================
addScene('c11', 'c14', {
  svg: bokehBG('w5') + `<g transform="translate(540,860)">${uiCard(820, 920)}${txt(-340, -360, 'Budget', 40)}${txt(-340, -250, '₹', 34, '#655C57', 800)}${txt(340, -250, '₹₹₹', 34, '#655C57', 800, 'end')}` +
    `<g transform="translate(0,-300)">${rangeSlider('w5-s', 560)}</g>` +
    OUT6.map(([c, d], i) => `<g id="w5-o${i}" transform="translate(${-240 + (i % 3) * 240},${-40 + ((i / 3) | 0) * 250})">${outfitTile(c, d, 210)}</g>`).join('') + `</g>`,
  html: KARAOKE + tag('03', 'BUDGET', 'c11') + pillH(540, 1250, 'c13+0.2', 'Aapke kapde, <span class="hl">unke budget</span> mein', 'gold'),
  upd(t) {
    bokehUpd('w5', t); const k = E.io(clamp((t - T('c11') - .3) / 1.0)); rangeSet('w5-s', 560, lerp(0, .3, k), lerp(1, .7, k));
    const f = clamp((t - T('c12') - .3) / .4); [1, 3, 5].forEach(i => op($('w5-o' + i), 1 - f * .8));
  }
});

// ================= S6: 04 OUTFIT — size, price and which dates are available =================
addScene('c14', 'c17', {
  svg: bokehBG('w6') + `<g transform="translate(540,905) scale(.9)">${uiCard(820, 1000)}` +
    `<rect x="-370" y="-460" width="300" height="360" rx="20" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><g transform="translate(-220,-330) scale(.55)">${lehengaHangerSVG('', { c: C.lehenga, d: C.lehengaDark })}</g>` +
    txt(-40, -410, 'Maroon lehenga', 38) + txt(-40, -360, 'Bridal · Meena Rentals', 26, '#655C57', 600) +
    `<g transform="translate(-40,-300)"><rect x="0" y="-30" width="300" height="56" rx="28" fill="${C.gold}"/>${txt(150, 8, 'Rent per booking', 26, C.redDark, 800, 'middle')}</g>` +
    `<g transform="translate(110,-180)">${sizeChips('w6-z')}</g>` +
    txt(-370, -40, 'Available dates', 30) + `<g transform="translate(0,40)">${availCal('w6-cal', [5, 6, 12, 13, 14, 20, 21])}</g></g>`,
  html: KARAOKE + tag('04', 'OUTFIT', 'c14'),
  upd(t) { bokehUpd('w6', t); const on = t > T('c15'); chipOn('w6-z', 'M', on); op($('w6-cal-d18'), 1); $('w6-cal-d18').setAttribute('stroke-width', t > T('c16') + .4 ? 8 : 2); }
});

// ================= S7: 05 BOOKING — date chosen, booking lands with you; no phone, no register =================
addScene('c17', 'c20', {
  svg: bokehBG('w7') + at(330, 860, phoneSVG('w7-ph', 0, 0, 440, 880, `<rect x="-204" y="-424" width="408" height="848" rx="42" fill="${C.cream}"/>` + txt(0, -340, 'Date chuno', 34, '#141110', 900, 'middle') +
    `<g transform="translate(0,-240) scale(.85)">${availCal('w7-cal', [5, 6, 12, 13, 14, 20, 21])}</g><g id="w7-btn"><rect x="-160" y="250" width="320" height="80" rx="40" fill="url(#mar)"/>${txt(0, 302, 'Book', 36, '#FFF2DF', 900, 'middle')}</g>`), .9) +
    `<g transform="translate(790,820)"><g data-t="c18+0.3" data-k="slideR">${uiCard(440, 380, '#fff')}<rect x="-220" y="-190" width="440" height="70" rx="34" fill="#1F7A4D"/>${txt(0, -144, '🎉 New booking', 30, '#fff', 900, 'middle')}` +
    `<g transform="translate(-130,10)">${outfitTile(C.lehenga, C.lehengaDark, 150)}</g>${txt(-30, -30, 'Maroon lehenga', 26)}${txt(-30, 14, '18 tareekh', 26, '#655C57', 700)}${txt(-30, 58, 'Priya', 26, '#655C57', 700)}</g></g>`,
  html: KARAOKE + tag('05', 'BOOKING', 'c17') + pillH(330, 1330, 'c19', 'Na phone ✗', 'maroon') + pillH(790, 1330, 'c19+0.4', 'Na register ✗', 'maroon'),
  upd(t) {
    bokehUpd('w7', t); const pick = t > T('c17') + .6; $('w7-cal-d18').setAttribute('fill', pick ? '#1F7A4D' : '#E3F3EA');
    const press = t > T('c18') && t < T('c18') + .2 ? .93 : 1; tf($('w7-btn'), 0, 0, press, 0, 0, 290);
  }
});

// ================= S8: 06 TRY AT SHOP — come and try, or doorstep at home =================
addScene('c20', 'c23', {
  svg: splitSVG('w8', rentalShopBG('w8a', { mirrorY: 720, rackAX: 140, rackBX: 940 }) + wrap('w8-w', stand('cu8', dress(CUSTOMER_W, { skirt: { c: C.pink, d: C.pinkDark, b: C.gold, w: 200 } }), 0, 960, .8)),
    bokehBG('w8b') + at(810, 860, doorstepSVG(), .9)),
  html: KARAOKE + tag('06', 'TRY AT SHOP', 'c20') + pillH(270, 1240, 'c20+0.6', '<span class="hl">Try at shop</span>', 'gold') + pillH(730, 1240, 'c22', '<span class="hl">Doorstep</span> 🚚', 'gold'),
  upd(t) { const [gx, gy] = glide(t, T('c20'), 1.2, -200, 280); tf($('w8-w'), gx, gy, 1); life('cu8', t, { seed: 3, look: [0.6, 0], mouth: 'big', brows: 'up', tilt: 3, L: CLASP, R: CLASP }); bokehUpd('w8b', t); }
});

// ================= S9: SAB EK JAGAH — register, WhatsApp, "available hai kya?" calls… all in one place =================
const MESS = [[230, 640, -8], [820, 600, 7], [300, 1040, 6], [800, 1040, -6]];
addScene('c23', 'c26', {
  svg: bokehBG('w9') +
    wrap('w9-m0', at(0, 0, ledgerSVG(), .9)) +
    wrap('w9-m1', `<rect x="-150" y="-60" width="300" height="120" rx="20" fill="#fff" stroke="${OL}" stroke-width="4"/>${txt(-120, -8, '📞 3 missed calls', 28, '#B23B3B')}${txt(-120, 34, 'Customer', 24, '#655C57', 600)}`) +
    wrap('w9-m2', `<rect x="-170" y="-50" width="340" height="100" rx="24" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/>${txt(0, 12, '"Size kya hai?"', 32, '#141110', 800, 'middle')}`) +
    wrap('w9-m3', `<rect x="-180" y="-50" width="360" height="100" rx="24" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/>${txt(0, 12, '"Available hai?"', 32, '#141110', 800, 'middle')}`) +
    `<g id="w9-grid" opacity="0">` + [0, 1, 2, 3].map(i => `<g transform="translate(${i % 2 ? 750 : 330},${i < 2 ? 700 : 1050})">${uiCard(360, 300)}${txt(0, -90, ['01 SHOP', '02 NEARBY', '05 BOOKING', '06 TRY'][i], 30, '#1F7A4D', 900, 'middle')}<g transform="translate(0,30)">${outfitTile(...OUT6[i], 150)}</g></g>`).join('') + `</g>`,
  html: KARAOKE + `<div class="title" style="top:430px" data-t="c25"><span class="g">SAB EK JAGAH</span></div>`,
  upd(t) {
    bokehUpd('w9', t); const z = E.io(clamp((t - T('c25') + .2) / .6));
    MESS.forEach(([x, y, r], i) => { const ap = clamp((t - T('c23') - i * .3) / .3); tf($('w9-m' + i), lerp(x, 540, z), lerp(y, 880, z), (1 - z * .9) * (.6 + .4 * E.back(ap)), r + Math.sin(t * 3 + i) * 2 * (1 - z)); op($('w9-m' + i), ap * (1 - z)); });
    op($('w9-grid'), z); tf($('w9-grid'), 540, 880, lerp(.7, 1, z), 0, 0, 0); $('w9-grid').setAttribute('transform', `translate(${(540 - 540 * lerp(.7, 1, z)).toFixed(1)},${(880 - 880 * lerp(.7, 1, z)).toFixed(1)}) scale(${lerp(.7, 1, z).toFixed(3)})`);
  }
});

// ================= S10: and the customers who never reached your shop =================
addScene('c26', 'c29', {
  svg: bokehBG('w10') + [0, 1, 2, 3].map(i => `<g transform="translate(${[190, 890, 170, 910][i]},${[620, 600, 950, 930][i]})"><g data-bob="10" data-ph="${i}" data-t="c26+${(i * .15).toFixed(2)}">${at(0, 0, uiCard(240, 200) + outfitTile(...OUT6[i + 1], 130), .9)}</g></g>`).join('') +
    `<rect x="0" y="${FLOOR + 40}" width="${W}" height="${H}" fill="#3B1410"/>` + bust('me10', MS, 540, FLOOR + 50, 1.0) +
    wrap('w10-ph', `<rect x="-46" y="-80" width="92" height="160" rx="16" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-37" y="-69" width="74" height="138" rx="9" fill="#FFF2DF"/>`) +
    [[300, 1240, C.pink], [780, 1240, C.teal], [540, 1300, C.marigold]].map(([x, y, c], i) => `<g transform="translate(${x},${y})"><g data-t="c28+${(i * .2).toFixed(1)}" data-k="rise">${at(0, 0, personIcon(c), .9)}</g></g>`).join(''),
  html: KARAOKE + pillH(540, 352, 'c27+0.3', 'Jo dukaan tak <span class="hl">kabhi nahi</span> pahunche', 'big'),
  upd(t) { bokehUpd('w10', t); const { hr } = life('me10', t, { pivot: 0, look: [0.4, 0.5], mouth: 'grin', brows: 'up', tilt: 4, R: [40, -110], hR: 'fist', L: CLASP }); const p = toScene('me10', hr); tf($('w10-ph'), p[0], p[1] - 60, 1, 8); }
});

// ================= S11: CTA — "Aapki shop ke liye bhi aisa platform chahiye? Comment karo SHOP" =================
addScene('c29', 9999, {
  svg: bokehBG('w11') + rosettes('w11-r', 540, 900, .12, C.gold),
  html: KARAOKE + `<div class="title" style="top:440px;font-size:66px" data-t="c29">Aapki shop ke liye bhi<br><span class="g">aisa platform?</span></div>` +
    `<div class="pill big" style="left:540px;top:700px;background:#1F7A4D;color:#fff;border-color:#0F4A2D;font-size:60px;padding:20px 44px" data-t="c31">Comment karo <span class="hl" style="color:#141110">SHOP</span> 👇</div>` +
    `<div class="pill" style="left:540px;top:820px;font-size:34px" data-t="c31+0.3">anokhireet.in</div>` +
    `<div class="follow" style="left:540px;top:1010px" data-t="c31+0.9"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="w11-b"><span id="w11-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    bokehUpd('w11', t); tf($('w11-r'), 540, 900, 1, t * 5);
    const tp = VOICE_END + .8, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('w11-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('w11-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
