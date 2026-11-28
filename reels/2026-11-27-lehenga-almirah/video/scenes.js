// ===== Lehenga aaya… phir almirah mein (Priya): 13 scenes + a counter fixed top-left for the whole reel =====
// Characters: PRIYA (new). Props: thoughtCloudSVG, labelJarSVG (new); almirahSVG, coinJarSVG/jarFill, saveIconSVG, arHeader.
const PH = PRIYA.home, PLEH = PRIYA.lehenga;
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const wrap = (id, inner) => `<g id="${id}">${inner}</g>`;
const LOOKS = [[C.emerald, C.emeraldDark, '#A6D3B0'], [C.marigold, '#C9821E', '#F7C548'], [C.teal, C.tealDark, '#9ED3CF'], ['#7A4FA0', '#5D3A7E', '#B28BD0']];
const lookOf = ([c, d, p]) => dress(PLEH, { top: c, topD: d, pallu: p, border: C.gold, skirt: { c, d, b: C.gold } });
const dust = id => [...Array(7)].map((_, i) => `<circle id="${id}${i}" r="${26 + (i % 3) * 10}" fill="#CFC6B8" opacity="0"/>`).join('');
function dustPuff(id, t, t0, x, y) { for (let i = 0; i < 7; i++) { const k = clamp((t - t0) / .9), a = i / 7 * Math.PI * 2; tf($(id + i), x + Math.cos(a) * k * 170, y + Math.sin(a) * k * 70 - k * 40, .5 + k); op($(id + i), k > 0 && k < 1 ? (1 - k) * .9 : 0); } }

// ================= the counter, top-left, whole reel (added first so every other scene stays "current") =================
addScene(0, 9999, {
  html: `<div id="cnt" style="position:absolute;left:36px;top:262px;background:#fff;border:4px solid #3B2418;border-radius:22px;padding:10px 20px;font-weight:800;font-size:32px;color:#1A1A1A;box-shadow:0 6px 0 rgba(59,36,24,.16)">` +
    `Kharcha: <span id="cnt-k" style="color:#890304">₹0</span> &nbsp;|&nbsp; <span id="cnt-l">Pehna</span>: <span id="cnt-p" style="color:#890304">0</span></div>`,
  upd(t) {
    const green = t > T('c28');
    const [k, p] = green ? ['₹10,000', '4'] : t > T('c9') ? ['₹38,000', '2'] : t > T('c3') + .4 ? ['₹19,000', '1'] : ['₹0', '0'];
    $('cnt-k').textContent = k; $('cnt-p').textContent = p; $('cnt-l').textContent = green ? 'Looks' : 'Pehna';
    const c = green ? '#1F7A4D' : '#890304'; $('cnt-k').style.color = c; $('cnt-p').style.color = c;
    const box = $('cnt'); box.style.background = green ? '#E3F3EA' : '#fff'; box.style.borderColor = green ? '#1F7A4D' : '#3B2418';
    const flips = [T('c3') + .4, T('c9'), T('c28')].map(f => clamp((t - f) / .3)).map(q => q > 0 && q < 1 ? Math.sin(q * Math.PI) : 0);
    box.style.transform = `scale(${(1 + Math.max(...flips) * .12).toFixed(3)})`; box.style.transformOrigin = 'left center';
    box.style.display = t < VOICE_END + .2 ? '' : 'none';
  }
});

