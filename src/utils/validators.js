export const validateWeightage = (goals) => {

    const activeGoals = goals.filter(
        (goal) =>
            goal.status !== "completed"
    );

    const total = activeGoals.reduce(
        (sum, goal) =>
            sum + Number(goal.weightage),
        0
    );

    return {
        total,
        isValid: total === 100,
        exceeds: total > 100,
        remaining: 100 - total,
    };
};

export const validateGoalLimit = (goals) => {
    return goals.length <= 8;
};

export const validateMinimumWeightage = (weightage) => {
    return Number(weightage) >= 10;
};

// export const validateGoalLimit = () => { };

// export const validateQuarterWindow = () => { };

// export const validateGoalLock = () => { };