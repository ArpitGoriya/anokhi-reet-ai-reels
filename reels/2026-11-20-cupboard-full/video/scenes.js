// ===== Cupboard full, pehenne ko kuch nahi (Kavya) =====
// Curiosity: an open loop ("mummy bhi chup"), the trick kept secret ("? ? ?" app header) until the reveal, Mummy's payoff.
const at = (x, y, inner, sc = 1, r = 0) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})">${inner}</g>`;
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const ROOM = { noWindow: true, noShelf: true, noClock: true };
const KP = dress(KAVYA, { top: '#F6B49A', topD: '#E0927A', pallu: '#F8D8C8', necklace: true, skirt: { c: '#F6A98E', d: '#E08A6F', b: C.gold, w: 205 } }); // the peach look
const PEACH = { c: '#F6A98E', d: '#E08A6F', b: C.gold, dupatta: '#F8D8C8' };
const openDoors = (id, k) => { tf($(`${id}-dL`), 0, 0, lerp(1, .13, k), 0, -150, 0, 1); tf($(`${id}-dR`), 0, 0, lerp(1, .13, k), 0, 150, 0, 1); };
const fx = (x, y, at_, txt, r = -8, out = '') => `<div class="pill" style="left:${x}px;top:${y}px;font-size:34px;padding:6px 18px;transform:translate(-50%,-50%) rotate(${r}deg);background:${C.gold}" data-t="${at_}"${out ? ` data-out="${out}"` : ''}>${txt}</div>`;
const doorSVG = (x) => `<rect x="${x - 150}" y="380" width="300" height="${FLOOR - 340}" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/><rect x="${x - 120}" y="410" width="240" height="${FLOOR - 400}" fill="#E9D3B8" stroke="${OL}" stroke-width="4"/>`;

// ================= S1 hook: the cupboard bursts open — "pehenne ko kuch nahi?" =================
addScene(0, 'c3', {
  svg: homeBG('k1', ROOM) + `<circle cx="680" cy="840" r="440" fill="url(#glow)"/>` + almirahSVG('a1', 700, FLOOR + 62, 1.15) +
    [0, 1, 2].map(i => `<g id="k1f${i}">${kurtiSVG(...CLOTH_COLS[i + 1], .5)}</g>`).join('') + stand('kv1', KAVYA, 290, 960, .78),
  html: `<div class="title" style="top:352px;font-size:86px" data-t="-1">Pehenne ko<br><span class="g">kuch nahi</span> 😩</div>` + fx(820, 1150, '0.95', 'THUD!', 8, 'c2+0.4'),
  init() { $('a1-inside').innerHTML = stuffedInside(); },
  cam: [1, 1.04], fy: 900,
  upd(t) {
    openDoors('a1', E.back(clamp((t - .15) / .35)));
    [0, 1, 2].forEach(i => { const k = clamp((t - .35 - i * .12) / .55), x = 640 + i * 70 + k * (60 + i * 50), y = lerp(620 + i * 60, FLOOR - 10, E.in(k)); tf($('k1f' + i), x, y, 1, k * (90 + i * 50)); op($('k1f' + i), t > .3 ? 1 : 0); });
    life('kv1', t, { mouth: t > T('c2') ? talkMouth(t, true) : 'o', brows: 'worry', look: [.8, -.2], tilt: -5, L: [9, -14], R: t > T('c2') ? THINK : [60, -60], hR: 'open', sweat: t > T('c2') ? .7 : 0 });
  }
});

// ================= S1b open loop: "aakhir mein Kavya ne jo kiya… mummy bhi chup" =================
addScene('c3', 'c5', {
  svg: homeBG('k2', ROOM) + quiet(.35) + `<circle cx="540" cy="860" r="420" fill="url(#glow)"/>` + bust('mm2', MUMMY, 540, FLOOR + 120, 1.05) + counterSVG(FLOOR + 120) +
    `<g transform="translate(540,640)"><g data-t="c4+0.5" data-k="pop"><text text-anchor="middle" font-size="150" y="50">🤐</text></g></g>`,
  html: pillH(540, 352, 'c3', '<span class="hl">Aakhir tak</span> dekho 👀') + pillH(540, 450, 'c4', 'Mummy bhi <span class="hl">chup?!</span> 😮', 'gold'),
  cam: [1, 1.04], fy: 860,
  upd(t) { const z = t > T('c4') + .5; life('mm2', t, { pivot: 0, mouth: z ? 'flat' : talkMouth(t, true), brows: z ? 'up' : 'sure', look: [0, 0], tilt: z ? -5 : 3, R: z ? [9, -14] : [110 + Math.sin(t * 10) * 10, -60], hR: 'point', L: [9, -14] }); }
});

