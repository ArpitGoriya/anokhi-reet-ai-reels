// ===== Season ka sapna: Pankaj bhai's dream, timed to the voice (see captions.js) =====
// Dream scenes get dreamSVG/dreamUpd (glow, wavy edges, sparkles); real scenes stay plain.
const PK = PANKAJ;
const CW = SAREE(CUSTOMER_W, '#F4B9C8', C.pinkDark);
const W1 = SAREE(GUEST_W1, '#7A4FA0', '#5D3A7E');
const W2 = SAREE(GUEST_W2, '#E07B39', '#B95F25');
const RED = { k: 'l', c: '#C0262D', d: '#97151B', p: '#F2A08F' };
const SLEEP = { closed: true, mouth: 'smile', nod: 18, tilt: 12, L: CLASP, R: CLASP, pivot: 0 };

// ================= S1 hook: empty shop, a quiet afternoon, Pankaj bhai dozes off =================
addScene(0, 'c4', {
  svg: rentalShopBG('s1', { noMirror: true, clock: true, clockY: 640, clockX: 540 }) +
    bust('pk1', PK, 540, FLOOR + 200, 1.05) + counterSVG() +
    [[650, 900, 12], [690, 860, 17], [730, 820, 22]].map(([x, y, r], i) => `<g transform="translate(${x},${y})"><g data-t="c3+${.5 + i * .15}"><circle r="${r}" fill="#fff" stroke="${OL}" stroke-width="4"/></g></g>`).join('') +
    `<g transform="translate(840,720) scale(.9)"><g data-t="c3+1.0" data-bob="5">${thoughtCloud()}</g></g>`,
  html: `<div class="title" style="top:400px" data-t="-1" data-out="c2-0.1">Season ka <span class="g">SAPNA</span> 💭</div>` +
    pillH(540, 400, 'c2+0.05', 'Dukaan <span class="hl">khaali…</span> 😴'),
  cam: [1, 1.06], fy: 900,
  upd(t) {
    clockTick('s1-clk', t * 3, 20);
    const doze = clamp((t - T('c3')) / 1.4);
    life('pk1', t, { pivot: 0, closed: doze > .85, mouth: doze > .5 ? 'smile' : 'flat', brows: 'norm', nod: doze * 18, tilt: doze * 12, look: [0, .6], L: CLASP, R: CLASP, sway: .6 });
  }
});

// ================= S2: "Unko sapna aaya…" the picture ripples into a dream =================
addScene('c4', 'c5', {
  svg: `<filter id="rip2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.02" numOctaves="1" seed="3"/><feDisplacementMap id="rip2-d" in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>` +
    `<g filter="url(#rip2)">` + rentalShopBG('s2', { noMirror: true }) + `<circle id="s2-gl" cx="540" cy="900" r="600" fill="url(#glow)"/>` +
    bust('pk2', PK, 540, FLOOR + 430, 1.6) + counterSVG(FLOOR + 160) + `</g>` + dreamSVG('dm2'),
  html: pillH(540, 400, 'c4+0.1', 'Unko <span class="hl">sapna</span> aaya… ✨'),
  cam: [1.02, 1.12], fy: 950,
  upd(t, lt, s) {
    const d = s.b - s.a, k = clamp(lt / d);
    life('pk2', t, Object.assign({}, SLEEP, { mouth: 'big', nod: 10, tilt: 8 }));
    tf($('s2-gl'), 0, 0, lerp(.4, 1.6, E.out(k)), 0, 540, 900);
    $('rip2-d').setAttribute('scale', (Math.sin(lt * 6) * .5 + .5) * 40 * E.in(k) + 6 * k);
    dreamUpd('dm2', t, E.io(clamp((k - .2) / .8)));
  }
});

