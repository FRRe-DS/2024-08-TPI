import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'semantic-ui-react';
import '/public/css/crud.css'; // Importa los estilos

export default function Search() {
    const [escultores, setEscultores] = useState([]);

    // Obtener la lista de escultores desde la API al cargar el componente
    useEffect(() => {
        fetchEscultores();
    }, []);

    const fetchEscultores = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/escultor/');
            setEscultores(response.data); // Asume que la API devuelve un array de escultores
        } catch (error) {
            console.error('Error al obtener los escultores:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este escultor?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/escultor/${id}`);
                alert('Escultor eliminado exitosamente');
                // Refrescar la lista después de eliminar
                fetchEscultores();
            } catch (error) {
                console.error('Error al eliminar el escultor:', error);
                alert('Error al eliminar el escultor. Inténtalo de nuevo.');
            }
        }
    };

    const handleEdit = (id) => {
        // Redirigir al formulario de edición del escultor (puedes cambiar la ruta según tu configuración)
        window.location.href = `/editar-escultor/${id}`;
    };

    return (
        <div>
            <h2>Listado de Escultores</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Apellido</Table.HeaderCell>
                        <Table.HeaderCell>Nacionalidad</Table.HeaderCell>
                        <Table.HeaderCell>Acciones</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {escultores.map((escultor) => (
                        <Table.Row key={escultor.id}>
                            <Table.Cell>{escultor.nombre}</Table.Cell>
                            <Table.Cell>{escultor.apellido}</Table.Cell>
                            <Table.Cell>{escultor.nacionalidad}</Table.Cell>
                            <Table.Cell>
                                <Button 
                                    color='yellow' 
                                    onClick={() => handleEdit(escultor.id)}
                                >
                                    Modificar
                                </Button>
                                <Button 
                                    color='red' 
                                    onClick={() => handleDelete(escultor.id)}
                                >
                                    Eliminar
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
