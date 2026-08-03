export interface DashboardStats {
    totalVehicles: number;
    totalBookings: number;
    activeBookings: number;
    completedBookings: number;
    totalRevenue: number;
}

export interface OccupancyChartData {
    name: string;
    value: number;
}

export interface RevenueChartData {
    month: string;
    revenue: number;
}

export interface VehicleChartData {
    type: string;
    count: number;
}