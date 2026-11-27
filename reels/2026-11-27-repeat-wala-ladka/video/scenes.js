// ===== Repeat wala ladka (peach wedding stage, marigold toran, red-gold arch; two voices: Kabir and Tanvi) =====
// Open loops: "chauthi shaadi mein jo hua" and "asli twist". App name hidden until the end card.
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const feet = sc => FLOOR + 40 - 372 * sc;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const burst = (x, y, at, txt, fill, r = 110, fs = 44, rot = -8, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>${burstSVG(txt, fill, r, fs)}</g></g>`;
const bub = (x, y, w, at, out, html, fs = 36) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const sparks = (pts, at) => pts.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="${at}+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join('');
// a tilted ribbon banner (red or gold) with outlined text
const banner = (id, x, y, at, txt, fill = '#C0262D', col = '#fff', w = 860, rot = -4, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g id="${id}" data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>` +
  `<path d="M${-w / 2 - 50},-40 L${-w / 2},-40 L${-w / 2},40 L${-w / 2 - 50},40 L${-w / 2 - 26},0 Z M${w / 2 + 50},-40 L${w / 2},-40 L${w / 2},40 L${w / 2 + 50},40 L${w / 2 + 26},0 Z" fill="${fill === C.gold ? '#C9A24A' : '#7E1A1E'}" stroke="${OL}" stroke-width="5" transform="translate(0,18)"/>` +
  `<rect x="${-w / 2}" y="-52" width="${w}" height="104" rx="8" fill="${fill}" stroke="${OL}" stroke-width="6"/>` +
  `<text y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="62" fill="${col}" stroke="${OL}" stroke-width="${col === '#fff' ? 8 : 0}" paint-order="stroke">${txt}</text></g></g>`;
const KM = KABIR.maroon, KB = KABIR.blue, [D1, D2, D3] = KABIR_DOST.map(d => d.look);

// ================= S1 hook: Kabir alone in the arch (maroon sherwani); the dost pop in pointing; "REPEAT WALA LADKA" =================
addScene(0, 'c6', {
  svg: archStageBG('s1') + `<circle cx="540" cy="800" r="360" fill="url(#glow)" opacity=".6"/>` +
    `<g data-t="c2" data-k="pop">${stand('s1d1', D1, 150, feet(.6), .6)}</g><g data-t="c2+0.25" data-k="pop">${stand('s1d3', D3, 310, feet(.56) - 20, .56)}</g><g data-t="c2+0.5" data-k="pop">${stand('s1d2', D2, 930, feet(.6), .6)}</g>` +
    stand('s1k', KM, 560, feet(.82), .82) +
    banner('s1ban', 540, 470, 'c3', 'REPEAT WALA LADKA 😭') +
    burst(180, 640, 'c2+0.3', 'HAHA!', '#fff', 70, 30, -10, 'c4') + burst(900, 620, 'c2+0.6', 'HAHA!', '#fff', 70, 30, 8, 'c4'),
  html: `<div class="title" style="top:320px;font-size:76px" data-t="-1" data-out="c4">3 shaadi, <span class="g">1 sherwani…</span> 👀</div>` +
    pillH(540, 320, 'c4', '<span class="hl">Dost ko tag</span> karoge 😄', 'gold'),
  noWm: true, cam: [1, 1.04], fy: 800,
  upd(t) {
    const named = t > T('c3');
    life('s1k', t, { mouth: t < T('c2') ? 'smile' : (t < T('c4') ? 'worry' : talkMouth(t, true)), brows: named ? 'worry' : 'up', look: t < T('c2') ? [0, 0] : [-.6, 0], sweat: named ? .6 : 0,
      R: t > T('c4') ? [70, -60] : [9, -14], L: t > T('c4') ? [70, -60] : [9, -14], hR: 'open', hL: 'open', seed: 1 });
    [['s1d1', [.8, 0], 2], ['s1d3', [.8, 0], 3], ['s1d2', [-.8, 0], 4]].forEach(([id, look, sd]) =>
      life(id, t, { mouth: 'big', brows: 'up', closed: Math.floor(t * 1.6 + sd) % 3 === 0, look, tilt: Math.sin(t * 8 + sd) * 4, R: id === 's1d2' ? [9, -14] : [150, -30], L: id === 's1d2' ? [150, -30] : [9, -14], hR: 'point', hL: 'point', seed: sd }));
  }
});

// ================= S2 shaadi 1 and 2: "Bhai, mast sherwani!" 👍 … "Bhai, ye wahi hai na?" 🤨 =================
addScene('c6', 'c10', {
  svg: archStageBG('s2') + stand('s2d1', D1, 200, feet(.7), .7) + stand('s2d2', D2, 880, feet(.7), .7) + stand('s2k', KM, 540, feet(.8), .8),
  html: pillH(540, 320, 'c6', '<span class="hl">SHAADI 1</span> 💍', '', 'c8-0.05') + pillH(540, 320, 'c8', '<span class="hl">SHAADI 2</span> 💍💍') +
    bub(300, 490, 420, 'c7', 'c8-0.05', '"Bhai, <span class="hl">mast sherwani!</span>" 👍') + bub(780, 490, 420, 'c9', '', '"Bhai, <span class="hl">ye wahi hai na?</span>" 🤨'),
  noWm: true, cam: [1, 1.03], fy: 820,
  upd(t) {
    const two = t > T('c8');
    life('s2k', t, { mouth: two ? (t > T('c9') + .6 ? 'worry' : 'flat') : 'big', brows: two ? 'worry' : 'up', look: two ? [.7, 0] : [-.7, 0], sweat: t > T('c9') + .6 ? .8 : 0, R: [9, -14], L: two ? [9, -14] : [40, -20], seed: 1 });
    life('s2d1', t, { mouth: two ? 'flat' : 'big', brows: 'up', look: [.8, 0], R: two ? [9, -14] : [130, -70], hR: 'thumb', L: [9, -14], seed: 2 });
    life('s2d2', t, { mouth: two ? (t > T('c9') ? talkMouth(t, true) : 'flat') : 'smile', brows: two ? 'angry' : 'up', look: [-.8, 0], tilt: two ? -6 : 0, L: two ? THINK : [9, -14], hL: 'point', R: [9, -14], seed: 3 });
  }
});

// ================= S3 shaadi 3: the group photo — scissors crop Kabir out (CROP! ✂️😭) =================
const PH_Y = 900;
addScene('c10', 'c13', {
  svg: `<rect width="${W}" height="${H}" fill="#F9D9C2"/>` + toranSVG(W, 0) + rosettes('s3r', 540, PH_Y, .1, C.marigold) +
    `<defs><clipPath id="s3clip"><rect x="-406" y="-466" width="812" height="836"/></clipPath><clipPath id="s3clipL"><rect x="-406" y="-466" width="566" height="836"/></clipPath><clipPath id="s3clipR"><rect x="160" y="-466" width="246" height="836"/></clipPath></defs>` +
    `<g transform="translate(540,${PH_Y}) rotate(-2)">` +
    `<g clip-path="url(#s3clipL)"><rect x="-406" y="-466" width="812" height="836" fill="#F4C9AE"/>${[...Array(15)].map((_, i) => `<circle cx="${-390 + i * 56}" cy="${-440 + Math.sin(i / 14 * Math.PI) * 30}" r="18" fill="${i % 2 ? C.marigold : '#E8962E'}" stroke="${OL}" stroke-width="3"/>`).join('')}` +
    bust('s3d1', D1, -300, 400, .9) + bust('s3d3', D3, -100, 420, .86) + bust('s3d2', D2, 70, 400, .9) + `</g>` +
    `<g id="s3cut"><g clip-path="url(#s3clipR)"><rect x="-406" y="-466" width="812" height="836" fill="#F4C9AE"/>${bust('s3k', KM, 285, 400, .9)}</g><path d="M160,-466 V370" stroke="#fff" stroke-width="6" stroke-dasharray="18 12"/></g>` +
    polaroidSVG(860, 980, 'Shaadi 3 📸') + `</g>` +
    `<g id="s3sc" transform="translate(700,380) rotate(90)">${scissorsSVG('s3sc')}</g>`,
  html: pillH(540, 320, 'c10', '<span class="hl">SHAADI 3</span> 💍💍💍') + `<div class="pill maroon big" style="left:400px;top:560px" data-t="c12+0.3">CROP! ✂️😭</div>`,
  noWm: true, cam: [1, 1.03], fy: 900, capY: 1480,
  upd(t) {
    const k = P(t, T('c11'), T('c12') + .2 - T('c11'), E.io); tf($('s3sc'), 700, lerp(380, 1330, k), 1.1, 90); scissorsSnip('s3sc', t, k > 0 && k < 1 ? 4 : 0); op($('s3sc'), k >= 1 ? clamp(1 - (t - T('c12') - .2) * 3) : 1);
    const f = P(t, T('c12') + .2, 1.2, E.in); tf($('s3cut'), f * 260, f * 320, 1, f * 28);
    ['s3d1', 's3d3', 's3d2'].forEach((id, i) => life(id, t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], tilt: [4, -3, 5][i], seed: i + 2, R: i === 1 ? [140, -60] : [9, -14], hR: 'two' }));
    life('s3k', t, { pivot: 0, mouth: f > 0 ? 'shock' : 'smile', brows: f > 0 ? 'worry' : 'up', look: [-.4, 0], sweat: f > 0 ? .9 : 0, seed: 1 });
  }
});

