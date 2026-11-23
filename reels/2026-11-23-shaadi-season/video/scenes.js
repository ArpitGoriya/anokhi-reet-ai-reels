// ===== Shaadi season mein aapka hissa kahaan hai? (informative, CAIT estimate Nov 2026) =====
// Open loops: "sabse zyada demand kiski?" (→ kapde, ₹90,000 crore), "aapka hissa kahaan?" (→ Anokhi Reet, name held back
// until scene 9), and the deadline (15 Dec, then Kamurta).
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const MAR = `<rect width="${W}" height="${H}" fill="url(#mar)"/>`;
const SRC = (at, y = 1200) => `<div class="pill" style="left:540px;top:${y}px;font-size:30px;padding:4px 16px;background:rgba(255,255,255,.9)" data-t="${at}">*Source: CAIT estimate, Nov 2026</div>`;
const KPAPA = dress(PAPA.shop, { top: '#FBF8F2', topD: '#E6E0D9', glasses: true, pants: { c: '#FBF8F2', d: '#E6E0D9' } });
const MEHENDI = dress(GUEST_W1, {}), CATERER = dress(GUEST_M, { top: '#FBF8F2', topD: '#E6E0D9' }), PHOTO = { male: true, top: '#3A6AA3', topD: '#2C5283', skin: '#C08460', skin2: '#A86E4E', hair: '#2A1A14' };
const fx = (x, y, at_, txt, r = -8, out = '') => `<div class="pill" style="left:${x}px;top:${y}px;font-size:34px;padding:6px 18px;transform:translate(-50%,-50%) rotate(${r}deg);background:${C.gold}" data-t="${at_}"${out ? ` data-out="${out}"` : ''}>${txt}</div>`;
const fmtIN = n => n.toLocaleString('en-IN');
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }

// ================= S1 hook: SHAADI SEASON 2026 — 21 Nov se 15 Dec tak =================
addScene(0, 'c2', {
  svg: MAR + rosettes('s1ro', 540, 860, .14, C.gold) + toranSVG(W, 0) +
    `<g id="s1a"><g transform="scale(1.05)">${calendarSVG('s1c1', 'NOV', '21')}</g></g><g id="s1b"><g transform="scale(1.05)">${calendarSVG('s1c2', 'DEC', '15')}</g></g>` +
    `<path id="s1dot" d="M390,860 H690" stroke="${C.gold}" stroke-width="10" stroke-dasharray="4 22" stroke-linecap="round"/>` +
    `<g transform="translate(540,860)"><g data-t="1.2" data-k="pop">${sparkleSVG(40, C.gold)}</g></g>`,
  html: `<div class="title" style="top:400px;font-size:84px" data-t="-1">SHAADI SEASON<br><span class="g">2026</span> 💍</div>` + pillH(540, 1130, '0.9', '21 Nov se <span class="hl">15 Dec</span> tak…', 'big'),
  noWm: false, cam: [1, 1.04], fy: 860,
  upd(t) {
    tf($('s1ro'), 540, 860, 1, t * 6);
    const a = P(t, .05, .5, E.back), b = P(t, .35, .5, E.back);
    tf($('s1a'), lerp(-300, 240, a), 860, 1, lerp(-20, -6, a)); tf($('s1b'), lerp(1380, 840, b), 860, 1, lerp(20, 6, b));
    op($('s1dot'), P(t, .8, .4));
  }
});

