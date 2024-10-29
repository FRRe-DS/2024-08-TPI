import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateEscultura() {
    const { id_escultura } = useParams();
    const [nombre, setNombre] = useState('');
    const [img_url, setImagenUrl] = useState('');
    const [tematica, setTematica] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        const fetchEscultura = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/escultura/${id_escultura}`);
                const { nombre, img_url, tematica, descripcion, fechaCreacion } = response.data;
                setNombre(nombre);
                setImagenUrl(img_url);
                setTematica(tematica);
                setDescripcion(descripcion);
                setFechaCreacion(fechaCreacion);
            } catch (error) {
                console.error('Error al cargar la escultura', error);
            }
        };
        fetchEscultura();
    }, [id_escultura]);

    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/escultura/${id_escultura}`, {
                nombre,
                img_url,
                tematica,
                descripcion,
                fechaCreacion,
            });
            alert('Escultura actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la escultura', error);
        }
    };

    return (
        <Form onSubmit={updateData}>
            <FormField>
                <label>Nombre</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FormField>
            <FormField>
                <label>Imagen (URL)</label>
                <input value={img_url} onChange={(e) => setImagenUrl(e.target.value)} />
            </FormField>
            <FormField>
                <label>Temática</label>
                <input value={tematica} onChange={(e) => setTematica(e.target.value)} />
            </FormField>
            <FormField>
                <label>Descripción</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FormField>
            <FormField>
                <label>Fecha de Creación</label>
                <input type='date' value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} />
            </FormField>
            <Button type='submit'>Actualizar Escultura</Button>
        </Form>
    );
}
