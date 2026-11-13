// ===== Reel cover (1080x1920; key content inside the centre 1080x1350 grid crop: y 285-1635) =====
(function () {
  const photo = `<g transform="translate(850,830) rotate(7) scale(.62)">
    <rect x="-200" y="-240" width="400" height="480" rx="16" fill="#fff" stroke="${OL}" stroke-width="8"/>
    <clipPath id="cvp"><rect x="-176" y="-216" width="352" height="372" rx="8"/></clipPath>
    <g clip-path="url(#cvp)"><rect x="-180" y="-220" width="360" height="380" fill="#F7DCC8"/>
      ${[...Array(6)].map((_, i) => `<circle cx="${-160 + i * 64}" cy="-200" r="16" fill="${i % 2 ? C.marigold : C.marigold2}" stroke="${OL}" stroke-width="3"/>`).join('')}
      ${[-110, 0].map((x, i) => `<path d="M${x - 50},160 Q${x - 50},40 ${x},30 Q${x + 50},40 ${x + 50},160 Z" fill="${['#E0A33A', '#7A4FA0'][i]}" stroke="${OL}" stroke-width="5"/><circle cx="${x}" cy="-30" r="44" fill="${['#B97A55', '#D19A72'][i]}" stroke="${OL}" stroke-width="5"/><path d="M${x - 44},-36 Q${x},-90 ${x + 44},-36 Q${x},-60 ${x - 44},-36 Z" fill="#2A1A14"/><path d="M${x - 14},-14 Q${x},-2 ${x + 14},-14" fill="none" stroke="${OL}" stroke-width="4"/>`).join('')}
      <g transform="translate(110,0)"><path d="M-56,160 Q-56,40 0,30 Q56,40 56,160" fill="#FFF2DF" fill-opacity=".6" stroke="${C.red}" stroke-width="7" stroke-dasharray="16 10"/><circle cx="0" cy="-30" r="46" fill="#FFF2DF" fill-opacity=".6" stroke="${C.red}" stroke-width="7" stroke-dasharray="16 10"/>
        <circle cx="0" cy="-30" r="30" fill="${C.red}" stroke="${OL}" stroke-width="5"/><text x="0" y="-12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="48" fill="#FFF2DF">?</text></g>
    </g>
    <text x="0" y="206" text-anchor="middle" font-family="Inter" font-weight="700" font-size="34" fill="${C.brown}">shaadi no. 3</text></g>`;
  const tag = `<g transform="translate(210,700) rotate(-9)">${priceTagSVG('cv-tag', '₹38,000', 0, 0, { fs: 44 })}</g>`;
  const svg = weddingBG() + `<circle cx="470" cy="900" r="460" fill="url(#glow)"/>` + photo + stand('cvh', LEH, 450, 1010, .92) + tag;
  const html = `
    <div class="title" style="top:412px;font-size:104px;width:1040px">₹38,000 ki lehenga,<br><span class="g">photo se GAAYAB!</span></div>
    <div class="pill big" style="left:540px;top:1452px">140 photos, Hetal sirf <span class="hl">9</span> mein</div>
    <div class="pill gold" style="left:540px;top:1572px;font-size:42px">Sunk cost fallacy</div>`;
  $('scenes').innerHTML = svg;
  const d = document.createElement('div'); d.className = 'sui'; d.innerHTML = html; $('ui').insertBefore(d, $('cap'));
  face('cvh', 0.5, { mouth: 'shy', brows: 'worry', blush: .9, sweat: 1, tilt: -6 });
  tf($('cvh-sweat'), 0, 0, 1);
  arm('cvh', 'L', 12, -96, 'fist'); arm('cvh', 'R', 12, -96, 'fist');
})();
