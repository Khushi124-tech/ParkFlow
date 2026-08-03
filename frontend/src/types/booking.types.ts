export type BookingStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface Booking {
  id: number;
  vehicleId: number;
  vehicleNumber: string;
  parkingLotId: number;
  parkingLotName: string;
  entryTime: string;
  exitTime?: string | null;
  totalAmount?: number | null;
  status: BookingStatus;
}

export interface CreateBookingRequest {
  vehicleId: number;
  parkingLotId: number;
}