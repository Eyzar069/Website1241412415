/*
  # Insert Default Data

  ## Overview
  Populates the database with default categories, brands, and admin email.

  ## Data Inserted

  ### Categories (8 total)
  - Smartphone, Tablet, Laptop, Smartwatch, Camera, Console, Headphones, Other
  - Each with display order and icon

  ### Brands (23 total)
  - Apple, Samsung, Google, Xiaomi, OnePlus, Huawei, Sony, Oppo, Realme, Honor
  - Nokia, Motorola, Asus, Nothing, Vivo, LG, Dell, HP, Lenovo, Acer
  - MSI, Microsoft, Garmin
  - Each with logo URL and display order

  ### Admin Email
  - admin@mrphone.de (default admin account)
*/

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

-- Insert default admin email
INSERT INTO admin_emails (email) 
VALUES ('admin@mrphone.de')
ON CONFLICT (email) DO NOTHING;