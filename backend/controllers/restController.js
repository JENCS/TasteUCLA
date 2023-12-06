import { Restaurant } from "../models/Restaurant.js"
import asyncHandler from "express-async-handler"

// @desc Get all restaurants
// @route GET /locations
// @access Public
const getAllRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find({})
    return res.status(202).json({
        count: restaurants.length,
        data: restaurants
    })
})

// @desc Get a single review
// @route GET /locations/:id
// @access Public
const getRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
        .populate("reviews")
    return res.status(202).json(restaurant)
})

export { getAllRestaurants, getRestaurant }