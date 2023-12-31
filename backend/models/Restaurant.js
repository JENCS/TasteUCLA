import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        reviews: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Review"
        }
    }
)


export const Restaurant = mongoose.model('Restaurant', restaurantSchema)