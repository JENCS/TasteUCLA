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
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        reviews: [mongoose.Schema.Types.ObjectId]
    }
)


export const Restaurant = mongoose.model('Restaurant', restaurantSchema)