// ================= S3a dream: the shop is full, crowd of customers =================
addScene('c5', 'c7', {
  svg: rentalShopBG('s3', { noMirror: true }) + `<circle cx="540" cy="800" r="520" fill="url(#glow)"/>` +
    bust('pk3', dress(PK, {}), 540, 1090, .82) + midCounter() +
    stand('cu3a', W1, 105, 1000, .55) + stand('cu3b', CW, 270, 1050, .57) + stand('cu3c', MAUSI, 815, 1050, .55) + stand('cu3d', W2, 975, 1000, .55) +
    dreamSVG('dm3'),
  html: pillH(540, 400, 'c6+0.3', 'Bhari <span class="hl">dukaan</span> 🙌'),
  cam: [1.04, 1], fy: 900,
  upd(t) {
    dreamUpd('dm3', t, 1);
    life('pk3', t, { pivot: 0, mouth: 'grin', brows: 'up', y: hop(t, T('c6') + .2, 16), L: CLASP, R: [lerp(9, 40, P(t, T('c6'), .4)), -20], hR: 'open', seed: 1 });
    life('cu3a', t, { mouth: 'big', look: [.6, 0], L: CLASP, R: CLASP, seed: 2, y: hop(t, T('c5') + .3, 12) });
    life('cu3b', t, { mouth: 'talk', look: [.6, -.2], R: [130, -30], hR: 'open', seed: 3, y: hop(t, T('c5') + .6, 12) });
    life('cu3c', t, { mouth: 'big', look: [-.6, 0], L: CLASP, R: CLASP, seed: 4 });
    life('cu3d', t, { mouth: 'big', look: [-.6, -.2], L: [130, -30], hL: 'open', seed: 5, y: hop(t, T('c6') + .5, 12) });
  }
});

// ================= S3b dream: everyone holds up a phone, "Bhaiya, mujhe ye wala chahiye!" =================
addScene('c7', 'c10', {
  svg: rentalShopBG('s4', { noMirror: true }) +
    bust('cu4a', GUEST_W1, 190, FLOOR + 130, .92) + bust('cu4c', GUEST_W2, 890, FLOOR + 130, .92) + bust('cu4b', CUSTOMER_W, 540, FLOOR + 90, 1.02) +
    counterSVG(FLOOR + 70) +
    heldPhone('s4-pa', { k: 's', c: '#E8D3A5', d: '#C9AE6A' }, 1.1) + heldPhone('s4-pb', RED, 1.25) + heldPhone('s4-pc', { k: 'l', c: C.emerald, d: C.emeraldDark, p: '#A6D3B0' }, 1.1) +
    dreamSVG('dm4'),
  html: `<div class="bubble" style="left:540px;top:430px;width:820px" data-t="c9-0.05">"Bhaiya, mujhe <span class="hl">ye wala</span> chahiye!"</div>`,
  cam: [1, 1.05], fy: 900,
  upd(t) {
    dreamUpd('dm4', t, 1);
    const up = i => E.out(clamp((t - T('c7') - i * .3) / .4));
    const say = t > T('c9') - .1;
    const A = life('cu4a', t, { mouth: say ? 'talk' : 'big', look: [.3, -.3], L: [9, -14], R: [lerp(9, 120, up(1)), lerp(-14, -40, up(1))], hR: 'open', seed: 6 });
    const B = life('cu4b', t, { mouth: say ? talkMouth(t, true) : 'smile', brows: say ? 'up' : 'norm', look: [0, -.2], L: [9, -14], R: [lerp(9, 128, up(0)), lerp(-14, -36, up(0))], hR: 'open', seed: 7, y: hop(t, T('c9'), 12) });
    const Cc = life('cu4c', t, { mouth: say ? 'talk' : 'big', look: [-.3, -.3], R: [9, -14], L: [lerp(9, 120, up(2)), lerp(-14, -40, up(2))], hL: 'open', seed: 8 });
    const place = (pid, who, h, i) => { const p = toScene(who, h); tf($(pid), p[0], p[1] - 70, 1, Math.sin(t * 2 + i) * 4); op($(pid), up(i)); };
    place('s4-pb', 'cu4b', B.hr, 0); place('s4-pa', 'cu4a', A.hr, 1); place('s4-pc', 'cu4c', Cc.hl, 2);
  }
});

