class AppErrors extends Error {
    constructor(msg, statusCode = 500) {
        super(msg);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppErrors;