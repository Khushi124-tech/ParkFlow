import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api.types";
import { API_BASE_URL, TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT to every outgoing request, if one is stored.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Normalizes every failed request into a plain Error whose `message` is the
 * backend's ApiErrorResponse.message, so call sites can just do:
 *   catch (err) { toast.error((err as Error).message) }
 *
 * On 401 (expired/invalid token) the stored session is cleared and the user
 * is hard-redirected to /login, since there is no token-refresh endpoint in
 * the backend contract.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const backendMessage = error.response?.data?.message;
    const fallbackMessage =
      error.message === "Network Error"
        ? "Unable to reach the server. Please check your connection."
        : "Something went wrong. Please try again.";

    return Promise.reject(new Error(backendMessage || fallbackMessage));
  }
);

export default axiosInstance;
