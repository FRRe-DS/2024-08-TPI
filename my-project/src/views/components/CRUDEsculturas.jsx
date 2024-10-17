import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import '/public/css/crud.css'; // Asegúrate de importar los estilos CSS

export default function CreateEscultura() {
    const [nombre, setNombre] = useState('');
    const [img_escultura, setImagen] = useState('');
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
            { value: 11, text: "Diciembre" },
        ];
        setMeses(mesesArray);

        const aniosArray = [];
        const anioActual = new Date().getFullYear();
        for (let i = 0; i <= 100; i++){ //Genera un rango de los ultimos 100 años
            aniosArray.push(anioActual - i);
        }
        setAnios(aniosArray);
    }, []);

    const postData = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        let invalidos = [];

        //Validacion de campos vacios
        if (!nombre) invalidos.push("Nombre");
        if (!tematica) invalidos.push("Tematica");
        if (!descripcion) invalidos.push("Descripcion");

        // Si hay campos inválidos, mostrar una alerta
        if (invalidos.length > 0) {
            alert("Por favor, completa los siguientes campos: " + invalidos.join(", "));
            return;
        }

        const fechaCreacion = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

        //Enviar datos a la API
        try {
            await axios.post('http://localhost:3000/api/esculturas/', {
                nombre,
                imagen,
                tematica,
                descripcion,
                fechaCreacion,
            });
            alert("Escultura creada exitosamente");

            //Limpiar los campos del formulario
            setNombre('');
            setImagen('');
            setTematica('');
            setDescripcion('');
            setDia('');
            setMes('');
            setAño('');
            } catch (error) {
                alert("Error al enviar los datos. Por favor, intenta de nuevo");
                console.error('Error al enviar los datos', error);

            }
        };

        return (
            <Form className="create-form" onSubmit={postDate}>
                <Form.Field>
                    <label>Nombre</label>
                    <input
                        placeholder='Ingrese Nombre' 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Field>
                <FormField>
                    <label>Imagen URL</label>
                    <input
                        placeholder='Ingrese URL de la imagen'
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                    />
                </FormField>
                <form.FormField>
                    <label>Descripcion</label>
                    <input
                        placeholder='Escriba una descripcion'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </form.FormField>
                <FormField>
                    <label>Fecha de creacion</label>
                    <div className="fecha-container">
                        <select value={dia} onChange={(e) => setDia(e.target.value)}>
                            <option value="">Dia</option>
                            {dias.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        <select value={mes} onChange={(e) => setMes(e.target.value)}>
                            <option value="">Mes</option>
                            {meses.map((d) => (
                                <option key={m.value} value={m.value}>{m.text}</option>
                            ))}
                        </select>
                        <select value={año} onChange={(e) => setAño(e.target.value)}>
                            <option value="">Año</option>
                            {anios.map((year) => (
                             <option key={year} value={year}>{year}</option>
                        ))}
                        </select>
                    </div>
                </FormField>
                <Button type='submit'>Enviar</Button>
            </Form>
        );
}

export default function ReadEsculturas() {
    const [esculturas, setEsculturas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/esculturas/')
        .then(response => {
            setEsculturas(response.data);
        })
        .catch(error => {
            console.error('Error al obtener las esculturas', error);
        });
    }, []);

    return (
        <div>
            <h2>Lista de Esculturas</h2>
            {esculturas.map(escultura => (
                <div key={escultura.id} className="card">
                    <h3>{escultura.nombre}</h3>
                    <img src={escultura.imagen} alt={escultura.nomre} width="200"/>
                    <p><strong>Temática:</strong> {escultura.tematica}</p>
                    <p><strong>Fecha de Creación:</strong> {escultura.fechaCreacion}</p>
                    <p><strong>Descripción:</strong> {escultura.descripcion}</p>
                </div>
            ))}
        </div>
    );
}
    

export default function UpdateEscultura({ esculturaId }) {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const [tematica, setTematica] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/api/escultura/${esculturaId}`)
            .then(response => {
                const { nombre, imagen, tematica, fechaCreacion, descripcion } = response.data;
                setNombre(nombre);
                setImagen(imagen);
                setTematica(tematica);
                setFechaCreacion(fechaCreacion);
                setDescripcion(descripcion);
            })
            .catch(error => {
                console.error('Error al cargar la escultura', error);
            });
    }, [esculturaId]);

    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/escultura/${esculturaId}`, {
                nombre,
                imagen,
                tematica,
                fechaCreacion,
                descripcion
            });
            alert('Escultura actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la escultura', error);
        }
    };

    return (
        <Form onSubmit={updateData}>
            <Form.Field>
                <label>Nombre</label>
                <input 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                />
            </Form.Field>
            <Form.Field>
                <label>Imagen (URL)</label>
                <input 
                    value={imagen} 
                    onChange={(e) => setImagen(e.target.value)} 
                />
            </Form.Field>
            <Form.Field>
                <label>Temática</label>
                <input 
                    value={tematica} 
                    onChange={(e) => setTematica(e.target.value)} 
                />
            </Form.Field>
            <Form.Field>
                <label>Fecha de Creación</label>
                <input 
                    type='date' 
                    value={fechaCreacion} 
                    onChange={(e) => setFechaCreacion(e.target.value)} 
                />
            </Form.Field>
            <Form.Field>
                <label>Descripción</label>
                <textarea 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                />
            </Form.Field>
            <Button type='submit'>Actualizar Escultura</Button>
        </Form>
    );
}

export default function DeleteEscultura({ esculturaId }) {
    const deleteData = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/escultura/${esculturaId}`);
            alert('Escultura eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la escultura', error);
        }
    };

    return (
        <button onClick={deleteData}>Eliminar Escultura</button>
    );
}




