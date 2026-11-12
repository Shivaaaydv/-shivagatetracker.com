// Scene compositions: pages 8–28, back cover and worksheet spot art.
const { P, S, f, sh, ell, rect, path, line, txt, bubble, rng } = require('./lib');
const { person, fig } = require('./characters');
const X = require('./props');

const W = 1480, H = 800;
const chalk = (x, y, s, size, o = {}) => txt(x, y, s, size, { font: o.font || 'Patrick Hand', weight: 400, fill: o.fill || '#fdfbf2', anchor: o.anchor || 'middle' });
const pen = (x, y, s, size, o = {}) => txt(x, y, s, size, { font: o.font || 'Andika', weight: o.weight || 700, fill: o.fill || P.ink, anchor: o.anchor || 'start' });
const tick = (x, y, s = 1, col = P.green) => X.at(x, y, s, `<path d="M-14 0 L-4 12 L16 -14" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`);
const cross = (x, y, s = 1, col = P.red) => X.at(x, y, s, `<path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke="${col}" stroke-width="8" stroke-linecap="round"/>`);
const chairBack = (x, y, s = 1, col = P.wood) => X.at(x, y, s, `<rect x="-58" y="-250" width="116" height="150" rx="16" fill="${col}" ${S()}/><rect x="-62" y="-104" width="124" height="22" rx="8" fill="${col}" ${S()}/><rect x="-52" y="-84" width="12" height="84" fill="${P.brownDark}" ${S(2.4)}/><rect x="40" y="-84" width="12" height="84" fill="${P.brownDark}" ${S(2.4)}/>`);
const bunting = (w, y, cols = [P.red, P.yellow, P.blue, P.green, P.pink]) => {
  let s = `<path d="M0 ${y} Q${w / 2} ${y + 50} ${w} ${y}" fill="none" ${S(3)}/>`;
  for (let i = 0; i < 16; i++) { const x = 40 + i * (w - 80) / 15; const yy = y + 50 * (1 - Math.pow((x - w / 2) / (w / 2), 2)) * 0.98; s += `<path d="M${x - 24} ${yy - 2} L${x + 24} ${yy - 2} L${x} ${yy + 40}Z" fill="${cols[i % cols.length]}" ${S(2.6)}/>`; }
  return s;
};
const confetti = (w, h, n = 40, seed = 3) => { const r = rng(seed); let s = ''; const cols = [P.red, P.yellow, P.blue, P.green, P.pink, P.orange]; for (let i = 0; i < n; i++) s += `<rect x="${f(r() * w)}" y="${f(r() * h)}" width="12" height="20" rx="3" fill="${cols[i % 6]}" transform="rotate(${f(r() * 180)} ${f(r() * w)} ${f(r() * h)})" ${S(1.8)}/>`; return s; };

