import api from "./api";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface HistoryResponse {
  data: any[]; // You can define a more specific type if you know the data structure
  pagination: Pagination;
}

export const getHistory = async (page: number = 2): Promise<HistoryResponse> => {
  try {
    const response = await api.get<{ data: any[]; pagination: Pagination }>(`/worker/checkin-history?page=${page}`);
    console.log("API Response:", response.data);

    return {
      data: response.data.data,
      pagination: response.data.pagination, // Capture pagination metadata
    };
  } catch (error: any) {
    console.error("Check-in history error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Check-in history fetch failed" };
  }
};
