// ===== Dulhan ka dress code… aur ek chup saheli (Jhalak, Maya and the squad) =====
// Open loops: "Jhalak ka plan kya tha?" (paid off in the flashback) and the app's name (asked for and said at "Anokhi Reet!").
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const feet = sc => FLOOR + 40 - 372 * sc;
const flash = (id, col = '#fff') => `<rect id="${id}" width="${W}" height="${H}" fill="${col}" opacity="0"/>`;
const bub = (x, y, w, at, out, html, fs = 36) => `<div class="bubble" style="left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px" data-t="${at}"${out ? ` data-out="${out}"` : ''}>${html}</div>`;
const sparks = (pts, at) => pts.map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="${at}+${(i * .12).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join('');
const SEPIA = `<rect width="${W}" height="${H}" fill="#C9A77A" opacity=".28"/><rect width="${W}" height="${H}" fill="none" stroke="#5A3A28" stroke-width="80" opacity=".35"/>`;
const BM = BRIDESMAIDS;
const CHAT_TITLE = 'Jhalak ki Shaadi 💍👯‍♀️', CHAT_SUB = '8 members';
const crowd = (pre, xs, sc, y) => xs.map((x, i) => stand(pre + i, BM[i].look, x, y, sc)).join('');
const crowdLife = (pre, n, t, f) => { for (let i = 0; i < n; i++) life(pre + i, t, Object.assign({ mouth: 'smile', brows: 'up', look: [0, 0], seed: i + 3 }, f(i))); };

// ================= S1 hook: the bride sends the dress code — six friends reply at once =================
const DC = { who: 'Jhalak 💍', col: C.red, lines: ['Dress code for my bridesmaids 💅', 'Haldi: Peela 💛  Mehendi: Hara 💚', 'Sangeet: Purple 💜  Shaadi: Pink 🩷', 'Please sab dress code follow karna 🙏'], at: '-1' };
addScene(0, 'c4', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/><circle cx="540" cy="930" r="560" fill="url(#glow)"/>` +
    `<g transform="translate(540,940) scale(.9)">${phoneSVG('s1p', 0, 0, 560, 1000, groupChatScreen(CHAT_TITLE, CHAT_SUB, [DC,
      { who: 'Hetvi', col: '#C2456D', lines: ['Yesss! Mere paas peela wala hai 😍'], at: 'c2', fs: 25 },
      { who: 'Palak', col: '#7A4FA0', lines: ['Purple toh mera favourite hai 💜'], at: 'c2+0.4', fs: 25 },
      { who: 'Saloni', col: C.teal, lines: ['Pink lehenga ready hai 💃'], at: 'c2+0.8', fs: 25 },
      { who: 'Vrunda, Meera, Disha', col: '#C9821E', lines: ['😍😍🔥🔥'], at: 'c3', fs: 25 }], -330))}</g>` +
    [[90, 640], [90, 900], [90, 1160], [990, 640], [990, 900], [990, 1160]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c2+${(.2 + i * .15).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}"><g transform="scale(.62)">${personIcon(BM[i].look.top)}</g><text x="0" y="-36" text-anchor="middle" font-size="40">😍</text></g></g>`).join(''),
  html: `<div class="title" style="top:380px;font-size:72px" data-t="-1">Dulhan ka <span class="g">DRESS CODE</span> aa gaya 💌</div>` + pillH(540, 1500, 'c2', '6 saheliyan: <span class="hl">"READY HAI!"</span> 😍'),
  cam: [1, 1.03], fy: 900, capY: 1385
});

