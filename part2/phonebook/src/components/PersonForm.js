import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <h2>Add a new contact</h2>
      <form onSubmit={props.addPerson}>
        <div>
          Name:{" "}
          <input onChange={props.handleNameChange} value={props.newName} />
        </div>
        <div>
          Number:{" "}
          <input onChange={props.handleNumberChange} value={props.newNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
