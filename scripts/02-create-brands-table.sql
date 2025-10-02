-- Create brands table for brand logo management
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default brands
INSERT INTO brands (name, logo_url, display_order) VALUES
  ('Apple', '/apple-logo-black.jpg', 1),
  ('Samsung', '/samsung-logo.png', 2),
  ('Google', '/google-logo.png', 3),
  ('Xiaomi', '/xiaomi-logo.png', 4),
  ('OnePlus', '/oneplus-logo.jpg', 5),
  ('Huawei', '/huawei-logo.png', 6),
  ('Sony', '/sony-logo-black.jpg', 7),
  ('Oppo', '/oppo-logo.jpg', 8),
  ('Realme', '/realme-logo.jpg', 9),
  ('Honor', '/honor-logo.jpg', 10),
  ('Nokia', '/nokia-logo.jpg', 11),
  ('Motorola', '/motorola-logo.jpg', 12),
  ('Asus', '/asus-logo.jpg', 13),
  ('Nothing', '/nothing-logo.jpg', 14),
  ('Vivo', '/vivo-logo.jpg', 15),
  ('LG', '/lg-logo.jpg', 16),
  ('Dell', '/dell-logo.jpg', 17),
  ('HP', '/hp-logo.jpg', 18),
  ('Lenovo', '/lenovo-logo.jpg', 19),
  ('Acer', '/acer-logo.jpg', 20),
  ('MSI', '/msi-logo.jpg', 21),
  ('Microsoft', '/microsoft-logo.jpg', 22),
  ('Garmin', '/garmin-logo.jpg', 23)
ON CONFLICT (name) DO NOTHING;
