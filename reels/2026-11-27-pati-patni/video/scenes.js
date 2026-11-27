// ===== Pati-patni dono ka ek secret (comic + a light detective feel; two voices: Kinjal and Nirav) =====
// Open loops: "twist end mein" (she rents, he rents out) and "asli twist" (his earnings = her rent). App hidden till the end.
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const UDA = (x = 540, y = 450, at = '-1', out = '') => pillH(x, y, at, 'Udaharan 📝', 'gold', out);
const feet = sc => FLOOR + 40 - 372 * sc;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const burst = (x, y, at, txt, fill, r = 110, fs = 44, rot = -8, out = '') => `<g transform="translate(${x},${y}) rotate(${rot})"><g data-t="${at}" data-k="pop"${out ? ` data-out="${out}"` : ''}>${burstSVG(txt, fill, r, fs)}</g></g>`;
const bub = (x, y, w, at, out, html, fs = 32) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const sparks = (pts, at) => pts.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="${at}+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join('');
const KH = KINJAL.home, NH = NIRAV.home;
// a simple app list screen for phoneSVG(…, 560, 1000): header (hidden name or the app), a title, rows [[label, sub, colour]]
const listScreen = (real, title, rows) => `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + (real ? arHeader() : arMysteryHeader()) +
  `<text x="-230" y="-320" font-family="Inter" font-weight="900" font-size="40" fill="${C.text}">${title}</text>` +
  rows.map(([l, sub, c], i) => `<g transform="translate(0,${-200 + i * 170})"><rect x="-230" y="-70" width="460" height="140" rx="20" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
    `<g transform="translate(-165,0)">${c === 'sher' ? `<g transform="scale(.42)">${kidOutfitSVG('sherwani', '#F2E2C4', '#C9A24A')}</g>` : lehengaHangerSVG('', { c, d: c, dupatta: '#FFF0F5' }, .3)}</g>` +
    `<text x="-100" y="-8" font-family="Inter" font-weight="900" font-size="30" fill="${C.text}">${l}</text><text x="-100" y="34" font-family="Inter" font-weight="800" font-size="28" fill="#1F7A4D">${sub}</text>` +
    `<circle cx="190" cy="0" r="28" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><path d="M177,0 L186,10 L203,-10" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>`).join('');

// ================= S1 hook: a horizontal split — Kinjal (top) and Nirav (bottom), finger on chin, both suspicious =================
const qm = (x, y, at, i) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="pop" data-bob="8" data-ph="${i}"><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="84" fill="${C.red}" stroke="${OL}" stroke-width="3">?</text></g></g>`;
addScene(0, 'c6', {
  svg: `<rect width="${W}" height="960" fill="#F3DCC0"/><rect y="960" width="${W}" height="960" fill="#D9E4EE"/>` +
    `<g transform="translate(0,0)">${homeBG('s1a', { noWindow: true, noClock: true, noPlant: true, shelfX: 760 }).replace(/<rect x="0" y="0" width="1080" height="1920" fill="[^"]+"\/>/, '')}</g>` +
    `<rect y="960" width="${W}" height="960" fill="#D9E4EE"/>` + windowSVG(820, 1080, 180, 200, { curtain: '#3A6AA3' }) + bust('s1k', KH, 540, 960, .95) + `<rect y="940" width="${W}" height="40" fill="${C.redDark}"/>` + bust('s1n', NH, 540, 1920, .95) +
    qm(250, 560, '0.4', 0) + qm(870, 470, 'c1+0.9', 1) + qm(260, 1480, 'c3', 2) + qm(830, 1530, 'c3+0.4', 3) +
    `<g transform="translate(540,960)"><g data-t="c4" data-k="pop"><circle r="80" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="120" fill="${C.red}">?</text></g></g>`,
  html: `<div class="title" style="top:330px;font-size:72px" data-t="-1">Dono ka ek <span class="g">SECRET</span> 🤫</div>` + pillH(540, 1080, 'c4+0.3', 'Twist <span class="hl">end mein</span> 👀', 'gold'),
  noWm: true, cam: [1, 1.03], fy: 960, capY: 1240,
  upd(t) {
    life('s1k', t, { pivot: 0, mouth: t < T('c3') ? talkMouth(t, true) : 'flat', brows: 'worry', look: [.8, -.4], tilt: -8, R: [50, 160], hR: 'point', L: CLASP, seed: 2 });
    life('s1n', t, { pivot: 0, mouth: t > T('c3') && t < T('c4') ? talkMouth(t, true) : 'flat', brows: 'worry', look: [-.8, -.4], tilt: 8, L: [50, 160], hL: 'point', R: CLASP, sweat: t > T('c3') ? .5 : 0, seed: 3 });
  }
});

