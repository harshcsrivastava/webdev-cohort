import { kafkaClient } from "./kafka-client";

async function init() {
    const kafkaConsumer = kafkaClient.consumer({
        groupId: `database-processor`,
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
            console.log(`Insert into DB Location`, { data });

            await heartbeat(); // agar heartbeat nhi milti to use dead declare krdega
        },
    });
}

init();
