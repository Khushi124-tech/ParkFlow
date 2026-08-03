import type {
    DashboardStats,
    OccupancyChartData,
    RevenueChartData,
    VehicleChartData,
} from "../types/dashboard.types";

export const dashboardService = {
    async getStats(): Promise<DashboardStats> {
        return {
            totalVehicles: 48,
            totalBookings: 176,
            activeBookings: 22,
            completedBookings: 154,
            totalRevenue: 125640,
        };
    },

    async getOccupancy(): Promise<OccupancyChartData[]> {
        return [
            { name: "Occupied", value: 22 },
            { name: "Available", value: 28 },
        ];
    },

    async getRevenue(): Promise<RevenueChartData[]> {
        return [
            { month: "Jan", revenue: 18000 },
            { month: "Feb", revenue: 24000 },
            { month: "Mar", revenue: 27000 },
            { month: "Apr", revenue: 22000 },
            { month: "May", revenue: 34000 },
        ];
    },

    async getVehicleDistribution(): Promise<VehicleChartData[]> {
        return [
            { type: "Car", count: 26 },
            { type: "Bike", count: 18 },
            { type: "EV", count: 4 },
        ];
    },
};