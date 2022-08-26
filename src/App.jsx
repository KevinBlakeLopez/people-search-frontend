import { useState, useEffect } from "react";

function App() {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ first_name: "" });

  const fetchAllPeople = () => {
    (async () => {
      try {
        const response = await fetch("http://localhost:4000/people");
        const persons = await response.json();
        setPeople(persons);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  useEffect(fetchAllPeople, []);

  // for searchbox
  const handleSubmit = () => {
    if (!search) fetchAllPeople();
    setPeople(people.filter((person) => person.first_name === search));
  };

  const handleSearch = ({ target }) => {
    if (!target.value) fetchAllPeople();
    setSearch(target.value);
  };

  // for adding person to database
  const handleAddPerson = ({ target }) => {
    setFormData({ first_name: target.value });
  };

  const fetchAddPerson = async () => {
    try {
      const response = await fetch("http://localhost:4000/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newPerson = await response.json();
      setPeople(...people, newPerson.first_name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="first_name">Add person</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          onChange={handleAddPerson}
          value={formData.first_name}
        />
        <input type="submit" value="Submit" onClick={fetchAddPerson} />
      </form>
      <label htmlFor="search">Search people</label>
      <input
        type="text"
        id="search"
        name="search"
        value={search}
        onChange={handleSearch}
      />
      <input type="button" value="Search" onClick={handleSubmit} />
      <ol>
        {people.map((person) => (
          <li>{person.first_name}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
