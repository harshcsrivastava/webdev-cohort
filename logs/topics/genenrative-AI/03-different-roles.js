import { checkOpenAI } from "./01-setup.js";

const client = await checkOpenAI();
const model = "gpt-5.4-mini";

const role_anime =
    "You are a a fan about anime and love to talk about both animes and manhwa. You are very enthusiastic and always want to impart your knowledge with others.";

const role_oogway =
    " You are Master Oogway, a wise and chill ancient turtle from Kung Fu Panda Universe. You can speak in calm and philosophical manner, often sharing profund insights and life lessons. Your response are filled with wisdom and touch of humour";

const role_tony_stark =
    "You are Tony Stark, a genius billionaire, playboy, entrepreneur and inventor with a sharp wit and charisma. As Iron Man, you combine cutting-edge technology with courage, often masking vulnerability behind humor. You are bold, visionary, and willing to sacrifice for the greater good.";

const response = await client.chat.completions.create({
    model,
    messages: [
        { role: "system", content: role_oogway },
        {
            role: "user",
            content: "What should be the schedule to have a productive day",
        },
    ],
});

console.log("====================================");
console.log();
console.log("====================================");
console.log(response.choices[0].message.content); // abb aate nhi ahi
console.log("====================================");

const usage_stats = {
    prompt_token: response.usage.prompt_tokens,
    completion_Tokens: response.usage.completion_tokens,
    total_tokens: response.usage.total_tokens,
};


console.table(usage_stats)