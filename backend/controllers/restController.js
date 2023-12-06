import { Restaurant } from "../models/Restaurant.js"
import asyncHandler from "express-async-handler"

// @desc Get a single restaurant
// @route GET /locations/:id
// @access Public
const getRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
        .populate("reviews");
        
    return res.status(202).json(restaurant);
})

const getReviews = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).populate("reviews");
    res.send(restaurant)
})

const updateRestaurantReviews = asyncHandler(async (req, res) => {
    const { id, new_review } = req.body
    const restaurant = await Restaurant.findById(id).exec()
    if (!restaurant) {
        return res.status(400).json({ message: "Restaurant not found" })
    }
    if (new_review) {
        restaurant.reviews = restaurant.reviews.push(new_review)
    }

    const updatedRestaurant = await Restaurant.save()
    res.json({ message: `${updatedRestaurant.name} updated reviews` })
})

export { getRestaurant, getReviews}