import axiosInstance from "./axiosInstance";
import type { ApiResponse, SpringPage } from "../types/api.types";
import type { CreateParkingLotRequest, ParkingLot } from "../types/parkingLot.types";

export const parkingLotService = {
  async createParkingLot(payload: CreateParkingLotRequest): Promise<ParkingLot> {
    const response = await axiosInstance.post<ApiResponse<ParkingLot>>(
      "/parking-lots",
      payload
    );
    return response.data.data;
  },

  async getParkingLots(): Promise<ParkingLot[]> {
    const response = await axiosInstance.get<ApiResponse<SpringPage<ParkingLot> | ParkingLot[]>>(
      "/parking-lots"
    );
    const data = response.data.data;
    return Array.isArray(data) ? data : data.content;
  },

  async getParkingLotById(id: number): Promise<ParkingLot> {
    const response = await axiosInstance.get<ApiResponse<ParkingLot>>(`/parking-lots/${id}`);
    return response.data.data;
  },

  async deleteParkingLot(id: number): Promise<void> {
    await axiosInstance.delete<ApiResponse<null>>(`/parking-lots/${id}`);
  },
};
