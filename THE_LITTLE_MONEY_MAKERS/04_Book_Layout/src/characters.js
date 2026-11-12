// Character design system. Every character is drawn by one parametric rig so that
// faces, proportions, hair and clothing colours stay identical on every page.
const { P, S, f, sh, ell, path, line, rng } = require('./lib');

const CAST = {
  aarav: { type: 'child', skin: '#c4875a', hair: '#2b1c13', style: 'spiky', outfit: 'tee-shorts', top: P.blue, bottom: '#c9a774', shoe: P.red, badge: 'star', sleeve: 0.55 },
  anya: { type: 'child', scale: 0.86, skin: '#cf9369', hair: '#33221a', style: 'pigtails', outfit: 'dress', top: P.pink, bottom: P.pink, shoe: '#e0577f', sleeve: 0.45, collar: true },
  rohan: { type: 'child', scale: 1.02, skin: '#98623f', hair: '#1f1510', style: 'cap', cap: P.red, outfit: 'tee-shorts', top: P.green, bottom: '#3e5a8a', shoe: '#f2f2ee', sleeve: 0.55 },
  meera: { type: 'child', scale: 0.97, skin: '#b97a52', hair: '#2a1b14', style: 'bob', band: P.yellow, outfit: 'tee-skirt', top: '#f6c344', bottom: '#5d8fd6', shoe: '#5b3b2a', sleeve: 0.5 },
  kabir: { type: 'child', scale: 1.0, skin: '#d39a6f', hair: '#3a2416', style: 'side', glasses: true, outfit: 'tee-shorts', top: P.orange, bottom: '#7a5a43', shoe: '#3c5c9c', sleeve: 0.55 },
  ishaan: { type: 'child', scale: 0.98, skin: '#a8704a', hair: '#1d130d', style: 'short', outfit: 'tee-shorts', top: P.teal, bottom: '#8d8a84', shoe: '#6e6a63', sleeve: 0.55 },
  zara: { type: 'child', scale: 0.96, skin: '#d9a27a', hair: '#5a3622', style: 'bob', band: P.pink, outfit: 'tee-skirt', top: P.purpleLight, bottom: P.purple, shoe: '#5b3b2a', sleeve: 0.5 },
  dev: { type: 'child', scale: 1.0, skin: '#b07650', hair: '#2b1a10', style: 'short', glasses: true, outfit: 'tee-shorts', top: P.yellow, bottom: '#4b6a9a', shoe: P.red, sleeve: 0.55 },
  dad: { type: 'adult', skin: '#b77b4f', hair: '#22160f', style: 'dad', outfit: 'shirt', top: '#8ab8e0', bottom: '#34466b', shoe: '#5a3a26', sleeve: 1.0, beard: true },
  mum: { type: 'adult', scale: 0.94, skin: '#c58b60', hair: '#2a1a12', style: 'braid', outfit: 'kurta', top: P.coral, bottom: '#e9c98f', shoe: '#a5452f', sleeve: 1.35, dupatta: P.yellow, bindi: true },
  kapoor: { type: 'adult', scale: 0.95, skin: '#dba57d', hair: '#3b2418', style: 'bun', glasses: true, outfit: 'blazer', top: '#2f4f86', inner: P.white, bottom: '#2f4f86', shoe: '#2a2a2a', sleeve: 1.9 },
  rao: { type: 'adult', scale: 0.93, skin: '#a9714b', hair: '#241710', style: 'curly', outfit: 'cardigan', top: P.purple, inner: '#fbe3a0', bottom: P.teal, shoe: '#6b3d2a', sleeve: 1.9, earrings: true },
};

const DIM = {
  child: { hy: -236, hrx: 50, hry: 53, tt: -182, sw: 34, hem: -100, hw: 37, hip: -100, sb: -66, lx: 15, lw: 18, ua: 39, fa: 34, aw: 18, shx: 29, shy: -170, neck: 12 },
  adult: { hy: -436, hrx: 40, hry: 46, tt: -386, sw: 50, hem: -236, hw: 44, hip: -236, sb: -236, lx: 21, lw: 27, ua: 74, fa: 64, aw: 23, shx: 43, shy: -372, neck: 13 },
};

const POSES = {
  down: { l: [10, 6], r: [10, 6] },
  relaxed: { l: [14, 2], r: [14, 2] },
  wave: { l: [10, 6], r: [118, 160] },
  waveL: { l: [118, 160], r: [10, 6] },
  cheer: { l: [128, 150], r: [128, 150] },
  point: { l: [10, 6], r: [78, 84] },
  pointUp: { l: [10, 6], r: [110, 150] },
  hold: { l: [8, -96], r: [8, -96] },
  holdHigh: { l: [30, -150], r: [30, -150] },
  give: { l: [20, 70], r: [20, 70] },
  giveR: { l: [10, 6], r: [25, 72] },
  hips: { l: [38, -38], r: [38, -38] },
  think: { l: [8, -96], r: [-6, -168] },
  write: { l: [14, -70], r: [16, -55] },
  shrug: { l: [55, 120], r: [55, 120] },
  sad: { l: [6, 0], r: [6, 0] },
  presentR: { l: [10, 6], r: [60, 110] },
  hugSide: { l: [10, 6], r: [62, 62] },
  holdR: { l: [10, 6], r: [8, -96] },
};

function rad(d) { return (d * Math.PI) / 180; }

