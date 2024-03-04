//resolver.js

const { GraphQLScalarType, Kind } = require('graphql');
const UserModel = require('../models/UserModel');

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
  
  Query: {
    getAllEmployees: async () => await UserModel.find(),
  },
  Mutation: {
    createEmployee: async (_, args) => {
      const user = new UserModel(args);
      await user.save();
      return user;
    },

    updateEmployee: async (_, { _id, updatedEmployee }) => {
      try {
        // Your logic to update the employee based on _id and updatedEmployee
        const updatedUser = await UserModel.findByIdAndUpdate(_id, updatedEmployee, { new: true });
        return updatedUser;
      } catch (error) {
        console.error(`Error updating employee: ${error.message}`);
        throw new Error(`Error updating employee: ${error.message}`);
      }
    },
    deleteEmployee: async (_, { _id }) => {
      try {
        const deletedEmployee = await UserModel.findByIdAndDelete(_id);
        return deletedEmployee;
      } catch (error) {
        console.error(`Error deleting employee: ${error.message}`);
        throw new Error(`Error deleting employee: ${error.message}`);
      }
    },
   
  },
};

module.exports = resolvers;
