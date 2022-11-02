export const AddPerson = ({handleInput, handleCreatePerson}) => {
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
}