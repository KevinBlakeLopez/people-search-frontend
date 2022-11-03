import { useState } from "react";

export const PeopleList = ({ people, setPeople, update, deletes }) => {
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
    update(person);
  }

  const updateOrSubmit = ({target}) => {
    //not getting the right value for handleSubmit.  need to get the firstName state from Input Text...
    target.value === "Update" ? () => handleUpdate(person) : handleSubmit(person);
  }

  const InputText = ({ person }) => {
    const [firstName, setFirstName] = useState("");

    const handleChange = ({ target }) => {
      setFirstName(() => target.value);
    };

    if (person.updated) {
      return (
        <input
          className="bg-stone-800 border-2 border-zinc-300 mr-4 p-2"
          value={firstName}
          onChange={handleChange}
        />
      );
    } else {
      return <p>{person.first_name}</p>;
    }
  };

  return people.map((person) => (
    <li key={person.id} className="mb-4 flex">
      <div className="w-1/2 m-auto">
        <InputText person={person} />
      </div>
      <div className="w-1/2">
        <input
          type="button"
          value={!person.updated ? "Update" : "Submit"}
          onClick={updateOrSubmit}
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
