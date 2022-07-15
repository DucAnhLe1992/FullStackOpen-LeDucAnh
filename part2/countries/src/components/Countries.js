import React from "react";
import Country from "./Country";
import ShowCountry from "./ShowCountry";

const Countries = ({ countries, filter }) => {
  const countryList = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(filter.toLowerCase()) || filter === ""
  );

  const result = (list) => {
    if (list.length === 0) return <div>No result!</div>;

    if (list.length > 10) {
      return <div>Too many matches, specify another one</div>;
    } else if (list.length > 1) {
      return (
        <ul>
          {list.map((element) => (
            <li key={element.name}>
              {element.name}
              <ShowCountry country={element} />
            </li>
          ))}
        </ul>
      );
    } else {
      return <Country country={list[0]} />;
    }
  };

  return <div>{result(countryList)}</div>;
};

export default Countries;