// ================= S2: all worn before — the pile on the bed grows taller than her =================
const LABELS = [['c5+0.3', 'Diwali 2026 🪔'], ['c6+0.3', 'Cousin ki shaadi 💍'], ['c7+0.3', 'Sabne dekh liya 👀'], ['c8+0.3', '📸 Photos ho gaye']];
addScene('c5', 'c9', {
  svg: homeBG('k3', ROOM) + bedSVG(700, FLOOR - 90, 600) + at(730, FLOOR - 150, clothesStackSVG('k3s', 16)) +
    `<g id="k3fly">${kurtiSVG(C.marigold, '#C9821E', .45)}</g>` + stand('kv3', KAVYA, 250, 960, .78),
  html: pillH(540, 352, 'c5', 'Pehna tha • <span class="hl">Pehna tha</span> • Pehna tha 😫') +
    LABELS.map(([a, txt], i) => `<div class="pill" style="left:${[760, 690, 790, 700][i]}px;top:${[700, 600, 500, 430][i] + 40}px;font-size:32px;padding:6px 18px" data-t="${a}">${txt}</div>`).join(''),
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const tosses = [T('c5'), T('c6'), T('c7'), T('c8')];
    let last = -1; tosses.forEach((t0, i) => { if (t > t0) last = i; });
    for (let k = 0; k < 16; k++) { const n = clamp((t - T('c5')) / (T('c9') - T('c5'))) * 14; op($(`k3s-i${k}`), k < 3 + n ? 1 : 0); }
    if (last >= 0) { const k = clamp((t - tosses[last]) / .45); tf($('k3fly'), lerp(330, 730, k), lerp(760, 600 - last * 80, k) - Math.sin(k * Math.PI) * 220, 1, k * 300); op($('k3fly'), k < 1 ? 1 : 0); } else op($('k3fly'), 0);
    const sw = last >= 0 ? clamp((t - tosses[last]) / .3) : 0;
    life('kv3', t, { mouth: talkMouth(t, true), brows: 'worry', look: [.8, -.2], tilt: -3, R: [lerp(40, 150, Math.sin(sw * Math.PI)), -40], hR: 'open', L: [9, -14] });
  }
});

// ================= S3: Mummy's dialogue — Kavya flops onto the pile =================
addScene('c9', 'c11', {
  svg: homeBG('k4', ROOM) + doorSVG(180) + bedSVG(700, FLOOR - 90, 600) + at(730, FLOOR - 150, clothesStackSVG('k4s', 16)) +
    stand('mm4', MUMMY, 190, 960, .78) + `<g id="k4kv">${stand('kv4', KAVYA, 0, 0, .7)}</g>`,
  html: `<div class="bubble" style="left:440px;top:470px;width:680px;font-size:34px" data-t="c9+0.2" data-out="c10+1.2">"Itne saare kapde hain, phir bhi bolti rehti hai ke <span class="hl">pehenne ko kuch nahi</span> hai!" 🙄</div>` +
    pillH(540, 352, 'c10', '"Itne kapde hain, <span class="hl">phir bhi?</span>" 😂') + fx(760, 820, 'c10+0.6', 'BOING!', -10),
  init() { for (let k = 0; k < 16; k++) op($(`k4s-i${k}`), 1); },
  cam: [1, 1.03], fy: 860,
  upd(t) {
    life('mm4', t, { pivot: 0, mouth: t < T('c10') + 1.2 ? talkMouth(t, true) : 'flat', brows: 'sure', look: [.8, 0], tilt: 6, R: [110 + Math.sin(t * 9) * 12, -40], hR: 'open', L: [9, -14] });
    const f = E.in(clamp((t - T('c10') - .2) / .45)), b = t > T('c10') + .65 ? Math.sin(clamp((t - T('c10') - .65) / .4) * Math.PI) * 30 : 0;
    tf($('k4kv'), lerp(560, 700, f), lerp(960, 900, f) - b, 1, lerp(0, -80, f)); PL['kv4'].x = lerp(560, 700, f);
    life('kv4', t, { mouth: f > .5 ? 'sad' : 'o', brows: 'worry', look: [-.8, 0], closed: f > .9, R: f > .3 ? [150, 20] : [9, -14], L: f > .3 ? [150, 20] : [9, -14], hR: 'open', hL: 'open' });
  }
});

