import { useState } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/public/css/crud.css';
export default function CreateEvento() {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState(''); // Usar una cadena directamente
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tematica, setTematica] = useState('');
    const [activo, setActivo] = useState('si'); // Estado inicial para "activo"
    const navigate = useNavigate
    const handleSubmit = async (e) => {
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
            await axios.post('http://localhost:3000/api/eventos/', {
                nombre,
                fecha, // Ya está en el formato YYYY-MM-DD
                lugar,
                descripcion,
                tematica,
                activo, // Enviar el valor del estado "activo"
            });
            alert("Evento creado exitosamente");
            navigate(-1)
            // Reiniciar el formulario
            setNombre('');
            setFecha('');
            setLugar('');
            setDescripcion('');
            setTematica('');
            setActivo('si'); // Restablecer el estado inicial de "activo"
        } catch (error) {
            alert("Error al enviar los datos. Por favor, intenta de nuevo");
            console.error('Error al enviar los datos', error);
        }
    };

    return (
        <Form className="create-form" onSubmit={handleSubmit}>
            <FormField>
                <label>Nombre</label>
                <input placeholder='Ingrese nombre del evento' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FormField>
            <FormField>
                <label>Lugar</label>
                <input placeholder='Ingrese el lugar del evento' value={lugar} onChange={(e) => setLugar(e.target.value)} />
            </FormField>
            <FormField>
                <label>Descripción</label>
                <input placeholder='Escriba una descripción del evento' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FormField>
            <FormField>
                <label>Temática</label>
                <input placeholder='Ingrese la temática del evento' value={tematica} onChange={(e) => setTematica(e.target.value)} />
            </FormField>
            <FormField>
                <label>Fecha</label>
                <input
                    type='date'
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)} // Actualizar directamente la cadena de fecha
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
                    <Button type='button' onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"> Ir Atrás</Button>
                    <Button type='submit' className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">Enviar</Button>
                </div>
        </Form>
    );
}

