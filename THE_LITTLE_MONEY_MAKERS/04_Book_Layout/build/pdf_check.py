"""Technical PDF checks: page count/size, font embedding, effective image resolution, blank pages.
Usage: python3 pdf_check.py <pdf> <expected_w_in> <expected_h_in> <out.json>"""
import json
import sys
import pymupdf

pdf, ew, eh, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
doc = pymupdf.open(pdf)
res = {"file": pdf.split('/')[-1], "pages": doc.page_count, "size_ok": True, "fonts": {}, "min_image_dpi": None, "pages_detail": [], "issues": []}
min_dpi = 1e9
for i, page in enumerate(doc):
    w, h = page.rect.width / 72, page.rect.height / 72
    if abs(w - ew) > 0.01 or abs(h - eh) > 0.01:
        res["size_ok"] = False
        res["issues"].append(f"page {i+1}: size {w:.3f}x{h:.3f} in")
    for f in page.get_fonts(full=True):
        name, ext = f[3], f[1]
        res["fonts"][name] = {"embedded": ext not in ("n/a", ""), "type": f[2]}
    page_min = None
    for info in page.get_image_info(xrefs=True):
        bw, bh = info["bbox"][2] - info["bbox"][0], info["bbox"][3] - info["bbox"][1]
        if bw < 20 or bh < 20:
            continue
        dpi = min(info["width"] / (bw / 72), info["height"] / (bh / 72))
        page_min = dpi if page_min is None else min(page_min, dpi)
    if page_min:
        min_dpi = min(min_dpi, page_min)
    text = page.get_text().strip()
    res["pages_detail"].append({"page": i + 1, "w_in": round(w, 3), "h_in": round(h, 3), "words": len(text.split()), "min_img_dpi": round(page_min) if page_min else None})
    if not text and not page.get_images():
        res["issues"].append(f"page {i+1}: appears blank")
res["min_image_dpi"] = round(min_dpi)
for n, f in res["fonts"].items():
    if not f["embedded"]:
        res["issues"].append(f"font not embedded: {n}")
res["toc_entries"] = len(doc.get_toc())
res["links"] = sum(len(p.get_links()) for p in doc)
json.dump(res, open(out, "w"), indent=1)
print(json.dumps({k: v for k, v in res.items() if k != "pages_detail"}, indent=1))
