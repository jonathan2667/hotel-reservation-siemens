import React from 'react';
import ReactDOM from 'react-dom/client';  // Use ReactDOM client for React 18
import './index.css';
import App from './App';
import { HotelProvider } from './HotelContext';  // Import the HotelProvider
import reportWebVitals from './reportWebVitals';

// Create a root container managed by React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HotelProvider>  {/* Wrap the App component with the HotelProvider */}
      <App />
    </HotelProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
