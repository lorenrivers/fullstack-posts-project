import { useState, useEffect } from "react";

export default function PostNewDog({ posts, setPosts }) {
  const [form, setForm] = useState({});
  const [breed, setBreed] = useState([]);

  //fetch category data from database
    async function fetchBreeds() {
      let data = await fetch("http://localhost:4444/categories");
      let newData = await data.json();
      setBreed(newData);
    }
    
  // //post user input (category) to database
  // useEffect(() => {
  //   async function postCategory() {
  //     await fetch("http://localhost:4444/categories", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     });
  // //   }

  //   postCategory();
  // }, []);

  async function handleSubmit(event) {
    event.preventDefault();

        let response = await fetch("http://localhost:4444/dogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          //need to call fetch dogs here to update
        } else {
          console.error("Failed to add dog", response.status);
        }
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
        <select name="breed" id="breed">
          {breed.map((breed) => (
            <option key={breed.id} value="category">
              {breed.breed}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
