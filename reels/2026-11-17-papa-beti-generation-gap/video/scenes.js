// ===== Papa aur beti (generation gap): 11 scenes, timed to the male voice (see captions.js) =====
// Characters: PAPA, BETI (new), GUEST_M (old customer), CUSTOMER_W. Sets: shopFrontBG, splitSVG, oldBoardSVG (new).
// The narrator is male: Papa and beti never lip-sync; their thoughts are bubbles.
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const smallPhone = `<rect x="-46" y="-80" width="92" height="160" rx="16" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-37" y="-69" width="74" height="138" rx="9" fill="#E9F4F8"/>`;
// the shop's page on Anokhi Reet (inside phoneSVG 560x1000)
const shopPage = () => arHeader() +
  `<g transform="translate(0,-250)"><rect x="-240" y="-70" width="480" height="140" rx="18" fill="${C.cream}"/>${at(0, 0, oldBoardSVG('RENTAL HOUSE', 'Since 1998'), .62)}</g>` +
  `<text x="-240" y="-120" font-family="Inter" font-weight="800" font-size="30" fill="#141110">Rental House · Since 1998</text>` +
  [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E']].map(([c, d], i) => `<g transform="translate(${i % 2 ? 125 : -125},${i < 2 ? 40 : 300})"><rect x="-112" y="-110" width="224" height="230" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><g transform="translate(0,-20) scale(.4)">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan })}</g><rect x="-80" y="80" width="160" height="26" rx="13" fill="#F2EEE9"/></g>`).join('');

// ================= S1: hook — split screen: Papa outside the shop, beti opens the shop on her phone =================
addScene(0, 'c7', {
  svg: splitSVG('p1',
    shopFrontBG('p1a', { cx: 270 }) + [0, 1, 2].map(i => wrap('p1-w' + i, at(0, 0, personIcon([C.pink, C.teal, '#7A4FA0'][i]), 1.4))).join('') + stand('pa1', PAPA.shop, 270, 1040, .62),
    homeBG('p1b', { noWindow: true, noClock: true, shelfX: 820 }) + at(660, 820, lehengaHangerSVG('p1-lh', {}, .8)) + stand('be1', BETI, 880, 1000, .66) + wrap('p1-ph', smallPhone) +
    `<rect id="p1-flash" x="540" y="0" width="540" height="${H}" fill="#fff" opacity="0"/>` +
    `<g transform="translate(700,1030)"><g data-t="c5+0.4" data-k="rise">${at(0, 0, phoneSVG('p1-big', 0, 0, 400, 760, `<g transform="scale(.7)">${shopPage()}</g>` + `<g id="p1-shut">${shutterSVG('p1s', 368, 728).replace('<g id="p1s-sh">', '<g id="p1s-sh" transform="translate(-184,-364)">')}</g>`), .62)}</g></g>`),
  html: `<div class="title" style="top:410px;font-size:70px">Papa: <span class="g">DUKAAN</span> ke bahar…<br>Beti: <span class="g">PHONE</span> pe</div>`,
  upd(t) {
    for (let i = 0; i < 3; i++) { const x = ((t * 120 + i * 260) % 900) - 200; tf($('p1-w' + i), x, 1150 - Math.abs(Math.sin(t * 6 + i)) * 10, 1); }
    life('pa1', t, { look: [Math.sin(t * .9) > 0 ? -0.9 : 0.9, 0], mouth: 'flat', brows: 'worry', tilt: Math.sin(t * .9) * 4, L: CLASP, R: CLASP, seed: 2 });
    const { hr } = life('be1', t, { look: [-0.7, -0.2], mouth: 'smile', brows: 'up', tilt: 3, R: [120, -40], hR: 'fist', L: [60, -60] });
    const p = toScene('be1', hr); tf($('p1-ph'), p[0] - 20, p[1] - 40, 1, -10); op($('p1-ph'), t < T('c5') + .4 ? 1 : 0);
    const fl = [T('c4'), T('c4') + .8].some(f => t > f && t < f + .15); op($('p1-flash'), fl ? .6 : 0);
    const k = E.io(clamp((t - T('c6')) / .9)); tf($('p1s-sh'), -184, -364, 1, 0, 0, 0, Math.max(.02, 1 - k));
  }
});

// ================= S2: Papa's belief — face to face, since 1998 =================
addScene('c7', 'c11', {
  svg: rentalShopBG('p2', { noMirror: true, sign: 'SINCE 1998', signY: 470 }) + bust('pa2', PAPA.shop, 320, FLOOR + 20, 1.0) + bust('cu2', GUEST_M, 780, FLOOR + 20, 1.0) + counterSVG() +
    `<g transform="translate(550,800)"><g data-t="c10+0.3" data-bob="6">${heartPath(0, 0, 2.4, C.gold)}</g></g>`,
  html: `<div class="bubble" style="left:540px;top:340px;width:820px" data-t="c8" data-out="c10-0.05">"Jo customer dukaan pe aaya,<br><span class="hl">wahi asli customer</span> hai."</div>` +
    `<div class="bubble" style="left:540px;top:340px;width:820px" data-t="c10">"Bharosa <span class="hl">aamne-saamne</span> banta hai."</div>`,
  upd(t) {
    const sh = E.io(clamp((t - T('c7') - .2) / .5)), shake = Math.sin(t * 9) * 4 * sh;
    life('pa2', t, { pivot: 0, look: [0.8, 0], mouth: 'grin', brows: 'up', tilt: 3, R: [lerp(9, 72, sh), lerp(-14, -30, sh) + shake], hR: 'open' });
    life('cu2', t, { pivot: 0, seed: 4, look: [-0.8, 0], mouth: 'big', brows: 'up', tilt: -3, L: [lerp(9, 72, sh), lerp(-14, -30, sh) - shake], hL: 'open' });
  }
});

// ================= S3: beti's question — what about the customer who never reached the shop? =================
addScene('c11', 'c15', {
  svg: homeBG('p3', { noWindow: true, noClock: true, noShelf: true }) + bust('be3', BETI, 260, FLOOR + 30, .95) + counterSVG() +
    at(720, 830, phoneSVG('p3-ph', 0, 0, 560, 1000,
      `<rect x="-240" y="-440" width="480" height="70" rx="35" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><circle cx="-200" cy="-405" r="14" fill="none" stroke="#655C57" stroke-width="5"/>` +
      `<text id="p3-q" x="-170" y="-394" font-family="Inter" font-weight="700" font-size="30" fill="#141110"></text>` +
      `<g transform="translate(0,90) scale(.48)">${cityMapSVG('p3-map', [])}` +
      [[-250, -300], [260, -200], [-200, 300], [240, 360]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c12+${(.1 + i * .2).toFixed(1)}" data-k="drop">${mapPinSVG(C.emerald, 40)}</g></g>`).join('') +
      `<g data-t="c13+0.4"><circle r="90" fill="none" stroke="${C.red}" stroke-width="12" stroke-dasharray="20 14"/><text y="36" text-anchor="middle" font-family="Inter" font-weight="900" font-size="110" fill="${C.red}">?</text></g></g>`), .78),
  html: `<div class="bubble" style="left:380px;top:380px;width:640px" data-t="c12" data-out="c14-0.05">"Papa, jo customer dukaan tak <span class="hl">pahunch hi nahi</span> paaya…"</div>` +
    `<div class="bubble" style="left:380px;top:380px;width:420px" data-t="c14">"…<span class="hl">uska kya?</span>"</div>`,
  upd(t) {
    const q = 'lehenga on rent', n = Math.round(clamp((t - T('c11') - .1) / 1.2) * q.length); $('p3-q').textContent = q.slice(0, n) + (n < q.length && Math.sin(t * 12) > 0 ? '|' : '');
    life('be3', t, { pivot: 0, look: t > T('c14') ? [-0.2, -0.4] : [0.8, 0.2], mouth: t > T('c14') ? 'o' : 'flat', brows: t > T('c13') ? 'worry' : 'norm', tilt: 4, R: [70, 4], hR: 'point' });
  }
});

// ================= S4: both are right — two sides of one rack =================
addScene('c15', 'c16', {
  svg: rentalShopBG('p4', { noMirror: true }) + `<rect x="0" y="0" width="${W}" height="${H}" fill="${C.cream}" opacity=".35"/>` +
    rackSVG('p4-rack', 540, 640, RACK_A.slice(0, 3), 330) + stand('pa4', PAPA.shop, 180, 980, .78) + stand('be4', BETI, 900, 990, .78),
  html: `<div class="title" style="top:430px" data-t="c15+0.2">Dono <span class="g">SAHI</span></div>`,
  upd(t) { life('pa4', t, { look: [1, 0], mouth: 'smile', brows: 'norm', tilt: 4, L: CLASP, R: CLASP }); life('be4', t, { seed: 3, look: [-1, 0], mouth: 'smile', brows: 'norm', tilt: -4, L: CLASP, R: CLASP }); }
});

// ================= S5: Papa's era — the shop board was its identity (1998) =================
addScene('c16', 'c19', {
  svg: shopFrontBG('p5') + `<rect width="${W}" height="${H}" fill="#C9AE6A" opacity=".18"/>` +
    `<g transform="translate(960,960)"><g data-t="c17">${at(0, 0, calendarSVG('p5-cal', 'SAAL', '1998'), .5)}</g></g>` + stand('pa5', PAPA.young, 540, 1060, .62),
  html: pillH(540, 352, 'c18', '1998: pehchaan <span class="hl">dukaan ka board</span>', 'big'),
  cam: (t, lt) => lerp(1, 1.18, E.io(clamp((t - T('c18')) / 1.2))), fy: 560,
  upd(t) { life('pa5', t, { look: [0, -0.8], mouth: 'grin', brows: 'up', tilt: 3, L: [140, 20], hL: 'point', R: CLASP }); }
});

// ================= S6: beti's era — identity on the phone screen (2026) =================
addScene('c19', 'c21', {
  svg: homeBG('p6', { noWindow: true, noClock: true }) + `<g transform="translate(250,560)">${at(0, 0, calendarSVG('p6-cal', 'SAAL', '1998'), .62)}</g>` +
    bust('be6', BETI, 280, FLOOR + 30, .9) + counterSVG() + at(740, 820, phoneSVG('p6-ph', 0, 0, 560, 1000, shopPage()), .72),
  html: pillH(540, 352, 'c20', '2026: pehchaan <span class="hl">phone ki screen</span>', 'big'),
  upd(t) {
    const y = Math.round(lerp(1998, 2026, E.io(clamp((t - T('c19')) / 1.4))));
    const el = $('p6-cal').querySelectorAll('text')[1]; if (el) el.textContent = String(y);
    life('be6', t, { pivot: 0, look: [0.8, 0], mouth: 'grin', brows: 'up', tilt: 4, R: [70, 4], hR: 'point' });
  }
});

// ================= S7: trust earned over years vs a new customer one click away =================
const YEARS = ['1998', '2005', '2012', '2020'];
addScene('c21', 'c23', {
  svg: rentalShopBG('p7', { noMirror: true }) + bust('pa7', PAPA.shop, 540, FLOOR + 20, 1.05) + counterSVG() +
    YEARS.map((y, i) => `<g transform="translate(${[150, 330, 750, 930][i]},${[640, 520, 520, 640][i]})"><g data-t="c21+${(.2 + i * .35).toFixed(2)}">${personIcon([C.marigold, C.pink, C.teal, '#7A4FA0'][i])}<g transform="translate(0,104)"><rect x="-58" y="-22" width="116" height="44" rx="22" fill="#fff" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${C.red}">${y}</text></g></g></g>`).join(''),
  html: pillH(540, 352, 'c22', 'Bharosa: <span class="hl">saal dekar</span> kamaaya', 'big'),
  upd(t) { life('pa7', t, { pivot: 0, look: [Math.sin(t) * .8, -0.3], mouth: 'grin', brows: 'up', tilt: 3, L: CLASP, R: CLASP, blush: .4 }); }
});
addScene('c23', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="#F3E3C0"/><circle cx="540" cy="860" r="460" fill="url(#glow)"/>` +
    at(540, 860, phoneSVG('p8-ph', 0, 0, 560, 1000, shopPage()), .74) +
    `<g id="p8-rip" opacity="0"><circle r="40" fill="none" stroke="${C.red}" stroke-width="8"/></g>` +
    [0, 1, 2, 3].map(i => wrap('p8-c' + i, at(0, 0, personIcon([C.pink, C.teal, C.marigold, C.emerald][i]), 1.2))).join(''),
  html: pillH(540, 352, 'c24', 'Naya customer: <span class="hl">ek click</span> door', 'big'),
  upd(t) {
    const tap = T('c24') + .3, k = E.io(clamp((t - T('c23')) / .6));
        const r = clamp((t - tap) / .5); tf($('p8-rip'), 600, 940, 1 + r * 2.5); op($('p8-rip'), r > 0 && r < 1 ? 1 - r : 0);
    const src = [[-100, 500], [1180, 560], [-100, 1200], [1180, 1240]];
    for (let i = 0; i < 4; i++) { const q = E.out(clamp((t - tap - .2 - i * .15) / .7)); tf($('p8-c' + i), lerp(src[i][0], [280, 800, 280, 800][i], q), lerp(src[i][1], [700, 700, 1080, 1080][i], q), 1); op($('p8-c' + i), q > 0 ? 1 : 0); }
  }
});

// ================= S9: night — Papa sees his shop live; a new booking; same goal =================
addScene('c25', 'c30', {
  svg: homeBG('p9', { night: true, noShelf: true, noClock: true, noPlant: true, lamp: true, lampX: 540 }) +
    bust('pa9', PAPA.night, 360, FLOOR + 30, 1.0) + bust('be9', BETI, 740, FLOOR + 40, .95) + wrap('p9-ph', smallPhone.replace('#E9F4F8', '#FFF2DF')) + counterSVG(FLOOR + 20) +
    `<g transform="translate(540,560)"><g data-t="c28-0.1" data-k="rise">${toastSVG('New booking 🎉', 500)}</g></g>`,
  html: `<div class="title" style="top:410px" data-t="c26" data-out="c28-0.2"><span class="g">Generation gap</span></div>` +
    pillH(540, 352, 'c28+0.4', 'Manzil <span class="hl">ek hi</span>', 'big') + pillH(540, 1240, 'c29+0.2', 'Dukaan <span class="hl">aage badhe</span>', 'gold'),
  upd(t) {
    const happy = t > T('c28');
    const { hl } = life('be9', t, { pivot: 0, seed: 3, look: [-0.6, 0.3], mouth: happy ? 'grin' : 'smile', brows: 'up', tilt: -5, L: [50, -60], hL: 'fist', lean: happy ? -3 : 0, R: happy ? [70, -40] : [9, -14] });
    const p = toScene('be9', hl); tf($('p9-ph'), p[0] - 30, p[1] - 70, 1.3, -8);
    life('pa9', t, { pivot: 0, look: [0.7, 0.5], mouth: happy ? 'grin' : 'flat', brows: happy ? 'up' : 'sure', tilt: happy ? 6 : 2, nod: happy ? 0 : 6, blush: happy ? .6 : 0, L: happy ? CLASP : [9, -14], R: happy ? CLASP : [9, -14] });
  }
});

// ================= S10: father's trust, daughter's reach =================
addScene('c30', 'c31', {
  svg: splitSVG('p10', shopFrontBG('p10a', { cx: 270 }), `<rect x="540" width="540" height="${H}" fill="#F3E3C0"/><circle cx="810" cy="900" r="300" fill="url(#glow)"/>` + at(810, 900, phoneSVG('p10-ph', 0, 0, 560, 1000, shopPage()), .66)),
  html: `<div class="title" style="top:400px;font-size:70px">Pita ka <span class="g">BHAROSA</span>,<br>beti ki <span class="g">PAHUNCH</span></div>`,
  tin: .3, trans: 'fade'
});

// ================= S11: put your shop online on Anokhi Reet + follow =================
addScene('c31', 9999, {
  svg: shopBG('p11', { sign: 'ANOKHI REET' }) + rosettes('p11-r', 540, 780, .08, C.goldTan) + bust('pa11', PAPA.shop, 360, FLOOR + 20, 1.0) + bust('be11', BETI, 730, FLOOR + 30, .95) + counterSVG(),
  html: pillH(540, 380, 'c31+0.1', 'Rental shop · Boutique · <span class="hl">Designer studio</span>', '', 'c35') +
    pillH(540, 490, 'c33+0.2', 'Aaj hi <span class="hl">Anokhi Reet</span> pe online', 'gold big', 'c35') +
    `<div class="follow" style="left:540px;top:500px" data-t="c35+0.1"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="p11-b"><span id="p11-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    tf($('p11-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c35') - .1) / .4);
    life('pa11', t, { pivot: 0, mouth: 'grin', brows: 'up', tilt: 4, look: [0.5, 0], L: [lerp(9, WAVE(t, T('c35'))[0], E.io(w)), lerp(-14, WAVE(t, T('c35'))[1], E.io(w))], hL: w > .5 ? 'open' : 'fist', R: [60, -60] });
    life('be11', t, { pivot: 0, seed: 3, mouth: 'big', brows: 'up', tilt: -4, look: [-0.5, 0], R: [lerp(9, WAVE(t, T('c35') + .2)[0], E.io(w)), lerp(-14, WAVE(t, T('c35') + .2)[1], E.io(w))], hR: w > .5 ? 'open' : 'fist' });
    const tp = T('c35') + 1.0, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('p11-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('p11-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
