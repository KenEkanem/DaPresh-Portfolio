# XplicitDesign: Okem Precious portfolio

Astro site for the Okem Precious / XplicitDesign portfolio. It's built in stages:

1. **Header and hero** (done)
2. **About and Resumé** (done)
3. **Brand** (done)
4. **Portfolio** (layouts done with placeholder images; real work to be added)
5. Contact (static)
6. Admin editor at `/keystatic` (GitHub login, deployed on Render)

## Run it

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check and build to dist/
```

## Editing content

All editable content lives in `src/content/site/` as JSON. There's no content in the component code. The stage 6 admin will edit these same files.

| File | Controls |
| --- | --- |
| `settings.json` | Site title, description, copyright year, social links (leave a link `""` to hide its icon) |
| `hero.json` | Name, role, hero background image, show/hide the logo mark |
| `about.json` | About title, Behance link, bio paragraphs, portrait |
| `resume.json` | Experience timeline, software skills (`badge` is the 2-letter icon text, `level` is 0–100), design skills, hobbies, background image |
| `brand.json` | Brand page 1 (insight, why, tagline, wordmark, services) and page 2 (who we work for, why hire us, core values, background image) |
| `portfolio.json` | Portfolio overview: title and the 4 category cards (`target` = the page a card jumps to) |
| `src/content/portfolio/*.json` | One file per portfolio page (see below) |

### Portfolio pages

Each file in `src/content/portfolio/` is one full-screen page, shown in `order`. Every image slot has a `ratio` ("width/height", measured from the PDF) that fixes its shape. Until you add an `image`, the slot shows a placeholder with the ratio printed on it, so you know what size to export the real image at.

To add a real image, put it in `src/assets/portfolio/` and add `"image": "../../assets/portfolio/your-file.jpg"` and an `alt` text to that slot. The layout won't change.

| `layout` | Arrangement | Used for |
| --- | --- | --- |
| `showcase` | Heading and 2 tiles on the left, big tile on the right, row of tiles below | Visual identity (one project) |
| `duo` | Two projects side by side; `split` is how many tiles go in the first column | Visual identity (two projects) |
| `grid` | Equal columns (`columns`, `mobileColumns`) | Logo marks, book covers, events, packaging |
| `feature-left` | Heading and big tile on the left, small grid on the right | Social media |
| `feature-center` | 2 tiles, big tile, 2 tiles | Social media |
| `justified` | Rows of mixed widths with equal height (`rows` = tiles per row) | Events, stationery |

`"mobile": "carousel"` turns a grid into a swipeable row on phones.


## Deploying on Render (stages 1 to 5)

Create a **Static Site** with build command `npm install && npm run build` and publish directory `dist`.
