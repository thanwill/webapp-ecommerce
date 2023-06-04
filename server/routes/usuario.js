var express = require("express");
var router = express.Router();
const Usuario = require("../controllers/usuario");

// página de usuários
router.get("/page", function (req, res, next) {
  res.render("index", { title: "Usuário" });
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

module.exports = router;
