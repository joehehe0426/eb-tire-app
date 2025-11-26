# 🚀 Deploy Your App - Step by Step

Since you've uploaded to GitHub, here's what to do next:

## Option 1: Vercel (Recommended - 2 minutes) ⭐

### Step 1: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click **Sign Up** → Choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub

### Step 2: Import Your Project
1. Click **Add New Project**
2. Find your `eb-rescue-app` repository
3. Click **Import**

### Step 3: Configure (Auto-detected!)
Vercel will auto-detect:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`

**Just click Next!**

### Step 4: Add Environment Variable
1. In the **Environment Variables** section, click **Add**
2. Add this variable:
   - **Key**: `VITE_AI_PROVIDER`
   - **Value**: `huggingface`
   - **Environments**: Select all (Production, Preview, Development)
3. Click **Add**

### Step 5: Deploy!
1. Click **Deploy**
2. Wait ~30 seconds
3. **Done!** 🎉

Your app will be live at: `https://your-project-name.vercel.app`

---

## Option 2: GitHub Pages (100% Free)

### Step 1: Add GitHub Secret
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `VITE_AI_PROVIDER`
   - **Value**: `huggingface`
5. Click **Add secret**

### Step 2: Enable GitHub Pages
1. Still in **Settings**, go to **Pages**
2. Under **Source**, select:
   - **Source**: `GitHub Actions`
3. Click **Save**

### Step 3: Trigger Deployment
The workflow will run automatically, or you can:
1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run**

### Step 4: Wait
1. Watch the workflow run (2-3 minutes)
2. When it says ✅ **Success**, your app is live!

Your app: `https://your-username.github.io/eb-rescue-app`

---

## ✅ After Deployment

### Test Your App
1. Visit your deployment URL
2. Test the emergency form
3. Upload a tire image
4. Check if AI analysis works

### If AI Analysis Doesn't Work
1. Check browser console (F12) for errors
2. Verify environment variable is set correctly
3. Make sure `VITE_AI_PROVIDER=huggingface` is in your deployment platform

---

## 🎯 Quick Comparison

| Platform | Time | Cost | Best For |
|----------|------|------|----------|
| **Vercel** | 2 min | Free | Fastest, easiest |
| **GitHub Pages** | 5 min | Free | Simple, direct |

---

## 📝 Environment Variables Summary

**Required for deployment:**
```
VITE_AI_PROVIDER=huggingface
```

**Optional (for higher rate limits):**
```
VITE_HUGGINGFACE_API_KEY=your_key_here
```

---

## 🆘 Need Help?

- **Vercel Issues**: Check `DEPLOY_VERCEL.md`
- **GitHub Pages Issues**: Check `DEPLOY_GITHUB_PAGES.md`
- **All Options**: Check `DEPLOYMENT_OPTIONS.md`

---

**Recommendation**: Start with **Vercel** - it's the fastest and easiest! 🚀

