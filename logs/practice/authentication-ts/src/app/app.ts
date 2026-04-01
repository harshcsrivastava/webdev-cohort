import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import errorHandler from "../utils/middleware/error.middleware.js";
import ApiError from "../utils/ApiError.js";
import { authRouter } from "./auth/authentication.routes.js";

export function createExpressApplication(): Express {
    const app = express();

    // middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // routes
    app.get("/health", (req: Request, res: Response) => {
        return ApiResponse.ok(res, `Server up & running`);
    });

    app.get("/error", (req: Request, res: Response, next: NextFunction) => {
        throw ApiError.badRequest("Error Test", {
            reason: `Too Loaded`,
        });
    });

    app.use("/auth", authRouter);

    // more middleware
    app.use(errorHandler);

    return app;
}
