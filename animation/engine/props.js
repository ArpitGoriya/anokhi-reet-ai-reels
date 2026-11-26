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

// ===== Nisha's almirah (2026-11-18): covered lehenga, lock, plain book, pocket =====
// coveredLehengaSVG(c, d, sc): a lehenga on a hanger inside a clear plastic cover (zip line), centred on the hanger hook
function coveredLehengaSVG(c = C.lehenga, d = C.lehengaDark, sc = 1) {
  return `<g transform="scale(${sc})">${lehengaHangerSVG('', { c, d, dupatta: C.goldTan })}` +
    `<path d="M-96,-60 L96,-60 L170,290 Q0,320 -170,290 Z" fill="#E9F4F8" fill-opacity=".45" stroke="#9FB7C2" stroke-width="5" stroke-linejoin="round"/>` +
    `<path d="M0,-60 V300" stroke="#9FB7C2" stroke-width="4" stroke-dasharray="8 6"/><path d="M-60,-20 L-110,200" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".7"/></g>`;
}
// lockSVG(): a padlock centred on (0,0)
function lockSVG() {
  return `<path d="M-34,-10 V-44 Q-34,-80 0,-80 Q34,-80 34,-44 V-10" fill="none" stroke="${OL}" stroke-width="16"/><path d="M-34,-10 V-44 Q-34,-80 0,-80 Q34,-80 34,-44 V-10" fill="none" stroke="#B9B2A8" stroke-width="8"/>` +
    `<rect x="-56" y="-14" width="112" height="90" rx="14" fill="${C.gold}" stroke="${OL}" stroke-width="${OW}"/><circle cx="0" cy="22" r="10" fill="${OL}"/><path d="M0,26 V50" stroke="${OL}" stroke-width="8" stroke-linecap="round"/>`;
}
// plainBookSVG(lines): a plain hardback with a title only (no real cover art), centred on (0,0)
function plainBookSVG(lines = ['BOOK']) {
  return `<rect x="-150" y="-200" width="300" height="400" rx="14" fill="#2F5D57" stroke="${OL}" stroke-width="${OW}"/><rect x="-150" y="-200" width="34" height="400" rx="10" fill="#22605C" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-100" y="-120" width="220" height="${lines.length * 52 + 40}" rx="10" fill="${C.cream}"/>` +
    lines.map((l, i) => `<text x="10" y="${-72 + i * 52}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="#22605C">${l}</text>`).join('');
}
// pocketSVG(col): a trouser pocket shape (opening at the top, y = -60), centred on (0,0)
function pocketSVG(col = '#5B6C8F') {
  return `<path d="M-150,-60 L150,-60 L140,110 Q0,180 -140,110 Z" fill="${col}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M-120,-60 Q0,30 120,-60" fill="#3E4A63" stroke="${OL}" stroke-width="4"/><path d="M-130,90 Q0,150 130,90" fill="none" stroke="#F4EFE3" stroke-width="4" stroke-dasharray="10 8"/>`;
}

