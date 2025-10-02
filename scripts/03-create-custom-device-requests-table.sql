-- Create custom_device_requests table for devices not found in catalog
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_custom_device_requests_email ON custom_device_requests(email);
CREATE INDEX IF NOT EXISTS idx_custom_device_requests_status ON custom_device_requests(status);
CREATE INDEX IF NOT EXISTS idx_custom_device_requests_created_at ON custom_device_requests(created_at DESC);
