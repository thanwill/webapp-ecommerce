// necessário salvar o token no localstorage do navegador
const express = require("express");
const router = express.Router();
const Usuario = require("../controllers/usuario");
const jwt = require("jsonwebtoken");
const secret = require("../config/app.json").appId;

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

// adiciona um endereço ao usuário
router.put("/endereco/:cod_usuario", async (req, res) => {
  try {
    await Usuario.adicionar_endereco(req, res);
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

router.get("/me", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if(!token) return res.status(401).json({ error: "Token não encontrado" });

  try {
    const {_id} = jwt.verify(token, secret);
    const usuario = await Usuario.exibe_usuario(_id);
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error)
    return res.status(403).json({
      error: error.message,
    });
  }

})

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
