import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import '/public/css/PresentacionQR.css';

const PresentacionQR = () => {
  const { id } = useParams();
  const [escultor, setEscultor] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');


  useEffect(() => {
    const fetchEscultor = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/escultor/${id}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setEscultor(data);
      } catch (err) {
        console.error("Error al obtener el escultor:", err);
        setError("No se pudo cargar el escultor.");
      }
    };
    fetchEscultor();
  }, [id]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/token/:${id}`); // Usamos POST con Axios
        setToken(response.data.token); // Actualizamos el estado con el token recibido
      } catch (err) {
        console.error('Error al obtener el token:', err);
        setError('No se pudo generar el token.');
      }
    };
  
    fetchToken(); // Llamada inicial
  
    const interval = setInterval(fetchToken, 60000); // Llamar cada 60 segundos
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [id]);

  
  useEffect(() => {
    // Ocultar el header y el footer para esta página
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) {
      header.style.display = 'none';
    }
    if (footer) {
      footer.style.display = 'none';
    }

    // Restaurar el header y el footer cuando se desmonte el componente
    return () => {
      if (header) {
        header.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!escultor) {
    return <div style={{ color: 'black' }}>Cargando...</div>;
  }

  return (
    <div className="qr-page">
      <h1> Voto por {escultor.nombre_esc} {escultor.apellido}</h1>
      <div>
        { token && (
          <QRCodeSVG value={`http://localhost:5173/votar/${id}?token=${token}`} size={350}  />
        )}
      </div>
    </div>
  );
};

export default PresentacionQR;