import { useEffect, useState } from "react";
import "./App.css";
import countriesService from "./services/countries";

const Details = ({ details }) => {
  return (
    <div>
      <div>
        <h1>{details.name.common}</h1>
      </div>
      <div>
        <p>capital {details.capital}</p>
        <p>area {details.area}</p>
      </div>
      <div>
        <h3>languages: </h3>
        <ul>
          {Object.entries(details.languages).map(([key, language]) => {
            return <li key={key}>{language}</li>;
          })}
        </ul>
      </div>
      <div className="image-container">
        <img src={details.flags.svg} alt={details.flags.alt} />
      </div>
    </div>
  );
};

const CountryDetails = ({ name }) => {
  const [details, setDetails] = useState([]);

  countriesService
    .getCountryDetail(name)
    .then((details) => setDetails(details))
    .catch((err) => console.log("Error fetching details", err));

  return details.length != 0 ? (
    <Details details={details} />
  ) : (
    <p>Loading detailed Information...</p>
  );
};

const FilterdList = ({ filteredCountries, handleClick }) => {
  return filteredCountries.map((country) => (
    <div className="filtered-contianer" key={country.name.common}>
      <p>{country.name.common}</p>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleClick([country]);
        }}
      >
        show
      </button>
    </div>
  ));
};

const Country = ({ filteredCountries, handleClick }) => {
  const length = filteredCountries.length;

  if (length === 1) {
    return <CountryDetails name={filteredCountries[0].name.common} />;
  }
  if (length > 10) return <p>Too many matches, specify another filter</p>;
  if (length > 1 && length <= 10) {
    return (
      <FilterdList
        filteredCountries={filteredCountries}
        handleClick={handleClick}
      />
    );
  }
};

const SearchCountry = ({ handleChange, value }) => {
  return (
    <>
      find countries <input value={value} onChange={handleChange} />
    </>
  );
};

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    countriesService.getAllCountries().then((countries) => {
      if (countries !== undefined) {
        setAllCountries(countries);
      }
    });
  }, []);

  const filterCountry = (value) => {
    if (allCountries.length != 0) {
      let matchingCountries = allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(value)
      );

      let exactMatch = matchingCountries.filter(
        (c) => c.name.common.toLowerCase() === value.toLowerCase()
      );
      if (exactMatch.length != 0) {
        setFilteredCountries(exactMatch);
      } else {
        setFilteredCountries(matchingCountries);
      }
    }
  };

  const handleChange = (e) => {
    const trimmedValue = e.target.value.toLowerCase().trimStart();

    if (trimmedValue !== "") {
      setSearchTerm(trimmedValue);
      filterCountry(trimmedValue);
    } else {
      setFilteredCountries([]);
      setSearchTerm("");
    }
  };

  const handleClick = (country) => {
    setSearchTerm(country[0].name.common);
    setFilteredCountries(country);
  };

  return (
    <div>
      <SearchCountry value={searchTerm} handleChange={handleChange} />
      {allCountries.length != 0 ? (
        filteredCountries.length != 0 ? (
          <Country
            filteredCountries={filteredCountries}
            handleClick={handleClick}
          />
        ) : searchTerm != "" ? (
          <p>No matches found</p>
        ) : null
      ) : (
        <p>Please wait while data of all countries is loaded from server</p>
      )}
    </div>
  );
}

export default App;
