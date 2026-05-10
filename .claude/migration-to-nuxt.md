# Vue 2 → Nuxt 4 Migration Plan

## How to Resume (cross-session)
Read this file first, then check **Current Status** below. Before touching any code, read `app/app.vue` (or `src/App.vue` if Phase 3 isn't done), `nuxt.config.ts` (if it exists), and the current `package.json` to verify actual state matches what's checked off here.

## Current Status
**Phase:** 1 — Bootstrap (not started — Phase 1 work was rolled back during plan review)
**Last completed step:** Phase 0 — plan v2 saved (Nuxt 4 target, gaps from review folded in)
**Next action:** Begin Phase 1 — move SCSS/locales/images to Nuxt 4 layout, delete old src/ + configs, run `nuxi init`, install modules, write `nuxt.config.ts`

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

**1a. Move SCSS / locales / images into Nuxt 4 layout**
- [ ] `mkdir -p app/assets/sass app/assets/images locales`
- [ ] `cp -r src/sass/* app/assets/sass/` and `cp -r src/assets/images/* app/assets/images/`
- [ ] `cp src/locales/{en,fr}.json locales/`
- [ ] `find app/assets -name '.DS_Store' -delete`

**1b. Migrate SCSS abstract files from `@import` → `@use`/`@forward`**
- [ ] Refactor `app/assets/sass/abstract/_variables.scss`, `_mixins.scss`, `_functions.scss` to use `@use` syntax (modern Dart Sass deprecates `@import`)
- [ ] Update `app/assets/sass/abstract/index.scss` to `@forward` the partials
- [ ] Verify `themify` mixin and `themed()` function still resolve correctly with namespace-less `@use … as *`

**1c. Delete Vue CLI artifacts**
- [ ] `rm -rf src/ dist/ node_modules/ package-lock.json`
- [ ] `rm vue.config.js babel.config.js postcss.config.js public/index.html` (Nuxt renders its own HTML)

**1d. Scaffold Nuxt 4**
- [ ] `npx nuxi@latest init .` → select **minimal (Nuxt 4)** template, skip git init, npm
- [ ] Verify `package.json` has `nuxt` v4.x and `compatibilityDate` is set in generated config

**1e. Install runtime + dev modules**
```
npm install @nuxtjs/i18n @pinia/nuxt pinia vue3-notification:@kyvg/vue3-notification \
            @emailjs/browser eva-icons lodash.throttle @vueuse/nuxt @vueuse/components
npm install -D @nuxt/eslint sass eslint
```
> Note: package name is literally `@kyvg/vue3-notification`. Plugin import name in app.vue will be `Notifications` from that package.

**1f. Write `nuxt.config.ts`**
- [ ] `compatibilityDate: '2026-05-09'` (today)
- [ ] `modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint']`
- [ ] `css: ['~/assets/sass/vendors/index.scss', '~/assets/sass/base/index.scss', 'eva-icons/style/eva-icons.css']`
- [ ] `vite.css.preprocessorOptions.scss.additionalData: '@use "~/assets/sass/abstract/index.scss" as *;'`
- [ ] `i18n: { defaultLocale: 'en', locales: [...], vueI18n: './i18n.config.ts' }`
- [ ] `nitro.prerender.routes: ['/', '/about', '/skills', '/works', '/contact']`
- [ ] `app.pageTransition: { name: 'page', mode: 'out-in' }` (placeholder; real transition wiring in Phase 3)
- [ ] `app.head` — title, description, viewport, charset, **`<meta name="theme-color">` tag** (referenced by Settings.vue), favicon link

**1g. Stub `i18n.config.ts`**
```ts
import en from './locales/en.json'
import fr from './locales/fr.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: { en, fr }
}))
```

**1h. Update docs in this phase (per planning rule)**
- [ ] `README.md`: stack section → Nuxt 4 / Pinia / Vite; Node 24; commands `dev`/`generate`; deploy output `.output/public/`; `app/` srcDir
- [ ] `CLAUDE.md`: rewrite Architecture section — `app/` srcDir, `pages/` file-based routing, Pinia stores, `nuxt.config.ts`, drop webpack/Vue CLI references

> 🔍 **Checkpoint — bootstrap:** `npm run dev` → Nuxt welcome page at localhost:3000, no errors. SCSS variable used in a test snippet compiles. Network tab shows no 404s.

---

### Phase 2 — Stores (Pinia)
- [ ] `app/stores/theme.ts` — `defineStore('theme', () => ({ value: ref<'dark' | 'white'>('dark'), set(v) { value.value = v } }))`
- [ ] `app/stores/window.ts` — `width`/`height` refs, `isLarge` getter (>1050px), throttled resize listener (registered in `onMounted`); set `--w-inner-height` CSS custom property
- [ ] `app/stores/ui.ts` — replaces EventBus: `languageToggleEnabled: ref(true)` + setter; later, Skills view will mutate this when the rotating circle is animating

> 🔍 **Checkpoint — stores:** add a temporary `<pre>{{ JSON.stringify(useThemeStore().$state) }}</pre>` in `app.vue`, see state render correctly.

---

### Phase 3 — `app/app.vue` + app shell components ⚠️ most complex

**Conversion patterns added since v1:**
- `/deep/` SCSS selector → `:deep()` (Vue 3)
- `destroyed()` lifecycle → `unmounted()` Options or `onUnmounted()` Composition
- `@click.native` on components → `@click` (`.native` removed in Vue 3)
- Direct DOM mutation of `<meta name="theme-color">` → `useHead({ meta: [...] })` with reactive content
- Theme class hardcode (`theme-dark` for prerender) → reactive `:class` binding (Nuxt SSG handles initial state)

**Components:**
- [ ] `Navigation.vue` — `@click.native` → `@click`, `mapGetters` → `useWindowStore()`
- [ ] `Settings.vue` — `EventBus.$on('LANGUAGE_TOGGLE_ENABLED')` → `useUiStore().languageToggleEnabled`; `$i18n.locale` → `const { locale } = useI18n()`; `document.querySelector('meta[name=theme-color]').setAttribute(...)` → `useHead(() => ({ meta: [{ name: 'theme-color', content: themeColor.value }] }))`; `/deep/` → `:deep()`
- [ ] `LoadingOverlay.vue` — preserve callback-based animation state machine; transition lifecycle hooks rename
- [ ] `CustomButton.vue` — `<script setup lang="ts">` with `defineProps`/`defineEmits`

**`app/app.vue`:**
- [ ] `<NuxtPage />` replaces `<component :is="currentView" />`
- [ ] Custom `:transition` on `<NuxtPage>` — preserve directional slide-ins via `LoadingOverlay`. The `compareRoutePos` logic moves to `app/utils/routes.ts` using a static ordered name array.
- [ ] Theme `:class="['theme-' + themeStore.value, ...]"` directly bound (no more `ref` + classList hack)
- [ ] Wire `<Notifications />` from `@kyvg/vue3-notification` (registered as a Nuxt plugin in `app/plugins/notifications.client.ts`)
- [ ] `@emailjs/browser` initialized in `app/plugins/emailjs.client.ts` with `emailjs.init({ publicKey: 'user_bOf6WS7M9nazVfWJzK0VI' })`

> 🔍 **Checkpoint — app shell:** localhost:3000 shows nav bar, theme toggle works, dark/light class switches on root, `<meta name="theme-color">` updates in DOM, language toggle works, no page content yet.

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
- [ ] `TypeWriterEffect.vue` — watch, async timing, `$emit('done')`; `defineEmits<{ done: [] }>()`
- [ ] `FloatingButton.vue` — `v-click-outside` → `onClickOutside(el, handler)` from `@vueuse/core`
- [ ] `app/pages/index.vue` from `Home.vue` — `definePageMeta({ name: 'home' })`

> 🔍 **Checkpoint:** `/` — typewriter plays, floating button visible, no console errors.

#### 4.2 — About
- [ ] `PageSpecificLayout.vue` — named slots (shared with Contact)
- [ ] `Timeline.vue` — i18n calls only
- [ ] `app/pages/about.vue` — `definePageMeta({ name: 'about' })`

> 🔍 **Checkpoint:** `/about` — timeline renders, layout wrapper correct.

#### 4.3 — Skills
- [ ] `RotatingCircle.vue` — `provide()` in `setup()`, `onUnmounted` cleanup, throttled RAF loop. **On animation start**, set `useUiStore().languageToggleEnabled = false`; restore on animation end.
- [ ] `RotatingCircleItem.vue` — `inject`, dynamic `$refs['skill-' + idx]` → `:ref="el => skillRefs[idx] = el"` with `ref([])`
- [ ] `app/pages/skills.vue` — `definePageMeta({ name: 'skills' })`

> 🔍 **Checkpoint:** `/skills` — rotating circle renders, hover animation works on desktop, language toggle disabled during animation, no layout breakage on mobile.

#### 4.4 — Works
- [ ] `ProjectFilter.vue` — minimal changes
- [ ] `app/pages/works.vue` — replace `require('./img.jpg')` with explicit `import` of `~/assets/images/works/*.jpg/png` (or `import.meta.glob('~/assets/images/works/*', { eager: true })`); preserve `<TransitionGroup>` filter animation; `definePageMeta({ name: 'works' })`

> 🔍 **Checkpoint:** `/works` — projects display with images, filter buttons work, transition animation plays.

#### 4.5 — Contact
- [ ] `ContactSpinIcon.vue` — SVG only
- [ ] `ContactForm.vue` — `$refs`, `emailjs.send` (new SDK signature), `$notify()` → `notify()` from `@kyvg/vue3-notification`
- [ ] `app/pages/contact.vue` — `definePageMeta({ name: 'contact' })`

> 🔍 **Checkpoint:** `/contact` — form renders, submit sends email via emailjs (real send), notification appears.

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
