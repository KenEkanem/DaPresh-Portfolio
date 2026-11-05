import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * All editable site content lives in src/content/ as JSON files.
 * Each "singleton" (one-off section like the hero) is its own collection
 * pointing at a single file, which maps 1:1 onto a Keystatic singleton later.
 */
const singleton = (file: string) => glob({ pattern: file, base: './src/content/site' });

const settings = defineCollection({
  loader: singleton('settings.json'),
  schema: z.object({
    siteName: z.string(),
    siteTitle: z.string(),
    description: z.string(),
    copyrightYear: z.number(),
    socials: z.object({
      behance: z.string().default(''),
      facebook: z.string().default(''),
      linkedin: z.string().default(''),
      pinterest: z.string().default(''),
      instagram: z.string().default(''),
      x: z.string().default(''),
      whatsapp: z.string().default(''),
    }),
  }),
});

const hero = defineCollection({
  loader: singleton('hero.json'),
  schema: ({ image }) =>
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      role: z.string(),
      // Path relative to hero.json, e.g. "../../assets/hero/hero-bg.jpg".
      // Leave out to use the built-in dark gradient.
      backgroundImage: image().optional(),
      backgroundAlt: z.string().default(''),
      showLogoMark: z.boolean().default(true),
    }),
});

const about = defineCollection({
  loader: singleton('about.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      linkLabel: z.string().default(''),
      linkUrl: z.string().default(''),
      paragraphs: z.array(z.string()),
      portrait: image().optional(),
      portraitAlt: z.string().default(''),
    }),
});

const resume = defineCollection({
  loader: singleton('resume.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      backgroundImage: image().optional(),
      experienceTitle: z.string(),
      experience: z.array(z.object({ company: z.string(), role: z.string(), period: z.string() })),
      softwareTitle: z.string(),
      software: z.array(
        z.object({
          name: z.string(),
          // Short label shown in the square icon, e.g. "Ps"
          badge: z.string().max(3),
          // Proficiency, 0–100
          level: z.number().min(0).max(100),
        }),
      ),
      designSkillsTitle: z.string(),
      designSkills: z.array(z.string()),
      hobbiesTitle: z.string(),
      hobbies: z.array(z.string()),
    }),
});

const brand = defineCollection({
  loader: singleton('brand.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Page 1: identity
      insightTitle: z.string(),
      insight: z.string(),
      whyTitle: z.string(),
      why: z.string(),
      taglineLabel: z.string(),
      tagline: z.string(),
      wordmark: z.string(),
      servicesTitle: z.string(),
      services: z.array(z.string()),
      // Page 2: audience and values
      audienceTitle: z.string(),
      audience: z.array(z.string()),
      hireTitle: z.string(),
      hire: z.array(z.string()),
      valuesTitle: z.string(),
      values: z.array(z.string()),
      backgroundImage: image().optional(),
    }),
});

/* ───────────── Portfolio ───────────── */

/**
 * One image slot. `ratio` ("width/height", e.g. "4/5") fixes the slot's shape, so the
 * layout stays identical whether the slot shows a placeholder or a real image.
 */
const tile = (image: SchemaContext['image']) =>
  z.object({
    image: image().optional(),
    alt: z.string().default(''),
    ratio: z.string().regex(/^\d+(\.\d+)?\/\d+(\.\d+)?$/, 'Use "width/height", e.g. "4/5"'),
    label: z.string().optional(),
  });

/** Portfolio overview page: heading + category cards. */
const portfolio = defineCollection({
  loader: singleton('portfolio.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      categories: z.array(
        z.object({
          title: z.string(),
          /** anchor of the portfolio page the card jumps to, e.g. "pf-visual-identity" */
          target: z.string(),
          cover: tile(image),
        }),
      ),
    }),
});

/**
 * Each file in src/content/portfolio/ is one full-screen portfolio page.
 * `layout` picks the arrangement (see PortfolioPage.astro).
 */
const portfolioPages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      anchor: z.string(),
      layout: z.enum(['showcase', 'duo', 'grid', 'feature-left', 'feature-center', 'justified']),
      /** grid / feature layouts: columns of small tiles on desktop */
      columns: z.number().int().min(1).max(6).default(3),
      /** columns on phones (ignored when mobile is "carousel") */
      mobileColumns: z.number().int().min(1).max(3).default(2),
      /** "carousel" = swipeable row on phones instead of a grid */
      mobile: z.enum(['grid', 'carousel']).default('grid'),
      /** relative column widths for showcase / feature layouts, measured from the PDF */
      proportions: z.array(z.number()).optional(),
      /** justified layout: how many images sit in each row */
      rows: z.array(z.number().int().min(1)).optional(),
      projects: z
        .array(
          z.object({
            heading: z.string(),
            client: z.string().optional(),
            year: z.string().optional(),
            /** duo layout: how many tiles go in the first column */
            split: z.number().int().optional(),
            items: z.array(tile(image)).min(1),
          }),
        )
        .min(1),
    }),
});

export const collections = { settings, hero, about, resume, brand, portfolio, portfolioPages };
