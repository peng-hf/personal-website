# Philippe Eng — Personal Website

Personal portfolio site. Built with Nuxt 4 + Vite, deployed as a static site on Cloudflare Pages.

## Stack

| | |
|---|---|
| Framework | Nuxt 4 + Vite |
| UI | Vue 3 (`<script setup lang="ts">`) |
| State | Pinia |
| Routing | Nuxt file-based routing (`app/pages/`) |
| i18n | `@nuxtjs/i18n` (English / French) |
| Styles | Dart Sass (`@use`/`@forward`), custom `themify` mixin |
| Icons | Eva Icons |
| Email | `@emailjs/browser` |
| Deploy | Cloudflare Pages — static output at `.output/public/` |

## Requirements

Node 24 LTS.

## Commands

```bash
npm run dev       # dev server at http://localhost:3000
npm run generate  # static build → .output/public/
npm run preview   # preview the generated build
```

## File structure

```
app/                     ← Nuxt srcDir
  app.vue
  pages/                 ← one file per route (index, about, skills, works, contact)
  components/            ← auto-imported
  composables/
  stores/                ← Pinia (theme, window, ui)
  assets/
    sass/
      abstract/          ← variables, mixins, functions (@use/@forward)
      base/              ← global reset + typography
      vendors/           ← normalize, animate
    images/
i18n/
  i18n.config.ts
  locales/               ← en.json, fr.json
nuxt.config.ts
public/                  ← favicon, logo/
```

## Theming

All colors are in `app/assets/sass/abstract/_variables.scss` under a `$themes` map (`dark` / `white`). Apply per-theme styles with the `@include themify { ... }` mixin and retrieve values with `themed('key')`. The `abstract/index.scss` is injected via `additionalData` so no manual import is needed inside `<style>` blocks.

## Breakpoints

| Name | Range |
|------|-------|
| `small` | ≤ 599px (phone) |
| `medium` | 600 – 1050px (tablet) |
| `large` | ≥ 1051px (desktop) |

Use `@include respond-to('small', 'medium') { ... }` in component `<style>` blocks.

## Deployment

Cloudflare Pages. Production command: `npm run generate`. Output directory: `.output/public/`.
