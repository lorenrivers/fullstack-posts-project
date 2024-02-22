//fetches all the dogs in the database in the server and returns that (hopefully).
// export default function AvailableDogs() {
const fetchDogs = async () => {
  const dogs = await fetch("http://localhost:4444/dogsAndBreeds");
  let results = await dogs.json();
  return results;
};

//display all dogs in the database (hopefully)
const displayDogs = async () => {
  let dogs = await fetchDogs();
};
