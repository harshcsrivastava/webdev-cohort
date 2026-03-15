/**
 * How to run typeScript file directly?
 * 
 * We can ask the tsconfig.json file to compile and watch the 
 * src folder and output the compiled JavaScript files to the 
 * dist folder. 
 * Then we can run the compiled JavaScript files using node.
 * 
 * Compiler search this file with tsconfig.json in root file
 * Install typescript globally using npm install -g typescript
 * run tsc --init to create the file
 * 
 * Uncomment the rootDir and outDir(./dist <distributable_file>) in tsconfig.json file
 * 
 * Install tsc-watch as a dev dependency using npm install -D tsc-watch
 * Install typescript as a dev dependency using npm install -D typescript
 * 
 * Use "dev": "tsc-watch --onSuccess \"node dist/index.js\"" : successfull run hone pe compile kr do
 * 
 * It enables automatic hot reload.
 * 
 * -------------------------------------------------
 * 
 * You cannot use express directly in TS because express ka final JS me hai not TS
 * DT - typedefinition available hai to
 * npm i @types/<package_name> -D
 * 
 * add + before env variable makes it number
 * 
 * ZOD is runtime environment used for validation in typescropt
 * Zod is a TypeScript-first schema validation library used to validate and type-check data at runtime.

* It ensures that incoming data (API requests, forms, env variables, etc.) matches the expected structure and types.
 */

import http from "node:http";
import { env } from "./env.js";
import { createServerApplication } from "./app/app.js";

async function main() {
    try {
        const server = http.createServer(createServerApplication());
        const PORT: number = env.PORT ? +env.PORT : 8080;

        server.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    } catch (error) {
        throw error;
    }
}

main();
