# Migration from Gemini to Hong Kong-Compatible AI Providers

Since Google Gemini is not available in Hong Kong, the app has been updated to support multiple AI providers.

## ✅ What Changed

1. **New Multi-Provider System** - App now supports:
   - Hugging Face (FREE, no API key needed) ⭐ Recommended
   - Replicate (FREE $10 credit, best for image editing)
   - OpenAI (Has free tier)
   - DeepSeek (Works in HK)
   - Gemini (kept as fallback if available)

2. **Automatic Fallback** - If one provider fails, automatically tries Hugging Face (free)

3. **Easy Configuration** - Just set one environment variable

## 🚀 Quick Migration

### Step 1: Update `.env` file

**Old (Gemini - doesn't work in HK):**
```env
API_KEY=your_gemini_key
```

**New (Hugging Face - FREE, works in HK):**
```env
VITE_AI_PROVIDER=huggingface
```

That's it! No API key needed.

### Step 2: Restart

```bash
npm run dev
```

✅ **Done!** Your app now works in Hong Kong.

## 🎨 For Rim Design Feature

If you want the rim design feature to work better:

1. Sign up at [replicate.com](https://replicate.com) (free, $10 credit)
2. Get API key
3. Update `.env`:
```env
VITE_AI_PROVIDER=replicate
VITE_REPLICATE_API_KEY=your_key_here
```

## 📊 Feature Support

| Feature | Hugging Face | Replicate | OpenAI |
|---------|-------------|-----------|--------|
| Tire Analysis | ✅ Free | ⚠️ Limited | ✅ Good |
| Rim Design | ❌ Limited | ✅ Excellent | ❌ No |

## 🔄 Code Changes

The components automatically use the new multi-provider system:

- `components/EmergencyForm.tsx` - Now uses `aiService` instead of `geminiService`
- `components/RimDesignForm.tsx` - Now uses `aiService` instead of `rimDesignService`

No code changes needed in your components - they work the same way!

## 📚 Documentation

- **Quick Start**: See `QUICK_START_AI.md`
- **All Providers**: See `AI_PROVIDERS.md`
- **Configuration**: See `.env.example`

## 🆘 Troubleshooting

**"AI not working"**
- Make sure `.env` file has `VITE_AI_PROVIDER=huggingface`
- Restart dev server after changing `.env`

**"Rim design not working"**
- Use Replicate provider (best for image editing)
- Make sure API key is set correctly

**"Still using Gemini"**
- Check `VITE_AI_PROVIDER` is set correctly
- Default is `huggingface` if not set

---

**That's it!** Your app is now compatible with Hong Kong! 🎉