// ================= S3c dream: racks empty as outfits go out =================
addScene('c10', 'c11', {
  svg: rentalShopBG('s5', { noMirror: true }) + bust('pk5', PK, 540, FLOOR + 160, 1.0) + counterSVG(),
  cam: [1, 1.04], fy: 760,
  init() { this.items = ['s5-rA', 's5-rB'].flatMap(r => [0, 1, 2, 3].map(i => `${r}-i${i}`)); },
  upd(t) {
    dreamUpd('dm5', t, 1);
    const t0 = T('c10'), gap = (T('c11') - t0 - .3) / 8;
    ['s5-rA', 's5-rB'].forEach((r, ri) => [0, 1, 2, 3].forEach(i => {
      const n = i * 2 + ri, k = E.in(clamp((t - t0 - n * gap) / .35)), hx = -180 + i * 120;
      const el = $(`${r}-i${i}`); tf(el, hx + (ri ? -1 : 1) * k * 120, 56 + k * 300, 1 - .4 * k, (ri ? -1 : 1) * k * 20); op(el, 1 - k);
    }));
    const hand = Math.floor((t - t0) / .3) % 2;
    life('pk5', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [hand ? .6 : -.6, 0], L: hand ? [9, -14] : [80, -10], R: hand ? [80, -10] : [9, -14], hL: 'open', hR: 'open', seed: 2 });
  },
  html: '',
});
SC[SC.length - 1].svg += dreamSVG('dm5');

// ================= S3d dream: the register fills page after page =================
addScene('c11', 'c12', {
  svg: `<rect width="${W}" height="${H}" fill="${C.woodLight}"/>` + [...Array(9)].map((_, i) => `<path d="M0,${200 + i * 200} H${W}" stroke="${C.wood}" stroke-width="6" opacity=".5"/>`).join('') +
    `<g transform="translate(540,860) scale(1.45)">${registerSVG('rg6')}</g><g id="s6-pen">${penSVG()}</g>` + dreamSVG('dm6'),
  html: pillH(540, 400, 'c11+0.1', 'Full <span class="hl">register</span> 📒'),
  cam: [1, 1.06], fy: 860,
  upd(t) {
    dreamUpd('dm6', t, 1);
    const t0 = T('c11') + .1, gap = .2; registerFill('rg6', t, t0, gap);
    const i = clamp(Math.floor((t - t0) / gap), 0, 5), side = i < 3 ? -1 : 1, j = i % 3, f = ((t - t0) / gap) % 1;
    tf($('s6-pen'), 540 + (side < 0 ? -270 + f * 160 : 40 + f * 160) * 1.45, 860 + (-100 + j * 96) * 1.45 - 10 + Math.sin(t * 30) * 6, 1.2);
  }
});

// ================= S3e dream: a bride twirls in his red lehenga at a function =================
addScene('c12', 'c14', {
  svg: weddingBG() + stand('w7a', W1, 170, 1010, .62) + stand('w7c', W2, 910, 1010, .62) +
    `<g id="s7-br">${stand('br7', BRIDE, 0, 0, .95)}</g>` + dreamSVG('dm7'),
  html: pillH(540, 400, 'c13+0.1', 'Har lehenga <span class="hl">function</span> mein 💃'),
  cam: [1, 1.05], fy: 900,
  upd(t, lt) {
    dreamUpd('dm7', t, 1);
    const spin = Math.cos(lt * 4.2);
    tf($('s7-br'), 540, 960 + hop(t, T('c12') + .2, 14), 1, 0, 0, 0, 1); $('s7-br').setAttribute('transform', `translate(540,${(960 + hop(t, T('c12') + .2, 14)).toFixed(1)}) scale(${(.72 + .28 * Math.abs(spin)).toFixed(3)},1)`);
    life('br7', t, { mouth: 'grin', brows: 'up', L: [120, -20], R: [120, -20], hL: 'open', hR: 'open', seed: 9 });
    const clap = Math.sin(t * 9) > 0;
    life('w7a', t, { mouth: 'big', look: [.7, 0], L: clap ? CLASP : [20, -80], R: clap ? CLASP : [20, -80], seed: 3 });
    life('w7c', t, { mouth: 'big', look: [-.7, 0], L: clap ? [20, -80] : CLASP, R: clap ? [20, -80] : CLASP, seed: 4 });
  }
});

