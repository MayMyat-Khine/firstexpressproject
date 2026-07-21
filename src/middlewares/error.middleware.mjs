export function errorHandler(error, req, res, next) {

    console.error(error);

    // Mongo duplicate key error
    if (error.code === 11000) {

        const field = Object.keys(error.keyValue)[0];

        return res.status(409).send({
            success: false,
            message: `${field} already exists`
        });
    }

    if (error.name === "ValidationError") {

        const errors = Object.values(error.errors).map(
            err => err.message
        );

        return res.status(400).send({
            success: false,
            errors
        });
    }
    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
}
