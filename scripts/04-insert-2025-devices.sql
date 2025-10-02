-- Insert iPhone 17 series and Samsung Galaxy S25 series (2025 models)
-- These are the latest flagship devices for 2025

-- iPhone 17 series (2025)
INSERT INTO devices (id, category, brand, model, variant, release_year, base_price, image_url, specifications) VALUES
-- iPhone 17 Pro Max
('iphone-17-pro-max-256gb', 'smartphone', 'Apple', 'iPhone 17 Pro Max', '256GB', 2025, 950.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "color": "Titan Natural"}'),
('iphone-17-pro-max-512gb', 'smartphone', 'Apple', 'iPhone 17 Pro Max', '512GB', 2025, 1050.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "color": "Titan Natural"}'),
('iphone-17-pro-max-1tb', 'smartphone', 'Apple', 'iPhone 17 Pro Max', '1TB', 2025, 1180.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB", "color": "Titan Natural"}'),

-- iPhone 17 Pro
('iphone-17-pro-256gb', 'smartphone', 'Apple', 'iPhone 17 Pro', '256GB', 2025, 850.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "color": "Titan Natural"}'),
('iphone-17-pro-512gb', 'smartphone', 'Apple', 'iPhone 17 Pro', '512GB', 2025, 950.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "color": "Titan Natural"}'),
('iphone-17-pro-1tb', 'smartphone', 'Apple', 'iPhone 17 Pro', '1TB', 2025, 1080.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB", "color": "Titan Natural"}'),

-- iPhone 17
('iphone-17-256gb', 'smartphone', 'Apple', 'iPhone 17', '256GB', 2025, 720.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('iphone-17-512gb', 'smartphone', 'Apple', 'iPhone 17', '512GB', 2025, 820.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB"}'),

-- iPhone 17 Air (Slim variant)
('iphone-17-air-256gb', 'smartphone', 'Apple', 'iPhone 17 Air', '256GB', 2025, 780.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('iphone-17-air-512gb', 'smartphone', 'Apple', 'iPhone 17 Air', '512GB', 2025, 880.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB"}'),

-- Samsung Galaxy S25 series (2025)
-- Galaxy S25 Ultra
('samsung-s25-ultra-256gb', 'smartphone', 'Samsung', 'Galaxy S25 Ultra', '256GB', 2025, 820.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('samsung-s25-ultra-512gb', 'smartphone', 'Samsung', 'Galaxy S25 Ultra', '512GB', 2025, 920.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB"}'),
('samsung-s25-ultra-1tb', 'smartphone', 'Samsung', 'Galaxy S25 Ultra', '1TB', 2025, 1050.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB"}'),

-- Galaxy S25+
('samsung-s25-plus-256gb', 'smartphone', 'Samsung', 'Galaxy S25+', '256GB', 2025, 650.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('samsung-s25-plus-512gb', 'smartphone', 'Samsung', 'Galaxy S25+', '512GB', 2025, 750.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB"}'),

-- Galaxy S25
('samsung-s25-128gb', 'smartphone', 'Samsung', 'Galaxy S25', '128GB', 2025, 480.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB"}'),
('samsung-s25-256gb', 'smartphone', 'Samsung', 'Galaxy S25', '256GB', 2025, 550.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('samsung-s25-512gb', 'smartphone', 'Samsung', 'Galaxy S25', '512GB', 2025, 650.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB"}'),

-- Galaxy S25 Edge (new variant)
('samsung-s25-edge-256gb', 'smartphone', 'Samsung', 'Galaxy S25 Edge', '256GB', 2025, 680.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB"}'),
('samsung-s25-edge-512gb', 'smartphone', 'Samsung', 'Galaxy S25 Edge', '512GB', 2025, 780.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB"}')

ON CONFLICT (id) DO NOTHING;
