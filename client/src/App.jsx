import { Route, Routes, Link } from "react-router-dom";
import Home from "./Component-pages/Home";
// import DogPosts from "./Component-pages/DogPosts";
// import PostNewDog from "./Component-pages/PostNewDog";
import "./App.css";
import { useEffect, useState } from "react";
import "./Component-pages/dogPosts.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchDogs();
  }, []);

  async function fetchDogs() {
    const data = await fetch("http://localhost:4444/dogsAndBreeds");
    const newData = await data.json();
    console.log(newData);
    setPosts(newData);
  }

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
        <Link to="/">Home</Link>
        <Link to="/dogs">Posts</Link>
        <Link to="/upload">Post a Dog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dogs"
          element={posts.map((post) => (
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
        />
        <Route
          path="/upload"
          element={
            <div>
              <h2>Upload Your Dog!</h2>
              <form onSubmit={handleSubmit}>
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
                {/* <select name="breed" id="breed">
                  {breed.map((breed) => (
                    <option key={breed.id} value="category">
                      {breed.breed}
                    </option>
                  ))}
                </select> */}
                <button type="submit">Submit</button>
              </form>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
