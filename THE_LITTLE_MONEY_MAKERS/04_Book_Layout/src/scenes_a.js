// Scene compositions: cover art and pages 1–14.
// Each scene returns { w, h, art, over } where `art` gets the pencil texture and
// `over` (speech bubbles) stays crisp on top.
const { P, S, f, sh, ell, rect, path, line, txt, bubble, rng } = require('./lib');
const { person, fig } = require('./characters');
const X = require('./props');

const W = 1480, H = 800;

// ---------------- FRONT COVER ART (square with bleed; title is set in HTML) -------------
function cover() {
  const w = 1100, h = 1100;
  let a = `<rect width="${w}" height="${h}" fill="url(#skyG)"/>`;
  a += X.sun(115, 125, 50) + X.cloud(985, 120, 0.8, { line: false }) + X.birds(860, 470, 1);
  a += X.hills(w, 700, [P.greenPale, P.leafLight]);
  a += X.icon('house', 860, 690, 0.9);
  a += X.tree(90, 900, 1.25, { seed: 4, fruit: P.orange });
  a += X.grassGround(w, 820, 300, P.leaf);
  a += `<path d="M380 1110 Q520 900 640 830 L700 830 Q660 930 760 1110Z" fill="${P.creamDeep}" ${S()}/>`;
  a += X.bicycle(820, 960, 1.3, P.red, { shine: true });
  a += X.shadow(470, 985, 110, 16) + X.shadow(660, 990, 90, 14);
  const ar = person('aarav', { x: 470, y: 985, scale: 1.6, pose: 'cheer', expr: 'joy' });
  a += ar.svg;
  const an = person('anya', { x: 668, y: 992, scale: 1.55, pose: 'hold', expr: 'happy' });
  a += an.svg + X.piggy(668, 790, 0.62, { heart: true });
  a += X.bookStack(250, 1010, [P.blue, P.red, P.green], 1.0) + X.coinStack(330, 1030, 5, 24) + X.coinStack(380, 1040, 3, 24);
  a += X.coin(560, 1040, 24) + X.coin(870, 1030, 22) + X.coinStack(940, 1050, 4, 22);
  a += X.flower(150, 1060, 0.9, P.pink) + X.flower(1020, 1000, 0.8, P.yellow) + X.flower(60, 1050, 0.7, P.coral);
  return { w, h, art: a, over: '' };
}

// ---------------- PAGE 1 – TITLE PAGE (full-bleed, title in HTML) ----------------
function p01() {
  const w = 1100, h = 1100;
  let a = `<rect width="${w}" height="${h}" fill="url(#sunsetG)"/>`;
  a += X.sun(550, 640, 90) + X.cloud(200, 230, 1, { fill: '#fff6e8', line: false }) + X.cloud(880, 300, 0.9, { fill: '#fff6e8', line: false });
  a += X.hills(w, 720, ['#bfe0a0', P.leafLight]);
  a += X.grassGround(w, 800, 320, P.leaf);
  a += X.tree(960, 960, 1.35, { seed: 9, fruit: P.orange });
  a += X.bicycle(870, 990, 1.05, P.red);
  a += X.shadow(520, 1000, 260, 18);
  const ar1 = person('aarav', { x: 420, y: 1000, scale: 1.45, sit: 'cross', pose: 'write', expr: 'joy', look: 1 });
  a += ar1.svg + X.openBook(420, Math.max(ar1.hands.l[1], ar1.hands.r[1]) + 40, 0.62, P.green);
  a += fig('anya', { x: 640, y: 1004, scale: 1.4, sit: 'cross', pose: 'give', expr: 'joy' });
  a += X.piggy(560, 990, 0.7, { flip: true });
  a += X.coin(700, 1010, 22) + X.coinStack(240, 1040, 4, 24) + X.coin(300, 1060, 20);
  a += X.flower(120, 1070, 0.9, P.pink) + X.flower(190, 1090, 0.7, P.yellow) + X.flower(760, 1080, 0.8, P.coral);
  a += X.birds(300, 420, 1.1);
  return { w, h, art: a, over: '' };
}

