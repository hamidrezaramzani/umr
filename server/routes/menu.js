const express = require("express");
const { getMenuFormValues, addMenuItem } = require("../controllers/menu");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/form-values", authMiddleware("admin"), getMenuFormValues);
router.post("/add", authMiddleware("admin"), addMenuItem);
module.exports = router;
