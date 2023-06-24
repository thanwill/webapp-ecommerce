const express = require("express");
const router = express.Router();
const { depositoController } = require("../controllers/estoque");

/* ROTAS PARA DEPOSITOS */

// cadastra um novo deposito
router.post("/", async (req, res) => {
  try {
    await depositoController.criar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

module.exports = router;
