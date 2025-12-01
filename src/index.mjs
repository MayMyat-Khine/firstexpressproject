import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.mjs';


const app = express();

app.use(express.json());
app.use(router);

mongoose.connect("mongodb://127.0.0.1/firstexpressproject").then(() => console.log(`Connect db`)).catch((error) => console.log(error));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


