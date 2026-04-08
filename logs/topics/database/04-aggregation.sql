CREATE TABLE smart_watches_sales(
    sale_id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(100),
    city VARCHAR(50),
    units_sold INT,
    price_per_unit DECIMAL(10, 2),
    sale_date DATE
)


INSERT INTO smart_watches_sales (brand, model, city, units_sold, price_per_unit, sale_date)
VALUES
('Apple', 'Watch Series 9', 'Delhi', 25, 399.99, '2025-01-15'),
('Samsung', 'Galaxy Watch 6', 'Mumbai', 18, 349.50, '2025-01-20'),
('Garmin', 'Forerunner 265', 'Bangalore', 12, 299.00, '2025-02-05'),
('Fitbit', 'Versa 4', 'Hyderabad', 20, 199.99, '2025-02-10'),
('Noise', 'ColorFit Ultra 3', 'Lucknow', 30, 99.99, '2025-02-18'),
('Fossil', 'Gen 6', 'Chennai', 10, 249.00, '2025-03-01'),
('Amazfit', 'GTR 4', 'Pune', 15, 179.99, '2025-03-08'),
('Apple', 'Watch SE', 'Kolkata', 22, 279.99, '2025-03-15'),
('Samsung', 'Galaxy Watch 5 Pro', 'Jaipur', 8, 449.00, '2025-03-20'),
('Garmin', 'Venu Sq 2', 'Delhi', 14, 229.50, '2025-03-25');

INSERT INTO smart_watches_sales (brand, model, city, units_sold, price_per_unit, sale_date)
VALUES
('Boat', 'Wave Call Plus', 'Delhi', 28, 79.99, '2025-03-28'),
('Boat', 'Xtend Pro', 'Mumbai', 35, 89.50, '2025-04-02'),
('Boat', 'Storm Call', 'Hyderabad', 40, 69.99, '2025-04-05'),
('Boat', 'Lunar Connect Pro', 'Bangalore', 22, 99.00, '2025-04-10'),
('Boat', 'Wave Edge', 'Chennai', 18, 74.99, '2025-04-12');


-- ================ AGGREGATE(COUNT, SUM, AVG, MIN, MAX, GROUP BY) ================ 
SELECT COUNT(*) as total_rows FROM smart_watches_sales
SELECT SUM(units_sold * price_per_unit) as total_revenue FROM smart_watches_sales


SELECT AVG(price_per_unit) as average_price_per_unit FROM smart_watches_sales

SELECT MIN(price_per_unit) as cheapest FROM smart_watches_sales
SELECT MAX(price_per_unit) as costliest FROM smart_watches_sales



-- ===== GROUP BY | merging
-- you can use aggregate function but you are demanding a col not used by aggregate function then use group by clause

SELECT brand, SUM(units_sold) as total_unit_sold FROM smart_watches_sales GROUP BY brand

SELECT brand, min(price_per_unit) as min_price FROM smart_watches_sales GROUP BY brand

SELECT * FROM smart_watches_sales


-- ameer log kaha rehte
SELECT city, SUM(units_sold * price_per_unit) as city_revenue FROM smart_watches_sales GROUP BY city ORDER BY city_revenue DESC


SELECT city, brand, SUM(units_sold) as units FROM smart_watches_sales GROUP BY city, brand ORDER BY brand

-- ===== HAVING | where of GROUP BY
SELECT brand, SUM(units_sold) AS total_unit_sold
FROM canteen_menu
GROUP BY brand
HAVING SUM(units_sold) > 50;


-- EXECUTION ORDER
-- SELECT => FROM => WHERE => JOIN => GROUP BY => HAVING => ORDER BY => LIMIT

-- page? Page size? DB Engine