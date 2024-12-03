import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '/public/css/Header.css'; 
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'flowbite-react'; // Importa el dropdown de Flowbite


const Header = () => {
    
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const [userRole, setUserRole] = useState(null);


    
    useEffect(() => {
        if (isAuthenticated && user) {
            const postUser = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api/users', {
                        name: user.name,
                        nickname: user.nickname,
                        email: user.email,
                        role: 'user'  // Ajustar el rol según sea necesario
                    });
                    console.log('User registrado o existente', response.data);
                } catch (error) {
                    console.error('Error al registrar user', error.response ? error.response.data : error);
                }
            };
            postUser();
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        const getRole = async () => {
            if (user) { // Asegúrate de que el usuario esté definido
                try {
                    const response = await axios.get(`http://localhost:3000/api/users/role/${user.email}`);
                    const userRole = response.data.role
                    setUserRole(userRole)
                } catch (error) {
                    console.error('Error al obtener el rol:', error);
                }
            }
        };
        getRole();
    }, [user]); 

    //Aca controlamos si el rol que tiene para habilitar accesos
    const userHasRole = (role) => {
        return userRole===role
    };

        
  
    return (
        <header className="header">
    <div className="logo">
        <Link to="/"><img src="img/logo.png" alt="Logo de la marca" /></Link>
    </div>
    <nav>
        <ul className="nav-links">
            <li><Link to="/escultores">Escultores</Link></li>
            <li><Link to="/esculturas">Esculturas</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/Resultados">Resultados</Link></li>
        </ul>
    </nav>

    {!isAuthenticated ? (
        <button className="btn" onClick={loginWithRedirect}>Iniciar Sesión</button>
    ) : ( 
        <Dropdown
        label={<img src={user.picture || "img/avatar.png"} alt="User Icon" style={{ borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer' }} />}>
            <Dropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>
            <Link to="/admin" className="text-black">
                        Cerrar Sesión
                    </Link>
            </Dropdown.Item>
            {userHasRole("admin") && (
                <Dropdown.Item>
                    <Link to="/admin" className="text-black">
                        Panel de Control
                    </Link>
                </Dropdown.Item>
            )}
        </Dropdown>
    )}
</header>


    );
};

export default Header;