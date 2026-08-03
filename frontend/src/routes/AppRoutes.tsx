import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import ParkingLots from "../pages/ParkingLots";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../utils/constants";

/**
 * Part 1 wired up: /login, /register, /dashboard, and the catch-all 404.
 * Part 2 adds: /vehicles, /parking-lots.
 *
 * Remaining feature pages (Bookings, Payments, Admin) are added inside the
 * same <Route element={<ProtectedRoute />}> group as they are generated in
 * subsequent parts — no changes to the auth/layout scaffolding are needed
 * when that happens.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.VEHICLES} element={<Vehicles />} />
          <Route path={ROUTES.PARKING_LOTS} element={<ParkingLots />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
