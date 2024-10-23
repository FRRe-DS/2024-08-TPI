import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Escultores = () => {
  const [escultores, setEscultores] = useState([]);
  const [selectedEscultor, setSelectedEscultor] = useState(null);
  const [showBiografia, setShowBiografia] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir a la página de votación

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

  const closeBiografia = () => {
    setShowBiografia(false);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {escultores.map((escultor) => (
          <div 
            key={escultor.id} 
            className="relative bg-white shadow-lg p-4 rounded-lg flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            {/* Imagen de la bandera en la esquina superior izquierda */}
            <img
              className="absolute top-2 left-2 w-12 h-8 rounded shadow-md border border-gray-300"
              src={escultor.img_nacionalidad} // Reemplaza esto con la propiedad correcta para la bandera
              alt={`Bandera de ${escultor.nacionalidad}`}
            />
            
            <img
              className="w-24 h-24 mb-3 rounded-full object-cover shadow-md"
              src={escultor.imagen_esc}
              alt={escultor.nombre_esc}
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">{escultor.nombre_esc}</h2>
              <p className="text-gray-500">{escultor.nacionalidad}</p>
            </div>
            <div className="text-center mt-4 w-full flex justify-around">
              <button 
                className="bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-700 transition duration-200"
                onClick={() => handleVerBiografia(escultor)}
              >
                Ver biografía
              </button>
              <button
                className="bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-700 transition duration-200"
                onClick={() => handleVotar(escultor)}
              >
                Votar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Panel de control */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-2xl transition-transform transform ${showBiografia ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-2/3 md:w-1/2 lg:w-1/3 z-50`}>
        {selectedEscultor && (
          <div className="p-6">
            <button
              className="text-gray-500 hover:text-gray-700 float-right mb-4 text-xl"
              onClick={closeBiografia}
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                className="w-40 h-40 rounded-full mb-4 shadow-lg object-cover"
                src={selectedEscultor.imagen_esc}
                alt={selectedEscultor.nombre_esc}
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedEscultor.nombre_esc} {selectedEscultor.apellido}
              </h2>
              <p className="text-gray-500 italic mb-4">{selectedEscultor.nacionalidad}</p>
              <div className="text-left w-full px-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Biografía</h3>
                <p className="text-gray-600 leading-relaxed">{selectedEscultor.biografia}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Escultores;