// ================= S2 her suspicion: the sherwani goes in a bag, he leaves whistling, "Payment received" =================
const P1 = 400, P2 = 700, P3 = 1000;
addScene('c6', 'c9', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` +
    `<g data-t="c6" data-k="pop">${comicPanel('s2a', 40, P1, 1000, 280, '#F7D23A', bust('s2n1', NH, 300, P1 + 380, .58) + `<g transform="translate(560,${P1 + 170})"><g transform="scale(.6)">${kidOutfitSVG('sherwani', '#F2E2C4', '#C9A24A')}</g></g><g transform="translate(760,${P1 + 190}) scale(.5)">${bagSVG()}</g>`)}</g>` +
    `<g data-t="c6+1.3" data-k="pop">${comicPanel('s2b', 40, P2, 1000, 280, '#8FD3E8', `<g id="s2w">${stand('s2n2', NH, 0, 0, .34)}</g><g id="s2bg"><g transform="scale(.3)">${bagSVG()}</g></g>` + `<g transform="translate(820,${P2 + 90})"><g data-t="c6+1.6" data-k="pop" data-bob="8"><text font-size="56">🎵🎶</text></g></g>`)}</g>` +
    `<g data-t="c7" data-k="pop">${comicPanel('s2c', 40, P3, 1000, 280, '#F4A0B8', bust('s2n3', NH, 260, P3 + 380, .58) + `<g transform="translate(680,${P3 + 140})"><g transform="scale(.7)">${notifSVG('Bank', 'Payment received ₹1,200', 620)}</g></g>`)}</g>` +
    `<g transform="translate(900,${P1 + 60})"><g data-t="c6+0.2" data-k="pop"><text text-anchor="middle" font-size="60">🔍</text></g></g>`,
  html: pillH(540, 352, 'c8', 'Sherwani 👜 + Payment 📱 = <span class="hl">???</span> 🤨') + UDA(540, P3 + 330, 'c7+0.3'),
  noWm: true, cam: [1, 1.02], fy: 860, capY: 1400,
  upd(t) {
    life('s2n1', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [.8, .2], R: [80, -40], hR: 'fist', L: [9, -14], seed: 3 });
    const g = glide(t, T('c6') + 1.4, 2.2, 180, 760, 8), y0 = P2 + 280 - 372 * .34 - 10;
    tf($('s2w'), g[0], y0 + g[1], 1); PL['s2n2'] = { x: g[0], y: y0 + g[1], sc: .34 };
    const B = life('s2n2', t, { mouth: 'o', brows: 'up', look: [.9, 0], R: [20, -10], hR: 'fist', L: [9, -14], seed: 3 }); atHand('s2bg', 's2n2', B.hr, 0, 30, 0);
    life('s2n3', t, { pivot: 0, mouth: 'worry', brows: 'worry', look: [-.9, 0], sweat: .9, tilt: -6, R: [9, -14], L: [9, -14], seed: 3 });
  }
});

// ================= S3 his suspicion: a new outfit at every function — the credit card bill! =================
const LOOKS = [[KINJAL.yellow, '#F7D23A', 40, 'c9'], [KINJAL.purple, '#C9A6E8', 380, 'c9+1.0'], [KINJAL.red, '#F4A0B8', 720, 'c10']];
addScene('c9', 'c13', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` +
    LOOKS.map(([look, bg, x, at], i) => `<g data-t="${at}" data-k="pop">${comicPanel('s3p' + i, x, 400, 320, 560, bg, stand('s3k' + i, look, x + 160, 400 + 40 + 545 * .5, .5))}</g>`).join('') +
    `<g data-t="c11" data-k="pop">${comicPanel('s3q', 40, 990, 1000, 330, '#FFE0B2', bust('s3n', NH, 300, 1460, .7) + `<g transform="translate(700,${990 + 170}) rotate(-6)"><rect x="-200" y="-110" width="400" height="220" rx="16" fill="#fff" stroke="${OL}" stroke-width="5"/><text y="-50" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${C.text}">💳 CARD BILL</text><text y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#D9363E">₹₹₹₹ 😱</text></g>`)}</g>`,
  html: pillH(540, 352, 'c11', 'Har function <span class="hl">NAYA</span> outfit 😳 = 💳😱?'),
  noWm: true, cam: [1, 1.02], fy: 860, capY: 1420,
  upd(t) {
    LOOKS.forEach((_, i) => life('s3k' + i, t, { mouth: 'grin', brows: 'up', look: [0, 0], tilt: [5, -5, 4][i], R: i === 1 ? [9, -14] : [150, -40], hR: 'open', L: i === 2 ? [40, -120] : [9, -14], sway: 2, seed: i + 2 }));
    life('s3n', t, { pivot: 0, mouth: t > T('c12') ? 'shock' : talkMouth(t, true), brows: 'worry', look: [.9, 0], sweat: .9, tilt: t > T('c12') ? -10 : 0, R: [9, -14], L: [9, -14], seed: 3 });
  }
});

