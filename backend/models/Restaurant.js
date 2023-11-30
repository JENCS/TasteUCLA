import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: buffer,
            required: true
        },
        reviews: [Schema.Types.ObjectId]
    }
)

export const Restaurant = mongoose.model('Restaurant', restaurantSchema)