-- Add 2025 device models to the catalog
-- iPhone 17 series and Samsung Galaxy S25 series

INSERT INTO devices (id, category, brand, model, variant, release_year, base_price, image_url, specifications) VALUES

-- iPhone 17 series (2025)
('iphone-17-256gb', 'smartphone', 'Apple', 'iPhone 17', '256GB', 2025, 650.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "chip": "A19", "display": "6.3 inches"}'),
('iphone-17-512gb', 'smartphone', 'Apple', 'iPhone 17', '512GB', 2025, 720.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "chip": "A19", "display": "6.3 inches"}'),

('iphone-17-air-256gb', 'smartphone', 'Apple', 'iPhone 17 Air', '256GB', 2025, 750.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "chip": "A19 Pro", "display": "6.5 inches", "thickness": "5.64mm"}'),
('iphone-17-air-512gb', 'smartphone', 'Apple', 'iPhone 17 Air', '512GB', 2025, 820.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "chip": "A19 Pro", "display": "6.5 inches", "thickness": "5.64mm"}'),
('iphone-17-air-1tb', 'smartphone', 'Apple', 'iPhone 17 Air', '1TB', 2025, 950.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB", "chip": "A19 Pro", "display": "6.5 inches", "thickness": "5.64mm"}'),

('iphone-17-pro-256gb', 'smartphone', 'Apple', 'iPhone 17 Pro', '256GB', 2025, 850.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "chip": "A19 Pro", "display": "6.3 inches", "camera": "48MP Pro"}'),
('iphone-17-pro-512gb', 'smartphone', 'Apple', 'iPhone 17 Pro', '512GB', 2025, 920.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "chip": "A19 Pro", "display": "6.3 inches", "camera": "48MP Pro"}'),
('iphone-17-pro-1tb', 'smartphone', 'Apple', 'iPhone 17 Pro', '1TB', 2025, 1050.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB", "chip": "A19 Pro", "display": "6.3 inches", "camera": "48MP Pro"}'),

('iphone-17-pro-max-256gb', 'smartphone', 'Apple', 'iPhone 17 Pro Max', '256GB', 2025, 950.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "chip": "A19 Pro", "display": "6.9 inches", "camera": "48MP Pro", "battery": "39 hours"}'),
('iphone-17-pro-max-512gb', 'smartphone', 'Apple', 'iPhone 17 Pro Max', '512GB', 2025, 1020.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "chip": "A19 Pro", "display": "6.9 inches", "camera": "48MP Pro", "battery": "39 hours"}'),
('iphone-17-pro-max-1tb', 'smartphone', 'Apple', 'iPhone 17 Pro Max', '1TB', 2025, 1150.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB", "chip": "A19 Pro", "display": "6.9 inches", "camera": "48MP Pro", "battery": "39 hours"}'),
('iphone-17-pro-max-2tb', 'smartphone', 'Apple', 'iPhone 17 Pro Max', '2TB', 2025, 1350.00, '/placeholder.svg?height=400&width=400', '{"storage": "2TB", "chip": "A19 Pro", "display": "6.9 inches", "camera": "48MP Pro", "battery": "39 hours"}'),

-- Samsung Galaxy S25 series (2025)
('samsung-s25-128gb', 'smartphone', 'Samsung', 'Galaxy S25', '128GB', 2025, 450.00, '/placeholder.svg?height=400&width=400', '{"storage": "128GB", "chip": "Snapdragon 8 Elite", "display": "6.2 inches"}'),
('samsung-s25-256gb', 'smartphone', 'Samsung', 'Galaxy S25', '256GB', 2025, 520.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "chip": "Snapdragon 8 Elite", "display": "6.2 inches"}'),
('samsung-s25-512gb', 'smartphone', 'Samsung', 'Galaxy S25', '512GB', 2025, 600.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "chip": "Snapdragon 8 Elite", "display": "6.2 inches"}'),

('samsung-s25-plus-256gb', 'smartphone', 'Samsung', 'Galaxy S25+', '256GB', 2025, 650.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "chip": "Snapdragon 8 Elite", "display": "6.7 inches"}'),
('samsung-s25-plus-512gb', 'smartphone', 'Samsung', 'Galaxy S25+', '512GB', 2025, 720.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "chip": "Snapdragon 8 Elite", "display": "6.7 inches"}'),

('samsung-s25-ultra-256gb', 'smartphone', 'Samsung', 'Galaxy S25 Ultra', '256GB', 2025, 800.00, '/placeholder.svg?height=400&width=400', '{"storage": "256GB", "chip": "Snapdragon 8 Elite", "display": "6.9 inches", "camera": "200MP", "s_pen": true}'),
('samsung-s25-ultra-512gb', 'smartphone', 'Samsung', 'Galaxy S25 Ultra', '512GB', 2025, 880.00, '/placeholder.svg?height=400&width=400', '{"storage": "512GB", "chip": "Snapdragon 8 Elite", "display": "6.9 inches", "camera": "200MP", "s_pen": true}'),
('samsung-s25-ultra-1tb', 'smartphone', 'Samsung', 'Galaxy S25 Ultra', '1TB', 2025, 1000.00, '/placeholder.svg?height=400&width=400', '{"storage": "1TB", "chip": "Snapdragon 8 Elite", "display": "6.9 inches", "camera": "200MP", "s_pen": true}')

ON CONFLICT (id) DO NOTHING;
