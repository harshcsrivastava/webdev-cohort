class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }


    static badRequest(message= "Bad Request"){
        throw new ApiError(400, message)
    }

    static unauthorized(message= "Unauthorized"){
        throw new ApiError(401, message)
    }

    static conflict(message = "User already exists"){
        throw new ApiError(409, message)
    }
    
    static forbidden(message = "Forbidden") {
        return new ApiError(412, message);
    }

    static notFound(message = "Doesnt exist") {
        return new ApiError(412, message);
    }

}

export default ApiError;
