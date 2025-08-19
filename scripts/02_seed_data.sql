-- Insert categories
INSERT INTO categories (name, description, image_url) VALUES
('Coffee Beans', 'Premium coffee beans from around the world', '/placeholder.svg?height=200&width=200'),
('Hot Drinks', 'Freshly brewed hot beverages', '/placeholder.svg?height=200&width=200'),
('Cold Drinks', 'Refreshing iced and cold beverages', '/placeholder.svg?height=200&width=200'),
('Pastries', 'Fresh baked goods and pastries', '/placeholder.svg?height=200&width=200'),
('Merchandise', 'Coffee shop branded items and accessories', '/placeholder.svg?height=200&width=200')
ON CONFLICT DO NOTHING;

-- Get category IDs for reference
WITH category_ids AS (
  SELECT id, name FROM categories
)
-- Insert products
INSERT INTO products (name, description, price, image_url, category_id, featured, rating, review_count) 
SELECT 
  p.name, p.description, p.price, p.image_url, c.id, p.featured, p.rating, p.review_count
FROM (VALUES
  -- Coffee Beans
  ('Ethiopian Yirgacheffe', 'Light roast with floral and citrus notes', 24.99, '/placeholder.svg?height=300&width=300', 'Coffee Beans', true, 4.8, 127),
  ('Colombian Supremo', 'Medium roast with chocolate and caramel flavors', 22.99, '/placeholder.svg?height=300&width=300', 'Coffee Beans', true, 4.7, 89),
  ('Guatemala Antigua', 'Full-bodied with smoky and spicy notes', 26.99, '/placeholder.svg?height=300&width=300', 'Coffee Beans', false, 4.6, 64),
  
  -- Hot Drinks
  ('Espresso', 'Rich and bold single shot', 3.50, '/placeholder.svg?height=300&width=300', 'Hot Drinks', true, 4.9, 203),
  ('Cappuccino', 'Espresso with steamed milk and foam', 4.75, '/placeholder.svg?height=300&width=300', 'Hot Drinks', true, 4.8, 156),
  ('Latte', 'Smooth espresso with steamed milk', 5.25, '/placeholder.svg?height=300&width=300', 'Hot Drinks', false, 4.7, 134),
  ('Americano', 'Espresso with hot water', 4.25, '/placeholder.svg?height=300&width=300', 'Hot Drinks', false, 4.5, 98),
  
  -- Cold Drinks
  ('Iced Coffee', 'Cold brew over ice', 4.50, '/placeholder.svg?height=300&width=300', 'Cold Drinks', true, 4.6, 112),
  ('Cold Brew', 'Smooth cold-steeped coffee', 5.00, '/placeholder.svg?height=300&width=300', 'Cold Drinks', true, 4.8, 87),
  ('Iced Latte', 'Espresso with cold milk over ice', 5.75, '/placeholder.svg?height=300&width=300', 'Cold Drinks', false, 4.7, 76),
  
  -- Pastries
  ('Croissant', 'Buttery, flaky French pastry', 3.25, '/placeholder.svg?height=300&width=300', 'Pastries', true, 4.5, 45),
  ('Blueberry Muffin', 'Fresh baked with wild blueberries', 3.75, '/placeholder.svg?height=300&width=300', 'Pastries', false, 4.4, 32),
  ('Chocolate Chip Cookie', 'Warm, gooey chocolate chip cookie', 2.50, '/placeholder.svg?height=300&width=300', 'Pastries', false, 4.6, 28),
  
  -- Merchandise
  ('Coffee Mug', 'Ceramic mug with shop logo', 12.99, '/placeholder.svg?height=300&width=300', 'Merchandise', false, 4.3, 19),
  ('Travel Tumbler', 'Insulated stainless steel tumbler', 19.99, '/placeholder.svg?height=300&width=300', 'Merchandise', true, 4.7, 41)
) AS p(name, description, price, image_url, category_name, featured, rating, review_count)
JOIN category_ids c ON c.name = p.category_name
ON CONFLICT DO NOTHING;

-- Insert product variants for drinks
WITH product_ids AS (
  SELECT id, name FROM products WHERE name IN ('Cappuccino', 'Latte', 'Americano', 'Iced Coffee', 'Cold Brew', 'Iced Latte')
)
INSERT INTO product_variants (product_id, name, price_modifier)
SELECT p.id, v.name, v.price_modifier
FROM (VALUES
  ('Small', 0.00),
  ('Medium', 0.75),
  ('Large', 1.50)
) AS v(name, price_modifier)
CROSS JOIN product_ids p
ON CONFLICT DO NOTHING;
