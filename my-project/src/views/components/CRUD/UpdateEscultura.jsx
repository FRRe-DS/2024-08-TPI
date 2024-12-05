import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateEscultura() {
    const { id_escultura } = useParams();
    const [nombre, setNombre] = useState('');
    const [imgFiles, setImgFiles] = useState([]);
    const [tematica, setTematica] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [eventos, setEventos] = useState([]);
    const [selectedEvento, setSelectedEvento] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEscultura = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/escultura/${id_escultura}`);
                const { nombre, tematica, descripcion, fechaCreacion, id_evento } = response.data;
                setNombre(nombre);
                setTematica(tematica);
                setDescripcion(descripcion);
                setFechaCreacion(fechaCreacion);
                setSelectedEvento(id_evento);
            } catch (error) {
                console.error('Error al cargar la escultura', error);
            }
        };
        fetchEscultura();
    }, [id_escultura]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/eventos');
                setEventos(response.data.map((evento) => ({
                    key: evento.id,
                    text: evento.nombre,
                    value: evento.id,
                })));
            } catch (error) {
                console.error('Error al cargar los eventos', error);
            }
        };
        fetchEventos();
    }, []);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImgFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const updateData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('tematica', tematica);
        formData.append('descripcion', descripcion);
        formData.append('fechaCreacion', fechaCreacion);
        formData.append('id_evento', selectedEvento);

        imgFiles.forEach(file => {
            formData.append('imagenes', file);
        });

        try {
            await axios.put(`http://localhost:3000/api/escultura/${id_escultura}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Escultura actualizada correctamente');
            navigate(-1);
        } catch (error) {
            console.error('Error al actualizar la escultura', error);
            alert('Error al actualizar la escultura');
        }
    };

    return (
        <Form onSubmit={updateData}>
            <FormField>
                <label>Nombre</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FormField>
            <FormField>
                <label>Imágenes</label>
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
            </FormField>

            <FormField>
                <label>Descripción</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FormField>
            <FormField>
                <label>Fecha de Creación</label>
                <input type='date' value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} />
            </FormField>
            <FormField>
                <label>Evento</label>
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
            </FormField>
            <div className="flex justify-between">
                <Button type="button" onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none">Ir Atrás</Button>
                <Button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-indigo-700 focus:outline-none">Actualizar</Button>
            </div>
        </Form>
    );
}