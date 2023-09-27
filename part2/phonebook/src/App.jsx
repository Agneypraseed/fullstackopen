import { useEffect, useState } from "react";
import phonebookService from "./services/phonebook";

const PersonDetail = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons }) => {
  const isEmptyPhonebook = Object.keys(persons[0]).length === 0;

  return (
    <>
      {isEmptyPhonebook
        ? `Loading Phonebook from server!!!`
        : persons.map((person) => (
            <PersonDetail key={person.name} person={person} />
          ))}
    </>
  );
};

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter} />
    </div>
  );
};

const PersonForm = ({ handleName, handleNumber, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleName} />
      </div>
      <div>
        number: <input onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterFlag, setFilterFlag] = useState(false);
  const [filterdPersons, setFilteredPersons] = useState([{}]);

  useEffect(() => {
    phonebookService.getPhonebook().then((persons) => {
      if (persons != undefined) setPersons(persons);
    });
  }, []);

  let saveFlag = true;

  const handleName = (e) => {
    setNewName(e.target.value.trim());
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const checkIfNameExists = () => {
    persons.forEach((person) => {
      if (person.name === newName) {
        saveFlag = false;
        alert(`${newName} is already added to phonebook`);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfNameExists();
    if (saveFlag && newName != "") {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .updatePhoneBook(newPerson)
        .then((res) => setPersons(persons.concat(res)));
      e.target.reset();
    }
  };

  const handleFilter = (e) => {
    const filterValue = e.target.value.toLowerCase().trim();
    setFilterFlag(filterValue !== "");
    setFilteredPersons(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(filterValue);
      })
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {filterFlag ? (
        <Persons persons={filterdPersons} />
      ) : (
        <Persons persons={persons} />
      )}
    </div>
  );
};

export default App;
