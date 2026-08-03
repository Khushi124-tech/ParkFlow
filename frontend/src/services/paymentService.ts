import axiosInstance from "./axiosInstance";
import type { ApiResponse, SpringPage } from "../types/api.types";
import type { Payment, PaymentRequest } from "../types/payment.types";

const BASE_URL = "/payments";

export const paymentService = {
  async pay(bookingId: number, payload: PaymentRequest): Promise<Payment> {
    const response = await axiosInstance.post<ApiResponse<Payment>>(`${BASE_URL}/${bookingId}`, payload);
    return response.data.data;
  },

  async getAll(): Promise<Payment[]> {
    const response = await axiosInstance.get<ApiResponse<SpringPage<Payment> | Payment[]>>(BASE_URL);
    const data = response.data.data;
    return Array.isArray(data) ? data : data.content;
  },

  async getById(id: number): Promise<Payment> {
    const response = await axiosInstance.get<ApiResponse<Payment>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },
};