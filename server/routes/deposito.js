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

// lista todos os depositos
router.get("/", async (req, res) => {
  try {
    await depositoController.listar_depositos(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// lista um deposito
router.get("/:cod_deposito", async (req, res) => {
  try {
    await depositoController.listar_cod(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// exclui um deposito
router.delete("/:cod_deposito", async (req, res) => {
  try {
    await depositoController.excluir(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});


module.exports = router;