// ================= S1: hook — a ₹19,000 lehenga, worn only ONCE =================
addScene(0, 'c3', {
  svg: homeBG('p1', { noWindow: true, noShelf: true, noClock: true }) + almirahSVG('a1', 840, FLOOR + 62, .9) + stand('pr1', PH, 380, 950, .9) + wrap('p1-lh', lehengaHangerSVG('p1-l', {}, .62)),
  html: `<div class="title" style="top:500px"><span class="g">₹19,000</span> ka lehenga…<br>pehna sirf <span class="g">EK</span> baar</div>`,
  upd(t) {
    const turn = t > T('c2');
    const { hr } = life('pr1', t, { look: turn ? [0.9, 0] : [0.3, -0.6], mouth: turn ? 'flat' : 'grin', brows: turn ? 'worry' : 'up', tilt: turn ? -3 : 5, R: [150, 20], hR: 'fist' });
    const p = toScene('pr1', hr); tf($('p1-lh'), p[0] + 10, p[1] + 80, 1, noise(t, 1) * 4);
  }
});

// ================= S2: cousin's wedding — photos ✓ compliments ✓ =================
addScene('c3', 'c6', {
  svg: weddingBG() + stand('pr2', PLEH, 540, 960, .9) + stand('g2a', GUEST_W1, 170, 1000, .7) + stand('g2b', GUEST_W2, 910, 1000, .7) +
    [[300, 620], [780, 600], [540, 520]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c4+${(.3 + i * .25).toFixed(2)}" data-bob="10" data-ph="${i}">${heartPath(0, 0, 2.2)}</g></g>`).join('') +
    `<rect id="p2-fl" width="${W}" height="${H}" fill="#fff" opacity="0"/>`,
  html: pillH(220, 1240, 'c5', 'Photos ✓', 'green big') + pillH(680, 1240, 'c5+0.5', 'Compliments ✓', 'green big'),
  upd(t) {
    op($('p2-fl'), [T('c5') + .05, T('c5') + .6].some(f => t > f && t < f + .12) ? .7 : 0);
    life('pr2', t, { mouth: 'grin', brows: 'up', tilt: 5, L: CLASP, R: CLASP, y: hop(t, T('c5') + .2, 14), blush: .5 });
    life('g2a', t, { seed: 2, look: [0.9, 0], mouth: 'big', brows: 'up', R: [100, -100], hR: 'fist' }); life('g2b', t, { seed: 5, look: [-0.9, 0], mouth: 'grin', brows: 'up', L: [100, -100], hL: 'fist' });
  }
});

// ================= S3: wedding over… back in the ALMIRAH (door slams, dust puff) =================
addScene('c6', 'c8', {
  svg: homeBG('p3', { noWindow: true, noShelf: true, noClock: true }) + almirahSVG('a3', 540, FLOOR + 62, 1.25) + wrap('p3-fly', lehengaHangerSVG('p3-l', {}, .7)) + dust('p3-d'),
  html: `<div class="title" style="top:430px" data-t="c7+0.3">wapas <span class="g">ALMIRAH</span> mein</div>`,
  cam: [1, 1.04],
  upd(t) {
    const k = E.io(clamp((t - T('c6') - .2) / .7)); tf($('p3-fly'), lerp(220, 540, k), lerp(700, FLOOR - 450, k) - Math.sin(k * Math.PI) * 120, 1); op($('p3-fly'), k < 1 ? 1 : 0);
    const shut = E.in(clamp((t - T('c7') - .05) / .25)); tf($('a3-dL'), 0, 0, lerp(.13, 1, shut), 0, -150, 0, 1); tf($('a3-dR'), 0, 0, lerp(.13, 1, shut), 0, 150, 0, 1);
    dustPuff('p3-d', t, T('c7') + .3, 540, FLOOR - 200);
  }
});

// ================= S4: the next wedding — "Ye wala toh sabne photos mein dekh liya…" — new one again =================
addScene('c8', 'c10', {
  svg: homeBG('p4', { noWindow: true, noShelf: true, noClock: true }) + almirahSVG('a4', 790, FLOOR + 62, .95) + stand('pr4', PH, 330, 950, .9) +
    `<g transform="translate(560,700)"><g data-t="c8" data-k="drop" data-d=".5">${at(0, 0, cardSVG('p4-card', 0, 0, 2), .62, 10)}</g></g>`,
  html: `<div class="bubble" style="left:560px;top:450px;width:600px" data-t="c8+0.6">"Ye wala toh <span class="hl">sabne photos</span> mein dekh liya…"</div>`,
  init() { $('a4-inside').innerHTML = `<g transform="translate(0,-330)">${lehengaHangerSVG('p4-l', {}, .75)}</g>`; },
  upd(t) {
    const open = E.io(clamp((t - T('c8') - .3) / .5)); tf($('a4-dL'), 0, 0, lerp(1, .13, open), 0, -150, 0, 1); tf($('a4-dR'), 0, 0, lerp(1, .13, open), 0, 150, 0, 1);
    life('pr4', t, { look: [0.9, 0], mouth: t > T('c8') + .6 ? 'sad' : 'o', brows: 'worry', tilt: -5, R: t > T('c9') ? THINK : [9, -14], hR: 'fist' });
  }
});

// ================= S5: open loop — money, liking… so where was the mistake? =================
addScene('c10', 'c12', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('p5-r', 540, 900, .14, C.gold) + `<g transform="translate(540,960)"><g data-t="c11"><circle r="150" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/><text y="70" text-anchor="middle" font-family="Inter" font-weight="900" font-size="200" fill="${C.redDark}">?</text></g></g>`,
  html: `<div class="title" style="top:480px;font-size:72px">Paisa tha, pasand bhi tha…</div><div class="title" style="top:640px;font-size:80px" data-t="c11">toh <span class="g">galti kahan</span> hui?</div>`,
  tin: .3, trans: 'zoom',
  upd(t) { tf($('p5-r'), 540, 900, 1, t * 6); }
});

