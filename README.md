# Personal Portfolio Website

My personal portfolio at [lyfing.fr](https://lyfing.fr).

## Tech stack

- Vue 2 (Vue CLI 4) — SPA with Vuex, Vue Router, vue-i18n
- SCSS — themeable design system with `themify` mixin
- `prerender-spa-plugin` — pre-renders all 5 routes at build time for SEO without a full SSR framework
- Static files deployed and served by Nginx via GitHub Actions

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

GitHub Actions workflow at `.github/workflows/scp_deploy.yml` builds and SCP-deploys to the server on push.

## Design inspiration

- Color palette and layout inspired by [jacekjeznach.com](https://jacekjeznach.com)
- Works page modelled after [caferati.me/portfolio](https://caferati.me/portfolio)
