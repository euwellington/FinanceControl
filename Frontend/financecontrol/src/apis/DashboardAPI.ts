import type { IDashboardStats } from "@/interfaces/IDashboard";
import api from "@/services/main/api";

class DashboardAPI {
    getDashboard = () => api.get<IDashboardStats>("/dashboard");
}

export default new DashboardAPI();