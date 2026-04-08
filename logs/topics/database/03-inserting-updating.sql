CREATE TABLE canteen_menu(
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(50) UNIQUE,
    category VARCHAR(50),
    price INT,
    is_available BOOLEAN DEFAULT TRUE
)

-- INSERT INTO canteen_menu
-- (<col_name>)
-- VALUES
-- ()

INSERT INTO canteen_menu
(item_name, category, price)
VALUES
    -- Beverages
    ('Masala Chai', 'Beverages', 10),
    ('Oreo Shake', 'Beverages', 40),
    ('Coffee', 'Beverages', 20),
    ('Cold Brew', 'Beverages', 35),
    ('Lassi', 'Beverages', 25),

    -- Snacks
    ('Veg Sandwich', 'Snacks', 30),
    ('Paneer Roll', 'Snacks', 45),
    ('French Fries', 'Snacks', 50),
    ('Samosa', 'Snacks', 15),
    ('Spring Roll', 'Snacks', 40),

    -- Meals
    ('Veg Thali', 'Meals', 120),
    ('Chicken Biryani', 'Meals', 150),
    ('Paneer Butter Masala', 'Meals', 130),
    ('Dal Tadka', 'Meals', 90),
    ('Fried Rice', 'Meals', 100),

    -- Desserts
    ('Gulab Jamun', 'Desserts', 25),
    ('Ice Cream Sundae', 'Desserts', 60),
    ('Brownie', 'Desserts', 70),
    ('Rasgulla', 'Desserts', 20),
    ('Cheesecake', 'Desserts', 80);


-- ================ UPDATE ITEMS ================ 
UPDATE canteen_menu
SET price = 50
WHERE item_name = 'Fried Rice'

UPDATE canteen_menu 
SET price = price - 5
WHERE category = 'Beverages'

UPDATE canteen_menu
SET is_available = FALSE, price = 10
WHERE item_name = 'Samosa'



-- ================ DELETE ITEMS(Never use without WHERE ================ 

DELETE FROM canteen_menu
WHERE item_name = 'Dal Tadka'

-- use DRY RUN in SQL before DELETE
SELECT * FROM canteen_menu
WHERE item_name = 'Dal Tadka'

-- TRUNCATE - Removes all entries instantly, resetting identity values.


SELECT count(*) from canteen_menu