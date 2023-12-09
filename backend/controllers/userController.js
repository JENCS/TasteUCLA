import { User } from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Create a user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashedPwd };
  const user = await User.create(userObject);
  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Update a user
// @route POST /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  console.log("I AM AT UPDATE USER");
  const username = req.user;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const { bio } = req.body;
  if (bio) {
    user.bio = bio;
  }
  console.log("PRINTING REQ FILE");
  console.log(req.file);
  user.imageUrl = req.file ? "http://localhost:5555/" + req.file.path : null;
  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const deletedUser = await user.deleteOne();
  const reply = `Username ${deletedUser.username} with ID ${deletedUser._id} deleted`;
  res.json(reply);
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .select("-password")
    .populate("reviews")
    .lean();
  res.status(202).json(user);
});

const getProfile = asyncHandler(async (req, res) => {
  const username = req.user;
  const foundUser = await User.findOne({ username })
    .select("-password")
    .populate({
      path: "reviews",
      model: "Review",
    })
    .lean();
  res.status(202).json(foundUser);
});

export { getAllUsers, createUser, updateUser, deleteUser, getUser, getProfile };
