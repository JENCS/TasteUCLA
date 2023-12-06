import { Restaurant } from "../models/Restaurant.js"
import { User } from "../models/User.js"
import { Food } from "../models/Food.js"
import { Review } from "../models/Review.js"
import asyncHandler from "express-async-handler"

const SEARCH_RESULT_CAP = 10;

// @desc Get search hits
// @route GET /search
// @access Private
const searchGlobal = asyncHandler(async (req, res) => {
    if (!isValidQuery(req)) {
        return res.status(400).send();
    }

    let query = req.params.query;
    let restaurantSearchResults, userSearchResults, reviewSearchResults;

    await searchDatabase(query, query, query).then( (result) => {
        restaurantSearchResults = result[0];
        userSearchResults = result[1];
        reviewSearchResults = result[2];
    });

    res.status(200).send({
        message: "Success",
        restaurants: restaurantSearchResults,
        users: userSearchResults,
        reviews: reviewSearchResults,
        hits: (restaurantSearchResults.length
            + userSearchResults.length
            + reviewSearchResults.length)
    });
})

async function searchDatabase(restaurantQuery, userQuery, reviewQuery) {

    let restResult = [];
    let userResult = [];
    let reviewResult = [];
    
    if (restaurantQuery !== '') {
        const rests = await Restaurant.find({}).select("-reviews").lean();
        const re = new RegExp(restaurantQuery, "gi");

        for (let i in rests) {
            if (restResult.length >= SEARCH_RESULT_CAP) {
                break;
            }
            let nameSearch = rests[i].name.match(re);
            if (!(nameSearch === null)) {
                restResult.push(rests[i]);
            }
        }
    }
    
    if (userQuery !== '') {
        const users = await User.find({}).select("-password -profile_picture").lean();
        const re = new RegExp(userQuery, "gi");

        for (let i in users) {
            if (userResult.length >= SEARCH_RESULT_CAP) {
                break;
            }
            let nameSearch = users[i].username.match(re);
            if (!(nameSearch === null)) {
                userResult.push(users[i]);
            }
        }
    }
    
    if (reviewQuery !== '') {
        const reviews = await Review.find({}).select("-image").lean();
        const re = new RegExp(reviewQuery , "gi");

        for (let i in reviews) {
            if (reviewResult.length >= SEARCH_RESULT_CAP) {
                break;
            }
            let nameSearch = reviews[i].title.match(re);
            if (!(nameSearch === null)) {
                reviewResult.push(reviews[i]);
            }
        }
    }
    return [restResult, userResult, reviewResult];
}

function isValidQuery(queryReq) {
    return !((typeof queryReq?.params?.query !== "string") || (queryReq.params.query.match("[^ a-zA-z0-9]") !== null));
}

export { searchGlobal };