// ================= S6: Richard Thaler — MENTAL ACCOUNTING — money in separate jars =================
const JARS = [['Grocery', C.teal, 260], ['Bills', '#7A6E62', 540], ['SHAADI', C.red, 820]];
addScene('c12', 'c19', {
  svg: homeBG('p6', { noWindow: true, noShelf: true, noClock: true, noPlant: true }) +
    `<g id="p6-cl"><g transform="translate(540,600)"><g data-t="c12">${thoughtCloudSVG(820, 300)}<text y="-30" text-anchor="middle" font-family="Inter" font-weight="700" font-size="34" fill="#655C57">Nobel winner Richard Thaler</text><text y="36" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="${C.red}">MENTAL ACCOUNTING</text></g></g></g>` +
    JARS.map(([l, c, x], i) => `<g transform="translate(${x},1040)"><g data-t="c14+${(i * .25).toFixed(2)}" data-k="drop">${at(0, 0, labelJarSVG('p6-j' + i, l, c, 6), .78)}</g></g>`).join('') +
    [...Array(6)].map((_, i) => `<g id="p6-o${i}" opacity="0">${i % 2 ? noteSVG() : coinSVG(0, 0, 30)}</g>`).join(''),
  html: `<div class="title" style="top:600px;font-size:66px;opacity:0" id="p6-m">₹19,000 ÷ 1 baar =<br><span class="g">₹19,000 per look</span></div>`,
  upd(t) {
    jarFill('p6-j0j', 3, t, T('c14') + .4, .6); jarFill('p6-j1j', 4, t, T('c14') + .6, .6); jarFill('p6-j2j', 6, t, T('c15') + .2, 1.0);
    for (let i = 0; i < 6; i++) { const q = ((t - T('c16') - i * .3) % 1.8) / 1.8; tf($('p6-o' + i), 820 + (i - 2.5) * 30 + q * (i - 2.5) * 50, 930 - E.out(clamp(q)) * 200, .8, (i - 2.5) * q * 40); op($('p6-o' + i), t > T('c16') && q > 0 ? 1 - q : 0); }
    const mm = clamp((t - T('c18')) / .3); $('p6-m').style.opacity = mm.toFixed(2); op($('p6-cl'), 1 - mm);
  }
});

