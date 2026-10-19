# f27 — F-2-7 points calculator

Static site. `index.html` + `score.js`. Test: `node test.mjs`.

Before deploy, fill the `CONFIG` block at the bottom of `index.html` (Gumroad, Ko-fi, Coupang links) and the canonical URL in `<head>`.

Deploy: `gh repo create f27 --public --source=. --push`, then enable GitHub Pages on `main` in repo settings.
Local preview: `python3 -m http.server 8000` then open http://localhost:8000
