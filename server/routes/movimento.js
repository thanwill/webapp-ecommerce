const express = require("express");
const router = express.Router();
const { movimentoController, itensMovimentoController } = require("../controllers/estoque");

// post para criar um item de movimento
router.post("/itens", async (req, res) => {
  try {
    await itensMovimentoController.criar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// get para listar todos os itens de movimento
router.get("/itens", async (req, res) => {
  try {
    await itensMovimentoController.listar_itens(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// get para listar um item de movimento
router.get("/itens/:cod_item", async (req, res) => {
  try {
    await itensMovimentoController.listar_cod(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// delete para excluir um item de movimento
router.delete("/itens/:cod_item", async (req, res) => {
  try {
    await itensMovimentoController.excluir(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// post para criar um movimento
router.post("/", async (req, res) => {
  try {
    await movimentoController.criar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// get para listar todos os movimentos
router.get("/", async (req, res) => {
  try {
    await movimentoController.listar_movimentos(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

module.exports = router;
