// ===== Beta, inki bhi photo achhi kheechna… (cream home; Shreya the beti and Sudha, her Mummy; female voice) =====
// Open loops: "aage jo hua" and "asli twist". App name hidden until the end card (pink, the teammate's choice).
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const feet = sc => FLOOR + 40 - 372 * sc;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const burst = (x, y, at, txt, fill, r = 110, fs = 44, rot = -8, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>${burstSVG(txt, fill, r, fs)}</g></g>`;
const bub = (x, y, w, at, out, html, fs = 36) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const sparks = (pts, at) => pts.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="${at}+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join('');
const UDA = (x = 540, y = 450, at = '-1', out = '') => pillH(x, y, at, 'Udaharan 📝', 'gold', out);
const RED_LEH = { c: '#C0262D', d: '#97151B', dupatta: '#F2A08F' };
const cream = () => homeBG('x', { noClock: true, noShelf: true, winX: 60 });
// the sale tag on the lehenga
const saleTag = (at = '-1') => `<g data-t="${at}" data-swing="8"><path d="M0,-40 L0,0" stroke="${OL}" stroke-width="4"/><rect x="-120" y="0" width="240" height="96" rx="14" fill="#D9363E" stroke="${OL}" stroke-width="5"/>` +
  `<text y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="#fff">SALE</text><text y="80" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="${C.gold}">₹3,000</text></g>`;

// ================= S1 hook: Mummy holds up the wedding lehenga with a "SALE ₹3,000" tag; Beti: "Mummy?! 😭" =================
addScene(0, 'c7', {
  svg: cream() + `<circle cx="400" cy="760" r="380" fill="url(#glow)" opacity=".6"/>` + stand('s1m', SUDHA, 220, feet(.8), .8) + stand('s1b', SHREYA, 870, feet(.8), .8) +
    `<g id="s1l"><g transform="translate(0,30)">${lehengaHangerSVG('s1lh', RED_LEH, .8)}</g><g transform="translate(0,190)">${saleTag('0.3')}</g></g>`,
  html: `<div class="title" style="top:370px;font-size:64px" data-t="-1" data-out="c4">Shaadi ka lehenga… <span class="g">SALE?!</span> 😱</div>` +
    pillH(540, 330, 'c4', 'Mummy ko <span class="hl">zaroor bhejoge</span> 😄', 'gold') +
    bub(870, 500, 300, 'c1+0.6', 'c4', '"Mummy?!" 😭', 44) + UDA(540, 1250, 'c3', 'c4'),
  noWm: true, cam: [1, 1.04], fy: 780,
  upd(t) {
    const A = life('s1m', t, { mouth: 'smile', brows: 'up', look: [.6, 0], tilt: 4, R: [150, -110], hR: 'fist', L: [9, -14], seed: 2 });
    atHand('s1l', 's1m', A.hr, 120, -30, Math.sin(t * 2) * 3);
    const us = t > T('c4');
    life('s1b', t, { speak: true, brows: 'worry', look: us ? [0, 0] : [-.8, 0], sweat: us ? 0 : .6, R: us ? [100, -170] : THINK, L: us ? [9, -14] : THINK, hR: us ? 'point' : 'open', hL: 'open', seed: 1 });
  }
});

// ================= S2 the almari: ₹40,000, worn once; Mummy: "Almari mein jagah chahiye…"; Beti: "Ruko Mummy!" =================
const leh4 = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E']]
  .map(([c, d], i) => `<g transform="translate(${-105 + i * 70},-330)">${lehengaHangerSVG('', { c, d, dupatta: '#FFF0F5' }, .32)}</g>`).join('');
addScene('c7', 'c14', {
  svg: cream() + almirahSVG('s2a', 300, FLOOR + 20, 1.15) + stand('s2m', SUDHA, 820, feet(.8), .8) + `<g id="s2bw">${stand('s2b', SHREYA, 0, 0, .78)}</g>` +
    `<g transform="translate(300,420) rotate(-4)"><g data-t="c7" data-k="pop" data-out="c12-0.05"><rect x="-230" y="-80" width="460" height="160" rx="20" fill="#fff" stroke="${OL}" stroke-width="5"/>` +
    `<text x="-150" y="-12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="#8A8178">₹40,000</text><path d="M-230,-24 L-70,-24" stroke="#D9363E" stroke-width="7"/>` +
    `<text x="-30" y="-10" font-family="Inter" font-weight="900" font-size="40" fill="${C.text}">→</text><text x="110" y="-10" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="#D9363E">₹3,000?!</text>` +
    `<text y="54" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="${C.text}">Shaadi ka lehenga 👗</text></g></g>`,
  html: `<div class="pill maroon" style="left:300px;top:300px" data-t="c8" data-out="c12-0.05">SIRF 1 BAAR 👗</div>` + UDA(300, 560, 'c7+0.4', 'c12-0.05') +
    bub(780, 380, 460, 'c9', 'c12-0.05', '"<span class="hl">Almari mein jagah chahiye,</span> bech de isko!"', 34) +
    bub(420, 400, 440, 'c12', '', '"<span class="hl">Ruko Mummy,</span> ek try karne do!" ✋', 36),
  noWm: true, cam: [1, 1.03], fy: 760, capY: 1400,
  init() { $('s2a-inside').innerHTML = leh4; },
  upd(t) {
    const open = P(t, T('c7') - .1, .6, E.io); tf($('s2a-dL'), 0, 0, lerp(1, .13, open), 0, -150, 0, 1); tf($('s2a-dR'), 0, 0, lerp(1, .13, open), 0, 150, 0, 1);
    const g = glide(t, T('c12') - .3, .8, 1240, 490, 10), by = feet(.78);
    tf($('s2bw'), g[0], by + g[1], 1); PL['s2b'] = { x: g[0], y: by + g[1], sc: .78 };
    life('s2b', t, { speak: t > T('c12'), mouth: 'flat', brows: 'angry', look: [.8, 0], R: t > T('c12') + .4 ? [60, -110] : [9, -14], hR: 'open', L: [9, -14], seed: 1 });
    const her = t > T('c9') && t < T('c12');
    life('s2m', t, { mouth: her ? talkMouth(t, true) : (t > T('c12') + .4 ? 'o' : 'flat'), brows: t > T('c12') + .4 ? 'up' : 'angry', look: [-.8, 0], R: ARMS_X, L: ARMS_X, seed: 2 });
  }
});

