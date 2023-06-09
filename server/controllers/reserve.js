const Reserve = require("../models/Reserve");
const moment = require("jalali-moment");
const { getPanelValues } = require("./panel");
const Menu = require("../models/Menu");
const User = require("../models/User");
const reserveMenuItem = async (req, res) => {
  try {
    const menuId = req.params.id;
    const mealTimeId = req.params.mealTimeId;
    const userId = req.currentUser.id;
    const isAlreadyReserved = await Reserve.findOne({
      menu: menuId,
      user: userId,
    });
    if (!isAlreadyReserved) {
      const date = moment(new Date().toISOString())
        .locale("fa")
        .format("jYYYY/jMM/jDD");
      const userReserves = await Reserve.find({ user: userId }).populate({
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
      const menu = await Menu.findById(menuId).populate("meal");
      const user = await User.findById(userId);
      const haveSpeceficReserve = userReserves.find(
        (reserve) =>
          reserve.menu.date === date &&
          String(reserve.menu.mealTimes._id) === mealTimeId
      );
      if (haveSpeceficReserve) {
        await User.findByIdAndUpdate(userId, {
          $set: { balance: user.balance + haveSpeceficReserve.menu.meal.price },
        });
        await Reserve.deleteOne({ _id: haveSpeceficReserve._id });
      }
      const finishedUser = await User.findById(userId);
      if (finishedUser.balance - menu.meal.price > 0) {
        await Reserve.create({
          menu: menuId,
          user: userId,
        });

        await User.findByIdAndUpdate(userId, {
          balance: finishedUser.balance - menu.meal.price,
        });
      } else {
        return res.status(422).json({
          message: "user money balance is not enouagh",
        });
      }
      return getPanelValues(req, res);
    } else {
      return res.status(400).json({
        message: "menu item already reserved",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllReserved = async (req, res) => {
  try {
    const userId = req.currentUser.id;
    const all = await Reserve.find({ user: userId });
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTodayReserves = async (req, res) => {
  try {
    const userId = req.currentUser.id;
    const date = moment(new Date().toISOString())
      .locale("fa")
      .format("jYYYY/jMM/jDD");
    const userReserves = await Reserve.find({
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
    const all = userReserves.filter((reserve) => reserve.menu.date === date);
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  reserveMenuItem,
  getAllReserved,
  getTodayReserves,
};