// ================= S2 the quiet one: Maya alone, an almari with nothing in the four colours =================
addScene('c4', 'c7', {
  svg: homeBG('s2', { night: true, lamp: true, lampX: 880, noShelf: true, noClock: true, noPlant: true }) + `<rect width="${W}" height="${H}" fill="#2E3D63" opacity=".14"/>` +
    almirahSVG('s2a', 820, FLOOR + 20, .9) + bedSVG(330, FLOOR - 60, 560, '#8E8170') + bust('s2m', MAYA.home, 300, FLOOR - 20, .78) + `<g id="s2ph"><g transform="scale(.42)">${phoneSVG('s2pp', 0, 0, 560, 1000, groupChatScreen(CHAT_TITLE, CHAT_SUB, [DC]))}</g></g>` +
    `<g transform="translate(300,640)"><g data-t="c4+1.2" data-k="pop" data-out="c5"><rect x="-90" y="-30" width="180" height="60" rx="30" fill="#fff" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#8A8178">typing…</text></g></g>`,
  html: pillH(540, 352, 'c4', 'Par Maya… <span class="hl">chup</span> thi 😶', '', 'c5-0.05') + pillH(540, 352, 'c5', '4 function · <span class="hl">4 naye outfit</span>', '', 'c6-0.05') + pillH(540, 352, 'c6', '<span class="hl">Budget</span> nahi tha 😔'),
  cam: [1, 1.04], fy: 900,
  init() { $('s2a-inside').innerHTML = [0, 1].map(i => `<g transform="translate(${-60 + i * 120},-330) scale(.55)">${lehengaHangerSVG('', { c: ['#A89A86', '#8C9AA8'][i], d: ['#8E8170', '#71808E'][i], b: '#C9BFAE', dupatta: '#D8D0C2' })}</g>`).join(''); },
  upd(t) {
    const k = P(t, T('c5'), .6, E.io);
    $('s2a-dL').setAttribute('transform', `translate(-150,0) scale(${(1 - k * .92).toFixed(3)},1) translate(150,0)`);
    $('s2a-dR').setAttribute('transform', `translate(150,0) scale(${(1 - k * .92).toFixed(3)},1) translate(-150,0)`);
    const A = life('s2m', t, { pivot: 0, mouth: 'sad', brows: 'worry', look: t > T('c5') && t < T('c6') + .5 ? [.9, 0] : [.5, .6], tilt: -5, R: [100, -95], hR: 'fist', L: [9, -14], seed: 2 });
    atHand('s2ph', 's2m', A.hr, 20, -120, 6);
  }
});

// ================= S3 her message: "Sorry Jhalak… main nahi aa paungi" — the chat goes quiet =================
addScene('c7', 'c9', {
  svg: `<rect width="${W}" height="${H}" fill="#2B2F3A"/><circle cx="540" cy="930" r="520" fill="url(#glow)" opacity=".35"/>` +
    `<g transform="translate(540,930) scale(.9)">${phoneSVG('s3p', 0, 0, 560, 1000, groupChatScreen(CHAT_TITLE, CHAT_SUB, [DC,
      { who: 'Saloni', col: C.teal, lines: ['Pink lehenga ready hai 💃'], fs: 25 },
      { me: true, lines: ['Sorry Jhalak… main shaadi', 'mein nahi aa paungi 😔'], at: 'c8' },
      { typing: true, at: 'c8+1.0', out: 'c8+1.9' }], -330))}</g>`,
  html: pillH(540, 352, 'c8', '"Main nahi aa paungi…" 💔'),
  noWm: true, cam: [1, 1.05], fy: 1000, capY: 1385
});

