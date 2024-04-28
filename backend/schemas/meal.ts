import { Document, model, Schema, Types } from "mongoose";

interface Meal extends Document {
    name: String,
    description: String,
    calories: Number
}

const mealSchema = new Schema({
    name: String,
    description: String, 
    date: { type: Date, default: Date.now },
    calories: Number,
    protein: { type: Number, required: false },     // Units should be in grams 
    carbohydrates: { type: Number, required: false },
    fats: { type: Number, required: false },
    fiber: { type: Number, required: false },
    sugar: { type: Number, required: false }, 
    sodium: { type: Number, required: false },
    cholesterol: { type: Number, required: false }
})

const Meal = model<Meal>("Meal", mealSchema);

export default Meal;