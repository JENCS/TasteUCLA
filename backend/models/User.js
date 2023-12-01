import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        reviews: [mongoose.Types.ObjectId],
        profile_picture: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        active: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', userSchema)