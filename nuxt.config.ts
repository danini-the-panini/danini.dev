import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/seo'
  ],

  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/additional.scss" as *;'
        }
      }
    }
  },

  googleFonts: {
    families: {
      Roboto: [400, 700],
      'Cherry+Bomb+One': true,
      Caveat: true
    }
  },

  image: {
    provider: 'ipx'
  },

  app: {
    head: {
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", sizes: '180x180', href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
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
      siteName: 'Dani Smith',
      siteDescription: 'Full-stack ruby developer, drama queen, 90s kid',
      defaultLocale: 'en-ZA'
    }
  },

  linkChecker: {
    failOn404: true
  },

  devtools: {
    enabled: true
  },

  experimental: {
    componentIslands: true
  },

  compatibilityDate: '2025-01-14'
})