// ================= S4 the call: Jhalak (bridal prep chaos) and Maya (teary, then a small smile) =================
addScene('c9', 'c17', {
  svg: `<rect width="540" height="${H}" fill="#F7E1D0"/><rect x="540" width="540" height="${H}" fill="#C9C3D9"/>` +
    [[90, 560], [170, 760], [420, 520], [460, 760]].map(([x, y], i) => `<g transform="translate(${x},${y})" class="sway">${i % 2 ? mehendiConeSVG() : todoListSVG('To-do', ['Mehendi ✓', 'Caterer ✓'])}</g>`).join('') +
    bust('s4j', JHALAK.prep, 270, 1340, .78) + bust('s4m', MAYA.home, 810, 1340, .78) + counterSVG(FLOOR + 170, '#5D3A3A') +
    `<rect x="534" y="0" width="12" height="${H}" fill="${C.redDark}"/>` + `<g id="s4p1">${phoneBackSVG(.75)}</g><g id="s4p2">${phoneBackSVG(.75)}</g>` +
    `<g transform="translate(810,470)"><g data-t="c9" data-k="pop" data-out="c10"><rect x="-200" y="-40" width="400" height="80" rx="40" fill="#25A45A" stroke="${OL}" stroke-width="4"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="800" font-size="32" fill="#fff">📞 Jhalak 💍 calling</text></g></g>`,
  html: bub(300, 640, 500, 'c9', 'c11-0.05', '"<span class="hl">Pagal hai kya?</span> Tere bina meri shaadi?"', 34) +
    bub(300, 640, 500, 'c11', 'c14-0.05', '"Mujhe pata hai kya baat hai. Tension mat le… <span class="hl">sab mujh pe chhod de.</span>"', 32) +
    bub(800, 640, 380, 'c14', 'c15', '"Par Jhalak…" 🥺', 34) +
    bub(300, 640, 500, 'c15', '', '"Bas. Tu aa rahi hai. Baaki <span class="hl">main dekh lungi.</span>" 😌', 32) + pillH(540, 352, 'c13', '"Sab mujh pe chhod de" 🤝'),
  cam: [1, 1.03], fy: 900,
  upd(t) {
    const jt = t < T('c14') || t > T('c15');
    const A = life('s4j', t, { pivot: 0, mouth: jt ? talkMouth(t, true) : 'smile', brows: t < T('c11') ? 'angry' : 'sure', look: [.6, 0], tilt: t > T('c15') ? 6 : 0, wink: t > T('c16') + .4 && t < T('c16') + .9, R: [110, 70], hR: 'fist', L: t < T('c11') ? [100, -60] : [9, -14], hL: 'open', seed: 5 });
    atHand('s4p1', 's4j', A.hr, 0, -10, 8);
    const soft = t > T('c15') + .5;
    const B = life('s4m', t, { pivot: 0, mouth: t > T('c14') && t < T('c15') ? talkMouth(t, true) : (soft ? 'shy' : 'sad'), brows: 'worry', look: [-.6, .2], sweat: soft ? 0 : .5, tilt: soft ? -4 : 4, R: [110, 70], hR: 'fist', L: [9, -14], blush: soft ? .6 : 0, seed: 2 });
    atHand('s4p2', 's4m', B.hr, 0, -10, 8);
  }
});

// ================= S5 Maya puts the phone down: what was Jhalak's plan? =================
addScene('c17', 'c19', {
  svg: homeBG('s5', { night: true, lamp: true, lampX: 880, noShelf: true, noClock: true, noPlant: true }) + bedSVG(540, FLOOR - 60, 620, '#8E8170') + bust('s5m', MAYA.home, 540, FLOOR - 20, .85) +
    `<g transform="translate(760,640)"><g data-t="c17+0.3" data-k="pop" data-bob="10"><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="140" fill="${C.red}" stroke="${OL}" stroke-width="4">?</text></g></g>`,
  html: pillH(540, 352, 'c17', 'Jhalak ka <span class="hl">plan</span> kya tha? 🤔'),
  cam: [1, 1.05], fy: 950,
  upd(t) { life('s5m', t, { pivot: 0, mouth: 'shy', brows: 'up', look: [.6, -.6], tilt: 6, R: CLASP, L: CLASP, blush: .4, seed: 2 }); }
});

