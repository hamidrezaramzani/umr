const ExtraMeal = require("../models/ExtraMeal");

const addExtraMeal = async (req, res) => {
  try {
    const body = req.body;
    await ExtraMeal.create(body);
    return res.status(201).json({
      message: "extra meal added",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllExtraMeals = async (req, res) => {
  try {
    const extraMeals = await ExtraMeal.find({});
    return res.status(200).json(extraMeals);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addExtraMeal,
  getAllExtraMeals,
};
