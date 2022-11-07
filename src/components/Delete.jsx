export function Delete({flag, setFlag}) {
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

    return (
        <input
          type="button"
          value="Delete All"
          onClick={fetchDeleteAll}
          className="button mb-8"
        />
    )
    
}