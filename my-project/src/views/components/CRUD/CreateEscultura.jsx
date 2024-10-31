import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import '/public/css/crud.css'; 

export default function CreateEscultura() {
    const [nombre, setNombre] = useState('');
    const [img_url, setImagenUrl] = useState('');
    const [tematica, setTematica] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [anio, setAnio] = useState('');
    const [dias, setDias] = useState([]);
    const [meses, setMeses] = useState([]);
    const [anios, setAnios] = useState([]);

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

    const postData = async (e) => {
        e.preventDefault();
        let invalidos = [];

        if (!nombre) invalidos.push("Nombre");
        if (!tematica) invalidos.push("Temática");
        if (!descripcion) invalidos.push("Descripción");

        if (invalidos.length > 0) {
            alert("Por favor, completa los siguientes campos: " + invalidos.join(", "));
            return;
        }

        const fechaCreacion = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`; // Formato YYYY-MM-DD

        try {
            await axios.post('http://localhost:3000/api/escultura/', {
                nombre,
                img_url,
                tematica,
                descripcion,
                fecha_creacion: fechaCreacion, // Envía la fecha formateada
            });
            alert("Escultura creada exitosamente");
            setNombre('');
            setImagenUrl('');
            setTematica('');
            setDescripcion('');
            setDia('');
            setMes('');
            setAnio('');
        } catch (error) {
            alert("Error al enviar los datos. Por favor, intenta de nuevo");
            console.error('Error al enviar los datos', error);
        }
    };

    return (
        <Form className="create-form" onSubmit={postData}>
            <FormField>
                <label>Nombre</label>
                <input placeholder='Ingrese nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FormField>
            <FormField>
                <label>Imagen URL</label>
                <input placeholder='Ingrese URL de la imagen' value={img_url} onChange={(e) => setImagenUrl(e.target.value)} />
            </FormField>
            <FormField>
                <label>Temática</label>
                <input placeholder='Ingrese temática' value={tematica} onChange={(e) => setTematica(e.target.value)} />
            </FormField>
            <FormField>
                <label>Descripción</label>
                <input placeholder='Escriba una descripción' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FormField>
            <FormField>
                <label>Fecha de creación</label>
                <div className="fecha-container">
                    <select value={dia} onChange={(e) => setDia(e.target.value)}>
                        <option value="">Día</option>
                        {dias.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={mes} onChange={(e) => setMes(e.target.value)}>
                        <option value="">Mes</option>
                        {meses.map((m) => <option key={m.value} value={m.value}>{m.text}</option>)}
                    </select>
                    <select value={anio} onChange={(e) => setAnio(e.target.value)}>
                        <option value="">Año</option>
                        {anios.map((year) => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </FormField>
            <Button type='submit'>Crear Escultura</Button>
        </Form>
    );
}
