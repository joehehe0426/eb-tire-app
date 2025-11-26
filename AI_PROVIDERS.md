# AI Provider Options for Hong Kong

Since Google Gemini is not available in Hong Kong, here are free alternatives that work:

## 🆓 Free Options (Recommended)

### 1. Hugging Face (⭐ Best Free Option)

**Why Choose:**
- ✅ **100% FREE** - No API key needed for public models
- ✅ Works in Hong Kong
- ✅ Good for image analysis
- ✅ Multiple free models available

**Setup:**
1. No API key required for basic usage
2. Optional: Get free API key at [huggingface.co](https://huggingface.co) for higher rate limits
3. Set in `.env`:
   ```
   VITE_AI_PROVIDER=huggingface
   VITE_HUGGINGFACE_API_KEY=your_key_here (optional)
   ```

**Limitations:**
- Image generation/editing is limited
- Some models may be slow on first request (cold start)

---

### 2. Replicate (⭐ Best for Image Editing)

**Why Choose:**
- ✅ **FREE $10 credit** to start
- ✅ Works in Hong Kong
- ✅ Excellent for image generation/editing (rim design)
- ✅ Many pre-trained models

**Setup:**
1. Sign up at [replicate.com](https://replicate.com) (free)
2. Get API key from dashboard
3. Set in `.env`:
   ```
   VITE_AI_PROVIDER=replicate
   VITE_REPLICATE_API_KEY=your_key_here
   ```

**Best For:**
- Rim design generation (image editing)
- Advanced image manipulation

**Limitations:**
- Free tier has limited credits
- Pay-as-you-go after free credits

---

### 3. OpenAI (Has Free Tier)

**Why Choose:**
- ✅ Works in Hong Kong
- ✅ Excellent vision models (GPT-4 Vision)
- ✅ Good for image analysis

**Setup:**
1. Sign up at [platform.openai.com](https://platform.openai.com)
2. Get API key (free credits available)
3. Set in `.env`:
   ```
   VITE_AI_PROVIDER=openai
   VITE_OPENAI_API_KEY=your_key_here
   ```

**Limitations:**
- Free credits are limited
- Pay-per-use after free tier

---

### 4. DeepSeek (Works in HK)

**Why Choose:**
- ✅ Works in Hong Kong
- ✅ Developed in China, good for Chinese context
- ✅ Free tier available

**Setup:**
1. Sign up at [deepseek.com](https://deepseek.com)
2. Get API key
3. Set in `.env`:
   ```
   VITE_AI_PROVIDER=deepseek
   VITE_DEEPSEEK_API_KEY=your_key_here
   ```

**Limitations:**
- Primarily text-based (vision support may be limited)

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
# Choose your AI provider
VITE_AI_PROVIDER=huggingface  # Options: huggingface, replicate, openai, deepseek

# Provider-specific API keys (only set the one you're using)
VITE_HUGGINGFACE_API_KEY=your_key_here  # Optional for Hugging Face
VITE_REPLICATE_API_KEY=your_key_here
VITE_OPENAI_API_KEY=your_key_here
VITE_DEEPSEEK_API_KEY=your_key_here
```

### Switching Providers

The app automatically uses the provider set in `VITE_AI_PROVIDER`. To switch:

1. Update `.env` file
2. Restart dev server: `npm run dev`
3. For production, update environment variables in your hosting platform

---

## 📊 Feature Comparison

| Feature | Hugging Face | Replicate | OpenAI | DeepSeek |
|---------|-------------|-----------|--------|----------|
| **Free Tier** | ✅ Yes | ✅ $10 credit | ⚠️ Limited | ✅ Yes |
| **Image Analysis** | ✅ Good | ⚠️ Limited | ✅ Excellent | ❌ Limited |
| **Image Generation** | ❌ Limited | ✅ Excellent | ⚠️ Limited | ❌ No |
| **Works in HK** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Setup Difficulty** | ⭐ Easy | ⭐⭐ Medium | ⭐⭐ Medium | ⭐⭐ Medium |

---

## 🎯 Recommendations

### For Tire Analysis (Image Understanding):
1. **Hugging Face** - Free, no API key needed
2. **OpenAI** - Best quality, but costs money
3. **Replicate** - Good alternative

### For Rim Design (Image Editing):
1. **Replicate** - Best option, excellent models
2. **Hugging Face** - Limited options
3. **OpenAI** - Not ideal for editing

### Best Overall Setup:
- **Tire Analysis**: Hugging Face (free)
- **Rim Design**: Replicate (free $10 credit)

---

## 🚀 Quick Start

### Option 1: Hugging Face (Easiest, Free)

```bash
# .env
VITE_AI_PROVIDER=huggingface
# No API key needed!
```

### Option 2: Replicate (Best for Rim Design)

```bash
# .env
VITE_AI_PROVIDER=replicate
VITE_REPLICATE_API_KEY=your_key_here
```

1. Sign up at [replicate.com](https://replicate.com)
2. Get API key from dashboard
3. Add to `.env`
4. Done!

---

## 🔄 Fallback System

The app has automatic fallback:
- If primary provider fails → tries Hugging Face (free)
- If all fail → shows user-friendly error message

---

## 💡 Tips

1. **Start with Hugging Face** - It's free and works immediately
2. **Use Replicate for rim design** - Best image editing models
3. **Combine providers** - Use different providers for different features
4. **Monitor usage** - Check API usage to avoid unexpected costs

---

## 🆘 Troubleshooting

**"API key not configured"**
- Make sure you set the correct environment variable
- Restart dev server after changing `.env`

**"Model not available"**
- Some Hugging Face models may be loading (first request is slow)
- Try again after 30 seconds

**"Rate limit exceeded"**
- Free tiers have limits
- Wait a bit or upgrade to paid tier
- Switch to another provider

---

## 📚 Resources

- [Hugging Face Models](https://huggingface.co/models)
- [Replicate Models](https://replicate.com/explore)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [DeepSeek API](https://www.deepseek.com)

---

**Recommendation**: Start with **Hugging Face** for tire analysis (free, no setup), and **Replicate** for rim design (free $10 credit, best quality).


