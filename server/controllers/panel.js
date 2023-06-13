const MealTime = require("../models/MealTime");
const Menu = require("../models/Menu");
const moment = require("jalali-moment");
const Reserve = require("../models/Reserve");
const getPanelValues = async (req, res) => {
  try {
    const userId = req.currentUser.id;
    const date = moment(new Date().toISOString())
      .locale("fa")
      .format("jYYYY/jMM/jDD");
    const menus = await Menu.find({})
      .populate("meal")
      .populate("extraMeals")
      .populate("mealTimes");
    const mealTimes = await MealTime.find({});
    const reserveds = await Reserve.find({}).populate("menu").populate("user");
    const allReserves = await Reserve.find({ user: userId }).populate({
      path: "menu",
      model: "Menu",
      populate: [
        {
          path: "meal",
          model: "Meal",
        },
        {
          path: "mealTimes",
          model: "MealTime",
        },
        {
          path: "extraMeals",
          model: "ExtraMeal",
        },
      ],
    });
    const todayReserves = allReserves.filter(
      reserve => reserve.menu.date === date
    );
    return res.status(200).json({ menus, mealTimes, reserveds, todayReserves });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getPanelValues,
};
