//EmployeeTable.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import EmployeeSearch from './EmployeeSearch';
import EditEmployeeModal from './EmployeeEdit';

const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
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

const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($_id: ID!) {
    deleteEmployee(_id: $_id) {
      _id
    }
  }
`;

function EmployeeTable() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAge, setFilterAge] = useState(''); // State for age filter
  const [filterDepartment, setFilterDepartment] = useState(''); // State for department filter
  const [filterTitle, setFilterTitle] = useState(''); // State for title filter
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee({ variables: { _id: employeeId } });
      // Refetch the data after deletion to update the table
      refetch();
    } catch (error) {
      console.error(`Error deleting employee: ${error.message}`);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

 
  if (loading) return <p>Fetching data from the server please wait...</p>;
  if (error) return <p className="alert alert-danger">Error: {error.message}</p>;

 
  // Check if data and data.getAllEmployees are defined before mapping
  const employees = data && data.getAllEmployees ? data.getAllEmployees : [];

  // Filter employees based on the search query, age, department, and title
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.FirstName} ${employee.LastName}`;
    const ageFilter = filterAge ? employee.Age === parseInt(filterAge, 10) : true;
    const departmentFilter = filterDepartment ? employee.Department === filterDepartment : true;
    const titleFilter = filterTitle ? employee.Title === filterTitle : true;

    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      ageFilter &&
      departmentFilter &&
      titleFilter
    );
  });

  // Get unique values for age, department, and title
  const uniqueAges = Array.from(new Set(employees.map((employee) => employee.Age)));
  const uniqueDepartments = Array.from(new Set(employees.map((employee) => employee.Department)));
  const uniqueTitles = Array.from(new Set(employees.map((employee) => employee.Title)));

  
  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title">Employee Table</h5>
              <div className="btn-toolbar mx-3">
                 
                  <div className="d-flex">
                  <select
                    className="form-select mx-1"
                    onChange={(e) => setFilterAge(e.target.value)}
                    value={filterAge}
                  >
                    <option value="">Filter by Age</option>
                    {uniqueAges.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select mx-1"
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    value={filterDepartment}
                  >
                    <option value="">Filter by Department</option>
                    {uniqueDepartments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select mx-1"
                    onChange={(e) => setFilterTitle(e.target.value)}
                    value={filterTitle}
                  >
                    <option value="">Filter by Job Title</option>
                    {uniqueTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                  </div>
             
                  <EmployeeSearch handleSearch={handleSearch} />
            </div>
            </div>
        

          {filteredEmployees.length === 0 ? (
            <p className="alert alert-danger">No employees found for the given search query.</p>
          ) : (
            <div class="table-responsive">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Date of Joining</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Employee Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.FirstName}</td>
                    <td>{employee.LastName}</td>
                    <td>{employee.Age}</td>
                    <td>{new Date(employee.DateOfJoining).toLocaleDateString()}</td>
                    <td>{employee.Title}</td>
                    <td>{employee.Department}</td>
                    <td>{employee.EmployeeType}</td>
                    <td>{employee.CurrentStatus ? 'Working' : 'Retired'}</td>
                    <td>
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEdit(employee)}
                          >
                            Edit
                          </button>   
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(employee._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
          {showEditModal && (
            <EditEmployeeModal
              employee={selectedEmployee}
              onClose={() => {
                setShowEditModal(false);
                setSelectedEmployee(null);
                refetch();
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
