# Ali Elsayed's portfolio

Bilingual Nuxt 4 / Vue portfolio, deployed at [ali-elsayed.vercel.app](https://ali-elsayed.vercel.app).
English lives at `/`; Turkish lives at `/tr`.

## Development

Use Node.js 22.19+ within the 22.x release line and pnpm 11.24.0. The `packageManager` field pins pnpm for local installs and Vercel; the bounded Node.js engine range keeps deployments on 22.x.

```sh
pnpm install
pnpm dev
```

Portfolio entries live in `app/static/content-en.json` and `content-tr.json`.
Interface translations live in `i18n/locales/`; shared social links live in `app/static/common.json`.

## Checks

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:integration
pnpm preview
pnpm audit
```

The unit tests cover contact validation and carousel reading times. Integration tests require a production build and start a local SMTP stub; they never send external email. They verify both locales, résumé files, the sitemap, 404s, invalid input, successful SMTP acceptance, and delivery errors.

TypeScript stays on 5.9 for the Vue type-checking toolchain; evaluate a compiler major upgrade with `pnpm typecheck` before adopting it.

## Contact form

Copy `.env.example` to `.env` and configure your SMTP credentials for local development.
Set the same environment variables in the production host. Credentials are read only on the server at runtime.

The API accepts POST requests at `/api/sendMail`, validates and trims the same fields as the form, and returns `{ success: true }` after SMTP acceptance. SMTP acceptance is not a guarantee of inbox delivery.

`pnpm build` prerenders both language pages and keeps the server API. A static-only host such as GitHub Pages cannot run the contact API; use a Nitro-compatible host such as the existing Vercel deployment.

See [performance notes](PERFORMANCE_OPTIMIZATIONS.md) and [SEO checks](SEO_CHECKLIST.md).
