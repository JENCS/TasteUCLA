import express from 'express'
import * as reviewController from "../controllers/reviewController.js"

const router = express.Router()

router.route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)

router.route('/:id')
    .get(reviewController.getReview)
    .put(reviewController.editReview)
    .delete(reviewController.deleteReview)

export default router