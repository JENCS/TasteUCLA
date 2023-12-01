import express from "express"
import { User } from "../models/User.js"
import * as userController from "../controllers/userController.js"

const router = express.Router()

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

export default router