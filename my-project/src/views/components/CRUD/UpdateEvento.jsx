import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/public/css/crud.css'; // Asegúrate de que la ruta sea correcta

export default function UpdateEvento() {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState({ dia: '', mes: '', anio: '' });
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tematica, setTematica] = useState('');
    const [activo, setActivo] = useState(''); // Estado para el campo "activo"
    const [dias, setDias] = useState([]);
    const [meses, setMeses] = useState([]);
    const [anios, setAnios] = useState([]);

    const navigate = useNavigate();

    // Cargar los datos del evento a editar
    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/eventos/${id}`);
                const { nombre, fecha, lugar, descripcion, tematica, activo } = response.data;
                setNombre(nombre );
                const fechaArray = fecha.split('-');
                setFecha({ dia: fechaArray[2], mes: parseInt(fechaArray[1]), anio: parseInt(fechaArray[0]) });
                setLugar(lugar );
                setDescripcion(descripcion );
                setTematica(tematica );
                setActivo(activo === 'si' ? 'si' : 'no'); // Establecer estado inicial del campo "activo"
            } catch (error) {
                console.error('Error al cargar el evento', error);
            }
        };
        fetchEvento();

        // Inicializar días, meses y años
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
    }, [id]);

    // Enviar los datos actualizados
    const updateData = async (e) => {
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

        const fechaCreacion = `${fecha.anio}-${fecha.mes.toString().padStart(2, '0')}-${fecha.dia.toString().padStart(2, '0')}`;

        try {
            await axios.put(`http://localhost:3000/api/eventos/${id}`, {
                nombre,
                fecha: fechaCreacion,
                lugar,
                descripcion,
                tematica,
                activo: activo // Enviar "si" o "no"
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
                <Button type='submit' className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">Actualizar</Button>
            </div>
        </Form>
    );
}
