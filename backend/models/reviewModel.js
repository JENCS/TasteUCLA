import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Review = mongoose.model('Caesar', reviewSchema);