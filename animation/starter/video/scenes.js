// ===== Starter reel: copy this folder into reels/<date>-<name>/video and replace everything with your story =====
// Characters: animation/cast/cast.js. Rooms, props, helpers: animation/engine/. Guide: animation/GUIDE.md.

// S1 hook: the strongest picture + an outlined title in the first frame
addScene(0, 'c3', {
  svg: homeBG('st1', { noWindow: true, noShelf: true, noClock: true }) + `<circle cx="540" cy="800" r="420" fill="url(#glow)"/>` +
    `<g id="st1-l">${lehengaHangerSVG('st1-lh')}</g>` +
    `<g transform="translate(790,560)"><g data-t="c2+0.3" data-swing="9">${priceTagSVG('st1-tag', '1 baar?', 0, 0, { fs: 36 })}</g></g>`,
  html: `<div class="title" style="top:392px">Shaadi ka outfit,<br><span class="g">kitni baar?</span></div>`,
  cam: [1, 1.05], fy: 800,
  upd(t) { tf($('st1-l'), 540, 720 + Math.sin(t * 1.4) * 6, 1.25, noise(t, 1) * 2, 0, -80); }
});

// S2 meet the character: name pill, a wave, eyes on camera, then a look at the outfit
addScene('c3', 'c4', {
  svg: homeBG('st2') + stand('st2h', dress(HETAL.home, { top: C.pink, topD: C.pinkDark, pallu: '#F4B9C8' }), 560, 940, .95),
  html: pillH(540, 352, 'c3+0.3', 'Surat, <span class="hl">Gujarat</span>'),
  upd(t) {
    const w = clamp((t - T('c3')) / .35);
    const R = [lerp(9, WAVE(t, T('c3'))[0], E.io(w)), lerp(-14, WAVE(t, T('c3'))[1], E.io(w))];
    life('st2h', t, { mouth: 'big', brows: 'up', R, hR: w > .5 ? 'open' : 'fist', tilt: 4, look: [0.2, 0] });
    clockTick('st2-clk', t, 50);
  }
});

// S3 follow card
addScene('c4', 9999, {
  svg: homeBG('st3', { noWindow: true, noShelf: true, noClock: true }) + rosettes('st3-r', 540, 780, .1, C.goldTan) + bust('st3h', HETAL.home, 540, FLOOR + 10, 1.1) + counterSVG(),
  html: `<div class="follow" style="left:540px;top:500px" data-t="c4+0.2"><img class="seal" src="${SEAL()}"><span class="nm">Anokhi Reet</span><span class="btn">Follow</span></div>`,
  noWm: true, tin: .3, trans: 'rise',
  upd(t) { tf($('st3-r'), 540, 780, 1, t * 5); life('st3h', t, { pivot: 0, mouth: 'grin', brows: 'up', tilt: 4, L: CLASP, R: CLASP }); }
});
