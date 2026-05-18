import StatCard from "@/components/dashboard/StatCard";

import {
    Target,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import { supabase } from "@/services/supabase";

const EmployeeDashboard = () => {

    const [goalCount, setGoalCount] =
        useState(0);

    const [goals, setGoals] =
        useState([]);

    const [completedCount, setCompletedCount] =
        useState(0);

    const [completedGoals, setCompletedGoals] =
        useState([]);

    useEffect(() => {

        const fetchGoals = async () => {

            try {

                // Replace with your REAL profile UUID
                const employeeId =
                    "167a48f9-838f-48c9-b52f-9ef9dec44ce0";

                // Fetch goal sheets
                const { data: sheets } =
                    await supabase
                        .from("goal_sheets")
                        .select("id")
                        .eq("employee_id", employeeId);

                if (!sheets?.length) return;

                const sheetIds =
                    sheets.map((sheet) => sheet.id);

                // Fetch goals
                const { data: goals } =
                    await supabase
                        .from("goals")
                        .select("*")
                        .in("sheet_id", sheetIds);

                const activeGoals =
                    goals.filter(
                        (goal) =>
                            goal.status !== "completed"
                    );

                const completedGoalsData =
                    goals.filter(
                        (goal) =>
                            goal.status === "completed"
                    );

                setGoalCount(activeGoals.length);

                setCompletedCount(
                    completedGoalsData.length
                );

                setGoals(activeGoals);

                setCompletedGoals(
                    completedGoalsData
                );

                setGoals(goals || []);

            } catch (err) {

                console.error(err);

            }
        };

        fetchGoals();

    }, []);

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Employee Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <StatCard
                    title="Total Goals"
                    value={goalCount}
                    icon={<Target size={32} />}
                    link="/employee/goals"
                />

                <StatCard
                    title="Completed Goals"
                    value={completedCount}
                    icon={<CheckCircle2 size={32} />}
                    link="/employee/completed-goals"
                />

                <StatCard
                    title="Pending Check-ins"
                    value="1"
                    icon={<Clock3 size={32} />}
                />

            </div>

            <div className="bg-white rounded-3xl border shadow-sm p-8 mt-8 w-full">

                <h2 className="text-2xl font-semibold mb-6">
                    My Active Goals
                </h2>

                {goals.length === 0 ? (

                    <p className="text-slate-500">
                        No goals created yet.
                    </p>

                ) : (

                    <table className="w-full">

                        <thead>

                            <tr className="border-b text-left">

                                <th className="pb-4">
                                    Goal
                                </th>

                                <th className="pb-4">
                                    Weightage
                                </th>

                                <th className="pb-4">
                                    Thrust Area
                                </th>

                                <th className="pb-4">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {goals
                                .filter(
                                    (goal) =>
                                        goal.status !==
                                        "completed"
                                )
                                .map((goal) => (

                                    <tr
                                        key={goal.id}
                                        className="border-b"
                                    >

                                        <td className="py-4">
                                            {goal.title}
                                        </td>

                                        <td className="py-4">
                                            {goal.weightage}%
                                        </td>

                                        <td className="py-4">
                                            {goal.thrust_area}
                                        </td>

                                        <td className="py-4">

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                Active
                                            </span>

                                        </td>

                                    </tr>
                                ))}

                        </tbody>

                    </table>
                )}

            </div>

            <div className="bg-white rounded-3xl border shadow-sm p-8 mt-8 w-full">

                <h2 className="text-2xl font-semibold mb-6">
                    Completed Goals
                </h2>

                {completedGoals.length === 0 ? (

                    <p className="text-slate-500">
                        No completed goals yet.
                    </p>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full table-auto">

                            <thead>

                                <tr className="border-b text-left">

                                    <th className="pb-4">
                                        Goal
                                    </th>

                                    <th className="pb-4">
                                        Weightage
                                    </th>

                                    <th className="pb-4">
                                        Thrust Area
                                    </th>

                                    <th className="pb-4">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {completedGoals.map(
                                    (goal) => (

                                        <tr
                                            key={goal.id}
                                            className="border-b"
                                        >

                                            <td className="py-4">
                                                {goal.title}
                                            </td>

                                            <td className="py-4">
                                                {goal.weightage}%
                                            </td>

                                            <td className="py-4">
                                                {goal.thrust_area}
                                            </td>

                                            <td className="py-4">

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                    Completed
                                                </span>

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
};

export default EmployeeDashboard;