// ===== Sawal bahut hain (2026-11-19): question bubbles that pop, stamp, computer, plans / WhatsApp-style / shop screens =====
// qBubbleSVG(id, text, {fs, tail: [dx, dy]}): a white question bubble (marigold "?" disc + text) centred on (0,0), with
// two tail dots towards the thinker's head at tail. Ids: `${id}-b` (bubble), `${id}-bu` (confetti burst, hidden).
// In upd: bubblePop(id, t, tPop) wobbles it, swells it just before tPop, then bursts it into confetti (tPop null = no pop).
const BURST_COLS = [C.gold, C.red, C.pink, C.teal, C.marigold, C.emerald];
function qBubbleSVG(id, text, o = {}) {
  const fs = o.fs || 40, h = Math.round(fs * 2), w = Math.round(text.length * fs * .54 + h + 44);
  const tl = o.tail || [0, h / 2 + 60];
  let s = `<g id="${id}"><g id="${id}-b">`;
  s += [[.42, 15], [.78, 10]].map(([k, r]) => `<circle cx="${(tl[0] * k).toFixed(1)}" cy="${(tl[1] * k).toFixed(1)}" r="${r}" fill="#fff" stroke="${OL}" stroke-width="4"/>`).join('');
  s += `<rect x="${-w / 2}" y="${-h / 2 + 8}" width="${w}" height="${h}" rx="${h / 2}" fill="${OL}" opacity=".16"/>`;
  s += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>`;
  s += `<circle cx="${-w / 2 + h / 2 + 4}" cy="0" r="${h * .32}" fill="${C.marigold2}" stroke="${OL}" stroke-width="4"/>`;
  s += `<text x="${-w / 2 + h / 2 + 4}" y="${fs * .36}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="${C.redDark}">?</text>`;
  s += `<text x="${-w / 2 + h + 10}" y="${fs * .36}" font-family="Inter" font-weight="800" font-size="${fs}" fill="${C.text}">${text}</text></g>`;
  s += `<g id="${id}-bu" opacity="0"><circle id="${id}-ring" r="40" fill="none" stroke="${C.gold}" stroke-width="10"/>`;
  for (let i = 0; i < 12; i++) s += `<g id="${id}-p${i}">${i % 3 ? `<rect x="-11" y="-6" width="22" height="12" rx="4" fill="${BURST_COLS[i % 6]}" stroke="${OL}" stroke-width="3"/>` : `<circle r="10" fill="${BURST_COLS[i % 6]}" stroke="${OL}" stroke-width="3"/>`}</g>`;
  return s + `</g></g>`;
}
function bubblePop(id, t, tp = null, R = 190) {
  const b = $(`${id}-b`), bu = $(`${id}-bu`);
  if (!b) return;
  if (tp === null || t < tp) {
    const sw = tp === null ? 0 : E.in(clamp((t - (tp - .18)) / .18));
    tf(b, 0, Math.sin(t * 2.3 + id.length) * 4, 1 + Math.sin(t * 3.1 + id.length) * .012 + sw * .14);
    op(b, 1); op(bu, 0); return;
  }
  op(b, 0);
  const k = clamp((t - tp) / .55), e = E.out(k);
  op(bu, 1 - k * k);
  const ring = $(`${id}-ring`); if (ring) { ring.setAttribute('r', (40 + e * R * .8).toFixed(1)); ring.setAttribute('stroke-width', (10 * (1 - k)).toFixed(1)); }
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + .3, rr = R * e * (i % 2 ? .75 : 1); tf($(`${id}-p${i}`), Math.cos(a) * rr, Math.sin(a) * rr + k * k * 60, 1, i * 40 + k * 260); }
}
// stampSVG(text): a big gold rubber-stamp word with a maroon double border, centred on (0,0). stampIn(el, t, t0, x, y) slams it in.
function stampSVG(text, fs = 150) {
  const w = text.length * fs * .72 + 110, h = fs * 1.5;
  return `<rect x="${-w / 2}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="30" fill="${OL}" opacity=".18"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="${C.gold}" stroke="${C.redDark}" stroke-width="12"/>` +
    `<rect x="${-w / 2 + 20}" y="${-h / 2 + 20}" width="${w - 40}" height="${h - 40}" rx="18" fill="none" stroke="${C.red}" stroke-width="5"/>` +
    `<text y="${fs * .36}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="${C.red}" letter-spacing="4">${text}</text>`;
}
function stampIn(el, t, t0, x, y, rot = -8) {
  if (t < t0) { op(el, 0); return; }
  const k = clamp((t - t0) / .22), lt = t - t0 - .22;
  const s = k < 1 ? lerp(2.2, 1, E.in(k)) : 1 + (lt < .3 ? Math.sin(lt / .3 * Math.PI) * .06 : 0);
  tf(el, x, y, s, rot); op(el, clamp(k * 3));
}
// computerSVG(): a desktop computer (monitor, stand, keyboard), centred on the screen. crossSVG(r): a big red cross.
function computerSVG() {
  return `<rect x="-140" y="-110" width="280" height="190" rx="16" fill="#3A3330" stroke="${OL}" stroke-width="${OW}"/><rect x="-122" y="-92" width="244" height="150" rx="8" fill="${C.sky}"/>` +
    `<path d="M-90,-60 H40 M-90,-30 H80 M-90,0 H20" stroke="#fff" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M-24,80 L-34,120 H34 L24,80 Z" fill="#5A524D" stroke="${OL}" stroke-width="4"/><rect x="-150" y="130" width="300" height="40" rx="10" fill="#D8D2C8" stroke="${OL}" stroke-width="4"/>` +
    [...Array(8)].map((_, i) => `<rect x="${-134 + i * 34}" y="139" width="26" height="9" rx="3" fill="#B9B2A8"/><rect x="${-134 + i * 34}" y="152" width="26" height="9" rx="3" fill="#B9B2A8"/>`).join('');
}
function crossSVG(r = 120) { return `<path d="M${-r},${-r} L${r},${r} M${r},${-r} L${-r},${r}" stroke="${OL}" stroke-width="40" stroke-linecap="round"/><path d="M${-r},${-r} L${r},${r} M${r},${-r} L${-r},${r}" stroke="#D9363E" stroke-width="26" stroke-linecap="round"/>`; }
// Screens for phoneSVG(id, x, y, 560, 1000, inner), centred on the phone.
// arPlansScreen(id): the Anokhi Reet plans page without prices: title, three plan cards (`${id}-k0..2`), a selection
// ring on the middle one (`${id}-on`, starts hidden) and a "Shop list karo" button.
function arPlansScreen(id) {
  let s = arHeader() + `<text x="-236" y="-318" font-family="Inter" font-weight="900" font-size="46" fill="#141110">Plans</text>` +
    `<text x="-236" y="-276" font-family="Inter" font-weight="600" font-size="27" fill="#655C57">Apni shop ke hisaab se chuno</text>`;
  [-140, 60, 260].forEach((y, i) => {
    s += `<g id="${id}-k${i}" transform="translate(0,${y})"><rect x="-240" y="-84" width="480" height="168" rx="20" fill="#fff" stroke="#E6E0D9" stroke-width="4"/>` +
      `<circle cx="-166" cy="0" r="44" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="5"/><circle cx="-166" cy="0" r="24" fill="none" stroke="${C.red}" stroke-width="4" stroke-dasharray="4 5"/>` +
      `<rect x="-100" y="-46" width="${150 + i * 40}" height="24" rx="12" fill="#141110"/><rect x="-100" y="-6" width="250" height="16" rx="8" fill="#E6E0D9"/><rect x="-100" y="22" width="190" height="16" rx="8" fill="#E6E0D9"/>` +
      `<path d="M196,-14 l14,14 -14,14" fill="none" stroke="#655C57" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  });
  s += `<g id="${id}-on" opacity="0"><rect x="-248" y="-32" width="496" height="184" rx="24" fill="none" stroke="#141110" stroke-width="8"/><circle cx="196" cy="60" r="30" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><path d="M182,60 l10,10 18,-18" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return s + `<rect x="-236" y="380" width="472" height="80" rx="40" fill="url(#mar)"/><text x="0" y="432" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="${C.cream}">Shop list karo</text>`;
}
// waChatScreen(ats): a WhatsApp-style chat with Anokhi Reet (generic colours, no app logo): hello, photos + rent price,
// and the "shop live" reply; message i pops at ats[i] (caption refs). name: the chat's title ("? ? ?" to keep the app a secret).
function waChatScreen(ats = ['-1', '-1', '-1'], name = 'Anokhi Reet') {
  let s = `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#EFE7DA"/>` +
    `<path d="M-264,-442 Q-264,-484 -222,-484 L222,-484 Q264,-484 264,-442 L264,-360 L-264,-360 Z" fill="${C.tealDark}"/>` +
    `<circle cx="-196" cy="-410" r="32" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/><circle cx="-196" cy="-410" r="17" fill="none" stroke="${C.red}" stroke-width="4"/>` +
    `<text x="-148" y="-404" font-family="Inter" font-weight="800" font-size="34" fill="#fff">${name}</text><text x="-148" y="-374" font-family="Inter" font-weight="600" font-size="22" fill="#CFE6E0">online</text>`;
  const tick = (x, y) => `<path d="M${x},${y} l7,7 13,-13 M${x + 11},${y} l7,7 13,-13" stroke="#3E9BD6" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += `<g transform="translate(90,-250)"><g data-t="${ats[0]}"><rect x="-160" y="-62" width="320" height="124" rx="22" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/>` +
    `<text x="-136" y="-12" font-family="Inter" font-weight="800" font-size="32" fill="#141110">Namaste! 🙏</text><text x="-136" y="30" font-family="Inter" font-weight="600" font-size="28" fill="#141110">Shop list karni hai</text>${tick(100, 40)}</g></g>`;
  const cols = [[C.lehenga, C.lehengaDark, '#E8C25E'], [C.pink, C.pinkDark, '#F4B9C8'], [C.emerald, C.emeraldDark, '#A6D3B0']];
  s += `<g transform="translate(60,20)"><g data-t="${ats[1]}"><rect x="-190" y="-110" width="380" height="250" rx="22" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/>` +
    cols.map(([c, d, p], i) => `<rect x="${-174 + i * 118}" y="-96" width="108" height="140" rx="12" fill="${C.cream}"/><g transform="translate(${-120 + i * 118},-20)">${lehengaHangerSVG('', { c, d, dupatta: p }, .27)}</g>`).join('') +
    `<text x="-170" y="94" font-family="Inter" font-weight="800" font-size="28" fill="#141110">📸 Photos + rent price</text>${tick(140, 112)}</g></g>`;
  s += `<g transform="translate(-60,260)"><g data-t="${ats[2]}"><rect x="-190" y="-56" width="380" height="112" rx="22" fill="#fff" stroke="#E6E0D9" stroke-width="3"/>` +
    `<text x="-164" y="12" font-family="Inter" font-weight="900" font-size="34" fill="${C.emerald}">✅ Aapki shop live!</text></g></g>`;
  return s + `<rect x="-244" y="400" width="400" height="64" rx="32" fill="#fff"/><circle cx="210" cy="432" r="34" fill="${C.tealDark}"/><path d="M196,416 L230,432 L196,448 L202,432 Z" fill="#fff"/>`;
}
// arShopScreen(name, liveAt): a shop's page in the app: banner with the shop name, a green "Live" badge that pops at
// liveAt, and a 2x2 grid of outfits.
function arShopScreen(name, liveAt = '-1') {
  let s = arHeader() + `<rect x="-244" y="-372" width="488" height="190" rx="20" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/>` +
    `<g transform="translate(-170,-300)"><path d="M-50,-30 H50 L60,0 H-60 Z" fill="${C.red}" stroke="${OL}" stroke-width="4"/>` + [0, 1, 2].map(i => `<path d="M${-60 + i * 40},0 q20,22 40,0" fill="${i % 2 ? C.cream : C.red}" stroke="${OL}" stroke-width="3"/>`).join('') + `<rect x="-44" y="10" width="88" height="56" fill="#fff" stroke="${OL}" stroke-width="4"/></g>` +
    `<text x="-96" y="-296" font-family="Inter" font-weight="900" font-size="34" fill="${C.red}">${name}</text><text x="-96" y="-256" font-family="Inter" font-weight="600" font-size="25" fill="#655C57">Rental shop</text>` +
    `<g transform="translate(150,-224)"><g data-t="${liveAt}"><rect x="-74" y="-30" width="148" height="60" rx="30" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><text y="11" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#fff">Live ✓</text></g></g>`;
  const cards = [[C.marigold, '#C9821E', '#F7C548'], [C.lehenga, C.lehengaDark, '#E8C25E'], [C.teal, C.tealDark, '#9CC5B0'], ['#7A4FA0', '#5D3A7E', '#B28BD0']];
  cards.forEach(([c, d, p], i) => { const x = i % 2 ? 122 : -122, y = i < 2 ? 0 : 300; s += `<g transform="translate(${x},${y})"><rect x="-112" y="-140" width="224" height="280" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-100" y="-128" width="200" height="190" rx="10" fill="${C.cream}"/><g transform="translate(0,-40)">${lehengaHangerSVG('', { c, d, dupatta: p }, .32)}</g><rect x="-96" y="80" width="130" height="16" rx="8" fill="#E6E0D9"/><rect x="-96" y="106" width="84" height="16" rx="8" fill="#F2EEE9"/></g>`; });
  return s;
}

// ===== Dukaan-dukaan ki bhaag-daud (2026-11-19): sun, auto-rickshaw, tumbleweed =====
// sunSVG(r): a hot sun with rays, centred on (0,0) (rotate it slowly)
function sunSVG(r = 82) {
  let s = '';
  for (let i = 0; i < 12; i++) { const a = i * 30; s += `<path transform="rotate(${a})" d="M-14,${-r - 18} L0,${-r - 62} L14,${-r - 18} Z" fill="${C.marigold}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`; }
  return s + `<circle r="${r}" fill="${C.marigold2}" stroke="${OL}" stroke-width="${OW}"/><circle r="${r * .7}" fill="#FBE08A" opacity=".7"/>`;
}
// autoSVG(): an auto-rickshaw seen from the side, facing left, wheels on y = 0
function autoSVG() {
  return `<path d="M-170,-30 L-176,-150 Q-170,-206 -110,-214 L120,-214 Q166,-206 168,-150 L176,-30 Z" fill="#2E8B57" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M-182,-216 Q-180,-262 -120,-266 L130,-266 Q178,-262 180,-216 Z" fill="${C.marigold2}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M-150,-196 L-150,-120 L-40,-120 L-40,-196 Z" fill="#CFE6EE" stroke="${OL}" stroke-width="4"/><rect x="10" y="-196" width="130" height="90" rx="10" fill="#3A3330" stroke="${OL}" stroke-width="4"/>` +
    `<circle cx="-168" cy="-80" r="14" fill="${C.gold}" stroke="${OL}" stroke-width="4"/><path d="M-176,-34 H176" stroke="${C.marigold2}" stroke-width="10"/>` +
    [-110, 110].map(x => `<circle cx="${x}" cy="0" r="40" fill="#2A2420" stroke="${OL}" stroke-width="${OW}"/><circle cx="${x}" cy="0" r="15" fill="#B9B2A8"/>`).join('');
}
// tumbleweedSVG(r): a dry tumbleweed, centred on (0,0) (roll it: move x and rotate)
function tumbleweedSVG(r = 70) {
  let s = `<circle r="${r}" fill="#C9A46A" opacity=".25"/>`;
  for (let i = 0; i < 9; i++) { const a = i * 40, b = a + 150; s += `<path d="M${(Math.cos(a / 57.3) * r).toFixed(1)},${(Math.sin(a / 57.3) * r).toFixed(1)} Q${(Math.cos((a + 70) / 57.3) * r * .2).toFixed(1)},${(Math.sin((a + 70) / 57.3) * r * .2).toFixed(1)} ${(Math.cos(b / 57.3) * r * .9).toFixed(1)},${(Math.sin(b / 57.3) * r * .9).toFixed(1)}" fill="none" stroke="#9A6B3F" stroke-width="5" stroke-linecap="round"/>`; }
  return s + `<circle r="${r}" fill="none" stroke="#8C6239" stroke-width="4" stroke-dasharray="14 10"/>`;
}

// ===== Rent kam rakha (2026-11-19): drink glass with a price tag, brain, shop boards =====
// drinkGlassSVG(tag): a plain glass of a red drink (no bottle) on (0,0) = its base, with a hanging price tag
function drinkGlassSVG(tag = '₹') {
  return `<ellipse cx="0" cy="6" rx="78" ry="14" fill="${OL}" opacity=".15"/><path d="M-70,-230 L70,-230 L54,0 L-54,0 Z" fill="#E9F4F8" fill-opacity=".55" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M-62,-150 L62,-150 L54,-6 L-54,-6 Z" fill="#B0303A"/><path d="M-62,-150 L62,-150" stroke="#D85A62" stroke-width="6"/><path d="M-44,-212 L-34,-30" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/>` +
    `<path d="M60,-180 Q100,-170 104,-130" fill="none" stroke="${OL}" stroke-width="3"/><g transform="translate(104,-130)"><rect x="-60" y="0" width="120" height="58" rx="10" fill="#fff" stroke="${OL}" stroke-width="4"/><text y="42" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="${C.red}">${tag}</text></g>`;
}
// brainSVG(id): a simple pink brain icon centred on (0,0); `${id}-glow` is a gold glow behind it (fade it up)
function brainSVG(id) {
  return `<circle id="${id}-glow" r="150" fill="url(#glow)" opacity="0"/><path d="M-90,10 Q-110,-40 -80,-70 Q-80,-110 -30,-110 Q0,-130 30,-110 Q80,-110 82,-70 Q112,-40 92,10 Q100,60 50,70 Q20,96 -20,80 Q-70,90 -84,50 Q-110,36 -90,10 Z" fill="#F4A6B8" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M0,-118 Q-12,-40 6,10 Q20,50 0,78 M-60,-60 Q-30,-50 -40,-10 M60,-60 Q30,-40 46,0 M-60,30 Q-30,20 -20,50 M60,30 Q36,30 30,56" fill="none" stroke="#C96A82" stroke-width="6" stroke-linecap="round"/>`;
}
// shopBoardSVG(text, kind): a shop board centred on (0,0): 'sale' = red with white letters, 'premium' = maroon + gold
function shopBoardSVG(text, kind = 'sale', w = 520) {
  const prem = kind === 'premium';
  return `<rect x="${-w / 2}" y="-70" width="${w}" height="140" rx="16" fill="${prem ? 'url(#mar)' : '#D9363E'}" stroke="${OL}" stroke-width="${OW}"/>` +
    (prem ? `<rect x="${-w / 2 + 16}" y="-54" width="${w - 32}" height="108" rx="10" fill="none" stroke="${C.gold}" stroke-width="5"/>` : '') +
    `<text y="${prem ? 20 : 24}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${prem ? 50 : 64}" fill="${prem ? C.gold : '#FFFFFF'}" letter-spacing="${prem ? 4 : 2}">${text}</text>`;
}
// starSVG(r, col): a five-point rating star centred on (0,0)
function starSVG(r = 30, col = C.gold) {
  const p = [...Array(10)].map((_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return `<polygon points="${p}" fill="${col}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
}

// ===== Mehenga lehenga (2026-11-19): café menu + cups, plan cards with bars, dust puffs, a "Most loved" ribbon =====
// coffeeCupSVG(k): a takeaway cup on (0,0) = its base; k = 'S' | 'M' | 'L' (size), lid and a maroon sleeve
function coffeeCupSVG(k = 'M') {
  const h = { S: 110, M: 150, L: 190 }[k] || 150, w = h * .42;
  return `<ellipse cx="0" cy="4" rx="${w + 8}" ry="10" fill="${OL}" opacity=".15"/>` +
    `<path d="M${-w},${-h} L${w},${-h} L${w * .78},0 L${-w * .78},0 Z" fill="#FFF8EC" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M${-w * .93},${-h * .66} L${w * .93},${-h * .66} L${w * .85},${-h * .3} L${-w * .85},${-h * .3} Z" fill="${C.red}" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="${-w - 8}" y="${-h - 22}" width="${2 * w + 16}" height="26" rx="10" fill="#5A3A28" stroke="${OL}" stroke-width="4"/>` +
    `<text x="0" y="${-h * .42}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${h * .2}" fill="${C.cream}">${k}</text>`;
}
// cafeMenuSVG(items, w, note): a dark café menu (note = a small line under the title, e.g. '(Udaharan)') board centred on (0,0); items = [['Small', '₹120', 'S'], ...] (cup + name + price)
function cafeMenuSVG(items, w = 820, note = '') {
  const n = items.length, step = w / n;
  let s = `<rect x="${-w / 2 - 30}" y="-250" width="${w + 60}" height="500" rx="24" fill="#3A2E28" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-w / 2 - 12}" y="-232" width="${w + 24}" height="464" rx="16" fill="none" stroke="${C.goldTan}" stroke-width="4"/>` +
    `<text y="-170" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="${C.cream}" letter-spacing="6">☕ COFFEE</text>` +
    (note ? `<text y="-126" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" fill="${C.goldTan}">${note}</text>` : '');
  items.forEach(([name, price, k], i) => {
    const x = -w / 2 + step * (i + .5);
    s += `<g id="menu-${i}" transform="translate(${x},0)"><g transform="translate(0,90) scale(.8)">${coffeeCupSVG(k)}</g>` +
      `<text y="150" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="${C.cream}">${name}</text>` +
      `<text y="208" text-anchor="middle" font-family="Inter" font-weight="900" font-size="50" fill="${C.gold}">${price}</text></g>`;
  });
  return s;
}
// planCardSVG(id, title, price, col): a subscription-plan card centred on (0,0), 250 wide (for "3 plans" study beats)
function planCardSVG(id, title, price, col = '#3A4E8C', w = 250) {
  const lines = title.split('|');
  return `<g id="${id}"><rect x="${-w / 2}" y="-120" width="${w}" height="240" rx="22" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-w / 2}" y="-120" width="${w}" height="${40 + lines.length * 40}" rx="22" fill="${col}"/><rect x="${-w / 2}" y="${-100 + lines.length * 40}" width="${w}" height="20" fill="${col}"/>` +
    lines.map((l, i) => `<text y="${-76 + i * 40}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="#fff">${l}</text>`).join('') +
    `<text y="90" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="${C.text}">${price}</text></g>`;
}
// barSVG(id, col, w): a bar that grows upward from (0,0); set its height with barSet(id, h, label)
function barSVG(id, col = C.gold, w = 130) {
  return `<g id="${id}"><rect id="${id}-r" x="${-w / 2}" y="0" width="${w}" height="0" rx="12" fill="${col}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<text id="${id}-t" y="-20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="56" fill="#fff"></text></g>`;
}
function barSet(id, h, label) {
  const r = $(id + '-r'), t = $(id + '-t'); if (!r) return;
  r.setAttribute('y', (-h).toFixed(1)); r.setAttribute('height', Math.max(0, h).toFixed(1));
  t.setAttribute('y', (-h - 20).toFixed(1)); t.textContent = label;
}
// dustPuffsSVG(id, n, w, h): grey dust puffs scattered over a w×h box centred on (0,0) (an old, untouched thing)
function dustPuffsSVG(id, n = 7, w = 260, h = 320) {
  let s = `<g id="${id}">`;
  for (let i = 0; i < n; i++) {
    const x = (((i * 37) % 11) / 10 - .5) * w, y = (((i * 53) % 13) / 12 - .5) * h, r = 14 + (i % 3) * 6;
    s += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})" data-bob="4" data-ph="${i}"><circle r="${r}" fill="#B9B2A8" opacity=".75"/><circle cx="${r * .7}" cy="${-r * .3}" r="${r * .7}" fill="#CFC8BE" opacity=".75"/></g>`;
  }
  return s + `</g>`;
}
// ribbonSVG(text): a small red label with a notch, centred on (0,0) (e.g. "Most loved ❤️" on a photo)
function ribbonSVG(text, fs = 30) {
  const w = text.length * fs * .55 + 50;
  return `<path d="M${-w / 2},-30 H${w / 2} L${w / 2 - 18},0 L${w / 2},30 H${-w / 2} L${-w / 2 + 18},0 Z" fill="${C.red}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>` +
    `<text y="${fs * .36}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="#fff">${text}</text>`;
}

// ===== Nisha Part 2 (2026-11-20): a month page with circled dates, a "Booked ✓" tag, a full almirah =====
// monthPageSVG(month, circled): a wall-calendar page centred on (0,0) (420×460): month name on a red band, a 7×5 date
// grid, the days in `circled` ringed in red (wedding dates)
function monthPageSVG(month, circled = []) {
  let s = `<rect x="-210" y="-230" width="420" height="460" rx="20" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-210,-210 Q-210,-230 -190,-230 L190,-230 Q210,-230 210,-210 L210,-140 L-210,-140 Z" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    [-120, 120].map(x => `<circle cx="${x}" cy="-238" r="12" fill="#fff" stroke="${OL}" stroke-width="4"/>`).join('') +
    `<text y="-168" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="#FFF2DF" letter-spacing="4">${month}</text>`;
  for (let d = 1; d <= 30; d++) {
    const c = (d - 1) % 7, r = (d - 1) / 7 | 0, x = -168 + c * 56, y = -96 + r * 64;
    s += `<text x="${x}" y="${y + 12}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="30" fill="${C.text}">${d}</text>`;
    if (circled.includes(d)) s += `<circle cx="${x}" cy="${y}" r="26" fill="none" stroke="#D9363E" stroke-width="6"/>`;
  }
  return s;
}
// bookedTagSVG(): a small green "Booked ✓" tag centred on (0,0)
function bookedTagSVG(fs = 26) {
  return `<rect x="-78" y="-22" width="156" height="44" rx="22" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/>` +
    `<text y="${fs * .36}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="#fff">Booked ✓</text>`;
}
// almirahFill(n): n covered lehengas packed inside an almirahSVG (rows of 4), for "all 12 still inside" shots;
// set it with $(id + '-inside').innerHTML = almirahFill(12)
function almirahFill(n = 12) {
  const cols = [[C.lehenga, C.lehengaDark], [C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], [C.teal, C.tealDark], ['#7A4FA0', '#5D3A7E']];
  return [...Array(n)].map((_, i) => `<g transform="translate(${-105 + (i % 4) * 70},${-440 + (i / 4 | 0) * 165}) scale(.24)">${coveredLehengaSVG(...cols[i % cols.length], 1)}</g>`).join('');
}

// ===== Cupboard full (2026-11-20): bed, clothes stack, stuffed cupboard, the app's pick screen (with a hidden name) =====
// bedSVG(x, y, w): a simple bed whose mattress top is at y (headboard on the left side of a room)
function bedSVG(x, y, w = 560, col = '#B5532E') {
  return `<g transform="translate(${x},${y})"><rect x="${-w / 2 - 20}" y="-180" width="60" height="320" rx="20" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-w / 2}" y="0" width="${w}" height="110" rx="16" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-w / 2}" y="-40" width="${w}" height="70" rx="24" fill="#FFF8EC" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M${-w / 2 + 160},-40 H${w / 2} V20 Q${w / 2},30 ${w / 2 - 20},30 H${-w / 2 + 160} Z" fill="${col}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-w / 2 + 20}" y="-80" width="120" height="60" rx="26" fill="#fff" stroke="${OL}" stroke-width="4"/></g>`;
}
const CLOTH_COLS = [[C.pink, C.pinkDark], [C.emerald, C.emeraldDark], [C.marigold, '#C9821E'], ['#7A4FA0', '#5D3A7E'], [C.teal, C.tealDark], [C.lehenga, C.lehengaDark], ['#4F86C6', '#3A6AA3']];
// foldedClothSVG(c, d, w): one folded garment centred on (0,0), 40 tall
function foldedClothSVG(c, d, w = 170) {
  return `<rect x="${-w / 2}" y="-20" width="${w}" height="40" rx="10" fill="${c}" stroke="${OL}" stroke-width="4"/><path d="M${-w / 2 + 14},4 H${w / 2 - 14}" stroke="${d}" stroke-width="6" stroke-linecap="round"/>`;
}
// clothesStackSVG(id, n): n folded clothes stacked upward from (0,0), each `${id}-i${k}` (pop them in one by one)
function clothesStackSVG(id, n = 12) {
  let s = `<g id="${id}">`;
  for (let k = 0; k < n; k++) { const [c, d] = CLOTH_COLS[k % CLOTH_COLS.length]; s += `<g transform="translate(${((k * 37) % 7 - 3) * 6},${-k * 34}) rotate(${((k * 53) % 9 - 4) * 1.5})"><g id="${id}-i${k}">${foldedClothSVG(c, d, 150 + (k % 3) * 20)}</g></g>`; }
  return s + `</g>`;
}
// stuffedInside(): an almirahSVG's inside crammed with folded clothes (put in `${id}-inside`)
function stuffedInside() {
  let s = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) { const [c, d] = CLOTH_COLS[(r * 3 + k) % CLOTH_COLS.length]; s += `<g transform="translate(${-70 + (r % 2) * 140},${-90 - r * 120 - k * 34})">${foldedClothSVG(c, d, 130)}</g><g transform="translate(${70 - (r % 2) * 140},${-90 - r * 120 - k * 34})">${foldedClothSVG(...CLOTH_COLS[(r * 3 + k + 3) % CLOTH_COLS.length], 130)}</g>`; }
  return s;
}
// arMysteryHeader(): the Anokhi Reet app header with its name hidden ("? ? ?") until a reveal (from Dukaan-dukaan)
function arMysteryHeader(y = -430) {
  return `<rect x="-264" y="${y - 38}" width="528" height="84" fill="url(#mar)"/><circle cx="-200" cy="${y + 4}" r="26" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/>` +
    `<text x="-200" y="${y + 16}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="${C.red}">?</text><text x="-160" y="${y + 16}" font-family="Inter" font-weight="900" font-size="34" fill="${C.cream}" letter-spacing="6">? ? ?</text>`;
}
// arPickScreen(id, o): the app's browse screen for phoneSVG(…, 560, 1000, inner): chips (o.chips; `${id}-c0..2-on`/`-t`
// to select with chipOnAR), four outfit cards from different shops, "Rent" pills with no amounts (`${id}-r0..3`), the picked
// card o.pick framed with a tick (`${id}-sel`) and a "Booked ✓" badge (`${id}-bk`). o.mystery hides the app name; then
// `${id}-real` (hidden) holds the real header to flip in.
function arPickScreen(id, o = {}) {
  const chips = o.chips || ['City', 'Occasion', 'Budget'], pick = o.pick == null ? 1 : o.pick;
  const looks = o.looks || [{ c: C.pink, d: C.pinkDark, dupatta: '#F4B9C8' }, { c: '#F6A98E', d: '#E08A6F', dupatta: '#F8D8C8' }, { c: C.emerald, d: C.emeraldDark, dupatta: '#A6D3B0' }, { c: C.lehenga, d: C.lehengaDark, dupatta: '#E8C25E' }];
  let s = o.mystery ? arMysteryHeader() + `<g id="${id}-real" opacity="0">${arHeader()}</g>` : arHeader();
  s += chips.map((c, i) => `<g transform="translate(${-170 + i * 170},-330)"><rect x="-80" y="-30" width="160" height="60" rx="30" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><rect id="${id}-c${i}-on" x="-80" y="-30" width="160" height="60" rx="30" fill="#141110" opacity="0"/><text x="0" y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${c.length > 8 ? 24 : 28}" fill="#141110">${c}</text><text id="${id}-c${i}-t" x="0" y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${c.length > 8 ? 24 : 28}" fill="#fff" opacity="0">${c}</text></g>`).join('');
  looks.forEach((lk, i) => {
    const x = i % 2 ? 125 : -125, y = i < 2 ? -90 : 260;
    s += `<g transform="translate(${x},${y})"><rect x="-112" y="-160" width="224" height="320" rx="16" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><rect x="-100" y="-148" width="200" height="200" rx="10" fill="${C.cream}"/>` +
      `<g transform="translate(0,-90)">${lehengaHangerSVG('', lk, .36)}</g>` +
      `<path d="M-96,76 h44 l6,16 h-56 z" fill="${C.red}" stroke="${OL}" stroke-width="2.5"/><rect x="-92" y="92" width="36" height="22" fill="#fff" stroke="${OL}" stroke-width="2.5"/><text x="-40" y="110" font-family="Inter" font-weight="700" font-size="22" fill="#655C57">Shop ${i + 1}</text>` +
      `<g transform="translate(-40,136)"><g id="${id}-r${i}" opacity="0"><rect x="-56" y="-18" width="112" height="36" rx="18" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${C.red}">Rent</text></g></g>` +
      (i === pick ? `<g id="${id}-sel" opacity="0"><rect x="-118" y="-166" width="236" height="332" rx="20" fill="none" stroke="#141110" stroke-width="7"/><circle cx="84" cy="-126" r="28" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><path d="M71,-126 l9,9 17,-17" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>` : '') +
      `</g>`;
  });
  s += `<g transform="translate(0,440)"><g id="${id}-bk" opacity="0"><rect x="-150" y="-40" width="300" height="80" rx="40" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="#fff">Booked ✓</text></g></g>`;
  return s;
}
function chipOnAR(id, i, k) { op($(`${id}-c${i}-on`), k); op($(`${id}-c${i}-t`), k); }

