"""Shape text with HarfBuzz and emit SVG path outlines (JSON in/out via stdin/stdout).
Input: [{"font": "<woff2 path>", "text": "...", "size": 100}] -> [{"d": "...", "width": w}]"""
import io, json, sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

cache = {}
def load(fp):
    if fp not in cache:
        tt = TTFont(fp); tt.flavor = None
        buf = io.BytesIO(); tt.save(buf)
        face = hb.Face(buf.getvalue()); font = hb.Font(face)
        cache[fp] = (tt, font, tt['head'].unitsPerEm)
    return cache[fp]

out = []
for job in json.load(sys.stdin):
    tt, font, upm = load(job['font'])
    b = hb.Buffer(); b.add_str(job['text']); b.guess_segment_properties()
    hb.shape(font, b, {'kern': True, 'liga': True})
    gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
    sc = job['size'] / upm; x = 0; d = ''
    ls = job.get('ls', 0) / sc
    for info, pos in zip(b.glyph_infos, b.glyph_positions):
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (sc, 0, 0, -sc, (x + pos.x_offset) * sc, -pos.y_offset * sc))
        gs[order[info.codepoint]].draw(tp)
        d += pen.getCommands()
        x += pos.x_advance + ls
    out.append({'d': d, 'width': (x - ls) * sc})
json.dump(out, sys.stdout)
