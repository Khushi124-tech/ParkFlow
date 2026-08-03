import axiosInstance from "./axiosInstance";
import type {
    Payment,
    PaymentRequest,
} from "../types/payment.types";
import type { ApiResponse } from "../types/api.types";

const BASE_URL = "/payments";

export const paymentService = {
    pay: async (
        bookingId: number,
        payload: PaymentRequest
    ) => {
        const response =
            await axiosInstance.post<ApiResponse<Payment>>(
                `/bookings/${bookingId}/payment`,
                payload
            );

        return response.data.data;
    },

    getAll: async () => {
        const response =
            await axiosInstance.get<ApiResponse<Payment[]>>(BASE_URL);

        return response.data.data;
    },

    getById: async (id: number) => {
        const response =
            await axiosInstance.get<ApiResponse<Payment>>(
                `${BASE_URL}/${id}`
            );

        return response.data.data;
    },
};