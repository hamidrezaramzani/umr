const MealTime = require("../models/MealTime");

const addMealTime = async (req, res) => {
  try {
    const body = req.body;
    await MealTime.create(body);
    return res.status(201).json({
      message: "meal time added",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllMealTimes = async (req, res) => {
  try {
    const mealTimes = await MealTime.find({});
    return res.status(200).json(mealTimes);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteMealTime = async (req, res) => {
  try {
    const id = req.params.id;
    await MealTime.deleteOne({ _id: id });
    return res.status(200).json({
      message: "meal deleted",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getSingleMealTime = async (req, res) => {
  try {
    const id = req.params.id;
    const mealTime = await MealTime.findOne({ _id: id });
    return res.status(200).json(mealTime);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const editMealTime = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await MealTime.updateOne({ _id: id }, body);
    return res.status(201).json({
      message: "meal time updated",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addMealTime,
  getAllMealTimes,
  deleteMealTime,
  getSingleMealTime,
  editMealTime,
};
