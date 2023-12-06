import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: String,
        body: String
    },
    {
        timestamps: true
    }
)

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            required: false
        },
        rating: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: false
        },
        image: {
            type: Buffer,
            required: false
        },
        comments: {
            type: [
                commentSchema
            ],
            required: true
        }
    },
    {
        timestamps: true,
    }
)

export const Review = mongoose.model('Review', reviewSchema)
export const Comment = mongoose.model('Comment', commentSchema)