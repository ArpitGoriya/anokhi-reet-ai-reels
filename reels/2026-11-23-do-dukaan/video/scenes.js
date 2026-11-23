// ===== Do dukaan, do kahaniyan: same market, same outfits — one shop full, one empty. Why? =====
// Open loops: "Aisa kyun?", Kiranben's clue, the customer who already knows; the app name stays "? ? ?" until scene 9.
const quiet = (o = .45) => `<rect width="${W}" height="${H}" fill="${C.cream}" opacity="${o}"/>`;
const MH = MAHESH, KR = KIRAN;
const SKIRTS = [{ c: '#3A6AA3', d: '#2C5283', b: C.gold, w: 190 }, { c: '#2E8B57', d: '#1F6B42', b: C.gold, w: 190 }, { c: '#7A1B2A', d: '#5E1420', b: C.gold, w: 190 }];
const CUS = [dress(CUSTOMER_W, { skirt: SKIRTS[2] }), dress(GUEST_W1, { skirt: SKIRTS[0] }), dress(GUEST_W2, { skirt: SKIRTS[1] }), dress(GUEST_M, { pants: {} })];
const STREET = id => twoShopsBG(id, { left: { sign: 'MAHESH RENTALS', tag: 'Rent', tagCol: '#FFFFFF', tagTxt: C.red }, right: { sign: 'KIRAN RENTALS', tag: 'Rent', tagCol: '#FFFFFF', tagTxt: C.red } }) +
  `<g transform="translate(105,655)">${sherwaniHangerSVG('', '#E8D3A5', '#C9AE6A', .5)}</g><g transform="translate(975,655)">${sherwaniHangerSVG('', '#2F5E8C', '#22476B', .5)}</g>`;
const UDA = (x = 540, y = 440, at = '-1') => pillH(x, y, at, 'Udaharan 📝', 'gold');
const OWN_Y = FLOOR - 110, OWN_S = .66;
const feet = sc => FLOOR + 50 - 372 * sc;   // stand() y for feet on the pavement
const clockPill = (at, out = '') => `<div class="pill" style="left:540px;top:352px;font-size:44px;background:#fff" data-t="${at}"${out ? ` data-out="${out}"` : ''}>⏰ <b>9:55</b> am</div>`;

// ================= S1 hook: one market, two rental shops — Maheshbhai and Kiranben =================
addScene(0, 'c4', {
  svg: STREET('s1') + bust('s1m', MH, 270, OWN_Y, OWN_S) + bust('s1k', KR, 810, OWN_Y, OWN_S) + twoShopsFront('s1'),
  html: `<div class="title" style="top:300px;font-size:62px" data-t="-1">Do dukaan, <span class="g">do kahaniyan</span> 🏬🏬</div>` +
    pillH(270, 1110, 'c2', 'Maheshbhai 👋', 'gold') + pillH(740, 1110, 'c3', 'Kiranben 👋', 'gold'),
  cam: [1, 1.03], fy: 800,
  upd(t) {
    const m = t > T('c2') - .2, k = t > T('c3') - .2;
    life('s1m', t, { pivot: 0, mouth: m && t < T('c3') ? 'big' : 'smile', brows: 'up', look: [0, 0], R: m ? WAVE(t, T('c2')) : [9, -14], hR: 'open', L: [9, -14], tilt: 4, seed: 1 });
    life('s1k', t, { pivot: 0, mouth: k ? 'big' : 'smile', brows: 'up', look: [0, 0], L: k ? [WAVE(t, T('c3'))[0], WAVE(t, T('c3'))[1]] : [9, -14], hL: 'open', R: [9, -14], tilt: -4, seed: 2 });
  }
});

