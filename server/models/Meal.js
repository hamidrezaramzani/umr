const mongoose = require("../database/connection");

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
});

const MealModel = mongoose.model("Meal", MealSchema);

module.exports = mongoose.models.Meal || MealModel;
