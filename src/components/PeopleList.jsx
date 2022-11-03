import { useState } from "react";
import { InputText } from "./InputText";

export const PeopleList = ({ people, setPeople, update, deletes }) => {
  //lifted the state up from InputText.
  const [firstName, setFirstName] = useState("");

  const handleUpdate = (person) => {
    setPeople(
      people.map((individual) => {
        if (individual.id === person.id) {
          individual.updated = true;
          return individual;
        } else {
          individual.updated = false;
          return individual;
        }
      })
    );
  };

  const handleSubmit = person => {
    person.first_name = firstName;
    update(person);
  }

  const updateOrSubmit = ({target}) => {
    //not getting person here?
    target.value === "Update" ? handleUpdate(person) : handleSubmit(person);
  }

  

  return people.map((person) => (
    <li key={person.id} className="mb-4 flex">
      <div className="w-1/2 m-auto">
        <InputText person={person} firstName={firstName} setFirstName={setFirstName} />
      </div>
      <div className="w-1/2">
        <input
          type="button"
          value={!person.updated ? "Update" : "Submit"}
          onClick={() => handleUpdate(person)}
          className="m-4 button"
        />
        <input
          type="button"
          value="Delete"
          onClick={() => deletes(person)}
          className="m-4 button"
        />
      </div>
    </li>
  ));
};
