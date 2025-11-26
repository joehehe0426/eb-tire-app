# Setup with Your Supabase Keys

## ✅ Perfect! You Found Your Keys

You have:
- **Public/Publishable Key**: `sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR`
- **Secret Key**: `sb_secret_coby3b0KlLLpI9ol_Skdug_yqz11DCV` (keep this secret!)

## 🔧 Configuration

### Step 1: Install Supabase Package

Run this command in your project:
```bash
npm install @supabase/supabase-js
```

### Step 2: Create `.env.local` File

Create a file named `.env.local` in your project root with:

```env
VITE_SUPABASE_URL=https://svnxwaozxmrakshnsfdg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR
```

### Step 3: Create Database Tables

1. Go to Supabase dashboard → **SQL Editor**
2. Click **New query**
3. Open `database/schema.sql` from your project
4. Copy entire content
5. Paste into SQL Editor
6. Click **Run**

### Step 4: Test

1. Restart dev server: `npm run dev`
2. Register a test user
3. Place a test order
4. Check Supabase → **Table Editor** → See your data! ✅

## 🔒 For GitHub Pages (Production)

Add these as GitHub Secrets:
- **Settings** → **Secrets and variables** → **Actions**
- Add: `VITE_SUPABASE_URL` = `https://svnxwaozxmrakshnsfdg.supabase.co`
- Add: `VITE_SUPABASE_ANON_KEY` = `sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR`

## ⚠️ Important Security Notes

- ✅ **Public Key** (`sb_publishable_...`) - Safe for frontend, use this!
- ❌ **Secret Key** (`sb_secret_...`) - NEVER use in frontend, keep secret!

## 🎉 That's It!

Your app will now automatically save all customer and order data to Supabase!

---

**Next**: Run `npm install @supabase/supabase-js` and create the `.env.local` file!