// ----- face -----
function face(c, d, e, look = 0) {
  const { hrx: rx, hry: ry } = d;
  const ex = rx * 0.37, ey = ry * 0.1, erx = rx * 0.115, ery = ry * 0.15;
  const lx = look * rx * 0.06;
  const ink = P.ink, eyeC = '#2a1a12';
  let s = '';
  // cheeks
  s += ell(-rx * 0.58, ry * 0.38, rx * 0.15, ry * 0.09, '#ef8a7a', 0, 'opacity=".42"') + ell(rx * 0.58, ry * 0.38, rx * 0.15, ry * 0.09, '#ef8a7a', 0, 'opacity=".42"');
  const closed = ['joy', 'proud', 'laugh'].includes(e);
  const eyesOpen = (scale = 1, dy = 0) => [-1, 1].map((sd) =>
    `<ellipse cx="${f(sd * ex + lx)}" cy="${f(ey + dy)}" rx="${f(erx * scale)}" ry="${f(ery * scale)}" fill="${eyeC}"/>` +
    `<circle cx="${f(sd * ex + lx - erx * 0.35)}" cy="${f(ey + dy - ery * 0.38)}" r="${f(erx * 0.38 * scale)}" fill="#fff"/>` +
    `<circle cx="${f(sd * ex + lx + erx * 0.35)}" cy="${f(ey + dy + ery * 0.35)}" r="${f(erx * 0.16 * scale)}" fill="#fff" opacity=".8"/>`).join('');
  if (closed) s += [-1, 1].map((sd) => `<path d="M${f(sd * ex - erx * 1.2)} ${f(ey + 2)} Q${f(sd * ex)} ${f(ey - ery * 1.3)} ${f(sd * ex + erx * 1.2)} ${f(ey + 2)}" fill="none" ${S(3.4)}/>`).join('');
  else if (e === 'surprised' || e === 'wow') s += eyesOpen(1.22);
  else if (e === 'sad' || e === 'worried') s += eyesOpen(0.95, 3);
  else if (e === 'think') s += [-1, 1].map((sd) => `<ellipse cx="${f(sd * ex + rx * 0.06)}" cy="${f(ey - 2)}" rx="${f(erx)}" ry="${f(ery)}" fill="${eyeC}"/><circle cx="${f(sd * ex + rx * 0.06 - erx * 0.3)}" cy="${f(ey - 2 - ery * 0.4)}" r="${f(erx * 0.38)}" fill="#fff"/>`).join('');
  else s += eyesOpen();
  // brows
  const by = ey - ry * 0.32;
  const brow = (sd, tilt) => `<path d="M${f(sd * ex - rx * 0.13)} ${f(by + (sd < 0 ? tilt : -tilt))} Q${f(sd * ex)} ${f(by - 4)} ${f(sd * ex + rx * 0.13)} ${f(by + (sd < 0 ? -tilt : tilt))}" fill="none" stroke="${c.hair}" stroke-width="${f(rx * 0.075)}" stroke-linecap="round"/>`;
  let tilt = 0, bshift = 0;
  if (e === 'sad' || e === 'worried') tilt = -5;
  if (e === 'determined') tilt = 4;
  if (e === 'surprised' || e === 'wow') bshift = -7;
  s += `<g transform="translate(0 ${bshift})">${brow(-1, tilt)}${brow(1, tilt)}</g>`;
  // nose
  s += `<path d="M${f(-rx * 0.06)} ${f(ry * 0.33)} Q0 ${f(ry * 0.4)} ${f(rx * 0.07)} ${f(ry * 0.32)}" fill="none" stroke="${P.ink}" stroke-width="2.6" stroke-linecap="round" opacity=".75"/>`;
  // mouth
  const my = ry * 0.55, mw = rx * 0.22;
  const red = '#b9433d', tongue = '#ef8b84';
  switch (e) {
    case 'joy': case 'laugh': case 'wow':
      s += `<path d="M${f(-mw * 1.15)} ${f(my - 4)} Q0 ${f(my - 7)} ${f(mw * 1.15)} ${f(my - 4)} Q${f(mw * 0.9)} ${f(my + mw * 1.25)} 0 ${f(my + mw * 1.2)} Q${f(-mw * 0.9)} ${f(my + mw * 1.25)} ${f(-mw * 1.15)} ${f(my - 4)} Z" fill="${red}" ${S(2.6)}/>` +
        `<path d="M${f(-mw * 0.55)} ${f(my + mw * 0.85)} Q0 ${f(my + mw * 0.4)} ${f(mw * 0.55)} ${f(my + mw * 0.85)} Q0 ${f(my + mw * 1.15)} ${f(-mw * 0.55)} ${f(my + mw * 0.85)}Z" fill="${tongue}"/>` +
        `<path d="M${f(-mw * 1.0)} ${f(my - 3)} Q0 ${f(my - 5)} ${f(mw * 1.0)} ${f(my - 3)} L${f(mw * 0.85)} ${f(my + 4)} Q0 ${f(my + 2)} ${f(-mw * 0.85)} ${f(my + 4)}Z" fill="#fff"/>`;
      break;
    case 'talk':
      s += `<path d="M${f(-mw * 0.8)} ${f(my)} Q0 ${f(my - 3)} ${f(mw * 0.8)} ${f(my)} Q0 ${f(my + mw * 1.1)} ${f(-mw * 0.8)} ${f(my)}Z" fill="${red}" ${S(2.4)}/>`;
      break;
    case 'surprised':
      s += ell(0, my + 4, mw * 0.45, mw * 0.6, red, 2.4);
      break;
    case 'sad':
      s += `<path d="M${f(-mw)} ${f(my + 8)} Q0 ${f(my - 6)} ${f(mw)} ${f(my + 8)}" fill="none" ${S(3)}/>`;
      break;
    case 'worried':
      s += `<path d="M${f(-mw)} ${f(my + 4)} Q${f(-mw / 2)} ${f(my - 3)} 0 ${f(my + 3)} Q${f(mw / 2)} ${f(my + 8)} ${f(mw)} ${f(my + 1)}" fill="none" ${S(3)}/>`;
      break;
    case 'think':
      s += `<path d="M${f(-mw * 0.4)} ${f(my + 4)} Q${f(mw * 0.3)} ${f(my + 6)} ${f(mw * 0.9)} ${f(my)}" fill="none" ${S(3)}/>`;
      break;
    case 'determined':
      s += `<path d="M${f(-mw * 0.9)} ${f(my + 2)} Q0 ${f(my + 9)} ${f(mw * 0.9)} ${f(my + 2)}" fill="none" ${S(3.2)}/>`;
      break;
    default: // happy, proud, kind
      s += `<path d="M${f(-mw)} ${f(my)} Q0 ${f(my + mw * 0.95)} ${f(mw)} ${f(my)}" fill="none" ${S(3.2)}/>`;
  }
  return s;
}

