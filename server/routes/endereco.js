// necessário salvar o token no localstorage do navegador
const express = require("express");
const router = express.Router();
const { enderecoController } = require("../controllers/endereco");

router.post("/", async (req, res) => {
  try {
    await enderecoController.criar(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error}` });
  }
});

// exibe o endereco pelo id
router.get("/:cod_endereco", async (req, res) => {
  try {
    await enderecoController.exibir_endereco(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error}` });
  }
});

// exibe o endereco pelo id do usuario
router.get("/usuario/:cod_usuario", async (req, res) => {
  try {
    await enderecoController.exibir_usuario(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error}` });
  }
});

// atualiza o endereco pelo id
router.put("/:cod_endereco", async (req, res) => {
  try {
    await enderecoController.atualizar(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error}` });
  }
});

// lista os endereços
router.get("/", async (req, res) => {
  try {
    await enderecoController.listar(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error}` });
  }
});

// limpa a colletion de enderecos
router.delete("/all", async (req, res) => {
  try {
    await enderecoController.excluirTudo(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error}` });
  }
});

module.exports = router;
