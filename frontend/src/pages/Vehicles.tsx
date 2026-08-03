import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Car, Plus, Trash2 } from "lucide-react";
import { vehicleService } from "../services/vehicleService";
import type { Vehicle } from "../types/vehicle.types";
import { VEHICLE_TYPES } from "../types/vehicle.types";
import { vehicleSchema, type VehicleFormValues } from "../utils/validationSchemas";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Spinner from "../components/ui/Spinner";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import EmptyState from "../components/ui/EmptyState";

const vehicleTypeOptions = VEHICLE_TYPES.map((type) => ({ label: type, value: type }));

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehiclePendingDelete, setVehiclePendingDelete] = useState<Vehicle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { vehicleType: "CAR" },
  });

  async function loadVehicles() {
    setIsLoading(true);
    try {
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  function openModal() {
    reset({ vehicleNumber: "", vehicleType: "CAR", brand: "", model: "" });
    setIsModalOpen(true);
  }

  async function onSubmit(values: VehicleFormValues) {
    setIsSubmitting(true);
    try {
      const created = await vehicleService.createVehicle(values);
      setVehicles((prev) => [created, ...prev]);
      toast.success("Vehicle registered successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!vehiclePendingDelete) return;
    setIsDeleting(true);
    try {
      await vehicleService.deleteVehicle(vehiclePendingDelete.id);
      setVehicles((prev) => prev.filter((v) => v.id !== vehiclePendingDelete.id));
      toast.success("Vehicle removed");
      setVehiclePendingDelete(null);
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
          <h1 className="text-2xl font-semibold text-slate-900">Vehicles</h1>
          <p className="mt-1 text-sm text-slate-500">Register and manage your vehicles.</p>
        </div>
        <Button onClick={openModal} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <Card className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={Car}
              title="No vehicles yet"
              description="Register your first vehicle to start booking parking spots."
              action={
                <Button onClick={openModal} variant="secondary" className="mt-2 gap-1.5">
                  <Plus className="h-4 w-4" />
                  Add Vehicle
                </Button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="px-6 py-3 font-medium">Vehicle Number</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Brand</th>
                  <th className="px-6 py-3 font-medium">Model</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {vehicle.vehicleNumber}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="blue">{vehicle.vehicleType}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{vehicle.brand}</td>
                    <td className="px-6 py-4 text-slate-600">{vehicle.model}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setVehiclePendingDelete(vehicle)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${vehicle.vehicleNumber}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Vehicle">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Vehicle Number"
            placeholder="MH12AB1234"
            error={errors.vehicleNumber?.message}
            {...register("vehicleNumber")}
          />
          <Select
            label="Vehicle Type"
            options={vehicleTypeOptions}
            error={errors.vehicleType?.message}
            {...register("vehicleType")}
          />
          <Input
            label="Brand"
            placeholder="Honda"
            error={errors.brand?.message}
            {...register("brand")}
          />
          <Input
            label="Model"
            placeholder="City"
            error={errors.model?.message}
            {...register("model")}
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
              Save Vehicle
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(vehiclePendingDelete)}
        title="Delete vehicle?"
        description={`This will permanently remove ${vehiclePendingDelete?.vehicleNumber ?? "this vehicle"} from your account.`}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setVehiclePendingDelete(null)}
      />
    </div>
  );
}
