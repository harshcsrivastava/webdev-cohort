import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
// import OpenAI from "openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function query(userQuery) {
  // Initialize the embedding model
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENROUTER_API_KEY,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not set.");
  }
  // convert user query into vector embedings
  // search the vectors in the qdrant
  // this is a vector store
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings, // use this embedding model
    {
      url: "http://localhost:6333",
      collectionName: "chaicode-docs", // first time maybe collection na mile
    },
  );
  // get similar vectors and chunks and increase the bottleneck if it is a summary
  const isSummaryRequest =
    userQuery.toLowerCase().includes("summary") ||
    userQuery.toLowerCase().includes("chapter");
  const topK = isSummaryRequest ? 25 : 5; // Pull much more context for broad summaries

  const vectorRetriever = vectorStore.asRetriever({ k: topK }); // top ke sirf at max 5 leke ana ya 25 leke ana based on summary request
  const results = await vectorRetriever.invoke(userQuery);

  // feed those chunks to LLM models

  const SYSTEM_PROMPT = `
  You are an expert in answering user queries based on the 
  provided context about the document. Do not answer 
  anything beyond what is provided.
  
  Always answer the user clearly, and append which page number and book name the information came from.
  
  User Documents:
  ${results
    .map((e) => {
      // 2. SAFE METADATA PARSING: Fallback chains to prevent undici/null crashes
      const pageNum =
        e.metadata?.page ?? e.metadata?.loc?.pageNumber ?? "Unknown Page";
      const bookName = e.metadata?.source || "Unknown Document";

      return JSON.stringify({
        bookName: bookName,
        pageContent: e.pageContent,
        pageNumber: pageNum,
      });
    })
    .join("\n\n")}
  `;

  const result = streamText({
    // Choose your preferred chat model string from OpenRouter
    model: openrouter.chat("openrouter/free"),
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userQuery }],
  });

  process.stdout.write("LLM Response: ");

  // 3. Consume and print chunks in real-time as they arrive
  for await (const textChunk of result.textStream) {
    process.stdout.write(textChunk);
  }
  process.stdout.write("\n\n-------------------\n\n");
}

async function run() {
  await query("what are the contents of the book?");
  await query(
    "will this book help with learning about system design for interviews?",
  );
  await query("give me the summary of the chapter 1?");
}

run().catch(console.error);
