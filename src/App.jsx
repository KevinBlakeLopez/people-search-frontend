import { useState, useEffect } from "react";
import { PeopleList } from "./PeopleList";
import { AddPerson } from "./AddPerson";
import { compareName } from "./util.js";

function App() {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  
  // review this state.  you can add, last_name, email, phone_number, role
  // const [activeUpdate, setActiveUpdate] = useState({
  //   id: null,
  //   first_name: "",
  //   last_name: "",
  // });
  const [flag, setFlag] = useState();

  //immediately invoked function that retrieves all the people from the database using async await syntax.  the setPeople function takes in the response and uses .json() to convert it back into javascript.
  const fetchAllPeople = () => {
    (async () => {
      try {
        const response = await fetch("http://localhost:4000/people");
        const persons = await response.json();
        setPeople(persons.sort(compareName));
      } catch (err) {
        console.log(err);
      }
    })();
  };

  //useEffect hook with formData and activeUpdate so it runs whenever this state is updated.
  useEffect(fetchAllPeople, [flag]);

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

  const fetchUpdatePerson = async (person) => {
    try {
      const response = await fetch("http://localhost:4000/person", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: person.id, first_name: person.first_name }),
      });
      const updatedPerson = await response.json();
      setFlag(!flag);
    } catch (err) {
      console.log(err);
    }
  };
  
  const fetchDeleteAll = async () => {
    try {
      const response = await fetch("http://localhost:4000/people", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFlag(!flag);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDeletePerson = async (person) => {
    try {
      const response = await fetch("http://localhost:4000/person", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: person.id }),
      });
      setFlag(!flag);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App m-16 w-[600px] mx-auto">
      <section className="border-2 border-stone-500 p-8">
        {/* <label htmlFor="search" className="mr-4">Search people</label> */}
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
        <AddPerson flag={flag} setFlag={setFlag} />

        <input
          type="button"
          value="Delete All"
          onClick={fetchDeleteAll}
          className="button mb-8"
        />
      </section>

      <ol className="border-2 border-t-0 border-stone-500 p-8">
        <PeopleList people={people} setPeople={setPeople} update={fetchUpdatePerson} deletes={fetchDeletePerson}/>
      </ol>
    </div>
  );
}

export default App;
