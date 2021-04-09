import React from "react";

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>
      <h2>Filter</h2>
      Filter shown with <input onChange={handleFilterChange} value={filter} />
    </div>
  );
};

export default Filter;
