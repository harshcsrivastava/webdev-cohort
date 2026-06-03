import express from "express";
import "dotenv/config";
import { todos, createTodo, deleteTodo } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/functions.js";

const app = express();
app.use(express.json());

// one line to add inngest
app.use("/api/inngest", serve({ client: inngest, functions: [onTodoCreated, onTodoDeleted] }));

app.post("/todos", async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const todo = createTodo(title);
    await inngest.send({
        name: "todo/created",
        data: { todo },
    });
    res.status(201).json(todo);
});

app.delete("/todos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const todo = deleteTodo(id);
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    await inngest.send({
        name: "todo/deleted",
        data: { todo },
    });
    res.json(todo);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
