import React from 'react';
import useAuth from '../hooks/useAuth.jsx';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

function RequireAuth(props) {
    const {auth} = useAuth()
    const location = useLocation();
    return (
        auth?.id ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequireAuth;