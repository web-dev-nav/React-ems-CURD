import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { format, parseISO } from 'date-fns';

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($_id: ID!, $updatedEmployee: EmployeeInput!) {
    updateEmployee(_id: $_id, updatedEmployee: $updatedEmployee) {
      _id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    }
  }
`;

const EditEmployeeModal = ({ employee, onClose }) => {
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });
  const [validationError, setValidationError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Age') {
        // Validate age
        const age = parseInt(value, 10);
        if (isNaN(age) || age < 20 || age > 70) {
          setValidationError('Please enter a valid age between 20 and 70.');
        } else {
          setValidationError(null);
        }
      }

      
    setUpdatedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { FirstName, LastName, Age, DateOfJoining, Title, Department,EmployeeType } = updatedEmployee;
    return FirstName && LastName && Age && DateOfJoining && Title && Department && EmployeeType;
  };


  const handleUpdate = async () => {
    try {
        if (!validateForm()) {
            setValidationError('Please fill in all required fields.');
            return;
          }
      await updateEmployee({
        variables: {
          _id: employee._id,
          updatedEmployee: {
            FirstName: updatedEmployee.FirstName,
            LastName: updatedEmployee.LastName,
            Age: parseInt(updatedEmployee.Age, 10),
            DateOfJoining: new Date(updatedEmployee.DateOfJoining).toISOString(),
            Title: updatedEmployee.Title,
            Department: updatedEmployee.Department,
            EmployeeType: updatedEmployee.EmployeeType,
            CurrentStatus: updatedEmployee.CurrentStatus,
          },
        },
      });
      setSuccessMessage('Employee updated successfully!');
      //onClose();
    } catch (error) {
      console.error(`Error updating employee: ${error.message}`);
      setValidationError(`Error updating employee: ${error.message}`);
    }
  };
  
  useEffect(() => {
    // Reset success message after a certain duration (e.g., 3 seconds)
    const resetSuccessMessage = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => clearTimeout(resetSuccessMessage);
  }, [successMessage]);
  
  

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
           
          </div>
          <div className="modal-body">
            {validationError && (
                <div className="alert alert-danger" role="alert">
                    {validationError}
                </div>
                )}

            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="FirstName"
                  value={updatedEmployee.FirstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="LastName"
                  value={updatedEmployee.LastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="Age"
                  value={updatedEmployee.Age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfJoining">Date of Joining</label>
                <input
                    type="date"
                    className="form-control"
                    id="dateOfJoining"
                    name="DateOfJoining"
                    value={format(parseISO(updatedEmployee.DateOfJoining), "yyyy-MM-dd")}
                  
                    onChange={handleInputChange}
                    />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <select
                  className="form-select"
                  id="title"
                  name="Title"
                  value={updatedEmployee.Title}
                  onChange={handleInputChange}
                >
                  <option value="">Select Title</option>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  className="form-select"
                  id="department"
                  name="Department"
                  value={updatedEmployee.Department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="employeeType">Employee Type</label>
                <select
                  className="form-select"
                  id="employeeType"
                  name="EmployeeType"
                  value={updatedEmployee.EmployeeType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Employee Type</option>
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
              {/* Other input fields... */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="currentStatus"
                  name="CurrentStatus"
                  checked={updatedEmployee.CurrentStatus}
                  onChange={() =>
                    setUpdatedEmployee((prevEmployee) => ({
                      ...prevEmployee,
                      CurrentStatus: !prevEmployee.CurrentStatus,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="currentStatus">
                  Current Status
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
