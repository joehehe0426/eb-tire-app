# EB Rescue App

A modern Progressive Web App (PWA) for 24/7 emergency rescue services in Hong Kong, featuring AI-powered tire analysis and rim design visualization.

## Features

- 🚨 Emergency rescue requests with AI analysis
- 📅 24-hour tire change service booking
- 🎨 AI-powered rim design visualization
- 📱 Progressive Web App (PWA) support
- 💾 Local data persistence + Cloud database (Supabase)
- 📍 Location-based services
- 🗄️ **Database Integration** - All customer and order data saved automatically

## Logo Setup

To display the custom logo, please upload your image file named `logo.png` to the **root directory** of this project.
The root directory is the folder containing `index.html`, `package.json`, and `vite.config.ts`.

## Local Development

### 1. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 2. Configure AI Provider (Hugging Face - Default)
This app uses **Hugging Face** by default for tire analysis (FREE, works in Hong Kong).

1. Create a new file named `.env` in the root directory.
2. Add:
```
VITE_AI_PROVIDER=huggingface
```
**That's it!** No API key needed for basic usage.

**Optional**: Get free API key at [huggingface.co](https://huggingface.co) for higher rate limits:
```
VITE_AI_PROVIDER=huggingface
VITE_HUGGINGFACE_API_KEY=your_key_here
```

**Note**: Rim design feature is currently disabled (premium feature coming soon). See `SETUP_HUGGINGFACE.md` for detailed setup.

### 3. Start Development Server
```bash
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`) to view the app.

## Deployment Options

This app can be deployed to multiple platforms. Choose the one that fits your needs:

### 🚀 Quick Recommendations

- **Vercel** - Fastest setup, best for React apps (⭐ Recommended)
- **GitHub Pages** - 100% free, perfect for open source
- **Firebase Hosting** - Google infrastructure, great for PWA
- **Cloudflare Pages** - Global CDN, excellent performance
- **Render** - Simple alternative with good free tier

### 📚 Detailed Guides

See deployment guides for each platform:
- **Vercel**: See `DEPLOY_VERCEL.md` (2-minute setup)
- **GitHub Pages**: See `DEPLOY_GITHUB_PAGES.md` (100% free)
- **All Options**: See `DEPLOYMENT_OPTIONS.md` (complete comparison)

### ⚡ Quick Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New Project** → Import your repository
3. Vercel auto-detects Vite settings ✅
4. Add environment variable: `API_KEY` = your Gemini API key
5. Click **Deploy** → Done in 30 seconds! 🎉

Your app: `https://your-project.vercel.app`

### 🆓 Quick Deploy to GitHub Pages (Free)

1. Go to repository **Settings** → **Secrets** → **Actions**
2. Add secret: `API_KEY` = your Gemini API key
3. Go to **Settings** → **Pages** → Source: **GitHub Actions**
4. Push to `main` branch → Auto-deploys! 🎉

Your app: `https://your-username.github.io/eb-rescue-app`

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
├── components/          # React components
├── services/            # API services (Gemini AI)
├── utils/               # Utility functions
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── vite.config.ts       # Vite configuration
```

## Security Notes

⚠️ **Important**: The API key is currently exposed in the client bundle. For production, consider:
- Moving API calls to a backend server
- Using Cloudflare Workers as a proxy
- Implementing rate limiting

See `SECURITY.md` for more details.

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Gemini AI** - Tire analysis and rim design
- **Lucide React** - Icons
- **PWA** - Progressive Web App capabilities

## License

Private - All rights reserved
