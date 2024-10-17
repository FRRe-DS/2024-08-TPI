import { useNavigate } from 'react-router-dom';
import '/public/css/crud.css'; // Asegúrate de importar los estilos CSS

function Crud() {
    const navigate = useNavigate(); // Hook para navegar entre rutas

    // Función que maneja la navegación según el botón presionado
    const handleButtonClick = (route) => {
        navigate(route); // Redirige a la ruta correspondiente
    };

    return (
        <div>
            {/* Contenedor para centrar los botones */}
            <div className="button-container">
                {/* Botones que simulan ser un menú */}
                <button onClick={() => handleButtonClick('/create')} className="custom-button">
                    Añadir Escultor
                </button>
                <button onClick={() => handleButtonClick('/create')} className="custom-button">
                    Buscar Escultor
                </button>
                <button onClick={() => handleButtonClick('/create')} className="custom-button">
                    Crear Evento
                </button>
                <button onClick={() => handleButtonClick('/create')} className="custom-button">
                    Buscar Evento
                </button>
                <button onClick={() => handleButtonClick('/create')} className="custom-button">
                    Buscar Escultura
                </button>
                <button onClick={() => handleButtonClick('/create')} className="custom-button">
                    Añadir Escultura
                </button>
                {/* Puedes agregar más botones según lo que necesites */}
                {/* Ejemplo de otro botón */}
                {/* <button onClick={() => handleButtonClick('/otraRuta')} className="custom-button">
                    Otra Opción
                </button> */}
            </div>
        </div>
    );
}

export default Crud;
