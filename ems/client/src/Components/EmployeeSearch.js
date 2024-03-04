import React, { useState } from "react";

const EmployeeSearch = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(searchText);
  };

  return (
    <form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
      <input className="form-control me-sm-2"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search by Name"
      />
      <button className="btn btn-secondary my-2 my-sm-0"  type="submit">Search</button>
    </form>
  );
};

export default EmployeeSearch;
