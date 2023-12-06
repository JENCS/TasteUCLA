import express from 'express'
import * as reviewController from "../controllers/reviewController.js"
import verifyJWT from "../middleware/verifyJWT.js"
import { reviewImageUpload } from '../middleware/imageHandler.js'

const router = express.Router()

router.route('/')
    .get(reviewController.getAllReviews)
    .post(verifyJWT, reviewImageUpload.single('image'), reviewController.createReview)

router.route('/:id')
    .get(reviewController.getReview)
    .put(verifyJWT, reviewController.editReview)
    .delete(verifyJWT, reviewController.deleteReview)

router.route('/:id/comment')
    .post(verifyJWT, reviewController.createComment)

export default router