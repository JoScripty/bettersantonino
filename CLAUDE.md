# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Start development server (localhost:5173)
npm run build          # TypeScript check + Vite production build
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix ESLint issues
npm run format         # Format with Prettier
npm run dev:yaml       # Convert YAML to JSON, then start dev server
npm run setup          # Interactive setup script for new installations
npm run index-content  # Index content into Meilisearch (optional)
```

Pre-commit hook runs `lint-staged` automatically (ESLint + Prettier on staged files).

## Architecture

This is a React 19 + TypeScript + Vite app: **BetterSantoNiño.org**, an independent community portal about the **Municipality of Santo Niño, Cagayan** (Region II). It is **not** the official LGU website: never describe it as official, use gov.ph-style headers or the municipal seal, or put words in officials' mouths. It started from the BetterGov LGU starter kit and uses React Router, Tailwind CSS v4, the `@bettergov/kapwa` design system, i18next, nuqs (URL state), and a YAML/Markdown content system. Much of the content is still placeholder: search for `TODO` and `[brackets]` to find values that need official data.

### Site configuration

`src/config/site.ts` holds the site name (`site.name`, "BetterSantoNiño.org"), the government it covers (`site.lguName`, `lguFullName`), the not-affiliated disclaimer, the organization's e-mail and social links, and the Municipal Hall address, phone, and office hours. Each value reads a `VITE_*` env var (see `env.example`) and falls back to a default, so the site works without an .env file. Use `site` from there instead of reading `import.meta.env` directly. Use `site.name` for the website and `site.lguName` only when referring to the municipal government.

### Routing (`src/App.tsx`)

- `/` — Home (hero with search card, services, transparency, Mayor's message, government, hotlines)
- `/services`, `/services/:category`, `/services/:category/:documentSlug` — Services
- `/government`, `/government/:category`, `/government/:category/:documentSlug` — Government
- `/transparency`, `/transparency/:section` — Transparency hub (`full-disclosure`, `bids`, `ordinances`, `citizens-charter`)
- `/hotlines` — Emergency and office hotlines
- `/about` — About this website and about the municipality (`src/pages/About.tsx`)
- `/search` — Meilisearch when `VITE_MEILISEARCH_HOST` is set, otherwise client-side search (`src/lib/localSearch.ts`)
- `*` — 404 (`src/pages/NotFound.tsx`); `Document` also renders it when a page is missing

Menus are built in `src/data/navigation.ts`, which also defines `transparencySections`. The navbar centers the `mainNavigation` dropdowns (Services, Government, Transparency) and puts About and a red Hotlines button on the right (`src/components/layout/Navbar.tsx`). The site does not publish news.

### Content System

#### Services (`content/services/`) and Government (`content/government/`)

1. **`src/data/services.yaml`** / **`src/data/government.yaml`** — Top-level categories (`category`, `slug`, `icon`, `description`). `icon` must be a valid Lucide React icon name.
2. **`content/{services|government}/{category-slug}/index.yaml`** — Pages in the category (`pages:` with `name`, `slug`, `description`; optional `layout: grid|list`, `title`, `description`).
3. **`content/{services|government}/{category-slug}/{page-slug}.md`** — Page content.

When adding a category (services or government):

- Add an entry to the matching YAML file in `src/data/`
- Create `content/{services|government}/{slug}/index.yaml`
- Add the static import and mapping entry to `categoryIndexMap` in `src/data/yamlLoader.ts` (one map serves both trees). A page slug that is also a key in this map (e.g. `legislative`) renders as a nested listing.

Markdown files are loaded dynamically via `import()` in `src/lib/markdownLoader.ts`. The title is the first `# Heading` and the description is the first paragraph. Service pages share one structure: a summary table (office, fee, processing time), then who can apply, requirements, how to apply, and where to get help.

#### Companion JSON files

A markdown page can have a companion JSON file with the same slug (e.g. `executive.md` + `executive.json`). `interpolate()` replaces `{PLACEHOLDER}` tokens: JSON value → `VITE_<KEY>` env var → unchanged token. `executive.json` also feeds the Mayor's message on the home page (`MAYOR`, `HONORIFIC_TITLE`, optional `MAYOR_PHOTO`).

#### Transparency (`content/transparency/`)

`full-disclosure.yaml`, `bids.yaml`, `ordinances.yaml`, and `citizens-charter.yaml` are loaded by `src/lib/transparencyLoader.ts`. PDFs go in `public/documents/transparency/` and are referenced by each record's `file` field. Lists render through `src/components/transparency/RecordTable.tsx` (search and URL-backed filters; a table on desktop, cards on mobile).

#### Hotlines

`src/data/hotlines.yaml`, parsed in `src/data/hotlines.ts`. Numbers in `[brackets]` are placeholders and show as "Number to follow" instead of a tap-to-call link. Entries with `emergency: true` appear on the home page.

### Search

`scripts/index-content.mjs` indexes services and government pages into Meilisearch. Without Meilisearch, `/search` and the hero suggestions use `src/lib/localSearch.ts`, which indexes pages, transparency records, hotlines, and the About page in the browser (accent-insensitive, so "nino" matches "Niño").

### Internationalization

- i18next with `HttpBackend` (`src/i18n.ts`) loads `public/locales/{lang}/common.json`
- Only `en` exists. `AVAILABLE_LANGUAGES` in `src/i18n/languages.ts` controls the language picker, which stays hidden while it has one entry. Add a code there after creating its `common.json`.

### UI Components

Reusable primitives live in `src/components/ui/`: `Section`, `Heading`, `Text`, `Breadcrumbs`, `ScrollToTop`. Cards and banners come from `@bettergov/kapwa` (`@bettergov/kapwa/card`, `@bettergov/kapwa/banner`). Theme colors (`primary`, `secondary`, `accent`, `success`, `warning`, `error`, `gray`) are defined in `src/index.css`.

### Code Style

- Single quotes, 2-space indentation, trailing commas (ES5), semicolons, 80-char line width (enforced by Prettier)
- Arrow functions omit parens for single arguments
- A file that exports React components should not also export constants (react-refresh lint rule)
