-- EB Rescue App Database Schema
-- Run this in your Supabase SQL Editor

-- Users/Registration Table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100),
  car_brand VARCHAR(100),
  license_plate VARCHAR(20),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders/Service Requests Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  phone_number VARCHAR(20) NOT NULL,
  service_type VARCHAR(50) NOT NULL,
  -- Service details
  contact_name VARCHAR(100),
  contact_phone VARCHAR(20),
  car_brand VARCHAR(100),
  address TEXT,
  date DATE,
  time TIME,
  -- Tire specific
  tire_width VARCHAR(10),
  tire_aspect_ratio VARCHAR(10),
  tire_diameter VARCHAR(10),
  tire_position VARCHAR(50),
  -- Additional info
  comment TEXT,
  photo_base64 TEXT, -- Store as text (base64)
  ai_analysis TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency Requests Table (separate for urgent requests)
CREATE TABLE IF NOT EXISTS emergency_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  phone_number VARCHAR(20) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  car_brand VARCHAR(100) NOT NULL,
  tire_position VARCHAR(50) NOT NULL,
  photo_base64 TEXT,
  ai_analysis TEXT,
  location_sent BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  phone_number VARCHAR(20),
  name VARCHAR(100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  photo_base64 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emergency_phone ON emergency_requests(phone_number);
CREATE INDEX IF NOT EXISTS idx_emergency_status ON emergency_requests(status);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
-- USING (true) = allows reading (SELECT)
-- WITH CHECK (true) = allows writing (INSERT, UPDATE)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on emergency_requests" ON emergency_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);


