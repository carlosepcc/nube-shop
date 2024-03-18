// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-quasar-ui",
    "@nuxtjs/supabase",
    "@nuxtjs/seo",
    "@nuxtjs/sitemap",
    "nuxt-icon",
    "@nuxt/image",
    //'@vite-pwa/nuxt'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
    ],
  },
  quasar: {
    config: {
      brand: {
        accent: "#DE245E",
        primary: "#847BFF",
        secondary: "#FF847C",
        negative: "#FF847C",
        positive: "#7BFF84",
      },
    },
    plugins: ["Dialog", "Notify"],
  },
  css: [
    // 'vuetify/styles/main.sass',
    // '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    // transpile: ["vuetify"]
  },
  app: {
    head: {
      titleTemplate: "%s %separator Perversionis",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Juguetes para adultos y otros artículos sexuales en Pinar del Río, Cuba. Haga su encargo.",
        },
      ],
      link: [{ rel: "icon", type: "image/icon", href: "/isotype.svg" }],
    },
  },
  site: {
    url: "https://pvs.surge.sh/",
    name: "Perversionis",
    description:
      "Juguetes para adultos y otros artículos sexuales en Pinar del Río, Cuba. Haga su encargo.",
    defaultLocale: "en",
    identity: {
      type: "Shop",
    },
  },
  ssr: true,
  supabase: {
    redirect: false,
  },
});
