import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        nutrition: {
            serving_size: {
                type: String,
                required: true
            },
            calories: {
                type: Number,
                required: true
            },
            total_fat: {
                type: String,
                required: false
            },
            saturated_fat: {
                type: String,
                required: false
            },
            trans_fat: {
                type: String,
                required: false
            },
            cholesterol: {
                type: String,
                required: false
            },
            sodium: {
                type: String,
                required: false
            },
            total_carbohydrate: {
                type: String,
                required: false
            },
            dietary_fiber: {
                type: String,
                required: false
            },
            sugars: {
                type: String,
                required: false
            },
            protein: {
                type: String,
                required: false
            },
            calcium: {
                type: String,
                required: false
            },
            iron: {
                type: String,
                required: false
            },
            potassium: {
                type: String,
                required: false
            },
            vitamin_d: {
                type: String,
                required: false
            }
        },
        ingredients: {
            type: String,
            required: true
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        
    }
)

export const Food = mongoose.model('Food', foodSchema)