import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '/public/css/Header.css'; 
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'flowbite-react'; // Importa el dropdown de Flowbite
import { AiOutlineMenu, AiOutlineArrowLeft } from "react-icons/ai";
import useMediaQuery from '@mui/material/useMediaQuery';

function Header({showMenuMobile, setShowMenuMobile}){
    
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const [userRole, setUserRole] = useState(null);
    const isDesktop = useMediaQuery('(min-width:768px)');

    useEffect(()=>{
        if (isDesktop){
            setShowMenuMobile(false);
        }
    },[isDesktop]);

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

    function showMenu(){
        let showMenuAux = !showMenuMobile;
        setShowMenuMobile(showMenuAux);
    }
        
  
    return (
        <header>
            
            <div className="barra-movil">
                <div className="logo-container">
                    <img className= "imagen-mobile" src="img/logo.png" alt="Logo de la marca" />
                </div>
                <div className="burger-container">
                    <button onClick={showMenu}>
                        <AiOutlineMenu className="menu-button"/>
                    </button>
                </div>
            </div>
            <div className={showMenuMobile? "menu-container show-content" : "menu-container hidde-content"}>
                <div className="logo">
                    <Link to="/"><img className= "imagen" src="img/logo.png" alt="Logo de la marca" /></Link>
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><Link className="link" to="/escultores">Escultores</Link></li>
                        <li><Link className="link" to="/esculturas">Esculturas</Link></li>
                        <li><Link className="link" to="/eventos">Eventos</Link></li>
                        <li><Link className="link" to="/Resultados">Resultados</Link></li>
                        {userHasRole("admin") && (<li><Link className="link" to="/admin/qr-list">Lista QR</Link></li>)}
                    </ul>
                </nav>

                {!isAuthenticated ? (
                    <button    className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg m-4 shadow-md hover:bg-gray-700 hover:shadow-lg transition-transform transform hover:-translate-y-1 active:translate-y-0"
                    onClick={loginWithRedirect}>Iniciar Sesión</button>
                ) : ( 
                    <Dropdown arrowIcon={false}
                    label={<img className="user-logo" src={user.picture || "img/avatar.png"} alt="User Icon" />}>
                        {userHasRole("admin") && (
                            <Dropdown.Item>
                                <Link to="/admin" className="text-black">
                                    Panel de Control
                                </Link>
                            </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>
                        <Link to="/users" className="text-black">
                                    Cerrar Sesión
                                </Link>
                        </Dropdown.Item>
                    </Dropdown>
                )}
            </div>
        </header>


    );
};

export default Header;