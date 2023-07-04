/* eslint-disable arrow-parens */
const MealTime = require("../models/MealTime");
const Transaction = require("../models/Transaction");
const Menu = require("../models/Menu");
const moment = require("jalali-moment");
const Reserve = require("../models/Reserve");
const User = require("../models/User");
const Sale = require("../models/Sale");
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
    const reserveds = await Reserve.find({ user: userId })
      .populate("menu")
      .populate("user");
    const allReserves = await Reserve.find({
      user: userId,
    }).populate({
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
    const user = await User.findById(userId);
    const transactions = await Transaction.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5);
    const todayReserves = allReserves.filter(
      (reserve) => reserve.menu.date === date
    );
    let todaySales = await Sale.find({
      user: {
        $ne: userId,
      },
    })
      .populate({
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
      })
      .populate("user")
      .exec();
    todaySales = todaySales.filter(
      (sale) => sale.menu.date === date && !sale.isSoldOut
    );
    return res.status(200).json({
      menus,
      mealTimes,
      reserveds,
      todayReserves,
      user,
      transactions,
      todaySales,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getPanelValues,
};
