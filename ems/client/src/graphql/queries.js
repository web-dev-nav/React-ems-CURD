//queries.js
import { gql } from '@apollo/client';

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
