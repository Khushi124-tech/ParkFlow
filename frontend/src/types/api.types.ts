/**
 * Standard success envelope returned by every ParkFlow backend endpoint.
 * Matches the backend's ApiResponse<T> wrapper exactly — do not rename fields.
 */
export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Standard error envelope returned by the ParkFlow backend on failure.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errorCode: string;
  timestamp: string;
}

/**
 * Spring Data Page<T> shape, used for any paginated list endpoint
 * (e.g. GET /vehicles, GET /bookings, GET /payments).
 */
export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
