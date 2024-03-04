import React, { useState } from "react";
// EmployeeSearch component for searching employees by name
const EmployeeSearch = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
// Handler for form submission, triggers the search with the provided text
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(searchText);
  };
// Render the search form with an input and a submit button
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