// ================= S7: the renter's fear — answered: Verified profiles ✓ =================
addScene('c19', 'c23', {
  svg: homeBG('p7', { noWindow: true, noShelf: true, noClock: true }) + bust('pr7', PH, 540, FLOOR + 30, 1.05) + counterSVG(),
  html: `<div class="bubble" style="left:250px;top:470px" data-t="c19">"Rent?"</div>` + `<div class="bubble" style="left:760px;top:560px" data-t="c19+0.5">"Fit nahi aaya toh?"</div>` + `<div class="bubble" style="left:330px;top:660px" data-t="c20">"Kaun hai owner?"</div>` +
    pillH(540, 1240, 'c22', '✓ Verified profiles', 'green big'),
  upd(t) { const ok = t > T('c22') + .2; life('pr7', t, { pivot: 0, look: ok ? [0, 0.4] : [Math.sin(t * 2) * .7, -0.5], mouth: ok ? 'smile' : 'worry', brows: ok ? 'up' : 'worry', tilt: ok ? 4 : -5, R: ok ? [9, -14] : THINK, hR: 'fist', sweat: ok ? 0 : .8 }); }
});

// ================= S8: this time Priya rented the same designer lehenga on Anokhi Reet… ₹2,500 =================
addScene('c23', 'c26', {
  svg: homeBG('p8', { noWindow: true, noShelf: true, noClock: true }) + bust('pr8', PH, 250, FLOOR + 40, .85) + counterSVG() +
    at(700, 820, phoneSVG('p8-ph', 0, 0, 560, 1000, arHeader() +
      `<rect x="-240" y="-370" width="480" height="430" rx="20" fill="${C.cream}"/><g transform="translate(0,-230) scale(.62)">${lehengaHangerSVG('', {})}</g>` +
      `<text x="-230" y="110" font-family="Inter" font-weight="900" font-size="36" fill="#141110">Designer lehenga</text>` +
      `<g data-t="c24"><text x="-230" y="170" font-family="Inter" font-weight="700" font-size="32" fill="#9C928A" text-decoration="line-through">MRP ₹19,000</text></g>` +
      `<g data-t="c25-0.1"><rect x="-240" y="200" width="300" height="76" rx="38" fill="#E3F3EA" stroke="#1F7A4D" stroke-width="3"/><text x="-90" y="252" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#1F7A4D">Rent ₹2,500</text></g>` +
      `<rect x="-240" y="310" width="480" height="76" rx="38" fill="url(#mar)"/><text x="0" y="360" text-anchor="middle" font-family="Inter" font-weight="800" font-size="32" fill="#FFF2DF">Book karo</text>`), .78),
  upd(t) { life('pr8', t, { pivot: 0, look: [0.9, 0], mouth: t > T('c25') ? 'grin' : 'smile', brows: 'up', tilt: 4, R: [70, 4], hR: 'point' }); }
});

// ================= S9: next 4 weddings, 4 different lehengas — total ₹10,000 =================
const GRID = [[270, 700], [810, 700], [270, 1110], [810, 1110]];
addScene('c26', 'c29', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + GRID.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c26+${(.3 + i * .35).toFixed(2)}"><rect x="-250" y="-200" width="500" height="400" rx="26" fill="${['#F7DCC8', '#F3E3C0', '#E6F2EE', '#EEE3F3'][i]}" stroke="${OL}" stroke-width="${OW}"/><clipPath id="p9c${i}"><rect x="-250" y="-200" width="500" height="400" rx="26"/></clipPath><g clip-path="url(#p9c${i})">${bust('pr9' + i, lookOf(LOOKS[i]), 0, 330, .7)}</g><g transform="translate(-200,-150)"><circle r="34" fill="url(#mar)" stroke="${OL}" stroke-width="3"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.gold}">${i + 1}</text></g></g></g>`).join(''),
  html: `<div class="title" style="top:420px" data-t="c27">4 shaadi, <span class="g">4 looks</span></div>`,
  upd(t) { for (let i = 0; i < 4; i++) life('pr9' + i, t, { pivot: 0, seed: i, mouth: 'grin', brows: 'up', tilt: i % 2 ? -4 : 4, L: CLASP, R: CLASP }); }
});