// ================= S2 same outfits, same price range, same effort: "=" =================
addScene('c4', 'c6', {
  svg: STREET('s2') + bust('s2m', MH, 270, OWN_Y, OWN_S) + bust('s2k', KR, 810, OWN_Y, OWN_S) + twoShopsFront('s2') +
    [[270, 640], [810, 640], [120, 700], [960, 700]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c4+${(.1 + i * .1).toFixed(1)}" data-k="pop" data-bob="5" data-ph="${i}">${sparkleSVG(28, C.gold)}</g></g>`).join('') +
    `<g transform="translate(540,760)"><g data-t="c4+0.4" data-k="pop"><circle r="80" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/><path d="M-40,-18 H40 M-40,18 H40" stroke="${OL}" stroke-width="14" stroke-linecap="round"/></g></g>`,
  html: pillH(540, 352, 'c4', 'Same outfits <span class="hl">=</span> Same mehnat'),
  cam: [1, 1.03], fy: 800,
  upd(t) {
    life('s2m', t, { pivot: 0, mouth: 'smile', brows: 'norm', look: [.6, 0], R: [9, -14], L: [9, -14], seed: 1 });
    life('s2k', t, { pivot: 0, mouth: 'smile', brows: 'norm', look: [-.6, 0], R: [9, -14], L: [9, -14], seed: 2 });
  }
});

// ================= S3 wedding season: a crowd at Kiranben's, Maheshbhai's empty — "Aisa kyun?" =================
addScene('c6', 'c10', {
  svg: STREET('s3') + bust('s3m', MH, 270, OWN_Y, OWN_S) + bust('s3k', KR, 810, OWN_Y, OWN_S) + twoShopsFront('s3') + clockSVG('s3clk', 120, 980, 40) +
    `<g id="s3cal"><g transform="scale(.9)">${calendarSVG('s3c', 'WEDDING', '💍')}</g></g>` +
    CUS.map((o, i) => `<g id="s3w${i}">${stand('s3p' + i, o, 0, 0, .5)}</g>`).join('') +
    `<g id="s3dz">${dizzySVG(44)}</g>`,
  html: pillH(540, 352, 'c6', '<span class="hl">Shaadi ka season</span> 💍', '', 'c7-0.05') + pillH(540, 352, 'c7', 'Ek mein <span class="hl">bheed</span> 🙌', '', 'c8-0.05') +
    pillH(540, 352, 'c8', 'Ek <span class="hl">khaali</span> 😐', '', 'c9-0.05') + pillH(540, 352, 'c9', 'Aisa <span class="hl">kyun?</span> 🤔', 'big'),
  cam: [1, 1.03], fy: 800,
  upd(t) {
    const cal = P(t, T('c6'), .4, E.back); tf($('s3cal'), 540, 720, cal * (1 - clamp((t - T('c7') + .2) / .3))); op($('s3cal'), cal);
    CUS.forEach((o, i) => {
      const t0 = T('c7') - .2 + i * .55, g = glide(t, t0, 1.6, -120, 640 + i * 95);
      tf($(`s3w${i}`), g[0], feet(.5) + g[1], 1); PL['s3p' + i].x = g[0]; PL['s3p' + i].y = feet(.5);
      life('s3p' + i, t, { mouth: 'smile', brows: 'up', look: [.8, 0], seed: i + 3 });
    });
    clockTick('s3clk', t * 4, 0);
    const conf = clamp((t - T('c9')) / .6); tf($('s3dz'), 270, 840, .6 + conf * .4, t * 200); op($('s3dz'), conf);
    const lookR = t > T('c8');
    life('s3m', t, { pivot: 0, mouth: lookR ? 'o' : 'flat', brows: 'worry', look: lookR ? [.9, 0] : [0, .3], tilt: lookR ? 6 : 0, R: t > T('c9') ? THINK : [9, -14], hR: 'point', L: [9, -14], seed: 1 });
    life('s3k', t, { pivot: 0, mouth: t > T('c7') ? talkMouth(t, true) : 'smile', brows: 'up', look: [-.6, .2], L: t > T('c7') ? [100 + Math.sin(t * 7) * 15, -50] : [9, -14], hL: 'open', R: [9, -14], seed: 2 });
  }
});

// ================= S4 evening chai: the clue — "Kal subah khud dekh lena" =================
addScene('c10', 'c13', {
  svg: STREET('s4') + twoShopsFront('s4') + evening() + `<g id="s4mw">${stand('s4m', MH, 0, 0, .62)}</g><g id="s4kw">${stand('s4k', KR, 0, 0, .6)}</g>` +
    `<g id="s4c1">${chaiSVG()}</g><g id="s4c2">${chaiSVG()}</g>`,
  html: `<div class="bubble" style="left:300px;top:560px;width:430px;font-size:32px" data-t="c10" data-out="c11">"Kiranben, sach batao… <span class="hl">itne customer kaise?</span>" 🤔</div>` +
    `<div class="bubble" style="left:720px;top:560px;width:560px;font-size:30px" data-t="c11">"Mere customer <span class="hl">dukaan dekhne se pehle hi</span> outfit dekh chuke hote hain… Kal subah 10 baje aana!" 😉</div>` +
    pillH(540, 352, 'c12', '"Kal subah <span class="hl">khud dekh lena</span>" 🤫'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const gone = glide(t, T('c12') + .6, 1.2, 700, 1300);
    tf($('s4mw'), 380, feet(.62), 1); PL['s4m'].x = 380; PL['s4m'].y = feet(.62);
    tf($('s4kw'), gone[0], feet(.6) + gone[1], 1); PL['s4k'].x = gone[0]; PL['s4k'].y = feet(.6);
    const sip = Math.sin(clamp((t - T('c10') - .1) / 1) * Math.PI);
    const A = life('s4m', t, { mouth: t < T('c11') ? talkMouth(t, true) : (t > T('c12') ? 'worry' : 'o'), brows: t > T('c12') ? 'worry' : 'up', look: [.8, 0],
      R: t > T('c12') + .3 ? THINK : [110, -30], hR: t > T('c12') + .3 ? 'point' : 'fist', L: [9, -14], seed: 1 });
    const B = life('s4k', t, { mouth: t > T('c11') && t < T('c12') + .5 ? talkMouth(t, true) : 'smile', brows: 'sure', look: [-.8, 0], tilt: -4,
      L: [100 + sip * 40, -30 - sip * 60], hL: 'fist', R: t > T('c12') ? [9, -14] : [9, -14], seed: 2 });
    if (t < T('c12') + .3) atHand('s4c1', 's4m', A.hr, 0, -30, 0, .7); else op($('s4c1'), 0);
    atHand('s4c2', 's4k', B.hl, 0, -30, 0, .7);
  }
});

// ================= S5 next morning 9:55: shutter half up, a customer already knows everything =================
addScene('c13', 'c16', {
  svg: STREET('s5') + bust('s5m', MH, 270, OWN_Y, OWN_S) + twoShopsFront('s5') + halfShutterSVG(810) +
    `<g id="s5cw">${stand('s5c', CUS[0], 0, 0, .62)}</g>` + `<g id="s5ph">${handPhone('s5hp', 1)}</g>` + `<g id="s5chai">${chaiSVG()}</g>`,
  html: clockPill('c13') +
    `<div class="bubble" style="left:740px;top:600px;width:520px;font-size:31px" data-t="c13+0.3" data-out="c15-0.1">"Kiranben, wo <span class="hl">maroon lehenga… ₹2,000 wala, size M…</span> ready hai na?"</div>` +
    `<div class="bubble" style="left:300px;top:600px;width:440px;font-size:32px" data-t="c15">💭 "Dukaan <span class="hl">khuli bhi nahi…</span> aur ise <span class="hl">sab pata?!</span>" 😲</div>` +
    fx(400, 920, 'c14+0.4', 'Oops! ☕', -10, 'c15'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    tf($('s5cw'), 820, feet(.62), 1); PL['s5c'].x = 820; PL['s5c'].y = feet(.62);
    const C1 = life('s5c', t, { mouth: t > T('c13') + .3 && t < T('c15') ? talkMouth(t, true) : 'smile', brows: 'up', look: [-.3, -.3], R: [150, -80], hR: 'fist', L: [9, -14], seed: 3 });
    atHand('s5ph', 's5c', C1.hr, 0, -70, 0);
    const drop = P(t, T('c14') + .3, .35, E.out);
    const A = life('s5m', t, { pivot: 0, mouth: t > T('c14') + .3 ? 'big' : 'flat', brows: t > T('c14') + .3 ? 'up' : 'norm', look: [.9, 0], tilt: t > T('c15') ? 6 : 0, R: [110, -30], hR: 'fist', L: [9, -14], y: hop(t, T('c14') + .3, 16), seed: 1 });
    atHand('s5chai', 's5m', A.hr, 0, -20, drop * 70, .6);
  }
});

// ================= S6 the registers (Udaharan): 12 → 10 vs 12 → 2 =================
addScene('c16', 'c19', {
  svg: wallSVG(C.cream, '#F5E6C8') + `<rect x="537" y="0" width="6" height="${H}" fill="${OL}" opacity=".3"/>` +
    `<g transform="translate(275,720)">${tallyBoardSVG('s6a', 470, 420)}</g><g transform="translate(805,720)">${tallyBoardSVG('s6b', 470, 420)}</g>` +
    bust('s6k', KR, 275, FLOOR + 160, .7) + bust('s6m', MH, 805, FLOOR + 160, .7) + counterSVG(FLOOR + 170),
  html: UDA(540, 440, 'c16') + pillH(640, 1000, 'c18+0.5', '"Price?" "Sochke batate…" 🙄') +
    pillH(540, 352, 'c16', '12 → <span class="hl">10</span> ✅ vs 12 → <span class="hl">2</span> 😶'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    const L = (id, a) => a.forEach((x, i) => { const el = $(`${id}-l${i}`); if (el) { el.textContent = x; el.setAttribute('font-size', i === 0 ? 40 : 46); } });
    L('s6a', ['Kiranben: kal', t > T('c16') + .4 ? '12 customer' : '', t > T('c17') ? '↓' : '', t > T('c17') + .2 ? '10 booking ✅' : '']);
    L('s6b', ['Maheshbhai: kal', t > T('c16') + .7 ? '12 customer' : '', t > T('c18') ? '↓' : '', t > T('c18') + .2 ? '2 booking 😶' : '']);
    $('s6a-l3').setAttribute('fill', '#1F7A4D'); $('s6b-l3').setAttribute('fill', '#B3261E');
    life('s6k', t, { pivot: 0, mouth: t > T('c17') ? 'grin' : 'smile', brows: 'up', look: [0, -.7], y: hop(t, T('c17') + .2, 12), seed: 2 });
    life('s6m', t, { pivot: 0, mouth: t > T('c18') ? 'sad' : 'flat', brows: 'worry', look: [0, -.7], tilt: t > T('c18') ? -6 : 0, seed: 1 });
  }
});

// ================= S7 Kiranben explains: an online rental marketplace ("? ? ?") — customers come decided =================
addScene('c19', 'c24', {
  svg: shopBG('s7', { sign: 'KIRAN RENTALS' }) + quiet(.45) + bust('s7m', MH, 210, FLOOR + 140, .78) + bust('s7k', KR, 870, FLOOR + 140, .78) + counterSVG(FLOOR + 170) +
    `<g id="s7lh">${lehengaHangerSVG('', { c: '#A3262A', d: '#7A1B2A', dupatta: '#E8C25E' }, .45)}</g>` +
    `<g id="s7ph"><g transform="scale(.42)">${phoneSVG('s7p', 0, 0, 560, 1000, shopPage('s7s', 'Kiran Rentals'))}</g></g>`,
  html: pillH(540, 352, 'c19', 'Raaz? 🤫', '', 'c20-0.05') + pillH(540, 352, 'c20', 'Dukaan… <span class="hl">ONLINE!</span> 📱', '', 'c23-0.05') +
    pillH(540, 352, 'c23', 'Customer aata hai <span class="hl">decide karke</span> ✅') +
    pillH(540, 470, 'c20+0.3', '🏬 → 📱 <b>? ? ?</b>') + pillH(540, 555, 'c22', '👀 outfit · 💰 rent · 📏 size', 'gold') + pillH(540, 640, 'c23+0.2', '🚶‍♀️ → 🏬 ✅'),
  cam: [1, 1.03], fy: 840,
  upd(t) {
    const ph = P(t, T('c20') + .5, .4, E.back); tf($('s7ph'), 540, 920, ph); op($('s7ph'), ph);
    const B = life('s7k', t, { pivot: 0, mouth: talkMouth(t, true), brows: 'sure', look: [-.8, 0], tilt: -3, R: [60 + Math.sin(t * 2) * 20, -70], hR: 'fist', L: [80 + Math.sin(t * 2) * 20, -70], hL: 'fist', seed: 2 });
    atHand('s7lh', 's7k', B.hr, -90, -40, -10);
    life('s7m', t, { pivot: 0, mouth: t > T('c20') ? 'o' : 'flat', brows: 'up', look: [.8, -.1], tilt: 4, R: [9, -14], L: [9, -14], y: hop(t, T('c20') + .1, 10), seed: 1 });
  }
});

// ================= S8 "Bahut mushkil hoga?" — guesses crossed out; "Bas WhatsApp" (brand-safe badges) =================
addScene('c24', 'c27', {
  svg: shopBG('s8', { sign: 'KIRAN RENTALS' }) + quiet(.5) + bust('s8m', MH, 270, FLOOR + 130, .85) + bust('s8k', KR, 860, FLOOR + 140, .75) + counterSVG(FLOOR + 160) +
    `<g transform="translate(330,520)"><g data-t="c24+0.5" data-k="pop" data-out="c26-0.1">${crossThoughtSVG('s8g1', 'Website banani padegi?', 520)}</g></g>` +
    `<g transform="translate(360,690)"><g data-t="c24+1.3" data-k="pop" data-out="c26-0.1">${crossThoughtSVG('s8g2', 'Computer seekhna padega?', 540)}</g></g>`,
  html: pillH(540, 352, 'c24', '<span class="hl">Bahut mushkil</span> hoga? 😟', '', 'c25-0.05') + pillH(540, 352, 'c25', 'Mushkil? ❌ · <span class="hl">Bas WhatsApp</span> ✅') +
    `<div class="bubble" style="left:820px;top:740px;font-size:34px" data-t="c25+0.3" data-out="c26-0.1">"<span class="hl">Bas WhatsApp!</span>" 😊</div>` +
    ['WhatsApp se shuru 💬', 'Apni city ke customers 📍', 'Aasaan setup ✅'].map((b, i) => pillH(540, 500 + i * 90, `c26+${(i * .3).toFixed(1)}`, b, i === 1 ? 'gold' : '')).join(''),
  cam: [1, 1.03], fy: 840,
  upd(t) {
    op($('s8g1-x'), P(t, T('c25') - .1, .2)); op($('s8g2-x'), P(t, T('c25') + .2, .2));
    const ok = t > T('c25') + .3;
    life('s8m', t, { pivot: 0, mouth: ok ? 'big' : 'worry', brows: ok ? 'up' : 'worry', look: ok ? [.8, 0] : [-.2, -.7], tilt: ok ? 4 : -6, R: ok ? [9, -14] : THINK, hR: 'point', L: [9, -14], y: hop(t, T('c26'), 12), seed: 1 });
    life('s8k', t, { pivot: 0, mouth: t > T('c25') + .3 && t < T('c26') ? talkMouth(t, true) : 'smile', brows: 'sure', look: [-.8, 0], L: ok ? [120, -60] : [9, -14], hL: 'open', R: [9, -14], seed: 2 });
  }
});

// ================= S9a the name: "? ? ?" → Anokhi Reet; his shop goes live the same day =================
addScene('c27', 'c30', {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s9ro', 540, 820, .14, C.gold) + `<circle cx="600" cy="820" r="460" fill="url(#glow)" opacity=".6"/>` +
    `<g id="s9ph"><g transform="scale(.74)">${phoneSVG('s9p', 0, 0, 560, 1000, shopPage('s9s', 'Mahesh Rentals', 'c29+0.4'))}</g></g>` +
    [[300, 520], [880, 560], [320, 1100], [900, 1080], [600, 460]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="c28+${(.05 + i * .07).toFixed(2)}" data-k="pop" data-bob="6" data-ph="${i}">${sparkleSVG(34, C.gold)}</g></g>`).join('') +
    bust('s9m', MH, 180, FLOOR + 110, .6),
  html: `<div class="bubble" style="left:330px;top:1060px;width:380px;font-size:30px" data-t="c27" data-out="c28">"Kiranben, us <span class="hl">platform ka naam</span> kya hai?" 🥁</div>` +
    pillH(540, 352, 'c27', 'Platform ka naam? 🥁', '', 'c28-0.05') + pillH(540, 352, 'c28', '<span class="hl">Anokhi Reet</span> ✨', 'big', 'c29-0.05') +
    pillH(540, 352, 'c29', 'Maheshbhai bhi <span class="hl">online</span> ✅'),
  noWm: true, cam: [1, 1.03], fy: 820,
  upd(t) {
    tf($('s9ro'), 540, 820, 1, t * 5);
    tf($('s9ph'), 620, 820, 1 + Math.sin(clamp((t - T('c28')) / .35) * Math.PI) * .06);
    op($('s9s-real'), P(t, T('c28') - .05, .25));
    life('s9m', t, { pivot: 0, mouth: t > T('c28') ? 'big' : talkMouth(t, true), brows: 'up', look: [.6, -.5], R: t > T('c28') ? [150, -100] : [9, -14], hR: 'open', L: [9, -14], y: hop(t, T('c28') + .1, 14), seed: 1 });
  }
});

// ================= S9b next morning: a customer waiting outside Maheshbhai's shop too =================
addScene('c30', 'c32', {
  svg: STREET('s9b') + bust('s9bm', MH, 270, OWN_Y, OWN_S) + bust('s9bk', KR, 810, OWN_Y, OWN_S) + twoShopsFront('s9b') + halfShutterSVG(270, 440, 550, 200) +
    `<g id="s9bcw">${stand('s9bc', CUS[1], 0, 0, .62)}</g>` + `<g id="s9bph">${handPhone('s9bhp', 1)}</g>` + `<g id="s9bchai">${chaiSVG()}</g>`,
  html: clockPill('c30', 'c31-0.05') +
    `<div class="bubble" style="left:330px;top:600px;width:500px;font-size:31px" data-t="c30+0.2">"Maheshbhai, wo <span class="hl">blue sherwani, ₹2,500 wali…</span> ready hai?"</div>` +
    pillH(540, 352, 'c31', 'Ab <span class="hl">dono dukaan</span> busy 🎉', 'gold'),
  cam: [1, 1.03], fy: 820,
  upd(t) {
    tf($('s9bcw'), 330, feet(.62), 1); PL['s9bc'].x = 330; PL['s9bc'].y = feet(.62);
    const C1 = life('s9bc', t, { mouth: t > T('c30') + .2 && t < T('c31') ? talkMouth(t, true) : 'smile', brows: 'up', look: [.3, -.3], L: [150, -80], hL: 'fist', R: [9, -14], seed: 4 });
    atHand('s9bph', 's9bc', C1.hl, 0, -70, 0);
    life('s9bm', t, { pivot: 0, mouth: 'grin', brows: 'up', look: t > T('c31') ? [.9, 0] : [0, .2], tilt: 4, R: [9, -14], L: [9, -14], seed: 1 });
    const B = life('s9bk', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [-.9, 0], L: t > T('c31') ? [140, -110] : [100, -30], hL: 'fist', R: [9, -14], seed: 2 });
    atHand('s9bchai', 's9bk', B.hl, 0, -30, 0, .6);
  }
});

// ================= S10a the question: "10 mein se kitne?" =================
addScene('c32', 'c34', {
  svg: STREET('s10') + bust('s10m', MH, 270, OWN_Y, OWN_S) + bust('s10k', KR, 810, OWN_Y, OWN_S) + twoShopsFront('s10'),
  html: `<div class="title" style="top:300px;font-size:62px" data-t="c32">10 mein se <span class="g">kitne?</span> 🤔</div>`,
  cam: [1, 1.03], fy: 800,
  upd(t) {
    life('s10m', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [0, 0], R: IDEA, hR: 'point', L: [9, -14], tilt: 4, seed: 1 });
    life('s10k', t, { pivot: 0, mouth: 'smile', brows: 'up', look: [0, 0], L: [9, -14], R: [9, -14], tilt: -4, seed: 2 });
  }
});

// ================= S10b end card: comment + LIST =================
addScene('c34', 9999, {
  svg: `<rect width="${W}" height="${H}" fill="url(#mar)"/>` + rosettes('s11r', 540, 760, .16, C.gold) + bust('s11m', MH, 330, FLOOR + 330, .8) + bust('s11k', KR, 750, FLOOR + 330, .8) + counterSVG(FLOOR + 280, '#5D0000'),
  html: `<img id="s11wm" style="position:absolute;left:290px;top:250px;width:500px" src="">` +
    `<div class="title" style="top:500px;font-size:70px">10 mein se kitne?<br><span class="g">Comment karo</span> 👇</div>` +
    pillH(540, 710, 'c35', 'Shop list karni hai? <span class="hl">LIST</span> ✍️', 'big') + pillH(540, 820, 'c34+0.5', 'anokhireet.in', 'gold'),
  noWm: true, tin: .3, trans: 'rise', cam: [1, 1.03],
  init() { const im = $('s11wm'); if (im) im.src = SEAL().replace('seal-on-maroon.svg', 'logo-text.svg'); },
  upd(t) {
    tf($('s11r'), 540, 760, 1, t * 5);
    life('s11m', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], R: t > T('c35') ? WAVE(t, T('c35')) : [9, -14], hR: 'open', L: [9, -14], tilt: 4, seed: 1 });
    life('s11k', t, { pivot: 0, mouth: 'grin', brows: 'up', look: [0, 0], L: t > T('c35') ? WAVE(t, T('c35')) : [9, -14], hL: 'open', R: [9, -14], tilt: -4, seed: 2 });
  }
});