// ----- hair (relative to head centre) -----
function hairBack(c, d) {
  const { hrx: rx, hry: ry } = d; const H = c.hair;
  switch (c.style) {
    case 'pigtails':
      return [-1, 1].map((sd) => `<path d="M${f(sd * rx * 0.8)} ${f(-ry * 0.25)} Q${f(sd * (rx + 52))} ${f(-ry * 0.2)} ${f(sd * (rx + 34))} ${f(ry * 0.75)} Q${f(sd * (rx + 18))} ${f(ry * 0.35)} ${f(sd * rx * 0.85)} ${f(ry * 0.15)}Z" fill="${H}" ${S()}/>`).join('');
    case 'braid': {
      return `<path d="M${f(-rx - 6)} ${f(-ry * 0.2)} Q${f(-rx - 14)} ${f(ry * 0.9)} ${f(-rx * 0.7)} ${f(ry * 1.15)} L${f(rx * 0.7)} ${f(ry * 1.15)} Q${f(rx + 14)} ${f(ry * 0.9)} ${f(rx + 6)} ${f(-ry * 0.2)}Z" fill="${H}" ${S()}/>`;
    }
    case 'bun': return ell(0, -ry - 14, rx * 0.5, ry * 0.36, H) + `<path d="M${f(-rx * 0.3)} ${f(-ry - 16)} Q0 ${f(-ry - 6)} ${f(rx * 0.3)} ${f(-ry - 18)}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="3"/>`;
    case 'curly': {
      let s = ''; const r = rng(17);
      for (let i = 0; i <= 12; i++) { const a = rad(-200 + i * 18.3); s += ell(Math.cos(a) * (rx + 10), Math.sin(a) * (ry + 6) + 6, 20 + r() * 5, 19 + r() * 5, H); }
      s += ell(-rx - 8, ry * 0.85, 18, 18, H) + ell(rx + 8, ry * 0.85, 18, 18, H);
      return s;
    }
    case 'bob': return `<path d="M${f(-rx - 10)} ${f(-ry * 0.1)} Q${f(-rx - 14)} ${f(ry * 0.85)} ${f(-rx * 0.62)} ${f(ry * 0.92)} L${f(rx * 0.62)} ${f(ry * 0.92)} Q${f(rx + 14)} ${f(ry * 0.85)} ${f(rx + 10)} ${f(-ry * 0.1)}Z" fill="${H}" ${S()}/>`;
    default: return '';
  }
}

