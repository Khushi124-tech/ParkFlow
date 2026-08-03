/**
 * NOTE ON FIELD NAMES — see vehicle.types.ts for the same caveat.
 * The fields below are the conventional shape for a parking lot record.
 * Confirm against the real ParkingLotRequestDto / ParkingLotResponseDto.
 * --------------------------------------------------------------------------
 */

export interface ParkingLot {
  id: number;
  name: string;
  address: string;
  totalSlots: number;
  availableSlots: number;
  pricePerHour: number;
  createdAt: string;
}

export interface CreateParkingLotRequest {
  name: string;
  address: string;
  totalSlots: number;
  pricePerHour: number;
}
