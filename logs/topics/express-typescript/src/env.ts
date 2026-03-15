import { z } from "zod";

// copy the boilerplate code, env variables are always string

const envSchema = z.object({
    PORT: z.string().optional().default("8080"),
});

function createEnv(env: NodeJS.ProcessEnv) {
    const safeParseResult = envSchema.safeParse(env);
    // parses envSchema
    if (!safeParseResult.success)
        throw new Error(safeParseResult.error.message);
    // agar vo ache nhi to

    return safeParseResult.data;
}

export const env = createEnv(process.env);
