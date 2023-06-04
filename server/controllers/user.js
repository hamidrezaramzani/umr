const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ meliCode: body.meliCode });
    if (!user) {
      return res.status(401).json({
        message: "meliCode or password is invalid",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "meliCode or password is invalid",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        type: user.type,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      message: "login successfully",
      user: {
        id: user._id,
        type: user.type,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  login,
};
