# Supabase Database Setup Guide

This guide will help you set up a free database to store all customer registration and order data.

## 🎯 What You'll Get

- ✅ **Customer Database** - All user registrations stored
- ✅ **Order History** - All service requests saved
- ✅ **Emergency Requests** - Urgent requests tracked
- ✅ **Reviews** - Customer feedback stored
- ✅ **Free Tier** - 500MB database, 2GB bandwidth (plenty for start)

## 📋 Step-by-Step Setup

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **Start your project** (free)
3. Sign up with GitHub (easiest)
4. Create a new organization (if needed)

### Step 2: Create New Project

1. Click **New Project**
2. Fill in:
   - **Name**: `eb-rescue-app` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to Hong Kong (e.g., `Southeast Asia (Singapore)`)
   - **Pricing Plan**: Free
3. Click **Create new project**
4. Wait 2-3 minutes for setup

### Step 3: Get API Keys

1. In your project, go to **Settings** (gear icon) → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy and paste the entire content from `database/schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### Step 5: Configure Your App

1. Create/update `.env` file in your project root:
   ```env
   VITE_AI_PROVIDER=huggingface
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **For GitHub Pages deployment**, add these as secrets:
   - Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your anon key

### Step 6: Test the Connection

1. Start your app: `npm run dev`
2. Register a new user
3. Place a test order
4. Check Supabase dashboard → **Table Editor** → **users** and **orders**
5. You should see your data!

## 📊 Database Tables

### `users` Table
Stores customer registration:
- Phone number (unique)
- Name
- Car brand
- License plate
- Verification status

### `orders` Table
Stores all service requests:
- User info
- Service type
- Address, date, time
- Tire specifications
- Photos (base64)
- AI analysis
- Status

### `emergency_requests` Table
Stores urgent emergency requests:
- Contact info
- Tire position
- Photos
- AI analysis
- Location sent status

### `reviews` Table
Stores customer reviews:
- Rating (1-5)
- Comments
- Photos

## 🔍 Viewing Your Data

### In Supabase Dashboard:

1. **Table Editor** - View all data in tables
2. **SQL Editor** - Run custom queries
3. **API Docs** - See REST API endpoints

### Example Queries:

**Get all customers:**
```sql
SELECT * FROM users ORDER BY created_at DESC;
```

**Get all pending orders:**
```sql
SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at DESC;
```

**Get today's emergency requests:**
```sql
SELECT * FROM emergency_requests 
WHERE DATE(created_at) = CURRENT_DATE 
ORDER BY created_at DESC;
```

## 🔒 Security Notes

- The `anon` key is safe to use in frontend (it's public)
- Row Level Security (RLS) is enabled but allows all for now
- You can restrict access later in Supabase dashboard
- Never commit your `.env` file to GitHub

## 📱 What Happens Now

When users:
1. **Register** → Data saved to `users` table
2. **Place Order** → Data saved to `orders` table + WhatsApp notification
3. **Emergency Request** → Data saved to `emergency_requests` table + WhatsApp
4. **Leave Review** → Data saved to `reviews` table

**You receive:**
- ✅ WhatsApp notification (as before)
- ✅ **PLUS** All data in your Supabase database
- ✅ Can view anytime in Supabase dashboard
- ✅ Can export data as CSV
- ✅ Can set up email notifications (optional)

## 🎉 Benefits

- ✅ **Never lose data** - Everything is saved
- ✅ **View anytime** - Check dashboard 24/7
- ✅ **Export data** - Download as CSV/JSON
- ✅ **Search & filter** - Find customers easily
- ✅ **Analytics** - Track orders, customers, revenue
- ✅ **Free** - No cost for small-medium usage

## 🆘 Troubleshooting

**"Database not configured" warning?**
- Check `.env` file has correct keys
- Restart dev server after adding env vars
- For production, add to GitHub Secrets

**Data not appearing?**
- Check Supabase dashboard → Table Editor
- Check browser console for errors
- Verify API keys are correct

**Permission errors?**
- Check RLS policies in Supabase
- Make sure policies allow INSERT/SELECT

---

**That's it!** Your app now saves all data to a real database! 🎉


