import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  ParkingSquare,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", to: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "Vehicles", to: ROUTES.VEHICLES, icon: Car },
  { label: "Parking Lots", to: ROUTES.PARKING_LOTS, icon: ParkingSquare },
  { label: "Bookings", to: ROUTES.BOOKINGS, icon: CalendarCheck },
  { label: "Payments", to: ROUTES.PAYMENTS, icon: CreditCard },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-100 bg-white
          transition-transform duration-200 ease-in-out lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 lg:justify-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              PF
            </div>
            <span className="text-base font-semibold text-slate-900">ParkFlow</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon className="h-4.5 w-4.5" />
              {label}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to={ROUTES.ADMIN}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <ShieldCheck className="h-4.5 w-4.5" />
              Admin
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
}
