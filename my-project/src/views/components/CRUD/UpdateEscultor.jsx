import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '/public/css/formularios.css';
import nacionalidadesData from '/src/data/countries.json'; // Asegúrate de importar el archivo JSON

export default function UpdateEscultor() {
    const { id_escultor } = useParams();
    const [nombre_esc, setFirstName] = useState('');
    const [apellido, setLastName] = useState('');
    const [pais, setPais] = useState('');
    const [nacionalidades, setNacionalidades] = useState([]);
    const [biografia, setBiografia] = useState('');
    const [imagen_esc, setImagenEsc] = useState('');
    const [imagenPreview, setImagenPreview] = useState(null); // Para previsualizar la imagen seleccionada
    const [email, setEmail] = useState(''); // Nuevo estado para el email
    const [telefono, setTelefono] = useState(''); // Nuevo estado para el teléfono

    const navigate = useNavigate(); // Para navegar a otra ruta

    // Cargar las nacionalidades para mostrar en el dropdown
    useEffect(() => {
        const nacionalidadOptions = nacionalidadesData.map(country => ({
            key: country.code,
            text: country.nombre,
            value: country.nombre,
        }));
        setNacionalidades(nacionalidadOptions);
    }, []);

    // Cargar los datos del escultor a editar
    useEffect(() => {
        const fetchEscultor = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/escultor/${id_escultor}`);
                const { nombre_esc, apellido, pais, biografia, imagen_esc, email, telefono } = response.data;
                setFirstName(nombre_esc);
                setLastName(apellido);
                setPais(pais);
                setBiografia(biografia);
                setImagenEsc(imagen_esc);
                setImagenPreview(imagen_esc); // Previsualizar la imagen existente
                setEmail(email); // Establecer email
                setTelefono(telefono); // Establecer teléfono
                console.log("Datos recibidos:", { nombre_esc, apellido, pais, biografia, imagen_esc, email, telefono });
            } catch (error) {
                console.error('Error al cargar el escultor', error);
            }
        };
        fetchEscultor();
    }, [id_escultor]);

    // Manejar la selección de una nueva imagen
    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file);
            setImagenEsc(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('URL de previsualización:', reader.result);
                setImagenPreview(reader.result); // Guarda la URL de previsualización
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Enviar los datos actualizados
    const updateData = async (e) => {
        e.preventDefault();
    
        let invalidos = [];
        if (!nombre_esc) invalidos.push("Nombre");
        if (!apellido) invalidos.push("Apellido");
        if (!pais) invalidos.push("Pais");
        if (!biografia) invalidos.push("Biografía");
        if (!imagen_esc) invalidos.push("Imagen escultor");
        if (!email) invalidos.push("Email"); // Validación para el email
        if (!telefono) invalidos.push("Teléfono"); // Validación para el teléfono
    
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
        formData.append("biografia", biografia);
        formData.append("pais", pais);
        formData.append("imagen_esc", imagen_esc);
        formData.append("email", email); // Añadir email a los datos
        formData.append("telefono", telefono); // Añadir teléfono a los datos
    
        try {
            await axios.put(`http://localhost:3000/api/escultor/${id_escultor}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Datos enviados correctamente');
            alert('Escultor actualizado correctamente');
            navigate(-1); // Navegar de regreso después de actualizar
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
            <Form.Field>
                <label>Pais</label>
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
            <FormField>
                <label>Biografía</label>
                <textarea 
                    value={biografia} 
                    onChange={(e) => setBiografia(e.target.value)}
                    maxLength={150}
                />
            </FormField>
            <FormField>
                <label>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    required
                />
            </FormField>
            <FormField>
                <label>Teléfono</label>
                <input 
                    type="tel" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                    placeholder="Teléfono"
                    required
                />
            </FormField>
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
                <Button type='button' onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none">Ir Atrás</Button>
                <Button type='submit' className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">Actualizar</Button>
            </div>
        </Form>
    );
}
