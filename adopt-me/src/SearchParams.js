import { useEffect, useState } from "react";
import useBreedList from "./useBreedList";
import Pet from "./Pet";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState(""); // default value is empty string
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]); // default value is empty array
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);
  // The array after the function is for dependencies, so the function is called each time the dependency changes
  // i.e.
  //    }, [breed]);
  // would mean a call is made to the API requesting a list of pets each time 'breed' changes.
  // If the array is missed then every change will trigger a call to the API
  // i.e.
  //    });
  // is a very bad idea!
  // Leave the array empty to only make the call once, after the UI is rendered
  // i.e.
  //    }, []);
  // but eslint will give a warning in this case because it assumes requestPets is from a hook
  // - ignore it for the purposes of this example

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      {/*
      Don't really do forms this way with change events on each field - this is just for demonstration.
      Instead use a submit event on the form
      <form onSubmit={DO_STUFF_IN_HERE}>
      and remove the value & onChange from the input below
      */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => {
              return (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              );
            })}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;
