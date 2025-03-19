import api from "./api";

interface AttendanceResponse {
    message: string;
    data?: object;
}

export const attendance = async (checkin_time: string): Promise<AttendanceResponse> => {
    try {
        const response = await api.post<AttendanceResponse>('/worker/attendance', {
            checkin_time: checkin_time,
        });
        return response.data; // Return API response data
    } catch (error: any) {
        console.error('Check-in error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Check-in failed' };
    }
};

export const checkIn = async (worker_check_in_id: number, checkin_time: string): Promise<AttendanceResponse> => {
    try {
        const response = await api.post<AttendanceResponse>('/worker/checkin', {
            checkin_time: checkin_time,
            worker_check_in_id: worker_check_in_id
        });
        return response.data; // Return API response data
    } catch (error: any) {
        console.error('Check-in error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Check-in failed' };
    }
};

export const checkOut = async (worker_check_in_id: number, end_time: string): Promise<AttendanceResponse> => {
    try {
        const response = await api.post<AttendanceResponse>('/worker/checkout', {
            end_time: end_time,
            worker_check_in_id: worker_check_in_id
        });
        return response.data; // Return API response data
    } catch (error: any) {
        console.error('Check-out error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Check-out failed' };
    }
};
