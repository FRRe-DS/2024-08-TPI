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
    const [pais, setPais] = useState('');
    const [nacionalidades, setNacionalidades] = useState([]);
    const [biografia, setBiografia] = useState('');
    const [imagen_esc, setImagenEsc] = useState('');
    const [imagenPreview, setImagenPreview] = useState(null);

    useEffect(() => {
        const nacionalidadOptions = nacionalidadesData.map(country => ({
            key: country.code,
            text: country.nombre,
            value: country.nombre,
        }));
        setNacionalidades(nacionalidadOptions);
    }, []);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagenEsc(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPreview(reader.result); // Guarda la URL de previsualización
            };
            reader.readAsDataURL(file);
        }
    };

    const postData = async (e) => {
        e.preventDefault();

        let invalidos = [];
        if (!nombre_esc) invalidos.push("Nombre");
        if (!apellido) invalidos.push("Apellido");
        if (!pais) invalidos.push("Pais");
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

        const formData = new FormData();
        formData.append("nombre_esc", nombre_esc);
        formData.append("apellido", apellido);
        formData.append("pais", pais);
        formData.append("biografia", biografia);
        formData.append("imagen_esc", imagen_esc);

        try {
            await axios.post('http://localhost:3000/api/escultor/', formData, {
                
            });
            console.log('Datos enviados correctamente');
            window.alert("Carga de escultor realizada");

            setFirstName('');
            setLastName('');
            setPais('');
            setBiografia('');
            setImagenEsc('');
            setImagenPreview(null);
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
                        value={pais} 
                        onChange={(e) => {
                            const selectedCountry = nacionalidades.find(country => country.value === e.target.value);
                            if (selectedCountry) {
                                setPais(selectedCountry.value);
                            }
                        }} 
                        className="ui dropdown"
                    >
                        <option value="">Seleccionar País</option>
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
                    <label>Seleccione la imagen del escultor</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImagenChange} 
                    />
                    {imagenPreview && (
                        <img 
                            src={imagenPreview} 
                            alt="Previsualización de la imagen" 
                            style={{ width: '100px', marginTop: '10px' }} 
                        />
                    )}
                </FormField>
                <Button type='submit'>Enviar</Button>
                <Button type='button' onClick={() => navigate(-1)}> Ir Atrás</Button>
            </Form>
        </div>
    );
}
