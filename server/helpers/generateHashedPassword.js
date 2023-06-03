const bcrypt = require("bcrypt");
const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

module.exports = generateHashedPassword;
