const http = require("http");

// RAW WEBSERVER

// creates a local server, takes a callback
const server = http.createServer((req, res) => {
  // req.method === HTTP Methods
  // req.url === routesGO THROUGH these methods

  if (req.method === "GET" && req.url === "/menu") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ items: ["thali", "biryani"] }));
  } else if (req.method === "POST" && req.url === "/order") {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      const orders = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          status: "receivedd",
          orders,
        }),
      );
    });
  }
});

