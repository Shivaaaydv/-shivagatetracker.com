// Prop and environment library (original vector art).
const { P, S, f, sh, hl, ell, rect, path, line, txt, rng } = require('./lib');

const at = (x, y, s, inner, flip = false, rot = 0) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${flip ? -s : s} ${s})">${inner}</g>`;

// ---------- money ----------
function coin(x, y, r = 22, o = {}) {
  const sym = o.sym === false ? '' : `<text x="0" y="${f(r * 0.36)}" font-family="'Baloo 2','Andika'" font-weight="800" font-size="${f(r * 1.05)}" fill="${P.goldDark}" text-anchor="middle">₹</text>`;
  if (o.edge) return at(x, y, 1, `<ellipse cx="0" cy="${f(r * 0.12)}" rx="${r}" ry="${f(r * 0.32)}" fill="${P.goldDark}" ${S(2.6)}/><ellipse cx="0" cy="0" rx="${r}" ry="${f(r * 0.32)}" fill="${P.gold}" ${S(2.6)}/>`);
  return at(x, y, 1, `<circle r="${r}" fill="${P.gold}" ${S(2.8)}/><circle r="${f(r * 0.76)}" fill="none" stroke="${P.goldDark}" stroke-width="2.4"/>${sym}<path d="M${f(-r * 0.55)} ${f(-r * 0.45)} Q${f(-r * 0.3)} ${f(-r * 0.75)} ${f(r * 0.05)} ${f(-r * 0.78)}" stroke="#fff" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>`);
}
function coinStack(x, y, n, r = 26) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const cy = -i * r * 0.36 + (i % 2 ? 0.8 : -0.8);
    s += `<path d="M${-r} ${f(cy)} L${-r} ${f(cy + r * 0.2)} A${r} ${f(r * 0.32)} 0 0 0 ${r} ${f(cy + r * 0.2)} L${r} ${f(cy)}" fill="${P.goldDark}" ${S(2.4)}/><ellipse cx="0" cy="${f(cy)}" rx="${r}" ry="${f(r * 0.32)}" fill="${P.gold}" ${S(2.4)}/>`;
  }
  return at(x, y, 1, s);
}
function piggy(x, y, s = 1, o = {}) {
  const pk = P.pink, dk = P.pinkDeep;
  let g = '';
  g += [[-50, 1], [-22, 0], [30, 1], [56, 0]].map(([lx, b]) => `<rect x="${lx - 11}" y="${b ? 30 : 34}" width="22" height="${b ? 34 : 30}" rx="7" fill="${b ? dk : pk}" ${S()}/>`).join('');
  g += `<path d="M86 -6 q22 -4 18 12 q-4 12 -14 2 q-6 -8 8 -12" fill="none" ${S(3.4)}/>`;
  g += `<ellipse cx="0" cy="0" rx="95" ry="64" fill="${pk}" ${S()}/>`;
  g += sh('M-60 40 Q0 76 70 38 Q40 64 -10 64 Q-50 62 -60 40Z', 0.12);
  g += `<path d="M-50 -48 L-34 -86 L-14 -58Z" fill="${dk}" ${S()}/><path d="M-6 -60 L18 -92 L28 -56Z" fill="${dk}" ${S()}/>`;
  g += `<ellipse cx="-94" cy="6" rx="22" ry="27" fill="${P.pinkPale}" ${S()}/><ellipse cx="-100" cy="-2" rx="4" ry="7" fill="${P.ink}"/><ellipse cx="-89" cy="-2" rx="4" ry="7" fill="${P.ink}"/>`;
  g += o.closed ? `<path d="M-60 -16 q8 -8 16 0" fill="none" ${S(3.4)}/>` : `<ellipse cx="-52" cy="-16" rx="7" ry="9" fill="${P.ink}"/><circle cx="-54" cy="-19" r="2.6" fill="#fff"/>`;
  g += `<ellipse cx="-70" cy="8" rx="10" ry="6" fill="#ef8a7a" opacity=".5"/>`;
  g += `<rect x="-10" y="-68" width="44" height="9" rx="4" fill="${P.ink}"/>`;
  g += hl('M-40 -40 Q-10 -60 30 -52 Q-6 -46 -40 -30Z', 0.4);
  if (o.heart) g += `<path d="M20 4 c0 -10 14 -10 14 0 c0 -10 14 -10 14 0 c0 10 -14 18 -14 22 c0 -4 -14 -12 -14 -22Z" fill="${P.coral}" ${S(2.4)}/>`;
  return at(x, y, s, g, o.flip);
}
function jar(x, y, s, label, col, nCoins = 4, o = {}) {
  let g = '';
  g += `<path d="M-70 -150 L-70 -10 Q-70 10 -50 10 L50 10 Q70 10 70 -10 L70 -150Z" fill="#eaf6fa" fill-opacity=".55" ${S()}/>`;
  const r = rng(nCoins * 7 + label.length);
  for (let i = 0; i < nCoins; i++) { const cx = -40 + ((i * 37) % 80) + r() * 8, cy = -10 - Math.floor(i / 3) * 16 - r() * 4; g += coin(cx, cy, 15, { edge: true }); }
  if (o.heart) g += `<path d="M-14 -50 c0 -14 18 -14 18 0 c0 -14 18 -14 18 0 c0 14 -18 24 -18 30 c0 -6 -18 -16 -18 -30Z" fill="${P.coral}" ${S(2.4)}/>`;
  g += `<path d="M-48 -140 L-48 -20" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".7"/>`;
  g += `<rect x="-80" y="-176" width="160" height="30" rx="8" fill="${col}" ${S()}/><rect x="-74" y="-170" width="148" height="8" rx="4" fill="#fff" opacity=".3"/>`;
  g += `<rect x="-58" y="-128" width="116" height="52" rx="8" fill="${P.white}" ${S(2.8)}/>`;
  g += `<text x="0" y="-90" font-family="'Baloo 2'" font-weight="800" font-size="${o.fs || 34}" fill="${col}" text-anchor="middle" stroke="${P.ink}" stroke-width="1.2">${label}</text>`;
  return at(x, y, s, g);
}

