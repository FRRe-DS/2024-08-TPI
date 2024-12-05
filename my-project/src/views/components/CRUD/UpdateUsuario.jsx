import { useState, useEffect } from 'react';
import { Button, Form, FormField } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/public/css/crud.css'; // Asegúrate de que la ruta sea correcta

export default function UpdateUsuario() {
    const { email } = useParams();
    const [role, setRole] = useState(''); // Estado para el campo "activo"
  

    const navigate = useNavigate();

    // Cargar los datos del evento a editar
    useEffect(() => {
        const fetchUsers= async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${email}`);
                const { role } = response.data;
                setRole(role === 'user' ? 'user' : 'admin'); // Establecer estado inicial del campo "activo"
            } catch (error) {
                console.error('Error al cargar el evento', error);
            }
        };
        fetchUsers();
    }, [email]);

    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/${email}`, {
                role: role 
            });
            alert('Usuario actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el Usuario', error);
            alert('Error al actualizar el Usuario');
        }
    };

return (
    <Form className="create-form" onSubmit={updateData}>
    <FormField>
                <label>Rol del Usuario</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="user"
                            checked={role === 'user'}
                            onChange={() => setRole('user')}
                        />
                        User
                    </label>
                    <label style={{ marginLeft: '10px' }}>
                        <input
                            type="radio"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                        />
                        Admin
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