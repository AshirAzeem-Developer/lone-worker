import api from "./api";

interface ShiftDetail {
    id: number;
    worker_id: number;
    start_time: string;
    end_time: string;
    status: string;
    location?: string;
}

export const getShiftHistory = async (): Promise<ShiftDetail[] | null> => {
    try {
        console.log("Fetching shift details...");
        const response = await api.get<{ details: ShiftDetail[] }>("/worker/shift-details");
        console.log("Response Data:", response.data.details);
        return response.data.details;
    } catch (error: any) {
        console.error("Error Message:", error.message);
        if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Error Data:", error.response.data);
        }
        return null; // Return null if an error occurs
    }
};
