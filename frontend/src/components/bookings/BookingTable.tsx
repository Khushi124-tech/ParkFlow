import { CalendarDays, CreditCard } from "lucide-react";
import BookingStatusBadge from "./BookingStatusBadge";
import type { Booking } from "../../types/booking.types";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import Button from "../ui/Button";

interface BookingTableProps {
  bookings: Booking[];
  isLoading?: boolean;
  onComplete?: (booking: Booking) => void;
  onPay?: (booking: Booking) => void;
}

export default function BookingTable({ bookings, isLoading, onComplete, onPay }: BookingTableProps) {
  if (isLoading) {
    return <div className="rounded-xl border border-slate-100 bg-white p-6 text-sm text-slate-500">Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return <div className="rounded-xl border border-slate-100 bg-white p-6 text-sm text-slate-500">No bookings found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Booking</th>
            <th className="px-4 py-3 font-medium">Vehicle</th>
            <th className="px-4 py-3 font-medium">Parking lot</th>
            <th className="px-4 py-3 font-medium">Entry</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t border-slate-100">
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900">#{booking.id}</div>
                <div className="text-xs text-slate-500">{booking.entryTime ? formatDateTime(booking.entryTime) : "Pending"}</div>
              </td>
              <td className="px-4 py-3 text-slate-600">{booking.vehicleNumber}</td>
              <td className="px-4 py-3 text-slate-600">{booking.parkingLotName}</td>
              <td className="px-4 py-3 text-slate-600">{booking.entryTime ? formatDateTime(booking.entryTime) : "—"}</td>
              <td className="px-4 py-3"><BookingStatusBadge status={booking.status} /></td>
              <td className="px-4 py-3 text-slate-600">{booking.totalAmount ? formatCurrency(booking.totalAmount) : "—"}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  {booking.status === "ACTIVE" && (
                    <Button type="button" variant="secondary" onClick={() => onComplete?.(booking)} className="gap-1.5">
                      <CalendarDays className="h-4 w-4" /> Complete
                    </Button>
                  )}
                  {booking.status === "COMPLETED" && (
                    <Button type="button" variant="primary" onClick={() => onPay?.(booking)} className="gap-1.5">
                      <CreditCard className="h-4 w-4" /> Pay
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
