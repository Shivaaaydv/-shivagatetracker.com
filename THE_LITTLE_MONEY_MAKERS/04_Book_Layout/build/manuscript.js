// Writes 01_Manuscript/Manuscript.md and Manuscript.txt from the book data and scene code.
const fs = require('fs');
const path = require('path');
const { META, PAGES, BACK } = require('../src/book');

const ROOT = path.resolve(__dirname, '../..');
const src = fs.readFileSync(path.join(__dirname, '../src/scenes_a.js'), 'utf8') + fs.readFileSync(path.join(__dirname, '../src/scenes_b.js'), 'utf8');

// speech bubbles per scene function, parsed from the scene source
function bubbles(id) {
  const m = src.match(new RegExp(`function ${id}\\(\\) \\{([\\s\\S]*?)\\n\\}`));
  if (!m) return [];
  const out = [];
  for (const b of m[1].matchAll(/bubble\([^,]+,[^,]+,\s*\[([^\]]+)\]/g)) out.push(b[1].match(/(['"])(.*?)\1/g).map((s) => s.slice(1, -1)).join(' '));
  return out;
}

const ART = {
  p01: 'Title page. Sunset over green hills. Aarav sits cross-legged reading; Anya laughs beside the pink piggy bank; the red bicycle leans on a mango tree.',
  p02: 'Living room. The whole family stands on a teal rug: Dad, Aarav waving, Anya, Mum. Family photo and shelf on the wall.',
  p03: 'Street outside City Cycles. Aarav cheers at the shiny red bicycle in the window (price tag ₹5,000); Anya watches.',
  p04: 'Dad points to two baskets on a table: NEEDS (apple, clothes, medicine, book, water) and WANTS (game controller, toy car, ice cream, teddy).',
  p05: 'Aarav’s bedroom at night. Anya hands Aarav the pink piggy bank.',
  p06: 'Dad and Aarav on the sofa. Coin stacks grow taller towards a “My Goal” bicycle poster.',
  p07: 'Three glass jars labelled SAVE, SPEND and SHARE. Aarav holds a coin; Dad watches proudly.',
  p08: 'Bank interior with a vault door. Mrs Kapoor welcomes Dad and Aarav at her desk.',
  p09: 'Mrs Kapoor points to a board: ₹100 → ₹110 → ₹121 with growing seedlings, labelled “A pretend example”.',
  p10: 'Bedroom at night. Aarav sits on his bed with a game console, worried. The piggy bank is nearly empty; a thought cloud shows the bicycle far away.',
  p11: 'Garden. Dad waters a newly planted mango seedling; Aarav smiles. A grown mango tree stands nearby.',
  p12: 'Green Park in the morning. Rohan (red cap) explains his routine to Aarav.',
  p13: 'A crossroads: GOOD HABITS signpost points to a sunny side (book, apple, exercise, piggy bank); BAD HABITS points to a grey, rainy side (screen, sweets, late night, games).',
  p14: 'Aarav reads under a big tree; his imagination flies out of the book: lightbulb, star, rocket, planet, castle.',
  p15: 'Aarav at his desk below his “MY GOAL” poster and a 10-step savings thermometer.',
  p16: 'Aarav points to his “MY DAY” planner with ticks; wall clock and alarm clock.',
  p17: 'Classroom. Ms Rao looks on as Aarav, holding a clipboard, asks his team (Meera, Kabir, Rohan) for ideas.',
  p18: 'The team builds a wind-turbine model village; Kabir cheers as the bulb lights up.',
  p19: 'The team sits on a rug. Meera holds a blue house, Kabir a red one; Aarav helps them take turns.',
  p20: 'Science fair. Another team cheers with the trophy on stage; Aarav’s team stands sadly by their model.',
  p21: 'Ms Rao points to a board: “What went well” and “Next time we will...”. The team listens.',
  p22: 'Outside school. Aarav gives Ishaan new notebooks and books; Ishaan smiles.',
  p23: 'School fair stall: “Handmade Bookmarks ₹10 each”. Aarav and Anya sell; Mum keeps the notebook; Kabir buys one.',
  p24: 'Aarav holds a coin beside three jars tagged ₹140, ₹40 and ₹20. A thought cloud crosses out the game and ticks the bicycle.',
  p25: 'Outside City Cycles. Aarav in a yellow helmet cheers beside his new bicycle; Anya, Dad and Mum celebrate in confetti.',
  p26: 'Aarav and Anya stand on a stack of books holding a golden star, with a trophy, piggy bank and coins.',
  p27: 'Aarav and Anya work on activities at a table with pencils, scissors and a jar.',
  p28: 'The family sits together on a park bench at sunset.',
};

let md = `# ${META.title}\n## ${META.subtitle}\n*${META.tagline}*\n\nAudience: children aged 6–10 · Language: British English · Trim: 8.5 × 8.5 in · ${PAGES.length} pages\n\n---\n`;
for (const p of PAGES) {
  md += `\n### Page ${p.n}${p.title ? ` — ${p.title}` : ' — Title page'}\n\n`;
  if (ART[p.id]) md += `**Illustration:** ${ART[p.id]}\n\n`;
  const bb = bubbles(p.id);
  if (bb.length) md += `**Speech bubbles:** ${bb.map((b) => `“${b}”`).join(' · ')}\n\n`;
  if (p.type === 'title') md += `**Text:** ${META.title} — ${META.subtitle}. ${META.tagline}\n`;
  (p.text || []).forEach((t) => { md += `${t}\n\n`; });
  if (p.boxes) p.boxes.forEach((b) => { md += `- **${b.head}:** ${b.body}\n`; });
  if (p.jars) p.jars.forEach((b) => { md += `- **${b.head}:** ${b.body}\n`; });
  if (p.rule) { md += `**${p.rule.head}:**\n`; p.rule.steps.forEach(([a, b], i) => { md += `${i + 1}. **${a}** — ${b}\n`; }); }
  if (p.lists) p.lists.forEach((l) => { md += `\n**${l.head}:** ${l.items.join('; ')}.\n`; });
  if (p.chips) md += `**Benefits:** ${p.chips.join(' · ')}\n`;
  if (p.schedule) md += p.schedule.map(([t, a]) => `- ${t} — ${a}`).join('\n') + '\n';
  if (p.steps) md += p.steps.map((s, i) => `${i + 1}. ${s}`).join('\n') + '\n';
  if (p.ledger) md += p.ledger.map((r) => `- ${r[0]}: ${r[1]} = ${r[2]}`).join('\n') + '\n';
  if (p.lessons) md += p.lessons.map((s, i) => `${i + 1}. ${s}`).join('\n') + '\n';
  if (p.intro) md += `${p.intro}\n\n` + p.questions.map((s, i) => `${i + 1}. ${s}`).join('\n') + `\n\n**Grown-up tip:** ${p.tip}\n\n**${p.ending}**\n`;
  if (p.type === 'activities') md += 'Four activities: Needs or Wants? (write N or W); Money Maths (₹50 split: half Save, ₹15 Spend, rest Share — answers ₹25/₹15/₹10); The 7-Day Challenge; Draw Your Dream.\n';
  if (p.type === 'worksheet') md += `Printable worksheet: ${p.title}.\n`;
  if (p.type === 'notes') md += 'Guidance for grown-ups (how to read together, about the money examples, safety) and a clickable contents list.\n';
  if (p.type === 'credits') md += 'Copyright notice, fiction notice, not-financial-advice notice, typeface credits and edition.\n';
  if (p.note) md += `\n*Note:* ${p.note}\n`;
  if (p.quote) md += `\n> ${p.quote}\n`;
  if (p.think) md += `\n**Think & Talk:** ${p.think}\n`;
}
md += `\n---\n\n## Back cover\n\n**Can Aarav save enough for his dream?**\n\n${BACK.blurb}\n\nInside, children discover: ${BACK.benefits.join('; ')}.\n\nA warm story about money, habits and kindness for ages 6–10.\n`;
fs.mkdirSync(path.join(ROOT, '01_Manuscript'), { recursive: true });
fs.writeFileSync(path.join(ROOT, '01_Manuscript', 'Manuscript.md'), md);
fs.writeFileSync(path.join(ROOT, '01_Manuscript', 'Manuscript.txt'), md.replace(/[*#>]/g, '').replace(/\n{3,}/g, '\n\n'));
const words = PAGES.flatMap((p) => p.text || []).join(' ').split(/\s+/).length;
console.log('manuscript written; story body words:', words);
