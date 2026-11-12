// Page templates and stylesheet for every edition.
// edition: 'digital' (8.5 x 8.5 in, no bleed) | 'print' (8.625 x 8.75 in: 0.125 in bleed on top, bottom and outside edge).
const path = require('path');
const { META, PAGES } = require('./book');
const { fontCSS } = require('./render');

const ROOT = path.resolve(__dirname, '../..');
const img = (rel) => 'file://' + path.join(ROOT, rel);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function css(ed) {
  const print = ed === 'print';
  const PW = print ? 8.625 : 8.5, PH = print ? 8.75 : 8.5;
  return `${fontCSS()}
@page { size: ${PW}in ${PH}in; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; color: #3b2a20; font-family: 'Andika', sans-serif; }
.page { position: relative; width: ${PW}in; height: ${PH}in; overflow: hidden; page-break-after: always; break-after: page; }
.bg { position: absolute; inset: 0; background: #fdf7e8 url('${img('04_Book_Layout/build/cache/paper.jpg')}') center/cover; }
.trim { position: absolute; top: ${print ? 0.125 : 0}in; width: 8.5in; height: 8.5in; }
.recto .trim { left: 0; } .verso .trim { left: ${print ? 0.125 : 0}in; }
.content { position: absolute; top: 0.42in; bottom: 0.6in; display: flex; flex-direction: column; align-items: center; gap: 0.13in; }
.recto .content { left: ${print ? 0.6 : 0.5}in; right: 0.5in; }
.verso .content { left: 0.5in; right: ${print ? 0.6 : 0.5}in; }
h1 { font-family: 'Baloo 2'; font-weight: 800; font-size: 30pt; line-height: 1; margin: 0; color: var(--acc); text-align: center; letter-spacing: .2px; }
.head { text-align: center; width: 100%; }
.head svg { display: block; margin: 2px auto 0; }
.art { position: relative; margin: 0; width: 100%; flex: none; }
.art img { display: block; width: 100%; border-radius: 14px; border: 2.4pt solid #3b2a20; }
.tape { position: absolute; width: 0.8in; height: 0.24in; background: rgba(251, 227, 160, .85); border-left: 2px dashed rgba(255,255,255,.6); border-right: 2px dashed rgba(255,255,255,.6); }
.tape.l { top: -0.09in; left: -0.18in; transform: rotate(-32deg); } .tape.r { top: -0.09in; right: -0.18in; transform: rotate(32deg); }
.story { width: 100%; font-size: 14.5pt; line-height: 1.42; }
.story p { margin: 0 0 0.07in; } .story p:last-child { margin-bottom: 0; }
.quote { font-family: 'Patrick Hand', 'Andika'; font-size: 18pt; line-height: 1.2; text-align: center; padding: 0.07in 0.3in 0.08in; background: #fbe3a0; border-radius: 10px 30px 12px 26px; position: relative; max-width: 95%; transform: rotate(-0.6deg); }
.quote:before, .quote:after { content: ''; display: inline-block; width: 0.17in; height: 0.17in; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z' fill='%23e9a21b' stroke='%233b2a20' stroke-width='1.4' stroke-linejoin='round'/%3E%3C/svg%3E") center/contain no-repeat; margin: 0 .45em; vertical-align: -1px; }
.think { font-size: 13pt; line-height: 1.3; display: flex; gap: 0.1in; align-items: flex-start; width: 100%; }
.think b { color: var(--acc); white-space: nowrap; font-family: 'Baloo 2'; font-weight: 700; font-size: 14pt; }
.think svg { flex: none; margin-top: 1px; }
.note { font-size: 11.5pt; line-height: 1.3; width: 100%; padding: 0.07in 0.14in; border-left: 5px solid var(--acc); background: rgba(255,255,255,.65); border-radius: 0 8px 8px 0; }
.note b { color: var(--acc); }
.row { display: flex; gap: 0.16in; width: 100%; }
.box { flex: 1; border: 2pt solid var(--c); border-radius: 12px; background: #fff; padding: 0.06in 0.14in 0.08in; font-size: 13pt; line-height: 1.32; }
.box h3 { font-family: 'Baloo 2'; font-weight: 800; font-size: 17pt; color: var(--c); margin: 0 0 2px; line-height: 1.1; }
.rule { width: 100%; display: flex; gap: 0.12in; }
.rule .step { flex: 1; background: #fff; border-radius: 12px; border: 2pt solid var(--c); padding: 0.06in 0.12in; font-size: 12.5pt; line-height: 1.28; }
.rule .step b { display: block; font-family: 'Baloo 2'; font-weight: 800; font-size: 17pt; color: var(--c); line-height: 1.1; }
.lists { display: flex; gap: 0.16in; width: 100%; }
.lists .box ul { list-style: none; padding: 0; margin: 0; }
.lists .box li { padding-left: 1.45em; position: relative; margin: 1px 0; font-size: 13pt; }
.lists .box li:before { content: ''; position: absolute; left: 0; top: 0.04in; width: 0.16in; height: 0.16in; background-position: center; background-size: contain; background-repeat: no-repeat; }
.lists .tick li:before { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M3 10.5l4.5 4.5L17 4.5' fill='none' stroke='%233f8f4f' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); } .lists .cross li:before { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 5l10 10M15 5L5 15' fill='none' stroke='%23c0473b' stroke-width='3.2' stroke-linecap='round'/%3E%3C/svg%3E"); }
.chips { display: flex; gap: 0.1in; flex-wrap: wrap; justify-content: center; }
.chips span { background: #fff; border: 2pt solid var(--acc); color: var(--acc); font-family: 'Baloo 2'; font-weight: 700; font-size: 13.5pt; border-radius: 30px; padding: 0 0.16in; }
.sched { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 0.05in 0.16in; }
.sched div { display: flex; gap: 0.1in; background: #fff; border-radius: 8px; border: 1.6pt solid #d8cbb0; padding: 0.03in 0.1in; font-size: 13pt; }
.sched b { color: var(--acc); width: 0.8in; flex: none; font-family: 'Baloo 2'; font-weight: 700; }
.steps { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 0.07in 0.16in; counter-reset: s; }
.steps div { background: #fff; border-radius: 10px; border: 1.6pt solid #d8cbb0; padding: 0.04in 0.1in; font-size: 13.5pt; display: flex; gap: 0.1in; align-items: center; }
.num { flex: none; width: 0.32in; height: 0.32in; border-radius: 50%; background: #eab532; border: 1.6pt solid #3b2a20; display: inline-flex; align-items: center; justify-content: center; font-family: 'Baloo 2'; font-weight: 800; font-size: 13pt; color: #3b2a20; line-height: 1; padding-top: 2px; }
table.ledger { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13pt; background: #fff; border: 2pt solid var(--acc); border-radius: 12px; overflow: hidden; }
table.ledger td { padding: 0.03in 0.14in; border-bottom: 1px dashed #d8cbb0; } table.ledger tr:last-child td { border-bottom: 0; background: #eaf5df; font-weight: 700; }
table.ledger td:last-child { text-align: right; font-weight: 700; font-family: 'Baloo 2'; font-size: 15pt; }
.folio { position: absolute; bottom: 0.2in; width: 0.36in; height: 0.36in; border-radius: 50%; background: #eab532; border: 1.6pt solid #3b2a20; font-family: 'Baloo 2'; font-weight: 800; font-size: 11pt; display: flex; align-items: center; justify-content: center; padding-top: 2px; }
.recto .folio { right: 0.42in; } .verso .folio { left: 0.42in; }
.jars { display: flex; gap: 0.14in; width: 100%; }
/* title page */
.full img.cover { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.titlesvg { position: absolute; left: 0.55in; width: 7.4in; top: 0.55in; }
.tagband { position: absolute; left: 0; right: 0; bottom: 0.42in; text-align: center; }
.tagband span { display: inline-block; background: rgba(253, 247, 232, .94); border: 2pt solid #3b2a20; border-radius: 40px; padding: 0.02in 0.3in 0.04in; font-family: 'Baloo 2'; font-weight: 700; font-size: 16pt; }
/* lessons */
.lessons { width: 100%; display: grid; grid-template-columns: 1fr 1fr; grid-auto-flow: column; grid-template-rows: repeat(5, auto); gap: 0.07in 0.16in; }
.lessons div { display: flex; gap: 0.1in; align-items: center; font-size: 13pt; line-height: 1.22; background: #fff; border-radius: 10px; border: 1.6pt solid #e3d4b2; padding: 0.04in 0.08in; }
/* activities */
.acts { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 0.12in; }
.act { background: #fff; border: 2pt solid var(--c); border-radius: 14px; padding: 0.07in 0.14in 0.1in; font-size: 12.5pt; line-height: 1.3; }
.act h3 { margin: 0 0 3px; font-family: 'Baloo 2'; font-weight: 800; font-size: 16pt; color: var(--c); line-height: 1.1; }
.blank { display: inline-block; min-width: 0.42in; border-bottom: 1.4pt solid #3b2a20; height: 1em; vertical-align: -2px; }
.wgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px 0.14in; }
.boxes { display: flex; gap: 0.06in; margin-top: 4px; } .boxes i { width: 0.34in; height: 0.34in; border: 1.6pt solid #3b2a20; border-radius: 6px; font-style: normal; font-size: 8.5pt; text-align: center; padding-top: 0.36in; }
.drawbox { height: 0.95in; border: 2pt dashed #c9b48a; border-radius: 10px; margin-top: 4px; }
.small { font-size: 10.5pt; color: #6a4f3c; text-align: center; }
/* discussion */
.qs { width: 100%; display: flex; flex-direction: column; gap: 0.045in; }
.qs div { display: flex; gap: 0.1in; align-items: center; font-size: 13pt; line-height: 1.25; }
.ending { font-family: 'Baloo 2'; font-weight: 800; font-size: 19pt; color: var(--acc); text-align: center; line-height: 1.1; }
/* worksheets */
.ws .wsart img { border-radius: 12px; border: 2pt solid #3b2a20; }
.inst { font-size: 13pt; line-height: 1.3; text-align: center; width: 100%; }
.fields { width: 100%; display: flex; flex-direction: column; gap: 0.12in; font-size: 14pt; }
.field { display: flex; align-items: flex-end; gap: 0.08in; }
.field .ln { flex: 1; border-bottom: 1.6pt solid #3b2a20; height: 0.3in; }
.coins { display: flex; gap: 0.12in; justify-content: center; } .coins i { width: 0.48in; height: 0.48in; border-radius: 50%; border: 2pt solid #c08a1c; background: #fff8df; font-style: normal; font-family: 'Baloo 2'; font-weight: 800; font-size: 11pt; color: #c08a1c; display: flex; align-items: center; justify-content: center; }
.cards { width: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.1in; }
.card { background: #fff; border: 1.6pt solid #d8cbb0; border-radius: 12px; text-align: center; padding: 0.04in 0.04in 0.06in; }
.card img { width: 1.05in; height: 1.05in; display: block; margin: 0 auto; }
.card b { display: block; font-size: 12.5pt; margin: 1px 0 3px; }
.card .nw { display: flex; justify-content: center; gap: 0.08in; font-family: 'Baloo 2'; font-weight: 700; font-size: 11pt; }
.card .nw span { border: 1.6pt solid; border-radius: 20px; padding: 0 0.1in; }
table.track { width: 100%; border-collapse: collapse; font-size: 12.5pt; background: #fff; }
table.track th { font-family: 'Baloo 2'; font-weight: 700; font-size: 12.5pt; background: #e3f1ec; padding: 0.03in; border: 1.4pt solid #3b2a20; }
table.track td { border: 1.4pt solid #3b2a20; height: 0.36in; padding: 0 0.08in; }
table.track td + td { width: 0.56in; }
.cols { display: flex; gap: 0.16in; width: 100%; }
.panel { flex: 1; background: #fff; border: 2pt solid var(--c); border-radius: 14px; padding: 0.06in 0.12in 0.1in; }
.panel h3 { margin: 0 0 0.04in; font-family: 'Baloo 2'; font-weight: 800; font-size: 16pt; color: var(--c); line-height: 1.1; }
.trow { display: flex; gap: 0.08in; align-items: flex-end; margin-top: 0.05in; font-size: 12pt; }
.trow .t { width: 0.7in; border-bottom: 1.4pt solid #3b2a20; height: 0.28in; } .trow .ln { flex: 1; border-bottom: 1.4pt solid #3b2a20; height: 0.28in; }
.safety { width: 100%; background: #fdecea; border: 2pt solid #d8483b; border-radius: 12px; padding: 0.06in 0.14in; font-size: 12pt; line-height: 1.3; }
.safety b { color: #c0392b; }
/* notes + credits */
.prose { width: 100%; font-size: 12pt; line-height: 1.34; } .prose p { margin: 0 0 0.08in; }
.prose h2 { font-family: 'Baloo 2'; font-weight: 800; font-size: 15pt; color: var(--acc); margin: 0.06in 0 0.02in; line-height: 1.1; }
.toc { columns: 2; column-gap: 0.3in; font-size: 10pt; line-height: 1.32; width: 100%; }
.toc a { color: #3b2a20; text-decoration: none; display: flex; justify-content: space-between; border-bottom: 1px dotted #c9b48a; break-inside: avoid; }
.credits { font-size: 11pt; line-height: 1.42; width: 100%; } .credits p { margin: 0 0 0.09in; }
`;
}

