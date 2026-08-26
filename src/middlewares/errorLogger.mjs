import fs from "fs";
import path from "path";

export const requestLogger = (req, res, next) => {
    console.log(
        `[REQUEST] ${req.method} ${req.originalUrl}`
    );

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        console.log(
            `[RESPONSE] ${req.method} ${req.originalUrl} ` +
            `${res.statusCode} ${duration}ms`
        );
    });

    next();
};
// export const requestLogger = (req, res, next) => {
//     const start = Date.now();

//     res.on('finish', () => {
//         const duration = Date.now() - start;

//         console.log(
//             `[${new Date().toISOString()}] ` +
//             `${req.method} ${req.originalUrl} ` +
//             `${res.statusCode} ${duration}ms`
//         );
//     });

//     next();
// };

const logDir = path.resolve("logs");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const errorLogFile = path.join(logDir, "error.log");

export const errorLogger = (err, req, res, next) => {
    console.log("here is error Loggoer")
    const statusCode = err?.statusCode || err?.status || 500;

    const log = `
==================================================
TIME: ${new Date().toISOString()}
METHOD: ${req.method}
URL: ${req.originalUrl}
STATUS: ${statusCode}
MESSAGE: ${err?.message || "Unknown error"}

STACK:
${err?.stack || "No stack trace"}

ERROR:
${JSON.stringify(err, Object.getOwnPropertyNames(err), 2)}
==================================================
`;

    // Write complete error to file
    fs.appendFileSync(errorLogFile, log);

    // Only print useful information to terminal
    console.error(
        `[ERROR] ${req.method} ${req.originalUrl} ${statusCode}`
    );
    console.error(err?.message || "Unknown error");

    if (err?.stack) {
        console.error(err.stack);
    }

    if (res.headersSent) {
        return next(err);
    }

    return res.status(statusCode).json({
        success: false,
        message: err?.message || "Internal Server Error",
    });
};