export type VehicleType = "CAR" | "BIKE" | "SCOOTER" | "BICYCLE";

export const VEHICLE_TYPES: VehicleType[] = ["CAR", "BIKE", "SCOOTER", "BICYCLE"];

export interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: VehicleType;
  brand: string;
  model: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface CreateVehicleRequest {
  vehicleNumber: string;
  vehicleType: VehicleType;
  brand: string;
  model: string;
}
