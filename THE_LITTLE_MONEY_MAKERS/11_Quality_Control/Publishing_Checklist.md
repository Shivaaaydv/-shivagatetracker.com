# Publishing Checklist

## Before anything else
- [ ] Decide your author or pen name, then rebuild: `BOOK_AUTHOR="Your Name" ./04_Book_Layout/build_all.sh` (adds the name to the title page, copyright page, cover and EPUB metadata).
- [ ] Read the whole book once yourself, ideally with a child, and make any wording changes in `04_Book_Layout/src/book.js`.
- [ ] Read `10_Licences_And_Attribution/Asset_Register_and_Licences.md`, especially the AI notice.

## Amazon KDP — paperback
- [ ] Trim size **8.5 × 8.5 in**, **Premium colour**, white paper, **bleed: yes**, matte or glossy cover.
- [ ] Interior: `07_Print_Edition/The_Little_Money_Makers_Print_Interior_8.5x8.5_bleed.pdf` (36 pages).
- [ ] Cover: `08_Cover_Design/Paperback_Full_Wrap_Cover_36pp_PremiumColour_17.3345x8.75in.pdf`.
- [ ] **Verify** the cover size with KDP's Cover Calculator (8.5 × 8.5, premium colour, 36 pages). If KDP gives a different spine width, change `PAPER_FACTOR` in `04_Book_Layout/build/covers.js` and rebuild.
- [ ] ISBN: use KDP's free ISBN, or your own. KDP prints the barcode in the reserved area on the back cover; no barcode is needed in the file.
- [ ] Answer **Yes** to AI-generated text and AI-generated images in the content questionnaire.
- [ ] Use the online previewer and order a **printed proof copy** before publishing. Check colour, margins and trim.
- [ ] If you change the page count, rebuild everything: the spine width depends on it.

## Amazon KDP — Kindle ebook
- [ ] Install **Kindle Create** (Windows/macOS) → choose the comics/children's (fixed-layout) option → import `06_Kindle_Edition/Kindle_Create_Import_The_Little_Money_Makers.pdf` → check every page → export the `.kpf` → upload it to KDP.
- [ ] Ebook cover: `08_Cover_Design/Ebook_Cover_2560x2560.jpg` (square, to match the book).
- [ ] Preview on Fire tablet, phone and Kindle app sizes in KDP's previewer.
- [ ] AI disclosure: Yes (text and images).
- [ ] Pricing note: image-heavy ebooks have larger files, which raises the delivery fee on the 70% royalty option. Check the estimate KDP shows.

## Other ebook stores (Apple Books, Kobo, Google Play)
- [ ] Upload `06_Kindle_Edition/The_Little_Money_Makers_Fixed_Layout.epub` (EPUB 3, fixed layout, passes EPUBCheck with 0 errors and 0 warnings).

## Direct digital sales (Etsy, Gumroad, Payhip, your own site)
- [ ] Sell `05_Final_PDF/The_Little_Money_Makers_Digital_Edition.pdf` (about 13 MB).
- [ ] Listing text: `09_Marketing_Assets/Product_Description.md`. Images: `09_Marketing_Assets/*.jpg`.
- [ ] State the licence in the listing: personal, family or single-classroom use.
- [ ] Do **not** put the PDF anywhere public (for example a public GitHub repository or your website folder) unless you want it to be free.

## Marketplace content rules to keep in mind
- [ ] Don't use keywords that name other authors, brands or bestseller claims.
- [ ] Don't add reviews, endorsements or award badges unless they are real.
- [ ] Keep the "not financial advice" notice and the "pretend example" label.
