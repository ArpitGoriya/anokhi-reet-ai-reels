// ===== Mehenga lehenga: reel-only drawings =====
const BV = BHAVESH, CH = CHINTU;
const PREM = { c: '#7A0F2A', d: '#5A0A1F', b: C.gold, dupatta: '#E8C25E' };   // the ₹6,000 premium piece
const MID = { c: C.pink, d: C.pinkDark, b: C.gold, dupatta: '#F4B9C8' };       // the ₹2,500 one
const BASIC = { c: '#4F86C6', d: '#3A6AA3', b: '#F2C14E', dupatta: '#A9C4E8' }; // the ₹1,000 one
const CWs = dress(CUSTOMER_W, { skirt: { c: C.pinkDark, d: '#8E2E4A', b: C.gold, w: 190 } });

// a lehenga on a display stand (pole + round base) centred on x, hanger hook at y
function displayStand(id, look, x, y, sc = 1, tag = '', tagAt = '-1') {
  return `<g transform="translate(${x},${y})"><rect x="-8" y="-120" width="16" height="${560 * sc}" fill="${C.woodDark}" stroke="${OL}" stroke-width="4"/>` +
    `<ellipse cx="0" cy="${560 * sc - 120}" rx="${110 * sc}" ry="22" fill="${C.woodDark}" stroke="${OL}" stroke-width="4"/>` +
    `<path d="M-60,-120 H60" stroke="${C.woodDark}" stroke-width="12" stroke-linecap="round"/>` +
    `<g transform="translate(0,-30)">${lehengaHangerSVG(id, look, sc)}</g></g>` +
    (tag ? priceTag(id + '-tag', tag, x + 120 * sc, y - 10, tagAt, { fs: 34 }) : '');
}
const rs = n => '₹' + n.toLocaleString('en-IN');
const UDA = (x = 540, y = 440, at = '-1') => pillH(x, y, at, 'Udaharan 📝', 'gold');

// Bhaveshbhai's listing in the app (for phoneSVG 560x1000): three lehengas side by side with prices; "Listed ✓"
// pops at listedAt; from shineAt the middle one gets a bigger gold frame and a "Most loved ❤️" ribbon
function threeListScreen(listedAt = '-1', shineAt = '') {
  let s = arHeader() + `<text x="0" y="-330" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#141110">Bhavesh Rentals</text>` +
    `<text x="0" y="-286" text-anchor="middle" font-family="Inter" font-weight="600" font-size="26" fill="#655C57">Bridal lehenge · 3 options</text>`;
  [[BASIC, 1000], [MID, 2500], [PREM, 6000]].forEach(([look, p], i) => {
    const x = -170 + i * 170, mid = i === 1;
    s += `<g transform="translate(${x},-40)"><rect x="-76" y="-200" width="152" height="330" rx="16" fill="${C.cream}" stroke="#E6E0D9" stroke-width="3"/>` +
      (mid && shineAt ? `<g data-t="${shineAt}"><rect x="-84" y="-208" width="168" height="346" rx="18" fill="none" stroke="${C.gold}" stroke-width="10"/></g>` : '') +
      `<g transform="translate(0,-110)">${lehengaHangerSVG('', look, .38)}</g>` +
      `<text y="98" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${C.red}">${rs(p)}</text></g>`;
  });
  s += `<text x="0" y="150" text-anchor="middle" font-family="Inter" font-weight="700" font-size="24" fill="#655C57">(Udaharan)</text>`;
  if (shineAt) s += `<g transform="translate(0,-280)"><g data-t="${shineAt}+0.25" data-k="drop">${ribbonSVG('Most loved ❤️', 26)}</g></g>` +
    [[-60, -230], [70, -120], [-50, 60]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g data-t="${shineAt}+${(.4 + i * .15).toFixed(2)}" data-bob="5" data-ph="${i}">${sparkleSVG(18, C.gold)}</g></g>`).join('');
  s += `<g transform="translate(0,250)"><g data-t="${listedAt}"><rect x="-120" y="-36" width="240" height="72" rx="36" fill="${C.emerald}" stroke="${OL}" stroke-width="4"/><text y="13" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="#fff">Listed ✓</text></g></g>`;
  return s;
}
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
const SALUTE = [168, 62];
