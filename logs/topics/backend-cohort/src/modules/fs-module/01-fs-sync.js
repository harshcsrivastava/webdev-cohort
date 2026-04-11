import fs from "node:fs";

// WRITE
fs.writeFileSync("test.txt", "Hello from fs!");

// READ
const data = fs.readFileSync("test.txt", "utf-8");
console.log(data);

// APPEND
/* `fs.appendFileSync("test.txt", "\nKyaa haal chal");` is appending the string "\nKyaa haal chal" to
the end of the file named "test.txt". This operation adds the specified content to the existing
content of the file without overwriting it. */
fs.appendFileSync("test.txt", "\nKyaa haal chal");

// FOLDER CREATION
fs.mkdirSync("folderAtRoot/inner", {recursive: true}) // creates the folder recursively if the parent is not created


/* `fs.unlinkSync("test.txt")` is deleting the file named "test.txt" synchronously. It removes the
specified file from the file system. */
// fs.unlinkSync("test.txt")

// RENAME
fs.renameSync("test.txt", "nuke-codes.txt")

// COPY
fs.cpSync("nuke-codes.txt", "pmo-copy.txt")

/* `fs.rmdirSync("folderAtRoot")` is a function call in Node.js that is attempting to remove the
directory named "folderAtRoot". This function is synchronous, meaning it will block the execution of
further code until the directory removal operation is completed. If the directory is not empty, the
removal will fail unless the `recursive: true` option is provided during the directory creation. */
fs.rmdirSync("folderAtRoot", {recursive: true})