function hairFront(c, d) {
  const { hrx: rx, hry: ry } = d; const H = c.hair;
  const shine = (x1, y1, x2, y2) => `<path d="M${f(x1)} ${f(y1)} Q${f((x1 + x2) / 2)} ${f(Math.min(y1, y2) - 8)} ${f(x2)} ${f(y2)}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="5" stroke-linecap="round"/>`;
  switch (c.style) {
    case 'spiky': {
      // messy tufts over the crown, fringe tufts over the forehead
      const pts = []; const n = 13;
      for (let i = 0; i <= n; i++) {
        const a = rad(195 + (i / n) * 150);
        const R = i % 2 ? 1.0 : 1.2 + (i % 4 === 0 ? 0.05 : 0);
        pts.push([Math.cos(a) * (rx + 4) * (i % 2 ? 1 : 1.12), Math.sin(a) * (ry + 2) * R]);
      }
      let dd = `M${f(-rx - 4)} ${f(ry * 0.12)} L${f(pts[0][0])} ${f(pts[0][1])}`;
      for (let i = 1; i < pts.length; i++) { const p = pts[i - 1], q = pts[i]; dd += ` Q${f((p[0] + q[0]) / 2 + (i % 2 ? 4 : -4))} ${f((p[1] + q[1]) / 2 - 6)} ${f(q[0])} ${f(q[1])}`; }
      dd += ` L${f(rx + 4)} ${f(ry * 0.12)} L${f(rx * 0.92)} ${f(-ry * 0.12)}`;
      const fr = [[0.72, -0.2], [0.5, -0.42], [0.3, -0.14], [0.08, -0.38], [-0.14, -0.1], [-0.36, -0.36], [-0.56, -0.08], [-0.78, -0.3], [-0.95, 0.05]];
      fr.forEach(([x, y], i) => { dd += ` Q${f(rx * (x + 0.1))} ${f(ry * (y - (i % 2 ? 0.05 : 0.18)))} ${f(rx * x)} ${f(ry * y)}`; });
      dd += 'Z';
      return `<path d="${dd}" fill="${H}" ${S()}/>` + shine(-rx * 0.5, -ry * 0.75, rx * 0.1, -ry * 0.92) +
        `<path d="M${f(-rx * 0.2)} ${f(-ry * 0.95)} l-6 -18 M${f(rx * 0.25)} ${f(-ry * 0.98)} l8 -16" stroke="${H}" stroke-width="7" stroke-linecap="round"/>`;
    }
    case 'pigtails': {
      const top = `<path d="M${f(-rx - 3)} ${f(ry * 0.15)} Q${f(-rx - 6)} ${f(-ry * 1.15)} 0 ${f(-ry - 6)} Q${f(rx + 6)} ${f(-ry * 1.15)} ${f(rx + 3)} ${f(ry * 0.15)} Q${f(rx * 0.75)} ${f(-ry * 0.45)} ${f(rx * 0.3)} ${f(-ry * 0.42)} Q${f(rx * 0.1)} ${f(-ry * 0.6)} 0 ${f(-ry * 0.82)} Q${f(-rx * 0.1)} ${f(-ry * 0.6)} ${f(-rx * 0.3)} ${f(-ry * 0.42)} Q${f(-rx * 0.75)} ${f(-ry * 0.45)} ${f(-rx - 3)} ${f(ry * 0.15)}Z" fill="${H}" ${S()}/>`;
      const bow = (sd) => { const x = sd * (rx + 4), y = -ry * 0.42; return `<path d="M${f(x)} ${f(y)} L${f(x - 18)} ${f(y - 14)} L${f(x - 18)} ${f(y + 14)}Z M${f(x)} ${f(y)} L${f(x + 18)} ${f(y - 14)} L${f(x + 18)} ${f(y + 14)}Z" fill="${P.pinkDeep}" ${S(2.6)}/>` + ell(x, y, 7, 7, '#f6c1d4', 2.6); };
      return top + bow(-1) + bow(1) + shine(-rx * 0.6, -ry * 0.7, -rx * 0.1, -ry * 0.98);
    }
    case 'cap': {
      let s = '';
      s += [-1, 1].map((sd) => ell(sd * (rx - 4), -ry * 0.05, 12, 15, H) + ell(sd * (rx - 10), ry * 0.2, 10, 11, H)).join('');
      s += `<path d="M${f(-rx - 4)} ${f(-ry * 0.18)} Q${f(-rx - 4)} ${f(-ry * 1.22)} 0 ${f(-ry * 1.16)} Q${f(rx + 4)} ${f(-ry * 1.22)} ${f(rx + 4)} ${f(-ry * 0.18)}Z" fill="${c.cap}" ${S()}/>`;
      s += sh(`M${f(rx * 0.3)} ${f(-ry * 1.1)} Q${f(rx + 4)} ${f(-ry * 1.1)} ${f(rx + 4)} ${f(-ry * 0.2)} L${f(rx * 0.55)} ${f(-ry * 0.2)}Z`, 0.12);
      s += `<path d="M0 ${f(-ry * 1.16)} L0 ${f(-ry * 0.22)}" stroke="${P.ink}" stroke-width="2" opacity=".5"/>`;
      s += ell(0, -ry * 1.16, 7, 5, c.cap, 2.6);
      s += `<path d="M${f(-rx - 10)} ${f(-ry * 0.16)} Q0 ${f(-ry * 0.42)} ${f(rx + 16)} ${f(-ry * 0.2)} Q${f(rx * 0.4)} ${f(-ry * 0.02)} ${f(-rx - 10)} ${f(-ry * 0.16)}Z" fill="${P.redDark}" ${S()}/>`;
      s += `<path d="M${f(-rx * 0.42)} ${f(-ry * 0.72)} l7 -12 l7 12 l-14 -7 l14 0z" fill="${P.yellow}" ${S(2)}/>`;
      return s;
    }
    case 'bob': {
      const band = `<path d="M${f(-rx - 2)} ${f(-ry * 0.3)} Q0 ${f(-ry * 1.45)} ${f(rx + 2)} ${f(-ry * 0.3)}" fill="none" stroke="${P.ink}" stroke-width="13" stroke-linecap="round"/><path d="M${f(-rx - 2)} ${f(-ry * 0.3)} Q0 ${f(-ry * 1.45)} ${f(rx + 2)} ${f(-ry * 0.3)}" fill="none" stroke="${c.band}" stroke-width="8" stroke-linecap="round"/>`;
      const top = `<path d="M${f(-rx - 8)} ${f(ry * 0.3)} Q${f(-rx - 8)} ${f(-ry * 1.15)} 0 ${f(-ry - 6)} Q${f(rx + 8)} ${f(-ry * 1.15)} ${f(rx + 8)} ${f(ry * 0.3)} L${f(rx * 0.75)} ${f(-ry * 0.3)} L${f(-rx * 0.75)} ${f(-ry * 0.3)}Z" fill="${H}" ${S()}/>`;
      return top + band + shine(-rx * 0.6, -ry * 0.75, -rx * 0.05, -ry * 0.98);
    }
    case 'side': {
      return `<path d="M${f(-rx - 4)} ${f(ry * 0.1)} Q${f(-rx - 6)} ${f(-ry * 1.2)} ${f(rx * 0.1)} ${f(-ry * 1.08)} Q${f(rx + 8)} ${f(-ry * 1.0)} ${f(rx + 4)} ${f(ry * 0.08)} L${f(rx * 0.85)} ${f(-ry * 0.32)} Q${f(rx * 0.2)} ${f(-ry * 0.22)} ${f(-rx * 0.4)} ${f(-ry * 0.62)} Q${f(-rx * 0.65)} ${f(-ry * 0.3)} ${f(-rx * 0.88)} ${f(-ry * 0.1)}Z" fill="${H}" ${S()}/>` + shine(-rx * 0.3, -ry * 0.9, rx * 0.35, -ry * 0.88);
    }
    case 'short': {
      return `<path d="M${f(-rx - 3)} ${f(ry * 0.02)} Q${f(-rx - 4)} ${f(-ry * 1.12)} 0 ${f(-ry - 4)} Q${f(rx + 4)} ${f(-ry * 1.12)} ${f(rx + 3)} ${f(ry * 0.02)} L${f(rx * 0.86)} ${f(-ry * 0.42)} Q${f(rx * 0.3)} ${f(-ry * 0.52)} 0 ${f(-ry * 0.46)} Q${f(-rx * 0.4)} ${f(-ry * 0.54)} ${f(-rx * 0.86)} ${f(-ry * 0.42)}Z" fill="${H}" ${S()}/>` + shine(-rx * 0.4, -ry * 0.82, rx * 0.2, -ry * 0.92);
    }
    case 'dad': {
      return `<path d="M${f(-rx - 3)} ${f(ry * 0.0)} Q${f(-rx - 8)} ${f(-ry * 1.18)} ${f(-rx * 0.1)} ${f(-ry * 1.1)} Q${f(rx + 10)} ${f(-ry * 1.12)} ${f(rx + 3)} ${f(ry * 0.0)} L${f(rx * 0.9)} ${f(-ry * 0.42)} Q${f(rx * 0.3)} ${f(-ry * 0.62)} ${f(-rx * 0.35)} ${f(-ry * 0.66)} Q${f(-rx * 0.7)} ${f(-ry * 0.55)} ${f(-rx * 0.9)} ${f(-ry * 0.35)}Z" fill="${H}" ${S()}/>` + shine(-rx * 0.45, -ry * 0.9, rx * 0.2, -ry * 0.95);
    }
    case 'braid': {
      return `<path d="M${f(-rx - 6)} ${f(ry * 0.5)} Q${f(-rx - 8)} ${f(-ry * 1.15)} 0 ${f(-ry - 5)} Q${f(rx + 8)} ${f(-ry * 1.15)} ${f(rx + 6)} ${f(ry * 0.5)} Q${f(rx * 0.8)} ${f(-ry * 0.1)} ${f(rx * 0.55)} ${f(-ry * 0.5)} Q${f(rx * 0.2)} ${f(-ry * 0.7)} 0 ${f(-ry * 0.86)} Q${f(-rx * 0.2)} ${f(-ry * 0.7)} ${f(-rx * 0.55)} ${f(-ry * 0.5)} Q${f(-rx * 0.8)} ${f(-ry * 0.1)} ${f(-rx - 6)} ${f(ry * 0.5)}Z" fill="${H}" ${S()}/>` + shine(-rx * 0.6, -ry * 0.7, -rx * 0.1, -ry * 0.98);
    }
    case 'bun': {
      return `<path d="M${f(-rx - 3)} ${f(ry * 0.1)} Q${f(-rx - 6)} ${f(-ry * 1.12)} 0 ${f(-ry - 3)} Q${f(rx + 6)} ${f(-ry * 1.12)} ${f(rx + 3)} ${f(ry * 0.1)} Q${f(rx * 0.75)} ${f(-ry * 0.5)} ${f(rx * 0.1)} ${f(-ry * 0.62)} Q${f(-rx * 0.5)} ${f(-ry * 0.58)} ${f(-rx - 3)} ${f(ry * 0.1)}Z" fill="${H}" ${S()}/>` + shine(-rx * 0.5, -ry * 0.75, rx * 0.15, -ry * 0.95);
    }
    case 'curly': {
      let s = ''; const r = rng(5);
      for (let i = 0; i <= 8; i++) { const a = rad(-170 + i * 20); s += ell(Math.cos(a) * rx * 0.82, Math.sin(a) * ry * 0.82 - 6, 16 + r() * 4, 15 + r() * 4, c.hair); }
      return s;
    }
  }
  return '';
}