// ---------- vehicles / objects ----------
function bicycle(x, y, s = 1, col = P.red, o = {}) {
  const R = 70;
  const wheel = (cx) => {
    let w = `<circle cx="${cx}" cy="0" r="${R}" fill="none" stroke="${P.ink}" stroke-width="13"/><circle cx="${cx}" cy="0" r="${R - 9}" fill="none" stroke="#c9cfd3" stroke-width="3.5"/>`;
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; w += line(cx, 0, cx + Math.cos(a) * (R - 10), Math.sin(a) * (R - 10), 1.8, '#8d969b'); }
    return w + `<circle cx="${cx}" cy="0" r="8" fill="#c9cfd3" ${S(2.4)}/>`;
  };
  let g = wheel(-100) + wheel(100);
  const tube = (d, w = 11) => `<path d="${d}" fill="none" stroke="${P.ink}" stroke-width="${w + 6}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  g += tube('M-100 0 L-20 0 L-48 -96 Z') + tube('M-20 0 L62 -84 L-48 -96') + tube('M100 0 L62 -84 L54 -112', 10);
  g += `<path d="M-20 0 L-12 6" stroke="${P.ink}" stroke-width="4"/><circle cx="-20" cy="0" r="16" fill="#c9cfd3" ${S(2.6)}/><path d="M-20 0 L-6 22" stroke="${P.ink}" stroke-width="5"/><rect x="-14" y="18" width="20" height="7" rx="2" fill="${P.ink}"/>`;
  g += `<path d="M-48 -96 L-56 -114" stroke="${P.ink}" stroke-width="7"/><path d="M-84 -120 Q-60 -132 -30 -120 Q-56 -110 -84 -120Z" fill="${P.brownDark}" ${S(2.6)}/>`;
  g += `<path d="M54 -112 L36 -126 M54 -112 L76 -120" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><path d="M30 -129 L44 -124" stroke="${P.ink}" stroke-width="12" stroke-linecap="round"/>`;
  g += `<circle cx="70" cy="-128" r="8" fill="#e1e6e8" ${S(2.4)}/>`;
  g += `<path d="M-100 -6 Q-100 -86 -40 -74" fill="none" stroke="${col}" stroke-width="0"/>`;
  g += `<path d="M-160 -24 Q-100 -86 -40 -32" fill="none" stroke="${P.ink}" stroke-width="3" opacity="0"/>`;
  g += `<path d="M30 -62 L50 -58" stroke="#fff" stroke-width="3" opacity=".6"/>`;
  if (o.basket) g += `<path d="M78 -132 L130 -132 L124 -98 L84 -98Z" fill="${P.woodLight}" ${S()}/>`;
  if (o.shine) for (const [sx, sy, r] of [[-130, -150, 14], [120, -170, 10], [10, -170, 8]]) g += `<path d="M${sx} ${sy - r} L${sx + r * 0.3} ${sy - r * 0.3} L${sx + r} ${sy} L${sx + r * 0.3} ${sy + r * 0.3} L${sx} ${sy + r} L${sx - r * 0.3} ${sy + r * 0.3} L${sx - r} ${sy} L${sx - r * 0.3} ${sy - r * 0.3}Z" fill="${P.yellow}" ${S(2)}/>`;
  return at(x, y - R * s, s, g, o.flip);
}
function helmet(x, y, s = 1, col = P.yellow) {
  return at(x, y, s, `<path d="M-50 0 Q-50 -56 0 -58 Q50 -56 52 0 Z" fill="${col}" ${S()}/><path d="M-30 -50 L-24 -8 M0 -58 L0 -6 M30 -50 L24 -8" stroke="${P.ink}" stroke-width="3" opacity=".5"/><rect x="-56" y="-6" width="112" height="12" rx="6" fill="${P.blue}" ${S(2.6)}/>`);
}
function bookShape(x, y, w, h, col, o = {}) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${o.rot || 0})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="4" fill="${col}" ${S()}/><rect x="${-w / 2 + 6}" y="${-h + 6}" width="${w - 12}" height="${h - 12}" rx="2" fill="#fff" opacity=".18"/><path d="M${-w / 2 + 6} ${-h * 0.25} L${w / 2 - 6} ${-h * 0.25}" stroke="#fff" stroke-width="4" opacity=".55"/></g>`;
}
function bookStack(x, y, cols = [P.red, P.blue, P.green, P.yellow], s = 1) {
  let g = ''; let yy = 0;
  cols.forEach((c, i) => { const w = 150 - (i % 2) * 18, h = 26; const dx = (i % 2 ? 8 : -6);
    g += `<rect x="${-w / 2 + dx}" y="${yy - h}" width="${w}" height="${h}" rx="5" fill="${c}" ${S()}/><rect x="${w / 2 + dx - 18}" y="${yy - h + 4}" width="12" height="${h - 8}" fill="#fffaf0" ${S(2)}/><path d="M${-w / 2 + dx + 14} ${yy - h / 2} L${w / 2 + dx - 30} ${yy - h / 2}" stroke="#fff" stroke-width="3" opacity=".5"/>`; yy -= h; });
  return at(x, y, s, g);
}
function openBook(x, y, s = 1, col = P.blue) {
  let g = `<path d="M-120 -6 L0 6 L120 -6 L120 14 L0 26 L-120 14Z" fill="${col}" ${S()}/>`;
  g += `<path d="M0 0 Q-60 -26 -118 -10 L-118 -100 Q-60 -116 0 -92Z" fill="${P.white}" ${S()}/><path d="M0 0 Q60 -26 118 -10 L118 -100 Q60 -116 0 -92Z" fill="${P.white}" ${S()}/>`;
  for (let i = 0; i < 5; i++) g += `<path d="M-100 ${-86 + i * 14} Q-56 ${-98 + i * 14} -14 ${-80 + i * 14}" stroke="${P.grey}" stroke-width="3" fill="none"/><path d="M14 ${-80 + i * 14} Q56 ${-98 + i * 14} 100 ${-86 + i * 14}" stroke="${P.grey}" stroke-width="3" fill="none"/>`;
  return at(x, y, s, g);
}
function gameConsole(x, y, s = 1, rot = 0) {
  return at(x, y, s, `<rect x="-62" y="-30" width="124" height="60" rx="26" fill="#4a4f63" ${S()}/><rect x="-28" y="-20" width="56" height="34" rx="5" fill="#8fe0ff" ${S(2.4)}/><path d="M-50 -6 h16 M-42 -14 v16" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="42" cy="-10" r="6" fill="${P.red}"/><circle cx="50" cy="4" r="6" fill="${P.yellow}"/>`, false, rot);
}
function backpack(x, y, s = 1, col = P.yellow) {
  return at(x, y, s, `<path d="M-40 -110 Q-40 -130 -20 -130 L20 -130 Q40 -130 40 -110 L46 -6 Q46 0 40 0 L-40 0 Q-46 0 -46 -6Z" fill="${col}" ${S()}/><path d="M-20 -130 Q0 -156 20 -130" fill="none" ${S(5)}/><rect x="-30" y="-60" width="60" height="44" rx="10" fill="#fff" fill-opacity=".35" ${S(2.6)}/><path d="M-30 -48 L30 -48" stroke="${P.ink}" stroke-width="2.4"/>`);
}
function trophy(x, y, s = 1) {
  return at(x, y, s, `<path d="M-46 -150 Q-90 -150 -78 -110 Q-66 -84 -36 -92" fill="none" stroke="${P.goldDark}" stroke-width="10"/><path d="M46 -150 Q90 -150 78 -110 Q66 -84 36 -92" fill="none" stroke="${P.goldDark}" stroke-width="10"/><path d="M-52 -160 L52 -160 Q50 -84 0 -76 Q-50 -84 -52 -160Z" fill="${P.gold}" ${S()}/><rect x="-10" y="-80" width="20" height="40" fill="${P.goldDark}" ${S(2.6)}/><rect x="-44" y="-42" width="88" height="42" rx="6" fill="${P.brownDark}" ${S()}/><path d="M-30 -140 Q-26 -100 -6 -92" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/><path d="M0 -140 l6 12 l13 2 l-10 9 l3 13 l-12 -7 l-12 7 l3 -13 l-10 -9 l13 -2z" fill="${P.yellowSoft}" ${S(2)}/>`);
}
function clock(x, y, r = 50, h = 7, m = 0, o = {}) {
  const ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90;
  let g = '';
  if (o.alarm) g += `<circle cx="${-r * 0.7}" cy="${-r * 0.82}" r="${r * 0.3}" fill="${P.red}" ${S()}/><circle cx="${r * 0.7}" cy="${-r * 0.82}" r="${r * 0.3}" fill="${P.red}" ${S()}/><path d="M${-r * 0.6} ${r * 0.8} l-12 18 M${r * 0.6} ${r * 0.8} l12 18" ${S(6)}/>`;
  g += `<circle r="${r}" fill="${o.alarm ? P.red : P.white}" ${S()}/><circle r="${r * 0.82}" fill="${P.white}" ${S(2.4)}/>`;
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; g += line(Math.cos(a) * r * 0.66, Math.sin(a) * r * 0.66, Math.cos(a) * r * 0.74, Math.sin(a) * r * 0.74, 3); }
  g += line(0, 0, Math.cos((ha * Math.PI) / 180) * r * 0.42, Math.sin((ha * Math.PI) / 180) * r * 0.42, 5.5) + line(0, 0, Math.cos((ma * Math.PI) / 180) * r * 0.62, Math.sin((ma * Math.PI) / 180) * r * 0.62, 3.6) + `<circle r="5" fill="${P.ink}"/>`;
  return at(x, y, 1, g);
}
function headphones(x, y, s = 1) {
  return at(x, y, s, `<path d="M-56 0 Q-60 -70 0 -72 Q60 -70 56 0" fill="none" stroke="${P.ink}" stroke-width="16"/><path d="M-56 0 Q-60 -70 0 -72 Q60 -70 56 0" fill="none" stroke="${P.blueDark}" stroke-width="9"/><rect x="-72" y="-16" width="26" height="40" rx="10" fill="${P.blueDark}" ${S()}/><rect x="46" y="-16" width="26" height="40" rx="10" fill="${P.blueDark}" ${S()}/>`);
}
function bookmark(x, y, s, col, pat = 0, rot = 0) {
  let deco = '';
  if (pat === 0) deco = `<path d="M0 -40 l6 12 l13 2 l-10 9 l3 13 l-12 -7 l-12 7 l3 -13 l-10 -9 l13 -2z" fill="${P.yellow}" ${S(1.8)}/>`;
  if (pat === 1) deco = `<path d="M-10 -30 c0 -12 10 -12 10 -2 c0 -10 10 -10 10 2 c0 10 -10 16 -10 20 c0 -4 -10 -10 -10 -20z" fill="${P.coral}" ${S(1.8)}/>`;
  if (pat === 2) deco = `<circle cx="0" cy="-28" r="12" fill="${P.yellow}" ${S(1.8)}/>` + `<path d="M-14 6 q14 -18 28 0" fill="${P.leaf}" ${S(1.8)}/>`;
  if (pat === 3) deco = `<path d="M-14 -10 L0 -40 L14 -10Z" fill="${P.leaf}" ${S(1.8)}/><rect x="-3" y="-10" width="6" height="10" fill="${P.brown}"/>`;
  return at(x, y, s, `<rect x="-22" y="-70" width="44" height="120" rx="5" fill="${col}" ${S(2.8)}/><circle cx="0" cy="-56" r="5" fill="${P.white}" ${S(2)}/><path d="M0 -61 Q-6 -84 4 -96" fill="none" stroke="${P.red}" stroke-width="3"/>${deco}<path d="M-12 26 h24 M-12 36 h18" stroke="#fff" stroke-width="3" opacity=".7"/>`, false, rot);
}
function seedling(x, y, s = 1) {
  return at(x, y, s, `<path d="M0 0 Q2 -30 0 -54" fill="none" stroke="${P.green}" stroke-width="6"/><path d="M0 -40 Q-36 -58 -40 -30 Q-14 -24 0 -40Z" fill="${P.leaf}" ${S(2.6)}/><path d="M0 -52 Q30 -80 42 -50 Q16 -40 0 -52Z" fill="${P.leafLight}" ${S(2.6)}/>`);
}
function pot(x, y, s = 1, col = P.coral) {
  return at(x, y, s, `<path d="M-46 -60 L46 -60 L36 0 L-36 0Z" fill="${col}" ${S()}/><rect x="-52" y="-74" width="104" height="18" rx="5" fill="${col}" ${S()}/>` + sh('M14 -56 L42 -56 L34 -2 L10 -2Z', 0.1));
}
function wateringCan(x, y, s = 1, flip = false) {
  return at(x, y, s, `<path d="M40 -46 L98 -82 L104 -74 L52 -30" fill="${P.blueLight}" ${S()}/><rect x="-46" y="-62" width="92" height="62" rx="12" fill="${P.blueLight}" ${S()}/><path d="M-46 -48 Q-82 -48 -76 -16 Q-70 4 -46 -10" fill="none" ${S(8)}/><path d="M-20 -62 Q0 -96 20 -62" fill="none" ${S(7)}/>${[0, 1, 2].map((i) => `<path d="M${110 + i * 8} ${-70 + i * 14} l10 10" stroke="${P.skyDeep}" stroke-width="4" stroke-linecap="round"/>`).join('')}`, flip);
}
function plantPot(x, y, s = 1) {
  let g = `<path d="M0 -60 Q-50 -110 -40 -160 Q0 -120 0 -60Z" fill="${P.leaf}" ${S()}/><path d="M0 -60 Q50 -120 60 -150 Q10 -130 0 -60Z" fill="${P.green}" ${S()}/><path d="M0 -60 Q-8 -130 10 -190 Q24 -120 0 -60Z" fill="${P.leafLight}" ${S()}/>`;
  return at(x, y, s, g + pot(0, 0, 0.8, P.coral));
}

