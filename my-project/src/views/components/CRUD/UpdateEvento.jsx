import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/public/css/crud.css';

export default function UpdateEvento() {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState(''); // Manejo como cadena para el calendario
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tematica, setTematica] = useState('');
    const [activo, setActivo] = useState(''); // Estado para el campo "activo"
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/eventos/${id}`);
                const { nombre, fecha, lugar, descripcion, tematica, activo } = response.data;
                setNombre(nombre);
                // Convertir la fecha a formato dd/mm/yyyy
                const fechaFormateada = new Date(fecha).toLocaleDateString('es-AR');
                setFecha(fechaFormateada); // Asignar la fecha formateada
                setLugar(lugar);
                setDescripcion(descripcion);
                setTematica(tematica);
                setActivo(activo === 'si' ? 'si' : 'no');
            } catch (error) {
                console.error('Error al cargar el evento', error);
            }
        };
        fetchEvento();
    }, [id]);

    const updateData = async (e) => {
        e.preventDefault();
        let invalidos = [];

        if (!nombre) invalidos.push("Nombre");
        if (!fecha) invalidos.push("Fecha");
        if (!lugar) invalidos.push("Lugar");
        if (!descripcion) invalidos.push("Descripción");
        if (!tematica) invalidos.push("Temática");

        if (invalidos.length > 0) {
            alert("Por favor, completa los siguientes campos: " + invalidos.join(", "));
            return;
        }

        try {
            // Convertir la fecha de nuevo al formato yyyy-mm-dd para la base de datos
            const fechaFormatoBD = fecha.split('/').reverse().join('-');
            await axios.put(`http://localhost:3000/api/eventos/${id}`, {
                nombre,
                fecha: fechaFormatoBD, // Enviar la fecha en formato yyyy-mm-dd
                lugar,
                descripcion,
                tematica,
                activo,
            });
            alert('Evento actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el evento', error);
            alert('Error al actualizar el evento');
        }
    };

    return (
        <Form className="create-form" onSubmit={updateData}>
            <FormField>
                <label>Nombre</label>
                <input
                    placeholder="Ingrese nombre del evento"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </FormField>
            <FormField>
                <label>Lugar</label>
                <input
                    placeholder="Ingrese el lugar del evento"
                    value={lugar}
                    onChange={(e) => setLugar(e.target.value)}
                />
            </FormField>
            <FormField>
                <label>Descripción</label>
                <input
                    placeholder="Escriba una descripción del evento"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </FormField>
            <FormField>
                <label>Temática</label>
                <input
                    placeholder="Ingrese la temática del evento"
                    value={tematica}
                    onChange={(e) => setTematica(e.target.value)}
                />
            </FormField>
            <FormField>
                <label>Fecha</label>
                <input
                    type="date"
                    value={fecha.split('/').reverse().join('-')} // Convertir de dd/mm/yyyy a yyyy-mm-dd
                    onChange={(e) => {
                        const nuevaFecha = e.target.value;
                        // Convertir la fecha seleccionada de nuevo a dd/mm/yyyy
                        const fechaFormateada = nuevaFecha.split('-').reverse().join('/');
                        setFecha(fechaFormateada);
                    }} 
                />
            </FormField>
            <FormField>
                <label>Activo</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="si"
                            checked={activo === 'si'}
                            onChange={() => setActivo('si')}
                        />
                        Sí
                    </label>
                    <label style={{ marginLeft: '10px' }}>
                        <input
                            type="radio"
                            value="no"
                            checked={activo === 'no'}
                            onChange={() => setActivo('no')}
                        />
                        No
                    </label>
                </div>
            </FormField>
            <div className="flex justify-between">
                <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                >
                    Ir Atrás
                </Button>
                <Button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                >
                    Actualizar
                </Button>
            </div>
        </Form>
    );
}
