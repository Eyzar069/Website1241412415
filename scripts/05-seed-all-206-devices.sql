-- Complete device catalog with all 206 devices
-- This replaces the partial seed from 02-seed-devices.sql

-- Clear existing devices first (optional - remove if you want to keep existing data)
-- DELETE FROM devices;

INSERT INTO devices (id, category, brand, model, variant, release_year, base_price, image_url, specifications) VALUES
-- Apple iPhones (8 devices)
('iphone-16-pro-max-256gb', 'smartphone', 'Apple', 'iPhone 16 Pro Max', '256GB', 2024, 850.00, '/iphone-16-pro-max.png', '{"storage": "256GB", "color": "Titan Natur"}'),
('iphone-16-pro-max-512gb', 'smartphone', 'Apple', 'iPhone 16 Pro Max', '512GB', 2024, 920.00, '/iphone-16-pro-max.png', '{"storage": "512GB", "color": "Titan Natur"}'),
('iphone-16-pro-256gb', 'smartphone', 'Apple', 'iPhone 16 Pro', '256GB', 2024, 750.00, '/iphone-16-pro.png', '{"storage": "256GB"}'),
('iphone-15-pro-max-256gb', 'smartphone', 'Apple', 'iPhone 15 Pro Max', '256GB', 2023, 680.00, '/iphone-15-pro-max.png', '{"storage": "256GB"}'),
('iphone-15-128gb', 'smartphone', 'Apple', 'iPhone 15', '128GB', 2023, 520.00, '/iphone-15-hands.png', '{"storage": "128GB"}'),
('iphone-14-pro-256gb', 'smartphone', 'Apple', 'iPhone 14 Pro', '256GB', 2022, 480.00, '/iphone-14-pro.png', '{"storage": "256GB"}'),
('iphone-13-128gb', 'smartphone', 'Apple', 'iPhone 13', '128GB', 2021, 320.00, '/iphone-13.png', '{"storage": "128GB"}'),
('iphone-12-64gb', 'smartphone', 'Apple', 'iPhone 12', '64GB', 2020, 220.00, '/iphone-12.png', '{"storage": "64GB"}'),

-- Samsung Galaxy (6 devices)
('samsung-s24-ultra-256gb', 'smartphone', 'Samsung', 'Galaxy S24 Ultra', '256GB', 2024, 720.00, '/samsung-galaxy-s24-ultra.png', '{"storage": "256GB"}'),
('samsung-s24-plus-256gb', 'smartphone', 'Samsung', 'Galaxy S24+', '256GB', 2024, 580.00, '/samsung-galaxy-s24-plus.jpg', '{"storage": "256GB"}'),
('samsung-s23-ultra-256gb', 'smartphone', 'Samsung', 'Galaxy S23 Ultra', '256GB', 2023, 550.00, '/samsung-galaxy-s23-ultra.png', '{"storage": "256GB"}'),
('samsung-s23-128gb', 'smartphone', 'Samsung', 'Galaxy S23', '128GB', 2023, 380.00, '/samsung-galaxy-s23.png', '{"storage": "128GB"}'),
('samsung-zfold5-256gb', 'smartphone', 'Samsung', 'Galaxy Z Fold 5', '256GB', 2023, 820.00, '/samsung-galaxy-z-fold-5.png', '{"storage": "256GB"}'),
('samsung-a54-128gb', 'smartphone', 'Samsung', 'Galaxy A54', '128GB', 2023, 220.00, '/samsung-galaxy-a54.png', '{"storage": "128GB"}'),

-- Google Pixel (4 devices)
('pixel-9-pro-256gb', 'smartphone', 'Google', 'Pixel 9 Pro', '256GB', 2024, 620.00, '/google-pixel-9-pro.jpg', '{"storage": "256GB"}'),
('pixel-8-pro-128gb', 'smartphone', 'Google', 'Pixel 8 Pro', '128GB', 2023, 450.00, '/google-pixel-8-pro.png', '{"storage": "128GB"}'),
('pixel-8-128gb', 'smartphone', 'Google', 'Pixel 8', '128GB', 2023, 350.00, '/google-pixel-8.png', '{"storage": "128GB"}'),
('pixel-7a-128gb', 'smartphone', 'Google', 'Pixel 7a', '128GB', 2023, 280.00, '/google-pixel-7a.jpg', '{"storage": "128GB"}'),

