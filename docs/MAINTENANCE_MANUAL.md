# Website Maintenance Manual

**Welcome to the Lab Portal Maintenance Guide.**
This document outlines how to update content, add new members, manage publications, and deploy the site.

**Role:** Lab Administrator / Research Assistant
**Prerequisites:** Basic knowledge of Git and Markdown. Node.js installed locally for development.

---

## 0. Quick Reference

| Task | What to Edit | Then |
|------|-------------|------|
| Add news | Create `src/content/news/YYYY-MM-DD-slug.md` | Commit & push |
| Update publications | Run `npm run fetch-pubs` | Commit JSON files & push |
| Add/remove members | Edit `src/data/members.json` + upload photo to `public/assets/members/` | Commit & push |
| Update recruitment info | Edit `src/components/react/JoinUs.tsx` (inline `CONTENT` object) | Commit & push |
| Update research areas | Edit `src/data/researchAreas.ts` + `src/content/research/{ja,en}/` | Commit & push |
| Add a project | Create `src/content/projects/{ja,en}/slug.md` + add image | Commit & push |
| Change UI translations | Edit `src/utils/ui.ts` | Commit & push |
| Deploy | Push to `main` branch | Automatic via GitHub Actions |

---

## 1. How to Add News / Highlights

All news updates are managed as Markdown files in `src/content/news/`.

### Steps

1.  Navigate to `src/content/news/`.
2.  Create a new file with the naming convention `YYYY-MM-DD-short-title.md`.
    -   Example: `2026-05-10-open-campus.md`
3.  Add frontmatter content:

    ```markdown
    ---
    title: "オープンキャンパス2026"
    titleEn: "Open Campus 2026"
    date: 2026-05-10
    type: "activity"
    summary: "大阪大学オープンキャンパスで研究デモを展示しました..."
    summaryEn: "We exhibited our latest research demos at The University of Osaka Open Campus..."
    tags: ["open campus", "demo"]
    tags_ja: ["オープンキャンパス", "デモ"]
    coverImage: "/images/news/open-campus-2026.jpg"
    ---

    ## 本文（日本語）
    <div class="lang-ja">
    日本語のニュース本文をここに書きます。
    </div>

    ## English content
    <div class="lang-en">
    English news body goes here.
    </div>
    ```

### Frontmatter Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Japanese title |
| `titleEn` | Optional | English title (used on EN pages) |
| `date` | ✅ | Publication date (YYYY-MM-DD). Used for sorting. |
| `type` | ✅ | `"award"`, `"activity"`, `"talk"`, `"media"`, or `"workshop"` |
| `summary` | Optional | Japanese short summary |
| `summaryEn` | Optional | English short summary |
| `tags` | Optional | Array of English tags for filtering/display |
| `tags_ja` | Optional | Array of Japanese tags (shown on JA pages) |
| `coverImage` | Optional | Path to cover image (relative to `public/`) |
| `members` | Optional | Array of member names involved (mainly for awards) |
| `links` | Optional | Array of `{label, url}` external links |
| `venue` | Optional | Conference/event venue name |

### Bilingual News Detail Pages
Use CSS classes `lang-ja` and `lang-en` within the Markdown body to separate Japanese and English content. The detail page template hides the irrelevant language automatically.

### Cover Images
Upload cover images to `public/images/news/`. Recommended size: 800×450px or similar 16:9 ratio.

4.  Commit and push to publish.

---

## 2. How to Update Publications (Researchmap Sync)

We use an automated script to fetch data from the **Researchmap Public API**. This keeps the website synchronized with faculty members' Researchmap profiles.

### What Gets Fetched
The script fetches **5 types of data** for each faculty member:

| Output File | Content | API Endpoint |
|------------|---------|-------------|
| `src/data/publications.json` | Published papers | `published_papers` |
| `src/data/awards.json` | Awards | `awards` |
| `src/data/media_coverage.json` | Media coverage | `media_coverage` |
| `src/data/presentations.json` | Presentations/talks | `presentations` |
| `src/data/misc.json` | Workshops/misc | `misc` |

