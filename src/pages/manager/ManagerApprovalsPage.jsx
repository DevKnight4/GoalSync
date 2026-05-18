import {
    useEffect,
    useState,
} from "react";

import {
    fetchSubmittedSheets,
    updateSheetStatus,
} from "@/services/goalService";

import {
    generateGoalSummary,
} from "@/services/aiService";

const ManagerApprovalsPage = () => {

    const [sheets, setSheets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [comments, setComments] =
        useState({});

    const [aiSummaries, setAiSummaries] =
        useState({});

    useEffect(() => {

        const loadSheets = async () => {

            try {

                const data =
                    await fetchSubmittedSheets();

                setSheets(data || []);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        };

        loadSheets();

    }, []);

    const handleApprove =
        async (sheetId) => {

            try {

                await updateSheetStatus(
                    sheetId,
                    "approved",
                    comments[sheetId] || ""
                );

                setSheets(
                    sheets.filter(
                        (sheet) =>
                            sheet.id !== sheetId
                    )
                );

            } catch (err) {

                console.error(err);
            }
        };

    const handleReturn =
        async (sheetId) => {

            try {

                await updateSheetStatus(
                    sheetId,
                    "returned",
                    comments[sheetId] || ""
                );

                setSheets(
                    sheets.filter(
                        (sheet) =>
                            sheet.id !== sheetId
                    )
                );

            } catch (err) {

                console.error(err);
            }
        };

    const handleGenerateSummary =
        async (sheetId, goals) => {

            try {

                const summary =
                    await generateGoalSummary(
                        goals
                    );

                setAiSummaries({
                    ...aiSummaries,
                    [sheetId]: summary,
                });

            } catch (err) {

                console.error(err);
            }
        };

    if (loading) {
        return (
            <p>Loading approvals...</p>
        );
    }

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Manager Approvals
            </h1>

            <div className="space-y-6">

                {sheets.map((sheet) => (

                    <div
                        key={sheet.id}
                        className="bg-white rounded-2xl border shadow-sm p-6"
                    >

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Goal Sheet
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    Status: {sheet.status}
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 space-y-4">

                            {sheet.goals
                                .filter(
                                    (goal) =>
                                        goal.status !==
                                        "completed"
                                )
                                .map((goal) => (

                                    <div
                                        key={goal.id}
                                        className="border rounded-xl p-4"
                                    >

                                        <h3 className="font-semibold">
                                            {goal.title}
                                        </h3>

                                        <p className="text-slate-500 mt-1">
                                            {goal.description}
                                        </p>

                                        <div className="flex gap-4 mt-3 text-sm">
                                            <span>
                                                Weightage:
                                                {goal.weightage}%
                                            </span>

                                            <span>
                                                UoM:
                                                {goal.uom_type}
                                            </span>
                                        </div>

                                    </div>
                                ))}

                        </div>

                        <button
                            onClick={() =>
                                handleGenerateSummary(
                                    sheet.id,
                                    sheet.goals
                                )
                            }
                            className="bg-black text-white px-5 py-2 rounded-xl mt-6"
                        >
                            Generate AI Summary
                        </button>

                        {aiSummaries[sheet.id] && (

                            <div className="bg-slate-100 border rounded-2xl p-5 mt-6">

                                <h2 className="font-semibold mb-2">
                                    AI Review Summary
                                </h2>

                                <p className="text-slate-700 whitespace-pre-wrap">
                                    {aiSummaries[sheet.id]}
                                </p>

                            </div>
                        )}

                        <div className="mt-6">

                            <textarea
                                placeholder="Manager review comment..."
                                value={comments[sheet.id] || ""}
                                onChange={(e) =>
                                    setComments({
                                        ...comments,
                                        [sheet.id]: e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />

                            <div className="flex gap-4 mt-4">

                                <button
                                    onClick={() =>
                                        handleApprove(sheet.id)
                                    }
                                    className="bg-green-600 text-white px-5 py-2 rounded-xl"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        handleReturn(sheet.id)
                                    }
                                    className="bg-red-600 text-white px-5 py-2 rounded-xl"
                                >
                                    Return
                                </button>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default ManagerApprovalsPage;