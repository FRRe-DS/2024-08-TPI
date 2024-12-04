import { useEffect, useState } from 'react';
import axios from 'axios';
import '/public/css/custom.css';

const Esculturas = () => {
    const [esculturas, setEsculturas] = useState([]);

    useEffect(() => {
        const fetchEsculturas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/escultura');
                setEsculturas(response.data);
            } catch (error) {
                console.error('Error al obtener las esculturas', error);
            }
        };
        fetchEsculturas();
    }, []);

    return (
        <div className="esculturas-container">
            {esculturas.length > 0 ? (
                <div className="scroll-container">
                    {esculturas.map((escultura) => (
                        <div
                            key={escultura.id_escultura}
                            className="relative bg-gradient-to-t from-[#9fa3a9] to-white shadow-md p-4 rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-xl"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold text-black p-4">
                                {escultura.nombre}
                            </h2>
                            <div className="flex-1 flex">
                                {escultura.img_url && (
                                    <img
                                        src={escultura.img_url}
                                        alt={escultura.nombre}
                                        className="w-32 h-32 object-cover rounded-lg m-4"
                                    />
                                )}
                                <div className="flex-1 flex flex-col p-4">
                                    <p className="bg-gray-100 rounded-lg text-grisBIENnegro text-center text-md py-1 mb-2">
                                        <strong>Temática:</strong> {escultura.tematica}
                                    </p>
                                    <div className="bg-gray-100 rounded-lg py-2 px-3 flex-1">
                                        <p className="text-md font-semibold">
                                            <strong>Fecha de creación:</strong> {escultura.fecha_creacion}
                                        </p>
                                        <p className="text-sm text-wh font-black mt-2">
                                            <strong>Descripción:</strong> {escultura.descripcion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500 mt-4">No se encontraron esculturas.</p>
            )}
        </div>
    );
};

export default Esculturas;
