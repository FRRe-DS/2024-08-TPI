import { useEffect, useState } from 'react';
import axios from 'axios';
import '/public/css/custom.css';

const Esculturas = () => {
    const [esculturas, setEsculturas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Función para abrir el modal con las imágenes de la escultura
    const openModal = (imagenes) => {
        setSelectedImages(imagenes);
        setCurrentImageIndex(0); // Comienza en la primera imagen
        setModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedImages([]);
    };

    // Función para navegar entre las imágenes del carrete
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < selectedImages.length - 1 ? prevIndex + 1 : 0
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : selectedImages.length - 1
        );
    };

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
                                    
                                    <div className="bg-gray-100 rounded-lg py-2 px-3 flex-1">
                                        <p className="text-sm text-wh font-black mt-2">
                                            <strong>Descripción:</strong> {escultura.descripcion}
                                        </p>
                                        {/* Botón para abrir el modal con las imágenes */}
                                        {escultura.imagenes && (
                                            <button
                                                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                                                onClick={() => openModal(escultura.imagenes)}
                                            >
                                                Ver imágenes
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500 mt-4">No se encontraron esculturas.</p>
            )}

            {/* Modal para ver imágenes */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-3xl relative">
                        <button
                            className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <div className="flex justify-center items-center">
                            <button
                                className="p-2 bg-gray-500 text-white rounded-full mr-4"
                                onClick={prevImage}
                            >
                                &#60;
                            </button>
                            <img
                                src={selectedImages[currentImageIndex]?.imagen_url}
                                alt={`Escultura ${currentImageIndex + 1}`}
                                className="w-full h-auto max-h-96 object-contain"
                            />
                            <button
                                className="p-2 bg-gray-500 text-white rounded-full ml-4"
                                onClick={nextImage}
                            >
                                &#62;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Esculturas;
