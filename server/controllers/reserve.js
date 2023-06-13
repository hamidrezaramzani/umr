const Reserve = require("../models/Reserve");
const reserveMenuItem = async (req, res) => {
  try {
    const menuId = req.params.id;
    const isAlreadyReserved = await Reserve.findOne({ menu: menuId });
    if (!isAlreadyReserved) {
      await Reserve.create({
        menu: menuId,
        user: req.currentUser.id,
      });
      return res.status(201).json({
        message: "menu item reserved",
      });
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
    const studentId = req.currentUser.id;
    const all = await Reserve.find({ user: studentId });
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  reserveMenuItem,
  getAllReserved,
};
