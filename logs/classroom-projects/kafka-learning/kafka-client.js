import { Kafka } from "kafkajs";

/* This code snippet is creating a Kafka client instance using the `Kafka` class from the "kafkajs"
library. This client can be used to interact with Kafka brokers for producing
and consuming messages in a Kafka cluster. */
export const kafkaClient = new Kafka({
    clientId: "chaicode",
    brokers: ["localhost:9092"],
});