### Automatic Method (CI/CD)
When the site is built via GitHub Actions (`npm run build`), the fetch script runs automatically before `astro build`.

### Manual Update (Local Development)

```bash
# Fetch latest data from Researchmap
npm run fetch-pubs

# Verify the updated data
git diff src/data/

# (Optional) Commit the updated files
git add src/data/publications.json src/data/awards.json src/data/media_coverage.json src/data/presentations.json src/data/misc.json
git commit -m "chore: update Researchmap data"
```

### How Faculty Members Are Identified
The script reads `src/data/members.json`, extracts `researchmap` URLs from faculty members' `links` field, and derives their Researchmap IDs. Three collaborator IDs (`yasuyuki-matsushita`, `fumio-okura`, `xinpeng-liu`) are excluded from fetching.

### Data Categorization
The system automatically organizes papers:
- **International**: Entries with English language or international conference type.
  - **Journals**: `scientific_journal` type
  - **Conferences**: `international_conference_proceedings` type
- **Domestic**: Entries with Japanese language (`jpn`)

No manual sorting is required. Ensure Researchmap entries have the correct "Language" and "Paper Type" set.

### Publications Page Features
The frontend `PublicationList.tsx` component provides:
- **7 Tabs**: Selected Papers, All Papers, Selected Awards, All Awards, Media, Invited Talks, All Talks
- **Member filter sidebar**: Filter publications by faculty member
- **Full-text search**: Search across titles, authors, journals, and events
- **Year grouping**: Entries grouped and sorted by year (descending)

---

## 3. How to Update Members

Member data is stored in `src/data/members.json`.

### Steps

1.  Open `src/data/members.json`.
2.  Add a new entry to the appropriate section of the array:

    ```json
    {
      "id": "taro-handai",
      "name": "Taro Handai",
      "nameJa": "阪大太郎",
      "role": "M1 Student",
      "image": "/assets/members/taro.jpg",
      "links": {
        "github": "https://github.com/taro",
        "twitter": "https://twitter.com/taro",
        "website": "https://taro.example.com",
        "researchmap": "https://researchmap.jp/taro-handai"
      }
    }
    ```

3.  Upload their photo to `public/assets/members/` (square format recommended, ~400×400px).

### Role Values
The members page groups people by role. Current valid role strings:

| Role | Section |
|------|---------|
| `Professor`, `Invited Professor`, `Associate Professor`, `Lecturer` | Faculty |
| `Specially Appointed Assistant Professor`, `Specially Appointed Researcher` | Faculty |
| `Technical Assistant`, `Administrative Assistant` | Staff |
| `D3 Student`, `D2 Student`, `D1 Student` | Doctoral Students |
| `M2 Student`, `M1 Student` | Master's Students |
| `B4 Student` | Undergraduate Students |

### Collaborators
Members with IDs `yasuyuki-matsushita`, `fumio-okura`, `xinpeng-liu` are displayed in a separate "Collaborators" section. To add a new collaborator, the filtering logic in `src/pages/{ja,en}/members.astro` must be updated.

### Member Name Display
In `MemberCard.astro`, the member's name becomes a clickable link using this priority: website → researchmap → github → twitter. "Specially Appointed" roles automatically get a line break for readability.

### Alumni
Alumni data is in `src/data/alumni.json` but the alumni section is **currently commented out** in both `ja/members.astro` and `en/members.astro`. To re-enable it, uncomment the relevant section in both page files.

---

## 4. How to Update Research Areas

### Area Definitions
Edit `src/data/researchAreas.ts` to modify the 4 core research areas:
- `har` — Human Activity Recognition (人間行動認識)
- `biologging` — AI Bio-logging (AIバイオロギング)
- `positioning` — Indoor Positioning (屋内位置測位)
- `mining` — Real-world Data Mining (実世界データマイニング)

Each area has bilingual fields: `id`, `title`, `titleJa`, `description` (ja), `descriptionEn`, and optional `video` URL.

