# Deployment Options for EB Tire App

This document covers multiple deployment platforms. Choose the one that best fits your needs.

## 🚀 Quick Comparison

| Platform | Free Tier | Ease of Use | Best For |
|----------|-----------|-------------|----------|
| **Vercel** | ✅ Excellent | ⭐⭐⭐⭐⭐ | React apps, fastest setup |
| **GitHub Pages** | ✅ Free | ⭐⭐⭐⭐ | Simple static sites |
| **Firebase Hosting** | ✅ Generous | ⭐⭐⭐⭐ | Google ecosystem |
| **Render** | ✅ Good | ⭐⭐⭐⭐ | Simple deployments |
| **Railway** | ✅ Limited | ⭐⭐⭐ | Full-stack apps |
| **Cloudflare Pages** | ✅ Excellent | ⭐⭐⭐⭐ | Global CDN |

---

## 1. Vercel (Recommended ⭐)

**Why Vercel?**
- ⚡ Fastest deployment (literally 30 seconds)
- 🎯 Built for React/Vite apps
- 🌍 Global CDN included
- 🔄 Automatic deployments from Git
- 📊 Built-in analytics
- 💰 Generous free tier

### Quick Deploy

**Option A: Via Dashboard (Easiest)**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **Add New Project**
4. Import your repository
5. Vercel auto-detects Vite settings
6. Add environment variable: `API_KEY`
7. Click **Deploy** → Done! 🎉

**Option B: Via CLI**
```bash
npm i -g vercel
vercel login
vercel
```

### Configuration
- ✅ `vercel.json` already configured
- ✅ SPA routing handled automatically
- ✅ Environment variables in dashboard

### Environment Variables
1. Go to **Project Settings** → **Environment Variables**
2. Add `API_KEY` with your Gemini API key
3. Select environments (Production, Preview, Development)

### Custom Domain
- Go to **Project Settings** → **Domains**
- Add your domain
- Follow DNS instructions
- Free SSL automatically provisioned

**Live URL**: `https://your-project.vercel.app`

---

## 2. GitHub Pages (Free & Simple)

**Why GitHub Pages?**
- 💯 100% free
- 🔗 Direct GitHub integration
- 📦 Simple static hosting
- 🎯 Perfect for open source projects

### Setup

**Option A: GitHub Actions (Recommended)**
1. Push code to GitHub
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Add secret: `API_KEY` = your Gemini API key
4. The workflow in `.github/workflows/github-pages.yml` will auto-deploy
5. Go to **Settings** → **Pages**
6. Select source: **GitHub Actions**

**Option B: Manual Deploy**
```bash
npm run build
# Copy dist folder contents to gh-pages branch
```

### Configuration
- ✅ GitHub Actions workflow already set up
- ✅ Auto-deploys on push to main
- ⚠️ Note: Environment variables must be set as GitHub Secrets

### Custom Domain
1. Create `CNAME` file in repository root with your domain
2. In **Settings** → **Pages**, add custom domain
3. Update DNS records as instructed

**Live URL**: `https://your-username.github.io/eb-tire-app`

---

## 3. Firebase Hosting (Google)

**Why Firebase?**
- 🔥 Google infrastructure
- 📊 Built-in analytics
- 🚀 Fast CDN
- 🔗 Easy integration with other Firebase services
- 💰 Generous free tier

### Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize**
   ```bash
   firebase init hosting
   ```
   - Select existing project or create new
   - Public directory: `dist`
   - Single-page app: **Yes**
   - Overwrite index.html: **No**

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### Environment Variables
Firebase Hosting doesn't support build-time env vars directly. Options:
- Use Firebase Functions as a proxy
- Or use Vite's `import.meta.env` with build-time replacement

### Configuration
- ✅ `firebase.json` already configured
- ✅ SPA routing handled
- ✅ Service worker caching optimized

**Live URL**: `https://your-project.web.app` or `https://your-project.firebaseapp.com`

---

## 4. Render (Simple Alternative)

**Why Render?**
- 🎯 Simple UI
- 🔄 Auto-deploys from Git
- 💰 Free tier available
- 🚀 Fast setup

### Setup

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **New** → **Static Site**
4. Connect your repository
5. Settings:
   - **Name**: `eb-tire-app`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. Add environment variable: `API_KEY`
7. Click **Create Static Site**

### Configuration
- ✅ `render.yaml` already configured
- ✅ Environment variables in dashboard

**Live URL**: `https://eb-tire-app.onrender.com`

---

## 5. Railway (Full-Stack Ready)

**Why Railway?**
- 🚂 Great for full-stack apps
- 🔄 Auto-deploys
- 💳 Pay-as-you-go
- 🎯 Simple interface

### Setup

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub**
4. Select your repository
5. Railway auto-detects and builds
6. Add environment variable: `API_KEY`
7. Deploy!

**Live URL**: `https://your-project.up.railway.app`

---

## 6. Netlify (You mentioned you don't like it, but included for completeness)

**Why Netlify?**
- 🎯 Good free tier
- 🔄 Auto-deploys
- 📊 Built-in analytics
- 🚀 Edge functions

### Setup
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub
3. Deploy settings auto-detected
4. Add environment variable: `API_KEY`

---

## Environment Variables Setup

### For All Platforms:

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | Google Gemini API key | ✅ Yes |

### Platform-Specific Notes:

- **Vercel**: Dashboard → Settings → Environment Variables
- **GitHub Pages**: Settings → Secrets → Actions (for build)
- **Firebase**: Use Functions or build-time replacement
- **Render**: Dashboard → Environment
- **Railway**: Variables tab
- **Cloudflare**: Settings → Environment Variables

---

## Which Should You Choose?

### Choose **Vercel** if:
- ✅ You want the fastest, easiest setup
- ✅ You're building a React app
- ✅ You want the best developer experience
- ✅ You need preview deployments

### Choose **GitHub Pages** if:
- ✅ You want 100% free hosting
- ✅ Your project is open source
- ✅ You want simple static hosting
- ✅ You're already using GitHub

### Choose **Firebase Hosting** if:
- ✅ You're using other Google services
- ✅ You want Google infrastructure
- ✅ You might add Firebase features later

### Choose **Render** if:
- ✅ You want a simple alternative
- ✅ You prefer straightforward UI
- ✅ You need free tier

---

## Migration Between Platforms

All platforms use the same build output (`dist` folder), so you can easily switch:

1. Build locally: `npm run build`
2. Deploy `dist` folder to any platform
3. Update environment variables
4. Done!

---

## Need Help?

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Firebase**: [firebase.google.com/docs/hosting](https://firebase.google.com/docs/hosting)
- **Render**: [render.com/docs](https://render.com/docs)

---

**Recommendation**: Start with **Vercel** for the best experience, or **GitHub Pages** if you want completely free hosting.


