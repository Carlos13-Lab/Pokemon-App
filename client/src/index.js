import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar createRoot desde react-dom/client
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = "https://pokemon-app-2-9p14.onrender.com/api"; // Configurar la URL base de Axios

// Crear el root para renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación
reportWebVitals();