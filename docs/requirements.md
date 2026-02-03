# Requirements Document - Osaka University Lab Portal

## 1. Project Overview
**Goal:** Create a modern, attractive portal website for a research laboratory at Osaka University (Graduate School of Information Science and Technology) to showcase research works and attract talented undergraduate students.

**Target Audience:**
- Undergraduate students (Primary)
- Prospective graduate students (Secondary)
- Academic peers and collaborators

## 2. Core Functional Requirements

### 2.1 Content Modules
The website must include the following sections:
1.  **Home / Landing Page**: High-impact visual introduction.
2.  **Research**: Detailed explanation of research themes and areas.
3.  **Projects**: Showcase of specific ongoing or completed projects (Hardware/Software demos).
4.  **Publications**: Academic output list.
    -   *Data Source*: Manually exported BibTeX file from Researchmap.
    -   *Display*: Categorized by year or type (Journal/Conference).
5.  **Members**: Faculty and student introduction.
    -   Includes photos, roles, link to personal pages/SNS.
6.  **Activities / News**: Lab events, awards, and parties.

### 2.2 Functional Features
-   **Internationalization (i18n)**: Fully bilingual (Japanese / English). User can toggle languages globally.
-   **Responsive Design**: Mobile-first approach. Optimized for viewing on smartphones (where students spend most time).
-   **Rich Media Support**: Native support for embedding YouTube videos, high-res images, and external links.

## 3. Non-Functional Requirements

### 3.1 Design & UX
-   **Style**: Modern, "Deep Tech", Independent style (not a generic university template).
-   **Layout**: "Bento Grid" layout for the landing page to present dense information beautifully.
-   **Performance**: Fast loading speed (Static Site Generation).

### 3.2 Maintenance & Hosting
-   **Hosting**: GitHub Pages (free, reliably hosted).
-   **CMS Strategy**: Git-based Content Management.
    -   Content update via editing Markdown (`.md`, `.mdx`), JSON, and BibTeX files directly in the repository.
    -   No dedicated database or backend server required.
-   **Maintainers**: Research students (Master's/PhD). Setup must be documented clearly in English.

### 3.3 Constraints
-   Initial development by the lecturer (Senior Frontend Dev, approx. 2-3 man-days).
-   Future maintenance handover to students.
-   Researchmap API is not available; use manual file export.
