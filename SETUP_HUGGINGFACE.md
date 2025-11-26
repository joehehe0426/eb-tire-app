# Hugging Face Setup for Tire Analysis

Hugging Face is now configured as the default AI provider for tire analysis. It's **FREE** and works in Hong Kong! ✅

## ✅ Already Configured

The app is already set up to use Hugging Face by default. No additional setup needed!

## Quick Start

### Step 1: Create `.env` file (if not exists)

Create a file named `.env` in the root directory:

```env
VITE_AI_PROVIDER=huggingface
```

**That's it!** No API key needed for basic usage.

### Step 2: Start the app

```bash
npm run dev
```

✅ **Tire analysis is now working with Hugging Face!**

## How It Works

1. **User uploads tire image** in Emergency Form
2. **App sends image to Hugging Face** (free public models)
3. **AI analyzes tire condition** (flat, damaged, blown out, etc.)
4. **Returns analysis in Traditional Chinese**

## Optional: Get API Key for Higher Limits

If you want higher rate limits:

1. Sign up at [huggingface.co](https://huggingface.co) (free)
2. Go to Settings → Access Tokens
3. Create a new token
4. Add to `.env`:
   ```env
   VITE_AI_PROVIDER=huggingface
   VITE_HUGGINGFACE_API_KEY=your_token_here
   ```

## Models Used

The app tries multiple free models in order:
1. `Salesforce/blip-image-captioning-base` - Fast, accurate
2. `nlpconnect/vit-gpt2-image-captioning` - Alternative
3. `microsoft/git-base` - Fallback

All models are **free** and **public** - no API key required!

## Features

- ✅ **100% Free** - No cost, no credit card needed
- ✅ **Works in Hong Kong** - No geo-restrictions
- ✅ **No API Key Required** - Works out of the box
- ✅ **Automatic Fallback** - Tries multiple models if one fails
- ✅ **Traditional Chinese** - Responses in 繁體中文

## Troubleshooting

**"AI analysis not working"**
- Make sure `.env` has `VITE_AI_PROVIDER=huggingface`
- Restart dev server after changing `.env`
- Check browser console for errors

**"Slow response"**
- First request may be slow (model loading)
- Subsequent requests are faster
- Consider adding API key for faster responses

**"Model unavailable"**
- Some models may be loading (first time)
- Wait 30 seconds and try again
- App automatically tries next model

## Testing

To test tire analysis:

1. Go to Emergency Form (爆呔緊急維修)
2. Upload a tire image
3. Wait for AI analysis (may take 10-30 seconds first time)
4. See analysis in Traditional Chinese

## Production Deployment

For production, make sure to set environment variables:

**Vercel:**
- Settings → Environment Variables
- Add: `VITE_AI_PROVIDER` = `huggingface`

**GitHub Pages:**
- Settings → Secrets → Actions
- Add: `VITE_AI_PROVIDER` = `huggingface`

**Other platforms:**
- Add `VITE_AI_PROVIDER=huggingface` to environment variables

---

**That's it!** Your tire analysis is now powered by Hugging Face! 🚀

