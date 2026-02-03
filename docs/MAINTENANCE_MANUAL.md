# Website Maintenance Manual

**Welcome to the Lab Portal Maintenance Guide.**
This document outlines how to update content, add new members, and sync publication data.

**Role:** Lab Administrator / Research Assistant
**Prerequisites:** Basic knowledge of Git and Markdown.

---

## 1. How to Add News / Activity

Regular updates (Awards, Parties, Conferences) are stored as Markdown files.

1.  Navigate to `src/content/news/`.
2.  Create a new file named `YYYY-MM-DD-title.md` (e.g., `2024-04-01-welcome-party.md`).
3.  Add the frontmatter and content:
    ```markdown
    ---
    title: "Welcome Party for New Students"
    date: 2024-04-01
    tags: ["Event", "Life"]
    lang: "ja"
    ---
    We held a welcome party for the new B4 students...
    (You can paste images here if configured)
    ```
4.  Commit and push the file.

---

## 2. How to Update Publications (Researchmap Sync)

Since we do not use the Researchmap API directly, you need to manually export and replace the data file. **Perform this update once a semester or after major publication acceptance.**

### Step 1: Export from Researchmap
1.  Log in to your **Researchmap** dashboard.
2.  Go to the **Published Papers** (業績リスト / 論文) section.
3.  Look for the **Export** (出力) button.
4.  Select **BibTeX** format.
5.  Download the file (usually named `export.bib` or similar).

### Step 2: Update the Website
1.  Rename the downloaded file to `publications.bib`.
2.  Replace the existing file in the repository at:
    `src/data/publications.bib`
3.  Commit and push the change.
    ```bash
    git add src/data/publications.bib
    git commit -m "chore: update publications from researchmap"
    git push origin main
    ```
4.  The website will automatically rebuild, and the new papers will appear in the "Publications" section.

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
