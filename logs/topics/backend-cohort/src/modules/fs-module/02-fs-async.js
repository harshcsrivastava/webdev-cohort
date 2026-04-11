import fs from "node:fs";

fs.writeFile("async-pmo.txt", "Yoo Ho ho!!", (err) => {
    if (err) {
        console.log(err);
    }

    console.log("File written");
});

fs.readFile("async-pmo.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }

    console.log(data);
});


fs.readFile("a.txt", "utf-8", (err, data) => {
    fs.writeFile("b.txt", data, (err) => {
        fs.appendFile("b.txt", "\nDone", (err) => {
            fs.unlink("a.txt", (err) => {
                console.log("Deleted");
                
            })
        })
    })
})