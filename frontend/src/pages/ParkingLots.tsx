import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ParkingSquare, Plus, Trash2 } from "lucide-react";
import { parkingLotService } from "../services/parkingLotService";
import type { ParkingLot } from "../types/parkingLot.types";
import { parkingLotSchema, type ParkingLotFormValues } from "../utils/validationSchemas";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Spinner from "../components/ui/Spinner";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import EmptyState from "../components/ui/EmptyState";

export default function ParkingLots() {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lotPendingDelete, setLotPendingDelete] = useState<ParkingLot | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParkingLotFormValues>({
    resolver: zodResolver(parkingLotSchema),
  });

  async function loadParkingLots() {
    setIsLoading(true);
    try {
      const data = await parkingLotService.getParkingLots();
      setParkingLots(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadParkingLots();
  }, []);

  function openModal() {
    reset({ name: "", address: "", city: "", totalSlots: "", hourlyRate: "" });
    setIsModalOpen(true);
  }

  async function onSubmit(values: ParkingLotFormValues) {
    setIsSubmitting(true);
    try {
      const created = await parkingLotService.createParkingLot({
        name: values.name,
        address: values.address,
        city: values.city,
        totalSlots: Number(values.totalSlots),
        hourlyRate: Number(values.hourlyRate),
      });
      setParkingLots((prev) => [created, ...prev]);
      toast.success("Parking lot created successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!lotPendingDelete) return;
    setIsDeleting(true);
    try {
      await parkingLotService.deleteParkingLot(lotPendingDelete.id);
      setParkingLots((prev) => prev.filter((lot) => lot.id !== lotPendingDelete.id));
      toast.success("Parking lot removed");
      setLotPendingDelete(null);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Parking Lots</h1>
          <p className="mt-1 text-sm text-slate-500">Browse, create, and manage parking lots.</p>
        </div>
        <Button onClick={openModal} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Parking Lot
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      ) : parkingLots.length === 0 ? (
        <Card>
          <EmptyState
            icon={ParkingSquare}
            title="No parking lots yet"
            description="Create a parking lot so drivers can start booking spots."
            action={
              <Button onClick={openModal} variant="secondary" className="mt-2 gap-1.5">
                <Plus className="h-4 w-4" />
                Add Parking Lot
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {parkingLots.map((lot) => (
            <Card key={lot.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ParkingSquare className="h-5 w-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setLotPendingDelete(lot)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${lot.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h2 className="font-medium text-slate-900">{lot.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{lot.address}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={lot.availableSlots > 0 ? "green" : "red"}>
                  {lot.availableSlots} / {lot.totalSlots} slots free
                </Badge>
                <Badge variant="slate">₹{lot.hourlyRate}/hr</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Parking Lot">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Name"
            placeholder="Downtown Parking Plaza"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Address"
            placeholder="123 MG Road, Mumbai"
            error={errors.address?.message}
            {...register("address")}
          />
          <Input
            label="City"
            placeholder="Mumbai"
            error={errors.city?.message}
            {...register("city")}
          />
          <Input
            label="Total Slots"
            type="number"
            placeholder="50"
            error={errors.totalSlots?.message}
            {...register("totalSlots")}
          />
          <Input
            label="Hourly Rate (₹)"
            type="number"
            step="0.01"
            placeholder="40"
            error={errors.hourlyRate?.message}
            {...register("hourlyRate")}
          />
          <div className="mt-2 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Save Parking Lot
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(lotPendingDelete)}
        title="Delete parking lot?"
        description={`This will permanently remove ${lotPendingDelete?.name ?? "this parking lot"}.`}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setLotPendingDelete(null)}
      />
    </div>
  );
}
