//src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/EmployeeDirectory';
// Render the main App component inside React.StrictMode
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
