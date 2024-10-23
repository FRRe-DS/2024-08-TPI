import { useState, useEffect } from 'react';

const Escultores = () => {
  const [escultores, setEscultores] = useState([]);

  useEffect(() => {
    const fetchEscultores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/escultor'); // URL corregida
        const data = await response.json();
        setEscultores(data);
      } catch (error) {
        console.error('Error al traer los escultores', error);
      }
    };
    fetchEscultores();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-10">
      {escultores.map((escultor) => (
        <div key={escultor.id} className="relative shadow-lg p-3 rounded-lg max-w-xs bg-customGray">
          {/* Bandera o imagen de la nacionalidad */}
          <img
            className="absolute top-1 left-4 w-10 h-6 "
            src={escultor.img_nacionalidad} // Acceso correcto al campo de imagen de la nacionalidad
            alt={`Bandera de ${escultor.nacionalidad}`} // Alt text con la nacionalidad
          />

          {/* Imagen de perfil del escultor */}
          <img
            className="w-24 h-24 mx-auto mb-5 "
            src={escultor.imagen_esc} // Imagen del escultor
            alt={escultor.nombre_esc + escultor.apellido} // Alt text con el nombre del escultor
          />

          {/* Información del escultor */}
          <div className="text-center">
            <h2 className="text-xl font-semibold">{escultor.nombre_esc + " " + escultor.apellido}</h2>
            <p className="text-grisOscuro">{escultor.nacionalidad}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Escultores;
