export function errorHandler(error, req, res, next) {

    console.error(error);
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
