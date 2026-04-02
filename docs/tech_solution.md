# Technical Solution Architecture

## 1. Technology Stack

### 1.1 Core Framework
-   **Framework**: **Astro** (v5.17+)
    -   *Why*: Best-in-class performance for content-heavy sites (Islands Architecture). Native support for Markdown/MDX. Excellent static output for GitHub Pages.
    -   *Config*: `astro.config.mjs` — site URL is `https://realworld-ai.github.io`, default locale is `ja` with `prefixDefaultLocale: false` (i.e. `/ja` paths explicitly used, no prefix stripping).
-   **UI Library**: **React** (v18)
    -   *Why*: Rich ecosystem for interactive components (Embla Carousel, Framer Motion, Lucide icons).
    -   *Hydration*: Heavy interactive components use `client:only="react"` (JoinUs, PublicationList); navigation-critical components use `client:load` (Navigation, HeroSlider, NewsCarousel).
-   **Styling**: **Tailwind CSS** (v3.4)
    -   *Why*: Rapid development, consistent design system, custom theme tokens for the dark-mode palette.
    -   *Config*: `tailwind.config.mjs` — extends theme with custom color tokens (`lab-bg`, `lab-card`, `lab-text`, `lab-subtext`, `lab-accent`, `lab-accent-hover`, `lab-secondary`) and custom font families (`sans`, `heading`).
-   **Fonts**: `@fontsource/inter` (400/600/700) + `@fontsource/noto-sans-jp` (400/700) + `@fontsource/space-grotesk` (available but currently unused).
-   **Key Libraries**:
    -   `embla-carousel-react` + `embla-carousel-autoplay` — News carousel on homepage
    -   `framer-motion` — Animations (available, used selectively)
    -   `lucide-react` — Icon library used throughout navigation and UI
    -   `citation-js` — BibTeX parsing (available as dependency, not currently used at runtime; data is pre-fetched as JSON)
    -   `clsx` + `tailwind-merge` — Conditional class name utilities

### 1.2 Data & Content Strategy

#### Content Collections (Astro)
Defined in `src/content/config.ts` using Zod schemas:

| Collection | Location | Schema Fields |
|-----------|----------|---------------|
| `news` | `src/content/news/*.md` | title, date, type (award/activity/talk/media/workshop), summary, members, tags, tags_ja, coverImage, links, venue, titleEn, summaryEn |
| `research` | `src/content/research/{ja,en}/*.md` | title, description, image, fit, order |
| `projects` | `src/content/projects/{ja,en}/*.md` | title, status (ongoing/completed), description, image, fit, url, funding, period, role, order |

#### Auto-Generated Data (Researchmap API)
The build script `src/scripts/fetch_researchmap.js` fetches data from the Researchmap public API for all faculty members and writes 5 JSON files:

| File | Content | Source API Endpoint |
|------|---------|-------------------|
| `src/data/publications.json` | Published papers (title, authors, journal, DOI, etc.) | `published_papers` |
| `src/data/awards.json` | Awards and honors | `awards` |
| `src/data/media_coverage.json` | Media appearances | `media_coverage` |
| `src/data/presentations.json` | Invited talks and presentations | `presentations` |
| `src/data/misc.json` | Domestic workshops and misc outputs | `misc` |

Each item is tagged with `rm_id` (Researchmap ID) for member-level filtering in the frontend.

#### Manually Maintained Data

| File | Content | Notes |
|------|---------|-------|
| `src/data/members.json` | Lab member profiles (name, role, image, links) | Roles include Faculty, Collaborators, Staff, Students (D3–B4) |
| `src/data/alumni.json` | Former members | Currently placeholder data; alumni section commented out in pages |
| `src/data/join.json` | Recruitment page content (legacy) | `formUrl` is used; other content superseded by inline CONTENT object in JoinUs.tsx |
| `src/data/percom_ranking.ts` | PerCom conference ranking table data | Bilingual; shared between JoinUs.tsx and LabFeatures.tsx |
| `src/data/research_papers.ts` | Curated representative papers with figures/abstracts | ~14 hand-picked papers across 4 research areas |
| `src/data/researchAreas.ts` | 4 core research area definitions (bilingual) | HAR, Bio-logging, Indoor Positioning, Real-world Data Mining |

### 1.3 Internationalization (i18n)