function beard(c, d) {
  const { hrx: rx, hry: ry } = d;
  return `<path d="M${f(-rx * 0.96)} ${f(ry * 0.05)} Q${f(-rx * 0.95)} ${f(ry * 1.02)} 0 ${f(ry * 1.08)} Q${f(rx * 0.95)} ${f(ry * 1.02)} ${f(rx * 0.96)} ${f(ry * 0.05)} Q${f(rx * 0.75)} ${f(ry * 0.6)} ${f(rx * 0.35)} ${f(ry * 0.66)} Q0 ${f(ry * 0.5)} ${f(-rx * 0.35)} ${f(ry * 0.66)} Q${f(-rx * 0.75)} ${f(ry * 0.6)} ${f(-rx * 0.96)} ${f(ry * 0.05)}Z" fill="${c.hair}" fill-opacity=".9" ${S(2.6)}/>` +
    `<path d="M${f(-rx * 0.34)} ${f(ry * 0.5)} Q0 ${f(ry * 0.36)} ${f(rx * 0.34)} ${f(ry * 0.5)} Q0 ${f(ry * 0.47)} ${f(-rx * 0.34)} ${f(ry * 0.5)}Z" fill="${c.hair}" ${S(2.4)}/>`;
}

function glasses(d) {
  const { hrx: rx, hry: ry } = d; const ex = rx * 0.37, ey = ry * 0.1, r = rx * 0.25;
  return `<circle cx="${f(-ex)}" cy="${f(ey)}" r="${f(r)}" fill="#fff" fill-opacity=".18" ${S(3.4)}/><circle cx="${f(ex)}" cy="${f(ey)}" r="${f(r)}" fill="#fff" fill-opacity=".18" ${S(3.4)}/><path d="M${f(-ex + r)} ${f(ey)} Q0 ${f(ey - 6)} ${f(ex - r)} ${f(ey)}" fill="none" ${S(3)}/>`;
}

