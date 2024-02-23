import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

//root route to confirm server is working (it is :D)
app.get("/", (req, res) => {
  res.send("Congrats - you're on the home page!");
});

//display the data within the dogs table.
app.get("/dogs", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM dogs`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post data to the dogs table
app.post("/dogs", async (req, res) => {
  try {
    const { name, imgURL, age, location } = req.body;

    const newPost = await db.query(
      `INSERT INTO dogs (name, imgURL, age, location) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, imgURL, age, location]
    );
    res.json(newPost.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//display the data within the categories table.
app.get("/categories", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM categories`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post data to the categories table
app.post("/categories", async (req, res) => {
  try {
    const { breed } = req.body;

    const newBreed = await db.query(
      `INSERT INTO categories (breed) VALUES ($1) RETURNING *`,
      [breed]
    );
    res.json(newBreed.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//display the dog alongside the breed category
app.get("/dogsAndBreeds", async (req, res) => {
  try {
    const combinedInfo = await db.query(
      `SELECT dogs.name, dogs.imgURL, dogs.age, dogs.location, dogs.category_id, categories.id, categories.breed
            FROM dogs
            JOIN categories ON dogs.category_id = categories.id`
    );
    res.json(combinedInfo.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
