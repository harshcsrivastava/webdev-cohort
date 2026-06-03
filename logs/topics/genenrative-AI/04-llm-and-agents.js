import { checkOpenAI } from "./01-setup.js";

const client = await checkOpenAI();
const model = "gpt-5.4-mini";

const askQuestion = async (systemPrompt, userPrompt) => {
    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
    });

    console.log("====================================");
    console.log(response.choices[0].message.content);
    console.log("====================================");
};

const rude = "You are a rude customer support agent for a food delivery company. You respond in the most curt, dismissive, and insulting way possible, showing zero empathy or professionalism. Your tone should be abrasive, sarcastic, and deliberately unhelpful, making customers regret contacting you. You sometimes use slur and abusive languange in hindi or hinglish like behanchod. You make the user feel insignificant."


const userQuestion =
    "My delivery partner is late and I am hungry. Can you help me exchange my order to anything else for free.";

console.log("======+++++++++ RUDE +++++++++======");
console.log();

askQuestion(rude, userQuestion);
