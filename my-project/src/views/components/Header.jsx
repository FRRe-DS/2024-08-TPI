import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '/public/css/Header.css'; 
import { useAuth0 } from '@auth0/auth0-react';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);  
    const [showLogout, setShowLogout] = useState(false);      
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const [userRole, setUserRole] = useState(null);
    const openNav = () => setIsOpen(true);
    const closeNav = () => setIsOpen(false);

    const toggleLogout = () => setShowLogout(!showLogout);

    
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
                    {isAuthenticated && userHasRole('user') && (<li><Link to="/votacion">Votación</Link></li>)}
                </ul>
            </nav>

            {!isAuthenticated ? (
                <button className="btn" onClick={loginWithRedirect}>Iniciar Sesión</button>
            ) : (
                <div className="user-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                    src={user.picture || "img/avatar.png"} 
                    alt="User Icon" 
                    onClick={toggleLogout}  
                    style={{ cursor: 'pointer', borderRadius: '50%', width: '50px', height: '50px', margin: '0 10px' }} // Espaciado entre el logo y los botones
                />
                {showLogout && (
                    <div className="logout-menu" style={{ display: 'flex', alignItems: 'center' }}>
                        <button class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={() => logout({ returnTo: window.location.origin })}   
                        >
                            Cerrar Sesión
                        </button>
                        {userHasRole("admin") && (
                            <Link to="/admin" style={{ marginLeft: '10px' }}>
                                <button class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                    Panel de Control
                                </button>
                            </Link>
                        )}
                    </div>
                )}
                </div>


            )}

            <a onClick={openNav} className="menu"><button>Menu</button></a>

            {isOpen && (
                <div id="mobile-menu" className={`overlay ${isOpen ? 'open' : ''}`}>
                <button onClick={closeNav} aria-label="Cerrar menú" className="close">&times;</button>
                         <div className="overlay-content">
                        <Link to="/escultores">Escultores</Link>
                        <Link to="/esculturas">Esculturas</Link>
                        <Link to="/eventos">Eventos</Link>
                        {isAuthenticated && userHasRole() ? (
                            <Link to="/votacion">Votación</Link>
                        ) : (
                            <a onClick={loginWithRedirect}>Iniciar Sesión</a>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;