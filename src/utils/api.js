import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiHelpers = {
  // Authentication methods
  auth: {
    login: async (email, password) => {
      try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
      } catch (error) {
        console.error('Login API error:', error);
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        const response = await api.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        console.error('Register API error:', error);
        throw error;
      }
    },
    
    verifyToken: async () => {
      try {
        const response = await api.get('/auth/verify');
        return response.data;
      } catch (error) {
        console.error('Token verification error:', error);
        throw error;
      }
    }
  },
  
  // User methods
  user: {
    getProfile: async () => {
      try {
        const response = await api.get('/users/profile');
        return response.data;
      } catch (error) {
        console.error('Get profile error:', error);
        throw error;
      }
    },
    
    updateProfile: async (userData) => {
      try {
        const response = await api.put('/users/profile', userData);
        return response.data;
      } catch (error) {
        console.error('Update profile error:', error);
        throw error;
      }
    }
  },
  
  // Export the api instance for direct use
  api
};

export default apiHelpers;