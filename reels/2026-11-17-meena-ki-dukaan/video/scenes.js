// ===== Meena ki dukaan (Episode 1): 21 scenes, timed to the voice (see captions.js) =====
// Characters: MEENA, PATI (new), CUSTOMER_W, GUEST_W1 from animation/cast/cast.js. Sets/props from animation/engine/.
const MS = MEENA.shop, MN = MEENA.night;
const CUST_F = dress(CUSTOMER_W, { skirt: { c: C.teal, d: C.tealDark, b: C.gold, w: 205 } });
const CUST_L = dress(CUSTOMER_W, { pallu: '#F7C548', skirt: { c: C.lehenga, d: C.lehengaDark, b: C.gold, w: 215 }, necklace: true });
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
// dust motes drifting off the hangers
const DUST = [...Array(14)].map((_, i) => [80 + (i * 73) % 920, 560 + (i * 131) % 380]);
const dustSVG = p => DUST.map((_, i) => `<circle id="${p}-d${i}" r="${5 + (i % 3) * 3}" fill="#FFFFFF" opacity=".6"/>`).join('');
function dustUpd(p, t) { DUST.forEach(([x, y], i) => { const k = ((t * .25 + i * .13) % 1); tf($(`${p}-d${i}`), x + Math.sin(t + i) * 14, y - k * 160, 1); op($(`${p}-d${i}`), Math.sin(k * Math.PI) * .7); }); }

// ================= S1: hook — 200 lehengas, the biggest loss =================
addScene(0, 'c6', {
  svg: shopBG('m1', { noSign: true }) + `<rect width="${W}" height="${H}" fill="#3B2418" opacity=".08"/>` + dustSVG('m1') +
    at(0, 470, cobwebSVG(1.1)) + at(W, 470, cobwebSVG(1.1), 1, 90) +
    bust('me1', MS, 540, FLOOR + 30, 1.05) + counterSVG(),
  html: `<div class="title" style="top:420px">200 lehenge…<br><span class="g">sabse bada NUKSAAN?</span></div>`,
  cam: (t, lt) => lerp(1, 1.12, E.io(clamp((t - T('c3')) / 3))), fy: 760,
  upd(t) { dustUpd('m1', t); const sad = t > T('c3'); life('me1', t, { pivot: 0, look: sad ? [0, 0.8] : [-0.4, -0.3], mouth: sad ? 'sad' : 'flat', brows: 'worry', tilt: -6, nod: sad ? 8 : 0, R: THINK, hR: 'fist' }); }
});

// ================= S2: meet Meena, Ahmedabad =================
addScene('c6', 'c8', {
  svg: rentalShopBG('m2', { noMirror: true }) + stand('me2', MS, 540, 950, .92),
  html: pillH(540, 352, 'c6+0.1', '<span class="hl">Ahmedabad</span>, Gujarat'),
  upd(t) { const w = clamp((t - T('c6') - .1) / .35); life('me2', t, { mouth: 'big', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c6'))[0], E.io(w)), lerp(-14, WAVE(t, T('c6'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist' }); }
});

// ================= S3: all day, WhatsApp photos one by one =================
addScene('c8', 'c10', {
  svg: shopBG('m3', { noSign: true, noRail: true }) + bust('me3', MS, 250, FLOOR + 40, .9) + counterSVG() +
    phoneSVG('m3-ph', 700, 820, 400, 800, chatScreen('m3c', 6)),
  html: pillH(540, 352, 'c8+0.2', 'Photo… photo… <span class="hl">photo…</span>'),
  init() { for (let i = 0; i < 6; i++) op($('m3c-m' + i), 0); },
  upd(t) {
    for (let i = 0; i < 6; i++) { const k = clamp((t - T('c8') - .3 - i * .45) / .25); op($('m3c-m' + i), k); }
    life('me3', t, { pivot: 0, look: [0.8, 0.2], mouth: 'flat', brows: 'worry', tilt: 4, R: [70, 4], hR: 'point', nod: Math.max(0, Math.sin(t * 8)) * 4 });
  }
});

