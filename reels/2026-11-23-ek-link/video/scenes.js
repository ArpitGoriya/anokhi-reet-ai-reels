// ===== Ek link, poori dukaan: Meenaben stops sending 30 photos to every customer and sends one link =====
// Open loop: she lists her shop on "ek app"; the app's name stays "? ? ?" until "Vo app ka naam tha… Anokhi Reet!".
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const MB = MEENABEN, CU = dress(CUSTOMER_W, { skirt: { c: '#3A6AA3', d: '#2C5283', b: C.gold, w: 190 } });
const LOOKS = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E'], ['#4F86C6', '#3A6AA3'], ['#F6A98E', '#E08A6F']];
const SIGN = { sign: 'MEENABEN RENTALS' };
const shopM = id => shopBG(id, SIGN).replace('font-size="50" fill', 'font-size="40" fill');
const bigPhone = (id, inner, sc) => `<g id="${id}"><g transform="scale(${sc})">${phoneSVG(id + 'p', 0, 0, 560, 1000, inner)}</g></g>`;

// ================= S1 hook: the message that starts her day — "Photos bhejo na 🙏" =================
addScene(0, 'c4', {
  svg: shopM('s1') + quiet(.3) + bust('s1m', MB, 360, FLOOR + 90, .85) + counterSVG(FLOOR + 130) +
    `<g id="s1ping">${pingRings('s1pr')}</g>` + handPhone('s1ph', 1.15) +
    `<g transform="translate(700,700)"><g data-t="0.15" data-k="pop">${notifSVG('Riya', 'Hi, lehenga ke photos bhejo na 🙏', 640)}</g></g>`,
  html: `<div class="title" style="top:392px;font-size:66px" data-t="-1">Roz <span class="g">30 photos</span> ×<br>har customer? 😩</div>` +
    pillH(780, 1120, 'c1+0.2', 'Meenaben 👋', 'gold') + pillH(760, 860, 'c3', '"Photos bhejo na 🙏"'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const A = life('s1m', t, { pivot: 0, mouth: t > T('c3') ? 'o' : talkMouth(t, t > T('c1') && t < T('c3')), brows: 'up', look: [.7, -.3], tilt: 4,
      R: [150, -90], hR: 'fist', L: [9, -14], seed: 2 });
    const bz = Math.sin(t * 60) * (Math.sin(t * 3) > 0 ? 4 : 0);
    atHand('s1ph', 's1m', A.hr, 10 + bz, -110, 8);
    const p = toScene('s1m', A.hr); pingUpd('s1pr', p[0] + 10, p[1] - 110, t, 0);
  }
});

