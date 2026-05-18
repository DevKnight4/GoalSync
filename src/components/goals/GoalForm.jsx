import { useState } from "react";

const GoalForm = ({ onAddGoal }) => {
    const [goal, setGoal] = useState({
        title: "",
        description: "",
        thrustArea: "",
        uomType: "min",
        target: "",
        weightage: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddGoal(goal);

        setGoal({
            title: "",
            description: "",
            thrustArea: "",
            uomType: "min",
            target: "",
            weightage: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border shadow-sm p-6 mt-6 space-y-4"
        >

            <h2 className="text-xl font-semibold">
                Add Goal
            </h2>

            <input
                type="text"
                placeholder="Goal Title"
                value={goal.title}
                onChange={(e) =>
                    setGoal({ ...goal, title: e.target.value })
                }
                className="w-full border rounded-xl p-3"
            />

            <textarea
                placeholder="Goal Description"
                value={goal.description}
                onChange={(e) =>
                    setGoal({ ...goal, description: e.target.value })
                }
                className="w-full border rounded-xl p-3"
            />

            <select
                value={goal.thrustArea}
                onChange={(e) =>
                    setGoal({
                        ...goal,
                        thrustArea: e.target.value,
                    })
                }
                className="w-full border rounded-xl p-3"
            >
                <option value="">
                    Select Thrust Area
                </option>

                <option value="Operational Excellence">
                    Operational Excellence
                </option>

                <option value="Customer Experience">
                    Customer Experience
                </option>

                <option value="Innovation">
                    Innovation
                </option>

                <option value="Revenue Growth">
                    Revenue Growth
                </option>

                <option value="Automation">
                    Automation
                </option>

                <option value="Cost Optimization">
                    Cost Optimization
                </option>
            </select>

            <select
                value={goal.uomType}
                onChange={(e) =>
                    setGoal({ ...goal, uomType: e.target.value })
                }
                className="w-full border rounded-xl p-3"
            >
                <option value="min">Min</option>
                <option value="max">Max</option>
                <option value="timeline">Timeline</option>
                <option value="zero">Zero</option>
            </select>

            <input
                type="number"
                placeholder="Target"
                value={goal.target}
                onChange={(e) =>
                    setGoal({ ...goal, target: e.target.value })
                }
                className="w-full border rounded-xl p-3"
            />

            <input
                type="number"
                placeholder="Weightage"
                value={goal.weightage}
                onChange={(e) =>
                    setGoal({ ...goal, weightage: e.target.value })
                }
                className="w-full border rounded-xl p-3"
            />

            <button
                type="submit"
                className="bg-black text-white px-5 py-3 rounded-xl"
            >
                Add Goal
            </button>

        </form>
    );
};

export default GoalForm;