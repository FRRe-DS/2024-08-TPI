import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Escultores = () => {
  const [escultores, setEscultores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEscultores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/escultor/');
        const data = await response.json();
        setEscultores(data);
      } catch (error) {
        console.error('Error al traer los escultores', error);
      }
    };
    fetchEscultores();
  }, []);

  const handleVerBiografia = (escultor) => {
    setSelectedEscultor(escultor);
    setShowBiografia(true);
  };

  const handleVotar = (escultor) => {
    navigate(`/votacion/${escultor.id_escultor}`);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {escultores.map((escultor) => (
          <div
            key={escultor.id_escultor}
            className="relative bg-white shadow-md p-4 rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-xl"
          >
            <img
              className="absolute top-2 left-2 w-10 h-6 sm:w-12 sm:h-8 rounded shadow-md border border-gray-300"
              src={escultor.img_nacionalidad}
              alt={`Bandera de ${escultor.nacionalidad}`}
            />
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full object-cover shadow-md"
              src={escultor.imagen_esc}
              alt={escultor.nombre_esc}
            />
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{escultor.nombre_esc}</h2>
              <p className="text-gray-500">{escultor.nacionalidad}</p>
            </div>
            <div className="mt-4 w-full flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0">
              <button
                className="bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-700 transition duration-200 w-full sm:w-auto"
                onClick={() => handleVotar(escultor)}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Escultores;










