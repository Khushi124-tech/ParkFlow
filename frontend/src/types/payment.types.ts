export type PaymentMethod =
    | "UPI"
    | "CARD"
    | "CASH";

export type PaymentStatus =
    | "PENDING"
    | "SUCCESS"
    | "FAILED";

export interface Payment {
    id: number;
    bookingId: number;

    amount: number;

    paymentMethod: PaymentMethod;

    paymentStatus: PaymentStatus;

    paymentTime: string;
}

export interface PaymentRequest {
    paymentMethod: PaymentMethod;
}