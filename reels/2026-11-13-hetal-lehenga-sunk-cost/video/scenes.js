// ===== Hetal ben's lehenga: 28 scenes, timed to the voice (see captions.js) =====
// Characters come from animation/cast/cast.js; rooms, props and helpers from animation/engine/.
const HOME = HETAL.home, LEH = HETAL.lehenga, PINK = HETAL.pink, EMER = HETAL.emerald;



// ================= S1a: hook — the ₹38,000 lehenga and three weddings =================
addScene(0, 'c3', {
  svg: homeBG('s1', { noWindow: true, noShelf: true, noClock: true, noPlant: false }) +
    `<circle cx="540" cy="820" r="430" fill="url(#glow)"/>` +
    `<g id="s1-l"><g transform="translate(0,0) scale(1.3)">${lehengaHangerSVG('s1-lh')}</g>${priceTag('s1-tag', '₹38,000', 120, -40, -1, { swing: 7 })}</g>` +
    [0, 1, 2].map(i => `<g transform="translate(${[835, 858, 830][i]},${[600, 840, 1080][i]}) rotate(${[-7, 5, -3][i]}) scale(.72)"><g data-t="c2+${i * .22}">${cardSVG('s1-c' + i, 0, 0, i + 1)}</g></g>`).join(''),
  html: `<div class="title" style="top:392px">₹38,000 ki lehenga,<br><span class="g">photo se GAAYAB!</span></div>`,
  cam: [1, 1.04], fy: 820,
  upd(t) { const x = KF(t, [[T('c2') - .1, 540], [T('c2') + .55, 360]]); tf($('s1-l'), x, 720 + Math.sin(t * 1.4) * 5, 1); }
});

// ================= S1b: the wedding photo without Hetal =================
addScene('c3', 'c5', {
  svg: homeBG('s1b', { noWindow: true, noShelf: true, noClock: true }) +
    `<clipPath id="ph1"><rect x="-392" y="-302" width="784" height="604" rx="8"/></clipPath>` +
    `<g transform="translate(540,830)"><rect x="-426" y="-336" width="852" height="672" rx="16" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
    `<g clip-path="url(#ph1)"><rect x="-400" y="-310" width="800" height="620" fill="#F7DCC8"/>` +
    `<g transform="translate(-540,-830)">${torSVG(528)}${fairyLightsSVG(660)}</g>` +
    stand('p1a', GUEST_M, -250, 410, .62).replace('<ellipse', '<ellipse opacity="0"') + stand('p1b', BRIDE, -60, 400, .64) + stand('p1c', GUEST_W2, 140, 410, .62) +
    `<g transform="translate(300,40)"><g data-t="c4" data-k="fade" data-d=".3"><path d="M-120,266 Q-120,128 -60,116 L60,116 Q120,128 120,266" fill="#FFF2DF" fill-opacity=".5" stroke="${C.red}" stroke-width="7" stroke-dasharray="18 12"/><circle cx="0" cy="0" r="58" fill="#FFF2DF" fill-opacity=".5" stroke="${C.red}" stroke-width="7" stroke-dasharray="18 12"/></g>` +
    `<g data-t="c4+0.35"><circle cx="0" cy="0" r="44" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><text x="0" y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#FFF2DF">?</text></g></g>` +
    `</g></g>`,
  html: `<div class="title" style="top:392px">₹38,000 ki lehenga,<br><span class="g">photo se GAAYAB!</span></div>`,
  cam: [1, 1.1], fx: 840, fy: 860,
  init() { for (const id of ['p1a', 'p1b', 'p1c']) { face(id, 1, { mouth: 'big' }); arm(id, 'L', 10, -14, 'fist'); arm(id, 'R', 10, -14, 'fist'); tf($(id + '-eyeL'), 0, 0, 1); } arm('p1b', 'R', 12, -96, 'fist'); arm('p1b', 'L', 12, -96, 'fist'); }
});

// ================= S2: meet Hetal ben from Surat =================
addScene('c5', 'c6', {
  svg: homeBG('s2') + stand('h2', HOME, 560, 940, .95),
  html: pillH(540, 352, 'c5+0.45', 'Surat, <span class="hl">Gujarat</span>'),
  upd(t) {
    const w = clamp((t - T('c5')) / .35) * (1 - clamp((t - T('c6') + .35) / .35));
    const R = [lerp(9, WAVE(t, T('c5'))[0], E.io(w)), lerp(-14, WAVE(t, T('c5'))[1], E.io(w))];
    life('h2', t, { mouth: 'big', brows: 'up', R, hR: w > .5 ? 'open' : 'fist', tilt: 4 });
    clockTick('s2-clk', t, 50);
  }
});

// ================= S3: two years ago — the ₹38,000 lehenga at the cousin's wedding =================
addScene('c6', 'c9', {
  svg: weddingBG() + stand('b3', BRIDE, 800, 960, .86) + stand('h3', LEH, 400, 940, .95) +
    priceTag('s3-tag', '₹38,000', 190, 740, 'c8+0.25', { swing: 12, fs: 36 }),
  html: pillH(540, 352, 'c6+0.1', '<span class="hl">2 saal</span> pehle'),
  upd(t) {
    const happy = t > T('c8');
    life('b3', t, { mouth: 'big', seed: 3, L: CLASP, R: CLASP, tilt: -3 });
    life('h3', t, { mouth: happy ? 'grin' : 'big', brows: happy ? 'up' : 'norm', y: hop(t, T('c8') + .1, 18), L: happy ? CLASP : [9, -14], R: happy ? CLASP : [9, -14], tilt: 3 });
  }
});

