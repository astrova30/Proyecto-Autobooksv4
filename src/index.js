import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthorizationProvider } from './Context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthorizationProvider>
    <App />
  </AuthorizationProvider>
);

reportWebVitals();

