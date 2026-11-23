// ===== Ek link, poori dukaan: reel-only helpers =====
const fx = (x, y, at_, txt, r = -8, out = '') => `<div class="pill" style="left:${x}px;top:${y}px;font-size:34px;padding:6px 18px;transform:translate(-50%,-50%) rotate(${r}deg);background:${C.gold}" data-t="${at_}"${out ? ` data-out="${out}"` : ''}>${txt}</div>`;
// a small phone in a hand (screen: chat green or the app's maroon bar)
function handPhone(id, sc = 1, kind = 'chat') {
  const bar = kind === 'chat' ? `<rect x="-42" y="-80" width="84" height="30" rx="10" fill="${C.tealDark}"/>` : `<rect x="-42" y="-80" width="84" height="30" rx="10" fill="url(#mar)"/>`;
  const body = kind === 'link' ? `<text x="0" y="30" text-anchor="middle" font-size="60">🔗</text>` :
    `<rect x="-34" y="-40" width="50" height="34" rx="8" fill="#D9F2C9"/><rect x="-16" y="2" width="50" height="34" rx="8" fill="#D9F2C9"/><rect x="-34" y="44" width="50" height="26" rx="8" fill="#fff"/>`;
  return `<g id="${id}"><g transform="scale(${sc})"><rect x="-52" y="-92" width="104" height="184" rx="18" fill="#1E1715" stroke="${OL}" stroke-width="4"/>` +
    `<rect x="-42" y="-80" width="84" height="160" rx="10" fill="${kind === 'chat' ? '#EFE7DA' : C.cream}"/>${bar}${body}</g></g>`;
}
function atHand(pid, who, h, dx = 0, dy = 0, r = 0, sc = 1) { const p = toScene(who, h); tf($(pid), p[0] + dx, p[1] + dy, sc, r); }
// ping rings around a buzzing phone, centred on (0,0); `${id}-r0..2` grow and fade
const pingRings = id => [0, 1, 2].map(i => `<circle id="${id}-r${i}" r="60" fill="none" stroke="#25A45A" stroke-width="8" opacity="0"/>`).join('');
function pingUpd(id, x, y, t, t0) { [0, 1, 2].forEach(i => { const k = ((t - t0 - i * .25) % 1 + 1) % 1, on = t > t0; tf($(`${id}-r${i}`), x, y, .6 + k * 1.2); op($(`${id}-r${i}`), on ? (1 - k) * .8 : 0); }); }

// WhatsApp-style chat header (generic: teal bar, round avatar, name) for phoneSVG(…, 560, 1000)
const chatTop = name => `<rect x="-264" y="-484" width="528" height="968" rx="42" fill="#EFE7DA"/>` +
  `<path d="M-264,-442 Q-264,-484 -222,-484 L222,-484 Q264,-484 264,-442 L264,-360 L-264,-360 Z" fill="${C.tealDark}"/>` +
  `<circle cx="-196" cy="-410" r="32" fill="${C.goldTan}" stroke="#fff" stroke-width="3"/><text x="-148" y="-404" font-family="Inter" font-weight="800" font-size="34" fill="#fff">${name}</text>` +
  `<text x="-148" y="-374" font-family="Inter" font-weight="600" font-size="22" fill="#CFE6E0">online</text>`;
const inMsg = (id, x, y, w, text, fs = 30) => `<g id="${id}" transform="translate(${x},${y})"><rect x="0" y="-40" width="${w}" height="80" rx="20" fill="#fff" stroke="#E6E0D9" stroke-width="3"/><text x="22" y="11" font-family="Inter" font-weight="700" font-size="${fs}" fill="${C.text}">${text}</text></g>`;
// the 30-photos chat: a grid of sent photos (`${id}-p0..14`), "+15" on the last, then two questions `${id}-q1`, `${id}-q2`
function photoChat(id) {
  let s = chatTop('Riya');
  for (let i = 0; i < 15; i++) {
    const c = i % 3, r = (i / 3) | 0, x = -70 + c * 112, y = -330 + r * 112, [col, d] = LOOKS[i % LOOKS.length];
    s += `<g id="${id}-p${i}" transform="translate(${x},${y})"><rect x="0" y="0" width="104" height="104" rx="12" fill="#D9F2C9" stroke="#B9D9A6" stroke-width="3"/><rect x="8" y="8" width="88" height="88" rx="8" fill="${C.cream}"/><g transform="translate(52,40)">${lehengaHangerSVG('', { c: col, d, dupatta: C.goldTan }, .19)}</g>` +
      (i === 14 ? `<rect x="0" y="0" width="104" height="104" rx="12" fill="#000" opacity=".5"/><text x="52" y="66" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#fff">+15</text>` : '') + `</g>`;
  }
  return s + inMsg(`${id}-q1`, -240, 270, 330, 'Price kya hai? 🤔', 32) + inMsg(`${id}-q2`, -240, 370, 420, 'Aur koi design hai? 🤷‍♀️', 32) +
    `<rect x="-244" y="400" width="400" height="64" rx="32" fill="#fff" opacity="0"/>`;
}
// the customer chat: her request `${id}-m1`, then Meenaben's one link `${id}-m2`
function linkChat(id) {
  return chatTop('Riya') + inMsg(`${id}-m1`, -240, -290, 470, 'Hi, lehenga ke photos bhejo na 🙏', 27) +
    `<g transform="translate(40,60)"><g id="${id}-m2">${linkMsgSVG(`${id}-lk`, 'Meenaben Rentals', ['Ye lo, saare outfits aur', 'price yahan hain 😊'])}</g></g>` +
    `<rect x="-244" y="400" width="400" height="64" rx="32" fill="#fff"/><circle cx="210" cy="432" r="34" fill="${C.tealDark}"/><path d="M196,416 L230,432 L196,448 L202,432 Z" fill="#fff"/>`;
}
// Meenaben's shop page in the app with the name hidden: `${id}-real` (real header, hidden), Rent pills, the picked
// card frame `${id}-sel` and a heart `${id}-hrt` on card 1
function shopPage(id, liveAt = '-1') {
  let s = arShopScreen('Meenaben Rentals', liveAt).replace(arHeader(), arMysteryHeader() + `<g id="${id}-real" opacity="0">${arHeader()}</g>`);
  [[-122, 0], [122, 0], [-122, 300], [122, 300]].forEach(([x, y], i) => {
    s += `<g transform="translate(${x + 56},${y + 110})"><g id="${id}-r${i}"><rect x="-46" y="-18" width="92" height="36" rx="18" fill="${C.cream}" stroke="${C.goldTan}" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${C.red}">Rent</text></g></g>`;
  });
  return s + `<g transform="translate(122,0)"><g id="${id}-sel" opacity="0"><rect x="-118" y="-146" width="236" height="292" rx="20" fill="none" stroke="#141110" stroke-width="7"/></g>` +
    `<g id="${id}-hrt" opacity="0">${heartPath(70, -104, 2.2)}</g></g>`;
}
