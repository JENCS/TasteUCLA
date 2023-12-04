import { Review } from "../models/Review.js"
import asyncHandler from "express-async-handler"

// @desc Get all reviews
// @route GET /reviews
// @access Public
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({})
    return res.status(202).json({
        count: reviews.length,
        data: reviews
    })
})

// @desc Create a review
// @route POST /reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
    if (
        !req.body.title ||
        !req.body.author ||
        !req.body.rating
    ) {
        return res.status(400).send({
            message: 'Send all required fields: title, author, rating',
        })
    }
    const newReview = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
    }
    const review = await Review.create(newReview)
    return res.status(201).send(review)
})

// @desc Get a single review
// @route GET /reviews/:id
// @access Public
const getReview = asyncHandler(async (req, res) => {
    const { id } = req.params
    const review = await Review.findById(id)
    return res.status(202).json(review)
})

// @desc Edit a review
// @route PUT /reviews/:id
// @access Private
const editReview = asyncHandler(async (req, res) => {
    if (
        !req.body.title ||
        !req.body.author ||
        !req.body.rating
    ) {
        return res.status(400).send({
            message: 'Send all required fields: title, author, rating',
        })
    }
    const { id } = req.params
    const result = await Review.findByIdAndUpdate(id, req.body)
    if (!result) {
        return res.status(404).send({ message: 'Review not found' })
    }
    return res.status(200).send({ message: 'Review updated successfully' })
})

// @desc Delete a review
// @route DELETE /reviews/:id
// @access Private
const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Review.findByIdAndDelete(id)
    if (!result) {
        return res.status(404).send({ message: 'Review not found' })
    }
    return res.status(200).send({ message: 'Review deleted successfully' })
})

export { getAllReviews, createReview, getReview, editReview, deleteReview }