// ================= S4 the showdown: arms crossed — "Sach batao…" "Pehle tum batao…" — 1… 2… 3… phones out =================
addScene('c13', 'c16', {
  svg: homeBG('s4', { night: true, lamp: true, lampX: 540, noShelf: true, noClock: true }) + stand('s4k', KH, 260, feet(.74), .74) + stand('s4n', NH, 820, feet(.74), .74) +
    `<g id="s4p1">${phoneBackSVG(.8)}</g><g id="s4p2">${phoneBackSVG(.8)}</g>` +
    ['1…', '2…', '3…'].map((n, i) => `<g transform="translate(540,${700 + i * 0})"><g data-t="c15+${(.3 + i * .55).toFixed(2)}" data-k="pop" data-out="c15+${(.8 + i * .55).toFixed(2)}"><circle r="90" fill="#F7D23A" stroke="${OL}" stroke-width="${OW}"/><text y="36" text-anchor="middle" font-family="Inter" font-weight="900" font-size="100" fill="${C.redDark}">${n[0]}</text></g></g>`).join('') +
    burst(540, 700, 'c15+1.9', '📱📱', '#fff', 100, 60, 0),
  html: bub(300, 560, 440, 'c13', 'c14-0.05', '"<span class="hl">Sach batao,</span> sherwani kahan jaati hai?"') + bub(780, 560, 440, 'c14', 'c15+0.2', '"<span class="hl">Pehle tum batao,</span> itne outfits kahan se aate hain?"') +
    pillH(540, 352, 'c15', '1… 2… 3… 📱📱'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const out = t > T('c15') + 1.9;
    const A = life('s4k', t, { mouth: t < T('c14') ? talkMouth(t, true) : 'flat', brows: 'angry', look: [.9, 0], L: out ? [9, -14] : [20, -120], R: out ? [120, -70] : [20, -120], hR: 'fist', seed: 2 });
    const B = life('s4n', t, { mouth: t > T('c14') && t < T('c15') ? talkMouth(t, true) : 'flat', brows: 'angry', look: [-.9, 0], L: out ? [120, -70] : [20, -120], R: out ? [9, -14] : [20, -120], hL: 'fist', seed: 3 });
    atHand('s4p1', 's4k', A.hr, 0, -90, 6); atHand('s4p2', 's4n', B.hl, 0, -90, -6); op($('s4p1'), out ? 1 : 0); op($('s4p2'), out ? 1 : 0);
  }
});

