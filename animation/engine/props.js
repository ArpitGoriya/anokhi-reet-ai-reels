// ===== Extra props (from the Hetal reel). Each returns an SVG string centred on (0,0). =====
// blouseIcon, dupattaIcon, ticketSVG([line1,line2], colour), seatSVG(x), plateSVG(withFood), stepCard(n), jarSVG(front)
function blouseIcon() { return `<path d="M-80,-50 L-34,-74 Q0,-50 34,-74 L80,-50 L104,6 L64,22 L58,74 L-58,74 L-64,22 L-104,6 Z" fill="#E8A33D" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/><path d="M-34,-74 Q0,-40 34,-74" fill="none" stroke="${C.red}" stroke-width="9"/><path d="M-58,62 L58,62" stroke="${C.red}" stroke-width="10"/><circle cx="-20" cy="10" r="6" fill="${C.red}"/><circle cx="20" cy="10" r="6" fill="${C.red}"/><circle cx="0" cy="34" r="6" fill="${C.red}"/>`; }
function dupattaIcon() { return `<path d="M-110,-70 L110,-70 L96,70 L-96,70 Z" fill="#F2C14E" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/><path d="M-104,-30 L104,-30 M-100,30 L100,30" stroke="${C.red}" stroke-width="10"/>` + [...Array(9)].map((_, i) => `<circle cx="${-88 + i * 22}" cy="0" r="5" fill="${C.red}"/>`).join('') + [...Array(10)].map((_, i) => `<path d="M${-92 + i * 20},70 v16" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/>`).join(''); }
function ticketSVG(label, col = C.gold, w = 300) { return `<g><path d="M${-w / 2},-70 H${w / 2} V-22 A22,22 0 0,0 ${w / 2},22 V70 H${-w / 2} V22 A22,22 0 0,0 ${-w / 2},-22 Z" fill="${col}" stroke="${OL}" stroke-width="${OW}"/><path d="M${w / 2 - 70},-62 V62" stroke="${OL}" stroke-width="3" stroke-dasharray="8 7"/><text x="-30" y="-6" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${C.redDark}">${label[0]}</text><text x="-30" y="34" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${C.redDark}">${label[1]}</text><path d="M${w / 2 - 36},-14 l6,12 13,2 -10,9 3,13 -12,-7 -12,7 3,-13 -10,-9 13,-2 z" fill="${C.red}"/></g>`; }
function seatSVG(x) { return `<path d="M${x - 78},${FLOOR + 160} L${x - 78},${FLOOR - 30} Q${x - 78},${FLOOR - 70} ${x - 40},${FLOOR - 70} L${x + 40},${FLOOR - 70} Q${x + 78},${FLOOR - 70} ${x + 78},${FLOOR - 30} L${x + 78},${FLOOR + 160} Z" fill="#8E1418" stroke="${OL}" stroke-width="${OW}"/><path d="M${x - 50},${FLOOR - 40} H${x + 50}" stroke="#6E0E11" stroke-width="6"/>`; }
function plateSVG(food) { let s = `<ellipse cx="0" cy="0" rx="78" ry="26" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><ellipse cx="0" cy="-4" rx="50" ry="14" fill="none" stroke="#E6E0D9" stroke-width="4"/>`; if (food) s += `<circle cx="-24" cy="-22" r="22" fill="#E8A33D" stroke="${OL}" stroke-width="4"/><circle cx="12" cy="-28" r="26" fill="#C0262D" stroke="${OL}" stroke-width="4"/><circle cx="36" cy="-14" r="18" fill="#5E8C4A" stroke="${OL}" stroke-width="4"/><path d="M-50,-10 Q0,-60 50,-10" fill="#F3E3C0" stroke="${OL}" stroke-width="4"/>`; return s; }
function stepCard(n) { return `<rect x="-110" y="-110" width="220" height="220" rx="34" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><rect x="-92" y="-92" width="184" height="184" rx="24" fill="none" stroke="${C.gold}" stroke-width="4"/><text x="0" y="48" text-anchor="middle" font-family="Inter" font-weight="900" font-size="140" fill="${C.gold}">${n}</text>`; }
// ----- Season ka sapna (2026-11-17): registerSVG(id, rows) + registerFill, bulbSVG, buzzSVG, arPostScreen, arBrowseScreen -----
// open booking register; rows `${id}-r${i}` start hidden, registerFill(id, t, t0, gap) writes them one by one
function registerSVG(id, rows = 6) {
  let s = `<g id="${id}"><path d="M-300,-210 Q-150,-240 0,-206 Q150,-240 300,-210 L300,230 Q150,200 0,234 Q-150,200 -300,230 Z" fill="#FFFDF7" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  s += `<path d="M0,-206 V234" stroke="${OL}" stroke-width="4"/><path d="M-300,-210 L-300,-190 M300,-210 L300,-190" stroke="${OL}" stroke-width="4"/>`;
  s += `<text x="-150" y="-160" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${C.red}" letter-spacing="2">BOOKINGS</text>`;
  for (let i = 0; i < rows; i++) {
    const side = i < rows / 2 ? -1 : 1, j = i % Math.ceil(rows / 2), y = -100 + j * 96;
    s += `<path d="M${side * 30},${y + 30} H${side * 280}" stroke="#E6D7BE" stroke-width="3"/>`;
    s += `<g id="${id}-r${i}" opacity="0"><path d="M${side < 0 ? -270 : 40},${y + 10} q20,-18 40,0 t40,0 t40,0 t40,0" fill="none" stroke="#2E4A7A" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M${side < 0 ? -80 : 210},${y + 6} l14,14 l26,-30" fill="none" stroke="${C.emerald}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  return s + `</g>`;
}
function registerFill(id, t, t0, gap = .35, rows = 6) { for (let i = 0; i < rows; i++) { const el = $(`${id}-r${i}`); if (!el) continue; const k = clamp((t - t0 - i * gap) / .25); op(el, k); tf(el, 0, 0, 1, 0, 0, 0); } }
// light bulb idea (rays as class="twinkle")
function bulbSVG(r = 70) {
  let s = '';
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += `<path class="twinkle" data-i="${i}" d="M${Math.cos(a) * r * 1.35},${Math.sin(a) * r * 1.35 - 10} L${Math.cos(a) * r * 1.75},${Math.sin(a) * r * 1.75 - 10}" stroke="${C.marigold}" stroke-width="10" stroke-linecap="round"/>`; }
  return s + `<path d="M${-r * .45},${r * .55} Q${-r},${r * .1} ${-r},${-r * .35} A${r},${r} 0 1,1 ${r},${-r * .35} Q${r},${r * .1} ${r * .45},${r * .55} Z" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-r * .45}" y="${r * .55}" width="${r * .9}" height="${r * .5}" rx="8" fill="${C.grey}" stroke="${OL}" stroke-width="4"/><path d="M${-r * .3},${-r * .1} q${r * .3},${r * .4} ${r * .6},0" fill="none" stroke="${C.marigold}" stroke-width="6"/>`;
}
// vibration lines either side of a buzzing phone
function buzzSVG(w = 70, h = 100) { return [-1, 1].map(sd => `<path d="M${sd * w},${-h * .4} q${sd * 16},${h * .2} 0,${h * .4} M${sd * (w + 22)},${-h * .55} q${sd * 22},${h * .3} 0,${h * .6}" fill="none" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/>`).join(''); }
// Anokhi Reet app screens drawn in our flat style, for phoneSVG(id, x, y, 560, 1000, inner) (centred on the phone)
function arHeader(y = -430) { return `<rect x="-264" y="${y - 38}" width="528" height="84" fill="url(#mar)"/><circle cx="-200" cy="${y + 4}" r="26" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/><circle cx="-200" cy="${y + 4}" r="14" fill="none" stroke="${C.red}" stroke-width="3"/><text x="-160" y="${y + 16}" font-family="Inter" font-weight="800" font-size="34" fill="${C.cream}">Anokhi Reet</text>`; }
function arPostScreen(line1, line2) {
  return arHeader() +
    `<rect x="-248" y="-360" width="496" height="470" rx="18" fill="${C.cream}"/>` +
    `<g transform="translate(0,-300)"><path d="M-200,0 H200 L180,60 H-180 Z" fill="${C.red}" stroke="${OL}" stroke-width="4"/>` + [0, 1, 2, 3, 4].map(i => `<path d="M${-180 + i * 80},60 q40,40 80,0" fill="${i % 2 ? C.cream : C.red}" stroke="${OL}" stroke-width="4"/>`).join('') + `</g>` +
    `<g transform="translate(-110,-40)">${lehengaHangerSVG('arp-l1', { c: '#C0262D', d: '#97151B', dupatta: '#F2A08F' }, .5)}</g><g transform="translate(110,-40)">${sherwaniHangerSVG('arp-s1', '#E8D3A5', '#C9AE6A', .55)}</g>` +
    `<text x="0" y="190" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="${C.text}">${line1}</text>` +
    `<text x="0" y="248" text-anchor="middle" font-family="Inter" font-weight="700" font-size="36" fill="${C.red}">${line2}</text>` +
    `<g transform="translate(-200,340)">${heartPath(0, 0, 1.6)}</g><rect x="-150" y="318" width="300" height="56" rx="28" fill="url(#mar)"/><text x="0" y="356" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="${C.cream}">Shop list karo</text>`;
}
function arBrowseScreen() {
  const chips = ['City', 'Occasion', 'Budget'];
  const cards = [{ k: 'l', c: '#C0262D', d: '#97151B', p: '#F2A08F' }, { k: 's', c: '#E8D3A5', d: '#C9AE6A' }, { k: 'l', c: C.emerald, d: C.emeraldDark, p: '#A6D3B0' }, { k: 'l', c: C.pink, d: C.pinkDark, p: '#F4B9C8' }];
  return arHeader() +
    chips.map((c, i) => `<g id="arb-c${i}" transform="translate(${-170 + i * 170},-330)"><rect x="-78" y="-30" width="156" height="60" rx="30" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><rect id="arb-c${i}-on" x="-78" y="-30" width="156" height="60" rx="30" fill="#141110" opacity="0"/><text x="0" y="11" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" fill="#655C57">${c}</text><text id="arb-c${i}-t" x="0" y="11" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" fill="#FFFFFF" opacity="0">${c}</text></g>`).join('') +
    cards.map((it, i) => { const x = i % 2 ? 125 : -125, y = i < 2 ? -110 : 250; return `<g id="arb-k${i}" transform="translate(${x},${y})"><rect x="-112" y="-170" width="224" height="330" rx="16" fill="#FFFFFF" stroke="#E6E0D9" stroke-width="3"/><rect x="-100" y="-158" width="200" height="230" rx="10" fill="${C.cream}"/><g transform="translate(0,-70)">${it.k === 's' ? sherwaniHangerSVG('arb-o' + i, it.c, it.d, .38) : lehengaHangerSVG('arb-o' + i, { c: it.c, d: it.d, dupatta: it.p }, .36)}</g><rect x="-96" y="94" width="130" height="16" rx="8" fill="#E6E0D9"/><rect x="-96" y="122" width="84" height="16" rx="8" fill="#F2EEE9"/><rect x="40" y="104" width="56" height="34" rx="17" fill="url(#mar)"/></g>`; }).join('');
}
function jarSVG(front) { const d = 'M-110,-150 L110,-150 L120,-120 Q140,-100 140,-60 L140,150 Q140,180 110,180 L-110,180 Q-140,180 -140,150 L-140,-60 Q-140,-100 -120,-120 Z'; return front ? `<path d="${d}" fill="#DCEFF5" fill-opacity=".14" stroke="${OL}" stroke-width="${OW}"/><path d="M-104,-60 V120" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".55"/><rect x="-120" y="-178" width="240" height="40" rx="12" fill="${C.goldTan}" stroke="${OL}" stroke-width="${OW}"/>` : `<path d="${d}" fill="#DCEFF5" fill-opacity=".6"/>`; }
