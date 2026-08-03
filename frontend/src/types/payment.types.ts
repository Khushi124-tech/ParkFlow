export type PaymentMethod = "UPI" | "CARD" | "NET_BANKING" | "CASH";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  paymentTime: string;
}

export interface PaymentRequest {
  paymentMethod: PaymentMethod;
}