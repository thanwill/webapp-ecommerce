const express = require("express");
const router = express.Router();
const { CategoriaController } = require("../controllers/estoque");


// cadastra uma nova categoria
router.post("/", async (req, res) => {
  try {
    await CategoriaController.criar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});


module.exports = router;
