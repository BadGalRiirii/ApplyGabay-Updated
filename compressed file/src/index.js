import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // General global styles
import App from './App';

// Render the App into the root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
