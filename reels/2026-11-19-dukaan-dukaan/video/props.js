// ===== Dukaan-dukaan ki bhaag-daud: reel-only drawings =====
const KP = KOMAL.purani, KS = KOMAL.smart;
const BLUE = { c: '#3F6FB5', d: '#2E548C', b: C.gold, dupatta: '#A9C4E8' }; // the blue reception outfit she picks

// a small phone held in a hand showing one outfit (`${id}-o`)
function handPhone(id, look = BLUE, sc = 1) {
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="${C.cream}"/><rect x="-42" y="-80" width="84" height="30" rx="10" fill="url(#mar)"/><circle cx="-26" cy="-65" r="8" fill="${C.cream}"/>` +
    `<g id="${id}-o"><g transform="translate(0,6)">${lehengaHangerSVG('', look, .2)}</g></g></g></g>`;
}
// a wedding card in a hand (the shared cardSVG, small)
function handCard(id, sc = .42) { return `<g id="${id}"><g transform="scale(${sc})">${cardSVG('', 0, 0, 'RECEPTION').replace('font-size="34"', 'font-size="26"')}</g></g>`; }
// a shopping bag in a hand (empty: hangs light)
function handBag(id, sc = .34) { return `<g id="${id}"><g transform="scale(${sc}) translate(0,190)">${bagSVG()}</g></g>`; }
// put a prop at a character's hand (scene coords), with an offset and a tilt
function atHand(pid, who, h, dx = 0, dy = 0, r = 0) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, 1, r); }

// The app's browse screen for phoneSVG(…, 560, 1000, inner): chips (`${id}-c0..2`, `-on` / `-t` to select), four
// outfit cards from different shops (`${id}-k0..3`; card 1 is the blue one), "Rent" pills (`${id}-r0..3`, no amounts)
// and a tick on the blue card (`${id}-sel`).
function browseScreen(id) {
  const chips = ['City', 'Reception', 'Budget'];
  const looks = [{ c: C.pink, d: C.pinkDark, dupatta: '#F4B9C8' }, BLUE, { c: C.emerald, d: C.emeraldDark, dupatta: '#A6D3B0' }, { c: C.lehenga, d: C.lehengaDark, dupatta: '#E8C25E' }];
  let s = arHeader();
  s += chips.map((c, i) => `<g transform="translate(${-170 + i * 170},-330)"><rect x="-80" y="-30" width="160" height="60" rx="30" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><rect id="${id}-c${i}-on" x="-80" y="-30" width="160" height="60" rx="30" fill="#141110" opacity="0"/><text x="0" y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${c.length > 8 ? 24 : 28}" fill="#655C57">${c}</text><text id="${id}-c${i}-t" x="0" y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${c.length > 8 ? 24 : 28}" fill="#fff" opacity="0">${c}</text></g>`).join('');
  looks.forEach((lk, i) => {
    const x = i % 2 ? 125 : -125, y = i < 2 ? -90 : 260;
    s += `<g transform="translate(${x},${y})"><g id="${id}-k${i}"><rect x="-112" y="-160" width="224" height="320" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-100" y="-148" width="200" height="200" rx="10" fill="${C.cream}"/>` +
      `<g transform="translate(0,-90)">${lehengaHangerSVG('', lk, .36)}</g>` +
      `<path d="M-96,76 h44 l6,16 h-56 z" fill="${C.red}" stroke="${OL}" stroke-width="2.5"/><rect x="-92" y="92" width="36" height="22" fill="#fff" stroke="${OL}" stroke-width="2.5"/><text x="-40" y="110" font-family="Inter" font-weight="700" font-size="22" fill="#655C57">Shop ${i + 1}</text>` +
      `<g transform="translate(-40,136)"><g id="${id}-r${i}" opacity="0"><rect x="-56" y="-18" width="112" height="36" rx="18" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${C.red}">Rent ✓</text></g></g>` +
      (i === 1 ? `<g id="${id}-sel" opacity="0"><rect x="-118" y="-166" width="236" height="332" rx="20" fill="none" stroke="#141110" stroke-width="7"/><circle cx="84" cy="-126" r="28" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><path d="M71,-126 l9,9 17,-17" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>` : '') +
      `</g></g>`;
  });
  return s;
}
function chipOn(id, i, k) { op($(`${id}-c${i}-on`), k); op($(`${id}-c${i}-t`), k); }

// a sitting lap (skirt folded over a step), in front of a bust whose waist is at (x, y)
function lapSVG(x, y, sk, sc = 1) {
  return `<g transform="translate(${x},${y}) scale(${sc})"><path d="M-150,-10 Q-170,70 -190,120 L190,120 Q170,70 150,-10 Z" fill="${sk.c}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M-180,96 Q0,120 180,96" stroke="${sk.b}" stroke-width="14" fill="none"/></g>`;
}
// a gold shimmer band (sweep it across with tf)
function shimmerSVG(id, h = 760) {
  return `<g id="${id}" opacity="0"><rect x="-60" y="${-h / 2}" width="120" height="${h}" fill="${C.gold}" opacity=".55" transform="skewX(-12)"/><rect x="-18" y="${-h / 2}" width="36" height="${h}" fill="#fff" opacity=".8" transform="skewX(-12)"/>` +
    [[-80, -200], [70, -60], [-40, 120], [90, 240]].map(([x, y]) => `<g transform="translate(${x},${y})">${sparkleSVG(22, C.gold)}</g>`).join('') + `</g>`;
}
