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
// ----- Last minute invitation (2026-11-17): phoneBackSVG, arOutfitScreen -----
// the back of a phone (screen hidden from the viewer): camera bump, maroon case
function phoneBackSVG(sc = 1) { return `<g transform="scale(${sc})"><rect x="-60" y="-110" width="120" height="220" rx="22" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><rect x="-44" y="-94" width="46" height="62" rx="12" fill="#2b0001" stroke="${OL}" stroke-width="3"/><circle cx="-21" cy="-78" r="9" fill="#555"/><circle cx="-21" cy="-48" r="9" fill="#555"/><circle cx="0" cy="40" r="20" fill="none" stroke="${C.goldTan}" stroke-width="4"/></g>`; }
// Anokhi Reet app: chips (City/Occasion/Budget with values) + one chosen outfit card from a shop + a Book button.
// ids: arO-c0..2 (chips; arO-cN-on to select), arO-card, arO-btn (Book) and arO-done ("Booked ✅", start hidden)
function arOutfitScreen(o = {}) {
  const chips = o.chips || ['Ahmedabad', 'Sangeet', '₹2,000 tak'];
  const look = o.look || { c: C.marigold2, d: '#D9A52E', b: C.red, dupatta: '#E26A8A' };
  return arHeader() +
    chips.map((c, i) => `<g id="arO-c${i}" transform="translate(${-170 + i * 170},-330)"><rect x="-80" y="-30" width="160" height="60" rx="30" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><rect id="arO-c${i}-on" x="-80" y="-30" width="160" height="60" rx="30" fill="#141110" opacity="0"/><text x="0" y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${c.length > 9 ? 22 : 26}" fill="#655C57">${c}</text><text id="arO-c${i}-t" x="0" y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${c.length > 9 ? 22 : 26}" fill="#fff" opacity="0">${c}</text></g>`).join('') +
    `<g id="arO-card"><rect x="-230" y="-270" width="460" height="560" rx="22" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-210" y="-250" width="420" height="360" rx="16" fill="${C.cream}"/>` +
    `<g transform="translate(0,-120)">${lehengaHangerSVG('arO-o', look, .62)}</g>` +
    `<text x="-200" y="160" font-family="Inter" font-weight="800" font-size="34" fill="#141110">${o.title || 'Yellow chaniya choli'}</text>` +
    `<text x="-200" y="204" font-family="Inter" font-weight="600" font-size="28" fill="#655C57">${o.shop || 'Shop · office ke paas'}</text>` +
    `<rect x="-200" y="228" width="96" height="40" rx="20" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="3"/><text x="-152" y="256" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${C.red}">Rent</text></g>` +
    `<g id="arO-btn"><rect x="-230" y="320" width="460" height="84" rx="42" fill="url(#mar)"/><text x="0" y="374" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="${C.cream}">Book karo</text></g>` +
    `<g id="arO-done" opacity="0"><rect x="-230" y="320" width="460" height="84" rx="42" fill="#1F7A4D"/><text x="0" y="374" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="#fff">Booked ✓</text></g>`;
}
function jarSVG(front) { const d = 'M-110,-150 L110,-150 L120,-120 Q140,-100 140,-60 L140,150 Q140,180 110,180 L-110,180 Q-140,180 -140,150 L-140,-60 Q-140,-100 -120,-120 Z'; return front ? `<path d="${d}" fill="#DCEFF5" fill-opacity=".14" stroke="${OL}" stroke-width="${OW}"/><path d="M-104,-60 V120" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".55"/><rect x="-120" y="-178" width="240" height="40" rx="12" fill="${C.goldTan}" stroke="${OL}" stroke-width="${OW}"/>` : `<path d="${d}" fill="#DCEFF5" fill-opacity=".6"/>`; }