// ================= S6 the montage: Haldi 💛 · Mehendi 💚 · Sangeet 💜 · Shaadi 🩷 — Maya shines =================
const FN = [['HALDI 💛', MAYA.haldi, '#F7D23A', 40, 400, 'c19'], ['MEHENDI 💚', MAYA.mehendi, '#B8E08F', 560, 400, 'c19+0.6'], ['SANGEET 💜', MAYA.sangeet, '#C9A6E8', 40, 860, 'c20'], ['SHAADI 🩷', MAYA.shaadi, '#F4A0B8', 560, 860, 'c20+0.6']];
addScene('c19', 'c21', {
  svg: `<rect width="${W}" height="${H}" fill="#1A1A1A"/>` +
    FN.map(([chip, look, bg, x, y, at], i) => `<g data-t="${at}" data-k="pop">${comicPanel('s6p' + i, x, y, 480, 430, bg, bust('s6m' + i, look, x + 240, y + 470, .62) + sparks([[x + 70, y + 330], [x + 420, y + 260]], at))}` +
      `<g transform="translate(${x + 120},${y + 50})"><rect x="-100" y="-30" width="200" height="60" rx="12" fill="#fff" stroke="#1A1A1A" stroke-width="5"/><text y="11" text-anchor="middle" font-family="Inter" font-weight="900" font-size="28" fill="${C.red}">${chip}</text></g>` +
      `<g transform="translate(${x + 410},${y + 70})"><g data-t="${at}+0.1" data-k="pop" data-out="${at}+0.6">${flashSVG(56)}</g></g></g>`).join(''),
  html: pillH(540, 352, 'c20', 'Har function mein <span class="hl">SABSE SUNDAR</span> = Maya ✨') +
    bub(540, 1250, 760, 'c20+0.9', '', '"Ye kaun hai? <span class="hl">Sabse sundar</span> toh yahi lag rahi hai!"', 32),
  noWm: true, cam: [1, 1.02], fy: 860, capY: 1400,
  upd(t) { FN.forEach((_, i) => life('s6m' + i, t, { pivot: 0, mouth: i === 0 ? 'big' : 'grin', brows: 'up', look: [i % 2 ? -.3 : .3, 0], tilt: i % 2 ? -5 : 5, blush: i === 0 ? .6 : 0, R: i === 2 ? WAVE(t, 0) : [9, -14], hR: 'open', L: [9, -14], seed: i + 2 })); }
});

// ================= S7 the question: "Kahan se manage kiye?!" — across the mandap, Jhalak winks 😉 =================
addScene('c21', 'c24', {
  svg: weddingHallBG('s7') + crowd('s7b', [110, 240, 370, 710, 840, 970], .56, feet(.56)) + stand('s7m', MAYA.shaadi, 540, feet(.7), .7) +
    `<g id="s7in" opacity="0"><circle cx="880" cy="560" r="170" fill="#F6E3CF" stroke="${C.gold}" stroke-width="12"/><clipPath id="s7cp"><circle cx="880" cy="560" r="160"/></clipPath>` +
    `<g clip-path="url(#s7cp)">${bust('s7j', JHALAK.bride, 880, 800, .62)}</g></g>` + `<g transform="translate(990,450)"><g data-t="c23+1.0" data-k="pop" data-out="c24">${sparkleSVG(40, C.gold)}</g></g>`,
  html: bub(330, 560, 520, 'c21', 'c23-0.05', '"<span class="hl">Maya!</span> Tune itne sundar outfits kahan se manage kiye?!"', 32) +
    bub(360, 560, 440, 'c23', '', '"Haan, <span class="hl">humse bhi acche</span> hain!"', 34) + pillH(540, 352, 'c21', '"Kaise manage kiya?!" 😳', '', 'c23+0.7') + pillH(540, 352, 'c23+0.8', '😉', 'big'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    crowdLife('s7b', 6, t, i => ({ mouth: (i === 0 && t < T('c23')) || (i === 1 && t > T('c23')) ? talkMouth(t, true) : 'o', look: [i < 3 ? .9 : -.9, 0], tilt: i < 3 ? 5 : -5, R: i === 0 ? [100, -60] : [9, -14], hR: 'open' }));
    const look = t > T('c23') + .6;
    life('s7m', t, { mouth: look ? 'shy' : 'smile', brows: 'up', look: look ? [.9, -.4] : [-.3, 0], blush: .5, R: [9, -14], L: [9, -14], seed: 2 });
    op($('s7in'), P(t, T('c23') + .5, .3)); life('s7j', t, { pivot: 0, mouth: 'grin', brows: 'sure', look: [-.7, 0], tilt: -6, wink: t > T('c23') + 1.0 && t < T('c23') + 2.1, seed: 5 });
  }
});

