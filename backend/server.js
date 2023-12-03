import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());

app.use(cookieParser())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(222).send('TasteUCLA')
})
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/reviews', reviewRoutes)

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log('Server connected to database')
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