// ================= S4: the phone rings… the dream shatters, back to the empty shop =================
addScene('c14', 'c16', {
  svg: rentalShopBG('s8', { noMirror: true, clock: true, clockY: 640, clockX: 540 }) +
    bust('pk8', PK, 540, FLOOR + 200, 1.05) + counterSVG() +
    `<g id="s8-ph" transform="translate(850,1120)"><g id="s8-phi"><rect x="-46" y="-82" width="92" height="164" rx="16" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect id="s8-scr" x="-36" y="-70" width="72" height="140" rx="9" fill="#3A4D6B"/></g><g id="s8-bz">${buzzSVG(60, 120)}</g></g>` +
    dreamSVG('dm8') + shardsSVG('sh8'),
  html: pillH(540, 400, 'c15+0.7', 'Sapna <span class="hl">toot</span> gaya 😔'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    clockTick('s8-clk', t * 3, 20);
    const tb = T('c14') + .25, ts = T('c15') + .05;
    const ring = t > tb && t < ts + 1.2;
    tf($('s8-phi'), ring ? Math.sin(t * 70) * 6 : 0, 0, 1, ring ? Math.sin(t * 55) * 6 : 0);
    op($('s8-bz'), ring && Math.sin(t * 14) > -.3 ? 1 : 0);
    $('s8-scr').setAttribute('fill', t > tb ? '#E9F4F8' : '#3A4D6B');
    dreamUpd('dm8', t, t < ts ? 1 : 0);
    shatter('sh8', t, ts);
    const awake = t > ts, look = t > ts + .7 ? (Math.sin((t - ts) * 3) > 0 ? .8 : -.8) : 0, sad = t > ts + 1.3;
    if (!awake) life('pk8', t, Object.assign({}, SLEEP, { mouth: t > tb ? 'flat' : 'smile' }));
    else life('pk8', t, { pivot: 0, mouth: sad ? 'sad' : 'o', brows: sad ? 'worry' : 'up', look: sad ? [.6, .5] : [look, 0], y: hop(t, ts, 26), L: sad ? [9, -14] : [40, -40], R: sad ? [9, -14] : [40, -40], hL: 'open', hR: 'open', lean: sad ? 2 : 0 });
  }
});

// ================= S5a: on the phone — an Anokhi Reet post =================
addScene('c16', 'c17', {
  svg: rentalShopBG('s9', { noMirror: true }) + `<rect width="${W}" height="${H}" fill="${C.cream}" opacity=".75"/>` + rosettes('s9-r', 540, 820, .12, C.goldTan) +
    `<g data-t="c16" data-k="rise" data-d=".45">${phoneSVG('ph9', 540, 820, 560, 1000, arPostScreen('Rental shop hai?', 'Apne outfits online laao.'))}</g>`,
  cam: [1, 1.05], fy: 820,
  upd(t) { tf($('s9-r'), 540, 820, 1, t * 6); }
});

// ================= S5b: customers find outfits by city, occasion and budget =================
addScene('c17', 'c20', {
  svg: `<rect width="${W}" height="${H}" fill="${C.cream}"/>` + rosettes('s10-r', 540, 820, .12, C.goldTan) + phoneSVG('ph10', 540, 820, 560, 1000, arBrowseScreen()),
  cam: [1, 1.06], fy: 760,
  init() { this.k = [0, 1, 2, 3].map(i => $('arb-k' + i)); },
  upd(t) {
    tf($('s10-r'), 540, 820, 1, t * 6);
    const on = [T('c18') + .08, T('c18') + .38, T('c18') + 1.09];
    on.forEach((t0, i) => { const k = clamp((t - t0) / .2); op($(`arb-c${i}-on`), k); op($(`arb-c${i}-t`), k); });
    [0, 1, 2, 3].forEach(i => { const x = i % 2 ? 125 : -125, y = i < 2 ? -110 : 250, p = pop(t, T('c17') + .15 + i * .15); const el = $('arb-k' + i); el.setAttribute('transform', `translate(${x},${y + (t > T('c19') ? Math.sin(t * 3 + i) * 5 : 0)}) scale(${p.s.toFixed(3)})`); op(el, p.o); });
  }
});

