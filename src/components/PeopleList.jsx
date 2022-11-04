import { InputText } from "./InputText";

export const PeopleList = ({ people, setPeople, fetchAllPeople, deletes, flag, setFlag }) => {
  //lifted the state up from InputText.

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

  const handleSubmit = person => {
    person.first_name
    fetchUpdatePerson(person);
    setFlag(!flag);
  }

  const updateOrSubmit = ({target}, person) => {
    //not getting person here?
    target.value === "Update" ? handleUpdate(person) : handleSubmit(person);
  }

  

  return people.map((person) => (
    <li key={person.id} className="mb-4 flex">
      <div className="w-1/2 m-auto">
        <InputText person={person} handleSubmit={handleSubmit}/>
      </div>
      <div className="w-1/2">
        <input
          type="button"
          value={!person.updated ? "Update" : "Submit"}
          onClick={e => updateOrSubmit(e, person)}
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
