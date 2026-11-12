"""Sets PDF document metadata (title, author, subject, language)."""
import sys
import pikepdf

path, title, author, subject = sys.argv[1:5]
with pikepdf.open(path, allow_overwriting_input=True) as pdf:
    with pdf.open_metadata() as meta:
        meta['dc:title'] = title
        if author:
            meta['dc:creator'] = [author]
        meta['dc:description'] = subject
        meta['dc:language'] = ['en-GB']
    pdf.docinfo['/Title'] = title
    pdf.docinfo['/Subject'] = subject
    if author:
        pdf.docinfo['/Author'] = author
    pdf.Root.Lang = pikepdf.String('en-GB')
    pdf.Root.ViewerPreferences = pikepdf.Dictionary(DisplayDocTitle=True)
    pdf.save(path)
