import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar createRoot desde react-dom/client
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = "http://localhost:5000/api"; // URL base para las peticiones a la API

// Crear el root para renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación
reportWebVitals();