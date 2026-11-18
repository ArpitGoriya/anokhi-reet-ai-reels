// ===== Lehenga 2X (Anokhi Didi): 11 scenes, timed to the voice (see captions.js) =====
// Anokhi Didi (DIDI, new) speaks to camera: she lip-syncs (speak) whenever she's on screen.
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const BRIDAL = { c: '#C0262D', d: '#97151B', b: C.gold, dupatta: '#F2A08F' };
const talk = t => t < VOICE_END;
const listCard = `<rect x="-240" y="-330" width="480" height="560" rx="20" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-220" y="-310" width="440" height="330" rx="14" fill="${C.cream}"/>` +
  `<g transform="translate(0,-150) scale(.75)">${lehengaHangerSVG('', BRIDAL)}</g><text x="-220" y="80" font-family="Inter" font-weight="800" font-size="34" fill="#141110">Bridal lehenga</text>` +
  `<text x="-220" y="124" font-family="Inter" font-weight="600" font-size="26" fill="#655C57">Size M · L · Ahmedabad</text><rect x="-220" y="150" width="440" height="64" rx="32" fill="url(#mar)"/><text x="0" y="192" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#FFF2DF">Book karo</text>`;
const AREAS = [['Navrangpura', -250, -380], ['Maninagar', 250, 250], ['Bopal', -320, 330], ['Satellite', 260, -260], ['Naroda', 0, 480]];
const SHOP = [-90, 120], PINS = [[-250, -430], [250, 200], [-320, 280], [260, -310], [0, 430]];

// ================= S1: hook — the lehenga can earn double =================
addScene(0, 'c3', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('d1-r', 540, 900, .12, C.goldTan) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` +
    `<g id="d1-l">${at(0, 0, lehengaHangerSVG('d1-lh', BRIDAL), 1.45)}</g>` + `<rect x="0" y="${FLOOR + 120}" width="${W}" height="${H}" fill="#F3E3C0"/>`,
  html: `<div class="title" style="top:470px;font-size:220px;-webkit-text-stroke:26px #2b0001"><span class="g">2X</span></div>` +
    `<div class="title" style="top:640px;font-size:64px" data-t="c2">kamaai <span class="g">doguna!</span></div>`,
  cam: [1, 1.05], fy: 900,
  upd(t) { tf($('d1-r'), 540, 900, 1, t * 6); tf($('d1-l'), 540, 860 + Math.sin(t * 1.4) * 8, 1, noise(t, 2) * 2); }
});

// ================= S2: "Toh guys, ye hai ek bridal lehenga" — ₹25,000 in 2023 =================
addScene('c3', 'c7', {
  svg: rentalShopBG('d2', { noMirror: true }) + `<circle cx="300" cy="860" r="320" fill="url(#glow)"/>` + at(300, 760, lehengaHangerSVG('d2-lh', BRIDAL), 1.1) +
    priceTag('d2-tag', '₹25,000', 300, 560, 'c6', { fs: 40, swing: 12 }) +
    `<g transform="translate(170,520)"><g data-t="c5+0.3">${at(0, 0, calendarSVG('d2-cal', 'SAAL', '2023'), .5)}</g></g>` + wrap('d2-w', stand('di2', DIDI, 0, 960, .88)),
  html: pillH(540, 352, 'c3+0.3', '<span class="hl">Bridal</span> lehenga'),
  upd(t) {
    const [gx, gy] = glide(t, T('c3') - .2, .9, 1200, 770); tf($('d2-w'), gx, gy, 1);
    const w = clamp((t - T('c3') - .6) / .3) * (1 - clamp((t - T('c4')) / .3)), pt = t > T('c4');
    life('di2', t, { speak: talk(t), look: pt ? [-0.9, 0] : [0, 0], brows: 'up', tilt: 3, R: [lerp(9, WAVE(t, T('c3'))[0], E.io(w)), lerp(-14, WAVE(t, T('c3'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist', L: pt ? [72, 2] : [9, -14], hL: 'point' });
  }
});

// ================= S3: ₹2,500 rent — 10 times = money back, 20 times = double =================
addScene('c7', 'c12', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/>` + rosettes('d3-r', 540, 900, .07, C.goldTan) +
    at(300, 900, coinJarSVG('d3-j1', 10, '₹25,000'), 1.15) + at(780, 900, coinJarSVG('d3-j2', 10, '2X'), 1.15) +
    `<g transform="translate(540,1250)"><g data-t="c8-0.1"><rect x="-150" y="-50" width="300" height="100" rx="50" fill="url(#mar)" stroke="${OL}" stroke-width="${OW}"/><text id="d3-n" y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="56" fill="${C.gold}">0 baar</text></g></g>`,
  html: pillH(540, 352, 'c7', 'Rent: <span class="hl">₹2,500</span>', 'big', 'c9') + pillH(300, 560, 'c9+0.1', 'Paisa <span class="hl">wapas ✓</span>', 'green') +
    `<div class="title" style="top:430px" data-t="c11">20 baar = <span class="g">2X</span></div>`,
  upd(t) {
    jarFill('d3-j1', 10, t, T('c8'), 1.2); jarFill('d3-j2', 10, t, T('c10'), 1.0);
    const n = t < T('c10') ? Math.round(lerp(0, 10, clamp((t - T('c8')) / 1.4))) : Math.round(lerp(10, 20, clamp((t - T('c10')) / 1.2)));
    $('d3-n').textContent = `${n} baar`; tf($('d3-r'), 540, 900, 1, t * 5);
  }
});