// ================= S4 ask: "Kitni baar repeat kiya?" — number bubbles pop like comments =================
const NUMS = [['5 😭', 200, 700, 'c14'], ['3 😅', 880, 640, 'c14+0.4'], ['10 🙈', 170, 1000, 'c14+0.8'], ['7', 900, 960, 'c15'], ['1 hi baar 😎', 540, 560, 'c15+0.4']];
addScene('c13', 'c16', {
  svg: archStageBG('s4') + `<rect width="${W}" height="${H}" fill="#F9D9C2" opacity=".55"/>` + bust('s4k', KM, 540, 1960, 1.15),
  html: pillH(540, 330, 'c13', 'Kitni baar <span class="hl">REPEAT</span> kiya? 🔢', 'maroon big') +
    NUMS.map(([n, x, y, at]) => `<div class="bubble" style="left:${x}px;top:${y}px;font-size:48px;padding:16px 30px;white-space:nowrap" data-t="${at}">💬 ${n}</div>`).join(''),
  noWm: true, cam: [1, 1.05], fy: 1100, capY: 1180,
  upd(t) {
    life('s4k', t, { pivot: 0, speak: true, brows: 'up', look: [0, 0], R: t > T('c14') ? [100, -170] : [9, -14], hR: 'point', tilt: Math.sin(t * 3) * 3, seed: 1 });
  }
});

