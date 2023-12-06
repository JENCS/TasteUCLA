import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        body: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Restaurant"
        },
        rating: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        imageUrl: {
            type: String
        },
        comments: {
            type: [
                commentSchema
            ]
        }
    },
    {
        timestamps: true,
    }
)

export const Review = mongoose.model('Review', reviewSchema)
export const Comment = mongoose.model('Comment', commentSchema)