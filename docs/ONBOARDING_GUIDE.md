# Onboarding Guide — Environment Setup & Daily Workflow
# オンボーディングガイド — 環境構築・日常作業の手順

> **Target audience / 対象者**: New lab members taking over website maintenance.  
> 新しく Web サイトの管理を担当するラボメンバー向け。
20260406

---

## Table of Contents / 目次

1. [Prerequisites / 必要なもの](#1-prerequisites--必要なもの)
2. [Step 1 — Install GitHub Desktop / GitHub Desktop のインストール](#2-step-1--install-github-desktop--github-desktop-のインストール)
3. [Step 2 — Clone the Repository / リポジトリのクローン](#3-step-2--clone-the-repository--リポジトリのクローン)
4. [Step 3 — Install VS Code / VS Code のインストール](#4-step-3--install-vs-code--vs-code-のインストール)
5. [Step 4 — Install Node.js & npm / Node.js と npm のインストール](#5-step-4--install-nodejs--npm--nodejs-と-npm-のインストール)
6. [Step 5 — Install Project Dependencies / プロジェクト依存関係のインストール](#6-step-5--install-project-dependencies--プロジェクト依存関係のインストール)
7. [Step 6 — Run the Dev Server / 開発サーバーの起動](#7-step-6--run-the-dev-server--開発サーバーの起動)
8. [Step 7 — Debugging Tips / デバッグ方法](#8-step-7--debugging-tips--デバッグ方法)
9. [Step 8 — Commit & Push Changes / 変更のコミットとプッシュ](#9-step-8--commit--push-changes--変更のコミットとプッシュ)
10. [Step 9 — Pull Latest Changes / 最新の変更を取得する](#10-step-9--pull-latest-changes--最新の変更を取得する)
11. [Recommended VS Code Extensions / 推奨 VS Code 拡張機能](#11-recommended-vs-code-extensions--推奨-vs-code-拡張機能)
12. [Common Errors / よくあるエラーと対処法](#12-common-errors--よくあるエラーと対処法)

---

## 1. Prerequisites / 必要なもの

**EN:** Before you start, make sure you have the following:
- A GitHub account that has been added to the repository as a **Collaborator**. Ask the lab supervisor to add you.
- A Windows or macOS computer with internet access.
- Approximately **2 GB** of free disk space.

**JA:** 作業を始める前に、以下を準備してください。
- リポジトリに **Collaborator（共同作業者）** として追加された GitHub アカウント。追加申請は指導教員に相談してください。
- インターネット接続が可能な Windows または macOS のパソコン。
- 約 **2 GB** 以上の空きディスク容量。

---

## 2. Step 1 — Install GitHub Desktop / GitHub Desktop のインストール

**EN:**
GitHub Desktop is a GUI tool that makes it easy to manage Git repositories without using the command line.

1. Open your browser and go to: **https://desktop.github.com/**
2. Click **Download for Windows** (or macOS).
3. Run the installer and follow the on-screen instructions.
4. Launch GitHub Desktop. Sign in with your GitHub account:
   - Click **File → Options → Accounts** (Windows) or **GitHub Desktop → Preferences → Accounts** (macOS).
   - Click **Sign in to GitHub.com** and complete the browser authentication.

**JA:**
GitHub Desktop は、コマンドラインを使わずに Git リポジトリを管理できる GUI ツールです。

1. ブラウザで **https://desktop.github.com/** を開く。
2. **Download for Windows**（または macOS）をクリック。
3. インストーラーを実行し、画面の指示に従ってインストールする。
4. GitHub Desktop を起動し、GitHub アカウントでサインインする：
   - **File → Options → Accounts**（Windows）または **GitHub Desktop → Preferences → Accounts**（macOS）を開く。
   - **Sign in to GitHub.com** をクリックし、ブラウザ上で認証を完了させる。

---

## 3. Step 2 — Clone the Repository / リポジトリのクローン

**EN:**
"Cloning" means downloading the project from GitHub to your local computer.

1. In GitHub Desktop, click **File → Clone Repository…**
2. Select the **GitHub.com** tab.
3. Search for `realworld-ai/realworld-ai.github.io` and select it.
4. Choose a **Local Path** (e.g., `C:\Users\YourName\Documents\lab-website` or `~/Documents/lab-website`).
5. Click **Clone**.

> ✅ After cloning, you will see the project files in the folder you selected.

**JA:**
「クローン」とは、GitHub 上のプロジェクトをローカルのパソコンにダウンロードすることです。

1. GitHub Desktop で **File → Clone Repository…** をクリック。
2. **GitHub.com** タブを選択。
3. `realworld-ai/realworld-ai.github.io` を検索して選択。
4. **Local Path**（保存先フォルダ）を選ぶ（例：`C:\Users\YourName\Documents\lab-website`）。
5. **Clone** をクリック。

> ✅ クローン完了後、選択したフォルダにプロジェクトファイルが展開されます。

---

## 4. Step 3 — Install VS Code / VS Code のインストール

**EN:**
Visual Studio Code (VS Code) is a free code editor. It is the recommended tool for editing this project.

1. Go to: **https://code.visualstudio.com/**
2. Click **Download for Windows** (or macOS).
3. Run the installer. During installation, check the following options:
   - ✅ **Add "Open with Code" action to Windows Explorer file context menu**
   - ✅ **Add "Open with Code" action to Windows Explorer directory context menu**
   - ✅ **Register Code as an editor for supported file types**
4. Launch VS Code after installation.

**Open the project in VS Code:**
- In GitHub Desktop, click the button **Open in Visual Studio Code** (shown in the center of the screen after cloning). This opens the project folder directly.
- Alternatively: In VS Code, click **File → Open Folder…** and select the project folder.

**JA:**
Visual Studio Code（VS Code）は無料のコードエディターです。このプロジェクトの編集に推奨されるツールです。

1. **https://code.visualstudio.com/** にアクセス。
2. **Download for Windows**（または macOS）をクリック。
3. インストーラーを実行。以下のオプションにチェックを入れる：
   - ✅ **エクスプローラーのファイル コンテキスト メニューに [Code で開く] を追加する**
   - ✅ **エクスプローラーのディレクトリ コンテキスト メニューに [Code で開く] を追加する**
   - ✅ **サポートされているファイルの種類のエディターとして Code を登録する**
4. インストール後に VS Code を起動。

**プロジェクトを VS Code で開く：**
- GitHub Desktop でクローン完了後に表示される **Open in Visual Studio Code** ボタンをクリックすると、プロジェクトフォルダが直接開きます。
- または：VS Code で **File → Open Folder…** を選択し、プロジェクトフォルダを指定。

---

## 5. Step 4 — Install Node.js & npm / Node.js と npm のインストール

**EN:**
This project requires **Node.js** (a JavaScript runtime) and **npm** (its package manager). npm is bundled with Node.js.

1. Go to: **https://nodejs.org/**
2. Download the **LTS** version (Long-Term Support — the stable version recommended for most users).
3. Run the installer. Keep all default settings.
4. After installation, verify it worked by opening a terminal:
   - In VS Code: press `` Ctrl+` `` (backtick) to open the integrated terminal.
   - Type the following commands and press Enter after each:

```bash
node --version
# Expected output example: v22.x.x

npm --version
# Expected output example: 10.x.x
```

> ✅ If version numbers appear, Node.js and npm are installed correctly.

**JA:**
このプロジェクトには **Node.js**（JavaScript 実行環境）と **npm**（パッケージマネージャー）が必要です。npm は Node.js に同梱されています。

1. **https://nodejs.org/** にアクセス。
2. **LTS** バージョン（長期サポート版・安定版）をダウンロード。
3. インストーラーを実行。デフォルト設定のままインストール。
4. インストール後、ターミナルで動作確認：
   - VS Code で `` Ctrl+` ``（バッククォート）を押してターミナルを開く。
   - 以下のコマンドを入力して Enter：

```bash
node --version
# 表示例: v22.x.x

npm --version
# 表示例: 10.x.x
```

> ✅ バージョン番号が表示されれば、正しくインストールされています。

---

## 6. Step 5 — Install Project Dependencies / プロジェクト依存関係のインストール

**EN:**
The project uses many third-party libraries (React, Tailwind CSS, Astro, etc.). They are listed in `package.json` and must be downloaded before you can run the site.

1. In the VS Code terminal (`` Ctrl+` ``), make sure you are in the project folder. You should see a path ending with `realworld-ai.github.io`.
2. Run:

```bash
npm install
```

3. Wait for it to finish (this may take 1–2 minutes on first run). You will see a `node_modules/` folder appear in the project.

> ⚠️ **You only need to run `npm install` once** after cloning, or whenever `package.json` changes (e.g., after pulling updates that add new dependencies).

**JA:**
このプロジェクトは多くのサードパーティライブラリ（React、Tailwind CSS、Astro など）を使用しています。これらは `package.json` に記載されており、サイトを動かす前にダウンロードが必要です。

1. VS Code のターミナル（`` Ctrl+` ``）で、プロジェクトフォルダにいることを確認（パスが `realworld-ai.github.io` で終わっていること）。
2. 以下を実行：

```bash
npm install
```

3. 完了まで待つ（初回は 1〜2 分かかる場合があります）。`node_modules/` フォルダがプロジェクト内に生成されます。

> ⚠️ **`npm install` はクローン直後に一度だけ実行すれば OK** です。`package.json` が更新された場合（新しい依存関係が追加された場合）は再実行が必要です。

---

## 7. Step 6 — Run the Dev Server / 開発サーバーの起動

**EN:**
The development server lets you preview the website locally in your browser with live reloading — any file changes are reflected immediately without restarting.

```bash
npm run dev
```

After a few seconds, you will see output like:

```
 astro  v5.x.x ready in 1234 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

Open your browser and go to **http://localhost:4321/ja** to see the Japanese homepage (or **/en** for English).

To stop the server, press **Ctrl+C** in the terminal.

**JA:**
開発サーバーを使うと、ブラウザでウェブサイトをローカルにプレビューできます。ファイルを変更すると、サーバーを再起動しなくても自動で反映されます。

```bash
npm run dev
```

数秒後、ターミナルに以下のような出力が表示されます：

```
 astro  v5.x.x ready in 1234 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

ブラウザで **http://localhost:4321/ja** を開くと日本語ホームページが表示されます（英語は **/en**）。

サーバーを停止するには、ターミナルで **Ctrl+C** を押します。

---

## 8. Step 7 — Debugging Tips / デバッグ方法

### 8.1 Browser Developer Tools / ブラウザの開発者ツール

**EN:**
The most important debugging tool is your browser's built-in developer console.

- Press **F12** (or **Ctrl+Shift+I** / **Cmd+Option+I** on macOS) to open DevTools.
- **Console tab**: Shows JavaScript errors and warnings in red. Read these first when something doesn't work.
- **Elements tab**: Inspect and temporarily edit the HTML/CSS of any element.
- **Network tab**: Check if images or API requests are failing (look for red entries).

**JA:**
最も重要なデバッグツールは、ブラウザに内蔵された開発者コンソールです。

- **F12**（または **Ctrl+Shift+I** / macOS は **Cmd+Option+I**）で開発者ツールを開く。
- **Console タブ**：JavaScript エラーや警告が赤字で表示されます。問題が起きたらまずここを確認。
- **Elements タブ**：ページの HTML/CSS を確認・一時的に編集できます。
- **Network タブ**：画像や API リクエストの失敗を確認できます（赤いエントリに注目）。

---

### 8.2 Terminal Error Messages / ターミナルのエラーメッセージ

**EN:**
When you run `npm run dev` or `npm run build`, Astro outputs errors directly in the terminal. Common patterns:

| Error Message | Likely Cause | Fix |
|--------------|-------------|-----|
| `Cannot find module '...'` | Missing dependency | Run `npm install` |
| `YAML Exception` or `Invalid frontmatter` | Syntax error in a Markdown `.md` file | Check the frontmatter of recently edited news/project files |
| `Type 'X' is not assignable to type 'Y'` | TypeScript type error in `.ts`/`.tsx` files | Read the error location and fix the type |
| `fetch failed` or `ECONNREFUSED` | Researchmap API unreachable (build only) | Check internet connection; the build will use cached data |
| `Port 4321 is already in use` | Another dev server is running | Close the other server or run `npm run dev -- --port 4322` |

**JA:**
`npm run dev` や `npm run build` を実行すると、Astro はエラーをターミナルに直接出力します。よくあるエラーパターン：

| エラーメッセージ | 原因 | 対処法 |
|--------------|------|------|
| `Cannot find module '...'` | 依存関係が不足 | `npm install` を実行 |
| `YAML Exception` / `Invalid frontmatter` | Markdown ファイルの frontmatter に書式エラー | 最近編集した news/project ファイルを確認 |
| `Type 'X' is not assignable to type 'Y'` | TypeScript の型エラー | エラー箇所を読んで型を修正 |
| `fetch failed` / `ECONNREFUSED` | Researchmap API に接続できない | インターネット接続を確認（キャッシュデータで続行可能） |
| `Port 4321 is already in use` | 別の開発サーバーが起動中 | そちらを閉じるか `npm run dev -- --port 4322` で別ポートを使用 |

---

### 8.3 VS Code Problems Panel / VS Code の問題パネル

**EN:**
VS Code automatically highlights errors in open files. Check the **Problems panel**:
- Press **Ctrl+Shift+M** to open it.
- TypeScript errors and Astro/React syntax issues will appear here.
- Click on any error to jump directly to the problematic line.

**JA:**
VS Code は開いているファイルのエラーを自動的にハイライトします。**問題パネル**を確認：
- **Ctrl+Shift+M** で開く。
- TypeScript エラーや Astro/React の構文エラーがここに表示されます。
- エラーをクリックすると、問題のある行に直接ジャンプできます。

---

### 8.4 Checking the Build Locally / ビルドをローカルで確認する

**EN:**
Before pushing changes, you can verify that the full production build works:

```bash
npm run build   # Fetch data + build static files → output to dist/
npm run preview # Serve the built files locally at http://localhost:4321
```

If `npm run build` succeeds without errors, the deployment will also succeed.

**JA:**
変更をプッシュする前に、本番ビルドが正常に動作するか確認できます：

```bash
npm run build   # データ取得 + 静的ファイルのビルド → dist/ フォルダに出力
npm run preview # ビルドされたファイルをローカルで配信 http://localhost:4321
```

`npm run build` がエラーなく完了すれば、デプロイも成功します。

---

## 9. Step 8 — Commit & Push Changes / 変更のコミットとプッシュ

**EN:**
After editing files, you need to **commit** (save a snapshot of changes) and **push** (upload to GitHub). You can do this with either GitHub Desktop or VS Code.

### Method A: GitHub Desktop (Recommended for beginners)

1. Open **GitHub Desktop**. The changed files will be listed under **Changes** on the left.
2. Review the changes by clicking each file. Green lines = added, red lines = removed.
3. In the **Summary** box (bottom left), write a short description of what you changed.
   - Example: `"Add news: Open Campus 2026"`
   - Example: `"Update member: add Taro Yamada"`
4. Click **Commit to main**.
5. Click **Push origin** (top right button). Your changes are now live on GitHub and will trigger an automatic deployment.

### Method B: VS Code Source Control Panel

1. Click the **Source Control icon** in the left sidebar (or press **Ctrl+Shift+G**).
2. Hover over each changed file and click the **+** icon to **stage** it.
3. Type a commit message in the text box at the top.
4. Click the **✓ Commit** button (or press **Ctrl+Enter**).
5. Click **Sync Changes** (or the **↑ Push** button) to upload to GitHub.

**JA:**
ファイルを編集したら、**コミット**（変更のスナップショットを保存）して **プッシュ**（GitHub にアップロード）する必要があります。GitHub Desktop または VS Code のどちらでも行えます。

### 方法 A: GitHub Desktop（初心者に推奨）

1. **GitHub Desktop** を開く。変更されたファイルが左側の **Changes** に一覧表示されます。
2. 各ファイルをクリックして変更内容を確認。緑 = 追加行、赤 = 削除行。
3. 左下の **Summary** ボックスに変更内容の簡単な説明を書く。
   - 例: `"Add news: Open Campus 2026"`
   - 例: `"Update member: add Taro Yamada"`
4. **Commit to main** をクリック。
5. 右上の **Push origin** をクリック。変更が GitHub にアップロードされ、自動デプロイが始まります。

### 方法 B: VS Code のソース管理パネル

1. 左サイドバーの**ソース管理アイコン**をクリック（または **Ctrl+Shift+G**）。
2. 各変更ファイルにカーソルを合わせて **+** アイコンをクリックし、**ステージング**する。
3. 上部のテキストボックスにコミットメッセージを入力。
4. **✓ コミット** ボタンをクリック（または **Ctrl+Enter**）。
5. **変更の同期**（または **↑ プッシュ** ボタン）をクリックして GitHub にアップロード。

---

### Commit Message Guidelines / コミットメッセージの書き方

**EN:** Write short, descriptive messages in English or Japanese. Examples:

| Type | Example |
|------|---------|
| Add news | `Add news: UbiComp 2026 best paper award` |
| Update member | `Update member: add M1 students for 2026` |
| Fix bug | `Fix: news carousel not loading on mobile` |
| Update content | `Update: revise Join Us FAQ answers` |
| Refresh data | `chore: update Researchmap publications data` |

**JA:** 短く分かりやすいメッセージを日本語または英語で書いてください。

| 種類 | 例 |
|------|-----|
| ニュース追加 | `Add news: UbiComp 2026 最優秀論文賞` |
| メンバー更新 | `Update member: 2026年度 M1 学生を追加` |
| バグ修正 | `Fix: モバイルでニュースカルーセルが表示されない問題を修正` |
| 内容更新 | `Update: Join Us FAQ の回答を修正` |
| データ更新 | `chore: Researchmap 論文データを更新` |

---

## 10. Step 9 — Pull Latest Changes / 最新の変更を取得する

**EN:**
If another team member has pushed changes to GitHub, you need to **pull** those changes to keep your local copy up to date. **Always pull before you start editing** to avoid conflicts.

### GitHub Desktop
1. Click **Fetch origin** (top bar) to check for new changes.
2. If changes exist, the button changes to **Pull origin**. Click it.

### VS Code
1. Open the Source Control panel (**Ctrl+Shift+G**).
2. Click the **⋯** menu → **Pull**.

> ⚠️ **If you get a "merge conflict"**: This means two people edited the same lines. GitHub Desktop will mark conflicting files. Open the file in VS Code — you will see sections marked with `<<<<<<< HEAD`, `=======`, and `>>>>>>>`. Edit the file to keep the correct content, remove the markers, then commit the resolved file.

**JA:**
他のチームメンバーが GitHub に変更をプッシュした場合、**プル**してローカルコピーを最新の状態に保つ必要があります。**編集を始める前には必ずプル**してください（コンフリクトを防ぐため）。

### GitHub Desktop
1. 上部バーの **Fetch origin** をクリックして新しい変更がないか確認。
2. 変更がある場合、ボタンが **Pull origin** に変わります。クリックして取り込む。

### VS Code
1. ソース管理パネル（**Ctrl+Shift+G**）を開く。
2. **⋯** メニュー → **プル** をクリック。

> ⚠️ **「マージコンフリクト」が発生した場合**：同じ行を 2 人が同時に編集した場合に起きます。GitHub Desktop がコンフリクトのあるファイルをマークします。VS Code でそのファイルを開くと `<<<<<<< HEAD`、`=======`、`>>>>>>>` の記号が表示されます。正しい内容を残して記号を削除し、ファイルをコミットすれば解決できます。

---

## 11. Recommended VS Code Extensions / 推奨 VS Code 拡張機能

**EN:** Install these extensions in VS Code for a better editing experience (**Ctrl+Shift+X** to open Extensions panel):

**JA:** より快適な編集のために、以下の拡張機能を VS Code にインストールしてください（**Ctrl+Shift+X** で拡張機能パネルを開く）：

| Extension | ID | Description / 説明 |
|-----------|----|--------------------|
| **Astro** | `astro-build.astro-vscode` | Syntax highlighting & IntelliSense for `.astro` files / `.astro` ファイルの構文ハイライト |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Autocomplete for Tailwind class names / Tailwind クラス名の自動補完 |
| **ESLint** | `dbaeumer.vscode-eslint` | JavaScript/TypeScript linting / JS/TS の静的解析 |
| **Prettier** | `esbenp.prettier-vscode` | Auto code formatting / コードの自動整形 |
| **GitLens** | `eamodio.gitlens` | See who changed each line and when / 誰がいつ変更したか確認 |
| **Japanese Language Pack** | `MS-CEINTL.vscode-language-pack-ja` | Japanese UI for VS Code / VS Code の日本語 UI |

**EN:** To install: press **Ctrl+Shift+X**, search for the extension name, and click **Install**.

**JA:** インストール方法：**Ctrl+Shift+X** を押し、拡張機能名を検索して **インストール** をクリック。

---

## 12. Common Errors / よくあるエラーと対処法

| Error / エラー | Cause / 原因 | Fix / 解決策 |
|---------------|-------------|-------------|
| `npm: command not found` | Node.js not installed | Install Node.js from nodejs.org |
| `node_modules not found` | `npm install` not run | Run `npm install` in the project folder |
| Page shows 404 / 404 が表示される | Wrong URL path | Use `/ja/` or `/en/` prefix: `http://localhost:4321/ja` |
| Image not showing / 画像が表示されない | Wrong path or file not uploaded | Check that image file exists in `public/` and path starts with `/` |
| Changes not appearing / 変更が反映されない | Dev server not running or cache | Restart `npm run dev`; do hard refresh (Ctrl+Shift+R) |
| GitHub push rejected / プッシュが拒否される | Local is behind remote | Pull first (`Fetch origin` → `Pull origin`), then push |
| Build succeeds locally but fails on GitHub Actions | Missing file or API issue | Check the **Actions** tab on GitHub for the error log |

---

## Summary / まとめ

**EN:** The typical daily workflow is:

```
1. Pull latest changes (GitHub Desktop: Fetch + Pull)
2. Run dev server: npm run dev
3. Edit files in VS Code
4. Preview at http://localhost:4321/ja
5. Commit changes (GitHub Desktop or VS Code)
6. Push to GitHub → Automatic deployment starts
```

**JA:** 日常的な作業フローは次の通りです：

```
1. 最新の変更を取得（GitHub Desktop: Fetch → Pull）
2. 開発サーバーを起動: npm run dev
3. VS Code でファイルを編集
4. ブラウザで確認: http://localhost:4321/ja
5. 変更をコミット（GitHub Desktop または VS Code）
6. GitHub にプッシュ → 自動デプロイが開始される
```

---

**Last updated / 最終更新**: 2026-04-02
