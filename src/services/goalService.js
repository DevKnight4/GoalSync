import { supabase } from "./supabase";

export const createGoalSheet = async (
    employeeId
) => {
    const { data, error } = await supabase
        .from("goal_sheets")
        .insert([
            {
                employee_id: employeeId,
                status: "draft",
            },
        ])
        .select()
        .single();

    if (error) throw error;

    return data;
};

export const addGoalToSheet = async (
    goal
) => {
    const { data, error } = await supabase
        .from("goals")
        .insert([goal])
        .select();

    if (error) throw error;

    return data;
};

export const deleteGoalById = async (
    goalId
) => {
    const { error } = await supabase
        .from("goals")
        .delete()
        .eq("id", goalId);

    if (error) throw error;
};

export const submitGoalSheet = async (
    sheetId
) => {
    const { error } = await supabase
        .from("goal_sheets")
        .update({
            status: "submitted",
            submitted_at: new Date(),
        })
        .eq("id", sheetId);

    if (error) throw error;
};

export const fetchSubmittedSheets =
    async () => {

        const { data, error } =
            await supabase
                .from("goal_sheets")
                .select(`
          *,
          goals (*)
        `)
                .eq("status", "submitted");

        if (error) throw error;

        return data;
    };

export const updateSheetStatus =
    async (
        sheetId,
        status,
        managerComment = ""
    ) => {

        const { error } =
            await supabase
                .from("goal_sheets")
                .update({
                    status,
                    manager_comment:
                        managerComment,
                })
                .eq("id", sheetId);

        if (error) throw error;
    };

export const markGoalCompleted =
    async (goalId) => {

        const { error } =
            await supabase
                .from("goals")
                .update({
                    status: "completed",
                })
                .eq("id", goalId);

        if (error) throw error;
    };

export const updateGoalById =
    async (goalId, updates) => {

        const { data, error } =
            await supabase
                .from("goals")
                .update(updates)
                .eq("id", goalId)
                .select();

        if (error) throw error;

        return data;
    };