export interface DashboardData {
    totalPlants: number;
    totalEmployees: number;
    activeSensors: number;
    recentActivity?: ActivityItem[];
}

export interface ActivityItem {
    id: number;
    type: string;
    description: string;
    timestamp: Date;
}