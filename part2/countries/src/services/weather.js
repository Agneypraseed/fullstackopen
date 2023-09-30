import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const request = axios.get(url);
  return request
    .then((response) => {
      if (response.status === 200 && response.data) return response.data;
    })
    .catch((err) => console.log("Error while fetching weather", err));
};

const getWeatherIcon = (code) => {
  const url = `https://openweathermap.org/img/wn/${code}@2x.png`;

  const request = axios.get(url, { responseType: "arraybuffer" });
  return request
    .then((response) => {
      if (response.status === 200 && response.data) return response.data;
    })
    .catch((err) => console.log("Error while fetching weather Icon", err));
};

export default { getWeather, getWeatherIcon };
