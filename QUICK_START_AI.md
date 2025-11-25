# Quick Start - AI Setup for Hong Kong

Since Google Gemini doesn't work in Hong Kong, here's the fastest way to get AI features working:

## 🚀 Fastest Setup (30 seconds)

### Step 1: Create `.env` file

Create a file named `.env` in the root directory:

```env
VITE_AI_PROVIDER=huggingface
```

**That's it!** No API key needed. The app will use Hugging Face's free public models.

### Step 2: Start the app

```bash
npm run dev
```

✅ **Done!** AI features are now working.

---

## 🎨 For Rim Design (Image Editing)

If you want the rim design feature to work better, use Replicate:

### Step 1: Get Replicate API Key (Free)

1. Go to [replicate.com](https://replicate.com)
2. Sign up (free)
3. Get your API key from dashboard
4. You get $10 free credit!

### Step 2: Update `.env`

```env
VITE_AI_PROVIDER=replicate
VITE_REPLICATE_API_KEY=your_key_here
```

### Step 3: Restart

```bash
npm run dev
```

✅ Rim design feature now works with high-quality image editing!

---

## 📊 What Works Where

| Feature | Hugging Face | Replicate |
|---------|-------------|-----------|
| Tire Analysis | ✅ Free | ⚠️ Limited |
| Rim Design | ❌ Limited | ✅ Excellent |

**Recommendation**: Use Hugging Face for tire analysis (free), and Replicate for rim design (free $10 credit).

---

## 🔄 Switching Providers

Just change `VITE_AI_PROVIDER` in `.env`:

```env
# For tire analysis (free)
VITE_AI_PROVIDER=huggingface

# For rim design (needs API key)
VITE_AI_PROVIDER=replicate
VITE_REPLICATE_API_KEY=your_key
```

---

## 🆘 Troubleshooting

**"AI analysis not working"**
- Make sure `.env` file exists
- Check `VITE_AI_PROVIDER` is set correctly
- Restart dev server after changing `.env`

**"Rim design not generating"**
- Use Replicate provider (best for image editing)
- Make sure API key is set correctly
- Check you have credits remaining

---

## 📚 More Options

See `AI_PROVIDERS.md` for:
- All available providers
- Detailed setup instructions
- Feature comparisons
- Advanced configuration

---

**That's it!** Your app now works with AI in Hong Kong! 🎉


