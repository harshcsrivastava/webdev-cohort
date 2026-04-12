import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js"
import ApiError from "./utils/api-error.js";
import ApiResponse from "./utils/api-response.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/health", (req, res) => {
  return ApiResponse.ok(res, "Up and Runnning")
})
app.use("/api/auth", authRoute)

// Catch-all for undefined routes
app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;
