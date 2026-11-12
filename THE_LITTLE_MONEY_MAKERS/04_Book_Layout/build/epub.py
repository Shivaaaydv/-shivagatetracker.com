"""Builds the fixed-layout EPUB 3 and Kindle Create inputs from the digital PDF.
Usage: python3 -I epub.py <project_root> [author]"""
import datetime
import html
import os
import shutil
import subprocess
import sys
import uuid
import zipfile

import pymupdf

ROOT = sys.argv[1]
AUTHOR = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] else None
SRC = os.path.join(ROOT, '05_Final_PDF', 'The_Little_Money_Makers_Digital_Edition.pdf')
OUT = os.path.join(ROOT, '06_Kindle_Edition')
TITLE = 'The Little Money Makers: A Journey to a Smarter Future'
PX = 1600
os.makedirs(OUT, exist_ok=True)

# 1) Kindle Create import files
shutil.copy(SRC, os.path.join(OUT, 'Kindle_Create_Import_The_Little_Money_Makers.pdf'))
img_dir = os.path.join(OUT, 'Kindle_Page_Images_2048px')
shutil.rmtree(img_dir, ignore_errors=True)
os.makedirs(img_dir)
subprocess.run(['pdftoppm', '-jpeg', '-jpegopt', 'quality=90', '-scale-to', '2048', SRC, os.path.join(img_dir, 'page')], check=True)

# 2) fixed-layout EPUB 3
work = os.path.join(ROOT, '04_Book_Layout', 'build', 'epub_work')
shutil.rmtree(work, ignore_errors=True)
os.makedirs(os.path.join(work, 'META-INF'))
oebps = os.path.join(work, 'OEBPS')
os.makedirs(os.path.join(oebps, 'images'))
os.makedirs(os.path.join(oebps, 'pages'))
subprocess.run(['pdftoppm', '-jpeg', '-jpegopt', 'quality=86', '-scale-to', str(PX), SRC, os.path.join(oebps, 'images', 'p')], check=True)
imgs = sorted(f for f in os.listdir(os.path.join(oebps, 'images')) if f.endswith('.jpg'))
cover_src = os.path.join(ROOT, '08_Cover_Design', 'Ebook_Cover_2560x2560.jpg')
subprocess.run(['convert', cover_src, '-resize', f'{PX}x{PX}', '-quality', '88', os.path.join(oebps, 'images', 'cover.jpg')], check=True)

doc = pymupdf.open(SRC)
texts, titles = [], []
for p in doc:
    t = ' '.join(p.get_text().split())
    texts.append(t)
    blocks = [b for b in p.get_text('dict')['blocks'] if b.get('type') == 0]
    big = max((s for b in blocks for l in b['lines'] for s in l['spans']), key=lambda s: s['size'], default=None)
    titles.append(big['text'].strip() if big else '')

