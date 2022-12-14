import { useState, forwardRef, useImperativeHandle } from "react";

export const InputText = forwardRef(({ person, handleSubmit }, _ref) => {
  const [firstName, setFirstName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setFirstName(() => e.target.value);
  };

  // useImperativeHandle(_ref, () => ({
  //   getInputFirstName: () => {
  //     return firstName;
  //   }
  // }));

  if (person.updated) {
    return (
      <input
        className="bg-stone-800 border-2 border-zinc-300 mr-4 p-2"
        value={firstName}
        onChange={handleChange}
      />
    );
  } else {
    return <p>{firstName ? firstName : person.first_name}</p>;
  }
});