// ================= S3 the listing: a photo (flash), then the phone fills in: Size ✓ · ₹ Rent ✓ · Photos ✓ → Listed ✓ =================
const row = (y, txt, at) => `<g transform="translate(0,${y})"><g data-t="${at}" data-k="pop"><rect x="-220" y="-40" width="440" height="80" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
  `<text x="-190" y="12" font-family="Inter" font-weight="900" font-size="34" fill="${C.text}">${txt}</text><circle cx="180" cy="0" r="24" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><path d="M168,0 L177,9 L192,-9" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g></g>`;
const listScr = `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arMysteryHeader() +
  `<g transform="translate(0,-200)">${lehengaHangerSVG('', RED_LEH, .55)}</g>` + row(40, '📏 Size', 'c15') + row(140, '₹ Rent', 'c15+0.6') + row(240, '📸 Photos', 'c16') +
  `<g transform="translate(0,370)"><g data-t="c17" data-k="pop"><rect x="-230" y="-52" width="460" height="104" rx="52" fill="${C.emerald}" stroke="${OL}" stroke-width="5"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="#fff">Rent ke liye listed ✓</text></g></g>`;
addScene('c14', 'c18', {
  svg: homeBG('s3', { noClock: true, noShelf: true, noWindow: true }) + `<path d="M250,430 v40" stroke="${OL}" stroke-width="6"/><circle cx="250" cy="430" r="10" fill="${C.gold}" stroke="${OL}" stroke-width="4"/><g transform="translate(250,560)">${lehengaHangerSVG('s3lh', RED_LEH, .7)}</g>` + stand('s3b', SHREYA, 330, feet(.74), .74) + `<g id="s3ph">${phoneBackSVG(.6)}</g>` +
    `<g transform="translate(250,600)"><g data-t="c14+0.2" data-k="pop" data-out="c14+0.8">${flashSVG(120)}</g></g>` + flash('s3fl') +
    `<g transform="translate(770,830) scale(.68)"><g data-t="c15-0.2" data-k="pop">${phoneSVG('s3p', 0, 0, 560, 1000, listScr)}</g></g>` + sparks([[560, 460], [980, 520]], 'c17'),
  html: pillH(540, 330, 'c17', '<span class="hl">Listed</span> ✓ Rent ke liye', 'green'),
  noWm: true, cam: [1, 1.03], fy: 800, capY: 1420,
  upd(t) {
    const shoot = t < T('c15');
    const B = life('s3b', t, { mouth: 'smile', brows: 'up', look: shoot ? [-.5, -.3] : [.8, 0], R: shoot ? [60, -170] : [120, -60], hR: 'fist', L: [9, -14], seed: 1 });
    atHand('s3ph', 's3b', B.hr, 0, -50, 0); op($('s3ph'), 1);
    const fl = t - T('c14') - .2; op($('s3fl'), fl > 0 && fl < .3 ? (1 - fl / .3) * .7 : 0);
  }
});

