import { inngest } from "./client.js";
import { auditLog } from "../store.js";

export const onTodoCreated = inngest.createFunction(
    {
        id: "on-todo-created", // more like a key
        triggers: [{ event: "todo/created" }], //array of events | kisi event ka trigger like mouse or keyboard event
    },
    async ({ event, step }) => {
        // we have many params like event, step
        // jisne bhi ye event call kiya uska data aaskta like req.body

        // await step.run(<name>, ) => most used | step ke andar fetch kro krna? direct kyo nhi?
        // inngest ka fetch durability deta hai

        await step.run("audit", async () => {
            auditLog.push({
                action: "CREATE_TODO",
                todoId: event.data.todo.id,
                title: event.data.todo.title,
                timestamp: new Date().toISOString(),
            });
            return { ok: true };
        });
    },
);

export const onTodoDeleted = inngest.createFunction(
    {
        id: "on-todo-deleted",
        retries: 2,
        triggers: [{ event: "todo/deleted" }],
    },
    async ({ event, step, attempt }) => {
        const id = event.data.todo.id;
        await step.run("cleanup", async () => {
            if (attempt === 0) {
                throw new Error(`Failed to cleanup of ${id}`);
            }
            return "Cleaned";
        });

        await step.run("audit", async () => {
            auditLog.push({
                action: "deleted",
                todoId: id,
            });
            return { ok: true };
        });
    },
);
