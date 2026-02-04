# Website Maintenance Manual

**Welcome to the Lab Portal Maintenance Guide.**
This document outlines how to update content, add new members, and sync publication data.

**Role:** Lab Administrator / Research Assistant
**Prerequisites:** Basic knowledge of Git and Markdown.

---

## 1. How to Add News / Activity

Regular updates (Awards, Activities, etc.) are stored as Markdown files in `src/content/news/`.

1.  Navigate to `src/content/news/`.
2.  Create a new file named `YYYY-MM-DD-title.md` (e.g., `2026-03-20-best-paper.md`).
3.  Use the following template for the content:

    ```markdown
    ---
    title: "Received Best Paper Award at PerCom 2026"
    date: 2026-03-20
    type: "award"  # or "activity", "talk", "media"
    members: ["Takuya Maekawa", "Ryoma Otsuka"] # Optional
    summary: "Our paper on animal behavior received the Best Paper Award."
    links: # Optional
      - label: "Conference Website"
        url: "https://percom.org"
    ---
    
    (Optional: You can write longer details here using standard Markdown.)
    ```

    *   **type**: Critical field. Set to `"award"` to make it appear on the homepage "Awards" section. Set to `"activity"` for general news.
    *   **date**: Used for sorting (newest first).

4.  Commit and push the file. The website will automatically update.

---

## 2. How to Update Publications (Researchmap Sync)

We now use an automated script to fetch data directly from the **Researchmap Public API**, ensuring the website is always synchronized with your official records.

### Automatic Method (Recommended)
When the website is built (e.g., via `npm run build` or CI/CD pipeline), the system automatically fetches the latest data.

### Manual Update (Local Development)
If you want to force an update locally or inspect the data:

1.  Open your terminal in the project root.
2.  Run the fetch command:
    ```bash
    npm run fetch-pubs
    ```
    This script (`src/scripts/fetch_researchmap.js`) downloads your latest publications to `src/data/publications.json`.
3.  (Optional) Commit the updated JSON file if you want to snapshot the data in Git:
    ```bash
    git add src/data/publications.json
    git commit -m "chore: update publications data"
    ```

### Data Categorization
The system automatically organizes papers based on Researchmap data:
- **International**: Entries with English language or "International Conference" type.
  - **Journals**: `scientific_journal` type.
  - **Conferences**: `international_conference_proceedings` type.
- **Domestic**: Entries with Japanese language (`jpn`).

No manual sorting is required. Just ensure your Researchmap entries have the correct "Language" and "Paper Type" set.


---

## 3. How to Update Members

Member data is stored in `src/data/members.json`.

1.  Open `src/data/members.json`.
2.  Find the relevant array (e.g., "Faculty", "Students").
3.  Add a new object for the new member:
    ```json
    {
      "id": "taro-handai",
      "name": "Taro Handai",
      "role": "M1 Student",
      "image": "/assets/members/taro.jpg",
      "links": {
        "github": "https://github.com/...",
        "twitter": "https://twitter.com/..."
      }
    }
    ```
4.  Upload their photo to `public/assets/members/`.

---

## 4. Troubleshooting

**Q: The website is not updating after I push.**
A: Check the **Actions** tab in the GitHub repository. If the build failed, it usually means there is a syntax error in the JSON or Markdown files.

**Q: The Japanese/English switching is broken.**
A: Ensure that for every page created in `src/pages/ja/`, there is a corresponding page in `src/pages/en/` if you want 1:1 parity (though it is not strictly required).
