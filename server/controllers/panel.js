const MealTime = require("../models/MealTime");
const Menu = require("../models/Menu");
const getPanelValues = async (req, res) => {
  try {
    const menus = await Menu.find({})
      .populate("meal")
      .populate("extraMeals")
      .populate("mealTimes");
    const mealTimes = await MealTime.find({});
    return res.status(200).json({ menus, mealTimes });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getPanelValues,
};
