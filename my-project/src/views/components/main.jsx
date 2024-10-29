import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../App.jsx'; // Asegúrate de que la ruta es correcta
import '/public/css/index.css'
import { Auth0Provider } from "@auth0/auth0-react"


const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientId} // Este debe ser correcto
    redirectUri={window.location.origin}>
  
  <App />
</Auth0Provider>
  </React.StrictMode>
)