// ================= S5 "Lekin asli twist abhi baaki hai" — dark red title slam =================
addScene('c16', 'c18', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s5r', 540, 860, .18, C.gold) + `<circle cx="540" cy="860" r="420" fill="url(#glow)" opacity=".45"/>` +
    sparks([[200, 640], [880, 620], [260, 1120], [840, 1100], [540, 520]], 'c16+0.2'),
  html: `<div class="title" style="top:860px;font-size:150px" data-t="c16">Asli<br><span class="g">TWIST!</span> 🔥</div>`,
  noWm: true, cam: [1.08, 1], fy: 860, capY: 1300,
  upd(t) { tf($('s5r'), 540, 860, 1, t * 8); }
});

// ================= S6 before shaadi 4: Kabir rents a royal blue sherwani on his phone (app name hidden) =================
const rentScreen = `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arMysteryHeader() +
  `<circle cx="0" cy="-120" r="190" fill="url(#glow)"/><g transform="translate(0,-110) scale(1.45)">${kidOutfitSVG('sherwani', '#2F4FB0', '#C9A24A')}</g>` +
  `<text y="170" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${C.text}">Royal Blue Sherwani</text>` +
  `<g transform="translate(0,300)"><g data-t="c21" data-k="pop"><rect x="-200" y="-56" width="400" height="112" rx="56" fill="${C.emerald}" stroke="${OL}" stroke-width="5"/><text y="16" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="#fff">RENT PAR ✓</text></g></g>`;