### Area Detail Content
Research area detail pages pull from content collections (`src/content/research/{ja,en}/`) and curated papers (`src/data/research_papers.ts`).

### Representative Papers
Edit `src/data/research_papers.ts` to update the curated list of representative papers shown on research area pages. Each paper entry includes:
- `area`: Which research area it belongs to
- `keywords`: Array of keywords (aggregated into tag clouds on the page)
- `figure`: Path to a figure image (stored in `public/assets/images/papers/`)
- `abstractJa` / `abstractEn`: Bilingual abstracts

---

## 5. How to Update the Join Us / Recruitment Page

The recruitment page uses a React component `src/components/react/JoinUs.tsx` with all bilingual text defined inline in the `CONTENT` object.

### To Update Text Content
Edit the `CONTENT` object at the top of `JoinUs.tsx`. The object has `ja` and `en` keys, each containing:
- `tabs[]` — Tab labels (students, associates, technical, visiting)
- `students` — Intro, masters card, PhD card, financial support, FAQ
- `associates` — Intro, roles list
- `technical` — Intro, open positions
- `visiting` — Intro, visitor info, schedule, FAQ

### To Update the Google Form URL
Edit `src/data/join.json` and update the `formUrl` field. The JoinUs component imports this URL.

### To Update the PerCom Ranking Table
Edit `src/data/percom_ranking.ts`. This data is shared between:
- `JoinUs.tsx` (compact version in the "Why Study Here" section)
- `LabFeatures.tsx` (displayed on the homepage)

---

## 6. How to Update Projects

Projects are managed as content collections.

1.  Create files in both `src/content/projects/ja/slug.md` and `src/content/projects/en/slug.md`.
2.  Add frontmatter:

    ```markdown
    ---
    title: "プロジェクト名"
    status: "ongoing"
    description: "プロジェクトの説明"
    image: "/images/projects/project-name/thumbnail.png"
    url: "https://external-project-site.com"
    funding: "JST CREST"
    period: "2024–2027"
    role: "研究分担者"
    order: 1
    ---
    ```

3.  Upload project images to `public/images/projects/`.
4.  Projects are sorted by period start year (descending) on the listing page.

---

## 7. How to Update Access / Directions Page

Edit `src/pages/ja/access.astro` and `src/pages/en/access.astro` directly. These are static pages containing:
- University address
- Directions (train, airplane, car)
- Embedded Google Maps iframe

---

## 8. Deployment

### Automatic Deployment
Every push to the `main` branch triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Code checkout
2. Build (includes Researchmap data fetch + Astro static build)
3. Deploy to GitHub Pages

### Manual Deployment
```bash
# Build locally
npm run build

# Preview the build
npm run preview
```

---

## 9. Troubleshooting

**Q: The website is not updating after I push.**
A: Check the **Actions** tab in the GitHub repository. Common causes:
- JSON syntax error in data files
- Markdown frontmatter YAML syntax error
- Researchmap API timeout (the build will still succeed with cached data)

**Q: The Japanese/English switching is broken.**
A: Ensure that for every page in `src/pages/ja/`, there is a corresponding page in `src/pages/en/`. The language switcher in the navigation maps paths 1:1 between language prefixes.

**Q: Publications are not showing up.**
A: Run `npm run fetch-pubs` locally to check for API errors. Verify that the member's Researchmap profile has the `researchmap` URL in `src/data/members.json`.

**Q: A new member's photo is not displaying.**
A: Ensure the image file is in `public/assets/members/` and the `image` path in `members.json` starts with `/assets/members/`.

**Q: The PerCom ranking data is outdated.**
A: Edit `src/data/percom_ranking.ts` directly and update the table data.

**Q: How do I add a new page section?**
A: Create both `src/pages/ja/newpage.astro` and `src/pages/en/newpage.astro`. Add navigation entries in `src/layouts/Layout.astro` (the `navItems` array) and add translation keys to `src/utils/ui.ts`.

---

**Last updated**: 2026-04-02