// ================= S4: but it went out only 4 times a year =================
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], OUT = [1, 4, 9, 10];
addScene('c12', 'c15', {
  svg: shopBG('d4', { noSign: true, noRail: true }) + `<rect width="${W}" height="${H}" fill="#3B2418" opacity=".12"/>` +
    at(260, 700, lehengaHangerSVG('d4-lh', BRIDAL), 1.0) + at(60, 420, cobwebSVG(1.2)) +
    MONTHS.map((m, i) => `<g transform="translate(${560 + (i % 4) * 120},${570 + (i / 4 | 0) * 118})"><g data-t="c13+${(i * .12).toFixed(2)}"><rect x="-50" y="-50" width="100" height="100" rx="14" fill="#fff" stroke="${OL}" stroke-width="4"/><rect x="-50" y="-50" width="100" height="30" rx="14" fill="${C.red}"/><text y="30" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#141110">${m}</text>${OUT.includes(i) ? `<g data-t="c14+${(.2 + OUT.indexOf(i) * .2).toFixed(1)}"><circle cx="44" cy="-44" r="22" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><path d="M33,-44 l7,7 14,-14" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/></g>` : ''}</g></g>`).join('') +
    bust('di4', DIDI, 700, FLOOR + 40, .66) + counterSVG(),
  html: `<div class="title" style="top:410px" data-t="c14">Saal mein sirf <span class="g">4 baar</span></div>`,
  upd(t) { life('di4', t, { pivot: 0, speak: talk(t), look: [-0.8, -0.3], brows: t > T('c14') ? 'worry' : 'up', tilt: Math.sin(t * 3) * 3, L: [50, -30], hL: 'open' }); }
});

// ================= S5: only the street could see it; the rest of the city didn't know =================
addScene('c15', 'c19', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><g transform="translate(540,840) scale(.8)">${cityMapSVG('d5-map', AREAS)}${mapSpotSVG('d5-spot')}` +
    `<g transform="translate(${SHOP[0]},${SHOP[1]})">${mapPinSVG(C.red, 44)}</g>` +
    [[-30, 60], [-150, 80], [-40, 200]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c16+${(.2 + i * .2).toFixed(1)}">${at(0, 0, personIcon([C.pink, C.teal, C.marigold][i]), .8)}</g></g>`).join('') +
    PINS.map(([x, y], i) => `<g transform="translate(${x},${y + 40})"><g data-t="c17+${(.1 + i * .2).toFixed(1)}"><circle r="40" fill="#fff" stroke="${OL}" stroke-width="4"/><text y="18" text-anchor="middle" font-family="Inter" font-weight="900" font-size="52" fill="${C.red}">?</text></g></g>`).join('') + `</g>`,
  html: pillH(540, 352, 'c16', 'Sirf <span class="hl">gali</span> ke customers', 'big', 'c17-0.05') + pillH(540, 352, 'c17', 'Baaki shehar: <span class="hl">pata hi nahi</span>', 'big'),
  init() { mapSpot('d5-spot', SHOP[0], SHOP[1] - 40, 180); },
  cam: [1, 1.04], fy: 840
});

// ================= S6: the right platform — Anokhi Reet =================
addScene('c19', 'c22', {
  svg: shopBG('d6', { noSign: true }) + bust('di6', DIDI, 330, FLOOR + 30, 1.0) + counterSVG() + wrap('d6-ph', at(0, 0, phoneSVG('d6-p', 0, 0, 560, 1000, arHeader() + listCard), .62)),
  html: pillH(540, 352, 'c20', 'Ek <span class="hl">sahi platform</span>', 'big', 'c21-0.05') + pillH(540, 352, 'c21', '<span class="hl">Anokhi Reet</span>', 'gold big'),
  upd(t) {
    const up = E.back(clamp((t - T('c20') + .2) / .5));
    const { hr } = life('di6', t, { pivot: 0, speak: talk(t), look: [0.6, -0.2], mouth: 'smile', brows: 'up', tilt: 4, R: [lerp(9, 60, up), lerp(-14, -80, up)], hR: 'fist' });
    const p = toScene('di6', hr); tf($('d6-ph'), lerp(1300, p[0] + 230, up), p[1] - 200, 1, -4 * up); op($('d6-ph'), up > 0 ? 1 : 0);
  }
});

