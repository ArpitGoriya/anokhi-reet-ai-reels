// ===== Last minute invitation: reel-only drawings =====
const YELLOW = { c: C.marigold2, d: '#D9A52E', b: C.red, dupatta: '#E26A8A' };
// Friday's planner: a day card with meeting blocks (ids `${id}-m0..4`, pop them in)
function dayCardSVG(id) {
  let s = `<g id="${id}"><rect x="-330" y="-430" width="660" height="860" rx="30" fill="#fff" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M-330,-400 Q-330,-430 -300,-430 L300,-430 Q330,-430 330,-400 L330,-300 L-330,-300 Z" fill="${C.red}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<text x="0" y="-346" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="${C.cream}" letter-spacing="4">FRIDAY</text>`;
  const hours = ['9', '10', '11', '12', '2', '3', '4', '5'];
  hours.forEach((h, i) => { s += `<text x="-290" y="${-250 + i * 82}" font-family="Inter" font-weight="700" font-size="32" fill="#767676">${h}</text><path d="M-230,${-262 + i * 82} H300" stroke="#E6E0D9" stroke-width="3"/>`; });
  const m = [[0, 2, 'Meeting', '#8FB3CF'], [2, 1, 'Call', C.marigold2], [3, 1, 'Review', '#F4B9C8'], [4, 2, 'Meeting', '#A6D3B0'], [6, 2, 'Deadline!', '#F2A08F']];
  m.forEach(([r, n, txt, col], i) => { s += `<g transform="translate(40,${-290 + r * 82 + n * 41})"><g id="${id}-m${i}" data-t="c14+${(.15 + i * .3).toFixed(2)}"><rect x="-250" y="${-n * 41 + 6}" width="500" height="${n * 82 - 12}" rx="14" fill="${col}" stroke="${OL}" stroke-width="4"/><text x="-220" y="12" font-family="Inter" font-weight="800" font-size="34" fill="#1A1A1A">${txt}</text></g></g>`; });
  return s + `</g>`;
}
// a mug of coffee with steam
function mugSVG() { return `<path d="M-40,-50 L40,-50 L34,40 Q0,52 -34,40 Z" fill="#fff" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><path d="M40,-30 Q66,-30 62,-4 Q58,18 36,14" fill="none" stroke="${OL}" stroke-width="7"/><path d="M-36,-40 H36" stroke="#7A4A2A" stroke-width="10"/>` + [-16, 8].map((x, i) => `<path class="twinkle" data-i="${i}" d="M${x},-64 q10,-16 0,-30 q-10,-14 0,-30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>`).join(''); }
// small phone showing the Anokhi Reet seal (held up by Aarti, Dimple, the friends)
function arMiniPhone(id, sc = 1) {
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="url(#mar)"/><circle cx="0" cy="-14" r="26" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/><circle cx="0" cy="-14" r="14" fill="none" stroke="${C.red}" stroke-width="3"/>` +
    `<rect x="-30" y="26" width="60" height="10" rx="5" fill="${C.cream}"/><rect x="-22" y="44" width="44" height="8" rx="4" fill="${C.goldTan}"/></g></g>`;
}
// phone lock screen with a message notification (`${id}-n` pops in)
function lockScreen(at) {
  return `<rect x="-244" y="-464" width="488" height="928" rx="42" fill="#2E3D63"/><circle cx="120" cy="-260" r="200" fill="#3A4D7A"/>` +
    `<text x="0" y="-250" text-anchor="middle" font-family="Inter" font-weight="300" font-size="120" fill="#fff">10:00</text>` +
    `<text x="0" y="-190" text-anchor="middle" font-family="Inter" font-weight="600" font-size="32" fill="#DDE6F2">Thursday</text>` +
    `<g transform="translate(0,-40)"><g data-t="${at}" data-k="drop"><rect x="-220" y="-90" width="440" height="200" rx="28" fill="#fff" stroke="${OL}" stroke-width="4"/>` +
    `<circle cx="-170" cy="-40" r="28" fill="${C.pink}" stroke="${OL}" stroke-width="3"/><text x="-170" y="-28" text-anchor="middle" font-size="30">💃</text>` +
    `<text x="-126" y="-30" font-family="Inter" font-weight="800" font-size="32" fill="#141110">Sangeet group</text>` +
    `<text x="-196" y="30" font-family="Inter" font-weight="600" font-size="30" fill="#141110">Saturday ko sangeet hai,</text>` +
    `<text x="-196" y="74" font-family="Inter" font-weight="600" font-size="30" fill="#141110">aana zaroor! 💃</text></g></g>`;
}
// "tap" mark near a fingertip
function tapMark() { return `<circle r="30" fill="none" stroke="#fff" stroke-width="6"/><circle r="50" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>`; }
// a big question mark
function qMark(col = C.red) { return `<text x="0" y="30" text-anchor="middle" font-family="Inter" font-weight="900" font-size="150" fill="${col}" stroke="${OL}" stroke-width="5" paint-order="stroke">?</text>`; }
const SAREE = (look, c, d) => dress(look, { skirt: { c, d, b: C.gold, w: 195 } });
