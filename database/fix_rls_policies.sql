-- Fix RLS Policies for EB Rescue App
-- Run this if data is not being saved to database

-- First, drop existing policies (if any)
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
DROP POLICY IF EXISTS "Allow all operations on orders" ON orders;
DROP POLICY IF EXISTS "Allow all operations on emergency_requests" ON emergency_requests;
DROP POLICY IF EXISTS "Allow all operations on reviews" ON reviews;

-- Drop any other policies that might exist
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
    END LOOP;
END $$;

-- Create permissive policies that allow ALL operations (SELECT, INSERT, UPDATE, DELETE)
-- USING (true) = allow reading
-- WITH CHECK (true) = allow writing

CREATE POLICY "Allow all operations on users" 
ON users 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on orders" 
ON orders 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on emergency_requests" 
ON emergency_requests 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on reviews" 
ON reviews 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Verify policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

