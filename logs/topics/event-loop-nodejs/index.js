import fs from "fs";

setTimeout(() => console.log("TIMEOUT Function after Top-Level Code"), 0); // Event Callback
setImmediate(() => console.log("IMMEDIATE Function after IO Pooling"), 0);

fs.readFile("sample.txt", "utf-8", function (err, data) {
    console.log("Reading Completed");

    setTimeout(() => console.log("TIMER 2"), 0); // Event Callback
    setTimeout(() => console.log("TIMER 3"), 0); // Event Callback
    setImmediate(() => console.log("IMMEDIATE 2"), 0);
});

console.log("Hello from Top-Level Code");

/*
How the main thread executes the code while looping:

- Top-level code will always run first
- Import Statements
- Event Callbacks Registration Only
- Expired Callbacks
- IO Pooling
- `setImmediate()`
- `closeCallbacks()`
- Check Pending ? Loop : Exit;

https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
*/
