import DogCard from "./Components/DogCard";
import { useEffect, useState } from "react";

export default function DogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadDogs = async () => {
      const response = await fetch("http://localhost:4444/dogsAndBreeds");
      setPosts(response.data);
    };

    loadDogs();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <div className="dog-container">
        {posts.map((post) => (
          <DogCard
            key={post.id}
            name={post.name}
            age={post.age}
            location={post.location}
            breed={post.breed}
          />
        ))}
      </div>
    </div>
  );
}
