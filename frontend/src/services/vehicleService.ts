import axiosInstance from "./axiosInstance";
import type { ApiResponse, SpringPage } from "../types/api.types";
import type { CreateVehicleRequest, Vehicle } from "../types/vehicle.types";

export const vehicleService = {
  async createVehicle(payload: CreateVehicleRequest): Promise<Vehicle> {
    const response = await axiosInstance.post<ApiResponse<Vehicle>>("/vehicles", payload);
    return response.data.data;
  },

  async getVehicles(): Promise<Vehicle[]> {
    const response = await axiosInstance.get<ApiResponse<SpringPage<Vehicle> | Vehicle[]>>(
      "/vehicles"
    );
    const data = response.data.data;
    // Backend list endpoints follow Spring Page, but fall back to a plain
    // array so this keeps working if the endpoint isn't paginated.
    return Array.isArray(data) ? data : data.content;
  },

  async getVehicleById(id: number): Promise<Vehicle> {
    const response = await axiosInstance.get<ApiResponse<Vehicle>>(`/vehicles/${id}`);
    return response.data.data;
  },

  async deleteVehicle(id: number): Promise<void> {
    await axiosInstance.delete<ApiResponse<null>>(`/vehicles/${id}`);
  },
};