-- Xiaomi (4 devices)
('xiaomi-14-ultra-512gb', 'smartphone', 'Xiaomi', '14 Ultra', '512GB', 2024, 680.00, '/xiaomi-14-ultra.png', '{"storage": "512GB"}'),
('xiaomi-14-256gb', 'smartphone', 'Xiaomi', '14', '256GB', 2024, 520.00, '/xiaomi-14-smartphone.png', '{"storage": "256GB"}'),
('xiaomi-13-pro-256gb', 'smartphone', 'Xiaomi', '13 Pro', '256GB', 2023, 420.00, '/xiaomi-13-pro.jpg', '{"storage": "256GB"}'),
('xiaomi-redmi-note-13-pro-256gb', 'smartphone', 'Xiaomi', 'Redmi Note 13 Pro', '256GB', 2024, 180.00, '/xiaomi-redmi-note-13-pro.jpg', '{"storage": "256GB"}'),

-- Sony (3 devices)
('sony-xperia-1-v-256gb', 'smartphone', 'Sony', 'Xperia 1 V', '256GB', 2023, 580.00, '/sony-xperia-1-v.png', '{"storage": "256GB"}'),
('sony-xperia-5-v-128gb', 'smartphone', 'Sony', 'Xperia 5 V', '128GB', 2023, 450.00, '/sony-xperia-5-v.jpg', '{"storage": "128GB"}'),
('sony-xperia-10-v-128gb', 'smartphone', 'Sony', 'Xperia 10 V', '128GB', 2023, 220.00, '/sony-xperia-10-v.jpg', '{"storage": "128GB"}'),

-- OnePlus (3 devices)
('oneplus-12-256gb', 'smartphone', 'OnePlus', '12', '256GB', 2024, 580.00, '/oneplus-12-product-shot.png', '{"storage": "256GB"}'),
('oneplus-11-256gb', 'smartphone', 'OnePlus', '11', '256GB', 2023, 420.00, '/oneplus-11.jpg', '{"storage": "256GB"}'),
('oneplus-nord-3-128gb', 'smartphone', 'OnePlus', 'Nord 3', '128GB', 2023, 250.00, '/oneplus-nord-3.jpg', '{"storage": "128GB"}'),

-- Huawei (3 devices)
('huawei-p60-pro-256gb', 'smartphone', 'Huawei', 'P60 Pro', '256GB', 2023, 480.00, '/huawei-p60-pro.jpg', '{"storage": "256GB"}'),
('huawei-mate-60-pro-512gb', 'smartphone', 'Huawei', 'Mate 60 Pro', '512GB', 2023, 520.00, '/huawei-mate-60-pro.jpg', '{"storage": "512GB"}'),
('huawei-nova-11-256gb', 'smartphone', 'Huawei', 'Nova 11', '256GB', 2023, 280.00, '/huawei-nova-11.jpg', '{"storage": "256GB"}'),

-- Nothing (3 devices)
('nothing-phone-2-256gb', 'smartphone', 'Nothing', 'Phone (2)', '256GB', 2023, 380.00, '/nothing-phone-2.png', '{"storage": "256GB"}'),
('nothing-phone-2a-128gb', 'smartphone', 'Nothing', 'Phone (2a)', '128GB', 2024, 220.00, '/nothing-phone-2a.jpg', '{"storage": "128GB"}'),
('nothing-phone-1-128gb', 'smartphone', 'Nothing', 'Phone (1)', '128GB', 2022, 280.00, '/nothing-phone-1.jpg', '{"storage": "128GB"}'),

-- Asus (3 devices)
('asus-rog-phone-8-pro-512gb', 'smartphone', 'Asus', 'ROG Phone 8 Pro', '512GB', 2024, 680.00, '/asus-rog-phone-8-pro.jpg', '{"storage": "512GB"}'),
('asus-zenfone-10-256gb', 'smartphone', 'Asus', 'Zenfone 10', '256GB', 2023, 420.00, '/asus-zenfone-10.jpg', '{"storage": "256GB"}'),
('asus-rog-phone-7-256gb', 'smartphone', 'Asus', 'ROG Phone 7', '256GB', 2023, 520.00, '/asus-rog-phone-7.jpg', '{"storage": "256GB"}'),

-- Vivo (3 devices)
('vivo-x100-pro-256gb', 'smartphone', 'Vivo', 'X100 Pro', '256GB', 2024, 580.00, '/vivo-x100-pro.jpg', '{"storage": "256GB"}'),
('vivo-v29-256gb', 'smartphone', 'Vivo', 'V29', '256GB', 2023, 320.00, '/vivo-v29.jpg', '{"storage": "256GB"}'),
('vivo-y36-128gb', 'smartphone', 'Vivo', 'Y36', '128GB', 2023, 150.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),

