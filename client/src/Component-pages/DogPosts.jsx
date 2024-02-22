import { useEffect, useState } from "react";

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
    <div className="dog-container">
      {posts
        ? posts.map((post) => (
            <>
              <p>{post.name}</p>
              <p>{post.age}</p>
              <p>{post.location}</p>
              <p>{post.breed}</p>
            </>
          ))
        : null}
    </div>
  );
}
