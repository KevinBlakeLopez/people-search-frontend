import { useState, useRef } from "react";
import { InputText } from "./InputText";

export const PeopleList = ({
  people,
  setPeople,
  flag,
  setFlag
}) => {
  const [update, setUpdate] = useState("");
  // const inputTextRef = useRef();

  // const getInputTextState = () => {
  //   const firstName = inputTextRef.current.getInputFirstName();
  //   console.log(`the first name is ${firstName}`);
  //   return firstName;
  // }

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

  const handleUpdate = (person) => {
    setPeople(
      people.map((individual) => {
        if (individual.id === person.id && !person.updated) {
          individual.updated = true;
          return individual;
        } else {
          return individual;
        }
      })
    );
  };

  const handleSubmit = (person) => {
    // person.first_name = getInputTextState()
    person.first_name = update;
    fetchUpdatePerson(person);
    setFlag(!flag);
  };

  const updateOrSubmit = ({ target }, person) => {
    //not getting person here?
    target.value === "Update" ? handleUpdate(person) : handleSubmit(person);
  };

  const handleChange = (e, person) => {
    e.preventDefault();
    person.updating = true;
    if(person.updating) setUpdate(() => e.target.value);
  };

  return people.map((person) => (
    <li key={person.id} className="mb-4 flex">
      <div className="w-1/2 m-auto">
        {person.updated ? (
          <input
            className="bg-stone-800 border-2 border-zinc-300 mr-4 p-2"
            value={update}
            onChange={handleChange}
          />
        ) : (
          <p>{update ? update : person.first_name}</p>
        )}

        {/* <InputText person={person} handleSubmit={handleSubmit} inputTextRef={inputTextRef}/> */}
      </div>
      <div className="w-1/2">
        <input
          type="button"
          value={!person.updated ? "Update" : "Submit"}
          onClick={(e) => updateOrSubmit(e, person)}
          className="m-4 button"
        />
        <input
          type="button"
          value="Delete"
          onClick={() => fetchDeletePerson(person)}
          className="m-4 button"
        />
      </div>
    </li>
  ));
};
