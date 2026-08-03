import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import ParkingLots from "../pages/ParkingLots";
import Bookings from "../pages/Bookings";
import Payments from "../pages/Payments";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../utils/constants";

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
                    <Route path={ROUTES.BOOKINGS} element={<Bookings />} />
                    <Route path={ROUTES.PAYMENTS} element={<Payments />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}