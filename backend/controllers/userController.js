import { User } from "../models/User.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean()
    if (!users?.length) {
        return res.status(400).json({ message: "No users found" })
    }
    res.json(users)
})

// @desc Create a user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { username, "password": hashedPwd }
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: "Invalid user data received" })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password } = req.body
    if (!id || !username || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(400).json({ message: "Wrong password" })
    }
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    user.username = username
    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: "User ID required" })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    const deletedUser = await user.deleteOne()
    const reply = `Username ${deletedUser.username} with ID ${deletedUser._id} deleted`
    res.json(reply)
})

export { getAllUsers, createUser, updateUser, deleteUser }