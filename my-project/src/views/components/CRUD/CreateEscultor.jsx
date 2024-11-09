import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import nacionalidadesData from '/src/data/countries.json';
import '/public/css/formularios.css';
import '/public/css/crud.css';

export default function CreateEscultor() {
    const [nombre_esc, setFirstName] = useState('');
    const [apellido, setLastName] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [img_nacionalidad, setBanderaUrl] = useState('');
    const [nacionalidades, setNacionalidades] = useState([]);
    const [biografia, setBiografia] = useState('');
    const [imagen_esc, setImagenEsc] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const nacionalidadOptions = nacionalidadesData.map(country => ({
            key: country.alpha3,
            text: country.name,
            value: country.name,
            img_nacionalidad: country.file_url
        }));
        setNacionalidades(nacionalidadOptions);
    }, []);

    const postData = async (e) => {
        e.preventDefault();
        let invalidos = [];

        if (!nombre_esc) invalidos.push("Nombre");
        if (!apellido) invalidos.push("Apellido");
        if (!nacionalidad) invalidos.push("Nacionalidad");
        if (!biografia) invalidos.push("Biografía");
        if (!imagen_esc) invalidos.push("Imagen escultor");

        if (biografia.length > 150) {
            alert('La biografía no puede exceder los 150 caracteres.');
            return;
        }

        if (invalidos.length > 0) {
            alert("Por favor, completa los siguientes campos: " + invalidos.join(", "));
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/escultor/', {
                nombre_esc,
                apellido,
                nacionalidad,
                img_nacionalidad, 
                biografia,
                imagen_esc
            });
            console.log('Datos enviados correctamente');
            window.alert("Carga de escultor realizada");

            setFirstName('');
            setLastName('');
            setNacionalidad('');
            setBanderaUrl('');
            setBiografia('');
            setImagenEsc('');
        } catch (error) {
            console.error('Error al enviar los datos', error);
            alert('Error al enviar los datos. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div>
            <Form className="create-form" onSubmit={postData}>
                <Form.Field>
                    <label>Nombre</label>
                    <input 
                        placeholder='Ingrese Nombre' 
                        value={nombre_esc}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Apellido</label>
                    <input 
                        placeholder='Ingrese Apellido' 
                        value={apellido}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nacionalidad</label>
                    <select 
                        value={nacionalidad} 
                        onChange={(e) => {
                            const selectedCountry = nacionalidades.find(country => country.value === e.target.value);
                            if (selectedCountry) {
                                setNacionalidad(selectedCountry.value);
                                setBanderaUrl(selectedCountry.img_nacionalidad);
                            }
                        }} 
                        className="ui dropdown"
                    >
                        <option value="">Seleccionar nacionalidad</option>
                        {nacionalidades.map(country => (
                            <option key={country.key} value={country.value}>
                                {country.text}
                            </option>
                        ))}
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Biografía</label>
                    <textarea 
                        placeholder='Escriba una breve biografía (máx. 150 caracteres)' 
                        value={biografia}
                        onChange={(e) => setBiografia(e.target.value)}
                        maxLength={150}
                    />
                </Form.Field>
                <FormField>
                    <label>Imagen URL</label>
                    <input placeholder='Ingrese URL de la imagen' value={imagen_esc} onChange={(e) => setImagenEsc(e.target.value)} />
                </FormField>
                <Button type='submit'>Enviar</Button>
                <Button type='button' onClick={() => navigate(-1)}> Ir Atrás</Button>
            </Form>
        </div>
    );
}
