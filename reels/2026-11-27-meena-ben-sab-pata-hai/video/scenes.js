// ===== Sab pehle se PATA hai (Meena ben): 16 scenes, timed to the voice (see captions.js) =====
// Teammate wish: something new every 1.5-2 s. Characters: MEENA (reused), CUSTOMER_W, GUEST_W1. New props: trialRoomBG,
// notebookVisitsSVG, moodFaceSVG, rotationBoardSVG, saveIconSVG (engine/props.js); rubberStampSVG (teammate's).
const MS = MEENA.shop, MN = MEENA.night;
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const CU1 = dress(CUSTOMER_W, { skirt: { c: C.pink, d: C.pinkDark, b: C.gold, w: 200 } });
const CU2 = dress(GUEST_W1, { skirt: { c: '#7A4FA0', d: '#5D3A7E', b: C.gold, w: 205 } });
const GIRL = dress(CUSTOMER_W, { top: C.lehenga, topD: C.lehengaDark, pallu: '#E8C25E', necklace: true, skirt: { c: C.lehenga, d: C.lehengaDark, b: C.gold } });
const PURPLE = '#4B2A6B';
const counterCard = (id, label) => `<g id="${id}"><rect x="-190" y="-110" width="380" height="220" rx="24" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><rect x="-190" y="-110" width="380" height="60" rx="24" fill="url(#mar)"/><text y="-68" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#FFF2DF">${label}</text><text id="${id}-n" y="80" text-anchor="middle" font-family="Inter" font-weight="900" font-size="120" fill="${C.red}">60</text></g>`;
const MARKS = [[0, 2], [1, 3], [2, 2], [3, 3], [4, 2], [5, 3], [1, 2], [3, 2], [0, 0], [4, 1]];

// ================= S1-S2: 60 bookings → only 25, racks still full =================
addScene(0, 'c5', {
  svg: shopBG('m1', { noSign: true }) + bust('me1', MS, 330, FLOOR + 30, 1.0) + counterSVG() + `<g transform="translate(790,760)">${counterCard('m1-c', 'Bookings / mahina')}</g>`,
  html: `<div class="title" style="top:410px">Pehle <span class="g">60</span>… ab sirf <span class="g">25</span></div>` +
    `<div class="pill" style="left:190px;top:300px;font-size:30px;padding:8px 22px">Ek kahani</div>` + pillH(790, 1010, 'c3', 'Season ka <span class="hl">3rd mahina</span>'),
  upd(t) {
    const n = Math.round(KF(t, [[T('c2') - .2, 60], [T('c3') + .3, 41], [T('c4') + .3, 25]]));
    $('m1-c-n').textContent = String(n); $('m1-c-n').setAttribute('fill', n <= 30 ? C.red : '#141110');
    life('me1', t, { pivot: 0, look: [0.8, 0], mouth: t > T('c2') ? 'sad' : 'flat', brows: 'worry', tilt: -6, R: THINK, hR: 'fist' });
  }
});

// ================= S3: customers love the collection (trial room, thumbs up) =================
addScene('c5', 'c7', {
  svg: trialRoomBG('m3') + stand('cu3a', CU1, 270, 950, .82) + stand('cu3b', CU2, 810, 950, .82),
  html: pillH(540, 352, 'c5+0.3', 'Ekdum <span class="hl">designer</span> jaisa ✨', 'big'),
  upd(t) {
    life('cu3a', t, { look: [0.4, 0], mouth: 'grin', brows: 'up', tilt: 4, R: [100, -100], hR: 'fist', y: hop(t, T('c6'), 14) });
    life('cu3b', t, { seed: 3, look: [-0.4, 0], mouth: 'big', brows: 'up', tilt: -4, L: [100, -100], hL: 'fist', y: hop(t, T('c6') + .3, 14) });
  }
});

