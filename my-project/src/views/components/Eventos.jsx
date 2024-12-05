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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {eventos.map((evento) => (
                <div
                    key={evento.id}
                    className="relative bg-gradient-to-t from-[#9fa3a9] to-white shadow-md p-4 rounded-lg flex flex-col transition-all duration-300 hover:shadow-xl"
                    style={{ maxHeight: '300px', overflowY: 'auto' }} 
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
                            <strong>Fecha:</strong> {evento.fecha}
                        </p>
                        <p>
                            <strong>Lugar:</strong> {evento.lugar}
                        </p>
                        <p className="text-black">{evento.descripcion}</p>
                        <p className = ""></p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Eventos;
