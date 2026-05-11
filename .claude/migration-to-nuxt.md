# Vue 2 → Nuxt 4 Migration Plan

## How to Resume (cross-session)
Read this file first, then check **Current Status** below. Before touching any code, read `app/app.vue` (or `src/App.vue` if Phase 3 isn't done), `nuxt.config.ts` (if it exists), and the current `package.json` to verify actual state matches what's checked off here.

## Current Status
**Phase:** 4 — Pages & Components — in progress
**Last completed step:** Mid-Phase 4 bug fixes — three cross-phase bugs surfaced during Playwright verification: leftbar SSR shift, wrong page name in loading overlay (`@nuxtjs/i18n` route-name locale suffix), and missing space between home-title spans. All fixed and verified. See "Mid-Phase 4 fixes" below.
**Next action:** Begin Phase 4.4 — Works page: `ProjectFilter.vue`, `app/pages/works.vue`

---

## Context
Vue 2 SPA (Vue CLI 4 / webpack 4) personal website with 5 routes, deployed to Cloudflare Pages. Vue 2 reached EOL in December 2023, and the entire toolchain (Vue CLI, webpack 4, node-sass, prerender-spa-plugin with Puppeteer v1) is outdated and incompatible with Node 24 LTS. Migrating to **Nuxt 4 + Vite** for native static pre-rendering (`nuxt generate`), auto-imports, file-based routing, and a modern Node-compatible stack.

Nuxt 4 chosen over Nuxt 3 because it is the current stable recommended version (May 2026), avoids a future upgrade, and the default `minimal` template targets it.

**Language:** TypeScript everywhere — all `.vue` files use `<script setup lang="ts">`, all stores/composables/utils/config are `.ts`.

---

## New Stack

| Old | New |
|-----|-----|
| Vue 2 + Vue CLI 4 + webpack 4 | Nuxt 4 + Vite |
| Vuex 3 | Pinia (`@pinia/nuxt`) |
| vue-router 3 (manual) | Nuxt file-based routing (auto) |
| vue-i18n 8 | `@nuxtjs/i18n` (vue-i18n 9 under the hood) |
| node-sass | sass (Dart Sass, `@use`/`@forward` syntax) |
| prerender-spa-plugin + Puppeteer | `nuxt generate` (native, no Puppeteer) |
| `vue-notification` | `@kyvg/vue3-notification` (maintained Vue 3 port) |
| `emailjs-com` (deprecated) | `@emailjs/browser` (new init API) |
| `v-click-outside` v3 | `@vueuse/components` `onClickOutside` |
| `vue-js-toggle-button` | custom `<ToggleButton>` (no Vue 3 equivalent) |
| `EventBus = new Vue()` | Pinia `ui` store (`languageToggleEnabled`) |
| `vue.config.js` | `nuxt.config.ts` |
| Vue CLI ESLint | `@nuxt/eslint` module |

---

## New File Structure

In Nuxt 4, `srcDir` defaults to `app/`, so most app code lives under `app/`.

```
app/
  app.vue              ← App.vue (NuxtPage replaces dynamic component)
  pages/
    index.vue          ← Home.vue
    about.vue          ← About.vue
    skills.vue         ← Skills.vue
    works.vue          ← Works.vue
    contact.vue        ← Contact.vue
  components/          ← 13 components, auto-imported by Nuxt
  composables/
    useWaitFor.ts      ← waitFor() helper from src/utils/index.js (or as plain util)
  stores/
    theme.ts           ← store/index.js (Pinia)
    window.ts          ← store/window.js (Pinia)
    ui.ts              ← NEW: replaces EventBus (languageToggleEnabled, etc.)
  utils/
    constants.ts       ← THEME enum + GITHUB_NAME from src/constants/index.js
    routes.ts          ← ordered route list for transition direction logic
  assets/
    sass/              ← src/sass/ (moved + migrated to @use/@forward)
    images/            ← src/assets/images (moved)
locales/
  en.json              ← unchanged
  fr.json              ← unchanged
i18n.config.ts         ← replaces src/i18n.js (root level)
nuxt.config.ts         ← replaces vue.config.js (root level)
public/                ← favicon.ico, logo/  (delete old index.html)
```

`nuxt.config.ts`, `public/`, `server/`, `i18n.config.ts`, and `locales/` stay at the **project root**, not inside `app/`.

---

## Inventory (verified against repo)

- **13 components** (not 14): `ContactForm`, `ContactSpinIcon`, `CustomButton`, `FloatingButton`, `LoadingOverlay`, `Navigation`, `PageSpecificLayout`, `ProjectFilter`, `RotatingCircle`, `RotatingCircleItem`, `Settings`, `Timeline`, `TypeWriterEffect`
- **5 views** → 5 pages
- **2 stores** + **1 new store** (`ui.ts` for EventBus replacement)
- **`src/utils/index.js`** has `EventBus` (delete — replaced by Pinia) and `waitFor` (move to `app/utils/` or composable)
- **`src/constants/index.js`** has `THEME`, `EVENT_BUS` (delete), `GITHUB_NAME`, re-exports `ROUTE`
- **`src/constants/route.js`** — most fields obsolete (file-based routing); preserve only the **ordered route name list** for `compareRoutePos` transition logic, in `app/utils/routes.ts`

---

## Migration Steps

### Phase 0 — Track this file
- [x] Plan v1 (Nuxt 3) saved to `.claude/migration-to-nuxt3.md`
- [x] Plan v2 (Nuxt 4 + review gaps) saved to `.claude/migration-to-nuxt.md`
- [x] Memory updated to reference plan v2

### Phase 1 — Bootstrap

**1a. Switch to Node 24**
- [x] Check active Node version (`node --version`); if < 18, run `nvm install 24 && nvm use 24`
- [x] Verify: `node --version` → `v24.x.x`
> Node 14 (the old `.nvmrc` default) is incompatible with Nuxt 4 + Vite. Node 18 is the minimum; 24 LTS is the target. `.nvmrc` is updated in Phase 5 alongside CI — switching the shell here is just a prerequisite, not the permanent pin.

**1b. Move SCSS / locales / images into Nuxt 4 layout**
- [x] `mkdir -p app/assets/sass app/assets/images locales`
- [x] `cp -r src/sass/* app/assets/sass/` and `cp -r src/assets/images/* app/assets/images/`
- [x] `cp src/locales/{en,fr}.json locales/`
- [x] `find app/assets -name '.DS_Store' -delete`

**1c. Migrate SCSS abstract files from `@import` → `@use`/`@forward`**
- [x] `abstract/index.scss` → `@forward` each partial; hides private `$-theme-name`/`$-theme-map`
- [x] `abstract/_mixins.scss` → `@use 'variables' as *`; declare `$-theme-name`/`$-theme-map` at module level
- [x] `base/_base.scss` → `@use '../abstract' as *` (only file with abstract deps)
- [x] `base/index.scss` and `vendors/index.scss` → `@import` → `@use`
- [x] Verified: `themify` and `themed()` resolve correctly via `@use "~/assets/sass/abstract/index.scss" as *`

**1d. Delete Vue CLI artifacts**
- [x] `rm -rf dist/ node_modules/ package-lock.json`
- [x] `rm vue.config.js babel.config.js postcss.config.js`
- [x] `src/` and `public/index.html` moved to `legacy/` as conversion reference — deleted at end of Phase 4 (step 4.6)
> `legacy/src/` = original Vue 2 components, views, stores, utils. `legacy/index.html` = original HTML template (canonical, author meta, exact title/description — already migrated to `nuxt.config.ts`).

**1e. Scaffold Nuxt 4**
- [x] `npx nuxi@latest init . --template minimal -f --no-install --no-gitInit` — nuxt@4.4.4
- [x] Verified `package.json` has `nuxt` v4.4.4 and `tsconfig.json` references `.nuxt/tsconfig.*.json`

**1f. Install runtime + dev modules**
- [x] `npm install @nuxtjs/i18n @pinia/nuxt pinia @kyvg/vue3-notification @emailjs/browser eva-icons lodash.throttle @vueuse/nuxt @vueuse/components`
- [x] `npm install -D @nuxt/eslint sass eslint`

**1g. Write `nuxt.config.ts`**
- [x] `compatibilityDate: '2026-05-09'`
- [x] `modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint']`
- [x] `css: ['~/assets/sass/vendors/index.scss', '~/assets/sass/base/index.scss', 'eva-icons/style/eva-icons.css']`
- [x] `vite.css.preprocessorOptions.scss.additionalData: '@use "~/assets/sass/abstract/index.scss" as *;'`
- [x] `i18n: { defaultLocale: 'en', locales: [...], vueI18n: './i18n.config.ts' }`
- [x] `nitro.prerender.routes: ['/', '/about', '/skills', '/works', '/contact']`
- [x] `app.pageTransition: { name: 'page', mode: 'out-in' }`
- [x] `app.head` — title, description, viewport, charset, `<meta name="theme-color">`, favicon link

**1h. Stub `i18n.config.ts`**
- [x] Created at project root with `legacy: false`, imports `en.json`/`fr.json`

**1i. Update docs in this phase (per planning rule)**
- [x] `README.md`: rewritten — Nuxt 4 / Pinia / Vite; Node 24; `dev`/`generate` commands; `.output/public/`; `app/` srcDir
- [x] `CLAUDE.md`: Architecture section rewritten — `app/` srcDir, file-based routing, Pinia stores, `nuxt.config.ts`, dropped webpack/Vue CLI references

> 🔍 **Checkpoint — bootstrap:** `npm run dev` → Nuxt welcome page at localhost:3000, no errors. SCSS variable used in a test snippet compiles. Network tab shows no 404s.

---

### Phase 2 — Stores (Pinia)
- [x] `app/stores/theme.ts` — `value: ref<'dark' | 'white'>('dark')` + `set()`
- [x] `app/stores/window.ts` — `width`/`height` refs, `isSmall`/`isMedium`/`isLarge` computed, throttled `register()` (called from `onMounted` in Phase 3); sets `--w-inner-height` via `globalThis`
- [x] `app/stores/ui.ts` — replaces EventBus: `languageToggleEnabled: ref(true)` + `setLanguageToggleEnabled()`
- [x] Installed `@types/lodash.throttle`

> 🔍 **Checkpoint — stores:** `{"value":"dark"}` confirmed in SSR-rendered HTML via `useThemeStore().$state`.

---

### Phase 3 — `app/app.vue` + app shell components ⚠️ most complex

**Conversion patterns added since v1:**
- `/deep/` SCSS selector → `:deep()` (Vue 3)
- `destroyed()` lifecycle → `unmounted()` Options or `onUnmounted()` Composition
- `@click.native` on components → `@click` (`.native` removed in Vue 3)
- Direct DOM mutation of `<meta name="theme-color">` → `useHead({ meta: [...] })` with reactive content
- Theme class hardcode (`theme-dark` for prerender) → reactive `:class` binding (Nuxt SSG handles initial state)

**Components:**
- [x] `Navigation.vue` — `@click.native` → `@click`, `mapGetters` → `useWindowStore()`
- [x] `Settings.vue` — `EventBus.$on('LANGUAGE_TOGGLE_ENABLED')` → `useUiStore().languageToggleEnabled`; `$i18n.locale` → `const { locale } = useI18n()`; `document.querySelector('meta[name=theme-color]').setAttribute(...)` → `useHead(() => ({ meta: [{ name: 'theme-color', content: themeColor.value }] }))`; `/deep/` → `:deep()`
- [x] `LoadingOverlay.vue` — preserve callback-based animation state machine; transition lifecycle hooks rename; `defineExpose({ load })`
- [x] `CustomButton.vue` — `<script setup lang="ts">` with `defineProps`/`defineEmits`
- [x] `FloatingButton.vue` — `v-click-outside` → `onClickOutside` from `@vueuse/core` (done here, ahead of Phase 4.1)
- [x] `ToggleButton.vue` — custom component replacing `vue-js-toggle-button`; `.v-switch-core`/`.v-switch-button` classes preserved for Settings `:deep()` CSS

**`app/app.vue`:**
- [x] `<NuxtPage />` replaces `<component :is="currentView" />`
- [x] `router.beforeEach` blocks navigation until loading overlay enters + loading bar finishes; page swap happens behind overlay; `router.afterEach` cleanup via callback
- [x] Theme `:class="['theme-' + themeStore.value, ...]"` directly bound (no more `ref` + classList hack)
- [x] Wire `<Notifications />` from `@kyvg/vue3-notification` (registered as a Nuxt plugin in `app/plugins/notifications.ts`)
- [x] `@emailjs/browser` initialized in `app/plugins/emailjs.client.ts` with `emailjs.init({ publicKey: 'user_bOf6WS7M9nazVfWJzK0VI' })`
- [x] `app/utils/constants.ts` — THEME + GITHUB_NAME
- [x] `app/utils/routes.ts` — `compareRoutePos()` + ordered route name array
- [x] `app/utils/wait-for.ts` — `waitFor(ms)` helper

> 🔍 **Checkpoint — app shell:** localhost:3000 shows nav bar, theme toggle works, dark/light class switches on root, `<meta name="theme-color">` updates in DOM, language toggle works, no page content yet.

**Post-Phase 3 fixes (discovered during browser verification):**

1. **i18n keys not translating** — `@nuxtjs/i18n` v10 defaults `restructureDir` to `"i18n"`, so it looks for `i18n.config.ts` inside `<root>/i18n/`, not at `<root>/`. Moved `i18n.config.ts` → `i18n/i18n.config.ts` and `locales/` → `i18n/locales/`. Removed `vueI18n: './i18n.config.ts'` from `nuxt.config.ts` (auto-discovered from `i18n/`). Updated `CLAUDE.md` to reflect new paths.

2. **Background not filling viewport** — Nuxt wraps everything in `<div id="__nuxt">` between `<body>` and the app root. Since `.full-height` uses `height: 100%`, the chain `body(100vh) → #__nuxt(no height) → .theme-dark.full-height(0)` collapsed. Added `#__nuxt { height: 100%; width: 100% }` to `app/assets/sass/base/_base.scss`.

3. **NuxtLink `to` prop type warnings** — Vue Router 5 (shipped with Nuxt 4) warns "Expected String, got Object" when `:to="{ name: 'routeName' }"` is used and the named route doesn't exist yet (no pages). Switched `Navigation.vue` to path strings (`:to="'/about'"`). Named routes will work once pages are added in Phase 4; path-based is cleaner at this stage.

---

### Phase 4 — Pages & Components (one view at a time)

Conversion pattern for every component:
- `data()` → `ref()` / `reactive()` · `computed` → `computed()` · `methods` → plain functions
- `mounted`/`destroyed` → `onMounted`/`onUnmounted`
- `mapState`/`mapGetters` → `useThemeStore()` / `useWindowStore()` / `useUiStore()`
- `$t('key')` → `const { t } = useI18n()` · `$refs['key']` → `const key = ref(null)`
- `$emit` → `defineEmits()` · `$router`/`$route` → `useRouter()`/`useRoute()`
- `/deep/` → `:deep()` · `@click.native` → `@click`
- `<script setup lang="ts">` always

#### 4.1 — Home
- [x] `TypeWriterEffect.vue` — watch, async timing, `$emit('done')`; `defineEmits<{ done: [] }>()`
- [x] `FloatingButton.vue` — `v-click-outside` → `onClickOutside(el, handler)` from `@vueuse/core`
- [x] `app/pages/index.vue` from `Home.vue` — `definePageMeta({ name: 'home' })`
- [x] **Playwright:** navigate to `/`; snapshot confirms heading, typewriter text, portrait image, "my profile" button, and settings gear; no relevant console errors

#### 4.2 — About
- [x] `PageSpecificLayout.vue` — named slots (shared with Contact)
- [x] `Timeline.vue` — i18n calls only
- [x] `app/pages/about.vue` — `definePageMeta({ name: 'about' })`
- [x] **Playwright:** navigate to `/about`; snapshot confirms timeline entries render, layout wrapper present, no console errors

#### 4.3 — Skills
- [x] `RotatingCircle.vue` — `provide()` in `setup()`, `onUnmounted` cleanup, throttled RAF loop. **On animation start**, set `useUiStore().languageToggleEnabled = false`; restore on animation end.
- [x] `RotatingCircleItem.vue` — `inject`, dynamic `$refs['skill-' + idx]` → `:ref="el => skillRefs[idx] = el"` with `ref([])`
- [x] `app/pages/skills.vue` — `definePageMeta({ name: 'skills' })`
- [x] **Playwright:** navigate to `/skills`; snapshot confirms rotating circle and skill items render; no console errors

#### Mid-Phase 4 fixes (discovered during Playwright verification after 4.3)

Three cross-phase bugs surfaced once the app shell + home/about/skills were all wired up and verifiable end-to-end:

1. **Leftbar shifted right on initial paint, then snapped left** — `@kyvg/vue3-notification`'s `<Notifications>` applies `position: fixed` via JS after mount, not via CSS. In the SSR HTML it rendered as a normal block flex item (~350px wide) inside `.app`, pushing the Navigation sidebar right until hydration finished. Fix: wrapped `<Notifications>` in `<ClientOnly>` in `app/app.vue` — toasts are purely client-side, so SSR'ing them adds no value and removes them from the pre-hydration layout entirely.
2. **Loading overlay showed `Navigation.about__en` instead of `About`** — `@nuxtjs/i18n` v10 (default strategy `prefix_except_default`) appends `___<locale>` to every route name, so `to.name` is `about___en`, not `about`. Two places consumed the raw `to.name` in `app/app.vue`'s `router.beforeEach`: (a) `compareRoutePos()` for transition direction (silently always returned 0 → wrong direction), and (b) the page name passed into `LoadingOverlay.load()` for `$t('navigation.<name>')` lookup. Fix: strip the suffix once with `String(name).replace(/___[a-z-]+$/, '')` and feed the cleaned name into both. Also rewrote `LoadingOverlay.vue` to use `$t` (global injection) directly in the template via a `formatName()` helper, dropping the `useI18n()` local scope — that scope had no messages of its own and was returning the locale-qualified missing-key string.
3. **Missing space between "My name's" and "Philippe Eng."** — two consecutive `<TypeWriterEffect tag="span">` components inside the `<h1>` had no text node between them; Vue's template compiler doesn't preserve whitespace between custom components the way it does between native inline elements. Fix: explicit `{{ ' ' }}` text node between the two spans in `app/pages/index.vue`.

> Worth carrying forward: any future logic that branches on `route.name` needs to expect the `___<locale>` suffix from `@nuxtjs/i18n`. Either strip it at the boundary (current approach in `app.vue`) or compare against `route.path` instead.

---

#### 4.4 — Works
- [ ] `ProjectFilter.vue` — minimal changes
- [ ] `app/pages/works.vue` — replace `require('./img.jpg')` with explicit `import` of `~/assets/images/works/*.jpg/png` (or `import.meta.glob('~/assets/images/works/*', { eager: true })`); preserve `<TransitionGroup>` filter animation; `definePageMeta({ name: 'works' })`
- [ ] **Playwright:** navigate to `/works`; snapshot confirms project cards with images and filter buttons; no console errors

#### 4.5 — Contact
- [ ] `ContactSpinIcon.vue` — SVG only
- [ ] `ContactForm.vue` — `$refs`, `emailjs.send` (new SDK signature), `$notify()` → `notify()` from `@kyvg/vue3-notification`
- [ ] `app/pages/contact.vue` — `definePageMeta({ name: 'contact' })`
- [ ] **Playwright:** navigate to `/contact`; snapshot confirms form fields render; no console errors

#### 4.6 — Full Playwright smoke test (all pages)
- [ ] **Theme toggle:** switch dark ↔ light on each page; confirm root class and `<meta name="theme-color">` update
- [ ] **Language toggle:** switch en ↔ fr; confirm text updates on each page, no missing keys
- [ ] **Route transitions:** navigate home → about → skills → works → contact and back; confirm `LoadingOverlay` shows/hides, slide animation plays, no blank screens
- [ ] **Nav links:** click each nav link; confirm correct page loads and active state updates
- [ ] **Contact form:** fill and submit; confirm email sends and notification appears
- [ ] **No console errors** across all pages (404s for `_payload.json` of unbuilt routes are the only acceptable warnings)

#### 4.7 — Delete legacy reference folder
- [ ] `rm -rf legacy/`

---

### Phase 5 — CI / Deploy & Final Docs
- [ ] `.nvmrc`: `v14` → `v24`
- [ ] `wrangler.toml`: `pages_build_output_dir = "dist"` → `.output/public`
- [ ] `.github/workflows/deploy.yml`:
  - `branches: [master]` → `branches: [main]` (current main branch)
  - `node-version: '14'` → `'24'`
  - `npm run build` → `npm run generate`
  - `pages deploy dist/` → `pages deploy .output/public/`
  - Remove `NODE_OPTIONS` env var (no longer needed with Vite)
- [ ] Final `README.md` pass — verify all sections reflect actual final state
- [ ] Final `CLAUDE.md` pass — verify Architecture, Commands, Theming sections accurate
- [ ] Update this file's **Current Status** block → "migration complete"; commit

---

## Critical Files

| File | Action |
|------|--------|
| `nuxt.config.ts` | Create (replaces `vue.config.js`) |
| `app/app.vue` | Create (replaces `src/App.vue`) |
| `app/stores/{theme,window,ui}.ts` | Create (replaces `src/store/*` + EventBus) |
| `app/utils/{constants,routes}.ts` | Create (from `src/constants/`) |
| `app/plugins/{emailjs,notifications}.client.ts` | Create (replaces `src/main.js` plugin init) |
| `i18n.config.ts` | Create (replaces `src/i18n.js`) |
| `app/pages/*.vue` | Create ×5 (from `src/views/`) |
| `app/components/*.vue` | Migrate ×13 (Options API → `<script setup lang="ts">`) |
| `app/assets/sass/abstract/*.scss` | Refactor `@import` → `@use`/`@forward` |
| `.github/workflows/deploy.yml` | Update branch trigger + Node + commands |
| `wrangler.toml` | Update `pages_build_output_dir` |
| `.nvmrc` | Update `v14` → `v24` |
| `README.md` | Update stack, commands, deployment, file structure |
| `CLAUDE.md` | Rewrite Architecture for Nuxt 4 |
| `package.json` | Full replacement via nuxi init + installs |
| `public/index.html` | **Delete** (Nuxt renders its own) |

---

## Packages to Drop

`@vue/cli-*`, `babel-eslint`, `eslint-plugin-*` (Vue CLI variants), `node-sass`, `prerender-spa-plugin`, `sass-loader`, `vue-cli-plugin-*`, `vue-template-compiler`, `vuex`, `vuex-router-sync`, `vue-i18n@8`, `vue-notification`, `v-click-outside`, `vue-js-toggle-button`, `vue-router@3`, `emailjs-com`, `core-js`

---

## Verification

Inline checkpoints embedded in each phase. Final end-to-end checks after Phase 5:

1. **All routes:** visit `/`, `/about`, `/skills`, `/works`, `/contact` — content renders, no console errors
2. **Theme toggle:** dark ↔ light — root class changes, `<meta name="theme-color">` updates, all colors update
3. **Language toggle:** en ↔ fr — all text updates, no missing keys; toggle is disabled during Skills rotation animation
4. **Route transitions:** navigate between pages — slide animation plays, `LoadingOverlay` shows/hides correctly
5. **Contact form:** submit with real data — email arrives, notification appears
6. **Static build:** `npm run generate` → `ls .output/public/` shows 5 pre-rendered HTML files, each containing actual content (not just `<div id="__nuxt"></div>`)
7. **CI:** push to `stack-modernization` → manually trigger preview build, or merge to `main` and confirm Cloudflare Pages production deploy
8. **Lighthouse:** confirm Performance / Accessibility / Best Practices / SEO scores match or beat the pre-migration baseline (>90 each per current README)
