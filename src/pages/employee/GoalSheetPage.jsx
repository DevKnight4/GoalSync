import { useState } from "react";
import { useEffect } from "react";

import {
    createGoalSheet,
    addGoalToSheet,
    deleteGoalById,
    submitGoalSheet,
    markGoalCompleted,
    updateGoalById,
} from "@/services/goalService";

import { supabase } from "@/services/supabase";

import GoalForm from "@/components/goals/GoalForm";
import GoalList from "@/components/goals/GoalList";

import {
    validateWeightage,
    validateGoalLimit,
    validateMinimumWeightage,
} from "@/utils/validators";

const GoalSheetPage = () => {
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] =
        useState(false);

    const [sheetId, setSheetId] =
        useState(null);

    const [managerComment, setManagerComment] =
        useState("");

    const [sheetStatus, setSheetStatus] =
        useState("draft");

    useEffect(() => {
        const initializeSheet = async () => {

            try {

                // TEMP mock employee id
                const employeeId =
                    "167a48f9-838f-48c9-b52f-9ef9dec44ce0";

                // Check existing sheet
                const {
                    data: existingSheet,
                    error: fetchError,
                } = await supabase
                    .from("goal_sheets")
                    .select("*")
                    .eq("employee_id", employeeId)
                    .maybeSingle();

                // If exists
                if (existingSheet) {

                    setSheetId(existingSheet.id);

                    setSheetStatus(
                        existingSheet.status
                    );

                    // Fetch goals
                    const { data: existingGoals } =
                        await supabase
                            .from("goals")
                            .select("*")
                            .eq("sheet_id", existingSheet.id);

                    setGoals(existingGoals || []);

                    const hasActiveGoals =
                        existingGoals?.some(
                            (goal) =>
                                goal.status !==
                                "completed"
                        );

                    if (
                        hasActiveGoals &&
                        (
                            existingSheet.status ===
                            "submitted" ||
                            existingSheet.status ===
                            "approved"
                        )
                    ) {
                        setIsSubmitted(true);
                    } else {
                        setIsSubmitted(false);

                        setSheetStatus("draft");

                        setManagerComment("");
                    }

                    if (
                        existingSheet.status ===
                        "returned"
                    ) {
                        setIsSubmitted(false);
                    }

                    setManagerComment(
                        existingSheet.manager_comment || ""
                    );

                } else {

                    // Create new sheet
                    const sheet =
                        await createGoalSheet(
                            employeeId
                        );

                    setSheetId(sheet.id);
                }

            } catch (err) {
                console.error(err);
            }
        };

        initializeSheet();
    }, []);

    const addGoal = (goal) => {

        setError("");

        // Goal limit validation
        if (!validateGoalLimit(goals)) {
            setError("Maximum 8 goals allowed.");
            return;
        }

        // Minimum weightage validation
        if (
            !validateMinimumWeightage(goal.weightage)
        ) {
            setError(
                "Each goal must have minimum 10% weightage."
            );
            return;
        }

        // Total weightage validation
        const updatedGoals = [...goals, goal];

        const weightageValidation =
            validateWeightage(updatedGoals);

        if (weightageValidation.exceeds) {
            setError(
                `Total weightage cannot exceed 100%. Current total: ${weightageValidation.total}%`
            );
            return;
        }

        const saveGoal = async () => {

            try {

                const goalPayload = {
                    sheet_id: sheetId,
                    thrust_area: goal.thrustArea,
                    title: goal.title,
                    description: goal.description,
                    uom_type: goal.uomType,
                    target: goal.target,
                    weightage: Number(goal.weightage),
                };

                const savedGoal =
                    await addGoalToSheet(goalPayload);

                setGoals([
                    ...goals,
                    savedGoal[0],
                ]);

                setSheetStatus("draft");

                setIsSubmitted(false);

                setManagerComment("");

            } catch (err) {
                console.error(err);

                setError(
                    "Failed to save goal."
                );
            }
        };

        saveGoal();
    };

    const deleteGoal = async (index) => {

        try {

            const goalToDelete =
                goals[index];

            await deleteGoalById(
                goalToDelete.id
            );

            const updatedGoals =
                goals.filter(
                    (_, i) => i !== index
                );

            setGoals(updatedGoals);

            setError("");

        } catch (err) {

            console.error(err);

            setError(
                "Failed to delete goal."
            );
        }
    };

    const editGoal = async (
        goalId,
        updatedGoal
    ) => {

        try {

            await updateGoalById(
                goalId,
                updatedGoal
            );

            const updatedGoals =
                goals.map((goal) =>
                    goal.id === goalId
                        ? {
                            ...goal,
                            ...updatedGoal,
                        }
                        : goal
                );

            setGoals(updatedGoals);

        } catch (err) {

            console.error(err);
        }
    };

    const handleSubmitSheet = async () => {

        const weightageValidation =
            validateWeightage(goals);

        if (!weightageValidation.isValid) {
            setError(
                "Total weightage must equal exactly 100% before submission."
            );
            return;
        }

        try {

            await submitGoalSheet(sheetId);

            setIsSubmitted(true);

            setSheetStatus("submitted");

            setError("");

        } catch (err) {

            console.error(err);

            setError(
                "Failed to submit goal sheet."
            );
        }
    };

    const completeGoal = async (
        goalId
    ) => {

        try {

            await markGoalCompleted(
                goalId
            );

            const updatedGoals =
                goals.map((goal) =>
                    goal.id === goalId
                        ? {
                            ...goal,
                            status: "completed",
                        }
                        : goal
                );

            setGoals(updatedGoals);

        } catch (err) {

            console.error(err);
        }
    };

    const weightageInfo =
        validateWeightage(goals);

    return (
        <div>

            <h1 className="text-3xl font-bold">
                Goal Sheet
            </h1>

            <div className="mt-4 flex items-center gap-3">

                <span className="text-sm text-slate-500">
                    Status:
                </span>

                <span
                    className={`px-4 py-1 rounded-full text-sm font-medium
    ${sheetStatus === "approved"
                            ? "bg-green-100 text-green-700"
                            : sheetStatus === "returned"
                                ? "bg-red-100 text-red-700"
                                : sheetStatus === "submitted"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {sheetStatus}
                </span>

            </div>

            {sheetStatus !== "draft" && managerComment && (
                <div className="bg-slate-100 border rounded-2xl p-5 mt-6">

                    <h2 className="font-semibold mb-2">
                        Manager Review
                    </h2>

                    <p className="text-slate-700">
                        {managerComment}
                    </p>

                </div>
            )}

            {/* Validation Summary */}
            <div className="bg-white rounded-2xl border shadow-sm p-5 mt-6">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-slate-500 text-sm">
                            Total Weightage
                        </p>

                        <h2 className="text-3xl font-bold mt-1">
                            {weightageInfo.total}%
                        </h2>
                    </div>

                    <div>
                        {weightageInfo.isValid ? (
                            <span className="text-green-600 font-semibold">
                                Ready to Submit
                            </span>
                        ) : (
                            <span className="text-yellow-600 font-semibold">
                                Remaining: {weightageInfo.remaining}%
                            </span>
                        )}
                    </div>

                </div>

            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 text-red-700 border border-red-300 rounded-xl p-4 mt-6">
                    {error}
                </div>
            )}

            {weightageInfo.total < 100 && (
                <GoalForm onAddGoal={addGoal} />
            )}

            <GoalList
                goals={goals}
                onDeleteGoal={deleteGoal}
                onCompleteGoal={completeGoal}
                onEditGoal={editGoal}
                isSubmitted={isSubmitted}
            />

            {weightageInfo.total === 100 &&
                sheetStatus !== "submitted" &&
                sheetStatus !== "approved" && (
                    <button
                        onClick={handleSubmitSheet}
                        disabled={!weightageInfo.isValid}
                        className={`mt-6 px-6 py-3 rounded-xl text-white font-medium transition ${weightageInfo.isValid
                            ? "bg-black hover:bg-slate-800"
                            : "bg-slate-400 cursor-not-allowed"
                            }`}
                    >
                        Submit Goal Sheet
                    </button>
                )}

        </div>
    );
};



export default GoalSheetPage;