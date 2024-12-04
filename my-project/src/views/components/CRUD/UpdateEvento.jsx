import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '/public/css/formularios.css';

export default function UpdateEvento() {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tematica, setTematica] = useState('');

    const navigate = useNavigate();

    // Cargar los datos del escultor a editar
    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/eventos/${id}`);
                const { nombre, fecha, lugar, descripcion, tematica } = response.data;
                setNombre(nombre || '');
                setFecha(fecha || '');
                setLugar(lugar || '');
                setDescripcion(descripcion || '');
                setTematica(tematica || '');
                
            } catch (error) {
                console.error('Error al cargar el evento', error);
            }
        };
        fetchEvento();
    }, [id]);

    // Enviar los datos actualizados
    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/eventos/${id}`, {
                nombre,
                fecha,
                lugar,
                descripcion,
                tematica
            });
            alert('Evento actualizado correctamente');
            navigate(-1);
        } catch (error) {
            console.error('Error al actualizar el evento', error);
        }
    };

    return (
        <Form onSubmit={updateData}>
            <FormField>
                <label>Nombre</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FormField>
            <FormField>
                <label>Fecha</label>
                <input type='date' value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </FormField>
            <FormField>
                <label>Lugar</label>
                <input value={lugar} onChange={(e) => setLugar(e.target.value)} />
            </FormField>
            <FormField>
                <label>Descripcion</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FormField>
            <FormField>
                <label>Tematica</label>
                <input value={tematica} onChange={(e) => setTematica(e.target.value)} />
            </FormField>
            <Button type='submit'>Actualizar Evento</Button>
        </Form>
    );
}
