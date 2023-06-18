import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
  ],

  extends: [
    'nuxt-seo-kit'
  ],

  vite: {
    plugins: [svgLoader()]
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
      ]
    }
  },

  googleFonts: {
    families: {
      Roboto: [400, 700],
      'Cherry+Bomb+One': true,
      Caveat: true
    }
  },

  app: {
    head: {
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", sizes: '180x180', href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" }
      ]
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
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://danini.dev',
      siteName: 'danini.dev',
      siteDescription: 'Personal website of Dani Smith',
      language: 'en-ZA'
    }
  },

  linkChecker: {
    failOn404: true
  },

  devtools: {
    enabled: true
  }
})
