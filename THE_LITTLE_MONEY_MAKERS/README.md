# THE LITTLE MONEY MAKERS — A Journey to a Smarter Future
*Small Lessons. Big Dreams. A Smarter Future.* · Ages 6–10 · 36 pages · 8.5 × 8.5 in

| Folder | Contents |
|---|---|
| `01_Manuscript/` | Full manuscript with illustration notes and speech bubbles (`.md`, `.txt`) |
| `02_Character_Design/` | Character bible and model sheets |
| `03_Illustrations/Page_01…Page_28/`, `Cover_Art/`, `Worksheets/` | Every illustration as editable **SVG** plus a **300 dpi PNG** |
| `04_Book_Layout/` | Editable source: story data, character rig, scenes, page templates and build scripts |
| `05_Final_PDF/` | **Digital edition PDF** (8.5 × 8.5 in, bookmarks, clickable contents) |
| `06_Kindle_Edition/` | Kindle Create import PDF, 2048 px page images, validated fixed-layout EPUB 3 |
| `07_Print_Edition/` | **KDP print interior PDF** (8.625 × 8.75 in with bleed, 300 dpi) |
| `08_Cover_Design/` | Ebook cover, front and back panels, **KDP full-wrap cover PDF**, guides preview, cover spec |
| `09_Marketing_Assets/` | Cover mockup, 5 interior spreads, product presentation image, listing copy |
| `10_Licences_And_Attribution/` | Font licences (OFL), asset register, AI-content notice |
| `11_Quality_Control/` | QC report, machine checks, publishing checklist |

## Rebuild everything
Requires Node 18+ with Playwright/Chromium, Python 3 with `pymupdf pikepdf uharfbuzz fonttools brotli epubcheck`, ImageMagick and Poppler.
```bash
BOOK_AUTHOR="Your Name" ./04_Book_Layout/build_all.sh
```
- Change the story text in `04_Book_Layout/src/book.js`.
- Change a character's look in `04_Book_Layout/src/characters.js` (it updates on every page).
- Change a picture in `04_Book_Layout/src/scenes_a.js` / `scenes_b.js`.
- Rebuild one picture with `node 04_Book_Layout/build/illustrations.js p07`.
