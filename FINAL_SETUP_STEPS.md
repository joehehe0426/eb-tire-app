# Final Setup Steps - Use Your Keys

## ✅ You Have Everything You Need!

You found:
- **Project URL**: `https://svnxwaozxmrakshnsfdg.supabase.co` ✅
- **Public/Publishable Key**: `sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR` ✅

**Use the `sb_publishable_` key** - this is the correct one for frontend!

## 🚀 Quick Setup (3 Steps)

### Step 0: Install Node.js (If Not Installed)

**Windows 10:**
1. Go to: https://nodejs.org/
2. Download **LTS version** → Windows Installer (.msi)
3. Run installer → Install
4. **Close and reopen** your terminal
5. Verify: `node --version` and `npm --version`

See `INSTALL_NODEJS_WINDOWS.md` for detailed instructions.

### Step 1: Install Supabase Package

Open PowerShell in your project folder:
```powershell
cd C:\Users\PC\Desktop\EB_girl_app\eb-tire-app
npm install @supabase/supabase-js
```

### Step 2: Create `.env.local` File

Create `.env.local` in your project root:

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
6. Click **Run** (or Ctrl+Enter)
7. Should see "Success. No rows returned"

## ✅ Test It

1. Restart dev server: `npm run dev`
2. Register a test user
3. Place a test order
4. Go to Supabase → **Table Editor**
5. Check `users` and `orders` tables - see your data! 🎉

## 🔒 For GitHub Pages (Production)

Add to GitHub Secrets:
- **Settings** → **Secrets and variables** → **Actions**
- `VITE_SUPABASE_URL` = `https://svnxwaozxmrakshnsfdg.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR`

## 📝 About the Other Keys You Found

- **JWT keys** (`e2b1885a-...`) - These might be for a different service
- **Secret keys** (`cfwZLmsbZ...`) - Keep these secret, don't use in frontend
- **sb_publishable_** key - ✅ **This is the one to use!**

---

**That's it!** Your app will now save all data to Supabase! 🎉

