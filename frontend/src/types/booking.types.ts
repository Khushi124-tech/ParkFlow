export type BookingStatus =
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED";

export interface Booking {
    id: number;
    vehicleId: number;
    parkingLotId: number;

    vehicleNumber: string;
    parkingLotName: string;

    startTime: string;
    endTime?: string;

    duration?: number;
    amount?: number;

    status: BookingStatus;
}

export interface CreateBookingRequest {
    vehicleId: number;
    parkingLotId: number;
}

export interface CheckoutResponse {
    success: boolean;
    message: string;
}