//src/App.js
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import EmployeeCreate from './EmployeeCreate';
import EmployeeTable from './EmployeeTable';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

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
