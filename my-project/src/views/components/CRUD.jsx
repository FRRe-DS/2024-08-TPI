import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '/public/css/crud.css'; // Asegúrate de que la ruta sea correcta

function Crud() {
    const navigate = useNavigate();
    const [escultores, setEscultores] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador

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

    // Función para manejar la eliminación de un escultor
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/escultor/${id}`, {
                method: 'DELETE',
            });
            setEscultores(escultores.filter(escultor => escultor.id !== id)); // Actualiza la lista de escultores
        } catch (error) {
            console.error('Error al eliminar el escultor', error);
        }
    };

    // Filtrar los escultores basados en el término de búsqueda
    const filteredEscultores = escultores.filter((escultor) =>
        (escultor.nombre_esc + ' ' + escultor.apellido)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="crud-container">
            <div className="sidebar">
                <button className="sidebar-button" onClick={() => navigate('/escultores')}>Escultores</button>
                <button className="sidebar-button" onClick={() => navigate('/esculturas')}>Esculturas</button>
                <button className="sidebar-button" onClick={() => navigate('/usuarios')}>Usuarios</button>
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
                    {filteredEscultores.length > 0 ? (
                        filteredEscultores.map((escultor) => (
                            <div key={escultor.id} className="list-item">
                                {escultor.nombre_esc + ' ' + escultor.apellido}
                                <div className="action-buttons">
                                    <button className="action-button-delete" onClick={() => handleDelete(escultor.id)}>Eliminar</button>
                                    <button className="action-button" onClick={() => navigate(`/modificar/${escultor.id}`)}>Modificar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay escultores disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Crud;
