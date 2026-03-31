import { createServer } from "node:http";
import "dotenv/config";
import { createExpressApplication } from "./app/app.js";

async function main() {
    try {
        const server = createServer(createExpressApplication());
        const PORT: number = Number(process.env.PORT) || 3000;

        server.listen(PORT, () => {
            console.log(
                `Server is running on PORT: ${PORT} at http://localhost:${PORT}/`,
            );
        });
    } catch (error) {
        console.log(`Error starting server`);
        throw error;
    }
}

main();
