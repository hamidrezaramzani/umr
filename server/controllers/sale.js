const Reserve = require("../models/Reserve");
const Sale = require("../models/Sale");
const { getPanelValues } = require("../controllers/panel");
const moment = require("jalali-moment");
const User = require("../models/User");
const toggleSale = async (req, res) => {
  try {
    const userId = req.currentUser.id;
    const reserveId = req.params.reserveId;
    const reserveItem = await Reserve.findOne({ _id: reserveId })
      .populate("user")
      .populate("menu");
    if (String(userId) !== String(reserveItem.user._id)) {
      return res.status(400);
    }

    if (reserveItem.isMovedToSale === true) {
      await Sale.deleteOne({
        user: userId,
        menu: reserveItem.menu._id,
      });
      await Reserve.updateOne(
        {
          _id: reserveId,
        },
        {
          $set: {
            isMovedToSale: false,
          },
        }
      );
    } else {
      await Sale.create({
        user: userId,
        menu: reserveItem.menu._id,
      });
      await Reserve.updateOne(
        {
          _id: reserveId,
        },
        {
          $set: {
            isMovedToSale: true,
          },
        }
      );
    }

    return await getPanelValues(req, res);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const buySaleItem = async (req, res) => {
  try {
    const date = moment(new Date().toISOString())
      .locale("fa")
      .format("jYYYY/jMM/jDD");
    const saleId = req.params.saleId;
    const userId = req.currentUser.id;

    const user = await User.findById(userId);
    const sale = await Sale.findById(saleId)
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
    let userReserveds = await Reserve.find({
      user: userId,
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
    userReserveds = userReserveds.filter((userReserve) => {
      return (
        !userReserve.isMovedToSale &&
        userReserve.menu.date === date &&
        String(userReserve.menu.mealTimes._id) ===
          String(sale.menu.mealTimes._id)
      );
    });

    if (userReserveds.length) {
      return res.status(400).json({
        message: "شما قبل در این زمان غذایی را رزرو کرده اید",
      });
    }
    const salePrice = sale.menu.meal.price * 2;
    if (user.balance < salePrice) {
      return res.status(400).json({
        message: "موجودی شارژ حساب شما برای خرید این غذا کافی نیست.",
      });
    }
    await Reserve.create({
      user: userId,
      menu: sale.menu._id,
    });

    await User.updateOne(
      {
        _id: userId,
      },
      {
        balance: user.balance - salePrice,
      }
    );
    await User.updateOne(
      {
        _id: sale.user._id,
      },
      {
        balance: sale.user.balance + salePrice,
      }
    );

    await Sale.updateOne(
      {
        _id: sale._id,
      },
      {
        $set: {
          isSoldOut: true,
        },
      }
    );
    return await getPanelValues(req, res);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  toggleSale,
  buySaleItem,
};
