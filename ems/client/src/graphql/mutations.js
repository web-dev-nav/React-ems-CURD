//mutations.js
import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee(
    $FirstName: String!
    $LastName: String!
    $Age: Int!
    $DateOfJoining: Date!
    $Title: String!
    $Department: String!
    $EmployeeType: String!
  ) {
    createEmployee(
      FirstName: $FirstName
      LastName: $LastName
      Age: $Age
      DateOfJoining: $DateOfJoining
      Title: $Title
      Department: $Department
      EmployeeType: $EmployeeType
    ) {
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

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($_id: ID!) {
    deleteEmployee(_id: $_id) {
      _id
    }
  }
`;