const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const picture = require("../controllers/picture");

router.post("/", upload.single("file"), picture.create);
router.get("/", picture.findAll);
router.delete("/:id", picture.remove);

module.exports = router;