// ===== Anokhi Reet 2D story reel engine: timing helpers, characters, props, rooms =====
// Everything is drawn as SVG strings once, then moved every frame from render(t).

const W = 1080, H = 1920, FLOOR = 1190;
const OL = '#3B2418';            // outline colour (dark brown, like the reference)
const OW = 5;                    // outline width
const C = {
  red: '#890304', redDark: '#4a0002', maroonDeep: '#2b0001', cream: '#FFF2DF', beige: '#E8E5C3',
  goldTan: '#D6B97A', gold: '#F8D36A', brown: '#7A5C2E', text: '#1A1A1A', white: '#FFFFFF',
  wall: '#F6E7CF', wallLow: '#EFDCBF', wood: '#9A6B3F', woodDark: '#7A5C2E', woodLight: '#B07E4C',
  floor: '#8C6239', skin: '#C98B62', skin2: '#B9784F', skinLight: '#D9A07A', hair: '#2A1A14',
  teal: '#2F7F7A', tealDark: '#22605C', lehenga: '#8A0F1A', lehengaDark: '#650A12', pink: '#D9577A',
  pinkDark: '#B33F60', emerald: '#1F7A4D', emeraldDark: '#165C39', sky: '#CFE6EE', leaf: '#5E8C4A', leafDark: '#476F37',
  marigold: '#F2A33A', marigold2: '#F7C548', grey: '#B9B2A8', blush: '#E98F86'
};

// ---------- timing ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const E = {
  lin: k => k,
  out: k => 1 - Math.pow(1 - k, 3),
  in: k => k * k * k,
  io: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  back: k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
  soft: k => { const c1 = 1.1, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
};
// progress 0..1 between t0 and t0+d with easing
const P = (t, t0, d, e = E.out) => e(clamp((t - t0) / d));
// keyframes [[t,v],...] -> value
function KF(t, keys, e = E.io) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
      return lerp(v0, v1, e((t - t0) / (t1 - t0)));
    }
  }
  return keys[keys.length - 1][1];
}
// pop in: returns {s, o} scale and opacity for an element appearing at t0
function pop(t, t0, d = .38) { const k = clamp((t - t0) / d); return { s: k <= 0 ? 0 : lerp(.55, 1, E.soft(k)), o: clamp(k * 2.2) }; }
const wave = (t, f = 1, ph = 0) => Math.sin((t * f + ph) * Math.PI * 2);
// smooth pseudo-random noise for small natural sway
function noise(t, seed = 0) { return (Math.sin(t * 1.3 + seed) + Math.sin(t * 2.1 + seed * 1.7) * .5 + Math.sin(t * .7 + seed * 3.1) * .7) / 2.2; }

// ---------- DOM helpers ----------
const NS = 'http://www.w3.org/2000/svg';
const $ = id => document.getElementById(id);
function tf(el, x = 0, y = 0, s = 1, r = 0, ox = 0, oy = 0, sy) {
  if (!el) return;
  const syv = sy === undefined ? s : sy;
  el.setAttribute('transform', `translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${r.toFixed(2)},${ox},${oy}) translate(${ox},${oy}) scale(${s.toFixed(4)},${syv.toFixed(4)}) translate(${-ox},${-oy})`);
}
function op(el, o) { if (el) el.setAttribute('opacity', clamp(o).toFixed(3)); }
function show(el, on) { if (el) el.style.display = on ? '' : 'none'; }

