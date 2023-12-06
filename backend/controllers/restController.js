import { Restaurant } from "../models/Restaurant.js"
import asyncHandler from "express-async-handler"

// @desc Get a single review
// @route GET /locations/:id
// @access Public
const getRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
    return res.status(202).json(restaurant)
})

export { getRestaurant }