const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MealTimeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

const MealTimeModel = mongoose.model("MealTime", MealTimeSchema);

module.exports = mongoose.models.MealTime || MealTimeModel;
