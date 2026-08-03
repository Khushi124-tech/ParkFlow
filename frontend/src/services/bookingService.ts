import axiosInstance from "./axiosInstance";
import type { ApiResponse, SpringPage } from "../types/api.types";
import type { Booking, CreateBookingRequest } from "../types/booking.types";

const BASE_URL = "/bookings";

export const bookingService = {
  async create(payload: CreateBookingRequest): Promise<Booking> {
    const response = await axiosInstance.post<ApiResponse<Booking>>(BASE_URL, payload);
    return response.data.data;
  },

  async getAll(): Promise<Booking[]> {
    const response = await axiosInstance.get<ApiResponse<SpringPage<Booking> | Booking[]>>(BASE_URL);
    const data = response.data.data;
    return Array.isArray(data) ? data : data.content;
  },

  async getById(id: number): Promise<Booking> {
    const response = await axiosInstance.get<ApiResponse<Booking>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  async complete(id: number): Promise<Booking> {
    const response = await axiosInstance.patch<ApiResponse<Booking>>(`${BASE_URL}/${id}/complete`);
    return response.data.data;
  },
};