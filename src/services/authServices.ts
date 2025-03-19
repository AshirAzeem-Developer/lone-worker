import api from './api'; // Import axios instance

interface LoginResponse {
    token: string;
    user?: object;
    message?: string;
}

interface ChangePasswordResponse {
    message: string;
}

interface SignoutResponse {
    message: string;
}

export const login = async (
    pin: string,
    password: string,
    push_token?: string
): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/worker/auth', {
            pin,
            password,
            push_token
        });
        return response.data; // Return API response data
    } catch (error: any) {
        throw error.response?.data || { message: 'Login failed' };
    }
};

export const changePassword = async (
    password: string,
    password_confirmation: string,
    old_password: string
): Promise<ChangePasswordResponse> => {
    try {
        const response = await api.post<ChangePasswordResponse>('/worker/change-password', {
            password,
            password_confirmation,
            old_password
        });
        console.log(response.data);
        return response.data; // Return API response data
    } catch (error: any) {
        throw error.response?.data || { message: 'Password change failed' };
    }
};

export const signout = async (): Promise<SignoutResponse> => {
    try {
        const response = await api.post<SignoutResponse>('/worker/signout');
        return response.data; // Return API response data
    } catch (error: any) {
        console.error('Signout error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Signout failed' };
    }
};