// ---------- nature ----------
function cloud(x, y, s = 1, o = {}) {
  return at(x, y, s, `<path d="M-90 20 Q-110 -14 -70 -22 Q-64 -60 -20 -54 Q4 -86 44 -60 Q90 -66 92 -24 Q122 -10 100 20Z" fill="${o.fill || P.white}" ${S(o.line === false ? 0 : 2.8)} ${o.line === false ? '' : 'stroke-opacity=".55"'}/>`);
}
function sun(x, y, r = 60) {
  let g = `<circle r="${r * 2.4}" fill="url(#sunGlow)"/>`;
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; g += line(Math.cos(a) * r * 1.22, Math.sin(a) * r * 1.22, Math.cos(a) * r * 1.6, Math.sin(a) * r * 1.6, 7, P.gold); }
  g += `<circle r="${r}" fill="${P.yellow}" ${S()}/><path d="M${-r * 0.5} ${-r * 0.3} Q${-r * 0.3} ${-r * 0.65} ${r * 0.1} ${-r * 0.7}" stroke="#fff" stroke-width="6" fill="none" opacity=".6"/>`;
  return at(x, y, 1, g);
}
function tree(x, y, s = 1, o = {}) {
  const r = rng(o.seed || 3);
  let g = `<path d="M-22 0 Q-14 -90 -26 -170 L26 -170 Q14 -90 22 0Z" fill="${P.brown}" ${S()}/><path d="M-6 -150 Q-40 -190 -70 -196 M10 -150 Q40 -184 66 -200" stroke="${P.ink}" stroke-width="15" stroke-linecap="round" fill="none"/><path d="M-6 -150 Q-40 -190 -70 -196 M10 -150 Q40 -184 66 -200" stroke="${P.brown}" stroke-width="9" stroke-linecap="round" fill="none"/>`;
  g += sh('M6 -10 Q14 -90 4 -168 L24 -168 Q14 -90 22 -2Z', 0.12);
  const blobs = [[-90, -230, 80], [0, -280, 96], [90, -232, 82], [-40, -200, 70], [50, -196, 70], [-120, -180, 54], [124, -186, 52]];
  blobs.forEach(([bx, by, br]) => { g += `<circle cx="${bx}" cy="${by}" r="${br}" fill="${o.col || P.leaf}" ${S()}/>`; });
  blobs.forEach(([bx, by, br]) => { g += `<circle cx="${bx - br * 0.25}" cy="${by - br * 0.3}" r="${br * 0.5}" fill="${P.leafLight}" opacity=".55"/>`; });
  g += sh('M40 -170 Q120 -150 170 -190 Q160 -130 100 -130 Q40 -130 20 -150Z', 0.12);
  if (o.fruit) for (let i = 0; i < 9; i++) g += `<circle cx="${f(-130 + r() * 260)}" cy="${f(-300 + r() * 150)}" r="9" fill="${o.fruit}" ${S(2.2)}/>`;
  return at(x, y, s, g);
}
function bush(x, y, s = 1, col = P.green, flowers) {
  let g = `<path d="M-90 0 Q-110 -50 -60 -60 Q-50 -100 0 -92 Q50 -110 66 -64 Q114 -56 92 0Z" fill="${col}" ${S()}/><path d="M-60 -56 Q-40 -80 -10 -78" stroke="#fff" stroke-width="6" opacity=".25" fill="none"/>`;
  if (flowers) [[-50, -40], [10, -66], [50, -30], [-10, -24], [70, -48]].forEach(([fx, fy]) => { g += `<circle cx="${fx}" cy="${fy}" r="9" fill="${flowers}" ${S(2)}/><circle cx="${fx}" cy="${fy}" r="3" fill="${P.yellow}"/>`; });
  return at(x, y, s, g);
}
function flower(x, y, s = 1, col = P.coral) {
  return at(x, y, s, `<path d="M0 0 Q4 -24 0 -46" stroke="${P.green}" stroke-width="5" fill="none"/><path d="M0 -14 Q16 -28 26 -20 Q14 -10 0 -14Z" fill="${P.leaf}" ${S(2)}/>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-60" rx="9" ry="14" fill="${col}" ${S(2)} transform="rotate(${a} 0 -48)"/>`).join('')}<circle cx="0" cy="-48" r="8" fill="${P.yellow}" ${S(2)}/>`);
}
function hills(w, y, cols = [P.leafLight, P.leaf]) {
  return `<path d="M0 ${y} Q${w * 0.2} ${y - 90} ${w * 0.45} ${y - 30} Q${w * 0.7} ${y - 110} ${w} ${y - 40} L${w} ${y + 200} L0 ${y + 200}Z" fill="${cols[0]}" ${S()}/>` +
    `<path d="M0 ${y + 40} Q${w * 0.3} ${y - 20} ${w * 0.6} ${y + 30} Q${w * 0.85} ${y - 10} ${w} ${y + 20} L${w} ${y + 300} L0 ${y + 300}Z" fill="${cols[1]}" ${S()}/>`;
}
function birds(x, y, s = 1) {
  return at(x, y, s, `<path d="M0 0 q12 -12 24 0 q12 -12 24 0" fill="none" ${S(3)}/><path d="M60 -26 q9 -9 18 0 q9 -9 18 0" fill="none" ${S(3)}/>`);
}
function grassGround(w, y, h = 400, col = P.leaf) {
  return `<path d="M-10 ${y} Q${w * 0.25} ${y - 14} ${w * 0.5} ${y} Q${w * 0.75} ${y + 12} ${w + 10} ${y - 4} L${w + 10} ${y + h} L-10 ${y + h}Z" fill="${col}" ${S()}/><rect x="0" y="${y + 4}" width="${w}" height="${h}" fill="url(#grass)"/>`;
}

// ---------- interiors ----------
let _clip = 0;
function windowFrame(x, y, w, h, o = {}) {
  const cid = 'wclip' + (++_clip) + Math.round(x);
  const sky = o.night ? 'url(#nightG)' : o.sunset ? 'url(#sunsetG)' : 'url(#skyG)';
  let g = `<clipPath id="${cid}"><rect x="0" y="0" width="${w}" height="${h}" rx="6"/></clipPath><rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="${sky}" ${S()}/><g clip-path="url(#${cid})">`;
  if (o.night) { g += `<circle cx="${w * 0.7}" cy="${h * 0.3}" r="${w * 0.12}" fill="#fdf3c4" ${S(2.4)}/><circle cx="${w * 0.76}" cy="${h * 0.26}" r="${w * 0.11}" fill="#465899"/>`; for (let i = 0; i < 7; i++) g += `<circle cx="${(i * 53) % w}" cy="${(i * 37) % (h * 0.8) + 10}" r="2.5" fill="#fff"/>`; }
  else { g += cloud(w * 0.3, h * 0.35, w / 520, { line: false }); if (o.tree !== false) g += `<circle cx="${w * 0.85}" cy="${h * 0.95}" r="${w * 0.28}" fill="${P.leaf}" ${S(2.4)}/>`; }
  g += `</g><rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="none" stroke="${P.white}" stroke-width="16"/><rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="none" ${S()}/>`;
  g += `<path d="M${w / 2} 0 L${w / 2} ${h} M0 ${h / 2} L${w} ${h / 2}" stroke="${P.white}" stroke-width="10"/><path d="M${w / 2} 0 L${w / 2} ${h} M0 ${h / 2} L${w} ${h / 2}" stroke="${P.ink}" stroke-width="2" opacity=".5"/>`;
  g += `<rect x="-14" y="${h}" width="${w + 28}" height="16" rx="4" fill="${P.white}" ${S()}/>`;
  if (o.curtain) g += `<path d="M-30 -20 Q10 ${h * 0.5} -20 ${h + 20} L-50 ${h + 20} L-50 -20Z" fill="${o.curtain}" ${S()}/><path d="M${w + 30} -20 Q${w - 10} ${h * 0.5} ${w + 20} ${h + 20} L${w + 50} ${h + 20} L${w + 50} -20Z" fill="${o.curtain}" ${S()}/><rect x="-60" y="-32" width="${w + 120}" height="14" rx="7" fill="${P.brownDark}" ${S(2.4)}/>`;
  return at(x, y, 1, g);
}
function pictureFrame(x, y, w, h, inner, col = P.wood) {
  return at(x, y, 1, `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="4" fill="${col}" ${S()}/><rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" fill="${P.skyPale}" ${S(2.4)}/>${inner || ''}`);
}
function lamp(x, y, s = 1) {
  return at(x, y, s, `<ellipse cx="0" cy="0" rx="40" ry="10" fill="${P.brownDark}" ${S()}/><path d="M0 0 L0 -130" stroke="${P.ink}" stroke-width="8"/><path d="M-50 -130 L50 -130 L32 -200 L-32 -200Z" fill="${P.yellowSoft}" ${S()}/><path d="M-80 -130 L80 -130 L130 40 L-130 40Z" fill="#fff4c2" opacity=".25"/>`);
}
function sofa(x, y, w = 420, col = P.teal) {
  return at(x, y, 1, `<rect x="${-w / 2}" y="-170" width="${w}" height="110" rx="34" fill="${col}" ${S()}/><rect x="${-w / 2 - 30}" y="-110" width="60" height="100" rx="24" fill="${col}" ${S()}/><rect x="${w / 2 - 30}" y="-110" width="60" height="100" rx="24" fill="${col}" ${S()}/><rect x="${-w / 2 + 24}" y="-80" width="${w - 48}" height="60" rx="16" fill="${col}" ${S()}/>${sh(`M${-w / 2 + 30} -40 L${w / 2 - 30} -40 L${w / 2 - 30} -22 L${-w / 2 + 30} -22Z`, 0.12)}<rect x="${-w / 2 - 20}" y="-10" width="14" height="14" fill="${P.brownDark}"/><rect x="${w / 2 + 6}" y="-10" width="14" height="14" fill="${P.brownDark}"/>`);
}
function table(x, y, w, h, col = P.wood, o = {}) {
  let g = `<rect x="${-w / 2 + 16}" y="${-h}" width="16" height="${h}" fill="${P.brownDark}" ${S()}/><rect x="${w / 2 - 32}" y="${-h}" width="16" height="${h}" fill="${P.brownDark}" ${S()}/>`;
  if (o.front) g += `<rect x="${-w / 2 + 6}" y="${-h + 14}" width="${w - 12}" height="${h - 14}" rx="4" fill="${o.front}" ${S()}/>`;
  g += `<rect x="${-w / 2}" y="${-h - 6}" width="${w}" height="22" rx="6" fill="${col}" ${S()}/><path d="M${-w / 2 + 14} ${-h} L${w / 2 - 14} ${-h}" stroke="#fff" stroke-width="3" opacity=".35"/>`;
  return at(x, y, 1, g);
}
function shelf(x, y, w, items = '') {
  return at(x, y, 1, `<rect x="${-w / 2}" y="0" width="${w}" height="16" rx="3" fill="${P.wood}" ${S()}/><path d="M${-w / 2 + 20} 16 l0 20 l20 -20 M${w / 2 - 20} 16 l0 20 l-20 -20" fill="${P.brownDark}" ${S(2.4)}/>${items}`);
}
function rug(x, y, w, h, col = P.coral) {
  return at(x, y, 1, `<ellipse rx="${w / 2}" ry="${h / 2}" fill="${col}" ${S()}/><ellipse rx="${w / 2 - 22}" ry="${h / 2 - 10}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="14 10" opacity=".7"/>`);
}
function room(W, H, o = {}) {
  const fy = o.floorY || H * 0.72;
  let g = `<rect width="${W}" height="${fy}" fill="${o.wall || '#f7e3b5'}"/>`;
  if (o.stripes !== false) for (let x = 0; x < W; x += 60) g += `<rect x="${x}" y="0" width="30" height="${fy}" fill="#fff" opacity=".18"/>`;
  g += `<rect x="0" y="${fy}" width="${W}" height="${H - fy}" fill="${o.floor || P.woodLight}"/>`;
  for (let x = -40; x < W; x += 140) g += `<path d="M${x} ${fy} L${x - 60} ${H}" stroke="${P.brown}" stroke-width="2.4" opacity=".4"/>`;
  g += `<rect x="-10" y="${fy - 18}" width="${W + 20}" height="22" fill="${o.skirting || P.white}" ${S()}/>`;
  return g;
}
function outdoor(W, H, o = {}) {
  const gy = o.groundY || H * 0.7;
  let g = `<rect width="${W}" height="${gy + 10}" fill="${o.sky || 'url(#skyG)'}"/>`;
  if (o.sun !== false) g += sun(o.sunX || W * 0.86, o.sunY || 120, 56);
  g += cloud(W * 0.18, 110, 0.9, { line: false }) + cloud(W * 0.55, 80, 0.7, { line: false });
  if (o.hills !== false) g += hills(W, gy - 40);
  g += grassGround(W, gy, H - gy + 20, o.grass || P.leaf);
  return g;
}