-   **Routing**: `/ja/...` for Japanese, `/en/...` for English. Root `/` redirects to `/ja`.
-   **Mechanism**: Astro's native i18n routing (`defaultLocale: 'ja'`, `locales: ['ja', 'en']`).
-   **UI Strings**: `src/utils/ui.ts` — exports a type-safe `ui` dictionary keyed by `'ja' | 'en'` containing navigation labels, hero text, button labels, section headings, about text, etc.
-   **Content Collections**: Research and project content is stored in `{ja,en}/` subdirectories. News uses bilingual fields (`title`/`titleEn`, `summary`/`summaryEn`, `tags`/`tags_ja`).
-   **React Components**: Large components (JoinUs.tsx, PublicationList.tsx) embed their own inline bilingual `CONTENT` objects.
-   **Language Switcher**: In Navigation.tsx — maps the current path from one lang prefix to the other, preserving the hash fragment.

## 2. Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: build + deploy to Pages
├── public/
│   ├── assets/
│   │   ├── brand/                # Logo files (logo_EN.png, logo_background.png)
│   │   ├── hero/                 # Hero slideshow images (1.png – 4-2.png, openpackhaikei.png)
│   │   ├── images/
│   │   │   └── papers/           # Research paper figures (biologging/, har/, indoor/)
│   │   └── members/              # Member portrait photos
│   ├── images/
│   │   ├── news/                 # News article cover images
│   │   ├── projects/             # Project card images (hnavi/, JST/, etc.)
│   │   └── theme/                # Research theme images (biologging/, har/, mining/, positioning/)
│   ├── hero-background.svg       # SVG hero background asset
│   └── logo-banner.svg           # Lab logo banner
├── docs/                         # Project documentation (this folder)
├── src/
│   ├── components/
│   │   ├── Hero.astro            # Full-width hero with optional image slideshow
│   │   ├── MediaFrame.astro      # White-bg container for images/videos
│   │   ├── MemberCard.astro      # Circular photo + name/role card
│   │   ├── PageHeader.astro      # Reusable page title + subtitle + tag pills
│   │   ├── PublicationItem.astro # Server-rendered publication entry
│   │   └── react/
│   │       ├── HeroSlider.tsx    # Auto-rotating image slideshow (client:load)
│   │       ├── JoinUs.tsx        # Recruitment page tabs (848 lines, client:only)
│   │       ├── LabFeatures.tsx   # Homepage highlights + PerCom ranking card
│   │       ├── Navigation.tsx    # Responsive nav bar + mobile menu + lang switcher
│   │       ├── NewsCarousel.tsx  # Embla Carousel for news items
│   │       ├── NewsList.tsx      # Full news listing with filters + year groups
│   │       ├── PerComRankingCard.tsx  # Reusable ranking table card
│   │       ├── PublicationItem.tsx    # Client-side publication entry
│   │       └── PublicationList.tsx    # 7-tab publications browser (~340 lines)
│   ├── content/
│   │   ├── config.ts             # Zod schemas for content collections
│   │   ├── news/                 # Markdown: news articles (YYYY-MM-DD-slug.md)
│   │   ├── projects/
│   │   │   ├── en/               # English project descriptions
│   │   │   └── ja/               # Japanese project descriptions
│   │   └── research/
│   │       ├── en/               # English research area content
│   │       └── ja/               # Japanese research area content
│   ├── data/                     # See §1.2 above for all data files
│   ├── layouts/
│   │   └── Layout.astro          # Master layout: head, nav, footer, global styles
│   ├── pages/
│   │   ├── index.astro           # Root redirect → /ja
│   │   ├── en/
│   │   │   ├── index.astro       # English homepage
│   │   │   ├── access.astro      # Access/directions page
│   │   │   ├── joinus.astro      # Recruitment (renders JoinUs.tsx)
│   │   │   ├── members.astro     # Members directory
│   │   │   ├── news.astro        # News listing (renders NewsList.tsx)
│   │   │   ├── projects.astro    # Funded projects listing
│   │   │   ├── publications.astro # Publications (renders PublicationList.tsx)
│   │   │   ├── research.astro    # Research areas overview
│   │   │   ├── news/[slug].astro # Individual news article
│   │   │   └── research/
│   │   │       ├── index.astro   # (EN only) redirect/index
│   │   │       └── [area].astro  # Individual research area detail
│   │   └── ja/                   # (mirrors en/ structure)
│   │       ├── index.astro
│   │       ├── access.astro
│   │       ├── joinus.astro
│   │       ├── members.astro
│   │       ├── news.astro
│   │       ├── projects.astro
│   │       ├── publications.astro
│   │       ├── research.astro
│   │       ├── news/[slug].astro
│   │       └── research/[area].astro
│   ├── scripts/
│   │   └── fetch_researchmap.js  # Build-time data fetcher (Researchmap API → JSON)
│   ├── utils/
│   │   ├── bibtex.ts             # Publication type definition + JSON loader
│   │   ├── colors.ts             # Deterministic tag → color mapping
│   │   └── ui.ts                 # i18n dictionary (ja/en translations)
│   └── env.d.ts                  # Astro TypeScript environment declarations
├── astro.config.mjs              # Astro config (site, integrations, i18n)
├── tailwind.config.mjs           # Tailwind config (custom colors, fonts)
├── tsconfig.json                 # TypeScript config (strict, react-jsx)
└── package.json                  # Dependencies and scripts
```

## 3. Key Architectural Patterns

### 3.1 Hydration Strategy (Islands Architecture)
Astro renders all pages as static HTML. Interactive components are hydrated selectively:

| Directive | Components | Use Case |
|-----------|-----------|----------|
| `client:load` | Navigation, HeroSlider, NewsCarousel | Must be interactive immediately on page load |
| `client:only="react"` | JoinUs, PublicationList, NewsList, LabFeatures | Heavy components that are fully client-rendered (no SSR) |

### 3.2 Data Pipeline
```
Researchmap API → fetch_researchmap.js → JSON files (src/data/*.json)
                                              ↓
                                    Imported by React components at bundle time
                                    (no runtime API calls)
```
The `npm run build` command runs `npm run fetch-pubs` first, ensuring data is always fresh at build time.

### 3.3 Collaborator Exclusion Pattern
Three member IDs (`yasuyuki-matsushita`, `fumio-okura`, `xinpeng-liu`) are consistently treated as "Collaborators" rather than core faculty. They are:
- Displayed in a separate "Collaborators" section on the members page
- Excluded from Researchmap data fetching in `fetch_researchmap.js`
- Excluded from the member filter sidebar in `PublicationList.tsx`

### 3.4 Content Bilingual Strategy
| Content Type | Strategy |
|-------------|----------|
| Astro pages | Separate files in `ja/` and `en/` directories |
| Content Collections (research, projects) | Separate Markdown files in `{ja,en}/` subdirectories |
| News articles | Single file with bilingual fields (title/titleEn, tags/tags_ja); CSS class `.lang-ja`/`.lang-en` toggles visibility in detail pages |
| UI strings | Central dictionary in `src/utils/ui.ts` |
| React components | Inline `CONTENT` objects with `ja`/`en` keys |

## 4. GitHub Pages Deployment

-   **Workflow file**: `.github/workflows/deploy.yml`
-   **Trigger**: Push to `main` branch, or manual dispatch.
-   **Process**:
    1.  Checkout code (`actions/checkout@v5`).
    2.  Build using `withastro/action@v5` (handles install + build + artifact upload).
    3.  Deploy to GitHub Pages using `actions/deploy-pages@v4`.
-   **Permissions**: `contents: read`, `pages: write`, `id-token: write`.
-   **Build command**: `npm run build` → runs `npm run fetch-pubs` (Researchmap fetch) then `astro build`.
-   **Site URL**: `https://realworld-ai.github.io`

## 5. npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `astro dev` | Start local dev server |
| `start` | `astro dev` | Alias for dev |
| `fetch-pubs` | `node src/scripts/fetch_researchmap.js` | Fetch data from Researchmap API → JSON |
| `build` | `npm run fetch-pubs && astro build` | Fetch latest data + build static site |
| `preview` | `astro preview` | Preview production build locally |

## 6. Local Development

```bash
# Install dependencies
npm install

# Start development server (uses existing JSON data)
npm run dev
# Visit http://localhost:4321

# Force-refresh publication data from Researchmap
npm run fetch-pubs

# Production build (fetches data + builds)
npm run build

# Preview production build
npm run preview
```