// ---------- character ----------
// A waist-up (or full lehenga) Indian character drawn in the flat outlined cartoon style.
// Local origin = waist centre. Head centre at (0,-385). Parts get ids `${id}-xxx` to animate.
const MOUTH = {
  smile: 'M-20,-328 Q0,-312 20,-328',
  big: 'M-26,-332 Q0,-296 26,-332 Q0,-322 -26,-332 Z',
  grin: 'M-28,-334 Q0,-292 28,-334 Z',
  o: 'M-9,-326 Q0,-340 9,-326 Q12,-314 0,-310 Q-12,-314 -9,-326 Z',
  flat: 'M-16,-322 Q0,-320 16,-322',
  sad: 'M-17,-314 Q0,-330 17,-314',
  worry: 'M-18,-318 Q-9,-326 0,-319 Q9,-312 18,-320',
  talk: 'M-18,-330 Q0,-306 18,-330 Q0,-324 -18,-330 Z',
  shy: 'M-12,-322 Q0,-314 12,-323',
};
const BROWS = {
  norm: ['M-56,-418 Q-38,-428 -22,-420', 'M22,-420 Q38,-428 56,-418'],
  up: ['M-56,-428 Q-38,-442 -22,-432', 'M22,-432 Q38,-442 56,-428'],
  worry: ['M-56,-416 Q-40,-420 -24,-430', 'M24,-430 Q40,-420 56,-416'],
  angry: ['M-56,-430 Q-38,-424 -22,-414', 'M22,-414 Q38,-424 56,-430'],
  sure: ['M-56,-420 Q-38,-424 -22,-418', 'M22,-418 Q38,-424 56,-420'],
};

