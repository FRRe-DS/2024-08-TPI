import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import nacionalidadesData from '/src/data/countries.json';
import '/public/css/formularios.css';
import '/public/css/crud.css';

export default function CreateEscultor() {
    const [nombreEsc, setNombreEsc] = useState('');
    const [apellido, setApellido] = useState('');
    const [pais, setPais] = useState('');
    const [nacionalidades, setNacionalidades] = useState([]);
    const [biografia, setBiografia] = useState('');
    const [imagenEsc, setImagenEsc] = useState('');
    const [imagenPreview, setImagenPreview] = useState(null);
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const nacionalidadOptions = nacionalidadesData.map((country) => ({
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
                setImagenPreview(reader.result); // Previsualiza la imagen seleccionada
            };
            reader.readAsDataURL(file);
        }
    };

    const postData = async (e) => {
        e.preventDefault();

        let invalidos = [];
        if (!nombreEsc) invalidos.push('Nombre');
        if (!apellido) invalidos.push('Apellido');
        if (!pais) invalidos.push('País');
        if (!biografia) invalidos.push('Biografía');
        if (!imagenEsc) invalidos.push('Imagen del escultor');
        if (!email) invalidos.push('Email');
        if (!telefono) invalidos.push('Teléfono');

        if (biografia.length > 150) {
            alert('La biografía no puede exceder los 150 caracteres.');
            return;
        }

        if (invalidos.length > 0) {
            alert('Por favor, completa los siguientes campos: ' + invalidos.join(', '));
            return;
        }

        const formData = new FormData();
        formData.append('nombre_esc', nombreEsc);
        formData.append('apellido', apellido);
        formData.append('pais', pais);
        formData.append('biografia', biografia);
        formData.append('imagen_esc', imagenEsc);
        formData.append('email', email);
        formData.append('telefono', telefono);

        try {
            await axios.post('http://localhost:3000/api/escultor/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Datos enviados correctamente');
            window.alert('Carga de escultor realizada');
            
            // Reiniciar formulario
            setNombreEsc('');
            setApellido('');
            setPais('');
            setBiografia('');
            setEmail('');
            setTelefono('');
            setImagenEsc('');
            setImagenPreview(null);
            navigate(-1);
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
                        placeholder="Ingrese Nombre"
                        value={nombreEsc}
                        onChange={(e) => setNombreEsc(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Apellido</label>
                    <input
                        placeholder="Ingrese Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Pais</label>
                    <select
                        value={pais}
                        onChange={(e) => {
                            const selectedCountry = nacionalidades.find(
                                (country) => country.value === e.target.value
                            );
                            if (selectedCountry) {
                                setPais(selectedCountry.value);
                            }
                        }}
                        className="ui dropdown"
                    >
                        <option value="">Seleccionar País</option>
                        {nacionalidades.map((country) => (
                            <option key={country.key} value={country.value}>
                                {country.text}
                            </option>
                        ))}
                    </select>
                </Form.Field>

                <Form.Field>
                    <label>Biografía</label>
                    <textarea
                        placeholder="Escriba una breve biografía (máx. 150 caracteres)"
                        value={biografia}
                        onChange={(e) => setBiografia(e.target.value)}
                        maxLength={150}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Ingrese Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Teléfono</label>
                    <input
                        type="tel"
                        placeholder="Ingrese Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </Form.Field>

                <FormField>
                    <label>Seleccione la imagen del escultor</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImagenChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {imagenPreview && (
                        <div className="mt-2">
                            <h4 className="text-gray-700">Previsualización de la imagen:</h4>
                            <img
                                src={imagenPreview}
                                alt="Previsualización de la imagen"
                                className="rounded-md"
                                style={{ width: '100px', marginTop: '10px' }}
                            />
                        </div>
                    )}
                </FormField>

                <div className="flex justify-between">
                    <Button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                    >
                        Ir Atrás
                    </Button>
                    <Button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                    >
                        Enviar
                    </Button>
                </div>
            </Form>
        </div>
    );
}
