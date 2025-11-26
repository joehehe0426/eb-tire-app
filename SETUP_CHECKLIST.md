# Database Setup Checklist

## ✅ Step 1: Supabase Project Created
- [x] Project URL: `https://svnxwaozxmrakshnsfdg.supabase.co`

## ⏳ Step 2: Get API Keys
- [ ] Go to Supabase Dashboard → **Settings** (gear icon) → **API**
- [ ] Copy **Project URL** (you already have this: ✅)
- [ ] Copy **anon/public key** (long string starting with `eyJ...`)
- [ ] Save the anon key somewhere safe

## ⏳ Step 3: Create Database Tables
- [ ] Go to **SQL Editor** in Supabase dashboard
- [ ] Click **New query**
- [ ] Open `database/schema.sql` file
- [ ] Copy entire content
- [ ] Paste into SQL Editor
- [ ] Click **Run** (or Ctrl+Enter)
- [ ] Should see "Success. No rows returned"

## ⏳ Step 4: Configure Local Development
- [ ] Create `.env.local` file in project root
- [ ] Add your Supabase keys:
  ```env
  VITE_SUPABASE_URL=https://svnxwaozxmrakshnsfdg.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key-here
  ```
- [ ] Restart dev server: `npm run dev`

## ⏳ Step 5: Configure GitHub Pages (Production)
- [ ] Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
- [ ] Click **New repository secret**
- [ ] Add: `VITE_SUPABASE_URL` = `https://svnxwaozxmrakshnsfdg.supabase.co`
- [ ] Add: `VITE_SUPABASE_ANON_KEY` = your anon key
- [ ] Save both secrets

## ⏳ Step 6: Test
- [ ] Start app: `npm run dev`
- [ ] Register a test user
- [ ] Place a test order
- [ ] Go to Supabase → **Table Editor**
- [ ] Check `users` table - should see your test user ✅
- [ ] Check `orders` table - should see your test order ✅

## 🎉 Done!
Once all steps are complete, your app will automatically save all customer and order data to the database!

---

**Current Status:**
- ✅ Project URL obtained
- ⏳ Waiting for anon key
- ⏳ Tables need to be created
- ⏳ Environment variables need to be configured


