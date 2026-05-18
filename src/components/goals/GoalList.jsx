import { Trash2 } from "lucide-react";

const GoalList = ({ goals, onDeleteGoal, onCompleteGoal, isSubmitted, onEditGoal, }) => {
    const [editingGoalId,
        setEditingGoalId] =
        useState(null);

    const [editedTitle,
        setEditedTitle] =
        useState("");

    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6 mt-6">

            <h2 className="text-xl font-semibold mb-4">
                Current Goals
            </h2>

            <div className="space-y-4">

                {goals
                    .filter(
                        (goal) =>
                            goal.status !==
                            "completed"
                    )
                    .map((goal, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-4 flex items-start justify-between"
                        >

                            <div>
                                {editingGoalId === goal.id ? (

                                    <input
                                        value={editedTitle}
                                        onChange={(e) =>
                                            setEditedTitle(
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-lg px-3 py-2 w-full"
                                    />

                                ) : (

                                    <h3 className="font-semibold text-lg">
                                        {goal.title}
                                    </h3>
                                )}

                                <p className="text-slate-500 mt-1">
                                    {goal.description}
                                </p>

                                <div className="flex gap-4 mt-3 text-sm">
                                    <span>UoM: {goal.uomType}</span>
                                    <span>Target: {goal.target}</span>
                                    <span>Weightage: {goal.weightage}%</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {

                                    setEditingGoalId(
                                        goal.id
                                    );

                                    setEditedTitle(
                                        goal.title
                                    );
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm cursor-pointer"
                            >
                                Edit
                            </button>

                            {editingGoalId === goal.id && (

                                <button
                                    onClick={() => {

                                        onEditGoal(
                                            goal.id,
                                            {
                                                title:
                                                    editedTitle,
                                            }
                                        );

                                        setEditingGoalId(
                                            null
                                        );
                                    }}
                                    className="bg-black text-white px-4 py-2 rounded-xl text-sm cursor-pointer"
                                >
                                    Save
                                </button>
                            )}

                            {!isSubmitted && (
                                <button
                                    onClick={() => onDeleteGoal(index)}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    onCompleteGoal(goal.id)
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm cursor-pointer hover:bg-green-700 transition"
                            >
                                Mark Complete
                            </button>

                        </div>
                    ))}

            </div>

        </div>
    );
};

export default GoalList;