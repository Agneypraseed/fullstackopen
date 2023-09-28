import { useEffect, useState } from "react";
import phonebookService from "./services/phonebook";
import "./App.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const DeletePerson = ({ person, handleDelete }) => {
  return (
    <button type="submit" onClick={() => handleDelete(person)}>
      delete
    </button>
  );
};

const PersonDetail = ({ person, handleDelete }) => {
  return (
    <div className="container">
      <p>
        {person.name} {person.number}
      </p>
      <DeletePerson person={person} handleDelete={handleDelete} />
    </div>
  );
};

const Persons = ({ persons, handleDelete }) => {
  const isEmptyPhonebook = persons.length === 0;
  const isFetchingPhoneBookFromServer =
    !isEmptyPhonebook && Object.keys(persons[0]).length === 0;

  if (isEmptyPhonebook) return <p>No Matching Records available</p>;
  if (isFetchingPhoneBookFromServer)
    return <p>Loading Phonebook from server</p>;

  return (
    <>
      {persons.map(
        (person) =>
          person !== undefined && (
            <PersonDetail
              key={person.name}
              person={person}
              handleDelete={handleDelete}
            />
          )
      )}
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
        name: <input onChange={handleName} required/>
      </div>
      <div>
        number: <input onChange={handleNumber} required/>
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
  const [errorMessage, setErrorMessage] = useState(null);

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

  const checkIfNameExists = (e) => {
    persons.forEach((person) => {
      if (person.name === newName) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const newPerson = {
            name: newName,
            number: newNumber,
          };
          phonebookService.updatePerson(person.id, newPerson).then((res) => {
            setPersons(persons.map((o) => (o.id !== person.id ? o : res)));
            setFilteredPersons(
              filterdPersons.map((o) => (o.id !== person.id ? o : res))
            );
          });
          e.target.reset();
          setErrorMessage(`Updated ${newName}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
        saveFlag = false;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfNameExists(e);
    if (saveFlag && newName != "") {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      phonebookService
        .updatePhoneBook(newPerson)
        .then((res) => setPersons(persons.concat(res)));
      e.target.reset();
      setErrorMessage(`Added ${newName}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService.deletePerson(person.id).then((status) => {
        if (status === 200) {
          setPersons(persons.filter((p) => p.id !== person.id));
          setFilteredPersons(filterdPersons.filter((p) => p.id !== person.id));
          setErrorMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        } else {
          console.log(`Error - Could not delete ${person.name} from database`);
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {filterFlag ? (
        <Persons persons={filterdPersons} handleDelete={handleDelete} />
      ) : (
        <Persons persons={persons} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
