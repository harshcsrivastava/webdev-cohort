import { createServer } from "node:http"
import { createExpressApplication } from "./app/index.js";
async function main(){
    try {
        const server = createServer(createExpressApplication())
        const PORT: number = 8080;
        server.listen(PORT, ()=> {
            console.log(`Server is running on PORT: ${PORT} at http://localhost:${PORT}/`);
            
        })
    } catch (error) {
        console.log(`Error starting server`);
        throw error
        
    }
}

main()