// ================= S4: worn once, into the almirah =================
addScene('c9', 'c11', {
  svg: homeBG('s4', { noShelf: true, clockX: 560 }) + almirahSVG('a4', 790, FLOOR + 62, 1) + stand('h4', HOME, 340, 940, .95) +
    `<g id="s4-fly">${lehengaHangerSVG('s4-lh', {}, .75)}</g>`,
  html: pillH(540, 352, 'c9+0.15', 'Sirf <span class="hl">1 baar</span>'),
  init() { $('a4-inside').innerHTML = `<g id="s4-in" transform="translate(0,-330)" opacity="0">${lehengaHangerSVG('s4-lh2', {}, .75)}</g>`; },
  upd(t) {
    const t1 = T('c10') + .1, t2 = t1 + .85, t3 = t2 + .25;
    const holding = t < t1;
    const { hr } = life('h4', t, { mouth: holding ? 'smile' : 'smile', R: holding ? [38, -26] : [9, -14], hR: 'fist', tilt: 3 });
    const hand = toScene('h4', hr);
    const k = E.io(clamp((t - t1) / (t2 - t1)));
    const tgt = [790, FLOOR + 62 - 330];
    const x = lerp(hand[0], tgt[0], k), y = lerp(hand[1] + 70, tgt[1], k) - Math.sin(k * Math.PI) * 160;
    tf($('s4-fly'), x, y, 1, Math.sin(k * Math.PI) * 10);
    op($('s4-fly'), t < t2 ? 1 : 0); op($('s4-in'), t >= t2 ? 1 : 0);
    const close = E.io(clamp((t - t3) / .7));
    tf($('a4-dL'), 0, 0, lerp(.13, 1, close), 0, -150, 0, 1); tf($('a4-dR'), 0, 0, lerp(.13, 1, close), 0, 150, 0, 1);
    clockTick('s4-clk', t, 10);
  }
});

// ================= S5: this season, three weddings =================
addScene('c11', 'c12', {
  svg: homeBG('s5', { noWindow: true, noShelf: true, noClock: true }) +
    [0, 1, 2].map(i => `<g transform="translate(${[250, 540, 830][i]},${[450, 430, 450][i]}) rotate(${[-6, 0, 6][i]}) scale(.86)"><g data-t="c11+${.2 + i * .3}" data-k="drop" data-d=".5">${cardSVG('s5-c' + i, 0, 0, i + 1)}</g></g>`).join('') +
    bust('h5', HOME, 540, FLOOR + 10, 1.1) + counterSVG(),
  upd(t) { const ex = t > T('c11') + .8; life('h5', t, { mouth: ex ? 'grin' : 'o', brows: 'up', pivot: 0, y: hop(t, T('c11') + .8, 14), L: ex ? CLASP : [15, -30], R: ex ? CLASP : [15, -30] }); }
});

