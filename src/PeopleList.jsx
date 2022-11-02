export const PeopleList = ({ people, update, deletes }) => {
    return people.map((person) => (
      <li key={person.id} className="mb-4 flex">
        <div className="w-1/2 m-auto">
        {person.first_name}
        </div>
        <div className="w-1/2">
        <input
          type="button"
          value="Update"
          onClick={() => update(person)}
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