// ================= S4 bookings: "MAHINA 1 · 🔔🔔 · 2 bookings" → "MAHINA 2 · 🔔🔔🔔 · 3 bookings" =================
const monthCard = (n, bells, b, at) => `<g data-t="${at}" data-k="pop"><rect x="-380" y="-110" width="760" height="220" rx="28" fill="#fff" stroke="${OL}" stroke-width="6"/>` +
  `<rect x="-380" y="-110" width="200" height="220" rx="28" fill="${C.red}" stroke="${OL}" stroke-width="6"/><text x="-280" y="-14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.cream}">MAHINA</text><text x="-280" y="62" text-anchor="middle" font-family="Inter" font-weight="900" font-size="80" fill="${C.gold}">${n}</text>` +
  `<text x="90" y="-14" text-anchor="middle" font-size="60">${bells}</text><text x="90" y="68" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="${C.emerald}">${b} bookings</text></g>`;
addScene('c18', 'c20', {
  svg: cream() + `<rect width="${W}" height="${H}" fill="${C.cream}" opacity=".6"/>` + `<g transform="translate(540,560)">${monthCard(1, '🔔🔔', 2, 'c18')}</g><g transform="translate(540,860)">${monthCard(2, '🔔🔔🔔', 3, 'c19')}</g>` +
    `<g transform="translate(860,1080)"><g data-t="c19+0.3" data-k="pop">${burstSVG('TING!', '#F7D23A', 70, 30)}</g></g>` + bust('s4b', SHREYA, 330, 1960, 1.05) + `<g id="s4ph">${phoneBackSVG(.7)}</g>`,
  html: '',
  noWm: true, cam: [1, 1.04], fy: 800, capY: 1220,
  upd(t) {
    const B = life('s4b', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.5, -.5], R: [120, -60], hR: 'fist', L: [9, -14], seed: 1 });
    atHand('s4ph', 's4b', B.hr, Math.sin(t * 40) * (t > T('c19') && t < T('c19') + .6 ? 4 : 0), -50, 0);
  }
});

// ================= S5 the ask: Mummy ready to sell everything (cooker, newspapers) — "tag your mummy" =================
addScene('c20', 'c23', {
  svg: cream() + stand('s5m', SUDHA, 540, feet(.84), .84) + `<g id="s5ck"><g transform="scale(.8)">${pressureCookerSVG()}</g></g><g id="s5np"><g transform="scale(.75)">${newspaperBundleSVG()}</g></g>` +
    `<g transform="translate(160,1080)">${priceTagSVG('s5t1', 'SALE', 0, 0, { fs: 30 })}</g><g transform="translate(920,1060)">${priceTagSVG('s5t2', 'SALE', 0, 0, { fs: 30 })}</g>`,
  html: bub(540, 400, 860, 'c20', '', 'Aapki mummy bhi <span class="hl">har cheez bechne ko taiyaar</span> rehti hain? 😂', 40) +
    `<div class="pill maroon big" style="left:540px;top:640px" data-t="c22">Tag <span class="hl">@mummy</span> 😂</div>`,
  noWm: true, cam: [1, 1.04], fy: 820,
  upd(t) {
    const A = life('s5m', t, { mouth: 'grin', brows: 'up', look: [0, 0], tilt: Math.sin(t * 2) * 3, R: [150, -60], L: [150, -60], hR: 'fist', hL: 'fist', seed: 2 });
    atHand('s5ck', 's5m', A.hr, 40, 30, 0); atHand('s5np', 's5m', A.hl, -40, 30, 0);
  }
});

// ================= S6 "Lekin asli twist abhi baaki hai" =================
addScene('c23', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s6r', 540, 860, .18, C.gold) + `<circle cx="540" cy="860" r="420" fill="url(#glow)" opacity=".45"/>` +
    sparks([[200, 640], [880, 620], [260, 1120], [840, 1100], [540, 520]], 'c23+0.2'),
  html: `<div class="title" style="top:860px;font-size:150px" data-t="c23">Asli<br><span class="g">TWIST!</span> 🔥</div>`,
  noWm: true, cam: [1.08, 1], fy: 860, capY: 1300,
  upd(t) { tf($('s6r'), 540, 860, 1, t * 8); }
});

