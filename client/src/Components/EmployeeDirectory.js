//src/App.js
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import EmployeeCreate from './EmployeeCreate';
import EmployeeTable from './EmployeeTable';

// Create an ApolloClient instance with the GraphQL server URI and cache
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
// Main App component wrapped with ApolloProvider to provide the ApolloClient to the components
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <EmployeeTable/>
        <EmployeeCreate />
      </div>
    </ApolloProvider>
  );
}

export default App;