// ===== 3 options (2026-11-20): jam jar, film grid screen, tally board, dizzy swirl =====
// jamJarSVG(col, sc): a jam jar on (0,0) = its base: glass jar, coloured jam, cloth lid with a band
function jamJarSVG(col = '#C8283A', sc = 1) {
  return `<g transform="scale(${sc})"><ellipse cx="0" cy="4" rx="62" ry="10" fill="${OL}" opacity=".15"/>` +
    `<path d="M-56,-150 Q-62,-150 -62,-140 L-62,-14 Q-62,0 -48,0 L48,0 Q62,0 62,-14 L62,-140 Q62,-150 56,-150 Z" fill="#EEF6F8" fill-opacity=".6" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-54,-112 L54,-112 L54,-12 Q54,-6 46,-6 L-46,-6 Q-54,-6 -54,-12 Z" fill="${col}"/><path d="M-40,-132 L-40,-30" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>` +
    `<path d="M-70,-150 Q0,-190 70,-150 L64,-168 Q0,-200 -64,-168 Z" fill="#F4E3C8" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M-64,-160 H64" stroke="${C.red}" stroke-width="8"/><rect x="-34" y="-90" width="68" height="44" rx="8" fill="#fff" stroke="${OL}" stroke-width="3"/></g>`;
}
// filmGridScreen(id): an endless grid of film tiles for phoneSVG(…, 560, 1000, inner); scroll it with
// tf($(`${id}-sc`), 0, -offset) (tiles repeat every 1200 px). A made-up app: no real names or posters.
function filmGridScreen(id) {
  const cols = ['#3A4E8C', '#8C3A5A', '#2F6E6A', '#A3662A', '#5D3A7E', '#7A1B2A', '#3A6E8C', '#6B8C3A'];
  let s = `<rect x="-264" y="-484" width="528" height="968" fill="#141414"/><clipPath id="${id}-cp"><rect x="-264" y="-400" width="528" height="884"/></clipPath>` +
    `<rect x="-264" y="-468" width="528" height="68" fill="#1F1F1F"/><text x="-232" y="-422" font-family="Inter" font-weight="900" font-size="34" fill="#E8E2D9">Films</text>` +
    `<g clip-path="url(#${id}-cp)"><g id="${id}-sc">`;
  for (let r = 0; r < 14; r++) for (let c = 0; c < 3; c++) {
    const x = -246 + c * 168, y = -390 + r * 200, col = cols[(r * 3 + c) % cols.length];
    s += `<rect x="${x}" y="${y}" width="150" height="184" rx="12" fill="${col}"/><circle cx="${x + 75}" cy="${y + 80}" r="26" fill="#fff" opacity=".25"/><path d="M${x + 66},${y + 66} l24,14 -24,14 z" fill="#fff" opacity=".7"/>` +
      `<rect x="${x + 14}" y="${y + 146}" width="${70 + (r * 13 + c * 7) % 50}" height="12" rx="6" fill="#fff" opacity=".35"/>`;
  }
  return s + `</g></g><rect id="${id}-off" x="-264" y="-484" width="528" height="968" fill="#000" opacity="0"/>`;
}
// tallyBoardSVG(id, w, h): a small shop whiteboard centred on (0,0); write lines with tallyLine(id, i, html-free text)
// into `${id}-l0..3` (text elements)
function tallyBoardSVG(id, w = 760, h = 420) {
  let s = `<g id="${id}"><rect x="${-w / 2 - 16}" y="${-h / 2 - 16}" width="${w + 32}" height="${h + 32}" rx="18" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="10" fill="#FBFAF6" stroke="${OL}" stroke-width="4"/>`;
  for (let i = 0; i < 4; i++) s += `<text id="${id}-l${i}" x="0" y="${-h / 2 + 90 + i * 100}" text-anchor="middle" font-family="Inter" font-weight="${i === 0 ? 700 : 900}" font-size="${i === 0 ? 44 : 58}" fill="${i === 0 ? '#655C57' : C.text}"></text>`;
  return s + `</g>`;
}
// dizzySVG(): a confusion swirl with little stars, centred on (0,0) (spin it with tf for a confused head)
function dizzySVG(r = 60) {
  return `<path d="M0,0 m${-r},0 a${r},${r * .45} 0 1,1 ${2 * r},0 a${r * .7},${r * .32} 0 1,1 ${-1.4 * r},0 a${r * .4},${r * .2} 0 1,1 ${.8 * r},0" fill="none" stroke="#7A4FA0" stroke-width="7" stroke-linecap="round"/>` +
    [[-r, -10], [r * .9, 8], [0, -r * .45]].map(([x, y]) => `<g transform="translate(${x},${y})">${sparkleSVG(12, C.gold)}</g>`).join('');
}