// ================= S2 photo after photo: rail to rail, flashes, the counter climbs to 30 =================
const FLASH = [.2, .9, 1.5, 2.1, 2.6, 3.1, 3.5, 3.9];
addScene('c4', 'c7', {
  svg: shopM('s2') + `<g id="s2mw">${stand('s2m', MB, 0, 0, .8)}</g>` + handPhone('s2ph', 1) +
    FLASH.map((_, i) => `<g id="s2f${i}" opacity="0">${flashSVG(80)}</g>`).join('') +
    [['Riya', 'Photos bhejo na 🙏'], ['Pooja', 'Lehenga ke photos? 🙏'], ['Neha', 'Photos bhejo please 🙏'], ['Kiran', 'Aur photos? 🙏']].map(([n, m], i) =>
      `<g transform="translate(${830 - (i % 2) * 16},${480 + i * 128})"><g data-t="c5+${(i * .55).toFixed(2)}" data-k="drop">${notifSVG(n, m, 460)}</g></g>`).join(''),
  html: pillH(540, 352, 'c4', '<span class="hl">30 photos</span> × har customer 📸😩') +
    `<div class="pill" style="left:840px;top:1110px;font-size:44px;background:${C.gold}" data-t="c4">📸 <span id="s2n">0</span></div>` + fx(250, 560, 'c4+0.3', 'CLICK!', -10, 'c5'),
  cam: [1, 1.03], fy: 880,
  init() { },
  upd(t) {
    const t0 = T('c4'), u = t - t0;
    const xs = [190, 360, 220, 340];
    const seg = Math.min(3, Math.floor(u / 1.25)), f = E.io(clamp((u - seg * 1.25) / .5));
    const x = lerp(xs[seg], xs[Math.min(3, seg + 1)], seg < 3 ? f : 0);
    tf($('s2mw'), x, 960 + (f > 0 && f < 1 ? -Math.abs(Math.sin(f * Math.PI * 2)) * 18 : 0), 1); PL['s2m'].x = x; PL['s2m'].y = 960;
    const A = life('s2m', t, { mouth: t > T('c6') ? 'sad' : 'o', brows: 'worry', look: [0, -.6], sweat: clamp((t - T('c5')) / 1), R: [160, -120], hR: 'fist', L: [9, -14], tilt: Math.sin(t * 8) * 3, seed: 2 });
    atHand('s2ph', 's2m', A.hr, 0, -80, 0);
    const p = toScene('s2m', A.hr);
    FLASH.forEach((d, i) => { const k = clamp((u - d) / .25); tf($(`s2f${i}`), p[0], p[1] - 140, .6 + k * .6); op($(`s2f${i}`), k > 0 && k < 1 ? 1 - k : 0); });
    const n = Math.round(clamp(u / (T('c6') - t0)) * 30);
    const el = document.getElementById('s2n'); if (el) el.textContent = n;
  }
});

// ================= S3a the chat: 30 photos… "Price kya hai? Aur koi design hai?" =================
addScene('c7', 'c9', {
  svg: wallSVG('#EFE7DA', '#E6DCCB') + `<circle cx="540" cy="820" r="460" fill="url(#glow)"/>` + bigPhone('s3ph', photoChat('s3c'), .86),
  html: pillH(540, 352, 'c7', 'Aur end mein… 🙄'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    tf($('s3ph'), 540, 840, 1);
    for (let i = 0; i < 15; i++) op($(`s3c-p${i}`), 1);
    const q1 = P(t, T('c8') - .05, .25, E.back), q2 = P(t, T('c8') + 1.35, .25, E.back);
    op($('s3c-q1'), q1); op($('s3c-q2'), q2);
  }
});

// ================= S3b she sinks into her chair — "Thak gaye?" =================
addScene('c9', 'c11', {
  svg: shopM('s3b') + quiet(.4) + sofaBackSVG(420, FLOOR + 60, 560) + bust('s3m', MB, 420, FLOOR + 60, .95) + sofaFrontSVG(420, FLOOR + 60, 560) +
    `<g id="s3sigh">${sighCloudSVG()}</g>` + handPhone('s3hp', 1),
  html: `<div class="title" style="top:400px;font-size:96px" data-t="c10">Thak gaye? 😮‍💨</div>`,
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const sink = E.out(clamp((t - T('c9')) / .5));
    const A = life('s3m', t, { pivot: 0, y: lerp(-60, 0, sink), mouth: t > T('c10') ? 'sad' : 'o', closed: t < T('c10'), brows: 'worry', look: [0, 0], tilt: -8,
      R: [30, 40], hR: 'open', L: [9, -14], sweat: .6 });
    atHand('s3hp', 's3m', A.hr, 10, 30, 70);
    const s = P(t, T('c9') + .3, .5, E.back); tf($('s3sigh'), 760, 700 - s * 40, .5 + s * .5); op($('s3sigh'), s * (1 - clamp((t - T('c10') - .8) / .4)));
  }
});

