# Technical Solution Architecture

## 1. Technology Stack

### 1.1 Core Framework
-   **Framework**: **Astro** (v5+).
    -   *Why*: Best-in-class performance for content-heavy sites (Islands Architecture). Native support for Markdown/MDX. Excellent static output for GitHub Pages.
-   **UI Library**: **React**.
    -   *Why*: Leverages the developer's existing senior frontend skills. Rich ecosystem for interactive components (e.g., motion framer, charts).
-   **Styling**: **Tailwind CSS**.
    -   *Why*: Rapid development, consistent design system, easy to implement "Bento Grid" layouts and Dark Mode.

### 1.2 Data & Content Strategy
-   **General Content (Research, News)**:
    -   Format: `.md` or `.mdx` files located in `src/content/`.
    -   Use Astro's Content Collections API for type safety and validation.
-   **Publications**:
    -   Format: `.bib` (BibTeX) file located in `src/data/`.
    -   processing: Build-time parsing using `citation-js` or `bibtex-parser`. Converted to JSON and rendered as React components.
-   **Members**:
    -   Format: `members.json` or individual `.md` files in `src/content/members/`.

### 1.3 Internationalization (i18n)
-   **Routing**: `/ja/...` for Japanese, `/en/...` for English.
-   **Mechanism**: Astro's native i18n routing.
-   **UI Strings**: Type-safe dictionary for common UI labels (e.g., "Read More", "Contact").

## 2. Project Structure
```
/
├── public/               # Static assets (images, favicon)
├── src/
│   ├── components/       # React UI components (Card, Header, Footer)
│   ├── layouts/          # Page layouts (BaseLayout, MDLayout)
│   ├── pages/            # File-based routing
│   │   ├── en/           # English routes
│   │   └── ja/           # Japanese routes
│   ├── content/          # Content Collections
│   │   ├── config.ts     # Schema definitions
│   │   ├── news/         # Markdown files for news
│   │   └── research/     # Markdown files for research domains
│   ├── data/
│   │   ├── publications.bib  # Exported from Researchmap
│   │   └── members.json      # Member profiles
│   └── utils/
│       └── bibtexParser.ts   # Helper to parse .bib files
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
└── package.json
```

## 3. GitHub Pages Deployment
-   **Workflow**: GitHub Actions.
-   **Trigger**: Push to `main` branch.
-   **Process**:
    1.  Checkout code.
    2.  Install dependencies (`npm ci`).
    3.  Build static site (`npm run build`).
    4.  Upload artifact and deploy to Pages environment.
