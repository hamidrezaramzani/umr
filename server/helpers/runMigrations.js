const readline = require("readline");
require("../database/connection");
const runMigration = (migrationFunction) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Are you sure you want to proceed? (y/n) ", (answer) => {
    if (answer.toLowerCase() === "y") {
      migrationFunction();
    } else {
      process.exit();
    }
    rl.close();
  });
};

module.exports = runMigration;
