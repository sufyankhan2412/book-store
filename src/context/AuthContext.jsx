import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Configure axios defaults
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add token to every request if it exists
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Check if token is valid on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/verify');
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('[DEBUG] Token verification failed:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Login with email/password
  const loginWithCredentials = async (email, password) => {
    try {
      console.log('[DEBUG] Attempting login for:', email);
      const res = await api.post('/auth/login', { email, password });
      
      if (res.data && res.data.token) {
        // Store token in localStorage and state
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return res.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('[DEBUG] Login error:', error);
      if (error.response) {
        // Handle specific error cases
        if (error.response.status === 401) {
          throw new Error('Invalid email or password');
        } else {
          throw new Error(error.response.data.message || 'Login failed');
        }
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      } else {
        throw error;
      }
    }
  };

  // Registration function that also logs in the user
  const register = async (userData) => {
    try {
      console.log('[DEBUG] Registering new user:', userData.email);
      const res = await api.post('/auth/register', userData);
      
      if (res.data && res.data.token) {
        // Store token in localStorage and state
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return res.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('[DEBUG] Registration error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      } else {
        throw error;
      }
    }
  };

  // Direct login without credentials (e.g. after registration)
  const login = (user, token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        token,
        loginWithCredentials,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;