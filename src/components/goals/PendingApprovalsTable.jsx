import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const approvals = [
    {
        employee: "Aarav Sharma",
        goals: 6,
        submitted: "2 hrs ago",
        status: "Pending",
    },
    {
        employee: "Priya Verma",
        goals: 5,
        submitted: "5 hrs ago",
        status: "Pending",
    },
];

const PendingApprovalsTable = () => {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6 mt-8">

            <h2 className="text-xl font-semibold mb-4">
                Pending Approvals
            </h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Goals</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {approvals.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.employee}</TableCell>
                            <TableCell>{item.goals}</TableCell>
                            <TableCell>{item.submitted}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PendingApprovalsTable;