addScene('c18', 'c22', {
  svg: homeBG('s6', { noClock: true }) + stand('s6k', KABIR.home, 290, feet(.8), .8) + `<g id="s6ph">${phoneBackSVG(.6)}</g>` +
    `<g transform="translate(760,800) scale(.62)"><g data-t="c19" data-k="pop">${phoneSVG('s6p', 0, 0, 560, 1000, rentScreen)}</g></g>` + sparks([[560, 520], [960, 560]], 'c21'),
  html: bub(330, 470, 470, 'c18', '', '"<span class="hl">Chauthi shaadi</span> se pehle…" 🤔') + pillH(760, 1220, 'c20', 'Royal Blue 💙', 'gold'),
  noWm: true, cam: [1, 1.04], fy: 820, capY: 1400,
  upd(t) {
    const B = life('s6k', t, { speak: true, brows: 'up', look: [.8, .2], R: [120, -60], hR: 'fist', L: [9, -14], tilt: t > T('c21') ? 5 : 0, seed: 1 });
    atHand('s6ph', 's6k', B.hr, 0, -60, 8);
  }
});

// ================= S7 shaadi 4: royal blue — dost go quiet; the photographer poses only him (📷 CLICK!) =================
addScene('c22', 'c26', {
  svg: archStageBG('s7') + `<circle cx="540" cy="800" r="380" fill="url(#glow)" opacity=".7"/>` +
    `<g id="s7dL">${stand('s7d1', D1, 0, 0, .6)}</g><g id="s7dL2">${stand('s7d3', D3, 0, 0, .56)}</g><g id="s7dR">${stand('s7d2', D2, 0, 0, .6)}</g>` + stand('s7k', KB, 540, feet(.84), .84) +
    `<g id="s7pg">${stand('s7p', PHOTOGRAPHER, 0, 0, .66)}</g><g id="s7cam">${cameraSVG()}</g>` +
    `<g transform="translate(790,700)"><g data-t="c25" data-k="pop" data-out="c25+0.6">${flashSVG(110)}</g></g>` + flash('s7fl') +
    sparks([[330, 520], [760, 500], [540, 420]], 'c22+0.3'),
  html: pillH(540, 320, 'c22', 'Aur shaadi mein? 👀', 'gold') + bub(200, 600, 200, 'c23', 'c24+0.4', '…', 60) + bub(900, 600, 200, 'c23+0.2', 'c24+0.4', '…', 60) +
    `<div class="pill gold big" style="left:760px;top:520px" data-t="c25">📷 CLICK!</div>`,
  noWm: true, cam: [1, 1.05], fy: 820,
  upd(t) {
    const push = P(t, T('c24') + .2, .7, E.io);
    const yL = feet(.6), yL2 = feet(.56) - 20;
    tf($('s7dL'), 160 - push * 120, yL, 1); PL['s7d1'] = { x: 160 - push * 120, y: yL, sc: .6 };
    tf($('s7dL2'), 320 - push * 200, yL2, 1); PL['s7d3'] = { x: 320 - push * 200, y: yL2, sc: .56 };
    tf($('s7dR'), 920 + push * 140, yL, 1); PL['s7d2'] = { x: 920 + push * 140, y: yL, sc: .6 };
    [['s7d1', [.8, 0], 2], ['s7d3', [.8, 0], 3], ['s7d2', [-.8, 0], 4]].forEach(([id, look, sd]) => life(id, t, { mouth: 'shock', brows: 'up', look, R: [9, -14], L: [9, -14], seed: sd }));
    life('s7k', t, { mouth: 'grin', brows: 'up', look: t > T('c24') ? [.5, 0] : [0, 0], tilt: t > T('c25') ? 6 : 0, R: t > T('c24') + .8 ? [60, -120] : [9, -14], hR: 'fist', L: [9, -14], seed: 1 });
    const g = glide(t, T('c24'), .9, 1240, 860, 10), py = feet(.66);
    tf($('s7pg'), g[0], py + g[1], 1); PL['s7p'] = { x: g[0], y: py + g[1], sc: .66 };
    const B = life('s7p', t, { mouth: 'flat', brows: 'up', look: [-.9, 0], R: THINK, L: THINK, hR: 'fist', hL: 'fist', closed: true, seed: 5 });
    atHand('s7cam', 's7p', B.hr, -30, -10, 0, .8);
    const fl = t - T('c25'); op($('s7fl'), fl > 0 && fl < .3 ? (1 - fl / .3) * .8 : 0);
  }
});

