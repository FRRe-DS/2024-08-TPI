import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/public/css/crud.css';
export default function CreateEvento() {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState({ dia: '', mes: '', anio: '' });
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tematica, setTematica] = useState('');
    const [dias, setDias] = useState([]);
    const [meses, setMeses] = useState([]);
    const [anios, setAnios] = useState([]);
    
    const navigate= useNavigate();

    useEffect(() => {
        const diasArray = [...Array(31)].map((_, index) => index + 1);
        setDias(diasArray);

        const mesesArray = [
            { value: 1, text: "Enero" },
            { value: 2, text: "Febrero" },
            { value: 3, text: "Marzo" },
            { value: 4, text: "Abril" },
            { value: 5, text: "Mayo" },
            { value: 6, text: "Junio" },
            { value: 7, text: "Julio" },
            { value: 8, text: "Agosto" },
            { value: 9, text: "Septiembre" },
            { value: 10, text: "Octubre" },
            { value: 11, text: "Noviembre" },
            { value: 12, text: "Diciembre" },
        ];
        setMeses(mesesArray);

        const aniosArray = [];
        const anioActual = new Date().getFullYear();
        for (let i = 0; i <= 100; i++) { 
            aniosArray.push(anioActual - i);
        }
        setAnios(aniosArray);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let invalidos = [];

        if (!nombre) invalidos.push("Nombre");
        if (!lugar) invalidos.push("Lugar");
        if (!descripcion) invalidos.push("Descripción");
        if (!tematica) invalidos.push("Temática");

        if (invalidos.length > 0) {
            alert("Por favor, completa los siguientes campos: " + invalidos.join(", "));
            return;
        }

        const fechaCreacion = `${fecha.anio}-${fecha.mes.padStart(2, '0')}-${fecha.dia.padStart(2, '0')}`; 

        try {
            await axios.post('http://localhost:3000/api/eventos/', {
                nombre,
                fecha: fechaCreacion,
                lugar,
                descripcion,
                tematica,
            });
            alert("Evento creado exitosamente");
            setNombre('');
            setFecha({ dia: '', mes: '', anio: '' });
            setLugar('');
            setDescripcion('');
            setTematica('');
            navigate(-1);
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
                <label>Fecha del Evento</label>
                <div className="fecha-container">
                    <select value={fecha.dia} onChange={(e) => setFecha({ ...fecha, dia: e.target.value })}>
                        <option value="">Día</option>
                        {dias.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={fecha.mes} onChange={(e) => setFecha({ ...fecha, mes: e.target.value })}>
                        <option value="">Mes</option>
                        {meses.map((m) => <option key={m.value} value={m.value}>{m.text}</option>)}
                    </select>
                    <select value={fecha.anio} onChange={(e) => setFecha({ ...fecha, anio: e.target.value })}>
                        <option value="">Año</option>
                        {anios.map((year) => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </FormField>
            <Button type='submit'>Crear Evento</Button>
        </Form>
    );
}