// ================= S4 the idea: "ek app" — message → photos + rent price → shop live; the page =================
addScene('c11', 'c15', {
  svg: shopM('s4') + quiet(.5) + `<circle cx="680" cy="840" r="440" fill="url(#glow)"/>` + bust('s4m', MB, 210, FLOOR + 150, .8) + counterSVG(FLOOR + 170) +
    `<g id="s4bulb">${ideaBulbSVG()}</g>` +
    `<g id="s4ph"><g transform="scale(.74)">${phoneSVG('s4p', 0, 0, 560, 1000, `<g id="s4a">${waChatScreen(['c12+0.6', 'c13+0.1', 'c13+1.4'], '? ? ?')}</g><g id="s4b" opacity="0">${shopPage('s4s', 'c14+0.8')}</g>`)}</g></g>`,
  html: pillH(540, 352, 'c11', 'Phir Meenaben ne… 💡', '', 'c12-0.05') + pillH(540, 352, 'c12', '<span class="hl">Ek app</span> pe list ki 📱', '', 'c14-0.05') +
    pillH(540, 352, 'c14', 'Poori dukaan, <span class="hl">ek page</span> pe 📱') + fx(250, 560, 'c12+0.3', 'Kaunsa app? 🤔', -8),
  cam: [1, 1.03], fy: 840,
  upd(t) {
    const b = P(t, T('c11') + .2, .4, E.back); tf($('s4bulb'), 210, 700 - b * 20, .45 * b); op($('s4bulb'), b * (1 - clamp((t - T('c12') - .3) / .3)));
    const ph = P(t, T('c12'), .5, E.out); tf($('s4ph'), lerp(1200, 680, ph), 860, 1);
    const sw = P(t, T('c14') - .1, .35); op($('s4a'), 1 - sw); op($('s4b'), sw);
    for (let i = 0; i < 4; i++) op($(`s4s-r${i}`), P(t, T('c14') + .3 + i * .15, .2));
    const idea = t < T('c12') + .3;
    life('s4m', t, { pivot: 0, mouth: idea ? 'big' : 'smile', brows: 'up', look: idea ? [0, -.8] : [.8, -.2], R: idea ? IDEA : [9, -14], hR: 'point', L: [9, -14], y: hop(t, T('c11') + .25, 14), seed: 2 });
  }
});

// ================= S5 just one link: "Photos bhejo na 🙏" → one link =================
addScene('c15', 'c17', {
  svg: shopM('s5') + quiet(.55) + bust('s5m', MB, 200, FLOOR + 160, .78) + counterSVG(FLOOR + 190) +
    `<g id="s5ph"><g transform="scale(.82)">${phoneSVG('s5p', 0, 0, 560, 1000, linkChat('s5c'))}</g></g>` + `<g id="s5tap" opacity="0"><circle r="34" fill="#fff" opacity=".7" stroke="${OL}" stroke-width="3"/></g>`,
  html: pillH(540, 352, 'c15', '30 photos ❌ → <span class="hl">Ek link</span> ✅'),
  cam: [1, 1.03], fy: 840,
  upd(t) {
    tf($('s5ph'), 660, 860, 1);
    const m1 = P(t, T('c15') + .1, .25, E.back), m2 = P(t, T('c16') + .7, .35, E.back);
    op($('s5c-m1'), m1); tf($('s5c-m1'), -240, -290 + (1 - m1) * 30, 1);
    op($('s5c-m2'), m2); tf($('s5c-m2'), (1 - m2) * 200, 0, 1);
    const tp = P(t, T('c16') + .3, .3); tf($('s5tap'), 832, 1215, .6 + tp * .6); op($('s5tap'), tp > 0 && tp < 1 ? 1 - tp : 0);
    life('s5m', t, { pivot: 0, mouth: t > T('c16') ? 'grin' : 'smile', brows: t > T('c16') ? 'sure' : 'norm', look: [.8, -.3], tilt: 4, R: [9, -14], L: [9, -14], seed: 2 });
  }
});

