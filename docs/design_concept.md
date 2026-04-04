# Design Concept - "Future Lab"

## 1. Design Philosophy
Moving away from the traditional, text-heavy, and rigid "University Official" aesthetic, this design adopts a **"Tech Startup / Indie Lab"** persona. It communicates innovation, energy, and openness—qualities that appeal to Gen Z undergraduate students.

**Keywords:** Modern, Dark Mode, Deep Tech, Clean Typography, Card Grid.

**Status:** ✅ Fully implemented.

## 2. Visual Identity

### 2.1 Color Palette (Dark Mode Default)

| Token | Hex | Usage |
|-------|-----|-------|
| `lab-bg` | `#0B1120` | Deep Navy page background |
| `lab-card` | `#162032` | Card backgrounds (slightly lighter navy) |
| `lab-text` | `#F1F5F9` | Primary text (Slate-100) |
| `lab-subtext` | `#94A3B8` | Secondary/muted text (Slate-400) |
| `lab-accent` | `#0EA5E9` | Primary accent — links, highlights (Sky-500) |
| `lab-accent-hover` | `#38BDF8` | Accent hover state (Sky-400) |
| `lab-secondary` | `#6366F1` | Secondary accent (Indigo-500) |

Additional colors used in global styles:
- Cards override: `#111827` background with `1px solid rgba(255,255,255,0.08)` border
- Card hover: `#162032` background with accent-colored border
- Paragraphs: `#94a3b8` (Slate-400) with justified text
- Headings: `#f8fafc` (Slate-50)
- Purple accent: `#8b5cf6` / Tailwind `purple-500` for projects section
- Yellow: Trophy/award indicators
- Green: Status badges

### 2.2 Typography
-   **Font Families** (defined in `tailwind.config.mjs`):
    -   `sans`: Inter → Noto Sans JP → system-ui → sans-serif
    -   `heading`: Inter → Noto Sans JP → sans-serif
-   **Font Weights**: 400 (body), 600 (semi-bold), 700 (bold headings)
-   **Scale**: Large, bold headings (up to 4rem on desktop). Contrast via size and weight rather than color.
-   **Global overrides** (in `Layout.astro`):
    -   Hero titles: 3.5rem / 4rem with text shadow for contrast
    -   Section headings: uppercase, letter-spacing 0.05em, thin left border accent
    -   Paragraphs: line-height 1.75, justified, Slate-400 color

### 2.3 Icons
-   **Library**: Lucide React
-   **Usage**: Navigation menu items, arrow indicators, trophy/calendar/megaphone for news types, social links on member cards

## 3. Layout Strategy

### 3.1 Landing Page Structure (Implemented)

```
+--------------------------------------------------+
|  [     Hero: Image Slideshow + Lab Name        ]  |  → HeroSlider.tsx (8 images, auto-rotate)
+--------------------------------------------------+
|  [  About Section: Text + YouTube Embed        ]  |  → 2-column grid, iframe video
+--------------------------------------------------+
|  [       News Carousel (Embla Carousel)        ]  |  → NewsCarousel.tsx, horizontal scroll
+--------------------------------------------------+
|  [   Research Themes Grid (3 columns)          ]  |  → Cards linking to /research/{area}
+--------------------------------------------------+
|  [   Funded Projects Grid (3 columns)          ]  |  → Cards with funding/period badges
+--------------------------------------------------+
|  [   Lab Highlights + PerCom Ranking Table     ]  |  → LabFeatures.tsx, 2-column
+--------------------------------------------------+
```

**Mobile View:** All blocks stack vertically with responsive padding. Navigation becomes hamburger menu overlay.

### 3.2 Section Pages
- **Research / Projects**: Card grids with images, descriptions, badges
- **Publications**: Tab-based browser with sidebar filter
- **Members**: Card grid grouped by role (Faculty → Staff → Students)
- **News**: Timeline with year groups and type filters
- **Join Us**: Tab-based with FAQ accordions
- **Access**: 2-column with directions + Google Maps

## 4. Component Design (Implemented)

### 4.1 Astro Components (Server-rendered)
-   **Hero.astro**: Full-width section with image slideshow background via HeroSlider. Content via `<slot />`.
-   **PageHeader.astro**: Reusable page title + optional subtitle + tag pills (using `getTagColor()` from colors utility).
-   **MemberCard.astro**: Circular photo + name (as link) + role. Special handling for "Specially Appointed" role line breaks.
-   **MediaFrame.astro**: White-background container for images/videos with configurable fit and padding.
-   **PublicationItem.astro**: Server-rendered single publication entry.

### 4.2 React Components (Client-hydrated)
-   **Navigation.tsx** (`client:load`): Sticky top blur bar (desktop) + hamburger overlay (mobile). Active state detection. Language switcher (JA↔EN) preserving path + hash.
-   **HeroSlider.tsx** (`client:load`): Auto-rotating fullscreen image slideshow with dot indicators and CSS opacity crossfade.
-   **NewsCarousel.tsx** (`client:load`): Horizontal auto-scrolling news cards using Embla Carousel + autoplay plugin. Cover images, date, tags, award badges.
-   **NewsList.tsx** (`client:only`): Full news listing with filter buttons (All/Awards/Activities) and year-grouped timeline.
-   **PublicationList.tsx** (`client:only`): 7-tab publications/achievements browser with member sidebar filter and search. Tabs: Selected Papers, All Papers, Selected Awards, All Awards, Media, Invited Talks, All Talks.
-   **JoinUs.tsx** (`client:only`): 4-tab recruitment page (Students, Associates, Technical, Visiting). 848 lines with inline bilingual CONTENT object. URL hash sync for tabs. FAQ accordion using `<details>/<summary>`.
-   **LabFeatures.tsx** (`client:only`): Homepage highlights section — 2 feature cards + PerCom ranking table.
-   **PerComRankingCard.tsx**: Reusable ranking table used in two contexts (homepage + JoinUs page).
-   **PublicationItem.tsx**: Client-side version of publication entry.

### 4.3 Card Styles (Global Overrides)
Cards use sharp corners (4px border-radius), no box shadows, 1px subtle borders, and specific dark backgrounds (`#111827`). On hover: slight lift (-2px translateY), accent-colored border, slightly lighter background.

## 5. Navigation Design
-   **Desktop**: Fixed top bar with logo + horizontal nav links + language switcher. Background: `bg-lab-bg/90` with `backdrop-blur-xl`.
-   **Mobile**: Hamburger icon → full-screen overlay menu with icon + label for each nav item.
-   **Nav Items**: Home, Research, Projects, Publications, Members, News, Join Us, Access — each with a Lucide icon.
-   **Active State**: Detected via URL path matching; highlighted with accent color.

## 6. Footer
-   Links to related Osaka University departments (Hara Lab, Computer Vision Lab, Multimedia Engineering, IST, Engineering, The University of Osaka)
-   Copyright line with current year
-   Separated from content by thin top border (`border-white/5`)

## 7. Global UI Polish
-   Custom scrollbar: 8px width, dark track, slate-colored thumb, accent on hover
-   Text selection: Subtle blue highlight (`rgba(59, 130, 246, 0.3)`)
-   Link transitions: 0.15s ease-out color transitions
-   Image desaturation: `saturate(90%)` on all images except hero for a cohesive look
-   Google Maps: Dark theme via CSS filters (`grayscale + invert + contrast`)