// ================= S4: 30 lehengas opened, size? date? =================
const PILE = [C.lehenga, C.pink, C.emerald, C.marigold, C.teal, '#7A4FA0', '#C0262D', C.marigold2, C.pink, C.emerald];
addScene('c10', 'c12', {
  svg: shopBG('m4', { noSign: true }) + bust('me4', MS, 720, FLOOR + 30, 1.0) + counterSVG() +
    PILE.map((c, i) => `<g transform="translate(${300 + (i % 2) * 14},${FLOOR - 10 - i * 34})"><g data-t="c10+${(.1 + i * .12).toFixed(2)}" data-k="drop" data-d=".3"><rect x="-170" y="-20" width="340" height="40" rx="14" fill="${c}" stroke="${OL}" stroke-width="4"/><path d="M-150,6 H150" stroke="${C.gold}" stroke-width="6"/></g></g>`).join(''),
  html: pillH(540, 352, 'c10', '<span class="hl" id="m4-n">1</span> lehenge khole', 'big') +
    `<div class="bubble" style="left:780px;top:520px" data-t="c11">"Size?"</div><div class="bubble" style="left:900px;top:660px" data-t="c11+0.6">"Date?"</div>`,
  upd(t) { $('m4-n').textContent = String(Math.max(1, Math.round(lerp(1, 30, E.out(clamp((t - T('c10')) / 1.4)))))); life('me4', t, { pivot: 0, look: [-0.8, 0.5], mouth: 'worry', brows: 'worry', sweat: clamp((t - T('c11')) / .3), tilt: -4, L: [50, -30], hL: 'open', R: [20, -60] }); }
});

// ================= S5: two hours, "Didi, main sochkar batati hoon", never came back =================
addScene('c12', 'c16', {
  svg: shopBG('m5', { noSign: true }) + clockSVG('m5-clk', 540, 560, 70) +
    wrap('m5-cw', bust('cu5', CUSTOMER_W, 280, FLOOR + 20, 1.0)) + bust('me5', MS, 800, FLOOR + 20, 1.0) + counterSVG() +
    [0, 1, 2, 3, 4].map(i => at(260 + i * 140, FLOOR + 40, lehengaHangerSVG('', { c: PILE[i], d: OL }, .45), 1, -80 + i * 35)).join(''),
  html: pillH(540, 352, 'c12', '<span class="hl">2 ghante</span> baad…', 'big', 'c14-0.1') +
    `<div class="bubble" style="left:400px;top:440px;width:640px" data-t="c14">"Didi, main <span class="hl">sochkar batati</span> hoon."</div>`,
  upd(t) {
    clockTick('m5-clk', t, 0); const spin = clamp((t - T('c12')) / 1.6); tf($('m5-clk-m'), 0, 0, 1, spin * 720 * 2); tf($('m5-clk-h'), 0, 0, 1, 60 + spin * 60);
    const [gx, gy] = glide(t, T('c15') + .1, 1.0, 0, -620);
    tf($('m5-cw'), gx, gy, 1);
    life('cu5', t, { pivot: 0, seed: 3, look: t < T('c14') ? [0.4, 0.6] : [0.8, 0], speak: t > T('c14') && t < T('c15'), mouth: 'smile', brows: 'norm', tilt: 3 });
    const left = t > T('c15') + .3;
    life('me5', t, { pivot: 0, look: left ? [-0.9, 0] : [-0.8, 0], mouth: left ? 'sad' : 'smile', brows: left ? 'worry' : 'up', tilt: left ? -6 : 3, L: left ? [9, -14] : CLASP, R: left ? THINK : CLASP });
  }
});

