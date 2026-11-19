// ===== Rent kam rakha: reel-only drawings =====
const RK = REKHA, JG = JIGNA;
const CWs = dress(CUSTOMER_W, { skirt: { c: C.pinkDark, d: '#8E2E4A', b: C.gold, w: 190 } });
const W1s = dress(GUEST_W1, { skirt: { c: '#7A4FA0', d: '#5D3A7E', b: C.gold, w: 195 } });
const BRIDAL = { c: C.lehenga, d: C.lehengaDark, b: C.gold, dupatta: '#E8C25E' };

// a small phone in a hand showing one outfit
function miniPhone(id, look = BRIDAL, sc = 1) {
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="${C.cream}"/><rect x="-42" y="-80" width="84" height="30" rx="10" fill="url(#mar)"/><circle cx="-26" cy="-65" r="8" fill="${C.cream}"/>` +
    `<g transform="translate(0,6)">${lehengaHangerSVG('', look, .2)}</g></g></g>`;
}
function atHand(pid, who, h, dx = 0, dy = 0, r = 0) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, 1, r); }

// Rekhaben's listing in the app (for phoneSVG 560x1000): big photo, title, "Rent ₹1,800" (her example, labelled
// Udaharan), photo strip, and a "Listed ✓" badge that pops at `listedAt`
function listingScreen(listedAt = '-1') {
  let s = arHeader() + `<rect x="-244" y="-372" width="488" height="420" rx="18" fill="${C.cream}"/><g transform="translate(0,-250)">${lehengaHangerSVG('', BRIDAL, .8)}</g>`;
  s += `<text x="-236" y="100" font-family="Inter" font-weight="900" font-size="36" fill="#141110">Lal bridal lehenga</text><text x="-236" y="140" font-family="Inter" font-weight="600" font-size="26" fill="#655C57">Rekha Rentals</text>`;
  s += `<rect x="-236" y="166" width="230" height="58" rx="29" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="4"/><text x="-121" y="205" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="${C.red}">Rent ₹1,800</text>`;
  s += `<text x="10" y="204" font-family="Inter" font-weight="700" font-size="22" fill="#655C57">(Udaharan)</text>`;
  s += [0, 1, 2].map(i => `<rect x="${-236 + i * 160}" y="250" width="144" height="120" rx="12" fill="#F2EEE9" stroke="#E6E0D9" stroke-width="3"/><g transform="translate(${-164 + i * 160},290)">${lehengaHangerSVG('', BRIDAL, .22)}</g>`).join('');
  s += `<g transform="translate(140,-320)"><g data-t="${listedAt}"><rect x="-90" y="-30" width="180" height="60" rx="30" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><text y="11" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#fff">Listed ✓</text></g></g>`;
  return s;
}
// close-up circles for STEP 2 (each centred on 0,0, radius r)
function zoomCircle(inner, r = 180) { return `<circle r="${r + 10}" fill="${OL}" opacity=".15" cy="10"/><circle r="${r}" fill="#FFF8EC" stroke="${OL}" stroke-width="${OW}"/><clipPath id="zc${r}${inner.length}"><circle r="${r - 6}"/></clipPath><g clip-path="url(#zc${r}${inner.length})">${inner}</g>`; }
function fabricInner() { let s = `<rect x="-200" y="-200" width="400" height="400" fill="${C.lehenga}"/>`; for (let i = -6; i <= 6; i++) s += `<path d="M${i * 34 - 200},-200 L${i * 34 + 200},200" stroke="${C.lehengaDark}" stroke-width="10" opacity=".6"/>`; return s + `<path d="M-200,120 Q0,40 200,120" stroke="${C.gold}" stroke-width="22" fill="none"/>`; }
function embroideryInner() { let s = `<rect x="-200" y="-200" width="400" height="400" fill="${C.lehengaDark}"/>`; for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) { const x = -160 + c * 80 + (r % 2) * 40, y = -160 + r * 80; s += `<circle cx="${x}" cy="${y}" r="20" fill="none" stroke="${C.gold}" stroke-width="6"/><circle cx="${x}" cy="${y}" r="7" fill="${C.gold}"/>`; } return s; }
function dryCleanInner() { return `<rect x="-200" y="-200" width="400" height="400" fill="#EAF3F6"/><g transform="translate(0,-40)">${lehengaHangerSVG('', BRIDAL, .45)}</g><g transform="translate(30,60) rotate(-6)"><rect x="-110" y="-30" width="220" height="64" rx="12" fill="#fff" stroke="${OL}" stroke-width="4"/><text y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="28" fill="${C.emerald}">Dry cleaned ✓</text></g>`; }
// a low green hedge planter in front of people on a street (from x0 to x1, top at y)
function hedgeSVG(x0 = -20, x1 = W + 20, y = 1080) {
  let s = `<rect x="${x0}" y="${y + 40}" width="${x1 - x0}" height="${FLOOR + 60 - y - 40}" fill="${C.woodDark}" stroke="${OL}" stroke-width="${OW}"/>`;
  for (let x = x0 + 30; x < x1; x += 70) s += `<circle cx="${x}" cy="${y + 40}" r="48" fill="${(x / 70) % 2 < 1 ? C.leaf : C.leafDark}" stroke="${OL}" stroke-width="4"/>`;
  return s;
}
// a small counter only in the middle of the frame (from Season ka sapna)
function counterMid(x0 = 300, x1 = 780, y = 1010) {
  return `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${FLOOR + 60 - y}" fill="${C.wood}" stroke="${OL}" stroke-width="${OW}"/>` +
    `<rect x="${x0 - 16}" y="${y - 16}" width="${x1 - x0 + 32}" height="28" rx="6" fill="${C.woodLight}" stroke="${OL}" stroke-width="${OW}"/>`;
}
