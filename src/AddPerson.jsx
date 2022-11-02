import {useState} from "react";

export const AddPerson = ({flag, setFlag}) => {
    // review this state.  you can add last_name, email, phone_number, role
  const [formData, setFormData] = useState({ first_name: "" });

  // for adding person
  const handleInput = (event) => {
    setFormData({ first_name: event.target.value });
  };

  const handleCreatePerson = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const newPerson = await response.json();
      // setPeople([...people, newPerson[0]]);
      setFlag(!flag);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="mb-4">
          {/* <label htmlFor="first_name" className="mr-4">Add person</label> */}
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Add person"
            onChange={handleInput}
            value={formData.first_name}
            className="bg-black border-2 border-zinc-300 mr-4 mb-8 p-2"
          />
          <input
            type="submit"
            value="Submit"
            onClick={handleCreatePerson}
            className="button mr-4"
          />
    </form>
  )
}