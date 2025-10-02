-- Seed device catalog with initial data
-- Based on specification requirements for German market

INSERT INTO devices (id, category, brand, model, variant, release_year, base_price, image_url, specifications) VALUES
-- Apple iPhones
('iphone-16-pro-max-256gb', 'smartphone', 'Apple', 'iPhone 16 Pro Max', '256GB', 2024, 850.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "color": "Titan Natur"}'),
('iphone-16-pro-max-512gb', 'smartphone', 'Apple', 'iPhone 16 Pro Max', '512GB', 2024, 920.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "color": "Titan Natur"}'),
('iphone-16-pro-256gb', 'smartphone', 'Apple', 'iPhone 16 Pro', '256GB', 2024, 750.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('iphone-15-pro-max-256gb', 'smartphone', 'Apple', 'iPhone 15 Pro Max', '256GB', 2023, 680.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('iphone-15-128gb', 'smartphone', 'Apple', 'iPhone 15', '128GB', 2023, 520.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB"}'),
('iphone-14-pro-256gb', 'smartphone', 'Apple', 'iPhone 14 Pro', '256GB', 2022, 480.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('iphone-13-128gb', 'smartphone', 'Apple', 'iPhone 13', '128GB', 2021, 320.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB"}'),
('iphone-12-64gb', 'smartphone', 'Apple', 'iPhone 12', '64GB', 2020, 220.00, '/placeholder.svg?height=400&width=400', '{"storage": "64GB"}'),

-- Samsung Galaxy
('samsung-s24-ultra-256gb', 'smartphone', 'Samsung', 'Galaxy S24 Ultra', '256GB', 2024, 720.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('samsung-s24-plus-256gb', 'smartphone', 'Samsung', 'Galaxy S24+', '256GB', 2024, 580.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('samsung-s23-ultra-256gb', 'smartphone', 'Samsung', 'Galaxy S23 Ultra', '256GB', 2023, 550.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('samsung-s23-128gb', 'smartphone', 'Samsung', 'Galaxy S23', '128GB', 2023, 380.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB"}'),
('samsung-zfold5-256gb', 'smartphone', 'Samsung', 'Galaxy Z Fold 5', '256GB', 2023, 820.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),

-- Google Pixel
('pixel-9-pro-256gb', 'smartphone', 'Google', 'Pixel 9 Pro', '256GB', 2024, 620.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('pixel-8-pro-128gb', 'smartphone', 'Google', 'Pixel 8 Pro', '128GB', 2023, 450.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB"}'),
('pixel-8-128gb', 'smartphone', 'Google', 'Pixel 8', '128GB', 2023, 350.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB"}'),

-- Apple iPads
('ipad-pro-13-m4-256gb', 'tablet', 'Apple', 'iPad Pro 13" M4', '256GB WiFi', 2024, 780.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "connectivity": "WiFi"}'),
('ipad-air-11-m2-128gb', 'tablet', 'Apple', 'iPad Air 11" M2', '128GB WiFi', 2024, 420.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB", "connectivity": "WiFi"}'),
('ipad-10-64gb', 'tablet', 'Apple', 'iPad 10. Generation', '64GB WiFi', 2022, 280.00, '/placeholder.svg?height=400&width=400', '{"storage": "64GB", "connectivity": "WiFi"}'),

-- Samsung Tablets
('samsung-tab-s9-ultra-256gb', 'tablet', 'Samsung', 'Galaxy Tab S9 Ultra', '256GB WiFi', 2023, 680.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "connectivity": "WiFi"}'),
('samsung-tab-s9-128gb', 'tablet', 'Samsung', 'Galaxy Tab S9', '128GB WiFi', 2023, 420.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB", "connectivity": "WiFi"}'),

-- Apple MacBooks
('macbook-pro-16-m3-max-1tb', 'laptop', 'Apple', 'MacBook Pro 16" M3 Max', '1TB', 2023, 2200.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB"}'),
('macbook-air-15-m3-512gb', 'laptop', 'Apple', 'MacBook Air 15" M3', '512GB', 2024, 980.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB"}'),
('macbook-air-13-m2-256gb', 'laptop', 'Apple', 'MacBook Air 13" M2', '256GB', 2022, 720.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),

-- Apple Watches
('apple-watch-ultra-2', 'smartwatch', 'Apple', 'Apple Watch Ultra 2', '49mm', 2023, 520.00, '/placeholder.svg?height=400&width=400', '{}'),
('apple-watch-series-9-45mm', 'smartwatch', 'Apple', 'Apple Watch Series 9', '45mm GPS', 2023, 280.00, '/placeholder.svg?height=400&width=400', '{}'),
('apple-watch-se-2-44mm', 'smartwatch', 'Apple', 'Apple Watch SE 2', '44mm GPS', 2022, 180.00, '/placeholder.svg?height=400&width=400', '{}'),

-- Cameras
('sony-a7iv', 'camera', 'Sony', 'Alpha 7 IV', 'Body', 2021, 1650.00, '/placeholder.svg?height=400&width=400', '{}'),
('canon-eos-r6-ii', 'camera', 'Canon', 'EOS R6 Mark II', 'Body', 2022, 1580.00, '/placeholder.svg?height=400&width=400', '{}'),
('nikon-z6-iii', 'camera', 'Nikon', 'Z6 III', 'Body', 2024, 1820.00, '/placeholder.svg?height=400&width=400', '{}'),

-- Gaming Consoles
('ps5-disc', 'console', 'Sony', 'PlayStation 5', 'Disc Edition', 2020, 320.00, '/placeholder.svg?height=400&width=400', '{}'),
('xbox-series-x', 'console', 'Microsoft', 'Xbox Series X', '1TB', 2020, 310.00, '/placeholder.svg?height=400&width=400', '{}'),
('nintendo-switch-oled', 'console', 'Nintendo', 'Switch OLED', 'Standard', 2021, 220.00, '/placeholder.svg?height=400&width=400', '{}')

ON CONFLICT (id) DO NOTHING;
