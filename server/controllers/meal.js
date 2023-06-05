const path = require("path");
const Meal = require("../models/Meal");
const fs = require("fs/promises");
const addMeal = async (req, res) => {
  try {
    const body = req.body;
    const fileName = `${req.files.image.md5}${req.files.image.name}`;
    const destinationPath = path.join(__dirname, "../", "uploads", fileName);
    req.files.image.mv(destinationPath, (err) => {
      if (err) {
        throw new Error("upload failed");
      }
    });

    body.image = fileName;

    await Meal.create(body);
    return res.status(201).json({
      message: "message added",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const allMeals = async (req, res) => {
  try {
    const meals = await Meal.find({});
    return res.status(200).json(meals);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const id = req.params.id;
    const meal = await Meal.findOne({ _id: id });
    await Meal.deleteOne({ _id: id });
    await fs.unlink(path.join(__dirname, "../", "uploads", meal.image));
    return res.status(200).json({
      message: "meal deleted",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addMeal,
  allMeals,
  deleteMeal,
};
