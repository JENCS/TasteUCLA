import express from "express"
import * as userController from "../controllers/userController.js"
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

export default router