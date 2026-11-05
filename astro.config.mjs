// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// Static output for now (deployable as a Render Static Site).
// Stage 6 (Keystatic admin) will switch to the Node adapter.
export default defineConfig({
  integrations: [icon()],
});