// ---------------- PAGE 2 – MEET AARAV ----------------
function p02() {
  let a = X.room(W, H, { wall: '#f8e0ae', floorY: 600 });
  a += X.windowFrame(110, 120, 270, 250, { curtain: P.coral });
  a += X.pictureFrame(1080, 190, 200, 150, X.icon('family', 0, 50, 0.85), P.wood);
  a += X.pictureFrame(1290, 160, 110, 130, X.icon('sun', 0, 20, 0.7), P.coral);
  a += X.shelf(1200, 330, 320, X.bookStack(-70, 0, [P.blue, P.red, P.yellow], 0.75) + X.plantPot(80, 0, 0.5) + X.trophy(0, 0, 0.36));
  a += X.rug(760, 712, 1000, 120, P.teal);
  a += X.plantPot(1380, 690, 0.9);
  a += X.lamp(70, 700, 1);
  a += X.shadow(470, 728, 80) + X.shadow(660, 728, 70) + X.shadow(860, 742, 70) + X.shadow(1050, 738, 60);
  a += fig('dad', { x: 470, y: 728, scale: 1.0, pose: 'down', expr: 'happy' });
  a += fig('mum', { x: 1070, y: 730, scale: 1.0, pose: 'down', expr: 'happy' });
  const ar = person('aarav', { x: 690, y: 748, scale: 1.3, pose: 'wave', expr: 'joy' });
  a += ar.svg;
  const an = person('anya', { x: 885, y: 752, scale: 1.3, pose: 'hold', expr: 'joy' });
  a += an.svg;
  a += X.backpack(260, 720, 0.9, P.yellow);
  const over = bubble(470, 46, ["Hi! I’m Aarav. Want to", 'come on an adventure?'], { tail: [ar.mouth[0] - 10, ar.top[1] - 10], size: 40 }) +
    bubble(1110, 400, ['Me too!'], { tail: [an.mouth[0] + 30, an.top[1] + 20], size: 40 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 3 – THE DREAM BICYCLE ----------------
function p03() {
  let a = `<rect width="${W}" height="${H}" fill="url(#skyG)"/>` + X.cloud(140, 70, 0.8, { line: false }) + X.sun(80, 60, 40);
  // shop building
  a += `<rect x="300" y="40" width="1180" height="640" fill="#f3d39a" ${S()}/>`;
  for (let y = 60; y < 680; y += 34) a += `<path d="M300 ${y} L1480 ${y}" stroke="${P.brown}" stroke-width="1.6" opacity=".25"/>`;
  // awning
  let aw = '';
  for (let i = 0; i < 12; i++) aw += `<path d="M${380 + i * 90} 150 L${470 + i * 90} 150 L${470 + i * 90} 210 Q${425 + i * 90} 236 ${380 + i * 90} 210Z" fill="${i % 2 ? P.white : P.red}" ${S()}/>`;
  a += aw;
  a += X.sign(860, 100, 420, 84, 'CITY CYCLES', { fill: P.yellow, size: 52, ls: 4 });
  // window
  a += `<rect x="420" y="250" width="860" height="420" rx="10" fill="#cfeaf5" ${S()}/>`;
  a += `<rect x="440" y="560" width="820" height="110" fill="${P.creamDeep}" ${S()}/>`;
  a += X.bicycle(860, 600, 1.45, P.red, { shine: true });
  a += X.sign(1150, 360, 150, 92, '₹5,000', { fill: P.white, size: 40, rot: 8, inner: true });
  a += `<path d="M1110 320 L1150 300" stroke="${P.ink}" stroke-width="2"/>`;
  a += `<path d="M470 280 L560 280 L470 400Z M1180 640 L1250 520 L1250 640Z" fill="#fff" opacity=".45"/>`;
  a += `<rect x="420" y="250" width="860" height="420" rx="10" fill="url(#glass)"/><rect x="420" y="250" width="860" height="420" rx="10" fill="none" stroke="${P.wood}" stroke-width="14"/><rect x="420" y="250" width="860" height="420" rx="10" fill="none" ${S()}/>`;
  // pavement
  a += `<rect x="0" y="670" width="${W}" height="130" fill="#d9d2c3" ${S()}/>`;
  for (let x = 0; x < W; x += 120) a += `<path d="M${x} 670 L${x - 30} 800" stroke="${P.ink}" stroke-width="2" opacity=".3"/>`;
  a += X.tree(150, 690, 1.05, { seed: 2 });
  a += X.shadow(420, 770, 80) + X.shadow(250, 772, 60);
  const ar = person('aarav', { x: 430, y: 770, scale: 1.25, pose: 'cheer', expr: 'wow' });
  a += X.backpack(440, 600, 0.9, P.yellow) + ar.svg;
  a += fig('anya', { x: 270, y: 775, scale: 1.2, pose: 'hold', expr: 'happy', look: 1 });
  a += X.sparkle(700, 330, 18) + X.sparkle(1030, 300, 14) + X.sparkle(560, 470, 12);
  const over = bubble(20, 230, ['Wow! I really', 'want this bicycle!'], { tail: [ar.mouth[0] - 30, ar.mouth[1] - 20], size: 42 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 4 – NEEDS VS WANTS ----------------
function p04() {
  const h = 700;
  let a = X.room(W, h, { wall: '#e6f1d8', floorY: 560 });
  a += X.windowFrame(90, 80, 220, 210, { curtain: P.yellow });
  a += X.table(740, 660, 900, 170, P.wood);
  // two baskets on the table
  const basket = (x, label, col, items) => {
    let b = items;
    b += `<path d="M-180 -110 L180 -110 L150 0 L-150 0Z" fill="${P.woodLight}" ${S()}/>`;
    for (let i = -140; i <= 140; i += 40) b += `<path d="M${i} -110 L${i * 0.85} 0" stroke="${P.brown}" stroke-width="3"/>`;
    b += `<path d="M-172 -80 L172 -80 M-164 -48 L164 -48 M-158 -18 L158 -18" stroke="${P.brown}" stroke-width="3"/>`;
    b += `<rect x="-120" y="-96" width="240" height="66" rx="14" fill="${col}" ${S()}/>`;
    b += `<text x="0" y="-48" font-family="'Baloo 2'" font-weight="800" font-size="46" fill="#fff" text-anchor="middle" stroke="${P.ink}" stroke-width="1.5" letter-spacing="3">${label}</text>`;
    return X.at(x, 494, 1, b);
  };
  a += basket(500, 'NEEDS', P.green, X.icon('apple', -110, -96, 0.9) + X.icon('shirt', -20, -100, 0.95) + X.icon('medicine', 80, -100, 0.85) + X.icon('book', 130, -102, 0.7) + X.icon('bottle', -150, -100, 0.75));
  a += basket(990, 'WANTS', P.coral, X.icon('controller', -110, -100, 0.9) + X.icon('toycar', 20, -104, 0.9) + X.icon('icecream', 120, -96, 0.85) + X.icon('teddy', -40, -104, 0.65));
  a += X.shadow(160, 690, 70) + X.shadow(1340, 690, 60);
  const d = person('dad', { x: 170, y: 690, scale: 0.98, pose: 'point', point: true, expr: 'talk' });
  a += d.svg;
  const ar = person('aarav', { x: 1340, y: 692, scale: 1.25, pose: 'think', expr: 'think', flip: true });
  a += ar.svg;
  const over = bubble(330, 26, ['We take care of needs first.', 'Then we can plan for wants.'], { tail: [d.mouth[0] + 40, d.mouth[1] - 20], size: 38 }) +
    bubble(1080, 70, ['Hmm... so a bicycle', 'is a want!'], { tail: [ar.mouth[0] - 10, ar.top[1] - 4], size: 38 });
  return { w: W, h, art: a, over };
}

// ---------------- PAGE 5 – MEET THE PIGGY BANK ----------------
function p05() {
  let a = X.room(W, H, { wall: '#dbe8f7', floorY: 610 });
  a += X.windowFrame(980, 90, 280, 260, { night: true, curtain: P.blue });
  a += X.shelf(330, 260, 380, X.bookStack(-110, 0, [P.red, P.green, P.yellow, P.blue], 0.7) + X.icon('star', 30, -30, 0.6) + X.icon('toycar', 130, 0, 0.6));
  a += `<rect x="40" y="500" width="380" height="150" rx="16" fill="${P.blueLight}" ${S()}/><rect x="30" y="420" width="40" height="230" rx="10" fill="${P.wood}" ${S()}/><ellipse cx="140" cy="490" rx="80" ry="34" fill="${P.white}" ${S()}/>`;
  a += X.table(1340, 660, 200, 140, P.wood) + X.lamp(1340, 514, 0.8);
  a += `<path d="M1210 520 L1470 520 L1520 700 L1160 700Z" fill="#fff4c2" opacity=".22"/>`;
  a += X.rug(740, 720, 700, 110, P.yellow);
  a += X.shadow(560, 742, 70) + X.shadow(890, 742, 80);
  const an = person('anya', { x: 590, y: 745, scale: 1.35, pose: 'give', expr: 'joy' });
  a += an.svg;
  const ar = person('aarav', { x: 900, y: 742, scale: 1.3, pose: 'give', expr: 'wow', flip: true });
  a += ar.svg;
  a += X.piggy((an.hands.r[0] + ar.hands.l[0]) / 2 - 10, an.hands.r[1] - 10, 0.75);
  a += X.coin(1010, 380, 18) + X.sparkle(760, 360, 16) + X.sparkle(1060, 470, 12);
  const over = bubble(250, 60, ["Let’s start saving!", 'This is your little', 'money helper.'], { tail: [an.mouth[0] - 20, an.top[1] - 6], size: 38 }) +
    bubble(1000, 410, ['Thank you, Anya!'], { tail: [ar.mouth[0] + 20, ar.mouth[1]], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 6 – WHY SAVING MATTERS ----------------
function p06() {
  let a = X.room(W, H, { wall: '#fbe6c6', floorY: 590 });
  a += X.windowFrame(60, 70, 230, 220, { curtain: P.green });
  // goal poster on the wall
  a += `<rect x="1060" y="70" width="330" height="250" rx="10" fill="${P.white}" ${S()}/><rect x="1080" y="90" width="290" height="210" rx="6" fill="none" stroke="${P.coral}" stroke-width="3" stroke-dasharray="10 8"/>`;
  a += X.bicycle(1225, 250, 0.62, P.red, { shine: true }) + X.sign(1225, 116, 200, 46, 'MY GOAL', { fill: P.yellow, size: 30 });
  a += X.sofa(300, 740, 470, P.teal);
  a += fig('dad', { x: 200, y: 744, scale: 1.08, sit: 'chair', pose: 'presentR', expr: 'talk' });
  a += fig('aarav', { x: 420, y: 744, scale: 1.4, sit: 'chair', pose: 'think', expr: 'think', look: 1 });
  a += X.table(930, 770, 720, 160, P.wood);
  [2, 4, 6, 8, 11].forEach((n, i) => { a += X.coinStack(690 + i * 120, 604, n, 36); });
  a += `<path d="M660 520 Q880 330 1060 300" fill="none" stroke="${P.green}" stroke-width="8" stroke-dasharray="18 14"/><path d="M1060 300 l-28 -10 m28 10 l-22 20" stroke="${P.green}" stroke-width="8" stroke-linecap="round"/>`;
  a += X.plantPot(1420, 760, 0.85);
  const over = bubble(330, 40, ['Saving means keeping some money now', 'so you can use it later.'], { tail: [230, 350], size: 38 });
  return { w: W, h: H, art: a, over };
}

// ---------------- PAGE 7 – THE THREE MONEY JARS ----------------
function p07() {
  let a = X.room(W, H, { wall: '#f6e3f0', floorY: 600 });
  a += X.windowFrame(90, 90, 230, 220, { curtain: P.pink });
  a += X.table(760, 700, 900, 160, P.wood, { front: P.woodLight });
  a += X.jar(500, 532, 1.5, 'SAVE', P.green, 7);
  a += X.jar(760, 532, 1.5, 'SPEND', P.blue, 4, { fs: 32 });
  a += X.jar(1020, 532, 1.5, 'SHARE', P.pinkDeep, 3, { heart: true, fs: 32 });
  a += X.shadow(200, 760, 80) + X.shadow(1330, 762, 70);
  const ar = person('aarav', { x: 200, y: 760, scale: 1.5, pose: 'holdR', expr: 'joy' });
  a += ar.svg + X.coin(ar.hands.r[0] + 6, ar.hands.r[1] - 18, 20);
  a += fig('dad', { x: 1330, y: 760, scale: 1.14, pose: 'hips', expr: 'happy', flip: true });
  a += X.coin(400, 120, 18) + X.coin(1130, 110, 18) + X.sparkle(760, 80, 16);
  const over = bubble(320, 40, ['So every coin has a job!'], { tail: [ar.mouth[0] + 6, ar.top[1] - 4], size: 40 });
  return { w: W, h: H, art: a, over };
}

module.exports = { cover, p01, p02, p03, p04, p05, p06, p07, W, H };
