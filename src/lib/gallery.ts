import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/** One portfolio tile, as stored in the content JSON. */
export interface GalleryItem {
  image?: ImageMetadata;
  alt: string;
  ratio: string;
  label?: string;
  title?: string;
  client?: string;
  date?: string;
}

/** Project details used as a caption fallback for items that have none of their own. */
export interface GalleryProject {
  heading: string;
  title?: string;
  client?: string;
  date?: string;
}

/** What the full-screen viewer needs for one slide (serialised to JSON in the page). */
export interface Slide {
  src?: string;
  srcset?: string;
  ratio: number;
  alt: string;
  label?: string;
  caption: string;
  meta: string;
}

export const ratioOf = (ratio: string) => {
  const [w, h] = ratio.split('/').map(Number);
  return w / h;
};

/** Build viewer slides for a list of tiles, generating large optimised images at build time. */
export async function toSlides(items: GalleryItem[], project: GalleryProject): Promise<Slide[]> {
  return Promise.all(
    items.map(async (it) => {
      const caption = it.title ?? project.title ?? project.heading;
      const meta = [it.client ?? project.client, it.date ?? project.date].filter(Boolean).join(' · ');
      const base = { ratio: ratioOf(it.ratio), alt: it.alt, label: it.label, caption, meta };
      if (!it.image) return base;
      const widths = [800, 1600, 2400].filter((w) => w < it.image!.width).concat(it.image.width);
      const img = await getImage({ src: it.image, widths, format: 'webp' });
      return { ...base, src: img.src, srcset: img.srcSet.attribute };
    }),
  );
}

/** JSON that is safe to drop inside a <script> tag. */
export const safeJson = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
