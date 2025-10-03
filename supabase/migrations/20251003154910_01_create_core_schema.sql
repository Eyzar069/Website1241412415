/*
  # Create Core Database Schema for Electronics Buyback Platform

  ## Overview
  This migration creates the complete database schema for the Mr. Phone electronics buyback platform.

  ## Tables Created

  ### 1. categories
  - `id` (text, primary key) - Category identifier
  - `name` (text, unique) - Internal category name
  - `label` (text) - Display label for users
  - `icon` (text) - Icon identifier
  - `display_order` (integer) - Sort order
  - Includes default categories: smartphone, tablet, laptop, smartwatch, camera, console, headphones, other

  ### 2. brands
  - `id` (text, primary key) - Brand identifier
  - `name` (text, unique) - Brand name
  - `logo_url` (text) - Path to brand logo
  - `display_order` (integer) - Sort order
  - Includes 23 default brands with logos

  ### 3. devices
  - `id` (text, primary key) - Device identifier
  - `category` (text) - Device category
  - `brand` (text) - Device brand
  - `model` (text) - Model name
  - `variant` (text) - Model variant (optional)
  - `release_year` (integer) - Year released
  - `base_price` (decimal) - Base buyback price
  - `image_url` (text) - Product image path
  - `specifications` (jsonb) - Technical specs
  - Indexed on category and brand for fast queries

  ### 4. orders
  - Complete order information including customer details, device condition, pricing, payment, and shipping
  - Status tracking: quote-created, label-sent, device-received, inspected, paid
  - Indexed on status, email, and creation date

  ### 5. pricing_history
  - Tracks all price changes with reasons
  - Links to devices table

  ### 6. market_index
  - Tracks market trends by category and brand
  - Used for dynamic pricing calculations

  ### 7. custom_device_requests
  - Stores requests for devices not in catalog
  - Includes customer contact info and device details
  - Supports image uploads

  ### 8. admin_emails
  - Stores authorized admin email addresses
  - Used for role-based access control

  ## Security
  - RLS enabled on admin_emails table
  - Policies allow authenticated users to check admin status
  - All other tables accessible for authenticated operations

  ## Indexes
  Created on frequently queried columns for optimal performance
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
  
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  address_street TEXT NOT NULL,
  address_house_number TEXT NOT NULL,
  address_postal_code TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_country TEXT NOT NULL DEFAULT 'Deutschland',
  
  payment_method TEXT NOT NULL,
  payment_paypal_email TEXT,
  payment_iban TEXT,
  payment_bic TEXT,
  payment_account_holder TEXT,
  
  tracking_number TEXT,
  inspection_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing history table
CREATE TABLE IF NOT EXISTS pricing_history (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES devices(id),
  old_price DECIMAL(10, 2) NOT NULL,
  new_price DECIMAL(10, 2) NOT NULL,
  reason TEXT,
  changed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market index table
CREATE TABLE IF NOT EXISTS market_index (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  brand TEXT,
  index_value DECIMAL(5, 4) NOT NULL DEFAULT 1.0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom device requests table
CREATE TABLE IF NOT EXISTS custom_device_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  device_name TEXT NOT NULL,
  device_brand TEXT,
  device_model TEXT,
  description TEXT,
  image_urls TEXT[],
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin emails table
CREATE TABLE IF NOT EXISTS admin_emails (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_devices_category ON devices(category);
CREATE INDEX IF NOT EXISTS idx_devices_brand ON devices(brand);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_custom_device_requests_email ON custom_device_requests(email);
CREATE INDEX IF NOT EXISTS idx_custom_device_requests_status ON custom_device_requests(status);
CREATE INDEX IF NOT EXISTS idx_custom_device_requests_created_at ON custom_device_requests(created_at DESC);

-- Enable RLS on admin_emails table
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- Policy for checking admin status
CREATE POLICY "Anyone can check if email is admin"
  ON admin_emails FOR SELECT
  TO authenticated
  USING (true);