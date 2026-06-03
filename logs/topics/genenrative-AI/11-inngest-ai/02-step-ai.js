import { inngest, gpt_5_4_mini } from "./inngest-client.js";

export const summarizeThenTranslate = inngest.createFunction(
    {
        id: "chai-summarize-then-translate",
        triggers: [{ event: "chai.summarize.then.translate" }],
    },
    async ({ event, step }) => {
        // AI ke andar infer karte.
        const sum = await step.ai.infer("summarize", {
            model: gpt_5_4_mini,
            body: {
                input: [
                    {
                        role: "user",
                        content: `Summarize this text in 1 line: ${event.data.text}`,
                    },
                ],
            },
        });

        const summary = sum.output[0].content[0].text; // inngest aise deta hai naki open ai | wrapper hai na

        const trans = await step.ai.infer("translate", {
            model: gpt_5_4_mini,
            body: {
                input: [
                    {
                        role: "user",
                        content: `Translate this summary to Hindi: ${summary}`,
                    },
                ],
            },
        });

        const translation = trans.output[0].content[0].text;

        return { summary, translation };
    },
);
