// ===== Do dukaan, do kahaniyan: reel-only helpers =====
const fx = (x, y, at_, txt, r = -8, out = '') => `<div class="pill" style="left:${x}px;top:${y}px;font-size:34px;padding:6px 18px;transform:translate(-50%,-50%) rotate(${r}deg);background:${C.gold}" data-t="${at_}"${out ? ` data-out="${out}"` : ''}>${txt}</div>`;
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
// a small phone (screen: the app's maroon bar or "? ? ?")
function handPhone(id, sc = 1) {
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="${C.cream}"/><rect x="-42" y="-80" width="84" height="30" rx="10" fill="url(#mar)"/>` +
    `<g transform="translate(0,14)">${lehengaHangerSVG('', { c: '#A3262A', d: '#7A1B2A', dupatta: '#E8C25E' }, .2)}</g></g></g>`;
}
// a shop's page in the app for phoneSVG(…, 560, 1000): name hidden ("? ? ?") with `${id}-real` to flip in; Rent pills, no amounts
function shopPage(id, name, liveAt = '-1') {
  let s = arShopScreen(name, liveAt).replace(arHeader(), arMysteryHeader() + `<g id="${id}-real" opacity="0">${arHeader()}</g>`);
  [[-122, 0], [122, 0], [-122, 300], [122, 300]].forEach(([x, y]) => {
    s += `<g transform="translate(${x + 56},${y + 110})"><rect x="-46" y="-18" width="92" height="36" rx="18" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${C.red}">Rent</text></g>`;
  });
  return s;
}
// the evening light over the street
const evening = () => `<rect width="${W}" height="${H}" fill="#E07B39" opacity=".18"/><rect width="${W}" height="380" fill="#3E2A5C" opacity=".35"/>`;
