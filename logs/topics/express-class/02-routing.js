const express = require("express");

function block_1_httpMethods() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        const routes = {
            // DATABASE
            1: {
                id: 1,
                name: "Shatabdi Express",
                direction: "North",
            },
            2: {
                id: 2,
                name: "Vande Bharat Express",
                direction: "All",
            },
        };

        let nextId = 3;

        // list all train

        app.get("/routes", (req, res) => {
            // res.json(routes) // we can do better because we use number as KEYS here
            res.json(Object.values(routes));
        });

        // single route by id
        app.get("/routes/:id", (req, res) => {
            const route = routes[req.params.id];
            if (!route) return res.status(404).json({ error: "No Train" });

            res.json(route);
        });

        app.post("/routes", (req, res) => {
            const newRoute = { id: nextId++, ...req.body };
            routes[newRoute.id] = newRoute;
            res.status(201).json(newRoute);
        });

        app.put("/routes/:id", (req, res) => {
            const { id } = req.params;
            if (!routes[id]) {
                return res.status(404).json({ error: "No Train with ID" });
            }

            routes[id] = { id: Number(id), ...req.body };
            res.json(routes[id]);
        });

        app.patch("/routes/:id", (req, res) => {
            const { id } = req.params;
            if (!routes[id])
                return res.status(404).json({ error: "No Train with ID" });

            Object.assign(routes[id], req.body);
            res.json(routes[id]);
        });

        app.delete("/routes/:id", (req, res) => {
            const { id } = req.params;
            if (!routes[id])
                return res.status(404).json({ error: "No Train with ID" });

            delete routes[id];

            res.status(204).end();
        });

        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            try {
                // todo

                const listRes = await fetch(`${base}/routes`);
                const listData = await listRes.json();

                console.log("GET /routes", JSON.stringify(listData));
                console.log("+++++++++++++++++++++++++++++++++");

                const singleRouteRes = await fetch(`${base}/routes/1`);
                const singleRouteData = await singleRouteRes.json();

                console.log("GET /routes/1", JSON.stringify(singleRouteData));
                console.log("+++++++++++++++++++++++++++++++++");

                const createRes = await fetch(`${base}/routes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: "Colaba-Worli",
                        direction: "South",
                    }),
                });

                const createData = await createRes.json();

                console.log("POST /routes", JSON.stringify(createData));
                console.log("+++++++++++++++++++++++++++++++++");

                const putRes = await fetch(`${base}/routes/3`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: "Hamsafar Express",
                        direction: "North",
                    }),
                });

                const putData = await putRes.json();

                console.log(JSON.stringify(putData));
                console.log("+++++++++++++++++++++++++++++++++");

                const patchRes = await fetch(`${base}/routes/3`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        direction: "North-West",
                        loc: "Inroute",
                    }),
                });

                const patchData = await patchRes.json();
                console.log(JSON.stringify(patchData));
                console.log("+++++++++++++++++++++++++++++++++");

                const deleteRouteRes = await fetch(`${base}/routes/3`, {
                    method: "DELETE",
                });
                console.log(deleteRouteRes.status);

                if (deleteRouteRes.ok) {
                    console.log("Route deleted successfully");
                } else {
                    const err = await deleteRouteRes.json();
                    console.log("Error:", err);
                }

                console.log("+++++++++++++++++++++++++++++++++");
            } catch (error) {
                console.log(error);
            }

            server.close(() => {
                console.log("Block 1 served....");
                resolve();
            });
        });
    });
}

function block_2_filesParam() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        // It catchs everything:
        // file/readme.md | file/docs/readme.md
        // /files/docs/readme.txt
        // /files/assets/style.css
        app.get("/file/*filepath", (req, res) => {
            const filepath = req.params.filepath;

            res.json({ filepath, type: "wildcard" });
        });

        app.route("/schedule")
            .get((req, res) => {})
            .post((req, res) => {})
            .put((req, res) => {})
            .delete(handlerFunction);

        app.use("/api", (req, res) => {
            // its a prefetch match
        });

        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            try {
                // todo
            } catch (error) {
                console.log(error);
            }

            server.close(() => {
                console.log("Server Block 1");

                resolve();
            });
        });
    });
}

async function main() {
    await block_1_httpMethods();

    process.exit(0);
}

main();
