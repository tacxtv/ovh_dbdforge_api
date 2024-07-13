import { defineNuxtConfig } from 'nuxt/config'
import pugPlugin from 'vite-plugin-pug'

export default defineNuxtConfig({
  ssr: false,
  telemetry: false,
  pages: true,
  srcDir: 'src',
  debug: !!process.env.DEBUG,
  css: [
    '~/assets/styles/global.sass',
  ],
  components: {
    global: true,
    dirs: [{ path: '~/components', prefix: 'q-custom' }],
  },
  modules: [
    '@nuxt-alt/auth',
    '@nuxt-alt/http',
    '@pinia/nuxt',
    'nuxt-quasar-ui',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    '@nuxt/devtools',
  ],
  http: {
    debug: process.env.NODE_ENV === 'development',
    browserBaseURL: process.env.DBDFORGE_API_URL,
    baseURL: process.env.DBDFORGE_API_URL,
  },
  dayjs: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    defaultTimezone: 'Paris',
    plugins: ['timezone', 'relativeTime'],
  },
  quasar: {
    iconSet: 'mdi-v7',
    cssAddon: true,
    config: {
      dark: 'auto',
      brand: {
        primary: '#832b28',
        secondary: '#832b28',
        accent: '#9c27b0',
        dark: '#1a1a1a',
        'dark-page': '#121212',
        positive: '#21ba45',
        negative: '#ff3860',
        info: '#31ccec',
        warning: '#f2c037',
      },
    },
    plugins: ['Dialog', 'Notify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': process.env.NODE_ENV === 'development',
    },
    plugins: [
      pugPlugin(<any>{
        pretty: true,
        compilerOptions: {},
      }),
    ],
  },
})