// ----- the rig -----
function person(name, o = {}) {
  const c = CAST[name]; if (!c) throw new Error('unknown character ' + name);
  const d = DIM[c.type];
  const sc = (o.scale || 1) * (c.scale || 1);
  const flip = !!o.flip;
  const e = o.expr || 'happy';
  const pose = typeof o.pose === 'object' ? o.pose : POSES[o.pose || 'down'];
  const sit = o.sit || false; // 'chair' | 'cross' | false
  const legs = o.legs !== false;
  const skinSh = 'rgba(80,40,20,.16)';
  let drop = 0;
  if (sit === 'chair') drop = c.type === 'child' ? 44 : 100;
  if (sit === 'cross') drop = c.type === 'child' ? 70 : 160;
  const T = (y) => y + drop; // upper body offset

  let back = '', low = '', body = '', head = '', arms = '', front = '';

  // shoulder points and arms
  const shoulder = (sd) => [sd * d.shx, T(d.shy)];
  const armPts = (sd) => {
    const [a1, a2] = pose[sd < 0 ? 'l' : 'r'];
    const [sx, sy] = shoulder(sd);
    const ex = sx + sd * Math.sin(rad(a1)) * d.ua, ey = sy + Math.cos(rad(a1)) * d.ua;
    const hx = ex + sd * Math.sin(rad(a2)) * d.fa, hy = ey + Math.cos(rad(a2)) * d.fa;
    return { sx, sy, ex, ey, hx, hy };
  };
  const drawArm = (sd) => {
    const a = armPts(sd);
    const pl = `M${f(a.sx)} ${f(a.sy)} L${f(a.ex)} ${f(a.ey)} L${f(a.hx)} ${f(a.hy)}`;
    let s = `<path d="${pl}" fill="none" stroke="${P.ink}" stroke-width="${d.aw + 6.4}" stroke-linecap="round" stroke-linejoin="round"/><path d="${pl}" fill="none" stroke="${c.skin}" stroke-width="${d.aw}" stroke-linecap="round" stroke-linejoin="round"/>`;
    // sleeve along the arm up to fraction t (1 = elbow, 2 = wrist)
    const t = c.sleeve;
    let sp;
    if (t <= 1) sp = `M${f(a.sx)} ${f(a.sy)} L${f(a.sx + (a.ex - a.sx) * t)} ${f(a.sy + (a.ey - a.sy) * t)}`;
    else { const u = Math.min(t - 1, 0.86); sp = `M${f(a.sx)} ${f(a.sy)} L${f(a.ex)} ${f(a.ey)} L${f(a.ex + (a.hx - a.ex) * u)} ${f(a.ey + (a.hy - a.ey) * u)}`; }
    const top = c.outfit === 'cardigan' || c.outfit === 'blazer' ? c.top : c.top;
    s += `<path d="${sp}" fill="none" stroke="${P.ink}" stroke-width="${d.aw + 15}" stroke-linecap="round" stroke-linejoin="round"/><path d="${sp}" fill="none" stroke="${top}" stroke-width="${d.aw + 8.6}" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<circle cx="${f(a.hx)}" cy="${f(a.hy)}" r="${f(d.aw * 0.68)}" fill="${c.skin}" ${S(3)}/>`;
    if (o.point && sd === 1) {
      const dx = a.hx - a.ex, dy = a.hy - a.ey, L = Math.hypot(dx, dy);
      s += `<path d="M${f(a.hx)} ${f(a.hy)} l${f((dx / L) * d.aw * 1.3)} ${f((dy / L) * d.aw * 1.3)}" stroke="${P.ink}" stroke-width="${f(d.aw * 0.55 + 6)}" stroke-linecap="round"/><path d="M${f(a.hx)} ${f(a.hy)} l${f((dx / L) * d.aw * 1.3)} ${f((dy / L) * d.aw * 1.3)}" stroke="${c.skin}" stroke-width="${f(d.aw * 0.55)}" stroke-linecap="round"/>`;
    }
    return s;
  };

  // ---------- lower body ----------
  const shoe = (x, y, sd) => { const k = c.type === 'adult' ? 1.35 : 1; return `<path d="M${f(x - sd * 13 * k)} ${f(y)} Q${f(x - sd * 14 * k)} ${f(y - 16 * k)} ${f(x + sd * 2)} ${f(y - 16 * k)} Q${f(x + sd * 22 * k)} ${f(y - 14 * k)} ${f(x + sd * 22 * k)} ${f(y)}Z" fill="${c.shoe}" ${S()}/>` + (c.type === 'child' ? `<path d="M${f(x - sd * 11)} ${f(y - 3)} L${f(x + sd * 20)} ${f(y - 3)}" stroke="#fff" stroke-width="3" opacity=".7"/>` : ''); };
  const capsule = (x1, y1, x2, y2, w, col) => `<path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" stroke="${P.ink}" stroke-width="${w + 6.4}" stroke-linecap="round"/><path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const legCol = c.type === 'adult' && c.outfit !== 'kurta' ? c.bottom : c.skin;
  const legColAdult = c.outfit === 'kurta' ? c.bottom : legCol;

  if (legs) {
    if (!sit) {
      [-1, 1].forEach((sd) => { low += capsule(sd * d.lx, T(d.hip) + 10, sd * d.lx * 1.05, -14, c.type === 'adult' ? d.lw : d.lw, c.type === 'adult' ? legColAdult : c.skin); });
      if (c.type === 'child' && c.outfit !== 'dress') low += [-1, 1].map((sd) => `<rect x="${f(sd * d.lx * 1.05 - 9)}" y="-30" width="18" height="12" rx="3" fill="#fff" ${S(2.4)}/>`).join('');
      [-1, 1].forEach((sd) => { low += shoe(sd * d.lx * 1.05, 0, sd); });
    } else if (sit === 'chair') {
      const knee = T(d.hip) + (c.type === 'child' ? 16 : 34);
      [-1, 1].forEach((sd) => { low += capsule(sd * d.lx * 1.15, knee, sd * d.lx * 1.15, -14, d.lw, c.type === 'adult' ? legColAdult : c.skin); });
      if (c.type === 'child' && c.outfit !== 'dress') low += [-1, 1].map((sd) => `<rect x="${f(sd * d.lx * 1.15 - 9)}" y="-30" width="18" height="12" rx="3" fill="#fff" ${S(2.4)}/>`).join('');
      [-1, 1].forEach((sd) => { low += shoe(sd * d.lx * 1.15, 0, sd); });
      [-1, 1].forEach((sd) => { low += ell(sd * d.lx * 1.15, knee, d.lw * 0.95, d.lw * 0.85, c.type === 'adult' ? legColAdult : c.skin, 3); });
    } else if (sit === 'cross') {
      const y = -16 * (c.type === 'adult' ? 1.6 : 1), span = c.type === 'adult' ? 95 : 56;
      low += capsule(-span, y - 4, span * 0.55, y + 6, d.lw + 4, c.type === 'adult' ? legColAdult : (c.outfit === 'dress' ? c.skin : c.skin));
      low += capsule(span, y - 4, -span * 0.55, y + 6, d.lw + 4, c.type === 'adult' ? legColAdult : c.skin);
      low += shoe(span * 0.6, y + 14, 1) + shoe(-span * 0.6, y + 14, -1);
    }
  }

  // shorts / skirt / trousers top
  const hip = T(d.hip);
  if (c.outfit === 'tee-shorts' && legs) {
    if (sit === 'cross') low += `<path d="M${-d.hw} ${f(hip - 6)} L${d.hw} ${f(hip - 6)} L${d.hw + 22} -16 Q0 -2 ${-d.hw - 22} -16Z" fill="${c.bottom}" ${S()}/>`;
    else {
      const sb = sit === 'chair' ? hip + 28 : d.sb;
      low += `<path d="M${-d.hw + 1} ${f(hip - 8)} L${d.hw - 1} ${f(hip - 8)} L${d.hw + 4} ${f(sb)} L3 ${f(sb)} L0 ${f(hip + 14)} L-3 ${f(sb)} L${-d.hw - 4} ${f(sb)}Z" fill="${c.bottom}" ${S()}/>` + sh(`M${d.hw - 14} ${f(hip - 6)} L${d.hw - 1} ${f(hip - 6)} L${d.hw + 4} ${f(sb)} L${d.hw - 10} ${f(sb)}Z`, 0.08);
    }
  }
  if (c.outfit === 'tee-skirt' && legs) {
    const sb = sit === 'cross' ? -10 : sit === 'chair' ? hip + 32 : d.sb + 4;
    low += `<path d="M${-d.hw + 2} ${f(hip - 8)} L${d.hw - 2} ${f(hip - 8)} L${d.hw + 16} ${f(sb)} Q0 ${f(sb + 6)} ${-d.hw - 16} ${f(sb)}Z" fill="${c.bottom}" ${S()}/>`;
  }
  if (c.type === 'adult' && legs && c.outfit !== 'kurta' && c.outfit !== 'cardigan') {
    // trouser top / hip block
    const yb = sit === 'chair' ? hip + 40 : hip + 46;
    low += `<path d="M${-d.hw} ${f(hip - 6)} L${d.hw} ${f(hip - 6)} L${d.hw + 2} ${f(yb)} L${-d.hw - 2} ${f(yb)}Z" fill="${c.bottom}" ${S()}/>`;
    low += `<path d="M0 ${f(hip + 4)} L0 ${f(yb)}" stroke="${P.ink}" stroke-width="2" opacity=".4"/>`;
  }
  if (c.outfit === 'cardigan' && legs) {
    const sb = sit ? -20 : -40;
    low += `<path d="M${-d.hw} ${f(hip - 30)} L${d.hw} ${f(hip - 30)} L${d.hw + 30} ${sb} Q0 ${sb + 10} ${-d.hw - 30} ${sb}Z" fill="${c.bottom}" ${S()}/>` + sh(`M${d.hw * 0.4} ${f(hip - 28)} L${d.hw} ${f(hip - 28)} L${d.hw + 30} ${sb} L${d.hw * 0.6} ${sb + 6}Z`, 0.08);
  }

  // ---------- torso ----------
  const tt = T(d.tt), hem = T(d.hem), sw = d.sw, hw = d.hw;
  const torso = (top, hemY, hemW, col) => `<path d="M${f(-sw * 0.45)} ${f(top)} Q0 ${f(top + 12)} ${f(sw * 0.45)} ${f(top)} L${f(sw - 8)} ${f(top + 3)} Q${f(sw + 2)} ${f(top + 6)} ${f(sw)} ${f(top + 24)} L${f(hemW)} ${f(hemY)} Q0 ${f(hemY + 6)} ${f(-hemW)} ${f(hemY)} L${f(-sw)} ${f(top + 24)} Q${f(-sw - 2)} ${f(top + 6)} ${f(-sw + 8)} ${f(top + 3)}Z" fill="${col}" ${S()}/>`;
  const torsoShade = (top, hemY, hemW) => sh(`M${f(sw * 0.5)} ${f(top + 6)} L${f(sw - 4)} ${f(top + 6)} Q${f(sw + 2)} ${f(top + 10)} ${f(sw)} ${f(top + 26)} L${f(hemW)} ${f(hemY)} L${f(hemW * 0.55)} ${f(hemY + 2)}Z`, 0.09);
  if (c.outfit === 'dress') {
    const dh = sit === 'cross' ? -6 : sit === 'chair' ? hip + 34 : d.sb - 2;
    body += `<path d="M${f(-sw * 0.45)} ${f(tt)} Q0 ${f(tt + 12)} ${f(sw * 0.45)} ${f(tt)} L${f(sw - 8)} ${f(tt + 3)} Q${f(sw + 2)} ${f(tt + 6)} ${f(sw)} ${f(tt + 24)} L${f(sw - 4)} ${f(hem - 14)} L${f(sw + 26)} ${f(dh)} Q0 ${f(dh + 10)} ${f(-sw - 26)} ${f(dh)} L${f(-sw + 4)} ${f(hem - 14)} L${f(-sw)} ${f(tt + 24)} Q${f(-sw - 2)} ${f(tt + 6)} ${f(-sw + 8)} ${f(tt + 3)}Z" fill="${c.top}" ${S()}/>`;
    body += `<path d="M${f(-sw + 4)} ${f(hem - 14)} Q0 ${f(hem - 8)} ${f(sw - 4)} ${f(hem - 14)}" fill="none" stroke="${P.white}" stroke-width="6" opacity=".9"/>`;
    for (let i = 0; i < 9; i++) body += `<circle cx="${f(-sw - 10 + i * (2 * sw + 20) / 8)}" cy="${f(dh - 10 - (i % 2) * 18)}" r="4" fill="#fff" opacity=".75"/>`;
    body += sh(`M${f(sw * 0.4)} ${f(tt + 6)} L${f(sw - 4)} ${f(tt + 8)} L${f(sw - 2)} ${f(hem - 14)} L${f(sw + 26)} ${f(dh)} L${f(sw * 0.6)} ${f(dh + 4)}Z`, 0.08);
    if (c.collar) body += `<path d="M${f(-sw * 0.5)} ${f(tt - 1)} Q${f(-sw * 0.3)} ${f(tt + 18)} 0 ${f(tt + 10)} Q${f(sw * 0.3)} ${f(tt + 18)} ${f(sw * 0.5)} ${f(tt - 1)} Q0 ${f(tt + 8)} ${f(-sw * 0.5)} ${f(tt - 1)}Z" fill="#fff" ${S(2.6)}/>`;
  } else if (c.outfit === 'kurta') {
    const kh = sit ? T(-130) : -150;
    body += `<path d="M${f(-sw * 0.45)} ${f(tt)} Q0 ${f(tt + 12)} ${f(sw * 0.45)} ${f(tt)} L${f(sw - 8)} ${f(tt + 3)} Q${f(sw + 2)} ${f(tt + 6)} ${f(sw)} ${f(tt + 24)} L${f(hw + 18)} ${f(kh)} Q0 ${f(kh + 8)} ${f(-hw - 18)} ${f(kh)} L${f(-sw)} ${f(tt + 24)} Q${f(-sw - 2)} ${f(tt + 6)} ${f(-sw + 8)} ${f(tt + 3)}Z" fill="${c.top}" ${S()}/>`;
    body += `<path d="M0 ${f(tt + 10)} L0 ${f(tt + 70)}" stroke="${P.goldDark}" stroke-width="3"/>` + [0, 1, 2].map((i) => `<circle cx="0" cy="${f(tt + 24 + i * 18)}" r="3.4" fill="${P.yellow}" ${S(1.6)}/>`).join('');
    body += `<path d="M${f(-hw - 14)} ${f(kh - 16)} Q0 ${f(kh - 8)} ${f(hw + 14)} ${f(kh - 16)}" fill="none" stroke="${P.yellow}" stroke-width="7" opacity=".9"/>`;
    body += sh(`M${f(sw * 0.4)} ${f(tt + 6)} L${f(sw - 4)} ${f(tt + 8)} L${f(hw + 18)} ${f(kh)} L${f(hw * 0.5)} ${f(kh + 4)}Z`, 0.08);
    // dupatta across the shoulder
    body += `<path d="M${f(-sw + 2)} ${f(tt + 4)} Q${f(-sw * 0.2)} ${f(tt + 60)} ${f(sw - 6)} ${f(tt + 130)} L${f(sw + 6)} ${f(tt + 110)} Q${f(sw * 0.1)} ${f(tt + 40)} ${f(-sw + 22)} ${f(tt - 2)}Z" fill="${c.dupatta}" ${S(2.8)}/>`;
  } else if (c.outfit === 'shirt') {
    body += torso(tt, hem, hw, c.top) + torsoShade(tt, hem, hw);
    body += `<path d="M${f(-sw * 0.45)} ${f(tt)} L${f(-4)} ${f(tt + 24)} L${f(-14)} ${f(tt + 2)}Z M${f(sw * 0.45)} ${f(tt)} L${f(4)} ${f(tt + 24)} L${f(14)} ${f(tt + 2)}Z" fill="#cfe3f5" ${S(2.4)}/>`;
    body += `<path d="M0 ${f(tt + 24)} L0 ${f(hem)}" stroke="${P.ink}" stroke-width="2" opacity=".5"/>` + [0, 1, 2, 3].map((i) => `<circle cx="5" cy="${f(tt + 40 + i * 28)}" r="3" fill="#fff" ${S(1.4)}/>`).join('');
    body += `<rect x="${f(sw * 0.3)}" y="${f(tt + 32)}" width="22" height="20" rx="3" fill="none" stroke="${P.ink}" stroke-width="2" opacity=".5"/>`;
    body += `<path d="M${f(-hw)} ${f(hem - 2)} L${f(hw)} ${f(hem - 2)}" stroke="#4a3a28" stroke-width="9"/><rect x="-10" y="${f(hem - 8)}" width="20" height="12" rx="2" fill="${P.gold}" ${S(2)}/>`;
  } else if (c.outfit === 'blazer' || c.outfit === 'cardigan') {
    const bh = c.outfit === 'cardigan' ? hem + 6 : hem;
    body += torso(tt, bh, hw + 2, c.inner);
    body += `<path d="M${f(-sw * 0.45)} ${f(tt)} L${f(-10)} ${f(tt + 70)} L${f(-hw + 4)} ${f(bh)} L${f(-hw - 2)} ${f(bh)} L${f(-sw)} ${f(tt + 24)} Q${f(-sw - 2)} ${f(tt + 6)} ${f(-sw + 8)} ${f(tt + 3)}Z" fill="${c.top}" ${S()}/>`;
    body += `<path d="M${f(sw * 0.45)} ${f(tt)} L${f(10)} ${f(tt + 70)} L${f(hw - 4)} ${f(bh)} L${f(hw + 2)} ${f(bh)} L${f(sw)} ${f(tt + 24)} Q${f(sw + 2)} ${f(tt + 6)} ${f(sw - 8)} ${f(tt + 3)}Z" fill="${c.top}" ${S()}/>`;
    if (c.outfit === 'blazer') body += `<rect x="${f(-sw * 0.85)}" y="${f(tt + 40)}" width="30" height="12" rx="2" fill="${P.gold}" ${S(2)}/>` + `<path d="M${f(-sw * 0.45)} ${f(tt)} L-2 ${f(tt + 22)} L${f(sw * 0.45)} ${f(tt)}" fill="none" stroke="${P.coral}" stroke-width="5"/>`;
    else body += [0, 1, 2].map((i) => `<circle cx="${f(-12 + i * 0)}" cy="${f(tt + 84 + i * 26)}" r="3.6" fill="#fff" ${S(1.4)}/>`).join('');
    body += torsoShade(tt, bh, hw);
  } else {
    body += torso(tt, hem, hw, c.top) + torsoShade(tt, hem, hw);
    if (c.badge === 'star') body += `<path transform="translate(${f(-sw * 0.38)} ${f(tt + 34)}) scale(0.9)" d="M0 -12 L3.5 -4 L12 -3.5 L5.5 2 L7.5 11 L0 6 L-7.5 11 L-5.5 2 L-12 -3.5 L-3.5 -4Z" fill="${P.yellow}" ${S(2)}/>`;
    body += `<path d="M${f(-sw * 0.45)} ${f(tt)} Q0 ${f(tt + 14)} ${f(sw * 0.45)} ${f(tt)}" fill="none" stroke="${P.ink}" stroke-width="5" opacity=".35"/>`;
  }
  // neck
  const neckTop = T(d.hy + d.hry * 0.8);
  body = `<path d="M${-d.neck} ${f(neckTop)} L${-d.neck} ${f(tt + 8)} Q0 ${f(tt + 14)} ${d.neck} ${f(tt + 8)} L${d.neck} ${f(neckTop)}Z" fill="${c.skin}" ${S()}/>` + `<path d="M${-d.neck} ${f(tt - 4)} Q0 ${f(tt + 6)} ${d.neck} ${f(tt - 4)} L${d.neck} ${f(tt + 6)} Q0 ${f(tt + 12)} ${-d.neck} ${f(tt + 6)}Z" fill="${skinSh}"/>` + body;

  // ---------- head ----------
  const hy = T(d.hy);
  let hd = hairBack(c, d);
  hd += [-1, 1].map((sd) => ell(sd * d.hrx * 0.98, 6, d.hrx * 0.17, d.hry * 0.2, c.skin, 3)).join('');
  if (c.earrings) hd += [-1, 1].map((sd) => `<circle cx="${f(sd * d.hrx)}" cy="${f(d.hry * 0.32)}" r="7" fill="none" stroke="${P.gold}" stroke-width="3.4"/>`).join('');
  if (c.style === 'bun' || c.style === 'braid') hd += [-1, 1].map((sd) => `<circle cx="${f(sd * d.hrx * 0.98)}" cy="${f(d.hry * 0.3)}" r="4.5" fill="${P.gold}" ${S(1.6)}/>`).join('');
  hd += `<path d="M0 ${-d.hry} C${f(d.hrx * 0.58)} ${-d.hry} ${f(d.hrx * 1.02)} ${f(-d.hry * 0.62)} ${f(d.hrx)} ${f(d.hry * 0.04)} C${f(d.hrx * 0.98)} ${f(d.hry * 0.62)} ${f(d.hrx * 0.52)} ${f(d.hry * 1.0)} 0 ${f(d.hry * 1.0)} C${f(-d.hrx * 0.52)} ${f(d.hry * 1.0)} ${f(-d.hrx * 0.98)} ${f(d.hry * 0.62)} ${-d.hrx} ${f(d.hry * 0.04)} C${f(-d.hrx * 1.02)} ${f(-d.hry * 0.62)} ${f(-d.hrx * 0.58)} ${-d.hry} 0 ${-d.hry}Z" fill="${c.skin}" ${S()}/>`;
  hd += `<path d="M${f(d.hrx * 0.45)} ${f(-d.hry * 0.7)} C${f(d.hrx * 1.0)} ${f(-d.hry * 0.4)} ${f(d.hrx * 1.0)} ${f(d.hry * 0.5)} ${f(d.hrx * 0.4)} ${f(d.hry * 0.92)} C${f(d.hrx * 0.75)} ${f(d.hry * 0.4)} ${f(d.hrx * 0.8)} ${f(-d.hry * 0.3)} ${f(d.hrx * 0.45)} ${f(-d.hry * 0.7)}Z" fill="${skinSh}"/>`;
  if (c.beard) hd += beard(c, d);
  hd += face(c, d, e, o.look || 0);
  if (c.bindi) hd += `<circle cx="0" cy="${f(-d.hry * 0.3)}" r="3.6" fill="${P.red}"/>`;
  hd += hairFront(c, d);
  if (c.glasses) hd += glasses(d);
  head = `<g transform="translate(0 ${f(hy)}) rotate(${o.tilt || 0})">${hd}</g>`;

  // braid hanging over the shoulder (in front)
  if (c.style === 'braid') {
    let b = ''; const bx = d.sw * 0.55;
    for (let i = 0; i < 6; i++) b += ell(bx + (i % 2 ? 3 : -3), T(d.hy) + d.hry * 0.9 + i * 19, 11 - i * 0.5, 13, c.hair, 2.6);
    b += `<path d="M${f(bx - 6)} ${f(T(d.hy) + d.hry * 0.9 + 6 * 19 - 4)} l12 0 l-2 14 l-8 0z" fill="${P.yellow}" ${S(2)}/>`;
    front += b;
  }

  if (o.armsBehind) back += drawArm(-1) + drawArm(1);
  else arms = drawArm(-1) + drawArm(1);

  const inner = back + low + body + head + arms + front + (o.extra || '');
  const x = o.x || 0, y = o.y || 0;
  const svg = `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -sc : sc} ${sc})">${inner}</g>`;
  const toScene = (px, py) => [x + (flip ? -px : px) * sc, y + py * sc];
  const L = armPts(-1), R = armPts(1);
  return {
    svg,
    hands: { l: toScene(L.hx, L.hy), r: toScene(R.hx, R.hy) },
    head: toScene(0, hy),
    top: toScene(0, hy - d.hry),
    mouth: toScene(0, hy + d.hry * 0.55),
    sc,
  };
}

// Convenience: returns only the svg string
const fig = (name, o) => person(name, o).svg;

module.exports = { CAST, POSES, person, fig };
