const { upload } = require("../config/multer");

var express = require("express");
var router = express.Router();
const Usuario = require("../controllers/usuario");

// cadastra um novo usuário
router.post("/", upload.single("foto"), async (req, res) => {
  try {
    await Usuario.criar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// atualiza a foto de um usuário pelo id
router.put("/foto/:id", upload.single("foto"), async (req, res) => {
  try {
    await Usuario.carregarFoto(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// lista os usuários cadastrados
router.get("/", async (req, res) => {
  try {
    await Usuario.listar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// exibe um usuário pelo id
router.get("/:id", async (req, res) => {
  try {
    await Usuario.exibir(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});



// upload de imagem
router.post("/upload", async (req, res) => {
  try {
    await Usuario.upload(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// exclui um usuário pelo id
router.delete("/:id", async (req, res) => {
  try {
    await Usuario.excluir(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// listar por ID
router.get("/id/:id", async (req, res) => {
  try {
    await Usuario.listarPorId(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// atualiza um usuário pelo id
router.put("/:id", async (req, res) => {
  try {
    await Usuario.atualizar(req, res);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

// retorna a foto de um usuário pelo id
router.get("/foto/:id", async (req, res) => {
  try {
    await Usuario.exibirFoto(req, res);
    res.set("Content-Type", "image/jpeg");
    return res.send(req.foto);
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    });
  }
});

module.exports = router;
