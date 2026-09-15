# SEO verification

## Implemented

- English and Turkish titles, descriptions, and document language.
- Locale-aware canonical, alternate-language, and Open Graph locale links through Nuxt i18n.
- Open Graph and Twitter preview image at `/og-image.jpg`.
- Person structured data in `nuxt.config.ts`.
- `/sitemap.xml` lists the real routes `/` and `/tr`.
- `/robots.txt` references the sitemap.
- Portfolio content renders on the server.
- Section navigation links use stable anchors; résumé links match the filenames in `public/`.

## After deployment

- Confirm both language pages return 200 and unknown routes return 404.
- Inspect title, description, canonical, alternate-language links, and social image URLs in both locales.
- Check structured data with Google's Rich Results Test or Schema.org Validator.
- Submit the sitemap through the site's existing search-console accounts.
- Measure performance and SEO with Lighthouse. These files do not establish indexing status or a score.
