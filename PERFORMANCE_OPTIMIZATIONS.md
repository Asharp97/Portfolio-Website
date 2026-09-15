# Performance notes

## Current implementation

- Cards and form markup render on the server; portfolio content is visible before client hydration.
- The decorative mouse follower mounts only at desktop widths. Mobile widths use a static hero heading.
- Swiper is used for portfolio slides. The form uses ordinary Vue state and Nuxt UI validation.
- Slide-specific reading times have a three-second minimum.
- Nuxt UI manages fonts, icons, and color mode. Icons use a single local Lucide collection.
- The noise texture loads during idle time, with a timer fallback and cleanup on unmount.
- Nuxt/Vite handle chunking and minification. Nitro compresses public assets and prerenders both locales.
- Reduced-motion settings disable the moving noise overlay.

## Verification

Run `pnpm build` and `pnpm preview`. Check both locales at mobile and desktop widths:
hero visibility, slide pagination/swiping, language/theme switching, and contact validation.

Measure Lighthouse and real-device performance after deployment. No current Lighthouse score or Core Web Vitals improvement is claimed by these notes. Earlier estimates were not measured results.