const underline = (acc) => `<svg width="170" height="12" viewBox="0 0 170 12"><path d="M4 8 Q45 1 85 6 T166 5" fill="none" stroke="${acc}" stroke-width="4.5" stroke-linecap="round"/></svg>`;
const bubbleIcon = (acc) => `<svg width="22" height="20" viewBox="0 0 22 20"><path d="M3 2 H19 Q21 2 21 4 V12 Q21 14 19 14 H10 L5 18 V14 H3 Q1 14 1 12 V4 Q1 2 3 2Z" fill="${acc}"/><circle cx="7" cy="8" r="1.4" fill="#fff"/><circle cx="11" cy="8" r="1.4" fill="#fff"/><circle cx="15" cy="8" r="1.4" fill="#fff"/></svg>`;

let SUF = '';
const art = (id) => `<figure class="art"><img src="${img(`04_Book_Layout/build/cache/${id}${SUF}.jpg`)}" alt=""/><i class="tape l"></i><i class="tape r"></i></figure>`;

function titleSVG() {
  const { textPath } = require('./typeset');
  return `<svg class="titlesvg" viewBox="0 0 816 330" width="100%">
  ${textPath('The Little', { x: 408, y: 92, size: 78, fill: '#3f7fcc', stroke: '#3b2a20', sw: 10 })}
  ${textPath('Money Makers', { x: 408, y: 196, size: 112, fill: '#e2584a', stroke: '#3b2a20', sw: 12, ls: 1 })}
  <g transform="translate(408 252)">
    <path d="M-262 -30 L262 -30 L246 0 L262 30 L-262 30 L-246 0Z" fill="#fbe3a0" stroke="#3b2a20" stroke-width="3" stroke-linejoin="round"/>
    ${textPath(META.subtitle, { x: 0, y: 12, size: 34, font: 'b700' })}
  </g></svg>`;
}

