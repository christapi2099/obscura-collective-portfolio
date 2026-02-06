// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,

  /**
   * Nuxt.js modules
   */
  modules: [
    // Doc: https://tailwindcss.nuxtjs.org/
    "@nuxtjs/tailwindcss",

    // Doc: https://image.nuxtjs.org/
    "@nuxt/image-edge",

    // Doc: https://content.nuxtjs.org/
    "@nuxt/content",

    // Doc: https://vueuse.org/guide/#installation
    "@vueuse/nuxt",

    // Doc: https://color-mode.nuxtjs.org/
    "@nuxtjs/color-mode",

    // Doc: https://github.com/nuxt-modules/icon
    "nuxt-icon",
  ],

  /**
   * <link rel="preconnect" href="https://fonts.googleapis.com">
   * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
   */
  app: {
    head: {
      title: "Obscura Collective Studios LLC",
      meta: [
        {
          name: "description",
          content:
            "Obscura Collective Studios LLC - Professional photography services in Long Beach, California including weddings, couples, portraits, graduation, and gym photography.",
        },
        { property: "og:title", content: "Obscura Collective Studios LLC" },
        {
          property: "og:description",
          content:
            "Professional photography services in Long Beach, California including weddings, couples, portraits, graduation, and gym photography.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Obscura Collective Studios LLC" },
        { property: "og:image", content: "/img/home/hero-grid-01.webp" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Obscura Collective Studios LLC" },
        {
          name: "twitter:description",
          content:
            "Professional photography services in Long Beach, California including weddings, couples, portraits, graduation, and gym photography.",
        },
        { name: "twitter:image", content: "/img/home/hero-grid-01.webp" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Obscura Collective Studios LLC",
            description:
              "Professional photography services in Long Beach, California including weddings, couples, portraits, graduation, and gym photography.",
            email: "obscuracollective.media@gmail.com",
            image: "/img/home/hero-grid-01.webp",
            priceRange: "$$",
            additionalType: "https://schema.org/Photographer",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Long Beach",
              addressRegion: "CA",
              addressCountry: "US",
            },
            areaServed: {
              "@type": "City",
              name: "Long Beach, California",
            },
          }),
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Dancing+Script:wght@400;700&family=Poppins:ital,wght@0,100;0,400;0,600;0,700;1,400&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },

  content: {
    // https://content.nuxtjs.org/api/configuration
    documentDriven: true,
    markdown: {
      anchorLinks: false,
    },
  },

  colorMode: {
    classSuffix: "",
  },

  tailwindcss: {
    cssPath: "./assets/css/tailwind.css",
  },

  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },

  compatibilityDate: "2025-04-09",
});
