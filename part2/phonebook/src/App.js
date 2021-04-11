import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personServices from "./services/personServices";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notif, setNotif] = useState({ message: null, type: null });

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
        setNotification(`Added ${newName}`, "successStyle");
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
            setPersons(
              persons.map((person) =>
                person.id !== doesExists.id ? person : res.data
              )
            );
            setNotification(
              `Number of ${changedPerson.name} changed successfully`,
              "successStyle"
            );
          })
          .catch((error) => {
            setNotification(
              `Person ${changedPerson.name} not found!`,
              "errorStyle"
            );
            setPersons(persons.filter((person) => person.id !== doesExists.id));
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

  const setNotification = (message, type) => {
    setNotif({ message: message, type: type });
    setTimeout(() => {
      setNotif({ message: null, type: null });
    }, 5000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notif.message} type={notif.type} />

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
