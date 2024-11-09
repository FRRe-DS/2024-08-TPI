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
                const response = await fetch('http://localhost:3000/api/usuarios'); // Cambia a la URL correcta para usuarios
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
                <button className="sidebar-button bg-[#444444] list-item text-3xl dark:text-white" onClick={() => setActiveList('escultores')}>Escultores</button>
                <button className="sidebar-button bg-[#444444] list-item text-3xl dark:text-white" onClick={() => setActiveList('esculturas')}>Esculturas</button>
                <button className="sidebar-button bg-[#444444] list-item text-3xl dark:text-white" onClick={() => setActiveList('usuarios')}>Eventos</button>

            </div>
            <div className="main-section">
                <header className="header bg-transparent">
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Buscador" 
                            className="search-input p-2.5 text-sm text-white rounded-lg bg-[#222222] focus:border-[#393d42] "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                        />
                        <button 
                            type="button" 
                            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-l px-6 py-2 mt-4 mb-4 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                            onClick={handleAdd}
                        >
                            AGREGAR +
                        </button>
                    </div>
                </header>
                <div className="list-container">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id} className="flex justify-between bg-[#222222] mb-2 items-center text-2xl dark:text-white pr-3">
                            <div className="text-center mx-5 items-center text-2xl">  
                                {item.nombre_esc ? `${item.nombre_esc} ${item.apellido}` : item.nombre}
                            </div>       
                                <div className="action-buttons">
                                    <button 
                                        type="button" 
                                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-1 px-6 py-3 mt-4 mb-4 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        ELIMINAR
                                    </button>
                                    <button 
                                        type="button" 
                                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l px-6 py-3 mt-4 mb-4 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                        onClick={() => navigate(`/modificar/${item.id}`)}
                                    >
                                        MODIFICAR
                                    </button>
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

