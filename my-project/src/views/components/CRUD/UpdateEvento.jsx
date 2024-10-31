import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateEvento() {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tematica, setTematica] = useState('');

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/eventos/${id}`);
                const { nombre, fecha, lugar, descripcion, tematica } = response.data;
                setNombre(nombre);
                setFecha(fecha);
                setLugar(lugar);
                setDescripcion(descripcion);
                setTematica(tematica);
            } catch (error) {
                console.error('Error al cargar el evento', error);
            }
        };
        fetchEvento();
    }, [id]);

    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/eventos/${id}`, {
                nombre,
                fecha,
                lugar,
                descripcion,
                tematica,
            });
            alert('Evento actualizado correctamente');
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
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </FormField>
            <FormField>
                <label>Lugar</label>
                <input value={lugar} onChange={(e) => setLugar(e.target.value)} />
            </FormField>
            <FormField>
                <label>Descripción</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FormField>
            <FormField>
                <label>Temática</label>
                <input value={tematica} onChange={(e) => setTematica(e.target.value)} />
            </FormField>
            <Button type='submit'>Actualizar Evento</Button>
        </Form>
    );
}