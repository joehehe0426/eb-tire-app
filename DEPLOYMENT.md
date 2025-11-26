# Cloudflare Pages Deployment Guide

This guide will help you deploy the EB Rescue App to Cloudflare Pages.

## Prerequisites

- A GitHub account with your code repository
- A Cloudflare account (free tier works)
- Google Gemini API key

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for Cloudflare Pages deployment"
git push origin main
```

### 2. Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select your repository (`eb-rescue-app`)

### 3. Configure Build Settings

Cloudflare Pages will auto-detect Vite, but verify these settings:

- **Project name**: `eb-rescue-app` (or your preferred name)
- **Production branch**: `main` (or `master`)
- **Framework preset**: `Vite` (or `None`)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)

### 4. Add Environment Variables

**Critical**: Add your API key before deploying!

1. In the build settings, scroll to **Environment variables**
2. Click **Add variable**
3. Add:
   - **Variable name**: `API_KEY`
   - **Value**: Your Google Gemini API key
   - **Environment**: Select **Production** and **Preview**

**Note**: Environment variables are available at build time via `process.env.API_KEY` in Vite.

### 5. Deploy

1. Click **Save and Deploy**
2. Cloudflare will:
   - Install dependencies (`npm install`)
   - Run the build (`npm run build`)
   - Deploy to `https://your-project.pages.dev`

### 6. Verify Deployment

1. Visit your deployment URL
2. Check browser console for errors
3. Test the app functionality
4. Verify PWA installation works

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `API_KEY` | Google Gemini API key | `AIzaSy...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ENABLE_LOGGING` | Enable error logging | `false` |

## Custom Domain Setup

### Option 1: Using Cloudflare DNS

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `ebtire.com`)
4. Cloudflare will provide DNS records to add
5. Add the CNAME record to your DNS
6. SSL certificate will be provisioned automatically

### Option 2: External DNS Provider

1. Add a CNAME record pointing to your Pages domain:
   ```
   Type: CNAME
   Name: @ (or subdomain)
   Target: your-project.pages.dev
   ```
2. In Cloudflare Pages, add your custom domain
3. Follow the verification steps

## Preview Deployments

Every pull request automatically gets a preview deployment:
- URL format: `https://pr-123-your-project.pages.dev`
- Uses preview environment variables
- Perfect for testing before merging

## Build Optimization

The app is already optimized for Cloudflare Pages:

- ✅ Vite build configuration
- ✅ Code splitting
- ✅ Asset optimization
- ✅ PWA manifest configured

## Troubleshooting

### Build Fails

**Error**: "API_KEY is not defined"
- **Solution**: Make sure you added `API_KEY` in Environment variables

**Error**: "Module not found"
- **Solution**: Check that all dependencies are in `package.json`

**Error**: "Build timeout"
- **Solution**: Cloudflare Pages has a 20-minute timeout. Check for infinite loops or large dependencies.

### Runtime Errors

**Error**: "API calls failing"
- **Solution**: Verify `API_KEY` is set correctly and has proper permissions

**Error**: "Service worker not registering"
- **Solution**: Ensure `service-worker.js` is in the `dist` folder after build

### Performance Issues

- Check Cloudflare Analytics in the dashboard
- Use Cloudflare's Speed Insights
- Verify assets are being cached properly

## Continuous Deployment

Cloudflare Pages automatically deploys:
- ✅ Every push to the production branch
- ✅ Every pull request (preview)
- ✅ Manual deployments from dashboard

## Rollback

To rollback to a previous deployment:

1. Go to **Deployments** in your Pages project
2. Find the deployment you want to restore
3. Click the three dots menu
4. Select **Retry deployment** or **Rollback to this deployment**

## Monitoring

Cloudflare Pages provides:
- Build logs
- Deployment history
- Analytics (if enabled)
- Error tracking

## Advanced: Cloudflare Workers Integration

If you want to move API calls to Cloudflare Workers (recommended for security):

1. Create a Worker in Cloudflare Dashboard
2. Add your API key as a Worker secret
3. Create proxy endpoints
4. Update frontend to call Worker endpoints instead

Example Worker endpoint:
```javascript
// worker.js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/analyze-tire') {
      // Proxy to Gemini API with server-side key
      // ...
    }
  }
}
```

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Cloudflare Community](https://community.cloudflare.com/)

---

**Need help?** Check the Cloudflare Pages documentation or open an issue in your repository.
