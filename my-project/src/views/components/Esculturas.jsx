import { useEffect, useState } from 'react';
import axios from 'axios';
import '/public/css/esculturas.css';
import { useNavigate } from 'react-router-dom';

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
    
    const navigate = useNavigate();
    const handleEscultor = (escultura) => {
        navigate(`/biografia/${escultura.id_escultor}`);
    };
    
    return (
        <div className="container relative">
            <div className="overflow-y-auto h-[80vh] p-4 mt-4 " >
                
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {esculturas.map((escultura) => (
                    <div
                    key={escultura.id_escultura}
                    className="h-80 card relative bg-gradient-to-t from-[#9fa3a9] to-[#1f2124] shadow-md p-4 rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-xl"
                    >
                    <div className="card-header h-fit mb-2">
                        <h2 className="text-center text-lg font-semibold text-gray-300">
                            {escultura.nombre}
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="image-container">
                            <img
                            className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-md object-cover shadow-md"
                            src=""
                            alt={escultura.nombre_esc}
                            />
                        </div>
                        <div className="description-container">
                            <div className="description-body w-full">
                                <p className="overflow-hidden text-lg text-center">{escultura.descripcion}</p>
                            </div>

                            <div className="description-footer">  
                                <p>Fecha de creación: {escultura.fecha_creacion}</p>  
                                <p>Evento: {escultura.id_evento}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className=" mb-0 w-full flex flex-col sm:flex-row justify-around ">
                            <button
                                className="bg-grisOscuro text-white rounded px-4 py-2 hover:bg-gray-700 transition duration-200 w-full sm:w-auto"
                                onClick={() => handleEscultor(escultura)}
                            >
                                Ver escultor
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

export default Esculturas;

/*<div className="esculturas-container">
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
        </div>*/