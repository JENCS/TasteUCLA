import express from 'express';
import { PORT, mongoDBURI } from './config.js';
import mongoose from 'mongoose';
import { Review } from './models/reviewModel.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(222).send('TasteUCLA');
});

app.post('/reviews', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.rating
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, rating',
            });
        }
        const newReview = {
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
        };

        const review = await Review.create(newReview);

        return res.status(201).send(review);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: message.error });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({});

        return res.status(202).json({
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

app.get('/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);

        return res.status(202).json(review);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

app.put('/reviews/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.rating
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, rating',
            });
        }
        const { id } = req.params;
        const result = await Review.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({
                message: 'Review not found',
            });
        }

        return res.status(200).send({ message: 'Review updated successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

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