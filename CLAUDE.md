# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working style

**Think before coding.** State assumptions explicitly before implementing. If multiple interpretations exist, present them — don't pick silently. If a simpler approach exists, say so. If something is unclear, stop and ask.

**Simplicity first.** Minimum code that solves the problem. No features beyond what was asked, no abstractions for single-use code, no "flexibility" that wasn't requested, no error handling for impossible scenarios. If you write 200 lines and it could be 50, rewrite it.

**Surgical changes.** Touch only what you must. Don't improve adjacent code, comments, or formatting. Match existing style. If you notice unrelated dead code, mention it — don't delete it. Remove only imports/variables/functions that your changes made unused, not pre-existing dead code. Every changed line should trace directly to the request.

**Goal-driven execution.** Transform tasks into verifiable goals. For multi-step tasks, state a plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```
Every plan phase must include relevant documentation updates (README.md, CLAUDE.md, or any other affected doc) inline — not deferred to a final catch-all phase.

## Commands

```bash
npm run dev       # dev server at http://localhost:3000
npm run generate  # static build → .output/public/
npm run preview   # preview the generated build
```

> **Node 24** is required. Static pre-rendering runs via `nuxt generate` (native, no Puppeteer).

## Architecture

**Stack:** Nuxt 4 + Vite, Vue 3, Pinia, `@nuxtjs/i18n`, Dart Sass, deployed as a static site (`nuxt generate`) on Cloudflare Pages.

**Source root:** `app/` (Nuxt 4 `srcDir` default). `nuxt.config.ts` stays at the project root. i18n files live in `i18n/` per `@nuxtjs/i18n` v10 convention (`i18n/i18n.config.ts` + `i18n/locales/{en,fr}.json`).

**App shell (`app/app.vue`):** Contains `<NuxtPage />`. Route transitions use a `LoadingOverlay` component for directional slide-ins (up/down on desktop, left/right on mobile), driven by a static ordered route list in `app/utils/routes.ts`. Theme class is reactively bound: `:class="'theme-' + themeStore.value"`.

**Pages** (`app/pages/`): `index.vue`, `about.vue`, `skills.vue`, `works.vue`, `contact.vue` — Nuxt file-based routing, no manual router config. Each uses `definePageMeta({ name: '...' })`.

**Pinia stores** (`app/stores/`):
- `theme.ts` — `value: ref<'dark' | 'white'>('dark')`
- `window.ts` — viewport width/height, `isLarge` getter (>1050px), sets `--w-inner-height` CSS custom property
- `ui.ts` — replaces EventBus: `languageToggleEnabled` flag (disabled during Skills rotation animation)

**Components** (`app/components/`): 13 components, auto-imported by Nuxt. All use `<script setup lang="ts">`.

**Theming:** All colors live in `app/assets/sass/abstract/_variables.scss` under a `$themes` map (`dark` / `white`). Apply per-theme styles with `@include themify { ... }` and retrieve values with `themed('key')`.

**Responsive breakpoints** (also in `_variables.scss`):
- `small` — ≤599px (phone)
- `medium` — 600–1050px (tablet)
- `large` — ≥1051px (desktop)

Use `@include respond-to('small', 'medium') { ... }` in component `<style>` blocks.

**SCSS globals:** `app/assets/sass/abstract/index.scss` is injected into every Vue component via `nuxt.config.ts` `vite.css.preprocessorOptions.scss.additionalData` as `@use "..." as *`, so no manual import is needed inside `<style>` blocks.

**i18n:** Locale JSON files in `i18n/locales/` (`en.json`, `fr.json`). Loaded by `i18n/i18n.config.ts` (auto-discovered by `@nuxtjs/i18n` v10 from the `i18n/` dir). Add new keys to both files; the app defaults to `en`.

**Contact form:** Sends email via `@emailjs/browser`. Initialized in `app/plugins/emailjs.client.ts`; service/template IDs are inside `ContactForm.vue`.
