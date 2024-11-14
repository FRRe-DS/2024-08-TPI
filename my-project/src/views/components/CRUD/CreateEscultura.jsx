import { useState, useEffect } from 'react';
import axios from 'axios';
import '/public/css/crud.css';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function CreateEscultura() {
    const [nombre, setNombre] = useState('');
    const [imgFiles, setImgFiles] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [escultores, setEscultores] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [selectedEscultor, setSelectedEscultor] = useState(null);
    const [selectedEvento, setSelectedEvento] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/escultor')
            .then(response => {
                setEscultores(response.data.map((escultor) => ({
                    key: escultor.id,
                    text: `${escultor.nombre_esc} ${escultor.apellido}`,
                    value: escultor.id,
                })));
            })
            .catch(error => console.error('Error al cargar los escultores', error));

        axios.get('http://localhost:3000/api/eventos')
            .then(response => {
                setEventos(response.data.map((evento) => ({
                    key: evento.id,
                    text: evento.nombre,
                    value: evento.id,
                })));
            })
            .catch(error => console.error('Error al cargar los eventos', error));
    }, []);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImgFiles(prevFiles => [...prevFiles, ...selectedFiles]); // Agrega nuevos archivos sin eliminar los anteriores
    };

    const postData = async (e) => {
        e.preventDefault();

        const camposFaltantes = [];
        if (!nombre) camposFaltantes.push("Nombre");
        if (!descripcion) camposFaltantes.push("Descripción");
        if (!selectedEscultor) camposFaltantes.push("Escultor");
        if (!selectedEvento) camposFaltantes.push("Evento");

        if (camposFaltantes.length > 0) {
            alert(`Por favor, completa los siguientes campos: ${camposFaltantes.join(", ")}`);
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('id_evento', selectedEvento);
        formData.append('id_escultor', selectedEscultor);

        imgFiles.forEach(file => {
            formData.append('imagenes', file);
        });

        try {
            await axios.post('http://localhost:3000/api/escultura/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Escultura creada exitosamente");

            setNombre('');
            setImgFiles([]);
            setDescripcion('');
            setSelectedEscultor(null);
            setSelectedEvento(null);
        } catch (error) {
            alert("Error al enviar los datos. Por favor, intenta de nuevo");
            console.error('Error al enviar los datos', error);
        }
    };

    return (
        <form className="create-form" onSubmit={postData}>
            <div className="mb-4">
                <label className="block text-gray-700">Escultor</label>
                <select
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={selectedEscultor || ''}
                    onChange={(e) => setSelectedEscultor(e.target.value)}
                >
                    <option value="">Selecciona un escultor</option>
                    {escultores.map((escultor) => (
                        <option key={escultor.key} value={escultor.value}>
                            {escultor.text}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                    type="text"
                    placeholder="Ingrese nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Imágenes</label>
                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {imgFiles.length > 0 && (
                    <div className="mt-2">
                        <h4 className="text-gray-700">Imágenes seleccionadas:</h4>
                        {imgFiles.map((file, index) => (
                            <p key={index} className="text-gray-600">{file.name}</p>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Descripción de la Temática</label>
                <textarea
                    placeholder="Escriba una descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Evento</label>
                <select
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={selectedEvento || ''}
                    onChange={(e) => setSelectedEvento(e.target.value)}
                >
                    <option value="">Selecciona un evento</option>
                    {eventos.map((evento) => (
                        <option key={evento.key} value={evento.value}>
                            {evento.text}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between">
                <Button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                >
                    Enviar
                </Button>
                <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                >
                    Ir Atrás
                </Button>
            </div>
        </form>
    );
}
