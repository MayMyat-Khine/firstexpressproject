import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";
import { env } from "./config/env.js";
import 'dotenv/config';
import { errorLogger, requestLogger } from './middlewares/errorLogger.js';

const app = express();

app.use(requestLogger);

mongoose.connect(env.MONGO_URI)
    .then(() => {
        console.log(env.MONGO_URI)
        app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });


        console.log(`Connect db`)
    })
    .catch((error) => {
        console.log(`Error ${error}`)
        process.exit(1);
    });

app.use(express.json());
app.use(`/api/${env.API_VERSION}`, router);
app.use("/uploads", express.static("uploads"))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorHandler);
app.use(errorLogger);



app.get('/', (req, res) => {
    res.send('Hello, Express!!!');
});



