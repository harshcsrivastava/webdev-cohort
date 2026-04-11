import fs from "node:fs/promises";

const data = await fs.readFile("promises.txt", "utf-8");

console.log(data);
