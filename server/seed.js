import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

//create main table
db.query(`CREATE TABLE IF NOT EXISTS dogs (
    dog_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    location VARCHAR(255),
    category_id INT
)`);

// //seed main table with initial data
db.query(`INSERT INTO dogs (name, age, location, category_id)
VALUES
('Hooch', 8, 'Royston, Hertfordshire', 1)
`);

// //create categories table
// db.query(`CREATE TABLE IF NOT EXISTS categories (
//     id SERIAL PRIMARY KEY,
//     breed VARCHAR(255) NOT NULL
// )`);

// // //seed categories table with initial data
// db.query(`INSERT INTO categories (breed)
// VALUES
// ('Akita'),
// ('Mixed Breed'),
// ('Labrador')`);
