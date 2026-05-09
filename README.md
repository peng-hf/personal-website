# Personal Portfolio Website

My personal portfolio at [lyfing.dev](https://lyfing.dev).

_Note: As of May 2026, I've been using [Claude Code](https://claude.ai) to modernize this repo — it sat untouched for years and needed a refresh. It's also a good opportunity to experiment with vibe coding: letting AI handle the heavy lifting on migrations and refactors while I steer the direction._


## Tech stack

- Vue 2 (Vue CLI 4) — SPA with Vuex, Vue Router, vue-i18n
- SCSS — themeable design system with `themify` mixin
- `prerender-spa-plugin` — pre-renders all 5 routes at build time for SEO without a full SSR framework
- Static files deployed to Cloudflare Pages via GitHub Actions

## Requirements

Node 14

## Getting started

```bash
npm install
npm run serve    # dev server at localhost:8080
npm run build    # production build (pre-renders all routes via Puppeteer)
npm run lint     # ESLint with auto-fix
```

## Features

- **Home** — typewriter animation via a reusable `TypeWriterEffect` component
- **About** — career timeline (`Timeline` component)
- **Skills** — technology logos arranged in a rotating circle with a 360° rotateX hover effect (`RotatingCircle` / `RotatingCircleItem` components)
- **Works** — filterable project showcase
- **Contact** — form powered by [emailjs](https://www.emailjs.com/)
- Light / Dark theme toggle
- English / French language toggle (vue-i18n)
- Responsive layout for desktop, tablet, and mobile
- Lighthouse scores >90 for Performance, Accessibility, Best Practices, and SEO

## Deployment

GitHub Actions workflow at `.github/workflows/deploy.yml` builds the site (pre-rendering via Puppeteer) and deploys the `dist/` output to Cloudflare Pages using Wrangler on every push to `master`.

## Design inspiration

- Color palette and layout inspired by [jacekjeznach.com](https://jacekjeznach.com)
- Works page modelled after [caferati.me/portfolio](https://caferati.me/portfolio)
