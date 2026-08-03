import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays, Plus } from "lucide-react";
import BookingForm from "../components/bookings/BookingForm";
import BookingTable from "../components/bookings/BookingTable";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import { bookingService } from "../services/bookingService";
import type { Booking } from "../types/booking.types";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadBookings() {
    setIsLoading(true);
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleCreated(booking: Booking) {
    setBookings((prev) => [booking, ...prev]);
    setIsModalOpen(false);
  }

  async function handleComplete(booking: Booking) {
    try {
      const updated = await bookingService.complete(booking.id);
      setBookings((prev) => prev.map((item) => (item.id === booking.id ? updated : item)));
      toast.success("Booking completed successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Bookings</h1>
          <p className="mt-1 text-sm text-slate-500">Create, complete, and review parking bookings.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-1.5">
          <Plus className="h-4 w-4" /> New booking
        </Button>
      </div>

      {bookings.length === 0 && !isLoading ? (
        <Card>
          <EmptyState
            icon={CalendarDays}
            title="No bookings yet"
            description="Create your first booking to track entry and exit flow."
            action={<Button onClick={() => setIsModalOpen(true)} variant="secondary">Create booking</Button>}
          />
        </Card>
      ) : (
        <BookingTable bookings={bookings} isLoading={isLoading} onComplete={handleComplete} />
      )}

      <Modal title="Create booking" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BookingForm onCreated={handleCreated} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}