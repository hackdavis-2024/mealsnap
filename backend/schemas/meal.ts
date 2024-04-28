import { Document, model, Schema, Types } from "mongoose";

interface Nutrients {
    calories: Number;
    protein?: Number;
    carbohydrates?: Number;
    fats?: Number;
    fiber?: Number;
    sugar?: Number;
    sodium?: Number;
    cholesterol?: Number;
}

interface Meal extends Document {
    name: String;
    description: String;
    image: String;
    nutrients: Nutrients;
}

const mealSchema = new Schema({
    name: String,
    description: String, 
    date: { type: Date, default: Date.now },
    image: String,
    nutrients: {
        calories: Number,
        protein: { type: Number, required: false },     // Units should be in grams 
        carbohydrates: { type: Number, required: false },
        fats: { type: Number, required: false },
        fiber: { type: Number, required: false },
        sugar: { type: Number, required: false }, 
        sodium: { type: Number, required: false },
        cholesterol: { type: Number, required: false }
    }
})

const Meal = model<Meal>("Meal", mealSchema);

export default Meal;