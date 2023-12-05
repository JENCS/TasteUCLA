import express from "express"
import * as searchController from "../controllers/searchController.js"

const router = express.Router()

router.route('/')
    .get(searchController.searchGlobal)

export default router