// ================= S6: one lehenga, one date, promised to two customers =================
addScene('c16', 'c20', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('m6-r', 540, 800, .07, C.goldTan) +
    `<g transform="translate(540,560)"><g data-t="c16+0.1">${at(0, 0, calendarSVG('m6-cal', 'DATE', '14'), .8)}<g data-t="c17+0.2" data-k="write" data-d=".5"><circle r="96" fill="none" stroke="${C.red}" stroke-width="10" transform="translate(0,14)"/></g></g></g>` +
    at(540, 960, lehengaHangerSVG('m6-lh', {}, .9)) +
    wrap('m6-a', at(190, 1000, personIcon(C.pink), 1.7)) + wrap('m6-b', at(890, 1000, personIcon(C.teal), 1.7)) +
    `<g transform="translate(330,940)"><g data-t="c18+0.2" data-k="slideL"><path d="M0,0 H70 M50,-20 L70,0 L50,20" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>` +
    `<g transform="translate(750,940)"><g data-t="c18+0.5" data-k="slideR"><path d="M0,0 H-70 M-50,-20 L-70,0 L-50,20" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>` +
    `<g transform="translate(540,770)"><g data-t="c18+0.9"><circle r="44" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><text y="18" text-anchor="middle" font-family="Inter" font-weight="900" font-size="52" fill="#fff">!!</text></g></g>`,
  html: pillH(540, 352, 'c18+0.2', '1 lehenga, <span class="hl">2 promise</span>', 'big') + pillH(700, 1230, 'c19+0.2', 'Naraaz', 'maroon'),
  upd(t) { const k = E.io(clamp((t - T('c19') - .3) / .8)); tf($('m6-b'), k * 260, 0, 1); op($('m6-b'), 1 - k); }
});

// ================= S7: that night, the husband asks =================
addScene('c20', 'c22', {
  svg: shopBG('m7', { night: true, noRail: true, noSign: true, lamp: true, lampX: 540 }) +
    bust('me7', MN, 300, FLOOR + 20, 1.0) + bust('pa7', PATI, 800, FLOOR + 20, 1.0) + counterSVG() + at(380, FLOOR + 40, ledgerSVG(), .7, -4),
  html: `<div class="bubble" style="left:640px;top:470px;width:700px" data-t="c21-0.05">"Is mahine kitne lehenge <span class="hl">rent pe gaye?</span>"</div>`,
  upd(t) {
    life('pa7', t, { pivot: 0, seed: 7, look: [-0.8, 0.2], speak: t > T('c21') && t < T('c22') - .1, mouth: 'smile', brows: 'up', tilt: -4 });
    life('me7', t, { pivot: 0, look: t > T('c21') ? [0.8, 0] : [0, 0.9], mouth: 'flat', brows: 'worry', tilt: 3, L: [24, -40], R: [30, -50] });
  }
});

// ================= S8: the register — only 18 of 200 =================
addScene('c22', 'c24', {
  svg: shopBG('m8', { night: true, noRail: true, noSign: true }) + `<circle cx="540" cy="880" r="460" fill="url(#glow)"/>` + at(540, 900, ledgerSVG(), 1.9, -3) +
    `<g transform="translate(470,1010)"><g data-t="c23+0.3"><text x="0" y="0" text-anchor="middle" font-family="Inter" font-weight="900" font-size="120" fill="${C.red}" transform="rotate(-6)" id="m8-n">0</text></g></g>`,
  html: `<div class="title" style="top:470px" data-t="c23+0.2">Sirf <span class="g">18</span> / 200</div>`,
  cam: [1, 1.08], fy: 880,
  upd(t) { $('m8-n').textContent = String(Math.round(lerp(0, 18, E.out(clamp((t - T('c23') - .3) / .8))))); }
});

// ================= S9: 182 hung on the hanger all month =================
addScene('c24', 'c26', {
  svg: shopBG('m9', { noSign: true }) + `<rect x="0" y="440" width="${W}" height="${FLOOR - 440}" fill="#7A6E62" opacity=".35"/>` + dustSVG('m9') +
    at(40, 470, cobwebSVG(1)) + at(W - 40, 470, cobwebSVG(1), 1, 90) + at(540, 470, cobwebSVG(.7), 1, 45),
  html: pillH(540, 352, 'c24+0.2', '<span class="hl">182</span> lehenge, poora mahina…', 'big') + pillH(540, 1180, 'c25+0.4', 'Hanger pe <span class="hl">latke rahe</span>'),
  cam: [1.05, 1], fy: 800,
  upd(t) { dustUpd('m9', t); }
});

