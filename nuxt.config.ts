// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: "Ali Elsayed | Machine Learning & Full-Stack Software Engineer",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Machine Learning & Full-Stack Software Engineer with 4+ years of experience. Specialized in TensorFlow, Vue.js, React, NestJS, and Python. Building smart, scalable applications in Istanbul.",
        },
        {
          name: "keywords",
          content:
            "Ali Elsayed, Software Engineer, Machine Learning Engineer, Full-Stack Developer, TensorFlow, Vue.js, React, NestJS, Python, GraphQL, Elasticsearch, Istanbul, Turkey",
        },
        { name: "author", content: "Ali Elsayed" },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        {
          name: "google-site-verification",
          content: "WItrFIBRQFf9GZq7qZkZwRQGjbywQL92ftMXB-xi5KI",
        },

        // Open Graph (Facebook, LinkedIn)
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content:
            "Ali Elsayed | Machine Learning & Full-Stack Software Engineer",
        },
        {
          property: "og:description",
          content:
            "Machine Learning & Full-Stack Software Engineer with 4+ years of experience building smart, scalable applications with TensorFlow, Vue.js, React, and Python.",
        },
        { property: "og:site_name", content: "Ali Elsayed Portfolio" },
        {
          property: "og:image",
          content: "https://ali-elsayed.vercel.app/og-image.jpg",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "Ali Elsayed - Machine Learning & Full-Stack Software Engineer",
        },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://ali-elsayed.vercel.app/og-image.jpg",
        },
        {
          name: "twitter:title",
          content:
            "Ali Elsayed | Machine Learning & Full-Stack Software Engineer",
        },
        {
          name: "twitter:description",
          content:
            "Machine Learning & Full-Stack Software Engineer specialized in TensorFlow, Vue.js, React, NestJS, and Python.",
        },

        // Additional SEO
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ali Elsayed",
            jobTitle: "Machine Learning & Full-Stack Software Engineer",
            url: "https://ali-elsayed.vercel.app",
            sameAs: [
              "https://github.com/Asharp97",
              "https://www.linkedin.com/in/ali-elsayed-25974b130/",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Istanbul",
              addressCountry: "TR",
            },
            alumniOf: [
              {
                "@type": "EducationalOrganization",
                name: "Doğuş University",
                url: "https://www.dogus.edu.tr/",
              },
            ],
            knowsAbout: [
              "Machine Learning",
              "TensorFlow",
              "Vue.js",
              "React",
              "NestJS",
              "Python",
              "GraphQL",
              "Elasticsearch",
              "Full-Stack Development",
            ],
          }),
        },
      ],
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "motion-v/nuxt",
    "@vercel/analytics/nuxt",
    "@vercel/speed-insights/nuxt",
  ],
  fonts: {
    defaults: {
      fallbacks: {
        "sans-serif": ["system-ui"],
      },
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "tr", language: "tr-TR", file: "tr.json" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    baseUrl: "https://ali-elsayed.vercel.app",
  },
  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": {
      prerender: true,
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/tr", "/sitemap.xml"],
    },
  },

  compatibilityDate: "2025-07-15",
});
