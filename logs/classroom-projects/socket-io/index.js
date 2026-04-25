import http from "node:http";
import { Server } from "socket.io";
import express from "express";
import path from "node:path";

async function main() {
    const app = express();
    app.use(express.static(path.resolve("./public")));

    const server = http.createServer(app);
    const io = new Server();

    io.attach(server);

    io.on("connection", (socket) => {
        console.log(`A new socket is connected: ${socket.id}`);

        socket.on("user:message", (data) => {
            // console.log("Message from socket ", data);
            // backend should broadcast to other users
            socket.broadcast.emit("server:message", data);
        });

        socket.on("user:typing", (data) => {
            console.log(data.text);
            socket.broadcast.emit("server:typing", {
                id: socket.id,
                text: data.text,
            });
        });
    });
    server.listen(9000, () => {
        console.log(`Http server is running on http://localhost:9000`);
    });
}

main();
