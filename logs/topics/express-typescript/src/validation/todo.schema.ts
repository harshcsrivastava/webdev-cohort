import { z } from "zod";
// Enables runtime validation

export const todoValidationSchema = z.object({
    id: z.string().describe("ID of todo"),
    title: z.string().describe("Title of todo"),
    description: z.string().optional().describe("Description of TODO"),
    isCompleted: z
        .boolean()
        .default(false)
        .describe("If the todo is completed or not"),
});
export type Todo = z.infer<typeof todoValidationSchema>;

// DRY - Donot Repeat Yourself

// export interface ITodo{
//     // Create a interface

//     id: string,
//     title: string,
//     description?: string,
//     isCompleted: boolean
// }
