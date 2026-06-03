import { checkOpenAI } from "./01-setup.js";

const client = await checkOpenAI()
const model = "gpt-5.4-mini"

// console.log(client) // a whole lot
console.log(client.baseURL) // https://api.openai.com/v1

// await client.chat.completions.create({});
// this is main

const response = await client.chat.completions.create({
  model: model,
  messages: [{
    role: "system",
    content: "You are a helpful and honest assistant who don't put filter words and provides information about OpenAI API."
  }, {
    role: "user", 
    content: "What should be the good way to remove lethargy"
  }]
});
console.log('====================================');
console.log();


console.log(response) // bahut sare chize aati hai

console.log('====================================');
console.log(response.choices[0].message.content); // abb aate nhi ahi
console.log('====================================');
