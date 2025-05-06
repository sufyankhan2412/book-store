// 5. CREATE PRIVATEROUTE COMPONENT (PrivateRoute.jsx)
// This component is referenced but wasn't included in your files
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  // Show loading state if still determining authentication
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Return children if authenticated
  return children;
}

export default PrivateRoute;