// ================= S5c: Pankaj bhai thinks… a lightbulb =================
addScene('c20', 'c22', {
  svg: rentalShopBG('s11', { noMirror: true }) + bust('pk11', PK, 540, FLOOR + 140, 1.1) + counterSVG() +
    `<g transform="translate(540,560)"><g data-t="c21+0.1" data-k="drop">${bulbSVG(72)}</g></g>`,
  html: pillH(540, 360, 'c21+0.5', 'Sapna <span class="hl">sach</span> ho sakta hai? 💡'),
  cam: [1, 1.05], fy: 800,
  upd(t) {
    const idea = t > T('c21') + .1;
    if (!idea) life('pk11', t, { pivot: 0, mouth: 'flat', brows: 'sure', look: [.5, -.8], tilt: -6, R: [-73, -110], hR: 'fist', L: CLASP });
    else life('pk11', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, -.9], y: hop(t, T('c21') + .15, 22), L: [150, -10], R: [150, -10], hL: 'open', hR: 'open' });
  }
});

// ================= S6a: photos + rent price on WhatsApp… shop online =================
addScene('c22', 'c24', {
  svg: rentalShopBG('s12', { noMirror: true }) +
    `<g transform="translate(270,860)"><path d="M0,-150 V-110" stroke="${OL}" stroke-width="6"/>${lehengaHangerSVG('s12-l', { c: '#C0262D', d: '#97151B', dupatta: '#F2A08F' }, 1.05)}</g>` +
    bust('pk12', PK, 770, FLOOR + 150, 1.0) + counterSVG() +
    `<g id="s12-ph"><rect x="-56" y="-96" width="112" height="192" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/><rect x="-46" y="-84" width="92" height="168" rx="10" fill="${C.cream}"/><circle cx="0" cy="0" r="26" fill="${C.emerald}"/><path d="M-10,-2 l8,8 l14,-16" stroke="#fff" stroke-width="6" fill="none"/></g>` +
    `<circle id="s12-fl" cx="270" cy="900" r="320" fill="#FFFFFF" opacity="0"/>` +
    [0, 1, 2].map(i => `<g id="s12-p${i}"><rect x="-56" y="-70" width="112" height="140" rx="10" fill="#fff" stroke="${OL}" stroke-width="4"/><g transform="translate(0,-6)">${lehengaHangerSVG('s12-pl' + i, [RED, { c: C.emerald, d: C.emeraldDark, p: '#A6D3B0' }, { c: C.pink, d: C.pinkDark, p: '#F4B9C8' }][i], .25)}</g></g>`).join('') +
    `<g transform="translate(330,1000)"><g data-t="c22+1.5" data-swing="10">${priceTagSVG('s12-tag', 'Rent price', 0, 0, { fs: 30 })}</g></g>` +
    checkBadge(960, 600, 'c23+0.5', 50),
  html: `<div class="pill" style="left:540px;top:300px" data-t="c22+0.05"><span class="step">1</span>💬 Message</div>` +
    `<div class="pill" style="left:540px;top:390px" data-t="c22+0.6"><span class="step">2</span>📸 Photos + <span class="hl">rent price</span></div>` +
    `<div class="pill green" style="left:540px;top:480px" data-t="c23+0.4"><span class="step">3</span>✅ Shop <span class="hl">live</span></div>`,
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const { hl, hr } = life('pk12', t, { pivot: 0, nod: 6, look: [-.4, .5], mouth: t > T('c23') ? 'grin' : 'smile', brows: 'up', L: [6, -112], R: [6, -112], hL: 'fist', hR: 'fist' });
    const p = toScene('pk12', [(hl[0] + hr[0]) / 2, (hl[1] + hr[1]) / 2 - 40]);
    tf($('s12-ph'), p[0], p[1], 1, -8);
    const tf0 = T('c22') + .64; op($('s12-fl'), t > tf0 && t < tf0 + .25 ? 1 - (t - tf0) / .25 : 0);
    [0, 1, 2].forEach(i => {
      const k = E.io(clamp((t - tf0 - .2 - i * .25) / .6)), tx = 780 + (i - 1) * 130, ty = 640;
      tf($('s12-p' + i), lerp(p[0] + 90, tx, k), lerp(p[1], ty, k) - Math.sin(k * Math.PI) * 60, lerp(.3, 1, k), (i - 1) * 6 * k); op($('s12-p' + i), k > 0 ? 1 : 0);
    });
  }
});

