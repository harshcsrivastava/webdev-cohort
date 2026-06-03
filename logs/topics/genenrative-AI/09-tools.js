import { checkOpenAI } from "./01-setup.js";
import { calculator, calculateTool } from "./tools/calculator.js";

const client = await checkOpenAI();
const model = "gpt-5.4-mini";

// agya tool
const tools = [calculateTool];

const messages = [
    {
        role: "user",
        content: "What is result of multiply  12 and 8 ?",
    },
];

// tool usually server pe rehta hai and LLM mang ke lata hai but user ko llm jawab nhi deta, kha(eat) jata hai

const firstResponse = await client.chat.completions.create({
    model,
    messages,
    tool_choice: "auto", // apne aap dekh lo jo chahiye list me se
    tools, // tools ki list
});

console.log("====================================");
const assistantMessage = firstResponse.choices[0].message;
console.log(assistantMessage); // tool call karne ke liye message me kuch aata hai;
console.log(assistantMessage.tool_calls); // tool_calls me data bhi hai ki konsa tool call karna hai aur uske parameters kya hai
messages.push(assistantMessage); // assistant ka message bhi conversation me add kar do

console.log("====================================");

// outdated hai, ab tool_calls me aa jata hai
if(assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
  for(const tool_call of assistantMessage.tool_calls) {
    const toolName = tool_call.name;
    const args = tool_call.arguments;
    const toolResponse = await calculator(args); // yaha pe humne calculator tool ka response le liya
    messages.push({
      role: "tool",
      name: toolName,
      content: toolResponse,
    });
  }
}

 const secondResponse = await client.chat.completions.create({
    model,
    messages,
    tool_choice: "auto",
    tools
});

console.log("====================================");
console.log(secondResponse.choices[0].message.content); // final response me answer aa jayega
console.log("====================================");
