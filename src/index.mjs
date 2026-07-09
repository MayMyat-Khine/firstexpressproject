import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.mjs';
import { errorHandler } from './middlewares/error.middleware.mjs';


const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1/local_db").then(() => console.log(`Connect db`)).catch((error) => console.log(`Error ${error}`));
// mongoose.connect("mongodb://127.0.0.1/firstexpressproject").then(() => console.log(`Connect db`)).catch((error) => console.log(error));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


