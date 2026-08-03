import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "../types/api.types";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth.types";

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      payload
    );
    return response.data.data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      payload
    );
    return response.data.data;
  },
};
