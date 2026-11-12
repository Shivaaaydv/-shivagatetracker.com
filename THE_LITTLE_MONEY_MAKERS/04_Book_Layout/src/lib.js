// Shared art library: palette, texture filters and drawing helpers.
// All artwork in this book is original vector art generated from this code.

const P = {
  ink: '#3b2a20', inkSoft: '#6a4f3c',
  sky: '#a8d8f2', skyDeep: '#74b9e4', skyPale: '#dcf0fb',
  yellow: '#f7c843', yellowSoft: '#fbe3a0', gold: '#eab532', goldDark: '#c08a1c',
  green: '#3f8f4f', leaf: '#62ae5c', leafLight: '#9ccf7f', greenPale: '#cfe8b8',
  coral: '#f0806a', coralSoft: '#f8b9a8',
  cream: '#fdf6e3', creamDeep: '#f4e6c4',
  pink: '#f5a8c2', pinkDeep: '#e57a9f', pinkPale: '#fbd7e3',
  brown: '#9a6a43', brownDark: '#6b4529', brownLight: '#c99a6b', wood: '#b9824f', woodLight: '#d9a76f',
  blue: '#3f7fcc', blueDark: '#2d5f9c', blueLight: '#8fbbe6',
  red: '#d8483b', redDark: '#a8312a', white: '#fffdf8', grey: '#a5adb2', greyLight: '#dfe3e4',
  purple: '#9a7cc4', purpleLight: '#cbb8e6', orange: '#f29a3c', teal: '#3aa39a',
};

// Texture filters. Units are user space, so the texture keeps its look at any export resolution.
function defs(seed = 3) {
  return `
<filter id="pencil" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="${seed}" result="warp"/>
  <feDisplacementMap in="SourceGraphic" in2="warp" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="wob"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.55 0.16" numOctaves="2" seed="${seed + 11}" result="grain"/>
  <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1  0 0 0 0 0.99  0 0 0 0 0.96  0 0 0 -6.5 3.05" result="speck"/>
  <feComposite in="speck" in2="wob" operator="in" result="speckIn"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.45 0.09" numOctaves="1" seed="${seed + 23}" result="streak"/>
  <feColorMatrix in="streak" type="matrix" values="0 0 0 0 0.23  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 -4.2 1.92" result="dk"/>
  <feComposite in="dk" in2="wob" operator="in" result="dkIn"/>
  <feMerge><feMergeNode in="wob"/><feMergeNode in="speckIn"/></feMerge>
</filter>
<filter id="wash" x="-10%" y="-10%" width="120%" height="120%">
  <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="${seed + 5}" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="28" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feGaussianBlur in="d" stdDeviation="1.6"/>
</filter>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>
<filter id="paperf" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="${seed + 41}" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.25  0 0 0 -1.6 0.95"/>
</filter>
<filter id="bubblef" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${seed + 7}" result="w"/>
  <feDisplacementMap in="SourceGraphic" in2="w" scale="3" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
  <line x1="0" y1="0" x2="0" y2="7" stroke="${P.ink}" stroke-width="1.6" stroke-opacity=".22"/>
</pattern>
<pattern id="hatchL" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
  <line x1="0" y1="0" x2="0" y2="9" stroke="#fff" stroke-width="2" stroke-opacity=".35"/>
</pattern>
<pattern id="grass" width="26" height="18" patternUnits="userSpaceOnUse">
  <path d="M3 18 L6 8 M9 18 L10 6 M15 18 L18 9 M21 18 L22 7" stroke="${P.green}" stroke-width="1.8" stroke-opacity=".35" fill="none" stroke-linecap="round"/>
</pattern>
<radialGradient id="sunGlow"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fcbef"/><stop offset="1" stop-color="#e3f3fb"/></linearGradient>
<linearGradient id="nightG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3d74"/><stop offset="1" stop-color="#5a6aa8"/></linearGradient>
<linearGradient id="sunsetG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6b37a"/><stop offset=".55" stop-color="#fbd9a0"/><stop offset="1" stop-color="#fdeccc"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".35" stop-color="#e8f6fb" stop-opacity=".25"/><stop offset="1" stop-color="#cfe9f3" stop-opacity=".45"/></linearGradient>`;
}

