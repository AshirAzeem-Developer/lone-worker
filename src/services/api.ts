import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const api = axios.create({
  baseURL: 'https://etgraphics.net/checkcall/public/api', // Use API URL from .env
  // baseURL: 'https://checkcall.co.uk/api', // Use API URL from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  
  async config => {
        // Log only useful information about the request
    console.log('--- Outgoing Request Details ---');
    console.log('Method:', config.method?.toUpperCase()); // HTTP method (e.g., GET, POST)
    console.log('URL:', config.url); // Request URL
    console.log('Headers:', config.headers); // Request headers
    if (config.data) {
      console.log('Data (Body):', config.data); // Request body (for POST, PUT, etc.)
    }
    console.log('------------------------------');
    const publicPaths = [
      '/auth',
      '/signup',
      '/forgot-password',
      '/reset-password',
    ];
    const isPublicRoute = publicPaths.some(path => config.url?.includes(path));

    if (!isPublicRoute) {
      try {
        const token = await EncryptedStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.log('Token not found and is required for this route');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    }

    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

export default api;
