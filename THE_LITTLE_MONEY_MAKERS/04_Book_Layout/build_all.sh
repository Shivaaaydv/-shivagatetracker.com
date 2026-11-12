#!/usr/bin/env bash
# Rebuilds every deliverable from source. Optional: BOOK_AUTHOR="Your Name" ./build_all.sh
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd .. && pwd)"
node build/model_sheet.js                 # 02_Character_Design model sheets
node build/illustrations.js               # 03_Illustrations (SVG + 300 dpi PNG)
node build/book.js                        # 05_Final_PDF + 07_Print_Edition
node build/covers.js                      # 08_Cover_Design
python3 -I build/epub.py "$ROOT" "${BOOK_AUTHOR:-}"   # 06_Kindle_Edition
node build/marketing.js                   # 09_Marketing_Assets
node build/manuscript.js                  # 01_Manuscript
python3 -I build/pdf_check.py "$ROOT/05_Final_PDF/The_Little_Money_Makers_Digital_Edition.pdf" 8.5 8.5 "$ROOT/11_Quality_Control/pdf_check_digital.json" >/dev/null
python3 -I build/pdf_check.py "$ROOT/07_Print_Edition/The_Little_Money_Makers_Print_Interior_8.5x8.5_bleed.pdf" 8.625 8.75 "$ROOT/11_Quality_Control/pdf_check_print.json" >/dev/null
echo "All deliverables rebuilt."
