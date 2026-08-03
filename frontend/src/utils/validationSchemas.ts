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
    phoneNumber: z
      .string()
      .min(7, "Enter a valid phone number")
      .max(15, "Enter a valid phone number"),
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
  vehicleType: z.enum(["CAR", "BIKE", "SUV", "TRUCK"], "Select a vehicle type"),
  model: z.string().min(1, "Model is required"),
  color: z.string().min(1, "Color is required"),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

/**
 * Numeric fields are kept as validated strings here (matching what an
 * <input type="number"> actually gives React Hook Form) rather than using
 * z.coerce.number(), which has a known input/output type mismatch with the
 * current @hookform/resolvers + zod combo. Pages convert to Number(...)
 * right before calling the API — see ParkingLots.tsx.
 */
export const parkingLotSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  totalSlots: z
    .string()
    .min(1, "Total slots is required")
    .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 1, {
      message: "Must be a whole number of at least 1",
    }),
  pricePerHour: z
    .string()
    .min(1, "Price per hour is required")
    .refine((val) => Number(val) > 0, {
      message: "Price per hour must be greater than 0",
    }),
});

export type ParkingLotFormValues = z.infer<typeof parkingLotSchema>;
