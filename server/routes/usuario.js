// necessário salvar o token no localstorage do navegador
const express = require("express");
const router = express.Router();
const Usuario = require("../controllers/usuario");

// cadastra um novo usuário
router.post("/", async (req, res) => {
  try {
    await Usuario.criar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// lista os usuários cadastrados
router.get("/", async (req, res) => {
  try {
    await Usuario.listar_usuarios(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// busca por cod_usuario
router.get("/:cod_usuario", async (req, res) => {
  try {
    await Usuario.exibir_id(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});


// exclui um usuário pelo id
router.delete("/:cod_usuario", async (req, res) => {
  try {
    await Usuario.excluir_id(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// atualiza um usuário pelo id
router.put("/:cod_usuario", async (req, res) => {
  try {
    await Usuario.atualizar_id(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});


// delete all
router.delete("/all", async (res) => {
  try {
    await Usuario.excluirTudo(res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

module.exports = router;
