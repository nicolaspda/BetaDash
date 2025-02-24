// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  modules: ["@primevue/nuxt-module", "@nuxtjs/google-fonts", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  googleFonts: {
    families: { Inter: [400, 700] },
  },
  primevue: {
    importTheme: { from: "@/themes/mytheme.js" },
    options: {
      ripple: true,
      inputVariant: "filled",
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