// ================= S10: the lesson =================
addScene('c29', 'c32', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('p10-r', 540, 880, .12, C.goldTan) + `<rect x="0" y="${FLOOR + 80}" width="${W}" height="${H}" fill="#F3E3C0"/>` + stand('pr10', lookOf(LOOKS[1]), 540, 1000, .82),
  html: `<div class="title" style="top:390px;font-size:50px" data-t="c29">Lehenga khareedna <span class="g">zaroori nahi</span>…</div>` +
    `<div class="title" style="top:490px;font-size:56px" data-t="c30">har function mein <span class="g">NAYA</span> dikhna!</div>`,
  tin: .35, trans: 'fade', cam: [1, 1.04],
  upd(t) { tf($('p10-r'), 540, 880, 1, t * 5); const o = E.io(clamp((t - T('c30')) / .5)); life('pr10', t, { mouth: 'grin', brows: 'sure', tilt: 3, sway: 2.4, L: [lerp(9, 62, o), lerp(-14, -36, o)], R: [lerp(9, 62, o), lerp(-14, -36, o)], hL: o > .5 ? 'open' : 'fist', hR: o > .5 ? 'open' : 'fist' }); }
});

// ================= S11: save, send to a friend, comment LEHENGA; link in bio + follow =================
addScene('c32', 9999, {
  svg: homeBG('p11', { noWindow: true, noShelf: true, noClock: true }) + rosettes('p11-r', 540, 780, .08, C.goldTan) + bust('pr11', lookOf(LOOKS[0]), 540, FLOOR + 10, 1.1) + counterSVG() +
    `<g transform="translate(870,620)"><g data-t="c33+0.3" data-out="c38+0.4" data-swing="8">${saveIconSVG()}</g></g>`,
  html: pillH(870, 740, 'c33+0.5', '<span class="hl">SAVE</span> karo', 'gold', 'c38+0.4') + pillH(540, 380, 'c34', 'Friend ko <span class="hl">bhejo</span> 📩', 'big', 'c37-0.05') +
    `<div class="pill big" style="left:540px;top:380px" data-t="c37">Comment <span class="hl">LEHENGA</span> 👇</div>` +
    `<div class="pill" style="left:540px;top:480px" data-t="c38">🔗 Link in bio</div>` +
    `<div class="follow" style="left:540px;top:600px" data-t="c38+0.6"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn" id="p11-b"><span id="p11-f">Follow</span></span></div>`,
  noWm: true,
  upd(t) {
    tf($('p11-r'), 540, 780, 1, t * 5);
    const w = clamp((t - T('c37')) / .4), pt = t > T('c33') && t < T('c34');
    life('pr11', t, { pivot: 0, mouth: 'big', brows: 'up', tilt: 4, look: pt ? [0.8, -0.4] : [0, 0], R: pt ? [100, -10] : [lerp(9, WAVE(t, T('c37'))[0], E.io(w)), lerp(-14, WAVE(t, T('c37'))[1], E.io(w))], hR: pt ? 'point' : (w > .5 ? 'open' : 'fist') });
    const tp = VOICE_END + .6, press = t > tp && t < tp + .25 ? .92 : 1;
    const b = $('p11-b'); b.style.transform = `scale(${press})`; b.style.display = 'inline-block';
    const done = t > tp + .12; $('p11-f').textContent = done ? 'Following ✓' : 'Follow'; b.style.background = done ? '#E3F3EA' : '#890304'; b.style.color = done ? '#1F7A4D' : '#FFF2DF';
  }
});
