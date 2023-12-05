import express from "express"
import * as userController from "../controllers/userController.js"
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router()

// @route /users
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

// @route /users/me
router.route('/me')
    .get(verifyJWT, userController.getProfile)
    .patch(verifyJWT, userController.updateUser)
    .delete(verifyJWT, userController.deleteUser)

// @route /users/:id
router.route('/:id')
    .get(userController.getUser)

export default router