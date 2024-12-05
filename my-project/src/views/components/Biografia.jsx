import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '/public/css/Biografia.css'; 
const Biografia = () => {
  const { id_escultor } = useParams();
  const navigate = useNavigate();
  const [escultor, setEscultor] = useState(null);
  const [imagenes, setImgEsculturas] = useState([]);
  const [token, setToken] = useState('');

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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/token/${id_escultor}`);
        setToken(response.data.token);
      } catch (err) {
        console.error('Error al obtener el token:', err);
      }
    };

    fetchToken();

    const interval = setInterval(fetchToken, 60000);
    return () => clearInterval(interval);
  }, [id_escultor]);

  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/escultura/img_esculturaActual/${id_escultor}`);
        setImgEsculturas(res.data);
      } catch (error) {
        console.error('Error al obtener imágenes', error);
      }
    };
    obtenerImagenes();
  }, [id_escultor]);

  function isUrl(image) {
    if (!image) return false;
    const res = image.match(/^(http|https):\/\/[^ "]+$/);
    return res !== null;
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
      <div className="flex flex-col items-center mb-8"></div>

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
          
          <p className="text-gray-500 italic mb-4">{escultor.nacionalidad}</p>
          <div className="text-left w-full px-4">
            <h3 className="text-lg font-semibold text-GrisMuyOscuro">Información del Escultor</h3>
            <p>
              <span className="font-bold text-GrisMuyOscuro">Nombre:</span>
              <span className="text-GrisCasiOscuro"> {escultor.nombre_esc}</span>
            </p>
            <p>
              <span className="font-bold text-GrisMuyOscuro">Apellido:</span> <span className="text-GrisCasiOscuro"> {escultor.apellido}</span>
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(`/votar/${id_escultor}?token=${token}`)}
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
            <Carousel 
                  className="max-w-md mx-auto"
                  showThumbs={true} 
                  thumbWidth={100} // Ancho de las miniaturas
                >
                  {imagenes.length > 0 ? (
                    imagenes.map((imagen, index) => (
                      <div key={index}>
                        <img 
                          src={`http://localhost:3000/${imagen.imagen_url}`} 
                          alt={imagen.nombre}  
                          className="w-64 h-64 object-cover rounded-md shadow-md"
                        />
                        <p className="legend">{imagen.descripcion}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-GrisCasiOscuro">Este escultor no participa en el evento actual</p>
                  )}
              </Carousel>
          </div>
          
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-4 text-GrisMuyOscuro">Contacto</h3>
              <p><span className="font-bold text-GrisMuyOscuro">Email:</span> <span className='text-GrisCasiOscuro'>{escultor.email}</span></p>
              <p><span className="font-bold text-GrisMuyOscuro">Teléfono:</span> <span className='text-GrisCasiOscuro'>{escultor.telefono}</span></p>
            </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-GrisMuyOscuro hover:bg-grisOscuro text-white font-bold py-2 px-4 rounded"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default Biografia;