// ================= S8a flashback: two weeks earlier, late at night, Jhalak with her lists and her phone =================
addScene('c24', 'c26', {
  svg: homeBG('s8', { night: true, lamp: true, lampX: 880, noShelf: true, noClock: true, noPlant: true }) + bedSVG(540, FLOOR - 60, 680, '#C24E70') + bust('s8j', JHALAK.prep, 540, FLOOR - 20, .85) +
    `<g transform="translate(200,1060)">${todoListSVG()}</g><g transform="translate(880,1080)">${todoListSVG('Guest list', ['Mausi ✓', 'Fua ji ✓', 'Squad ✓'])}</g>` + `<g id="s8ph">${phoneBackSVG(1)}</g>` + SEPIA,
  html: pillH(540, 352, 'c24', '<span class="hl">2 hafte pehle…</span> ⏪'),
  cam: [1, 1.05], fy: 950,
  upd(t) { const A = life('s8j', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [.5, .5], tilt: 4, R: [100, -95], hR: 'fist', L: [9, -14], seed: 5 }); atHand('s8ph', 's8j', A.hr, 20, -120, 6); }
});

// ================= S8b the app (name hidden): Location · Occasion · Colour · Budget — four outfits for Maya, booked =================
const CARDS = [['#F7C548', '#D9A52E', 'Haldi 💛'], [C.emerald, C.emeraldDark, 'Mehendi 💚'], ['#7A4FA0', '#5D3A7E', 'Sangeet 💜'], ['#E8708F', '#C9556F', 'Shaadi 🩷']];
const chip = (x, y, txt, at) => `<g transform="translate(${x},${y})"><g data-t="${at}" data-k="pop"><rect x="-118" y="-30" width="236" height="60" rx="30" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${C.text}">${txt}</text></g></g>`;
addScene('c26', 'c30', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + `<g transform="translate(540,880) scale(.95)">${phoneSVG('s9p', 0, 0, 560, 1000, `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/>` + arMysteryHeader() +
      chip(-126, -330, '📍 Location', 'c26') + chip(126, -330, '🎉 Occasion', 'c26+0.3') + chip(-126, -250, '🎨 Colour', 'c27') + chip(126, -250, '💰 Budget', 'c27+0.4') +
      CARDS.map(([c, d, lab], i) => `<g transform="translate(${-122 + (i % 2) * 244},${-30 + (i / 2 | 0) * 300})"><g data-t="c28+${(i * .35).toFixed(2)}" data-k="pop"><rect x="-112" y="-130" width="224" height="270" rx="18" fill="#fff" stroke="${C.goldTan}" stroke-width="4"/>` +
        `<g transform="translate(0,-30)">${lehengaHangerSVG('', { c, d, dupatta: '#FFE3CF' }, .48)}</g><text y="100" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${C.text}">Maya ke liye ${lab.split(' ')[1]}</text>` +
        `<text y="128" text-anchor="middle" font-family="Inter" font-weight="900" font-size="20" fill="#1F7A4D">RENT · Booked ✓</text></g></g>`).join(''))}</g>` + SEPIA,
  html: pillH(540, 352, 'c26', 'Ek app pe… <span class="hl">Colour ✅ Budget ✅</span>', '', 'c28-0.05') + pillH(540, 352, 'c28', '<span class="hl">4 outfits RENT pe</span> ✅'),
  noWm: true, cam: [1, 1.03], fy: 880, capY: 1385
});

// ================= S9a the truth: "Sab rent pe hain… Jhalak ne kiya." — "Konse app se?" — "App ka naam bata!" =================
addScene('c30', 'c33', {
  svg: weddingHallBG('s10') + crowd('s10b', [110, 240, 370, 710, 840, 970], .56, feet(.56)) + stand('s10m', MAYA.shaadi, 540, feet(.7), .7) + `<g id="s10ph">${phoneBackSVG(.8)}</g>`,
  html: bub(540, 560, 520, 'c30', 'c31-0.05', '"<span class="hl">Sab rent pe hain…</span> Jhalak ne kiya." ☺️', 34) +
    bub(300, 560, 480, 'c31', 'c32-0.05', '"Rent pe? <span class="hl">Konse app</span> se rent par mila?"', 34) +
    bub(780, 560, 460, 'c32', '', '"Haan haan, humko bhi <span class="hl">app ka naam</span> bata!"', 34) + pillH(540, 352, 'c30', '"Sab <span class="hl">RENT</span> pe hain!" 😳'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    crowdLife('s10b', 6, t, i => ({ mouth: (i === 1 && t > T('c31') && t < T('c32')) || (i === 4 && t > T('c32')) ? talkMouth(t, true) : 'o', look: [i < 3 ? .9 : -.9, 0], lean: t > T('c31') ? (i < 3 ? 6 : -6) : 0, R: (i === 1 && t > T('c31')) || (i === 4 && t > T('c32')) ? [110, -60] : [9, -14], hR: 'open' }));
    const A = life('s10m', t, { mouth: t < T('c31') ? talkMouth(t, true) : 'shy', brows: 'up', look: [0, 0], blush: .5, R: t > T('c32') + .5 ? [120, -70] : [9, -14], hR: 'fist', L: [9, -14], seed: 2 });
    atHand('s10ph', 's10m', A.hr, 10, -110, 6); op($('s10ph'), t > T('c32') + .5 ? 1 : 0);
  }
});

// ================= S9b the name: Maya turns her phone around — "Anokhi Reet!" =================
addScene('c33', 'c34', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s11r', 540, 860, .14, C.gold) + `<circle cx="540" cy="860" r="460" fill="url(#glow)" opacity=".6"/>` +
    `<g id="s11back">${phoneBackSVG(2.4)}</g><g id="s11front"><g transform="scale(.62)">${phoneSVG('s11p', 0, 0, 560, 1000, arFeedScreen('s11f'))}</g></g>` +
    sparks([[200, 620], [880, 600], [180, 1160], [900, 1180]], 'c33+0.3'),
  html: pillH(540, 352, 'c33+0.3', '<span class="hl">Anokhi Reet</span> ✨', 'big'),
  noWm: true, cam: [1, 1.03], fy: 860, capY: 1385,
  upd(t) {
    tf($('s11r'), 540, 860, 1, t * 5); op($('s11f-q'), 0); op($('s11f-real'), 1); tf($('s11f-feed'), 0, -((t * 200) % 1200));
    const k = clamp((t - T('c33')) / .45), sx = Math.cos(k * Math.PI);
    $('s11back').setAttribute('transform', `translate(540,880) scale(${k < .5 ? Math.abs(sx).toFixed(3) : 0},1)`);
    $('s11front').setAttribute('transform', `translate(540,880) scale(${k >= .5 ? Math.abs(sx).toFixed(3) : 0},1)`);
  }
});

// ================= S9c "Aur hum log khareed-khareed ke pagal ho gaye!" — laughter and a group hug =================
addScene('c34', 'c36', {
  svg: weddingHallBG('s12') + crowd('s12b', [150, 260, 370, 710, 820, 930], .56, feet(.56)) + stand('s12j', JHALAK.bride, 610, feet(.68), .68) + stand('s12m', MAYA.shaadi, 470, feet(.68), .68) +
    [[200, 560], [880, 560], [540, 500]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c35+${(.4 + i * .1).toFixed(1)}" data-k="pop" data-bob="8" data-ph="${i}"><text text-anchor="middle" font-size="90">${['😂', '🤗', '💕'][i]}</text></g></g>`).join(''),
  html: bub(330, 640, 500, 'c34', 'c35-0.05', '"Aur hum log <span class="hl">khareed-khareed</span> ke pagal ho gaye!" 😭', 32) +
    bub(760, 640, 420, 'c35', '', '"<span class="hl">Agli baar</span> humein bhi batana!"', 34) + pillH(540, 352, 'c34', '😂🤗'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const hug = P(t, T('c35') + .5, .5, E.out);
    crowdLife('s12b', 6, t, i => ({ mouth: 'grin', closed: hug > .5, look: [i < 3 ? .9 : -.9, 0], lean: hug * (i < 3 ? 10 : -10), R: hug > .3 ? [70, -40] : [9, -14], L: hug > .3 ? [70, -40] : [9, -14], hR: 'open', hL: 'open', y: hop(t, T('c35') + .6 + i * .05, 16) }));
    life('s12m', t, { mouth: 'grin', brows: 'up', look: [.6, 0], tilt: 5, blush: .5, R: hug > .3 ? [80, -40] : [9, -14], L: [9, -14], seed: 2 });
    life('s12j', t, { mouth: 'grin', brows: 'up', look: [-.6, 0], tilt: -5, L: hug > .3 ? [80, -40] : [9, -14], R: [9, -14], seed: 5 });
  }
});

