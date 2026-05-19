# Content Refresh — 2026

## Status
✅ Complete. Applied on 2026-05-19 on the `main` branch. Pre-commit at the time of writing.

## Context
Site copy hadn't been touched in ~2 years and no longer reflected current career state. Driven by `TODO.txt` (since deleted) which listed two items: refresh text content (EN + FR), and update the skills section with new technologies.

Source of truth: resume PDF the user shared in-conversation (Senior Frontend Engineer, 7+ years; currently Senior Full-Stack Engineer at Heartflow since May 2023).

Plan file (snapshot): `~/.claude/plans/humming-scribbling-planet.md` — full proposed copy, alternatives considered, and per-phase doc checks.

---

## What changed

| File | Change |
|---|---|
| [i18n/locales/en.json](../i18n/locales/en.json) | `home.job` (new tagline), `about.description` (4 paragraphs rewritten), `about.timeline.events` (6 entries — was 5; reverse-chronological; corrected dates), `skills.description` (4 paragraphs rewritten — TS/Nuxt/AWS/CDK/testing/observability) |
| [i18n/locales/fr.json](../i18n/locales/fr.json) | Mirrored EN changes |
| [nuxt.config.ts](../nuxt.config.ts) | `app.head.title` and `meta.description` updated from "Front-End Engineer" → "Senior Frontend Engineer" |
| [app/pages/skills.vue](../app/pages/skills.vue) | `SKILL_DEFS` array — added TypeScript / Nuxt / AWS; dropped Webpack / Nginx; kept CSS (per user preference). 11 logos total. |
| `public/logo/` | Added `typescript.png`, `nuxt.png`, `aws.png`. Deleted `webpack.png`, `nginx.png`. |
| `TODO.txt` | Deleted (both items resolved). |

---

## Factual bugs found in old copy (now fixed)

| Field | Was | Truth (per resume) |
|---|---|---|
| Heartflow start (EN + FR) | September 2017 | **May 2018** |
| Clubvivre dates (EN + FR) | August – December **2017** | **August – December 2015** |
| EPITA graduation (FR only) | "Juillet 2018" | **Juillet 2017** (EN had it right) |
| Winamax end | August 2017 | **July 2017** |
| Role title | Front-End Engineer | **Senior Frontend Engineer** (promoted to Senior Full-Stack May 2023) |
| Timeline entries | 5 (Heartflow as one) | **6** (Heartflow split into Senior Full-Stack + Front-End roles) |

---

## Hidden bug: Vue I18n pipe = pluralization separator

The literal `|` character in i18n message strings is parsed by Vue I18n as a **pluralization separator**. Without escaping, `t('home.job')` returns only the substring **before** the pipe.

The old `home.job` value `"Front-End Engineer | Web Freelancer"` was silently being truncated to `"Front-End Engineer "` everywhere — the home page typewriter never typed the part after the pipe. Nobody had noticed because both halves were valid job descriptions.

**Fix:** escape with Vue I18n's literal syntax `{'|'}` — the same pattern already used elsewhere in `fr.json` / `en.json` to escape the `@` linked-message marker (e.g. `philippe.eng94{'@'}gmail.com`).

```json
"job": "Senior Frontend Engineer {'|'} Full-Stack Builder"
```

This bug pre-dated the refresh (likely introduced during the Vue 2 → Nuxt 4 migration when vue-i18n 8 → 9 changed the parser). If any other locale strings ever contain literal pipes, they will need the same escape.

---

## Skills wheel logo sourcing

`public/logo/*.png` are colored brand PNGs. Sourcing for the three new ones:

- **typescript.png** — `https://img.icons8.com/color/512/typescript.png` (icons8 CDN, 512×512)
- **aws.png** — `https://img.icons8.com/color/512/amazon-web-services.png` (icons8 CDN, 512×512)
- **nuxt.png** — icons8 had no Nuxt entry. Pulled the iconify `logos:nuxt-icon` SVG and rasterized via wsrv.nl image proxy: `https://wsrv.nl/?url=api.iconify.design%2Flogos%2Fnuxt-icon.svg&w=512&output=png` (512×334).

Wikimedia direct PNG downloads were blocked (returns HTML error page even with a browser UA). Devicons / get-icon repos don't ship PNGs. wsrv.nl is the fallback when only an SVG is available and no local SVG→PNG tooling is installed (no `rsvg-convert` / `imagemagick` / `magick` on this machine).

---

## Known follow-up (not blocking)

**AWS logo dark-theme contrast.** The AWS logo is dark "aws" text + orange swoosh. On the white theme it reads crisply; on the dark theme the dark text loses contrast against the page background. Options if the user wants to address:
1. Swap to a white-text variant of the AWS logo (AWS publishes one in their brand assets).
2. Use a different AWS-adjacent icon (e.g., the orange swoosh alone, or the AWS CDK colorful logo).
3. Apply a theme-conditional class to invert the AWS logo on dark mode only.

The current logo is acceptable but stands out as the lowest-contrast item in the wheel on dark mode.

---

## Verification

- `npm run generate` — 14 routes prerendered, no errors.
- Playwright walkthrough at 1400×900:
  - **EN dark**: home (typewriter completed full tagline), about (full description + 6-entry timeline), skills (description + 11 logos).
  - **EN white**: skills (logos render cleanly, AWS especially crisp).
  - **FR dark**: home (typewriter completed FR tagline), about (Chronologie with all 6 entries), skills (Mes compétences with full FR copy).

No regressions observed.
