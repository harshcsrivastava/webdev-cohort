import { checkOpenAI } from "./01-setup.js";
const client = await checkOpenAI();
const model = "gpt-5.4-mini";

const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
        {
            role: "system",
            content: "You are a helpful assistant that responds in 5 line.",
        },
        { role: "user", content: "What is latest in AI" },
    ],
});

let last_chunk = null

for await(const message of stream){
  const delta = message.choices[0]?.delta?.content
  // delta means some chunk of it
  // delta can have content or not

  if(delta) {
    process.stdout.write(delta)
    // console log \n deta, this gives streaming response.
  }
  last_chunk += delta
}
