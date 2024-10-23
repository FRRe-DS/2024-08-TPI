import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Votacion = () => {
  const { id_escultor } = useParams();
  const [escultor, setEscultor] = useState(null);

  useEffect(() => {
    const fetchEscultor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/escultor/${id_escultor}`);
        setEscultor(response.data);
      } catch (error) {
        console.error('Error al obtener datos del escultor', error);
      }
    };
    fetchEscultor();
  }, [id_escultor]);

  const closeBiografia = () => {
    setEscultor(null); 
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
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Biografía del Escultor</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col items-center lg:w-1/3 bg-white rounded-lg shadow-lg p-4">
          <img
            src={escultor.imagen_esc}
            alt={escultor.nombre_esc}
            className="w-32 h-32 mb-4 rounded-full border-4 border-gray-300 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {escultor.nombre_esc} {escultor.apellido}
          </h2>
          <p className="text-gray-500 italic mb-4">{escultor.nacionalidad}</p>
          <button
            className="text-gray-500 hover:text-gray-700 float-right mb-4 text-xl"
            onClick={closeBiografia}
          >
            &times;
          </button>
          <div className="text-left w-full px-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Biografía</h3>
            <p className="text-gray-600 leading-relaxed">{escultor.biografia}</p>
          </div>
        </div>

        <div className="flex-grow bg-white rounded-lg shadow-lg p-4">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Información del Escultor</h3>
            <p><span className="font-bold">Nombre:</span> {escultor.nombre_esc}</p>
            <p><span className="font-bold">Apellido:</span> {escultor.apellido}</p>
            <p><span className="font-bold">Nacionalidad:</span> {escultor.nacionalidad}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Escultura Actual</h3>
            <p>Aquí se mostrará la información sobre la escultura.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votacion;


