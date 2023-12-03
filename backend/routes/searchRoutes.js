import express from "express"
import * as searchController from "../controllers/searchController.js"

const router = express.Router()

router.route('/')
    .get(searchController.searchDatabase)

router.route('/restaurants')
    .get(searchController.searchRestaurants)

router.route('/users')
    .get(searchController.searchUsers)

router.route('/reviews')
    .get(searchController.searchReviews)
export default router
