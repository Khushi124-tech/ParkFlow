import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { bookingService } from "../../services/bookingService";
import { vehicleService } from "../../services/vehicleService";
import { parkingLotService } from "../../services/parkingLotService";
import type { Booking } from "../../types/booking.types";
import type { ParkingLot } from "../../types/parkingLot.types";
import type { Vehicle } from "../../types/vehicle.types";
import { bookingSchema, type BookingFormValues } from "../../utils/validationSchemas";
import Button from "../ui/Button";
import Select from "../ui/Select";

interface BookingFormProps {
  onCreated?: (booking: Booking) => void;
  onCancel?: () => void;
}

export default function BookingForm({ onCreated, onCancel }: BookingFormProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    async function loadOptions() {
      try {
        const [vehicleData, lotData] = await Promise.all([
          vehicleService.getVehicles(),
          parkingLotService.getParkingLots(),
        ]);
        setVehicles(vehicleData);
        setParkingLots(lotData);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }

    loadOptions();
  }, []);

  async function onSubmit(values: BookingFormValues) {
    setIsSubmitting(true);
    try {
      const created = await bookingService.create({
        vehicleId: Number(values.vehicleId),
        parkingLotId: Number(values.parkingLotId),
      });
      reset();
      onCreated?.(created);
      toast.success("Booking created successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Select
        label="Vehicle"
        options={vehicles.map((vehicle) => ({
          label: `${vehicle.vehicleNumber} (${vehicle.brand} ${vehicle.model})`,
          value: String(vehicle.id),
        }))}
        error={errors.vehicleId?.message}
        {...register("vehicleId")}
      />
      <Select
        label="Parking Lot"
        options={parkingLots.map((lot) => ({
          label: `${lot.name} · ${lot.city}`,
          value: String(lot.id),
        }))}
        error={errors.parkingLotId?.message}
        {...register("parkingLotId")}
      />
      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Create booking
        </Button>
      </div>
    </form>
  );
}
