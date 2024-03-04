//queries.js
import { gql } from '@apollo/client';
// Query to fetch all employees
export const GET_ALL_EMPLOYEES = gql`
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
// Query to search for employees based on a search query
export const SEARCH_EMPLOYEES = gql`
  query searchEmployees($searchQuery: String!) {
    searchEmployees(searchQuery: $searchQuery) {
      _id
      FirstName
      LastName
      Title
    }
  }
`;