// ================= S4: buy again? — ₹15,000 (Udaharan) … and into the same cupboard =================
addScene('c11', 'c14', {
  svg: homeBG('k5', ROOM) + almirahSVG('a5', 820, FLOOR + 62, .85) + bust('kv5', KAVYA, 330, FLOOR + 120, 1.0) + counterSVG(FLOOR + 120) +
    `<g id="k5new">${lehengaHangerSVG('k5l', { c: C.red, d: C.redDark, dupatta: '#F2A08F' }, .7)}</g>` +
    `<g id="k5tag">${priceTagSVG('k5t', '₹15,000', 0, 0, { fs: 46 })}</g>`,
  html: `<div class="bubble" style="left:380px;top:560px" data-t="c11" data-out="c13-0.1">💭 Naya <span class="hl">kharidun?</span></div>` +
    pillH(540, 352, 'c12', 'Phir se <span class="hl">₹15,000?</span> 💸') + pillH(540, 440, 'c12+0.2', 'Udaharan 📝', 'gold'),
  init() { $('a5-inside').innerHTML = stuffedInside(); tf($('a5-dL'), 0, 0, .13, 0, -150, 0, 1); tf($('a5-dR'), 0, 0, .13, 0, 150, 0, 1); },
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const up = P(t, T('c12') + .1, .5, E.back); tf($('k5tag'), 560, lerp(900, 560, up), 1, -8); op($('k5tag'), up > .02 ? 1 : 0);
    const fly = E.io(clamp((t - T('c13') - .6) / .8));
    tf($('k5new'), lerp(560, 820, fly), lerp(760, 560, fly) - Math.sin(fly * Math.PI) * 140, lerp(1, .5, fly), fly * 20); op($('k5new'), t > T('c11') + .3 && fly < 1 ? 1 : 0);
    const ouch = t > T('c12') + .5;
    life('kv5', t, { pivot: 0, mouth: ouch ? 'worry' : 'smile', brows: ouch ? 'worry' : 'up', sweat: ouch ? 1 : 0, look: [.7, -.4], R: t < T('c12') ? THINK : [9, -14], hR: 'point', L: [9, -14], tilt: ouch ? -6 : 4 });
  }
});

// ================= S5: a trick — no buying, no borrowing =================
addScene('c14', 'c16', {
  svg: homeBG('k6', ROOM) + quiet(.4) + `<g transform="translate(540,620)"><g data-t="c14+0.1" data-k="pop">${ideaBulbSVG()}</g></g>` +
    `<g transform="translate(330,960)"><g data-t="c15+0.1" data-k="pop"><circle r="110" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><g transform="scale(.55) translate(0,40)">${bagSVG()}</g><g transform="translate(0,0)"><g data-t="c15+0.5">${crossSVG(80)}</g></g></g></g>` +
    `<g transform="translate(750,960)"><g data-t="c15+0.9" data-k="pop"><circle r="110" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><text y="40" text-anchor="middle" font-size="110">🤲</text><g data-t="c15+1.4">${crossSVG(80)}</g></g></g>`,
  html: pillH(540, 352, 'c14', 'Ek <span class="hl">tareeka</span>… 💡', '', 'c15-0.05') + pillH(540, 352, 'c15', 'Toh <span class="hl">kya kiya?</span> 🤔') +
    pillH(330, 1110, 'c15+0.3', 'Kharidna ❌', '', '') + pillH(750, 1110, 'c15+1.2', 'Maangna ❌'),
  cam: [1, 1.03], fy: 820
});

