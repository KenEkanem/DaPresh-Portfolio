import { defineCollection, z } from 'astro:content';
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

export const collections = { settings, hero, about, resume };
