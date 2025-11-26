# Debug: No Data in Database Tables

## 🔍 Step 1: Check Environment Variables

**The most common issue!** Make sure `.env.local` exists and has the correct values.

### Check if file exists:
1. Open your project folder: `C:\Users\PC\Desktop\EB_girl_app\eb-tire-app`
2. Look for `.env.local` file (it might be hidden!)
3. If you don't see it, create it (see below)

### Create `.env.local` file:
1. Right-click in project folder → **New** → **Text Document**
2. Name it exactly: `.env.local` (with the dot at the start!)
3. Open with Notepad
4. Paste this:
   ```env
   VITE_SUPABASE_URL=https://svnxwaozxmrakshnsfdg.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_pBRmdVPYHs7HGlVS2FSCng_EC8uH6WR
   ```
5. **Save** and close

### Verify in browser console:
1. Run your app: `npm run dev`
2. Open browser → Press `F12` → Go to **Console** tab
3. Type this and press Enter:
   ```javascript
   console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
   console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);
   ```
4. **Expected**: Should show your URL and key
5. **If undefined**: Environment variables not loaded → Restart dev server!

---

## 🔍 Step 2: Check Browser Console for Errors

1. Open your app in browser
2. Press `F12` → **Console** tab
3. Register a test user or place an order
4. Look for **red error messages**

**Common errors:**
- `Supabase not configured` → Environment variables missing
- `newRow violates row-level security policy` → RLS policy issue
- `relation "users" does not exist` → Tables not created

---

## 🔍 Step 3: Verify Database Tables Exist

1. Go to Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Table Editor** (left sidebar)
4. Check if you see these tables:
   - ✅ `users`
   - ✅ `orders`
   - ✅ `emergency_requests`
   - ✅ `reviews`

**If tables are missing:**
- Go to **SQL Editor**
- Run the `database/schema.sql` file again

---

## 🔍 Step 4: Check Row Level Security (RLS) Policies

RLS might be blocking inserts even if tables exist!

1. Go to Supabase dashboard → **Authentication** → **Policies**
2. Or go to **Table Editor** → Click on a table → **Policies** tab
3. Check if policies exist for:
   - `users` table
   - `orders` table
   - `emergency_requests` table
   - `reviews` table

**If no policies or policies are too restrictive:**

Run this SQL in **SQL Editor**:

```sql
-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
DROP POLICY IF EXISTS "Allow all operations on orders" ON orders;
DROP POLICY IF EXISTS "Allow all operations on emergency_requests" ON emergency_requests;
DROP POLICY IF EXISTS "Allow all operations on reviews" ON reviews;

-- Create permissive policies (allow all operations)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on emergency_requests" ON emergency_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
```

---

## 🔍 Step 5: Test Database Connection

Add this test code to check if Supabase is working:

1. Open browser console (`F12`)
2. Run this test:
   ```javascript
   // Test Supabase connection
   const testConnection = async () => {
     const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
     const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
     
     console.log('Testing connection...');
     console.log('URL:', SUPABASE_URL);
     console.log('Key:', SUPABASE_KEY ? 'Set' : 'Missing');
     
     if (!SUPABASE_URL || !SUPABASE_KEY) {
       console.error('❌ Environment variables missing!');
       return;
     }
     
     try {
       const { createClient } = await import('@supabase/supabase-js');
       const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
       
       // Test query
       const { data, error } = await supabase.from('users').select('count').limit(1);
       
       if (error) {
         console.error('❌ Database error:', error);
       } else {
         console.log('✅ Database connection successful!');
       }
     } catch (err) {
       console.error('❌ Connection failed:', err);
     }
   };
   
   testConnection();
   ```

---

## 🔍 Step 6: Check Network Tab

1. Open browser → `F12` → **Network** tab
2. Register a user or place an order
3. Look for requests to `supabase.co`
4. Check the **Response** tab for errors

---

## ✅ Quick Fix Checklist

- [ ] `.env.local` file exists in project root
- [ ] `.env.local` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Dev server restarted after creating `.env.local`
- [ ] Browser console shows no errors
- [ ] Database tables exist in Supabase
- [ ] RLS policies allow all operations
- [ ] Network tab shows successful Supabase requests

---

## 🆘 Still Not Working?

1. **Check Supabase project status**: Make sure project is active
2. **Check API key**: Verify the key is correct (no extra spaces)
3. **Check URL**: Make sure URL is `https://svnxwaozxmrakshnsfdg.supabase.co` (no trailing slash)
4. **Try manual insert**: Go to Supabase → Table Editor → Try inserting a row manually
5. **Check Supabase logs**: Go to **Logs** → **API Logs** to see requests

---

## 📝 Expected Behavior

When you:
1. Register a user → Data should appear in `users` table
2. Place an order → Data should appear in `orders` table
3. Submit emergency → Data should appear in `emergency_requests` table
4. Submit review → Data should appear in `reviews` table

**All operations should happen automatically without errors!**

