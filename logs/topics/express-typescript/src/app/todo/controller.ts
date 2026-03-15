import {
    todoValidationSchema,
    type Todo,
} from "../../validation/todo.schema.js";
import type { Request, Response } from "express";

class TodoController {
    // Using inmemory database
    // we dont know how db looks, so we will create Interface with help of ZOD, but zod doesnt use TS in this
    //   to use runtime validation we need zod

    private _db: Todo[];

    constructor() {
        this._db = [];
    }

    public handleAllGetTodos(req: Request, res: Response) {
        const todos = this._db;
        // Cannot read properties of undefined (reading '_db') - this ko nhi padh paa rha
        // We use bind so that it runs when the user runs

        return res.json({ todos });
    }

    public async handleInsertTodo(req: Request, res: Response) {
        try {
            const unvalidated = req.body;
            const validationResult =
                await todoValidationSchema.parseAsync(unvalidated);
            this._db.push(validationResult);
            return res.status(201).json({ todo: validationResult });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

export default TodoController;
