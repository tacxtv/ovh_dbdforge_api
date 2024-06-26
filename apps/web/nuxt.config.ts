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
    'nuxt-quasar-ui',
  ],
  quasar: {
    iconSet: 'mdi-v7',
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
  },
})
