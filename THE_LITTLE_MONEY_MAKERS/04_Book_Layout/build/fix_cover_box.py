"""Set the exact KDP full-wrap MediaBox/TrimBox/BleedBox (Chromium rounds page sizes up to whole points)."""
import sys, pikepdf
path, w_in, h_in, bleed = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])
with pikepdf.open(path, allow_overwriting_input=True) as pdf:
    p = pdf.pages[0]
    W, H, b = w_in * 72, h_in * 72, bleed * 72
    p.MediaBox = pikepdf.Array([0, 0, W, H])
    p.CropBox = pikepdf.Array([0, 0, W, H])
    p.BleedBox = pikepdf.Array([0, 0, W, H])
    p.TrimBox = pikepdf.Array([b, b, W - b, H - b])
    pdf.save(path)
