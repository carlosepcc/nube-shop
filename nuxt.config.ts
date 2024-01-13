// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-quasar-ui',
    '@nuxtjs/supabase',
    'nuxt-icon'
    //'@vite-pwa/nuxt'

  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
    ],
  },
  quasar: {
    config: {
      brand: {
        accent: '#DE245E',
        primary: '#847BFF',
        secondary: '#FF847C',
        negative: '#FF847C',
        positive: '#7BFF84',

      }
    },
    plugins: [
      'Dialog', 'Notify'
    ]
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
      titleTemplate: "Perversionis - %s",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sex shop for cuban people.' }
      ],
      link: [
        { rel: 'icon', type: 'image/icon', href: '/isotype.svg' }
      ]
    }
  },
  ssr: true,
  supabase: {
    redirect: false,
  }
})