// ================= S2 the number: ~52,00,000 shaadiyan =================
addScene('c2', 'c4', {
  svg: MAR + toranSVG(W, 0) + `<circle cx="540" cy="820" r="460" fill="url(#glow)" opacity=".6"/>` +
    [...Array(28)].map((_, i) => { const x = 80 + (i * 137) % 920, y = 470 + ((i * 89) % 640); return `<g transform="translate(${x},${y})"><g data-t="c3+${(i * .04).toFixed(2)}" data-k="pop"><text font-size="${40 + (i % 3) * 12}" text-anchor="middle">${['💍', '🪔', '💐', '🎊'][i % 4]}</text></g></g>`; }).join('') +
    [...Array(30)].map((_, i) => `<rect id="s2cf${i}" width="16" height="26" rx="4" fill="${[C.gold, '#E8962E', C.pink, '#fff'][i % 4]}" opacity="0"/>`).join(''),
  html: `<div class="title" style="top:640px;font-size:120px" data-t="c2"><span class="g" id="s2n">10,00,000</span></div>` +
    pillH(540, 840, 'c3', 'SHAADIYAN! 💍', 'big') + pillH(540, 352, 'c2', 'Poore <span class="hl">India</span> mein 🇮🇳') + SRC('c3+0.3'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const k = E.out(clamp((t - T('c2')) / (T('c3') + .4 - T('c2'))));
    const n = Math.round((10 + k * 42) * 100000 / 1000) * 1000; const el = document.getElementById('s2n'); if (el) el.textContent = '~' + fmtIN(k >= 1 ? 5200000 : n);
    for (let i = 0; i < 30; i++) { const u = t - T('c3') - .2 - (i % 6) * .05; const x = 540 + Math.cos(i * 2.4) * (200 + u * 500), y = 780 + Math.sin(i * 2.4) * 200 * u + u * u * 900 - 300 * u;
      tf($(`s2cf${i}`), x, y, 1, u * 400 + i * 30); op($(`s2cf${i}`), u > 0 && u < 1.6 ? 1 : 0); }
  }
});

// ================= S3 busy montage: mehendi wali, caterer, photographer — BUSY stamps =================
const panel = (i, y, label, col) => `<g transform="translate(0,${y})"><rect x="60" y="0" width="960" height="250" rx="28" fill="${col}" stroke="${OL}" stroke-width="${OW}"/>` +
  `<text x="980" y="70" text-anchor="end" font-family="Inter" font-weight="900" font-size="44" fill="${C.text}">${label}</text></g>`;
