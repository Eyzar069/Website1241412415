-- Create categories table for dynamic category management
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (id, name, label, icon, display_order) VALUES
  ('smartphone', 'smartphone', 'Smartphone', 'smartphone', 1),
  ('tablet', 'tablet', 'Tablet', 'tablet', 2),
  ('laptop', 'laptop', 'Laptop', 'laptop', 3),
  ('smartwatch', 'smartwatch', 'Smartwatch', 'watch', 4),
  ('camera', 'camera', 'Kamera', 'camera', 5),
  ('console', 'console', 'Konsole', 'gamepad', 6),
  ('headphones', 'headphones', 'Kopfhörer', 'headphones', 7),
  ('other', 'other', 'Sonstiges', 'more-horizontal', 8)
ON CONFLICT (id) DO NOTHING;
