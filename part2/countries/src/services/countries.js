import axios from "axios";

const getAllCountries = () => {
  const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const request = axios.get(url);
  return request
    .then((response) => {
      if (response.status === 200 && response.data) return response.data;
    })
    .catch((err) => console.log("Error while fetching countries", err));
};

const getCountryDetail = (name) => {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;

  const request = axios.get(url);
  return request
    .then((response) => {
      if (response.status === 200 && response.data) return response.data;
    })
    .catch((err) => console.log("Error while fetching countries", err));
};

export default { getAllCountries, getCountryDetail };
