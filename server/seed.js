import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

//create main table
// db.query(`CREATE TABLE IF NOT EXISTS dogs (
//     dog_id SERIAL PRIMARY KEY,
//     name VARCHAR(255),
//     imgURL TEXT,
//     age INT,
//     location VARCHAR(255),
//     category_id INT
// )`);

// // //seed main table with initial data
// db.query(`INSERT INTO dogs (name, imgURL, age, location, category_id)
// VALUES
// ('Bear', 'https://images.unsplash.com/photo-1562221440-aba53beefed2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 8, 'Leeds', 1),
// ('Pepper', 'https://images.unsplash.com/photo-1565708097881-bbf4ecf47cc1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 0, 'Cambridge', 5)`);

// //create categories table
db.query(`CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    breed VARCHAR(255) NOT NULL,
    dogIdConnectedTo INT
)`);

// // //seed categories table with initial data
db.query(`INSERT INTO categories (breed, dogIdConnectedTo)
VALUES
('Akita'),
('Mixed Breed'),
('Labrador'),
('Boxer'),
('Rottweiler'),
('Other')`);
