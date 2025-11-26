# Database Setup - Quick Start (5 minutes)

## 🚀 Fast Setup

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up (free) with GitHub
3. Create new project:
   - Name: `eb-rescue-app`
   - Region: Southeast Asia (Singapore)
   - Password: (save it!)

### Step 2: Get API Keys
1. Project → **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon key**: `eyJ...` (long string)

### Step 3: Create Tables
1. Go to **SQL Editor**
2. Click **New query**
3. Copy entire content from `database/schema.sql`
4. Click **Run**

### Step 4: Add to Your App

**Local Development:**
Create `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**GitHub Pages:**
1. Go to repo → **Settings** → **Secrets** → **Actions**
2. Add secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 5: Test
1. Restart app: `npm run dev`
2. Register a user
3. Place an order
4. Check Supabase → **Table Editor** → See your data! ✅

---

## 📊 What Gets Saved

✅ **User Registration** → `users` table
✅ **All Orders** → `orders` table  
✅ **Emergency Requests** → `emergency_requests` table
✅ **Reviews** → `reviews` table

---

## 🔍 View Your Data

**In Supabase Dashboard:**
- **Table Editor** → Browse all tables
- **SQL Editor** → Run custom queries
- **Export** → Download as CSV

**Example Query:**
```sql
-- Get all customers
SELECT * FROM users ORDER BY created_at DESC;

-- Get today's orders
SELECT * FROM orders 
WHERE DATE(created_at) = CURRENT_DATE;
```

---

**That's it!** You now have a real database storing all customer data! 🎉

See `SUPABASE_SETUP.md` for detailed guide.


