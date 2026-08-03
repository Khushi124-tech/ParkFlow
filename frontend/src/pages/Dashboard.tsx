import { Link } from "react-router-dom";
import { Car, ParkingSquare, CalendarCheck, CreditCard, ArrowRight } from "lucide-react";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";

const quickLinks = [
  {
    label: "Vehicles",
    description: "Register and manage your vehicles",
    to: ROUTES.VEHICLES,
    icon: Car,
  },
  {
    label: "Parking Lots",
    description: "Browse available parking lots",
    to: ROUTES.PARKING_LOTS,
    icon: ParkingSquare,
  },
  {
    label: "Bookings",
    description: "View and manage your bookings",
    to: ROUTES.BOOKINGS,
    icon: CalendarCheck,
  },
  {
    label: "Payments",
    description: "Track your payment history",
    to: ROUTES.PAYMENTS,
    icon: CreditCard,
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s a quick way to get to what you need.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map(({ label, description, to, icon: Icon }) => (
          <Link key={to} to={to}>
            <Card className="flex h-full flex-col gap-4 transition-shadow hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-medium text-slate-900">{label}</h2>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-blue-600">
                Go to {label}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
