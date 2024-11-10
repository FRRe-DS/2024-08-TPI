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
                const { nombre_esc, apellido, pais, img_nacionalidad, biografia, imagen_esc } = response.data;
                setFirstName(nombre_esc || '');
                setLastName(apellido || '');
                setPais(pais || '');
                setBanderaUrl(img_nacionalidad || '');
                setBiografia(biografia || '');
                setImagenEsc(imagen_esc || '');
                setImagenPreview(imagen_esc); // Previsualizar la imagen existente
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
            setImagenEsc(file);
            const reader = new FileReader();
            reader.onloadend = () => {
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
            await axios.put(`http://localhost:3000/api/escultor/${id_escultor}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(formData)
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
            <Button type='submit'>Actualizar Escultor</Button>
            <Button type='button' onClick={() => navigate(-1)}> Ir Atrás</Button>
        </Form>
    );
}