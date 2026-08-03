export const API_BASE_URL = "http://localhost:9090/api/v1";

// localStorage keys
export const TOKEN_STORAGE_KEY = "parkflow_token";
export const USER_STORAGE_KEY = "parkflow_user";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  VEHICLES: "/vehicles",
  PARKING_LOTS: "/parking-lots",
  BOOKINGS: "/bookings",
  PAYMENTS: "/payments",
  ADMIN: "/admin",
} as const;
