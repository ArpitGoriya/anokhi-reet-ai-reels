// ===== Cupboard full: reel-only helpers =====
// a small phone in a hand showing one outfit (from Dukaan-dukaan)
function handPhone(id, look, sc = 1) {
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="${C.cream}"/><rect x="-42" y="-80" width="84" height="30" rx="10" fill="url(#mar)"/><circle cx="-26" cy="-65" r="8" fill="${C.cream}"/>` +
    `<g transform="translate(0,6)">${lehengaHangerSVG('', look, .2)}</g></g></g>`;
}
function atHand(pid, who, h, dx = 0, dy = 0, r = 0) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, 1, r); }
