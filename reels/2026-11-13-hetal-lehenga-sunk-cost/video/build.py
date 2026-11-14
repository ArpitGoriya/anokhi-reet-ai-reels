"""Builds video.html (for Marketing Studio export) and preview.html (local check, ?t=seconds)."""
import pathlib, re
D = pathlib.Path(__file__).parent
css = (D/'style.css').read_text(encoding='utf-8')
js = '\n'.join((D/f).read_text(encoding='utf-8') for f in ['lib.js', 'captions.js', 'main.js', 'scenes.js'])
DEFS = '''<defs>
<radialGradient id="glow"><stop offset="0" stop-color="#F8D36A" stop-opacity=".55"/><stop offset="1" stop-color="#F8D36A" stop-opacity="0"/></radialGradient>
<linearGradient id="mar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9A0000"/><stop offset="1" stop-color="#5D0000"/></linearGradient>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A16F35"/><stop offset=".18" stop-color="#F8D36A"/><stop offset=".72" stop-color="#F8D36A"/><stop offset="1" stop-color="#9A6A36"/></linearGradient>
</defs>'''
BODY = f'''<div id="stage"><svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">{DEFS}<g id="scenes"></g></svg>
<div id="ui"><div id="cap"></div><div id="wm"><img src="brand:seal-on-maroon">Anokhi Reet</div></div></div>'''
LOOP = '''
build();
const __t0 = performance.now();
window.__seek = t => render(t);
const __q = new URLSearchParams(location.search).get('t');
if (__q !== null) { render(parseFloat(__q)); }
else { (function loop() { const t = (window.ms && ms.time) ? ms.time() : (performance.now() - __t0) / 1000; render(t); requestAnimationFrame(loop); })(); }
'''
video = f'<style>\n{css}\n</style>\n{BODY}\n<script>\n{js}\n{LOOP}\n</script>\n'
(D/'video.html').write_text(video, encoding='utf-8')
brand = (D/'../../../brand').resolve()
fonts = f'''@font-face{{font-family:Inter;src:url("{(brand/'fonts/Inter-Variable.ttf').as_uri()}");font-weight:100 900}}'''
prev = video.replace('brand:seal-on-maroon', (brand/'logos/seal-on-maroon.svg').as_uri()).replace('<style>', '<style>\n' + fonts, 1)
prev = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=1080">' + prev
(D/'preview.html').write_text(prev, encoding='utf-8')
# small export page that loads the code from the Marketing Studio Inbox
import os
# Marketing Studio's Inbox folder (shown by its `status` tool); set MS_INBOX if yours is elsewhere
INBOX = pathlib.Path(os.environ.get('MS_INBOX', pathlib.Path.home() / 'Desktop/Anokhi Reet/Anokhi Reet/Branding/Marketing Studio/Inbox'))
(INBOX/'hetal-reel.js').write_text(js + '\n' + LOOP, encoding='utf-8')
small = f'<style>\n{css}\n</style>\n{BODY}\n<script src="inbox:hetal-reel.js"></script>\n'
(D/'video-small.html').write_text(small, encoding='utf-8')
print('ok', len(video), len(small))

# ----- reel cover (still image) -----
cjs = '\n'.join((D/f).read_text(encoding='utf-8') for f in ['lib.js', 'captions.js', 'main.js', 'scenes.js', 'cover.js'])
(INBOX/'hetal-cover.js').write_text(cjs, encoding='utf-8')
(D/'cover-small.html').write_text(f'<style>\n{css}\n</style>\n{BODY}\n<script src="inbox:hetal-cover.js"></script>\n', encoding='utf-8')
cprev = f'<!doctype html><meta charset="utf-8"><style>\n{fonts}\n{css}\n</style>\n{BODY}\n<script>\n{cjs}\n</script>\n'
cprev = cprev.replace('brand:seal-on-maroon', (brand/'logos/seal-on-maroon.svg').as_uri())
(D/'cover-preview.html').write_text(cprev, encoding='utf-8')
print('cover ok')
