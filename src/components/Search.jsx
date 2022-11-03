import { useState } from "react";

export const Search = ({people, setPeople}) => {
    const [search, setSearch] = useState("");
    // for searchbox.
  // if search state is falsy, then just fetchAllPeople - this acts as a guard clause.
  // but if search is not falsy, setPeople will filter the people array state based on the person's first name
  const handleSubmit = () => {
    if (!search) fetchAllPeople();
    setPeople(people.filter((person) => person.first_name === search));
  };

  const handleSearch = ({ target }) => {
    // keep the conditional here because you only want allPeople to appear once search field is empty
    if (!target.value) fetchAllPeople();
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
          onChange={handleSearch}
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