// ================= S4: everyone praises… then quietly goes elsewhere =================
addScene('c7', 'c10', {
  svg: shopBG('m4', { noSign: true, noRail: true }) + bust('me4', MS, 230, FLOOR + 40, .85) + counterSVG() +
    at(680, 820, phoneSVG('m4-ph', 0, 0, 560, 1000,
      `<rect x="-264" y="-468" width="528" height="100" fill="${C.tealDark}"/><circle cx="-200" cy="-418" r="30" fill="${C.goldTan}"/><text x="-154" y="-424" font-family="Inter" font-weight="800" font-size="32" fill="#fff">Meena Rentals</text><text x="-154" y="-390" font-family="Inter" font-weight="500" font-size="24" fill="#D9F2E6">120 members</text>` +
      `<rect x="-264" y="-368" width="528" height="840" fill="#EFE7DA"/>` +
      `<g data-t="c7+0.2" data-k="slideL"><rect x="-240" y="-320" width="430" height="110" rx="22" fill="#fff"/><text x="-216" y="-282" font-family="Inter" font-weight="700" font-size="24" fill="${C.pinkDark}">Priya</text><text x="-216" y="-240" font-family="Inter" font-weight="700" font-size="32" fill="#141110">Lehenga mast tha ben! 😍</text></g>` +
      `<g data-t="c8+0.4" data-k="slideL"><rect x="-240" y="-180" width="460" height="150" rx="22" fill="#fff"/><text x="-216" y="-142" font-family="Inter" font-weight="700" font-size="24" fill="${C.tealDark}">Sejal</text><text x="-216" y="-100" font-family="Inter" font-weight="700" font-size="32" fill="#141110">Is baar kahin aur se</text><text x="-216" y="-58" font-family="Inter" font-weight="700" font-size="32" fill="#141110">le rahi hu</text></g>`), .78),
  html: `<div class="title" style="top:1265px" data-t="c9"><span class="g">KAHIN AUR.</span></div>`, capY: 1420,
  upd(t) { const hurt = t > T('c9'); life('me4', t, { pivot: 0, look: [0.9, 0], mouth: hurt ? 'sad' : 'smile', brows: hurt ? 'worry' : 'up', tilt: hurt ? -6 : 3 }); }
});

// ================= S5: the notebook — "Customer kab gaya?" — they leave on visit 3-4 =================
addScene('c10', 'c16', {
  svg: shopBG('m5', { night: true, noRail: true, noSign: true, lamp: true, lampX: 860 }) + bust('me5', MN, 150, FLOOR + 40, .8) + counterSVG() +
    at(650, 760, notebookVisitsSVG('m5-nb', 6, MARKS), .82, -2) +
    `<g transform="translate(650,760) rotate(-2) scale(.82)"><g data-t="c15+0.3" data-k="write" data-d=".6"><ellipse cx="17" cy="50" rx="200" ry="250" fill="none" stroke="${C.red}" stroke-width="10" stroke-dasharray="6 0"/></g></g>`,
  html: pillH(540, 352, 'c15', '<span class="hl">Teesri-chauthi</span> visit', 'big'),
  cam: (t, lt) => lerp(1, 1.16, E.io(clamp((t - T('c13')) / 1.2))), fx: 700, fy: 800,
  upd(t) {
    MARKS.forEach(([r, c], i) => op($(`m5-nb-x${r}-${c}`), t > T('c12') + i * .25 ? 1 : 0));
    life('me5', t, { pivot: 0, look: [0.9, 0.5], nod: 8, mouth: t > T('c15') ? 'o' : 'flat', brows: t > T('c14') ? 'worry' : 'sure', tilt: -3, R: [40, -30], hR: 'point' });
  }
});

// ================= S6: called 10 customers — "Ben, kapde mast hain… sab pehle se PATA hai" =================
const SAMEX = [200, 540, 880];
addScene('c16', 'c22', {
  svg: splitSVG('m6', shopBG('m6a', { noSign: true }) + bust('me6', MS, 270, FLOOR + 40, .9) + wrap('m6-p1', at(0, 0, phoneBackSVG(.8))),
    homeBG('m6b', { noWindow: true, noShelf: true, noClock: true }) + bust('cu6', CUSTOMER_W, 810, FLOOR + 40, .9) + wrap('m6-p2', at(0, 0, phoneBackSVG(.8)))) +
    SAMEX.map((x, i) => `<g transform="translate(${x},630)"><g data-t="c${19 + i}+0.1" data-k="drop"><rect x="-150" y="-125" width="300" height="250" rx="18" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text y="-75" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${C.red}">Navratri</text><text y="-30" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#141110">Maroon lehenga</text><text y="8" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#141110">Peach choli</text><g data-t="c${19 + i}+0.5" data-d=".3">${at(0, 72, rubberStampSVG('SAME', '#D9363E', 38))}</g></g></g>`).join(''),
  html: pillH(540, 352, 'c16', '<span class="hl">10 customers</span> se poocha', 'big', 'c18-0.05') +
    `<div class="bubble" style="left:540px;top:420px;width:760px" data-t="c18" data-out="c21-0.05">"Ben, kapde <span class="hl">mast</span> hain…"</div>` +
    `<div class="bubble" style="left:540px;top:420px;width:760px" data-t="c21">"…<span class="hl">sab pehle se PATA</span> hai!"</div>`,
  upd(t) {
    const a = life('me6', t, { pivot: 0, look: [0.6, 0], mouth: t > T('c21') ? 'o' : 'smile', brows: t > T('c21') ? 'up' : 'norm', tilt: 4, R: [20, -150], hR: 'fist' });
    const p = toScene('me6', a.hr); tf($('m6-p1'), p[0] + 10, p[1] - 30, 1, 10);
    const b = life('cu6', t, { pivot: 0, seed: 3, look: [-0.6, 0], mouth: t > T('c18') && t < T('c22') ? talkMouth(t, true) : 'smile', brows: 'up', tilt: -4, L: [20, -150], hL: 'fist' });
    const q = toScene('cu6', b.hl); tf($('m6-p2'), q[0] - 10, q[1] - 30, 1, -10);
  }
});

