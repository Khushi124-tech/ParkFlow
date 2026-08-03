export interface ParkingLot {
  id: number;
  name: string;
  address: string;
  city: string;
  totalSlots: number;
  availableSlots: number;
  hourlyRate: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface CreateParkingLotRequest {
  name: string;
  address: string;
  city: string;
  totalSlots: number;
  hourlyRate: number;
}
