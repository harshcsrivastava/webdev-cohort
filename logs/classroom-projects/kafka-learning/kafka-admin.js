import { kafkaClient } from "./kafka-client.js";

async function setup() {
    // helps in creating TOPICS in KAFKA
    const admin = kafkaClient.admin();

    console.log(`Kafka Admin Connection....`);
    await admin.connect();
    console.log(`Connection Success...`);

    await admin.createTopics({
        topics: [
            {
                topic: "location-updates",
                numPartitions: 2,
            },
        ],
    });

    await admin.disconnect();
}

setup();
