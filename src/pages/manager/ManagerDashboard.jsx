import StatCard from "@/components/dashboard/StatCard";
import { ClipboardCheck, AlertTriangle, Users, } from "lucide-react";
import PendingApprovalsTable from "@/components/goals/PendingApprovalsTable";


const ManagerDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Manager Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <StatCard
                    title="Pending Approvals"
                    value="4"
                    icon={<ClipboardCheck size={32} />}
                />

                <StatCard
                    title="At-Risk Goals"
                    value="2"
                    icon={<AlertTriangle size={32} />}
                />

                <StatCard
                    title="Team Completion"
                    value="78%"
                    icon={<Users size={32} />}
                />

            </div>
            <PendingApprovalsTable />
        </div>
    );
};

export default ManagerDashboard;