// ===== Shop and money props (from the Kavita reel, 2026-11-17). Centred on (0,0) unless said. =====
// kurtiSVG(c, d, sc) hanging kurti · gallaSVG(id) cash box: drawer `${id}-dr` (move down to open), `${id}-in` for
// what's inside · calculatorSVG(id, txt) screen text `${id}-scr` · ledgerSVG() open account book ·
// jewelBoxSVG(id) lid `${id}-lid` (rotate to open) · chocolateSVG() fancy truffle · toffeeSVG(c) wrapped toffee ·
// noteSVG() rupee note · personIcon(col) small customer · ideaBulbSVG() big idea bulb with rays · shutterSVG(id, w, h) rolling
// shutter `${id}-sh` (scale y to roll up) · dryCleanIcon() · needleIcon()
function kurtiSVG(c = C.pink, d = C.pinkDark, sc = 1) {
  return `<g transform="scale(${sc})"><path d="M0,-10 Q0,-30 12,-28 Q22,-24 16,-14" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M-60,10 L0,-12 L60,10" fill="none" stroke="${C.woodDark}" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M-30,6 L-70,30 L-96,120 L-66,130 L-52,80 L-58,300 L58,300 L52,80 L66,130 L96,120 L70,30 L30,6 Q0,34 -30,6 Z" fill="${c}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M-30,6 Q0,34 30,6" fill="none" stroke="${C.gold}" stroke-width="7"/><path d="M0,30 V110" stroke="${d}" stroke-width="5"/>` +
    `<path d="M-56,270 H56" stroke="${C.gold}" stroke-width="10"/>` + [0, 1, 2].map(i => `<circle cx="${-24 + i * 24}" cy="190" r="6" fill="${d}"/>`).join('') + `</g>`;
}
function gallaSVG(id) {
  return `<g id="${id}"><rect x="-150" y="-110" width="300" height="130" rx="12" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-130" y="-92" width="260" height="96" rx="6" fill="#3E2A14"/><g id="${id}-in"></g>` +
    `<g id="${id}-dr"><rect x="-140" y="-40" width="280" height="80" rx="10" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-36" y="-8" width="72" height="16" rx="8" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g></g>`;
}
function calculatorSVG(id, txt = '0') {
  let s = `<g id="${id}"><rect x="-150" y="-210" width="300" height="420" rx="30" fill="#3F3A36" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-120" y="-180" width="240" height="96" rx="12" fill="#CFE3C8" stroke="${OL}" stroke-width="4"/>` +
    `<text id="${id}-scr" x="104" y="-112" text-anchor="end" font-family="Inter" font-weight="800" font-size="56" fill="#24331F">${txt}</text>`;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) s += `<rect x="${-120 + c * 62}" y="${-62 + r * 64}" width="52" height="50" rx="12" fill="${c === 3 ? C.marigold : '#ECE6DE'}" stroke="${OL}" stroke-width="3"/>`;
  return s + `</g>`;
}
function ledgerSVG() {
  let s = `<path d="M0,-6 L-230,-30 L-230,130 L0,150 Z" fill="#FFFDF7" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/><path d="M0,-6 L230,-30 L230,130 L0,150 Z" fill="#FFFDF7" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M-205,${-4 + i * 28} L-25,${14 + i * 28} M25,${14 + i * 28} L205,${-4 + i * 28}" stroke="#C9B9A0" stroke-width="4"/>`;
  return s + `<path d="M-205,0 L-25,18" stroke="${C.red}" stroke-width="5"/>`;
}
function jewelBoxSVG(id) {
  return `<g id="${id}"><g id="${id}-lid"><path d="M-120,-60 L120,-60 L120,-150 Q120,-170 100,-170 L-100,-170 Q-120,-170 -120,-150 Z" fill="${C.red}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<rect x="-100" y="-152" width="200" height="72" rx="10" fill="#F4E3E6" stroke="${OL}" stroke-width="3"/><circle cx="0" cy="-116" r="14" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g>` +
    `<rect x="-124" y="-60" width="248" height="110" rx="12" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><rect x="-104" y="-52" width="208" height="56" rx="8" fill="#5C0A12"/>` +
    `<path d="M-70,-50 Q0,30 70,-50" fill="none" stroke="${C.gold}" stroke-width="10" stroke-linecap="round"/>` +
    [-50, -25, 0, 25, 50].map((x, i) => `<circle cx="${x}" cy="${-8 - Math.abs(x) * .5}" r="${i === 2 ? 13 : 8}" fill="${i === 2 ? '#C0262D' : C.gold}" stroke="${OL}" stroke-width="3"/>`).join('') +
    `<path d="M-124,10 H124" stroke="${C.gold}" stroke-width="6"/></g>`;
}
function chocolateSVG() {
  return `<ellipse cx="0" cy="70" rx="120" ry="26" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-90,60 L-70,-10 L70,-10 L90,60 Z" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    [-50, -16, 18, 52].map(x => `<path d="M${x},-6 L${x * 1.2},56" stroke="#C99A2E" stroke-width="5"/>`).join('') +
    `<path d="M-74,-6 Q-80,-110 0,-112 Q80,-110 74,-6 Z" fill="#5A3420" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-50,-60 Q-20,-80 10,-60 Q40,-80 60,-56" fill="none" stroke="#8A5A3A" stroke-width="8" stroke-linecap="round"/><circle cx="-30" cy="-86" r="6" fill="${C.gold}"/><circle cx="24" cy="-92" r="5" fill="${C.gold}"/>`;
}
function toffeeSVG(c = C.pink) {
  return `<path d="M-46,0 L-86,-30 L-80,30 Z M46,0 L86,-30 L80,30 Z" fill="${c}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>` +
    `<ellipse cx="0" cy="0" rx="52" ry="34" fill="${c}" stroke="${OL}" stroke-width="${OW}"/><path d="M-30,-12 Q0,-24 30,-12" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>`;
}
function noteSVG() {
  return `<rect x="-80" y="-40" width="160" height="80" rx="8" fill="#BFD9A8" stroke="${OL}" stroke-width="4"/><rect x="-66" y="-28" width="132" height="56" rx="6" fill="none" stroke="#7FA868" stroke-width="3"/>` +
    `<circle cx="0" cy="0" r="22" fill="#DCEBCF" stroke="#7FA868" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="900" font-size="28" fill="#3F6B33">₹</text>`;
}
function personIcon(col = C.goldTan) {
  return `<path d="M-46,70 Q-46,10 0,8 Q46,10 46,70 Z" fill="${col}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><circle cx="0" cy="-22" r="28" fill="${C.skinLight}" stroke="${OL}" stroke-width="4"/><path d="M-28,-26 Q-26,-56 0,-54 Q26,-56 28,-26 Q14,-40 0,-38 Q-14,-40 -28,-26 Z" fill="${C.hair}"/>`;
}
function ideaBulbSVG() {
  return `<circle r="160" fill="url(#glow)"/><path d="M-50,10 Q-80,-30 -70,-70 Q-50,-130 0,-130 Q50,-130 70,-70 Q80,-30 50,10 L40,40 L-40,40 Z" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<rect x="-38" y="40" width="76" height="40" rx="8" fill="#B9B2A8" stroke="${OL}" stroke-width="4"/><path d="M-38,58 H38" stroke="${OL}" stroke-width="3"/><path d="M-16,0 Q0,-40 16,0" fill="none" stroke="#C9821E" stroke-width="6"/>` +
    [[-120, -60], [120, -60], [-100, -150], [100, -150], [0, -190]].map(([x, y]) => `<path d="M${x * .8},${y * .8} L${x},${y}" stroke="${C.gold}" stroke-width="10" stroke-linecap="round"/>`).join('');
}
function shutterSVG(id, w = W, h = 1100) {
  let s = `<g id="${id}-sh"><rect x="0" y="0" width="${w}" height="${h}" fill="#A7A39C" stroke="${OL}" stroke-width="${OW}"/>`;
  for (let y = 40; y < h; y += 40) s += `<path d="M0,${y} H${w}" stroke="#8C8880" stroke-width="5"/>`;
  return s + `<rect x="${w / 2 - 70}" y="${h - 36}" width="140" height="24" rx="10" fill="#6E6A64" stroke="${OL}" stroke-width="3"/></g>`;
}
function dryCleanIcon() {
  return `<circle r="100" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><path d="M0,-50 Q0,-66 12,-64 Q22,-60 16,-50" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><path d="M-60,-10 L0,-46 L60,-10 Z" fill="none" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>` +
    [[-30, 30, 16], [10, 40, 12], [36, 20, 9], [-6, 64, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#CFE6EE" stroke="${OL}" stroke-width="3"/>`).join('');
}
function needleIcon() {
  return `<circle r="100" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><path d="M-50,50 L44,-44" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-50,50 L44,-44" stroke="#D8D4CE" stroke-width="6" stroke-linecap="round"/>` +
    `<ellipse cx="36" cy="-36" rx="6" ry="12" transform="rotate(45,36,-36)" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M38,-38 Q80,-10 40,30 Q0,70 -40,40" fill="none" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/>`;
}

// ===== Meena ki dukaan (2026-11-17): hotel room, city map, chat screen, chai, booking toast, cobweb =====
// hotelRoomBG(id, {night}) an empty hotel room: bed, side lamp, window, door with a number, wall calendar spot
function hotelRoomBG(id, o = {}) {
  const night = o.night !== false;
  let s = `<rect width="${W}" height="${H}" fill="${night ? '#3E3A5C' : '#EDE3D3'}"/><rect x="0" y="${FLOOR - 240}" width="${W}" height="240" fill="${night ? '#35314F' : '#E3D6C1'}"/>`;
  s += windowSVG(90, 420, 230, 280, { night, curtain: '#6B4A7A' });
  s += `<g transform="translate(900,${FLOOR})"><rect x="-110" y="-560" width="220" height="560" rx="8" fill="${night ? '#6B4F3A' : C.wood}" stroke="${OL}" stroke-width="${OW}"/><rect x="-70" y="-500" width="140" height="44" rx="8" fill="${C.gold}" stroke="${OL}" stroke-width="4"/><text y="-468" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="${C.redDark}">203</text><circle cx="80" cy="-280" r="10" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g>`;
  s += `<g transform="translate(470,${FLOOR})"><rect x="-300" y="-330" width="40" height="330" rx="10" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-280" y="-190" width="600" height="130" rx="20" fill="#FFFFFF" stroke="${OL}" stroke-width="${OW}"/><rect x="-280" y="-120" width="600" height="80" rx="14" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-250" y="-250" width="150" height="80" rx="30" fill="#FFFFFF" stroke="${OL}" stroke-width="${OW}"/><rect x="-80" y="-250" width="150" height="80" rx="30" fill="#FFFFFF" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-280" y="-60" width="600" height="60" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/></g>`;
  s += `<g transform="translate(80,${FLOOR - 60})"><rect x="-50" y="-70" width="100" height="130" rx="8" fill="${C.woodDark}" stroke="${OL}" stroke-width="4"/>${lampSVG(0, 0).replace('<g transform="translate(0,0)">', '<g transform="translate(0,-200)">')}</g>`;
  if (night) s += `<circle cx="80" cy="${FLOOR - 220}" r="160" fill="url(#glow)" opacity=".7"/>`;
  s += `<rect x="0" y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="${night ? '#4A3B33' : '#A47648'}"/><rect x="-10" y="${FLOOR - 14}" width="${W + 20}" height="18" fill="${C.woodDark}" stroke="${OL}" stroke-width="4"/>`;
  return s;
}
// mapPinSVG(col): a map pin with its tip at (0,0)
function mapPinSVG(col = C.red, r = 34) {
  return `<path d="M0,0 C${-r * .3},${-r * .9} ${-r},${-r * 1.4} ${-r},${-r * 2.1} A${r},${r} 0 1,1 ${r},${-r * 2.1} C${r},${-r * 1.4} ${r * .3},${-r * .9} 0,0 Z" fill="${col}" stroke="${OL}" stroke-width="4"/><circle cx="0" cy="${-r * 2.1}" r="${r * .4}" fill="#fff" stroke="${OL}" stroke-width="3"/>`;
}
// cityMapSVG(id, areas): a flat city map (parks, river, roads) with area name labels [[name, x, y], ...] (relative to centre)
function cityMapSVG(id, areas = []) {
  let s = `<g id="${id}"><rect x="-470" y="-560" width="940" height="1120" rx="40" fill="#F4EDE1" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<path d="M-470,-120 C-260,-60 -120,-220 60,-160 S320,-60 470,-140 L470,-80 C320,0 200,-110 60,-100 S-260,0 -470,-60 Z" fill="#BFE0EA" stroke="#8FBFCF" stroke-width="4"/>`;
  for (const [x, y, w, h] of [[-380, -480, 200, 160], [200, 240, 220, 180], [-360, 260, 160, 220], [180, -470, 220, 150]]) s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="#CFE3BF"/>`;
  for (const x of [-250, 0, 250]) s += `<path d="M${x},-550 V550" stroke="#fff" stroke-width="26"/><path d="M${x},-550 V550" stroke="#E6DCCB" stroke-width="4" stroke-dasharray="18 16"/>`;
  for (const y of [-330, 60, 400]) s += `<path d="M-460,${y} H460" stroke="#fff" stroke-width="26"/>`;
  s += areas.map(([n, x, y]) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" fill="#7A6E62">${n}</text>`).join('');
  return s + `</g>`;
}
// chatScreen(id, n): a generic chat inside phoneSVG (centred): header + n photo messages `${id}-m${i}` (pop them in)
function chatScreen(id, n = 6, w = 400, h = 800) {
  const top = -h / 2 + 16;
  let s = `<rect x="${-w / 2 + 16}" y="${top}" width="${w - 32}" height="${h - 32}" rx="42" fill="#EFE7DA"/>`;
  s += `<path d="M${-w / 2 + 16},${top + 42} Q${-w / 2 + 16},${top} ${-w / 2 + 58},${top} L${w / 2 - 58},${top} Q${w / 2 - 16},${top} ${w / 2 - 16},${top + 42} L${w / 2 - 16},${top + 100} L${-w / 2 + 16},${top + 100} Z" fill="${C.tealDark}"/>`;
  s += `<circle cx="${-w / 2 + 70}" cy="${top + 62}" r="24" fill="${C.goldTan}"/><text x="${-w / 2 + 108}" y="${top + 72}" font-family="Inter" font-weight="800" font-size="28" fill="#fff">Customer</text>`;
  const cols = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E']];
  for (let i = 0; i < n; i++) {
    const [c, d] = cols[i % cols.length], y = top + 130 + i * 110, x = i % 2 ? 40 : 60;
    s += `<g id="${id}-m${i}" transform="translate(${x},${y})"><rect x="-130" y="0" width="230" height="96" rx="16" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/><rect x="-120" y="10" width="76" height="76" rx="10" fill="${C.cream}"/><g transform="translate(-82,40) scale(.2)">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan })}</g><rect x="-34" y="26" width="110" height="14" rx="7" fill="#B9D9A6"/><rect x="-34" y="52" width="70" height="14" rx="7" fill="#B9D9A6"/><path d="M60,78 l8,8 14,-14 M72,78 l8,8 14,-14" stroke="#3E9BD6" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
  }
  return s;
}
// chaiSVG(): a cutting-chai glass with steam (class="sway" on the steam)
function chaiSVG() {
  return `<g class="sway"><path d="M-14,-70 q-14,-20 0,-40 q14,-20 0,-40 M14,-70 q-14,-20 0,-40 q14,-20 0,-40" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/></g>` +
    `<path d="M-46,-60 L46,-60 L36,40 L-36,40 Z" fill="#E9F4F8" fill-opacity=".6" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/><path d="M-42,-34 L42,-34 L36,36 L-36,36 Z" fill="#C88A4E"/><path d="M-46,-60 L46,-60" stroke="${OL}" stroke-width="${OW}"/>`;
}
// toastSVG(text, w): a booking notification card (white, rounded, green tick) centred on (0,0)
function toastSVG(text, w = 520) {
  return `<rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="26" fill="#FFFFFF" stroke="${OL}" stroke-width="4"/><circle cx="${-w / 2 + 50}" cy="0" r="28" fill="${C.emerald}" stroke="${OL}" stroke-width="3"/><path d="M${-w / 2 + 38},0 l9,9 17,-17" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="${-w / 2 + 96}" y="11" font-family="Inter" font-weight="800" font-size="32" fill="${C.text}">${text}</text>`;
}
// cobwebSVG(sc): a corner cobweb (top-left corner at 0,0)
function cobwebSVG(sc = 1) {
  let s = `<g transform="scale(${sc})" fill="none" stroke="#FFFFFF" stroke-width="3" opacity=".85">`;
  for (const a of [0, 22, 45, 68, 90]) { const r = a * Math.PI / 180; s += `<path d="M0,0 L${Math.cos(r) * 150},${Math.sin(r) * 150}"/>`; }
  for (const R of [40, 80, 120]) { let d = ''; [0, 22, 45, 68, 90].forEach((a, i) => { const r = a * Math.PI / 180; d += `${i ? 'Q' + (Math.cos(r - .2) * R * .86).toFixed(0) + ',' + (Math.sin(r - .2) * R * .86).toFixed(0) + ' ' : 'M'}${(Math.cos(r) * R).toFixed(0)},${(Math.sin(r) * R).toFixed(0)} `; }); s += `<path d="${d}"/>`; }
  return s + `</g>`;
}

// ===== Lehenga 2X (2026-11-18): coin jar that fills to a line, city map spotlight =====
// coinJarSVG(id, n, label): a glass jar with n coins `${id}-k${i}` (bottom first; show them with jarFill) and a dashed
// target line with a label at the n-th coin. jarFill(id, n, t, t0, d) drops the coins in one by one over d seconds.
function coinJarSVG(id, n = 10, label = '') {
  const pos = [...Array(n)].map((_, i) => [-84 + (i % 4) * 56 + ((i / 4 | 0) % 2) * 28, 150 - (i / 4 | 0) * 30]);
  const topY = pos[n - 1][1] - 30;
  return `<g id="${id}">${jarSVG(0)}` + pos.map(([x, y], i) => `<g transform="translate(${x},${y})"><g id="${id}-k${i}" opacity="0">${coinSVG(0, 0, 26)}</g></g>`).join('') + jarSVG(1) +
    (label ? `<path d="M-160,${topY} H160" stroke="${C.red}" stroke-width="6" stroke-dasharray="16 10"/><g transform="translate(0,${topY - 40})"><rect x="-110" y="-26" width="220" height="52" rx="26" fill="#fff" stroke="${OL}" stroke-width="3"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${C.red}">${label}</text></g>` : '') + `</g>`;
}
function jarFill(id, n, t, t0, d) {
  for (let i = 0; i < n; i++) { const el = $(`${id}-k${i}`); if (!el) continue; const k = clamp((t - t0 - i * d / n) / .25); op(el, k > 0 ? 1 : 0); tf(el, 0, (1 - E.back(k)) * -120, 1); }
}
// mapSpotSVG(id, x, y): a grey veil over a cityMapSVG (same centre) with a round lit hole at (x, y); mapSpot(id, x, y, r)
// changes the hole's size (r 0 = all grey, r 1400 = all lit).
function mapSpotSVG(id) { return `<path id="${id}" fill="#5C554D" fill-opacity=".55" fill-rule="evenodd" d=""/>`; }
function mapSpot(id, x, y, r) {
  $(id).setAttribute('d', `M-470,-560 H470 V560 H-470 Z M${x - r},${y} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0 Z`);
}
