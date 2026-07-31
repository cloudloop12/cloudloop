# Deployment & GitHub Integration Guide

## 1. Connecting & Pushing to GitHub Manually

If the automated Google AI Studio GitHub authorization link returns a `404 Not Found` error, you can easily push this fully initialized Git repository to your personal or organization GitHub account using standard Git commands or direct ZIP export:

### Option A: Via Command Line (Git)

1. Create a new empty repository on [GitHub](https://github.com/new) (e.g., named `cloudloop-app`). Do **not** initialize it with a README or `.gitignore` since this project is already fully initialized.
2. Open a terminal or use Git CLI in your local workspace and set your GitHub repository URL:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```
3. If prompted for credentials, use your GitHub username and a **Personal Access Token (PAT)** (generated from GitHub Settings > Developer Settings > Personal Access Tokens).

### Option B: Via Export (ZIP Upload)

1. In the AI Studio interface, click on the **Settings / Menu** icon at the top right.
2. Select **Export Project** or **Download ZIP**.
3. Unzip the file and push to GitHub or drag and drop into your repository on GitHub.com.

---

## 2. Vercel Deployment Instructions

This repository is pre-configured with `vercel.json` for smooth single-page application (SPA) client-side routing on Vercel.

### Deployment Steps:

1. Log in to [Vercel](https://vercel.com) and click **Add New > Project**.
2. Import your GitHub repository (`YOUR_USERNAME/YOUR_REPOSITORY`).
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables under **Environment Variables**:
   - `GEMINI_API_KEY`: *(Your Gemini API key if required for AI features)*
   - `APP_URL`: *(Your production domain URL)*
5. Click **Deploy**. Vercel will build and host your application with automatic SSL and SPA route fallback.

---

## 3. Project Configuration Overview

- **Routing**: `react-router-dom` v7 with SPA rewrites configured in `vercel.json`.
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin.
- **Animations**: `motion` (Framer Motion equivalent).
- **TypeScript**: Configured with strict typing and standard `tsc --noEmit` linter checks.