// ================= S10a the group photo freezes into a polaroid: "Squad complete 💕" =================
addScene('c36', 'c38', {
  svg: weddingHallBG('s13') + crowd('s13b', [150, 260, 370, 710, 820, 930], .56, feet(.56)) + stand('s13j', JHALAK.bride, 640, feet(.68), .68) + stand('s13m', MAYA.shaadi, 450, feet(.68), .68) +
    flash('s13fl') + `<g id="s13pol" opacity="0"><g transform="translate(540,880)">${polaroidSVG(1000, 1240, 'Squad complete 💕')}</g></g>`,
  html: '',
  cam: (t, lt) => lerp(1, .82, E.io(clamp((t - T('c36') - .5) / .7))), fy: 900, capY: 1300,
  upd(t) {
    const f = P(t, T('c36') + .4, .15); op($('s13fl'), f > 0 && f < 1 ? .9 * (1 - f) : 0); op($('s13pol'), t > T('c36') + .45 ? 1 : 0);
    const frz = t > T('c36') + .45, tt = frz ? T('c36') + .45 : t;
    crowdLife('s13b', 6, tt, i => ({ mouth: 'grin', look: [0, 0], R: i % 2 ? WAVE(tt, 0) : [9, -14], hR: 'open' }));
    life('s13m', tt, { mouth: 'grin', brows: 'up', look: [0, 0], tilt: 5, blush: .4, R: [9, -14], L: [9, -14], seed: 2 });
    life('s13j', tt, { mouth: 'grin', brows: 'up', look: [0, 0], tilt: -5, R: WAVE(tt, 0), hR: 'open', L: [9, -14], seed: 5 });
  }
});