// ================= S6: "itni mehengi hai… paise vasool" =================
addScene('c12', 'c15', {
  svg: homeBG('s6', { noShelf: true, noClock: true }) + almirahSVG('a6', 790, FLOOR + 62, 1) + stand('h6', HOME, 340, 940, .95) +
    [[478, 560, 12], [520, 520, 17], [568, 488, 22]].map(([x, y, r], i) => `<g transform="translate(${x},${y})"><g data-t="c13-${.3 - i * .1}"><circle r="${r}" fill="#fff" stroke="${OL}" stroke-width="4"/></g></g>`).join('') +
    [[650, 560], [790, 520], [930, 570]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c14+${.55 + i * .15}" data-bob="6" data-ph="${i}">${coinSVG(0, 0, 30)}</g></g>`).join(''),
  html: `<div class="bubble" style="left:740px;top:430px;width:560px" data-t="c13" data-out="c14">"Itni <span class="hl">mehengi</span> hai…"</div>` +
    `<div class="bubble" style="left:740px;top:430px;width:560px" data-t="c14">Pehnungi toh<br><span class="hl">PAISE VASOOL!</span></div>`,
  init() { $('a6-inside').innerHTML = `<g transform="translate(0,-330)">${lehengaHangerSVG('s6-lh', {}, .75)}</g>`; tf($('a6-dL'), 0, 0, .13, 0, -150, 0, 1); tf($('a6-dR'), 0, 0, .13, 0, 150, 0, 1); },
  upd(t) { const sure = t > T('c14'); life('h6', t, { mouth: sure ? 'grin' : 'flat', brows: sure ? 'up' : 'worry', tilt: sure ? 4 : 8, L: sure ? CLASP : [9, -14], R: sure ? CLASP : [9, -14], y: hop(t, T('c14') + .2, 14) }); }
});

// ================= S7: new blouse, new dupatta, ₹4,500 more =================
addScene('c15', 'c18', {
  svg: homeBG('s7', { noWindow: true, noShelf: true, noClock: true, noPlant: true }) +
    `<g transform="translate(200,640)"><g data-t="c15+0.15" data-bob="7">${blouseIcon()}</g></g>` +
    `<g transform="translate(880,640)"><g data-t="c16+0.1" data-bob="7" data-ph="1.4">${dupattaIcon()}</g></g>` +
    [[330, 480], [750, 470], [880, 520]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c17+${.3 + i * .12}" data-k="drop">${coinSVG(0, 0, 32)}</g></g>`).join('') +
    bust('h7', LEH, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: pillH(200, 800, 'c15+0.35', 'Naya <span class="hl">blouse</span>') + pillH(880, 800, 'c16+0.3', 'Naya <span class="hl">dupatta</span>') +
    pillH(540, 352, 'c17', '+ ₹4,500', 'gold big'),
  upd(t) { const spent = t > T('c17') + .2; life('h7', t, { pivot: 0, mouth: spent ? 'o' : 'smile', brows: spent ? 'worry' : 'up', sweat: spent ? clamp((t - T('c17') - .2) / .3) : 0, L: t > T('c15') + .2 && !spent ? [55, -60] : [9, -14], R: t > T('c16') + .2 && !spent ? [55, -60] : [9, -14], hL: 'open', hR: 'open' }); }
});

// ================= S8: mausi spots the same lehenga =================
addScene('c18', 'c22', {
  svg: weddingBG({ drape: '#D98E7E' }) + stand('m8', MAUSI, 820, 965, .88) + stand('h8', LEH, 290, 960, .88),
  html: pillH(540, 352, 'c18+0.1', 'Shaadi <span class="hl">no. 1</span>', '', 'c20-0.15') +
    `<div class="bubble" style="left:620px;top:372px;width:720px" data-t="c20">"Arre, ye toh <span class="hl">Riya ki shaadi</span> wali hai na?"</div>`,
  upd(t) {
    const pt = E.io(clamp((t - T('c19')) / .5));
    const talking = (t > T('c20') && t < T('c21e') - .1);
    life('m8', t, { seed: 4, look: [-0.8, 0], mouth: talking ? talkMouth(t, true) : (t > T('c19') ? 'o' : 'smile'), brows: t > T('c19') ? 'up' : 'norm', tilt: -5, L: [lerp(9, 68, pt), lerp(-14, -6, pt)], hL: pt > .5 ? 'point' : 'fist' });
    const caught = clamp((t - T('c20') - .3) / .4);
    life('h8', t, { look: caught > .5 ? [0.2, 0.7] : [0.8, 0], mouth: caught > .5 ? 'shy' : 'smile', brows: caught > .5 ? 'worry' : 'norm', blush: caught, sweat: caught, tilt: caught > .5 ? -6 : 3, lean: -caught * 1.5, L: caught > .5 ? CLASP : [9, -14], R: caught > .5 ? CLASP : [9, -14] });
  }
});

// ================= S9: after the third wedding, the phone gallery =================
addScene('c22', 'c24', {
  svg: homeBG('s9', { night: true, noShelf: true, noClock: true, noPlant: true, lamp: true, lampX: 880 }) +
    bust('h9', HOME, 540, FLOOR + 40, 1.1) +
    `<g id="s9-ph"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect id="s9-scr" x="-42" y="-80" width="84" height="160" rx="10" fill="#3A4D6B"/></g>` +
    
    sofaSVG(540, FLOOR + 150),
  html: pillH(540, 352, 'c22+0.1', 'Teesri shaadi ke <span class="hl">baad</span>'),
  upd(t) {
    const { hl, hr } = life('h9', t, { pivot: 0, nod: 10, look: [0, 0.9], tilt: 0, mouth: 'flat', brows: 'norm', L: [6, -112], R: [6, -112] });
    const p = toScene('h9', [(hl[0] + hr[0]) / 2, (hl[1] + hr[1]) / 2 - 40]);
    tf($('s9-ph'), p[0], p[1], 1);
    const on = clamp((t - T('c23') - .4) / .3);
    $('s9-scr').setAttribute('fill', on > .5 ? '#E9F4F8' : '#3A4D6B');
  }
});

// ================= S10: 140 photos… Hetal in only 9 =================
const G10 = [];
(function () { for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) G10.push([c, r]); })();
const HET9 = [2, 5, 8, 11, 13, 16, 19, 20, 23];
addScene('c24', 'c27', {
  svg: `<rect width="${W}" height="${H}" fill="#E5CDAE"/><circle cx="540" cy="880" r="520" fill="url(#glow)"/>` + floorSVG('#8E6640') +
    `<g transform="translate(540,880)"><g data-t="c24-0.05" data-k="rise">` +
    `<rect x="-270" y="-460" width="540" height="920" rx="60" fill="#1E1715" stroke="${OL}" stroke-width="${OW}"/><rect x="-252" y="-442" width="504" height="884" rx="46" fill="#fff"/>` +
    `<rect x="-40" y="-428" width="80" height="20" rx="10" fill="#1E1715"/>` +
    `<text x="-224" y="-356" font-family="Inter" font-weight="800" font-size="40" fill="${C.text}">Gallery</text><text x="224" y="-356" text-anchor="end" font-family="Inter" font-weight="600" font-size="26" fill="${C.textLight}">Shaadi album</text>` +
    `<clipPath id="g10c"><rect x="-240" y="-326" width="480" height="752" rx="20"/></clipPath><g clip-path="url(#g10c)"><g id="g10">` +
    G10.map(([c, r], i) => `<g transform="translate(${-236 + c * 120 + 56},${-320 + r * 124 + 56})"><g data-t="c24+${(.05 + i * .03).toFixed(2)}" data-d=".3">${miniPhoto(-56, -56, 112, 112, i * 7 + 3, HET9.includes(i))}<rect id="g10-x${i}" x="-56" y="-56" width="112" height="112" rx="10" fill="#E5DED6" opacity="0"/><rect id="g10-h${i}" x="-58" y="-58" width="116" height="116" rx="12" fill="none" stroke="${C.gold}" stroke-width="8" opacity="0"/></g></g>`).join('') +
    `</g></g></g></g>`,
  html: `<div class="pill gold big" style="left:540px;top:352px" data-t="c25-0.05" data-out="c26-0.1"><span id="s10-n">0</span> photos</div>` +
    pillH(540, 352, 'c26+0.05', 'Hetal: sirf <span class="hl">9</span>', 'big'),
  cam: [1, 1.02], noSettle: true,
  upd(t) {
    $('s10-n').textContent = Math.round(140 * E.out(clamp((t - T('c25') + .05) / .9)));
    tf($('g10'), 0, -24 * E.io(clamp((t - T('c24')) / 2.5)), 1);
    const g = E.io(clamp((t - T('c26') - .1) / .5));
    G10.forEach((_, i) => { const h = HET9.includes(i); op($('g10-x' + i), h ? 0 : g * .78); op($('g10-h' + i), h ? g : 0); });
  }
});

// ================= S11: hiding behind someone's shoulder =================
addScene('c27', 'c31', {
  svg: `<rect width="${W}" height="${H}" fill="#E5CDAE"/>` + floorSVG('#8E6640') +
    `<clipPath id="ph11"><rect x="94" y="414" width="892" height="852" rx="10"/></clipPath>` +
    `<rect x="64" y="384" width="952" height="912" rx="18" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
    `<g clip-path="url(#ph11)"><rect x="80" y="400" width="920" height="880" fill="#F7DCC8"/>${torSVG(416)}${fairyLightsSVG(560)}` +
    bust('h11', LEH, 890, 1300, .86) + bust('g11c', GUEST_W1, 740, 1290, .95) + bust('g11a', GUEST_M, 250, 1290, .95) + bust('g11b', GUEST_W2, 500, 1290, .95) + `</g>`,
  html: pillH(780, 352, 'c30+0.1', 'Wahi <span class="hl">lehenga</span>'),
  cam: [1, 1.22], fx: 880, fy: 930,
  init() { for (const id of ['g11a', 'g11b', 'g11c']) { face(id, 1, { mouth: 'grin', brows: 'up' }); arm(id, 'L', 9, -14, 'fist'); arm(id, 'R', 9, -14, 'fist'); } arm('h11', 'L', 9, -14, 'fist'); arm('h11', 'R', 9, -14, 'fist'); },
  upd(t) { face('h11', t, { mouth: 'flat', brows: 'worry', sweat: clamp((t - T('c29')) / .4), tilt: -6 }); }
});

// ================= S12: this is called the sunk cost fallacy =================
addScene('c31', 'c33', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s12-r', 540, 760, .16) +
    `<g id="s12-l"><g transform="scale(.82)">${lehengaHangerSVG('s12-lh')}</g>` +
    `<path d="M0,250 V330" stroke="${C.goldTan}" stroke-width="10" stroke-dasharray="14 8"/>` +
    `<path d="M-90,330 L90,330 L120,450 L-120,450 Z" fill="#2b0001" stroke="${C.goldTan}" stroke-width="6" stroke-linejoin="round"/><circle cx="0" cy="318" r="18" fill="none" stroke="${C.goldTan}" stroke-width="8"/>` +
    `<text x="0" y="408" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${C.gold}">₹38,000</text></g>`,
  html: `<div class="title" style="top:1130px;font-size:104px"><span class="g nc" style="display:inline-block" data-t="c32">SUNK</span> <span class="g nc" style="display:inline-block" data-t="c32+0.25">COST</span><br><span class="nc" style="display:inline-block" data-t="c32+0.5">FALLACY</span></div>`,
  noWm: true, cam: [1, 1.03], tin: .3, trans: 'zoom',
  upd(t) { tf($('s12-l'), 540, 470 + 60 * E.io(clamp((t - T('c31')) / 1.6)), 1, noise(t, 2) * 2, 0, -80); tf($('s12-r'), 540, 760, 1, t * 6); }
});

// ================= S13: 1985, Arkes & Blumer, theatre season tickets =================
addScene('c33', 'c37', {
  svg: theatreBG() + `<g id="s13-cal">${calendarSVG('s13-c', 'SAAL', '1985')}</g>` +
    `<g transform="translate(540,600)"><g data-t="c35+0.1" data-swing="6">${ticketSVG(['SEASON', 'TICKET'])}</g></g>` +
    `<g data-t="c34+0.05" data-k="rise">${bust('r13a', LAB_M, 330, FLOOR + 10, 1)}</g><g data-t="c34+0.35" data-k="rise">${bust('r13b', LAB_W, 760, FLOOR + 10, 1)}</g>` +
    counterSVG(FLOOR, '#7A5530'),
  html: pillH(540, 352, 'c34+0.3', 'Arkes &amp; <span class="hl">Blumer</span>'),
  cam: [1, 1.03],
  upd(t) {
    const k = E.io(clamp((t - T('c34') + .1) / .6));
    const s0 = pop(t, T('c33'), .45);
    tf($('s13-cal'), lerp(540, 170, k), lerp(700, 470, k), s0.s * lerp(1.15, .55, k)); op($('s13-cal'), s0.o);
    const exp = t > T('c36');
    life('r13a', t, { pivot: 0, seed: 1, mouth: exp ? 'big' : 'smile', brows: exp ? 'up' : 'norm', nod: exp ? Math.sin((t - T('c36')) * 9) * 3 : 0, R: exp ? [60, -70] : [9, -14], hR: 'point' });
    life('r13b', t, { pivot: 0, seed: 6, mouth: 'smile', brows: 'up', L: [12, -96], R: [12, -96] });
  }
});

// ================= S14: full price vs discount tickets =================
function queuePerson(id, o, x, at) { return `<g data-t="${at}" data-k="rise">${bust(id, o, x, FLOOR + 50, .76)}</g>`; }
addScene('c37', 'c40', {
  svg: wallSVG('#F3E3C0', '#EBD3A8') + floorSVG() +
    `<rect x="380" y="500" width="320" height="${FLOOR - 500}" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><rect x="420" y="640" width="240" height="200" rx="14" fill="#FFF2DF" stroke="${OL}" stroke-width="${OW}"/><rect x="350" y="440" width="380" height="90" rx="16" fill="${C.redDark}" stroke="${OL}" stroke-width="${OW}"/><text x="540" y="503" text-anchor="middle" font-family="Inter" font-weight="900" font-size="48" fill="${C.gold}" letter-spacing="4">TICKETS</text>` +
    `<rect x="380" y="840" width="320" height="26" fill="${C.goldTan}" stroke="${OL}" stroke-width="4"/>` +
    queuePerson('q14a', GUEST_M, 110, 'c37+0.05') + queuePerson('q14b', GUEST_W1, 270, 'c37+0.25') +
    queuePerson('q14c', GUEST_W2, 810, 'c39+0.05') + queuePerson('q14d', LAB_M, 970, 'c39+0.25') +
    `<g transform="translate(190,720) scale(.6)"><g data-t="c38" data-swing="7">${ticketSVG(['POORA', 'DAAM'])}</g></g>` +
    `<g transform="translate(890,720) scale(.6)"><g data-t="c39+0.4" data-swing="7">${ticketSVG(['DISCOUNT', 'TICKET'], '#FFFFFF')}</g></g>`,
  html: pillH(200, 580, 'c37+0.4', 'Poora daam', 'gold') + pillH(880, 580, 'c39+0.3', 'Discount'),
  upd(t) { ['q14a', 'q14b', 'q14c', 'q14d'].forEach((id, i) => life(id, t, { pivot: 0, seed: i * 2, mouth: 'smile', L: [12, -96], R: [12, -96] })); }
});

// ================= S15: full-price people sat through more plays =================
const S15X = [105, 285, 465, 615, 795, 975];
addScene('c40', 'c43', {
  svg: theatreBG() +
    `<g transform="translate(540,560)"><rect x="-150" y="-80" width="300" height="160" rx="16" fill="#2b0001" stroke="${C.goldTan}" stroke-width="6"/><text x="0" y="-18" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="${C.goldTan}" letter-spacing="4">PLAY NO.</text><text id="s15-n" x="0" y="54" text-anchor="middle" font-family="Inter" font-weight="900" font-size="72" fill="${C.gold}">1</text></g>` +
    [0, 1, 2].map(i => bust('s15p' + i, [GUEST_M, GUEST_W1, GUEST_W2][i], S15X[i], FLOOR + 30, .62)).join('') +
    S15X.map(seatSVG).join('') +
    [0, 1, 2].map(i => `<g transform="translate(${S15X[i] + 50},${FLOOR - 270})"><g data-t="c42+${.1 + i * .2}" data-bob="8" data-ph="${i}"><text font-family="Inter" font-weight="900" font-size="44" fill="#FFF2DF" stroke="${OL}" stroke-width="8" paint-order="stroke">Z<tspan font-size="30" dy="-16">z</tspan></text></g></g>`).join(''),
  html: pillH(285, 760, 'c41+0.2', '<span class="hl">Zyaada</span> plays', 'gold') + pillH(795, 1060, 'c41+0.7', 'Kam aaye'),
  upd(t) {
    const n = 1 + Math.floor(clamp((t - T('c41')) / 2.4) * 7.99);
    $('s15-n').textContent = n;
    const sleepy = t > T('c42');
    [0, 1, 2].forEach(i => life('s15p' + i, t, { pivot: 0, seed: i * 3, closed: sleepy && i !== 1, mouth: sleepy ? (i === 1 ? 'o' : 'flat') : 'smile', brows: sleepy ? 'worry' : 'norm', tilt: sleepy ? (i - 1) * 7 : 0, L: [9, -14], R: [9, -14] }));
  }
});

// ================= S16: buffet — the third plate =================
addScene('c43', 'c46', {
  svg: wallSVG('#F6E7CF', '#EFDCBF') +
    `<g transform="translate(540,470)"><path d="M-260,-60 H260 L230,0 L260,60 H-260 L-230,0 Z" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><text x="0" y="20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="58" fill="${C.gold}" letter-spacing="6">BUFFET</text></g>` +
    lampSVG(180, 150) + lampSVG(900, 150) +
    bust('m16', Object.assign({}, GUEST_M, { wide: true, top: '#2F7F7A', topD: '#22605C' }), 540, FLOOR + 10, 1.1) +
    `<g id="s16-plate">${plateSVG(true)}</g>` +
    `<rect x="-20" y="${FLOOR - 20}" width="${W + 40}" height="${H - FLOOR + 20}" fill="#FFF2DF" stroke="${OL}" stroke-width="${OW}"/><path d="M-20,${FLOOR + 40} H${W + 20}" stroke="${C.red}" stroke-width="14"/>` +
    `<g transform="translate(900,${FLOOR - 30})"><path d="M-90,0 A90,80 0 0,1 90,0 Z" fill="${C.goldTan}" stroke="${OL}" stroke-width="${OW}"/><circle cx="0" cy="-86" r="10" fill="${C.goldTan}" stroke="${OL}" stroke-width="4"/></g>` +
    [0, 1].map(i => `<g transform="translate(200,${FLOOR - 26 - i * 22})"><g data-t="c43+${.5 + i * .5}" data-k="drop">${plateSVG(false)}</g></g>`).join(''),
  html: pillH(200, 1050, 'c43+0.6', 'Plate 1, 2...') + pillH(540, 352, 'c45+0.1', 'Plate <span class="hl">no. 3</span>', 'big'),
  upd(t) {
    const full = t > T('c44'), grab = t > T('c45');
    const { hl, hr } = life('m16', t, { pivot: 0, seed: 2, mouth: grab ? 'grin' : (full ? 'flat' : 'smile'), brows: full && !grab ? 'worry' : 'up', sweat: full && !grab ? 1 : 0, L: grab ? [8, -100] : (full ? [4, -70] : [9, -14]), R: grab ? [8, -100] : (full ? [4, -70] : [9, -14]), hL: 'open', hR: 'open' });
    const p = toScene('m16', [(hl[0] + hr[0]) / 2, (hl[1] + hr[1]) / 2 - 30]);
    const s = pop(t, T('c45'), .4);
    tf($('s16-plate'), p[0], p[1], s.s); op($('s16-plate'), s.o);
  }
});

// ================= S17: Hetal did three things =================
addScene('c46', 'c47', {
  svg: homeBG('s17', { noWindow: true, noShelf: true, noClock: true }) +
    [0, 1, 2].map(i => `<g transform="translate(${[220, 540, 860][i]},470) rotate(${[-5, 0, 5][i]})"><g data-t="c46+${.25 + i * .25}">${stepCard(i + 1)}</g></g>`).join('') +
    bust('h17', HOME, 540, FLOOR + 10, 1.1) + counterSVG(),
  upd(t) { const k = E.io(clamp((t - T('c46') - .2) / .4)); life('h17', t, { pivot: 0, mouth: 'smile', brows: 'sure', y: hop(t, T('c46') + .25, 10), R: [lerp(9, 140, k), lerp(-14, 40, k)], hR: 'fist' }); }
});

// ================= S18: step 1 — the maths =================
addScene('c47', 'c51', {
  svg: wallSVG() +
    `<rect x="70" y="420" width="940" height="700" rx="24" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/><rect x="96" y="446" width="888" height="648" rx="12" fill="#2F3E36"/>` +
    `<path id="s18-line" d="M140,860 H760" stroke="#F4EFE3" stroke-width="8" stroke-linecap="round" stroke-dasharray="620" stroke-dashoffset="620"/>` +
    bust('h18', HOME, 905, FLOOR + 10, .74) + counterSVG(),
  html: stepPill(1, 'Hisaab', 'c47+0.05') +
    `<div class="chalk nc" style="top:480px" data-t="c48" data-k="write" data-d=".55">₹38,000</div>` +
    `<div class="chalk nc" style="top:590px" data-t="c48+1.1" data-k="write" data-d=".55">+ ₹4,500</div>` +
    `<div class="chalk nc" style="top:700px" data-t="c49" data-k="write" data-d=".6">÷ 3 baar pehni</div>` +
    `<div class="chalk g nc" style="top:900px" data-t="c50+0.9" data-k="write" data-d=".8">≈ ₹14,000 / baar</div>`,
  cam: [1, 1], noSettle: true,
  upd(t) {
    $('s18-line').setAttribute('stroke-dashoffset', (620 * (1 - E.io(clamp((t - T('c50') - .3) / .5)))).toFixed(0));
    const pt = t > T('c48');
    life('h18', t, { pivot: 0, look: [-0.9, -0.2], mouth: t > T('c50') + 1 ? 'o' : 'flat', brows: t > T('c50') + 1 ? 'up' : 'sure', tilt: -4, L: pt ? [70, 4] : [9, -14], hL: pt ? 'point' : 'fist' });
  }
});

// ================= S19: step 2 — list it for rent =================
addScene('c51', 'c53', {
  svg: homeBG('s19', { noWindow: true, noShelf: true, noClock: true, noPlant: true }) + almirahSVG('a19', 260, FLOOR + 62, .95) +
    phoneSVG('s19-ph', 790, 800, 400, 760,
      `<rect x="-168" y="-300" width="336" height="300" rx="20" fill="#FAF7F3" stroke="#E6E0D9" stroke-width="3"/>` +
      `<g id="s19-card" opacity="0"><g transform="translate(0,-130) scale(.42)">${lehengaHangerSVG('s19-lh2')}</g></g>` +
      `<rect x="-168" y="24" width="250" height="28" rx="8" fill="#F2EEE9"/><rect x="-168" y="66" width="180" height="22" rx="8" fill="#F2EEE9"/>` +
      `<rect x="-168" y="110" width="336" height="64" rx="32" fill="url(#mar)"/><text x="0" y="152" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#FFF2DF">Rent pe do</text>`) +
    `<g id="s19-fly">${lehengaHangerSVG('s19-lh', {}, .7)}</g>`,
  html: stepPill(2, 'Rent pe do', 'c51+0.05') + pillH(790, 1080, 'c52+0.5', 'Listed ✓', 'green big'),
  init() { $('a19-inside').innerHTML = ''; },
  upd(t) {
    const open = E.io(clamp((t - T('c51') - .1) / .5));
    tf($('a19-dL'), 0, 0, lerp(1, .13, open), 0, -150, 0, 1); tf($('a19-dR'), 0, 0, lerp(1, .13, open), 0, 150, 0, 1);
    const t1 = T('c52') - .2, k = E.io(clamp((t - t1) / .8));
    const x = lerp(260, 790, k), y = lerp(FLOOR + 62 - 330 * .95, 670, k) - Math.sin(k * Math.PI) * 180;
    tf($('s19-fly'), x, y, lerp(1, .55, k), Math.sin(k * Math.PI) * -8);
    op($('s19-fly'), (open > .3 ? 1 : 0) * (k < 1 ? 1 : 0));
    op($('s19-card'), k >= 1 ? 1 : 0);
  }
});

// ================= S20: step 3 — rent, don't buy =================
addScene('c53', 'c56', {
  svg: homeBG('s20', { noWindow: true, noShelf: true, noClock: true }) +
    `<g transform="translate(290,820) scale(1.05)"><g data-t="c53+0.15">${bagSVG()}${priceTag('s20-t1', 'Khareedo', 215, -175, 'c53+0.35', { swing: 8, fs: 30 })}</g></g>` +
    `<g transform="translate(290,820)"><path id="s20-x1" d="M-170,-210 L170,190" stroke="${C.red}" stroke-width="30" stroke-linecap="round" stroke-dasharray="530" stroke-dashoffset="530"/><path id="s20-x2" d="M170,-210 L-170,190" stroke="${C.red}" stroke-width="30" stroke-linecap="round" stroke-dasharray="530" stroke-dashoffset="530"/></g>` +
    `<g transform="translate(790,700)"><g data-t="c55">${lehengaHangerSVG('s20-lh', { c: C.pink, d: C.pinkDark, b: C.gold, dupatta: '#F4B9C8' }, 1)}</g></g>` +
    priceTag('s20-t2', 'Rent ₹2,500', 860, 620, 'c55+0.35', { swing: 10, fs: 30 }) + checkBadge(640, 1060, 'c55+0.9'),
  html: stepPill(3, 'Rent pe lo', 'c53+0.05'),
  upd(t) {
    const a = E.io(clamp((t - T('c54') - .1) / .35)), b = E.io(clamp((t - T('c54') - .4) / .35));
    $('s20-x1').setAttribute('stroke-dashoffset', (530 * (1 - a)).toFixed(0)); $('s20-x2').setAttribute('stroke-dashoffset', (530 * (1 - b)).toFixed(0));
  }
});

// ================= S21: 2 months, rented out 5 times, ₹11,000 back =================
const COINS21 = [[-80, 150], [-20, 152], [40, 150], [96, 148], [-52, 116], [8, 118], [68, 116], [-80, 84], [-22, 82], [38, 84], [94, 80], [-50, 50], [10, 48], [70, 50]];
addScene('c56', 'c59', {
  svg: homeBG('s21', { noWindow: true, noShelf: true, noClock: true }) +
    `<g id="s21-cal">${calendarSVG('s21-c', 'MAHINE', '2')}</g>` +
    `<g transform="translate(330,820)">${lehengaHangerSVG('s21-lh', {}, .9)}</g>` +
    [0, 1, 2, 3, 4].map(i => `<g transform="translate(${130 + i * 100},${560 - [0, 40, 56, 40, 0][i]})"><g data-t="c57+${.15 + i * .3}"><circle r="38" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><text y="16" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="${C.gold}">${i + 1}</text></g></g>`).join('') +
    `<g transform="translate(800,1010)">` + jarSVG(0) + COINS21.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c58+${(.05 + i * .07).toFixed(2)}" data-k="drop" data-d=".35">${coinSVG(0, 0, 30)}</g></g>`).join('') + jarSVG(1) + `</g>`,
  html: pillH(800, 700, 'c58+0.2', '₹11,000 <span class="hl">wapas</span>', 'gold big') + pillH(330, 412, 'c57+1.6', '5 baar <span class="hl">rent</span>'),
  upd(t) { const k = E.io(clamp((t - T('c57') + .1) / .6)); const s0 = pop(t, T('c56'), .45); tf($('s21-cal'), lerp(540, 850, k), lerp(640, 470, k), s0.s * lerp(1.1, .55, k)); op($('s21-cal'), s0.o * (1 - clamp((t - T('c58')) / .3))); }
});

// ================= S22: next two weddings, two different looks =================
addScene('c59', 'c61', {
  svg: `<clipPath id="s22l"><rect x="0" y="0" width="540" height="${H}"/></clipPath><clipPath id="s22r"><rect x="540" y="0" width="540" height="${H}"/></clipPath>` +
    `<g clip-path="url(#s22l)">${weddingBG({ drape: '#E59AA5' })}<g data-t="c59+0.1" data-k="rise">${stand('h22a', PINK, 280, 960, .82)}</g></g>` +
    `<g clip-path="url(#s22r)">${weddingBG({ wall: '#F3E3C0', low: '#EBD3A8', drape: '#D6B97A', carpet: '#8E1418' })}<g data-t="c60" data-k="rise">${stand('h22b', EMER, 800, 960, .82)}</g></g>` +
    `<rect x="533" y="0" width="14" height="${H}" fill="#fff" stroke="${OL}" stroke-width="4"/>` + checkBadge(450, 1150, 'c59+0.7', 40) + checkBadge(970, 1150, 'c60+0.5', 40),
  html: pillH(540, 352, 'c60+0.1', '2 shaadi, <span class="hl">2 look</span>', 'big'),
  upd(t) { life('h22a', t, { mouth: 'grin', brows: 'up', tilt: 4, L: CLASP, R: [62, -40], hR: 'open' }); life('h22b', t, { seed: 5, mouth: 'big', brows: 'up', tilt: -4, R: CLASP, L: [62, -40], hL: 'open' }); }
});

// ================= S23: message from Navsari =================
function sangeetPhoto(id) {
  return `<clipPath id="${id}c"><rect x="-150" y="-170" width="300" height="340" rx="16"/></clipPath><g clip-path="url(#${id}c)"><rect x="-160" y="-180" width="320" height="360" fill="#3B1E3E"/>` +
    [...Array(9)].map((_, i) => `<circle cx="${-140 + i * 35}" cy="${-150 + (i % 2) * 14}" r="7" fill="${C.gold}"/>`).join('') +
    `<circle cx="0" cy="-40" r="150" fill="url(#glow)"/>` + `<g transform="translate(0,-10) scale(.36)">${person(id + 'g', Object.assign({}, LEH, { hairStyle: 'braid', skin: '#D19A72', sindoor: false }))}</g></g>`;
}
addScene('c61', 'c67', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><circle cx="540" cy="860" r="520" fill="url(#glow)"/>` + floorSVG() +
    `<g transform="translate(540,860)"><g data-t="c61-0.05" data-k="rise">` +
    `<rect x="-280" y="-480" width="560" height="960" rx="60" fill="#1E1715" stroke="${OL}" stroke-width="${OW}"/><rect x="-262" y="-462" width="524" height="924" rx="46" fill="#F2EEE9"/>` +
    `<path d="M-262,-416 Q-262,-462 -216,-462 L216,-462 Q262,-462 262,-416 L262,-330 L-262,-330 Z" fill="url(#mar)"/>` +
    `<circle cx="-196" cy="-386" r="34" fill="${C.goldTan}" stroke="#FFF2DF" stroke-width="4"/><text x="-196" y="-374" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="${C.redDark}">N</text>` +
    `<text x="-146" y="-394" font-family="Inter" font-weight="800" font-size="32" fill="#FFF2DF">Navsari</text><text x="-146" y="-358" font-family="Inter" font-weight="500" font-size="24" fill="${C.beige}">dulhan ki mummy</text>` +
    `<g transform="translate(-232,-286)"><g data-t="c62+0.3" data-k="slideL"><rect x="0" y="0" width="330" height="70" rx="24" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><text x="24" y="46" font-family="Inter" font-weight="600" font-size="30" fill="${C.text}">Namaste Hetal ben!</text></g></g>` +
    `<g transform="translate(-60,20)"><g data-t="c63" data-k="slideL"><rect x="-172" y="-192" width="344" height="384" rx="26" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>${sangeetPhoto('s23p')}` +
    `<g transform="translate(-60,140)"><g data-t="c64+0.2"><rect x="-80" y="-24" width="160" height="48" rx="24" fill="${C.gold}" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${C.redDark}">Sangeet</text></g></g></g></g>` +
    `<g id="s23-typing" transform="translate(-180,270)" opacity="0"><rect x="-52" y="-30" width="104" height="60" rx="30" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><circle id="s23-d0" cx="-26" cy="0" r="8" fill="#9C928A"/><circle id="s23-d1" cx="0" cy="0" r="8" fill="#9C928A"/><circle id="s23-d2" cx="26" cy="0" r="8" fill="#9C928A"/></g>` +
    `<g transform="translate(-232,240)"><g data-t="c66" data-k="slideL"><rect x="0" y="0" width="390" height="80" rx="26" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><text x="26" y="52" font-family="Inter" font-weight="700" font-size="34" fill="${C.text}">Bahut sundar lagi</text>${heartPath(350, 36, 1.1)}</g></g>` +
    `</g></g>`,
  html: pillH(540, 352, 'c61+0.2', 'Ek din, <span class="hl">Navsari</span> se'),
  cam: [1, 1.05], fy: 860,
  init() { arm('s23pg', 'L', 12, -96, 'fist'); arm('s23pg', 'R', 12, -96, 'fist'); face('s23pg', 1, { mouth: 'grin', brows: 'up' }); },
  upd(t) {
    const ty = t > T('c65') + .1 && t < T('c66');
    op($('s23-typing'), ty ? 1 : 0);
    for (let i = 0; i < 3; i++) tf($('s23-d' + i), 0, ty ? -Math.max(0, Math.sin(t * 9 - i * .9)) * 8 : 0, 1);
  }
});

// ================= S24: she puts it on her status =================
addScene('c67', 'c69', {
  svg: homeBG('s24', { noWindow: true, noShelf: true, noClock: true }) +
    bust('h24', HOME, 380, FLOOR + 10, 1.05) +
    `<g id="s24-ph"><rect x="-50" y="-90" width="100" height="180" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-40" y="-78" width="80" height="156" rx="10" fill="#E9F4F8"/></g>` +
    `<g transform="translate(790,700)"><g data-t="c67+0.35"><circle r="170" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><circle r="160" fill="none" stroke="url(#gold)" stroke-width="16"/><g transform="scale(.82)">${sangeetPhoto('s24p').replace('rx="16"', 'rx="170"')}</g></g></g>` +
    [0, 1, 2].map(i => `<g transform="translate(${700 + i * 90},${470 - (i % 2) * 40})"><g data-t="c68+${.2 + i * .2}" data-bob="10" data-ph="${i}">${heartPath(0, 0, 1.6)}</g></g>`).join('') +
    counterSVG(),
  html: pillH(790, 930, 'c68', 'My <span class="hl">status</span>'),
  init() { arm('s24pg', 'L', 12, -96, 'fist'); arm('s24pg', 'R', 12, -96, 'fist'); face('s24pg', 1, { mouth: 'grin', brows: 'up' }); },
  upd(t) {
    const { hl, hr } = life('h24', t, { pivot: 0, look: [0.6, -0.4], mouth: 'grin', brows: 'up', blush: .8, tilt: 5, L: [6, -112], R: [40, -150], hR: 'fist' });
    const p = toScene('h24', [hr[0], hr[1] - 50]);
    tf($('s24-ph'), p[0], p[1], 1, 12);
  }
});

// ================= S25: the moral =================
addScene('c69', 'c73', {
  svg: `<rect width="${W}" height="${H}" fill="#FFF2DF"/>` + rosettes('s25-r', 540, 880, .12, C.goldTan) + `<rect x="0" y="${FLOOR + 80}" width="${W}" height="${H}" fill="#F3E3C0"/>` +
    stand('h25', LEH, 540, 1000, .82),
  html: `<div class="title" style="top:372px;font-size:78px" data-t="c69+0.05">Keemat <span class="g">TAG</span> se nahi…</div>` +
    `<div class="title" style="top:490px;font-size:78px" data-t="c71"><span class="g">kitni baar pehni,</span> usse!</div>`,
  noWm: false, cam: [1, 1.04], tin: .35, trans: 'fade',
  upd(t) { const open = E.io(clamp((t - T('c71') - .1) / .5)); tf($('s25-r'), 540, 880, 1, t * 5); life('h25', t, { mouth: 'grin', brows: 'up', tilt: 3, sway: 2.2, L: [lerp(9, 62, open), lerp(-14, -36, open)], R: [lerp(9, 62, open), lerp(-14, -36, open)], hL: open > .5 ? 'open' : 'fist', hR: open > .5 ? 'open' : 'fist' }); }
});

// ================= S26: follow Anokhi Reet =================
addScene('c73', 9999, {
  svg: homeBG('s26', { noWindow: true, noShelf: true, noClock: true }) + rosettes('s26-r', 540, 780, .1, C.goldTan) + bust('h26', HOME, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: `<div class="follow" style="left:540px;top:500px" data-t="c73+0.2"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="s26-b"><span id="s26-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    const w = clamp((t - T('c73') - .1) / .4);
    life('h26', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c73'))[0], E.io(w)), lerp(-14, WAVE(t, T('c73'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist' });
    const tp = T('c74') + .7, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('s26-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('s26-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
