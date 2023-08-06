const ExtraMeal = require("../models/ExtraMeal");
const Meal = require("../models/Meal");
const MealTime = require("../models/MealTime");
const Menu = require("../models/Menu");
const User = require("../models/User");
const Notification = require("../models/Notifications");

const getMenuFormValues = async (req, res) => {
  try {
    const meals = await Meal.find({});
    const mealTimes = await MealTime.find({});
    const extraMeals = await ExtraMeal.find({});
    return res.status(200).json({
      meals,
      mealTimes,
      extraMeals,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addMenuItem = async (req, res) => {
  try {
    const body = req.body;
    await Menu.create(body);
    const users = await User.find({});
    const mealTime = await MealTime.findById(body.mealTimes);
    for (const user of users) {
      await Notification.create({
        user: user._id,
        message: `منوی جدیدی برای تاریخ ${body.date} و در وقت ${mealTime.title} ثبت شده است`,
      });
    }
    return res.status(201).json({
      message: "menu item added",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getMenuFormValues,
  addMenuItem,
};
