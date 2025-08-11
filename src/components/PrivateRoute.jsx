// src/routes/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Show a loading spinner/message while authentication is still being verified
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow access if authenticated
  return children;
}

export default PrivateRoute;
