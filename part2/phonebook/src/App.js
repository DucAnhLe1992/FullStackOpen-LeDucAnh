import React, { useState, useEffect } from "react";
import "./App.css";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personServices from "./services/personServices";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAllPersons().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const doesExists = persons.find((person) => person.name === newName);

    if (doesExists === undefined) {
      const newPerson = { name: newName, number: newNumber };
      personServices.createNewPerson(newPerson).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      const needReplace = window.confirm(
        `${newName} is already added to phonebook, replace the number with the new one?`
      );
      if (needReplace) {
        const changedPerson = { ...doesExists, number: newNumber };
        personServices
          .changePersonNumber(doesExists.id, changedPerson)
          .then((res) => {
            setPersons(persons.map(person => person.id !== doesExists.id ? person : res.data));
          });
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />

      <Persons
        persons={persons}
        filter={filter}
        deleteAPerson={personServices.deleteAPerson}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