addScene('c4', 'c7', {
  svg: wallSVG('#FBE7D3', '#F5DCC2') + toranSVG(W, 0) +
    `<g data-t="c4" data-k="rise">${panel(0, 420, 'MEHENDI WALI', '#FDF2E2')}<g transform="translate(200,540)"><rect x="0" y="0" width="1" height="1" fill="none"/></g></g>` +
    `<g data-t="c5" data-k="rise">${panel(1, 700, 'CATERER', '#EAF4EC')}</g>` +
    `<g data-t="c6" data-k="rise">${panel(2, 980, 'PHOTOGRAPHER', '#EAF0F8')}</g>` +
    `<clipPath id="s3cp0"><rect x="60" y="420" width="960" height="250" rx="28"/></clipPath><clipPath id="s3cp1"><rect x="60" y="700" width="960" height="250" rx="28"/></clipPath><clipPath id="s3cp2"><rect x="60" y="980" width="960" height="250" rx="28"/></clipPath>` +
    `<g data-t="c4" data-k="rise"><g clip-path="url(#s3cp0)">${bust('s3a', MEHENDI, 230, 700, .5)}${[0, 1, 2].map(i => `<g transform="translate(${430 + i * 90},${600 + (i % 2) * 20})"><path d="M-20,30 Q-26,-20 0,-34 Q26,-20 20,30 Z" fill="#E8B58A" stroke="${OL}" stroke-width="3"/><path d="M-8,-10 q8,-10 16,0 M-6,6 q6,8 12,0" stroke="#8C3A1E" stroke-width="4" fill="none"/></g>`).join('')}<g id="s3cone"><path d="M0,0 L-14,-70 L14,-70 Z" fill="#6B8E23" stroke="${OL}" stroke-width="3"/></g></g></g>` +
    `<g data-t="c5" data-k="rise"><g clip-path="url(#s3cp1)">${bust('s3b', CATERER, 230, 980, .5)}<g transform="translate(470,900)"><ellipse cx="0" cy="-60" rx="120" ry="24" fill="#B9B2A8" stroke="${OL}" stroke-width="4"/><path d="M-120,-60 L-100,40 H100 L120,-60" fill="#8C8880" stroke="${OL}" stroke-width="4"/><g class="sway"><path d="M-20,-90 q-14,-20 0,-40 M20,-90 q-14,-20 0,-40" stroke="#fff" stroke-width="7" fill="none" opacity=".8"/></g></g><g id="s3ladle"><path d="M0,0 L60,-120" stroke="${C.woodDark}" stroke-width="12" stroke-linecap="round"/></g></g></g>` +
    `<g data-t="c6" data-k="rise"><g clip-path="url(#s3cp2)"><g id="s3cw">${bust('s3c', PHOTO, 0, 0, .5)}</g>${[0, 1].map(i => `<g id="s3cam${i}"><rect x="-40" y="-28" width="80" height="56" rx="10" fill="#2A2420" stroke="${OL}" stroke-width="3"/><circle r="18" fill="#6E6A64" stroke="${OL}" stroke-width="3"/></g>`).join('')}</g></g>` +
    [[740, 560, 'c4+0.35'], [740, 840, 'c5+0.25'], [740, 1120, 'c6+0.35']].map(([x, y, at]) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="pop">${busyStampSVG('BUSY', 280)}</g></g>`).join(''),
  html: pillH(540, 352, 'c4', 'BUSY · BUSY · <span class="hl">BUSY</span> 😵'),
  cam: [1, 1.02], fy: 820,
  upd(t) {
    const A = life('s3a', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [.8, .2], R: [140, -40], hR: 'fist', L: [9, -14], sweat: .6, seed: 1 });
    atHand('s3cone', 's3a', A.hr, 10, -10, 40 + Math.sin(t * 10) * 8);
    const B = life('s3b', t, { pivot: 0, mouth: 'o', brows: 'worry', look: [.8, .3], R: [120 + Math.sin(t * 8) * 30, -20], hR: 'fist', L: [9, -14], sweat: 1, seed: 2 });
    atHand('s3ladle', 's3b', B.hr, 0, 0, Math.sin(t * 8) * 10);
    const run = 160 + ((t - T('c6')) * 260) % 520; tf($('s3cw'), run, 1260 - Math.abs(Math.sin(t * 9)) * 14, 1); PL['s3c'].x = run; PL['s3c'].y = 1260;
    const C1 = life('s3c', t, { pivot: 0, mouth: 'o', brows: 'worry', look: [.8, 0], R: [150, -60], hR: 'fist', L: [150, -60], hL: 'fist', sweat: 1, seed: 3 });
    atHand('s3cam0', 's3c', C1.hr, 10, -10, 0, .9); atHand('s3cam1', 's3c', C1.hl, -10, -10, 0, .9);
  }
});

// ================= S4 open loop: "Par sabse zyada demand kiski?" =================
addScene('c7', 'c8', {
  svg: `<rect width="${W}" height="${H}" fill="#1E1715"/><path d="M440,0 L640,0 L900,1300 L180,1300 Z" fill="#FFF2C4" opacity=".18"/><ellipse cx="540" cy="1300" rx="360" ry="60" fill="#FFF2C4" opacity=".3"/>` +
    `<g id="s4q"><text text-anchor="middle" y="60" font-size="260">🤔</text></g>`,
  html: `<div class="title" style="top:360px;font-size:78px" data-t="c7">PAR SABSE ZYADA<br><span class="g">DEMAND KISKI?</span> 🤔</div>`,
  noWm: true, cam: [1, 1.05], fy: 900,
  upd(t) { tf($('s4q'), 540, 950 + Math.sin(t * 3) * 10, 1 + Math.sin(clamp((t - T('c7')) / .4) * Math.PI) * .1, Math.sin(t * 2) * 8); }
});

// ================= S5 family comedy: Mummy, Papa, beti — "RENT pe lo!" =================
addScene('c8', 'c12', {
  svg: homeBG('s5', { noShelf: true, noClock: true }) + `<rect width="${W}" height="${H}" fill="#F4B9C8" opacity=".35"/>` + almirahSVG('s5al', 150, FLOOR + 62, .78) +
    `<g id="s5mw">${stand('s5m', MUMMY, 320, 945, .64)}</g>` + `<g id="s5pw">${stand('s5p', KPAPA, 880, 935, .66)}</g>` + `<g id="s5kw">${stand('s5k', KAVYA, 0, 0, .62)}</g>` +
    `<g id="s5card"><rect x="-34" y="-22" width="68" height="44" rx="6" fill="${C.gold}" stroke="${OL}" stroke-width="3"/><rect x="-34" y="-10" width="68" height="8" fill="${OL}"/></g>` +
    `<g id="s5ph"><rect x="-40" y="-70" width="80" height="140" rx="14" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-32" y="-60" width="64" height="120" rx="8" fill="${C.cream}"/><text x="0" y="10" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" fill="${C.red}">RENT</text></g>` +
    `<g id="s5shades"><rect x="-70" y="-20" width="60" height="34" rx="12" fill="#141110"/><rect x="10" y="-20" width="60" height="34" rx="12" fill="#141110"/><path d="M-10,-6 H10" stroke="#141110" stroke-width="6"/></g>` +
    [...Array(6)].map((_, i) => `<g id="s5fl${i}">${foldedClothSVG(...CLOTH_COLS[i % CLOTH_COLS.length], 120)}</g>`).join(''),
  html: pillH(540, 352, 'c8', 'Demand kiski? <span class="hl">KAPDON ki!</span> 👗') +
    `<div class="bubble" style="left:330px;top:560px;width:440px;font-size:32px" data-t="c8" data-out="c10-0.05">"Teen shaadi hai… aur pehnne ko <span class="hl">kuch NAYA nahi!!</span>" 😤</div>` +
    `<div class="bubble" style="left:760px;top:560px;width:420px;font-size:32px" data-t="c10" data-out="c11-0.05">"Pichhli shaadi wala <span class="hl">pehen lo na…</span>" 😬</div>` +
    `<div class="bubble" style="left:580px;top:560px;width:440px;font-size:34px" data-t="c11+0.2">"Kharidna kyun? <span class="hl">RENT pe lo!</span>" 😎</div>` + fx(380, 780, 'c10+1.1', 'BOING! 😡', -10, 'c11'),
  cam: [1, 1.03], fy: 860,
  init() { $('s5al-inside').innerHTML = stuffedInside(); tf($('s5al-dL'), 0, 0, .13, 0, -150, 0, 1); tf($('s5al-dR'), 0, 0, .13, 0, 150, 0, 1); },
  upd(t) {
    const glare = t > T('c10') + 1 && t < T('c11') + .3;
    const M = life('s5m', t, { mouth: t < T('c10') ? talkMouth(t, true) : (glare ? 'flat' : 'o'), brows: glare ? 'sure' : 'worry', look: t > T('c10') ? [.9, 0] : [-.6, 0], tilt: glare ? 8 : 0,
      L: t < T('c10') ? [100 + Math.sin(t * 9) * 50, -60 - Math.sin(t * 9) * 40] : [9, -14], hL: 'open', R: glare ? [110, -10] : [9, -14], hR: 'fist', seed: 1 });
    for (let i = 0; i < 6; i++) { const u = ((t - T('c8') - i * .35) % 2.1) / 1.1, on = t > T('c8') && t < T('c10') + .4 && u > 0 && u < 1;
      tf($(`s5fl${i}`), 260 + u * (420 + i * 40) * (i % 2 ? 1 : .7), 760 - Math.sin(u * Math.PI) * 360 + u * 380, .8, u * 540); op($(`s5fl${i}`), on ? 1 : 0); }
    const P1 = life('s5p', t, { mouth: t > T('c10') && t < T('c11') ? talkMouth(t, true) : (glare ? 'worry' : 'smile'), brows: glare ? 'worry' : 'norm', look: [-.8, 0], tilt: glare ? -6 : 0,
      L: [-60, 40], hL: 'fist', R: t > T('c10') && t < T('c11') ? [110, -40] : [9, -14], hR: 'open', sweat: glare ? 1 : 0, seed: 2 });
    atHand('s5card', 's5p', P1.hl, 40, 10, 0, .9);
    const kin = P(t, T('c11') - .1, .45, E.back), kx = lerp(1250, 590, kin);
    tf($('s5kw'), kx, 945 - Math.sin(kin * Math.PI) * 40, 1); PL['s5k'].x = kx; PL['s5k'].y = 945;
    const K = life('s5k', t, { mouth: t > T('c11') + .2 ? talkMouth(t, true) : 'grin', brows: 'sure', look: [0, 0], tilt: 4, R: [150, -110], hR: 'fist', L: [9, -14], seed: 3 });
    atHand('s5ph', 's5k', K.hr, 0, -90, 6, 1);
    const head = toScene('s5k', [0, -378]); tf($('s5shades'), head[0], head[1], .62); op($('s5shades'), t > T('c11') + .3 ? 1 : 0);
  }
});

// ================= S6 the money: ~₹90,000 crore (kapde, saree, garments) =================
addScene('c12', 'c14', {
  svg: `<rect width="${W}" height="${H}" fill="#2E7D4F"/><circle cx="540" cy="820" r="460" fill="url(#glow)" opacity=".5"/>` +
    [...Array(16)].map((_, i) => `<g id="s6n${i}">${rupeeNoteSVG()}</g>`).join(''),
  html: pillH(540, 352, 'c12', 'Sirf <span class="hl">KAPDE, SAREE</span> aur <span class="hl">GARMENTS</span> 👗') +
    `<div class="title" style="top:700px;font-size:110px" data-t="c12+0.2"><span class="g" id="s6v">₹0</span><br>CRORE!! 😳</div>` + fx(540, 1000, 'c13+0.6', 'KA-CHING 💰', -6) + SRC('c13', 1120),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    for (let i = 0; i < 16; i++) { const u = ((t - T('c12') + i * .37) % 2.4) / 2.4; tf($(`s6n${i}`), 60 + (i * 211) % 960 + Math.sin(t * 2 + i) * 30, -80 + u * 1500, .9, Math.sin(t * 3 + i) * 30); }
    const k = E.out(clamp((t - T('c12') - .2) / (T('c13') + .5 - T('c12') - .2)));
    const el = document.getElementById('s6v'); if (el) el.textContent = '~₹' + fmtIN(Math.round(k * 90) * 1000);
  }
});

// ================= S7 the switch: the cake — where is the rental shop's slice? =================
addScene('c14', 'c16', {
  svg: wallSVG('#FBF3E6', '#F5E6C8') + toranSVG(W, 0) + `<circle cx="480" cy="900" r="440" fill="url(#glow)" opacity=".6"/>` +
    `<g transform="translate(450,1160)">${weddingCakeSVG('s7c')}</g>` + `<g id="s7mag">${magnifierSVG(70)}</g>`,
  html: pillH(540, 352, 'c14', '<span class="hl">Rental dukaan</span> waalo… 👀', '', 'c15-0.05') + pillH(540, 352, 'c15', 'Aapka <span class="hl">hissa</span> kahaan hai? 🍰'),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const k = E.io(clamp((t - T('c14') - .2) / 1.6));
    const x = lerp(300, 830, k), y = lerp(720, 1050, k) + Math.sin(t * 5) * 8;
    tf($('s7mag'), x, y, 1 + (k >= 1 ? Math.sin(clamp((t - T('c15') - .3) / .4) * Math.PI) * .15 : 0));
    tf($('s7c-tiny'), 380, -30, 1 + (k >= 1 ? .3 : 0));
  }
});

// ================= S8 the pain: the customer searches, your shop isn't there; she books elsewhere =================
const searchScreen = () => `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#FFFFFF"/>` +
  `<rect x="-236" y="-440" width="472" height="70" rx="35" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><text x="-200" y="-395" font-family="Inter" font-weight="700" font-size="25" fill="${C.text}" id="s8q"></text>` +
  [0, 1, 2].map(i => `<g transform="translate(0,${-260 + i * 230})"><rect x="-236" y="-95" width="472" height="190" rx="20" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
    `<rect x="-220" y="-80" width="150" height="160" rx="12" fill="${C.cream}"/><g transform="translate(-145,-30)">${lehengaHangerSVG('', { c: [C.pink, C.emerald, C.marigold][i], d: [C.pinkDark, C.emeraldDark, '#C9821E'][i], dupatta: C.goldTan }, .3)}</g>` +
    `<text x="-50" y="-30" font-family="Inter" font-weight="900" font-size="30" fill="${C.text}">${['Shop A', 'Shop B', 'Shop C'][i]}</text><rect x="-50" y="0" width="200" height="16" rx="8" fill="#E6E0D9"/><rect x="-50" y="30" width="140" height="16" rx="8" fill="#F2EEE9"/>` +
    (i === 1 ? `<g id="s8bk" opacity="0" transform="translate(150,50)">${bookedTagSVG(24)}</g>` : '') + `</g>`).join('');
addScene('c16', 'c18', {
  svg: wallSVG('#EFE7DA', '#E6DCCB') + bust('s8c', CUSTOMER_W, 200, FLOOR + 170, .7) +
    `<g id="s8ph"><g transform="scale(.7)">${phoneSVG('s8p', 0, 0, 560, 1000, searchScreen())}</g></g>` +
    `<g id="s8shop"><rect x="-90" y="-70" width="180" height="140" rx="16" fill="#F3DCC0" stroke="${OL}" stroke-width="${OW}"/><path d="M-100,-70 H100 L90,-110 H-90 Z" fill="#C0262D" stroke="${OL}" stroke-width="4"/><text y="24" text-anchor="middle" font-size="60">😢</text></g>` +
    bust('s8m', MAHESH, 880, FLOOR + 170, .62) + counterSVG(FLOOR + 190),
  html: pillH(540, 352, 'c16', 'Phone pe <span class="hl">dikhte hi nahi</span> 😢') + pillH(820, 680, 'c17', 'AAPKI DUKAAN 😢', 'gold'),
  cam: [1, 1.03], fy: 840,
  upd(t) {
    tf($('s8ph'), 430, 760, 1);
    const q = 'chaniya choli on rent near me', n = Math.round(clamp((t - T('c16') - .1) / 1.2) * q.length);
    const el = document.getElementById('s8q'); if (el) el.textContent = q.slice(0, n) + (n < q.length && (t * 3 | 0) % 2 ? '|' : '');
    const sink = P(t, T('c17'), .8, E.io); tf($('s8shop'), 820, lerp(820, 880, sink), lerp(1, .75, sink)); op($('s8shop'), 1 - sink * .6);
    op($('s8bk'), P(t, T('c17') + .8, .2, E.back));
    life('s8c', t, { pivot: 0, mouth: t > T('c17') + .8 ? 'grin' : 'flat', brows: 'up', look: [.8, -.2], R: [9, -14], L: [9, -14], seed: 3 });
    life('s8m', t, { pivot: 0, mouth: t > T('c17') ? 'sad' : 'flat', brows: 'worry', look: [-.7, -.2], tilt: t > T('c17') ? -8 : 0, seed: 1 });
  }
});

// ================= S9 the reveal: Anokhi Reet — brand-safe badges =================
addScene('c18', 'c20', {
  svg: MAR + rosettes('s9ro', 540, 760, .16, C.gold) + `<circle cx="540" cy="760" r="440" fill="url(#glow)" opacity=".55"/>` +
    [[180, 520], [900, 540], [170, 960], [910, 980]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c18+${(.1 + i * .08).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(30, C.gold)}</g></g>`).join(''),
  html: `<img id="s9lk" style="position:absolute;left:540px;top:760px;width:640px" src="" data-t="c18">` +
    ['WhatsApp se shuru 💬', 'Apni city ke customers 📍', 'Aasaan setup ✅'].map((b, i) => pillH(540, 1060 + i * 86, `c19+${(i * .35).toFixed(2)}`, '✅ ' + b, i === 1 ? 'gold' : '')).join(''),
  noWm: true, cam: [1, 1.03], fy: 800,
  init() { $('s9lk').src = SEAL().replace('seal-on-maroon.svg', 'Anokhireet_shop_logo.svg'); },
  upd(t) { tf($('s9ro'), 540, 760, 1, t * 6); }
});

// ================= S10 quick demo: the listing's "WhatsApp karo" button → his phone pings =================
const listingCard = () => `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#fff"/>` + arHeader() +
  `<rect x="-236" y="-370" width="472" height="470" rx="20" fill="${C.cream}"/><g transform="translate(0,-170)">${lehengaHangerSVG('', { c: '#A3262A', d: '#7A1B2A', dupatta: '#E8C25E' }, .75)}</g>` +
  `<text x="-230" y="160" font-family="Inter" font-weight="900" font-size="36" fill="${C.text}">Mahesh Rentals</text>` +
  `<g transform="translate(-170,220)"><rect x="-60" y="-26" width="120" height="52" rx="26" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${C.red}">Rent</text></g>` +
  `<g transform="translate(-20,220)"><rect x="-70" y="-26" width="140" height="52" rx="26" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${C.text}">Size M</text></g>` +
  `<g id="s10btn" transform="translate(0,340)"><rect x="-210" y="-48" width="420" height="96" rx="48" fill="#25A45A" stroke="${OL}" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#fff">💬 WhatsApp karo</text></g>`;
addScene('c20', 'c21', {
  svg: wallSVG('#EAF4EC', '#DCEBDF') + `<g id="s10ph"><g transform="scale(.74)">${phoneSVG('s10p', 0, 0, 560, 1000, listingCard())}</g></g>` +
    `<g id="s10tap" opacity="0"><circle r="40" fill="#fff" opacity=".7" stroke="${OL}" stroke-width="3"/></g>` +
    bust('s10m', MAHESH, 870, FLOOR + 170, .62) + counterSVG(FLOOR + 190) + `<g transform="translate(790,560)"><g data-t="c20+0.9" data-k="drop">${notifSVG('Naya customer', 'Ye lehenga hai? 🙏', 400)}</g></g>`,
  html: pillH(540, 352, 'c20', 'Customer → seedha <span class="hl">aapke WhatsApp</span> pe 📲'),
  cam: [1, 1.03], fy: 840,
  upd(t) {
    tf($('s10ph'), 380, 820, 1);
    const tp = P(t, T('c20') + .5, .3); tf($('s10tap'), 380, 1072, .6 + tp * .6); op($('s10tap'), tp > 0 && tp < 1 ? 1 - tp : 0);
    tf($('s10btn'), 0, 340, 1 - Math.sin(tp * Math.PI) * .08);
    life('s10m', t, { pivot: 0, mouth: t > T('c20') + 1 ? 'grin' : 'flat', brows: 'up', look: [-.4, -.6], y: hop(t, T('c20') + 1, 14), seed: 1 });
  }
});

// ================= S11 countdown: DIN BAAKI 22 → 15 → 8 → 3; 15 Dec then Kamurta; the baraat =================
const DAYS = [22, 15, 8, 3];
addScene('c21', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="#C8461E"/><rect width="${W}" height="${H}" fill="url(#glow)" opacity=".3"/>` + toranSVG(W, 0) +
    `<g id="s11cal"><g transform="scale(1.3)">${calendarSVG('s11c', 'DIN BAAKI', '22')}</g></g>` + clockSVG('s11clk', 860, 600, 70) +
    `<g id="s11bar">${ghodiSVG(dress(GUEST_M, { top: '#FBF8F2', topD: '#E6E0D9' }))}` +
    [0, 1].map(i => `<g transform="translate(${-300 - i * 190},-40)">${bust('s11b' + i, dress(GUEST_M, { top: ['#C0262D', '#2F5E8C'][i], topD: ['#97151B', '#22476B'][i] }), 0, 0, .42)}<path d="M50,-130 L130,-150 L150,-120 L60,-110 Z" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g>`).join('') + `</g>`,
  html: pillH(540, 352, 'c21', 'Season sirf <span class="hl">15 Dec</span> tak! ⏳', '', 'c22-0.05') + pillH(540, 352, 'c22', '15 Dec ke baad <span class="hl">Kamurta</span> 🙏', '', 'c23-0.05') +
    pillH(540, 352, 'c23', '<span class="hl">BARAAT</span> SE PEHLE DUKAAN ONLINE! 🐎🎺'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const u = clamp((t - T('c21') - .2) / 2.6), i = Math.min(3, Math.floor(u * 4));
    const el = $('s11c'); if (el) { const tx = el.querySelectorAll('text'); if (tx.length) tx[tx.length - 1].textContent = DAYS[i]; }
    const flip = (u * 4) % 1; tf($('s11cal'), 540, 720, 1, 0, 0, 0, 1);
    clockTick('s11clk', t * (4 + u * 30), 0);
    const bx = lerp(-300, 1500, clamp((t - T('c23') + .3) / 3.2));
    tf($('s11bar'), bx, 1220 - Math.abs(Math.sin(t * 8)) * 10, .8);
    [0, 1].forEach(k => { PL['s11b' + k].x = 0; life('s11b' + k, t, { pivot: 0, mouth: 'o', brows: 'up', look: [.8, -.2], R: [150, -60], hR: 'fist', L: [140, -70], hL: 'fist', seed: k + 2 }); });
  }
});

// ================= S12 end card: Rental shop owners — Comment SHOP =================
addScene('c25', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('s12r', 540, 760, .16, C.goldTan) + toranSVG(W, 0) +
    bust('s12m', MAHESH, 330, FLOOR + 330, .8) + bust('s12k', KAVYA, 750, FLOOR + 330, .8) + counterSVG(FLOOR + 280),
  html: `<img id="s12seal" style="position:absolute;left:410px;top:270px;width:260px" src="">` +
    `<div class="title" style="top:560px;font-size:66px">Rental shop owners:<br><span class="g">Comment SHOP</span> 👇</div>` +
    pillH(540, 790, 'c25+0.3', 'anokhireet.in', 'gold') + pillH(540, 880, 'c25+0.5', 'Shaadi season 2026 💍'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { $('s12seal').src = SEAL().replace('seal-on-maroon.svg', 'AnokhiReet_logo_maroon.svg'); },
  upd(t) {
    tf($('s12r'), 540, 760, 1, t * 5);
    life('s12m', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], R: WAVE(t, T('c25')), hR: 'open', L: [9, -14], tilt: 4, seed: 1 });
    life('s12k', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], L: WAVE(t, T('c25')), hL: 'open', R: [9, -14], tilt: -4, seed: 2 });
  }
});
