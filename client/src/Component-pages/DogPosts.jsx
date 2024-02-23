import { useEffect, useState } from "react";
import "./dogPosts.css";

export default function DogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchDogs() {
      const response = await fetch("http://localhost:4444/dogsAndBreeds");
      const newData = await response.json();
      console.log(newData);
      setPosts(newData);
    }

    fetchDogs();
  }, []);

  return (
    <div className="dog-post-container">
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
  );
}