// ================= S6a the customer opens the link, likes one — "Kal aati hoon" =================
addScene('c17', 'c20', {
  svg: homeBG('s6', { noShelf: true, noClock: true }) + quiet(.3) + bust('s6c', CU, 230, FLOOR + 150, .85) + counterSVG(FLOOR + 170, C.woodLight) +
    `<g id="s6ph"><g transform="scale(.8)">${phoneSVG('s6p', 0, 0, 560, 1000, shopPage('s6s'))}</g></g>` +
    `<g id="s6tap" opacity="0"><circle r="34" fill="#fff" opacity=".7" stroke="${OL}" stroke-width="3"/></g>`,
  html: pillH(540, 352, 'c17', 'Saare outfits + <span class="hl">price</span>, ek saath 👀', '', 'c20-0.05') +
    `<div class="bubble" style="left:330px;top:620px;width:420px;font-size:34px" data-t="c19+0.2">"<span class="hl">Ye wala pasand aaya!</span> Kal aati hoon" 😍</div>`,
  cam: [1, 1.03], fy: 840,
  upd(t) {
    const sc = P(t, T('c17') + .2, .4, E.out); tf($('s6ph'), 690, 860 - Math.sin(clamp((t - T('c18')) / 1.2) * Math.PI) * 40, 1);
    for (let i = 0; i < 4; i++) op($(`s6s-r${i}`), 1);
    const pick = T('c19') - .1, tp = P(t, pick, .3);
    tf($('s6tap'), 790, 860, .6 + tp * .6); op($('s6tap'), tp > 0 && tp < 1 ? 1 - tp : 0);
    op($('s6s-sel'), P(t, pick + .1, .2)); const h = P(t, pick + .2, .35, E.back); op($('s6s-hrt'), h);
    life('s6c', t, { pivot: 0, mouth: t > T('c19') + .2 ? talkMouth(t, true) : (t > pick ? 'big' : 'smile'), brows: 'up', look: [.8, -.1], tilt: 4, R: [9, -14], L: [9, -14], y: hop(t, pick + .2, 12), seed: 4 });
    op($('s6ph'), sc || 1);
  }
});

// ================= S6b she walks into the shop, knowing what she wants =================
addScene('c20', 'c21', {
  svg: shopM('s6b') + stand('s6bm', MB, 800, 940, .78) + `<g id="s6bcw">${stand('s6bc', CU, 0, 0, .78)}</g>` + handPhone('s6bph', .9, 'app'),
  html: pillH(540, 352, 'c20', 'Customer <span class="hl">decide karke</span> aata hai ✅'),
  cam: [1, 1.03], fy: 880,
  upd(t) {
    const g = glide(t, T('c20') - .3, 1.1, -200, 400); tf($('s6bcw'), g[0], 940 + g[1], 1); PL['s6bc'].x = g[0]; PL['s6bc'].y = 940 + g[1];
    const A = life('s6bc', t, { mouth: 'grin', brows: 'up', look: [.8, 0], R: [150, -60], hR: 'fist', L: [9, -14], seed: 4 });
    atHand('s6bph', 's6bc', A.hr, 0, -60, 0);
    life('s6bm', t, { mouth: 'grin', brows: 'up', look: [-.8, 0], tilt: -4, L: [100 + Math.sin(t * 8) * 10, -60], hL: 'open', R: [9, -14], seed: 2 });
  }
});

