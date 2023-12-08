import express from "express";
import * as userController from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { profileImageUpload } from "../middleware/imageHandler.js";

const router = express.Router();

// @route /users
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

// @route /users/me
router
  .route("/me")
  .get(verifyJWT, userController.getProfile)
  .post(
    verifyJWT,
    profileImageUpload.single("imageUrl"),
    userController.updateUser
  )
  .delete(verifyJWT, userController.deleteUser);

// @route /users/:id
router.route("/:id").get(userController.getUser);

export default router;
