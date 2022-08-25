import { useState, useEffect } from "react";

function App() {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSubmit = () => {
    if (!search) fetchAllPeople();
    setPeople(people.filter((person) => person.first_name === search));
  };

  const handleSearch = ({ target }) => {
    if (!target.value) fetchAllPeople();
    setSearch(target.value);
  };

  useEffect(fetchAllPeople, []);

  return (
    <div className="App">
      <input value={search} onChange={handleSearch} />
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
