//EmployeeCreate.js
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'; 
import { CREATE_EMPLOYEE } from '../graphql/mutations';
import { GET_ALL_EMPLOYEES } from '../graphql/queries';


const EmployeeCreate = () => {
  const [formValues, setFormValues] = useState({
    FirstName: '',
    LastName: '',
    Age: 20,
    DateOfJoining: new Date().toISOString().split('T')[0], // Set the current date by default
    Title: 'Employee',
    Department: 'IT',
    EmployeeType: 'FullTime',
  });

  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const { refetch } = useQuery(GET_ALL_EMPLOYEES);

  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior


     // Basic form validation
     if (!formValues.FirstName || !formValues.LastName) {
      setMessage({ type: 'error', content: 'Please fill in all required fields.' });
    
      return;
    }

    const age = parseInt(formValues.Age, 10);
    if (isNaN(age) || age < 20 || age > 70) {
      
      setMessage({ type: 'error', content: 'Please enter a valid age between 20 and 70.' });
      return;
    }

    try {
      await createEmployee({ variables: { ...formValues,  Age: age} });
       // Refetch the data after creating a new employee
      refetch();
      setMessage({ type: 'success', content: 'Employee created successfully.' });
      
      
    } catch (error) {
      setMessage({ type: 'error', content: `${error.message}` });
    }
  };
  // console.log('Rendering EmployeeCreate component'); // Log when the component renders
  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-header">
        <h2>Create Employee</h2>
      </div>
      <div className="card-body">
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {message.content}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            name="FirstName"
            className="form-control"
            value={formValues.FirstName}
            onChange={handleInputChange}
          />
        </div>
  
        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            name="LastName"
            className="form-control"
            value={formValues.LastName}
            onChange={handleInputChange}
          />
        </div>
  
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            name="Age"
            className="form-control"
            value={formValues.Age}
            onChange={handleInputChange}
         
          />
        </div>
  
        <div className="mb-3">
          <label className="form-label">Date of Joining:</label>
          <input
            type="date"
            name="DateOfJoining"
            className="form-control"
            value={formValues.DateOfJoining}
            onChange={handleInputChange}
          />
        </div>
  
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <select
            name="Title"
            className="form-control"
            value={formValues.Title}
            onChange={handleInputChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>
  
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            name="Department"
            className="form-control"
            value={formValues.Department}
            onChange={handleInputChange}
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>
  
        <div className="mb-3">
          <label className="form-label">Employee Type:</label>
          <select
            name="EmployeeType"
            className="form-control"
            value={formValues.EmployeeType}
            onChange={handleInputChange}
          >
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>
  
        <button type="submit" className="btn btn-primary">Create Employee</button>
      </form>
      </div>
      </div>
    </div>
  );
  
};

export default EmployeeCreate;
