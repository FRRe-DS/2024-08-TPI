import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCountdown from '../../hooks/useCountdown'; // Asegúrate de que la ruta sea correcta

const Votar = () => {
  const { id_escultor } = useParams();
  const navigate = useNavigate(); // Importar el hook useNavigate
  const [escultor, setEscultor] = useState(null);
  const [votacion, setVotacion] = useState(2.5); // Valor inicial de votación
  const [votado, setVotado] = useState(false); // Verificar si el usuario ya ha votado

  // Usar el hook useCountdown con 60 segundos como tiempo inicial
  const timeLeft = useCountdown(5);

  useEffect(() => {
    const fetchEscultor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/escultor/${id_escultor}`);
        setEscultor(response.data);
        
        // Verificar si el usuario ya votó previamente
        const userVotoResponse = await axios.get(`http://localhost:3000/api/voto/${id_escultor}`);
        if (userVotoResponse.data.votado) {
          setVotacion(userVotoResponse.data.votacion);
          setVotado(true); // Si ya ha votado, no puede volver a votar
        }
      } catch (error) {
        console.error('Error al obtener datos del escultor o votación previa', error);
      }
    };
    fetchEscultor();
  }, [id_escultor]);

  useEffect(() => {
    if (timeLeft === 0) {
      // Redirigir al home cuando el tiempo llegue a 0
      navigate('/');
    }
  }, [timeLeft, navigate]); // Añadir navigate a las dependencias

  const handleVotar = async () => {
    if (!votado) {
      try {
        // Guardar la votación del usuario
        await axios.post(`http://localhost:3000/api/votar`, {
          id_escultor,
          votacion,
        });
        setVotado(true); // El usuario ya ha votado
      } catch (error) {
        console.error('Error al enviar la votación', error);
      }
    }
  };

  if (!escultor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl font-bold animate-pulse text-slate-50">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      {/* Solo visible en dispositivos móviles */}
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center block md:hidden">
        <h2 className="text-2xl font-bold mb-4">NOMBRE DEL ESCULTOR: {escultor.nombre_esc + ' ' + escultor.apellido}</h2>
        <p className="mb-8">Escultura a votar</p>

        <div className="flex items-center justify-center mb-4">
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={votacion}
            onChange={(e) => setVotacion(e.target.value)}
            disabled={votado} // Deshabilitar si ya ha votado
            className="w-2/3"
          />
          <div className="ml-4 bg-white text-black font-bold py-1 px-3 rounded">
            {votacion}
          </div>
        </div>

        {/* Mostrar el tiempo restante */}
        <div className="mb-4 text-xl font-bold">
          {timeLeft === 0 ? 'Tiempo agotado' : `Tiempo restante: ${timeLeft}s`}
        </div>

        <button
          onClick={handleVotar}
          disabled={votado || timeLeft === 0} // Deshabilitar si ya ha votado o el tiempo ha pasado
          className={`py-2 px-4 rounded-lg font-bold ${
            votado || timeLeft === 0 ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {votado ? 'Ya has votado' : 'Enviar Votación'}
        </button>
      </div>
    </div>
  );
};

export default Votar;
