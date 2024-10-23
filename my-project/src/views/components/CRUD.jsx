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
        let url = '';
        switch (activeList) {
            case 'escultores':
                url = `http://localhost:3000/api/escultor/${id}`;
                break;
            case 'esculturas':
                url = `http://localhost:3000/api/esculturas/${id}`;
                break;
            case 'usuarios':
                url = `http://localhost:3000/api/usuario/${id}`;
                break;
            default:
                return;
        }

        try {
            await fetch(url, { method: 'DELETE' });
            if (activeList === 'escultores') {
                setEscultores(escultores.filter(item => item.id !== id));
            } else if (activeList === 'esculturas') {
                setEsculturas(esculturas.filter(item => item.id !== id));
            } else {
                setUsuarios(usuarios.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    // Filtrar los datos según el término de búsqueda y la lista activa
    const filteredItems = (activeList === 'escultores'
        ? escultores
        : activeList === 'esculturas'
        ? esculturas
        : usuarios
    ).filter((item) => 
        (item.nombre_esc || item.nombre).toLowerCase().includes(searchTerm.toLowerCase()) // Ajustar según el tipo de listado
    );

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
                        <button className="add-button" onClick={() => navigate('/Create')}>Agregar +</button>
                    </div>
                </header>
                <div className="list-container">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id} className="list-item">
                                {item.nombre_esc ? item.nombre_esc + ' ' + item.apellido : item.nombre}
                                <div className="action-buttons">
                                    <button className="action-button-delete" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                    <button className="action-button" onClick={() => navigate(`/modificar/${item.id}`)}>Modificar</button>
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
