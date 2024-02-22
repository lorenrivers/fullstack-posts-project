import { Route, Routes, Link } from "react-router-dom";
import Home from "./Component-pages/Home";
import DogPosts from "./Component-pages/DogPosts";
import PostNewDog from "./Component-pages/PostNewDog";
import "./App.css";

export default function App() {
  return (
    <div>
      <h1>Dogs 🐾</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dogs">Posts</Link>
        <Link to="/upload">Post a Dog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<DogPosts />} />
        <Route path="/upload" element={<PostNewDog />} />
      </Routes>
    </div>
  );
}
