class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    error: unknown | Error | null;
    constructor(statusCode: number, message: string, error?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.error = error ?? null;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string = "Bad Request", error?: unknown) {
        throw new ApiError(400, message, error);
    }

    static unauthorized(message: string = "Unauthorized", error?: unknown) {
        throw new ApiError(401, message, error);
    }

    static forbidden(message: string = "Forbidden", error?: unknown) {
        throw new ApiError(403, message, error);
    }

    static notFound(message: string = "Not Found", error?: unknown) {
        throw new ApiError(404, message, error);
    }

    static internal(
        message: string = "Internal Server Error",
        error?: unknown,
    ) {
        throw new ApiError(500, message, error);
    }
}

export default ApiError;