// ---------------- PAGE 8 – A VISIT TO THE BANK ----------------
function p08() {
  let a = X.room(W, H, { wall: '#dcefe9', floorY: 610, floor: '#d8c7a6', stripes: false });
  for (let x = 0; x < W; x += 120) a += `<rect x="${x}" y="0" width="4" height="600" fill="#fff" opacity=".5"/>`;
  // bank sign + vault
  a += `<rect x="380" y="40" width="420" height="110" rx="14" fill="${P.blueDark}" ${S()}/>` + X.coin(450, 95, 34) + txt(620, 122, 'BANK', 78, { fill: '#fff', ls: 8 });
  a += `<circle cx="1300" cy="300" r="150" fill="#c9d1d6" ${S()}/><circle cx="1300" cy="300" r="118" fill="#b3bdc3" ${S()}/>`;
  for (let i = 0; i < 6; i++) { const t = (i / 6) * Math.PI * 2; a += line(1300, 300, 1300 + Math.cos(t) * 70, 300 + Math.sin(t) * 70, 10, P.ink) + line(1300, 300, 1300 + Math.cos(t) * 70, 300 + Math.sin(t) * 70, 5, '#e8ecee'); }
  a += `<circle cx="1300" cy="300" r="26" fill="${P.gold}" ${S()}/>`;
  a += X.plantPot(80, 690, 1.0) + X.windowFrame(120, 120, 200, 200, { tree: false });
  // manager behind desk
  const k = person('kapoor', { x: 980, y: 820, scale: 1.12, pose: 'presentR', expr: 'talk', flip: true, legs: false });
  a += k.svg;
  a += X.table(960, 790, 560, 230, P.wood, { front: '#a7744a' });
  a += `<rect x="1040" y="496" width="150" height="96" rx="6" fill="#5b6275" ${S()}/><rect x="1050" y="506" width="130" height="76" rx="3" fill="#bfe6f5"/><path d="M1020 596 L1210 596" ${S(8)}/>`;
  a += X.sign(860, 576, 190, 44, 'Mrs Kapoor', { fill: P.white, size: 28 });
  a += X.coinStack(1230, 588, 3, 20);
  // visitors
  a += chairBack(330, 760, 1.25, P.coral) + chairBack(560, 760, 1.05, P.coral);
  a += fig('dad', { x: 330, y: 770, scale: 1.08, sit: 'chair', pose: 'down', expr: 'happy', look: 1 });
  const ar = person('aarav', { x: 560, y: 770, scale: 1.38, sit: 'chair', pose: 'hold', expr: 'wow', look: 1 });
  a += ar.svg;
  const over = bubble(560, 170, ['Welcome, Aarav! A bank', 'keeps your money safe.'], { tail: [k.mouth[0] - 30, k.mouth[1] - 10], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 9 – HOW MONEY CAN GROW ----------------
function p09() {
  let a = X.room(W, H, { wall: '#dcefe9', floorY: 640, floor: '#d8c7a6', stripes: false });
  a += `<rect x="330" y="40" width="890" height="560" rx="16" fill="${P.white}" ${S()}/><rect x="350" y="60" width="850" height="520" rx="10" fill="none" stroke="${P.skyDeep}" stroke-width="3" stroke-dasharray="12 10"/>`;
  a += `<path d="M560 600 L520 720 M990 600 L1030 720" ${S(10)}/>`;
  a += txt(775, 128, 'How money can grow', 54, { fill: P.blueDark });
  a += X.sign(775, 178, 240, 44, 'A pretend example', { fill: P.yellow, size: 26, rot: -2 });
  const stage = (x, n, plantS, amt, lbl) => X.coinStack(x, 470, n, 40) + X.seedling(x, 470 - n * 14.4 - 8, plantS) + txt(x, 532, amt, 52, { fill: P.green }) + txt(x, 570, lbl, 30, { weight: 600 });
  a += stage(500, 3, 0.7, '₹100', 'Start');
  a += stage(775, 4, 1.15, '₹110', 'After 1 year');
  a += stage(1050, 5, 1.6, '₹121', 'After 2 years');
  a += `<path d="M570 400 Q630 360 690 400" fill="none" stroke="${P.coral}" stroke-width="7"/><path d="M690 400 l-20 -2 m20 2 l-8 -18" stroke="${P.coral}" stroke-width="7" stroke-linecap="round"/>`;
  a += `<path d="M845 380 Q905 340 965 380" fill="none" stroke="${P.coral}" stroke-width="7"/><path d="M965 380 l-20 -2 m20 2 l-8 -18" stroke="${P.coral}" stroke-width="7" stroke-linecap="round"/>`;
  a += txt(630, 352, '+₹10', 32, { fill: P.coral }) + txt(905, 332, '+₹11', 32, { fill: P.coral });
  const k = person('kapoor', { x: 190, y: 760, scale: 1.12, pose: 'point', point: true, expr: 'talk' });
  a += X.shadow(190, 760, 80) + k.svg;
  const ar = person('aarav', { x: 1350, y: 770, scale: 1.45, pose: 'cheer', expr: 'wow', flip: true });
  a += X.shadow(1350, 770, 80) + ar.svg;
  const over = bubble(20, 22, ['Interest is money', 'your money earns.'], { tail: [k.mouth[0], k.top[1] - 4], size: 36 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 10 – A SMALL MISTAKE ----------------
function p10() {
  let a = X.room(W, H, { wall: '#b7c0e0', floorY: 620, floor: '#a78a6c' });
  a += X.windowFrame(1120, 80, 250, 230, { night: true, curtain: P.blue });
  a += `<rect x="0" y="0" width="${W}" height="${H}" fill="#24305e" opacity=".12"/>`;
  // bed
  a += `<rect x="250" y="360" width="40" height="330" rx="12" fill="${P.wood}" ${S()}/><rect x="270" y="520" width="760" height="140" rx="20" fill="${P.white}" ${S()}/><rect x="1000" y="470" width="36" height="220" rx="12" fill="${P.wood}" ${S()}/>`;
  a += `<ellipse cx="380" cy="510" rx="90" ry="38" fill="${P.white}" ${S()}/>`;
  const ar = person('aarav', { x: 640, y: 600, scale: 1.4, sit: 'cross', pose: 'hold', expr: 'worried', look: 1 });
  a += ar.svg;
  a += X.gameConsole((ar.hands.l[0] + ar.hands.r[0]) / 2, ar.hands.l[1] + 6, 0.8);
  a += `<path d="M270 560 L1030 560 L1030 650 Q650 690 270 650Z" fill="${P.blueLight}" ${S()}/>` + `<path d="M300 600 L1000 600" stroke="#fff" stroke-width="5" stroke-dasharray="20 16" opacity=".6"/>`;
  // bedside table with the light piggy bank
  a += X.table(1240, 700, 220, 170, P.wood) + X.lamp(1300, 524, 0.7);
  a += X.piggy(1200, 470, 0.6, { closed: true }) + X.coin(1150, 520, 14, { edge: true });
  a += `<path d="M1180 400 q-6 -14 4 -22" fill="none" stroke="${P.skyDeep}" stroke-width="4"/>`;
  // thought cloud with the bicycle far away
  a += `<g>${[[860, 140, 120, 96], [740, 170, 80, 70], [990, 170, 86, 72], [860, 230, 130, 60]].map(([x, y, rx, ry]) => ell(x, y, rx, ry, P.white, 3)).join('')}<rect x="720" y="120" width="290" height="140" rx="60" fill="${P.white}"/></g>`;
  a += `<path d="M740 236 Q860 150 980 200" fill="none" stroke="${P.grey}" stroke-width="5" stroke-dasharray="10 10"/>`;
  a += X.bicycle(960, 206, 0.32, P.red) + txt(800, 200, '?', 70, { fill: P.coral });
  a += ell(770, 300, 16, 12, P.white, 3) + ell(740, 336, 10, 8, P.white, 3);
  const over = bubble(30, 40, ['Oh no! Now my bicycle', 'will take much longer.'], { tail: [ar.mouth[0] - 70, ar.top[1] + 10], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 11 – THE POWER OF PATIENCE ----------------
function p11() {
  let a = X.outdoor(W, H, { groundY: 560, sunX: 140, sunY: 100 });
  // fence
  for (let x = 0; x < W; x += 70) a += `<path d="M${x} 560 L${x} 440 L${x + 25} 420 L${x + 50} 440 L${x + 50} 560Z" fill="${P.white}" ${S(2.6)}/>`;
  a += `<rect x="0" y="470" width="${W}" height="18" fill="${P.white}" ${S(2.6)}/>`;
  a += X.tree(1230, 600, 1.45, { seed: 11, fruit: P.orange });
  a += X.sign(1230, 650, 200, 50, 'Mango tree', { fill: P.yellowSoft, size: 28 });
  a += `<ellipse cx="620" cy="700" rx="300" ry="40" fill="${P.brownLight}" ${S()}/>`;
  a += X.bush(110, 640, 1, P.green, P.pink) + X.flower(260, 700, 1, P.yellow) + X.flower(980, 720, 0.9, P.coral);
  const d = person('dad', { x: 420, y: 720, scale: 1.12, pose: 'giveR', expr: 'kind' });
  a += d.svg + X.wateringCan(d.hands.r[0] + 40, d.hands.r[1] + 50, 0.85);
  a += X.pot(660, 716, 1.0, P.coral) + X.seedling(660, 654, 1.1);
  [0, 1, 2].forEach((i) => { a += `<path d="M${590 + i * 20} ${560 + i * 18} l10 14" stroke="${P.skyDeep}" stroke-width="5" stroke-linecap="round"/>`; });
  const ar = person('aarav', { x: 860, y: 730, scale: 1.45, pose: 'give', expr: 'happy', look: -1, flip: true });
  a += ar.svg;
  const over = bubble(330, 40, ['Everyone makes mistakes.', "Let’s learn from this one."], { tail: [d.mouth[0] + 30, d.top[1] - 6], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 12 – A DISCIPLINED FRIEND ----------------
function p12() {
  let a = X.outdoor(W, H, { groundY: 520, sunX: 1260, sunY: 160 });
  a += `<path d="M560 520 Q620 640 420 820 L1100 820 Q860 640 820 520Z" fill="${P.creamDeep}" ${S()}/>`;
  a += X.tree(120, 640, 1.2, { seed: 5 }) + X.tree(1380, 620, 1.05, { seed: 7 });
  a += `<rect x="980" y="520" width="200" height="16" rx="5" fill="${P.wood}" ${S()}/><rect x="990" y="488" width="180" height="16" rx="5" fill="${P.wood}" ${S()}/><path d="M1000 536 v40 M1160 536 v40" ${S(8)}/>`;
  a += X.sign(1320, 470, 190, 56, 'Green Park', { fill: P.white, size: 30 }) + `<path d="M1320 498 L1320 560" ${S(8)}/>`;
  a += X.at(300, 760, 1, `<circle r="34" fill="#fff" ${S()}/><path d="M0 -12 l11 8 -4 13 -14 0 -4 -13z" fill="${P.ink}"/><path d="M-34 0 L-15 1 M15 1 L34 0 M0 -34 L0 -12 M-7 9 L-20 28 M7 9 L20 28" ${S(2.4)}/>`);
  a += X.backpack(560, 600, 0.95, P.red) + X.backpack(860, 600, 0.95, P.yellow);
  const ro = person('rohan', { x: 580, y: 760, scale: 1.45, pose: 'pointUp', point: true, expr: 'talk' });
  a += X.shadow(580, 760, 80) + ro.svg;
  const ar = person('aarav', { x: 860, y: 765, scale: 1.45, pose: 'down', expr: 'happy', look: -1 });
  a += X.shadow(860, 765, 80) + ar.svg;
  a += X.birds(440, 160, 1);
  const over = bubble(130, 40, ['I wake up early, do the hard', 'things first, and then I play!'], { tail: [ro.mouth[0] - 10, ro.top[1] - 6], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 13 – GOOD HABITS VS BAD HABITS ----------------
function p13() {
  const h = 620;
  let a = `<rect width="${W / 2}" height="${h}" fill="url(#skyG)"/><rect x="${W / 2}" width="${W / 2}" height="${h}" fill="#b9bfcc"/>`;
  a += X.sun(160, 100, 52) + X.cloud(1180, 90, 1, { fill: '#8f96a6' }) + X.cloud(1350, 160, 0.8, { fill: '#9aa1b0' });
  for (let i = 0; i < 8; i++) a += `<path d="M${1120 + i * 40} ${180 + (i % 2) * 20} l-10 30" stroke="${P.skyDeep}" stroke-width="4" stroke-linecap="round"/>`;
  a += `<path d="M0 420 Q370 380 740 430 L740 ${h} L0 ${h}Z" fill="${P.leaf}" ${S()}/><path d="M740 430 Q1110 380 1480 420 L1480 ${h} L740 ${h}Z" fill="#8a9a7a" ${S()}/>`;
  a += `<path d="M640 ${h} Q700 520 740 460 Q780 520 840 ${h}Z" fill="${P.creamDeep}" ${S()}/><path d="M740 460 Q560 440 340 470 L330 500 Q560 470 720 500Z" fill="${P.creamDeep}" ${S()}/><path d="M740 460 Q920 440 1140 470 L1150 500 Q920 470 760 500Z" fill="#cfc6b4" ${S()}/>`;
  // good side icons
  a += X.icon('book', 130, 390, 0.9) + X.icon('apple', 300, 370, 0.9) + X.icon('run', 470, 380, 1.1) + X.icon('piggyI', 180, 520, 1.0) + X.flower(420, 560, 0.9, P.pink);
  // slow-down side icons
  a += X.at(1030, 370, 1, `<rect x="-70" y="-110" width="140" height="96" rx="10" fill="#4a4f63" ${S()}/><rect x="-58" y="-100" width="116" height="74" rx="4" fill="#8fe0ff"/><path d="M-20 -14 L-30 6 M20 -14 L30 6" ${S(5)}/>`);
  a += X.icon('sweets', 1210, 360, 0.9) + X.icon('moon', 1370, 380, 0.8) + X.icon('controller', 1290, 540, 0.9);
  // signpost
  a += `<rect x="732" y="110" width="16" height="370" fill="${P.wood}" ${S()}/>`;
  a += `<path d="M736 130 L470 130 L430 165 L470 200 L736 200Z" fill="${P.green}" ${S()}/>` + txt(590, 180, 'GOOD HABITS', 38, { fill: '#fff' });
  a += `<path d="M744 210 L1010 210 L1050 245 L1010 280 L744 280Z" fill="#7d8494" ${S()}/>` + txt(890, 260, 'BAD HABITS', 38, { fill: '#fff' });
  const ar = person('aarav', { x: 740, y: 600, scale: 1.0, pose: 'think', expr: 'think' });
  a += ar.svg;
  return { w: W, h, art: a, over: '' };
}

// ---------------- PAGE 14 – WHY READING BOOKS MATTERS ----------------
function p14() {
  let a = X.outdoor(W, H, { groundY: 560, sun: false });
  a += X.tree(330, 720, 1.75, { seed: 14 });
  const ar = person('aarav', { x: 380, y: 760, scale: 1.4, sit: 'cross', pose: 'write', expr: 'joy', look: 1 });
  a += ar.svg + X.openBook(380, Math.max(ar.hands.l[1], ar.hands.r[1]) + 36, 0.62, P.blue);
  // imagination swirl
  a += `<path d="M450 520 C620 420 560 260 760 230 S1080 330 1200 160" fill="none" stroke="${P.yellow}" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round"/>`;
  a += X.at(1220, 150, 1, `<path d="M0 -90 Q40 -40 30 40 L-30 40 Q-40 -40 0 -90Z" fill="${P.white}" ${S()}/><circle cx="0" cy="-20" r="16" fill="${P.skyDeep}" ${S()}/><path d="M-30 20 L-56 56 L-30 46Z M30 20 L56 56 L30 46Z" fill="${P.red}" ${S()}/><path d="M-20 44 Q0 100 20 44Z" fill="${P.orange}" ${S()}/>`, false, 30);
  a += X.at(980, 360, 1, `<circle r="60" fill="${P.purpleLight}" ${S()}/><ellipse rx="100" ry="22" fill="none" stroke="${P.ink}" stroke-width="9" transform="rotate(-18)"/><ellipse rx="100" ry="22" fill="none" stroke="${P.yellow}" stroke-width="5" transform="rotate(-18)"/><circle cx="-20" cy="-20" r="12" fill="#fff" opacity=".35"/>`);
  a += X.at(1300, 520, 1.1, `<rect x="-80" y="-70" width="160" height="90" fill="${P.pinkPale}" ${S()}/><rect x="-100" y="-130" width="50" height="150" fill="${P.pink}" ${S()}/><rect x="50" y="-130" width="50" height="150" fill="${P.pink}" ${S()}/><path d="M-110 -130 L-75 -180 L-40 -130Z M40 -130 L75 -180 L110 -130Z" fill="${P.blue}" ${S()}/><path d="M-22 20 L-22 -20 Q0 -44 22 -20 L22 20Z" fill="${P.brownDark}" ${S()}/><path d="M75 -180 L75 -220 L105 -208 L75 -196" fill="${P.red}" ${S(2.4)}/>`);
  a += X.icon('bulb', 700, 300, 0.9) + X.icon('star', 860, 140, 0.8) + X.sparkle(600, 180, 16) + X.sparkle(1120, 260, 12);
  const over = bubble(780, 600, ['Books are like a teacher', 'you can carry anywhere!'], { tail: [ar.mouth[0] + 60, ar.mouth[1] + 10], size: 36 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 15 – SETTING SMART GOALS ----------------
function p15() {
  let a = X.room(W, H, { wall: '#fdeccb', floorY: 640 });
  // goal poster
  a += `<rect x="620" y="40" width="560" height="470" rx="12" fill="${P.white}" ${S()}/><rect x="606" y="30" width="30" height="40" fill="${P.yellow}" opacity=".85" transform="rotate(-25 620 50)"/><rect x="1166" y="30" width="30" height="40" fill="${P.yellow}" opacity=".85" transform="rotate(25 1180 50)"/>`;
  a += txt(900, 110, 'MY GOAL', 56, { fill: P.coral });
  const rows = [['A red bicycle', P.ink], ['Cost: ₹5,000', P.ink], ['I have: ₹1,000', P.ink], ['I need: ₹4,000 more', P.ink], ['I will save ₹400 every month', P.green], ['Time: 10 months', P.blueDark]];
  rows.forEach(([t, c], i) => { a += pen(650, 170 + i * 52, '★ ' + t, 31, { fill: c }); });
  a += X.bicycle(1090, 230, 0.36, P.red);
  // savings thermometer
  a += `<rect x="1230" y="70" width="70" height="420" rx="35" fill="${P.white}" ${S()}/>`;
  for (let i = 0; i < 10; i++) a += `<rect x="1242" y="${84 + i * 39}" width="46" height="32" rx="8" fill="${i >= 8 ? P.green : '#eef3e6'}" ${S(2.2)}/>`;
  a += txt(1265, 530, '10 steps', 28) + X.coin(1265, 40, 22);
  a += X.windowFrame(90, 80, 240, 220, { curtain: P.coral });
  // desk scene
  const ar = person('aarav', { x: 460, y: 760, scale: 1.45, pose: 'write', expr: 'determined', legs: false });
  a += chairBack(460, 800, 1.2, P.blue) + ar.svg;
  a += X.table(560, 800, 640, 170, P.wood, { front: '#c08a57' });
  a += `<rect x="420" y="614" width="200" height="16" rx="4" fill="${P.white}" ${S(2.6)}/>` + X.icon('pencil', 600, 620, 0.6) + X.piggy(780, 572, 0.55) + X.icon('bulb', 470, 300, 0.7);
  const over = bubble(40, 300, ['Now I have a plan!'], { tail: [ar.mouth[0] - 50, ar.mouth[1] - 10], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 16 – LEARNING TIME MANAGEMENT ----------------
function p16() {
  const h = 640;
  let a = X.room(W, h, { wall: '#e2f0fb', floorY: 520 });
  a += X.windowFrame(1180, 70, 230, 210, { curtain: P.yellow });
  // planner board with icon rows and ticks
  a += `<rect x="520" y="40" width="580" height="420" rx="14" fill="${P.wood}" ${S()}/><rect x="540" y="60" width="540" height="380" rx="8" fill="${P.white}" ${S(2.6)}/>`;
  a += txt(810, 116, 'MY DAY', 50, { fill: P.blueDark });
  const items = [['sun', 'Morning', true], ['book', 'Homework', true], ['run', 'Play', false], ['moon', 'Sleep', false]];
  items.forEach(([ic, l, done], i) => {
    const y = 160 + i * 72;
    a += `<rect x="580" y="${y}" width="44" height="44" rx="8" fill="#fff" ${S(2.6)}/>` + (done ? tick(602, y + 24, 1.1) : '') + X.icon(ic, 680, y + 54, 0.45) + pen(730, y + 34, l, 34);
  });
  a += X.clock(330, 160, 80, 4, 0);
  a += X.table(330, 600, 300, 160, P.wood) + X.clock(330, 400, 44, 6, 30, { alarm: true });
  const ar = person('aarav', { x: 1000, y: 610, scale: 1.3, pose: 'pointUp', point: true, expr: 'joy', flip: true });
  a += X.shadow(1000, 610, 70) + ar.svg;
  const over = bubble(1090, 300, ['When I plan my time,', 'I have time to play too!'], { tail: [ar.mouth[0] + 20, ar.mouth[1]], size: 32 });
  return { w: W, h, art: a, over };
}

// ---------------- PAGE 17 – BECOMING A GOOD LEADER ----------------
function p17() {
  let a = X.room(W, H, { wall: '#f6e7c8', floorY: 600 });
  a += `<rect x="300" y="50" width="760" height="330" rx="10" fill="#2f6a52" ${S()}/><rect x="300" y="50" width="760" height="330" rx="10" fill="none" stroke="${P.wood}" stroke-width="16"/><rect x="300" y="50" width="760" height="330" rx="10" fill="none" ${S()}/>`;
  a += chalk(680, 140, 'Science Fair Project', 60) + chalk(680, 210, 'Team: Aarav, Meera,', 44) + chalk(680, 262, 'Kabir and Rohan', 44) + `<path d="M420 300 Q680 330 940 300" stroke="#fdfbf2" stroke-width="4" fill="none" opacity=".7"/>`;
  a += X.windowFrame(1170, 80, 220, 220, { tree: true });
  const r = person('rao', { x: 170, y: 760, scale: 1.12, pose: 'hips', expr: 'happy' });
  a += X.shadow(170, 760, 70) + r.svg;
  // seated classmates
  const desk = (x) => X.table(x, 790, 250, 150, P.woodLight, { front: P.wood });
  const me = person('meera', { x: 900, y: 820, scale: 1.28, pose: 'waveL', expr: 'talk', legs: false });
  const ka = person('kabir', { x: 1110, y: 820, scale: 1.28, pose: 'down', expr: 'happy', legs: false });
  const ro = person('rohan', { x: 1320, y: 820, scale: 1.28, pose: 'wave', expr: 'joy', legs: false });
  a += me.svg + desk(900) + ka.svg + desk(1110) + ro.svg + desk(1320);
  const ar = person('aarav', { x: 560, y: 770, scale: 1.45, pose: 'hold', expr: 'happy', look: 1 });
  a += X.shadow(560, 770, 80) + ar.svg + X.at(ar.hands.l[0] + 10, ar.hands.l[1] + 10, 1, `<rect x="-40" y="-56" width="80" height="100" rx="6" fill="${P.white}" ${S()}/><rect x="-14" y="-64" width="28" height="14" rx="4" fill="${P.grey}" ${S(2)}/><path d="M-26 -30 h52 M-26 -10 h52 M-26 10 h40" stroke="${P.grey}" stroke-width="4"/>`);
  const over = bubble(640, 290, ['What ideas do', 'you all have?'], { tail: [ar.mouth[0] + 30, ar.top[1] + 20], size: 36 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 18 – THE POWER OF TEAMWORK ----------------
function p18() {
  let a = X.room(W, H, { wall: '#e4f2dc', floorY: 590 });
  a += X.pictureFrame(220, 160, 180, 130, X.icon('bulb', 0, 50, 0.6), P.yellow) + X.pictureFrame(1260, 150, 180, 130, X.icon('chart', 0, 44, 0.7), P.coral);
  const me = person('meera', { x: 360, y: 780, scale: 1.35, pose: 'hold', expr: 'happy', look: 1 });
  const ro = person('rohan', { x: 640, y: 770, scale: 1.35, pose: 'holdHigh', expr: 'determined' });
  const ka = person('kabir', { x: 920, y: 780, scale: 1.35, pose: 'hold', expr: 'joy', look: -1, flip: true });
  const ar = person('aarav', { x: 1200, y: 780, scale: 1.35, pose: 'hold', expr: 'happy', look: -1, flip: true });
  a += me.svg + ro.svg + ka.svg + ar.svg;
  // table + model village
  a += X.table(760, 800, 1000, 200, P.wood, { front: '#c08a57' });
  const house = (x, col, roof) => X.at(x, 594, 1, `<rect x="-38" y="-50" width="76" height="50" fill="${col}" ${S()}/><path d="M-48 -50 L0 -88 L48 -50Z" fill="${roof}" ${S()}/><rect x="-10" y="-30" width="20" height="30" fill="${P.yellowSoft}" ${S(2)}/>`);
  a += `<rect x="330" y="580" width="860" height="22" rx="6" fill="${P.leafLight}" ${S()}/>`;
  a += house(430, P.blueLight, P.blue) + house(560, '#f5b0a0', P.red) + house(980, P.blueLight, P.red) + house(1100, '#f5b0a0', P.blue);
  // turbine
  a += `<path d="M760 590 L750 300 L770 300 Z" fill="#eef1f2" ${S()}/>`;
  [0, 120, 240].forEach((r) => { a += `<path d="M760 300 Q770 230 760 170 Q748 230 760 300Z" fill="#fff" ${S(2.6)} transform="rotate(${r + 20} 760 300)"/>`; });
  a += `<circle cx="760" cy="300" r="12" fill="${P.grey}" ${S()}/>`;
  a += `<path d="M770 570 Q830 560 870 578" fill="none" stroke="${P.red}" stroke-width="4"/>` + X.at(880, 582, 0.45, X.icons.bulb()) + X.sparkle(920, 520, 14) + X.sparkle(840, 520, 10);
  a += X.at(ar.hands.r[0] - 10, ar.hands.r[1], 1, `<rect x="-36" y="-50" width="72" height="90" rx="6" fill="${P.white}" ${S()}/><path d="M-24 -26 h10 M-24 -4 h10 M-24 18 h10" stroke="${P.green}" stroke-width="6"/><path d="M-8 -26 h30 M-8 -4 h30 M-8 18 h24" stroke="${P.grey}" stroke-width="4"/>`);
  a += X.at(me.hands.r[0] + 10, me.hands.r[1] - 10, 1, `<path d="M0 0 L30 -40" ${S(6)}/><path d="M30 -40 l8 -14 l6 4 l-6 14z" fill="${P.blue}" ${S(2)}/>`);
  const over = bubble(940, 40, ['Look! The bulb', 'is glowing!'], { tail: [ka.mouth[0] + 10, ka.top[1] - 6], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 19 – LEARNING TO COMMUNICATE ----------------
function p19() {
  const h = 660;
  let a = X.room(W, h, { wall: '#fde4d6', floorY: 470 });
  a += X.windowFrame(620, 60, 240, 210, { curtain: P.teal });
  a += X.rug(740, 580, 1400, 140, P.yellow);
  const me = person('meera', { x: 250, y: 610, scale: 1.3, sit: 'cross', pose: 'holdHigh', expr: 'talk' });
  const ka = person('kabir', { x: 1230, y: 610, scale: 1.3, sit: 'cross', pose: 'holdHigh', expr: 'talk', flip: true });
  const ar = person('aarav', { x: 740, y: 615, scale: 1.35, sit: 'cross', pose: 'shrug', expr: 'happy' });
  const ro = person('rohan', { x: 990, y: 612, scale: 1.25, sit: 'cross', pose: 'hold', expr: 'happy', look: -1 });
  const an = person('anya', { x: 490, y: 612, scale: 1.25, sit: 'cross', pose: 'hold', expr: 'happy', look: 1 });
  a += me.svg + an.svg + ar.svg + ro.svg + ka.svg;
  const house = (x, y, col, roof) => X.at(x, y, 0.9, `<rect x="-38" y="-50" width="76" height="50" fill="${col}" ${S()}/><path d="M-48 -50 L0 -88 L48 -50Z" fill="${roof}" ${S()}/><rect x="-10" y="-30" width="20" height="30" fill="${P.yellowSoft}" ${S(2)}/>`);
  a += house(me.hands.r[0] + 10, me.hands.r[1] + 4, P.blueLight, P.blue) + house(ka.hands.l[0] - 10, ka.hands.l[1] + 4, '#f5b0a0', P.red);
  const over = bubble(20, 30, ['Blue houses!'], { tail: [me.mouth[0], me.top[1] - 4], size: 36 }) + bubble(1230, 30, ['Red houses!'], { tail: [ka.mouth[0], ka.top[1] - 4], size: 36 }) +
    bubble(520, 40, ["Let’s take turns and", 'find an idea we all like!'], { tail: [ar.mouth[0] + 10, ar.top[1] - 6], size: 32 });
  return { w: W, h, art: a, over };
}

// ---------------- PAGE 20 – FACING FAILURE ----------------
function p20() {
  let a = X.room(W, H, { wall: '#e9e1f5', floorY: 600, floor: '#cdb38f' });
  a += bunting(W, 30);
  a += `<rect x="780" y="300" width="640" height="300" fill="#b48a5c" ${S()}/><rect x="760" y="290" width="680" height="24" rx="6" fill="${P.wood}" ${S()}/>`;
  a += X.sign(330, 150, 420, 80, 'SCIENCE FAIR', { fill: P.coral, size: 50, col: '#fff', ls: 3 });
  // winning team on the stage (background, smaller)
  a += fig('zara', { x: 960, y: 290, scale: 0.95, pose: 'cheer', expr: 'joy' }) + fig('dev', { x: 1220, y: 290, scale: 0.95, pose: 'cheer', expr: 'joy' });
  a += X.trophy(1090, 230, 0.75) + X.sparkle(1050, 100, 14) + X.sparkle(1160, 90, 12);
  // our team (foreground)
  a += X.table(330, 700, 300, 130, P.woodLight);
  a += `<path d="M330 570 L322 400 L338 400Z" fill="#eef1f2" ${S()}/>` + [0, 120, 240].map((r) => `<path d="M330 400 Q338 350 330 310 Q322 350 330 400Z" fill="#fff" ${S(2.4)} transform="rotate(${r + 50} 330 400)"/>`).join('') + `<circle cx="330" cy="400" r="9" fill="${P.grey}" ${S()}/>`;
  a += fig('meera', { x: 150, y: 770, scale: 1.3, pose: 'think', expr: 'sad' });
  a += fig('kabir', { x: 540, y: 775, scale: 1.3, pose: 'sad', expr: 'sad', flip: true });
  const ar = person('aarav', { x: 760, y: 785, scale: 1.4, pose: 'sad', expr: 'sad' });
  a += ar.svg;
  a += fig('rohan', { x: 950, y: 785, scale: 1.32, pose: 'sad', expr: 'worried', look: -1 });
  const over = bubble(40, 250, ['We worked so hard...', 'and we still lost.'], { tail: [ar.mouth[0] - 40, ar.top[1] - 4], size: 36 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 21 – TURNING MISTAKES INTO LESSONS ----------------
function p21() {
  let a = X.room(W, H, { wall: '#f6e7c8', floorY: 600 });
  a += `<rect x="440" y="40" width="980" height="420" rx="10" fill="${P.white}" ${S()}/><rect x="440" y="40" width="980" height="420" rx="10" fill="none" stroke="${P.grey}" stroke-width="12"/><rect x="440" y="40" width="980" height="420" rx="10" fill="none" ${S()}/>`;
  a += `<path d="M930 70 L930 430" stroke="${P.grey}" stroke-width="4"/>`;
  a += pen(685, 110, 'What went well', 42, { anchor: 'middle', fill: P.green, font: 'Baloo 2' }) + pen(1175, 110, 'Next time we will...', 42, { anchor: 'middle', fill: P.blueDark, font: 'Baloo 2' });
  [['Great teamwork', 180], ['Our bulb lit up', 250], ['We never gave up', 320]].forEach(([t, y]) => { a += tick(500, y - 10, 1) + pen(530, y, t, 36, { weight: 400, font: 'Patrick Hand' }); });
  [['Practise our talk', 180], ['Start earlier', 250], ['Explain our idea clearly', 320]].forEach(([t, y]) => { a += X.at(990, y - 12, 0.4, X.icons.star()) + pen(1020, y, t, 36, { weight: 400, font: 'Patrick Hand' }); });
  a += `<rect x="1300" y="460" width="90" height="16" rx="4" fill="${P.blue}" ${S(2)}/>`;
  const r = person('rao', { x: 300, y: 760, scale: 1.14, pose: 'pointUp', point: true, expr: 'talk', look: 1 });
  a += X.shadow(300, 760, 70) + r.svg;
  a += fig('meera', { x: 640, y: 800, scale: 1.28, pose: 'down', expr: 'happy', look: 1 }) + fig('kabir', { x: 1250, y: 800, scale: 1.28, pose: 'hold', expr: 'happy', look: -1 });
  const ar = person('aarav', { x: 840, y: 800, scale: 1.38, pose: 'hips', expr: 'determined' });
  a += ar.svg + fig('rohan', { x: 1050, y: 800, scale: 1.32, pose: 'down', expr: 'happy', look: -1 });
  const over = bubble(20, 50, ['Failure is not the', 'opposite of success.', "It’s part of it."], { tail: [r.mouth[0] - 10, r.top[1] - 6], size: 34 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 22 – HELPING SOMEONE IN NEED ----------------
function p22() {
  let a = X.outdoor(W, H, { groundY: 600, sunX: 1340, hills: false });
  a += `<rect x="820" y="160" width="660" height="450" fill="#f3d39a" ${S()}/><path d="M800 170 L1150 40 L1500 170Z" fill="${P.red}" ${S()}/>`;
  for (let i = 0; i < 3; i++) a += `<rect x="${880 + i * 190}" y="260" width="120" height="110" rx="6" fill="${P.skyPale}" ${S()}/><path d="M${940 + i * 190} 260 v110 M${880 + i * 190} 315 h120" stroke="${P.white}" stroke-width="6"/>`;
  a += X.sign(1150, 140, 260, 64, 'SCHOOL', { fill: P.white, size: 44, ls: 4 });
  a += `<rect x="1060" y="420" width="180" height="190" rx="6" fill="${P.brown}" ${S()}/>`;
  a += X.tree(130, 640, 1.2, { seed: 22 }) + X.bush(700, 620, 0.9, P.green, P.yellow);
  a += `<path d="M0 700 L${W} 700" stroke="${P.creamDeep}" stroke-width="80" opacity=".9"/>`;
  const ar = person('aarav', { x: 470, y: 770, scale: 1.45, pose: 'give', expr: 'happy' });
  const is = person('ishaan', { x: 800, y: 772, scale: 1.43, pose: 'give', expr: 'joy', flip: true });
  a += X.shadow(470, 770, 80) + X.shadow(800, 772, 80) + X.backpack(820, 600, 0.9, P.grey) + ar.svg + is.svg;
  const mx = (ar.hands.r[0] + is.hands.l[0]) / 2;
  a += X.at(mx, ar.hands.r[1] + 6, 1, `<rect x="-70" y="-26" width="140" height="26" rx="4" fill="${P.green}" ${S()}/><rect x="-64" y="-50" width="128" height="24" rx="4" fill="${P.coral}" ${S()}/><rect x="-60" y="-72" width="120" height="22" rx="4" fill="${P.blue}" ${S()}/><path d="M50 -72 v68" stroke="#fff" stroke-width="5" opacity=".6"/>`);
  a += X.heart(mx, ar.hands.r[1] - 300, 1.2) + X.heart(mx - 70, ar.hands.r[1] - 340, 0.8, P.pink);
  const over = bubble(900, 300, ['Thank you, Aarav!', "You’re a true friend."], { tail: [is.mouth[0] + 30, is.top[1] + 10], size: 36 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 23 – A LITTLE BUSINESS ----------------
function p23() {
  let a = X.outdoor(W, H, { groundY: 560, sun: false });
  a += bunting(W, 20);
  a += X.tree(1380, 620, 1.0, { seed: 23 });
  // stall
  a += `<path d="M260 160 L1020 160 L990 230 L290 230Z" fill="${P.coral}" ${S()}/>` + [0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${290 + i * 100} 230 Q${340 + i * 100} 262 ${390 + i * 100} 230" fill="${i % 2 ? P.white : P.coral}" ${S(2.6)}/>`).join('');
  a += `<path d="M300 230 L300 600 M980 230 L980 600" ${S(12)}/>`;
  const ar = person('aarav', { x: 500, y: 720, scale: 1.4, pose: 'presentR', expr: 'joy', legs: false });
  const an = person('anya', { x: 790, y: 700, scale: 1.4, pose: 'wave', expr: 'joy', legs: false });
  a += ar.svg + an.svg;
  a += `<rect x="260" y="560" width="760" height="40" rx="6" fill="${P.wood}" ${S()}/><path d="M270 600 L1010 600 L1000 790 L280 790Z" fill="${P.yellowSoft}" ${S()}/>`;
  for (let i = 0; i < 6; i++) a += `<path d="M${300 + i * 120} 600 L${300 + i * 120} 790" stroke="${P.yellow}" stroke-width="30" opacity=".6"/>`;
  a += X.at(640, 700, 1, `<rect x="-230" y="-60" width="460" height="120" rx="12" fill="${P.white}" ${S()}/>` + txt(0, -12, 'Handmade Bookmarks', 42, { fill: P.coral }) + txt(0, 38, '₹10 each', 40, { fill: P.green }));
  const cols = [P.blue, P.pink, P.green, P.yellow, P.purple, P.coral];
  cols.forEach((c, i) => { a += X.bookmark(340 + i * 120, 556, 0.55, c, i % 4, (i % 2 ? 6 : -6)); });
  const mu = person('mum', { x: 1150, y: 780, scale: 1.08, pose: 'hold', expr: 'happy', flip: true });
  a += X.shadow(1150, 780, 70) + mu.svg + X.at(mu.hands.l[0] + 10, mu.hands.l[1] + 6, 1, `<rect x="-44" y="-56" width="88" height="70" rx="6" fill="${P.white}" ${S()}/><path d="M-30 -36 h60 M-30 -18 h60 M-30 0 h40" stroke="${P.grey}" stroke-width="4"/>`);
  const ka = person('kabir', { x: 130, y: 780, scale: 1.3, pose: 'giveR', expr: 'happy' });
  a += X.shadow(130, 780, 70) + ka.svg + X.coin(ka.hands.r[0] + 8, ka.hands.r[1] - 10, 18);
  const over = bubble(620, 268, ['Bookmarks! Only', '₹10 each!'], { tail: [an.mouth[0] + 40, an.mouth[1] - 10], size: 34 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 24 – MAKING A SMART DECISION ----------------
function p24() {
  let a = X.room(W, H, { wall: '#e6ecf9', floorY: 620 });
  a += X.windowFrame(90, 80, 220, 220, { curtain: P.blue });
  a += X.table(900, 790, 1000, 230, P.wood, { front: '#c08a57' });
  const tag = (x, t) => X.sign(x, 590, 170, 50, t, { fill: P.white, size: 34 });
  a += X.jar(640, 560, 1.15, 'SAVE', P.green, 9) + tag(640, '₹140');
  a += X.jar(900, 560, 1.15, 'SPEND', P.blue, 3, { fs: 32 }) + tag(900, '₹40');
  a += X.jar(1160, 560, 1.15, 'SHARE', P.pinkDeep, 2, { heart: true, fs: 32 }) + tag(1160, '₹20');
  const ar = person('aarav', { x: 300, y: 790, scale: 1.45, pose: 'pointUp', expr: 'determined', look: 1 });
  a += X.shadow(300, 790, 80) + ar.svg + X.coin(ar.hands.r[0] + 6, ar.hands.r[1] - 24, 20);
  // thought cloud: game crossed out, bicycle ticked
  a += `<g>${[[860, 150, 220, 100], [700, 170, 110, 80], [1030, 170, 120, 80], [860, 220, 210, 70]].map(([x, y, rx, ry]) => ell(x, y, rx, ry, P.white, 3)).join('')}<rect x="660" y="100" width="420" height="160" rx="70" fill="${P.white}"/></g>`;
  a += X.gameConsole(740, 170, 0.8) + cross(740, 170, 2.0) + X.bicycle(970, 235, 0.42, P.red) + tick(1060, 120, 1.5);
  a += ell(560, 290, 18, 14, P.white, 3) + ell(500, 320, 11, 9, P.white, 3);
  return { w: W, h: H, art: a, over: bubble(20, 236, ['My bicycle is my big goal.', 'The game can wait!'], { tail: [ar.mouth[0] - 30, ar.top[1] + 30], size: 34 }) };
}

// ---------------- PAGE 25 – THE DREAM COMES TRUE ----------------
function p25() {
  let a = X.outdoor(W, H, { groundY: 600, sunX: 140, sunY: 110 });
  a += `<rect x="840" y="120" width="640" height="490" fill="#f3d39a" ${S()}/>`;
  for (let i = 0; i < 7; i++) a += `<path d="M${860 + i * 90} 210 L${950 + i * 90} 210 L${950 + i * 90} 260 Q${905 + i * 90} 284 ${860 + i * 90} 260Z" fill="${i % 2 ? P.white : P.red}" ${S()}/>`;
  a += X.sign(1160, 160, 380, 70, 'CITY CYCLES', { fill: P.yellow, size: 46, ls: 3 });
  a += `<rect x="900" y="300" width="520" height="300" rx="8" fill="#cfeaf5" ${S()}/><rect x="900" y="300" width="520" height="300" rx="8" fill="url(#glass)"/>`;
  a += confetti(W, 420, 46, 25);
  a += X.bicycle(560, 770, 1.45, P.red, { shine: true });
  const ar = person('aarav', { x: 820, y: 790, scale: 1.5, pose: 'cheer', expr: 'joy' });
  a += X.shadow(820, 790, 90) + ar.svg + X.helmet(ar.top[0], ar.top[1] + 36, 1.32);
  a += fig('dad', { x: 1090, y: 780, scale: 1.12, pose: 'cheer', expr: 'joy' }) + fig('mum', { x: 1260, y: 780, scale: 1.1, pose: 'cheer', expr: 'joy' });
  const an = person('anya', { x: 200, y: 790, scale: 1.4, pose: 'cheer', expr: 'joy' });
  a += X.shadow(200, 790, 70) + an.svg;
  const over = bubble(300, 30, ['I did it!', 'I really did it!'], { tail: [ar.mouth[0] - 40, ar.top[1] - 10], size: 42 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 26 – 10 GOLDEN LIFE LESSONS ----------------
function p26() {
  const h = 480;
  let a = `<rect width="${W}" height="${h}" fill="url(#skyG)"/>` + confetti(W, 260, 30, 26) + X.cloud(160, 90, 0.8, { line: false }) + X.cloud(1320, 80, 0.8, { line: false });
  a += X.hills(W, 380, [P.greenPale, P.leafLight]);
  a += X.bookStack(740, 470, [P.red, P.blue, P.green, P.yellow, P.coral], 1.6);
  const ar = person('aarav', { x: 660, y: 330, scale: 0.95, pose: 'cheer', expr: 'joy' });
  const an = person('anya', { x: 830, y: 330, scale: 0.95, pose: 'cheer', expr: 'joy' });
  a += ar.svg + an.svg + X.at(745, 70, 1.2, X.icons.star()) + X.sparkle(640, 50, 14) + X.sparkle(860, 40, 12);
  a += X.trophy(260, 460, 1.1) + X.piggy(1190, 430, 0.75, { heart: true }) + X.coinStack(1340, 470, 6, 30) + X.coinStack(420, 470, 4, 26);
  return { w: W, h, art: a, over: '' };
}

// ---------------- PAGE 27 – ACTIVITIES & CHALLENGES ----------------
function p27() {
  const h = 420;
  let a = `<rect width="${W}" height="${h}" fill="#fdeccb"/>` + X.windowFrame(90, 40, 200, 170, { curtain: P.coral });
  const ar = person('aarav', { x: 600, y: 470, scale: 1.0, pose: 'write', expr: 'happy', legs: false });
  const an = person('anya', { x: 880, y: 470, scale: 1.0, pose: 'write', expr: 'joy', legs: false });
  a += ar.svg + an.svg + X.table(740, 440, 1300, 110, P.wood);
  a += `<rect x="520" y="316" width="190" height="12" rx="3" fill="${P.white}" ${S(2.4)}/><rect x="790" y="316" width="190" height="12" rx="3" fill="${P.white}" ${S(2.4)}/>`;
  a += X.icon('pencil', 330, 316, 0.9) + X.icon('scissors', 1260, 324, 0.8) + X.icon('star', 1200, 120, 0.8) + X.icon('heart', 1380, 140, 0.8) + X.jar(1100, 324, 0.55, '', P.green, 3) + X.piggy(420, 290, 0.45);
  return { w: W, h, art: a, over: '' };
}

// ---------------- PAGE 28 – PARENT-CHILD DISCUSSION ----------------
function p28() {
  const h = 520;
  let a = `<rect width="${W}" height="${h}" fill="url(#sunsetG)"/>` + X.sun(1120, 330, 80) + X.hills(W, 360, ['#bfe0a0', P.leafLight]);
  a += X.grassGround(W, 430, 120, P.leaf) + X.tree(140, 470, 1.15, { seed: 28 }) + X.birds(900, 140, 1);
  a += `<rect x="350" y="236" width="780" height="26" rx="8" fill="${P.wood}" ${S()}/><rect x="350" y="276" width="780" height="26" rx="8" fill="${P.wood}" ${S()}/><path d="M380 300 v170 M1100 300 v170" ${S(12)}/><rect x="340" y="352" width="800" height="24" rx="8" fill="${P.woodLight}" ${S()}/>`;
  a += fig('dad', { x: 470, y: 470, scale: 0.86, sit: 'chair', pose: 'down', expr: 'talk', look: 1 });
  a += fig('aarav', { x: 640, y: 470, scale: 1.1, sit: 'chair', pose: 'down', expr: 'happy', look: -1 });
  a += fig('anya', { x: 800, y: 470, scale: 1.06, sit: 'chair', pose: 'hold', expr: 'joy', look: 1 });
  a += fig('mum', { x: 980, y: 470, scale: 0.84, sit: 'chair', pose: 'down', expr: 'happy', look: -1 });
  a += X.flower(1300, 500, 0.9, P.pink) + X.flower(1360, 510, 0.8, P.yellow) + X.bush(1300, 460, 0.8, P.green, P.coral);
  return { w: W, h, art: a, over: '' };
}

// ---------------- BACK COVER ART ----------------
function back() {
  const w = 1100, h = 620;
  let a = `<rect width="${w}" height="${h}" fill="url(#skyG)"/>` + X.cloud(170, 90, 0.8, { line: false }) + X.sun(960, 100, 46);
  a += X.hills(w, 380, [P.greenPale, P.leafLight]) + X.grassGround(w, 470, 200, P.leaf);
  a += X.jar(400, 560, 0.9, 'SAVE', P.green, 7) + X.jar(560, 560, 0.9, 'SPEND', P.blue, 4, { fs: 30 }) + X.jar(720, 560, 0.9, 'SHARE', P.pinkDeep, 3, { heart: true, fs: 30 });
  a += fig('aarav', { x: 210, y: 600, scale: 1.1, pose: 'wave', expr: 'joy' }) + fig('anya', { x: 900, y: 600, scale: 1.1, pose: 'waveL', expr: 'joy' });
  a += X.coin(330, 580, 18) + X.coin(800, 590, 16) + X.flower(60, 610, 0.8, P.pink) + X.flower(1040, 610, 0.8, P.yellow);
  return { w, h, art: a, over: '' };
}

// ---------------- WORKSHEET SPOT ART ----------------
const spot = (inner, bg = '#fff7e6', h = 300) => ({ w: W, h, art: `<rect width="${W}" height="${h}" fill="${bg}"/>` + inner, over: '' });
function w1() { return spot(X.piggy(300, 190, 0.85) + X.icon('target', 740, 250, 1.6) + X.bicycle(1150, 270, 0.7, P.red, { shine: true }) + X.coinStack(520, 280, 5, 28) + X.coinStack(960, 280, 3, 28)); }
function w2() { return spot(X.at(440, 0, 1, `<rect x="-200" y="40" width="400" height="200" rx="20" fill="${P.green}" ${S()}/>` + txt(0, 165, 'NEED', 90, { fill: '#fff' })) + X.at(1040, 0, 1, `<rect x="-200" y="40" width="400" height="200" rx="20" fill="${P.coral}" ${S()}/>` + txt(0, 165, 'WANT', 90, { fill: '#fff' })) + txt(740, 170, 'or', 70)); }
function w3() { return { w: W, h: 560, art: `<rect width="${W}" height="560" fill="#fff7e6"/>` + X.jar(330, 520, 2.0, 'SAVE', P.green, 0) + X.jar(740, 520, 2.0, 'SPEND', P.blue, 0, { fs: 32 }) + X.jar(1150, 520, 2.0, 'SHARE', P.pinkDeep, 0, { fs: 32 }), over: '' }; }
function w4() { return spot(X.sun(160, 150, 60) + fig('aarav', { x: 520, y: 290, scale: 0.85, pose: 'cheer', expr: 'joy' }) + X.icon('book', 760, 260, 1) + X.icon('apple', 920, 250, 1) + X.icon('run', 1080, 270, 1.2) + X.icon('moon', 1290, 230, 1)); }
function w5() { return spot(X.icon('sun', 200, 200, 1.4) + X.clock(740, 160, 110, 8, 0, { alarm: true }) + X.icon('moon', 1280, 210, 1.4) + X.icon('book', 460, 260, 1) + X.icon('run', 1020, 270, 1.2)); }
function w6() { return spot(X.icon('stall', 300, 260, 1.8) + [P.blue, P.pink, P.green, P.yellow, P.purple].map((c, i) => X.bookmark(620 + i * 90, 210, 0.9, c, i % 4, i % 2 ? 6 : -6)).join('') + X.coinStack(1150, 270, 5, 30) + X.coin(1260, 200, 26) + X.icon('pencil', 1360, 260, 1)); }

module.exports = { p08, p09, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, back, w1, w2, w3, w4, w5, w6 };
