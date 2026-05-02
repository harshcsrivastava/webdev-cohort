import http from "node:http";
import path from "node:path";

import express from "express";
import { Server } from "socket.io";
import { kafkaClient } from "./kafka-client.js";

async function main() {
    const PORT = 9000;

    const app = express();
    const server = http.createServer(app);
    const io = new Server();

    const kafkaProducer = kafkaClient.producer();
    await kafkaProducer.connect();

    const kafkaConsumer = kafkaClient.consumer({
        groupId: `socket-server-${PORT}`,
    }); // needs a groupId
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({
        topics: ["location-updates"],
        fromBeginning: true,
    });
    kafkaConsumer.run({
        // jab bhi koi message milega, ye callback run krega
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
            const data = JSON.parse(message.value.toString());
            console.log(`Kafka Consumer Data is received`, { data });

            io.emit("server:location:update", {
                id: socket.id,
                latitude: data.latitude,
                longitude: data.longitude,
            });

            await heartbeat(); // agar heartbeat nhi milti to use dead declare krdega
        },
    });

    io.attach(server);

    io.on("connection", (socket) => {
        console.log("Socket connected: ", socket.id);
        socket.on("client:location:update", (locationData) => {
            const { latitude, longitude } = locationData;
            console.log(locationData);

            // Frontend se user location ayi and kafka me push kr di.
            // send message with topic and messages(with key)
            // key decides partition here, otherwise mention partiton instead of key
            kafkaProducer.send({
                topic: "location-updates",
                messages: [
                    {
                        key: socket.id,
                        value: JSON.stringify({
                            id: socket.id,
                            latitude,
                            longitude,
                        }),
                    },
                ],
            });
        });
    });

    app.use(express.static(path.resolve("./public")));
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
