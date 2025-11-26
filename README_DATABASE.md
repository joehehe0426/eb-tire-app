# Database Integration - Complete Guide

## ✅ What's Been Set Up

Your app now has **full database integration** using Supabase (PostgreSQL).

### What Gets Saved Automatically:

1. **User Registration** 
   - Phone number
   - Name, car brand, license plate
   - Saved when user completes profile

2. **All Orders**
   - Service type (tire change, maintenance, etc.)
   - Customer details
   - Address, date, time
   - Tire specifications
   - Photos (base64)
   - Status

3. **Emergency Requests**
   - Contact info
   - Tire position
   - AI analysis
   - Photos
   - Location sent status

4. **Reviews**
   - Rating (1-5 stars)
   - Comments
   - Photos

## 📊 Database Structure

### Tables Created:

- **`users`** - Customer registration data
- **`orders`** - All service requests
- **`emergency_requests`** - Urgent requests
- **`reviews`** - Customer feedback

## 🔧 Setup Required

### 1. Create Supabase Project (5 minutes)

See `SUPABASE_SETUP.md` for detailed steps, or `DATABASE_QUICK_START.md` for quick setup.

**Quick version:**
1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. Create project → Get API keys
3. Run SQL from `database/schema.sql`
4. Add keys to `.env` and GitHub Secrets

### 2. Add Environment Variables

**Local (`.env` file):**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**GitHub Pages (Secrets):**
- Settings → Secrets → Actions
- Add: `VITE_SUPABASE_URL`
- Add: `VITE_SUPABASE_ANON_KEY`

## 📱 How It Works

### Registration Flow:
1. User enters phone → Saved to `users` table
2. User completes profile → Updated in `users` table
3. **You see it in Supabase dashboard!**

### Order Flow:
1. User places order → Saved to `orders` table
2. WhatsApp notification sent (as before)
3. **PLUS** data saved to database
4. **You see it in Supabase dashboard!**

### Emergency Flow:
1. User submits emergency → Saved to `emergency_requests` table
2. User sends location → Updated in database
3. WhatsApp notification sent
4. **You see it in Supabase dashboard!**

## 🔍 Viewing Your Data

### In Supabase Dashboard:

1. **Table Editor** - Browse all data visually
2. **SQL Editor** - Run custom queries
3. **API Docs** - See REST endpoints

### Example Queries:

**All customers:**
```sql
SELECT * FROM users ORDER BY created_at DESC;
```

**Today's orders:**
```sql
SELECT * FROM orders 
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

**Pending emergency requests:**
```sql
SELECT * FROM emergency_requests 
WHERE status = 'pending'
ORDER BY created_at DESC;
```

**Customer with most orders:**
```sql
SELECT phone_number, COUNT(*) as order_count
FROM orders
GROUP BY phone_number
ORDER BY order_count DESC;
```

## 💡 Benefits

✅ **Never lose data** - Everything saved automatically
✅ **View anytime** - Check dashboard 24/7
✅ **Export data** - Download as CSV/JSON
✅ **Search & filter** - Find customers easily
✅ **Analytics ready** - Track orders, revenue, customers
✅ **Free tier** - 500MB database (plenty to start)

## 🆘 Troubleshooting

**Data not saving?**
- Check Supabase keys are correct
- Check browser console for errors
- Verify tables were created (SQL Editor)

**"Database not configured" warning?**
- Normal if Supabase not set up yet
- App still works (just doesn't save to DB)
- WhatsApp notifications still work

**Want to disable database?**
- Just don't add Supabase keys
- App works normally without database
- All data still sent via WhatsApp

---

**Your app now saves everything to a real database!** 🎉

See `SUPABASE_SETUP.md` for complete setup instructions.


