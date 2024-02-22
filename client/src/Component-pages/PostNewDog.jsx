import { useState } from "react";

export default function PostNewDog() {
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    location: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log("The form values are:", formValues);
  }

  function handleInputChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formValues.age}
          onChange={handleInputChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formValues.location}
          onChange={handleInputChange}
        />
        <label htmlFor="breed">Breed:</label>
        <select name="breed" id="breed">
          <option value="category">Select an option</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
