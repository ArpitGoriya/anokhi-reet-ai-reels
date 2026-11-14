// ===== engine: scenes, pops, captions, frame loop =====
const SC = [];
// addScene(from, to, {svg, html, upd(t, lt, s), init(s), cam:[z0,z1], fx, fy, capY, noCap, noWm, noSettle,
//                      tin, trans})  tin = seconds this scene blends in over the previous one (0 = hard cut),
//                      trans = 'fade' (default) | 'slide' | 'rise' | 'zoom' | 'iris'
function addScene(a, b, o) { SC.push(Object.assign({ a: T(a), b: T(b) }, o)); }

function applyPop(el, t, svg) {
  const t0 = T(el.dataset.t);
  const d = el.dataset.d ? +el.dataset.d : .42;
  const out = el.dataset.out ? T(el.dataset.out) : 1e9;
  const k = el.dataset.k || 'pop';
  let s = 1, o = 1, x = 0, y = 0, r = 0;
  const q = clamp((t - t0) / d);
  if (k === 'pop') { const p = pop(t, t0, d); s = p.s; o = p.o; }
  else if (k === 'fade') { o = E.out(q); }
  else if (k === 'rise') { o = clamp(q * 1.8); y = (1 - E.out(q)) * 70; }
  else if (k === 'drop') { o = clamp(q * 3); y = -(1 - E.back(q)) * 60; }
  else if (k === 'slideL') { o = clamp(q * 2); x = -(1 - E.out(q)) * 120; }
  else if (k === 'slideR') { o = clamp(q * 2); x = (1 - E.out(q)) * 120; }
  else if (k === 'write') { o = q > 0 ? 1 : 0; }
  if (t > out) { const k2 = clamp((t - out) / .25); o *= 1 - k2; s *= 1 - .12 * k2; }
  if (el.dataset.swing) { const a = +el.dataset.swing, lt = Math.max(0, t - t0); r = Math.sin(lt * 3.1) * a * Math.exp(-lt * .9) + noise(t, a) * a * .25; }
  if (el.dataset.bob) { y += Math.sin((t + (+el.dataset.ph || 0)) * 2.2) * (+el.dataset.bob); }
  if (svg) {
    el.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${r.toFixed(2)}) scale(${s.toFixed(4)})`);
    el.setAttribute('opacity', o.toFixed(3));
  } else {
    const base = el.classList.contains('nc') ? '' : 'translate(-50%,-50%) ';
    el.style.transform = `${base}translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`;
    el.style.opacity = o.toFixed(3);
    if (k === 'write') el.style.clipPath = `inset(-20px ${((1 - E.io(q)) * 100).toFixed(1)}% -20px -20px)`;
  }
}

// ---------- captions ----------
let CAPS = [];
function captionsInit() {
  CAPS = CHUNKS.map(([id, text]) => {
    const words = []; let hl = false;
    text.split(' ').forEach(w => {
      const n = (w.match(/\*/g) || []).length;
      words.push({ w: w.replace(/\*/g, ''), g: hl || n > 0 });
      if (n % 2 === 1) hl = !hl;
    });
    const [a, b] = CT[id];
    const total = words.reduce((n, x) => n + x.w.length + 1, 0);
    const speak = Math.min(b - a - .1, Math.max(.45, total * .072));
    let acc = 0; words.forEach(x => { x.t = a + speak * acc / total - .04; acc += x.w.length + 1; });
    return { id, a, b, words, html: words.map((x, i) => `<span class="w${x.g ? ' g' : ''}" data-i="${i}">${x.w}</span>`).join(' ') };
  });
}
let capCur = -1;
function captions(t, scene) {
  const el = $('cap');
  let i = -1;
  for (let k = 0; k < CAPS.length; k++) if (t >= CAPS[k].a - .02 && t < CAPS[k].b) i = k;
  if (t >= VOICE_END + .5) i = -1;
  if (scene && scene.noCap) i = -1;
  if (i !== capCur) { capCur = i; el.innerHTML = i >= 0 ? CAPS[i].html : ''; }
  if (i < 0) return;
  const c = CAPS[i];
  el.style.top = ((scene && scene.capY) || 1352) + 'px';
  const kin = clamp((t - c.a + .02) / .16);
  el.style.opacity = kin.toFixed(3);
  el.style.transform = `translateY(${((1 - E.out(kin)) * 16).toFixed(1)}px)`;
  const spans = el.children;
  c.words.forEach((x, j) => { const sp = spans[j]; if (!sp) return; const on = t >= x.t; sp.classList.toggle('dim', !on); const k = clamp((t - x.t) / .12); sp.style.transform = `scale(${on ? lerp(1.08, 1, E.out(k)).toFixed(3) : 1})`; });
}

// ---------- build + frame ----------
function build() {
  const root = $('scenes'), ui = $('ui');
  SC.forEach((s, i) => {
    const g = document.createElementNS(NS, 'g'); g.setAttribute('id', 'S' + i);
    g.innerHTML = `<g class="cam">${s.svg || ''}</g>`; root.appendChild(g);
    s.g = g; s.cam = g.firstChild;
    const d = document.createElement('div'); d.className = 'sui'; d.innerHTML = s.html || ''; ui.insertBefore(d, $('cap'));
    s.d = d;
    s.popsS = [...g.querySelectorAll('[data-t]')];
    s.popsH = [...d.querySelectorAll('[data-t]')];
    s.sway = [...g.querySelectorAll('.sway')];
    s.tw = [...g.querySelectorAll('.twinkle')];
    s.on = true; g.style.display = 'none'; d.style.display = 'none'; s.on = false;
    if (s.init) s.init(s);
  });
  captionsInit();
}
// transition in: k goes 0 -> 1 over the scene's `tin` seconds before its start
function transIn(s, k) {
  const kind = s.trans || 'fade', e = E.io(k);
  let x = 0, y = 0, sc = 1, o = 1, clip = '';
  if (kind === 'fade') o = e;
  else if (kind === 'slide') x = (1 - e) * W;
  else if (kind === 'rise') { y = (1 - e) * 260; o = clamp(k * 2); }
  else if (kind === 'zoom') { sc = lerp(1.14, 1, e); o = e; }
  else if (kind === 'iris') clip = k < 1 ? `circle(${(e * 120).toFixed(1)}% at 50% 47%)` : '';
  s.g.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) translate(540,900) scale(${sc.toFixed(4)}) translate(-540,-900)`);
  s.g.setAttribute('opacity', o.toFixed(3));
  s.g.style.clipPath = clip; s.d.style.clipPath = clip;
  s.d.style.opacity = o.toFixed(3);
  s.d.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${sc.toFixed(4)})`;
}
function render(t) {
  let cur = null;
  SC.forEach(s => {
    const tin = s.tin || 0;
    const on = t >= s.a - tin && t < s.b;
    if (on !== s.on) { s.g.style.display = on ? '' : 'none'; s.d.style.display = on ? '' : 'none'; s.on = on; }
    if (!on) return;
    if (tin) transIn(s, clamp((t - (s.a - tin)) / tin));
    if (t >= s.a) cur = s;
    const lt = t - s.a, dur = s.b - s.a;
    const cz = s.cam || [1, 1.035];
    const settle = s.noSettle ? 1 : 1 + .02 * (1 - E.out(clamp(lt / .7)));
    const z = (typeof cz === 'function' ? cz(t, lt) : lerp(cz[0], cz[1], E.io(clamp(lt / dur)))) * settle;
    const fx = s.fx || 540, fy = s.fy || 900;
    s.cam.setAttribute('transform', `translate(${fx},${fy}) scale(${z.toFixed(4)}) translate(${-fx},${-fy})`);
    s.popsS.forEach(el => applyPop(el, t, true));
    s.popsH.forEach(el => applyPop(el, t, false));
    s.sway.forEach((el, i) => el.setAttribute('transform', `rotate(${(noise(t * .9, i * 2.3) * 3.2).toFixed(2)})`));
    s.tw.forEach((el, i) => el.setAttribute('opacity', (.65 + .35 * Math.max(0, Math.sin(t * 2.4 + i * 1.7))).toFixed(2)));
    if (s.upd) s.upd(t, lt, s);
  });
  const wm = $('wm'); if (wm) wm.style.display = cur && cur.noWm ? 'none' : '';
  captions(t, cur);
}
