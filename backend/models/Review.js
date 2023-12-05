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
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
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
        comments: [
            {
                body: String,
                date: Date,
                user: mongoose.Schema.Types.ObjectId
            }
        ]
    },
    {
        timestamps: true,
    }
)

export const Review = mongoose.model('Review', reviewSchema)