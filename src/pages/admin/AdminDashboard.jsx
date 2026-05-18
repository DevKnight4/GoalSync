import StatCard from "@/components/dashboard/StatCard";
import { Users, ShieldAlert, BarChart3, AlertTriangle } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Employees"
                    value="42"
                    icon={<Users size={32} />}
                />

                <StatCard
                    title="Managers"
                    value="8"
                    icon={<ShieldAlert size={32} />}
                />

                <StatCard
                    title="Completion Rate"
                    value="84%"
                    icon={<BarChart3 size={32} />}
                />

                <StatCard
                    title="Escalations"
                    value="3"
                    icon={<AlertTriangle size={32} />}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;