import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.mjs';
import { errorHandler } from './middlewares/error.middleware.mjs';
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(express.json());
app.use(router);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(() => console.log(`Connect db`)).catch((error) => console.log(`Error ${error}`));

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


