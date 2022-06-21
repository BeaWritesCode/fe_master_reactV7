import { useState } from "react";

const SearchParams = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="search-params">
      {/*
      Don't really do forms this way with change events on each field - this is just for demonstration.
      Instead use a submit event on the form
      <form onSubmit={DO_STUFF_IN_HERE}>
      and remove the value & onChange from the input below
      */}
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