// ================= S8 the crush (Tanvi, pink suit) walks up; hearts; "ye look kahan se?" — "Rent par!" — "matching karenge!" =================
const CHIPS = [['👗 Lehenga', 300, 1140, 'c33'], ['🥻 Saree', 760, 1140, 'c33+0.66'], ['💃 Chaniya choli', 540, 1240, 'c33+1.12']];
addScene('c26', 'c38', {
  svg: archStageBG('s8') + `<circle cx="540" cy="820" r="400" fill="url(#glow)" opacity=".6"/>` +
    `<g id="s8dost"><g transform="translate(110,${feet(.5) - 40})">${stand('s8d1', D1, 0, 0, .5)}</g><g transform="translate(980,${feet(.5) - 40})">${stand('s8d2', D2, 0, 0, .5)}</g></g>` +
    `<g id="s8tw">${stand('s8t', TANVI, 0, 0, .78)}</g>` + stand('s8k', KB, 730, feet(.82), .82) +
    floatHeartsSVG('s8h', 8, 540, 980) + burst(540, 560, 'c37', '💕', '#F6B4C8', 80, 60, 0),
  html: bub(330, 470, 520, 'c29', 'c31-0.05', '"<span class="hl">Aaj toh pehchaan hi nahi paayi…</span> ye look kahan se?" 😳', 34) +
    bub(720, 470, 560, 'c31', 'c35', '"<span class="hl">Rent par!</span> Tu bhi sab rent par le sakti hai." 😎', 34) +
    CHIPS.map(([txt, x, y, at]) => pillH(x, y, at, txt, 'gold', 'c35+0.5')).join('') +
    bub(330, 470, 520, 'c36', '', '"Toh agli shaadi mein <span class="hl">matching</span> karenge!" 💕', 34),
  noWm: true, cam: [1, 1.04], fy: 820,
  upd(t) {
    const g = glide(t, T('c26') + .2, 1.6, -200, 320, 10), ty = feet(.78);
    tf($('s8tw'), g[0], ty + g[1], 1); PL['s8t'] = { x: g[0], y: ty + g[1], sc: .78 };
    const herLine = (t > T('c29') && t < T('c31')) || t > T('c36');
    life('s8t', t, { mouth: herLine ? talkMouth(t, true) : (t > T('c35') ? 'smile' : 'o'), brows: 'up', look: [.8, t < T('c30') ? .3 : 0], blush: t > T('c34') ? .8 : .3,
      wink: t > T('c37') && t < T('c37') + .5, tilt: t > T('c35') ? 6 : 0, R: t > T('c36') ? [90, -40] : [9, -14], hR: 'open', L: [9, -14], seed: 6 });
    const hisLine = t > T('c31') && t < T('c36');
    life('s8k', t, { mouth: hisLine ? talkMouth(t, true) : (t > T('c29') ? 'grin' : 'smile'), brows: 'up', look: [-.8, 0], blush: t > T('c36') ? .7 : 0,
      R: t > T('c29') && t < T('c31') ? [20, -150] : [9, -14], L: t > T('c29') && t < T('c31') ? [20, -150] : (hisLine ? [110, -40] : [9, -14]), hR: 'fist', hL: hisLine ? 'open' : 'fist', seed: 1 });
    floatHearts('s8h', 8, t, T('c27'));
    op($('s8dost'), clamp((t - T('c36')) * 3));
    ['s8d1', 's8d2'].forEach((id, i) => life(id, t, { mouth: 'big', brows: 'up', look: [i ? -.6 : .6, 0], R: [150, 40], L: [150, 40], hR: 'open', hL: 'open', y: hop(t, T('c37') + i * .15, 20), seed: i + 2 }));
  }
});

