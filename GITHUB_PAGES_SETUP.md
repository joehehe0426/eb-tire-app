# GitHub Pages Setup - Step by Step

## 📋 Step-by-Step Instructions

### Step 1: Add Environment Variable (Secret)

1. **Go to your GitHub repository**
   - Open your `eb-rescue-app` repo in browser

2. **Click on "Settings"** (top menu, next to Insights)

3. **In the left sidebar**, scroll down and click:
   - **"Secrets and variables"** → **"Actions"**

4. **Click "New repository secret"** (green button)

5. **Add the secret:**
   - **Name**: `VITE_AI_PROVIDER`
   - **Value**: `huggingface`
   - Click **"Add secret"**

6. **(Optional)** If you have a Hugging Face API key:
   - Click **"New repository secret"** again
   - **Name**: `VITE_HUGGINGFACE_API_KEY`
   - **Value**: Your API key
   - Click **"Add secret"**

---

### Step 2: Enable GitHub Pages

1. **Still in Settings**, scroll down in the left sidebar

2. **Click "Pages"** (under "Code and automation" section)

3. **Under "Source"**, select:
   - **Source**: `GitHub Actions` (from dropdown)
   - (Don't select "Deploy from a branch")

4. **Click "Save"** (if there's a save button)

---

### Step 3: Trigger the Deployment

The workflow should run automatically, but if it doesn't:

1. **Go to "Actions" tab** (top menu of your repo)

2. **You should see "Deploy to GitHub Pages" workflow**

3. **If it's not running:**
   - Click on the workflow
   - Click **"Run workflow"** button (right side)
   - Select branch: `main`
   - Click **"Run workflow"**

4. **Wait for it to complete** (2-3 minutes)
   - You'll see a yellow dot (running) → Green checkmark (success)

---

### Step 4: Get Your Live URL

1. **Go back to Settings → Pages**

2. **You'll see your site URL:**
   - Format: `https://your-username.github.io/eb-rescue-app`
   - Or: `https://your-org.github.io/eb-rescue-app`

3. **Click the URL** to visit your live app!

---

## ✅ What Happens Next

- Every time you push to `main` branch, it auto-deploys
- Check **Actions** tab to see deployment status
- Your app is live at the GitHub Pages URL

---

## 🆘 Troubleshooting

**"Pages" not showing in Settings?**
- Make sure you're the repository owner
- Check you have admin access
- If repo is private, you need GitHub Pro (or make it public)

**Workflow not running?**
- Go to **Actions** tab
- Check if workflow file exists (`.github/workflows/github-pages.yml`)
- Click "Run workflow" manually

**Build failing?**
- Check **Actions** tab → Click on failed workflow
- Look at error logs
- Make sure `VITE_AI_PROVIDER` secret is set

**404 Error?**
- Wait a few minutes after deployment
- Clear browser cache
- Check the URL is correct

---

## 🎉 Done!

Your app should now be live on GitHub Pages!

**Next time you push code:**
```bash
git add .
git commit -m "Update app"
git push origin main
```

It will auto-deploy! 🚀