const PERS = {};
function person(id, o = {}) {
  PERS[id] = { tw: (o.wide ? 135 : (o.male ? 118 : 108)) - 8, skin: o.skin || C.skin };
  const skin = o.skin || C.skin, skin2 = o.skin2 || C.skin2, hair = o.hair || C.hair;
  const top = o.top || C.teal, topD = o.topD || C.tealDark, border = o.border || C.gold;
  const style = o.hairStyle || 'bun';
  let s = `<g id="${id}">`;
  s += `<g id="${id}-body">`;
  // full lehenga skirt (standing figure)
  if (o.skirt) s += skirtSVG(o.skirt, 0, 0, 1);
  // back hair
  if (style === 'long' || style === 'braid') s += `<path d="M-92,-420 Q-120,-300 -96,-215 L96,-215 Q120,-300 92,-420 Z" fill="${hair}" stroke="${OL}" stroke-width="${OW}"/>`;
  if (style === 'braid') s += `<path d="M70,-300 Q96,-200 80,-120" fill="none" stroke="${OL}" stroke-width="34" stroke-linecap="round"/><path d="M70,-300 Q96,-200 80,-120" fill="none" stroke="${hair}" stroke-width="24" stroke-linecap="round"/>`;
  // torso
  const male = o.male;
  const tw = o.wide ? 135 : (male ? 118 : 108);
  s += `<path d="M${-tw},-205 Q${-tw - 6},-250 -60,-262 L60,-262 Q${tw + 6},-250 ${tw},-205 L${tw - 14},0 L${-tw + 14},0 Z" fill="${top}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  if (o.wide) s += `<path d="M-60,-120 Q0,-60 60,-120 Q70,-40 0,-20 Q-70,-40 -60,-120 Z" fill="${topD}" opacity=".35"/>`;
  if (o.apron) s += `<path d="M-62,-200 L62,-200 L72,0 L-72,0 Z" fill="${o.apron}" stroke="${OL}" stroke-width="${OW}"/>`;
  // saree pallu / dupatta across the chest
  if (o.pallu) {
    s += `<path d="M-${tw - 4},-214 Q-60,-262 -30,-262 L${tw - 20},-20 L${tw - 60},0 Z" fill="${o.pallu}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
    s += `<path d="M-30,-262 L${tw - 20},-20" stroke="${border}" stroke-width="12" fill="none"/>`;
    if (o.embroidery) for (let i = 0; i < 6; i++) s += `<circle cx="${-40 + i * 22}" cy="${-205 + i * 34}" r="5" fill="${C.gold}"/>`;
  }
  if (o.embroidery && !o.pallu) for (let i = 0; i < 5; i++) s += `<circle cx="${-60 + i * 30}" cy="-150" r="5" fill="${C.gold}"/>`;
  if (male) s += `<path d="M-26,-262 L0,-226 L26,-262" fill="none" stroke="${OL}" stroke-width="${OW}"/>`;
  // neck
  s += `<path d="M-24,-300 L-24,-258 Q0,-244 24,-258 L24,-300 Z" fill="${skin2}" stroke="${OL}" stroke-width="${OW}"/>`;
  if (o.necklace) s += `<path d="M-30,-262 Q0,-226 30,-262" fill="none" stroke="${C.gold}" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="-238" r="8" fill="${C.gold}" stroke="${OL}" stroke-width="3"/>`;
  // head
  s += `<g id="${id}-head">`;
  if (style === 'bun' || style === 'greybun') s += `<circle cx="0" cy="-498" r="44" fill="${style === 'greybun' ? '#8F8A84' : hair}" stroke="${OL}" stroke-width="${OW}"/>`;
  if (style === 'bun' && o.gajra) s += `<path d="M-40,-520 Q0,-560 40,-520" fill="none" stroke="#FFF8EC" stroke-width="12" stroke-dasharray="2 11" stroke-linecap="round"/>`;
  if (style === 'pony') s += `<path d="M60,-470 Q130,-430 110,-330" fill="none" stroke="${OL}" stroke-width="44" stroke-linecap="round"/><path d="M60,-470 Q130,-430 110,-330" fill="none" stroke="${hair}" stroke-width="34" stroke-linecap="round"/>`;
  // ears
  for (const sx of [-1, 1]) {
    s += `<ellipse cx="${sx * 97}" cy="-378" rx="17" ry="22" fill="${skin}" stroke="${OL}" stroke-width="${OW}"/>`;
    if (!male && o.earrings !== false) s += `<circle cx="${sx * 99}" cy="-350" r="8" fill="${C.gold}" stroke="${OL}" stroke-width="3"/>`;
  }
  s += `<ellipse cx="0" cy="-385" rx="98" ry="106" fill="${skin}" stroke="${OL}" stroke-width="${OW}"/>`;
  // hair front
  const hc = style === 'greybun' ? '#8F8A84' : hair;
  if (male) {
    s += `<path d="M-98,-392 Q-104,-500 -20,-505 Q60,-512 92,-470 Q104,-430 98,-392 Q80,-440 40,-452 Q-10,-430 -60,-450 Q-90,-430 -98,-392 Z" fill="${hc}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  } else if (style === 'short') {
    s += `<path d="M-100,-360 Q-112,-500 0,-500 Q112,-500 100,-360 Q92,-430 50,-450 Q0,-440 -50,-450 Q-92,-430 -100,-360 Z" fill="${hc}" stroke="${OL}" stroke-width="${OW}"/>`;
  } else {
    s += `<path d="M-99,-372 Q-108,-492 0,-494 Q108,-492 99,-372 Q92,-440 40,-458 Q8,-450 0,-470 Q-8,-450 -40,-458 Q-92,-440 -99,-372 Z" fill="${hc}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
    if (o.sindoor) s += `<path d="M0,-470 L0,-450" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>`;
  }
  // face
  s += `<g id="${id}-brows" fill="none" stroke="${OL}" stroke-width="6" stroke-linecap="round"><path id="${id}-bl" d="${BROWS.norm[0]}"/><path id="${id}-br" d="${BROWS.norm[1]}"/></g>`;
  s += `<g id="${id}-eyes"><g id="${id}-eyeL"><ellipse cx="-38" cy="-378" rx="13" ry="17" fill="#2A1A14"/><circle cx="-34" cy="-384" r="5" fill="#fff"/></g><g id="${id}-eyeR"><ellipse cx="38" cy="-378" rx="13" ry="17" fill="#2A1A14"/><circle cx="42" cy="-384" r="5" fill="#fff"/></g></g>`;
  s += `<path id="${id}-lids" d="" fill="${skin}" stroke="${OL}" stroke-width="4"/>`;
  s += `<path d="M-4,-360 Q4,-346 -6,-340" fill="none" stroke="${skin2}" stroke-width="5" stroke-linecap="round"/>`;
  if (o.mustache) s += `<path d="M-30,-334 Q-14,-346 0,-338 Q14,-346 30,-334 Q14,-330 0,-334 Q-14,-330 -30,-334 Z" fill="${hair}"/>`;
  s += `<path id="${id}-mouth" d="${MOUTH.smile}" fill="#6E2A22" stroke="${OL}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<ellipse cx="-60" cy="-340" rx="16" ry="9" fill="${C.blush}" opacity=".35"/><ellipse cx="60" cy="-340" rx="16" ry="9" fill="${C.blush}" opacity=".35"/>`;
  s += `<g id="${id}-blush" opacity="0"><ellipse cx="-58" cy="-342" rx="24" ry="13" fill="#E26A5E" opacity=".55"/><ellipse cx="58" cy="-342" rx="24" ry="13" fill="#E26A5E" opacity=".55"/><path d="M-70,-346 l8,-8 M-58,-346 l8,-8 M50,-346 l8,-8 M62,-346 l8,-8" stroke="#C24B44" stroke-width="3"/></g>`;
  if (o.bindi !== false && !male) s += `<circle cx="0" cy="-418" r="7" fill="${C.red}"/>`;
  if (o.glasses) s += `<g fill="none" stroke="${OL}" stroke-width="5"><circle cx="-38" cy="-378" r="27"/><circle cx="38" cy="-378" r="27"/><path d="M-11,-380 Q0,-388 11,-380"/></g>`;
  s += `<g id="${id}-sweat" opacity="0"><path d="M86,-452 Q100,-428 96,-414 Q88,-402 78,-414 Q74,-428 86,-452 Z" fill="#9BD3EA" stroke="${OL}" stroke-width="3.5"/></g>`;
  s += `</g>`; // head
  // arms (paths updated each frame)
  for (const side of ['L', 'R']) {
    s += `<g id="${id}-arm${side}"><path id="${id}-a${side}o" fill="none" stroke="${OL}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path id="${id}-a${side}s" fill="none" stroke="${skin}" stroke-width="37" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path id="${id}-a${side}c" fill="none" stroke="${o.sleeve || top}" stroke-width="42" stroke-linecap="round"/>`;
    if (o.bangles !== false && !male) s += `<path id="${id}-a${side}b" fill="none" stroke="${C.gold}" stroke-width="40" stroke-dasharray="4 6"/>`;
    s += `<g id="${id}-h${side}"></g></g>`;
  }
  s += `</g></g>`;
  return s;
}