// ================= S7 chai time + new customers find her shop (brand-safe badges) =================
addScene('c21', 'c24', {
  svg: shopM('s7') + quiet(.45) + bust('s7m', MB, 260, FLOOR + 130, .82) + counterSVG(FLOOR + 150) + `<g id="s7chai">${chaiSVG()}</g>` +
    `<g id="s7ph"><g transform="scale(.58)">${phoneSVG('s7p', 0, 0, 560, 1000,
      `<g transform="translate(0,40) scale(.54)">${cityMapSVG('s7map', [['Navrangpura', -250, -380], ['Maninagar', 250, 340]])}</g>` + arMysteryHeader() +
      [[-150, -160], [120, -60], [-60, 200], [170, 260], [-190, 360]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c22+${(i * .2).toFixed(1)}" data-k="drop">${mapPinSVG(i === 2 ? C.red : '#25A45A', 26)}</g></g>`).join('') +
      `<g transform="translate(-60,250)"><g data-t="c22+0.9" data-k="pop"><rect x="-150" y="-30" width="300" height="60" rx="30" fill="#fff" stroke="${OL}" stroke-width="3"/><text y="11" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${C.red}">Meenaben Rentals</text></g></g>`)}</g></g>`,
  html: pillH(540, 352, 'c21', 'Ab <span class="hl">chai</span> bhi, <span class="hl">customer</span> bhi ☕') +
    ['WhatsApp se shuru 💬', 'Apni city ke customers 📍', 'Aasaan setup ✅'].map((b, i) => pillH(540, 450 + i * 80, `c23+${(i * .35).toFixed(2)}`, b, i === 1 ? 'gold' : '')).join(''),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    tf($('s7ph'), 760, 980 + Math.sin(t * 2) * 5, 1);
    const sip = Math.sin(clamp((t - T('c21') - .3) / 1.2) * Math.PI);
    const A = life('s7m', t, { pivot: 0, mouth: sip > .5 ? 'flat' : 'smile', closed: sip > .5, brows: 'norm', look: [.7, -.2], tilt: 4, R: [80 + sip * 50, -40 - sip * 60], hR: 'fist', L: [9, -14], seed: 2 });
    atHand('s7chai', 's7m', A.hr, 0, -30, 0, .9);
  }
});

// ================= S8 the reveal: "Vo app ka naam tha… Anokhi Reet!" =================
addScene('c24', 'c26', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s8ro', 540, 840, .14, C.gold) + `<circle cx="540" cy="860" r="460" fill="url(#glow)" opacity=".6"/>` +
    bigPhone('s8ph', shopPage('s8s'), .82) +
    [[220, 560], [860, 620], [200, 1120], [880, 1100], [540, 480]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c25+${(.05 + i * .07).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(34, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c24', 'Vo app ka naam tha… 🥁', '', 'c25-0.05') + pillH(540, 352, 'c25', '<span class="hl">Anokhi Reet</span> ✨', 'big'),
  noWm: true, cam: [1, 1.03], fy: 860,
  upd(t) {
    tf($('s8ro'), 540, 840, 1, t * 5);
    const pop = Math.sin(clamp((t - T('c25')) / .35) * Math.PI) * .06;
    tf($('s8ph'), 560, 860, 1 + pop);
    for (let i = 0; i < 4; i++) op($(`s8s-r${i}`), 1);
    op($('s8s-real'), P(t, T('c25') - .05, .25));
  }
});

// ================= S9 takeaway: "30 photos nahi, bas ek link" =================
addScene('c26', 'c27', {
  svg: shopBG('s9', { noSign: true }) + quiet(.35) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + bust('s9m', MB, 540, FLOOR + 300, 1.2) + counterSVG(FLOOR + 170) + handPhone('s9ph', 1.5, 'link'),
  html: `<div class="title" style="top:390px;font-size:80px" data-t="c26">30 photos ❌<br>bas <span class="g">ek link</span> 🔗</div>`,
  cam: [1, 1.05], fy: 860,
  upd(t) { const A = life('s9m', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'sure', look: [0, 0], tilt: 4, R: [150, -110], hR: 'fist', L: [9, -14], seed: 2 }); atHand('s9ph', 's9m', A.hr, 0, -150, 6); }
});

// ================= S10 end card: Comment SHOP =================
addScene('c27', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s10r', 540, 760, .16, C.gold) + bust('s10m', MB, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s10wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:520px;font-size:76px">Ek link,<br><span class="g">poori dukaan</span> 🔗</div>` +
    pillH(540, 740, 'c29', 'Comment <span class="hl">SHOP</span> 👇', 'big') + pillH(540, 860, 'c27+0.5', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const im = $('s10wm'); if (im) im.src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s10r'), 540, 760, 1, t * 5); life('s10m', t, { pivot: 0, mouth: t > T('c29') ? 'grin' : talkMouth(t, true), brows: 'up', look: [0, 0], R: t > T('c29') ? WAVE(t, T('c29')) : [9, -14], hR: 'open', L: [9, -14], tilt: 4 }); }
});
