// ===== Season ka sapna: reel-only drawings =====
// a small phone held in a hand, screen showing one outfit (lehenga or sherwani)
function heldPhone(id, look = { k: 'l', c: '#C0262D', d: '#97151B', p: '#F2A08F' }, sc = 1) {
  const o = look.k === 's' ? sherwaniHangerSVG(id + '-o', look.c, look.d, .2) : lehengaHangerSVG(id + '-o', { c: look.c, d: look.d, dupatta: look.p }, .2);
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="${C.cream}"/><g transform="translate(0,-14)">${o}</g></g></g>`;
}
// a pen for writing in the register
function penSVG() { return `<g transform="rotate(35)"><rect x="-9" y="-120" width="18" height="110" rx="6" fill="#2E4A7A" stroke="${OL}" stroke-width="4"/><path d="M-9,-10 L0,14 L9,-10 Z" fill="${C.goldTan}" stroke="${OL}" stroke-width="3"/></g>`; }
// a thought cloud with a tiny busy shop inside
function thoughtCloud() {
  let s = `<path d="M-150,40 Q-200,40 -190,-10 Q-210,-70 -140,-80 Q-120,-140 -50,-120 Q0,-170 60,-125 Q130,-150 150,-80 Q215,-60 190,0 Q210,60 140,60 Q100,100 30,80 Q-40,110 -90,75 Q-140,90 -150,40 Z" fill="#FFFFFF" stroke="${OL}" stroke-width="${OW}" stroke-linejoin="round"/>`;
  const cols = ['#C0262D', C.emerald, '#7A4FA0', C.marigold, C.pink];
  for (let i = 0; i < 5; i++) { const x = -120 + i * 60; s += `<path d="M${x - 20},50 Q${x - 20},10 ${x},6 Q${x + 20},10 ${x + 20},50 Z" fill="${cols[i]}" stroke="${OL}" stroke-width="3"/><circle cx="${x}" cy="-12" r="16" fill="${['#C98B62', '#B97A55', '#D19A72'][i % 3]}" stroke="${OL}" stroke-width="3"/>`; }
  return s + `<g transform="translate(120,-70)">${sparkleSVG(16, C.gold)}</g>`;
}
// a small counter only in the middle of the frame (customers stand either side)
function midCounter(x0 = 300, x1 = 780, y = 1010) {
  return `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${FLOOR + 60 - y}" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${x0 - 16}" y="${y - 16}" width="${x1 - x0 + 32}" height="28" rx="6" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<path d="M${x0},${y + 90} H${x1}" stroke="#86593A" stroke-width="5" opacity=".6"/>`;
}
const SAREE = (look, c, d) => dress(look, { skirt: { c, d, b: C.gold, w: 195 } });
