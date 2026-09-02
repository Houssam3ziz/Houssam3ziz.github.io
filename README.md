# houssam3ziz.github.io

Personal portfolio of **Houssam Aziz Eldein** — Mobile Software Engineer (Flutter).
Live at <https://houssam3ziz.github.io/>.

## Stack

Vanilla HTML, CSS and ES-module JavaScript. No build step, no framework, no runtime dependencies — GitHub Pages serves the files as-is.

```
index.html            page shell (semantic sections, SEO, structured data)
data/                 content as data — projects, skills, experience, site config
assets/css/
  tokens.css          design tokens, dark/light themes
  base.css            reset, typography, buttons, badges, cards
  motion.css          reveal variants, keyframes, reduced-motion policy
  components.css      loader, cursor, nav, modal, terminal, tilt/spotlight
  sections.css        per-section layout
assets/js/
  main.js             boot order
  core/               env flags, reveal observer
  components/         one module per interactive feature
```

## Editing content

* **Projects** — `data/projects.js` (ranked; `featured: true` for the large case studies).
* **Skills** — `data/skills.js` (each skill lists the project ids it links to).
* **Experience / education** — `data/experience.js`.
* **Identity, links, stats, contact form endpoint** — `data/site.js`.

Set `formEndpoint` in `data/site.js` (e.g. a Formspree URL) to send the contact form via API; when empty, the form composes an email in the visitor's mail client.

## Local preview

```
python3 -m http.server 8080
```

ES modules require an HTTP origin — opening `index.html` from the file system will not run the scripts.