// ================= S6b: shuru karna bilkul aasaan (maroon card, three badges) =================
addScene('c24', 'c25', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s13-r', 540, 820, .14, C.gold) + bust('pk13', PK, 540, FLOOR + 300, 1.0) + counterSVG(FLOOR + 240, '#5D0000'),
  html: `<div class="title" style="top:430px">Shuru karna<br><span class="g">bilkul AASAAN</span> ✅</div>` +
    pillH(540, 640, 'c24+0.2', '💬 WhatsApp se shuru', 'gold') + pillH(540, 750, 'c24+0.45', '📍 Apni city ke customers', 'gold') + pillH(540, 860, 'c24+0.7', '✨ Aasaan setup', 'gold'),
  noWm: true, tin: .3, trans: 'zoom', cam: [1, 1.03],
  upd(t) { tf($('s13-r'), 540, 820, 1, t * 6); life('pk13', t, { pivot: 0, mouth: 'grin', brows: 'up', L: CLASP, R: CLASP, y: hop(t, T('c24') + .7, 14) }); }
});

// ================= S7a reality: a real customer walks in, phone in hand =================
addScene('c25', 'c27', {
  svg: rentalShopBG('s14', { noMirror: true }) + bust('pk14', PK, 540, 1090, .82) + midCounter() +
    `<g id="s14-mv">${stand('cu14', CW, 0, 0, .66)}</g>` + heldPhone('s14-ph', RED, 1),
  html: pillH(540, 400, 'c26+0.1', 'Sapna → <span class="hl">Sach</span> ✨'),
  cam: [1, 1.04], fy: 900,
  upd(t) {
    const [x, y] = glide(t, T('c25') + .1, 1.6, 1260, 860);
    tf($('s14-mv'), x, 1030 + y, 1);
    PL.cu14 = { x, y: 1030 + y, sc: .66 };
    const { hr } = life('cu14', t, { mouth: 'smile', look: [-.7, 0], R: [128, -36], hR: 'open', seed: 3 });
    const p = toScene('cu14', hr); tf($('s14-ph'), p[0], p[1] - 66, .9);
    const seen = t > T('c26');
    life('pk14', t, { pivot: 0, mouth: seen ? 'grin' : 'o', brows: 'up', look: [.8, 0], y: hop(t, T('c26') + .2, 14), L: CLASP, R: seen ? [80, -10] : CLASP, hR: 'open' });
  }
});

// ================= S7b reality: "Mujhe ye lehenga chahiye!" more customers follow =================
addScene('c27', 'c29', {
  svg: rentalShopBG('s15', { noMirror: true }) +
    `<g data-t="c28" data-k="rise">${bust('cu15b', GUEST_W2, 900, FLOOR + 160, .75)}</g><g data-t="c28+0.3" data-k="rise">${bust('cu15c', GUEST_W1, 160, FLOOR + 160, .75)}</g>` +
    bust('pk15', PK, 330, FLOOR + 140, 1.0) + bust('cu15', CUSTOMER_W, 760, FLOOR + 130, .98) + counterSVG(FLOOR + 60) + heldPhone('s15-ph', RED, 1.3),
  html: `<div class="bubble" style="left:680px;top:450px;width:640px" data-t="c27+0.05">"Mujhe <span class="hl">ye lehenga</span> chahiye!"</div>`,
  cam: [1, 1.05], fy: 880,
  upd(t) {
    const { hl } = life('cu15', t, { mouth: t < T('c28') ? talkMouth(t, true) : 'big', brows: 'up', look: [-.7, 0], L: [125, -30], hL: 'open', R: [9, -14], seed: 5 });
    const p = toScene('cu15', hl); tf($('s15-ph'), p[0] + 10, p[1] - 80, .85, -10);
    life('pk15', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [.8, -.2], nod: Math.max(0, Math.sin((t - T('c27')) * 5)) * 8, L: [9, -14], R: [70, -6], hR: 'point' });
    life('cu15b', t, { mouth: 'big', look: [-.5, 0], L: [120, -40], hL: 'open', seed: 6 });
    life('cu15c', t, { mouth: 'big', look: [.5, 0], R: [120, -40], hR: 'open', seed: 7 });
  }
});

