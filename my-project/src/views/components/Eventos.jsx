import { useState, useEffect } from 'react';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {eventos.map((evento) => (
                <div
                    key={evento.id}
                    className="relative bg-gradient-to-t from-[#9fa3a9] to-white shadow-md p-4 rounded-lg flex flex-col transition-all duration-300 hover:shadow-xl"
                    style={{ maxHeight: '350px', minHeight: '350px', overflowY: 'auto' }} 
                >
                    {/* Título del evento */}
                    <div className="flex justify-center items-center mb-4">
                        <h2 className="text-xl font-semibold text-center break-words">{evento.nombre}</h2>
                    </div>

                    {/* Detalles del evento */}
                    <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-700">
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

                    {/* Botón para ver resultados */}
                    <div className="mt-auto">
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={() => alert('Ver resultados del evento')}
                        >
                            Ver resultados
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Eventos;
