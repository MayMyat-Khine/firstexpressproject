import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.mjs';
import { errorHandler } from './middlewares/error.middleware.mjs';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.mjs";
import { env } from "./config/env.mjs";
import 'dotenv/config';

const app = express();


mongoose.connect(env.MONGO_URI)
    .then(() => {

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
app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))




app.get('/', (req, res) => {
    res.send('Hello, Express!!!');
});



