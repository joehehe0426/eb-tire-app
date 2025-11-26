# Troubleshooting GitHub Pages Deployment

## Issue: Site Shows Nothing (Blank Page)

### ✅ Fixed: Base Path Configuration

The issue was that Vite needs to know the base path for GitHub Pages. I've updated:

1. **vite.config.ts** - Now automatically detects repository name
2. **deploy.yml** - Passes repository info to build

### Next Steps:

1. **Commit and push the changes:**
   ```bash
   git add vite.config.ts .github/workflows/deploy.yml
   git commit -m "Fix GitHub Pages base path"
   git push origin main
   ```

2. **Wait for deployment** (2-3 minutes)

3. **Check your site:** https://joehehe0426.github.io/eb-rescue-app/

---

## Other Common Issues

### 1. Check Build Status

1. Go to your GitHub repo
2. Click **Actions** tab
3. Check if the workflow completed successfully (green checkmark)
4. If failed, click on it to see error logs

### 2. Check Browser Console

1. Open your site: https://joehehe0426.github.io/eb-rescue-app/
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for errors (red text)

Common errors:
- `404` on assets → Base path issue (should be fixed now)
- `Failed to load module` → Check network tab
- `CORS error` → API configuration issue

### 3. Check Network Tab

1. Open Developer Tools (`F12`)
2. Go to **Network** tab
3. Refresh the page
4. Look for failed requests (red)

### 4. Verify Files Were Deployed

1. Go to your repo → **Settings** → **Pages**
2. Check the deployment status
3. Click "Visit site" button

### 5. Clear Browser Cache

Sometimes old cached files cause issues:
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or clear browser cache completely

---

## Manual Verification

### Check if dist folder has files:

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Click on "build-and-deploy" job
4. Expand "Upload artifact" step
5. Check if files were uploaded

### Check Build Output:

1. In workflow run, expand "Build app" step
2. Look for any errors or warnings
3. Should see: `dist/index.html` created

---

## Quick Fixes

### If base path is wrong:

Update `vite.config.ts`:
```typescript
const base = '/eb-rescue-app/'; // Your exact repo name
```

### If assets not loading:

1. Check `index.html` - paths should be relative
2. Check `_redirects` file exists (for SPA routing)
3. Verify all assets are in `dist` folder

### If JavaScript errors:

1. Check browser console
2. Verify environment variables are set
3. Check API endpoints are correct

---

## Still Not Working?

1. **Check Actions logs** - Most detailed error info
2. **Check browser console** - Client-side errors
3. **Verify repository name** - Must match in vite.config.ts base path
4. **Check GitHub Pages settings** - Source should be "GitHub Actions"

---

## Expected Behavior After Fix

After pushing the updated files:
- ✅ Build should complete successfully
- ✅ Site should load at: https://joehehe0426.github.io/eb-rescue-app/
- ✅ All assets (CSS, JS, images) should load
- ✅ App should work normally

---

**After pushing the fix, wait 2-3 minutes and check again!** 🚀


