import { useState, useEffect } from "react";
import { PeopleList } from "./components/PeopleList";
import { AddPerson } from "./components/AddPerson";
import { Search } from "./components/Search";
import { compareName } from "./util.js";

function App() {
  const [people, setPeople] = useState([]);

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
        <Search
          people={people}
          setPeople={setPeople}
          fetchAllPeople={fetchAllPeople}
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
        <PeopleList
          people={people}
          setPeople={setPeople}
          deletes={fetchDeletePerson}
          fetchAllPeople={fetchAllPeople}
          flag={flag}
          setFlag={setFlag}
        />
      </ol>
    </div>
  );
}

export default App;
