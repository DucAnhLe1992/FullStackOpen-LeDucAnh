import React, { useState } from "react";
import Country from "./Country";

const ShowCountry = ({country}) => {
  const [show, setShow] = useState(false);

  const showInfo = (event) => {
    if (show) setShow(false);
    else setShow(true);
  };

  return (
    <div>
      {show ? <Country country={country} /> : <div></div>}
      <button onClick={showInfo}>{show ? "Hide" : "Show"}</button>
    </div>
  );
};

export default ShowCountry;
