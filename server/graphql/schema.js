//schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  enum TitleEnum {
    Employee
    Manager
    Director
    VP
  }

  enum DepartmentEnum {
    IT
    Marketing
    HR
    Engineering
  }

  enum EmployeeTypeEnum {
    FullTime
    PartTime
    Contract
    Seasonal
  }

  input EmployeeInput {
    FirstName: String!
    LastName: String!
    Age: Int!
    DateOfJoining: Date!
    Title: TitleEnum!
    Department: DepartmentEnum!
    EmployeeType: EmployeeTypeEnum!
    CurrentStatus: Boolean!
  }

  type User {
    _id: ID!
    FirstName: String!
    LastName: String!
    Age: Int!
    DateOfJoining: Date!
    Title: String!
    Department: String!
    EmployeeType: String!
    CurrentStatus: Boolean!
  }


  type Query {
    getAllEmployees: [User]!
  }

  type Mutation {
    createEmployee(
      FirstName: String!
      LastName: String!
      Age: Int!
      DateOfJoining: Date!
      Title: String!
      Department: String!
      EmployeeType: String!
    ): User!

    updateEmployee(_id: ID!, updatedEmployee: EmployeeInput!): User
    
    deleteEmployee(_id: ID!): User

  }
`;

module.exports = typeDefs;
