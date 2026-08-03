import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  ParkingSquare,
  CalendarCheck,
  CreditCard,
} from "lucide-react";

import { dashboardService } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";
import type { DashboardStats } from "../types/dashboard.types";

const quickLinks = [
  {
    title: "Vehicles",
    description: "Register and manage your vehicles",
    path: ROUTES.VEHICLES,
    icon: Car,
  },
  {
    title: "Parking Lots",
    description: "Browse available parking lots",
    path: ROUTES.PARKING_LOTS,
    icon: ParkingSquare,
  },
  {
    title: "Bookings",
    description: "Manage your bookings",
    path: ROUTES.BOOKINGS,
    icon: CalendarCheck,
  },
  {
    title: "Payments",
    description: "View payment history",
    path: ROUTES.PAYMENTS,
    icon: CreditCard,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (isLoading || !stats) {
    return <div className="flex h-64 items-center justify-center text-slate-500">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back{user?.fullName ? `, ${user.fullName}` : ""}</h1>
        <p className="mt-2 text-slate-500">ParkFlow Dashboard</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map(({ title, description, path, icon: Icon }) => (
          <Link key={title} to={path} className="rounded-xl border bg-white p-5 shadow transition hover:shadow-lg">
            <Icon className="mb-3 h-8 w-8 text-blue-600" />
            <h2 className="font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-500">{description}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Users" value={stats.totalUsers} />
        <StatCard title="Vehicles" value={stats.totalVehicles} />
        <StatCard title="Parking Lots" value={stats.totalParkingLots} />
        <StatCard title="Bookings" value={stats.totalBookings} />
        <StatCard title="Payments" value={stats.totalPayments} />
        <StatCard title="Active" value={stats.activeBookings} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number; }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
    </div>
  );
}