import { Restaraunt } from "../models/Restaurant.js"
import { User } from "../models/User.js"
import { Food } from "../models/Food.js"
import { Review } from "../models/Review.js"
import asyncHandler from "express-async-handler"

const SEARCH_RESULT_CAP = 100;

// @desc Get search hits
// @route GET /database
// @access Private
const searchDatabase = asyncHandler(async (req, res) => {

    var searchResults = [1, 2, 3 , "123123"];
    const rests = await Restaurant.find().lean();
    const users = await User.find().select("-password").lean();
    const foods = await Food.find().lean();
    const reviews = await Review.find().lean();

    

    for (let i = 0; i < SEARCH_RESULT_CAP; i++) {
        
    }

    if (!searchResults?.length) {
        return res.status(400).json({ message: "No users found" });
    }
    res.send(searchResults)
})

export { searchDatabase }
