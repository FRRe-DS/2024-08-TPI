import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '/public/css/formularios.css';
import nacionalidadesData from '/src/data/countries.json'; // Asegúrate de importar el archivo JSON

export default function UpdateEscultor() {
    const { id_escultor } = useParams();
    const [nombre_esc, setFirstName] = useState('');
    const [apellido, setLastName] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [img_nacionalidad, setBanderaUrl] = useState('');
    const [nacionalidades, setNacionalidades] = useState([]);
    const [biografia, setBiografia] = useState('');
    const [imagen_esc, setImagenEsc] = useState('');

    // Cargar las nacionalidades para mostrar en el dropdown
    useEffect(() => {
        const nacionalidadOptions = nacionalidadesData.map(country => ({
            key: country.alpha3,
            text: country.name,
            value: country.name,
            img_nacionalidad: country.file_url
        }));
        setNacionalidades(nacionalidadOptions);
    }, []);

    // Cargar los datos del escultor a editar
    useEffect(() => {
        const fetchEscultor = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/escultor/${id_escultor}`);
                const { nombre_esc, apellido, nacionalidad, img_nacionalidad, biografia, imagen_esc } = response.data;
                setFirstName(nombre_esc || '');
                setLastName(apellido || '');
                setNacionalidad(nacionalidad || '');
                setBanderaUrl(img_nacionalidad || '');
                setBiografia(biografia || '');
                setImagenEsc(imagen_esc || '');
            } catch (error) {
                console.error('Error al cargar el escultor', error);
            }
        };
        fetchEscultor();
    }, [id_escultor]);

    // Enviar los datos actualizados
    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/escultor/${id_escultor}`, {
                nombre_esc,
                apellido,
                nacionalidad,
                img_nacionalidad,
                biografia,
                imagen_esc
            });
            alert('Escultor actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar al escultor', error);
        }
    };

    return (
        <Form onSubmit={updateData}>
            <FormField>
                <label>Nombre</label>
                <input value={nombre_esc} onChange={(e) => setFirstName(e.target.value)} />
            </FormField>
            <FormField>
                <label>Apellido</label>
                <input value={apellido} onChange={(e) => setLastName(e.target.value)} />
            </FormField>
            <FormField>
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
            </FormField>
            <FormField>
                <label>Biografía</label>
                <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} />
            </FormField>
            <FormField>
                <label>Imagen URL</label>
                <input placeholder='Ingrese URL de la imagen' value={imagen_esc} onChange={(e) => setImagenEsc(e.target.value)} />
            </FormField>
            <Button type='submit' >Actualizar Escultor</Button>
            <Button type='button' onClick={() => navigate(-1)}> Ir Atrás</Button>
        </Form>
    );
}