// ---------- worksheet / icon objects ----------
const icons = {
  bottle: () => `<rect x="-22" y="-80" width="44" height="80" rx="12" fill="${P.skyDeep}" ${S()}/><rect x="-14" y="-96" width="28" height="18" rx="4" fill="${P.blue}" ${S()}/><path d="M-12 -60 v40" stroke="#fff" stroke-width="5" opacity=".7"/>`,
  apple: () => `<path d="M0 -60 Q-40 -76 -44 -36 Q-44 0 -10 2 Q0 -4 10 2 Q44 0 44 -36 Q40 -76 0 -60Z" fill="${P.red}" ${S()}/><path d="M0 -60 Q2 -76 8 -84" stroke="${P.brownDark}" stroke-width="5" fill="none"/><path d="M6 -70 Q26 -86 34 -70 Q20 -62 6 -70Z" fill="${P.leaf}" ${S(2.4)}/><path d="M-26 -44 Q-24 -56 -14 -58" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/>`,
  shirt: () => `<path d="M-20 -80 Q0 -70 20 -80 L50 -66 L62 -38 L40 -30 L40 0 L-40 0 L-40 -30 L-62 -38 L-50 -66Z" fill="${P.blueLight}" ${S()}/><path d="M-20 -80 Q0 -60 20 -80" fill="none" ${S(3)}/>`,
  medicine: () => `<rect x="-46" y="-70" width="92" height="70" rx="10" fill="${P.white}" ${S()}/><rect x="-46" y="-80" width="92" height="18" rx="6" fill="${P.coralSoft}" ${S()}/><path d="M-8 -48 h16 v12 h12 v16 h-12 v12 h-16 v-12 h-12 v-16 h12z" fill="${P.red}" ${S(2)}/>`,
  house: () => `<path d="M-56 -50 L0 -96 L56 -50Z" fill="${P.red}" ${S()}/><rect x="-46" y="-52" width="92" height="52" fill="${P.yellowSoft}" ${S()}/><rect x="-12" y="-32" width="24" height="32" fill="${P.brown}" ${S(2.4)}/><rect x="20" y="-42" width="18" height="16" fill="${P.skyPale}" ${S(2)}/>`,
  controller: () => `<path d="M-60 -20 Q-66 -56 -36 -56 L36 -56 Q66 -56 60 -20 Q56 6 36 -6 L22 -16 L-22 -16 L-36 -6 Q-56 6 -60 -20Z" fill="#4a4f63" ${S()}/><path d="M-40 -36 h18 M-31 -45 v18" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="30" cy="-40" r="6" fill="${P.red}"/><circle cx="42" cy="-28" r="6" fill="${P.yellow}"/>`,
  toycar: () => `<path d="M-60 -20 L-60 -40 L-30 -44 L-14 -70 L26 -70 L44 -44 L60 -40 L60 -20Z" fill="${P.orange}" ${S()}/><rect x="-6" y="-64" width="26" height="18" fill="${P.skyPale}" ${S(2)}/><circle cx="-34" cy="-16" r="15" fill="${P.ink}"/><circle cx="34" cy="-16" r="15" fill="${P.ink}"/><circle cx="-34" cy="-16" r="6" fill="${P.grey}"/><circle cx="34" cy="-16" r="6" fill="${P.grey}"/>`,
  icecream: () => `<path d="M-28 -50 L0 6 L28 -50Z" fill="${P.woodLight}" ${S()}/><path d="M-20 -50 L8 -10 M0 -50 L16 -26 M-14 -36 L18 -46" stroke="${P.brown}" stroke-width="2.4"/><circle cx="-12" cy="-60" r="22" fill="${P.pink}" ${S()}/><circle cx="14" cy="-62" r="22" fill="${P.yellowSoft}" ${S()}/><circle cx="0" cy="-84" r="20" fill="#a46b45" ${S()}/><circle cx="2" cy="-106" r="7" fill="${P.red}" ${S(2)}/>`,
  teddy: () => `<circle cx="-30" cy="-92" r="14" fill="${P.brownLight}" ${S()}/><circle cx="30" cy="-92" r="14" fill="${P.brownLight}" ${S()}/><ellipse cx="0" cy="-30" rx="40" ry="34" fill="${P.brownLight}" ${S()}/><circle cx="0" cy="-78" r="32" fill="${P.brownLight}" ${S()}/><ellipse cx="0" cy="-68" rx="14" ry="10" fill="#f0d2ad" ${S(2)}/><circle cx="-12" cy="-84" r="4" fill="${P.ink}"/><circle cx="12" cy="-84" r="4" fill="${P.ink}"/><circle cx="0" cy="-71" r="4" fill="${P.ink}"/><path d="M-10 -50 L10 -50 L0 -40Z" fill="${P.red}" ${S(2)}/>`,
  toothbrush: () => `<g transform="rotate(-30)"><rect x="-8" y="-100" width="16" height="96" rx="8" fill="${P.teal}" ${S()}/><rect x="-10" y="-126" width="20" height="30" rx="4" fill="${P.white}" ${S(2.4)}/><path d="M-6 -122 v20 M0 -122 v20 M6 -122 v20" stroke="${P.skyDeep}" stroke-width="3"/></g>`,
  schoolbag: () => `<path d="M-40 -90 Q-40 -110 -20 -110 L20 -110 Q40 -110 40 -90 L46 -6 Q46 0 40 0 L-40 0 Q-46 0 -46 -6Z" fill="${P.yellow}" ${S()}/><path d="M-20 -110 Q0 -134 20 -110" fill="none" ${S(5)}/><rect x="-28" y="-54" width="56" height="40" rx="9" fill="#fff" fill-opacity=".35" ${S(2.4)}/>`,
  bike: () => `<g transform="scale(0.42) translate(0 -70)">${bicycleInner()}</g>`,
  sweets: () => `<path d="M-44 -40 L-60 -56 L-60 -24Z M44 -40 L60 -56 L60 -24Z" fill="${P.pink}" ${S()}/><ellipse cx="0" cy="-40" rx="46" ry="26" fill="${P.coral}" ${S()}/><path d="M-20 -60 Q-10 -40 -20 -16 M6 -64 Q16 -40 6 -16" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>`,
  book: () => `<rect x="-42" y="-100" width="84" height="100" rx="5" fill="${P.green}" ${S()}/><rect x="-34" y="-92" width="68" height="84" rx="2" fill="#fff" opacity=".2"/><rect x="-24" y="-76" width="48" height="16" rx="3" fill="${P.white}" ${S(2)}/>`,
  star: () => `<path d="M0 -50 L14 -18 L48 -15 L22 8 L30 42 L0 24 L-30 42 L-22 8 L-48 -15 L-14 -18Z" fill="${P.yellow}" ${S()}/>`,
  heart: () => `<path d="M0 -10 C-60 -50 -40 -100 0 -76 C40 -100 60 -50 0 -10Z" fill="${P.coral}" ${S()}/>`,
  bulb: () => `<path d="M0 -100 Q-40 -100 -40 -62 Q-40 -40 -20 -26 L-18 -12 L18 -12 L20 -26 Q40 -40 40 -62 Q40 -100 0 -100Z" fill="${P.yellowSoft}" ${S()}/><rect x="-18" y="-12" width="36" height="16" rx="4" fill="${P.grey}" ${S(2.4)}/>${[0, 1, 2, 3, 4].map((i) => { const a = Math.PI * (1.1 + i * 0.2); return line(Math.cos(a) * 54, -62 + Math.sin(a) * 54, Math.cos(a) * 70, -62 + Math.sin(a) * 70, 5, P.gold); }).join('')}`,
  brain: () => `<path d="M-40 -20 Q-56 -40 -40 -60 Q-40 -86 -10 -84 Q10 -100 30 -80 Q58 -76 50 -50 Q62 -26 40 -14 Q30 4 6 -6 Q-16 6 -40 -20Z" fill="${P.pink}" ${S()}/><path d="M-10 -84 Q-20 -60 0 -50 Q20 -40 6 -6 M-40 -60 Q-20 -54 -26 -36 M30 -80 Q20 -64 36 -50" fill="none" ${S(2.6)}/>`,
  target: () => `<circle cx="0" cy="-50" r="48" fill="${P.white}" ${S()}/><circle cx="0" cy="-50" r="34" fill="${P.red}" ${S(2.4)}/><circle cx="0" cy="-50" r="20" fill="${P.white}" ${S(2.4)}/><circle cx="0" cy="-50" r="8" fill="${P.red}" ${S(2)}/><path d="M0 -50 L40 -90" ${S(5)}/><path d="M40 -90 l4 -16 l10 10z" fill="${P.green}" ${S(2)}/>`,
  chart: () => `<rect x="-50" y="-30" width="22" height="30" fill="${P.green}" ${S()}/><rect x="-14" y="-56" width="22" height="56" fill="${P.blue}" ${S()}/><rect x="22" y="-90" width="22" height="90" fill="${P.coral}" ${S()}/><path d="M-60 0 L60 0" ${S(3)}/>`,
  clockI: () => clock(0, -50, 46, 4, 0),
  piggyI: () => piggy(0, -60, 0.55),
  coins: () => coinStack(-22, -6, 4, 24) + coinStack(24, -6, 6, 24),
  jarI: () => jar(0, 0, 0.55, '', P.green, 4),
  sun: () => sun(0, -50, 30),
  moon: () => `<circle cx="0" cy="-50" r="40" fill="#fdf3c4" ${S()}/><circle cx="18" cy="-62" r="36" fill="${P.cream}"/>`,
  run: () => `<circle cx="10" cy="-92" r="13" fill="${P.coral}" ${S()}/><path d="M6 -78 L-6 -40 M-6 -40 L-26 -10 M-6 -40 L14 -16 L6 0 M2 -66 L-22 -54 M2 -66 L26 -60" ${S(7)} fill="none"/>`,
  bed: () => `<rect x="-60" y="-40" width="120" height="30" rx="6" fill="${P.blueLight}" ${S()}/><rect x="-64" y="-70" width="14" height="70" fill="${P.wood}" ${S()}/><rect x="50" y="-50" width="14" height="50" fill="${P.wood}" ${S()}/><ellipse cx="-34" cy="-46" rx="18" ry="10" fill="${P.white}" ${S(2)}/>`,
  family: () => `<circle cx="-28" cy="-74" r="16" fill="#c4875a" ${S()}/><circle cx="20" cy="-70" r="14" fill="#cf9369" ${S()}/><path d="M-50 0 Q-50 -54 -28 -54 Q-6 -54 -6 0Z" fill="${P.blue}" ${S()}/><path d="M2 0 Q2 -52 20 -52 Q38 -52 38 0Z" fill="${P.pink}" ${S()}/><path d="M0 -24 c0 -10 12 -10 12 0 c0 -10 12 -10 12 0 c0 8 -12 14 -12 18 c0 -4 -12 -10 -12 -18z" transform="translate(-12 -86)" fill="${P.coral}" ${S(2)}/>`,
  pencil: () => `<g transform="rotate(35)"><rect x="-10" y="-100" width="20" height="80" fill="${P.yellow}" ${S()}/><path d="M-10 -20 L0 6 L10 -20Z" fill="${P.woodLight}" ${S(2.4)}/><path d="M-4 -4 L0 6 L4 -4Z" fill="${P.ink}"/><rect x="-10" y="-112" width="20" height="14" fill="${P.pink}" ${S(2.4)}/></g>`,
  scissors: () => `<circle cx="-18" cy="-14" r="14" fill="none" stroke="${P.red}" stroke-width="7"/><circle cx="18" cy="-14" r="14" fill="none" stroke="${P.red}" stroke-width="7"/><path d="M-10 -26 L22 -96 M10 -26 L-22 -96" ${S(7)}/>`,
  stall: () => `<rect x="-60" y="-50" width="120" height="50" fill="${P.wood}" ${S()}/><path d="M-70 -100 L70 -100 L60 -76 L-60 -76Z" fill="${P.coral}" ${S()}/><path d="M-50 -76 L-50 -50 M50 -76 L50 -50" ${S(5)}/>`,
};
function bicycleInner() { return bicycle(0, 70, 1).replace(/^<g transform="[^"]*">/, '').replace(/<\/g>$/, ''); }
function icon(name, x, y, s = 1) { return at(x, y, s, icons[name]()); }

// banner / sign with text
function sign(x, y, w, h, text, o = {}) {
  return at(x, y, 1, `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${o.r ?? 10}" fill="${o.fill || P.white}" ${S()}/>${o.inner ? `<rect x="${-w / 2 + 8}" y="${-h / 2 + 8}" width="${w - 16}" height="${h - 16}" rx="6" fill="none" stroke="${o.innerCol || P.coral}" stroke-width="3" stroke-dasharray="${o.dash || '0'}"/>` : ''}<text x="0" y="${f(h * 0.17 + (o.dy || 0))}" font-family="'Baloo 2','Andika'" font-weight="800" font-size="${o.size || h * 0.5}" fill="${o.col || P.ink}" text-anchor="middle" letter-spacing="${o.ls || 0}">${text}</text>`, false, o.rot || 0);
}
function sparkle(x, y, r = 14, col = P.yellow) {
  return `<path d="M${x} ${y - r} Q${x + r * 0.15} ${y - r * 0.15} ${x + r} ${y} Q${x + r * 0.15} ${y + r * 0.15} ${x} ${y + r} Q${x - r * 0.15} ${y + r * 0.15} ${x - r} ${y} Q${x - r * 0.15} ${y - r * 0.15} ${x} ${y - r}Z" fill="${col}" ${S(2)}/>`;
}
function heart(x, y, s = 1, col = P.coral) { return at(x, y, s, `<path d="M0 -10 C-30 -30 -20 -55 0 -42 C20 -55 30 -30 0 -10Z" fill="${col}" ${S(2.6)}/>`); }
function shadow(x, y, rx, ry = 12) { return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="#3b2a20" opacity=".13"/>`; }

module.exports = { at, coin, coinStack, piggy, jar, bicycle, helmet, bookShape, bookStack, openBook, gameConsole, backpack, trophy, clock, headphones, bookmark, seedling, pot, wateringCan, plantPot, cloud, sun, tree, bush, flower, hills, birds, grassGround, windowFrame, pictureFrame, lamp, sofa, table, shelf, rug, room, outdoor, icons, icon, sign, sparkle, heart, shadow };
