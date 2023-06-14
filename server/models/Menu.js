const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MenuSchema = new Schema(
  {
    reservationDateRange: [{ type: String }],
    date: {
      type: String,
      required: true,
    },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },

    mealTimes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MealTime",
    },

    extraMeals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraMeal",
      },
    ],
  },
  { timestamps: true }
);

const MenuModel = mongoose.model("Menu", MenuSchema);

module.exports = mongoose.models.Menu || MenuModel;
