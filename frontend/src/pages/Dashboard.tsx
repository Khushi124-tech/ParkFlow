import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  ParkingSquare,
  CalendarCheck,
  CreditCard,
} from "lucide-react";

import OccupancyPieChart from "../components/charts/OccupancyPieChart";
import RevenueLineChart from "../components/charts/RevenueLineChart";
import VehicleDistributionChart from "../components/charts/VehicleDistributionChart";

import { dashboardService } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";

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

  const [stats, setStats] = useState<any>(null);
  const [occupancy, setOccupancy] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [revenue, setRevenue] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      setStats(await dashboardService.getStats());
      setOccupancy(await dashboardService.getOccupancy());
      setVehicles(await dashboardService.getVehicleDistribution());
      setRevenue(await dashboardService.getRevenue());
    }

    loadDashboard();
  }, []);

  if (!stats) {
    return (
        <div className="flex h-64 items-center justify-center">
          Loading dashboard...
        </div>
    );
  }

  return (
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
          </h1>

          <p className="mt-2 text-slate-500">
            ParkFlow Dashboard
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ title, description, path, icon: Icon }) => (
              <Link
                  key={title}
                  to={path}
                  className="rounded-xl border bg-white p-5 shadow transition hover:shadow-lg"
              >
                <Icon className="mb-3 h-8 w-8 text-blue-600" />

                <h2 className="font-semibold text-slate-900">
                  {title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {description}
                </p>
              </Link>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Vehicles" value={stats.totalVehicles} />
          <StatCard title="Bookings" value={stats.totalBookings} />
          <StatCard title="Active" value={stats.activeBookings} />
          <StatCard title="Completed" value={stats.completedBookings} />
          <StatCard title="Revenue" value={`₹${stats.totalRevenue}`} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <OccupancyPieChart data={occupancy} />
          <VehicleDistributionChart data={vehicles} />
        </div>

        <RevenueLineChart data={revenue} />

      </div>
  );
}

function StatCard({
                    title,
                    value,
                  }: {
  title: string;
  value: string | number;
}) {
  return (
      <div className="rounded-xl border bg-white p-5 shadow">
        <p className="text-sm text-slate-500">{title}</p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          {value}
        </h2>
      </div>
  );
}