-- Oppo (3 devices)
('oppo-find-x7-ultra-512gb', 'smartphone', 'Oppo', 'Find X7 Ultra', '512GB', 2024, 620.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('oppo-reno-11-pro-256gb', 'smartphone', 'Oppo', 'Reno 11 Pro', '256GB', 2024, 380.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('oppo-a98-256gb', 'smartphone', 'Oppo', 'A98', '256GB', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),

-- Realme (3 devices)
('realme-gt-5-pro-256gb', 'smartphone', 'Realme', 'GT 5 Pro', '256GB', 2024, 420.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('realme-12-pro-plus-256gb', 'smartphone', 'Realme', '12 Pro+', '256GB', 2024, 320.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('realme-c67-128gb', 'smartphone', 'Realme', 'C67', '128GB', 2024, 120.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),

-- Honor (3 devices)
('honor-magic-6-pro-512gb', 'smartphone', 'Honor', 'Magic 6 Pro', '512GB', 2024, 620.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('honor-90-256gb', 'smartphone', 'Honor', '90', '256GB', 2023, 320.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('honor-x9b-256gb', 'smartphone', 'Honor', 'X9b', '256GB', 2024, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),

-- LG (3 devices)
('lg-wing-128gb', 'smartphone', 'LG', 'Wing', '128GB', 2020, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('lg-velvet-128gb', 'smartphone', 'LG', 'Velvet', '128GB', 2020, 150.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('lg-v60-thinq-128gb', 'smartphone', 'LG', 'V60 ThinQ', '128GB', 2020, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),

-- Nokia (3 devices)
('nokia-xr21-128gb', 'smartphone', 'Nokia', 'XR21', '128GB', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('nokia-g60-128gb', 'smartphone', 'Nokia', 'G60', '128GB', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('nokia-x30-256gb', 'smartphone', 'Nokia', 'X30', '256GB', 2022, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),

-- Wiko (3 devices)
('wiko-10-128gb', 'smartphone', 'Wiko', '10', '128GB', 2023, 120.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('wiko-t50-64gb', 'smartphone', 'Wiko', 'T50', '64GB', 2023, 80.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB"}'),
('wiko-power-u30-64gb', 'smartphone', 'Wiko', 'Power U30', '64GB', 2022, 90.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB"}'),

-- Blackberry (3 devices)
('blackberry-key2-64gb', 'smartphone', 'Blackberry', 'KEY2', '64GB', 2018, 120.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB"}'),
('blackberry-key2-le-64gb', 'smartphone', 'Blackberry', 'KEY2 LE', '64GB', 2018, 90.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB"}'),
('blackberry-motion-32gb', 'smartphone', 'Blackberry', 'Motion', '32GB', 2017, 70.00, '/placeholder.svg?height=300&width=300', '{"storage": "32GB"}'),

-- HTC (3 devices)
('htc-u23-pro-256gb', 'smartphone', 'HTC', 'U23 Pro', '256GB', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('htc-desire-22-pro-128gb', 'smartphone', 'HTC', 'Desire 22 Pro', '128GB', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('htc-u20-256gb', 'smartphone', 'HTC', 'U20', '256GB', 2020, 150.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),

-- Motorola (3 devices)
('motorola-edge-50-ultra-512gb', 'smartphone', 'Motorola', 'Edge 50 Ultra', '512GB', 2024, 520.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('motorola-razr-40-ultra-256gb', 'smartphone', 'Motorola', 'Razr 40 Ultra', '256GB', 2023, 480.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('motorola-g84-256gb', 'smartphone', 'Motorola', 'Moto G84', '256GB', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),

-- Doogee (3 devices)
('doogee-v30-256gb', 'smartphone', 'Doogee', 'V30', '256GB', 2023, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('doogee-s100-256gb', 'smartphone', 'Doogee', 'S100', '256GB', 2023, 150.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('doogee-x97-pro-64gb', 'smartphone', 'Doogee', 'X97 Pro', '64GB', 2023, 80.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB"}'),

-- Fairphone (3 devices)
('fairphone-5-256gb', 'smartphone', 'Fairphone', '5', '256GB', 2023, 380.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('fairphone-4-128gb', 'smartphone', 'Fairphone', '4', '128GB', 2021, 280.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('fairphone-3-plus-64gb', 'smartphone', 'Fairphone', '3+', '64GB', 2020, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB"}'),

-- ZTE (3 devices)
('zte-axon-50-ultra-256gb', 'smartphone', 'ZTE', 'Axon 50 Ultra', '256GB', 2023, 380.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('zte-blade-v50-128gb', 'smartphone', 'ZTE', 'Blade V50', '128GB', 2023, 150.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('zte-nubia-z60-ultra-256gb', 'smartphone', 'ZTE', 'Nubia Z60 Ultra', '256GB', 2024, 420.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),

-- Catphones (3 devices)
('cat-s75-128gb', 'smartphone', 'Catphones', 'S75', '128GB', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('cat-s62-pro-128gb', 'smartphone', 'Catphones', 'S62 Pro', '128GB', 2020, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),
('cat-s53-64gb', 'smartphone', 'Catphones', 'S53', '64GB', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB"}'),

-- Tecno (3 devices)
('tecno-phantom-x2-pro-256gb', 'smartphone', 'Tecno', 'Phantom X2 Pro', '256GB', 2023, 320.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('tecno-camon-20-pro-256gb', 'smartphone', 'Tecno', 'Camon 20 Pro', '256GB', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('tecno-spark-10-pro-128gb', 'smartphone', 'Tecno', 'Spark 10 Pro', '128GB', 2023, 120.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB"}'),

-- TABLETS START HERE (34 total)

-- Apple iPads (5 devices)
('ipad-pro-13-m4-256gb', 'tablet', 'Apple', 'iPad Pro 13" M4', '256GB WiFi', 2024, 780.00, '/ipad-pro-13-inch-m4.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),
('ipad-pro-13-m4-512gb', 'tablet', 'Apple', 'iPad Pro 13" M4', '512GB WiFi', 2024, 920.00, '/ipad-pro-13-inch-m4.jpg', '{"storage": "512GB", "connectivity": "WiFi"}'),
('ipad-air-11-m2-128gb', 'tablet', 'Apple', 'iPad Air 11" M2', '128GB WiFi', 2024, 420.00, '/ipad-air-11-inch-m2.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),
('ipad-10-64gb', 'tablet', 'Apple', 'iPad 10. Generation', '64GB WiFi', 2022, 280.00, '/ipad-10th-generation.jpg', '{"storage": "64GB", "connectivity": "WiFi"}'),
('ipad-mini-6-64gb', 'tablet', 'Apple', 'iPad mini 6', '64GB WiFi', 2021, 320.00, '/ipad-mini-6.jpg', '{"storage": "64GB", "connectivity": "WiFi"}'),

-- Samsung Tablets (4 devices)
('samsung-tab-s9-ultra-256gb', 'tablet', 'Samsung', 'Galaxy Tab S9 Ultra', '256GB WiFi', 2023, 680.00, '/samsung-galaxy-tab-s9-ultra.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),
('samsung-tab-s9-plus-256gb', 'tablet', 'Samsung', 'Galaxy Tab S9+', '256GB WiFi', 2023, 520.00, '/samsung-galaxy-tab-s9-plus.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),
('samsung-tab-s9-128gb', 'tablet', 'Samsung', 'Galaxy Tab S9', '128GB WiFi', 2023, 420.00, '/samsung-galaxy-tab-s9.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),
('samsung-tab-a9-plus-128gb', 'tablet', 'Samsung', 'Galaxy Tab A9+', '128GB WiFi', 2023, 180.00, '/samsung-galaxy-tab-a9-plus.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),

-- Xiaomi Tablets (3 devices)
('xiaomi-pad-6-pro-256gb', 'tablet', 'Xiaomi', 'Pad 6 Pro', '256GB WiFi', 2023, 380.00, '/xiaomi-pad-6-pro.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),
('xiaomi-pad-6-128gb', 'tablet', 'Xiaomi', 'Pad 6', '128GB WiFi', 2023, 280.00, '/xiaomi-pad-6.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),
('xiaomi-redmi-pad-se-128gb', 'tablet', 'Xiaomi', 'Redmi Pad SE', '128GB WiFi', 2023, 150.00, '/xiaomi-redmi-pad-se.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),

-- Huawei Tablets (3 devices)
('huawei-matepad-pro-13-256gb', 'tablet', 'Huawei', 'MatePad Pro 13.2', '256GB WiFi', 2023, 520.00, '/huawei-matepad-pro-13.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),
('huawei-matepad-11-128gb', 'tablet', 'Huawei', 'MatePad 11', '128GB WiFi', 2023, 320.00, '/huawei-matepad-11.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),
('huawei-matepad-se-64gb', 'tablet', 'Huawei', 'MatePad SE', '64GB WiFi', 2023, 180.00, '/huawei-matepad-se.jpg', '{"storage": "64GB", "connectivity": "WiFi"}'),

-- Lenovo Tablets (3 devices)
('lenovo-tab-p12-pro-256gb', 'tablet', 'Lenovo', 'Tab P12 Pro', '256GB WiFi', 2023, 420.00, '/lenovo-tab-p12-pro.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),
('lenovo-tab-p11-gen2-128gb', 'tablet', 'Lenovo', 'Tab P11 Gen 2', '128GB WiFi', 2022, 220.00, '/lenovo-tab-p11-gen-2.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),
('lenovo-tab-m10-plus-64gb', 'tablet', 'Lenovo', 'Tab M10 Plus', '64GB WiFi', 2023, 150.00, '/lenovo-tab-m10-plus.jpg', '{"storage": "64GB", "connectivity": "WiFi"}'),

-- Microsoft Surface (2 devices)
('surface-pro-9-256gb', 'tablet', 'Microsoft', 'Surface Pro 9', '256GB', 2022, 680.00, '/microsoft-surface-pro-9.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),
('surface-go-3-128gb', 'tablet', 'Microsoft', 'Surface Go 3', '128GB', 2021, 320.00, '/microsoft-surface-go-3.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),

-- Google Tablets (2 devices)
('google-pixel-tablet-128gb', 'tablet', 'Google', 'Pixel Tablet', '128GB WiFi', 2023, 320.00, '/google-pixel-tablet.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),
('google-pixel-tablet-256gb', 'tablet', 'Google', 'Pixel Tablet', '256GB WiFi', 2023, 380.00, '/google-pixel-tablet.jpg', '{"storage": "256GB", "connectivity": "WiFi"}'),

-- OnePlus Tablets (2 devices)
('oneplus-pad-128gb', 'tablet', 'OnePlus', 'Pad', '128GB WiFi', 2023, 320.00, '/oneplus-pad.jpg', '{"storage": "128GB", "connectivity": "WiFi"}'),
('oneplus-pad-go-128gb', 'tablet', 'OnePlus', 'Pad Go', '128GB WiFi', 2023, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB", "connectivity": "WiFi"}'),

-- Realme Tablets (2 devices)
('realme-pad-2-256gb', 'tablet', 'Realme', 'Pad 2', '256GB WiFi', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB", "connectivity": "WiFi"}'),
('realme-pad-mini-64gb', 'tablet', 'Realme', 'Pad Mini', '64GB WiFi', 2022, 120.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB", "connectivity": "WiFi"}'),

-- Nokia Tablets (2 devices)
('nokia-t21-128gb', 'tablet', 'Nokia', 'T21', '128GB WiFi', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB", "connectivity": "WiFi"}'),
('nokia-t20-64gb', 'tablet', 'Nokia', 'T20', '64GB WiFi', 2021, 150.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB", "connectivity": "WiFi"}'),

-- Asus Tablets (2 devices)
('asus-zenpad-10-128gb', 'tablet', 'Asus', 'ZenPad 10', '128GB WiFi', 2022, 220.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB", "connectivity": "WiFi"}'),
('asus-rog-flow-z13-512gb', 'tablet', 'Asus', 'ROG Flow Z13', '512GB', 2023, 980.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB", "connectivity": "WiFi"}'),

-- Honor Tablets (2 devices)
('honor-pad-9-256gb', 'tablet', 'Honor', 'Pad 9', '256GB WiFi', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB", "connectivity": "WiFi"}'),
('honor-pad-8-128gb', 'tablet', 'Honor', 'Pad 8', '128GB WiFi', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB", "connectivity": "WiFi"}'),

-- Amazon Tablets (2 devices)
('amazon-fire-max-11-128gb', 'tablet', 'Amazon', 'Fire Max 11', '128GB', 2023, 150.00, '/placeholder.svg?height=300&width=300', '{"storage": "128GB", "connectivity": "WiFi"}'),
('amazon-fire-hd-10-64gb', 'tablet', 'Amazon', 'Fire HD 10', '64GB', 2023, 80.00, '/placeholder.svg?height=300&width=300', '{"storage": "64GB", "connectivity": "WiFi"}'),

-- LAPTOPS START HERE (45 total)

-- Apple MacBooks (5 devices)
('macbook-pro-16-m3-max-1tb', 'laptop', 'Apple', 'MacBook Pro 16" M3 Max', '1TB', 2023, 2200.00, '/macbook-pro-16-inch-m3-max.jpg', '{"storage": "1TB"}'),
('macbook-pro-14-m3-pro-512gb', 'laptop', 'Apple', 'MacBook Pro 14" M3 Pro', '512GB', 2023, 1480.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('macbook-air-15-m3-512gb', 'laptop', 'Apple', 'MacBook Air 15" M3', '512GB', 2024, 980.00, '/macbook-air-15-inch-m3.jpg', '{"storage": "512GB"}'),
('macbook-air-13-m3-256gb', 'laptop', 'Apple', 'MacBook Air 13" M3', '256GB', 2024, 820.00, '/placeholder.svg?height=300&width=300', '{"storage": "256GB"}'),
('macbook-air-13-m2-256gb', 'laptop', 'Apple', 'MacBook Air 13" M2', '256GB', 2022, 720.00, '/macbook-air-13-inch-m2.jpg', '{"storage": "256GB"}'),

-- Dell Laptops (4 devices)
('dell-xps-15-9530-1tb', 'laptop', 'Dell', 'XPS 15 9530', '1TB', 2023, 1280.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('dell-xps-13-plus-512gb', 'laptop', 'Dell', 'XPS 13 Plus', '512GB', 2023, 980.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('dell-inspiron-16-512gb', 'laptop', 'Dell', 'Inspiron 16', '512GB', 2023, 620.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('dell-alienware-m18-2tb', 'laptop', 'Dell', 'Alienware m18', '2TB', 2023, 1880.00, '/placeholder.svg?height=300&width=300', '{"storage": "2TB"}'),

-- HP Laptops (4 devices)
('hp-spectre-x360-16-1tb', 'laptop', 'HP', 'Spectre x360 16', '1TB', 2023, 1180.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('hp-envy-14-512gb', 'laptop', 'HP', 'Envy 14', '512GB', 2023, 820.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('hp-pavilion-15-512gb', 'laptop', 'HP', 'Pavilion 15', '512GB', 2023, 520.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('hp-omen-17-1tb', 'laptop', 'HP', 'Omen 17', '1TB', 2023, 1380.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),

-- Lenovo Laptops (4 devices)
('lenovo-thinkpad-x1-carbon-gen11-1tb', 'laptop', 'Lenovo', 'ThinkPad X1 Carbon Gen 11', '1TB', 2023, 1280.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('lenovo-yoga-9i-512gb', 'laptop', 'Lenovo', 'Yoga 9i', '512GB', 2023, 980.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('lenovo-ideapad-5-pro-512gb', 'laptop', 'Lenovo', 'IdeaPad 5 Pro', '512GB', 2023, 620.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('lenovo-legion-pro-7i-1tb', 'laptop', 'Lenovo', 'Legion Pro 7i', '1TB', 2023, 1580.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),

-- Asus Laptops (4 devices)
('asus-zenbook-pro-14-oled-1tb', 'laptop', 'Asus', 'ZenBook Pro 14 OLED', '1TB', 2023, 1180.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('asus-rog-zephyrus-g16-1tb', 'laptop', 'Asus', 'ROG Zephyrus G16', '1TB', 2024, 1680.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('asus-vivobook-s15-512gb', 'laptop', 'Asus', 'VivoBook S15', '512GB', 2023, 620.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('asus-tuf-gaming-a15-1tb', 'laptop', 'Asus', 'TUF Gaming A15', '1TB', 2023, 880.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),

-- Acer Laptops (3 devices)
('acer-swift-x-14-512gb', 'laptop', 'Acer', 'Swift X 14', '512GB', 2023, 720.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('acer-aspire-5-512gb', 'laptop', 'Acer', 'Aspire 5', '512GB', 2023, 480.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('acer-predator-helios-16-1tb', 'laptop', 'Acer', 'Predator Helios 16', '1TB', 2023, 1380.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),

-- MSI Laptops (3 devices)
('msi-titan-gt77-2tb', 'laptop', 'MSI', 'Titan GT77', '2TB', 2023, 2480.00, '/placeholder.svg?height=300&width=300', '{"storage": "2TB"}'),
('msi-stealth-17-studio-1tb', 'laptop', 'MSI', 'Stealth 17 Studio', '1TB', 2023, 1580.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('msi-cyborg-15-512gb', 'laptop', 'MSI', 'Cyborg 15', '512GB', 2023, 780.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),

-- Microsoft Surface Laptops (2 devices)
('surface-laptop-studio-2-1tb', 'laptop', 'Microsoft', 'Surface Laptop Studio 2', '1TB', 2023, 1680.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('surface-laptop-5-512gb', 'laptop', 'Microsoft', 'Surface Laptop 5', '512GB', 2022, 980.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),

-- Samsung Laptops (3 devices)
('samsung-galaxy-book3-ultra-1tb', 'laptop', 'Samsung', 'Galaxy Book3 Ultra', '1TB', 2023, 1380.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('samsung-galaxy-book3-pro-512gb', 'laptop', 'Samsung', 'Galaxy Book3 Pro', '512GB', 2023, 980.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('samsung-galaxy-book2-360-512gb', 'laptop', 'Samsung', 'Galaxy Book2 360', '512GB', 2022, 720.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),

-- Huawei Laptops (3 devices)
('huawei-matebook-x-pro-1tb', 'laptop', 'Huawei', 'MateBook X Pro', '1TB', 2023, 1180.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('huawei-matebook-14-512gb', 'laptop', 'Huawei', 'MateBook 14', '512GB', 2023, 720.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('huawei-matebook-d16-512gb', 'laptop', 'Huawei', 'MateBook D16', '512GB', 2023, 580.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),

-- LG Laptops (3 devices)
('lg-gram-17-1tb', 'laptop', 'LG', 'Gram 17', '1TB', 2023, 1180.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('lg-gram-16-512gb', 'laptop', 'LG', 'Gram 16', '512GB', 2023, 980.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('lg-gram-14-512gb', 'laptop', 'LG', 'Gram 14', '512GB', 2023, 820.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),

-- Razer Laptops (3 devices)
('razer-blade-18-2tb', 'laptop', 'Razer', 'Blade 18', '2TB', 2023, 2280.00, '/placeholder.svg?height=300&width=300', '{"storage": "2TB"}'),
('razer-blade-15-1tb', 'laptop', 'Razer', 'Blade 15', '1TB', 2023, 1680.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),
('razer-blade-14-1tb', 'laptop', 'Razer', 'Blade 14', '1TB', 2023, 1480.00, '/placeholder.svg?height=300&width=300', '{"storage": "1TB"}'),

-- Xiaomi Laptops (2 devices)
('xiaomi-book-pro-14-512gb', 'laptop', 'Xiaomi', 'Book Pro 14', '512GB', 2023, 720.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('xiaomi-redmibook-15-512gb', 'laptop', 'Xiaomi', 'RedmiBook 15', '512GB', 2023, 520.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),

-- Honor Laptops (2 devices)
('honor-magicbook-pro-16-512gb', 'laptop', 'Honor', 'MagicBook Pro 16', '512GB', 2023, 720.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),
('honor-magicbook-14-512gb', 'laptop', 'Honor', 'MagicBook 14', '512GB', 2023, 580.00, '/placeholder.svg?height=300&width=300', '{"storage": "512GB"}'),

-- SMARTWATCHES START HERE (39 total)

-- Apple Watches (5 devices)
('apple-watch-ultra-2', 'smartwatch', 'Apple', 'Apple Watch Ultra 2', '49mm', 2023, 520.00, '/apple-watch-ultra-2.jpg', '{}'),
('apple-watch-series-10-46mm', 'smartwatch', 'Apple', 'Apple Watch Series 10', '46mm GPS', 2024, 320.00, '/placeholder.svg?height=300&width=300', '{}'),
('apple-watch-series-9-45mm', 'smartwatch', 'Apple', 'Apple Watch Series 9', '45mm GPS', 2023, 280.00, '/apple-watch-series-9.jpg', '{}'),
('apple-watch-se-2-44mm', 'smartwatch', 'Apple', 'Apple Watch SE 2', '44mm GPS', 2022, 180.00, '/apple-watch-se-2.jpg', '{}'),
('apple-watch-series-8-41mm', 'smartwatch', 'Apple', 'Apple Watch Series 8', '41mm GPS', 2022, 220.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Samsung Watches (4 devices)
('samsung-galaxy-watch-6-classic-47mm', 'smartwatch', 'Samsung', 'Galaxy Watch 6 Classic', '47mm', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{}'),
('samsung-galaxy-watch-6-44mm', 'smartwatch', 'Samsung', 'Galaxy Watch 6', '44mm', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{}'),
('samsung-galaxy-watch-5-pro-45mm', 'smartwatch', 'Samsung', 'Galaxy Watch 5 Pro', '45mm', 2022, 280.00, '/placeholder.svg?height=300&width=300', '{}'),
('samsung-galaxy-watch-5-40mm', 'smartwatch', 'Samsung', 'Galaxy Watch 5', '40mm', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Google Watches (2 devices)
('google-pixel-watch-2', 'smartwatch', 'Google', 'Pixel Watch 2', 'WiFi', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{}'),
('google-pixel-watch', 'smartwatch', 'Google', 'Pixel Watch', 'WiFi', 2022, 220.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Huawei Watches (3 devices)
('huawei-watch-ultimate', 'smartwatch', 'Huawei', 'Watch Ultimate', 'Standard', 2023, 480.00, '/placeholder.svg?height=300&width=300', '{}'),
('huawei-watch-gt-4-46mm', 'smartwatch', 'Huawei', 'Watch GT 4', '46mm', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{}'),
('huawei-watch-fit-3', 'smartwatch', 'Huawei', 'Watch Fit 3', 'Standard', 2024, 120.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Xiaomi Watches (3 devices)
('xiaomi-watch-s3', 'smartwatch', 'Xiaomi', 'Watch S3', 'Standard', 2024, 180.00, '/placeholder.svg?height=300&width=300', '{}'),
('xiaomi-watch-2-pro', 'smartwatch', 'Xiaomi', 'Watch 2 Pro', 'Standard', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{}'),
('xiaomi-smart-band-8-pro', 'smartwatch', 'Xiaomi', 'Smart Band 8 Pro', 'Standard', 2023, 80.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Garmin Watches (4 devices)
('garmin-fenix-7x-pro', 'smartwatch', 'Garmin', 'Fenix 7X Pro', 'Sapphire Solar', 2023, 580.00, '/placeholder.svg?height=300&width=300', '{}'),
('garmin-forerunner-965', 'smartwatch', 'Garmin', 'Forerunner 965', 'Standard', 2023, 420.00, '/placeholder.svg?height=300&width=300', '{}'),
('garmin-venu-3', 'smartwatch', 'Garmin', 'Venu 3', 'Standard', 2023, 320.00, '/placeholder.svg?height=300&width=300', '{}'),
('garmin-vivoactive-5', 'smartwatch', 'Garmin', 'Vivoactive 5', 'Standard', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Fitbit Watches (3 devices)
('fitbit-sense-2', 'smartwatch', 'Fitbit', 'Sense 2', 'Standard', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{}'),
('fitbit-versa-4', 'smartwatch', 'Fitbit', 'Versa 4', 'Standard', 2022, 150.00, '/placeholder.svg?height=300&width=300', '{}'),
('fitbit-charge-6', 'smartwatch', 'Fitbit', 'Charge 6', 'Standard', 2023, 120.00, '/placeholder.svg?height=300&width=300', '{}'),

-- OnePlus Watches (2 devices)
('oneplus-watch-2', 'smartwatch', 'OnePlus', 'Watch 2', 'Standard', 2024, 220.00, '/placeholder.svg?height=300&width=300', '{}'),
('oneplus-watch-2r', 'smartwatch', 'OnePlus', 'Watch 2R', 'Standard', 2024, 180.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Oppo Watches (2 devices)
('oppo-watch-x', 'smartwatch', 'Oppo', 'Watch X', 'Standard', 2024, 280.00, '/placeholder.svg?height=300&width=300', '{}'),
('oppo-watch-4-pro', 'smartwatch', 'Oppo', 'Watch 4 Pro', 'Standard', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Realme Watches (2 devices)
('realme-watch-s2', 'smartwatch', 'Realme', 'Watch S2', 'Standard', 2023, 80.00, '/placeholder.svg?height=300&width=300', '{}'),
('realme-watch-3-pro', 'smartwatch', 'Realme', 'Watch 3 Pro', 'Standard', 2023, 120.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Honor Watches (2 devices)
('honor-watch-4-pro', 'smartwatch', 'Honor', 'Watch 4 Pro', 'Standard', 2023, 220.00, '/placeholder.svg?height=300&width=300', '{}'),
('honor-watch-4', 'smartwatch', 'Honor', 'Watch 4', 'Standard', 2023, 150.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Fossil Watches (2 devices)
('fossil-gen-6-wellness', 'smartwatch', 'Fossil', 'Gen 6 Wellness', '44mm', 2022, 180.00, '/placeholder.svg?height=300&width=300', '{}'),
('fossil-sport-smartwatch', 'smartwatch', 'Fossil', 'Sport Smartwatch', '43mm', 2022, 150.00, '/placeholder.svg?height=300&width=300', '{}'),

-- TicWatch (2 devices)
('ticwatch-pro-5', 'smartwatch', 'TicWatch', 'Pro 5', 'Standard', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{}'),
('ticwatch-e3', 'smartwatch', 'TicWatch', 'E3', 'Standard', 2021, 120.00, '/placeholder.svg?height=300&width=300', '{}'),

-- Amazfit Watches (3 devices)
('amazfit-t-rex-ultra', 'smartwatch', 'Amazfit', 'T-Rex Ultra', 'Standard', 2023, 280.00, '/placeholder.svg?height=300&width=300', '{}'),
('amazfit-gtr-4', 'smartwatch', 'Amazfit', 'GTR 4', 'Standard', 2022, 150.00, '/placeholder.svg?height=300&width=300', '{}'),
('amazfit-bip-5', 'smartwatch', 'Amazfit', 'Bip 5', 'Standard', 2023, 80.00, '/placeholder.svg?height=300&width=300', '{}'),

-- CAMERAS (3 total)
('sony-a7iv', 'camera', 'Sony', 'Alpha 7 IV', 'Body', 2021, 1650.00, '/sony-alpha-7-iv-camera.jpg', '{}'),
('canon-eos-r6-ii', 'camera', 'Canon', 'EOS R6 Mark II', 'Body', 2022, 1580.00, '/canon-eos-r6-mark-ii-camera.jpg', '{}'),
('nikon-z6-iii', 'camera', 'Nikon', 'Z6 III', 'Body', 2024, 1820.00, '/nikon-z6-iii-camera.jpg', '{}'),

-- CONSOLES (3 total)
('ps5-disc', 'console', 'Sony', 'PlayStation 5', 'Disc Edition', 2020, 320.00, '/playstation-5-console.png', '{}'),
('xbox-series-x', 'console', 'Microsoft', 'Xbox Series X', '1TB', 2020, 310.00, '/xbox-series-x-console.png', '{}'),
('nintendo-switch-oled', 'console', 'Nintendo', 'Switch OLED', 'Standard', 2021, 220.00, '/nintendo-switch-oled.png', '{}')

ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  variant = EXCLUDED.variant,
  release_year = EXCLUDED.release_year,
  base_price = EXCLUDED.base_price,
  image_url = EXCLUDED.image_url,
  specifications = EXCLUDED.specifications,
  updated_at = NOW();
