const express = require("express");
const router = express.Router();
const loginController = require("../controllers/auth");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", loginController.login);

module.exports = router;