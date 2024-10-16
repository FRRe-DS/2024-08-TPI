import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';


const RutasProtegidas = ({ component: Component, role, ...rest }) => {


    const { isAuthenticated, isLoading, user } = useAuth0();

    const userHasRole = (role) => {
        return user && user[`https://dev-fxve5ej4l1ljzvcj.us.auth0.com/api/v2/roles/${user.email}/users`]?.includes(role);
    }
   

    if (isLoading) {
        return <div>Cargando...</div>
    }
    
    if (!isAuthenticated) {
        return <Navigate to='/'/>
    }
    
    if (role && !userHasRole(role)){
        return <div>No tenes acceso a esta página</div> //Aca debemos realizar que vaya a una pagina que diga que no tiene el acceso autorizado
    }

    console.log("User:", user);
    console.log("Role:", role);

    return <Component {...rest}/>
}
RutasProtegidas.propTypes = {
    component: PropTypes.elementType.isRequired,
    role: PropTypes.string.isRequired,
}

export default RutasProtegidas;