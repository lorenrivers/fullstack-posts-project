import DogCard from "./Components/DogCard";
import { useEffect, useState } from "react";

export default function DogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch("http://localhost:4444/dogs");
        const newData = await response.json();
        console.log(newData);
        setPosts(newData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDogs();
  }, []);

  return (
    <div className="dog-container">
      {posts.map((post) => (
        <DogCard
          key={post.id}
          name={post.name}
          age={post.age}
          location={post.location}
        />
      ))}
    </div>
  );
}
