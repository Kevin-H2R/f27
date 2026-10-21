#!/bin/sh
# posts/<slug>.md -> <slug>.html via template.html. Front matter: first 3 lines "title:", "description:", "date:".
# Also rewrites sitemap.xml and the guides list in index.html.
cd "$(dirname "$0")"
list=""; urls='<url><loc>https://kevin-h2r.github.io/f27/</loc><lastmod>'$(date +%F)'</lastmod></url>'
for md in posts/*.md; do
  slug=$(basename "$md" .md)
  title=$(sed -n '1s/^title: //p' "$md"); desc=$(sed -n '2s/^description: //p' "$md"); date=$(sed -n '3s/^date: //p' "$md")
  body=$(tail -n +4 "$md" | npx -y marked --gfm | sed "s|^<h1>\(.*\)</h1>|<h1>\1</h1><p class=\"byline\">By Kevin Herrbach · Updated $date</p>|")
  python3 - "$slug" "$title" "$desc" "$body" <<'PY'
import sys;slug,title,desc,body=sys.argv[1:]
t=open('template.html').read()
for k,v in [('slug',slug),('title',title),('description',desc),('body',body)]: t=t.replace('{{'+k+'}}',v)
open(slug+'.html','w').write(t)
PY
  list="$list<li><a href=\"$slug.html\">$title</a></li>"
  urls="$urls<url><loc>https://kevin-h2r.github.io/f27/$slug.html</loc><lastmod>$date</lastmod></url>"
done
printf '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">%s</urlset>\n' "$urls" > sitemap.xml
python3 - "$list" <<'PY'
import sys,re;s=open('index.html').read()
s=re.sub(r'<ul class="guides" id="guides">.*?</ul>','<ul class="guides" id="guides">'+sys.argv[1]+'</ul>',s,flags=re.S)
open('index.html','w').write(s)
PY
echo built
