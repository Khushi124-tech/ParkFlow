import axiosInstance from "./axiosInstance";
import type {
    Booking,
    CreateBookingRequest,
    CheckoutResponse,
} from "../types/booking.types";
import type { ApiResponse } from "../types/api.types";

const BASE_URL = "/bookings";

export const bookingService = {
    create: async (payload: CreateBookingRequest) => {
        const response = await axiosInstance.post<ApiResponse<Booking>>(
            BASE_URL,
            payload
        );
        return response.data.data;
    },

    getAll: async () => {
        const response =
            await axiosInstance.get<ApiResponse<Booking[]>>(BASE_URL);

        return response.data.data;
    },

    getById: async (id: number) => {
        const response =
            await axiosInstance.get<ApiResponse<Booking>>(`${BASE_URL}/${id}`);

        return response.data.data;
    },

    checkout: async (id: number) => {
        const response =
            await axiosInstance.post<ApiResponse<CheckoutResponse>>(
                `${BASE_URL}/${id}/checkout`
            );

        return response.data.data;
    },
};