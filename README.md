# XplicitDesign: Okem Precious portfolio

Astro site for the Okem Precious / XplicitDesign portfolio. It's built in stages:

1. **Header and hero** (done)
2. **About and Resumé** (done)
3. **Brand** (done)
4. Portfolio (category cards, projects, galleries)
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


## Deploying on Render (stages 1 to 5)

Create a **Static Site** with build command `npm install && npm run build` and publish directory `dist`.
