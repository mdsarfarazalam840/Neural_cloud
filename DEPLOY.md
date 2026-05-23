# DEPLOY — NEURAL_ARCHITECT

> Step-by-step deployment guides for hosting this Vite + React SPA on 12+ cloud platforms.

---

## Overview

NEURAL_ARCHITECT is a **static single-page application (SPA)** built with Vite + React Router. The production build outputs to `dist/` — a folder of static files (HTML, CSS, JS, assets) that can be served by any static host or CDN.

**Key deployment facts:**

| Item | Value |
|------|-------|
| Build command | `npm run build` |
| Output directory | `dist/` |
| Framework | Vite + React 19 |
| Routing | React Router v7 (client-side SPA) |
| Optional backend | WebSocket terminal server (Node.js — see note below) |

> **SPA Routing Requirement:** Because the app uses client-side routing, the server must serve `index.html` for all URL paths (not just `/`). Every platform below includes the necessary config for this.

---

## Prerequisites

- **Node.js** 18+ and npm
- **Git** installed and configured
- An account on your chosen deployment platform (most offer free tiers)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

---

## Build

```bash
npm install
npm run build
```

The built files are in `dist/`. You can preview them locally:

```bash
npm run preview
```

---

## Deployment Platforms

---

### 1. Vercel

**Difficulty:** ★☆☆ Easy  
**Free tier:** Unlimited sites, 100 GB bandwidth, 6000 build minutes/month  
**Auto-detects:** Yes (Vite preset)

#### Via Git (Recommended)

1. Push your repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel auto-detects **Vite** and fills in:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.
5. Your site is live at `your-project.vercel.app`.

**SPA routing:** Create `vercel.json` in your project root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Commit and push — Vercel redeploys automatically.

#### Via CLI

```bash
npm i -g vercel
vercel           # deploy to preview
vercel --prod    # deploy to production
```

#### Environment Variables

Set in: Project Settings → Environment Variables  
Prefix: `VITE_` (e.g., `VITE_API_URL`)

---

### 2. Netlify

**Difficulty:** ★☆☆ Easy  
**Free tier:** 100 GB bandwidth, 300 build minutes/month, unlimited sites  
**Auto-detects:** Yes (Vite preset)

#### Via Git

