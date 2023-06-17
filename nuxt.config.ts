import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
  ],
  vite: {
    plugins: [svgLoader()]
  },
  googleFonts: {
    families: {
      Roboto: [400, 700],
      'Cherry+Bomb+One': true
    }
  },
  content: {
    navigation: {
      fields: ['publishedAt', 'tags']
    },
    highlight: {
      theme: 'github-dark',
      preload: ['bash', 'applescript', 'ruby', 'javascript', 'typescript']
    }
  }
})
