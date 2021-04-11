import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((res) => {
        setWeather(res.data.current);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>{country.name}</h2>
        Capital {country.capital}
        <br />
        Population {country.population}
        <br />
        <h3>Spoken languages</h3>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={country.name} width="200" />
        <h3>Weather in {country.capital}</h3>
        <img src={weather.weather_icons} alt={country.capital} /><br/>
        Weather: {weather.weather_descriptions}<br/>
        Temperature: {weather.temperature} Celsius<br/>
        Feels like: {weather.feelslike} Celsius <br/>
        Wind: {weather.wind_speed} m/s {weather.wind_dir}
      </div>
    </div>
  );
};

export default Country;
