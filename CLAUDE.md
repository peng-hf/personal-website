# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Planning rules

Every plan or phase list must include a step to update relevant documentation (README.md, CLAUDE.md, or any other doc affected by the change). Documentation updates belong in the phase where the change is made, not deferred to a catch-all final phase.

## Commands

```bash
npm run serve    # dev server at localhost:8080
npm run build    # production build with pre-rendering (requires Puppeteer)
npm run lint     # ESLint with auto-fix
```

> **Node 14** is required (per README). The build pre-renders all 5 routes via `prerender-spa-plugin` + Puppeteer; this only runs in `NODE_ENV=production`.

## Architecture

**Stack:** Vue 2 SPA (Vue CLI 4), Vuex, Vue Router, vue-i18n, SCSS/SASS, deployed as static files served by Cloudflare Pages.

**App shell (`App.vue`):** Registers all five views as dynamic components keyed by route name. Route transitions use a scale animation + `LoadingOverlay` for directional slide-ins (up/down on desktop, left/right on mobile). The `theme-dark` class is hardcoded on the root element for pre-rendering, then toggled at runtime by Vuex state.

**Views** (`src/views/`): `Home`, `About`, `Skills`, `Works`, `Contact` — each maps 1:1 to a route defined in `src/constants/route.js`. Route names double as the dynamic component names in `App.vue`.

**Vuex store** (`src/store/`):
- Root state: `theme` (`'dark'` | `'white'`)
- `window` module: tracks viewport size; exposes `window/isLarge` getter (>1050px) used for layout-direction decisions in route transitions

**Theming:** All colors live in `src/sass/abstract/_variables.scss` under a `$themes` map (`dark` / `white`). Apply per-theme styles with the `@include themify { ... }` mixin and retrieve values with `themed('key')`.

**Responsive breakpoints** (also in `_variables.scss`):
- `small` — ≤599px (phone)
- `medium` — 600–1050px (tablet)
- `large` — ≥1051px (desktop)

Use `@include respond-to('small', 'medium') { ... }` in component SCSS.

**SCSS globals:** `src/sass/abstract/index.scss` (variables, mixins, functions) is injected into every Vue component via `vue.config.js` `additionalData`, so no manual import is needed inside SFC `<style>` blocks.

**i18n:** Locale JSON files in `src/locales/` (`en.json`, `fr.json`). Loaded automatically by `src/i18n.js` via `require.context`. Add new keys to both files; the app defaults to `en`.

**Contact form:** Sends email via [emailjs](https://www.emailjs.com/). The public user ID is initialised in `src/main.js`; service/template IDs are inside `ContactForm.vue`.
