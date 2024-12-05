import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useCountdown from '../../hooks/useCountdown';
import { useAuth0 } from '@auth0/auth0-react';

const Votar = () => {
  const { id_escultor: id_escultorParam } = useParams();
  const id_escultor = parseInt(id_escultorParam, 10); // Convertir a entero
  const location = useLocation();
  const navigate = useNavigate();
  const [escultor, setEscultor] = useState(null);
  const [puntuacion, setPuntuacion] = useState(2.5);
  const [email, setEmail] = useState(null);
  const [votado, setVotado] = useState(null);
  const { user, isAuthenticated, loginWithRedirect  } = useAuth0();
  const timeLeft = useCountdown(60);

 


  useEffect(() => {
    const fetchEscultor = async () => {
      setEmail(user?.email); // Asegúrate de que user.email esté definido
      try {
        const response = await axios.get(`http://localhost:3000/api/escultor/${id_escultor}`);
        setEscultor(response.data);

        // Verificar si el usuario ya votó previamente
        const userVotoResponse = await axios.get(`http://localhost:3000/api/voto/${id_escultor}/${user.email}`);
        
        if (userVotoResponse.data) {
          setPuntuacion(userVotoResponse.data.puntuacion); // Mostrar la puntuación anterior
          setVotado(true); // Deshabilitar la votación
        } else {
          setVotado(false); // Permitir la votación si no existe 
        }
      } catch (error) {
        console.error('Error al obtener datos del escultor o votación previa', error);
      }
    };

    if (user?.email) {
      fetchEscultor();
    }
  }, [id_escultor, user?.email]);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/');
    }
  }, [timeLeft, navigate]);

  const handleVotar = async () => {
    if (!votado) {
      try {
        const token = new URLSearchParams(location.search).get('token'); // Corregido de `location.seach` a `location.search`

        const verifyResponse = await axios.get('http://localhost:3000/api/token/Verifytoken', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(verifyResponse);
        console.log(verifyResponse.data);
        console.log(verifyResponse.data.valido)
        if (verifyResponse.data.valido) {
          await axios.post(`http://localhost:3000/api/voto`, {
            id_escultor,
            email,
            puntuacion: Number(puntuacion),
          });
          setVotado(true);
          alert('Votación enviada');

          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          alert('El QR expiró');
        }
      } catch (error) {
        console.error('Error al enviar la votación', error);
        alert('Ocurrió un error al validar la votación');
      }
    }
  };
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión para votar</h2>
          <button
            onClick={() => loginWithRedirect()}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }
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
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center block">
        <h2 className="text-2xl font-bold mb-4">NOMBRE DEL ESCULTOR: {escultor.nombre_esc + ' ' + escultor.apellido}</h2>
        <p className="mb-8">Escultura a votar</p>

        <div className="flex items-center justify-center mb-4">
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={puntuacion}
            onChange={(e) => setPuntuacion(e.target.value)}
            disabled={votado}
            className="w-2/3"
          />
          <div className="ml-4 bg-white text-black font-bold py-1 px-3 rounded">
            {puntuacion}
          </div>
        </div>

        <div className="mb-4 text-xl font-bold">
          {timeLeft === 0 ? 'Tiempo agotado' : `Tiempo restante: ${timeLeft}s`}
        </div>

        <button
          onClick={handleVotar}
          disabled={votado || timeLeft === 0}
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
