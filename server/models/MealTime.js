const mongoose = require("../database/connection");

const Schema = mongoose.Schema;

const MealTimeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const MealTimeModel = mongoose.model("MealTime", MealTimeSchema);

module.exports = mongoose.models.MealTime || MealTimeModel;
