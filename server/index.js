require("dotenv").config();
const express = require("express");

const start = () => {
  const app = express();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log("Server running at port ", PORT);
  });
};

start();
