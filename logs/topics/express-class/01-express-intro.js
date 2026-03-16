const express = require("express");

function block_1_basicServer() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        app.get("/menu", function (req, res) {
            // res.json 2 kaam: set Content-Type, serialized karke content bhejta(JS Object to JSON)
            // Decentralized - JSON to js object; JSON.parse()
            res.json({
                items: ["Thali", "Biryani"],
            });
        });

        // ? lagne ke baad query chalu hoti hai url me
        // /cart?q=biryani&limit=5
        app.get("/search", (req, res) => {
            const { q, limit } = req.query; // jo ? le baad

            res.json({
                query: q,
                limit: limit || "10",
            });
        });

        // id is route params or path params
        app.get("/menu/:id", (req, res) => {
            const { id } = req.params; //jo upar colon bad

            res.json({
                item: id,
                price: "420",
            });
        });

        app.post("/order", (req, res) => {
            // data ata hai, jya type ka nhi ata
            // JSON, Form Data, URL
            const order = req.body;

            res.status(201).json({
                status: "created",
                order,
            });
        });

        // why 0 -> its a signal ki koi sa bhi free port dedo in localhost

        // const PORT = process.env.PORT;
        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            try {
                const menuRes = await fetch(`${base}/menu`);
                const menuData = await menuRes.json();

                console.log("GET /menu", JSON.stringify(menuData));

                console.log("+++++++++++++++++++++++++");

                const searchRes = await fetch(
                    `${base}/search?q=biryani&limit=5&page=3`,
                );
                const searchData = await searchRes.json();

                console.log("GET /search", JSON.stringify(searchData));

                console.log("+++++++++++++++++++++++++");

                const menuItemsRes = await fetch(`${base}/menu/42`);
                const menuItemsData = await menuItemsRes.json();
                console.log("POST /menu/42", JSON.stringify(menuItemsData));

                console.log("+++++++++++++++++++++++++");

                const orderRes = await fetch(`${base}/order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/type",
                        body: JSON.stringify({
                            dish: "biryani",
                            quantity: 2,
                        }),
                    },
                });

                const orderData = await orderRes.json();

                console.log("POST /order", JSON.stringify(orderData));
                console.log("+++++++++++++++++++++++++");
            } catch (error) {
                console.log(error);
            }

            server.close(() => {
                console.log("Server Block 1");
                console.log("+++++++++++++++++++++++++");

                resolve();
            });
        });
    });
}

function block_2_response() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        app.get("/text", (req, res) => {
            res.send("Hello from .send");
        });

        app.get("/json", (req, res) => {
            res.json({
                framework: "express",
                version: "1.1.1.1",
            });
        });

        app.get("/not-found", (req, res) => {
            res.status(404).json({
                error: "Page not Found",
            });
        });

        // we will create health-route if a machine is down
        app.get("/health", (req, res) => {
            res.sendStatus(200);
        });

        app.get("/old-menu", (req, res) => {
            // add entry in DB to see how many users are still visiting old route
            // redirect me 301 status code - system design
            res.redirect(301, "/new-menu");
        });

        app.get("/xml", (req, res) => {
            res.type("application/xml").send(
                "<dish><name>Biryani</name></dish>",
            );
        });

        app.get("/custom-headers", (req, res) => {
            // Standard code bases me custom header add karne ke prefix me X-
            res.set("X-powered-By", "ChaiCode");
            res.set("X-powered-Id", "242424");

            res.json({
                message: "Custom Headers set",
            });

            // used CORS, caching, tracing
            // can be used when saying leetcode premium users are redirected to special fast servers
        });

        app.get("/no-content", (req, res) => {
            res.status(204).end();
        });

        const server = app.listen(8008, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            try {
                // TODO: write frontend
                const textRes = await fetch(`${base}/text`);
                const textData = await textRes.text();

                console.log("GET /text:", textData);
                console.log("+++++++++++++++++++++++++");

                const jsonRes = await fetch(`${base}/json`);
                const jsonData = await jsonRes.json();

                console.log("GET /json:", JSON.stringify(jsonData));
                console.log("+++++++++++++++++++++++++");

                const notFoundRes = await fetch(`${base}/not-found`);
                const notFoundData = await notFoundRes.json();
                console.log("GET /not-found:", JSON.stringify(notFoundData));
                console.log("+++++++++++++++++++++++++");

                const healthRes = await fetch(`${base}/health`);

                console.log("GET /health:", healthRes.status);
                console.log("GET /health - Status Text:", healthRes.statusText);
                console.log("+++++++++++++++++++++++++");

                const oldMenuRes = await fetch(`${base}/old-menu`);

                console.log(
                    "GET /old-menu - isRedirected:",
                    oldMenuRes.redirected + " @" + oldMenuRes.url,
                );
                console.log("+++++++++++++++++++++++++");

                const xmlRes = await fetch(`${base}/xml`);
                const xmlRawData = await xmlRes.text();

                console.log("GET /xml: ", xmlRawData);
                console.log("+++++++++++++++++++++++++");

                const customHeadersRes = await fetch(`${base}/custom-headers`);

                console.log("GET /custom-headers - x-powered-by:", customHeadersRes.headers.get('x-powered-by'));
                console.log("GET /custom-headers - x-powered-id:", customHeadersRes.headers.get('x-powered-id'));

                const customHeadersData = await customHeadersRes.json()
                console.log(customHeadersData);
                console.log("GET /custom-headers - message:", customHeadersData.message);

                console.log("+++++++++++++++++++++++++");

                const noContentRes = await fetch(`${base}/no-content`);
                console.log("GET /no-content - status: ", noContentRes.status);
                console.log("GET /no-content - statusText: ", noContentRes.statusText);
                console.log("GET /no-content - body: ", noContentRes.body);
                console.log("+++++++++++++++++++++++++");
            } catch (error) {}

            server.close(() => {
                console.log("Block 2 Served");
                resolve();
            });
        });
    });
}

async function main() {
    await block_1_basicServer();
    await block_2_response();
    process.exit(0);
}

main();