// ================= S10: a famous business idea (title card) =================
addScene('c26', 'c27', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('m10-r', 540, 820, .14, C.gold) + `<g transform="translate(540,860)"><g data-t="c26+0.1">${at(0, 0, ideaBulbSVG(), 1.1)}</g></g>`,
  html: `<div class="title" style="top:470px">Business ki <span class="g">mashhoor baat</span></div>`,
  tin: .3, trans: 'zoom',
  upd(t) { tf($('m10-r'), 540, 820, 1, t * 6); }
});

// ================= S11: an empty hotel room tonight = tonight's income gone =================
addScene('c27', 'c30', {
  svg: hotelRoomBG('m11') + `<g transform="translate(540,520)">${at(0, 0, calendarSVG('m11-c0', 'KAL', '15'), .6)}<g id="m11-pg">${at(0, 0, calendarSVG('m11-c1', 'AAJ', '14'), .6)}</g></g>` +
    `<g id="m11-coin" opacity="0">${coinSVG(0, 0, 40)}</g>`,
  html: pillH(540, 352, 'c27+0.3', 'Hotel ka kamra: <span class="hl">khaali</span>', '', 'c29-0.1') + pillH(540, 352, 'c29', 'Aaj ki kamaai: <span class="hl">hamesha ke liye gayi</span>', 'big'),
  upd(t) {
    const k = E.in(clamp((t - T('c28') - .3) / 1.1));
    tf($('m11-pg'), k * 520, -k * 380 + Math.sin(k * Math.PI) * -80, 1, k * 70); op($('m11-pg'), 1 - clamp((k - .7) / .3));
    const q = clamp((t - T('c28') - .4) / 1.1); tf($('m11-coin'), 540 + q * 480, 560 - q * 420, 1, q * 360); op($('m11-coin'), q > 0 && q < 1 ? 1 : 0);
  }
});

// ================= S12: a lehenga is the same — each wedding date unrented is gone =================
const DATES = ['12', '13', '14', '15', '16'];
addScene('c30', 'c35', {
  svg: shopBG('m12', { noSign: true, noRail: true }) + `<circle cx="330" cy="880" r="360" fill="url(#glow)"/>` + at(330, 820, lehengaHangerSVG('m12-lh', {}, 1.15)) +
    `<g transform="translate(790,820)">` + DATES.map((d, i) => `<g id="m12-p${DATES.length - 1 - i}">${at(0, 0, calendarSVG('m12-c' + i, 'SHAADI', DATES[DATES.length - 1 - i]), .75)}</g>`).join('') + `</g>`,
  html: pillH(540, 352, 'c30', 'Lehenga bhi <span class="hl">aisa hi</span>', '', 'c33-0.1') + `<div class="title" style="top:430px" data-t="c33">Date gayi… <span class="g">kamaai gayi</span></div>`,
  upd(t) {
    for (let i = 0; i < DATES.length - 1; i++) { const k = E.in(clamp((t - T('c31') - i * .75) / .8)); tf($('m12-p' + i), k * 380, -k * 420, 1, k * 60); op($('m12-p' + i), 1 - clamp((k - .6) / .4)); }
  }
});

