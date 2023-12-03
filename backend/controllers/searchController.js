import { Restaurant } from "../models/Restaurant.js"
import { User } from "../models/User.js"
import { Food } from "../models/Food.js"
import { Review } from "../models/Review.js"
import asyncHandler from "express-async-handler"

const SEARCH_RESULT_CAP = 100;

// @desc Get search hits
// @route GET /search
// @access Private
const searchDatabase = asyncHandler(async (req, res) => {

    if (!searchResults?.length) {
        console.log("fail")
        return res.status(400).json({ message: "No data found" });
    }
    res.send(searchResults)
})

// @desc Get search hits
// @route GET /search
// @access Private
const searchRestaurants = asyncHandler(async (req, res) => {
    
    if (! ((typeof req.body == "object") || (typeof req.body?.query == "string"))) {
        return res.status(400).json({ message: "Invalid query" });
    }
    
    let query = req.body.query;
    var searchResults = [];

    const rests = await Restaurant.find( {} ).lean();

    for (let i in reviews) {
        let loc = reviews[i].title.search(query);
        if (!(-1 === loc)) {
            console.log("hit on review: " + reviews[i].title + " at loc: " + loc);
        }
    }

    // for (let i = 0; i < SEARCH_RESULT_CAP; i++) {
    //     if (reviews[i].)
    // }

    if (!searchResults?.length) {
        console.log("fail")
        return res.status(400).json({ message: "No users found" });
    }
    res.send(searchResults)
})

// @desc Get search hits
// @route GET /search
// @access Private
const searchUsers = asyncHandler(async (req, res) => {
    
    if (! ((typeof req.body == "object") || (typeof req.body?.query == "string"))) {
        return res.status(400).json({ message: "Invalid query" });
    }
    
    let query = req.body.query;
    var searchResults = [];

    // const rests = await Restaurant.find({ n }).lean();
    // const users = await User.find().select("-password -profile_picture").lean();
    // const foods = await Food.find().lean();
    const reviews = await Review.find().lean();

    // console.log(reviews);

    for (let i in reviews) {
        let loc = reviews[i].title.search(query);
        if (!(-1 === loc)) {
            console.log("hit on review: " + reviews[i].title + " at loc: " + loc);
        }
    }

    // for (let i = 0; i < SEARCH_RESULT_CAP; i++) {
    //     if (reviews[i].)
    // }

    if (!searchResults?.length) {
        console.log("fail")
        return res.status(400).json({ message: "No users found" });
    }
    res.send(searchResults)
})

// @desc Get search hits
// @route GET /search
// @access Private
const searchReviews = asyncHandler(async (req, res) => {
    
    if (! ((typeof req.body == "object") || (typeof req.body?.query == "string"))) {
        return res.status(400).json({ message: "Invalid query" });
    }
    
    let query = req.body.query;
    var searchResults = [];

    // const rests = await Restaurant.find({ n }).lean();
    // const users = await User.find().select("-password -profile_picture").lean();
    // const foods = await Food.find().lean();
    const reviews = await Review.find().lean();

    // console.log(reviews);

    for (let i in reviews) {
        let loc = reviews[i].title.search(query);
        if (!(-1 === loc)) {
            console.log("hit on review: " + reviews[i].title + " at loc: " + loc);
        }
    }

    // for (let i = 0; i < SEARCH_RESULT_CAP; i++) {
    //     if (reviews[i].)
    // }

    if (!searchResults?.length) {
        console.log("fail")
        return res.status(400).json({ message: "No users found" });
    }
    res.send(searchResults)
})

export { searchDatabase, searchRestaurants, searchUsers, searchReviews };