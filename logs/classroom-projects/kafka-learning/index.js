import http from "node:http";

import express from "express";
import { Server } from "socket.io";
import path from "node:path";

async function main() {
    const PORT = 9000;

    const app = express();
    const server = http.createServer(app);
    const io = new Server();

    io.attach(server);


    app.use(express.static(path.resolve("./public")))
    app.get("/health", (_, res) => {
        return res.json({
            message: "Badhiya",
        });
    });

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

main();

//What we want to do - user ki location lo and 10sec me update kro