// ================= S13: the problem was not stock — nobody could SEE it =================
addScene('c35', 'c38', {
  svg: shopBG('m13', { noSign: true }) + `<rect width="${W}" height="${H}" fill="#1E1715" opacity=".55"/>` +
    `<circle id="m13-spot" cx="540" cy="760" r="220" fill="#FFF2DF" opacity=".22"/>` +
    [0, 1, 2, 3].map(i => wrap('m13-p' + i, at(0, 0, personIcon([C.pink, C.teal, C.marigold, '#7A4FA0'][i]), 1.3))).join(''),
  html: pillH(540, 352, 'c35+0.2', 'Problem: <span class="hl">stock nahi…</span>', '', 'c37-0.1') + `<div class="title" style="top:430px" data-t="c37">Stock <span class="g">DIKH</span> nahi raha tha</div>`,
  upd(t) {
    $('m13-spot').setAttribute('cx', (540 + Math.sin(t * 1.4) * 330).toFixed(0));
    for (let i = 0; i < 4; i++) { const x = ((t * 140 + i * 300) % 1500) - 200; tf($('m13-p' + i), x, 1230 - Math.abs(Math.sin(t * 6 + i)) * 10, 1); }
  }
});

// ================= S14: the next morning, three things =================
addScene('c38', 'c40', {
  svg: rentalShopBG('m14', { noMirror: true }) + `<circle cx="760" cy="800" r="420" fill="url(#glow)" opacity=".7"/>` +
    [0, 1, 2].map(i => `<g transform="translate(200,${620 + i * 230})"><g data-t="c39+${(.1 + i * .2).toFixed(1)}">${at(0, 0, stepCard(i + 1), .85)}</g></g>`).join('') +
    bust('me14', MS, 690, FLOOR + 10, 1.05) + counterSVG() + wrap('m14-chai', chaiSVG()) + wrap('m14-ph', `<rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-42" y="-80" width="84" height="160" rx="10" fill="#E9F4F8"/>`),
  html: `<div class="title" style="top:410px" data-t="c39"><span class="g">3</span> kaam</div>`,
  upd(t) {
    const { hl, hr } = life('me14', t, { pivot: 0, look: [-0.3, -0.4], mouth: 'smile', brows: 'sure', tilt: 4, L: [24, -60], R: [30, -110], hR: 'fist', y: hop(t, T('c39'), 14) });
    const a = toScene('me14', hl), b = toScene('me14', hr);
    tf($('m14-chai'), a[0], a[1] - 30, .8); tf($('m14-ph'), b[0], b[1] - 60, .8, 10);
  }
});

// ================= S15: step 1 — listed with photo, size, price; one online shop link =================
const gridCard = (x, y, c, d, i) => `<g transform="translate(${x},${y})"><g data-t="c41+${(.1 + i * .2).toFixed(1)}" data-k="rise"><rect x="-112" y="-150" width="224" height="300" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-100" y="-138" width="200" height="190" rx="10" fill="${C.cream}"/><g transform="translate(0,-60) scale(.42)">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan })}</g><text x="-96" y="90" font-family="Inter" font-weight="700" font-size="24" fill="#655C57">Size M · L</text><text x="-96" y="128" font-family="Inter" font-weight="800" font-size="26" fill="#141110">Rent ✓</text></g></g>`;
addScene('c40', 'c45', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><circle cx="540" cy="860" r="520" fill="url(#glow)"/>` +
    at(540, 830, phoneSVG('m15-ph', 0, 0, 560, 1000, arHeader() + gridCard(-125, -170, C.lehenga, C.lehengaDark, 0) + gridCard(125, -170, C.pink, C.pinkDark, 1) + gridCard(-125, 160, C.emerald, C.emeraldDark, 2) + gridCard(125, 160, C.marigold, '#C9821E', 3) +
      `<g id="m15-btn"><rect x="-190" y="350" width="380" height="72" rx="36" fill="url(#mar)"/><text x="0" y="398" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#FFF2DF">Shop link share karo</text></g>`), .85) +
    `<g id="m15-link" opacity="0"><rect x="-260" y="-44" width="520" height="88" rx="44" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text x="0" y="12" text-anchor="middle" font-family="Inter" font-weight="800" font-size="32" fill="${C.red}">🔗 Meena's Shop: sab lehenge</text></g>`,
  html: stepPill(1, 'Online shop', 'c40'),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const press = t > T('c44') && t < T('c44') + .2 ? .94 : 1; tf($('m15-btn'), 0, 0, press, 0, 0, 386);
    const k = E.out(clamp((t - T('c44') - .1) / .7)); tf($('m15-link'), 540, lerp(1180, 1120, k), lerp(.6, 1, k)); op($('m15-link'), k);
  }
});

