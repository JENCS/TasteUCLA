import express from "express"
import * as restController from "../controllers/restController.js"

const router = express.Router()

// @route /users/:id
router.route('/:id')
    .get(restController.getRestaurant)

export default router