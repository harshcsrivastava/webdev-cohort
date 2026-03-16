const express = require("express");

// pahle request handler/controller ke jaane se pahle middleware se mil ke jayega

function block_1_httpMethods() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json({ limit: "50kb" }));

        app.use(express.urlencoded({ extended: true, limit: "50kb" })); // handle url encoding like harsh%20dev and others
        // extended:true - allow nested object with limit

        app.use(
            express.static(root, {
                dotfiles: "ignore",
                maxAge: 0, //used for cache controlling - most important
            }),
        ); //serve static file, study its options

        // REQUEST LOGGER
        // app.use((req, res, next, err) => {next()})
        // next is only written when another middleware is involved
        // sab kam hone ke baad last me next

        const logs = [];

        // Winston is a popular logging library for Node.js
        // Khud ka winston
        app.use((req, res, next) => {
            const logEntry = `${req.method} : ${req.url}`;
            logs.push(logEntry);
            console.log(`[LOG] -- ${logEntry}`);

            // if your request hangs forever then you havent written next
            next();
        });

        // +++++++++++++++++++++++++++++++++

        app.use((req, res, next) => {
            // we can add new properties in request
            req.startTime = Date.now();

            // req.on is EVENT LISTENER: finish is event
            res.on("finish", () => {
                const duration = Date.now() - req.startTime;
                console.log(
                    `[TIMER] -- ${req.method} - ${req.url} took ${duration}ms.`,
                );
            });

            next();
        });

        function authMe(req, res, next) {
            const token = req.headers["x-auth-token"];

            if (!token)
                return res
                    .status(401)
                    .json({ error: "No token, please login" });

            if (token !== "secret-code") {
                res.status(203).json({ error: "Invalid Token" });
            }

            // token -> extract data from token -> userID, email
            req.user = { id: 1, name: "Harsh", role: "admin" };

            // kisi bhi request me agar user hoga hi nhi matlb user login hi nhi hai
            next();
        }

        // EXAMPLE OF FACTORY FUNCTION
        function getRole(role) {
            return (req, res, next) => {
                // if(!req.user || Array.isArray(role) ? !role.some((r) => r==req.user.role) : req.user.role !== role){
                //     return res.status(403).json({ error: `Role: ${role} required`})
                // }

                if (!req.user) {
                    return res
                        .status(403)
                        .json({ error: `Role: ${requiredRoles} required` });
                }

                const userRole = req.user.role;

                const rolesArray = Array.isArray(role) ? role : [role];

                if (!rolesArray.includes(userRole)) {
                    return res.status(403).json({
                        error: `Role: ${rolesArray.join(", ")} required`,
                    });
                }

                next();
            };
        }

        function rateLimit(maxRequest) {
            let count = 0;

            return (req, res, next) => {
                count++;
                if (count > maxRequest) {
                    return res.status(429).json({ error: `Too many request` });
                }

                next();
            };
        }

        const limitedEndPoint = rateLimit(3);
        app.get("/limited", limitedEndPoint, (req, res) => {});

        app.get("/profile", authMe, getRole("admin"), () => {});
        app.get("/profile", authMe, getRole("student"), () => {});
        app.get("/profile", authMe, getRole("teacher"), () => {});
        app.get(
            "/profile",
            authMe,
            getRole(["admin", "teacher", "student"]),
            () => {},
        );

        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;

            try {
                // todo

                const listRes = await fetch(`${base}/routes`);
                const listData = await listRes.json();

                const createRes = await fetch(`${base}/routes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        body: JSON.stringify({
                            name: "Colaba-Worli",
                            direction: "South",
                        }),
                    },
                });

                const createData = await createRes.json();
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
