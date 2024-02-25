import { Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
import { useEffect, useState } from "react";
import "./Components/dogPosts.css";
import "./Components/upload.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({});
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchDogs();
    fetchCategory();
  }, []);

  //display dog info from database with category
  async function fetchDogs() {
    let data = await fetch("http://localhost:4444/dogsAndBreeds");
    let newData = await data.json();
    console.log(newData);
    setPosts(newData);
  }

  //display category data from database for user to select in the dropdown
  async function fetchCategory() {
    let data = await fetch("http://localhost:4444/categories");
    let newData = await data.json();
    setCategory(newData);
  }

  //post user inputted info upon submit
  async function handleSubmit(event) {
    event.preventDefault();

    let response = await fetch("http://localhost:4444/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      fetchDogs();
    } else {
      console.error("Failed to add dog", response.status);
    }
  }

  //capture user input as it happens
  function handleInputChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <h1>Dog Posts 🐾</h1>
      <nav>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/dogs">
          Posts
        </Link>
        <Link className="nav-link" to="/upload">
          Post a Dog
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dogs"
          element={
            <div className="posts-container">
              {posts.map((post) => (
                <div key={post.id} className="dog-card">
                  <h2 className="dog-title">{post.name}</h2>
                  <img src={post.imgurl} />
                  <div className="further-info-text">
                    <p className="p-age">Age: {post.age}</p>
                    <p className="p-location">{post.location}</p>
                    <p className="p-category">{post.breed}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        />
        <Route
          path="/upload"
          element={
            <div>
              <h2>Upload Your Dog!</h2>
              <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                />
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={form.age}
                  onChange={handleInputChange}
                />
                <label htmlFor="imgURL">Image URL:</label>
                <input
                  type="text"
                  id="imgURL"
                  name="imgURL"
                  value={form.imgURL}
                  onChange={handleInputChange}
                />
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                />
                <label htmlFor="breed">Breed:</label>
                <select name="breed" id="breed">
                  {category.map((category) => (
                    <option
                      key={category.id}
                      value="category"
                      onChange={handleInputChange}
                    >
                      {category.breed}
                    </option>
                  ))}
                </select>
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </form>
            </div>
          }
        />
      </Routes>
      <footer>© Dogs Inc. 2024.</footer>
    </div>
  );
}
