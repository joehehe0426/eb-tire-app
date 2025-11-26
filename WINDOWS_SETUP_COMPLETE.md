# Complete Windows 10 Setup Guide

## Step 1: Install Node.js (Required)

### Download & Install:
1. Go to: **https://nodejs.org/**
2. Download **LTS version** (recommended)
3. Choose **Windows Installer (.msi)** - 64-bit
4. Run installer → Click through → Install
5. **Close and reopen** your terminal

### Verify:
```powershell
node --version
npm --version
```

Should show version numbers ✅

## Step 2: Install Supabase Package

Open PowerShell in your project folder:
```powershell
cd C:\Users\PC\Desktop\EB_girl_app\eb-tire-app
npm install @supabase/supabase-js
```

## Step 3: Create `.env.local` File

Create a file named `.env.local` in your project root with:

```env
VITE_SUPABASE_URL=https://svnxwaozxmrakshnsfdg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR
```

**How to create:**
- Right-click in project folder → New → Text Document
- Name it: `.env.local` (make sure it starts with a dot!)
- Open with Notepad
- Paste the content above
- Save

## Step 4: Create Database Tables

1. Go to Supabase dashboard → **SQL Editor**
2. Click **New query**
3. Open `database/schema.sql` from your project
4. Copy entire content
5. Paste into SQL Editor
6. Click **Run**

## Step 5: Test Everything

```powershell
npm run dev
```

Then:
1. Open browser to the URL shown (usually `http://localhost:5173`)
2. Register a test user
3. Place a test order
4. Check Supabase → **Table Editor** → See your data! ✅

---

## 🎯 Quick Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] npm installed (`npm --version` works)
- [ ] Supabase package installed (`npm install @supabase/supabase-js`)
- [ ] `.env.local` file created with your keys
- [ ] Database tables created in Supabase
- [ ] App runs (`npm run dev`)

---

**Need help?** See `INSTALL_NODEJS_WINDOWS.md` for detailed Node.js installation.


