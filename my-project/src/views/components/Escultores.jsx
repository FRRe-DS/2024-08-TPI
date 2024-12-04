import '/public/css/escultores.css'; // Acá se incluye el archivo CSS de ser necesario
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

  function isUrl(image) {
    const res = image.match(/^(http|https):\/\/[^ "]+$/);
    return res !== null; // Devuelve true si es una URL válida
  }

  const handleVotar = (escultor) => {
    navigate(`/biografia/${escultor.id_escultor}`);
  };

  return (
    <div className="container relative">
      <div className="overflow-y-auto h-[80vh] p-4 mt-4 " >
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {escultores.map((escultor) => (
            <div
              key={escultor.id_escultor}
              className="card relative bg-gradient-to-t from-[#9fa3a9] to-[#1f2124] shadow-md p-4 rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-xl"
            >
              <div className="card-body">
                <img
                  className="absolute top-2 left-2 w-10 h-6 sm:w-12 sm:h-8 rounded shadow-md border border-gray-300"
                  src={escultor.img_nacionalidad}
                  alt={`Bandera de ${escultor.nacionalidad}`}
                />
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full object-cover shadow-md"
                  src={
                    (isUrl(escultor.imagen_esc) ? escultor.imagen_esc : `http://localhost:3000/${escultor.imagen_esc}`) ||
                    '/public/img/avatar.png '
                  }
                  alt={escultor.nombre_esc}
                />
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-grisBIENnegro">
                    {escultor.nombre_esc + ' ' + escultor.apellido}
                  </h2>
                  <p className="text-grisBIENnegro">{escultor.nacionalidad}</p>
                </div>
              </div>
              <div className="card-footer">
                <div className="mt-4 w-full flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0">
                  <button
                    className="bg-grisOscuro text-white rounded px-4 py-2 hover:bg-gray-700 transition duration-200 w-full sm:w-auto"
                    onClick={() => handleVotar(escultor)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Escultores;




