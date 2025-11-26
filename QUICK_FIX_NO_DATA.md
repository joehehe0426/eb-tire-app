# 🚨 Quick Fix: No Data in Database

## Most Likely Issue: RLS Policies Missing `WITH CHECK`

The database schema was missing `WITH CHECK (true)` in the RLS policies, which blocks INSERT operations!

## ✅ Fix in 2 Steps

### Step 1: Fix RLS Policies in Supabase

1. Go to Supabase dashboard → **SQL Editor**
2. Click **New query**
3. Copy and paste this SQL:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
DROP POLICY IF EXISTS "Allow all operations on orders" ON orders;
DROP POLICY IF EXISTS "Allow all operations on emergency_requests" ON emergency_requests;
DROP POLICY IF EXISTS "Allow all operations on reviews" ON reviews;

-- Create fixed policies with WITH CHECK
CREATE POLICY "Allow all operations on users" 
ON users FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on orders" 
ON orders FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on emergency_requests" 
ON emergency_requests FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on reviews" 
ON reviews FOR ALL USING (true) WITH CHECK (true);
```

4. Click **Run** ✅

### Step 2: Verify Environment Variables

Make sure `.env.local` exists in your project root:

```env
VITE_SUPABASE_URL=https://svnxwaozxmrakshnsfdg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR
```

**Then restart your dev server:**
```powershell
# Stop server (Ctrl+C)
npm run dev
```

## 🧪 Test

1. Register a new user
2. Check Supabase → **Table Editor** → `users` table
3. You should see your data! ✅

## 📚 More Help

See `DEBUG_DATABASE.md` for detailed troubleshooting.