// ================= S6: the phone — "? ? ?" app; city, occasion, budget; picks the peach lehenga; Booked =================
addScene('c16', 'c19', {
  svg: homeBG('k7', ROOM) + quiet(.5) + `<circle cx="660" cy="820" r="440" fill="url(#glow)" opacity=".8"/>` + bust('kv7', KAVYA, 220, FLOOR + 220, .95) + counterSVG(FLOOR + 150) +
    `<g id="k7ph"><g transform="scale(.72)">${phoneSVG('k7p', 0, 0, 560, 1000, arPickScreen('k7s', { mystery: true }))}</g></g>`,
  html: pillH(540, 352, 'c16', '<span class="hl">? ? ?</span> 📱'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const up = P(t, T('c16') + .1, .5, E.out); tf($('k7ph'), 660, lerp(1350, 800, up), 1, lerp(8, 0, up)); op($('k7ph'), up);
    [0, 1, 2].forEach(i => chipOnAR('k7s', i, P(t, T('c17') + i * .55, .2)));
    [0, 1, 2, 3].forEach(i => op($(`k7s-r${i}`), P(t, T('c17') + 1.6 + i * .1, .2)));
    op($('k7s-sel'), P(t, T('c18') + .2, .2)); op($('k7s-bk'), P(t, T('c18') + 1.0, .2)); tf($('k7s-bk'), 0, 0, 1 + Math.max(0, .2 - Math.abs(t - T('c18') - 1.1)));
    life('kv7', t, { pivot: 0, mouth: t > T('c18') + 1 ? 'grin' : 'smile', brows: 'up', look: [.8, -.2], R: [100, -30], hR: 'point', L: [9, -14], y: hop(t, T('c18') + 1.05, 12) });
  }
});