const S = (w = 3.2) => `stroke="${P.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const f = (n) => Math.round(n * 10) / 10;

// shading overlay: darker tone + pencil hatching
const sh = (d, o = 0.1) => `<path d="${d}" fill="${P.ink}" fill-opacity="${o}"/><path d="${d}" fill="url(#hatch)"/>`;
const hl = (d, o = 0.35) => `<path d="${d}" fill="#fff" fill-opacity="${o}"/>`;

const g = (inner, t = '') => `<g${t ? ` transform="${t}"` : ''}>${inner}</g>`;
const tr = (x, y, s = 1, flip = false) => `translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})`;

// Simple seeded random for organic variation
function rng(seed) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// Ellipse helper with outline
const ell = (cx, cy, rx, ry, fill, w = 3.2, extra = '') => `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" ${w ? S(w) : ''} ${extra}/>`;
const rect = (x, y, w, h, fill, r = 0, sw = 3.2, extra = '') => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${fill}" ${sw ? S(sw) : ''} ${extra}/>`;
const path = (d, fill, sw = 3.2, extra = '') => `<path d="${d}" fill="${fill}" ${sw ? S(sw) : ''} ${extra}/>`;
const line = (x1, y1, x2, y2, w = 3.2, col = P.ink, extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;

// Text inside the art (signs, labels). Font families are loaded by the renderer.
const txt = (x, y, s, size, o = {}) => {
  const fam = o.font || 'Baloo 2';
  return `<text x="${f(x)}" y="${f(y)}" font-family="'${fam}', 'Andika', sans-serif" font-size="${size}" font-weight="${o.weight || 700}" fill="${o.fill || P.ink}" text-anchor="${o.anchor || 'middle'}"${o.rotate ? ` transform="rotate(${o.rotate} ${f(x)} ${f(y)})"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 6}" paint-order="stroke" stroke-linejoin="round"` : ''}>${esc(s)}</text>`;
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Speech bubble (drawn outside the pencil filter so the lettering stays crisp).
// lines: array of strings. tail: [tx,ty] point the tail aims at.
function bubble(x, y, lines, o = {}) {
  const size = o.size || 40, lh = size * 1.12;
  const w = o.w || Math.max(...lines.map((l) => l.length)) * size * 0.43 + 56;
  const h = lines.length * lh + 34;
  const fill = o.fill || P.white;
  let tail = '';
  if (o.tail) {
    const [tx, ty] = o.tail;
    const cx = x + w / 2, cy = y + h / 2;
    const ang = Math.atan2(ty - cy, tx - cx);
    const bx = cx + Math.cos(ang) * (w / 2 - 22), by = cy + Math.sin(ang) * (h / 2 - 12);
    const px = Math.cos(ang + Math.PI / 2) * 20, py = Math.sin(ang + Math.PI / 2) * 20;
    tail = `<path d="M${f(bx + px)} ${f(by + py)} Q${f((bx + tx) / 2 + px * 0.2)} ${f((by + ty) / 2 + py * 0.2)} ${f(tx)} ${f(ty)} Q${f((bx + tx) / 2 - px * 0.6)} ${f((by + ty) / 2 - py * 0.6)} ${f(bx - px)} ${f(by - py)} Z" fill="${fill}" ${S(3)}/>`;
  }
  const cloud = o.think;
  let shape;
  if (cloud) {
    const r = rng(o.seed || 9); const n = Math.round((w + h) / 46);
    let c = '';
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const cx = x + w / 2 + Math.cos(a) * (w / 2 - 6), cy = y + h / 2 + Math.sin(a) * (h / 2 - 6);
      c += ell(cx, cy, 30 + r() * 10, 26 + r() * 8, fill, 3);
    }
    c += `<rect x="${f(x + 8)}" y="${f(y + 8)}" width="${f(w - 16)}" height="${f(h - 16)}" rx="${f(h / 2.4)}" fill="${fill}"/>`;
    const [tx, ty] = o.tail || [x, y + h + 40];
    tail = ell((x + w / 2 + tx) / 2, (y + h + ty) / 2 + 6, 13, 10, fill, 3) + ell(tx, ty, 8, 6, fill, 3);
    shape = c;
  } else {
    shape = `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(Math.min(h / 2, 46))}" fill="${fill}" ${S(3)}/>`;
  }
  const body = (cloud ? tail + shape : shape + tail) +
    (cloud ? '' : `<rect x="${f(x + 3)}" y="${f(y + 3)}" width="${f(w - 6)}" height="${f(h - 6)}" rx="${f(Math.min(h / 2, 46) - 3)}" fill="${fill}"/>`);
  const t = lines.map((l, i) => `<text x="${f(x + w / 2)}" y="${f(y + 17 + lh * (i + 0.78))}" font-family="'Patrick Hand', 'Andika', sans-serif" font-size="${size}" fill="${P.ink}" text-anchor="middle">${esc(l)}</text>`).join('');
  return `<g filter="url(#bubblef)">${body}</g>${t}`;
}

// Wrap scene content into a full SVG document with the pencil filter and paper grain.
function svgDoc(w, h, content, o = {}) {
  const over = o.over || '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>${defs(o.seed || 3)}</defs>
<rect width="${w}" height="${h}" fill="${o.bg || P.cream}"/>
<g filter="url(#pencil)">${content}</g>
<rect width="${w}" height="${h}" filter="url(#paperf)" opacity="${o.paper ?? 0.16}" style="mix-blend-mode:multiply"/>
${over}
</svg>`;
}

module.exports = { P, defs, S, f, sh, hl, g, tr, rng, ell, rect, path, line, txt, esc, bubble, svgDoc };
