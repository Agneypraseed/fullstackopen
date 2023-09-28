import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getPhonebook = () => {
  const request = axios.get(baseUrl);
  return request
    .then((res) => res.data)
    .catch((err) => console.log("Error while fetching from database", err));
};

const updatePhoneBook = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request
    .then((res) => res.data)
    .catch((err) => console.log("Error while Saving to database", err));
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((res) => res.status)
    .catch((err) => console.error("Error deleting", err));
};

export default { getPhonebook, updatePhoneBook, deletePerson };
