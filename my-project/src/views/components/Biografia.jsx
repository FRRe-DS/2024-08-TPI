import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';

const Biografia = () => {
  const { id_escultor } = useParams();
  const navigate = useNavigate(); // Inicializar useNavigate
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
  
  function isUrl(image) {
    const res = image.match(/^(http|https):\/\/[^ "]+$/);
    return res !== null; // Devuelve true si es una URL válida
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
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-GrisMuyOscuro">Biografía del Escultor</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col items-center lg:w-1/3 bg-white rounded-lg shadow-lg p-4">
          <img
            src={
                  (isUrl(escultor.imagen_esc) ? escultor.imagen_esc : `http://localhost:3000/${escultor.imagen_esc}`) ||
                  '/public/img/avatar.png '
                }
            alt={escultor.nombre_esc}
            className="w-32 h-32 mb-4 rounded-full border-4 border-gray-300 shadow-md"
          />
          <h2 className="text-2xl font-bold text-GrisMuyOscuro mb-2">
            {escultor.nombre_esc} {escultor.apellido}
          </h2>
          <p className="text-gray-500 italic mb-4">{escultor.nacionalidad}</p>
          <div className="text-left w-full px-4">
            <h3 className="text-lg font-semibold text-GrisMuyOscuro">Información del Escultor</h3>
            <p><span className="font-bold text-GrisMuyOscuro">Nombre:</span> 
            <span className='text-GrisCasiOscuro'> {escultor.nombre_esc}</span></p>
            <p><span className="font-bold text-GrisMuyOscuro">Apellido:</span> <span className='text-GrisCasiOscuro'> {escultor.apellido}</span></p>
          </div>

          {/* Botón que redirige al componente Votar */}
          <div className="mt-6">
            <button
              onClick={() => navigate(`/votar/${id_escultor}`)} // Navegar al componente Votar
              className="bg-GrisMuyOscuro hover:bg-grisOscuro text-white font-bold py-2 px-4 rounded"
            >
              Ir a Votar
            </button>
          </div>
        </div>

        <div className="flex-grow bg-white rounded-lg shadow-lg p-4">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2 text-GrisMuyOscuro">Biografía</h3>
            <p className="text-GrisCasiOscuro leading-relaxed">{escultor.biografia}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-4 text-GrisMuyOscuro">Proyecto</h3>
            <p className='text-GrisCasiOscuro '>Aquí se mostrará la información sobre la escultura.</p>
          </div>
        </div>
      </div>

      {/* Nuevo bloque para esculturas antiguas */}
      <div className="bg-white rounded-lg shadow-lg p-4 mt-6">
        <h3 className="text-xl font-semibold mb-4 text-GrisMuyOscuro">Esculturas Antiguas</h3>
        {escultor.esculturas_antiguas && escultor.esculturas_antiguas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {escultor.esculturas_antiguas.map((escultura, index) => (
              <div key={index} className="bg-gray-100 shadow-md rounded-lg p-4">
                <img
                  src={escultura.imagen}
                  alt={escultura.nombre}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h4 className="text-lg font-semibold text-GrisMuyOscuro">{escultura.nombre}</h4>
                <p className="text-gray-600">Año: {escultura.anio}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay esculturas antiguas registradas.</p>
        )}
      </div>

      {/* Botón para volver atrás */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate(-1)} // Volver a la página anterior
          className="bg-GrisMuyOscuro  hover:bg-grisOscuro text-white font-bold py-2 px-4 rounded"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default Biografia;
