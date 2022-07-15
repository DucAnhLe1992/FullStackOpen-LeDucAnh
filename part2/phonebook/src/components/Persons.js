import React from "react";

const Persons = ({ persons, filter, deleteAPerson, setPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(
            (person) =>
              person.name.toLowerCase().includes(filter.toLowerCase()) ||
              filter === ""
          )
          .map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
              <button
                onClick={() => {
                  const result = window.confirm(`Delete ${person.name} ?`);
                  if (result) {
                    deleteAPerson(person.id);
                    setPersons(
                      persons.filter((element) => element.id !== person.id)
                    );
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Persons;
