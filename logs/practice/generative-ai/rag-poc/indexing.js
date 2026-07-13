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
  let currentChapter = 0;
  // Regex looks for "Chapter " followed by numbers or roman numerals at word boundaries case-insensitively
  const chapterRegex = /\b(?:chapter|ch\.)\s*(\d+|[ivxlcdm]+)\b/i;

  for (const page of document) {
    const textContent = page.pageContent;

    // Scan text to see if a new chapter is explicitly mentioned on this page
    const match = textContent.match(chapterRegex);
    if (match) {
      const chapterVal = match[1];
      // Convert Roman Numerals to regular numbers if necessary, or just parse integer
      const parsedChapter = isNaN(chapterVal)
        ? romanToArabic(chapterVal)
        : parseInt(chapterVal, 10);

      if (!isNaN(parsedChapter)) {
        currentChapter = parsedChapter;
      }
    }

    // Safely append or merge the dynamic chapter structural flag into your metadata layer
    page.metadata = {
      ...page.metadata,
      chapter: currentChapter, // If pages precede Chapter 1 (e.g. Preface), they'll be tagged as 0
    };
  }

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
  console.log(`Indexing completed for ${filepath}`);
}

// Helper utility to convert roman numerals (like "ix" or "iv") to numbers if your book uses them
function romanToArabic(roman) {
  const map = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 };
  return roman
    .toLowerCase()
    .split("")
    .reduce((acc, curr, i, arr) => {
      const val = map[curr];
      const next = map[arr[i + 1]];
      return next > val ? acc - val : acc + val;
    }, 0);
}

generateVectorEmbeddingsForFile("ddia.pdf").catch((error) => {
  console.error("Indexing failed:", error);
  process.exitCode = 1;
});

generateVectorEmbeddingsForFile("The_Art_Of_Laziness.pdf")
.catch((error) => {
  console.error("Indexing failed:", error);
  process.exitCode = 1;
});
