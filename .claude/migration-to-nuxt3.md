# Vue 2 → Nuxt 3 Migration Plan

## How to Resume (cross-session)
Read this file first, then check **Current Status** below. Before touching any code, read `app.vue` (or `src/App.vue` if Phase 3 isn't done), `nuxt.config.ts` (if it exists), and the current `package.json` to verify actual state matches what's checked off here.

## Current Status
**Phase:** 1 — Bootstrap (not started)
**Last completed step:** Phase 0 — plan saved to repo
**Next action:** Begin Phase 1 — delete old src/, run nuxi init, install modules, write nuxt.config.ts

---

## Context
The project is a Vue 2 SPA (Vue CLI 4 / webpack 4) personal website with 5 routes deployed to Cloudflare Pages. Vue 2 reached EOL in December 2023, and the entire toolchain (Vue CLI, webpack 4, node-sass, prerender-spa-plugin with Puppeteer v1) is outdated and incompatible with Node 24 LTS. The goal is to migrate to Nuxt 3 + Vite, which provides native static pre-rendering (`nuxt generate`), auto-imports, file-based routing, and a modern Node-compatible stack.

---

## New Stack

| Old | New |
|-----|-----|
| Vue 2 + Vue CLI 4 + webpack 4 | Nuxt 3 + Vite |
| Vuex 3 | Pinia (`@pinia/nuxt`) |
| vue-router 3 (manual) | Nuxt file-based routing (auto) |
| vue-i18n 8 | `@nuxtjs/i18n` (vue-i18n 9 under the hood) |
| node-sass | sass (Dart Sass) |
| prerender-spa-plugin + Puppeteer | `nuxt generate` (native, no Puppeteer) |
| vue-notification | vue3-notification |
| v-click-outside v3 | @vueuse/components `onClickOutside` |
| vue-js-toggle-button | custom `<ToggleButton>` or `@vueuse/components` |
| vue.config.js | nuxt.config.ts |

---

## New File Structure

```
pages/
  index.vue          ← Home.vue
  about.vue          ← About.vue
  skills.vue         ← Skills.vue
  works.vue          ← Works.vue
  contact.vue        ← Contact.vue
components/          ← same 14 components, auto-imported by Nuxt
stores/
  theme.ts           ← store/index.js (Pinia)
  window.ts          ← store/window.js (Pinia)
assets/
  sass/              ← src/sass/ (moved)
  images/            ← src/assets/ (moved)
locales/
  en.json            ← unchanged
  fr.json            ← unchanged
app.vue              ← App.vue (NuxtPage replaces dynamic component)
nuxt.config.ts       ← replaces vue.config.js
i18n.config.ts       ← replaces src/i18n.js
```

---

## Migration Steps

### Phase 0 — Track this file
- [x] Copy this file to `.claude/migration.md` in the project repo and commit it
- [x] Save a Claude memory noting: "Nuxt 3 migration in progress, plan at `.claude/migration.md`"

### Phase 1 — Bootstrap
- [ ] Delete `src/`, `vue.config.js`, `babel.config.js`, `postcss.config.js`
- [ ] Run `npx nuxi@latest init .` (overwrites `package.json`)
- [ ] Install modules: `@nuxtjs/i18n @pinia/nuxt pinia sass vue3-notification emailjs-com eva-icons lodash.throttle @vueuse/nuxt @vueuse/components`
- [ ] Write `nuxt.config.ts`:
  - modules: `@nuxtjs/i18n`, `@pinia/nuxt`, `@vueuse/nuxt`
  - css: global base styles
  - `vite.css.preprocessorOptions.scss.additionalData`: inject `~/assets/sass/abstract/index.scss`
  - i18n: locales `en`/`fr`, defaultLocale `en`, vueI18n `./i18n.config.ts`
  - `nitro.prerender.routes`: all 5 routes
  - `app.pageTransition` for the scale animation

> 🔍 **Checkpoint — bootstrap:** `npm run dev` → Nuxt welcome page at localhost:3000, no errors in terminal. SCSS compiles (check browser console). This is expected to be a blank app — confirms toolchain works before any component work.

### Phase 2 — Stores (Pinia)
- [ ] `stores/theme.ts` — `defineStore('theme')` with `value: 'dark'` state and `set(v)` action
- [ ] `stores/window.ts` — track `width`/`height`, expose `isLarge` getter (>1050px), register throttled resize listener; set `--w-inner-height` CSS custom property

### Phase 3 — app.vue + app shell components ⚠️ most complex
- [ ] Migrate `Navigation.vue` — `@click.native` → `@click`, `mapGetters` → `useWindowStore()`
- [ ] Migrate `Settings.vue` — EventBus `$emit('toggleLanguage')` → Pinia action or `useLanguage()` composable; `$i18n.locale` → `useI18n()`
- [ ] Migrate `LoadingOverlay.vue` — transition lifecycle hooks, preserve callback-based animation state machine
- [ ] Migrate `CustomButton.vue` — simple functional component, convert to `<script setup>`
- [ ] Write `app.vue`:
  - `<NuxtPage />` replaces `<component :is="currentView" />`
  - Route transitions via `<NuxtPage :transition="..." />` — preserve up/down (desktop) and left/right (mobile) directional slide-ins via `LoadingOverlay`
  - Theme class binding (`theme-dark` / `theme-white`) on root element
  - Wire `vue3-notification` (replaces `vue-notification`)

> 🔍 **Checkpoint — app shell:** `npm run dev` → localhost:3000 shows nav bar, theme toggle works, dark/light class switches on root, language toggle works, no page content yet (expected)

### Phase 4 — Pages & Components (one view at a time)

Conversion pattern for every component:
- `data()` → `ref()` / `reactive()` · `computed` → `computed()` · `methods` → plain functions
- `mounted`/`destroyed` → `onMounted`/`onUnmounted`
- `mapState`/`mapGetters` → `useThemeStore()` / `useWindowStore()`
- `$t('key')` → `const { t } = useI18n()` · `$refs['key']` → `const key = ref(null)`
- `$emit` → `defineEmits()` · `$router`/`$route` → `useRouter()`/`useRoute()`

#### 4.1 — Home
- [ ] Migrate `TypeWriterEffect.vue` — watch, async timing, `$emit('done')`; convert to `<script setup>` with `defineEmits`
- [ ] Migrate `FloatingButton.vue` — `v-click-outside` → `onClickOutside(el, handler)` from `@vueuse/core`
- [ ] Create `pages/index.vue` from `Home.vue` — `definePageMeta({ name: 'Home' })`

> 🔍 **Checkpoint:** navigate to `/` — typewriter animation plays, floating button visible, no console errors

#### 4.2 — About
- [ ] Migrate `PageSpecificLayout.vue` — named slots (shared with Contact, migrate once here)
- [ ] Migrate `Timeline.vue` — simple, just i18n calls
- [ ] Create `pages/about.vue` from `About.vue`

> 🔍 **Checkpoint:** navigate to `/about` — timeline renders, layout wrapper correct

#### 4.3 — Skills
- [ ] Migrate `RotatingCircle.vue` — `provide()` moves into `setup()`, `destroyed` → `onUnmounted`, throttled RAF loop
- [ ] Migrate `RotatingCircleItem.vue` — `inject`, dynamic `$refs['skill-' + idx]` → `:ref="el => skillRefs[idx] = el"` with `ref([])`
- [ ] Create `pages/skills.vue` from `Skills.vue` — dynamic watcher array, `mapGetters` → `useWindowStore()`

> 🔍 **Checkpoint:** navigate to `/skills` — rotating circle renders, hover animation works on desktop, no layout breakage on mobile

#### 4.4 — Works
- [ ] Migrate `ProjectFilter.vue` — simple presentational, minimal changes
- [ ] Create `pages/works.vue` from `Works.vue` — replace `require('./img.jpg')` with `import.meta.glob('~/assets/images/*', { eager: true })`, keep `transition-group` filter animation

> 🔍 **Checkpoint:** navigate to `/works` — projects display with images, filter buttons work, transition animation plays

#### 4.5 — Contact
- [ ] Migrate `ContactSpinIcon.vue` — SVG only, no logic changes
- [ ] Migrate `ContactForm.vue` — `$refs`, emailjs send, `$notify()` → `vue3-notification`
- [ ] Create `pages/contact.vue` from `Contact.vue`

> 🔍 **Checkpoint:** navigate to `/contact` — form renders, submit sends email via emailjs, success/error notification appears

### Phase 6 — i18n
- [ ] `i18n.config.ts`: `export default { legacy: false, locale: 'en', messages: { en, fr } }`
- [ ] All `$t('key')` → `const { t } = useI18n()` across all components and pages (~35+ instances)
- [ ] `$i18n.locale` in `Settings.vue` → `const { locale } = useI18n()`

### Phase 7 — CI / Deploy & Docs
- [ ] `.nvmrc`: `v14` → `v24`
- [ ] `.github/workflows/deploy.yml`:
  - `node-version`: `'18'` → `'24'`
  - Build command: `nuxt generate`
  - Deploy command: `wrangler pages deploy .output/public/ --project-name=lyfing-website`
  - Remove `NODE_OPTIONS` env var (not needed with Vite)
- [ ] `README.md`: update stack (Nuxt 3 / Pinia), requirements (Node 24), commands (`dev`/`generate`), deployment output (`dist/` → `.output/public/`)
- [ ] `CLAUDE.md`: rewrite architecture section — new commands, new file structure (`pages/`, `stores/`, `nuxt.config.ts`), remove webpack/Vue CLI references
- [ ] Update this file's **Current Status** block and commit

---

## Critical Files

| File | Action |
|------|--------|
| `nuxt.config.ts` | Create (replaces `vue.config.js`) |
| `app.vue` | Create (replaces `src/App.vue`) |
| `stores/theme.ts` | Create (replaces `src/store/index.js`) |
| `stores/window.ts` | Create (replaces `src/store/window.js`) |
| `i18n.config.ts` | Create (replaces `src/i18n.js`) |
| `pages/*.vue` | Create ×5 (from `src/views/`) |
| `components/*.vue` | Migrate ×14 (Options API → `<script setup>`) |
| `.github/workflows/deploy.yml` | Update Node version + build/deploy commands |
| `.nvmrc` | Update `v14` → `v24` |
| `README.md` | Update stack description, commands, deployment section |
| `CLAUDE.md` | Rewrite to reflect Nuxt 3 architecture, commands, file structure |
| `package.json` | Full replacement via nuxi init + installs |

---

## Packages to Drop

`@vue/cli-*`, `babel-eslint`, `eslint-plugin-*`, `node-sass`, `prerender-spa-plugin`, `sass-loader`, `vue-cli-plugin-*`, `vue-template-compiler`, `vuex`, `vuex-router-sync`, `vue-i18n@8`, `vue-notification`, `v-click-outside`, `vue-js-toggle-button`, `vue-router@3`

---

## Verification

Inline checkpoints are embedded in each phase above. Final end-to-end checks after Phase 7:

1. **All routes:** visit `/`, `/about`, `/skills`, `/works`, `/contact` — content renders, no console errors
2. **Theme toggle:** switch dark ↔ light — class changes on root, colors update everywhere
3. **Language toggle:** switch en ↔ fr — all text updates, no missing keys
4. **Route transitions:** navigate between pages — slide animation plays, `LoadingOverlay` shows/hides correctly
5. **Contact form:** submit with real data — email arrives, notification appears
6. **Static build:** `npm run generate` → `ls .output/public/` shows 5 pre-rendered HTML files, each with content (not just a blank `<div id="app">`)
7. **CI:** push to current feature branch → GitHub Actions passes → Cloudflare Pages preview URL matches local
