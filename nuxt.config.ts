// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable if needed set to ture -> { enabled: ture }
  // https://nuxt.com/modules/devtools
  devtools: { enabled: false },

  typescript: {
    strict: true,
  },

  compatibilityDate: "2025-07-15",

  app: {
    head: {
      title: "Africa Passport",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "msapplication-TileColor", content: "#FFD700" },
        { name: "theme-color", content: "#FFFFFF" },
        {
          name: "description",
          content: "A vision of a united Africa with a common passport.",
        },
      ],
    },
  },

  modules: [
    // https://eslint.nuxt.com/packages/module#quick-setup
    "@nuxt/eslint",
    // https://tailwindcss.nuxtjs.org/getting-started/installation
    "@nuxtjs/tailwindcss",
    // https://github.com/nuxt/fonts?tab=readme-ov-file
    "@nuxt/fonts",
    // https://nuxtseo.com/nuxt-seo/getting-started/installation
    '@nuxtjs/seo',
  ],

  // https://tailwindcss.nuxt.dev/getting-started/options#csspath
  tailwindcss: {
    cssPath: "~/assets/scss/tailwind.scss",
  },

  // https://nitro.unjs.io/config
  nitro: {
    minify: true,
    // https://nitro.unjs.io/config#compresspublicassets
    compressPublicAssets: { gzip: true, brotli: true },
  },

  // https://nuxt.com/docs/guide/going-further/runtime-config
  runtimeConfig: {
    apiSecret: "", // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: "", // can be overridden by NUXT_PUBLIC_API_BASE environment variable

      // TODO. Set up a custom domain later
      siteurl: "https://africa-passport.netlify.app/",
    },
  },

  site: {
    // TODO. Set up a custom domain later
    url: "https://africa-passport.netlify.app/",
    name: "Africa Passport",
    // TODO. not needed if you have @nuxtjs/i18n installed
    defaultLocale: "en",
  },
});