// ================= S7: PSYCHOLOGY — Hedonic Adaptation (purple card, teammate's wish) =================
addScene('c22', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="${PURPLE}"/>` + rosettes('m7-r', 540, 860, .16, C.gold) + `<g transform="translate(540,880)"><g data-t="c22+0.1">${at(0, 0, ideaBulbSVG(), .9)}</g></g>`,
  html: pillH(540, 420, 'c22', 'PSYCHOLOGY', 'gold big') + `<div class="title" style="top:1150px;font-size:86px" data-t="c24"><span class="g">HEDONIC</span><br>ADAPTATION</div>`,
  tin: .3, trans: 'zoom', capY: 1420,
  upd(t) { tf($('m7-r'), 540, 860, 1, t * 6); }
});

// ================= S8: the most beautiful thing, seen again and again, gets boring =================
addScene('c25', 'c29', {
  svg: `<rect width="${W}" height="${H}" fill="#EFE6F5"/>` + `<circle cx="540" cy="700" r="300" fill="url(#glow)"/>` + at(540, 640, lehengaHangerSVG('m8-lh', {}, 1.0)) +
    [['happy', 'Din 1', 'c25+0.1'], ['okay', 'Din 2', 'c26+0.2'], ['bored', 'Din 5', 'c27+0.1']].map(([k, d, tt], i) => `<g transform="translate(${200 + i * 340},1040)"><g data-t="${tt}">${moodFaceSVG(k)}<text y="120" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="#3B2418">${d}</text></g></g>`).join(''),
  html: pillH(540, 352, 'c28', 'Roz ki cheez = <span class="hl">boring cheez</span>', 'big'),
  cam: [1, 1.04]
});

// ================= S9: even a new lehenga — function 1 WOW, function 3 "phir se yahi?" =================
addScene('c29', 'c33', {
  svg: rentalShopBG('m9', { mirrorY: 720 }) + stand('gi9', GIRL, 330, 960, .86),
  html: pillH(540, 352, 'c30', 'Function 1: <span class="hl">WOW</span> 🤩', 'big', 'c31-0.1') + pillH(540, 352, 'c31', 'Function 3: <span class="hl">phir se yahi?</span> 😐', 'big'),
  upd(t) { const meh = t > T('c31'); life('gi9', t, { look: [0.9, -0.1], mouth: meh ? 'flat' : 'grin', brows: meh ? 'worry' : 'up', tilt: meh ? -6 : 5, L: meh ? [9, -14] : CLASP, R: meh ? THINK : CLASP, hR: 'fist', y: meh ? 0 : hop(t, T('c30'), 16) }); }
});

// ================= S10: a ROTATING display — a new collection in front every week =================
const WEEKS = [['Bridal', C.lehenga], ['Pastel', '#F4B9C8'], ['Bandhani', C.marigold], ['Indo-western', C.teal]];
addScene('c33', 'c38', {
  svg: shopBG('m10', { noSign: true, noRail: true }) + `<g transform="translate(450,640)">${rotationBoardSVG('m10-b', WEEKS)}</g>` +
    `<g transform="translate(640,500)"><g data-t="c35+0.2" data-d=".3">${rubberStampSVG('ROTATING', '#D9363E', 46)}</g></g>` + bust('me10', MS, 860, FLOOR + 40, .8) + counterSVG(),
  html: `<div class="title" style="top:1210px;font-size:70px" data-t="c35"><span class="g">ROTATING</span> collection</div>`, capY: 1420,
  init() { for (let i = 0; i < 4; i++) op($(`m10-b-r${i}`), 0); },
  upd(t) {
    for (let i = 0; i < 4; i++) { const k = clamp((t - T('c34') - i * .35) / .3); op($(`m10-b-r${i}`), k); }
    const wk = Math.floor(clamp((t - T('c36')) / 2.4, 0, .999) * 4); for (let i = 0; i < 4; i++) $(`m10-b-r${i}`).querySelector('rect').setAttribute('stroke-width', i === wk && t > T('c36') ? 10 : 4);
    life('me10', t, { pivot: 0, look: [-0.9, -0.2], mouth: 'grin', brows: 'up', tilt: -3, L: [72, 2], hL: 'point' });
  }
});

// ================= S11: Anokhi Reet — new customers who'd never seen the shop =================
const AREAS = [['Navrangpura', -250, -380], ['Maninagar', 250, 250], ['Bopal', -320, 330], ['Satellite', 260, -260], ['Naroda', 0, 480]];
const SHOP = [-90, 120], PINS = [[-250, -430], [250, 200], [-320, 280], [260, -310], [0, 430]];
addScene('c38', 'c44', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><g transform="translate(540,840) scale(.8)">${cityMapSVG('m11-map', AREAS)}${mapSpotSVG('m11-spot')}` +
    PINS.map(([x, y], i) => `<path id="m11-l${i}" d="M${x},${y} L${SHOP[0]},${SHOP[1]}" stroke="${C.red}" stroke-width="6" stroke-dasharray="14 10" fill="none" opacity="0"/>`).join('') +
    `<circle cx="${SHOP[0]}" cy="${SHOP[1] - 40}" r="150" fill="url(#glow)"/><g transform="translate(${SHOP[0]},${SHOP[1]})">${mapPinSVG(C.red, 44)}<g transform="translate(0,-150)"><rect x="-150" y="-30" width="300" height="56" rx="28" fill="url(#mar)" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#FFF2DF">Meena ben's shop</text></g></g>` +
    PINS.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c41+${(i * .25).toFixed(2)}" data-k="drop">${mapPinSVG(C.emerald, 30)}</g></g>`).join('') + `</g>`,
  html: pillH(540, 352, 'c38+0.2', '<span class="hl">Anokhi Reet</span> · naye customers', 'big'),
  cam: [1, 1.04], fy: 840,
  upd(t) {
    const k = E.io(clamp((t - T('c40')) / 1.4)); mapSpot('m11-spot', SHOP[0], SHOP[1] - 40, lerp(180, 520, k)); op($('m11-spot'), 1 - k);
    PINS.forEach((_, i) => { const q = clamp((t - T('c41') - .2 - i * .25) / .4); const el = $('m11-l' + i); op(el, q); el.setAttribute('stroke-dashoffset', (-t * 30).toFixed(0)); });
  }
});