// ================= S7: list it once — the whole city can see it =================
addScene('c22', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><g transform="translate(540,840) scale(.8)">${cityMapSVG('d7-map', AREAS)}${mapSpotSVG('d7-spot')}` +
    PINS.map(([x, y], i) => `<path id="d7-l${i}" d="M${x},${y} L${SHOP[0]},${SHOP[1]}" stroke="${C.red}" stroke-width="6" stroke-dasharray="14 10" fill="none" opacity="0"/>`).join('') +
    `<circle cx="${SHOP[0]}" cy="${SHOP[1] - 40}" r="150" fill="url(#glow)"/><g transform="translate(${SHOP[0]},${SHOP[1]})">${mapPinSVG(C.red, 44)}</g>` +
    PINS.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c24+${(i * .2).toFixed(1)}" data-k="drop">${mapPinSVG(C.emerald, 30)}</g></g>`).join('') + `</g>`,
  html: pillH(540, 352, 'c22', 'Ek baar <span class="hl">list karo</span>', 'big', 'c24-0.05') + pillH(540, 352, 'c24', '<span class="hl">Poora shehar</span> dekh sakta hai', 'big') +
    `<div class="pill" style="left:540px;top:1230px" data-t="c24+0.8" data-k="slideL">✓ New booking · <span class="hl">Satellite</span></div>`,
  cam: [1, 1.04], fy: 840,
  upd(t) {
    { const k = E.io(clamp((t - T('c23')) / 1.6)); mapSpot('d7-spot', SHOP[0], SHOP[1] - 40, lerp(180, 520, k)); op($('d7-spot'), 1 - k); }
    PINS.forEach((_, i) => { const k = clamp((t - T('c24') - .2 - i * .2) / .4); const el = $('d7-l' + i); op(el, k); el.setAttribute('stroke-dashoffset', (-t * 30).toFixed(0)); });
  }
});

// ================= S8: you list; showing it to the whole city is our job =================
addScene('c25', 'c28', {
  svg: rentalShopBG('d8', { noMirror: true }) + `<circle cx="540" cy="820" r="460" fill="url(#glow)" opacity=".6"/>` + bust('di8', DIDI, 540, FLOOR + 20, 1.1) + counterSVG(),
  html: pillH(540, 352, 'c25+0.2', 'Aap: <span class="hl">list karo</span>', 'big') + pillH(540, 466, 'c26+0.2', 'Anokhi Reet: <span class="hl">shehar ko dikhana</span>', 'gold big'),
  upd(t) {
    const me = t > T('c26');
    life('di8', t, { pivot: 0, speak: talk(t), look: [0, 0], mouth: 'smile', brows: 'up', tilt: 3, R: me ? [9, -14] : [70, 4], hR: 'point', L: me ? CLASP : [9, -14], nod: me ? Math.max(0, Math.sin((t - T('c27')) * 6)) * 6 : 0 });
  }
});

// ================= S9: just trust, and a little time =================
addScene('c28', 'c30', {
  svg: shopBG('d9', { noSign: true }) + clockSVG('d9-clk', 860, 560, 64) + `<g transform="translate(220,560)"><g data-t="c28+0.2" data-bob="8">${heartPath(0, 0, 3.4)}</g></g>` +
    bust('di9', DIDI, 540, FLOOR + 20, 1.1) + counterSVG(),
  html: pillH(540, 352, 'c28', '<span class="hl">Bharosa</span> + thoda <span class="hl">time</span>', 'big'),
  upd(t) { clockTick('d9-clk', t, 20); life('di9', t, { pivot: 0, speak: talk(t), look: [0, 0], mouth: 'smile', brows: 'norm', tilt: 5, L: [20, -110], R: [20, -110], hL: 'open', hR: 'open', blush: .4 }); }
});

// ================= S10: list your shop today + follow =================
addScene('c30', 9999, {
  svg: shopBG('d10', { sign: 'ANOKHI REET' }) + rosettes('d10-r', 540, 780, .08, C.goldTan) + bust('di10', DIDI, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: pillH(540, 380, 'c30+0.1', 'Shop · <span class="hl">Boutique</span> · Studio', '', 'c31+0.6') +
    pillH(540, 490, 'c31', 'Aaj hi <span class="hl">Anokhi Reet</span> pe list karo!', 'gold big', 'c31+0.6') +
    `<div class="follow" style="left:540px;top:500px" data-t="c31+0.7"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="d10-b"><span id="d10-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    tf($('d10-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c31') - .3) / .4);
    life('di10', t, { pivot: 0, speak: talk(t), mouth: 'big', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c31'))[0], E.io(w)), lerp(-14, WAVE(t, T('c31'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist', L: t > T('c30') && w < .5 ? [130, 10] : [9, -14], hL: 'point' });
    const tp = VOICE_END + .3, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('d10-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('d10-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