// ================= S7 three months later: Mummy tiptoes in with fifteen sarees — "Beta, inki bhi photo achhi kheechna…" =================
addScene('c25', 'c31', {
  svg: homeBG('s7', { noClock: true, noShelf: true, noWindow: true, night: true }) + roomDoorSVG('s7d', 70, FLOOR, 260, 640) + bedSVG(780, FLOOR - 120, 520, '#F49AB8') +
    stand('s7b', SHREYA, 890, feet(.74), .74) +
    `<g id="s7mw">${stand('s7m', SUDHA, 0, 0, .76)}</g><g id="s7st">${clothesStackSVG('s7stk', 15)}</g>` + sparks([[380, 420]], 'c27'),
  html: pillH(540, 330, 'c25', '📅 <span class="hl">3 mahine baad…</span>', 'gold') + `<div class="pill maroon big" style="left:560px;top:470px" data-t="c27" data-out="c28-0.05">15 sarees! 😳</div>` +
    bub(540, 470, 640, 'c28', '', '"Beta, <span class="hl">inki bhi photo achhi kheechna…</span> aur rent thoda zyada rakhna!" 😏', 34),
  noWm: true, cam: [1, 1.04], fy: 800, capY: 1420,
  init() { for (let k = 0; k < 15; k++) op($(`s7stk-i${k}`), 1); },
  upd(t) {
    doorOpen('s7d', P(t, T('c25') + .3, .6));
    const g = glide(t, T('c26') - .2, 1.8, 200, 400, 6), my = feet(.76);
    tf($('s7mw'), g[0], my + g[1], 1); PL['s7m'] = { x: g[0], y: my + g[1], sc: .76 };
    const talk = t > T('c28');
    const A = life('s7m', t, { mouth: talk ? talkMouth(t, true) : 'smile', brows: 'up', look: talk ? [.8, 0] : [.5, -.2], wink: t > T('c30') && t < T('c30') + .5, lean: talk ? 0 : 6, R: [120, -90], L: [120, -90], hR: 'open', hL: 'open', seed: 2 });
    atHand('s7st', 's7m', A.hr, 20, 30, Math.sin(t * 5) * (talk ? 1 : 4), .62);
    const B = life('s7b', t, { mouth: t > T('c27') ? (t > T('c30') ? 'big' : 'shock') : 'flat', brows: 'up', look: t > T('c26') ? [-.8, 0] : [.3, .3], closed: t > T('c30') + .3, R: [9, -14], L: t > T('c27') ? THINK : [9, -14], hL: 'open', seed: 1 });
  }
});

// ================= S8 "Ab ghar mein lehenga bechne wala koi nahi… sab rent pe dene wale hain" — SALE ❌ → RENT ✅ =================
const coins = [[180, 560], [360, 470], [720, 470], [900, 560], [540, 420]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c32+${(i * .15).toFixed(2)}" data-k="pop" data-bob="8" data-ph="${i}">${coinSVG(0, 0, 34)}</g></g>`).join('');
addScene('c31', 'c34', {
  svg: cream() + `<circle cx="540" cy="760" r="420" fill="url(#glow)" opacity=".7"/>` + stand('s8m', SUDHA, 330, feet(.78), .78) + stand('s8b', SHREYA, 760, feet(.78), .78) + coins,
  html: `<div class="pill maroon big" style="left:540px;top:330px" data-t="c31">SALE ❌ → <span class="hl">RENT ✅</span></div>` +
    pillH(540, 1250, 'c33', 'Ab sab <span class="hl">rent pe dene wale</span> hain 😂', 'gold'),
  noWm: true, cam: [1, 1.04], fy: 780, capY: 1400,
  upd(t) {
    life('s8m', t, { mouth: 'big', brows: 'up', look: [.6, -.2], R: [150, 40], L: [150, 40], hR: 'open', hL: 'open', y: hop(t, T('c32'), 20) + hop(t, T('c33'), 20), seed: 2 });
    life('s8b', t, { speak: true, brows: 'up', look: [-.6, -.2], R: [150, 40], L: [150, 40], hR: 'open', hL: 'open', y: hop(t, T('c32') + .15, 22) + hop(t, T('c33') + .15, 22), seed: 1 });
  }
});

// ================= S9 pink end card: logo, "Bechna nahi… rent ke liye list karo, aur kamao ✨", comment box typing RENT; Mummy waves =================
addScene('c34', 9999, {
  svg: `<defs><linearGradient id="s9pk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCE4EC"/><stop offset="1" stop-color="#F6B4C8"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#s9pk)"/>` +
    rosettes('s9r', 540, 760, .16, C.red) + `<g transform="translate(540,960)"><g data-t="c36" data-k="pop">${commentBoxSVG('s9cb', 760)}</g></g>` +
    sparks([[150, 600], [930, 600]], 'c34') + bust('s9m', SUDHA, 850, 1960, .95),
  html: `<img id="s9wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="bubble" style="left:540px;top:690px;width:860px;font-size:46px" data-t="c34+0.2"><span class="hl">Bechna nahi…</span> rent ke liye list karo, aur kamao ✨</div>` +
    pillH(540, 1100, 'c37', 'Comment <span class="hl">RENT</span> 👇', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 760, capY: 1260,
  init() { $('s9wm').src = SEAL().replace('seal-on-maroon.svg', 'AnokhiReet_logo_maroon.svg'); },
  upd(t) {
    tf($('s9r'), 540, 760, 1, t * 5);
    commentType('s9cb', t, T('c37') + .4, 'RENT', 760, 5);
    life('s9m', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.3, -.3], tilt: -5, L: WAVE(t, T('c34')), hL: 'open', seed: 2 });
  }
});
