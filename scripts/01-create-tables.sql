-- Electronics Buyback Platform Database Schema
-- Creates all necessary tables for the MVP

-- Devices catalog table
CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  variant TEXT,
  release_year INTEGER NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  specifications JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES devices(id),
  condition TEXT NOT NULL,
  condition_answers JSONB NOT NULL,
  quoted_price DECIMAL(10, 2) NOT NULL,
  final_price DECIMAL(10, 2),
  status TEXT NOT NULL DEFAULT 'quote-created',
  
  -- Customer information
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Address
  address_street TEXT NOT NULL,
  address_house_number TEXT NOT NULL,
  address_postal_code TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_country TEXT NOT NULL DEFAULT 'Deutschland',
  
  -- Payment details
  payment_method TEXT NOT NULL,
  payment_paypal_email TEXT,
  payment_iban TEXT,
  payment_bic TEXT,
  payment_account_holder TEXT,
  
  -- Shipping and inspection
  tracking_number TEXT,
  inspection_notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pricing history table (for daily recalculation tracking)
CREATE TABLE IF NOT EXISTS pricing_history (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES devices(id),
  old_price DECIMAL(10, 2) NOT NULL,
  new_price DECIMAL(10, 2) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Market index table (for tracking market trends)
CREATE TABLE IF NOT EXISTS market_index (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  brand TEXT,
  index_value DECIMAL(5, 4) NOT NULL DEFAULT 1.0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_devices_category ON devices(category);
CREATE INDEX IF NOT EXISTS idx_devices_brand ON devices(brand);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
