<<<<<<< HEAD
import mongoose from "mongoose";
=======
import mongoose from "mongoose"
>>>>>>> main

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
<<<<<<< HEAD
            required: true
        },
        reviews: [mongoose.Types.ObjectId],
        profile_picture: {
            type: mongoose.Types.ObjectId,
            required: false
        }
    },
    {
        timestamps: true
=======
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        }
>>>>>>> main
    }
)

export const User = mongoose.model('User', userSchema)