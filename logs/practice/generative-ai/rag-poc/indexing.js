import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { QdrantVectorStore } from "@langchain/qdrant";

async function generateVectorEmbeddingsForFile(filepath) {
  // Load the PDF content as document
  const loader = new PDFLoader(filepath);
  const document = await loader.load(); // already chunks data page by page

  // document[0]. has id, metadata & content

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

  const client = new QdrantClient({
    url: "http://localhost:6333",
    checkCompatibility: false,
  });

  // this is a vector store
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings, // use this embedding model
    {
      client,
      collectionName: "chaicode-docs", // first time maybe collection na mile
    },
  );

  await vectorStore.addDocuments(document);
  console.log(`all the docs are indexed`);
}

generateVectorEmbeddingsForFile("ddia.pdf").catch((error) => {
  console.error("Indexing failed:", error);
  process.exitCode = 1;
});
