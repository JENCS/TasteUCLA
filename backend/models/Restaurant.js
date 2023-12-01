import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: Buffer,
            required: true
        },
        reviews: [Schema.Types.ObjectId]
    }
)

export const Restaurant = mongoose.model('Restaurant', restaurantSchema)