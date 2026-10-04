// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: "Ali Elsayed | AI Systems Engineer",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "AI Systems Engineer building intelligent applications, machine learning solutions, and scalable backend systems with Python, TensorFlow, NestJS, and GraphQL.",
        },
        {
          name: "keywords",
          content:
            "Ali Elsayed, AI Systems Engineer, AI Engineer, Machine Learning, TensorFlow, Vue.js, React, NestJS, Python, GraphQL, Elasticsearch, Istanbul, Turkey",
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
            "Ali Elsayed | AI Systems Engineer",
        },
        {
          property: "og:description",
          content:
            "AI Systems Engineer building intelligent applications, machine learning solutions, and scalable backend systems with Python, TensorFlow, NestJS, and GraphQL.",
        },
        { property: "og:site_name", content: "Ali Elsayed Portfolio" },
        {
          property: "og:image",
          content: "https://ali-elsayed.vercel.app/og-image-ai-systems.jpg",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "Ali Elsayed - AI Systems Engineer",
        },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://ali-elsayed.vercel.app/og-image-ai-systems.jpg",
        },
        {
          name: "twitter:title",
          content:
            "Ali Elsayed | AI Systems Engineer",
        },
        {
          name: "twitter:description",
          content:
            "AI Systems Engineer building intelligent applications, machine learning solutions, and scalable backend systems with Python, TensorFlow, NestJS, and GraphQL.",
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
            jobTitle: "AI Systems Engineer",
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
              "AI Systems Engineering",
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
