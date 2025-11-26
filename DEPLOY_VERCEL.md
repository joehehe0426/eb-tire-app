# Deploy to Vercel - Quick Guide

## 🚀 Fastest Deployment (2 minutes)

### Method 1: Via Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub (free)

2. **Import Project**
   - Click **Add New Project**
   - Select your `eb-rescue-app` repository
   - Vercel auto-detects Vite settings ✅

3. **Configure**
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `dist` (auto)
   - **Install Command**: `npm install` (auto)

4. **Add Environment Variable**
   - Click **Environment Variables**
   - Add:
     - **Key**: `VITE_AI_PROVIDER`
     - **Value**: `huggingface`
     - **Environments**: Production, Preview, Development
   - (Optional) For higher rate limits, also add:
     - **Key**: `VITE_HUGGINGFACE_API_KEY`
     - **Value**: Your Hugging Face API key

5. **Deploy**
   - Click **Deploy**
   - Wait ~30 seconds
   - Done! 🎉

Your app: `https://your-project.vercel.app`

---

### Method 2: Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

---

## ✨ Features You Get

- ✅ **Automatic HTTPS** - Free SSL certificate
- ✅ **Global CDN** - Fast worldwide
- ✅ **Preview Deployments** - Every PR gets a preview URL
- ✅ **Analytics** - Built-in performance monitoring
- ✅ **Custom Domains** - Add your domain in settings
- ✅ **Environment Variables** - Secure variable management

---

## 🔧 Custom Domain Setup

1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `ebtire.com`)
3. Follow DNS instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
4. Vercel automatically provisions SSL
5. Done!

---

## 📊 Preview Deployments

Every pull request automatically gets:
- Preview URL: `https://eb-rescue-app-git-branch.vercel.app`
- Uses preview environment variables
- Perfect for testing before merging

---

## 🆘 Troubleshooting

**Build fails?**
- Check environment variables are set
- Verify `package.json` has all dependencies
- Check build logs in Vercel dashboard

**API not working?**
- Verify `API_KEY` is set correctly
- Check browser console for errors
- Ensure API key has proper permissions

**Need to rollback?**
- Go to **Deployments**
- Find previous deployment
- Click **⋯** → **Promote to Production**

---

## 📝 Configuration Files

- ✅ `vercel.json` - Already configured
- ✅ SPA routing handled automatically
- ✅ Service worker caching optimized

---

**That's it!** Vercel is the easiest and fastest way to deploy your app. 🚀


