# Quality-Control Report — The Little Money Makers (first edition)

Date: 12 November 2026 · Checked editions: digital PDF, print interior PDF, paperback wrap cover, fixed-layout EPUB, ebook cover.

## 1. Automated checks (machine-readable results in this folder)
| Check | Digital PDF | Print interior PDF | Wrap cover PDF | Result |
|---|---|---|---|---|
| Page count | 36 | 36 | 1 | ✅ Even page count, no accidental blank pages |
| Page size | 8.5 × 8.5 in | 8.625 × 8.75 in (8.5 in trim + 0.125 in bleed on the top, bottom and outside edges) | 17.3345 × 8.75 in (TrimBox set) | ✅ |
| Fonts embedded | 10/10 | 10/10 | lettering converted to outlines; body fonts embedded | ✅ No Type 3 fonts (the ★ ✓ ✗ glyphs and the stroked title were replaced with vector art) |
| Lowest image resolution | 200 dpi (screen edition, by design) | 285 dpi (worksheet icons); illustrations 300 dpi | 300 dpi | ✅ |
| Text overflow and clipping (`layout_fit_*.json`) | 0 pages | 0 pages | — | ✅ Every page measured in the browser; illustrations shrink automatically, text never does |
| Bookmarks / internal links | 56 bookmarks, 35 clickable contents links | same | — | ✅ |
| EPUB 3 validation (EPUBCheck 3.4) | — | — | — | ✅ 0 fatals / 0 errors / 0 warnings |

Files: `pdf_check_digital.json`, `pdf_check_print.json`, `pdf_check_cover.json`, `layout_fit_digital.json`, `layout_fit_print.json`.

## 2. Visual inspection (every page rendered to an image and reviewed)
All 36 print-interior pages were rendered at 100 dpi and inspected one at a time. Selected pages, the covers and the mockups were also checked at 200 dpi.

Issues found and fixed during QC:
| # | Issue | Fix |
|---|---|---|
| 1 | Coloured-pencil grain too heavy and dirty on the backgrounds | Removed the dark streak layer; lightened the grain and the paper overlay |
| 2 | Thin, mannequin-like limbs; the left shoe was drawn inverted | Thickened limbs; rewrote the shoe geometry |
| 3 | Page 1: the open book hid Aarav's face | Book repositioned into his hands |
| 4 | Page 2: waving arms collided | Characters re-spaced; Anya's pose changed |
| 5 | Pages 6 and 7: characters too small in empty rooms | Recomposed and enlarged; added the goal poster |
| 6 | Windows: the tree spilled outside the window frame | Clipped to the window |
| 7 | Page 9: "pretend example" tag overlapped the heading | Moved under the heading |
| 8 | Page 13: signpost covered Aarav's head | Signs raised |
| 9 | Page 15: goal text touched the poster edge; a bubble covered Aarav's face | Smaller text; bubble moved |
| 10 | Page 17: speech bubble covered Aarav's face | Bubble moved onto the blackboard |
| 11 | Page 18: the bulb sat on Kabir's face | Bulb moved onto the model table |
| 12 | Page 19: two bubbles overlapped; one ran off the edge | Bubbles re-spaced |
| 13 | Page 20: the winning team covered the "Science Fair" sign | Sign moved |
| 14 | Page 22: hearts overlapped Ishaan's face | Hearts raised |
| 15 | Page 23: bookmarks covered Anya | Characters raised; bookmarks scaled down |
| 16 | Page 24: the bubble touched Aarav's head | Bubble raised |
| 17 | Page 27: children hidden behind the table | Scene redrawn |
| 18 | Page 30: worksheet header art crowded the grid; bicycle icon too small | Header replaced with a name/date line; icon enlarged |
| 19 | Page 31: instruction said "colour the coins" but the jars were empty | Changed to "Draw coins in each jar" |
| 20 | Page 35: contents list overflowed | Tighter contents typography |
| 21 | Page 1 (print): title lettering crossed the 0.25 in safe margin | Constrained to the safe area |
| 22 | Cover: "Money Makers" clipped; the sun sat behind the title; the subtitle overflowed its ribbon | Resized lettering, moved the sun, widened the ribbon |
| 23 | Cover PDF was 17.347 in wide (Chromium rounds up to whole points) | MediaBox and TrimBox set to the exact 17.3345 in |
| 24 | Speech bubbles used straight apostrophes | Curly apostrophes, matching the body text |
| 25 | Digital PDF was 52 MB | Screen edition uses 200 dpi images → about 13 MB; print edition stays at 300 dpi |

## 3. Editorial checks
- **Spelling:** automated check of the full manuscript. The only flagged words were character names and correct British spellings (colourful, favourite, realises, aeroplanes, maths). British English is used consistently.
- **Story continuity:** bicycle ₹5,000 → spends some savings (p10) → has ₹1,000, needs ₹4,000 at ₹400 a month for 10 months (p15) → bookmark profit ₹300 − ₹100 = ₹200 (p23) → split ₹140 + ₹40 + ₹20 = ₹200 (p24) → reaches ₹5,000 (p25). The helmet is a gift from the parents. Interest example: 100 → 110 → 121 at a pretend 10%, clearly labelled.
- **Activity answers:** Money Maths ₹50 → ₹25 / ₹15 / ₹10 (printed on p27).
- **Character consistency:** guaranteed by the single rig (see `02_Character_Design`). Aarav's star T-shirt, Anya's pink bows, Dad's beard and blue shirt, Rohan's red cap and Mrs Kapoor's glasses appear the same on every page.
- **Values and safety:** money is never presented as the measure of success (p26 note); adults supervise the bank account, purchases and business (pp. 8, 23, 34, 35); the not-financial-advice notice is on pp. 35–36; Ishaan is helped "quietly and kindly, as a friend".

## 4. Known limitations (honest notes)
1. The illustrations are code-drawn vector art with a coloured-pencil texture. They are consistent and print-sharp, but simpler and more graphic than hand-painted art from a professional illustrator. If you want painterly artwork, the manuscript and the layout system can take new artwork through `03_Illustrations` (same file names and sizes).
2. The Kindle KPF file can only be made in Amazon's Kindle Create desktop app, which cannot run here. Its input files are ready (see `06_Kindle_Edition/README.md`).
3. Amazon's KDP help pages could not be fetched from this build environment (network policy). The specifications used (0.125 in bleed, 0.002347 in per page for premium colour paper, 2 × 1.2 in barcode area, no spine text under 79 pages) come from up-to-date secondary sources. **Re-check them in KDP's cover calculator before uploading.**
4. The EPUB pages are images with the full page text as alternative text. Apple Books and Kobo accept this for fixed-layout picture books; their reflow and text-to-speech features will be limited.
