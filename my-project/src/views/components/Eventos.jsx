import { useState, useEffect } from 'react';

// Componente para el modal de compartir
const ShareModal = ({ isOpen, onClose, evento }) => {
  const shareUrl = `http://localhost:3000/evento/${evento.id}`; // Suponiendo que esta es la URL del evento

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=¡Mira este evento! ${evento.nombre} - ${shareUrl}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };
  
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Compartir evento</h3>
          <div className="flex justify-around mb-4">
            {/* Icono de WhatsApp */}
            <button onClick={handleShareWhatsApp} className="flex items-center justify-center w-16 h-16">
              <img src="/public/img/whatsapp.png" alt="Compartir en WhatsApp" className="w-12 h-12" />
            </button>
            
            {/* Icono de Facebook */}
            <button onClick={handleShareFacebook} className="flex items-center justify-center w-16 h-16">
                <img src="/img/facebookCOMP.png" alt="Compartir en Facebook" className="w-12 h-12" />
            </button>

          </div>
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  );
};


const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/eventos');
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error('Error al traer los eventos', error);
      }
    };
    fetchEventos();
  }, []);

  // Función para formatear la fecha en formato dd/mm/aaaa
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Añade un 0 al día si es menor a 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0, por lo que sumamos 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para abrir el modal de compartir
  const handleOpenModal = (evento) => {
    setSelectedEvento(evento);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvento(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {eventos.map((evento) => (
        <div
          key={evento.id}
          className="h-80 relative bg-gradient-to-t from-[#9fa3a9] to-white shadow-md p-4 rounded-lg flex flex-col transition-all duration-300 hover:shadow-xl"
          style={{ maxHeight: '350px', minHeight: '350px', overflowY: 'auto' }} 
        >
          {/* Título del evento */}
          <div className="h-1/5 flex justify-center items-center mb-4">
            <h2 className="text-xl font-semibold text-center break-words">{evento.nombre}</h2>
          </div>

          {/* Detalles del evento */}
          <div className="h-1/2 grid grid-cols-1 gap-y-2 text-sm text-gray-700">
            <p>
              <strong>Temática:</strong> {evento.tematica}
            </p>
            <p>
              <strong>Fecha:</strong> {formatDate(evento.fecha)}
            </p>
            <p>
              <strong>Lugar:</strong> {evento.lugar}
            </p>
            <p>
              <strong>Estado:</strong> {evento.activo === 'si' ? 'Activo' : 'Inactivo'}
            </p>
            <p>
              <strong>Descripción:</strong> {evento.descripcion}
            </p>
          </div>


          {/* Botón para compartir */}
          <div className="h-1/8 mt-4 flex justify-center">
            <button
              onClick={() => handleOpenModal(evento)}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Compartir
            </button>
          </div>
        </div>
      ))}

      {/* Modal de compartir */}
      {isModalOpen && (
        <ShareModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          evento={selectedEvento}
        />
      )}
    </div>
  );
};

export default Eventos;