// ================= S16: step 2 — online booking with a date; no double promise =================
const DAYS = [...Array(28)].map((_, i) => i + 1);
addScene('c45', 'c49', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/>` +
    at(540, 830, phoneSVG('m16-ph', 0, 0, 560, 1000, arHeader() +
      `<text x="0" y="-320" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="#141110">Booking: date chuno</text>` +
      DAYS.map((d, i) => { const x = -195 + (i % 7) * 65, y = -230 + ((i / 7) | 0) * 80; return `<g transform="translate(${x},${y})"><rect id="m16-d${d}" x="-28" y="-30" width="56" height="60" rx="14" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#141110">${d}</text></g>`; }).join('') +
      `<g transform="translate(0,170)"><g data-t="c46+0.3" data-k="rise">${toastSVG('14 · Booked ✓', 440)}</g></g>` +
      `<g transform="translate(0,300)"><g data-t="c48" data-k="rise"><rect x="-220" y="-46" width="440" height="92" rx="26" fill="#FBE7E7" stroke="#B23B3B" stroke-width="4"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#B23B3B">14 · Not available</text></g></g>`), .85),
  html: stepPill(2, 'Date ke saath booking', 'c45') + pillH(540, 1180, 'c47+0.2', '1 lehenga = <span class="hl">1 promise</span>', 'gold'),
  upd(t) { const on = t > T('c46') + .1; $('m16-d14').setAttribute('fill', on ? C.emerald : '#F2EEE9'); $('m16-d14').setAttribute('stroke', on ? OL : '#E6E0D9'); }
});

// ================= S17: step 3 — choose on the app, come to the shop only to try =================
addScene('c49', 'c52', {
  svg: rentalShopBG('m17', { mirrorY: 720 }) + wrap('m17-w', stand('cu17', CUST_F, 0, 950, .9)) + wrap('m17-t', stand('cu17b', CUST_L, 400, 950, .9)) +
    stand('me17', MS, 820, 960, .86) + wrap('m17-ph', `<rect x="-40" y="-70" width="80" height="140" rx="14" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-32" y="-60" width="64" height="120" rx="8" fill="#FFF2DF"/><g transform="translate(0,4) scale(.16)">${lehengaHangerSVG('', {})}</g>`),
  html: stepPill(3, 'Shop pe sirf try', 'c49') + pillH(400, 1250, 'c51+0.6', 'Pasand ✓', 'green big'),
  upd(t) {
    const [gx, gy] = glide(t, T('c49') + .1, 1.1, -300, 330); tf($('m17-w'), gx, gy, 1);
    const tr = clamp((t - T('c51') + .1) / .35); op($('m17-w'), 1 - tr); op($('m17-t'), tr);
    const { hr } = life('cu17', t, { seed: 3, look: [0.6, -0.2], mouth: 'big', brows: 'up', tilt: 3, R: [40, -110], hR: 'fist' });
    const p = toScene('cu17', hr); tf($('m17-ph'), p[0] + gx, p[1] + gy - 50, 1, 8); op($('m17-ph'), 1 - tr);
    life('cu17b', t, { seed: 3, look: [0.6, 0], mouth: 'grin', brows: 'up', tilt: 5, L: CLASP, R: CLASP, y: hop(t, T('c51') + .4, 16), blush: .5 });
    life('me17', t, { look: [-0.8, 0], mouth: 'grin', brows: 'up', tilt: -3, L: CLASP, R: CLASP });
  }
});