// ================= S5 twist 1: her rentals, his listings (app name hidden) — WHAT?! =================
addScene('c16', 'c18', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` + comicPanel('s5p', 40, 420, 1000, 880, '#B8E08F', '') +
    `<g transform="translate(290,820) scale(.62)">${phoneSVG('s5a', 0, 0, 560, 1000, listScreen(false, 'My rentals', [['Yellow lehenga', '₹1,200 ✓', '#F7C548'], ['Purple saree', '₹1,200 ✓', '#6E3FA0'], ['Red sharara', '₹1,200 ✓', '#C0262D']]))}</g>` +
    `<g transform="translate(790,820) scale(.62)"><g data-t="c17" data-k="pop">${phoneSVG('s5b', 0, 0, 560, 1000, listScreen(false, 'My listings', [['Wedding sherwani', '3 bookings ✓', 'sher']]))}</g></g>` +
    burst(540, 560, 'c17+1.2', 'WHAT?! WHAT?!', '#F7D23A', 150, 40, -4) + bust('s5k', KH, 200, 1940, .8) + bust('s5n', NH, 880, 1940, .8),
  html: pillH(300, 352, 'c16', 'Kinjal: <span class="hl">RENT pe leti</span> 👗') + pillH(780, 450, 'c17', 'Nirav: <span class="hl">RENT pe deta</span> 🤵') + UDA(540, 1170, 'c16+0.6'),
  noWm: true, cam: [1, 1.02], fy: 860, capY: 1270,
  upd(t) {
    life('s5k', t, { pivot: 0, mouth: t < T('c17') ? talkMouth(t, true) : 'shock', brows: 'up', look: [.6, -.4], seed: 2 });
    life('s5n', t, { pivot: 0, mouth: t > T('c17') ? talkMouth(t, true) : 'shock', brows: 'up', look: [-.6, -.4], seed: 3 });
  }
});

// ================= S6 the maths: "his earnings = her rent" — the ledger; they burst out laughing (Udaharan) =================
addScene('c18', 'c24', {
  svg: homeBG('s6', { night: true, lamp: true, lampX: 540, noShelf: true, noClock: true }) + stand('s6k', KH, 150, feet(.7), .7) + stand('s6n', NH, 930, feet(.7), .7) +
    `<g id="s6led">${ledgerCardSVG([['Kinjal ka rent (3 × ₹1,200)', '₹3,600', '#D9363E'], ['Nirav ki kamaai (3 × ₹1,200)', '₹3,600', '#1F7A4D']], ['Kharcha 😎', '₹0'], 720)}</g>` +
    burst(540, 560, 'c21+0.3', 'KA-CHING!', '#F7D23A', 100, 38, -6),
  html: pillH(540, 352, 'c18', 'Asli <span class="hl">TWIST</span> abhi baaki hai 👀', '', 'c20-0.05') + pillH(540, 352, 'c20', 'Pati ki kamaai = <span class="hl">Patni ka rent</span> 😂') +
    bub(400, 1170, 560, 'c20+0.2', 'c22-0.05', '"Matlab… tumhari sherwani ki kamaai se… <span class="hl">meri shopping</span> ho rahi thi?!" 😂', 30) +
    bub(660, 1170, 500, 'c22', '', '"Aur mujhe laga tum mera <span class="hl">bank khaali</span> kar rahi ho!" 😂', 30) + UDA(540, 450, 'c20+0.5'),
  cam: [1, 1.03], fy: 900, capY: 1380,
  upd(t) {
    const k = P(t, T('c20'), .5); tf($('s6led'), 540, lerp(1700, 880, k), 1); op($('s6led'), clamp(k * 2));
    const count = t < T('c20'), laugh = t > T('c21');
    life('s6k', t, { mouth: laugh ? 'big' : (count ? 'flat' : 'o'), brows: 'up', closed: laugh && t > T('c22'), look: count ? [0, -.6] : [.6, 0], tilt: laugh ? Math.sin(t * 9) * 5 : 0, R: count ? [140, -60] : [9, -14], hR: Math.floor(t * 2) % 2 ? 'point' : 'two', L: [9, -14], seed: 2 });
    life('s6n', t, { mouth: laugh ? 'big' : (count ? 'flat' : 'o'), brows: 'up', closed: laugh && t > T('c23'), look: count ? [0, -.6] : [-.6, 0], tilt: laugh ? Math.sin(t * 9 + 1) * 5 : 0, L: count ? [140, -60] : [9, -14], hL: Math.floor(t * 2 + 1) % 2 ? 'point' : 'two', R: [9, -14], seed: 3 });
  }
});

// ================= S7 the punchline: "Saath phere liye…" "…business mein bhi partner nikle!" — high-five, hug =================
addScene('c24', 'c26', {
  svg: homeBG('s7', { noShelf: true, noClock: true }) + `<circle cx="540" cy="860" r="380" fill="url(#glow)"/>` + stand('s7k', KH, 400, feet(.74), .74) + stand('s7n', NH, 680, feet(.74), .74) +
    [[260, 560], [820, 560], [540, 470], [200, 820], [880, 800]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c25+${(.2 + i * .1).toFixed(1)}" data-k="pop" data-bob="8" data-ph="${i}"><text text-anchor="middle" font-size="70">${['💖', '💑', '😎', '💖', '✨'][i]}</text></g></g>`).join('') +
    burst(540, 620, 'c24+0.6', 'HIGH FIVE!', '#fff', 110, 36, -4, 'c25+0.4'),
  html: bub(760, 520, 440, 'c24', 'c25-0.05', '"Shaadi mein <span class="hl">saath phere</span> liye…"') + bub(320, 520, 460, 'c25', '', '"…aur <span class="hl">business</span> mein bhi partner nikle!" 😎') +
    pillH(540, 352, 'c25+0.4', 'Phere bhi saath · <span class="hl">Business bhi saath</span> 💑'),
  cam: [1, 1.05], fy: 900,
  upd(t) {
    const hug = t > T('c25') + .3, five = t > T('c24') + .4 && !hug;
    life('s7k', t, { mouth: t > T('c25') ? talkMouth(t, t < T('c26')) : 'grin', brows: 'up', look: [.8, 0], lean: hug ? 8 : 0, blush: .6, R: five ? [160, 20] : (hug ? [80, -40] : [9, -14]), hR: 'open', L: [9, -14], seed: 2 });
    life('s7n', t, { mouth: t < T('c25') ? talkMouth(t, true) : 'grin', brows: 'up', look: [-.8, 0], lean: hug ? -8 : 0, L: five ? [160, 20] : (hug ? [80, -40] : [9, -14]), hL: 'open', R: [9, -14], seed: 3 });
  }
});

