# Asset Register and Licences

## 1. Illustrations and design elements
| Asset | Source | Licence / status |
|---|---|---|
| All 28 page illustrations, front/back cover art, worksheet art and icons | Original vector artwork generated from the project's own source code (`04_Book_Layout/src/*.js`). No stock images, clip art, photographs or third-party artwork were used. | Created for this project. See the AI notice in section 4. |
| Characters (Aarav, Anya, Dad, Mum, Rohan, Mrs Kapoor, Ms Rao, Meera, Kabir, Ishaan, Zara, Dev) | Original designs defined in `characters.js` | Original. No existing or copyrighted characters are used. |
| Reference storyboard image (28 panels) | Supplied by the client | Used only as a concept and story brief. Nothing was cropped, traced or reproduced, and it is not included in any deliverable. |
| Paper texture, coloured-pencil texture | Procedurally generated (SVG turbulence filters) | Original. |

## 2. Fonts (embedded in the PDFs, and used in the covers as outlined lettering)
| Font | Designer | Licence | File |
|---|---|---|---|
| Baloo 2 | Ek Type | SIL Open Font License 1.1 | `OFL_baloo-2.txt` |
| Andika | SIL International | SIL Open Font License 1.1 | `OFL_andika.txt` |
| Patrick Hand | Patrick Wagesreiter | SIL Open Font License 1.1 | `OFL_patrick-hand.txt` |

The OFL allows the fonts to be embedded in commercial documents and ebooks, and allows those documents to be sold. The font files themselves must not be sold on their own. The fonts were obtained from the official Google Fonts distribution through the `@fontsource` npm packages.

## 3. Software used to produce the files (not distributed with the book)
| Tool | Purpose | Licence |
|---|---|---|
| Node.js, Playwright and Chromium | Rendering artwork and PDFs | MIT / Apache-2.0 / BSD |
| ImageMagick, Poppler (pdftoppm) | Image conversion and page renders | ImageMagick licence / GPL (tools only) |
| pikepdf, PyMuPDF | PDF metadata and QC checks | MPL-2.0 / AGPL-3.0 (used as local build tools only, not distributed) |
| HarfBuzz (uharfbuzz), fontTools | Converting display lettering to outlines | MIT / MIT |
| EPUBCheck | EPUB validation | BSD-3-Clause |

No licence of these tools places any restriction on the book files they produced.

## 4. AI-generated content notice — please read
The story text and all illustrations in this project were created with an AI assistant (Claude, by Anthropic). The illustrations were made by AI-written drawing code, not by an image-generation model.

- **Amazon KDP requires you to disclose AI-generated content** (text, images and translations) when you publish. Answer **"Yes"** for both the text and the images in the KDP content questionnaire. Using AI only to edit or brainstorm your own writing is "AI-assisted" and does not need disclosure. That is not the case here.
- **Copyright:** in several countries, including the United States, purely AI-generated material may not be protected by copyright. Adding your own substantial creative contribution (rewriting, original additions, artistic changes) can strengthen your position. If copyright protection matters to your business, take advice from an intellectual-property professional in your country.
- The copyright line in the book reads "© 2026 the author". Set your name with `BOOK_AUTHOR="Your Name" ./04_Book_Layout/build_all.sh`.

## 5. Things that were deliberately not invented
No ISBN, barcode, publisher name, author credentials, endorsements or reviews were created. KDP can assign a free ISBN and prints the barcode in the reserved area on the back cover.
