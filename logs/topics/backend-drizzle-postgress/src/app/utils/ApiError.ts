class ApiError extends Error{
    statusCode: number
    isOperational: boolean
    error: unknown

    constructor(statusCode: number, message: string, error?: unknown){
        super(message)
        this.statusCode = statusCode;
        this.isOperational = true
        Error
    }
}