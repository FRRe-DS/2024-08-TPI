import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '/public/css/crud.css'; // Asegúrate de que la ruta sea correcta

function Crud() {
    const navigate = useNavigate();
    const [escultores, setEscultores] = useState([]);
    const [esculturas, setEsculturas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador
    const [activeList, setActiveList] = useState('escultores'); // Estado para controlar qué listado mostrar

    // Función para traer escultores desde el backend
    useEffect(() => {
        const fetchEscultores = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/escultor'); // Asegúrate de que la URL sea correcta
                const data = await response.json();
                setEscultores(data);
            } catch (error) {
                console.error('Error al traer los escultores', error);
            }
        };
        fetchEscultores();
    }, []);

    // Función para traer esculturas desde el backend
    useEffect(() => {
        const fetchEsculturas = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/escultura'); // Cambia a la URL correcta para esculturas
                const data = await response.json();
                setEsculturas(data);
            } catch (error) {
                console.error('Error al traer las esculturas', error);
            }
        };
        fetchEsculturas();
    }, []);

    // Función para traer usuarios desde el backend
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/usuario'); // Cambia a la URL correcta para usuarios
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Error al traer los usuarios', error);
            }
        };
        fetchUsuarios();
    }, []);

    // Función para manejar la eliminación (escultores, esculturas, usuarios)
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este elemento?');
        if (!confirmDelete) return; // Si el usuario cancela, no se realiza la eliminación.

        let url = '';
        switch (activeList) {
            case 'escultores':
                url = `http://localhost:3000/api/escultor/${id}`;
                break;
            case 'esculturas':
                url = `http://localhost:3000/api/escultura/${id}`;
                break;
            case 'usuarios':
                url = `http://localhost:3000/api/usuario/${id}`;
                break;
            default:
                return;
        }

        try {
            await fetch(url, { method: 'DELETE' });
        
            let mensaje = '';  // Inicializar variable para el mensaje
        
            if (activeList === 'escultores') {
                setEscultores(escultores.filter(item => item.id_escultor !== id));
                mensaje = 'Se ha eliminado correctamente al escultor';
            } else if (activeList === 'esculturas') {
                setEsculturas(esculturas.filter(item => item.id_escultura !== id));
                mensaje = 'Se ha eliminado correctamente la escultura';
            } else if (activeList === 'usuarios') {
                setUsuarios(usuarios.filter(item => item.id_usuario !== id));
                mensaje = 'Se ha eliminado correctamente al usuario';
            }
        
            alert(mensaje);  // Mostrar mensaje de éxito
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    // Filtrar resultados en base al término de búsqueda
    const filteredItems = (activeList === 'escultores'
        ? escultores
        : activeList === 'esculturas'
        ? esculturas
        : usuarios
    ).filter((item) => 
        (item.nombre_esc || item.nombre).toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    // Función para redirigir al formulario de creación
    const handleAdd = () => {
        switch (activeList) {
            case 'escultores':
                navigate('/create');
                break;
            case 'esculturas':
                navigate('/create-escultura');
                break;
            case 'usuarios':
                navigate('/create-usuario');
                break;
            default:
                break;
        }
    };

    return (
        <div className="crud-container">
            <div className="sidebar">
                <button className="sidebar-button" onClick={() => setActiveList('escultores')}>Escultores</button>
                <button className="sidebar-button" onClick={() => setActiveList('esculturas')}>Esculturas</button>
                <button className="sidebar-button" onClick={() => setActiveList('usuarios')}>Usuarios</button>
            </div>
            <div className="main-section">
                <header className="header">
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Buscador" 
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                        />
                        <button className="add-button" onClick={handleAdd}>Agregar +</button>
                    </div>
                </header>
                <div className="list-container">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id_escultor || item.id_escultura || item.id_usuario} className="list-item">
                                {item.nombre_esc ? item.nombre_esc + ' ' + item.apellido : item.nombre}
                                <div className="action-buttons">
                                    <button className="action-button-delete" onClick={() => handleDelete(item.id_escultor || item.id_escultura || item.id_usuario)}>Eliminar</button>
                                    <button className="action-button"
                                            onClick={() => {
                                                switch (activeList) {
                                                case 'escultores':
                                                    navigate(`/modificar-escultor/${item.id_escultor}`); 
                                                    break;
                                                case 'esculturas':
                                                    navigate(`/modificar-escultura/${item.id_escultura}`); 
                                                    break;
                                                case 'usuarios':
                                                    navigate(`/modificar-usuario/${item.id_usuario}`); 
                                                    break;
                                                default:
                                                    break;
                                                }
                                            }}
                                    >Modificar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay elementos disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Crud;

