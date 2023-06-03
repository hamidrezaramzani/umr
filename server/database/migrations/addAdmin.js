const runMigration = require("../../helpers/runMigrations");
const User = require("../../models/User");
const admins = require("./data/admins.json");
const generateHashedPassword = require("../../helpers/generateHashedPassword");
runMigration(async () => {
  let finalAdmins = admins.map(async (admin) => {
    admin.password = await generateHashedPassword(admin.password);
    return admin;
  });
  finalAdmins = await Promise.all(finalAdmins);
  await User.insertMany(finalAdmins);
  // eslint-disable-next-line no-console
  console.log("Done");
});