// ================= S9 "Repeat wala ladka" → "Look wala ladka": the banner flips; the dost lift him up =================
addScene('c38', 'c40', {
  svg: archStageBG('s9') + `<circle cx="540" cy="760" r="420" fill="url(#glow)" opacity=".7"/>` +
    stand('s9d1', D1, 140, feet(.6), .6) + stand('s9d3', D3, 300, feet(.56) - 20, .56) + stand('s9d2', D2, 940, feet(.6), .6) + `<g id="s9kg">${stand('s9k', KB, 0, 0, .8)}</g>` +
    banner('s9old', 540, 470, 'c38', 'REPEAT WALA LADKA 😭', '#C0262D', '#fff', 860, -4, 'c39') +
    `<g transform="translate(540,470) rotate(-4)"><path id="s9x" d="M-420,0 L420,0" stroke="${OL}" stroke-width="16" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></g>` +
    banner('s9new', 540, 470, 'c39', 'LOOK WALA LADKA 😎', C.gold, C.redDark, 860, 3) + sparks([[160, 420], [920, 420], [540, 330]], 'c39'),
  html: '',
  noWm: true, cam: [1, 1.04], fy: 800,
  upd(t) {
    $('s9x').setAttribute('stroke-dashoffset', 1 - P(t, T('c38') + .4, .5)); op($('s9x'), t < T('c39') ? 1 : 0);
    const ky = feet(.8) + hop(t, T('c39'), 60, .5) + hop(t, T('c39') + .9, 40, .45);
    tf($('s9kg'), 610, ky, 1); PL['s9k'] = { x: 610, y: ky, sc: .8 };
    life('s9k', t, { speak: true, brows: 'up', look: [0, 0], R: t > T('c39') ? [150, 40] : [9, -14], L: t > T('c39') ? [150, 40] : [9, -14], hR: 'open', hL: 'open', seed: 1 });
    [['s9d1', [.8, -.3], 2], ['s9d2', [-.8, -.3], 4], ['s9d3', [0, -.6], 3]].forEach(([id, look, sd]) =>
      life(id, t, { mouth: t > T('c39') ? 'big' : 'smile', brows: 'up', look, R: [150, 40], L: [150, 40], hR: 'open', hL: 'open', y: hop(t, T('c39') + sd * .1, 18), seed: sd }));
  }
});

// ================= S10 end card (dark red): logo, "LOOK WALA LADKA 😎", outfit chips, a comment box typing LOOK → Post =================
const END_CHIPS = [['👗 Lehenga', 300, 730, 'c41'], ['🥻 Saree', 780, 730, 'c41+0.3'], ['💃 Chaniya choli', 300, 830, 'c41+0.6'], ['🤵 Sherwani', 780, 830, 'c41+0.9']];
addScene('c40', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s10r', 540, 760, .16, C.gold) + `<circle cx="540" cy="760" r="420" fill="url(#glow)" opacity=".45"/>` +
    `<g transform="translate(540,990)"><g data-t="c43" data-k="pop">${commentBoxSVG('s10cb', 760)}</g></g>` +
    sparks([[150, 560], [930, 560]], 'c40') + bust('s10k', KB, 230, 1960, .95) + bust('s10t', TANVI, 860, 1960, .9),
  html: `<img id="s10wm" style="position:absolute;left:310px;top:250px;width:460px" src="">` + pillH(540, 600, 'c40+0.2', 'LOOK WALA LADKA 😎', 'gold big') +
    END_CHIPS.map(([txt, x, y, at]) => pillH(x, y, at, txt)).join('') + pillH(540, 1110, 'c44', 'Comment <span class="hl">LOOK</span> 👇', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 760, capY: 1260,
  init() { $('s10wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s10r'), 540, 760, 1, t * 5);
    commentType('s10cb', t, T('c44') + .5, 'LOOK', 760, 5);
    life('s10k', t, { pivot: 0, speak: true, brows: 'up', look: [.3, -.3], tilt: 5, R: t > T('c44') ? WAVE(t, T('c44')) : [9, -14], hR: 'open', seed: 1 });
    life('s10t', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.3, -.3], tilt: -5, blush: .5, L: t > T('c44') ? WAVE(t, T('c44')) : [9, -14], hL: 'open', seed: 6 });
  }
});
