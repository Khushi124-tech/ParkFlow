/**
 * NOTE ON FIELD NAMES
 * --------------------------------------------------------------------------
 * As with auth.types.ts, FRONTEND_CONTEXT.md pins down the Vehicle endpoints
 * (POST/GET /vehicles, GET/DELETE /vehicles/{id}) but not the exact DTO
 * field names. The fields below are the conventional shape for a vehicle
 * record scoped to the logged-in user (no ownerId in the request — the
 * backend derives the owner from the JWT). Confirm against the real
 * VehicleRequestDto / VehicleResponseDto and adjust here if needed — this
 * is the only file that needs to change.
 * --------------------------------------------------------------------------
 */

export type VehicleType = "CAR" | "BIKE" | "SUV" | "TRUCK";

export const VEHICLE_TYPES: VehicleType[] = ["CAR", "BIKE", "SUV", "TRUCK"];

export interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: VehicleType;
  model: string;
  color: string;
  createdAt: string;
}

export interface CreateVehicleRequest {
  vehicleNumber: string;
  vehicleType: VehicleType;
  model: string;
  color: string;
}
