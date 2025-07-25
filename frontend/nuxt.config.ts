// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "node:url";
import type { NuxtPage } from "nuxt/schema";
import {getProxyUrl} from "./scripts/getProxyUrl";

const isProd = process.env.NODE_ENV === 'production';

const { API_BASE_URL } = getProxyUrl(
    isProd ? 'production' : 'development'
);

export default defineNuxtConfig({
  // Nuxt Compatibility
  compatibilityDate: "2025-02-04",
  devtools: { enabled: true },

  // Modules
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
    "nuxt-lodash",
  ],

  // Route Rules (API Proxy)
  routeRules: {
    "/api/**": {
      proxy: API_BASE_URL,
    },
  },

  // pinia: { autoImports: ["defineStore"] },
  // Project Structure
  pages: true,
  ssr: true,
  srcDir: "src/",
  alias: {
    "@src": fileURLToPath(new URL("./src", import.meta.url)),
  },

  // Vite Configurations
  vite: {
    resolve: {
      alias: {
        "@src": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            "mixed-decls",
            "color-functions",
            "global-builtin",
            "import",
            "legacy-js-api",
          ],
        },
      },
    },
  },

  // Hooks (Extending Page Meta)
  hooks: {
    "pages:extend": (pages: NuxtPage[]) => {
      const authRoutesNoAuth = ["/auth/register", "/auth/login"];

      function applyMetaToRoutes(routes: NuxtPage[]) {
        for (const route of routes) {
          route.meta = authRoutesNoAuth.includes(route.path)
              ? { layout: "auth", requiresAuth: false }
              : { layout: "dashboard", requiresAuth: true };

          if (route.children) {
            applyMetaToRoutes(route.children);
          }
        }
      }

      applyMetaToRoutes(pages);
    },
  },
});
