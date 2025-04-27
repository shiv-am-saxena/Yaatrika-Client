import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming you have a custom hook for authentication

const Auth = ({ children, redirectTo = '/' }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }

    return children;
};

export default Auth;