// ================= S7c reality: he writes the booking, the register fills =================
addScene('c29', 'c30', {
  svg: `<rect width="${W}" height="${H}" fill="${C.woodLight}"/>` + [...Array(9)].map((_, i) => `<path d="M0,${200 + i * 200} H${W}" stroke="${C.wood}" stroke-width="6" opacity=".5"/>`).join('') +
    `<g transform="translate(540,860) scale(1.45)">${registerSVG('rg16')}</g><g id="s16-pen">${penSVG()}</g>`,
  html: pillH(540, 400, 'c29+0.1', 'Register <span class="hl">bharne laga</span> 📒'),
  cam: [1.04, 1], fy: 860,
  upd(t) {
    const t0 = T('c29') + .1, gap = .28; registerFill('rg16', t, t0, gap);
    const i = clamp(Math.floor((t - t0) / gap), 0, 5), side = i < 3 ? -1 : 1, j = i % 3, f = ((t - t0) / gap) % 1;
    tf($('s16-pen'), 540 + (side < 0 ? -270 + f * 160 : 40 + f * 160) * 1.45, 860 + (-100 + j * 96) * 1.45 - 10 + Math.sin(t * 30) * 6, 1.2);
  }
});

// ================= S8a: "Aapka season ka sapna kya hai? Use sach karo." =================
addScene('c30', 'c32', {
  svg: rentalShopBG('s17', { noMirror: true }) + stand('cu17a', W1, 190, 860, .48) + stand('cu17b', W2, 890, 860, .48) +
    bust('pk17', PK, 540, FLOOR + 170, 1.15) + counterSVG(FLOOR + 40),
  html: `<div class="title" style="top:420px" data-t="c31">Apna season ka sapna<br><span class="g">SACH karo</span> ✨</div>`,
  cam: [1, 1.06], fy: 860,
  upd(t) {
    const ask = t < T('c31');
    life('pk17', t, { pivot: 0, speak: false, mouth: ask ? 'big' : 'grin', brows: ask ? 'up' : 'sure', tilt: ask ? 5 : 0, R: ask ? [70, -6] : CLASP, hR: ask ? 'point' : 'fist', L: CLASP, y: hop(t, T('c31') + .1, 14) });
    life('cu17a', t, { mouth: 'smile', look: [.7, 0], R: [128, -36], hR: 'open', seed: 2 });
    life('cu17b', t, { mouth: 'smile', look: [-.7, 0], L: [128, -36], hL: 'open', seed: 4 });
  }
});

// ================= S8b: end card — Comment LIST =================
addScene('c32', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s18-r', 540, 760, .16, C.gold) + bust('pk18', PK, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s18-wm" style="position:absolute;left:240px;top:330px;width:600px" src="">` +
    `<div class="title" style="top:640px">Comment <span class="g">"LIST"</span> 👇</div>` +
    pillH(540, 800, 'c32+0.4', 'anokhireet.in', 'gold big'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const im = $('s18-wm'); if (im) im.src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) { tf($('s18-r'), 540, 760, 1, t * 5); const w = clamp((t - T('c32') - .2) / .35); life('pk18', t, { pivot: 0, mouth: 'grin', brows: 'up', R: [lerp(9, WAVE(t, T('c32'))[0], E.io(w)), lerp(-14, WAVE(t, T('c32'))[1], E.io(w))], hR: 'open', L: [9, -14], tilt: 4 }); }
});
