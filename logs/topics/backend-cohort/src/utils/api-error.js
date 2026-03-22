class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true; //usually available in PRODUCTIO-GRADE Application
        Error.captureStackTrace(this, this.constuctor);
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(400, message);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    static conflict(message = "Conflict - User already exists") {
        return new ApiError(409, message);
    }
}
// How to use - throw new ApiError()

export default ApiError;
