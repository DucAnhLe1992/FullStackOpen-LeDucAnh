import { useMutation } from "@apollo/client/react";
import { useState, useEffect } from "react";

import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const ChangeBirthyear = ({ show, setError }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(0);

  const [editBirthyear, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editBirthyear({ variables: { name, year } });

    setName("");
    setYear(0);
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Author not found");
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>change birthyear of author</h2>

      <form onSubmit={submit}>
        <div>
          Name:{" "}
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          Birthyear:{" "}
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
          />
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default ChangeBirthyear;