1. Push your repo to GitHub/GitLab.
2. Go to [app.netlify.com/start](https://app.netlify.com/start) and import your repository.
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Click **Deploy site**.

**SPA routing:** Create `public/_redirects` in your project:

```
/*    /index.html   200
```

> Netlify copies the `public/` folder into `dist/` during build, so this file ends up in the right place.

**Alternative:** `netlify.toml` at project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Via CLI

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Environment Variables

Set in: Site Settings → Environment Variables  
Prefix: `VITE_`

---

### 3. Cloudflare Pages

**Difficulty:** ★☆☆ Easy  
**Free tier:** Unlimited sites, unlimited bandwidth, 500 builds/month  
**Auto-detects:** Yes (Vite preset)

#### Via Git

1. Push your repo to GitHub/GitLab.
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create application → Pages → Connect to Git.
3. Select your repository.
4. Set build configuration:
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
5. Click **Save and Deploy**.

**SPA routing:** Create `public/_redirects`:

```
/*    /index.html   200
```

#### Via Wrangler CLI

```bash
npm i -g wrangler
wrangler login
wrangler pages project create neural-architect --production-branch main
wrangler pages deploy dist --project-name neural-architect --branch main
```

#### Drag & Drop

1. Go to Cloudflare Dashboard → Workers & Pages → Create application → Pages.
2. Select **Drag and drop your files**.
3. Upload the contents of your `dist/` folder.
4. Enter a project name and click **Deploy site**.

**SPA routing:** After deployment, go to your project → Settings → Add a `_redirects` file with `/* /index.html 200`.

#### Environment Variables

Set in: Project Settings → Environment variables  
Prefix: `VITE_`

---

### 4. GitHub Pages

**Difficulty:** ★★☆ Medium  
**Free tier:** Unlimited sites (1 per repo), 1 GB storage, 100 GB bandwidth/month  
**Auto-detects:** No (manual config required)

#### Via gh-pages package

1. Install the deploy tool:

```bash
npm install --save-dev gh-pages
```

2. Add these scripts to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.js` to set the base path:

```js
export default defineConfig({
  base: '/your-repo-name/',  // replace with your GitHub repo name
  plugins: [react(), tailwindcss(), terminalPlugin()],
})
```

4. Deploy:

```bash
npm run deploy
```

5. In your GitHub repo → Settings → Pages → set source to **gh-pages** branch.

**SPA routing:** Create a copy of `index.html` as `404.html` in the `public/` folder. GitHub Pages serves `404.html` for any missing route, which allows React Router to handle the navigation:

```bash
cp dist/index.html dist/404.html
```

Add this to your `deploy` script or use a predeploy hook.

#### Via GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: cp dist/index.html dist/404.html
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Environment Variables

Set via GitHub Actions secrets or `.env` files committed to repo (use `.env.production` for Vite).

---

### 5. Firebase Hosting

**Difficulty:** ★★☆ Medium  
**Free tier:** 10 GB storage, 360 MB/day bandwidth, custom domains with SSL  
**Auto-detects:** No (manual config)

1. Install the Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Log in:

```bash
firebase login
```

3. Initialize hosting in your project:

```bash
firebase init hosting
```

Answer the prompts:

```
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File dist/index.html already exists. Overwrite? No
```

4. Build and deploy:

```bash
npm run build
firebase deploy
```

Your site is live at `https://your-project.web.app`.

**Manual firebase.json** (alternative to CLI init):

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

#### Environment Variables

Set via `.env.production` before building, or use Cloud Functions for runtime vars.

---

### 6. Render

**Difficulty:** ★☆☆ Easy  
**Free tier:** Static sites are free, custom domains with automatic SSL  
**Auto-detects:** No (but simple to configure)

1. Push your repo to GitHub/GitLab.
2. Go to [dashboard.render.com](https://dashboard.render.com) → **New +** → **Static Site**.
3. Connect your repository.
4. Configure:
   - **Name:** `neural-architect`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**.

**SPA routing:** Go to your site dashboard → **Redirects/Rewrites** → **Add Rule**:

- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** `Rewrite`

#### Environment Variables

Set in: Dashboard → Environment  
Prefix: `VITE_`

---

### 7. Railway

**Difficulty:** ★★☆ Medium  
**Free tier:** $5 credit/month (enough for small projects), auto-deploy from GitHub  
**Auto-detects:** No (requires config)

#### Via GitHub

1. Push your repo to GitHub.
2. Go to [railway.com/new](https://railway.com/new) → **Deploy from GitHub repo**.
3. Select your repository.
4. Railway deploys using the default build command (`npm run build`).

**Important:** For static SPAs, Railway requires a web server. Add a `Dockerfile`:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
```

And a `Caddyfile`:

```
:80
root * /usr/share/caddy
try_files {path} /index.html
file_server
```

#### Via CLI

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

Then go to **Networking** → **Generate Domain**.

---

### 8. AWS S3 + CloudFront

**Difficulty:** ★★★ Hard  
**Free tier:** 5 GB S3 storage, 1 TB CloudFront transfer/month (12 months)  
**Auto-detects:** No

#### Steps

1. Build your app:

```bash
npm run build
```

2. Create an S3 bucket:
   - Bucket name: your domain name (e.g., `neural-architect.com`)
   - Uncheck **Block all public access**
   - Enable **Static website hosting** with index document: `index.html`

3. Upload the `dist/` folder contents to the bucket:

```bash
aws s3 sync dist/ s3://your-bucket-name
```

4. Create a CloudFront distribution:
   - Origin: S3 bucket's static website endpoint
   - Viewer protocol policy: **Redirect HTTP to HTTPS**
   - Default root object: `index.html`

5. **SPA routing:** Add a custom error response in CloudFront:
   - Go to CloudFront distribution → Error Pages → **Create Custom Error Response**
   - HTTP Error Code: **403** or **404**
   - Customize Error Response: **Yes**
   - Response Page Path: `/index.html`
   - HTTP Response Code: **200**

#### Automation with GitHub Actions

Create `.github/workflows/deploy-s3.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: your-bucket-name
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

### 9. Surge.sh

**Difficulty:** ★☆☆ Easy  
**Free tier:** Unlimited sites with `surge.sh` subdomain, custom domains on paid plan  
**Auto-detects:** No

1. Install Surge CLI:

```bash
npm install -g surge
```

2. Build and deploy in one command:

```bash
npm run build && surge dist your-project.surge.sh
```

3. Follow the prompts to create an account (first time only).

**SPA routing:** Surge automatically serves `200.html` for any missing route. Create a fallback in the `public/` folder before building:

```bash
cp public/index.html public/200.html
```

Or after build:

```bash
cp dist/index.html dist/200.html
```

#### Deploy script

Add to `package.json`:

```json
"scripts": {
  "deploy:surge": "npm run build && cp dist/index.html dist/200.html && surge dist neural-architect.surge.sh"
}
```

---

### 10. Kinsta

**Difficulty:** ★☆☆ Easy  
**Free tier:** Static Site Hosting — 1 site free, 100 GB bandwidth, custom domains  
**Auto-detects:** Yes (Vite preset)

1. Push your repo to GitHub.
2. Go to [kinsta.com](https://kinsta.com) → Static Site Hosting → **Add Site**.
3. Connect your GitHub repository.
4. Kinsta auto-detects Vite:
   - **Build Command:** `npm run build`
   - **Node Version:** 20 (or latest LTS)
   - **Publish Directory:** `dist`
5. Click **Deploy**.

**SPA routing:** Create `public/_redirects`:

```
/*    /index.html   200
```

---

### 11. Azure Static Web Apps

**Difficulty:** ★★★ Hard  
**Free tier:** Free tier includes 100 GB bandwidth, 2 apps, custom domains, SSL  
**Auto-detects:** Yes (via SWA CLI)

#### Via VS Code Extension

1. Install the **Azure Static Web Apps** extension in VS Code.
2. Open your project, press `Ctrl+Shift+P` → **Azure Static Web Apps: Create Static Web App**.
3. Follow the wizard:
   - Name your app
   - Choose **React** as framework preset
   - Set **App location:** `/`
   - Set **Output location:** `dist`
4. The extension creates a GitHub Actions workflow and deploys.

**SPA routing:** Create `staticwebapp.config.json` in your project root:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*"]
  }
}
```

#### Via CLI

```bash
npm install -D @azure/static-web-apps-cli
npx swa init --yes
npx swa build
npx swa deploy --env production
```

---

### 12. Static.app

**Difficulty:** ★☆☆ Easy (easiest — no Git, no CLI)  
**Free tier:** 1 site free, HTTPS, analytics, 250 MB storage  
**Auto-detects:** No (manual upload)

1. Build your app:

```bash
npm run build
```

2. Open the `dist/` folder, select **all files inside it**, and compress them into a **ZIP archive**. Make sure `index.html` is at the root of the ZIP (not nested in a subfolder).

3. Go to [static.app](https://static.app), drag the ZIP onto the upload area.

4. Your site is live in ~15 seconds with a shareable URL and automatic HTTPS.

**SPA routing:** Create a `200.html` file in the ZIP root (copy of `index.html`). Static.app serves `200.html` for SPA fallback.

---

## WebSocket Terminal Note

The embedded terminal emulator (`ShellTerminal.jsx`) connects to a **WebSocket server** that spawns a local shell process. This requires a **running Node.js process** with the WebSocket server active.

**On static-only hosts** (GitHub Pages, Surge, Static.app, S3, etc.): The terminal UI loads, but it will show **"connecting..."** indefinitely because there is no WebSocket server to connect to. This is expected — the rest of the app works normally.

**To enable the terminal in production**, you have two options:

1. **Use Vite's dev server** (not for production traffic):
   ```bash
   npm run dev
   ```
   The terminal plugin is automatically embedded.

2. **Run the standalone terminal server** alongside your static site:
   ```bash
   npm run terminal
   # WebSocket server running on ws://localhost:3001
   ```
   Then point the client to this server (update the WebSocket URL in `ShellTerminal.jsx`).

Platforms that can run the terminal alongside your site: **Railway** (via Dockerfile), **Kinsta** (Application Hosting), **Render** (Web Service), **AWS EC2/EKS**, **DigitalOcean**.

---

## CI/CD with GitHub Actions

Automated deployment for most platforms. Example for Netlify:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: ./dist
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

Substitute the deploy action for your preferred platform. Environment variable secrets are set in your GitHub repo → Settings → Secrets and variables → Actions.

---

## Environment Variables

This project uses Vite, which requires the `VITE_` prefix for client-exposed environment variables.

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | API endpoint | `https://api.example.com` |

**All platforms** require you to set these **before build** — they are baked into the JavaScript bundle at build time (not available at runtime). After adding/changing variables, trigger a new deploy.

To set them:

- **Vercel / Netlify / Cloudflare / Render / Kinsta:** Dashboard → Environment Variables → Add `VITE_` variables → Redeploy.
- **GitHub Actions:** Add as repository secrets, then reference in the workflow.
- **Local / Manual:** Create `.env.production` in your project root:

```
VITE_API_URL=https://api.example.com
```

---

## Troubleshooting

### Blank page after deploy

- Check the **Publish Directory** is set to `dist`. If it's set to `build`, `public`, or the project root, the app won't load.
- Ensure `index.html` is at the root of the published directory, not inside a subfolder.
- Open browser DevTools → Console for any JavaScript errors (often a missing env variable or incorrect base path).

### 404 on page refresh or direct URL access

- **Cause:** The server doesn't know to serve `index.html` for client-side routes. When you refresh `/core`, the server looks for a file at `core/index.html` which doesn't exist.
- **Fix:** Add the SPA fallback rule for your platform:
  - **Vercel:** `vercel.json` with `rewrites`
  - **Netlify:** `_redirects` file with `/* /index.html 200`
  - **Cloudflare:** `_redirects` file with `/* /index.html 200`
  - **GitHub Pages:** Copy `index.html` → `404.html`
  - **Firebase:** `firebase.json` with `rewrites`
  - **Render:** Add rewrite rule in dashboard
  - **S3/CloudFront:** Custom error response → `/index.html` with 200

### Assets not loading (broken CSS/JS paths)

- **Cause:** Incorrect `base` path in `vite.config.js`, especially on GitHub Pages where the site is served from a subdirectory.
- **Fix:** Ensure `base` matches your deployment path. For root domains use `base: '/'`. For subdirectories (GitHub Pages) use `base: '/repo-name/'`.

### Environment variables not working

- **Cause:** Variables not prefixed with `VITE_`, or set after the build was already done.
- **Fix:** Rename to `VITE_` prefix, trigger a fresh redeploy. Variables are baked at build time and cannot be changed without rebuilding.

### Terminal shows "connecting..." forever

- This is expected on **static-only hosts**. The WebSocket terminal server is a separate Node.js process not included in the static build. See the **WebSocket Terminal Note** section above.

### Build fails on deployment platform

- Ensure your `package-lock.json` is committed to Git (so `npm ci` works).
- Check the Node.js version on the platform matches your local version (set via `engines` in `package.json` or platform settings).
- Run `npm run build` locally first to confirm it passes.

---

## Quick Reference

| Platform | Build Command | Output Dir | SPA Config File | Effort |
|----------|--------------|------------|-----------------|--------|
| Vercel | `npm run build` | `dist` | `vercel.json` | ★☆☆ |
| Netlify | `npm run build` | `dist` | `public/_redirects` or `netlify.toml` | ★☆☆ |
| Cloudflare Pages | `npm run build` | `dist` | `public/_redirects` | ★☆☆ |
| GitHub Pages | `npm run build` | `dist` | `404.html` copy | ★★☆ |
| Firebase Hosting | `npm run build` | `dist` | `firebase.json` | ★★☆ |
| Render | `npm run build` | `dist` | Dashboard rewrite rule | ★☆☆ |
| Railway | `npm run build` | `dist` | Dockerfile + Caddyfile | ★★☆ |
| AWS S3 + CloudFront | `npm run build` | `dist` | CloudFront error page | ★★★ |
| Surge.sh | `npm run build` | `dist` | `200.html` copy | ★☆☆ |
| Kinsta | `npm run build` | `dist` | `public/_redirects` | ★☆☆ |
| Azure SWA | `npm run build` | `dist` | `staticwebapp.config.json` | ★★★ |
| Static.app | `npm run build` | `dist` (ZIP) | `200.html` copy | ★☆☆ |

---

*Generated for NEURAL_ARCHITECT v1.0.0*