// ===== Ek link, poori dukaan (2026-11-23): notification banner, link-preview message, sigh cloud, camera flash =====
// notifSVG(name, text, w): a phone notification banner centred on (0,0): green chat icon, sender name and the message
function notifSVG(name, text, w = 600) {
  return `<rect x="${-w / 2}" y="-58" width="${w}" height="116" rx="28" fill="#fff" stroke="${OL}" stroke-width="4"/>` +
    `<circle cx="${-w / 2 + 60}" cy="0" r="34" fill="#25A45A" stroke="${OL}" stroke-width="3"/>` +
    `<path d="M${-w / 2 + 46},-14 h28 q8,0 8,8 v14 q0,8 -8,8 h-14 l-12,10 v-10 h-2 q-8,0 -8,-8 v-14 q0,-8 8,-8 z" fill="#fff"/>` +
    `<text x="${-w / 2 + 112}" y="-10" font-family="Inter" font-weight="700" font-size="26" fill="#655C57">${name}</text>` +
    `<text x="${-w / 2 + 112}" y="30" font-family="Inter" font-weight="800" font-size="31" fill="${C.text}">${text}</text>`;
}
// linkMsgSVG(id, shop, lines): an outgoing chat message (green) with a shop link preview, centred on (0,0), 420 wide:
// a preview card (`${id}-q` "? ? ?" header; `${id}-real` hidden real Anokhi Reet header to flip in), three outfits, the
// shop name, "Saare outfits + rent", then the message lines.
function linkMsgSVG(id, shop, lines = []) {
  const looks = [[C.lehenga, C.lehengaDark, '#E8C25E'], [C.pink, C.pinkDark, '#F4B9C8'], [C.emerald, C.emeraldDark, '#A6D3B0']];
  const h2 = 70 + lines.length * 34;
  let s = `<rect x="-210" y="-176" width="420" height="${246 + h2}" rx="24" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/>` +
    `<rect x="-196" y="-162" width="392" height="232" rx="16" fill="${C.cream}" stroke="#E6E0D9" stroke-width="3"/>` +
    `<path d="M-196,-146 q0,-16 16,-16 h360 q16,0 16,16 v38 h-392 z" fill="url(#mar)"/>` +
    `<g id="${id}-q"><circle cx="-168" cy="-135" r="16" fill="${C.cream}"/><text x="-168" y="-127" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="${C.red}">?</text><text x="-140" y="-125" font-family="Inter" font-weight="900" font-size="26" fill="${C.cream}" letter-spacing="5">? ? ?</text></g>` +
    `<g id="${id}-real" opacity="0"><circle cx="-168" cy="-135" r="16" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="3"/><circle cx="-168" cy="-135" r="8" fill="none" stroke="${C.red}" stroke-width="3"/><text x="-140" y="-125" font-family="Inter" font-weight="800" font-size="26" fill="${C.cream}">Anokhi Reet</text></g>` +
    looks.map(([c, d, p], i) => `<g transform="translate(${-120 + i * 120},-66)">${lehengaHangerSVG('', { c, d, dupatta: p }, .24)}</g>`).join('') +
    `<text x="-180" y="46" font-family="Inter" font-weight="900" font-size="28" fill="${C.red}">${shop}</text>` +
    `<text x="-188" y="110" font-family="Inter" font-weight="700" font-size="25" fill="#2E6FB0">🔗 Saare outfits + rent</text>`;
  lines.forEach((l, i) => { s += `<text x="-188" y="${150 + i * 34}" font-family="Inter" font-weight="700" font-size="27" fill="${C.text}">${l}</text>`; });
  return s + `<path d="M${150},${50 + h2} l7,7 13,-13 M${161},${50 + h2} l7,7 13,-13" stroke="#3E9BD6" stroke-width="4" fill="none" stroke-linecap="round"/>`;
}
// sighCloudSVG(text): a tired sigh puff centred on (0,0) ("Haaah…")
function sighCloudSVG(text = 'Haaah…') {
  return `<path d="M-150,30 Q-190,30 -186,-6 Q-200,-60 -140,-64 Q-130,-110 -70,-100 Q-30,-140 30,-110 Q90,-130 120,-80 Q190,-80 180,-20 Q200,34 140,40 Z" fill="#F4F1EC" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>` +
    `<circle cx="-176" cy="66" r="18" fill="#F4F1EC" stroke="${OL}" stroke-width="4"/><circle cx="-206" cy="98" r="10" fill="#F4F1EC" stroke="${OL}" stroke-width="3"/>` +
    `<text x="0" y="-18" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="#7A6E62" font-style="italic">${text}</text>`;
}
// flashSVG(r): a camera flash burst centred on (0,0) (pop it at each "click")
function flashSVG(r = 90) {
  let s = `<circle r="${r * .9}" fill="#fff" opacity=".55"/>`;
  for (let i = 0; i < 8; i++) s += `<path transform="rotate(${i * 45})" d="M-10,${-r * .35} L0,${-r * 1.1} L10,${-r * .35} Z" fill="#FFF6C8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  return s + `<circle r="${r * .38}" fill="#FFF6C8" stroke="${OL}" stroke-width="4"/>`;
}

// ===== Do dukaan, do kahaniyan (2026-11-23): half-closed shutter, crossed-out thought =====
// halfShutterSVG(cx, w, y0, h): a rolling shutter pulled half down over a shop opening (e.g. twoShopsBG's fronts:
// cx 270 or 810, w 440, y0 550); a handle at the bottom edge
function halfShutterSVG(cx, w = 440, y0 = 550, h = 280) {
  let s = `<rect x="${cx - w / 2}" y="${y0}" width="${w}" height="${h}" fill="#A7A39C" stroke="${OL}" stroke-width="${OW}"/>`;
  for (let y = y0 + 30; y < y0 + h; y += 30) s += `<path d="M${cx - w / 2},${y} H${cx + w / 2}" stroke="#8C8880" stroke-width="5"/>`;
  return s + `<rect x="${cx - 60}" y="${y0 + h - 26}" width="120" height="20" rx="8" fill="#6E6A64" stroke="${OL}" stroke-width="3"/>`;
}
// crossThoughtSVG(id, text, w): a thought cloud with a guess, centred on (0,0); `${id}-x` is a big red cross to fade in
// when the guess is wrong (tail bubbles go down-left)
function crossThoughtSVG(id, text, w = 460) {
  const h = 110;
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${OL}" stroke-width="4"/>` +
    `<circle cx="${-w / 2 + 40}" cy="${h / 2 + 22}" r="14" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="${-w / 2 + 20}" cy="${h / 2 + 50}" r="8" fill="#fff" stroke="${OL}" stroke-width="3"/>` +
    `<text y="12" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="${C.text}">${text}</text>` +
    `<g id="${id}-x" opacity="0"><path d="M${-w / 2 + 20},${-h / 2 + 10} L${w / 2 - 20},${h / 2 - 10} M${w / 2 - 20},${-h / 2 + 10} L${-w / 2 + 20},${h / 2 - 10}" stroke="#D9363E" stroke-width="12" stroke-linecap="round" opacity=".85"/></g>`;
}

