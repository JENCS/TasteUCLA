import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        reviews: [Schema.Types.ObjectId]
    }
)

export const Restaurant = mongoose.model('Restaurant', restaurantSchema)