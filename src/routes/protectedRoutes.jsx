/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

import Cookies from 'js-cookie';


const authToken = Cookies.get('authToken')


const isLoggedIn = authToken ? true : false;

const ProtectedRoutes = ({ children, allowedRoles }) => {

    const currentUserRole = 'user'; // Replace with actual user role logic
    const allowedRolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!isLoggedIn) {
        return <Navigate to="/" />; // Redirect to home if not logged in
    }

    if (!allowedRolesArray.includes(currentUserRole)) {
        return <Navigate to="/unauthorized" />; // Redirect if role is not allowed
    }

    return children;
};

export default ProtectedRoutes;
