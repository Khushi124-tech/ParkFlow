import type { BookingStatus } from "../../types/booking.types";
import Badge from "../ui/Badge";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const variant = {
    ACTIVE: "blue" as const,
    COMPLETED: "green" as const,
    CANCELLED: "red" as const,
  }[status];

  return <Badge variant={variant}>{status}</Badge>;
}
