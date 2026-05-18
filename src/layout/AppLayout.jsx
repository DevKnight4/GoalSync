import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const AppLayout = () => {
    const [role, setRole] = useState("employee");

    return (
        <div className="min-h-screen flex bg-slate-50">

            {/* Sidebar */}
            <aside className="w-72 bg-white border-r p-6">

                {/* Logo */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold">
                        GoalSync
                    </h1>

                    <p className="text-slate-500 text-sm mt-1">
                        Goal Management Portal
                    </p>
                </div>

                {/* Role Switcher */}
                <div className="mb-8">
                    <label className="text-sm text-slate-500">
                        Current Role
                    </label>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full mt-2 border rounded-xl p-3"
                    >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-3">

                    {/* Employee Links */}
                    {role === "employee" && (
                        <>
                            <Link
                                to="/employee"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/employee/goals"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Goal Sheet
                            </Link>

                            <Link
                                to="/employee/checkins"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Quarterly Check-ins
                            </Link>
                        </>
                    )}

                    {/* Manager Links */}
                    {role === "manager" && (
                        <>
                            <Link
                                to="/manager"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/manager/approvals"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Approvals
                            </Link>

                            <Link
                                to="/manager/team-progress"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Team Progress
                            </Link>
                        </>
                    )}

                    {/* Admin Links */}
                    {role === "admin" && (
                        <>
                            <Link
                                to="/admin"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/admin/analytics"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Analytics
                            </Link>

                            <Link
                                to="/admin/audit-logs"
                                className="px-4 py-3 rounded-xl hover:bg-slate-100 transition"
                            >
                                Audit Logs
                            </Link>
                        </>
                    )}

                </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default AppLayout;