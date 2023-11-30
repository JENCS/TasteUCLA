import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        img: {
            type: buffer,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export const Review = mongoose.model('Review', reviewSchema)