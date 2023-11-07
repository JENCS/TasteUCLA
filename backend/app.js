import express from 'express';
import { PORT, mongoDBURI } from './config.js';
import mongoose from 'mongoose';
import { Review } from './models/reviewModel.js';
import reviewRoute from './routes/reviewsRoute.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(222).send('TasteUCLA');
});

app.use('/reviews', reviewRoute);

mongoose
    .connect(mongoDBURI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });