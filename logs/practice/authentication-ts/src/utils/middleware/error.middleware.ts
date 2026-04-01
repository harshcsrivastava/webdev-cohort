import type { Request, Response, NextFunction } from "express";
import ApiError from "../ApiError.js";

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.error,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err,
    });
}