// ---------------- page renderers ----------------
function storyPage(p) {
  let h = `<div class="head"><h1>${esc(p.title)}</h1>${underline(p.accent)}</div>` + art(p.id);
  h += `<div class="story">${p.text.map((t) => `<p>${esc(t)}</p>`).join('')}</div>`;
  if (p.boxes) h += `<div class="row">${p.boxes.map((b) => `<div class="box" style="--c:${b.color}"><h3>${esc(b.head)}</h3>${esc(b.body)}</div>`).join('')}</div>`;
  if (p.jars) h += `<div class="jars">${p.jars.map((b) => `<div class="box" style="--c:${b.color}"><h3>${esc(b.head)}</h3>${esc(b.body)}</div>`).join('')}</div>`;
  if (p.rule) h += `<div class="rule" style="--c:${p.accent}">${p.rule.steps.map(([a, b], i) => `<div class="step" style="--c:${['#d8483b', '#e9a21b', '#3f8f4f'][i]}"><b>${i + 1}. ${esc(a)}</b>${esc(b)}</div>`).join('')}</div>`;
  if (p.lists) h += `<div class="lists">${p.lists.map((l) => `<div class="box ${l.mark}" style="--c:${l.color}"><h3>${esc(l.head)}</h3><ul>${l.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  if (p.chips) h += `<div class="chips">${p.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>`;
  if (p.schedule) h += `<div class="sched">${p.schedule.map(([t, a]) => `<div><b>${t}</b>${esc(a)}</div>`).join('')}</div>`;
  if (p.steps) h += `<div class="steps">${p.steps.map((s, i) => `<div><span class="num">${i + 1}</span>${esc(s)}</div>`).join('')}</div>`;
  if (p.ledger) h += `<table class="ledger">${p.ledger.map((r) => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</table>`;
  if (p.note) h += `<div class="note">${esc(p.note).replace(/^(Grown-up tip:)/, '<b>$1</b>')}</div>`;
  if (p.quote) h += `<div class="quote">${esc(p.quote)}</div>`;
  if (p.think) h += `<div class="think">${bubbleIcon(p.accent)}<b>Think &amp; Talk:</b><span>${esc(p.think)}</span></div>`;
  return h;
}

function titlePage() {
  return { full: true, html: `<img class="cover" src="${img(`04_Book_Layout/build/cache/p01${SUF}.jpg`)}" alt=""/>${titleSVG()}<div class="tagband"><span>${esc(META.tagline)}</span></div>${META.author ? `<div style="position:absolute;bottom:1.05in;left:0;right:0;text-align:center;font-family:'Baloo 2';font-weight:700;font-size:15pt">by ${esc(META.author)}</div>` : ''}` };
}

function lessonsPage(p) {
  let h = `<div class="head"><h1>${esc(p.title)}</h1>${underline(p.accent)}</div>` + art(p.id);
  h += `<div class="lessons">${p.lessons.map((l, i) => `<div><span class="num">${i + 1}</span>${esc(l)}</div>`).join('')}</div>`;
  h += `<div class="quote">${esc(p.quote)}</div><div class="note">${esc(p.note)}</div>`;
  return h;
}

function activitiesPage(p) {
  let h = `<div class="head"><h1>${esc(p.title)}</h1>${underline(p.accent)}</div>` + art(p.id);
  const B = '<span class="blank"></span>';
  h += `<div class="acts">
  <div class="act" style="--c:#3f8f4f"><h3>1. Needs or Wants?</h3>Write <b>N</b> for a need or <b>W</b> for a want.
    <div class="wgrid"><span>Food ${B}</span><span>Video game ${B}</span><span>School shoes ${B}</span><span>Ice cream ${B}</span><span>Medicine ${B}</span><span>Toy car ${B}</span></div></div>
  <div class="act" style="--c:#d98a1c"><h3>2. Money Maths</h3>Aarav has ₹50. He puts half in Save, ₹15 in Spend and the rest in Share.
    <div class="wgrid" style="margin-top:3px"><span>Save: ₹${B}</span><span>Spend: ₹${B}</span><span>Share: ₹${B}</span></div></div>
  <div class="act" style="--c:#2f8a7e"><h3>3. The 7-Day Challenge</h3>Choose one good habit. Do it every day for a week and tick a box each time!
    <div style="margin-top:3px">My habit: ${B}${B}${B}</div><div class="boxes">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => `<i>${d}</i>`).join('')}</div><div style="height:0.14in"></div></div>
  <div class="act" style="--c:#d9506f"><h3>4. Draw Your Dream</h3>What is your big goal? Draw it here!<div class="drawbox"></div></div>
  </div>
  <div class="small">Answers to Money Maths: Save ₹25, Spend ₹15, Share ₹10. &nbsp;More printable worksheets start on page 29.</div>`;
  return h;
}

function discussionPage(p) {
  let h = `<div class="head"><h1>${esc(p.title)}</h1>${underline(p.accent)}</div>` + art(p.id);
  h += `<div class="story" style="font-size:13.5pt">${esc(p.intro)}</div>`;
  h += `<div class="qs">${p.questions.map((q, i) => `<div><span class="num">${i + 1}</span>${esc(q)}</div>`).join('')}</div>`;
  h += `<div class="note"><b>Grown-up tip:</b> ${esc(p.tip)}</div>`;
  h += `<div class="ending">${esc(p.ending)}</div>`;
  return h;
}

const WS_ICONS = [['bottle', 'Water'], ['apple', 'Fruit'], ['schoolbag', 'School bag'], ['shirt', 'Clothes'], ['medicine', 'Medicine'], ['house', 'A home'], ['controller', 'Video game'], ['toycar', 'Toy car'], ['icecream', 'Ice cream'], ['teddy', 'Teddy bear'], ['toothbrush', 'Toothbrush'], ['bike', 'Bicycle']];

function worksheetPage(p) {
  const head = `<div class="head"><h1 style="font-size:26pt">${esc(p.title)}</h1>${underline(p.accent)}</div>`;
  const wsart = (id) => `<figure class="art wsart"><img src="${img(`04_Book_Layout/build/cache/${id}${SUF}.jpg`)}" alt=""/></figure>`;
  const field = (label, pre = '') => `<div class="field"><span>${label}</span>${pre}<span class="ln"></span></div>`;
  const name = `<div class="field" style="width:100%;font-size:13pt"><span>Name:</span><span class="ln"></span><span>Date:</span><span class="ln" style="flex:.6"></span></div>`;
  let h = head;
  switch (p.kind) {
    case 'goal':
      h += wsart('w1') + name + `<div class="fields">${field('My goal is:')}${field('It costs:', '₹')}${field('I already have:', '₹')}${field('I still need:', '₹')}${field('I can save', '₹')}<div class="field"><span>I will reach my goal in</span><span class="ln"></span><span>weeks / months.</span></div></div>
      <div class="inst"><b>My savings tracker:</b> colour in a coin each time you save!</div><div class="coins">${Array.from({ length: 10 }, (_, i) => `<i>${i + 1}</i>`).join('')}</div>`;
      break;
    case 'needs':
      h += name + `<div class="inst">Look at each picture. Circle <b>NEED</b> or <b>WANT</b>. Talk about your answers with a grown-up. Some answers can depend on the situation!</div>`;
      h += `<div class="cards">${WS_ICONS.map(([ic, n]) => `<div class="card"><img src="${img(`04_Book_Layout/build/cache/icon_${ic}.png`)}" alt=""/><b>${n}</b><div class="nw"><span style="color:#3f8f4f">NEED</span><span style="color:#e06a52">WANT</span></div></div>`).join('')}</div>`;
      break;
    case 'jars':
      h += `<div class="field" style="width:100%;font-size:14pt"><span>This week I received ₹</span><span class="ln" style="flex:.5"></span><span>from</span><span class="ln"></span></div>` + wsart('w3');
      h += `<div class="cols">${[['Save', '#3f8f4f', 'I am saving for:'], ['Spend', '#3f7fcc', 'I will spend it on:'], ['Share', '#d9506f', 'I will share it with:']].map(([n, c, q]) => `<div class="panel" style="--c:${c}"><h3>${n}: ₹<span class="blank" style="min-width:.7in"></span></h3><div style="font-size:12.5pt">${q}</div><div class="trow"><span class="ln"></span></div><div class="trow"><span class="ln"></span></div></div>`).join('')}</div>`;
      h += `<div class="inst">Draw coins in each jar to show how you split your money. Tip: many families save at least half!</div>`;
      break;
    case 'habits': {
      const habits = ['Woke up on time', 'Read for 15 minutes', 'Saved some money', 'Played outside or exercised', 'Did homework on time', 'Helped at home', 'Went to bed on time', '', ''];
      h += wsart('w4') + name + `<table class="track"><tr><th style="text-align:left">My habit</th>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => `<th>${d}</th>`).join('')}</tr>${habits.map((x) => `<tr><td>${esc(x)}</td>${'<td></td>'.repeat(7)}</tr>`).join('')}</table>`;
      h += `<div class="fields" style="font-size:13pt">${field('When I finish my week, my reward will be:')}</div>`;
      break;
    }
    case 'routine': {
      const sec = (n, c, rows) => `<div class="panel" style="--c:${c}"><h3>${n}</h3>${Array.from({ length: rows }, () => '<div class="trow"><span class="t"></span><span class="ln"></span></div>').join('')}</div>`;
      h += wsart('w5') + `<div class="inst">Write a time on the short line and an activity on the long line. Remember to include play, reading, helping and sleep!</div>`;
      h += `<div class="cols">${sec('Morning', '#e9a21b', 5)}${sec('After school', '#3f8f4f', 5)}</div><div class="cols">${sec('Evening', '#7a5cb0', 4)}<div class="panel" style="--c:#2d5f9c"><h3>Bedtime</h3><div style="font-size:12.5pt">Lights out at:</div><div class="trow"><span class="ln"></span></div><div style="font-size:12.5pt;margin-top:.06in">Tomorrow I look forward to:</div><div class="trow"><span class="ln"></span></div></div></div>`;
      break;
    }
    case 'business':
      h += wsart('w6') + `<div class="fields" style="font-size:13pt;gap:0.07in">${field('What will I make or do?')}${field('Who might like to buy it?')}${field('What materials do I need?')}<div class="field"><span>Materials cost: ₹</span><span class="ln"></span><span>Price for one: ₹</span><span class="ln"></span><span>How many?</span><span class="ln"></span></div></div>`;
      h += `<table class="ledger" style="--acc:#3f8f4f"><tr><td><b>Money in</b></td><td>Price × number sold</td><td>₹ ______</td></tr><tr><td><b>Money out</b></td><td>Cost of materials</td><td>₹ ______</td></tr><tr><td><b>Profit</b></td><td>Money in − money out</td><td>₹ ______</td></tr></table>`;
      h += `<div class="field" style="width:100%;font-size:13pt"><span>I will split my profit: Save ₹</span><span class="ln"></span><span>Spend ₹</span><span class="ln"></span><span>Share ₹</span><span class="ln"></span></div>`;
      h += `<div class="safety"><b>Safety rules:</b> Always plan your business with a grown-up. Never sell to strangers on your own, and never sell online without a grown-up. Be honest about what you sell, and always be fair.</div>`;
      h += `<div class="field" style="width:100%;font-size:13pt"><span>My grown-up helper:</span><span class="ln"></span></div>`;
      break;
  }
  return h;
}

function notesPage(p) {
  const toc = PAGES.filter((x) => x.n > 1 && x.n < 37 && x.title).map((x) => `<a href="#pg-${x.n}"><span>${esc(x.title)}</span><span>${x.n}</span></a>`).join('');
  return `<div class="head"><h1>${esc(p.title)}</h1>${underline(p.accent)}</div><div class="prose">
  <p>Thank you for sharing this book with a young reader. Most pages end with a short quote or a <b>Think &amp; Talk</b> question. Pause there, ask what your child thinks, and share your own experiences too.</p>
  <h2>About the money in this book</h2>
  <p>The amounts are in Indian rupees (₹) and are kept small and simple for young readers. The interest example on page 9 is a <b>pretend example</b>: real savings rates are usually lower and can change. This book shares general ideas about money for children; it is not financial advice.</p>
  <h2>Safety first</h2>
  <p>Bank accounts, purchases and small business activities for children should always be planned and supervised by a parent or guardian.</p>
  </div><div class="head" style="margin-top:.02in"><h1 style="font-size:20pt">Contents</h1></div><div class="toc">${toc}</div>`;
}

function creditsPage(p) {
  const who = META.author ? esc(META.author) : 'the author';
  return `<div class="head"><h1>${esc(p.title)}</h1>${underline(p.accent)}</div>
  <img src="${img(`04_Book_Layout/build/cache/back${SUF}.jpg`)}" style="width:62%;border-radius:12px;border:2pt solid #3b2a20" alt=""/>
  <div class="credits">
  <p><b>${esc(META.title)}: ${esc(META.subtitle)}</b><br/>${esc(META.tagline)}</p>
  <p>Text and illustrations copyright © ${META.year} ${who}. All rights reserved. No part of this book may be reproduced, stored or shared in any form without written permission from the copyright holder, except for brief quotations in reviews. The worksheets on pages 29–34 may be printed for personal, family or single-classroom use.</p>
  <p>This is a work of fiction. Names, characters and events are imaginary. Any resemblance to real people is coincidental.</p>
  <p>This book shares general ideas about money for children. It is not financial advice. The interest example on page 9 uses simplified, pretend numbers.</p>
  <p>Typefaces: Baloo 2 (Ek Type), Andika (SIL International) and Patrick Hand (Patrick Wagesreiter), all used under the SIL Open Font License 1.1.</p>
  <p>First edition, ${META.year}.</p></div>`;
}

function renderPage(p, ed) {
  const side = p.n % 2 === 1 ? 'recto' : 'verso';
  let inner, full = false;
  if (p.type === 'title') { const t = titlePage(); inner = t.html; full = true; }
  else if (p.type === 'lessons') inner = lessonsPage(p);
  else if (p.type === 'activities') inner = activitiesPage(p);
  else if (p.type === 'discussion') inner = discussionPage(p);
  else if (p.type === 'worksheet') inner = worksheetPage(p);
  else if (p.type === 'notes') inner = notesPage(p);
  else if (p.type === 'credits') inner = creditsPage(p);
  else inner = storyPage(p);
  if (full) return `<section class="page full ${side}" id="pg-${p.n}" data-n="${p.n}"><div class="bg"></div>${inner}<h1 style="position:absolute;left:-9999px">${esc(META.title)}</h1></section>`;
  return `<section class="page ${side} ${p.type === 'worksheet' ? 'ws' : ''}" id="pg-${p.n}" data-n="${p.n}" style="--acc:${p.accent}"><div class="bg"></div><div class="trim"><div class="content">${inner}</div><div class="folio">${p.n}</div></div></section>`;
}

function bookHTML(ed, pages = PAGES) {
  SUF = ed === 'print' ? '' : '_web';
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>${esc(META.title)}: ${esc(META.subtitle)}</title><style>${css(ed)}</style></head><body>${pages.map((p) => renderPage(p, ed)).join('\n')}</body></html>`;
}

module.exports = { bookHTML, css, renderPage, titleSVG, WS_ICONS, img, esc };
