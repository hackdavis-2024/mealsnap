const { Schema, model } = require("mongoose");

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
});

const Meal = model("Meal", mealSchema);

module.exports = Meal;