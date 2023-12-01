import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        }
    }
)

export const User = mongoose.model('User', userSchema)