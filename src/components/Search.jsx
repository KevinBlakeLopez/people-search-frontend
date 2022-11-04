import { useState } from "react";

export const Search = ({people, setPeople, fetchAllPeople}) => {
    const [search, setSearch] = useState("");
    // for searchbox.
  // if search state is falsy, then just fetchAllPeople - this acts as a guard clause.
  // but if search is not falsy, setPeople will filter the people array state based on the person's first name
  const handleSubmit = () => {
    if (!search) fetchAllPeople();
    setPeople(people.filter((person) => person.first_name === search));
  };

  const handleInput = ({ target }) => {
    // keep the conditional here because you only want allPeople to appear once search field is empty
    setSearch(target.value);
  };

    return (
        <div>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          value={search}
          onChange={handleInput}
          className="bg-black border-2 border-zinc-300 mb-8 mr-4 p-2"
        />
        <input
          type="button"
          value="Search"
          onClick={handleSubmit}
          className="button mr-4"
        />
        </div>
    )}