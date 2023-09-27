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

export default { getPhonebook, updatePhoneBook };
