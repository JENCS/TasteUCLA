import { Restaurant } from "../models/Restaurant.js"
import { User } from "../models/User.js"
import { Food } from "../models/Food.js"
import { Review } from "../models/Review.js"
import asyncHandler from "express-async-handler"

const SEARCH_RESULT_CAP = 100;

// @desc Get search hits
// @route GET /search
// @access Private
const searchGlobal = asyncHandler(async (req, res) => {
    
    if (!isValidQuery(req)) {
        return res.status(400).send();
    }

    let query = req.body.query;
    let searchResults;

    await searchDatabase(query, query, query).then( (result) => {
        searchResults = result;
    });

    res.status(200).send({ message: "Success", data: searchResults, hits: searchResults.length });
})

// @desc Get search hits on restaurants
// @route GET /search/restaurants
// @access Private
const searchRestaurants = asyncHandler(async (req, res) => {
    // TODO
})

// @desc Get search hits on users
// @route GET /search/users
// @access Private
const searchUsers = asyncHandler(async (req, res) => {
    // TODO
})

// @desc Get search hits on reviews
// @route GET /search/reviews
// @access Private
const searchReviews = asyncHandler(async (req, res) => {
    // TODO
})

// Helper Function (TODO)
async function searchDatabase(restaurantQuery, userQuery, reviewQuery) {

    let resultArray = [];
    
    if (restaurantQuery !== '') {
        const rests = await Restaurant.find({}).select("-image -reviews").lean();
        const re = new RegExp(restaurantQuery , "gi");

        for (let i in rests) {
            let found = rests[i].name.match(re);
            if (!(found === null)) {
                resultArray.push(rests[i]);
            }
        }
    }
    
    if (userQuery !== '') {
        const users = await User.find({}).select("-password -profile_picture").lean();
        
    }
    
    if (reviewQuery !== '') {
        const reviews = await Review.find({}).select("-image").lean();
        
    }

    return resultArray;

}

function isValidQuery(queryReq) {
    return !((typeof queryReq?.body?.query !== "string") || (queryReq.body.query.match("[^a-zA-z0-9]") !== null));
}

export { searchGlobal, searchRestaurants, searchUsers, searchReviews };