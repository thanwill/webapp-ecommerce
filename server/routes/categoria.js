const express = require("express");
const router = express.Router();
const { categoriaController } = require("../controllers/estoque");

//router.use(login);

/* ROTAS PARA CATEGORIAS */
// cadastra uma nova categoria
router.post("/", async (req, res) => {
  try {
    await categoriaController.criar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// lista todas as categorias
router.get("/", async (req, res) => {
  try {
    await categoriaController.listar_categorias(req, res);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// lista uma categoria pelo código
router.get("/:cod_categoria", async (req, res) => {
  try {
    await categoriaController.listar_cod(req, res);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// atualiza uma categoria pelo código
router.put("/:cod_categoria", async (req, res) => {
  try {
    await categoriaController.atualizar(req, res);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

// exclui uma categoria pelo código
router.delete("/:cod_categoria", async (req, res) => {
  try {
    await categoriaController.excluir(req, res);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});
module.exports = router;
