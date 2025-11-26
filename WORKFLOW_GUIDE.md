# GitHub Actions Workflow Guide

## 📁 File Location

Your workflow file should be at:
```
.github/workflows/deploy.yml
```

## 📝 What Each Part Does

### 1. **Name**
```yaml
name: Deploy to GitHub Pages
```
- The name shown in GitHub Actions tab

### 2. **When to Run**
```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```
- Runs automatically when you push to `main` branch
- `workflow_dispatch` lets you run it manually from Actions tab

### 3. **Permissions**
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```
- `contents: read` - Read your code
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Authenticate with GitHub

### 4. **Concurrency**
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```
- Prevents multiple deployments at the same time
- `cancel-in-progress: false` means wait for current one to finish

### 5. **Steps Explained**

#### Step 1: Checkout
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```
- Downloads your code to the GitHub Actions runner

#### Step 2: Setup Node.js
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```
- Installs Node.js version 18
- Caches npm for faster builds

#### Step 3: Install Dependencies
```yaml
- name: Install dependencies
  run: npm ci
```
- Runs `npm ci` (clean install, faster than `npm install`)

#### Step 4: Build
```yaml
- name: Build app
  run: npm run build
  env:
    VITE_AI_PROVIDER: ${{ secrets.VITE_AI_PROVIDER || 'huggingface' }}
```
- Builds your React app
- Uses environment variables from GitHub Secrets
- `|| 'huggingface'` is a fallback if secret not set

#### Step 5: Setup Pages
```yaml
- name: Setup Pages
  uses: actions/configure-pages@v4
```
- Prepares GitHub Pages for deployment

#### Step 6: Upload
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './dist'
```
- Uploads your built files (`dist` folder) as an artifact

#### Step 7: Deploy
```yaml
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```
- Actually deploys to GitHub Pages

## 🔧 Customization

### Change Node Version
```yaml
node-version: '20'  # or '18', '16', etc.
```

### Change Build Command
```yaml
run: npm run build  # Change if you use different build script
```

### Change Output Directory
```yaml
path: './dist'  # Change if Vite outputs to different folder
```

### Add More Environment Variables
```yaml
env:
  VITE_AI_PROVIDER: ${{ secrets.VITE_AI_PROVIDER }}
  VITE_HUGGINGFACE_API_KEY: ${{ secrets.VITE_HUGGINGFACE_API_KEY }}
  CUSTOM_VAR: ${{ secrets.CUSTOM_VAR }}
```

## ✅ How to Use

1. **Create the file:**
   - Go to your repo on GitHub
   - Click "Add file" → "Create new file"
   - Path: `.github/workflows/deploy.yml`
   - Paste the workflow content
   - Commit

2. **Set up secrets:**
   - Settings → Secrets and variables → Actions
   - Add `VITE_AI_PROVIDER` = `huggingface`

3. **Enable Pages:**
   - Settings → Pages
   - Source: GitHub Actions

4. **Deploy:**
   - Push to `main` branch (auto-runs)
   - Or go to Actions tab → Run workflow manually

## 🆘 Common Issues

**Workflow not running?**
- Check file is at `.github/workflows/deploy.yml`
- Check you pushed to `main` branch
- Check Actions tab for errors

**Build failing?**
- Check Node version matches your local
- Check all dependencies in `package.json`
- Check environment variables are set

**Deployment failing?**
- Make sure Pages is enabled in Settings
- Check permissions are correct
- Check `dist` folder exists after build

---

**That's it!** Your workflow is ready to deploy! 🚀


