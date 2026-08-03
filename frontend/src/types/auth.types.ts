/**
 * NOTE ON FIELD NAMES
 * --------------------------------------------------------------------------
 * FRONTEND_CONTEXT.md specifies the endpoints (POST /auth/register,
 * POST /auth/login) and the response envelope, but it does not list the
 * exact DTO field names for the auth request/response bodies.
 *
 * The field names below (email, password, fullName, phoneNumber, role,
 * token) are the most conventional choice for a Spring Boot JWT auth flow
 * and are used consistently across every request/response in this file.
 * Before wiring this against the real backend, confirm these field names
 * against the actual RegisterRequestDto / LoginRequestDto / AuthResponseDto
 * classes and adjust here — this is the ONLY place they are defined, so a
 * mismatch is a one-file fix.
 * --------------------------------------------------------------------------
 */

export type UserRole = "APP_USER" | "ADMIN";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

/**
 * Shape returned inside `data` for both POST /auth/login and
 * POST /auth/register.
 */
export interface AuthResponse {
  token: string;
  user: User;
}
