export function errorHandler(error, req, res, next) {

    console.error(error);

    // Mongo duplicate key error
    if (error.code === 11000) {

        const field = Object.keys(error.keyValue)[0];

        throw res.status(409).send({
            success: false,
            message: `${field} already exists`
        });
    }



    if (error.name === "TokenExpiredError") {

        throw res.status(401).json({
            success: false,
            message: "Access token expired"
        });

    }


    if (error.name === "JsonWebTokenError") {

        throw res.status(401).json({
            success: false,
            message: "Invalid access token"
        });

    }

    if (error.name === "ValidationError") {

        const errors = Object.values(error.errors).map(
            err => err.message
        );

        throw res.status(400).send({
            success: false,
            errors: errors
        });
    }
    throw res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
}
