import { checkOpenAI } from "./01-setup.js";
const client = await checkOpenAI();
const model = "gpt-5.4-mini";

const conversation = [];
// memory for agents

/**
 * The function `askQuestion` takes a system prompt, user prompt, and optional history array, sends
 * them to a chat completion service, and returns the response message.
 * @param systemPrompt - The `systemPrompt` parameter is the message or prompt displayed by the system
 * to the user before they provide their input. It sets the context or asks for information from the
 * user.
 * @param userPrompt - The `userPrompt` parameter in the `askQuestion` function is the message or
 * prompt that the user provides to the system. This prompt is used to generate a response from the AI
 * model being used in the function.
 * @param [history] - The `history` parameter in the `askQuestion` function is an array that stores the
 * conversation history between the system, user, and assistant. It keeps track of the messages
 * exchanged between the user and the system prompts. This history array is passed as an argument to
 * the function to maintain context and provide
 * @returns The function `askQuestion` is returning the content of the response from the chat
 * completions API, specifically the content of the first choice message in the response.
 */
const askQuestion = async (systemPrompt, userPrompt, history = []) => {
    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: userPrompt },
        ],
    });

    history.push({ role: "user", content: userPrompt });
    history.push({
        role: "assistant",
        content: response.choices[0].message.content,
    });

    return response.choices[0].message.content;
};

const userQuestion1 =
    "My name is Harsh. I love gaming and mostly binge through cinma and manhwas. Tell me a 1 line joke.";


const response1 = await askQuestion(
    "You always respond in 1 line",
    userQuestion1,
    conversation,
);
console.log("==================Response 1==================");
console.log(response1);
console.log("====================================");
const userQuestion2 = "What is my name";


const response2 = await askQuestion(
    "You always respond in 1 line",
    userQuestion2,
    conversation
);

console.log("==================Response 2==================");
console.log(response2);
console.log("====================================");
console.log(conversation)