// lehenga skirt shape (used on the character and on hangers)
function skirtSVG(sk, x, y, sc) {
  const c = sk.c || C.lehenga, d = sk.d || C.lehengaDark, b = sk.b || C.gold, h = sk.h || 330, w = sk.w || 235;
  let s = `<g transform="translate(${x},${y}) scale(${sc})">`;
  s += `<path d="M-92,0 C-140,${h * .45} -${w - 20},${h * .8} -${w},${h} Q0,${h + 34} ${w},${h} C${w - 20},${h * .8} 140,${h * .45} 92,0 Z" fill="${c}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  for (let i = -3; i <= 3; i++) if (i) s += `<path d="M${i * 20},6 Q${i * 34},${h * .6} ${i * 62},${h + 12}" stroke="${d}" stroke-width="5" fill="none" opacity=".7"/>`;
  s += `<path d="M-${w - 8},${h - 34} Q0,${h - 2} ${w - 8},${h - 34}" stroke="${b}" stroke-width="18" fill="none"/>`;
  s += `<path d="M-${w - 2},${h - 6} Q0,${h + 26} ${w - 2},${h - 6}" stroke="${b}" stroke-width="6" fill="none" opacity=".9"/>`;
  for (let i = 0; i < 9; i++) { const k = (i - 4) / 4; s += `<circle cx="${k * (w - 60)}" cy="${h * .55 + Math.abs(k) * -14 + 20}" r="7" fill="${b}"/>`; }
  for (let i = 0; i < 6; i++) { const k = (i - 2.5) / 2.5; s += `<circle cx="${k * 120}" cy="${h * .28}" r="5.5" fill="${b}"/>`; }
  s += `<rect x="-96" y="-12" width="192" height="22" rx="8" fill="${b}" stroke="${OL}" stroke-width="4"/>`;
  s += `</g>`;
  return s;
}

// arm pose: a1 shoulder angle (0 = hanging down, + = out/up), a2 elbow bend (+ = out, - = in)
function arm(id, side, a1, a2, hand = 'open', o = {}) {
  const sd = side === 'L' ? -1 : 1;
  const pr = PERS[id] || {};
  const tw = o.tw || pr.tw || 100;
  if (!o.skin && pr.skin) o = Object.assign({}, o, { skin: pr.skin });
  const S = [sd * tw, -228], L1 = 118, L2 = 112;
  const r1 = a1 * Math.PI / 180, r2 = (a1 + a2) * Math.PI / 180;
  const Eb = [S[0] + sd * L1 * Math.sin(r1), S[1] + L1 * Math.cos(r1)];
  const Hd = [Eb[0] + sd * L2 * Math.sin(r2), Eb[1] + L2 * Math.cos(r2)];
  const d = `M${S[0].toFixed(1)},${S[1].toFixed(1)} L${Eb[0].toFixed(1)},${Eb[1].toFixed(1)} L${Hd[0].toFixed(1)},${Hd[1].toFixed(1)}`;
  $(`${id}-a${side}o`).setAttribute('d', d);
  $(`${id}-a${side}s`).setAttribute('d', d);
  const k = o.sleeve === undefined ? .55 : o.sleeve;
  const sx = lerp(S[0], Eb[0], k), sy = lerp(S[1], Eb[1], k);
  $(`${id}-a${side}c`).setAttribute('d', `M${S[0]},${S[1]} L${sx.toFixed(1)},${sy.toFixed(1)}`);
  const bg = $(`${id}-a${side}b`);
  if (bg) { const bx = lerp(Eb[0], Hd[0], .78), by = lerp(Eb[1], Hd[1], .78), bx2 = lerp(Eb[0], Hd[0], .9), by2 = lerp(Eb[1], Hd[1], .9); bg.setAttribute('d', `M${bx.toFixed(1)},${by.toFixed(1)} L${bx2.toFixed(1)},${by2.toFixed(1)}`); }
  const hg = $(`${id}-h${side}`);
  if (hg.dataset.k !== hand) { hg.dataset.k = hand; hg.innerHTML = handSVG(hand, o.skin || C.skin); }
  const ang = Math.atan2(Hd[1] - Eb[1], Hd[0] - Eb[0]) * 180 / Math.PI - 90;
  hg.setAttribute('transform', `translate(${Hd[0].toFixed(1)},${Hd[1].toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${sd},1)`);
  return Hd;
}
function handSVG(kind, skin) {
  if (kind === 'point') return `<path d="M-18,-6 Q-22,18 -6,24 L22,26 Q30,24 24,16 L4,14 L4,48 Q4,58 -6,56 Q-14,54 -14,44 Z" fill="${skin}" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/>`;
  if (kind === 'fist') return `<circle cx="0" cy="8" r="22" fill="${skin}" stroke="${OL}" stroke-width="${OW}"/>`;
  // open palm (waving)
  return `<path d="M-20,-4 Q-26,20 -16,34 L-18,52 Q-16,58 -10,54 L-6,38 L-4,58 Q0,64 6,58 L6,38 L12,56 Q18,60 20,54 L16,34 Q24,22 20,-4 Z" fill="${skin}" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/>`;
}

// face + idle life (blink, breath, sway). Call every frame.
function face(id, t, f = {}) {
  const seed = f.seed || 0;
  // blink every ~3.6 s, 0.16 s long
  const per = 3.6 + (seed % 3) * .4, ph = ((t + seed * 1.3) % per);
  const blink = ph < .16 ? Math.sin(ph / .16 * Math.PI) : 0;
  const closed = f.closed ? 1 : blink;
  tf($(`${id}-eyeL`), 0, 0, 1, 0, -38, -378, 1 - closed * .92);
  tf($(`${id}-eyeR`), 0, 0, 1, 0, 38, -378, 1 - closed * .92);
  if (f.mouth) { const m = $(`${id}-mouth`); if (m.dataset.k !== f.mouth) { m.dataset.k = f.mouth; m.setAttribute('d', MOUTH[f.mouth]); m.setAttribute('fill', /big|grin|o|talk/.test(f.mouth) ? '#6E2A22' : 'none'); } }
  if (f.brows) { const b = BROWS[f.brows]; $(`${id}-bl`).setAttribute('d', b[0]); $(`${id}-br`).setAttribute('d', b[1]); }
  op($(`${id}-blush`), f.blush || 0);
  op($(`${id}-sweat`), f.sweat || 0);
  if (f.sweat) tf($(`${id}-sweat`), 0, ((t * 1.2) % 1) * 18, 1);
  // breathing + gentle head sway
  const br = 1 + wave(t, .28, seed) * .008;
  tf($(`${id}-body`), 0, 0, 1, 0, 0, 0, br);
  const tilt = (f.tilt || 0) + noise(t * .8, seed) * 2.2;
  tf($(`${id}-head`), 0, (f.nod || 0), 1, tilt, 0, -290);
}
// talking mouth helper (open/close while speaking)
function talkMouth(t, speaking) { if (!speaking) return 'smile'; const v = Math.abs(Math.sin(t * 11)) + Math.abs(Math.sin(t * 7.3)) * .6; return v > .9 ? 'talk' : 'flat'; }

// ---------- props ----------
function windowSVG(x, y, w = 200, h = 230, o = {}) {
  let s = `<g transform="translate(${x},${y})">`;
  s += `<rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="${o.night ? '#2E3D63' : C.sky}" stroke="${OL}" stroke-width="${OW}"/>`;
  if (o.night) s += `<path d="M${w * .62},${h * .2} a26,26 0 1,0 18,40 a20,20 0 1,1 -18,-40 Z" fill="${C.gold}"/>`;
  else s += `<path d="M${w * .15},${h * .32} q12,-14 28,-6 q10,-12 26,0 q14,2 10,12 h-62 z" fill="#fff" opacity=".9"/><circle cx="${w * .74}" cy="${h * .3}" r="22" fill="${C.gold}" opacity=".95"/>`;
  s += `<path d="M${w / 2},0 V${h} M0,${h / 2} H${w}" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<rect x="-14" y="${h - 4}" width="${w + 28}" height="16" rx="4" fill="${C.woodLight}" stroke="${OL}" stroke-width="4"/>`;
  if (o.curtain) {
    s += `<path d="M-30,-14 L36,-14 Q24,${h * .5} 40,${h + 6} L-30,${h + 6} Z" fill="${o.curtain}" stroke="${OL}" stroke-width="${OW}"/>`;
    s += `<path d="M${w + 30},-14 L${w - 36},-14 Q${w - 24},${h * .5} ${w - 40},${h + 6} L${w + 30},${h + 6} Z" fill="${o.curtain}" stroke="${OL}" stroke-width="${OW}"/>`;
    s += `<rect x="-44" y="-24" width="${w + 88}" height="12" rx="6" fill="${C.woodDark}" stroke="${OL}" stroke-width="3"/>`;
  }
  return s + `</g>`;
}
function plantSVG(x, y, sc = 1) {
  return `<g transform="translate(${x},${y}) scale(${sc})"><g class="sway">` +
    `<path d="M0,-20 Q-50,-80 -44,-130 Q-10,-90 0,-20 Z" fill="${C.leaf}" stroke="${OL}" stroke-width="4"/>` +
    `<path d="M0,-20 Q40,-90 20,-150 Q-6,-90 0,-20 Z" fill="${C.leafDark}" stroke="${OL}" stroke-width="4"/>` +
    `<path d="M0,-20 Q60,-60 70,-100 Q20,-90 0,-20 Z" fill="${C.leaf}" stroke="${OL}" stroke-width="4"/></g>` +
    `<path d="M-34,-24 L34,-24 L26,40 L-26,40 Z" fill="#C9673F" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<rect x="-40" y="-32" width="80" height="16" rx="5" fill="#D9774D" stroke="${OL}" stroke-width="4"/></g>`;
}
function lampSVG(x, len = 200) {
  return `<g transform="translate(${x},0)"><path d="M0,0 V${len}" stroke="${OL}" stroke-width="4"/>` +
    `<path d="M-46,${len + 40} Q-40,${len} 0,${len} Q40,${len} 46,${len + 40} Z" fill="#2F5D57" stroke="${OL}" stroke-width="${OW}"/>` +
    `<circle cx="0" cy="${len + 44}" r="10" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g>`;
}
function shelfSVG(x, y) {
  let s = `<g transform="translate(${x},${y})"><rect x="0" y="0" width="230" height="16" rx="4" fill="${C.wood}" stroke="${OL}" stroke-width="4"/>`;
  const cols = [C.red, C.goldTan, C.teal, C.pink, C.marigold];
  for (let i = 0; i < 5; i++) s += `<rect x="${14 + i * 43}" y="${-34 - (i % 2) * 10}" width="28" height="${34 + (i % 2) * 10}" rx="5" fill="${cols[i]}" stroke="${OL}" stroke-width="3.5"/>`;
  return s + `</g>`;
}
function almirahSVG(id, x, y, sc = 1) {
  // wardrobe: body + two doors (doors animated via ids)
  let s = `<g id="${id}" transform="translate(${x},${y}) scale(${sc})">`;
  s += `<rect x="-170" y="-560" width="340" height="560" rx="12" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<rect x="-150" y="-540" width="300" height="520" rx="6" fill="#4E3A1E"/>`;
  s += `<path d="M-140,-470 H140" stroke="${C.goldTan}" stroke-width="6"/>`;
  s += `<g id="${id}-inside"></g>`;
  s += `<g id="${id}-dL"><rect x="-150" y="-540" width="150" height="520" rx="6" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/><rect x="-128" y="-510" width="106" height="200" rx="8" fill="none" stroke="${C.woodDark}" stroke-width="5"/><rect x="-128" y="-280" width="106" height="230" rx="8" fill="none" stroke="${C.woodDark}" stroke-width="5"/><circle cx="-20" cy="-290" r="8" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g>`;
  s += `<g id="${id}-dR"><rect x="0" y="-540" width="150" height="520" rx="6" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/><rect x="22" y="-510" width="106" height="200" rx="8" fill="none" stroke="${C.woodDark}" stroke-width="5"/><rect x="22" y="-280" width="106" height="230" rx="8" fill="none" stroke="${C.woodDark}" stroke-width="5"/><circle cx="20" cy="-290" r="8" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g>`;
  s += `<rect x="-184" y="-578" width="368" height="26" rx="8" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>`;
  return s + `</g>`;
}
// lehenga on a hanger (blouse + skirt + dupatta)
function lehengaHangerSVG(id, sk = {}, sc = 1) {
  const c = sk.c || C.lehenga, b = sk.b || C.gold;
  let s = `<g id="${id}"><g transform="scale(${sc})">`;
  s += `<path d="M0,-80 Q0,-100 14,-98 Q26,-94 20,-82" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`;
  s += `<path d="M-80,-40 L0,-80 L80,-40" fill="none" stroke="${C.woodDark}" stroke-width="10" stroke-linecap="round"/>`;
  s += `<path d="M-78,-40 Q-60,-48 -40,-50 Q0,-30 40,-50 Q60,-48 78,-40 L70,10 L-70,10 Z" fill="${c}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  s += `<path d="M-40,-50 Q0,-24 40,-50" fill="none" stroke="${b}" stroke-width="8"/>`;
  s += skirtSVG(sk, 0, 30, .72);
  s += `<path d="M58,-44 Q120,60 96,260 L70,250 Q86,80 40,-30 Z" fill="${sk.dupatta || C.goldTan}" stroke="${OL}" stroke-width="4" opacity=".95"/>`;
  s += `</g></g>`;
  return s;
}
function priceTagSVG(id, text, x, y, o = {}) {
  const fs = o.fs || 34, w = Math.max(150, text.length * fs * .62 + 70), L = -w / 2 - 10, R = w / 2 - 10;
  return `<g id="${id}" transform="translate(${x},${y})"><g id="${id}-in"><path d="M0,0 L0,40" stroke="${OL}" stroke-width="3"/>` +
    `<path d="M${L + 10},40 L${R},40 L${R + 30},74 L${R},108 L${L + 10},108 Q${L},108 ${L},98 L${L},50 Q${L},40 ${L + 10},40 Z" fill="${o.fill || C.white}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<circle cx="${R + 4}" cy="74" r="7" fill="${C.cream}" stroke="${OL}" stroke-width="3"/>` +
    `<text x="${(L + R) / 2}" y="${74 + fs * .36}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="${fs}" fill="${o.color || C.red}">${text}</text></g></g>`;
}
function cardSVG(id, x, y, n) {
  return `<g id="${id}" transform="translate(${x},${y})"><g id="${id}-in">` +
    `<rect x="-95" y="-130" width="190" height="260" rx="14" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-78" y="-113" width="156" height="226" rx="8" fill="none" stroke="${C.gold}" stroke-width="4"/>` +
    `<circle cx="0" cy="-38" r="36" fill="none" stroke="${C.gold}" stroke-width="5"/><circle cx="0" cy="-38" r="22" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="3 5"/>` +
    `<text x="0" y="40" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${C.gold}" letter-spacing="2">SHAADI</text>` +
    `<text x="0" y="82" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="${C.cream}">${n}</text></g></g>`;
}
function torSVG(y, w = W) {
  // marigold toran with leaves
  let s = `<g transform="translate(0,${y})"><path d="M0,0 H${w}" stroke="${OL}" stroke-width="4"/>`;
  for (let x = 30; x < w; x += 90) {
    s += `<path d="M${x - 20},6 Q${x},44 ${x + 20},6 Z" fill="${C.leaf}" stroke="${OL}" stroke-width="3"/>`;
    for (let k = 0; k < 4; k++) s += `<circle cx="${x + 45}" cy="${14 + k * 30}" r="15" fill="${k % 2 ? C.marigold2 : C.marigold}" stroke="${OL}" stroke-width="3"/>`;
  }
  return s + `</g>`;
}
function fairyLightsSVG(y, w = W) {
  let s = `<path d="M0,${y} Q${w / 4},${y + 60} ${w / 2},${y} Q${w * 3 / 4},${y + 60} ${w},${y}" fill="none" stroke="${OL}" stroke-width="3"/>`;
  for (let i = 1; i < 16; i++) { const x = i * w / 16; const k = (x % (w / 2)) / (w / 2); const yy = y + Math.sin(k * Math.PI) * 45; s += `<circle class="twinkle" data-i="${i}" cx="${x}" cy="${yy + 10}" r="8" fill="${C.gold}" stroke="${OL}" stroke-width="2.5"/>`; }
  return s;
}
function phoneSVG(id, x, y, w = 420, h = 820, inner = '') {
  return `<g id="${id}" transform="translate(${x},${y})"><g id="${id}-in">` +
    `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="56" fill="#1E1715" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-w / 2 + 16}" y="${-h / 2 + 16}" width="${w - 32}" height="${h - 32}" rx="42" fill="${C.white}"/>` +
    `<rect x="-40" y="${-h / 2 + 30}" width="80" height="20" rx="10" fill="#1E1715"/>` +
    `<g id="${id}-screen">${inner}</g></g></g>`;
}
function sofaSVG(x, y) {
  return `<g transform="translate(${x},${y})"><rect x="-300" y="-150" width="600" height="160" rx="40" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-340" y="-90" width="90" height="150" rx="34" fill="#A31D1D" stroke="${OL}" stroke-width="${OW}"/><rect x="250" y="-90" width="90" height="150" rx="34" fill="#A31D1D" stroke="${OL}" stroke-width="${OW}"/></g>`;
}
function counterSVG(y = FLOOR, col = C.wood) {
  return `<rect x="-20" y="${y}" width="${W + 40}" height="${H - y}" fill="${col}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-20" y="${y - 18}" width="${W + 40}" height="30" rx="6" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M0,${y + 120} H${W} M0,${y + 330} H${W}" stroke="#86593A" stroke-width="5" opacity=".6"/>`;
}
function wallSVG(top = C.wall, low = C.wallLow) {
  return `<rect x="0" y="0" width="${W}" height="${H}" fill="${top}"/><rect x="0" y="${FLOOR - 260}" width="${W}" height="260" fill="${low}"/>` +
    `<path d="M0,${FLOOR - 260} H${W}" stroke="#E2CBA6" stroke-width="6"/>`;
}
function coinSVG(x, y, r = 26) { return `<g transform="translate(${x},${y})"><circle r="${r}" fill="${C.gold}" stroke="${OL}" stroke-width="4"/><text y="${r * .36}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="${r}" fill="#A16F35">₹</text></g>`; }