// ================= S12: see on the app, book, come to the shop to try =================
addScene('c44', 'c48', {
  svg: rentalShopBG('m12', { mirrorY: 720 }) + wrap('m12-w', stand('cu12', CU1, 0, 960, .86)) + stand('me12', MS, 820, 965, .84) +
    wrap('m12-ph', `<rect x="-40" y="-70" width="80" height="140" rx="14" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-32" y="-60" width="64" height="120" rx="8" fill="#FFF2DF"/><g transform="translate(0,4) scale(.16)">${lehengaHangerSVG('', {})}</g>`) +
    `<g transform="translate(540,520)"><g data-t="c45" data-k="rise">${toastSVG('Booked ✓', 360)}</g></g>`,
  html: pillH(540, 352, 'c44', 'App pe dekha → <span class="hl">book</span> kiya', 'big', 'c46-0.05') + pillH(540, 352, 'c46', '<span class="hl">Try at shop</span> 👗', 'gold big'),
  upd(t) {
    const [gx, gy] = glide(t, T('c46') - .2, 1.2, -300, 400); tf($('m12-w'), gx, gy, 1);
    const { hr } = life('cu12', t, { seed: 3, look: [0.6, -0.2], mouth: 'big', brows: 'up', tilt: 3, R: [40, -110], hR: 'fist' });
    const p = toScene('cu12', hr); tf($('m12-ph'), p[0] + gx, p[1] + gy - 50, 1, 8);
    life('me12', t, { look: [-0.8, 0], mouth: t > T('c47') ? 'grin' : 'smile', brows: 'up', tilt: -3, L: t > T('c47') ? [62, -36] : CLASP, R: CLASP, hL: 'open' });
  }
});

