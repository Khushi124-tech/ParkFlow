import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const vehicleSchema = z.object({
  vehicleNumber: z
    .string()
    .min(1, "Vehicle number is required")
    .max(20, "Vehicle number looks too long"),
  vehicleType: z.enum(["CAR", "BIKE", "SCOOTER", "BICYCLE"], "Select a vehicle type"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

export const parkingLotSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  totalSlots: z
    .string()
    .min(1, "Total slots is required")
    .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 1, {
      message: "Must be a whole number of at least 1",
    }),
  hourlyRate: z
    .string()
    .min(1, "Hourly rate is required")
    .refine((val) => Number(val) > 0, {
      message: "Hourly rate must be greater than 0",
    }),
});

export type ParkingLotFormValues = z.infer<typeof parkingLotSchema>;

export const bookingSchema = z.object({
  vehicleId: z.string().min(1, "Select a vehicle"),
  parkingLotId: z.string().min(1, "Select a parking lot"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const paymentSchema = z.object({
  paymentMethod: z.enum(["UPI", "CARD", "NET_BANKING", "CASH"], "Select a payment method"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
