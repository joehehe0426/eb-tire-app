# Deploy to GitHub Pages - Free Hosting

## 🆓 100% Free Deployment

### Step 1: Add GitHub Secret

1. Go to your repository on GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `API_KEY`
   - **Value**: Your Google Gemini API key
5. Click **Add secret**

### Step 2: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select:
   - **Source**: `GitHub Actions`
3. Save

### Step 3: Push to Deploy

The workflow in `.github/workflows/github-pages.yml` will automatically:
- Build your app on every push to `main`
- Deploy to GitHub Pages
- Use the `API_KEY` secret for builds

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 4: Wait for Deployment

1. Go to **Actions** tab in your repository
2. Watch the workflow run
3. When complete, your app is live!

**Your app**: `https://your-username.github.io/eb-tire-app`

---

## 🔧 Custom Domain Setup

1. Create `CNAME` file in repository root:
   ```
   ebtire.com
   ```

2. In **Settings** → **Pages**:
   - Add your custom domain
   - Follow DNS instructions

3. Update DNS:
   - Add CNAME record: `@` → `your-username.github.io`
   - Or A records as instructed

---

## 📝 Important Notes

- ✅ **Free** - No cost, no limits
- ✅ **Automatic** - Deploys on every push
- ✅ **Secure** - Secrets are encrypted
- ⚠️ **Public Repos**: Secrets are still secure (only accessible during builds)
- ⚠️ **Build Time**: ~2-3 minutes per deployment

---

## 🆘 Troubleshooting

**404 on routes?**
- GitHub Pages serves static files
- The workflow handles SPA routing
- Make sure workflow completed successfully

**Build fails?**
- Check Actions tab for error logs
- Verify `API_KEY` secret is set
- Check `package.json` dependencies

**Not updating?**
- Check Actions tab - workflow might be failing
- Verify you pushed to `main` branch
- Clear browser cache

---

## 🎯 Advantages

- 💯 **100% Free** - No credit card needed
- 🔗 **Direct GitHub Integration** - No external services
- 📦 **Simple** - Just push code
- 🔒 **Secure** - Secrets encrypted by GitHub

---

**Perfect for**: Open source projects, personal sites, simple deployments! 🚀


