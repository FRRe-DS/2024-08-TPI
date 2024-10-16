import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios'; // Asegúrate de tener axios importado
import nacionalidadesData from '/src/data/countries.json'; // Importa el archivo JSON
import '/public/css/formularios.css'; // Importa el CSS necesario

export default function Create() {
    const [nombre, setFirstName] = useState('');
    const [apellido, setLastName] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [url_img, setBanderaUrl] = useState(''); // Estado para la URL de la bandera
    const [nacionalidades, setNacionalidades] = useState([]);
    const [biografia, setBiografia] = useState(''); // Nuevo estado para la biografía

    useEffect(() => {
        // Mapear los datos del archivo JSON para el select
        const nacionalidadOptions = nacionalidadesData.map(country => ({
            key: country.alpha3,  // Usamos el código 'alpha3' como clave única
            text: country.name,    // El nombre del país que verá el usuario
            value: country.name,    // El valor que se guardará al seleccionar
            url_img: country.file_url // URL de la imagen de la bandera
        }));
        setNacionalidades(nacionalidadOptions);
    }, []);

    const postData = async () => {
        let invalidos = [];
    
        // Validación de campos vacíos
        if (!nombre) {
            invalidos.push("Nombre");
        }
        if (!apellido) {
            invalidos.push("Apellido");
        }
        if (!nacionalidad) {
            invalidos.push("Nacionalidad");
        }
        if (!biografia) {
            invalidos.push("Biografía");
        }
    
        // Validar que la biografía no exceda los 150 caracteres
        if (biografia.length > 150) {
            alert('La biografía no puede exceder los 150 caracteres.');
            return;
        }
    
        // Si hay campos inválidos, mostrar una alerta
        if (invalidos.length > 0) {
            alert("Por favor, completa los siguientes campos: " + invalidos.join(", "));
            return;
        }
    
        // Aquí puedes continuar con el envío de datos si todo es válido
        try {
            await axios.post('https://670f04d83e715186165655ba.mockapi.io/escultores', {
                nombre,
                apellido,
                nacionalidad,
                url_img, // Incluye la URL de la bandera en el post
                biografia // Asegúrate de incluir la biografía
            });
            console.log('Datos enviados correctamente');
            window.alert ("Carga de escultor realizada")
            // Limpiar los campos del formulario
            setFirstName('');
            setLastName('');
            setNacionalidad('');
            setBanderaUrl('');
            setBiografia('');

        } catch (error) {
            console.error('Error al enviar los datos', error);
        }
    };

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Nombre</label>
                    <input 
                        placeholder='Ingrese Nombre' 
                        value={nombre}
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
                            setNacionalidad(selectedCountry.value);
                            setBanderaUrl(selectedCountry.url_img); // Actualiza la URL de la bandera al seleccionar el país
                        }} 
                        className="ui dropdown"
                    >
                        <option value="">Seleccionar nacionalidad</option> {/* Opción por defecto */}
                        
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
                        maxLength={150} // Limita la longitud del texto a 200 caracteres
                    />
                </Form.Field>
                <Button onClick={postData} type='submit'>Enviar</Button>
            </Form>
        </div>
    );
}
