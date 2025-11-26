# Cloudflare Pages Quick Start

## 🚀 Fast Deployment (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Cloudflare"
git push origin main
```

### Step 2: Connect to Cloudflare
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Pages** → **Create a project** → **Connect to Git**
3. Select your repository

### Step 3: Configure Build
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Framework**: Vite (auto-detected)

### Step 4: Add Environment Variable
- **Settings** → **Environment variables**
- Add `API_KEY` = your Google Gemini API key
- Select **Production** and **Preview**

### Step 5: Deploy
Click **Save and Deploy** → Done! 🎉

Your app will be live at: `https://your-project.pages.dev`

---

## 📝 Important Notes

✅ **Environment Variables**: Must be set in Cloudflare Dashboard (Settings → Environment variables)

✅ **SPA Routing**: The `_redirects` file handles client-side routing automatically

✅ **Custom Domain**: Add in Settings → Custom domains (free SSL included)

✅ **Preview Deployments**: Every PR gets a preview URL automatically

---

## 🔧 Build Settings Summary

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18.x (auto) |
| Framework | Vite |

---

## 🆘 Troubleshooting

**Build fails?**
- Check environment variables are set
- Verify `package.json` has all dependencies
- Check build logs in Cloudflare dashboard

**API not working?**
- Verify `API_KEY` is set correctly
- Check browser console for errors
- Ensure API key has proper permissions

**Need help?** See `DEPLOYMENT.md` for detailed guide.

