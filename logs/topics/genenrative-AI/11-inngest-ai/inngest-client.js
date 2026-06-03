import { Inngest } from "inngest";
/* The line `import { openaiResponses } from "@inngest/ai/models";` is importing the `openaiResponses`
function from the `@inngest/ai/models` module. This function is likely used to interact with
OpenAI's API and handle responses from the OpenAI models. */
import { openaiResponses } from "@inngest/ai/models";

export const inngest = new Inngest({ id: "chaicode-inngest-ai" });

export const gpt_5_4_mini = openaiResponses({
    model: "gpt-5.4-mini",
    apiKey: process.env.API_KEY,
});
