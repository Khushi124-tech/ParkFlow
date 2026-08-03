import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "../types/api.types";
import type { DashboardStats } from "../types/dashboard.types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await axiosInstance.get<ApiResponse<DashboardStats>>("/admin/dashboard");
    return response.data.data;
  },
};