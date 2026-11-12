# Character Bible — The Little Money Makers

Every character is drawn by one parametric rig (`04_Book_Layout/src/characters.js`). Colours, proportions, hair and clothing are defined once in the `CAST` table, so a character cannot drift between pages. To change a character everywhere, edit its `CAST` entry and run `04_Book_Layout/build_all.sh`.

Reference sheets: `model_sheet_preview.png` (main cast and Aarav's nine expressions) and `model_sheet_2.png` (classmates and sitting poses).

| Character | Age / role | Look (fixed) | Personality |
|---|---|---|---|
| **Aarav** | 8, main character | Warm brown skin `#c4875a`; messy, spiky dark hair; **blue T-shirt with a small yellow star**; khaki shorts; red trainers with white socks | Curious, energetic and friendly. Dreams of a red bicycle. Makes mistakes and learns from them. |
| **Anya** | 6, younger sister | Two pigtails with **pink bows**; pink puff-sleeve dress with white collar and polka dots; pink shoes | Playful, sweet and supportive. Gives Aarav her piggy bank; helps with the bookmark stall. |
| **Dad** | Father | Short dark hair, **neat full beard**; light-blue button shirt with rolled sleeves; brown belt; navy trousers | Wise and patient. Never scolds or humiliates; explains money with real examples. |
| **Mum** | Mother | Long hair in a braid over the shoulder; small bindi; **coral kurta with yellow dupatta**; gold earrings | Warm and practical. Supervises the bookmark business and helps Aarav share. |
| **Rohan** | 8, best friend | Short curly hair under a **red cap with a yellow star**; green T-shirt; navy shorts; white trainers | Disciplined, helpful and responsible. Models a daily routine. |
| **Mrs Kapoor** | Bank manager | Hair in a bun; **round glasses**; navy blazer with gold name badge over a white blouse | Friendly professional who explains banks and interest simply. |
| **Ms Rao** | Class teacher | Voluminous curly hair; gold hoop earrings; **lavender cardigan**; teal long skirt | Encouraging; turns failure into a learning moment. |
| **Meera** | Classmate | Bob haircut with **yellow headband**; yellow top; blue skirt | Creative; paints the model houses (wants blue houses). |
| **Kabir** | Classmate | Side-swept hair; **round glasses**; orange T-shirt; brown shorts | Technical; connects the wires (wants red houses). |
| **Ishaan** | Classmate | Short hair; teal T-shirt; grey shorts | Quiet; Aarav helps him with books. Shown with dignity, as a friend. |
| Zara and Dev | Rival science-fair team | Lavender outfit with pink headband / yellow T-shirt with glasses | Background characters who win the trophy. |

## Proportions
- Children: about 3.3 heads tall (large head for warmth and readability). Anya is drawn at 86% of Aarav's height.
- Adults: about 5.6 heads tall.
- Line work: warm dark-brown outline `#3b2a20` (never pure black), about 1.2 pt at print size.

## Expressions available
`happy`, `joy`, `talk`, `surprised`/`wow`, `sad`, `worried`, `think`, `determined`, `proud`, `kind`.

## Poses available
`down`, `relaxed`, `wave`, `waveL`, `cheer`, `point`, `pointUp`, `hold`, `holdHigh`, `holdR`, `give`, `giveR`, `hips`, `think`, `write`, `shrug`, `sad`, `presentR`, plus sitting modes `sit: 'chair'` and `sit: 'cross'` and `legs: false` (behind furniture).

## Palette
Sky blue `#a8d8f2`, warm yellow `#f7c843`, forest green `#3f8f4f`, soft coral `#f0806a`, cream `#fdf6e3`, light pink `#f5a8c2`, natural brown `#9a6a43`.

## Texture
A single SVG filter (`pencil` in `src/lib.js`) adds a slight hand-drawn wobble and white paper-grain flecks that look like coloured pencil. A light paper texture is laid over each image. Both are resolution-independent, so the look stays the same at any export size.
