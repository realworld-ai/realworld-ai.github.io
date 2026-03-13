# The University of Osaka Real-World AI Laboratory Portal

This is the official portal website for the **Real-World AI Laboratory** (Maekawa Lab) at the Graduate School of Information Science and Technology, The University of Osaka.

The website serves as a hub to introduce our research, projects, and members to prospective students and the academic community.

## 🚀 Key Features

*   **Responsive Design**: Fully optimized for both desktop and mobile devices.
*   **Bilingual**: Seamless switching between Japanese (`/ja`) and English (`/en`).
*   **Content Management**:
    *   **News & Research**: Managed via Markdown/MDX files.
    *   **Publications**: Automatically fetched from Researchmap or managed via BibTeX/JSON.
    *   **Members**: Managed via simple JSON data.
*   **Tech Stack**: Built with [Astro](https://astro.build), [React](https://reactjs.org), and [Tailwind CSS](https://tailwindcss.com).

## 🛠️ Project Structure

```text
├── src/
│   ├── components/       # React & Astro UI components
│   ├── content/          # Content Collections (Markdown/MDX)
│   │   ├── news/         # News articles
│   │   ├── projects/     # Project descriptions
│   │   └── research/     # Research domain descriptions
│   ├── data/             # Structured data
│   │   ├── members.json  # Lab members list
│   │   ├── publications.json # Publications list (Generated/Manual)
│   ├── pages/            # File-based routing (en/ and ja/ subfolders)
│   └── scripts/          # Utility scripts (e.g., fetching data)
├── docs/                 # Project documentation (Requirements, Manuals)
└── astro.config.mjs      # Astro configuration
```

## 💻 getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Build

To build the static site for production:

```bash
npm run build
```

This command will:
1.  Run `npm run fetch-pubs` to update publication data from Researchmap.
2.  Generate static HTML files in the `dist/` directory.

### Preview

To preview the built site locally:

```bash
npm run preview
```

## Deployment

The site is configured to automatically deploy to **GitHub Pages** using GitHub Actions.

### Configuration
1.  Go to GitHub repository **Settings**.
2.  Navigate to **Pages** (under the "Code and automation" section).
3.  Under **Build and deployment** > **Source**, select **GitHub Actions**.

### Trigger
*   Any push to the `main` branch will trigger a new deployment.
*   You can monitor the status in the **Actions** tab of your repository.

## �📝 Content Management

### Adding News
1.  Create a new Markdown file in `src/content/news/`.
2.  Use the naming convention `YYYY-MM-DD-title.md`.
3.  Ensure the frontmatter includes `title`, `date`, and `lang` (if applicable).

### Updating Members
1.  Edit `src/data/members.json`.
2.  Add new member objects following the existing structure (name, role, image, etc.).

### Updating Publications
The project includes a script to fetch publications from Researchmap.
-   **Automatic**: The `npm run build` command runs `src/scripts/fetch_researchmap.js` automatically.
-   **Manual**: You can manually run `npm run fetch-pubs` to update `src/data/publications.json` locally.

## 📄 Documentation

For detailed design concepts and maintenance guides, please refer to the `docs/` folder:
-   [Requirements](docs/requirements.md)
-   [Technical Solution](docs/tech_solution.md)
-   [Maintenance Manual](docs/MAINTENANCE_MANUAL.md)

## 📄 License

Internal Use.
