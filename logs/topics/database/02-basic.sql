-- CREATE TABLE ipl(
--     player_id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     team VARCHAR(50),
--     role VARCHAR(50),
--     runs_scored INT CHECK (runs_scored > 0),
--     wickets_taken INT CHECK (wickets_taken > 0),
--     auction_price_crores INT -- DECIMAL(5,2)
-- );

-- ================  ALTERING TABLE  ================ 

-- ALTER TABLE ipl
-- ADD COLUMN nickname VARCHAR(50)

-- INSERT INTO ipl (name, team, role, runs_scored, wickets_taken, auction_price_crores, nickname)
-- VALUES ('MS DHONI', 'CSK', 'WK-Batsman', 9999, 9999, 99999, 'Mahi')

-- INSERT INTO ipl (name, team, role, runs_scored, wickets_taken, auction_price_crores, nickname)
-- VALUES 
-- ('VIRAT KOHLI', 'RCB', 'Batsman', 7263, 4, 15, 'King Kohli'),
-- ('ROHIT SHARMA', 'MI', 'Batsman', 6211, 15, 14, 'Hitman'),
-- ('JASPRIT BUMRAH', 'MI', 'Bowler', 120, 145, 11, 'Boom Boom'),
-- ('RAVINDRA JADEJA', 'CSK', 'All-Rounder', 2692, 152, 9, 'Sir Jadeja'),
-- ('KL RAHUL', 'LSG', 'WK-Batsman', 4163, 1, 17, 'KLassy Rahul'),
-- ('SHIKHAR DHAWAN', 'PBKS', 'Batsman', 6617, 4, 8, 'Gabbar'),
-- ('ANDRE RUSSELL', 'KKR', 'All-Rounder', 2262, 96, 12, 'Dre Russ'),
-- ('SUNIL NARINE', 'KKR', 'Bowler', 1031, 163, 6, 'Mystery Spinner'),
-- ('BEN STOKES', 'CSK', 'All-Rounder', 920, 28, 16, 'Stokesy');

-- SELECT name, nickname, team FROM ipl

-- ================  FILTERING  ================ 

-- SELECT name, nickname, team FROM ipl WHERE team = 'CSK'
-- SELECT name, nickname, auction_price_crores FROM ipl WHERE auction_price_crores > 10

-- <> - Not Equal

-- ================  LOGICAL OPERATORS (AND, OR)  ================ 
-- SELECT * FROM ipl WHERE role = 'All-Rounder' AND runs_scored > 1000

-- SELECT * FROM ipl WHERE team = 'CSK' OR team = 'RCB'


-- ================  Pattern Matching ================ 
-- (LIKE) - CaseSenstive && (ILIKE) - Case Insensitive
-- % => any number or character age piche
-- - => single number or character age piche

-- SELECT * FROM ipl WHERE name ILIKE '%a%'

-- SELECT count(*) FROM ipl WHERE team in ('MI', 'CSK', 'RCB', 'KKR')

-- SELECT  * FROM ipl WHERE auction_price_crores BETWEEN 10 AND 15


-- ================  SORTING(ORDER BY col ASC/DESC)  ================ 


-- SELECT * FROM ipl ORDER BY auction_price_crores DESC
-- SELECT name, nickname, team, auction_price_crores FROM ipl ORDER BY team ASC, auction_price_crores DESC

-- ================  PAGINATION(LIMIT, OFFSET - number doge utna skip)  ================ 
-- like masteji

-- SELECT * FROM ipl ORDER BY auction_price_crores DESC LIMIT 3; -- give three entry unless you give it OFFSET, default 0

-- SELECT * FROM ipl ORDER BY auction_price_crores DESC LIMIT 3 OFFSET 3; -- OFFSET = (page-1) * limit

-- Page 1: (1-1) * 15 = 0 -- offset
-- Page 2: (2-1) * 15 = 15 -- offset
-- Page 3: (3-1) * 15 = 30 -- offset


-- ================  Modifying Data in Runtime  ================ 
-- GOOD Practice to give new name to transformed data


-- SELECT name, nickname, auction_price_crores, (auction_price_crores * 100) as price_in_lakhs FROM ipl

-- SELECT  name, nickname,auction_price_crores as old_price, (auction_price_crores + 2) as new_price FROM ipl 


-- ================  How you can DISTINCT Role  ================ 

SELECT DISTINCT role from ipl

-- ================  DQL - Data Query Language  ================ 
