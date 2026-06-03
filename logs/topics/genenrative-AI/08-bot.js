import { checkOpenAI } from "./01-setup.js";
import readline from "readline";
const client = await checkOpenAI();
const model = "gpt-5.4-mini";

const conversation = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const systemPrompt = "You are a helpful assistant which responds in 5 line";

function askQuestion(userPrompt) {
    return new Promise((resolve) => {
        rl.question(userPrompt, (answer) => {
            resolve(answer);
        });
    });
}

while (true) {
    const userQuestion = await askQuestion("Ask a question: ");

    if (userQuestion.toLowerCase() === "exit") {
        console.log("Exiting...");
        break;
    }

    const stream = await client.chat.completions.create({
        model,
        stream: true,
        messages: [
            { role: "system", content: systemPrompt },
            ...conversation,
            { role: "user", content: userQuestion },
        ],
    });

    let response = ""

    process.stdout.write("Chai Bot: ");
    for await (const message of stream) {
        const delta = message.choices[0]?.delta?.content;

        if (delta) {
            process.stdout.write(delta);
            response += delta
        }
    }
    conversation.push({role: 'user', content: userQuestion})
    conversation.push({role: 'assistant', content: response})

    console.log("\n");
}
rl.close();
