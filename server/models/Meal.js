const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
},
{ timestamps: true });

const MealModel = mongoose.model("Meal", MealSchema);

module.exports = mongoose.models.Meal || MealModel;
