# Design Concept - "Future Lab"

## 1. Design Philosophy
Moving away from the traditional, text-heavy, and rigid "University Official" aesthetic, this design adopts a **"Tech Startup / Indie Lab"** persona. It communicates innovation, energy, and openness—qualities that appeal to Gen Z undergraduate students.

**Keywords:** Modern, Bento Grid, Dark Mode, Deep Tech, Clean Typography.

## 2. Visual Identity

### 2.1 Color Palette (Dark Mode Default)
-   **Background**: Deep Slate / Charcoal (`#0f172a` or similar). Not pure black, to reduce eye strain and add depth.
-   **Primary Text**: Off-white / Light Grey (`#f8fafc`).
-   **Accent Colors**:
    -   **Electric Blue** (`#3b82f6`): For Research/Tech vibes.
    -   **Vibrant Purple** (`#8b5cf6`) or **Neon Green** (`#10b981`): For highlights, hover states, and call-to-actions.
-   **Card Style**: Semi-transparent backgrounds with subtle borders (Glassmorphism lite).

### 2.2 Typography
-   **Font Family**: English: `Inter` or `Space Grotesk`; Japanese: `Noto Sans JP`.
-   **Scale**: Large, bold headings. Contrast in size and weight rather than color.

## 3. Layout Strategy: The Bento Grid
Inspired by promotional materials from companies like Apple and Linear, the layout organizes disparate content types into a unified, bento-box-style grid.

### 3.1 Landing Page Structure
A grid layout (CSS Grid) that adapts to screen size:

**Desktop View:**
```
+--------------------------------------------------+
|  [         Hero / Mission Statement           ]  |  -> Large Text + 3D/Canvas bg
+---------------------+----------------------------+
| [ News/Update 1 ]   |  [ Featured Research A ]   |  -> Image Card
+---------------------+                            |
| [ News/Update 2 ]   |                            |
+---------------------+----------------------------+
| [   Join Us CTA   ] |  [ Recent Pubs (List) ]    |  -> "Call to Action" button
+--------------------------------------------------+
```

**Mobile View:**
All blocks stack vertically with optimized padding.

## 4. Component Design
-   **Publication List**: Clean, minimalist list. Tags for "Awarded" or "Top Tier".
-   **Member Cards**: "Profile" style cards. Photo + Name + Role + links to GitHub/Twitter/Researchmap.
-   **Navigation**:
    -   **Mobile**: Hamburger menu or bottom tab bar.
    -   **Desktop**: Sticky top blur bar.
