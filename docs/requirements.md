# Requirements Document - The University of Osaka Lab Portal

## 1. Project Overview
**Goal:** Create a modern, attractive portal website for a research laboratory at The University of Osaka (Graduate School of Information Science and Technology) to showcase research works and attract talented undergraduate students.

**Target Audience:**
- Undergraduate students (Primary)
- Prospective graduate students (Secondary)
- Academic peers and collaborators

**Status:** ✅ All core requirements implemented and deployed.

## 2. Core Functional Requirements

### 2.1 Content Modules
The website includes the following sections:

| # | Section | Status | Implementation |
|---|---------|--------|---------------|
| 1 | **Home / Landing Page** | ✅ | Hero slideshow (8 images), about section with YouTube embed, news carousel, research themes grid, projects grid, lab highlights/PerCom ranking |
| 2 | **Research** | ✅ | Overview page with 4 research area cards (HAR, Bio-logging, Positioning, Mining) + detail pages per area with representative papers, keyword clouds, and figures |
| 3 | **Projects** | ✅ | Funded projects listing from content collections, sorted by period. Cards with images, funding source, period, role badges |
| 4 | **Publications** | ✅ | 7-tab browser (Selected/All Papers, Selected/All Awards, Media, Invited/All Talks) with member filter sidebar, full-text search, year grouping |
| 5 | **Members** | ✅ | Faculty, collaborators, staff, students (by grade D3→B4). Photo cards with social links. Alumni section prepared but currently disabled |
| 6 | **News** | ✅ | Filterable timeline (All/Awards/Activities), year-grouped. Individual detail pages with bilingual content. Homepage carousel (Embla) |
| 7 | **Join Us** | ✅ | 4-tab recruitment page: Student Recruitment, Research Associates, Technical Staff, Lab Visits. With FAQ accordions, PerCom ranking, Google Form CTA |
| 8 | **Access** | ✅ | Static directions page with Google Maps embed (dark-themed via CSS filters) |

### 2.2 Functional Features

| Feature | Status | Implementation |
|---------|--------|---------------|
| **Internationalization (i18n)** | ✅ | Fully bilingual (JA/EN). Language switcher in nav bar. Separate page files + content collections + UI dictionary + inline CONTENT objects |
| **Responsive Design** | ✅ | Mobile hamburger menu, responsive grids, optimized touch targets |
| **Rich Media Support** | ✅ | YouTube embeds on homepage and research pages, high-res image cards, external link support |
| **Data Auto-Sync** | ✅ | Researchmap API fetch at build time → 5 JSON files (publications, awards, media, presentations, misc) |

## 3. Non-Functional Requirements

### 3.1 Design & UX
-   **Style**: ✅ Dark mode "Deep Tech" aesthetic with custom color tokens (lab-bg, lab-accent, etc.)
-   **Layout**: ✅ Grid-based landing page with hero slideshow, news carousel, research/project card grids
-   **Performance**: ✅ Static Site Generation via Astro Islands Architecture. Interactive components hydrated selectively (`client:load` / `client:only`).
-   **Typography**: ✅ Inter + Noto Sans JP via @fontsource. Large bold headings with contrast in size/weight.
-   **Icons**: ✅ Lucide React icon library used throughout.

### 3.2 Maintenance & Hosting
-   **Hosting**: ✅ GitHub Pages (free, via GitHub Actions auto-deploy on push to `main`).
-   **CMS Strategy**: ✅ Git-based Content Management.
    -   News: Markdown files in `src/content/news/`
    -   Research/Projects: Markdown files in `src/content/{research,projects}/{ja,en}/`
    -   Members: JSON file `src/data/members.json`
    -   Publications: Auto-generated JSON from Researchmap API
    -   Recruitment: Inline content in React component
-   **Maintainers**: Research students (Master's/PhD). This documentation and the maintenance manual provide handover guidance.

### 3.3 Technical Stack (Implemented)
-   **Framework**: Astro v5.17+ with React, Tailwind CSS, MDX integrations
-   **UI Library**: React 18 with Embla Carousel, Framer Motion, Lucide icons
-   **Styling**: Tailwind CSS v3.4 with custom theme (dark mode default)
-   **Build**: `npm run build` = Researchmap fetch + Astro static build
-   **Deploy**: GitHub Actions → GitHub Pages
-   **TypeScript**: Strict mode, react-jsx transform

### 3.4 Pages Inventory

| Route Pattern | JA | EN | Dynamic |
|--------------|----|----|---------|
| `/` | Redirect → `/ja` | — | — |
| `/{lang}/` | ✅ | ✅ | — |
| `/{lang}/research` | ✅ | ✅ | — |
| `/{lang}/research/{area}` | ✅ | ✅ | `[area].astro` |
| `/{lang}/projects` | ✅ | ✅ | — |
| `/{lang}/publications` | ✅ | ✅ | — |
| `/{lang}/members` | ✅ | ✅ | — |
| `/{lang}/news` | ✅ | ✅ | — |
| `/{lang}/news/{slug}` | ✅ | ✅ | `[slug].astro` |
| `/{lang}/joinus` | ✅ | ✅ | — |
| `/{lang}/access` | ✅ | ✅ | — |
