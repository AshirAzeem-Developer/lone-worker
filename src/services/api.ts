import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const api = axios.create({
    baseURL:  'https://loneworker.etgraphics.net/api', // Use API URL from .env
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const publicPaths = ['/auth', '/signup', '/forgot-password', '/reset-password'];
        const isPublicRoute = publicPaths.some((path) => config.url?.includes(path));

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
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export default api;
