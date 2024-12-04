import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import '/public/css/PresentacionQR.css';

const PresentacionQR = () => {
  const { id } = useParams();
  const [escultor, setEscultor] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  const generarToken = () => {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    const token = array.join('-');
    setToken(token);
  }

  useEffect(() => {
    generarToken();
    const time = setInterval(generarToken, 60000); // Generar el token cada minuto
    return () => clearInterval(time);
  }, []);

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
    // Ocultar el header y el footer para esta página
    const header = document.querySelector('.header');
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
      <h1>{escultor.nombre_esc} {escultor.apellido}</h1>
      <div>
        { token && (
          <QRCodeSVG value={`http://localhost:5173/votar/${id}?token=${token}`} size={400} />
        )}
      </div>
    </div>
  );
};

export default PresentacionQR;