// ================= S18: customers from other areas too =================
const AREAS = [['Navrangpura', -250, -380], ['Maninagar', 250, 250], ['Bopal', -320, 330], ['Satellite', 260, -260], ['Naroda', 0, 480]];
const PINS = [[-250, -430], [250, 200], [-320, 280], [260, -310], [0, 430]];
addScene('c52', 'c57', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/>` +
    `<g transform="translate(540,840) scale(.8)">${cityMapSVG('m18-map', AREAS)}` +
    PINS.map(([x, y], i) => `<path id="m18-l${i}" d="M${x},${y} L0,0" stroke="${C.red}" stroke-width="6" stroke-dasharray="14 10" fill="none" opacity="0"/>`).join('') +
    `<circle r="140" fill="url(#glow)"/>` + `<g data-t="c52+0.1" data-k="drop">${mapPinSVG(C.red, 46)}<g transform="translate(0,-170)"><rect x="-130" y="-30" width="260" height="56" rx="28" fill="url(#mar)" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#FFF2DF">Meena's Shop</text></g></g>` +
    PINS.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c53+${(.1 + i * .3).toFixed(1)}" data-k="drop">${mapPinSVG(C.emerald, 28)}</g></g>`).join('') + `</g>`,
  html: pillH(540, 352, 'c53', '<span class="hl">Doosre area</span> se bhi', 'big') +
    `<div class="pill" style="left:540px;top:470px" data-t="c54+0.2" data-k="slideR">✓ New booking · <span class="hl">Bopal</span></div>` +
    `<div class="pill" style="left:540px;top:1230px" data-t="c55+0.4" data-k="slideL">✓ New booking · <span class="hl">Satellite</span></div>`,
  cam: [1, 1.05], fy: 840,
  upd(t) { PINS.forEach((_, i) => { const k = clamp((t - T('c53') - .3 - i * .3) / .5); const el = $('m18-l' + i); op(el, k); el.setAttribute('stroke-dashoffset', ((1 - k) * 60 - t * 30).toFixed(0)); }); }
});

// ================= S19: the moral =================
addScene('c57', 'c59', {
  svg: rentalShopBG('m19', { noMirror: true }) + `<circle cx="540" cy="820" r="520" fill="url(#glow)"/>` + stand('me19', MS, 540, 980, .86),
  html: `<div class="title" style="top:400px" data-t="c57">Jitna <span class="g">DIKHEGA…</span></div><div class="title" style="top:510px" data-t="c58">utna <span class="g">KAMAAYEGA!</span></div>`,
  tin: .35, trans: 'fade', cam: [1, 1.04],
  upd(t) { const o = E.io(clamp((t - T('c58')) / .5)); life('me19', t, { mouth: 'grin', brows: 'sure', tilt: 3, sway: 2, L: [lerp(9, 62, o), lerp(-14, -36, o)], R: [lerp(9, 62, o), lerp(-14, -36, o)], hL: o > .5 ? 'open' : 'fist', hR: o > .5 ? 'open' : 'fist' }); }
});

// ================= S20: list your shop + follow Anokhi Reet =================
addScene('c59', 9999, {
  svg: shopBG('m20', { sign: 'ANOKHI REET' }) + rosettes('m20-r', 540, 780, .08, C.goldTan) + bust('me20', MS, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: pillH(540, 380, 'c59+0.1', 'Shop · <span class="hl">Boutique</span> · Studio', '', 'c61') +
    pillH(540, 490, 'c60+0.2', 'Aaj hi <span class="hl">Anokhi Reet</span> pe list karo', 'gold big', 'c61') +
    `<div class="follow" style="left:540px;top:500px" data-t="c61+0.1"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="m20-b"><span id="m20-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    tf($('m20-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c61') - .1) / .4);
    life('me20', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, R: [lerp(9, WAVE(t, T('c61'))[0], E.io(w)), lerp(-14, WAVE(t, T('c61'))[1], E.io(w))], hR: w > .5 ? 'open' : 'fist', L: t > T('c60') && w < .5 ? [130, 10] : [9, -14], hL: 'point' });
    const tp = T('c62') + .5, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('m20-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('m20-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