// ================= S13: in 2 months — 25 back up to 62 =================
addScene('c48', 'c51', {
  svg: shopBG('m13', { noSign: true }) + `<rect x="0" y="440" width="${W}" height="${FLOOR - 440}" fill="${C.cream}" opacity=".5"/>` +
    `<g transform="translate(540,800)"><g data-t="c48"><rect x="-300" y="-200" width="600" height="400" rx="30" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><rect x="-300" y="-200" width="600" height="80" rx="30" fill="#1F7A4D"/><text y="-145" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="#fff">2 mahine</text><text id="m13-n" x="-30" y="110" text-anchor="middle" font-family="Inter" font-weight="900" font-size="190" fill="#1F7A4D">25</text><text x="200" y="90" text-anchor="middle" font-family="Inter" font-weight="900" font-size="120" fill="#1F7A4D">↑</text></g></g>`,
  html: `<div class="title" style="top:430px" data-t="c50">2 mahine: <span class="g">62</span> ↑</div>`,
  init() { for (const i of [0, 2, 3, 5, 6]) op($('m13-h' + i), 0); },
  upd(t) { $('m13-n').textContent = String(Math.round(KF(t, [[T('c49'), 25], [T('c49') + .5, 34], [T('c50') + .4, 62]]))); }
});

// ================= S14: the line — collection gets you started, NEW CUSTOMERS keep you going =================
addScene('c51', 'c55', {
  svg: rentalShopBG('m14', { noMirror: true }) + `<circle cx="540" cy="820" r="460" fill="url(#glow)" opacity=".6"/>` + bust('me14', MS, 540, FLOOR + 20, 1.05) + counterSVG() +
    [[150, 1000, C.pink], [930, 1000, C.teal], [130, 760, C.marigold], [950, 760, '#7A4FA0']].map(([x, y, c], i) => `<g transform="translate(${x},${y})"><g data-t="c53+${(i * .15).toFixed(2)}">${at(0, 0, personIcon(c), 1.2)}</g></g>`).join(''),
  html: `<div class="title" style="top:380px;font-size:66px" data-t="c51">Collection se <span class="g">aata</span> hai…</div>` +
    `<div class="title" style="top:490px;font-size:66px" data-t="c53"><span class="g">NAYE CUSTOMERS</span> se chalta hai</div>`,
  tin: .3, trans: 'fade',
  upd(t) { life('me14', t, { pivot: 0, look: [0, 0], mouth: 'grin', brows: 'sure', tilt: 3, L: CLASP, R: CLASP, blush: .3 }); }
});

// ================= S15: Save + follow Anokhi Reet =================
addScene('c55', 9999, {
  svg: shopBG('m15', { sign: 'ANOKHI REET' }) + rosettes('m15-r', 540, 780, .08, C.goldTan) + bust('me15', MS, 540, FLOOR + 10, 1.1) + counterSVG() +
    `<g transform="translate(880,640)"><g data-t="c57" data-swing="8">${saveIconSVG()}</g></g>`,
  html: pillH(540, 380, 'c55', 'Rental shop ya <span class="hl">boutique?</span>', 'big', 'c58') +
    pillH(880, 760, 'c57+0.2', '<span class="hl">SAVE</span> karo', 'gold') +
    `<div class="follow" style="left:540px;top:400px" data-t="c58+0.2"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="m15-b"><span id="m15-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    tf($('m15-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c58')) / .4);
    const pt = t > T('c57') && t < T('c58');
    life('me15', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, look: pt ? [0.8, -0.4] : [0, 0], R: pt ? [100, -10] : [lerp(9, WAVE(t, T('c58'))[0], E.io(w)), lerp(-14, WAVE(t, T('c58'))[1], E.io(w))], hR: pt ? 'point' : (w > .5 ? 'open' : 'fist') });
    const tp = T('c60') + .6, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('m15-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('m15-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
