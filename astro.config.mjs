// @ts-check
import { defineConfig, envField } from "astro/config";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Pages are prerendered; only the /api routes opt out with `prerender = false`.
  output: "static",
  adapter: vercel(),
  // The review step was folded into /cart.
  redirects: {
    "/checkout": "/cart",
  },
  integrations: [icon()],
  // Inline the (small) stylesheet so first paint doesn't wait on a separate request.
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      BARAY_API_KEY: envField.string({ context: "server", access: "secret" }),
      BARAY_SK: envField.string({ context: "server", access: "secret" }),
      BARAY_IV: envField.string({ context: "server", access: "secret" }),
      // Public origin used for Baray's success redirect. Falls back to the request origin.
      SITE_URL: envField.string({ context: "server", access: "public", optional: true }),
    },
  },
});
