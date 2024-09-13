import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../App.jsx'; // Asegúrate de que la ruta es correcta
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)