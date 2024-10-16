import { useState } from 'react';
import { Link } from 'react-router-dom';
import '/public/css/Header.css'; 
import { useAuth0 } from '@auth0/auth0-react';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);  
    const [showLogout, setShowLogout] = useState(false);      
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const openNav = () => setIsOpen(true);
    const closeNav = () => setIsOpen(false);

    const toggleLogout = () => setShowLogout(!showLogout); 

    const userHasRole = (role) => {
        return user && user['https://dev-fxve5ej4l1ljzvcj.us.auth0.com/roles']?.includes(role);

    }
    console.log(user)
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
                    {isAuthenticated && <li><Link to="/votacion">Votación</Link></li>}
                </ul>
            </nav>
            
            {!isAuthenticated ? (
               
                <button className="btn" onClick={loginWithRedirect}>Iniciar Sesión</button>
            ) : (

                <div className="user-info">
                    <img 
                        src={user.picture || "img/avatar.png"} //pone la imagen del gmail del usuario o una por default
                        alt="User Icon" 
                        onClick={toggleLogout}  
                        style={{ cursor: 'pointer', borderRadius: '50%', width: '50px', height: '50px' }}
                    />
                    {showLogout && (
                        <div className="logout-menu">
                            <button 
                                onClick={() => logout({ returnTo: window.location.origin })}
                                style={{ marginTop: '10px' }}
                            >
                                Cerrar Sesión
                            </button>
                            {userHasRole("admin") && ( // Verificar rol de admin
                                <Link to="/admin">
                                    <button
                                    style={{ marginTop: '10px' }}>
                                        Panel de Control
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}

            
            <a onClick={openNav} className="menu" href="#"><button>Menu</button></a>

        
            {isOpen && (
                <div id="mobile-menu" className={`overlay ${isOpen ? 'open' : ''}`}>
                    <a onClick={closeNav} href="#" className="close">&times;</a>
                    <div className="overlay-content">
                        <Link to="/escultores">Escultores</Link>
                        <Link to="/esculturas">Esculturas</Link>
                        <Link to="/eventos">Eventos</Link>
                        {isAuthenticated ? (
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