// ================= S7: the reveal — "tareeka tha… Anokhi Reet!" =================
addScene('c19', 'c21', {
  svg: homeBG('k8', ROOM) + quiet(.5) + `<circle id="k8g" cx="540" cy="820" r="520" fill="url(#glow)"/>` +
    `<g id="k8ph"><g transform="scale(.8)">${phoneSVG('k8p', 0, 0, 560, 1000, arPickScreen('k8s', { mystery: true }))}</g></g>` +
    [[260, 560], [820, 600], [240, 1060], [840, 1080], [540, 440]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c19+${(.7 + i * .07).toFixed(2)}" data-out="c20+1.2">${sparkleSVG(32, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c19', 'Tareeka tha… <span class="hl">?</span>', '', 'c19+0.65') + pillH(540, 352, 'c19+0.7', '<span class="hl">Anokhi Reet</span> ✨', 'big', 'c20-0.05') +
    pillH(540, 352, 'c20', 'Naya look, <span class="hl">bina kharide</span> ✨'),
  init() { [0, 1, 2].forEach(i => chipOnAR('k8s', i, 1)); [0, 1, 2, 3].forEach(i => op($(`k8s-r${i}`), 1)); op($('k8s-sel'), 1); op($('k8s-bk'), 1); },
  cam: [1, 1.04], fy: 820,
  upd(t) {
    const rv = P(t, T('c19') + .55, .25, E.io); op($('k8s-real'), rv);
    tf($('k8ph'), 540, 820 + Math.sin(t * 2) * 6, 1 + Math.sin(clamp((t - T('c19') - .55) / .35) * Math.PI) * .06, 0);
    op($('k8g'), .6 + rv * .4);
  }
});

// ================= S8a: the function — brand-new look, twirling =================
addScene('c21', 'c22', {
  svg: weddingBG({}) + torSVG(300) + fairyLightsSVG(420) + `<circle cx="540" cy="860" r="420" fill="url(#glow)"/>` + `<g id="k9kv">${stand('kv9', KP, 0, 0, .82)}</g>` +
    [[300, 640], [800, 700], [360, 1000], [760, 980]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c21+${(.3 + i * .15).toFixed(2)}" data-bob="6" data-ph="${i}">${sparkleSVG(28, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c21', 'Naya look ✅'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const tw = clamp((t - T('c21') - .2) / .9), sx = Math.cos(tw * Math.PI * 2);
    tf($('k9kv'), 540, 930, 1, 0); $('k9kv').setAttribute('transform', `translate(540,930) scale(${(.75 + .25 * Math.abs(sx)) * Math.sign(sx || 1)},1)`);
    life('kv9', t, { mouth: 'grin', brows: 'up', look: [0, 0], tilt: 4, R: [120, -40], hR: 'open', L: [120, -40], hL: 'open' });
  }
});

// ================= S8b: at home the cupboard closes neatly — nothing new added; money saved =================
addScene('c22', 'c23', {
  svg: homeBG('k10', ROOM) + `<circle cx="540" cy="860" r="440" fill="url(#glow)"/>` + almirahSVG('a10', 540, FLOOR + 62, 1.15),
  html: pillH(540, 352, 'c22', 'Paise bhi <span class="hl">bach gaye</span> ✅') + fx(720, 760, 'c22+0.9', 'CLICK ✓', 8),
  init() { $('a10-inside').innerHTML = stuffedInside(); },
  cam: [1, 1.04], fy: 900,
  upd(t) { openDoors('a10', 1 - E.io(clamp((t - T('c22') - .3) / .5))); }
});

// ================= S9 payoff: Mummy — "Ye kahan se laayi?" =================
addScene('c23', 'c26', {
  svg: homeBG('k11', ROOM) + doorSVG(180) + stand('mm11', MUMMY, 230, 960, .78) + stand('kv11', KP, 700, 960, .78) +
    [[560, 620], [880, 700]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c24+${(.2 + i * .2).toFixed(1)}" data-bob="6" data-ph="${i}">${sparkleSVG(26, C.gold)}</g></g>`).join(''),
  html: pillH(540, 352, 'c23', 'Aur <span class="hl">mummy?</span> 👀', '', 'c25-0.05') + pillH(540, 352, 'c25', 'Mummy bhi <span class="hl">chup</span> 😄') +
    `<div class="bubble" style="left:330px;top:450px" data-t="c25">"Ye <span class="hl">kahan se laayi?</span>" 😍</div>`,
  cam: [1, 1.03], fy: 860,
  upd(t) {
    const wow = t > T('c24'), ask = t > T('c25');
    life('mm11', t, { pivot: 0, mouth: ask ? talkMouth(t, true) : (wow ? 'o' : 'flat'), brows: wow ? 'up' : 'norm', look: [.8, 0], tilt: wow ? 6 : 0, R: ask ? [100, -50] : [9, -14], hR: 'open', L: [9, -14], y: hop(t, T('c24') + .1, 14) });
    life('kv11', t, { mouth: 'grin', brows: 'sure', look: [-.7, 0], tilt: -4, R: [9, -14], L: ask ? [120, -40] : [9, -14], hL: 'open', sway: 2 });
  }
});

// ================= S10: "Cupboard full hai? Koi baat nahi." =================
addScene('c26', 'c28', {
  svg: homeBG('k12', ROOM) + quiet(.35) + `<circle cx="540" cy="900" r="460" fill="url(#glow)"/>` + bust('kv12', KP, 540, FLOOR + 300, 1.2) + counterSVG(FLOOR + 170) + handPhone('k12ph', PEACH, 1.2),
  html: `<div class="title" style="top:380px;font-size:76px" data-t="c26">Cupboard full?<br><span class="g">Koi baat nahi</span> 😉</div>` +
    pillH(540, 600, 'c27', 'Naya look, <span class="hl">bina naya kharide</span> ✨'),
  cam: [1, 1.04], fy: 860,
  upd(t) {
    const A = life('kv12', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'sure', tilt: 4, look: [0, 0], R: [110, -60], hR: 'fist', L: [9, -14] });
    atHand('k12ph', 'kv12', A.hr, 0, -90, 6);
  }
});

// ================= S11 end card: Download Anokhi Reet =================
addScene('c28', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('k13r', 540, 760, .16, C.gold) + bust('kv13', KP, 540, FLOOR + 330, .95) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="k13wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:520px;font-size:72px" data-t="c28" data-out="c29-0.05">Functions ke liye<br><span class="g">rent pe outfits?</span> 👗</div>` +
    `<div class="title" style="top:520px;font-size:84px" data-t="c29">Download<br><span class="g">Anokhi Reet</span> 👇</div>` +
    `<div style="position:absolute;left:540px;top:730px;transform:translate(-50%,-50%);font-weight:700;font-size:34px;color:#FFF2DF">Naya look, bina naya kharide</div>` +
    `<div style="position:absolute;left:540px;top:810px;transform:translate(-50%,-50%);display:flex;gap:24px" data-t="c29+0.3"><img id="k13as" style="height:92px" src=""><img id="k13gp" style="height:92px" src=""></div>` +
    pillH(540, 925, 'c29+0.45', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const b = SEAL(); [['k13wm', 'logo-text.svg'], ['k13as', 'app-store-badge.svg'], ['k13gp', 'google-play-badge.svg']].forEach(([id, f]) => { const im = $(id); if (im) im.src = b.replace('seal-on-maroon.svg', f); }); },
  upd(t) {
    tf($('k13r'), 540, 760, 1, t * 5);
    life('kv13', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], R: t > T('c29') + .3 ? WAVE(t, T('c29') + .3) : [9, -14], hR: 'open', L: [9, -14] });
  }
});