// ================= S8 reveal + CTA: both phones turn — Anokhi Reet; Comment OUTFIT, tag your partner =================
const btn = (y, txt, at, fill) => `<g transform="translate(0,${y})"><g data-t="${at}" data-k="pop"><rect x="-220" y="-50" width="440" height="100" rx="50" fill="${fill}" stroke="${OL}" stroke-width="5"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="${fill === C.red ? C.cream : C.redDark}">${txt}</text></g></g>`;
const appScr = sher => `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arHeader() + `<circle cx="0" cy="-170" r="170" fill="url(#glow)"/><g transform="translate(0,-150)">${sher ? `<g transform="scale(1.5)">${kidOutfitSVG('sherwani', '#F2E2C4', '#C9A24A')}</g>` : lehengaHangerSVG('', { c: '#F7C548', d: '#D9A52E', dupatta: '#F2A33A' }, .85)}</g>` +
  btn(160, '👗 Outfit rent karo', 'c27', C.red) + btn(310, '💰 Apna rent pe do', 'c28', C.gold);
addScene('c26', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s8r', 540, 740, .16, C.gold) + `<circle cx="540" cy="740" r="420" fill="url(#glow)" opacity=".5"/>` +
    `<g transform="translate(330,730) scale(.4)">${phoneSVG('s8a', 0, 0, 560, 1000, appScr(false))}</g><g transform="translate(750,730) scale(.4)">${phoneSVG('s8b', 0, 0, 560, 1000, appScr(true))}</g>` +
    sparks([[160, 560], [920, 560], [540, 520]], 'c26') + bust('s8k', KH, 230, 1960, .95) + bust('s8n', NH, 850, 1960, .95),
  html: `<img id="s8wm" style="position:absolute;left:310px;top:250px;width:460px" src="">` + pillH(540, 380, 'c26+0.3', 'anokhireet.in', 'gold') +
    pillH(540, 1010, 'c29', 'Comment <span class="hl">OUTFIT</span> 👇', 'big') + pillH(540, 1115, 'c30', 'Partner ko tag karo 💑'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 740, capY: 1230,
  init() { $('s8wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s8r'), 540, 740, 1, t * 5);
    life('s8k', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'up', look: [.3, -.3], tilt: 5, R: t > T('c30') ? WAVE(t, T('c30')) : [9, -14], hR: 'open', seed: 2 });
    life('s8n', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.3, -.3], tilt: -5, L: t > T('c30') ? WAVE(t, T('c30')) : [9, -14], hL: 'open', wink: t > T('c29') && t < T('c29') + .5, seed: 3 });
  }
});