// ===== Shaadi season 2026 (2026-11-23): toran, BUSY stamp, wedding cake, magnifier, rupee note, ghodi =====
// toranSVG(w, y): a marigold-and-mango-leaf toran hanging across the top, from x 0 to w at height y
function toranSVG(w = W, y = 0) {
  let s = `<path d="M0,${y + 18} Q${w / 2},${y + 70} ${w},${y + 18}" fill="none" stroke="${C.goldTan}" stroke-width="8"/>`;
  for (let i = 0; i <= 18; i++) {
    const x = i * w / 18, yy = y + 18 + Math.sin(i / 18 * Math.PI) * 26;
    if (i % 2) s += `<path d="M${x},${yy} q-18,40 0,74 q18,-34 0,-74 z" fill="#3E8E4A" stroke="${OL}" stroke-width="3"/>`;
    else s += `<circle cx="${x}" cy="${yy + 14}" r="17" fill="${i % 4 ? C.marigold : '#E8962E'}" stroke="${OL}" stroke-width="3"/><circle cx="${x}" cy="${yy + 14}" r="7" fill="${C.marigold2}"/>` +
      `<circle cx="${x}" cy="${yy + 46}" r="13" fill="${i % 4 ? '#E8962E' : C.marigold}" stroke="${OL}" stroke-width="3"/>`;
  }
  return s;
}
// busyStampSVG(text): a red rubber stamp centred on (0,0), tilted
function busyStampSVG(text = 'BUSY', w = 260) {
  return `<g transform="rotate(-12)"><rect x="${-w / 2}" y="-50" width="${w}" height="100" rx="14" fill="none" stroke="#D9363E" stroke-width="10"/>` +
    `<rect x="${-w / 2 + 12}" y="-38" width="${w - 24}" height="76" rx="8" fill="none" stroke="#D9363E" stroke-width="3"/>` +
    `<text y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="62" fill="#D9363E" letter-spacing="6">${text}</text></g>`;
}
// weddingCakeSVG(id, labels, tiny): a three-tier cake on a stand (base at y = 0), a label on each tier, and a tiny
// separate slice `${id}-tiny` (with its label) beside it on the right
function weddingCakeSVG(id, labels = ['DESIGNERS', 'MALLS', 'BADI APPS'], tiny = 'RENTAL DUKAAN?') {
  let s = `<g id="${id}"><rect x="-300" y="-20" width="600" height="24" rx="12" fill="${C.goldTan}" stroke="${OL}" stroke-width="${OW}"/><path d="M-40,4 L-60,60 H60 L40,4 Z" fill="${C.goldTan}" stroke="${OL}" stroke-width="4"/>`;
  [[520, 150, '#FFF4E2'], [400, 140, '#FBE8EE'], [280, 130, '#FFF4E2']].forEach(([w, h, c], i) => {
    const y = -20 - [150, 290, 420][i];
    s += `<rect x="${-w / 2}" y="${y}" width="${w}" height="${h}" rx="18" fill="${c}" stroke="${OL}" stroke-width="${OW}"/>` +
      `<path d="M${-w / 2},${y + 26} q${w / 12},28 ${w / 6},0 q${w / 12},28 ${w / 6},0 q${w / 12},28 ${w / 6},0 q${w / 12},28 ${w / 6},0 q${w / 12},28 ${w / 6},0 q${w / 12},28 ${w / 6},0" fill="none" stroke="${C.pink}" stroke-width="8"/>` +
      `<text y="${y + h / 2 + 28}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${i === 2 ? 34 : 40}" fill="${C.red}">${labels[2 - i] || ''}</text>`;
  });
  s += `<circle cx="0" cy="-470" r="22" fill="#D9363E" stroke="${OL}" stroke-width="4"/>`;
  return s + `<g id="${id}-tiny" transform="translate(380,-30)"><path d="M-30,0 L30,0 L30,-36 L-30,-46 Z" fill="#FBE8EE" stroke="${OL}" stroke-width="4"/>` +
    `<text x="0" y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="24" fill="${C.text}">${tiny}</text></g></g>`;
}
// magnifierSVG(r): a magnifying glass, lens centred on (0,0), handle down-right
function magnifierSVG(r = 70) {
  return `<path d="M${r * .7},${r * .7} L${r * 1.7},${r * 1.7}" stroke="${C.woodDark}" stroke-width="${r * .32}" stroke-linecap="round"/><path d="M${r * .7},${r * .7} L${r * 1.7},${r * 1.7}" stroke="${OL}" stroke-width="4" stroke-linecap="round" opacity=".3"/>` +
    `<circle r="${r}" fill="#DFF0F6" fill-opacity=".45" stroke="${OL}" stroke-width="${r * .16}"/><path d="M${-r * .5},${-r * .2} A${r * .55},${r * .55} 0 0,1 ${-r * .1},${-r * .55}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`;
}
// rupeeNoteSVG(): a green banknote centred on (0,0)
function rupeeNoteSVG() {
  return `<rect x="-70" y="-34" width="140" height="68" rx="8" fill="#7DBE8A" stroke="${OL}" stroke-width="4"/><rect x="-60" y="-24" width="120" height="48" rx="6" fill="none" stroke="#3E8E4A" stroke-width="3"/>` +
    `<circle r="18" fill="#A8D8B0" stroke="#3E8E4A" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="#2E6B3A">₹</text>`;
}
// ghodiSVG(groom): a white wedding horse facing right (hooves at y = 0) with a red-and-gold cloth; with groom = a
// person look, a small groom (bust) rides it. Bob it while it walks.
function ghodiSVG(groom) {
  let s = `<path d="M-130,-150 Q-140,-230 -60,-236 L80,-236 Q130,-236 140,-200 L190,-300 Q205,-330 236,-316 L262,-280 Q272,-262 252,-252 L214,-238 L176,-150 Z" fill="#FBF8F2" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<path d="M196,-318 L210,-352 L222,-318 Z" fill="#FBF8F2" stroke="${OL}" stroke-width="4"/><circle cx="232" cy="-292" r="6" fill="${OL}"/>` +
    [-100, -60, 100, 140].map(x => `<rect x="${x - 12}" y="-160" width="24" height="160" rx="10" fill="#FBF8F2" stroke="${OL}" stroke-width="4"/><rect x="${x - 14}" y="-14" width="28" height="16" rx="4" fill="${OL}"/>`).join('') +
    `<path d="M-120,-236 L120,-236 L110,-130 Q0,-110 -110,-130 Z" fill="#C0262D" stroke="${OL}" stroke-width="4"/><path d="M-112,-140 Q0,-120 112,-140" stroke="${C.gold}" stroke-width="10" fill="none"/>` +
    [-80, -40, 0, 40, 80].map(x => `<circle cx="${x}" cy="-126" r="7" fill="${C.gold}" stroke="${OL}" stroke-width="2"/>`).join('') +
    `<path d="M-140,-210 Q-190,-190 -170,-120" fill="none" stroke="#E6E0D9" stroke-width="16" stroke-linecap="round"/>`;
  if (groom) s += `<g transform="translate(0,-160) scale(.42)">${person('ghodi-groom', NOSKIRT(groom))}</g>`;
  return s;
}

