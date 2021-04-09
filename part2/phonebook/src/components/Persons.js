import React from "react";

const Persons = ({ persons, filter }) => {
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
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Persons;
