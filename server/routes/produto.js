const express = require("express");
const router = express.Router();
const {  produtoController } = require("../controllers/estoque");
const { ProdutoLogic } = require("../logic/produtos");

/* ROTAS PARA PRODUTOS */

// cadastra um novo produto
router.post("/", async (req, res) => {
    try {
      await produtoController.criar(req, res);
    } catch (error) {
      res.status(500).json({
        error: `${error}`,
      });
    }
  });
  
  // lista todos os produtos
  router.get("/", async (req, res) => {
    try {
      await produtoController.listar_produtos(req, res);
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  });
  
  // lista um produto pelo código
  router.get("/:cod_produto", async (req, res) => {
    try {
      await produtoController.listar_cod(req, res);
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  });
  
  // atualiza um produto pelo código
  router.put("/:cod_produto", async (req, res) => {
    try {
      await produtoController.atualizar(req, res);
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  });
  
  // exclui um produto pelo código
  router.delete("/:cod_produto", async (req, res) => {
    try {
      await produtoController.excluir(req, res);
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  });
  
  // lista todos os produtos de uma categoria
  router.get("/categoria/:cod_categoria", async (req, res) => {
    try {
      await produtoController.listar_produtos_categoria(req, res);
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  });

  
  module.exports = router;

  
  