// ===== Asli price (2026-11-24): wedding hall, chair, round table, bank screen, wedding invite =====
// weddingHallBG(id): a wedding hall: marigold drapes, fairy lights (class twinkle), a flower arch at the back, floor
function weddingHallBG(id) {
  let s = `<rect width="${W}" height="${H}" fill="#F6E3CF"/><rect y="${FLOOR - 300}" width="${W}" height="300" fill="#EFD3B6"/>`;
  s += `<g transform="translate(540,${FLOOR - 60})"><path d="M-300,0 V-520 Q-300,-760 0,-780 Q300,-760 300,-520 V0" fill="none" stroke="#C0262D" stroke-width="40"/>` +
    [...Array(22)].map((_, i) => { const a = Math.PI * (i / 21), x = -Math.cos(a) * 300, y = -520 - Math.sin(a) * 250; return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="20" fill="${i % 2 ? C.marigold : '#E8962E'}" stroke="${OL}" stroke-width="3"/>`; }).join('') +
    [-300, 300].map(x => [...Array(9)].map((_, k) => `<circle cx="${x}" cy="${-500 + k * 56}" r="18" fill="${k % 2 ? C.marigold : '#F4F1EC'}" stroke="${OL}" stroke-width="3"/>`).join('')).join('') + `</g>`;
  for (const x of [0, W]) s += `<path d="M${x},0 Q${x ? x - 200 : 200},500 ${x},${FLOOR - 200}" fill="#E8962E" opacity=".85" stroke="${OL}" stroke-width="4"/><path d="M${x},0 Q${x ? x - 120 : 120},420 ${x},900" fill="${C.marigold}" stroke="${OL}" stroke-width="4"/>`;
  s += `<path d="M0,40 Q${W / 2},160 ${W},40" fill="none" stroke="#6E6A64" stroke-width="3"/>`;
  for (let i = 1; i < 18; i++) { const x = i * W / 18, y = 40 + Math.sin(i / 18 * Math.PI) * 120; s += `<circle class="twinkle" data-i="${i}" cx="${x}" cy="${y + 8}" r="9" fill="#FFE9A8" stroke="${OL}" stroke-width="2"/>`; }
  s += `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#B98A5E"/>`;
  for (let x = 0; x < W; x += 180) s += `<path d="M${x},${FLOOR} L${x - 120},${H}" stroke="#A47648" stroke-width="5"/>`;
  return s;
}
// chairBackSVG / chairFrontSVG (x, y): a banquet chair a bust sits IN (y = the character's waist): back before bust(),
// front (seat + legs) after it
function chairBackSVG(x, y, col = '#C0262D') {
  return `<g transform="translate(${x},${y})"><rect x="-150" y="-330" width="300" height="360" rx="60" fill="${col}" stroke="${OL}" stroke-width="${OW}"/><rect x="-120" y="-300" width="240" height="300" rx="44" fill="none" stroke="${C.gold}" stroke-width="8"/></g>`;
}
function chairFrontSVG(x, y, col = '#C0262D') {
  return `<g transform="translate(${x},${y})"><rect x="-170" y="0" width="340" height="80" rx="24" fill="${col}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-150,80 L-160,260 M150,80 L160,260" stroke="${C.gold}" stroke-width="16" stroke-linecap="round"/></g>`;
}
// roundTableSVG(x, y, w, cloth): a round banquet table with a cloth (white by default) and a flower centrepiece (top at y)
function roundTableSVG(x, y, w = 760, cloth = '#FFFFFF') {
  return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="0" rx="${w / 2}" ry="70" fill="${cloth}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M${-w / 2},0 L${-w / 2 + 30},260 Q0,300 ${w / 2 - 30},260 L${w / 2},0" fill="${cloth}" stroke="${OL}" stroke-width="${OW}"/><path d="M${-w / 2 + 20},120 Q0,160 ${w / 2 - 20},120" stroke="${C.gold}" stroke-width="10" fill="none"/>` +
    `<rect x="-20" y="-70" width="40" height="60" rx="8" fill="#DFF0F6" stroke="${OL}" stroke-width="3"/>` + [[-30, -90], [0, -110], [30, -90], [-12, -76], [14, -78]].map(([a, b], i) => `<circle cx="${a}" cy="${b}" r="18" fill="${i % 2 ? '#E26A8A' : C.marigold}" stroke="${OL}" stroke-width="3"/>`).join('') + `</g>`;
}
// bankScreen(balance): a plain, made-up bank app screen for phoneSVG(…, 560, 1000) (no real bank): "Balance" + amount
function bankScreen(balance = '₹8,000') {
  return `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#F4F6FA"/><path d="M-264,-442 Q-264,-484 -222,-484 L222,-484 Q264,-484 264,-442 L264,-330 L-264,-330 Z" fill="#2E4A7A"/>` +
    `<text x="-220" y="-392" font-family="Inter" font-weight="800" font-size="34" fill="#fff">My Bank</text>` +
    `<rect x="-224" y="-280" width="448" height="240" rx="24" fill="#fff" stroke="#D8DEE8" stroke-width="3"/><text x="-190" y="-215" font-family="Inter" font-weight="700" font-size="30" fill="#6B7280">Balance</text>` +
    `<text x="-190" y="-120" font-family="Inter" font-weight="900" font-size="84" fill="${C.text}">${balance}</text>` +
    [0, 1, 2].map(i => `<rect x="-224" y="${0 + i * 110}" width="448" height="90" rx="18" fill="#fff" stroke="#D8DEE8" stroke-width="3"/><rect x="-196" y="${28 + i * 110}" width="${180 - i * 30}" height="16" rx="8" fill="#E6E9EF"/>`).join('');
}
// inviteCardSVG(): a wedding invitation card (maroon with gold border, a kalash), centred on (0,0)
function inviteCardSVG() {
  return `<g transform="rotate(-8)"><rect x="-110" y="-150" width="220" height="300" rx="14" fill="#7A1B2A" stroke="${OL}" stroke-width="${OW}"/><rect x="-94" y="-134" width="188" height="268" rx="10" fill="none" stroke="${C.gold}" stroke-width="5"/>` +
    `<path d="M-30,-30 Q-40,30 0,40 Q40,30 30,-30 Z" fill="${C.gold}" stroke="${OL}" stroke-width="3"/><path d="M-16,-30 Q0,-70 16,-30" fill="#3E8E4A" stroke="${OL}" stroke-width="3"/>` +
    `<text y="90" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="${C.gold}">SHUBH VIVAH</text></g>`;
}

// ===== ₹6,000 ki sherwani (2026-11-24): kids' outfits laid flat, a chest of drawers, an age tag, two houses at night =====
// kidOutfitSVG(kind, c, d): a small kid's outfit laid flat, centred on (0,0), about 180 wide x 230 tall.
// kind: 'sherwani' (long coat, buttons) | 'kurta' (kurta + pajama) | 'bandhgala' (short jacket, high collar) | 'jodhpuri' (jacket + breeches)
function kidOutfitSVG(kind = 'sherwani', c = '#F2E2C4', d = '#D9C39A') {
  const coatH = kind === 'sherwani' ? 200 : (kind === 'kurta' ? 150 : 110);
  let s = '';
  if (kind !== 'sherwani') { // trousers under the top
    const pc = kind === 'kurta' ? '#FFF8EC' : (kind === 'jodhpuri' ? '#E8D3A5' : '#3B3A48');
    s += `<path d="M-50,${coatH - 120} L-58,110 L-8,110 L0,${coatH - 80} L8,110 L58,110 L50,${coatH - 120} Z" fill="${pc}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
    if (kind === 'jodhpuri') s += `<path d="M-50,${coatH - 110} Q-80,${coatH - 70} -56,${coatH - 40} M50,${coatH - 110} Q80,${coatH - 70} 56,${coatH - 40}" fill="none" stroke="${OL}" stroke-width="4"/>`;
  }
  const top = -120, bot = top + coatH;
  s += `<path d="M-34,${top} L-90,${top + 20} L-118,${top + 110} L-90,${top + 118} L-66,${top + 60} L-70,${bot} L70,${bot} L66,${top + 60} L90,${top + 118} L118,${top + 110} L90,${top + 20} L34,${top} Q0,${top + 18} -34,${top} Z" fill="${c}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
  s += kind === 'kurta' ? `<path d="M0,${top + 8} V${top + 60}" stroke="${d}" stroke-width="5"/>` : `<path d="M0,${top + 10} V${bot - 6}" stroke="${d}" stroke-width="5"/>`;
  if (kind !== 'kurta') for (let i = 0; i < 4; i++) s += `<circle cx="0" cy="${top + 30 + i * (coatH - 50) / 4}" r="6" fill="${C.gold}" stroke="${OL}" stroke-width="2.5"/>`;
  if (kind === 'bandhgala' || kind === 'sherwani') s += `<rect x="-30" y="${top - 12}" width="60" height="18" rx="6" fill="${d}" stroke="${OL}" stroke-width="3"/>`;
  if (kind === 'sherwani') s += `<path d="M-66,${bot - 30} H66" stroke="${C.gold}" stroke-width="8"/><path d="M-64,${top + 70} Q-40,${top + 90} -20,${top + 70}" stroke="${C.gold}" stroke-width="5" fill="none"/>`;
  return s;
}
// dresserSVG(id): a chest of drawers, 560 wide, standing on (0,0). Open the top drawer with dresserOpen(id, k):
// `${id}-dc` (closed front) and `${id}-do` (the pulled-out drawer with its tray). Put things in it into `${id}-in`
// (tray floor from y -390 to -190, x -240..240).
function dresserSVG(id) {
  const knob = (y, w = 280) => `<rect x="-36" y="${y}" width="72" height="16" rx="8" fill="${C.gold}" stroke="${OL}" stroke-width="3"/>`;
  return `<g id="${id}"><rect x="-280" y="-420" width="560" height="420" rx="14" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-300" y="-446" width="600" height="34" rx="10" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>` +
    [-270, -140].map(y => `<rect x="-256" y="${y}" width="512" height="116" rx="10" fill="${C.wood}" stroke="${OL}" stroke-width="4"/>` + knob(y + 50)).join('') +
    `<g id="${id}-dc"><rect x="-256" y="-400" width="512" height="116" rx="10" fill="${C.wood}" stroke="${OL}" stroke-width="4"/>${knob(-350)}</g>` +
    `<g id="${id}-do" opacity="0"><path d="M-246,-404 L246,-404 L300,-180 L-300,-180 Z" fill="#5C4126" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M-232,-396 L232,-396 L282,-190 L-282,-190 Z" fill="${C.beige}"/><g id="${id}-in"></g>` +
    `<rect x="-306" y="-190" width="612" height="130" rx="12" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>${knob(-134)}</g></g>`;
}
function dresserOpen(id, k) { op($(id + '-dc'), k > .02 ? 0 : 1); op($(id + '-do'), clamp(k * 3)); tf($(id + '-do'), 0, (1 - E.out(k)) * -90, lerp(.92, 1, E.out(k)), 0, 0, -290); }
// ageTagSVG(text): a small hanging size tag ("Age 4–5"), centred on its string's top (0,0)
function ageTagSVG(text) {
  const w = text.length * 19 + 50;
  return `<path d="M0,0 L0,26" stroke="${OL}" stroke-width="3"/><rect x="${-w / 2}" y="24" width="${w}" height="60" rx="14" fill="${C.gold}" stroke="${OL}" stroke-width="4"/>` +
    `<circle cx="0" cy="38" r="5" fill="#fff" stroke="${OL}" stroke-width="2"/><text y="72" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="${C.redDark}">${text}</text>`;
}
// nightHousesSVG(id): night sky (moon, stars) over two small houses, left (x 270) and right (x 810), on the ground at
// y 1180; each house's lit window is `${id}-wL` / `${id}-wR` (x 270 / 810, y 900, 120 x 110)
function nightHousesSVG(id) {
  let s = `<rect width="${W}" height="${H}" fill="#1F2A4A"/><rect y="1180" width="${W}" height="${H - 1180}" fill="#2B3524"/>` +
    `<path d="M880,330 a60,60 0 1,0 40,92 a46,46 0 1,1 -40,-92 Z" fill="${C.gold}"/>`;
  [[120, 300], [300, 420], [520, 280], [660, 460], [980, 560], [420, 600], [160, 640], [760, 640]].forEach(([x, y], i) => { s += `<circle class="twinkle" data-i="${i}" cx="${x}" cy="${y}" r="${i % 3 ? 4 : 7}" fill="#FFF6C8"/>`; });
  for (const [x, side, wall, roof] of [[270, 'L', '#E6C9A2', '#A3262A'], [810, 'R', '#D8C1A8', '#7A3E6E']]) {
    s += `<g transform="translate(${x},1180)"><rect x="-200" y="-420" width="400" height="420" fill="${wall}" stroke="${OL}" stroke-width="${OW}"/>` +
      `<path d="M-240,-410 L0,-600 L240,-410 Z" fill="${roof}" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
      `<rect x="40" y="-170" width="110" height="170" rx="8" fill="${C.woodDark}" stroke="${OL}" stroke-width="4"/></g>` +
      `<g id="${id}-w${side}"><circle cx="${x}" cy="900" r="120" fill="url(#glow)" opacity=".8"/><rect x="${x - 60}" y="845" width="120" height="110" rx="6" fill="#FFD978" stroke="${OL}" stroke-width="${OW}"/><path d="M${x},845 V955 M${x - 60},900 H${x + 60}" stroke="${OL}" stroke-width="4"/></g>`;
  }
  return s;
}

// ===== Rental dukaan hai? Customer kahan hain? (2026-11-24): presenter studio, day-to-night window, pamphlets, status, app feed =====
// studioBG(id): a bright studio for a presenter talking to the camera: cream wall, a warm beige backdrop panel with gold
// rings (`${id}-ring` turns slowly if you rotate it), a ring light on the left, a plant on the right, a floor
function studioBG(id) {
  return `<rect width="${W}" height="${H}" fill="${C.cream}"/><rect x="120" y="330" width="840" height="${FLOOR - 330}" rx="40" fill="#F3DCC0" stroke="${OL}" stroke-width="${OW}"/>` +
    `<g id="${id}-ring" transform="translate(540,760)" opacity=".5">` + [...Array(18)].map((_, i) => { const a = i * Math.PI / 9; return `<circle cx="${(Math.cos(a) * 300).toFixed(0)}" cy="${(Math.sin(a) * 300).toFixed(0)}" r="26" fill="none" stroke="${C.gold}" stroke-width="5"/>`; }).join('') + `<circle r="360" fill="none" stroke="${C.gold}" stroke-width="5" stroke-dasharray="2 16" stroke-linecap="round"/></g>` +
    `<g transform="translate(70,640)"><path d="M0,60 V560" stroke="${OL}" stroke-width="10"/><circle r="70" fill="none" stroke="${OL}" stroke-width="34"/><circle r="70" fill="none" stroke="#FFF8EC" stroke-width="22"/></g>` +
    floorSVG('#B58457') + plantSVG(1010, FLOOR + 40, 1.1);
}
// dayNightWindowSVG(id, x, y, w, h): a window whose sky turns from day to night with dayNight(id, k) (k 0 = noon, 1 = night)
function dayNightWindowSVG(id, x, y, w = 260, h = 220) {
  return `<g transform="translate(${x - w / 2},${y - h / 2})"><clipPath id="${id}-cp"><rect width="${w}" height="${h}" rx="6"/></clipPath>` +
    `<rect id="${id}-sky" width="${w}" height="${h}" rx="6" fill="${C.sky}"/><g clip-path="url(#${id}-cp)"><g id="${id}-sun"><circle r="30" fill="${C.gold}" stroke="${OL}" stroke-width="3"/></g>` +
    `<g id="${id}-moon"><path d="M0,-28 a28,28 0 1,0 20,48 a22,22 0 1,1 -20,-48 Z" fill="#FFF6C8"/></g></g>` +
    `<rect width="${w}" height="${h}" rx="6" fill="none" stroke="${OL}" stroke-width="${OW}"/><path d="M${w / 2},0 V${h} M0,${h / 2} H${w}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-14" y="${h - 4}" width="${w + 28}" height="16" rx="4" fill="${C.woodLight}" stroke="${OL}" stroke-width="4"/></g>`;
}
function dayNight(id, k, w = 260, h = 220) {
  const sky = k < .5 ? `rgb(${Math.round(lerp(207, 242, k * 2))},${Math.round(lerp(230, 160, k * 2))},${Math.round(lerp(238, 110, k * 2))})` : `rgb(${Math.round(lerp(242, 46, k * 2 - 1))},${Math.round(lerp(160, 61, k * 2 - 1))},${Math.round(lerp(110, 99, k * 2 - 1))})`;
  $(id + '-sky').setAttribute('fill', sky);
  tf($(id + '-sun'), lerp(w * .2, w * .85, clamp(k * 1.6)), h * .3 + clamp(k * 1.6) * h * .9, 1);
  tf($(id + '-moon'), lerp(w * .1, w * .4, clamp(k * 2 - 1)), lerp(h * 1.2, h * .32, clamp(k * 2 - 1)), 1);
}
// pamphletSVG(): a small stack of shop flyers ("RENT PE OUTFITS"), centred on (0,0)
function pamphletSVG() {
  return [[-14, 10, -8], [8, 4, 6], [0, 0, -2]].map(([x, y, r]) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-110" y="-150" width="220" height="300" rx="8" fill="#FFF8EC" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-110" y="-150" width="220" height="70" rx="8" fill="${C.red}" stroke="${OL}" stroke-width="4"/><text y="-104" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="${C.cream}">RENT PE</text>` +
    `<text y="-40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${C.red}">OUTFITS</text><g transform="translate(0,40) scale(.55)">${kidOutfitSVG('kurta', C.pink, C.pinkDark)}</g></g>`).join('');
}
// statusPhoneSVG(): a phone showing a chat-app "status" ring with a lehenga photo and very few views ("👁 2"), centred on (0,0)
function statusPhoneSVG() {
  return `<rect x="-120" y="-220" width="240" height="440" rx="34" fill="#1E1715" stroke="${OL}" stroke-width="${OW}"/><rect x="-106" y="-206" width="212" height="412" rx="24" fill="#fff"/>` +
    `<text x="0" y="-160" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="#655C57">Status</text>` +
    `<circle cx="0" cy="-30" r="80" fill="none" stroke="#25A45A" stroke-width="8" stroke-dasharray="40 10"/><circle cx="0" cy="-30" r="68" fill="${C.cream}"/>` +
    `<g transform="translate(0,-30)">${lehengaHangerSVG('', { c: C.lehenga, d: C.lehengaDark }, .32)}</g>` +
    `<text x="0" y="110" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${C.text}">👁 2</text>`;
}
// arFeedScreen(id): for phoneSVG(…, 560, 1000): the Anokhi Reet app scrolling through shops and outfits. `${id}-feed`
// scrolls (translate it up); `${id}-q` is a hidden-name header ("? ? ?"), `${id}-real` the real header (show it to reveal)
function arFeedScreen(id) {
  const shops = ['Kiranben Rentals', 'Shital Rentals', 'Bhavesh Rentals', 'Meenaben Rentals', 'Kiranben Rentals', 'Shital Rentals'];
  const cols = [[C.lehenga, C.lehengaDark, '#E8C25E'], [C.pink, C.pinkDark, '#F4B9C8'], [C.emerald, C.emeraldDark, '#A6D3B0'], [C.marigold, '#C77F22', '#F7C548'], ['#7A4FA0', '#5D3A7E', '#B28BD0'], [C.teal, C.tealDark, '#9FD3CE']];
  let f = '';
  shops.forEach((n, i) => {
    const y = -330 + i * 300;
    f += `<g transform="translate(0,${y})"><rect x="-240" y="0" width="480" height="276" rx="22" fill="#fff" stroke="${C.goldTan}" stroke-width="4"/>` +
      `<circle cx="-196" cy="42" r="24" fill="${C.red}" stroke="${OL}" stroke-width="3"/><text x="-160" y="52" font-family="Inter" font-weight="900" font-size="28" fill="${C.text}">${n}</text>` +
      [0, 1, 2].map(k => { const [c, d, pp] = cols[(i + k) % 6]; return `<g transform="translate(${-150 + k * 150},140)"><rect x="-66" y="-64" width="132" height="150" rx="14" fill="${C.cream}"/>${lehengaHangerSVG('', { c, d, dupatta: pp }, .36)}</g>`; }).join('') + `</g>`;
  });
  return `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="${C.cream}"/><clipPath id="${id}-cp"><rect x="-264" y="-392" width="528" height="876" rx="0"/></clipPath>` +
    `<g clip-path="url(#${id}-cp)"><g id="${id}-feed">${f}</g></g>` +
    `<g id="${id}-q">${arMysteryHeader()}</g><g id="${id}-real" opacity="0">${arHeader()}</g>`;
}

// ===== Shaadi season ka sabse bada scam (2026-11-24): crime-show kit: alert lights, case file, rubber stamp, crime board,
// evidence tag, interrogation lamp, torch beam =====
// sirenLightsSVG(id): full-frame dark-scene alert lights: a red and a blue beam sweeping from the top corners; move them
// with sirenUpd(id, t) every frame
function sirenLightsSVG(id) {
  const beam = (c) => `<path d="M0,0 L-260,1500 Q0,1600 260,1500 Z" fill="${c}" opacity=".32"/><circle r="70" fill="${c}" opacity=".9"/><circle r="140" fill="${c}" opacity=".25"/>`;
  return `<g id="${id}"><g transform="translate(120,40)"><g id="${id}-r">${beam('#FF2B2B')}</g></g><g transform="translate(960,40)"><g id="${id}-b">${beam('#2B6BFF')}</g></g></g>`;
}
function sirenUpd(id, t) { tf($(id + '-r'), 0, 0, 1, Math.sin(t * 3.2) * 32); tf($(id + '-b'), 0, 0, 1, -Math.sin(t * 3.2 + 1) * 32); op($(id + '-r'), .55 + .45 * Math.max(0, Math.sin(t * 9))); op($(id + '-b'), .55 + .45 * Math.max(0, Math.sin(t * 9 + Math.PI))); }
// caseFileSVG(label): a closed manila case file (600 x 440) centred on (0,0) with a tab and a typed label
function caseFileSVG(label = 'CASE NO. 2026') {
  return `<path d="M-300,-200 L-120,-200 L-90,-236 L60,-236 L90,-200 L300,-200 L300,220 L-300,220 Z" fill="#E2B866" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>` +
    `<rect x="-300" y="-170" width="600" height="390" rx="8" fill="#EDC97A" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="-230" y="-130" width="300" height="56" fill="#FFF8EC" stroke="${OL}" stroke-width="3"/><text x="-80" y="-92" text-anchor="middle" font-family="Courier New, monospace" font-weight="900" font-size="30" fill="${C.text}">${label}</text>` +
    [0, 1, 2].map(i => `<path d="M-230,${-20 + i * 50} H${140 - i * 60}" stroke="#B58F48" stroke-width="8" stroke-linecap="round"/>`).join('');
}
// rubberStampSVG(text, col): a slanted rubber-stamp mark (double outline + text) centred on (0,0); col red by default
function rubberStampSVG(text, col = '#D9363E', fs = 64) {
  const w = text.length * fs * .66 + 70, h = fs * 1.6;
  return `<g transform="rotate(-10)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14" fill="none" stroke="${col}" stroke-width="10"/><rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" rx="8" fill="none" stroke="${col}" stroke-width="4"/>` +
    `<text y="${fs * .35}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="${col}" letter-spacing="4">${text}</text></g>`;
}
// crimeBoardSVG(x, y, w, h): a cork board in a wooden frame (pin cards and red strings on it)
function crimeBoardSVG(x, y, w = 960, h = 860) {
  let s = `<g transform="translate(${x},${y})"><rect x="${-w / 2 - 22}" y="${-h / 2 - 22}" width="${w + 44}" height="${h + 44}" rx="16" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#C69A64" stroke="${OL}" stroke-width="4"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${((i * 97) % w) - w / 2}" cy="${((i * 151) % h) - h / 2}" r="${3 + i % 3}" fill="#A77E4E" opacity=".6"/>`;
  return s + `</g>`;
}
// boardCardSVG(text, fs): a pinned paper card (white, red pin) centred on (0,0)
function boardCardSVG(text, fs = 48, w = 250) {
  return `<g transform="rotate(${(text.length % 5) - 2})"><rect x="${-w / 2 + 6}" y="-60" width="${w}" height="132" fill="#3B2418" opacity=".18"/><rect x="${-w / 2}" y="-66" width="${w}" height="132" fill="#FFF8EC" stroke="${OL}" stroke-width="4"/>` +
    `<text y="${fs * .36}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${fs}" fill="${C.text}">${text}</text><circle cy="-56" r="13" fill="#D9363E" stroke="${OL}" stroke-width="3"/></g>`;
}
// evidenceTagSVG(text): a yellow EVIDENCE tag on a string, hanging from (0,0)
function evidenceTagSVG(text) {
  const w = Math.max(220, text.length * 20 + 40);
  return `<path d="M0,0 L0,30" stroke="${OL}" stroke-width="3"/><rect x="${-w / 2}" y="28" width="${w}" height="92" rx="10" fill="#F7D23A" stroke="${OL}" stroke-width="4"/>` +
    `<text y="62" text-anchor="middle" font-family="Inter" font-weight="900" font-size="24" fill="${C.text}" letter-spacing="3">EVIDENCE</text><text y="100" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${C.redDark}">${text}</text>`;
}
// hangingLampSVG(id, len): an interrogation lamp hanging from the top (0,0) with a light cone `${id}-cone`; swing `${id}`
function hangingLampSVG(id, len = 420) {
  return `<g id="${id}"><path d="M0,0 V${len}" stroke="${OL}" stroke-width="5"/><path id="${id}-cone" d="M-70,${len + 60} L-420,${len + 900} Q0,${len + 980} 420,${len + 900} L70,${len + 60} Z" fill="#FFF2B0" opacity=".28"/>` +
    `<path d="M-80,${len + 70} Q-70,${len} 0,${len} Q70,${len} 80,${len + 70} Z" fill="#3E4A52" stroke="${OL}" stroke-width="${OW}"/><ellipse cx="0" cy="${len + 72}" rx="40" ry="12" fill="#FFF6C8" stroke="${OL}" stroke-width="3"/></g>`;
}
// torchSVG(): a hand torch pointing right, centred on its grip (0,0); torchBeamSVG(len): its light beam going right
function torchSVG() { return `<rect x="-40" y="-16" width="90" height="32" rx="10" fill="#3E4A52" stroke="${OL}" stroke-width="4"/><path d="M50,-26 L84,-34 L84,34 L50,26 Z" fill="#59656E" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`; }
function torchBeamSVG(len = 700) { return `<path d="M84,-30 L${len},-200 Q${len + 60},0 ${len},200 L84,30 Z" fill="#FFF2B0" opacity=".45"/>`; }

// ===== Har shaadi mein nayi sherwani (2026-11-24): comic-book kit, chai tapri, booking calendar =====
// comicPanel(id, x, y, w, h, bg, inner): a comic panel (thick black frame, halftone dots on a coloured ground); `inner`
// (SVG in scene coordinates) is clipped to the panel. Busts can stand with their waist below the panel's bottom edge.
function comicPanel(id, x, y, w, h, bg = '#F7D23A', inner = '', dot = 'rgba(0,0,0,.12)') {
  return `<defs><pattern id="${id}-ht" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="11" cy="11" r="4.2" fill="${dot}"/></pattern>` +
    `<clipPath id="${id}-cp"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs>` +
    `<g id="${id}"><rect x="${x + 10}" y="${y + 12}" width="${w}" height="${h}" fill="#1A1A1A" opacity=".35"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bg}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}-ht)"/>` +
    `<g clip-path="url(#${id}-cp)">${inner}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#1A1A1A" stroke-width="10"/></g>`;
}
// burstSVG(text, fill, r, fs): a spiky comic burst ("WOW!", "KA-CHING!") centred on (0,0)
function burstSVG(text, fill = '#F7D23A', r = 150, fs = 60, col = '#D9363E') {
  const n = 14; let d = '';
  for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n, rr = i % 2 ? r * .66 : r * (1 + (i % 4 === 0 ? .08 : 0)); d += `${i ? 'L' : 'M'}${(Math.cos(a) * rr * 1.25).toFixed(1)},${(Math.sin(a) * rr * .8).toFixed(1)} `; }
  return `<path d="${d}Z" fill="${fill}" stroke="#1A1A1A" stroke-width="7" stroke-linejoin="round"/>` +
    `<text y="${fs * .36}" text-anchor="middle" font-family="Inter" font-weight="900" font-style="italic" font-size="${fs}" fill="${col}" stroke="#1A1A1A" stroke-width="3" paint-order="stroke">${text}</text>`;
}
// chaiTapriBG(id): a roadside chai stall at night: dark sky, string lights, the stall (CHAI board, kettle on a stove,
// glass jars), a bench, a street lamp
function chaiTapriBG(id) {
  return `<rect width="${W}" height="${H}" fill="#1F2A4A"/>` + fairyLightsSVG(320) + `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#3A3A44"/><path d="M0,${FLOOR} H${W}" stroke="#2A2A30" stroke-width="10"/>` +
    `<g transform="translate(770,${FLOOR})"><rect x="-260" y="-520" width="520" height="520" fill="#8C5A3A" stroke="${OL}" stroke-width="${OW}"/><rect x="-290" y="-600" width="580" height="90" rx="10" fill="${C.marigold}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<text x="0" y="-540" text-anchor="middle" font-family="Inter" font-weight="900" font-size="58" fill="${C.redDark}" letter-spacing="6">CHAI ☕</text>` +
    `<rect x="-280" y="-300" width="560" height="40" rx="8" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>` +
    [-200, -130, -60].map(x => `<rect x="${x}" y="-380" width="56" height="80" rx="10" fill="#DDEFF2" fill-opacity=".8" stroke="${OL}" stroke-width="3"/><rect x="${x + 6}" y="-340" width="44" height="34" rx="6" fill="${C.marigold2}"/>`).join('') +
    `<rect x="60" y="-340" width="140" height="40" rx="6" fill="#3E4A52" stroke="${OL}" stroke-width="4"/><path d="M90,-345 Q90,-420 140,-420 Q190,-420 190,-345 Z" fill="#B9B2A8" stroke="${OL}" stroke-width="4"/><path d="M190,-385 L230,-405" stroke="${OL}" stroke-width="8" stroke-linecap="round"/>` +
    `<path d="M120,-440 q-14,-30 4,-60 M150,-440 q14,-30 -4,-60" fill="none" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/></g>` +
    `<g transform="translate(110,${FLOOR})"><path d="M0,0 V-760" stroke="#2A2A30" stroke-width="14"/><path d="M0,-760 Q40,-800 90,-770" fill="none" stroke="#2A2A30" stroke-width="12"/><circle cx="96" cy="-740" r="26" fill="#FFE9A8"/><circle cx="96" cy="-740" r="130" fill="url(#glow)" opacity=".8"/></g>`;
}
// bookingCalendarSVG(id, n): a month page (7 x 5 days) where `${id}-t0..n-1` booking ticks can be popped in
function bookingCalendarSVG(id, month = 'BOOKINGS', n = 9) {
  let s = `<rect x="-300" y="-300" width="600" height="600" rx="24" fill="#fff" stroke="${OL}" stroke-width="${OW}"/><path d="M-300,-276 Q-300,-300 -276,-300 L276,-300 Q300,-300 300,-276 L300,-200 L-300,-200 Z" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<text y="-232" text-anchor="middle" font-family="Inter" font-weight="900" font-size="46" fill="${C.cream}" letter-spacing="4">${month}</text>`;
  const days = [2, 5, 9, 13, 16, 20, 23, 27, 30, 11, 18, 25];
  for (let i = 0; i < 35; i++) { const x = -255 + (i % 7) * 85, y = -150 + (i / 7 | 0) * 92; s += `<rect x="${x - 34}" y="${y - 34}" width="68" height="68" rx="10" fill="#F6F1EA"/><text x="${x}" y="${y + 10}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#8A8178">${i + 1 <= 31 ? i + 1 : ''}</text>`; }
  for (let k = 0; k < n; k++) { const i = days[k % days.length] - 1, x = -255 + (i % 7) * 85, y = -150 + (i / 7 | 0) * 92; s += `<g transform="translate(${x},${y})"><g id="${id}-t${k}" opacity="0"><circle r="32" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><path d="M-14,0 L-4,11 L15,-11" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g></g>`; }
  return s;
}

// ===== Darzi ne kaha: "Kal pakka!" (2026-11-24): countdown clock, tailor's shop front, handwritten board =====
// countdownClockSVG(id, label, r): a big alarm clock (hands `${id}-m` / `${id}-h`, tick them with clockTick-style tf)
// with a red label plate under it ("6 GHANTE BAAKI"); centred on the clock face
function countdownClockSVG(id, label, r = 140) {
  let s = `<g id="${id}"><path d="M${-r * .7},${-r * .78} L${-r * .95},${-r * 1.05} M${r * .7},${-r * .78} L${r * .95},${-r * 1.05}" stroke="${OL}" stroke-width="14" stroke-linecap="round"/>` +
    `<circle cx="${-r * .62}" cy="${-r * .9}" r="${r * .3}" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><circle cx="${r * .62}" cy="${-r * .9}" r="${r * .3}" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<circle r="${r}" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/><circle r="${r * .84}" fill="#fff" stroke="${OL}" stroke-width="4"/>`;
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<path d="M${Math.sin(a) * r * .66},${-Math.cos(a) * r * .66} L${Math.sin(a) * r * .78},${-Math.cos(a) * r * .78}" stroke="${OL}" stroke-width="6"/>`; }
  s += `<path id="${id}-m" d="M0,0 V${-r * .6}" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path id="${id}-h" d="M0,0 V${-r * .38}" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><circle r="10" fill="${C.red}"/>`;
  const w = label.length * 26 + 60;
  return s + `<g id="${id}-lab"><rect x="${-w / 2}" y="${r + 24}" width="${w}" height="76" rx="16" fill="#D9363E" stroke="${OL}" stroke-width="${OW}"/><text id="${id}-t" y="${r + 76}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="#fff">${label}</text></g></g>`;
}
// tailorShopFrontSVG(id, name): a small tailor's shop front (full width): sign board, a shutter pulled down
// (`${id}-sh`), steps in front; put a handBoardSVG on the shutter
function tailorShopFrontSVG(id, name = 'RAMESH TAILORS 🧵') {
  let s = `<rect width="${W}" height="${H}" fill="#E8D9C0"/><rect x="90" y="380" width="900" height="${FLOOR - 380}" fill="#C9A77A" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="120" y="400" width="840" height="120" rx="14" fill="${C.teal}" stroke="${OL}" stroke-width="${OW}"/><text x="540" y="482" text-anchor="middle" font-family="Inter" font-weight="900" font-size="60" fill="#fff" letter-spacing="3">${name}</text>` +
    `<g id="${id}-sh"><rect x="150" y="540" width="780" height="${FLOOR - 560}" fill="#A7A39C" stroke="${OL}" stroke-width="${OW}"/>`;
  for (let y = 580; y < FLOOR - 30; y += 40) s += `<path d="M150,${y} H930" stroke="#8C8880" stroke-width="5"/>`;
  s += `<rect x="500" y="${FLOOR - 60}" width="80" height="22" rx="8" fill="#6F6B64" stroke="${OL}" stroke-width="3"/></g>`;
  s += floorSVG('#A49E94') + `<rect x="120" y="${FLOOR - 10}" width="840" height="50" fill="#BDB7AD" stroke="${OL}" stroke-width="4"/><rect x="80" y="${FLOOR + 40}" width="920" height="50" fill="#B0AAA0" stroke="${OL}" stroke-width="4"/>`;
  return s;
}
// handBoardSVG(lines): a handwritten cardboard sign (taped corners), centred on (0,0)
function handBoardSVG(lines = ['Shaadi mein gaye hain.', 'Kal aana. 🙃']) {
  const w = 600, h = 80 + lines.length * 64;
  return `<g transform="rotate(-4)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="8" fill="#D9B98A" stroke="${OL}" stroke-width="${OW}"/>` +
    [[-w / 2, -h / 2], [w / 2, -h / 2]].map(([x, y]) => `<rect x="${x - 30}" y="${y - 14}" width="60" height="28" fill="#F4F1EC" opacity=".85" transform="rotate(${x < 0 ? -30 : 30},${x},${y})"/>`).join('') +
    lines.map((l, i) => `<text y="${-h / 2 + 76 + i * 64}" text-anchor="middle" font-family="Comic Sans MS, Segoe Print, cursive" font-weight="700" font-size="46" fill="#2A1A14">${l}</text>`).join('') + `</g>`;
}

// ===== Dulhan ka dress code (2026-11-26): group chat, polaroid, to-do list, mehendi cone =====
// groupChatScreen(title, sub, msgs, y0): for phoneSVG(…, 560, 1000): a chat-app group (header with a group icon) and
// message bubbles stacked from y0. msgs: [{ who, col, lines: [..], me, at, out, fs }] (`at` pops the bubble; `me` = green,
// right-aligned, no name). A typing bubble: { typing: true, at, out }.
function groupChatScreen(title, sub, msgs, y0 = -320) {
  let s = `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#EFE7DA"/>` +
    `<path d="M-264,-442 Q-264,-484 -222,-484 L222,-484 Q264,-484 264,-442 L264,-360 L-264,-360 Z" fill="${C.tealDark}"/>` +
    `<circle cx="-200" cy="-410" r="32" fill="${C.pink}" stroke="#fff" stroke-width="3"/><text x="-200" y="-398" text-anchor="middle" font-size="34">💍</text>` +
    `<text x="-152" y="-410" font-family="Inter" font-weight="800" font-size="30" fill="#fff">${title}</text><text x="-152" y="-378" font-family="Inter" font-weight="600" font-size="22" fill="#CFE6E0">${sub}</text>`;
  let y = y0;
  msgs.forEach(m => {
    if (m.typing) { s += `<g transform="translate(-150,${y + 30})"><g data-t="${m.at}"${m.out ? ` data-out="${m.out}"` : ''}><rect x="-90" y="-30" width="180" height="60" rx="30" fill="#fff"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="700" font-size="24" fill="#8A8178">typing…</text></g></g>`; y += 80; return; }
    const fs = m.fs || 27, lh = fs * 1.3, h = 24 + (m.who && !m.me ? lh : 0) + m.lines.length * lh, w = 430;
    const x = m.me ? 230 - w : -238;
    s += `<g data-t="${m.at || '-1'}"${m.out ? ` data-out="${m.out}"` : ''}><g transform="translate(0,0)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${m.me ? '#D9F2C9' : '#fff'}" stroke="${m.me ? '#B9D9A6' : '#E6E0D9'}" stroke-width="3"/>`;
    let ty = y + 12 + fs;
    if (m.who && !m.me) { s += `<text x="${x + 18}" y="${ty}" font-family="Inter" font-weight="800" font-size="${fs - 2}" fill="${m.col || C.teal}">${m.who}</text>`; ty += lh; }
    m.lines.forEach(l => { s += `<text x="${x + 18}" y="${ty}" font-family="Inter" font-weight="600" font-size="${fs}" fill="#141110">${l}</text>`; ty += lh; });
    s += `</g></g>`; y += h + 14;
  });
  return s;
}
// polaroidSVG(w, h, caption): a polaroid photo frame centred on (0,0) (a white frame with a thick bottom and a caption);
// put the photo underneath, inside the window x -w/2+24 … w/2-24, y -h/2+24 … h/2-120
function polaroidSVG(w = 860, h = 980, caption = 'Squad complete 💕') {
  const iw = w - 48, ih = h - 144;
  return `<path fill-rule="evenodd" d="M${-w / 2},${-h / 2} H${w / 2} V${h / 2} H${-w / 2} Z M${-iw / 2},${-h / 2 + 24} V${-h / 2 + 24 + ih} H${iw / 2} V${-h / 2 + 24} Z" fill="#FFFDF7" stroke="${OL}" stroke-width="${OW}"/>` +
    `<text y="${h / 2 - 44}" text-anchor="middle" font-family="Comic Sans MS, Segoe Print, cursive" font-weight="700" font-size="58" fill="${C.redDark}">${caption}</text>`;
}
// todoListSVG(title, lines): a small paper list with ticks, centred on (0,0)
function todoListSVG(title = 'Shaadi to-do', lines = ['Caterer ✓', 'Mehendi ✓', 'Photographer', 'Dress code…']) {
  return `<g transform="rotate(-6)"><rect x="-130" y="-150" width="260" height="300" rx="10" fill="#FFFDF7" stroke="${OL}" stroke-width="4"/><text x="-110" y="-104" font-family="Inter" font-weight="900" font-size="28" fill="${C.red}">${title}</text>` +
    lines.map((l, i) => `<text x="-110" y="${-56 + i * 52}" font-family="Comic Sans MS, Segoe Print, cursive" font-weight="700" font-size="26" fill="#2A1A14">${l}</text>`).join('') + `</g>`;
}
// mehendiConeSVG(): a mehendi cone, centred on (0,0), tip down-left
function mehendiConeSVG() { return `<g transform="rotate(-35)"><path d="M-16,-70 L16,-70 L4,60 L0,74 L-4,60 Z" fill="#E9DCC0" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><path d="M-16,-70 L16,-70 L14,-40 L-14,-40 Z" fill="#6B8E3A" stroke="${OL}" stroke-width="3"/></g>`; }
