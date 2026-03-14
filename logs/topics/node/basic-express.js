const express = require("express");

const app = express();

app.use(express.json()); //accepting all json-type data

app.get("/menu", (req, res) => {
  return res.json({ items: ["thali", "biryani"] });
});

app.post("/order", (req, res) => {
  res.status(200).json({
    status: "received",
    order: req.body, //works similarly as req.on("data", (chunk) => (data += chunk));
  });
});
