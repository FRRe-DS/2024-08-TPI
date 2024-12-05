import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import {useEffect,useState} from 'react';
import axios from 'axios';
import '/public/css/RutasProtegidas.css';

const RutasProtegidas = ({ component: Component, role, ...rest }) => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [userRole, setUserRole] = useState(null);

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


    if (isLoading) {
        return <div></div>
    }
    
    if (!isAuthenticated) {
        return <Navigate to='/'/>
    }
    
    if (role && !userHasRole(role)){
        return <div className="mensaje-acceso-denegado">No tenes acceso a esta página</div> 
    }

    return <Component {...rest}/>
}
RutasProtegidas.propTypes = {
    component: PropTypes.elementType.isRequired,
    role: PropTypes.string.isRequired,
}

export default RutasProtegidas;