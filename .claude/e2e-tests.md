# E2E Test Plan — Playwright

## How to Resume (cross-session)
Read this file first, then check **Current Status** below. Before starting, verify the Nuxt 3 migration is complete (`nuxt.config.ts` exists, `npm run dev` starts without errors) — these tests target the migrated stack.

## Current Status
**Phase:** Not started  
**Last completed step:** —  
**Next action:** Begin Phase 1 — install Playwright, write tests/scenarios.md

---

## Context
The portfolio has 5 routes (`/`, `/about`, `/skills`, `/works`, `/contact`), a theme toggle (dark/light), a language toggle (en/fr), and a contact form powered by emailjs. The goal is a reusable Playwright test suite that verifies all key interactions automatically, authored with the help of the Playwright MCP (Claude drives a real browser against the dev server to observe actual DOM before generating specs).

---

## Approach

### Authoring workflow (MCP-assisted)
1. Start the dev server (`npm run dev`)
2. Claude reads `tests/scenarios.md` and uses the Playwright MCP to navigate and interact with the running app
3. Claude observes real selectors, timing, and DOM structure, then generates `.spec.ts` files grounded in reality
4. Run `npx playwright test` to confirm all pass before committing

`tests/scenarios.md` is the source of truth for *what* to test. The `.spec.ts` files are the generated *how* — regenerate or patch them by re-running the MCP workflow against an updated scenario.

---

## File Structure

```
tests/
  scenarios.md        ← plain-English spec (maintain this, not the .spec.ts files)
  home.spec.ts
  about.spec.ts
  skills.spec.ts
  works.spec.ts
  contact.spec.ts
  theme.spec.ts
  i18n.spec.ts
  transitions.spec.ts
playwright.config.ts  ← baseURL: http://localhost:3000, webServer auto-start
.github/workflows/
  e2e.yml             ← runs on merge to main + workflow_dispatch
```

---

## Test Scenarios (plain English)

These will live in `tests/scenarios.md` once written. Draft here for planning:

### Home (`/`)
- Page loads without console errors
- Typewriter animation plays (text appears character by character in the hero)
- Floating button is visible
- Floating button click opens its menu; clicking outside closes it

### About (`/about`)
- Page loads without console errors
- Timeline renders at least one entry

### Skills (`/skills`)
- Page loads without console errors
- Rotating circle is visible
- On desktop (viewport ≥1051px): hovering a skill logo triggers the rotateX animation (element has a `transform` style applied)

### Works (`/works`)
- Page loads without console errors
- Project cards are visible (at least one card rendered)
- Clicking a filter button hides cards not matching that filter
- Clicking the "All" filter restores all cards

### Contact (`/contact`)
- Page loads without console errors
- Form fields (name, email, message) are present and focusable
- Submitting with empty fields shows validation (button stays disabled or an error appears)
- *Do not submit real emailjs requests in tests*

### Theme toggle (cross-cutting)
- Root element has `theme-dark` class on initial load
- Clicking the theme toggle switches root class to `theme-white`
- Clicking again switches back to `theme-dark`

### Language toggle (cross-cutting)
- Default locale is `en` — nav labels match English
- Clicking the language toggle switches to `fr` — at least one nav label changes
- Switching back restores English labels

### Route transitions (structural, not visual)
Transitions use `LoadingOverlay` for directional slide-ins (up/down on desktop, left/right on mobile). Tests assert the mechanics, not pixels — visual regression can be added later once layout is stable.

- On desktop (viewport ≥1051px): navigating forward (e.g. Home → About) mounts `LoadingOverlay` with the `up` direction class; navigating back (About → Home) uses the `down` direction class
- On mobile (viewport ≤599px): navigating forward applies the `left` direction class; navigating back applies `right`
- `LoadingOverlay` unmounts (or becomes hidden) after the transition completes — it does not linger on screen
- All 5 routes are reachable via navigation without the overlay getting stuck

---

## Migration Steps

### Phase 1 — Setup
- [ ] Confirm Nuxt 3 migration is complete and `npm run dev` works
- [ ] Install Playwright: `npm init playwright@latest`
  - TypeScript
  - Test dir: `tests/`
  - No GitHub Actions (written manually in Phase 3)
  - Install Chromium browser
- [ ] Configure `playwright.config.ts`:
  - `baseURL: 'http://localhost:3000'`
  - `webServer`: auto-start `npm run dev`, wait for port 3000
  - Two projects: `desktop` (1280×720) and `mobile` (390×844, iPhone viewport) — needed for directional transition tests
- [ ] Write `tests/scenarios.md` with the scenarios above (refine as needed after seeing the real app)

> 🔍 **Checkpoint:** `npx playwright test --list` shows expected test files (even if empty stubs); dev server starts cleanly via webServer config

### Phase 2 — Author specs with Playwright MCP
- [ ] For each scenario group: Claude uses Playwright MCP to navigate the running app, inspect real DOM, interact, and observe selectors and timing
- [ ] Generate spec files one group at a time — run `npx playwright test <file>` after each before moving on:
  - [ ] `home.spec.ts`
  - [ ] `about.spec.ts`
  - [ ] `skills.spec.ts`
  - [ ] `works.spec.ts`
  - [ ] `contact.spec.ts`
  - [ ] `theme.spec.ts`
  - [ ] `i18n.spec.ts`
  - [ ] `transitions.spec.ts` — run against both `desktop` and `mobile` projects; assert direction classes and overlay cleanup

> 🔍 **Checkpoint:** `npx playwright test` exits 0, all specs green across both viewport projects

### Phase 3 — CI (GitHub Actions)
- [ ] Create `.github/workflows/e2e.yml`:
  - Triggers: `push` to `main` (merged PRs) + `workflow_dispatch` (manual)
  - Steps: checkout → setup Node 24 → `npm ci` → `npx playwright install --with-deps chromium` → `npx playwright test`
  - On failure: upload `playwright-report/` as a workflow artifact (downloadable HTML report)
- [ ] Push the workflow on a feature branch and trigger it manually via `workflow_dispatch` to confirm it passes before merging

> 🔍 **Checkpoint:** workflow run shows green on GitHub Actions; report artifact is downloadable on failure

### Phase 4 — Documentation & badge
- [ ] Add a status badge to `README.md` (top of file, below the title):
  ```markdown
  [![E2E Tests](https://github.com/peng-hf/personal-website/actions/workflows/e2e.yml/badge.svg)](https://github.com/peng-hf/personal-website/actions/workflows/e2e.yml)
  ```
- [ ] Add a "Testing" section to `README.md` explaining:
  - Test structure: `tests/scenarios.md` is the plain-English spec; `.spec.ts` files are generated via Playwright MCP
  - Run all tests locally: `npx playwright test`
  - Run a single spec: `npx playwright test tests/home.spec.ts`
  - View HTML report: `npx playwright test --reporter=html && npx playwright show-report`
  - CI: tests run automatically on merge to `main`; trigger manually from the Actions tab via workflow_dispatch
  - To update tests: edit `tests/scenarios.md`, then ask Claude to re-run the MCP authoring workflow
- [ ] Update this file's **Current Status** block and commit

---

## Future Work (tracked separately)
- Cross-browser: add Firefox and WebKit projects to `playwright.config.ts` once the suite is stable
- Visual regression: `expect(page).toHaveScreenshot()` for key pages once layout is locked

---

## Verification

After Phase 4:
1. `npx playwright test` — all specs pass locally, no failures or skips
2. Badge on `README.md` shows green after a passing CI run on `main`
3. Trigger workflow manually via Actions tab — passes end to end
4. Manually toggle theme, restart dev server, re-run locally — still passes
