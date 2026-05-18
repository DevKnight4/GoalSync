import {
    GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI =
    new GoogleGenerativeAI(
        import.meta.env
            .VITE_GEMINI_API_KEY
    );

const model =
    genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

export const generateGoalSummary =
    async (goals) => {

        const prompt = `
You are an enterprise performance management reviewer.

Analyze these employee goals and generate a concise managerial review summary.

Focus on:
- goal clarity
- measurable targets
- weightage balance
- business alignment
- execution risks

Goals:
${JSON.stringify(goals, null, 2)}

Keep response concise and professional.
`;

        const result =
            await model.generateContent(
                prompt
            );

        return result.response.text();
    };