import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username | !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    )
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({ accessToken })
})

// @desc Refresh
// @route GET /refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const refreshToken = cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" })
            }
            const foundUser = await User.findOne({ username: decoded.username })
            if (!foundUser) {
                return res.status(401).json({ message: "Unauthorized" })
            }
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            )
            return res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if it exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    res.json({ message: "Cookie cleared" })
}

export { login, refresh, logout }