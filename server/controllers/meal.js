const path = require("path");
const Meal = require("../models/Meal");
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

module.exports = {
  addMeal,
};