def page_xhtml(title, img, alt):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en-GB" lang="en-GB">
<head><meta charset="UTF-8"/><title>{html.escape(title)}</title><meta name="viewport" content="width={PX}, height={PX}"/>
<style>html,body{{margin:0;padding:0;width:{PX}px;height:{PX}px;overflow:hidden}} img{{display:block;width:{PX}px;height:{PX}px}}</style></head>
<body><img src="../images/{img}" alt="{html.escape(alt)}"/></body></html>'''

items, spine = [], []
with open(os.path.join(oebps, 'pages', 'cover.xhtml'), 'w') as fh:
    fh.write(page_xhtml('Cover', 'cover.jpg', TITLE + '. Front cover: Aarav and his little sister Anya cheer beside a red bicycle, a pink piggy bank, books and coins.'))
items.append('<item id="cover-page" href="pages/cover.xhtml" media-type="application/xhtml+xml"/>')
spine.append('<itemref idref="cover-page" properties="rendition:page-spread-center"/>')
nav_entries = ['<li><a href="pages/cover.xhtml">Cover</a></li>']
for i, img in enumerate(imgs):
    n = i + 1
    title = titles[i] if n > 1 else 'Title page'
    alt = texts[i] or title
    name = f'page{n:02d}.xhtml'
    with open(os.path.join(oebps, 'pages', name), 'w') as fh:
        fh.write(page_xhtml(f'Page {n}', img, alt))
    items.append(f'<item id="pg{n}" href="pages/{name}" media-type="application/xhtml+xml"/>')
    items.append(f'<item id="img{n}" href="images/{img}" media-type="image/jpeg"/>')
    spine.append(f'<itemref idref="pg{n}"/>')
    if title:
        nav_entries.append(f'<li><a href="pages/{name}">{html.escape(title)}</a></li>')

with open(os.path.join(oebps, 'nav.xhtml'), 'w') as fh:
    fh.write(f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en-GB" lang="en-GB">
<head><meta charset="UTF-8"/><title>Contents</title></head><body>
<nav epub:type="toc" id="toc"><h1>Contents</h1><ol>{''.join(nav_entries)}</ol></nav>
<nav epub:type="landmarks" hidden=""><ol><li><a epub:type="cover" href="pages/cover.xhtml">Cover</a></li><li><a epub:type="bodymatter" href="pages/page02.xhtml">Start of story</a></li></ol></nav>
</body></html>''')

now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
book_id = 'urn:uuid:' + str(uuid.uuid5(uuid.NAMESPACE_URL, 'the-little-money-makers-first-edition'))
creator = f'<dc:creator id="author">{html.escape(AUTHOR)}</dc:creator>' if AUTHOR else ''
opf = f'''<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="en-GB" prefix="rendition: http://www.idpf.org/vocab/rendition/#">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">{book_id}</dc:identifier>
<dc:title>{html.escape(TITLE)}</dc:title>{creator}
<dc:language>en-GB</dc:language>
<dc:description>A warm, illustrated story about money, habits and kindness for children aged 6–10, with printable activity worksheets.</dc:description>
<dc:subject>Juvenile Nonfiction / Business &amp; Economics</dc:subject>
<meta property="dcterms:modified">{now}</meta>
<meta property="rendition:layout">pre-paginated</meta>
<meta property="rendition:orientation">auto</meta>
<meta property="rendition:spread">none</meta>
<meta property="schema:accessMode">visual</meta>
<meta property="schema:accessMode">textual</meta>
<meta property="schema:accessModeSufficient">visual</meta>
<meta property="schema:accessibilityFeature">alternativeText</meta>
<meta property="schema:accessibilityHazard">none</meta>
<meta property="schema:accessibilitySummary">Fixed-layout picture book. Each page image carries the full page text as alternative text.</meta>
<meta name="cover" content="cover-img"/>
<meta name="original-resolution" content="{PX}x{PX}"/>
<meta name="book-type" content="children"/>
<meta name="fixed-layout" content="true"/>
</metadata>
<manifest>
<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="cover-img" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>
{chr(10).join(items)}
</manifest>
<spine>
{chr(10).join(spine)}
</spine>
</package>'''
with open(os.path.join(oebps, 'content.opf'), 'w') as fh:
    fh.write(opf)
with open(os.path.join(work, 'META-INF', 'container.xml'), 'w') as fh:
    fh.write('<?xml version="1.0" encoding="UTF-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>')

epub = os.path.join(OUT, 'The_Little_Money_Makers_Fixed_Layout.epub')
with zipfile.ZipFile(epub, 'w') as z:
    z.writestr(zipfile.ZipInfo('mimetype'), 'application/epub+zip', compress_type=zipfile.ZIP_STORED)
    for base, _, files in os.walk(work):
        for fn in sorted(files):
            full = os.path.join(base, fn)
            rel = os.path.relpath(full, work)
            z.write(full, rel, compress_type=zipfile.ZIP_DEFLATED)
shutil.rmtree(work)
print('epub', epub, round(os.path.getsize(epub) / 1e6, 1), 'MB')
