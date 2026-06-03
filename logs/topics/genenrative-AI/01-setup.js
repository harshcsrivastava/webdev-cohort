import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

export const apiKeyChecker = () => {
    if (!API_KEY) {
        console.error("Error: Key is not in env vars");
        process.exit(1);
    }
};

export const checkOpenAI = async () => {
    const openai = (await import("openai")).default;

    const client = new openai.OpenAI({
        apiKey: API_KEY,
    });

    if (!client) {
        console.error("Error: Failed to initialize client");
        process.exit(1);
    }
    console.log("====================================");
    console.log("OpenAI client initialized");
    console.log("====================================");
    return client;
};
