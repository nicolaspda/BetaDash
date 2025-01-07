// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@primevue/nuxt-module", "@nuxtjs/google-fonts", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  googleFonts: {
    families: { Inter: [400, 700] },
  },
  primevue: {
    importTheme: { from: "@/themes/mytheme.js" },
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "system",
        },
      },
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});