// ================= S10b end card: Anokhi Reet — Comment SQUAD 👇 · tag your squad =================
addScene('c38', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s14r', 540, 800, .16, C.gold) + `<g transform="translate(540,1260) rotate(-4) scale(.5)">${polaroidSVG(1000, 1240, 'Squad complete 💕')}</g>` +
    `<g transform="translate(540,1260) rotate(-4) scale(.5)"><rect x="-476" y="-596" width="952" height="1096" fill="#F6E3CF"/>${[...Array(8)].map((_, i) => `<g transform="translate(${-330 + (i % 4) * 220},${i < 4 ? -200 : 150}) scale(1.9)">${personIcon([...BM.map(b => b.look.top), '#E8708F', '#B3122E'][i])}</g>`).join('')}</g>` +
    `<g transform="translate(540,1260) rotate(-4) scale(.5)">${polaroidSVG(1000, 1240, 'Squad complete 💕')}</g>`,
  html: `<img id="s14wm" style="position:absolute;left:310px;top:190px;width:460px" src="">` + pillH(540, 330, 'c38+0.3', 'anokhireet.in', 'gold') +
    pillH(540, 450, 'c38', '<span class="hl">Anokhi Reet</span> ✨', 'big') + pillH(540, 570, 'c39', 'Apni squad ko tag karo 👯‍♀️') + pillH(540, 680, 'c40', 'Comment <span class="hl">SQUAD</span> 👇', 'big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03], fy: 820, capY: 820,
  init() { $('s14wm').src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s14r'), 540, 800, 1, t * 5); }
});
